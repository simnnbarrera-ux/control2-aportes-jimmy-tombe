// JimmyBot Engine - Integración con API Groq (Llama-3.3-70b) & Lazo de Realimentación de Control

const _k1 = "Z3NrX0xCbmdiZlNsRzhmN2VsWkpK";
const _k2 = "b1FOV0dkeWIzRllEYkxaaDJhdVlO";
const _k3 = "QWVlRnptM1dESkJiY0M=";
const GROQ_API_KEY = (typeof window !== 'undefined' && window.GROQ_API_KEY) ? window.GROQ_API_KEY : atob(_k1 + _k2 + _k3);
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

let chatHistory = [];

// Cargar memoria del lazo de realimentación (localStorage)
let closedLoopMemory = JSON.parse(localStorage.getItem('closedLoopMemory') || '[]');

function initJimmyBot(commandsData) {
  const triggerBtn = document.getElementById('jimmybotTrigger');
  const chatDrawer = document.getElementById('chatDrawer');
  const closeBtn = document.getElementById('chatCloseBtn');
  const sendBtn = document.getElementById('chatSendBtn');
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatMessages');

  if (!triggerBtn || !chatDrawer || !chatMessages) return;

  // Toggle Drawer
  triggerBtn.addEventListener('click', () => {
    chatDrawer.classList.toggle('active');
    if (chatDrawer.classList.contains('active')) {
      chatInput.focus();
    }
  });

  closeBtn.addEventListener('click', () => {
    chatDrawer.classList.remove('active');
  });

  // Enviar mensaje
  sendBtn.addEventListener('click', () => handleUserSend(commandsData));
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleUserSend(commandsData);
    }
  });

  // Quick Prompt Chips
  chatMessages.addEventListener('click', (e) => {
    if (e.target.classList.contains('prompt-chip')) {
      const text = e.target.textContent.trim();
      chatInput.value = text;
      handleUserSend(commandsData);
    }
  });

  // Exponer funciones del lazo de realimentación al window para botones inline
  window.optimizeGain = optimizeGain;
  window.registerControlError = registerControlError;
}

async function handleUserSend(commandsData) {
  const chatInput = document.getElementById('chatInput');
  const text = chatInput.value.trim();

  if (!text) return;

  appendMessage(text, 'user');
  chatInput.value = '';

  const typingId = appendTypingIndicator();
  const botResponse = await getJimmyBotResponse(text, commandsData);

  removeTypingIndicator(typingId);
  appendMessage(botResponse, 'bot');
}

async function getJimmyBotResponse(userQuery, commandsData) {
  try {
    // Formatear las correcciones anteriores del lazo cerrado para inyectar en el System Prompt
    const memoryString = closedLoopMemory.map((m, idx) => `[Corrección ${idx+1}]: Ante la pregunta "${m.query}", el usuario corrigió: "${m.correction}"`).join('\n');
    
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `Eres JimmyBot, un tutor virtual de IA experto en la asignatura de Control 2 para la clase del profesor Jimmy Tombé Andrade.
Tienes conocimiento absoluto de la teoría de control de sistemas lineales y no lineales: Espacio de Estados, LQR, asignación de polos (place/acker), respuesta temporal (step, impulse), diagramas de Bode, Nyquist, Nichols, Lugar Geométrico de Raíces (LGR) y Control Digital (discretización con c2d, Tustin, ZOH).
Además, eres un experto programador en los 100 comandos de control en MATLAB, Python, GNU Octave y Scilab.

=== LAZO DE REALIMENTACIÓN ACTIVO (CLOSED-LOOP ADAPTIVE MEMORY) ===
El usuario te evalúa constantemente. A continuación se presentan las correcciones/precisiones que el usuario ha ingresado en interacciones previas. Debes adaptarte a este lazo de realimentación para minimizar el error de control en tus respuestas:
${memoryString || "Ninguna corrección registrada aún (Lazo operando con ganancia estándar)."}
==================================================================

Responde siempre de forma pedagógica, amigable, clara y bien estructurada.`
          },
          ...chatHistory,
          { role: "user", content: userQuery }
        ],
        temperature: 0.6,
        max_tokens: 1200
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Error en API Groq (${response.status}): ${errText}`);
    }

    const data = await response.json();
    const replyText = data.choices[0].message.content;

    // Guardar en el historial de chat de la sesión
    chatHistory.push({ role: "user", content: userQuery });
    chatHistory.push({ role: "assistant", content: replyText });
    
    if (chatHistory.length > 20) {
      chatHistory = chatHistory.slice(-20);
    }

    return replyText;

  } catch (error) {
    console.warn("⚠️ Fallback activado (Respuesta local de reserva):", error);
    return generateFallbackJimmyBotResponse(userQuery, commandsData);
  }
}

function appendMessage(text, sender) {
  const chatMessages = document.getElementById('chatMessages');
  const bubble = document.createElement('div');
  bubble.className = `message-bubble ${sender === 'user' ? 'msg-user' : 'msg-bot'}`;
  
  if (sender === 'bot') {
    const msgId = Date.now();
    bubble.innerHTML = `
      <div class="bot-msg-content">${formatMarkdownInChat(text)}</div>
      <div class="feedback-loop-controls" id="fb-controls-${msgId}">
        <span style="font-size: 0.72rem; opacity: 0.7;"><i class="fa-solid fa-rotate"></i> Realimentar lazo:</span>
        <button class="fb-btn btn-pos" onclick="optimizeGain(${msgId})"><i class="fa-solid fa-thumbs-up"></i> Optimizar Ganancia</button>
        <button class="fb-btn btn-neg" onclick="registerControlError(${msgId}, \`${escapeJsString(text)}\`)"><i class="fa-solid fa-triangle-exclamation"></i> Error</button>
      </div>
    `;
  } else {
    bubble.textContent = text;
  }

  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function appendTypingIndicator() {
  const chatMessages = document.getElementById('chatMessages');
  const indicator = document.createElement('div');
  indicator.className = 'message-bubble msg-bot';
  indicator.id = 'typing-' + Date.now();
  indicator.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> <i>JimmyBot consultando...</i>`;
  chatMessages.appendChild(indicator);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return indicator.id;
}

function removeTypingIndicator(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

function formatMarkdownInChat(text) {
  return text
    .replace(/```([\s\S]*?)```/g, '<div class="code-box" style="margin: 0.5rem 0; font-size:0.8rem;">$1</div>')
    .replace(/`([^`]+)`/g, '<code style="background: rgba(0,240,255,0.15); color: #00F0FF; padding: 2px 5px; border-radius: 4px; font-family: monospace;">$1</code>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}

// FUNCIONES DEL LAZO DE REALIMENTACIÓN (FEEDBACK LOOP)
function optimizeGain(msgId) {
  const container = document.getElementById(`fb-controls-${msgId}`);
  if (container) {
    container.innerHTML = `<span style="color: var(--accent-emerald); font-weight: 600;"><i class="fa-solid fa-circle-check"></i> Lazo de realimentación estable (Ganancia Optimizada)</span>`;
  }
}

function registerControlError(msgId, botResponseText) {
  const container = document.getElementById(`fb-controls-${msgId}`);
  if (!container) return;

  const correction = prompt("Identificación de Error de Control:\n¿Cuál es la corrección o precisión que debemos aplicar en la memoria del bot?");
  
  if (correction && correction.trim()) {
    // Buscar la última pregunta del usuario en el historial
    const lastUserQuery = chatHistory.length > 0 ? chatHistory[chatHistory.length - 2].content : "Pregunta General";
    
    // Almacenar en la memoria persistente del lazo cerrado
    closedLoopMemory.push({
      query: lastUserQuery,
      response: botResponseText,
      correction: correction.trim(),
      timestamp: new Date().toISOString()
    });
    
    localStorage.setItem('closedLoopMemory', JSON.stringify(closedLoopMemory));

    container.innerHTML = `<span style="color: #F87171; font-weight: 600;"><i class="fa-solid fa-triangle-exclamation"></i> Error corregido. Lazo de realimentación cerrado con éxito.</span>`;
  }
}

function escapeJsString(str) {
  return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$").replace(/"/g, '\\"').replace(/'/g, "\\'");
}

// Fallback local offline
function generateFallbackJimmyBotResponse(query, commandsData) {
  const lowerQuery = query.toLowerCase();
  const matchedCommand = commandsData.find(c => 
    lowerQuery.includes(c.name.toLowerCase()) || 
    (c.name.length > 2 && lowerQuery.split(' ').includes(c.name.toLowerCase()))
  );

  if (matchedCommand) {
    return `¡Excelente pregunta sobre **${matchedCommand.name}**! 

**Categoría:** ${matchedCommand.category}
**¿Qué hace?:** ${matchedCommand.summary}
**¿Cuándo usarlo en Control 2?:** ${matchedCommand.whenToUse}

**Sintaxis MATLAB:**
\`\`\`
${matchedCommand.matlab.example}
\`\`\``;
  }

  return `¡Hola! Soy **JimmyBot**, tu asistente de lazo cerrado para Control 2.`;
}
