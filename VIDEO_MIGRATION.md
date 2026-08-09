# Video Migration to Cloudflare R2

This guide will help you migrate your portfolio videos to Cloudflare R2 for faster loading and better performance.

## Current Video Status

- **Total files**: 14 MP4 files
- **Total size**: 72.49 MB
- **Location**: `public/work/loops/`
- **Files affected**: 
  - `src/data/work-content.ts` (15 references)
  - `src/data/priority-videos.ts` (2 references)

## Why Migrate to R2?

1. **Faster loading**: CDN serves videos from servers closer to users
2. **Better performance**: Reduces initial page load time
3. **Scalability**: Handles bandwidth more efficiently than local hosting
4. **Cost-effective**: R2 has generous free tier and low egress fees

## Prerequisites

1. **Cloudflare Account**: Create a free account at https://dash.cloudflare.com/
2. **Install Wrangler CLI**:
   ```powershell
   npm install -g wrangler
   ```

## Setup Instructions

### Step 1: Get Cloudflare Credentials

1. Log in to Cloudflare: https://dash.cloudflare.com/
2. Get your **Account ID** from the dashboard (right sidebar)
3. Create an **API Token**:
   - Go to: https://dash.cloudflare.com/profile/api-tokens
   - Click "Create Token"
   - Use template: "Edit Cloudflare Workers" (or custom with R2 permissions)
   - Required permissions:
     - Account - R2 - Edit
   - Copy the generated token

### Step 2: Configure Environment

1. Copy the example environment file:
   ```powershell
   copy .env.example .env
   ```

2. Edit `.env` and fill in your credentials:
   ```
   CLOUDFLARE_ACCOUNT_ID=your_actual_account_id
   CLOUDFLARE_API_TOKEN=your_actual_api_token
   R2_BUCKET_NAME=portfolio-videos
   R2_CUSTOM_DOMAIN=                    # Optional: leave empty if not using custom domain
   LOCAL_VIDEO_PATH=public/work/loops  # Keep as is
   ```

### Step 3: Create R2 Bucket

The script will create the bucket automatically, but you can also create it manually:

```powershell
wrangler r2 bucket create portfolio-videos --accountId YOUR_ACCOUNT_ID
```

### Step 4: Run Migration

1. **Upload videos to R2**:
   ```powershell
   .\migrate-videos-to-r2.ps1
   ```

   This will:
   - Upload all 14 video files to R2
   - Generate a URL mapping file (`video-url-mapping.json`)
   - Show progress for each file
   - Handle filenames safely

2. **Update source code**:
   ```powershell
   .\update-video-urls.ps1
   ```

   This will:
   - Create a backup of modified files
   - Update all video references in your code
   - Replace local paths with R2 URLs
   - Show which files were modified

### Step 5: Test the Changes

1. Start your dev server:
   ```powershell
   npm run dev
   ```

2. Check the browser console to verify videos load from R2 URLs
3. Test video playback, autoplay, and looping behavior
4. Verify mobile compatibility

### Step 6: Clean Up (Optional)

Once you've verified everything works:

1. Delete local video files:
   ```powershell
   Remove-Item public\work\loops\*.mp4
   ```

2. Remove the empty loops directory if desired

## Custom Domain Setup (Optional)

If you want to use a custom domain for your videos:

1. Set up a custom domain in Cloudflare R2:
   - Go to your R2 bucket in Cloudflare dashboard
   - Click "Settings" → "Public Access"
   - Add your custom domain (e.g., `cdn.yourdomain.com`)

2. Update your `.env` file:
   ```
   R2_CUSTOM_DOMAIN=https://cdn.yourdomain.com
   ```

3. Re-run the URL update script:
   ```powershell
   .\update-video-urls.ps1
   ```

## Troubleshooting

### "wrangler command not found"
Install wrangler CLI:
```powershell
npm install -g wrangler
```

### "Authentication failed"
- Verify your API token has R2 permissions
- Check that your Account ID is correct
- Ensure your API token hasn't expired

### "Upload failed"
- Check your internet connection
- Verify bucket name doesn't conflict with existing buckets
- Ensure you have sufficient R2 storage quota

### Videos not loading after migration
- Check browser console for errors
- Verify R2 bucket has public access enabled
- Check that URLs in source code are correct
- Ensure video files exist in R2 bucket

### Need to restore original files
```powershell
Copy-Item backup_YYYYMMDD_HHMMSS\* src\data\
```

## File Changes Summary

**Files that will be modified:**
- `src/data/work-content.ts` - Updates 15 video URLs
- `src/data/priority-videos.ts` - Updates 2 video URLs

**Backup location:**
- `backup_YYYYMMDD_HHMMSS/` - Contains original files before modification

**Generated files:**
- `video-url-mapping.json` - Maps local paths to remote URLs
- `.env` - Your Cloudflare credentials (not in git)

## Performance Impact

After migration:
- **Initial page load**: Significantly faster (videos not bundled)
- **Video loading**: Streamed from CDN (faster start, less buffering)
- **Bandwidth**: Offloaded to Cloudflare's network
- **Scalability**: Can handle more concurrent users

## Security Notes

- **Never commit `.env` file** to git (it's in `.gitignore`)
- **API tokens** should be kept secure and rotated periodically
- **R2 bucket** should have appropriate public access settings
- **Custom domain** should use HTTPS for security

## Next Steps After Migration

1. Monitor your R2 usage in Cloudflare dashboard
2. Set up usage alerts if you expect high traffic
3. Consider implementing video lazy-loading if you add more videos
4. Optimize video file sizes if needed (current videos are reasonable for short loops)