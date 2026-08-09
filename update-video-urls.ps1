# Update Video URLs in Source Code
# This script updates the codebase to use remote R2 URLs instead of local paths

param(
    [string]$MappingFile = "video-url-mapping.json",
    [string]$CustomDomain = $null
)

# Check if mapping file exists
if (-not (Test-Path $MappingFile)) {
    Write-Host "Error: Mapping file not found: $MappingFile" -ForegroundColor Red
    Write-Host "Please run migrate-videos-to-r2.ps1 first to generate the mapping." -ForegroundColor Yellow
    exit 1
}

# Load mapping
$mapping = Get-Content $MappingFile | ConvertFrom-Json

if ($mapping.Count -eq 0) {
    Write-Host "Error: No URL mappings found in $MappingFile" -ForegroundColor Red
    exit 1
}

Write-Host "=== Update Video URLs in Source Code ===" -ForegroundColor Cyan
Write-Host "Found $($mapping.Count) URL mappings" -ForegroundColor Green
Write-Host ""

# Load custom domain from .env if not provided
if (-not $CustomDomain -and (Test-Path ".env")) {
    Get-Content ".env" | ForEach-Object {
        if ($_ -match '^R2_CUSTOM_DOMAIN=(.*)$') {
            $CustomDomain = $matches[1].Trim()
        }
    }
}

# Create backup
$backupTimestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$backupDir = "backup_$backupTimestamp"
Write-Host "Creating backup: $backupDir" -ForegroundColor Yellow
New-Item -ItemType Directory -Path $backupDir -Force | Out-Null

# Files to update
$filesToUpdate = @(
    "src/data/work-content.ts",
    "src/data/priority-videos.ts"
)

$updatedCount = 0

foreach ($file in $filesToUpdate) {
    if (Test-Path $file) {
        Write-Host "Processing: $file" -ForegroundColor Cyan
        
        # Backup the file
        $backupFile = "$backupDir\$((Split-Path $file -Leaf))"
        Copy-Item $file $backupFile
        Write-Host "  Backed up to: $backupFile" -ForegroundColor Gray
        
        # Read file content
        $content = Get-Content $file -Raw
        $originalContent = $content
        
        # Replace URLs
        foreach ($localPath in $mapping.Keys) {
            $remoteUrl = $mapping[$localPath]
            
            # If custom domain is provided, replace the domain part
            if ($CustomDomain) {
                $fileName = Split-Path $localPath -Leaf
                $remoteUrl = "$CustomDomain/$fileName"
            }
            
            $content = $content -replace [regex]::Escape($localPath), $remoteUrl
        }
        
        # Only write if content changed
        if ($content -ne $originalContent) {
            $content | Out-File $file -Encoding utf8 -NoNewline
            Write-Host "  Updated $file" -ForegroundColor Green
            $updatedCount++
        } else {
            Write-Host "  No changes needed for $file" -ForegroundColor Gray
        }
    } else {
        Write-Host "  File not found: $file" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "Update complete! Modified $updatedCount files" -ForegroundColor Green
Write-Host "Backup saved to: $backupDir" -ForegroundColor Cyan

Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Review the changes in the updated files" -ForegroundColor White
Write-Host "2. Run your dev server to test: npm run dev" -ForegroundColor White
Write-Host "3. Verify videos load from the remote URLs" -ForegroundColor White
Write-Host "4. If everything works, you can delete the local videos" -ForegroundColor White
Write-Host "5. If there are issues, restore from backup" -ForegroundColor White