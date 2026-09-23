#!/usr/bin/env python3
"""Patch HTML for font loading, favicons, WebP sources, and lazy images."""

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def font_links(indent: str, font_href: str) -> str:
    return (
        f"{indent}<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n"
        f"{indent}<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n"
        f"{indent}<link rel=\"preload\" href=\"{font_href}\" as=\"font\" type=\"font/ttf\" crossorigin>\n"
        f"{indent}<link href=\"https://fonts.googleapis.com/css2?family=Libre+Barcode+128+Text&display=swap\" rel=\"stylesheet\">\n"
    )


def patch_head(text: str, is_page: bool) -> str:
    indent = "        " if is_page else "    "
    font_href = "../font/Elm-Mono.ttf" if is_page else "font/Elm-Mono.ttf"
    icon_href = "../Image/icon.png" if is_page else "Image/icon.png"

    text = re.sub(
        r"[ \t]*<link rel=\"stylesheet\" href=\"https://use\.typekit\.net/lwm3pvk\.css\">\s*\n",
        "",
        text,
    )

    if "fonts.googleapis.com" not in text:
        text = re.sub(
            r'(<meta name="viewport"[^>]*>\s*\n)',
            r"\1" + font_links(indent, font_href),
            text,
            count=1,
        )

    text = re.sub(
        r'<link rel="icon"[^>]*>',
        f'<link rel="icon" type="image/png" href="{icon_href}">',
        text,
        count=1,
    )
    return text


def webp_if_exists(url: str) -> str:
    if url.lower().endswith(".webp") or url.lower().endswith("icon.png"):
        return url
    if not re.search(r'\.(png|jpe?g)(\?|$)', url, re.I):
        return url

    rel = url.split("?")[0]
    candidates = [ROOT / rel, ROOT / "Pages" / rel]
    for path in candidates:
        webp = Path(str(path) + ".webp")
        if webp.exists():
            return url + ".webp" if "?" not in url else url.replace("?", ".webp?", 1)
    return url


def patch_images(text: str) -> str:
    def repl_src(match):
        attr, quote, url = match.group(1), match.group(2), match.group(3)
        return f'{attr}={quote}{webp_if_exists(url)}{quote}'

    text = re.sub(
        r'\b(src|data-src)=(["\'])([^"\']+)\2',
        repl_src,
        text,
    )

    def add_lazy(match):
        tag = match.group(0)
        if 'id="enlargedImage"' in tag or "modal-content" in tag:
            return tag
        if "loading=" not in tag:
            tag = tag.replace("<img", "<img loading=\"lazy\" decoding=\"async\"", 1)
        elif "decoding=" not in tag:
            tag = tag.replace("<img", "<img decoding=\"async\"", 1)
        return tag

    text = re.sub(r"<img\b[^>]*>", add_lazy, text, flags=re.I)
    return text


def main():
    files = [ROOT / "index.html", *sorted((ROOT / "Pages").glob("*.html"))]
    for path in files:
        if path.name.startswith("footerTest"):
            continue
        original = path.read_text()
        is_page = path.parent.name == "Pages"
        updated = patch_head(original, is_page)
        updated = patch_images(updated)
        if updated != original:
            path.write_text(updated)
            print(f"updated {path.relative_to(ROOT)}")
        else:
            print(f"unchanged {path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
