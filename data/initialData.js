// initialData.js - Default seed data for CampusHub
const INITIAL_DATA = {
  currentUser: {
    name: "Alex Sharma",
    branch: "Computer Science & Engineering",
    year: "1st Year",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    college: "Institute of Technology",
    targetAttendance: 75,
    connectionsCount: 8,
    stats: {
      cgpa: 8.64,
      overallAttendance: 81
    }
  },

  peers: [
    {
      id: "peer-1",
      name: "Rohan Verma",
      branch: "CSE (AI & ML)",
      year: "1st Year",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250",
      bio: "Learning Python & Machine Learning. Looking for a study buddy for Engineering Maths & hackathons!",
      skills: ["Python", "NumPy", "Calculus", "Chess"],
      status: "connected",
      badge: "Batchmate"
    },
    {
      id: "peer-2",
      name: "Ananya Iyer",
      branch: "Electronics & Communication",
      year: "2nd Year",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250",
      bio: "Secretary @ Robotics Club. Happy to help 1st years with BEEE and Circuit Simulation tools.",
      skills: ["Arduino", "Embedded C", "Circuit Design", "BEEE"],
      status: "none",
      badge: "Senior Mentor"
    },
    {
      id: "peer-3",
      name: "Kabir Mehta",
      branch: "Mechanical Engineering",
      year: "1st Year",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
      bio: "CAD enthusiast, Formula Student aspirant, and avid guitarist. Let's conquer Engineering Drawing together.",
      skills: ["SolidWorks", "AutoCAD", "Mechanics", "3D Printing"],
      status: "none",
      badge: "Batchmate"
    },
    {
      id: "peer-4",
      name: "Sneha Patel",
      branch: "Information Technology",
      year: "3rd Year",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250",
      bio: "Full Stack Dev intern @ Startup. Building open source projects. Ping me for web dev guidance!",
      skills: ["React", "Node.js", "Tailwind", "Git/GitHub"],
      status: "connected",
      badge: "Senior Mentor"
    },
    {
      id: "peer-5",
      name: "Devansh Rao",
      branch: "Computer Science",
      year: "1st Year",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250",
      bio: "Solving 2 LeetCode problems daily. Competitive programming beginner. Join my daily DSA sprint!",
      skills: ["C++", "DSA Basics", "Algorithms", "Competitive Coding"],
      status: "pending",
      badge: "Batchmate"
    },
    {
      id: "peer-6",
      name: "Pooja Deshmukh",
      branch: "Data Science",
      year: "1st Year",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=250",
      bio: "Exploring Data Visualization and Linear Algebra. Love making aesthetic handwritten study notes.",
      skills: ["Data Analytics", "Pandas", "Linear Algebra", "Design"],
      status: "none",
      badge: "Batchmate"
    }
  ],

  posts: [
    {
      id: "post-1",
      authorName: "Sneha Patel",
      authorBranch: "IT, 3rd Year",
      authorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250",
      timeAgo: "2 hours ago",
      tag: "Hackathon",
      content: "🚀 Smart India Hackathon (SIH) internal college qualifiers have been announced! We have 1 frontend spot open in our team. Looking for an enthusiastic 1st or 2nd year who knows basic HTML/CSS/JS or React. Drop a comment or message me directly!",
      likes: 14,
      liked: false,
      comments: [
        { author: "Alex Sharma", text: "Sent you a DM Sneha! I'd love to contribute." },
        { author: "Rohan Verma", text: "Great initiative! Let me know if you need another member." }
      ]
    },
    {
      id: "post-2",
      authorName: "Rohan Verma",
      authorBranch: "CSE (AI), 1st Year",
      authorAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250",
      timeAgo: "5 hours ago",
      tag: "Study Group",
      content: "Engineering Mathematics-I Unit 2 (Eigenvalues & Eigenvectors) test is this Friday! Anyone up for a group study session in the Central Library 3rd floor at 4:30 PM today?",
      likes: 8,
      liked: true,
      comments: [
        { author: "Pooja Deshmukh", text: "Count me in! I also have previous year question papers solved." }
      ]
    },
    {
      id: "post-3",
      authorName: "Ananya Iyer",
      authorBranch: "ECE, 2nd Year",
      authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250",
      timeAgo: "Yesterday",
      tag: "Resource",
      content: "📢 Uploaded my complete handwritten BEEE (Basic Electrical & Electronics) short-notes covering Kirchhoff laws, AC circuits, and semiconductor diodes. Check the Learning tab under BEEE resources!",
      likes: 31,
      liked: false,
      comments: [
        { author: "Devansh Rao", text: "Life saver! The diode characteristics diagram is super crisp." }
      ]
    }
  ],

  messages: {
    "peer-1": [
      { sender: "them", text: "Hey Alex! Did you finish the Python lab assignment #3?", time: "10:15 AM" },
      { sender: "me", text: "Hey Rohan! Yes, just finished the matrix multiplication script.", time: "10:18 AM" },
      { sender: "them", text: "Awesome! Can we compare our edge case test outputs later in the library?", time: "10:20 AM" }
    ],
    "peer-4": [
      { sender: "them", text: "Hey Alex! Saw your interest in web dev on the feed.", time: "Yesterday" },
      { sender: "me", text: "Hi Sneha! Yes, building my first portfolio and campus projects right now.", time: "Yesterday" },
      { sender: "them", text: "Love that energy. Let's chat more about hackathons soon!", time: "9:00 AM" }
    ]
  },

  attendanceSubjects: [
    {
      id: "sub-1",
      code: "CS101",
      name: "Engineering Mathematics - I",
      teacher: "Dr. K. Sharma",
      attended: 28,
      total: 32,
      target: 75,
      color: "blue"
    },
    {
      id: "sub-2",
      code: "PH101",
      name: "Engineering Physics",
      teacher: "Prof. M. Sen",
      attended: 19,
      total: 26,
      target: 75,
      color: "purple"
    },
    {
      id: "sub-3",
      code: "EE101",
      name: "Basic Electrical & Electronics (BEEE)",
      teacher: "Dr. R. Gupta",
      attended: 22,
      total: 25,
      target: 75,
      color: "emerald"
    },
    {
      id: "sub-4",
      code: "CS102",
      name: "Problem Solving & Python Lab",
      teacher: "Prof. S. Nair",
      attended: 15,
      total: 16,
      target: 75,
      color: "amber"
    },
    {
      id: "sub-5",
      code: "ME101",
      name: "Engineering Graphics & Design (CAD)",
      teacher: "Prof. V. Patil",
      attended: 12,
      total: 18,
      target: 75,
      color: "rose"
    }
  ],

  courses: [
    {
      id: "course-1",
      code: "MATH101",
      title: "Engineering Mathematics - I",
      category: "Core Mathematics",
      level: "Semester 1",
      thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400",
      description: "Master Matrices, Eigenvalues, Differential Calculus, Taylor Series, and Multivariable Integration for engineering applications.",
      units: [
        "Unit 1: Linear Algebra & Matrices",
        "Unit 2: Differential Calculus & Curvature",
        "Unit 3: Partial Differentiation & Maxima/Minima",
        "Unit 4: Multiple Integrals & Vector Calculus"
      ],
      resources: [
        { type: "pdf", title: "Eigenvalues & Diagonalization Formula Cheat Sheet", size: "1.2 MB", url: "#" },
        { type: "video", title: "Essence of Linear Algebra - 3Blue1Brown Playlist", size: "Curated Video Series", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab" },
        { type: "notes", title: "Handwritten Solved PYQs (Past 5 Years)", size: "4.8 MB", url: "#" }
      ],
      quiz: [
        {
          question: "What is the sum of eigenvalues of a square matrix equal to?",
          options: ["Determinant of the matrix", "Trace (sum of diagonal elements)", "Rank of the matrix", "Zero"],
          correct: 1,
          explanation: "The sum of the eigenvalues of any square matrix is always equal to the trace (sum of the main diagonal elements) of the matrix."
        },
        {
          question: "If matrix A is orthogonal, what is A multiplied by A transpose (A * A^T)?",
          options: ["Null matrix (0)", "Identity matrix (I)", "Scalar matrix", "Skew-symmetric matrix"],
          correct: 1,
          explanation: "By definition, an orthogonal matrix satisfies A * A^T = A^T * A = I."
        },
        {
          question: "At a saddle point of a multi-variable function f(x, y), what is true?",
          options: ["It is a local maximum", "It is a local minimum", "First derivatives are zero but it's neither max nor min", "Function value is undefined"],
          correct: 2,
          explanation: "At a saddle point, gradient is zero (stationary point), but concavities along different axes have opposite signs."
        }
      ]
    },
    {
      id: "course-2",
      code: "CS102",
      title: "Problem Solving & Python Programming",
      category: "Computer Science",
      level: "Semester 1",
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=400",
      description: "Learn algorithmic thinking, Python syntax, lists, dictionaries, recursion, file I/O, and OOP concepts.",
      units: [
        "Unit 1: Computational Thinking & Flowcharts",
        "Unit 2: Python Data Types & Control Structures",
        "Unit 3: Functions, Recursion & Scope",
        "Unit 4: Lists, Tuples, Dictionaries & Sets",
        "Unit 5: File Handling & Exception Handling"
      ],
      resources: [
        { type: "pdf", title: "Python 3 Syntax & Built-in Methods Quick Sheet", size: "900 KB", url: "#" },
        { type: "video", title: "Python for Beginners - Complete University Course", size: "Video Lecture", url: "https://www.youtube.com/watch?v=rfscVS0vtbw" },
        { type: "notes", title: "Top 25 First-Year Python Lab Programs with Output", size: "2.1 MB", url: "#" }
      ],
      quiz: [
        {
          question: "What is the output of bool([]) in Python?",
          options: ["True", "False", "TypeError", "None"],
          correct: 1,
          explanation: "In Python, empty sequences such as empty lists [], tuples, sets, and strings evaluate to False in a boolean context."
        },
        {
          question: "Which of the following data structures is immutable in Python?",
          options: ["List", "Dictionary", "Tuple", "Set"],
          correct: 2,
          explanation: "Tuples cannot be modified after creation, making them immutable."
        },
        {
          question: "What does the expression [x**2 for x in range(4)] produce?",
          options: ["[1, 4, 9, 16]", "[0, 1, 4, 9]", "[0, 2, 4, 6]", "[0, 1, 2, 3]"],
          correct: 1,
          explanation: "range(4) produces 0, 1, 2, 3. Squaring each gives [0, 1, 4, 9]."
        }
      ]
    },
    {
      id: "course-3",
      code: "EE101",
      title: "Basic Electrical & Electronics (BEEE)",
      category: "Electrical Sciences",
      level: "Semester 1",
      thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400",
      description: "DC & AC circuit analysis, Kirchhoff's laws, Thevenin & Norton theorems, transformers, and semiconductor diodes.",
      units: [
        "Unit 1: DC Circuit Analysis & Network Theorems",
        "Unit 2: Single Phase AC Circuits & Resonance",
        "Unit 3: Magnetic Circuits & Single-Phase Transformers",
        "Unit 4: Semiconductor PN Junction Diodes & Transistors"
      ],
      resources: [
        { type: "pdf", title: "Network Theorems Step-by-Step Problem Solving Guide", size: "3.4 MB", url: "#" },
        { type: "video", title: "Gate Smashers - Complete BEEE Crash Course", size: "Video Playlist", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiEI4qg4v_hmsdWx56TidFq-" },
        { type: "notes", title: "BEEE Formula Handbook & Derivations", size: "1.7 MB", url: "#" }
      ],
      quiz: [
        {
          question: "Kirchhoff's Current Law (KCL) is based on the conservation of which quantity?",
          options: ["Energy", "Electric Charge", "Momentum", "Voltage"],
          correct: 1,
          explanation: "KCL states that the total current entering a junction must equal total current leaving, which is a consequence of conservation of electric charge."
        },
        {
          question: "In a series RLC circuit at resonance, the power factor is:",
          options: ["Zero", "0.5 lagging", "Unity (1.0)", "0.8 leading"],
          correct: 2,
          explanation: "At resonance, inductive reactance equals capacitive reactance (X_L = X_C), making the circuit purely resistive with a unity power factor."
        }
      ]
    },
    {
      id: "course-4",
      code: "PH101",
      title: "Engineering Physics & Optics",
      category: "Fundamental Science",
      level: "Semester 1",
      thumbnail: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=400",
      description: "Wave optics, interference, diffraction, lasers, fiber optics, and introduction to quantum mechanics.",
      units: [
        "Unit 1: Wave Optics & Interference (Newton's Rings)",
        "Unit 2: Diffraction & Polarization of Light",
        "Unit 3: Lasers and Optical Fibers",
        "Unit 4: De Broglie Hypothesis & Schrödinger Wave Equation"
      ],
      resources: [
        { type: "pdf", title: "Newton's Rings & Fraunhofer Diffraction Derivations", size: "2.5 MB", url: "#" },
        { type: "video", title: "Quantum Physics in 20 Minutes - Visualized", size: "Video Lecture", url: "#" }
      ],
      quiz: [
        {
          question: "In Newton's rings experiment, the central spot in reflected light appears:",
          options: ["Bright", "Dark", "Coloured", "Uniformly grey"],
          correct: 1,
          explanation: "Due to the phase change of π upon reflection at the denser medium (glass plate), the central spot is dark."
        }
      ]
    }
  ],

  // Academic Semesters data for SGPA / CGPA
  gradesData: {
    scale: [
      { grade: "O", point: 10, label: "Outstanding (90-100%)" },
      { grade: "A+", point: 9, label: "Excellent (80-89%)" },
      { grade: "A", point: 8, label: "Very Good (70-79%)" },
      { grade: "B+", point: 7, label: "Good (60-69%)" },
      { grade: "B", point: 6, label: "Above Average (50-59%)" },
      { grade: "C", point: 5, label: "Average (45-49%)" },
      { grade: "P", point: 4, label: "Pass (40-44%)" },
      { grade: "F", point: 0, label: "Fail (<40%)" }
    ],
    currentSemester: [
      { id: "curr-1", name: "Engineering Mathematics - I", credits: 4, grade: "A+" },
      { id: "curr-2", name: "Engineering Physics", credits: 3, grade: "A" },
      { id: "curr-3", name: "Basic Electrical & Electronics", credits: 3, grade: "A+" },
      { id: "curr-4", name: "Python Programming & Problem Solving", credits: 4, grade: "O" },
      { id: "curr-5", name: "Engineering Graphics & Design Lab", credits: 2, grade: "B+" },
      { id: "curr-6", name: "Physics & Electrical Laboratory", credits: 2, grade: "O" },
      { id: "curr-7", name: "Communication Skills & Soft Skills", credits: 2, grade: "A" }
    ],
    semesters: [
      { sem: 1, credits: 20, sgpa: 8.75, completed: true },
      { sem: 2, credits: 21, sgpa: 8.52, completed: false },
      { sem: 3, credits: 22, sgpa: 0, completed: false },
      { sem: 4, credits: 22, sgpa: 0, completed: false },
      { sem: 5, credits: 20, sgpa: 0, completed: false },
      { sem: 6, credits: 20, sgpa: 0, completed: false },
      { sem: 7, credits: 18, sgpa: 0, completed: false },
      { sem: 8, credits: 16, sgpa: 0, completed: false }
    ]
  }
};
