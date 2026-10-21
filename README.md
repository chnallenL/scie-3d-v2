# SCIE Digital Twin — Clean Organized Edition

An interactive, static demonstration for SCIE leadership.

## What changed
- **Overview:** Project concept + Blender-inspired campus + six organized demo links.
- **Function pages:** Interactive demonstration first, **Technical Implementation** and **Leadership Decision** below it.
- **Implementation cards:** Steps, estimated duration, school support, success evidence, cost/dependencies and fallback.
- **Decision page:** 15 independently assessable work packages with Proceed / Pilot / Defer / Drop decisions; export CSV.
- **Leadership:** Digital Twin 101, architecture, 3 case studies, pilot roadmap, school support, Q&A and risks.

## Project status
- 3D browser scene: approximate model based on student-supplied Blender screenshot, not exported architectural data.
- Actual Blender modelling target: end of 2026.
- All energy, environmental, timetable, elevator and ticket data are fictional demonstration data.
- No live school information is connected. No sensitive real student data is stored.

## Deploy on Vercel
1. Extract the ZIP. The files should be at the **repository root**, so `index.html` is at the top level.
2. Push all extracted files to a GitHub repository (including `assets`).
3. In Vercel: **Add New → Project → Import repository**.
4. Select **Framework: Other**; keep root directory `./`; no build command or environment variables are required.
5. Click **Deploy**. This creates a new project; it does not alter the team's existing demo unless you explicitly import into the original Vercel project.

`index.html` imports `style.css`, `premium.css`, `redesign.css`, `scene.js`, and `app.js`.

The standalone `SCIE_Digital_Twin_Clean_Interactive_Demo.html` file is also provided for offline preview.
