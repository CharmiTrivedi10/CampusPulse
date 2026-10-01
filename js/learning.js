// js/learning.js - Learning Platform, Course Materials, Flashcards/Quizzes, & Note Sharing

const LearningModule = {
  activeCourseId: null,
  activeQuizCourseId: null,
  currentQuizIndex: 0,
  quizScore: 0,
  userAnswers: [],

  init() {
    this.renderCourses();
    this.setupEventListeners();
  },

  setupEventListeners() {
    const uploadForm = document.getElementById('upload-resource-form');
    if (uploadForm) {
      uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleUploadResource();
      });
    }
  },

  renderCourses() {
    const container = document.getElementById('courses-grid');
    if (!container) return;

    const data = AppState.getData();
    container.innerHTML = data.courses.map(course => {
      return `
        <div class="glass-card rounded-2xl overflow-hidden border border-gray-800 flex flex-col justify-between">
          <div>
            <div class="relative h-36 overflow-hidden">
              <img src="${course.thumbnail}" alt="${course.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div class="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent"></div>
              <span class="absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/80 text-white backdrop-blur-md">
                ${course.code}
              </span>
              <span class="absolute bottom-2 left-3 text-xs text-indigo-300 font-medium">
                ${course.category}
              </span>
            </div>

            <div class="p-5">
              <h3 class="font-bold text-white text-base mb-1.5 leading-snug">${course.title}</h3>
              <p class="text-xs text-gray-400 mb-4 line-clamp-2 leading-relaxed">${course.description}</p>
              
              <div class="space-y-1.5 mb-5">
                <span class="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Key Syllabus Units:</span>
                ${course.units.slice(0, 3).map(u => `
                  <div class="flex items-center gap-2 text-xs text-gray-300">
                    <i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-indigo-400 shrink-0"></i>
                    <span class="truncate">${u}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <div class="p-5 pt-0 grid grid-cols-2 gap-2">
            <button onclick="LearningModule.openCourseDetail('${course.id}')"
              class="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 transition-all flex items-center justify-center gap-1.5">
              <i data-lucide="folder-down" class="w-3.5 h-3.5"></i>
              <span>Resources (${course.resources.length})</span>
            </button>
            <button onclick="LearningModule.startQuiz('${course.id}')"
              class="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all flex items-center justify-center gap-1.5">
              <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
              <span>Practice Quiz</span>
            </button>
          </div>
        </div>
      `;
    }).join('');

    lucide.createIcons();
  },

  openCourseDetail(courseId) {
    const data = AppState.getData();
    const course = data.courses.find(c => c.id === courseId);
    if (!course) return;

    this.activeCourseId = courseId;
    const modal = document.getElementById('course-detail-modal');
    const titleEl = document.getElementById('course-modal-title');
    const descEl = document.getElementById('course-modal-desc');
    const unitsContainer = document.getElementById('course-modal-units');
    const resourcesContainer = document.getElementById('course-modal-resources');

    if (titleEl) titleEl.textContent = `${course.code}: ${course.title}`;
    if (descEl) descEl.textContent = course.description;

    if (unitsContainer) {
      unitsContainer.innerHTML = course.units.map((u, i) => `
        <div class="p-3 bg-gray-900/60 rounded-xl border border-gray-800 text-xs text-gray-300 flex items-center gap-3">
          <span class="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-[10px] shrink-0">
            ${i + 1}
          </span>
          <span>${u}</span>
        </div>
      `).join('');
    }

    if (resourcesContainer) {
      resourcesContainer.innerHTML = course.resources.map(res => {
        let icon = 'file-text';
        let badgeColor = 'text-blue-400 bg-blue-500/10 border-blue-500/20';

        if (res.type === 'video') {
          icon = 'play-circle';
          badgeColor = 'text-rose-400 bg-rose-500/10 border-rose-500/20';
        } else if (res.type === 'pdf') {
          icon = 'file';
          badgeColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
        }

        return `
          <div class="p-3.5 bg-gray-900/80 rounded-xl border border-gray-800 flex items-center justify-between gap-3 hover:border-gray-700 transition-all">
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-lg ${badgeColor} border">
                <i data-lucide="${icon}" class="w-4 h-4"></i>
              </div>
              <div>
                <h4 class="text-xs font-semibold text-white leading-tight">${res.title}</h4>
                <span class="text-[10px] text-gray-400">${res.size} • Verified</span>
              </div>
            </div>
            <a href="${res.url}" target="_blank" onclick="AppState.showToast('Opening verified engineering resource...', 'info')"
              class="px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white text-xs font-medium border border-indigo-500/30 flex items-center gap-1.5 transition-all">
              <span>View</span>
              <i data-lucide="external-link" class="w-3 h-3"></i>
            </a>
          </div>
        `;
      }).join('');
    }

    if (modal) modal.classList.remove('hidden');
    lucide.createIcons();
  },

  closeCourseDetail() {
    this.activeCourseId = null;
    const modal = document.getElementById('course-detail-modal');
    if (modal) modal.classList.add('hidden');
  },

  handleUploadResource() {
    const courseCodeSelect = document.getElementById('upload-course-code');
    const titleInput = document.getElementById('upload-resource-title');
    const typeSelect = document.getElementById('upload-resource-type');
    const urlInput = document.getElementById('upload-resource-url');

    if (!titleInput || !titleInput.value.trim()) return;

    const code = courseCodeSelect ? courseCodeSelect.value : 'MATH101';
    const data = AppState.getData();
    const course = data.courses.find(c => c.code === code);

    if (course) {
      course.resources.unshift({
        type: typeSelect ? typeSelect.value : 'notes',
        title: titleInput.value.trim(),
        size: 'Community Upload',
        url: urlInput && urlInput.value.trim() ? urlInput.value.trim() : '#'
      });

      AppState.saveData(data);
      this.renderCourses();
      
      const modal = document.getElementById('upload-modal');
      if (modal) modal.classList.add('hidden');
      
      titleInput.value = '';
      AppState.showToast('Resource uploaded and shared with college students! 📚', 'success');
    }
  },

  // Interactive Quiz System
  startQuiz(courseId) {
    const data = AppState.getData();
    const course = data.courses.find(c => c.id === courseId);
    if (!course || !course.quiz || course.quiz.length === 0) {
      AppState.showToast('No quiz available for this course yet.', 'info');
      return;
    }

    this.activeQuizCourseId = courseId;
    this.currentQuizIndex = 0;
    this.quizScore = 0;
    this.userAnswers = [];

    const modal = document.getElementById('quiz-modal');
    const titleEl = document.getElementById('quiz-modal-title');
    if (titleEl) titleEl.textContent = `${course.title} - Quick Practice Quiz`;

    this.renderCurrentQuizQuestion();
    if (modal) modal.classList.remove('hidden');
    lucide.createIcons();
  },

  closeQuiz() {
    this.activeQuizCourseId = null;
    const modal = document.getElementById('quiz-modal');
    if (modal) modal.classList.add('hidden');
  },

  renderCurrentQuizQuestion() {
    const data = AppState.getData();
    const course = data.courses.find(c => c.id === this.activeQuizCourseId);
    if (!course) return;

    const quiz = course.quiz;
    const container = document.getElementById('quiz-question-container');
    const progressEl = document.getElementById('quiz-progress-text');
    const progressBar = document.getElementById('quiz-progress-bar');

    if (this.currentQuizIndex >= quiz.length) {
      // Quiz Finished
      this.renderQuizResults(course, quiz);
      return;
    }

    const q = quiz[this.currentQuizIndex];
    if (progressEl) progressEl.textContent = `Question ${this.currentQuizIndex + 1} of ${quiz.length}`;
    if (progressBar) progressBar.style.width = `${((this.currentQuizIndex + 1) / quiz.length) * 100}%`;

    if (container) {
      container.innerHTML = `
        <div class="space-y-4">
          <p class="text-sm font-semibold text-white leading-relaxed">${q.question}</p>
          <div class="space-y-2.5">
            ${q.options.map((opt, i) => `
              <button onclick="LearningModule.selectQuizOption(${i})"
                class="w-full text-left p-3.5 rounded-xl border border-gray-800 bg-gray-900/60 hover:bg-gray-800 hover:border-indigo-500/50 text-xs text-gray-200 transition-all flex items-center justify-between group">
                <span class="flex items-center gap-3">
                  <span class="w-6 h-6 rounded-lg bg-gray-800 group-hover:bg-indigo-600/30 text-gray-400 group-hover:text-indigo-300 font-bold flex items-center justify-center text-[11px] border border-gray-700 shrink-0">
                    ${String.fromCharCode(65 + i)}
                  </span>
                  <span>${opt}</span>
                </span>
                <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity"></i>
              </button>
            `).join('')}
          </div>
          <div id="quiz-feedback-box" class="hidden p-3.5 rounded-xl text-xs"></div>
        </div>
      `;
    }

    lucide.createIcons();
  },

  selectQuizOption(optionIndex) {
    const data = AppState.getData();
    const course = data.courses.find(c => c.id === this.activeQuizCourseId);
    if (!course) return;

    const q = course.quiz[this.currentQuizIndex];
    const isCorrect = optionIndex === q.correct;
    if (isCorrect) this.quizScore++;

    const feedbackBox = document.getElementById('quiz-feedback-box');
    if (feedbackBox) {
      feedbackBox.classList.remove('hidden');
      if (isCorrect) {
        feedbackBox.className = 'p-3.5 rounded-xl text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-1';
        feedbackBox.innerHTML = `
          <div class="font-bold flex items-center gap-2"><i data-lucide="check" class="w-4 h-4"></i> Correct Answer!</div>
          <p class="text-gray-300">${q.explanation}</p>
        `;
      } else {
        feedbackBox.className = 'p-3.5 rounded-xl text-xs bg-rose-500/10 border border-rose-500/30 text-rose-300 space-y-1';
        feedbackBox.innerHTML = `
          <div class="font-bold flex items-center gap-2"><i data-lucide="x" class="w-4 h-4"></i> Incorrect! Correct: ${q.options[q.correct]}</div>
          <p class="text-gray-300">${q.explanation}</p>
        `;
      }
      lucide.createIcons();
    }

    // Auto advance after 1.8 seconds
    setTimeout(() => {
      this.currentQuizIndex++;
      this.renderCurrentQuizQuestion();
    }, 1800);
  },

  renderQuizResults(course, quiz) {
    const container = document.getElementById('quiz-question-container');
    const progressEl = document.getElementById('quiz-progress-text');
    if (progressEl) progressEl.textContent = `Completed!`;

    const percentage = Math.round((this.quizScore / quiz.length) * 100);

    if (container) {
      container.innerHTML = `
        <div class="text-center py-6 space-y-4">
          <div class="w-16 h-16 mx-auto rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
            <i data-lucide="award" class="w-8 h-8"></i>
          </div>
          <div>
            <h3 class="text-lg font-bold text-white">Quiz Complete!</h3>
            <p class="text-xs text-gray-400 mt-1">You scored ${this.quizScore} out of ${quiz.length} (${percentage}%)</p>
          </div>
          <div class="p-3 bg-gray-900 rounded-xl border border-gray-800 text-xs text-gray-300 max-w-sm mx-auto">
            ${percentage >= 70 ? '🌟 Awesome grasp of core concepts! Keep it up for your semester exams.' : '💡 Good effort! Review the formula cheat sheet and give it another shot.'}
          </div>
          <div class="pt-2 flex justify-center gap-3">
            <button onclick="LearningModule.startQuiz('${course.id}')" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold">
              Retake Quiz
            </button>
            <button onclick="LearningModule.closeQuiz()" class="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl text-xs font-semibold">
              Close
            </button>
          </div>
        </div>
      `;
      lucide.createIcons();
    }
  }
};
