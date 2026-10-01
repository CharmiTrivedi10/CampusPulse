// js/academics.js - Academic Tracker, CGPA/SGPA Summary, Past Semester Accordions, & Interactive Live Calculator

const AcademicsModule = {
  gradeScale: {
    'O': 10,
    'A+': 9,
    'A': 8,
    'B+': 7,
    'B': 6,
    'C': 5,
    'P': 4,
    'F': 0
  },

  openAccordions: new Set([1]), // Default open first semester accordion

  init() {
    this.renderSummaryHeader();
    this.renderPastSemestersAccordion();
    this.renderCurrentSemesterCalculator();
    this.setupEventListeners();
  },

  setupEventListeners() {
    // Add Course to Current Semester
    const addCourseBtn = document.getElementById('add-calculator-course-btn');
    if (addCourseBtn) {
      addCourseBtn.addEventListener('click', () => {
        this.addCalculatorCourse();
      });
    }

    // Target Simulator
    const simBtn = document.getElementById('simulate-cgpa-btn');
    if (simBtn) {
      simBtn.addEventListener('click', () => {
        this.runTargetSimulator();
      });
    }
  },

  toggleAccordion(semNumber) {
    if (this.openAccordions.has(semNumber)) {
      this.openAccordions.delete(semNumber);
    } else {
      this.openAccordions.add(semNumber);
    }
    this.renderPastSemestersAccordion();
  },

  renderPastSemestersAccordion() {
    const container = document.getElementById('past-semesters-accordion-container');
    if (!container) return;

    const data = AppState.getData();
    const semesters = data.academics.pastSemesters;

    container.innerHTML = semesters.map(sem => {
      const isOpen = this.openAccordions.has(sem.sem);

      return `
        <div class="glass-card rounded-2xl border border-slate-800/90 overflow-hidden mb-3.5 transition-all">
          
          <!-- Accordion Header -->
          <button onclick="AcademicsModule.toggleAccordion(${sem.sem})"
            class="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-800/40 transition-colors">
            
            <div class="flex items-center gap-3.5">
              <div class="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center font-bold text-sm shrink-0">
                S${sem.sem}
              </div>
              <div>
                <h4 class="font-bold text-white text-sm sm:text-base">${sem.title}</h4>
                <p class="text-xs text-slate-400 mt-0.5">${sem.term} • ${sem.credits} Credits</p>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div class="text-right">
                <span class="text-[10px] text-slate-400 uppercase font-semibold block">Semester SGPA</span>
                <span class="text-base font-extrabold text-indigo-400">${sem.sgpa.toFixed(2)}</span>
              </div>
              <div class="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-white' : ''}">
                <i data-lucide="chevron-down" class="w-4 h-4"></i>
              </div>
            </div>

          </button>

          <!-- Accordion Body (Courses Table) -->
          <div class="${isOpen ? 'block' : 'hidden'} border-t border-slate-800/80 bg-slate-950/40 p-4 sm:p-5">
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead>
                  <tr class="text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2">
                    <th class="py-2.5 px-3">Course Code</th>
                    <th class="py-2.5 px-3">Course Name</th>
                    <th class="py-2.5 px-3 text-center">Credits</th>
                    <th class="py-2.5 px-3 text-center">Letter Grade</th>
                    <th class="py-2.5 px-3 text-right">Grade Points</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/50">
                  ${sem.courses.map(c => `
                    <tr class="hover:bg-slate-800/20 transition-colors">
                      <td class="py-2.5 px-3 font-mono font-semibold text-indigo-400">${c.code}</td>
                      <td class="py-2.5 px-3 font-medium text-slate-200">${c.name}</td>
                      <td class="py-2.5 px-3 text-center text-slate-300">${c.credits}</td>
                      <td class="py-2.5 px-3 text-center">
                        <span class="px-2 py-0.5 rounded-md font-bold text-[11px] ${
                          c.grade === 'O' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                          c.grade === 'A+' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' :
                          c.grade === 'A' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                          'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }">
                          ${c.grade}
                        </span>
                      </td>
                      <td class="py-2.5 px-3 text-right font-bold text-slate-100">${(c.credits * (c.points || this.gradeScale[c.grade] || 0)).toFixed(1)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      `;
    }).join('');

    lucide.createIcons();
  },

  renderCurrentSemesterCalculator() {
    const tbody = document.getElementById('calculator-courses-tbody');
    if (!tbody) return;

    const data = AppState.getData();
    const courses = data.academics.currentSemester;

    let currentSemCredits = 0;
    let currentSemPoints = 0;

    tbody.innerHTML = courses.map((course, idx) => {
      const pt = this.gradeScale[course.grade] || 0;
      const weighted = course.credits * pt;

      currentSemCredits += course.credits;
      currentSemPoints += weighted;

      return `
        <tr class="border-b border-slate-800/80 hover:bg-slate-800/30 transition-colors text-xs">
          <td class="py-3 px-3">
            <input type="text" value="${course.name}" 
              onchange="AcademicsModule.updateCourseField(${idx}, 'name', this.value)"
              class="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 font-medium focus:outline-none focus:border-indigo-500" />
          </td>
          <td class="py-3 px-3 text-center">
            <input type="number" step="0.5" min="0.5" max="6" value="${course.credits}" 
              onchange="AcademicsModule.updateCourseField(${idx}, 'credits', parseFloat(this.value) || 1)"
              class="w-16 text-center bg-slate-900 border border-slate-700/80 rounded-lg px-2 py-1.5 text-xs text-slate-100 font-bold focus:outline-none focus:border-indigo-500" />
          </td>
          <td class="py-3 px-3 text-center">
            <select onchange="AcademicsModule.updateCourseField(${idx}, 'grade', this.value)"
              class="bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 font-semibold focus:outline-none focus:border-indigo-500">
              ${Object.keys(this.gradeScale).map(g => `
                <option value="${g}" ${course.grade === g ? 'selected' : ''}>${g} (${this.gradeScale[g]} pts)</option>
              `).join('')}
            </select>
          </td>
          <td class="py-3 px-3 text-center font-bold text-indigo-400">
            ${weighted.toFixed(1)}
          </td>
          <td class="py-3 px-3 text-right">
            <button onclick="AcademicsModule.deleteCalculatorCourse(${idx})" class="text-slate-500 hover:text-rose-400 p-1 rounded-lg transition-colors">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </td>
        </tr>
      `;
    }).join('');

    const estimatedSGPA = currentSemCredits > 0 ? (currentSemPoints / currentSemCredits) : 0;
    const roundedSGPA = Math.round(estimatedSGPA * 100) / 100;

    // Recalculate Combined CGPA incorporating Past Semesters + Current Estimated Semester
    const pastSemesters = data.academics.pastSemesters;
    let totalAllCredits = 0;
    let totalAllPoints = 0;

    pastSemesters.forEach(s => {
      totalAllCredits += s.credits;
      totalAllPoints += (s.sgpa * s.credits);
    });

    const combinedCredits = totalAllCredits + currentSemCredits;
    const combinedPoints = totalAllPoints + currentSemPoints;
    const overallCGPA = combinedCredits > 0 ? (combinedPoints / combinedCredits) : 0;
    const roundedCGPA = Math.round(overallCGPA * 100) / 100;

    // Update Live Calculation Elements in Calculator Card
    const currentSgpaEl = document.getElementById('calc-estimated-sgpa');
    const currentCreditsEl = document.getElementById('calc-total-credits');
    const currentPointsEl = document.getElementById('calc-total-points');

    if (currentSgpaEl) currentSgpaEl.textContent = roundedSGPA.toFixed(2);
    if (currentCreditsEl) currentCreditsEl.textContent = currentSemCredits;
    if (currentPointsEl) currentPointsEl.textContent = currentSemPoints.toFixed(1);

    // Save and update top dashboard summary
    data.academics.currentEstimatedSGPA = roundedSGPA;
    data.academics.overallCGPA = roundedCGPA;
    data.academics.totalCreditsCompleted = combinedCredits;
    AppState.saveData(data);

    this.renderSummaryHeader();
    AppState.updateSidebarStats();
    lucide.createIcons();
  },

  renderSummaryHeader() {
    const data = AppState.getData();
    const ac = data.academics;

    const cgpaEl = document.getElementById('summary-cgpa-display');
    const sgpaEl = document.getElementById('summary-sgpa-display');
    const creditsEl = document.getElementById('summary-credits-display');
    const standingEl = document.getElementById('summary-standing-display');

    if (cgpaEl) cgpaEl.textContent = ac.overallCGPA.toFixed(2);
    if (sgpaEl) sgpaEl.textContent = ac.currentEstimatedSGPA.toFixed(2);
    if (creditsEl) creditsEl.textContent = `${ac.totalCreditsCompleted} Credits`;
    if (standingEl) standingEl.textContent = ac.academicStanding;
  },

  updateCourseField(idx, field, value) {
    const data = AppState.getData();
    if (data.academics.currentSemester[idx]) {
      data.academics.currentSemester[idx][field] = value;
      AppState.saveData(data);
      this.renderCurrentSemesterCalculator();
    }
  },

  addCalculatorCourse() {
    const data = AppState.getData();
    const count = data.academics.currentSemester.length + 1;
    data.academics.currentSemester.push({
      id: 'curr-' + Date.now(),
      code: `CS${215 + count}`,
      name: `Elective Course ${count}`,
      credits: 3,
      grade: 'A+'
    });

    AppState.saveData(data);
    this.renderCurrentSemesterCalculator();
    AppState.showToast('Course added to Current Semester calculator', 'info');
  },

  deleteCalculatorCourse(idx) {
    const data = AppState.getData();
    if (data.academics.currentSemester.length <= 1) {
      AppState.showToast('Semester must have at least one course', 'warning');
      return;
    }

    data.academics.currentSemester.splice(idx, 1);
    AppState.saveData(data);
    this.renderCurrentSemesterCalculator();
    AppState.showToast('Course removed from calculation', 'info');
  },

  runTargetSimulator() {
    const input = document.getElementById('target-cgpa-sim-input');
    const resultBox = document.getElementById('target-cgpa-sim-result');
    if (!input || !resultBox) return;

    const target = parseFloat(input.value);
    if (isNaN(target) || target <= 0 || target > 10) {
      AppState.showToast('Please enter a valid target CGPA (between 1.0 and 10.0)', 'warning');
      return;
    }

    const data = AppState.getData();
    const pastSemesters = data.academics.pastSemesters;
    const degreeTotal = data.academics.totalDegreeCredits || 160;

    let earnedCredits = 0;
    let earnedPoints = 0;

    pastSemesters.forEach(s => {
      earnedCredits += s.credits;
      earnedPoints += (s.sgpa * s.credits);
    });

    const remainingCredits = degreeTotal - earnedCredits;
    const requiredTotalPoints = target * degreeTotal;
    const neededPoints = requiredTotalPoints - earnedPoints;

    resultBox.classList.remove('hidden');

    if (remainingCredits <= 0) {
      resultBox.innerHTML = `
        <div class="p-3.5 rounded-xl bg-slate-800 text-xs text-slate-300">
          All degree credits are already finalized! Final CGPA: <strong>${(earnedPoints/earnedCredits).toFixed(2)}</strong>.
        </div>
      `;
      return;
    }

    const neededAverageSGPA = neededPoints / remainingCredits;
    const roundedReq = Math.round(neededAverageSGPA * 100) / 100;

    if (neededAverageSGPA > 10.0) {
      resultBox.innerHTML = `
        <div class="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs space-y-1">
          <div class="font-bold flex items-center gap-1.5">
            <i data-lucide="alert-triangle" class="w-4 h-4"></i> Mathematically Impossible Target
          </div>
          <p>Achieving a ${target.toFixed(2)} CGPA requires an average SGPA of <strong>${roundedReq}</strong> across remaining ${remainingCredits} credits (limit is 10.00). Aim for a revised goal!</p>
        </div>
      `;
    } else if (neededAverageSGPA < 0) {
      resultBox.innerHTML = `
        <div class="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs space-y-1">
          <div class="font-bold flex items-center gap-1.5">
            <i data-lucide="check-circle" class="w-4 h-4"></i> Goal Already Secured!
          </div>
          <p>Your current accumulated points already guarantee a ${target.toFixed(2)} graduation CGPA!</p>
        </div>
      `;
    } else {
      resultBox.innerHTML = `
        <div class="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-200 text-xs space-y-1.5">
          <div class="font-bold text-white flex items-center gap-1.5">
            <i data-lucide="sparkles" class="w-4 h-4 text-indigo-400"></i> Target Roadmap:
          </div>
          <p class="leading-relaxed">
            To graduate with a <span class="font-extrabold text-white">${target.toFixed(2)} CGPA</span>, you must maintain an average SGPA of 
            <span class="font-black text-sm text-indigo-300 px-1.5 py-0.5 rounded bg-indigo-900/60 border border-indigo-500/40">${roundedReq}</span> 
            across your remaining <strong>${remainingCredits} credits</strong>.
          </p>
        </div>
      `;
    }

    lucide.createIcons();
  }
};
