// js/gpa.js - SGPA & CGPA Marking, Calculation, and Target Planner

const GPAModule = {
  gradeMap: {
    'O': 10,
    'A+': 9,
    'A': 8,
    'B+': 7,
    'B': 6,
    'C': 5,
    'P': 4,
    'F': 0
  },

  init() {
    this.renderCurrentSemesterSGPA();
    this.renderCumulativeCGPA();
    this.setupEventListeners();
  },

  setupEventListeners() {
    // Add Course Row to SGPA
    const addCourseBtn = document.getElementById('add-sgpa-row-btn');
    if (addCourseBtn) {
      addCourseBtn.addEventListener('click', () => {
        this.addCourseRow();
      });
    }

    // Target CGPA Simulator calculate button
    const targetCalcBtn = document.getElementById('calc-target-gpa-btn');
    if (targetCalcBtn) {
      targetCalcBtn.addEventListener('click', () => {
        this.calculateTargetSGPA();
      });
    }
  },

  renderCurrentSemesterSGPA() {
    const tableBody = document.getElementById('sgpa-courses-tbody');
    if (!tableBody) return;

    const data = AppState.getData();
    const courses = data.gradesData.currentSemester;

    let totalCredits = 0;
    let totalGradePoints = 0;

    tableBody.innerHTML = courses.map((course, idx) => {
      const point = this.gradeMap[course.grade] || 0;
      const weightedPoints = course.credits * point;

      totalCredits += course.credits;
      totalGradePoints += weightedPoints;

      return `
        <tr class="border-b border-gray-800 hover:bg-gray-800/30 transition-colors text-xs">
          <td class="py-3 px-3">
            <input type="text" value="${course.name}" onchange="GPAModule.updateCourseField(${idx}, 'name', this.value)"
              class="w-full bg-transparent text-gray-200 font-medium focus:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded px-1.5 py-1" />
          </td>
          <td class="py-3 px-3 text-center">
            <input type="number" min="0.5" max="8" step="0.5" value="${course.credits}" 
              onchange="GPAModule.updateCourseField(${idx}, 'credits', parseFloat(this.value) || 1)"
              class="w-16 text-center bg-gray-900/80 border border-gray-700 rounded-lg text-gray-200 py-1 focus:outline-none focus:border-indigo-500" />
          </td>
          <td class="py-3 px-3 text-center">
            <select onchange="GPAModule.updateCourseField(${idx}, 'grade', this.value)"
              class="bg-gray-900/80 border border-gray-700 rounded-lg text-gray-200 py-1 px-2 focus:outline-none focus:border-indigo-500">
              ${Object.keys(this.gradeMap).map(g => `
                <option value="${g}" ${course.grade === g ? 'selected' : ''}>${g} (${this.gradeMap[g]} pts)</option>
              `).join('')}
            </select>
          </td>
          <td class="py-3 px-3 text-center font-semibold text-indigo-300">
            ${weightedPoints.toFixed(1)}
          </td>
          <td class="py-3 px-3 text-right">
            <button onclick="GPAModule.deleteCourseRow(${idx})" class="text-gray-500 hover:text-rose-400 transition-colors p-1">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </td>
        </tr>
      `;
    }).join('');

    const sgpa = totalCredits > 0 ? (totalGradePoints / totalCredits) : 0;
    const roundedSGPA = Math.round(sgpa * 100) / 100;

    // Update SGPA stats card
    const sgpaValueEl = document.getElementById('live-sgpa-value');
    const sgpaCreditsEl = document.getElementById('live-sgpa-credits');
    const sgpaPointsEl = document.getElementById('live-sgpa-points');
    const sgpaBadgeEl = document.getElementById('live-sgpa-badge');

    if (sgpaValueEl) sgpaValueEl.textContent = roundedSGPA.toFixed(2);
    if (sgpaCreditsEl) sgpaCreditsEl.textContent = totalCredits;
    if (sgpaPointsEl) sgpaPointsEl.textContent = totalGradePoints.toFixed(1);

    if (sgpaBadgeEl) {
      if (roundedSGPA >= 9.0) {
        sgpaBadgeEl.innerHTML = `<span class="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold text-[11px]">🏆 Outstanding (10.0 scale)</span>`;
      } else if (roundedSGPA >= 8.0) {
        sgpaBadgeEl.innerHTML = `<span class="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 font-semibold text-[11px]">🌟 First Class with Distinction</span>`;
      } else if (roundedSGPA >= 7.0) {
        sgpaBadgeEl.innerHTML = `<span class="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 font-semibold text-[11px]">🎯 First Class</span>`;
      } else {
        sgpaBadgeEl.innerHTML = `<span class="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 font-semibold text-[11px]">👍 Passing Grade</span>`;
      }
    }

    // Sync Sem 1 SGPA in semesters list if Sem 1 is marked as current
    if (data.gradesData.semesters[0]) {
      data.gradesData.semesters[0].sgpa = roundedSGPA;
      data.gradesData.semesters[0].credits = totalCredits;
      AppState.saveData(data);
    }

    lucide.createIcons();
  },

  updateCourseField(index, field, value) {
    const data = AppState.getData();
    if (data.gradesData.currentSemester[index]) {
      data.gradesData.currentSemester[index][field] = value;
      AppState.saveData(data);
      this.renderCurrentSemesterSGPA();
      this.renderCumulativeCGPA();
    }
  },

  addCourseRow() {
    const data = AppState.getData();
    const count = data.gradesData.currentSemester.length + 1;
    data.gradesData.currentSemester.push({
      id: 'curr-' + Date.now(),
      name: `Elective / Subject ${count}`,
      credits: 3,
      grade: 'A'
    });

    AppState.saveData(data);
    this.renderCurrentSemesterSGPA();
    this.renderCumulativeCGPA();
    AppState.showToast('Course added to current semester', 'info');
  },

  deleteCourseRow(index) {
    const data = AppState.getData();
    if (data.gradesData.currentSemester.length <= 1) {
      AppState.showToast('Semester must have at least one course', 'warning');
      return;
    }

    data.gradesData.currentSemester.splice(index, 1);
    AppState.saveData(data);
    this.renderCurrentSemesterSGPA();
    this.renderCumulativeCGPA();
  },

  // Multi-Semester CGPA Rendering & Calculation
  renderCumulativeCGPA() {
    const container = document.getElementById('semesters-grid');
    if (!container) return;

    const data = AppState.getData();
    const semesters = data.gradesData.semesters;

    let totalCreditsEarned = 0;
    let totalWeightedPoints = 0;

    container.innerHTML = semesters.map(sem => {
      if (sem.completed) {
        totalCreditsEarned += sem.credits;
        totalWeightedPoints += (sem.sgpa * sem.credits);
      }

      return `
        <div class="glass-card rounded-2xl p-4 border border-gray-800 ${sem.completed ? 'border-indigo-500/30' : 'opacity-70'}">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-bold text-white">Semester ${sem.sem}</span>
            <label class="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" ${sem.completed ? 'checked' : ''} 
                onchange="GPAModule.toggleSemesterStatus(${sem.sem}, this.checked)"
                class="rounded border-gray-700 bg-gray-900 text-indigo-600 focus:ring-0 w-3.5 h-3.5" />
              <span class="text-[11px] text-gray-400">Done</span>
            </label>
          </div>

          <div class="space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="text-gray-400">Credits:</span>
              <input type="number" step="0.5" value="${sem.credits}" min="1" max="30"
                onchange="GPAModule.updateSemesterCredits(${sem.sem}, parseFloat(this.value) || 20)"
                class="w-16 text-right bg-gray-900/80 border border-gray-700 rounded px-2 py-0.5 text-xs text-white" />
            </div>
            <div class="flex items-center justify-between text-xs">
              <span class="text-gray-400">SGPA:</span>
              <input type="number" step="0.01" min="0" max="10" value="${sem.sgpa ? sem.sgpa.toFixed(2) : '0.00'}"
                onchange="GPAModule.updateSemesterSGPA(${sem.sem}, parseFloat(this.value) || 0)"
                class="w-16 text-right bg-gray-900/80 border border-gray-700 rounded px-2 py-0.5 text-xs text-indigo-300 font-bold" />
            </div>
          </div>
        </div>
      `;
    }).join('');

    const cgpa = totalCreditsEarned > 0 ? (totalWeightedPoints / totalCreditsEarned) : 0;
    const roundedCGPA = Math.round(cgpa * 100) / 100;

    // Update CGPA dashboard element
    const cgpaValueEl = document.getElementById('overall-cgpa-value');
    const cgpaCreditsEl = document.getElementById('overall-cgpa-credits');

    if (cgpaValueEl) cgpaValueEl.textContent = roundedCGPA.toFixed(2);
    if (cgpaCreditsEl) cgpaCreditsEl.textContent = `${totalCreditsEarned} Credits Earned`;

    // Save to AppState header stats
    data.currentUser.stats.cgpa = roundedCGPA;
    AppState.saveData(data);
    AppState.updateHeaderStats();
    lucide.createIcons();
  },

  toggleSemesterStatus(semNumber, isCompleted) {
    const data = AppState.getData();
    const target = data.gradesData.semesters.find(s => s.sem === semNumber);
    if (target) {
      target.completed = isCompleted;
      AppState.saveData(data);
      this.renderCumulativeCGPA();
    }
  },

  updateSemesterCredits(semNumber, credits) {
    const data = AppState.getData();
    const target = data.gradesData.semesters.find(s => s.sem === semNumber);
    if (target) {
      target.credits = credits;
      AppState.saveData(data);
      this.renderCumulativeCGPA();
    }
  },

  updateSemesterSGPA(semNumber, sgpa) {
    const data = AppState.getData();
    const target = data.gradesData.semesters.find(s => s.sem === semNumber);
    if (target) {
      target.sgpa = Math.min(10, Math.max(0, sgpa));
      AppState.saveData(data);
      this.renderCumulativeCGPA();
    }
  },

  // Target CGPA Simulator
  calculateTargetSGPA() {
    const targetGpaInput = document.getElementById('target-cgpa-input');
    const resultBox = document.getElementById('target-gpa-result');
    if (!targetGpaInput || !resultBox) return;

    const targetCGPA = parseFloat(targetGpaInput.value);
    if (isNaN(targetCGPA) || targetCGPA <= 0 || targetCGPA > 10) {
      AppState.showToast('Please enter a valid target CGPA between 1.0 and 10.0', 'warning');
      return;
    }

    const data = AppState.getData();
    const semesters = data.gradesData.semesters;

    let earnedCredits = 0;
    let earnedWeighted = 0;
    let remainingCredits = 0;

    semesters.forEach(s => {
      if (s.completed) {
        earnedCredits += s.credits;
        earnedWeighted += (s.sgpa * s.credits);
      } else {
        remainingCredits += s.credits;
      }
    });

    const totalDegreeCredits = earnedCredits + remainingCredits;
    const requiredTotalPoints = targetCGPA * totalDegreeCredits;
    const pointsNeeded = requiredTotalPoints - earnedWeighted;

    resultBox.classList.remove('hidden');

    if (remainingCredits === 0) {
      resultBox.innerHTML = `
        <div class="p-4 rounded-xl bg-gray-800 text-xs text-gray-300">
          All semesters are already completed! Your final CGPA is <strong>${(earnedWeighted / earnedCredits).toFixed(2)}</strong>.
        </div>
      `;
      return;
    }

    const requiredAverageSGPA = pointsNeeded / remainingCredits;
    const roundedRequired = Math.round(requiredAverageSGPA * 100) / 100;

    if (requiredAverageSGPA > 10.0) {
      resultBox.innerHTML = `
        <div class="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs space-y-1">
          <div class="font-bold flex items-center gap-1.5">
            <i data-lucide="alert-triangle" class="w-4 h-4"></i> Mathematically Unreachable Target
          </div>
          <p>To achieve a ${targetCGPA} CGPA, you would need an average SGPA of <strong>${roundedRequired}</strong> across remaining semesters (maximum possible is 10.00). Aim for a slightly adjusted target!</p>
        </div>
      `;
    } else if (requiredAverageSGPA < 0) {
      resultBox.innerHTML = `
        <div class="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs space-y-1">
          <div class="font-bold flex items-center gap-1.5">
            <i data-lucide="check-circle" class="w-4 h-4"></i> Goal Already Secured!
          </div>
          <p>Your current accumulated points already guarantee a ${targetCGPA} CGPA even with minimum pass grades in remaining semesters!</p>
        </div>
      `;
    } else {
      resultBox.innerHTML = `
        <div class="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-200 text-xs space-y-1.5">
          <div class="font-bold text-sm text-white flex items-center gap-1.5">
            <i data-lucide="sparkles" class="w-4 h-4 text-indigo-400"></i> Target Roadmap:
          </div>
          <p class="leading-relaxed">
            To graduate with a <span class="font-bold text-white">${targetCGPA} CGPA</span>, you must maintain an average SGPA of 
            <span class="font-extrabold text-base text-indigo-300 px-1 py-0.5 rounded bg-indigo-900/50">${roundedRequired}</span> 
            across your remaining <strong>${remainingCredits} credits</strong> (${semesters.filter(s => !s.completed).length} upcoming semesters).
          </p>
        </div>
      `;
    }

    lucide.createIcons();
  }
};
