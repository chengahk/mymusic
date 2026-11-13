MY MUSIC LIBRARY — AUTOMATIC DISCOVERY EDITION

UPLOAD THE CONTENTS OF THIS FOLDER TO THE ROOT OF YOUR EXISTING GITHUB REPOSITORY. Keep your existing MP3 files in music/; do not delete them.

NEW FEATURES
- Automatic catalogue generation after audio uploads
- Reads embedded metadata: title, artist, album, genre and duration
- Extracts embedded album artwork to covers/
- Artist and genre browsing
- Custom playlists, favorites and recently played
- Individual and bulk offline downloads

FILES/FOLDERS TO UPLOAD
index.html, sw.js, songs.json, manifest.webmanifest, scripts/, .github/workflows/, covers/, and music/.
The music folder in this ZIP contains only an instruction file; retain the real MP3 files already in your GitHub repository.

AUTOMATIC DISCOVERY
1. Upload MP3/M4A/FLAC/OGG/WAV files into the GitHub music/ folder.
2. Commit the upload to the main branch.
3. In GitHub, open Actions and wait for "Build music catalogue" to complete.
4. The workflow scans music/, reads tags and embedded artwork, then commits an updated songs.json.
5. Refresh the GitHub Pages website.

If Actions cannot push the generated catalogue, open repository Settings > Actions > General > Workflow permissions and select "Read and write permissions". Ensure Actions are enabled.

METADATA AND ARTWORK
Automatic discovery means the workflow detects files in music/. It does not identify unknown songs by listening to them. For good artist/title/genre/artwork details, MP3s need embedded ID3 metadata and embedded cover art. Untagged files use their filename as the title and "Unknown artist"/"Uncategorized" as defaults.

PLAYLISTS, FAVORITES AND RECENTLY PLAYED
These are saved in browser local storage on each device. They do not automatically sync between your computer and iPhone.

OFFLINE
Open the HTTPS GitHub Pages site while online. Tap Download all or the arrow beside an individual track, wait for the saved confirmation, then test in Airplane Mode. Browser storage quotas apply; iPhone Safari may evict site data. Keep your original MP3 backups.

GitHub Pages serves the site; this version continues to use your GitHub repository for the audio files. GitHub is not an unlimited music host, so keep an eye on repository size and bandwidth.
