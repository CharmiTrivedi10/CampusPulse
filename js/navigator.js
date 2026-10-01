// js/navigator.js - Interactive Campus Navigator & Route Visualizer

const NavigatorModule = {
  selectedBuildingId: null,
  activeRouteId: null,
  searchQuery: '',
  activeCategory: 'All',

  init() {
    this.renderMap();
    this.renderQuickRouteButtons();
    this.setupEventListeners();
  },

  setupEventListeners() {
    // Search input
    const searchInput = document.getElementById('map-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.handleSearch();
      });
    }

    // Category filter pills
    document.querySelectorAll('.map-category-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeCategory = btn.dataset.category;
        document.querySelectorAll('.map-category-btn').forEach(b => {
          if (b.dataset.category === this.activeCategory) {
            b.classList.add('bg-indigo-600', 'text-white');
            b.classList.remove('bg-slate-800', 'text-slate-300');
          } else {
            b.classList.remove('bg-indigo-600', 'text-white');
            b.classList.add('bg-slate-800', 'text-slate-300');
          }
        });
        this.filterBuildingsOnMap();
      });
    });
  },

  renderMap() {
    const svg = document.getElementById('campus-svg-map');
    if (!svg) return;

    const data = AppState.getData();
    const buildings = data.buildings;

    // Construct SVG buildings
    const buildingsGroup = document.getElementById('svg-buildings-layer');
    if (!buildingsGroup) return;

    buildingsGroup.innerHTML = buildings.map(bldg => {
      const isSelected = this.selectedBuildingId === bldg.id;
      return `
        <g id="svg-bldg-${bldg.id}" class="cursor-pointer group bldg-node" onclick="NavigatorModule.selectBuilding('${bldg.id}')">
          <!-- Building Base Shape -->
          <rect x="${bldg.x}" y="${bldg.y}" width="${bldg.width}" height="${bldg.height}" rx="14" 
            class="transition-all duration-300 ${isSelected ? 'stroke-indigo-400 stroke-[3px]' : 'stroke-slate-700/80 stroke-[1.5px] hover:stroke-indigo-400'}"
            fill="${isSelected ? '#1e1b4b' : '#0f172a'}" fill-opacity="0.9" />

          <!-- Color Accent Stripe -->
          <rect x="${bldg.x}" y="${bldg.y}" width="${bldg.width}" height="6" rx="3" fill="${bldg.color}" />

          <!-- Icon & Label Container -->
          <g transform="translate(${bldg.x + 12}, ${bldg.y + 24})">
            <circle cx="12" cy="12" r="14" fill="${bldg.color}" fill-opacity="0.2" />
            <text x="34" y="10" fill="#f8fafc" font-size="12" font-weight="700" font-family="Inter, sans-serif">${bldg.shortName}</text>
            <text x="34" y="24" fill="#94a3b8" font-size="9.5" font-weight="500" font-family="Inter, sans-serif">${bldg.category}</text>
          </g>

          <!-- Status Indicator Dot -->
          <circle cx="${bldg.x + bldg.width - 16}" cy="${bldg.y + 20}" r="4" fill="#10b981" />
        </g>
      `;
    }).join('');

    // If an initial building isn't selected, select the first one
    if (!this.selectedBuildingId && buildings.length > 0) {
      this.selectBuilding(buildings[0].id, false);
    }
  },

  selectBuilding(buildingId, triggerScroll = true) {
    this.selectedBuildingId = buildingId;
    const data = AppState.getData();
    const bldg = data.buildings.find(b => b.id === buildingId);
    if (!bldg) return;

    // Highlight on SVG
    document.querySelectorAll('.bldg-node rect').forEach(rect => {
      rect.classList.remove('stroke-indigo-400', 'stroke-[3px]');
      rect.setAttribute('fill', '#0f172a');
    });

    const activeNode = document.getElementById(`svg-bldg-${buildingId}`);
    if (activeNode) {
      const activeRect = activeNode.querySelector('rect');
      if (activeRect) {
        activeRect.classList.add('stroke-indigo-400', 'stroke-[3px]');
        activeRect.setAttribute('fill', '#1e1b4b');
      }
    }

    // Render Details Drawer/Card
    const drawer = document.getElementById('building-detail-card');
    if (drawer) {
      drawer.innerHTML = `
        <div class="glass-card rounded-2xl p-5 border border-slate-800 bg-slate-900/90 shadow-xl space-y-4">
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0" style="background-color: ${bldg.color}25; border: 1px solid ${bldg.color}60">
                <i data-lucide="${bldg.icon}" class="w-6 h-6" style="color: ${bldg.color}"></i>
              </div>
              <div>
                <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  ${bldg.category}
                </span>
                <h3 class="text-base font-bold text-white mt-1 leading-snug">${bldg.name}</h3>
              </div>
            </div>
            <span class="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Open Now
            </span>
          </div>

          <p class="text-xs text-slate-300 leading-relaxed">${bldg.description}</p>

          <div class="grid grid-cols-2 gap-2 text-xs">
            <div class="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <span class="text-[10px] text-slate-400 block">Operating Hours</span>
              <span class="font-semibold text-slate-200 mt-0.5 block">${bldg.hours}</span>
            </div>
            <div class="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <span class="text-[10px] text-slate-400 block">Building Capacity</span>
              <span class="font-semibold text-slate-200 mt-0.5 block">${bldg.floors} Floors • Elevator</span>
            </div>
          </div>

          <div>
            <span class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">Amenities & Facilities:</span>
            <div class="flex flex-wrap gap-1.5">
              ${bldg.facilities.map(f => `
                <span class="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700/80 flex items-center gap-1.5">
                  <i data-lucide="check" class="w-3 h-3 text-indigo-400"></i> ${f}
                </span>
              `).join('')}
            </div>
          </div>

          <div class="pt-2 border-t border-slate-800/80 flex gap-2">
            <button onclick="NavigatorModule.findRoutesTo('${bldg.id}')"
              class="flex-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/30">
              <i data-lucide="navigation" class="w-3.5 h-3.5"></i>
              <span>Get Directions Here</span>
            </button>
            <button onclick="AppState.showToast('Building bookmark saved to favorites!', 'success')"
              class="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs transition-colors">
              <i data-lucide="bookmark" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
      `;
      lucide.createIcons();
    }
  },

  renderQuickRouteButtons() {
    const container = document.getElementById('quick-routes-container');
    if (!container) return;

    const data = AppState.getData();
    container.innerHTML = data.quickRoutes.map(r => {
      const isActive = this.activeRouteId === r.id;
      return `
        <button onclick="NavigatorModule.selectRoute('${r.id}')"
          class="w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between group ${
            isActive 
              ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/10' 
              : 'bg-slate-800/50 hover:bg-slate-800 border-slate-700/80 text-slate-200'
          }">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-xl ${isActive ? 'bg-indigo-600 text-white' : 'bg-slate-700/60 text-slate-400'} flex items-center justify-center shrink-0">
              <i data-lucide="footprints" class="w-4 h-4"></i>
            </div>
            <div>
              <h4 class="font-bold text-xs ${isActive ? 'text-white' : 'text-slate-200'}">${r.title}</h4>
              <p class="text-[11px] text-slate-400 mt-0.5">${r.time} • ${r.distance}</p>
            </div>
          </div>
          <i data-lucide="chevron-right" class="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors"></i>
        </button>
      `;
    }).join('');

    lucide.createIcons();
  },

  selectRoute(routeId) {
    this.activeRouteId = routeId;
    const data = AppState.getData();
    const route = data.quickRoutes.find(r => r.id === routeId);
    if (!route) return;

    // Render active route on SVG map
    const routePathEl = document.getElementById('svg-active-route-path');
    const startPinEl = document.getElementById('svg-route-start-pin');
    const endPinEl = document.getElementById('svg-route-end-pin');

    if (routePathEl) {
      routePathEl.setAttribute('d', route.path);
      routePathEl.classList.remove('hidden');
      routePathEl.classList.add('route-pulse-anim');
    }

    // Place Start & End Pins
    const fromBldg = data.buildings.find(b => b.id === route.fromId);
    const toBldg = data.buildings.find(b => b.id === route.toId);

    if (startPinEl && fromBldg) {
      startPinEl.setAttribute('cx', fromBldg.x + fromBldg.width / 2);
      startPinEl.setAttribute('cy', fromBldg.y + fromBldg.height / 2);
      startPinEl.classList.remove('hidden');
    }

    if (endPinEl && toBldg) {
      endPinEl.setAttribute('cx', toBldg.x + toBldg.width / 2);
      endPinEl.setAttribute('cy', toBldg.y + toBldg.height / 2);
      endPinEl.classList.remove('hidden');
    }

    // Update Quick Routes List UI
    this.renderQuickRouteButtons();

    // Show Route Summary Card
    const routeCard = document.getElementById('active-route-summary');
    if (routeCard) {
      routeCard.classList.remove('hidden');
      routeCard.innerHTML = `
        <div class="glass-card rounded-2xl p-4 border border-indigo-500/40 bg-indigo-950/30 space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <h4 class="font-bold text-xs text-white">${route.title}</h4>
            </div>
            <button onclick="NavigatorModule.clearRoute()" class="text-slate-400 hover:text-rose-400 text-xs font-semibold">
              Clear Path
            </button>
          </div>

          <div class="grid grid-cols-3 gap-2 text-center py-2 bg-slate-900/80 rounded-xl border border-slate-800">
            <div>
              <span class="text-[10px] text-slate-400 block">Est. Time</span>
              <span class="text-xs font-bold text-emerald-400">${route.time}</span>
            </div>
            <div>
              <span class="text-[10px] text-slate-400 block">Distance</span>
              <span class="text-xs font-bold text-slate-200">${route.distance}</span>
            </div>
            <div>
              <span class="text-[10px] text-slate-400 block">Energy</span>
              <span class="text-xs font-bold text-indigo-300">${route.calories}</span>
            </div>
          </div>

          <div class="space-y-1.5 pt-1">
            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Step-by-Step Directions:</span>
            ${route.steps.map((s, idx) => `
              <div class="text-[11px] text-slate-300 flex items-start gap-2">
                <span class="w-4 h-4 rounded-full bg-slate-800 text-slate-400 text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  ${idx + 1}
                </span>
                <span>${s}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    AppState.showToast(`Route displayed: ${route.title} (${route.time})`, 'info');
    lucide.createIcons();
  },

  clearRoute() {
    this.activeRouteId = null;
    const routePathEl = document.getElementById('svg-active-route-path');
    const startPinEl = document.getElementById('svg-route-start-pin');
    const endPinEl = document.getElementById('svg-route-end-pin');

    if (routePathEl) routePathEl.classList.add('hidden');
    if (startPinEl) startPinEl.classList.add('hidden');
    if (endPinEl) endPinEl.classList.add('hidden');

    const routeCard = document.getElementById('active-route-summary');
    if (routeCard) routeCard.classList.add('hidden');

    this.renderQuickRouteButtons();
  },

  handleSearch() {
    const data = AppState.getData();
    if (!this.searchQuery) {
      this.filterBuildingsOnMap();
      return;
    }

    const matches = data.buildings.filter(b => 
      b.name.toLowerCase().includes(this.searchQuery) ||
      b.shortName.toLowerCase().includes(this.searchQuery) ||
      b.category.toLowerCase().includes(this.searchQuery) ||
      b.facilities.some(f => f.toLowerCase().includes(this.searchQuery))
    );

    document.querySelectorAll('.bldg-node').forEach(node => {
      const bldgId = node.id.replace('svg-bldg-', '');
      const isMatch = matches.some(m => m.id === bldgId);
      node.style.opacity = isMatch ? '1' : '0.25';
    });

    if (matches.length > 0) {
      this.selectBuilding(matches[0].id, false);
    }
  },

  filterBuildingsOnMap() {
    const data = AppState.getData();
    document.querySelectorAll('.bldg-node').forEach(node => {
      const bldgId = node.id.replace('svg-bldg-', '');
      const bldg = data.buildings.find(b => b.id === bldgId);
      if (!bldg) return;

      if (this.activeCategory === 'All' || bldg.category === this.activeCategory) {
        node.style.opacity = '1';
      } else {
        node.style.opacity = '0.25';
      }
    });
  },

  findRoutesTo(buildingId) {
    const data = AppState.getData();
    const route = data.quickRoutes.find(r => r.toId === buildingId || r.fromId === buildingId);
    if (route) {
      this.selectRoute(route.id);
    } else {
      AppState.showToast('Path marked from Central Walkway to destination!', 'info');
    }
  }
};
