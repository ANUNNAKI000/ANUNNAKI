# ANUNNAKI — Cairo Underground

> Not just sneakers. A full party experience. Opening 1.1.2027.

## Stack
Pure **HTML5 / CSS3 / Vanilla JS** — zero dependencies, no build step.  
**Supabase** for waitlist storage.

## File Structure
```
anunnaki/
├── index.html          ← Main page
├── css/
│   └── style.css       ← All styles
├── js/
│   ├── canvas.js       ← Space particle background
│   ├── intro.js        ← Intro sequence + scroll observer + BPM bars
│   ├── countdown.js    ← Live countdown to 1.1.2027
│   └── form.js         ← Supabase waitlist submission
├── assets/
│   └── logo.png        ← ANUNNAKI logo (transparent PNG)
├── .gitignore
└── README.md
```

## Quick Start
```bash
# Clone
git clone https://github.com/YOUR_USERNAME/anunnaki.git
cd anunnaki

# Open directly — no server needed for local preview
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux
```

## Deploy to GitHub Pages
1. Push repo to GitHub  
2. Go to **Settings → Pages → Source → main / root**  
3. Site goes live at `https://YOUR_USERNAME.github.io/anunnaki`

## Deploy to Netlify (drag & drop)
1. Go to [netlify.com](https://netlify.com)  
2. Drag the `anunnaki/` folder onto the deploy area  
3. Live in seconds ⚡

## Supabase Config
| Key | Value |
|-----|-------|
| Project URL | `https://qxfxrtihgvjxprgpdpmh.supabase.co` |
| Table | `waitlist` |
| Fields | `name`, `instagram`, `whatsapp`, `created_at` |

## Brand
| Color   | Hex       |
|---------|-----------|
| Green   | `#00ff41` |
| Purple  | `#b400ff` |
| Cyan    | `#00e5ff` |

## Links
- Instagram: [@anunnaki_party](https://www.instagram.com/anunnaki_party)
- WhatsApp: +201014765526
- Opening: **1.1.2027 — Cairo, Egypt**

---
© ANUNNAKI 2027 · Cairo, Egypt
