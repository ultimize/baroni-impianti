#!/usr/bin/env python3
"""Rigenera favicon.ico, icon.png e apple-icon.png dal cubo del logo Baroni."""
import os
from collections import deque
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

SRC = "src/app/apple-icon.png"
OUT = "src/app"
ORIG = "scripts/logo-originale.png"   # fuori da app/: dentro Next lo prenderebbe per una route
BRAND = (22, 22, 209)                 # blu del logo
MIN_FACE_AREA = 5000                  # sotto questa soglia sono le scritte, non il cubo

def estrai_cubo(path):
    """Tiene le tre facce del cubo e le lettere blu, scarta 'Baroni/Impianti/Elettrici'."""
    src = Image.open(path).convert("RGBA")
    a = np.array(src)
    rgb, alpha = a[:, :, :3].astype(int), a[:, :, 3]
    ink = (alpha > 40) & (rgb.sum(axis=2) < 620)
    blue = ink & ((rgb[:, :, 2] - np.maximum(rgb[:, :, 0], rgb[:, :, 1])) > 40)
    black = ink & ~blue

    H, W = black.shape
    lab = np.zeros((H, W), np.int32)
    keep_ids, cur = [], 0
    for y, x in zip(*np.where(black)):
        if lab[y, x]:
            continue
        cur += 1
        n, q = 0, deque([(y, x)])
        lab[y, x] = cur
        while q:
            cy, cx = q.popleft()
            n += 1
            for dy in (-1, 0, 1):
                for dx in (-1, 0, 1):
                    ny, nx = cy + dy, cx + dx
                    if 0 <= ny < H and 0 <= nx < W and black[ny, nx] and not lab[ny, nx]:
                        lab[ny, nx] = cur
                        q.append((ny, nx))
        if n > MIN_FACE_AREA:
            keep_ids.append(cur)

    facce = np.isin(lab, keep_ids)
    ys, xs = np.where(facce)
    y0, y1, x0, x1 = ys.min(), ys.max(), xs.min(), xs.max()
    dentro = np.zeros_like(blue)
    dentro[y0:y1 + 1, x0:x1 + 1] = True
    keep = facce | (blue & dentro)

    out = np.zeros_like(a)
    out[:, :, :3] = a[:, :, :3]
    out[:, :, 3] = np.where(keep, 255, 0)
    return Image.fromarray(out).crop((x0, y0, x1 + 1, y1 + 1))

def ispessisci(img, k):
    """A 16-32px il tratto sottile sparisce: lo allarghiamo prima di rimpicciolire."""
    if k <= 0:
        return img
    a = img.split()[3].filter(ImageFilter.MaxFilter(2 * k + 1))
    out = Image.new("RGBA", img.size, (255, 255, 255, 0))
    out.putalpha(a)
    return out

def tassello(mark, size, pad, raggio, k):
    bg = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    ImageDraw.Draw(bg).rounded_rectangle(
        [0, 0, size - 1, size - 1], radius=int(size * raggio), fill=BRAND + (255,))
    m = ispessisci(mark, k)
    inner = max(1, int(size * (1 - 2 * pad)))
    m.thumbnail((inner, inner), Image.LANCZOS)
    bianco = Image.new("RGBA", m.size, (255, 255, 255, 255))
    bianco.putalpha(m.split()[3])
    bg.paste(bianco, ((size - m.width) // 2, (size - m.height) // 2), bianco)
    return bg

def main():
    if not os.path.exists(SRC):
        raise SystemExit(f"Non trovo {SRC}. Lancia lo script dalla root del progetto.")
    if not os.path.exists(ORIG):
        Image.open(SRC).save(ORIG)
        print(f"logo originale messo al sicuro in {ORIG}")
    mark = estrai_cubo(ORIG)
    print(f"cubo estratto: {mark.size[0]}x{mark.size[1]}px")

    f16 = tassello(mark, 16, 0.08, 0.16, 5)
    f32 = tassello(mark, 32, 0.10, 0.18, 3)
    f48 = tassello(mark, 48, 0.12, 0.19, 1)
    f64 = tassello(mark, 64, 0.13, 0.20, 1)
    f64.save(f"{OUT}/favicon.ico", format="ICO",
             sizes=[(16, 16), (32, 32), (48, 48), (64, 64)],
             append_images=[f16, f32, f48])

    tassello(mark, 512, 0.15, 0.22, 0).save(f"{OUT}/icon.png", optimize=True)

    ap = Image.new("RGB", (180, 180), BRAND)   # iOS non gestisce la trasparenza
    m = mark.copy()
    m.thumbnail((132, 132), Image.LANCZOS)
    bianco = Image.new("RGBA", m.size, (255, 255, 255, 255))
    bianco.putalpha(m.split()[3])
    ap.paste(bianco, ((180 - m.width) // 2, (180 - m.height) // 2), bianco)
    ap.save(f"{OUT}/apple-icon.png", optimize=True)

    for f in ("favicon.ico", "icon.png", "apple-icon.png"):
        p = f"{OUT}/{f}"
        print(f"  {p:28} {os.path.getsize(p):>7} byte  {Image.open(p).size}")

if __name__ == "__main__":
    main()
