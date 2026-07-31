// Application Entrypoint - Control 2 Academic Portfolio

document.addEventListener('DOMContentLoaded', () => {
  console.log('⚡ Control 2 Dashboard & 100 Commands Explorer Initialized');

  // Inicializar componentes
  initCommandModal();
  initJimmyBot(COMMANDS_DATA);
  
  // Inicializar Buscador y Filtros
  initSearchAndFilter(COMMANDS_DATA, renderCommandsGrid);

  // Animación de contadores de métricas
  animateStatNumbers();
});

function renderCommandsGrid(commands) {
  const gridContainer = document.getElementById('commandsGrid');
  const countBadge = document.getElementById('commandCountBadge');

  if (!gridContainer) return;

  if (countBadge) {
    countBadge.textContent = `${commands.length} / ${COMMANDS_DATA.length} comandos`;
  }

  if (commands.length === 0) {
    gridContainer.innerHTML = `
      <div class="no-results">
        <i class="fa-solid fa-magnifying-glass-slash"></i>
        <h3>No se encontraron comandos</h3>
        <p>Intenta con otros términos como 'step', 'bode', 'ss', 'lqr' o cambia la categoría seleccionada.</p>
      </div>
    `;
    return;
  }

  gridContainer.innerHTML = commands.map(cmd => `
    <div class="command-card" onclick="handleCardClick(${cmd.id})">
      <div>
        <div class="command-header">
          <span class="command-name">${escapeHtml(cmd.name)}</span>
          <span class="command-cat-badge">${escapeHtml(cmd.category)}</span>
        </div>
        <p class="command-summary">${escapeHtml(cmd.summary)}</p>
      </div>
      
      <div>
        <div class="command-langs-strip">
          <span class="lang-chip chip-matlab">MATLAB</span>
          <span class="lang-chip chip-python">Python</span>
          <span class="lang-chip chip-octave">Octave</span>
          <span class="lang-chip chip-scilab">Scilab</span>
        </div>
      </div>
    </div>
  `).join('');
}

function handleCardClick(commandId) {
  const command = COMMANDS_DATA.find(c => c.id === commandId);
  if (command) {
    openModal(command);
  }
}

function animateStatNumbers() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  statNumbers.forEach(stat => {
    const target = +stat.dataset.target;
    let current = 0;
    const increment = Math.ceil(target / 30);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        stat.textContent = target;
        clearInterval(timer);
      } else {
        stat.textContent = current;
      }
    }, 30);
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
