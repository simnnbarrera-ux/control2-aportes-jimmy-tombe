// Módulo de Modal y Detalle de Comandos

function initCommandModal() {
  const modalBackdrop = document.getElementById('commandModal');
  const closeBtn = document.getElementById('modalCloseBtn');

  if (!modalBackdrop || !closeBtn) return;

  closeBtn.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });
}

function openModal(command) {
  const modalBackdrop = document.getElementById('commandModal');
  const modalBody = document.getElementById('modalBody');

  if (!modalBackdrop || !modalBody) return;

  modalBody.innerHTML = `
    <div class="modal-title">${command.name}</div>
    <div class="modal-category"><i class="fa-solid fa-layer-group"></i> ${command.category}</div>
    
    <div class="modal-section-title"><i class="fa-solid fa-circle-info"></i> Descripción General</div>
    <p style="color: var(--text-muted); font-size: 0.95rem;">${command.summary}</p>
    
    <div class="modal-section-title"><i class="fa-solid fa-lightbulb"></i> ¿Cuándo Utilizarlo en Control 2?</div>
    <p style="color: var(--text-muted); font-size: 0.95rem;">${command.whenToUse}</p>

    <div class="modal-section-title"><i class="fa-solid fa-code"></i> Sintaxis Principal (MATLAB)</div>
    <div class="code-box">
      <button class="btn-copy-code" onclick="copyToClipboard(\`${escapeJsString(command.matlab.syntax)}\`, this)"><i class="fa-regular fa-copy"></i> Copiar</button>
      ${escapeHtml(command.matlab.syntax)}
    </div>

    <div class="modal-section-title"><i class="fa-solid fa-laptop-code"></i> Comparativa de Equivalentes por Lenguaje</div>
    
    <div class="lang-switch-grid">
      <!-- MATLAB -->
      <div class="lang-block">
        <div class="lang-block-title" style="color: #F97316;">
          <i class="fa-solid fa-cube"></i> MATLAB
        </div>
        <div class="code-box">
          <button class="btn-copy-code" onclick="copyToClipboard(\`${escapeJsString(command.matlab.example)}\`, this)"><i class="fa-regular fa-copy"></i> Copiar</button>
          ${escapeHtml(command.matlab.example)}
        </div>
      </div>

      <!-- PYTHON -->
      <div class="lang-block">
        <div class="lang-block-title" style="color: #3B82F6;">
          <i class="fa-brands fa-python"></i> Python (${command.python.library})
        </div>
        <div class="code-box">
          <button class="btn-copy-code" onclick="copyToClipboard(\`${escapeJsString(command.python.code)}\`, this)"><i class="fa-regular fa-copy"></i> Copiar</button>
          ${escapeHtml(command.python.code)}
        </div>
      </div>

      <!-- OCTAVE -->
      <div class="lang-block">
        <div class="lang-block-title" style="color: #10B981;">
          <i class="fa-solid fa-terminal"></i> GNU Octave (${command.octave.library})
        </div>
        <div class="code-box">
          <button class="btn-copy-code" onclick="copyToClipboard(\`${escapeJsString(command.octave.code)}\`, this)"><i class="fa-regular fa-copy"></i> Copiar</button>
          ${escapeHtml(command.octave.code)}
        </div>
      </div>

      <!-- SCILAB -->
      <div class="lang-block">
        <div class="lang-block-title" style="color: #EC4899;">
          <i class="fa-solid fa-square-root-variable"></i> Scilab (${command.scilab.library})
        </div>
        <div class="code-box">
          <button class="btn-copy-code" onclick="copyToClipboard(\`${escapeJsString(command.scilab.code)}\`, this)"><i class="fa-regular fa-copy"></i> Copiar</button>
          ${escapeHtml(command.scilab.code)}
        </div>
      </div>
    </div>
  `;

  modalBackdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modalBackdrop = document.getElementById('commandModal');
  if (modalBackdrop) {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

function copyToClipboard(text, btnElement) {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = btnElement.innerHTML;
    btnElement.innerHTML = '<i class="fa-solid fa-check"></i> ¡Copiado!';
    btnElement.style.color = '#10B981';
    setTimeout(() => {
      btnElement.innerHTML = originalText;
      btnElement.style.color = '';
    }, 2000);
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeJsString(str) {
  return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
}
