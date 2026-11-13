MY MUSIC LIBRARY — UPLOAD GUIDE

CONTENTS
- index.html: the music player website
- songs.json: your song catalogue (edit this when you add songs)
- sw.js: offline website and audio caching
- manifest.webmanifest: installable web app settings
- music/: put your MP3 files here

IMPORTANT
1. Upload all files and the music folder to the ROOT of your GitHub repository.
2. Put every MP3 inside the music folder.
3. Edit songs.json. Each song entry needs a unique id, title, artist, file path and playlist.
4. The file path must match the filename exactly, including spaces, punctuation and letter case.
5. Commit/push changes, then open the GitHub Pages HTTPS website.
6. While online, tap Download all. Wait for each song to report as saved.
7. Test by turning on Airplane Mode and reopening the website.

ADD A SONG
Copy this pattern into songs.json, inside the outer [ ... ] array. Add a comma after the previous entry:
{
  "id": "unique-song-id",
  "title": "Song title",
  "artist": "Artist name",
  "album": "Album name",
  "file": "music/Exact MP3 filename.mp3",
  "cover": "",
  "playlist": "Worship"
}

The starter catalogue contains the one filename that was fully visible in your screenshot:
Zvandapihwa NaBaba Ndinotora.mp3

Your other two filenames were cut off in the screenshot, so add their exact names to songs.json after confirming them in GitHub.

OFFLINE NOTES
The website shell is cached by the service worker. Audio files are saved separately when you use Download all or the download arrow beside a song. Browser storage limits apply; large collections may not all fit. iPhone Safari may evict website storage, so periodically reconnect and verify downloads. Keep the site hosted on HTTPS (GitHub Pages).
