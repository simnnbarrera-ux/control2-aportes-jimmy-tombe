// Módulo de Buscador y Filtro en Tiempo Real

let currentCategory = 'All';
let currentSearchTerm = '';

function initSearchAndFilter(commandsData, renderCallback) {
  const searchInput = document.getElementById('searchInput');
  const categoryTabsContainer = document.getElementById('categoryTabs');

  if (!searchInput || !categoryTabsContainer) return;

  // Extraer categorías únicas
  const categories = ['All', ...new Set(commandsData.map(c => c.category))];

  // Renderizar Tabs de Categoría
  categoryTabsContainer.innerHTML = categories.map(cat => {
    const activeClass = cat === 'All' ? 'active' : '';
    const label = cat === 'All' ? '⚡ Todos los Comandos' : cat;
    return `<button class="tab-btn ${activeClass}" data-category="${cat}">${label}</button>`;
  }).join('');

  // Event listener para el input de búsqueda
  searchInput.addEventListener('input', (e) => {
    currentSearchTerm = e.target.value.toLowerCase().trim();
    filterAndRender(commandsData, renderCallback);
  });

  // Event listener para las pestañas de categorías
  categoryTabsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('tab-btn')) {
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
      currentCategory = e.target.dataset.category;
      filterAndRender(commandsData, renderCallback);
    }
  });

  // Renderizado inicial
  filterAndRender(commandsData, renderCallback);
}

function filterAndRender(commandsData, renderCallback) {
  const filtered = commandsData.filter(cmd => {
    const matchesCategory = (currentCategory === 'All') || (cmd.category === currentCategory);
    
    const matchesSearch = !currentSearchTerm || 
      cmd.name.toLowerCase().includes(currentSearchTerm) ||
      cmd.summary.toLowerCase().includes(currentSearchTerm) ||
      cmd.category.toLowerCase().includes(currentSearchTerm) ||
      cmd.whenToUse.toLowerCase().includes(currentSearchTerm) ||
      cmd.matlab.syntax.toLowerCase().includes(currentSearchTerm) ||
      cmd.python.code.toLowerCase().includes(currentSearchTerm) ||
      cmd.scilab.code.toLowerCase().includes(currentSearchTerm);

    return matchesCategory && matchesSearch;
  });

  renderCallback(filtered);
}
