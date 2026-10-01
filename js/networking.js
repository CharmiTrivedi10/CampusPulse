// js/networking.js - Peer Networking Hub, Multi-Filter Directory, & Live Connect Chat

const NetworkingModule = {
  searchQuery: '',
  majorFilter: 'all',
  yearFilter: 'all',
  skillFilter: 'all',
  activeChatStudentId: null,

  init() {
    this.renderDirectory();
    this.setupEventListeners();
  },

  setupEventListeners() {
    // Search input
    const searchInput = document.getElementById('peer-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderDirectory();
      });
    }

    // Filter Dropdowns
    const majorSelect = document.getElementById('filter-major-select');
    if (majorSelect) {
      majorSelect.addEventListener('change', (e) => {
        this.majorFilter = e.target.value;
        this.renderDirectory();
      });
    }

    const yearSelect = document.getElementById('filter-year-select');
    if (yearSelect) {
      yearSelect.addEventListener('change', (e) => {
        this.yearFilter = e.target.value;
        this.renderDirectory();
      });
    }

    const skillSelect = document.getElementById('filter-skill-select');
    if (skillSelect) {
      skillSelect.addEventListener('change', (e) => {
        this.skillFilter = e.target.value;
        this.renderDirectory();
      });
    }

    // Chat Message Send Form
    const chatForm = document.getElementById('networking-chat-form');
    if (chatForm) {
      chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSendMessage();
      });
    }
  },

  getFilteredStudents() {
    const data = AppState.getData();
    return data.students.filter(student => {
      // Search matches
      const matchesSearch = 
        student.name.toLowerCase().includes(this.searchQuery) ||
        student.major.toLowerCase().includes(this.searchQuery) ||
        student.bio.toLowerCase().includes(this.searchQuery) ||
        student.skills.some(s => s.toLowerCase().includes(this.searchQuery));

      if (!matchesSearch) return false;

      // Major filter
      if (this.majorFilter !== 'all' && !student.major.toLowerCase().includes(this.majorFilter.toLowerCase())) {
        return false;
      }

      // Year filter
      if (this.yearFilter !== 'all' && student.gradYear !== this.yearFilter) {
        return false;
      }

      // Skill filter
      if (this.skillFilter !== 'all' && !student.skills.some(s => s.toLowerCase() === this.skillFilter.toLowerCase())) {
        return false;
      }

      return true;
    });
  },

  renderDirectory() {
    const container = document.getElementById('students-grid');
    const resultCountEl = document.getElementById('directory-count-text');
    if (!container) return;

    const students = this.getFilteredStudents();

    if (resultCountEl) {
      resultCountEl.textContent = `Showing ${students.length} student${students.length === 1 ? '' : 's'}`;
    }

    if (students.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-16 text-center text-slate-400">
          <div class="w-14 h-14 mx-auto rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center mb-3">
            <i data-lucide="user-x" class="w-7 h-7 text-slate-500"></i>
          </div>
          <h4 class="text-sm font-semibold text-slate-200">No peers match your filters</h4>
          <p class="text-xs text-slate-400 mt-1 max-w-sm mx-auto">Try clearing search terms or resetting major/skill dropdowns to discover more classmates.</p>
          <button onclick="NetworkingModule.resetFilters()" class="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl">
            Reset All Filters
          </button>
        </div>
      `;
      lucide.createIcons();
      return;
    }

    container.innerHTML = students.map(student => {
      let isConnected = student.status === 'connected';
      let isPending = student.status === 'pending';

      let connectText = 'Connect';
      let connectClass = 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20';
      let connectIcon = 'user-plus';

      if (isConnected) {
        connectText = 'Connected';
        connectClass = 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30';
        connectIcon = 'user-check';
      } else if (isPending) {
        connectText = 'Requested';
        connectClass = 'bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30';
        connectIcon = 'clock';
      }

      return `
        <div class="glass-card rounded-2xl p-5 border border-slate-800/90 flex flex-col justify-between group hover:border-indigo-500/40 transition-all">
          <div>
            <!-- Header Profile Info -->
            <div class="flex items-start justify-between gap-3 mb-3.5">
              <div class="flex items-center gap-3">
                <div class="relative">
                  <img src="${student.avatar}" alt="${student.name}" class="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500/30 group-hover:ring-indigo-500/60 transition-all" />
                  <span class="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-slate-900"></span>
                </div>
                <div>
                  <h3 class="font-bold text-white text-sm leading-snug group-hover:text-indigo-300 transition-colors">${student.name}</h3>
                  <p class="text-xs text-indigo-400 font-medium">${student.major}</p>
                  <p class="text-[11px] text-slate-400">Class of ${student.gradYear} (${student.yearLabel})</p>
                </div>
              </div>
              <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/80 shrink-0">
                ${student.badge}
              </span>
            </div>

            <!-- Student Bio -->
            <p class="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">${student.bio}</p>

            <!-- Skills & Interests Tags -->
            <div class="mb-5">
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">Skills & Interests:</span>
              <div class="flex flex-wrap gap-1.5">
                ${student.skills.map(skill => `
                  <span class="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/90 text-slate-300 border border-slate-700/60 font-medium">
                    ${skill}
                  </span>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Bottom Action Buttons -->
          <div class="pt-3 border-t border-slate-800/90 grid grid-cols-2 gap-2">
            <button onclick="NetworkingModule.handleConnect('${student.id}')"
              class="py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${connectClass}">
              <i data-lucide="${connectIcon}" class="w-3.5 h-3.5"></i>
              <span>${connectText}</span>
            </button>
            <button onclick="NetworkingModule.openChat('${student.id}')"
              class="py-2 px-3 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-1.5 transition-all">
              <i data-lucide="message-square" class="w-3.5 h-3.5"></i>
              <span>Message</span>
            </button>
          </div>
        </div>
      `;
    }).join('');

    lucide.createIcons();
  },

  handleConnect(studentId) {
    const data = AppState.getData();
    const student = data.students.find(s => s.id === studentId);
    if (!student) return;

    if (student.status === 'none') {
      student.status = 'pending';
      AppState.showToast(`Connection request sent to ${student.name}! 🚀`, 'success');
    } else if (student.status === 'pending') {
      student.status = 'connected';
      AppState.showToast(`Connected with ${student.name}! 🎉`, 'success');
    } else {
      student.status = 'none';
      AppState.showToast(`Connection removed with ${student.name}.`, 'info');
    }

    AppState.saveData(data);
    this.renderDirectory();
    AppState.updateSidebarStats();
  },

  openChat(studentId) {
    const data = AppState.getData();
    const student = data.students.find(s => s.id === studentId);
    if (!student) return;

    this.activeChatStudentId = studentId;

    const modal = document.getElementById('networking-chat-modal');
    const nameEl = document.getElementById('chat-student-name');
    const detailsEl = document.getElementById('chat-student-details');
    const avatarEl = document.getElementById('chat-student-avatar');

    if (nameEl) nameEl.textContent = student.name;
    if (detailsEl) detailsEl.textContent = `${student.major} • Class of ${student.gradYear}`;
    if (avatarEl) avatarEl.src = student.avatar;

    this.renderChatMessages();

    if (modal) modal.classList.remove('hidden');
    lucide.createIcons();
  },

  closeChat() {
    this.activeChatStudentId = null;
    const modal = document.getElementById('networking-chat-modal');
    if (modal) modal.classList.add('hidden');
  },

  renderChatMessages() {
    const container = document.getElementById('chat-messages-box');
    if (!container || !this.activeChatStudentId) return;

    const data = AppState.getData();
    const messages = data.messages[this.activeChatStudentId] || [
      { sender: 'them', text: `Hi Alex! Great connecting with you. Are you taking CS201 this semester?`, time: '10:00 AM' }
    ];

    container.innerHTML = messages.map(msg => {
      const isMe = msg.sender === 'me';
      return `
        <div class="flex flex-col ${isMe ? 'items-end' : 'items-start'}">
          <div class="max-w-[78%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
            isMe 
              ? 'bg-indigo-600 text-white rounded-br-none shadow-md shadow-indigo-600/20' 
              : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700/80'
          }">
            ${msg.text}
          </div>
          <span class="text-[10px] text-slate-500 mt-1 px-1">${msg.time}</span>
        </div>
      `;
    }).join('');

    container.scrollTop = container.scrollHeight;
  },

  handleSendMessage() {
    const input = document.getElementById('chat-message-input');
    if (!input || !input.value.trim() || !this.activeChatStudentId) return;

    const text = input.value.trim();
    const data = AppState.getData();

    if (!data.messages[this.activeChatStudentId]) {
      data.messages[this.activeChatStudentId] = [];
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    data.messages[this.activeChatStudentId].push({
      sender: 'me',
      text: text,
      time: timeStr
    });

    input.value = '';
    AppState.saveData(data);
    this.renderChatMessages();

    // Responsive simulation reply after 1.2s
    setTimeout(() => {
      const student = data.students.find(s => s.id === this.activeChatStudentId);
      const autoReplies = [
        `Sounds like a plan! Let's catch up at the library 2nd floor after class.`,
        `Definitely! I have the past midterm questions, I can share them over Drive.`,
        `Great to hear! Let's team up for the next hackathon sprint.`,
        `Thanks for reaching out! Let's connect again during tomorrow's lab session.`
      ];
      const reply = autoReplies[Math.floor(Math.random() * autoReplies.length)];

      data.messages[this.activeChatStudentId].push({
        sender: 'them',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });

      AppState.saveData(data);
      this.renderChatMessages();
    }, 1100);
  },

  resetFilters() {
    this.searchQuery = '';
    this.majorFilter = 'all';
    this.yearFilter = 'all';
    this.skillFilter = 'all';

    const s = document.getElementById('peer-search-input');
    if (s) s.value = '';
    const m = document.getElementById('filter-major-select');
    if (m) m.value = 'all';
    const y = document.getElementById('filter-year-select');
    if (y) y.value = 'all';
    const sk = document.getElementById('filter-skill-select');
    if (sk) sk.value = 'all';

    this.renderDirectory();
  }
};
