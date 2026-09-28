Research-line figures. The site only references the .webp files; the PNG/JPG
sources next to them are the originals they were converted from.

Each line has a full figure (research page, max width 1600px) and, optionally,
a separate home-page version (`card_image`, max width 1200px). The home-page
card always shows the whole figure (no cropping), so a home version is only
needed when a simpler/smaller cut reads better at card size. Paths, captions
and the paper each figure links to live in `_data/research_lines.yml`.

| Line     | Research page (full)                      | Home page                                        | Source files                         |
|----------|-------------------------------------------|--------------------------------------------------|--------------------------------------|
| minerals | minerals-map.webp                         | minerals-map-card.webp                           | 1-Map_minerals.png, 1-Map_minerals-home.png |
| circular | circular-recycling-capacity.webp          | (same as full)                                   | 2-circular.png                       |
| health   | health-pm25-mortality.webp                | (same as full)                                   | 3-health.png                         |
| decarb   | decarb-hydrogen-carbon-intensity.webp     | decarb-hydrogen-carbon-intensity-card.webp       | 4-decarb.png, 4-decarb-home.png      |

To replace a figure: save the new PNG here, convert it to WebP at the widths
above (e.g. Pillow: `Image.open(p).convert("RGB").save(out, quality=85)` after
resizing), and point `image` / `card_image` at it.
