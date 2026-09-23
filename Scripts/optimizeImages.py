#!/usr/bin/env python3
"""Generate resized WebP companions for raster images under Image/."""

import os
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "Image"
MAX_EDGE = 1400
QUALITY = 80
SRC_EXTS = {".png", ".jpg", ".jpeg"}


def sips_dims(path: Path):
    try:
        out = subprocess.check_output(
            ["sips", "-g", "pixelWidth", "-g", "pixelHeight", str(path)],
            text=True,
            stderr=subprocess.DEVNULL,
        )
    except subprocess.CalledProcessError:
        return 0, 0
    width = height = 0
    for line in out.splitlines():
        if "pixelWidth" in line:
            width = int(line.split()[-1])
        elif "pixelHeight" in line:
            height = int(line.split()[-1])
    return width, height


def convert(src: Path) -> str:
    dest = Path(str(src) + ".webp")
    width, height = sips_dims(src)
    if width <= 0 or height <= 0:
        return f"skip (no dims): {src}"

    existing_w, existing_h = sips_dims(dest) if dest.exists() else (0, 0)
    target_w, target_h = width, height
    if max(width, height) > MAX_EDGE:
        if width >= height:
            target_w, target_h = MAX_EDGE, 0
        else:
            target_w, target_h = 0, MAX_EDGE

    needs_resize = max(width, height) > MAX_EDGE
    already_good = (
        dest.exists()
        and dest.stat().st_size > 0
        and existing_w > 0
        and max(existing_w, existing_h) <= MAX_EDGE
        and dest.stat().st_mtime >= src.stat().st_mtime
        and dest.stat().st_size < src.stat().st_size
    )
    if already_good:
        return f"keep: {dest}"

    cmd = ["cwebp", "-quiet", "-q", str(QUALITY), "-m", "4"]
    if needs_resize:
        cmd += ["-resize", str(target_w), str(target_h)]
    cmd += [str(src), "-o", str(dest)]

    try:
        subprocess.run(cmd, check=True, capture_output=True)
    except subprocess.CalledProcessError as err:
        return f"fail: {src} ({err.stderr.decode(errors='replace')[:120]})"

    src_kb = src.stat().st_size / 1024
    dest_kb = dest.stat().st_size / 1024
    return f"ok: {src} {src_kb:.0f}KB -> {dest_kb:.0f}KB"


def main():
    files = sorted(
        p
        for p in ROOT.rglob("*")
        if p.is_file() and p.suffix.lower() in SRC_EXTS
    )
    print(f"Converting {len(files)} images (max edge {MAX_EDGE}px, q{QUALITY})")
    ok = fail = keep = 0
    for path in files:
        result = convert(path)
        print(result, flush=True)
        if result.startswith("ok"):
            ok += 1
        elif result.startswith("keep"):
            keep += 1
        else:
            fail += 1
    print(f"\nDone. converted={ok} kept={keep} failed={fail}")
    return 0 if fail == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
