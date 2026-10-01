// js/attendance.js - Attendance Tracker with Circular/Horizontal Progress Bars & Quick Actions

const AttendanceModule = {
  init() {
    this.renderClasses();
    this.setupEventListeners();
  },

  setupEventListeners() {
    const addClassForm = document.getElementById('add-class-form');
    if (addClassForm) {
      addClassForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleAddClass();
      });
    }
  },

  calculateMetrics(attended, total, target = 75) {
    if (total === 0) {
      return {
        pct: 100,
        isSafe: true,
        diff: 0,
        message: "No lectures held yet"
      };
    }

    const pct = Math.round((attended / total) * 1000) / 10;
    const targetDecimal = target / 100;

    if (pct >= target) {
      // Safe to bunk calculation
      // (attended) / (total + x) >= targetDecimal
      // x <= (attended - targetDecimal * total) / targetDecimal
      const safeBunks = Math.floor((attended - targetDecimal * total) / targetDecimal);
      return {
        pct: pct,
        isSafe: true,
        count: safeBunks,
        message: safeBunks === 0
          ? "On threshold! Do not miss next lecture."
          : `You can safely bunk ${safeBunks} more ${safeBunks === 1 ? 'class' : 'classes'}`
      };
    } else {
      // Classes needed to recover
      // (attended + y) / (total + y) >= targetDecimal
      // y >= (targetDecimal * total - attended) / (1 - targetDecimal)
      const needToAttend = Math.ceil((targetDecimal * total - attended) / (1 - targetDecimal));
      return {
        pct: pct,
        isSafe: false,
        count: needToAttend,
        message: `Warning: Must attend next ${needToAttend} ${needToAttend === 1 ? 'class' : 'classes'} consecutively!`
      };
    }
  },

  renderClasses() {
    const container = document.getElementById('attendance-classes-grid');
    if (!container) return;

    const data = AppState.getData();
    const classes = data.classes;
    const target = data.currentUser.targetAttendance || 75;

    let overallAttended = 0;
    let overallTotal = 0;
    let atRiskCount = 0;

    container.innerHTML = classes.map(cls => {
      overallAttended += cls.attended;
      overallTotal += cls.total;

      const metrics = this.calculateMetrics(cls.attended, cls.total, target);
      if (!metrics.isSafe) atRiskCount++;

      // Visual color logic
      const isRed = metrics.pct < target;
      const isAmber = metrics.pct >= target && metrics.pct < target + 5;
      
      let badgeClass = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      let ringColor = '#10b981';
      let barFillColor = 'bg-emerald-500';
      let alertIcon = 'check-circle';

      if (isRed) {
        badgeClass = 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse';
        ringColor = '#f43f5e';
        barFillColor = 'bg-rose-500';
        alertIcon = 'alert-triangle';
      } else if (isAmber) {
        badgeClass = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
        ringColor = '#f59e0b';
        barFillColor = 'bg-amber-500';
        alertIcon = 'alert-circle';
      }

      return `
        <div class="glass-card rounded-3xl p-6 border ${isRed ? 'border-rose-500/50 bg-rose-950/10' : 'border-slate-800 bg-slate-900/80'} shadow-lg flex flex-col justify-between relative group">
          
          <div>
            <!-- Top Card Header -->
            <div class="flex items-start justify-between gap-3 mb-4">
              <div>
                <div class="flex items-center gap-2">
                  <span class="font-mono text-[11px] font-bold px-2 py-0.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                    ${cls.code}
                  </span>
                  <span class="text-xs text-slate-400">${cls.room}</span>
                </div>
                <h3 class="text-base font-bold text-white mt-1 leading-snug">${cls.name}</h3>
                <p class="text-xs text-slate-400 mt-0.5">${cls.professor} • ${cls.schedule}</p>
              </div>

              <!-- Circular Progress Gauge -->
              <div class="relative w-16 h-16 shrink-0 flex items-center justify-center">
                <svg class="w-full h-full progress-ring" viewBox="0 0 36 36">
                  <path class="text-slate-800" stroke-width="3" stroke="currentColor" fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path class="progress-ring-circle" stroke-width="3.2" stroke-dasharray="100, 100" 
                    stroke-dashoffset="${100 - metrics.pct}" stroke="${ringColor}" stroke-linecap="round" fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div class="absolute flex flex-col items-center">
                  <span class="text-xs font-black text-white">${metrics.pct}%</span>
                </div>
              </div>
            </div>

            <!-- Horizontal Progress Bar Fill -->
            <div class="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden mb-4 p-0.5 border border-slate-700/50">
              <div class="${barFillColor} h-full rounded-full transition-all duration-500" style="width: ${Math.min(100, metrics.pct)}%"></div>
            </div>

            <!-- Attendance Numbers Grid -->
            <div class="grid grid-cols-3 gap-2 p-3 bg-slate-950/70 rounded-2xl border border-slate-800 text-center mb-4">
              <div>
                <span class="text-[10px] text-slate-400 block font-medium">Attended</span>
                <span class="text-sm font-bold text-emerald-400">${cls.attended}</span>
              </div>
              <div>
                <span class="text-[10px] text-slate-400 block font-medium">Conducted</span>
                <span class="text-sm font-bold text-slate-200">${cls.total}</span>
              </div>
              <div>
                <span class="text-[10px] text-slate-400 block font-medium">Missed</span>
                <span class="text-sm font-bold text-rose-400">${cls.total - cls.attended}</span>
              </div>
            </div>

            <!-- Status Alert Badge -->
            <div class="p-3 rounded-2xl border ${badgeClass} text-xs flex items-center gap-2 mb-5">
              <i data-lucide="${alertIcon}" class="w-4 h-4 shrink-0"></i>
              <span class="font-medium">${metrics.message}</span>
            </div>
          </div>

          <!-- Bottom Action Buttons: Large + and - -->
          <div>
            <div class="grid grid-cols-2 gap-3 mb-2">
              <button onclick="AttendanceModule.markAttendance('${cls.id}', 'present')"
                class="py-3 px-4 rounded-2xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/40 transition-all font-bold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-95">
                <i data-lucide="plus-circle" class="w-4 h-4"></i>
                <span>Present (+)</span>
              </button>
              <button onclick="AttendanceModule.markAttendance('${cls.id}', 'absent')"
                class="py-3 px-4 rounded-2xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/40 transition-all font-bold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-95">
                <i data-lucide="minus-circle" class="w-4 h-4"></i>
                <span>Absent (-)</span>
              </button>
            </div>

            <div class="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800">
              <button onclick="AttendanceModule.resetClass('${cls.id}')" class="hover:text-slate-300 transition-colors">
                Reset Stats
              </button>
              <button onclick="AttendanceModule.deleteClass('${cls.id}')" class="hover:text-rose-400 transition-colors">
                Remove Course
              </button>
            </div>
          </div>

        </div>
      `;
    }).join('');

    this.updateSummaryHeader(overallAttended, overallTotal, atRiskCount, target);
    lucide.createIcons();
  },

  updateSummaryHeader(attended, total, atRisk, target) {
    const overallPct = total > 0 ? Math.round((attended / total) * 1000) / 10 : 0;

    const overallPctEl = document.getElementById('overall-attendance-display');
    const attendedCountEl = document.getElementById('overall-attended-stat');
    const totalCountEl = document.getElementById('overall-total-stat');
    const atRiskCountEl = document.getElementById('overall-at-risk-stat');
    const overallProgressBar = document.getElementById('overall-attendance-main-bar');

    if (overallPctEl) overallPctEl.textContent = `${overallPct}%`;
    if (attendedCountEl) attendedCountEl.textContent = attended;
    if (totalCountEl) totalCountEl.textContent = total;
    if (atRiskCountEl) atRiskCountEl.textContent = atRisk;

    if (overallProgressBar) {
      overallProgressBar.style.width = `${Math.min(100, overallPct)}%`;
      overallProgressBar.className = overallPct >= target 
        ? 'bg-emerald-500 h-full rounded-full transition-all duration-700' 
        : 'bg-rose-500 h-full rounded-full transition-all duration-700';
    }

    // Save back to AppState
    const data = AppState.getData();
    data.currentUser.overallAttendance = overallPct;
    AppState.saveData(data);
    AppState.updateSidebarStats();
  },

  markAttendance(classId, type) {
    const data = AppState.getData();
    const cls = data.classes.find(c => c.id === classId);
    if (!cls) return;

    if (type === 'present') {
      cls.attended += 1;
      cls.total += 1;
      AppState.showToast(`Marked Present in ${cls.code}! (+1)`, 'success');
    } else {
      cls.total += 1;
      AppState.showToast(`Marked Absent in ${cls.code}. (-1)`, 'warning');
    }

    AppState.saveData(data);
    this.renderClasses();
  },

  resetClass(classId) {
    if (!confirm('Reset attendance numbers for this class to 0?')) return;
    const data = AppState.getData();
    const cls = data.classes.find(c => c.id === classId);
    if (cls) {
      cls.attended = 0;
      cls.total = 0;
      AppState.saveData(data);
      this.renderClasses();
      AppState.showToast(`Attendance reset for ${cls.code}`, 'info');
    }
  },

  deleteClass(classId) {
    if (!confirm('Remove this course from your attendance tracker?')) return;
    const data = AppState.getData();
    data.classes = data.classes.filter(c => c.id !== classId);
    AppState.saveData(data);
    this.renderClasses();
    AppState.showToast('Course removed from tracker', 'info');
  },

  handleAddClass() {
    const nameInput = document.getElementById('new-class-name');
    const codeInput = document.getElementById('new-class-code');
    const profInput = document.getElementById('new-class-prof');
    const roomInput = document.getElementById('new-class-room');
    const attendedInput = document.getElementById('new-class-attended');
    const totalInput = document.getElementById('new-class-total');

    if (!nameInput || !nameInput.value.trim()) return;

    const data = AppState.getData();
    const newClass = {
      id: 'cls-' + Date.now(),
      name: nameInput.value.trim(),
      code: codeInput && codeInput.value.trim() ? codeInput.value.trim().toUpperCase() : 'CS' + (data.classes.length + 100),
      professor: profInput && profInput.value.trim() ? profInput.value.trim() : 'Faculty Member',
      schedule: 'Mon, Wed, Fri • Active',
      room: roomInput && roomInput.value.trim() ? roomInput.value.trim() : 'Hall 101',
      attended: parseInt(attendedInput.value) || 0,
      total: parseInt(totalInput.value) || 0,
      color: 'indigo'
    };

    data.classes.push(newClass);
    AppState.saveData(data);

    nameInput.value = '';
    if (codeInput) codeInput.value = '';
    if (profInput) profInput.value = '';
    if (roomInput) roomInput.value = '';
    if (attendedInput) attendedInput.value = '0';
    if (totalInput) totalInput.value = '0';

    const modal = document.getElementById('add-class-modal');
    if (modal) modal.classList.add('hidden');

    this.renderClasses();
    AppState.showToast(`Added ${newClass.name} to Attendance Tracker!`, 'success');
  }
};
