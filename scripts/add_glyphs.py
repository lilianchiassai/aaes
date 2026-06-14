#!/usr/bin/env python3
"""
Add French accent glyphs (and a few typographic extras) to the "28 Days Later"
display font, which ships with only A-Z a-z 0-9 and no diacritics.

Strategy: draw 5 heavy diacritic marks sized to the font's weight, then build
each accented letter as a TrueType *composite* of [base glyph] + [accent],
centred over the base and sat just above its cap. Also add OE/oe ligatures,
the curly apostrophe, en/em dashes and a superscript "e" (for "2ᵉ").

Run: python3 scripts/add_glyphs.py <in.ttf> <out.ttf>
"""
import sys
from fontTools.ttLib import TTFont
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.pens.boundsPen import BoundsPen

IN, OUT = sys.argv[1], sys.argv[2]
font = TTFont(IN)
glyf = font["glyf"]
hmtx = font["hmtx"]
gs = font.getGlyphSet()
order = font.getGlyphOrder()

UPM = font["head"].unitsPerEm  # 4096

def bbox(name):
    p = BoundsPen(gs)
    gs[name].draw(p)
    return p.bounds  # (xMin,yMin,xMax,yMax) or None

# Per-letter geometry so accents centre + sit correctly on each base glyph.
def cx(name):  # horizontal centre of base glyph
    b = bbox(name); return (b[0] + b[2]) / 2.0
def top(name):
    return bbox(name)[3]
def bottom(name):
    return bbox(name)[1]
def adv(name):
    return hmtx[name][0]

# ---------------------------------------------------------------- diacritics
# Each "above" accent is drawn anchored at bottom-centre = (0,0), symmetric in
# x, growing upward. Heavy strokes to match the font. (UPM 4096.)
GAP = 60          # gap between cap top and accent bottom
def draw_simple(contours):
    pen = TTGlyphPen(glyf.glyphs)
    for pts in contours:
        pen.moveTo(pts[0])
        for p in pts[1:]:
            pen.lineTo(p)
        pen.closePath()
    return pen.glyph()

ACUTE = [[(-200, 0), (40, 0), (220, 520), (-20, 520)]]               # leans right /
GRAVE = [[(-220, 520), (20, 520), (200, 0), (-40, 0)]]               # leans left  \
CIRCUMFLEX = [[(-330, 0), (0, 540), (330, 0), (150, 0), (0, 320), (-150, 0)]]  # ^
DIERESIS = [[(-300, 60), (-100, 60), (-100, 420), (-300, 420)],      # two blocks ¨
            [(100, 60), (300, 60), (300, 420), (100, 420)]]
# cedilla: anchored top-centre (0,0), hangs downward as a hook ¸
CEDILLA = [[(40, 0), (190, 0), (190, -360), (-130, -360), (-130, -230), (40, -230)]]

new_simple = {
    "acutecomb": ACUTE, "gravecomb": GRAVE, "circumflexcomb": CIRCUMFLEX,
    "dieresiscomb": DIERESIS, "cedillacomb": CEDILLA,
}
for gname, contours in new_simple.items():
    glyf[gname] = draw_simple(contours)
    hmtx[gname] = (0, 0)
    if gname not in order:
        order.append(gname)

# ---- standalone typographic glyphs (dashes, apostrophe) -------------------
# bars centred on the cap optical centre (~1900)
def rect(x0, y0, x1, y1):
    return [[(x0, y0), (x1, y0), (x1, y1), (x0, y1)]]

BAR_Y0, BAR_Y1 = 1740, 2040
standalone = {
    # endash: ~half-em bar
    "endash": (rect(150, BAR_Y0, 1450, BAR_Y1), 1600),
    # emdash: full bar
    "emdash": (rect(120, BAR_Y0, 1928, BAR_Y1), 2048),
    # quoteright (curly apostrophe): a short heavy slash up high
    "quoteright": ([[(120, 2860), (340, 2860), (300, 3560), (120, 3560)]], 560),
}
for gname, (contours, advance) in standalone.items():
    glyf[gname] = draw_simple(contours)
    hmtx[gname] = (advance, min(p[0] for c in contours for p in c))
    if gname not in order:
        order.append(gname)

# ----------------------------------------------------------- composites
def composite(components, advance, lsb=0):
    pen = TTGlyphPen(glyf.glyphs)
    for base, dx, dy, scale in components:
        if scale == 1.0:
            pen.addComponent(base, (1, 0, 0, 1, dx, dy))
        else:
            pen.addComponent(base, (scale, 0, 0, scale, dx, dy))
    g = pen.glyph()
    return g

# above-accent letters: (unicode, baseGlyph, accentGlyph)
ABOVE = []
def add_above(uni_upper, uni_lower, U, L, accent):
    ABOVE.append((uni_upper, U, accent))
    ABOVE.append((uni_lower, L, accent))

add_above(0x00C0, 0x00E0, "A", "a", "gravecomb")        # À à
add_above(0x00C2, 0x00E2, "A", "a", "circumflexcomb")   # Â â
add_above(0x00C4, 0x00E4, "A", "a", "dieresiscomb")     # Ä ä
add_above(0x00C9, 0x00E9, "E", "e", "acutecomb")        # É é
add_above(0x00C8, 0x00E8, "E", "e", "gravecomb")        # È è
add_above(0x00CA, 0x00EA, "E", "e", "circumflexcomb")   # Ê ê
add_above(0x00CB, 0x00EB, "E", "e", "dieresiscomb")     # Ë ë
add_above(0x00CE, 0x00EE, "I", "i", "circumflexcomb")   # Î î
add_above(0x00CF, 0x00EF, "I", "i", "dieresiscomb")     # Ï ï
add_above(0x00D4, 0x00F4, "O", "o", "circumflexcomb")   # Ô ô
add_above(0x00D6, 0x00F6, "O", "o", "dieresiscomb")     # Ö ö
add_above(0x00D9, 0x00F9, "U", "u", "gravecomb")        # Ù ù
add_above(0x00DB, 0x00FB, "U", "u", "circumflexcomb")   # Û û
add_above(0x00DC, 0x00FC, "U", "u", "dieresiscomb")     # Ü ü

uni_to_glyph = {}  # unicode -> new glyph name

for i, (uni, base, accent) in enumerate(ABOVE):
    gname = f"uni{uni:04X}"
    dx = round(cx(base))
    dy = round(top(base) + GAP)
    glyf[gname] = composite([(base, 0, 0, 1.0), (accent, dx, dy, 1.0)], adv(base))
    hmtx[gname] = (adv(base), bbox(base)[0])
    if gname not in order:
        order.append(gname)
    uni_to_glyph[uni] = gname

# cedilla letters Ç ç (accent below)
for uni, base in [(0x00C7, "C"), (0x00E7, "c")]:
    gname = f"uni{uni:04X}"
    dx = round(cx(base))
    dy = round(bottom(base))
    glyf[gname] = composite([(base, 0, 0, 1.0), ("cedillacomb", dx, dy, 1.0)], adv(base))
    hmtx[gname] = (adv(base), bbox(base)[0])
    if gname not in order:
        order.append(gname)
    uni_to_glyph[uni] = gname

# OE / oe ligatures — overlap base O + E
for uni, A, B in [(0x0152, "O", "E"), (0x0153, "o", "e")]:
    gname = f"uni{uni:04X}"
    overlap = 320
    dxB = round(bbox(A)[2] - overlap)
    advance = dxB + adv(B) - 200
    glyf[gname] = composite([(A, 0, 0, 1.0), (B, dxB, 0, 1.0)], advance)
    hmtx[gname] = (advance, bbox(A)[0])
    if gname not in order:
        order.append(gname)
    uni_to_glyph[uni] = gname

# superscript e (U+1D49) — scaled, raised
sc = 0.62
e_top = top("e") * sc
dy = round(3300 - e_top)
gname = "uni1D49"
advance = round(adv("e") * sc) + 80
glyf[gname] = composite([("e", 80, dy, sc)], advance)
hmtx[gname] = (advance, 0)
if gname not in order:
    order.append(gname)
uni_to_glyph[0x1D49] = gname

# direct standalone mappings
uni_to_glyph[0x2019] = "quoteright"
uni_to_glyph[0x2013] = "endash"
uni_to_glyph[0x2014] = "emdash"

font.setGlyphOrder(order)

# ----------------------------------------------------------- cmap
for sub in font["cmap"].tables:
    if (sub.platformID, sub.platEncID) == (3, 1):       # Windows BMP — browsers use this
        for uni, gname in uni_to_glyph.items():
            sub.cmap[uni] = gname
    elif (sub.platformID, sub.platEncID) == (1, 0):     # Mac Roman — only Latin-1
        for uni, gname in uni_to_glyph.items():
            if uni < 0x100:
                sub.cmap[uni] = gname

# ----------------------------------------------------------- table housekeeping
# recompute bounds for every new glyph (simple + composite)
for gname in list(new_simple) + list(standalone) + list(uni_to_glyph.values()):
    glyf[gname].recalcBounds(glyf)

font["maxp"].numGlyphs = len(order)
font["maxp"].maxComponentElements = max(2, font["maxp"].maxComponentElements)
font["maxp"].maxComponentDepth = max(1, font["maxp"].maxComponentDepth)
font["hhea"].numberOfHMetrics = len(order)  # full metrics, avoids trailing-dup logic

font.save(OUT)
print(f"Saved {OUT}: {len(order)} glyphs (+{len(order)-67}). Added {len(uni_to_glyph)} cmap entries.")
