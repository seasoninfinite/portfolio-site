# Cloudflare R2 Video Migration Script
# This script uploads local videos to Cloudflare R2 and updates the codebase

param(
    [string]$EnvFile = ".env"
)

# Check if .env file exists
if (-not (Test-Path $EnvFile)) {
    Write-Host "Error: .env file not found. Please copy .env.example to .env and fill in your credentials." -ForegroundColor Red
    exit 1
}

# Load environment variables
Get-Content $EnvFile | ForEach-Object {
    if ($_ -match '^([^=]+)=(.*)$') {
        $name = $matches[1].Trim()
        $value = $matches[2].Trim()
        Set-Item -Path "env:$name" -Value $value
    }
}

# Validate required environment variables
$requiredVars = @('CLOUDFLARE_ACCOUNT_ID', 'CLOUDFLARE_API_TOKEN', 'R2_BUCKET_NAME')
foreach ($var in $requiredVars) {
    if (-not (Get-Item "env:$var" -ErrorAction SilentlyContinue)) {
        Write-Host "Error: Missing required environment variable: $var" -ForegroundColor Red
        exit 1
    }
}

$accountId = $env:CLOUDFLARE_ACCOUNT_ID
$apiToken = $env:CLOUDFLARE_API_TOKEN
$bucketName = $env:R2_BUCKET_NAME
$customDomain = $env:R2_CUSTOM_DOMAIN
$localPath = $env:LOCAL_VIDEO_PATH

if (-not $localPath) {
    $localPath = "public/work/loops"
}

Write-Host "=== Cloudflare R2 Video Migration ===" -ForegroundColor Cyan
Write-Host "Account ID: $accountId" -ForegroundColor Gray
Write-Host "Bucket: $bucketName" -ForegroundColor Gray
Write-Host "Local path: $localPath" -ForegroundColor Gray
Write-Host ""

# Check if wrangler is installed
if (-not (Get-Command wrangler -ErrorAction SilentlyContinue)) {
    Write-Host "Error: wrangler CLI not found. Please install it first:" -ForegroundColor Red
    Write-Host "npm install -g wrangler" -ForegroundColor Yellow
    exit 1
}

# Check if local video directory exists
if (-not (Test-Path $localPath)) {
    Write-Host "Error: Local video directory not found: $localPath" -ForegroundColor Red
    exit 1
}

# Get all video files
$videoFiles = Get-ChildItem -Path $localPath -Filter *.mp4 -Recurse
$videoCount = $videoFiles.Count

if ($videoCount -eq 0) {
    Write-Host "No video files found in $localPath" -ForegroundColor Yellow
    exit 0
}

Write-Host "Found $videoCount video files to upload" -ForegroundColor Green
$totalSize = ($videoFiles | Measure-Object -Property Length -Sum).Sum
Write-Host "Total size: $([math]::Round($totalSize/1MB, 2)) MB" -ForegroundColor Green
Write-Host ""

# Create bucket if it doesn't exist
Write-Host "Checking if bucket exists..." -ForegroundColor Cyan
$env:CLOUDFLARE_ACCOUNT_ID = $accountId
$bucketExists = wrangler r2 bucket list 2>&1 | Select-String $bucketName
if (-not $bucketExists) {
    Write-Host "Creating bucket: $bucketName" -ForegroundColor Yellow
    wrangler r2 bucket create $bucketName
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error creating bucket" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "Bucket already exists" -ForegroundColor Green
}

Write-Host ""

# Upload files
Write-Host "Starting upload..." -ForegroundColor Cyan
$uploadedFiles = @{}
$uploadCount = 0

foreach ($file in $videoFiles) {
    $uploadCount++
    $fileName = $file.Name
    $relativePath = $file.FullName.Replace((Get-Location).Path + "\", "").Replace("\", "/")
    
    Write-Host "[$uploadCount/$videoCount] Uploading $fileName ($([math]::Round($file.Length/1KB, 2)) KB)..." -ForegroundColor Yellow
    
    # Upload to R2
    $env:CLOUDFLARE_ACCOUNT_ID = $accountId
    $result = wrangler r2 object put "$bucketName/$fileName" --file="$($file.FullName)" 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  Uploaded successfully" -ForegroundColor Green
        
        # Store mapping
        $localPath = "/work/loops/$fileName"
        if ($customDomain) {
            $remoteUrl = "$customDomain/$fileName"
        } else {
            $remoteUrl = "https://$accountId.r2.cloudflarestorage.com/$bucketName/$fileName"
        }
        $uploadedFiles[$localPath] = $remoteUrl
    } else {
        Write-Host "  Upload failed: $result" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Upload complete! Uploaded $($uploadedFiles.Count) files" -ForegroundColor Green
Write-Host ""

# Generate mapping file
$mappingFile = "video-url-mapping.json"
$uploadedFiles | ConvertTo-Json -Depth 3 | Out-File -FilePath $mappingFile -Encoding utf8
Write-Host "URL mapping saved to: $mappingFile" -ForegroundColor Cyan

# Display mapping
Write-Host ""
Write-Host "URL Mapping:" -ForegroundColor Cyan
Write-Host "-------------"
foreach ($key in $uploadedFiles.Keys) {
    Write-Host "$key -> $($uploadedFiles[$key])" -ForegroundColor Gray
}

Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Review the URL mapping above" -ForegroundColor White
Write-Host "2. Set R2_CUSTOM_DOMAIN in .env if you want to use a custom domain" -ForegroundColor White
Write-Host "3. Run: .\update-video-urls.ps1 to update the codebase" -ForegroundColor White
Write-Host "4. Test the website to ensure videos load correctly" -ForegroundColor White
Write-Host "5. If everything works, you can delete the local videos manually" -ForegroundColor White