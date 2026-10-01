// js/app.js - CampusPulse Orchestrator, Persistent Sidebar Navigation, & Global State

const STORAGE_KEY = 'CAMPUSPULSE_DATA_V2';

const AppState = {
  data: null,
  currentTab: 'navigator',

  init() {
    this.loadData();
    this.setupSidebarNavigation();
    this.updateSidebarStats();

    // Initialize all 4 core submodules
    if (window.NavigatorModule) NavigatorModule.init();
    if (window.NetworkingModule) NetworkingModule.init();
    if (window.AttendanceModule) AttendanceModule.init();
    if (window.AcademicsModule) AcademicsModule.init();

    if (window.lucide) {
      lucide.createIcons();
    }
  },

  loadData() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        this.data = JSON.parse(raw);
      } catch (err) {
        console.error('Failed to parse cached data, restoring default CAMPUS_DATA', err);
        this.data = JSON.parse(JSON.stringify(CAMPUS_DATA));
      }
    } else {
      this.data = JSON.parse(JSON.stringify(CAMPUS_DATA));
      this.saveData(this.data);
    }
  },

  getData() {
    if (!this.data) this.loadData();
    return this.data;
  },

  saveData(newData) {
    this.data = newData;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
  },

  resetAllData() {
    if (confirm('Reset CampusPulse data back to default settings?')) {
      localStorage.removeItem(STORAGE_KEY);
      window.location.reload();
    }
  },

  setupSidebarNavigation() {
    const navButtons = document.querySelectorAll('.sidebar-nav-btn');
    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        this.switchTab(target);
      });
    });
  },

  switchTab(tabId) {
    this.currentTab = tabId;

    // Update Desktop Sidebar & Mobile Nav Buttons
    document.querySelectorAll('.sidebar-nav-btn').forEach(btn => {
      const isTarget = btn.dataset.tab === tabId;
      if (isTarget) {
        btn.classList.add('bg-indigo-600', 'text-white', 'shadow-lg', 'shadow-indigo-600/30', 'font-semibold');
        btn.classList.remove('text-slate-400', 'hover:bg-slate-800/60', 'hover:text-slate-200');
      } else {
        btn.classList.remove('bg-indigo-600', 'text-white', 'shadow-lg', 'shadow-indigo-600/30', 'font-semibold');
        btn.classList.add('text-slate-400', 'hover:bg-slate-800/60', 'hover:text-slate-200');
      }
    });

    // Toggle Content Views
    document.querySelectorAll('.content-panel').forEach(panel => {
      if (panel.id === `view-${tabId}`) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });

    // Re-render submodule specific elements if needed
    if (tabId === 'navigator' && window.NavigatorModule) {
      setTimeout(() => {
        NavigatorModule.renderMap();
      }, 50);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.lucide) lucide.createIcons();
  },

  updateSidebarStats() {
    const data = this.getData();
    const user = data.currentUser;
    const ac = data.academics;

    // Sidebar User Profile
    const nameEl = document.getElementById('sidebar-user-name');
    const majorEl = document.getElementById('sidebar-user-major');
    const avatarEl = document.getElementById('sidebar-user-avatar');

    if (nameEl) nameEl.textContent = user.name;
    if (majorEl) majorEl.textContent = user.major;
    if (avatarEl) avatarEl.src = user.avatar;

    // Sidebar Live Indicator Badges
    const cgpaEl = document.getElementById('sidebar-stat-cgpa');
    const attnEl = document.getElementById('sidebar-stat-attn');

    if (cgpaEl) cgpaEl.textContent = ac.overallCGPA.toFixed(2);
    if (attnEl) {
      const overallAttn = user.overallAttendance || 82;
      attnEl.textContent = `${overallAttn}%`;
      attnEl.className = overallAttn >= (user.targetAttendance || 75)
        ? 'text-xs font-bold text-emerald-400'
        : 'text-xs font-bold text-rose-400';
    }
  },

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';

    let icon = 'info';
    let borderClass = 'border-indigo-500/40';
    let iconClass = 'text-indigo-400';

    if (type === 'success') {
      icon = 'check-circle';
      borderClass = 'border-emerald-500/40';
      iconClass = 'text-emerald-400';
    } else if (type === 'warning') {
      icon = 'alert-triangle';
      borderClass = 'border-rose-500/40';
      iconClass = 'text-rose-400';
    }

    toast.classList.add(borderClass);
    toast.innerHTML = `
      <i data-lucide="${icon}" class="w-4 h-4 ${iconClass} shrink-0"></i>
      <span class="text-xs font-medium text-slate-100">${message}</span>
    `;

    container.appendChild(toast);
    if (window.lucide) lucide.createIcons();

    setTimeout(() => {
      toast.classList.add('hide');
      setTimeout(() => toast.remove(), 250);
    }, 3200);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  AppState.init();
});
