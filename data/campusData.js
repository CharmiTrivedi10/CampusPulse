// data/campusData.js - Master Data for CampusPulse

const CAMPUS_DATA = {
  currentUser: {
    name: "Alex Rivera",
    major: "Computer Science & Eng",
    year: "Class of 2028 (Sophomore)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    studentId: "CP-2024-8842",
    targetAttendance: 75
  },

  // 1. Campus Navigator Data
  buildings: [
    {
      id: "bldg-dorm",
      name: "North Residence Quad",
      shortName: "Dorms",
      category: "Dorms",
      x: 140,
      y: 110,
      width: 140,
      height: 90,
      color: "#6366f1",
      icon: "home",
      hours: "Open 24/7 (Keycard Access)",
      floors: 6,
      facilities: ["Study Lounges", "Laundry", "Bike Storage", "Common Kitchen"],
      description: "Co-ed residential hall accommodating 600 students with high-speed Wi-Fi and quiet study pods."
    },
    {
      id: "bldg-sci",
      name: "Franklin Science & Tech Center",
      shortName: "Science Lab",
      category: "Academic Labs",
      x: 620,
      y: 90,
      width: 170,
      height: 100,
      color: "#06b6d4",
      icon: "flask-conical",
      hours: "7:00 AM – 10:00 PM",
      floors: 5,
      facilities: ["Chemistry Labs", "Physics Optics Lab", "Bioinformatics Suite", "Clean Room"],
      description: "State-of-the-art research complex featuring advanced physics, optics, and biological experimental setups."
    },
    {
      id: "bldg-lib",
      name: "Central Humanities Library",
      shortName: "Library",
      category: "Study Spaces",
      x: 360,
      y: 220,
      width: 180,
      height: 110,
      color: "#8b5cf6",
      icon: "book-open",
      hours: "8:00 AM – Midnight (24/7 during finals)",
      floors: 4,
      facilities: ["Silent Study Floors", "Group Discussion Rooms", "Starbucks Kiosk", "3D Printing Hub"],
      description: "The intellectual core of campus holding over 400,000 volumes, private study carrels, and multimedia tech labs."
    },
    {
      id: "bldg-cafe",
      name: "Grand Campus Dining Commons",
      shortName: "Cafeteria",
      category: "Food & Dining",
      x: 660,
      y: 310,
      width: 150,
      height: 100,
      color: "#f59e0b",
      icon: "utensils",
      hours: "7:30 AM – 9:30 PM",
      floors: 2,
      facilities: ["All-You-Care-To-Eat Buffet", "Salad Bar", "Halal & Vegan Stations", "Outdoor Terrace"],
      description: "Primary dining pavilion with multiple culinary stations, grab-and-go deli, and organic smoothie bar."
    },
    {
      id: "bldg-eng",
      name: "Edison Engineering Block",
      shortName: "Engineering",
      category: "Academic Labs",
      x: 110,
      y: 360,
      width: 170,
      height: 110,
      color: "#10b981",
      icon: "cpu",
      hours: "6:30 AM – 11:00 PM",
      floors: 5,
      facilities: ["Robotics Arena", "CAD Workstation Lab", "Hardware IoT Bench", "Makerspace"],
      description: "Home of Computer Science, Electrical, and Mechanical Engineering departments with rapid prototyping machinery."
    },
    {
      id: "bldg-union",
      name: "Student Activity Union",
      shortName: "Student Union",
      category: "Study Spaces",
      x: 380,
      y: 430,
      width: 160,
      height: 90,
      color: "#ec4899",
      icon: "coffee",
      hours: "7:00 AM – 11:00 PM",
      floors: 3,
      facilities: ["Campus Bookstore", "Student Club Offices", "Game Room & Billiards", "Financial Aid"],
      description: "Lively hub for student council meetings, campus events, casual hangout lounges, and tech support."
    },
    {
      id: "bldg-hall",
      name: "Grand Lecture Complex",
      shortName: "Lecture Hall",
      category: "Academic Labs",
      x: 630,
      y: 470,
      width: 160,
      height: 90,
      color: "#3b82f6",
      icon: "presentation",
      hours: "7:30 AM – 8:30 PM",
      floors: 3,
      facilities: ["Auditoriums A-D (500 capacity each)", "Smart AV Podiums", "Tiered Seating", "Exam Halls"],
      description: "Acoustically tuned tiered auditoriums host large first-year lectures, guest speaker colloquiums, and exams."
    },
    {
      id: "bldg-gym",
      name: "Campus Athletic & Wellness Center",
      shortName: "Sports Complex",
      category: "Dorms",
      x: 130,
      y: 230,
      width: 130,
      height: 80,
      color: "#f43f5e",
      icon: "dumbbell",
      hours: "6:00 AM – 10:00 PM",
      floors: 3,
      facilities: ["Olympic Pool", "Rock Climbing Wall", "Strength Gym", "Indoor Basketball Courts"],
      description: "State-of-the-art gym, recreation fitness classes, and sports training facilities for students and faculty."
    }
  ],

  quickRoutes: [
    {
      id: "route-dorm-sci",
      title: "Dorm to Science Lab",
      fromId: "bldg-dorm",
      toId: "bldg-sci",
      time: "4 min walk",
      distance: "320 meters",
      calories: "22 kcal",
      path: "M 210,155 L 360,155 L 450,140 L 620,140",
      steps: [
        "Exit North Residence Hall via East Lobby entrance",
        "Take Central Walkway past Academic Lawn",
        "Cross Plaza at Franklin Fountain",
        "Arrive at Franklin Science Lab Main Entrance (Level 1)"
      ]
    },
    {
      id: "route-lib-cafe",
      title: "Library to Cafeteria",
      fromId: "bldg-lib",
      toId: "bldg-cafe",
      time: "3 min walk",
      distance: "210 meters",
      calories: "14 kcal",
      path: "M 540,275 L 600,275 L 660,340",
      steps: [
        "Exit Central Library through South Glass Atrium",
        "Follow paved promenade towards East Food Commons",
        "Take exterior ramp directly into Cafeteria Dining Hall"
      ]
    },
    {
      id: "route-eng-union",
      title: "Engineering to Student Union",
      fromId: "bldg-eng",
      toId: "bldg-union",
      time: "5 min walk",
      distance: "390 meters",
      calories: "28 kcal",
      path: "M 280,415 L 340,415 L 380,475",
      steps: [
        "Exit Edison Engineering Hall through East Makerspace door",
        "Walk straight along Southern Promenade path",
        "Enter Student Union ground-floor atrium near Bookstore"
      ]
    },
    {
      id: "route-dorm-cafe",
      title: "Dorm to Cafeteria",
      fromId: "bldg-dorm",
      toId: "bldg-cafe",
      time: "6 min walk",
      distance: "510 meters",
      calories: "35 kcal",
      path: "M 210,155 L 360,220 L 500,290 L 660,340",
      steps: [
        "Head south-east from Dormitory Quad onto Main Mall",
        "Walk along Library courtyard",
        "Enter Grand Dining Commons through main reception"
      ]
    }
  ],

  // 2. Peer Networking Data
  students: [
    {
      id: "student-1",
      name: "Marcus Vance",
      major: "Computer Science",
      gradYear: "2027",
      yearLabel: "Junior",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250",
      bio: "Focusing on distributed systems and backend infrastructure. Looking for hackathon partners for HackMIT.",
      skills: ["Python", "Golang", "Docker", "Algorithms"],
      status: "connected",
      badge: "Hackathon Lead"
    },
    {
      id: "student-2",
      name: "Elena Rostova",
      major: "Design & HCI",
      gradYear: "2028",
      yearLabel: "Sophomore",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250",
      bio: "Product designer passionate about clean typography and accessibility. Available to mentor 1st years in Figma.",
      skills: ["UI Design", "Figma", "Design Systems", "User Research"],
      status: "none",
      badge: "Design Club Head"
    },
    {
      id: "student-3",
      name: "Jordan Chen",
      major: "Electrical Engineering",
      gradYear: "2026",
      yearLabel: "Senior",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
      bio: "Working on quadcopter flight controllers and embedded firmware. Happy to help with Circuit Analysis & BEEE.",
      skills: ["Embedded C", "Arduino", "Robotics", "PCB Design"],
      status: "none",
      badge: "Senior Mentor"
    },
    {
      id: "student-4",
      name: "Zoe Washington",
      major: "Data Science",
      gradYear: "2028",
      yearLabel: "Sophomore",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250",
      bio: "Passionate about predictive modeling and sports analytics. Looking for study partners in Multivariable Calculus.",
      skills: ["Python", "Machine Learning", "Calculus", "Pandas"],
      status: "connected",
      badge: "Study Partner"
    },
    {
      id: "student-5",
      name: "Devon Brooks",
      major: "Mechanical Engineering",
      gradYear: "2027",
      yearLabel: "Junior",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250",
      bio: "CAD modeler & 3D printing enthusiast on Formula Student racecar team. Can help with SolidWorks & Statics.",
      skills: ["CAD", "SolidWorks", "Photography", "Thermodynamics"],
      status: "pending",
      badge: "Formula SAE"
    },
    {
      id: "student-6",
      name: "Priya Sharma",
      major: "Computer Science",
      gradYear: "2029",
      yearLabel: "Freshman",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=250",
      bio: "Freshman learning Web Development and Data Structures. Looking for study buddies for Friday problem sets!",
      skills: ["React", "Python", "UI Design", "Git"],
      status: "none",
      badge: "Freshman"
    },
    {
      id: "student-7",
      name: "Lucas Meyer",
      major: "Biomedical Engineering",
      gradYear: "2026",
      yearLabel: "Senior",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=250",
      bio: "Researching microfluidic bio-chips. Amateur photographer for campus magazine.",
      skills: ["Photography", "Bio-Mechanics", "MATLAB", "Research"],
      status: "none",
      badge: "Campus Mag"
    },
    {
      id: "student-8",
      name: "Samantha Wu",
      major: "Computer Science",
      gradYear: "2028",
      yearLabel: "Sophomore",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250",
      bio: "Competitive programming solver (Expert @ Codeforces). Let's solve LeetCode hards together every Sunday.",
      skills: ["Algorithms", "C++", "Python", "Competitive Coding"],
      status: "connected",
      badge: "DSA Coach"
    }
  ],

  messages: {
    "student-1": [
      { sender: "them", text: "Hey Alex! Are you joining the campus hackathon this weekend?", time: "11:20 AM" },
      { sender: "me", text: "Hey Marcus! Yes definitely. Working on our UI prototype right now.", time: "11:24 AM" },
      { sender: "them", text: "Awesome, let's meet at the Engineering makerspace around 4 PM!", time: "11:26 AM" }
    ],
    "student-4": [
      { sender: "them", text: "Hi Alex! Do you have the notes for yesterday's Calculus lecture?", time: "Yesterday" },
      { sender: "me", text: "Hey Zoe! Yes, uploaded the PDF to the study drive.", time: "Yesterday" }
    ]
  },

  // 3. Attendance Tracker Data
  classes: [
    {
      id: "cls-1",
      code: "CS201",
      name: "Data Structures & Algorithms",
      professor: "Dr. Alistair Finch",
      schedule: "Mon, Wed, Fri • 10:00 AM",
      room: "Edison Hall 302",
      attended: 31,
      total: 35,
      color: "emerald"
    },
    {
      id: "cls-2",
      code: "PH101",
      name: "Engineering Physics & Optics",
      professor: "Dr. Maya Lindgren",
      schedule: "Tue, Thu • 11:30 AM",
      room: "Science Tech Lab 104",
      attended: 18,
      total: 26,
      color: "rose"
    },
    {
      id: "cls-3",
      code: "MA101",
      name: "Multivariable Calculus",
      professor: "Prof. Kenneth Wu",
      schedule: "Mon, Wed, Fri • 08:30 AM",
      room: "Lecture Complex Hall B",
      attended: 28,
      total: 34,
      color: "emerald"
    },
    {
      id: "cls-4",
      code: "EE101",
      name: "Basic Electrical & Electronics",
      professor: "Dr. Rachel Kapoor",
      schedule: "Tue, Thu • 02:00 PM",
      room: "Edison Hall 210",
      attended: 21,
      total: 28,
      color: "amber"
    },
    {
      id: "cls-5",
      code: "CS202",
      name: "Discrete Mathematics",
      professor: "Prof. Harold Bell",
      schedule: "Mon, Wed • 01:00 PM",
      room: "Lecture Complex Hall D",
      attended: 24,
      total: 26,
      color: "emerald"
    },
    {
      id: "cls-6",
      code: "CS203",
      name: "Object Oriented Systems Lab",
      professor: "Prof. Sarah Connor",
      schedule: "Thursday • 03:30 PM",
      room: "Computing Lab 4",
      attended: 10,
      total: 14,
      color: "rose"
    }
  ],

  // 4. Academic Tracker (CGPA & SGPA)
  academics: {
    overallCGPA: 8.74,
    currentEstimatedSGPA: 8.82,
    totalCreditsCompleted: 64,
    totalDegreeCredits: 160,
    academicStanding: "Dean's Honor List (Distinction)",
    gradingScale: [
      { grade: "O", point: 10, description: "Outstanding (90-100%)" },
      { grade: "A+", point: 9, description: "Excellent (80-89%)" },
      { grade: "A", point: 8, description: "Very Good (70-79%)" },
      { grade: "B+", point: 7, description: "Good (60-69%)" },
      { grade: "B", point: 6, description: "Above Average (50-59%)" },
      { grade: "C", point: 5, description: "Average (45-49%)" },
      { grade: "P", point: 4, description: "Pass (40-44%)" },
      { grade: "F", point: 0, description: "Fail (<40%)" }
    ],
    // Past Semesters for Accordions
    pastSemesters: [
      {
        sem: 1,
        title: "Semester 1 — Fall 2024",
        term: "Completed • Fall 2024",
        credits: 20,
        sgpa: 8.65,
        courses: [
          { code: "MA101", name: "Calculus & Linear Algebra", credits: 4, grade: "A+", points: 9 },
          { code: "PH101", name: "Engineering Physics", credits: 4, grade: "A", points: 8 },
          { code: "CS101", name: "Programming with Python", credits: 4, grade: "O", points: 10 },
          { code: "EE101", name: "Basic Electrical Engineering", credits: 3, grade: "A+", points: 9 },
          { code: "EN101", name: "Technical Communication", credits: 3, grade: "A", points: 8 },
          { code: "PH102", name: "Physics & Optics Lab", credits: 2, grade: "O", points: 10 }
        ]
      },
      {
        sem: 2,
        title: "Semester 2 — Spring 2025",
        term: "Completed • Spring 2025",
        credits: 22,
        sgpa: 8.70,
        courses: [
          { code: "MA102", name: "Differential Equations & Transforms", credits: 4, grade: "A", points: 8 },
          { code: "CH101", name: "Engineering Chemistry", credits: 4, grade: "A+", points: 9 },
          { code: "CS102", name: "Data Structures & C++", credits: 4, grade: "O", points: 10 },
          { code: "ME101", name: "Computer Aided Design (CAD)", credits: 3, grade: "B+", points: 7 },
          { code: "CS103", name: "Data Structures Lab", credits: 2, grade: "O", points: 10 },
          { code: "EC101", name: "Electronic Devices & Circuits", credits: 3, grade: "A+", points: 9 },
          { code: "EV101", name: "Environmental Sciences", credits: 2, grade: "A", points: 8 }
        ]
      },
      {
        sem: 3,
        title: "Semester 3 — Fall 2025",
        term: "Completed • Fall 2025",
        credits: 22,
        sgpa: 8.86,
        courses: [
          { code: "CS201", name: "Design & Analysis of Algorithms", credits: 4, grade: "O", points: 10 },
          { code: "CS202", name: "Computer Architecture & Organization", credits: 4, grade: "A+", points: 9 },
          { code: "CS204", name: "Database Management Systems", credits: 4, grade: "O", points: 10 },
          { code: "MA201", name: "Probability & Statistics for CS", credits: 4, grade: "A", points: 8 },
          { code: "CS205", name: "DBMS Laboratory", credits: 2, grade: "O", points: 10 },
          { code: "HS201", name: "Engineering Economics", credits: 2, grade: "B+", points: 7 },
          { code: "CS206", name: "Open Source Software Project", credits: 2, grade: "O", points: 10 }
        ]
      }
    ],
    // Current Semester Interactive Courses
    currentSemester: [
      { id: "curr-1", code: "CS210", name: "Operating Systems Principles", credits: 4, grade: "A+" },
      { id: "curr-2", code: "CS211", name: "Theory of Computation & Automata", credits: 4, grade: "A" },
      { id: "curr-3", code: "CS212", name: "Computer Networks & Protocols", credits: 4, grade: "O" },
      { id: "curr-4", code: "CS213", name: "Software Engineering & Agile", credits: 3, grade: "A+" },
      { id: "curr-5", code: "CS214", name: "Networks & OS Laboratory", credits: 2, grade: "O" },
      { id: "curr-6", code: "HU202", name: "Professional Ethics & Law", credits: 2, grade: "A" }
    ]
  }
};
