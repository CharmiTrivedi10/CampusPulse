# ⚡ CampusPulse — Modern Student Hub

A responsive, dark-mode-first student dashboard built for college life. Featuring a sleek modern SaaS design with a persistent sidebar navigation and four fully interactive core modules.

---

## 🌟 Core Features Implemented

### 1. 🗺️ Campus Navigator
* **Interactive SVG Campus Map:** Scalable vector schematic rendering campus buildings (Residence Halls, Science & Tech Center, Central Library, Dining Commons, Engineering Block, Student Union, Lecture Complex, and Wellness Center) with distinct colors, icons, and real-time status dots.
* **Search & Category Filters:** Search for classrooms, labs, dining halls, or filter by category pills (*Academic Labs, Study Spaces, Food & Dining, Dorms*).
* **Quick Routes Engine:** 1-tap route buttons:
  * *"Dorm to Science Lab"* (4 min walk • 320m)
  * *"Library to Cafeteria"* (3 min walk • 210m)
  * *"Engineering to Student Union"* (5 min walk • 390m)
  * *"Dorm to Cafeteria"* (6 min walk • 510m)
* **Animated Route Highlighting:** Animates a flowing dashed path along the map, drops start & finish pins, and displays step-by-step walking directions with estimated calorie burn.

### 2. 👥 Peer Networking Hub
* **Student Directory Grid:** Profile cards with avatars, majors, graduation years, bios, and skills/interests tags (*Python, UI Design, Robotics, CAD, ML, Photography, C++*).
* **Multi-Filter System:** Filter students dynamically by:
  * **Major:** Computer Science, Design & HCI, Electrical, Mechanical, Data Science, Biomedical.
  * **Graduation Year:** Class of 2026 (Senior) to 2029 (Freshman).
  * **Skills / Interests:** Python, Figma, CAD, Robotics, etc.
  * **Search:** Instant keyword search across names, majors, and bios.
* **"Connect" & Direct Messaging:**
  * One-click "Connect" button triggers animated toast notification (*"Connection request sent to Alex Rivera!"*) and updates card state to *"Requested"* or *"Connected"*.
  * "Message" button launches a direct chat modal with message history and simulated responsive peer replies.

### 3. 🛡️ Attendance Tracker
* **Class List Cards:** Pre-populated with core college courses (*Data Structures & Algorithms, Physics & Optics, Multivariable Calculus, Basic Electronics, Discrete Math, OOP Systems Lab*).
* **Dual Visual Meters:** Each course features an SVG circular percentage ring and a smooth horizontal fill bar.
* **Large Tactile Actions:** Instant `+ (Present)` and `- (Absent)` buttons with real-time recalculation and animated progress update.
* **Status Alert & Safe Bunk Engine:**
  * **$\ge 75\%$:** Emerald Green badge indicating safe bunk capacity (*"You can safely bunk 2 more classes"*).
  * **$< 75\%$:** Crimson Red warning badge with pulse alert (*"Warning: Must attend next 3 classes consecutively!"*).
* **Overall Attendance Summary Bar:** Aggregates total attended vs. conducted lectures and at-risk courses.

### 4. 📊 Academic Tracker (CGPA & SGPA)
* **Dashboard Summary:** Prominent header display of:
  * Overall Cumulative CGPA (e.g., **`8.74 / 10.00`**).
  * Current Semester Estimated SGPA (e.g., **`8.82 / 10.00`**).
  * Degree credits progress and Academic Standing (*"Dean's Honor List • Distinction"*).
* **Expandable Semester Breakdowns:** Accordion sections for past completed semesters (Semester 1, 2, 3). Expanding displays the course table with Course Code, Course Name, Credits, Letter Grade, and Grade Points.
* **Interactive Live Calculator:**
  * Dynamic course table for the Current Semester.
  * Dynamically add new courses, edit credit hours, and select letter grades (`O (10)`, `A+ (9)`, `A (8)`, `B+ (7)`, `B (6)`, `C (5)`, `P (4)`, `F (0)`).
  * Live recalculation of current semester SGPA and cumulative graduation CGPA on every keystroke/selection!
* **Target CGPA Simulator:** Enter target graduation CGPA (e.g. 9.0) to calculate the required average SGPA for all remaining semesters.

---

## 🚀 How to Run CampusPulse

### Option 1: Direct Browser Launch
Open `index.html` directly in any web browser:
```bash
# On macOS terminal:
open /Users/hirentrivedi/.gemini/antigravity/scratch/campus-hub/index.html
```

### Option 2: Run via Python Local Server
```bash
python3 /Users/hirentrivedi/.gemini/antigravity/scratch/campus-hub/server.py
```
*Opens automatically at `http://localhost:8080`.*

---

## 📁 File Structure

```
campus-hub/
├── index.html           # Main application shell with persistent sidebar & 4 module views
├── server.py            # Local python server runner
├── README.md            # Comprehensive documentation
├── css/
│   └── styles.css       # SaaS dark mode styling, animated SVG route dashes, circular meters
├── data/
│   └── campusData.js    # Data for buildings, routes, students, classes, and academic history
└── js/
    ├── app.js           # Sidebar orchestrator, tab switching, global state & toast alerts
    ├── navigator.js     # Interactive SVG campus map, search/filter, and quick route engine
    ├── networking.js    # Student directory, multi-filters, connect toasts, and chat modal
    ├── attendance.js    # Class cards, progress bars, large +/- actions, safe bunk calculations
    └── academics.js     # CGPA/SGPA summary, past semester accordions, interactive live calculator
```
