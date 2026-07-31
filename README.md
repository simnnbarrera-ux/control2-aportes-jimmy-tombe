# 🎛️ Control 2 - Dashboard de Aportes Académicos & Directorio 125 Comandos

> **Asignatura:** Control 2  
> **Profesor:** Ing. Jimmy Tombé Andrade  
> **Desarrollado y Generado por:** Simón Barrera Ruíz  
> **Estado:** 🚀 Publicado & Desplegado  

---

## 📌 Descripción del Proyecto

Esta plataforma web ha sido desarrollada como un **Dashboard de Aportes Académicos** para la asignatura de **Control 2**. Nace como respuesta directa a la inquietud planteada en clase sobre la importancia de complementar el trabajo en **MATLAB** con alternativas de software libre e industrial como **Python**, **GNU Octave** y **Scilab**.

El proyecto incluye la herramienta **MatMatrix Control Explorer**, un directorio interactivo de **125 comandos esenciales de Ingeniería de Control**, detallando qué hace cada comando, cuándo utilizarlo, su sintaxis en MATLAB y su equivalente exacto en Python, Scilab y Octave. Además, cuenta con el asistente virtual **JimmyBot AI**, potenciado por la API de **Groq (Llama-3.3-70B)** para resolver dudas teóricas y de sintaxis en tiempo real.

---

## ✨ Características Principales

- ⚡ **Directorio de 100 Comandos de Control**: Mapeo completo en 7 categorías clave:
  1. *Sistemas & Funciones de Transferencia* (`tf`, `ss`, `zpk`, `ss2tf`, `tf2ss`, `zp2ss`, `ss2zp`, etc.)
  2. *Respuesta Temporal & Simulaciones* (`step`, `impulse`, `initial`, `lsim`, `stepinfo`, `gensig`, `covar`)
  3. *Respuesta en Frecuencia & Estabilidad* (`bode`, `bodemag`, `nyquist`, `nichols`, `margin`, `allmargin`, `bandwidth`, `dcgain`, `damp`)
  4. *Lugar Geométrico de Raíces (LGR) & Polos/Ceros* (`rlocus`, `pzmap`, `pole`, `zero`, `roots`, `sgrid`, `zgrid`, `ngrid`)
  5. *Controladores & Espacio de Estados* (`place`, `acker`, `lqr`, `lqg`, `dlqr`, `kalman`, `pid`, `pidtune`, `ctrb`, `obsv`)
  6. *Conexiones & Diagramas de Bloques* (`series`, `parallel`, `feedback`, `connect`, `sumblk`, `append`, `blkdiag`, `norm`, `balreal`)
  7. *Conversión Continuo/Discreto & Propiedades* (`c2d`, `d2c`, `d2d`, `isstable`, `isct`, `isdt`, `issiso`, `order`, `tzero`, `linmod`)

- 🔄 **Comparativa Multi-Lenguaje Simultánea**:
  - **MATLAB** (Sintaxis nativa)
  - **Python** (Librerías `python-control`, `scipy.signal`, `numpy`, `matplotlib`)
  - **GNU Octave** (Paquete `control`)
  - **Scilab** (Módulo `syslin` nativo)

- 🤖 **JimmyBot AI Assistant**:
  - Asistente inteligente integrado en la interfaz.
  - Conectado a **Groq LLM (Llama-3.3-70B-Versatile)** para respuestas inmediatas de alta precisión.
  - Modo fallback local offline automático ante fallos de conexión.

- 🎨 **Diseño y Estética**:
  - Interfaz cibernética futurista con acentos Cyan (`#00F0FF`) y Verde Señal (`#10B981`).
  - Paneles en Glassmorphism con Dark Mode responsivo.
  - Buscador instantáneo sin recargar la página y modales con botón de copiar código a un clic.

---

## 📁 Estructura del Código Fuente

```
.
├── index.html                  # Estructura HTML5 del Dashboard y buscador
├── vercel.json                 # Configuración de despliegue en Vercel
├── README.md                   # Documentación del proyecto
├── css/
│   └── style.css               # Estilos principales, Glassmorphism, modales y JimmyBot
└── js/
    ├── data/
    │   └── commandsData.js     # Base de datos completa con los 100 comandos mapeados
    ├── modules/
    │   ├── searchFilter.js     # Buscador en tiempo real y pestañas de categorías
    │   ├── commandModal.js     # Visor modal detallado con sintaxis y código ejecutable
    │   └── jimmybotEngine.js   # Motor de JimmyBot (Integración Groq LLM API + Fallback)
    └── app.js                  # Punto de entrada de la aplicación web
```

---

## 🛠️ Ejecución Local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/simnnbarrera-ux/control2-aportes-jimmy-tombe.git
   ```
2. Entra a la carpeta del proyecto:
   ```bash
   cd control2-aportes-jimmy-tombe
   ```
3. Abre el archivo `index.html` en tu navegador favorito o inicia un servidor local con Python:
   ```bash
   python -m http.server 8085
   ```
4. Navega a `http://localhost:8085`.

---

## 🌐 Despliegue en Vercel

El proyecto está listo para ser desplegado en Vercel:
1. Conecta el repositorio de GitHub `simnnbarrera-ux/control2-aportes-jimmy-tombe` en tu panel de Vercel.
2. Vercel detectará la configuración de `vercel.json` y desplegará la aplicación inmediatamente.

---

<p center align="center">
  <strong>Control 2 • Profesor Jimmy Tombé Andrade</strong><br>
  Generado por Simón Barrera Ruíz
</p>
