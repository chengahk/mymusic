from pathlib import Path
import json, re, mimetypes
from mutagen import File as AudioFile

ROOT=Path(__file__).resolve().parents[1]
MUSIC=ROOT/"music"; COVERS=ROOT/"covers"; COVERS.mkdir(exist_ok=True)
def tag(tags,*keys):
    for k in keys:
        try:
            v=tags.get(k)
            if v: return str(v[0] if isinstance(v,list) else v).strip()
        except Exception: pass
    return ""
def extract_cover(path):
    try:
        audio=AudioFile(path)
        tags=getattr(audio,"tags",None)
        if not tags:return ""
        data=mime=None
        if hasattr(tags,"getall"):
            pics=tags.getall("APIC")
            if pics:data,mime=pics[0].data,pics[0].mime
        if not data and tags.get("covr"):
            data=bytes(tags["covr"][0]);mime="image/jpeg"
        if not data:return ""
        ext=mimetypes.guess_extension(mime or "image/jpeg") or ".jpg"
        name=re.sub(r"[^A-Za-z0-9._-]+","_",path.stem)[:65]+ext
        (COVERS/name).write_bytes(data)
        return "covers/"+name
    except Exception:return ""
rows=[]
for p in sorted(MUSIC.iterdir()):
    if not p.is_file() or p.suffix.lower() not in {".mp3",".m4a",".flac",".ogg",".wav"}:continue
    try:a=AudioFile(p,easy=True);t=a.tags if a else None
    except Exception:a=None;t=None
    title=tag(t,"title") or p.stem.replace("_"," ")
    artist=tag(t,"artist","albumartist") or "Unknown artist"
    album=tag(t,"album") or "My Collection"
    genre=tag(t,"genre") or "Uncategorized"
    duration=round(a.info.length) if a and getattr(a,"info",None) else 0
    rows.append({"id":re.sub(r"[^a-z0-9]+","-",p.stem.lower()).strip("-"),"title":title,"artist":artist,"album":album,"genre":genre,"duration":duration,"file":"music/"+p.name,"cover":extract_cover(p),"playlist":genre})
(ROOT/"songs.json").write_text(json.dumps(rows,ensure_ascii=False,indent=2),encoding="utf-8")
print(f"Generated catalogue for {len(rows)} audio files.")
