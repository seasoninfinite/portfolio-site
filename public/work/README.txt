WHERE TO PUT YOUR FILES (same folder as this file)

IMPORTANT FOR NETLIFY / PRODUCTION
---------------------------------
Git must contain these files or they will 404 on the live site (localhost can still work if you only have them on your PC).

1) VIDEO LOOPS — commit everything under public/work/loops/
   Filenames are listed in src/data/work-content.ts (animatedLoopVideos).
   If MP4s are missing, the site shows a still image (Unsplash) instead — add the real loops for autoplay.

2) SCREENSHOTS — commit everything under public/work/screenshots/
   Used by the static gallery below the marquee; paths are in staticWorkItems in work-content.ts.
   If a PNG is missing, the gallery uses the Unsplash fallbackImageSrc from the same file.

3) Large files: use Git LFS if your host limits repo size, or host assets on a CDN and update paths in work-content.ts.
