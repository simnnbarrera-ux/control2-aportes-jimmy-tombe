// Base de Datos Ampliada de Comandos de Ingeniería de Control (125 Comandos)
// Comparativa entre MATLAB, Python (python-control / scipy), Octave y Scilab

const COMMANDS_DATA = [
  // 1. Sistemas & Funciones de Transferencia
  {
    id: 1,
    name: "tf",
    category: "Sistemas & Funciones de Transferencia",
    summary: "Crea una función de transferencia LTI (Lineal e Invariante en el Tiempo) en Laplace (s) o Z (z).",
    whenToUse: "Cuando conoces los coeficientes polinomiales del numerador y denominador del sistema.",
    matlab: { syntax: "sys = tf(num, den)", example: "num = [2 1]; den = [1 3 2];\nG = tf(num, den);" },
    python: { library: "control", code: "import control as ct\nG = ct.tf([2, 1], [1, 3, 2])" },
    octave: { library: "pkg load control", code: "pkg load control\nG = tf([2 1], [1 3 2]);" },
    scilab: { library: "syslin nativo", code: "s = poly(0, 's');\nG = syslin('c', (2*s+1)/(s^2+3*s+2));" }
  },
  {
    id: 2,
    name: "ss",
    category: "Sistemas & Funciones de Transferencia",
    summary: "Crea un modelo en Espacio de Estados definido por las matrices A, B, C, D.",
    whenToUse: "En análisis multivariable (MIMO), control óptimo o estado interno del sistema (dx/dt = Ax + Bu).",
    matlab: { syntax: "sys = ss(A, B, C, D)", example: "A = [0 1; -2 -3]; B = [0; 1];\nC = [1 0]; D = 0;\nsys = ss(A, B, C, D);" },
    python: { library: "control", code: "import control as ct\nimport numpy as np\nA = np.array([[0, 1], [-2, -3]])\nB = np.array([[0], [1]])\nC = np.array([[1, 0]])\nD = np.array([[0]])\nsys = ct.ss(A, B, C, D)" },
    octave: { library: "pkg load control", code: "pkg load control\nA = [0 1; -2 -3]; B = [0; 1]; C = [1 0]; D = 0;\nsys = ss(A, B, C, D);" },
    scilab: { library: "syslin nativo", code: "A = [0 1; -2 -3]; B = [0; 1]; C = [1 0]; D = 0;\nsys = syslin('c', A, B, C, D);" }
  },
  {
    id: 3,
    name: "zpk",
    category: "Sistemas & Funciones de Transferencia",
    summary: "Define un modelo LTI especificado mediante ceros (z), polos (p) y ganancia (k).",
    whenToUse: "Cuando la función de transferencia está factorizada en términos de sus raíces y ganancia escalar.",
    matlab: { syntax: "sys = zpk(z, p, k)", example: "z = [-1]; p = [-2, -3]; k = 5;\nG = zpk(z, p, k);" },
    python: { library: "control / scipy.signal", code: "import control as ct\nG = ct.zpk([-1], [-2, -3], 5)" },
    octave: { library: "pkg load control", code: "pkg load control\nG = zpk([-1], [-2, -3], 5);" },
    scilab: { library: "syslin / poly", code: "s = poly(0, 's');\nG = syslin('c', 5*(s+1)/((s+2)*(s+3)));" }
  },
  {
    id: 4,
    name: "residue",
    category: "Sistemas & Funciones de Transferencia",
    summary: "Realiza la expansión en fracciones parciales (residuos, polos y términos directos) de B(s)/A(s).",
    whenToUse: "Indispensable para calcular la transformada inversa de Laplace a mano y verificar la respuesta analítica.",
    matlab: { syntax: "[r, p, k] = residue(num, den)", example: "num = [2 5 3]; den = [1 3 2];\n[r, p, k] = residue(num, den);" },
    python: { library: "scipy.signal", code: "from scipy.signal import residue\nr, p, k = residue([2, 5, 3], [1, 3, 2])" },
    octave: { library: "nativo", code: "[r, p, k] = residue([2 5 3], [1 3 2]);" },
    scilab: { library: "pfss", code: "s = poly(0, 's');\nG = (2*s^2 + 5*s + 3)/(s^2 + 3*s + 2);\nelist = pfss(G);" }
  },
  {
    id: 5,
    name: "residued",
    category: "Sistemas & Funciones de Transferencia",
    summary: "Realiza la expansión en fracciones parciales para funciones de transferencia discretas en Z.",
    whenToUse: "Para la transformada Z inversa en controladores digitales.",
    matlab: { syntax: "[r, p, k] = residued(num, den)", example: "[r, p, k] = residued([1 0], [1 -0.5]);" },
    python: { library: "scipy.signal", code: "from scipy.signal import residuez\nr, p, k = residuez([1, 0], [1, -0.5])" },
    octave: { library: "pkg load control", code: "[r, p, k] = residued([1 0], [1 -0.5]);" },
    scilab: { library: "pfss", code: "z = poly(0, 'z');\nG = syslin('d', z/(z - 0.5));\nelist = pfss(G);" }
  },
  {
    id: 6,
    name: "ss2tf",
    category: "Sistemas & Funciones de Transferencia",
    summary: "Convierte espacio de estados (A,B,C,D) a función de transferencia.",
    whenToUse: "Para obtener C(sI-A)^(-1)B + D.",
    matlab: { syntax: "[num, den] = ss2tf(A, B, C, D)", example: "[num, den] = ss2tf([0 1; -2 -3], [0; 1], [1 0], 0);" },
    python: { library: "scipy.signal", code: "from scipy.signal import ss2tf\nnum, den = ss2tf(A, B, C, D)" },
    octave: { library: "pkg load control", code: "[num, den] = ss2tf(A, B, C, D);" },
    scilab: { library: "ss2tf", code: "sys_ss = syslin('c', A, B, C, D);\nsys_tf = ss2tf(sys_ss);" }
  },
  {
    id: 7,
    name: "tf2ss",
    category: "Sistemas & Funciones de Transferencia",
    summary: "Convierte función de transferencia (num/den) a espacio de estados.",
    whenToUse: "Obtener las matrices A,B,C,D a partir de la ecuación diferencial.",
    matlab: { syntax: "[A, B, C, D] = tf2ss(num, den)", example: "[A, B, C, D] = tf2ss([2 1], [1 3 2]);" },
    python: { library: "scipy.signal", code: "from scipy.signal import tf2ss\nA, B, C, D = tf2ss([2, 1], [1, 3, 2])" },
    octave: { library: "pkg load control", code: "[A, B, C, D] = tf2ss([2 1], [1 3 2]);" },
    scilab: { library: "tf2ss", code: "s = poly(0, 's');\nG = syslin('c', (2*s+1)/(s^2+3*s+2));\nsys_ss = tf2ss(G);" }
  },
  {
    id: 8,
    name: "zp2ss",
    category: "Sistemas & Funciones de Transferencia",
    summary: "Convierte ceros, polos y ganancia (ZPK) a Espacio de Estados.",
    whenToUse: "Cuando el sistema está definido por sus raíces y necesitas A,B,C,D.",
    matlab: { syntax: "[A, B, C, D] = zp2ss(z, p, k)", example: "[A, B, C, D] = zp2ss([-1], [-2 -3], 5);" },
    python: { library: "scipy.signal", code: "from scipy.signal import zpk2ss\nA, B, C, D = zpk2ss([-1], [-2, -3], 5)" },
    octave: { library: "pkg load control", code: "[A, B, C, D] = zp2ss([-1], [-2 -3], 5);" },
    scilab: { library: "syslin", code: "s = poly(0, 's'); G = syslin('c', 5*(s+1)/((s+2)*(s+3))); sys_ss = tf2ss(G);" }
  },
  {
    id: 9,
    name: "ss2zp",
    category: "Sistemas & Funciones de Transferencia",
    summary: "Obtiene ceros, polos y ganancia a partir de A,B,C,D.",
    whenToUse: "Estudiar la posición de ceros y polos del modelo en espacio de estados.",
    matlab: { syntax: "[z, p, k] = ss2zp(A, B, C, D)", example: "[z, p, k] = ss2zp(A, B, C, D);" },
    python: { library: "scipy.signal", code: "from scipy.signal import ss2zpk\nz, p, k = ss2zpk(A, B, C, D)" },
    octave: { library: "pkg load control", code: "[z, p, k] = ss2zp(A, B, C, D);" },
    scilab: { library: "clean / roots", code: "sys = syslin('c', A, B, C, D); G = ss2tf(sys); z = roots(G.num); p = roots(G.den);" }
  },
  {
    id: 10,
    name: "ord2",
    category: "Sistemas & Funciones de Transferencia",
    summary: "Genera el numerador y denominador de 2do orden dados wn y zeta.",
    whenToUse: "Sintetizar plantas de 2do orden estándar con amortiguamiento y frecuencia dada.",
    matlab: { syntax: "[num, den] = ord2(wn, zeta)", example: "[num, den] = ord2(5, 0.7);" },
    python: { library: "control", code: "wn, zeta = 5, 0.7\nG = ct.tf([wn**2], [1, 2*zeta*wn, wn**2])" },
    octave: { library: "pkg load control", code: "[num, den] = ord2(5, 0.7);" },
    scilab: { library: "syslin", code: "wn = 5; zeta = 0.7; s = poly(0,'s'); G = syslin('c', wn^2/(s^2+2*zeta*wn*s+wn^2));" }
  }
];

// Catálogo adicional masivo de 115 comandos para completar exactamente 125 comandos
const ALL_EXTRA_COMMANDS = [
  // Respuesta Temporal (11-18)
  { name: "step", cat: "Respuesta Temporal & Simulaciones", sum: "Respuesta en el tiempo ante escalón unitario.", when: "Medir sobrepico, tiempo de asentamiento y error estable.", ml: "step(G)", py: "t, y = ct.step_response(G)", oct: "step(G)", sci: "csim('step', t, G)" },
  { name: "impulse", cat: "Respuesta Temporal & Simulaciones", sum: "Respuesta ante un impulso unitario (Delta de Dirac).", when: "Función de ponderación del sistema.", ml: "impulse(G)", py: "t, y = ct.impulse_response(G)", oct: "impulse(G)", sci: "csim('impuls', t, G)" },
  { name: "initial", cat: "Respuesta Temporal & Simulaciones", sum: "Respuesta no forzada desde condición inicial x0.", when: "Relajación libre del sistema.", ml: "initial(sys, x0)", py: "t, y = ct.initial_response(sys, X0=x0)", oct: "initial(sys, x0)", sci: "csim(t, x0, sys)" },
  { name: "lsim", cat: "Respuesta Temporal & Simulaciones", sum: "Respuesta ante cualquier entrada arbitraria u(t).", when: "Simular senoides, rampas, pulsos o señales reales.", ml: "lsim(G, u, t)", py: "t, y, x = ct.forced_response(G, T=t, U=u)", oct: "lsim(G, u, t)", sci: "csim(u, t, G)" },
  { name: "stepinfo", cat: "Respuesta Temporal & Simulaciones", sum: "Calcula Rise Time, Settling Time, Overshoot y Peak.", when: "Evaluación cuantitativa de desempeño.", ml: "info = stepinfo(G)", py: "info = ct.step_info(G)", oct: "info = stepinfo(G)", sci: "cálculo numérico sobre y" },
  { name: "gensig", cat: "Respuesta Temporal & Simulaciones", sum: "Genera señales periódicas de prueba (cuadrada, seno, pulso).", when: "Crear vectores de entrada para lsim.", ml: "[u, t] = gensig('square', 4, 20)", py: "scipy.signal.square(2*np.pi*t/4)", oct: "[u, t] = gensig('square', 4, 20)", sci: "squarewave(2*%pi*t/4)" },
  { name: "covar", cat: "Respuesta Temporal & Simulaciones", sum: "Covarianza en estado estable ante ruido blanco.", when: "Análisis estocástico y filtrado.", ml: "P = covar(sys, W)", py: "P = ct.covar(sys, W)", oct: "P = covar(sys, W)", sci: "lyap(A, B*W*B', 'c')" },
  { name: "damp", cat: "Respuesta Temporal & Simulaciones", sum: "Frecuencia natural (wn), amortiguamiento (zeta) y polos.", when: "Estudiar modos oscilatorios del sistema.", ml: "damp(G)", py: "wn, zeta, p = ct.damp(G)", oct: "damp(G)", sci: "damp(G)" },

  // Álgebra Matricial & Variables de Estado Avanzadas (19-35)
  { name: "expm", cat: "Álgebra Matricial & Espacio de Estados", sum: "Exponencial matricial e^(A*t), Matriz de Transición Phi(t).", when: "Solución analítica de la ecuación de estado x(t).", ml: "Phi = expm(A*t)", py: "from scipy.linalg import expm; Phi = expm(A*t)", oct: "Phi = expm(A*t)", sci: "Phi = expm(A*t)" },
  { name: "logm", cat: "Álgebra Matricial & Espacio de Estados", sum: "Logaritmo matricial ln(A).", when: "Discretización e identificación de matrices de transicion.", ml: "L = logm(A)", py: "from scipy.linalg import logm; L = logm(A)", oct: "L = logm(A)", sci: "L = logm(A)" },
  { name: "sqrtm", cat: "Álgebra Matricial & Espacio de Estados", sum: "Raíz cuadrada matricial B*B = A.", when: "Factorizaciones de covarianza en Kalman.", ml: "S = sqrtm(A)", py: "from scipy.linalg import sqrtm; S = sqrtm(A)", oct: "S = sqrtm(A)", sci: "S = sqrtm(A)" },
  { name: "polyvalm", cat: "Álgebra Matricial & Espacio de Estados", sum: "Evalúa polinomio matricial P(A) = a_n*A^n + ... + a_0*I.", when: "Aplicación del Teorema de Cayley-Hamilton.", ml: "Y = polyvalm(p, A)", py: "np.polyval(p, A) # con matrix_power", oct: "Y = polyvalm(p, A)", sci: "horner(p, A)" },
  { name: "compan", cat: "Álgebra Matricial & Espacio de Estados", sum: "Matriz compañera del polinomio característico.", when: "Convertir polinomio a forma matricial compañera.", ml: "A = compan(p)", py: "A = np.polycompanion(p)", oct: "A = compan(p)", sci: "compan(p)" },
  { name: "null", cat: "Álgebra Matricial & Espacio de Estados", sum: "Base ortonormal para el Espacio Nulo (Kernel) A*x = 0.", when: "Desacoplamiento y autovectores generalizados.", ml: "Z = null(A)", py: "from scipy.linalg import null_space; Z = null_space(A)", oct: "Z = null(A)", sci: "Z = kernel(A)" },
  { name: "orth", cat: "Álgebra Matricial & Espacio de Estados", sum: "Base ortonormal para la Imagen/Rango de A.", when: "Proyecciones ortogonales de estados.", ml: "Q = orth(A)", py: "from scipy.linalg import orth; Q = orth(A)", oct: "Q = orth(A)", sci: "Q = orth(A)" },
  { name: "pinv", cat: "Álgebra Matricial & Espacio de Estados", sum: "Pseudoinversa de Moore-Penrose.", when: "Sistemas no cuadrados u optimizaciones de mínimos cuadrados.", ml: "A_pinv = pinv(A)", py: "A_pinv = np.linalg.pinv(A)", oct: "A_pinv = pinv(A)", sci: "A_pinv = pinv(A)" },
  { name: "svd", cat: "Álgebra Matricial & Espacio de Estados", sum: "Descomposición en Valores Singulares A = U*S*V'.", when: "Evaluación de ganancia direccional en MIMO y norma H-inf.", ml: "[U, S, V] = svd(A)", py: "U, S, Vt = np.linalg.svd(A)", oct: "[U, S, V] = svd(A)", sci: "[U, S, V] = svd(A)" },
  { name: "cond", cat: "Álgebra Matricial & Espacio de Estados", sum: "Número de condición de la matriz A.", when: "Medir la sensibilidad de inversión numéricamente.", ml: "c = cond(A)", py: "c = np.linalg.cond(A)", oct: "c = cond(A)", sci: "c = cond(A)" },
  { name: "eig", cat: "Álgebra Matricial & Espacio de Estados", sum: "Autovalores y autovectores de A.", when: "Obtener los polos en espacio de estados det(sI-A)=0.", ml: "[V, D] = eig(A)", py: "vals, vecs = np.linalg.eig(A)", oct: "[V, D] = eig(A)", sci: "[V, D] = spec(A)" },
  { name: "rank", cat: "Álgebra Matricial & Espacio de Estados", sum: "Rango de la matriz.", when: "Verificar rango completo en ctrb y obsv.", ml: "r = rank(A)", py: "r = np.linalg.matrix_rank(A)", oct: "r = rank(A)", sci: "r = rank(A)" },
  { name: "det", cat: "Álgebra Matricial & Espacio de Estados", sum: "Determinante de una matriz cuadrada.", when: "Ecuación característica.", ml: "d = det(A)", py: "d = np.linalg.det(A)", oct: "d = det(A)", sci: "d = det(A)" },
  { name: "inv", cat: "Álgebra Matricial & Espacio de Estados", sum: "Inversa de una matriz A^(-1).", when: "Solución de ecuaciones lineales de estado.", ml: "Ainv = inv(A)", py: "Ainv = np.linalg.inv(A)", oct: "Ainv = inv(A)", sci: "Ainv = inv(A)" },
  { name: "lu", cat: "Álgebra Matricial & Espacio de Estados", sum: "Factorización LU (Lower-Upper).", when: "Resolución eficiente de A*x = b.", ml: "[L, U, P] = lu(A)", py: "P, L, U = scipy.linalg.lu(A)", oct: "[L, U, P] = lu(A)", sci: "[L, U] = lu(A)" },
  { name: "qr", cat: "Álgebra Matricial & Espacio de Estados", sum: "Factorización QR (Ortogonal-Triangular).", when: "Ortogonalización de Gram-Schmidt.", ml: "[Q, R] = qr(A)", py: "Q, R = np.linalg.qr(A)", oct: "[Q, R] = qr(A)", sci: "[Q, R] = qr(A)" },
  { name: "chol", cat: "Álgebra Matricial & Espacio de Estados", sum: "Factorización de Cholesky para matrices simétricas definidas positivas.", when: "Filtro de Kalman raíz cuadrada.", ml: "R = chol(A)", py: "R = np.linalg.cholesky(A)", oct: "R = chol(A)", sci: "R = cholesky(A)" },

  // Controladores & Espacio de Estados (36-55)
  { name: "place", cat: "Controladores & Espacio de Estados", sum: "Asignación de polos en espacio de estados u = -Kx.", when: "Técnica fundamental de control por realimentación.", ml: "K = place(A, B, p)", py: "K = ct.place(A, B, p)", oct: "K = place(A, B, p)", sci: "ppol(A, B, p)" },
  { name: "acker", cat: "Controladores & Espacio de Estados", sum: "Fórmula de Ackermann para asignación de polos SISO.", when: "Ubicar polos arbitrarios en SISO.", ml: "K = acker(A, B, p)", py: "K = ct.acker(A, B, p)", oct: "K = acker(A, B, p)", sci: "ppol(A, B, p)" },
  { name: "lqr", cat: "Controladores & Espacio de Estados", sum: "Regulador Cuadrático Lineal (LQR) que minimiza J.", when: "Control óptimo con sintonía Q y R.", ml: "K = lqr(A, B, Q, R)", py: "K, S, E = ct.lqr(A, B, Q, R)", oct: "K = lqr(A, B, Q, R)", sci: "lqr(sys, Q, R)" },
  { name: "dlqr", cat: "Controladores & Espacio de Estados", sum: "Regulador LQR en tiempo discreto x[k+1] = Ax[k] + Bu[k].", when: "Control óptimo digital.", ml: "K = dlqr(A, B, Q, R)", py: "K, S, E = ct.dlqr(A, B, Q, R)", oct: "K = dlqr(A, B, Q, R)", sci: "lqr en discreto" },
  { name: "kalman", cat: "Controladores & Espacio de Estados", sum: "Filtro/Observador estocástico óptimo de Kalman.", when: "Estimación con ruido de proceso y medición.", ml: "[kest, L, P] = kalman(sys, Qn, Rn)", py: "L, P, E = ct.kalman(sys, Qn, Rn)", oct: "kalman(sys, Qn, Rn)", sci: "kalm(A, C, Q, R)" },
  { name: "estim", cat: "Controladores & Espacio de Estados", sum: "Construye el observador de estado a partir de L.", when: "Formar la dinámica del estimador dx_hat/dt.", ml: "est = estim(sys, L)", py: "est = ct.estim(sys, L)", oct: "estim(sys, L)", sci: "syslin del observador" },
  { name: "reg", cat: "Controladores & Espacio de Estados", sum: "Combina el controlador K y observador L en un solo regulador.", when: "Formar la función de transferencia u(s)/y(s).", ml: "r = reg(sys, K, L)", py: "r = ct.reg(sys, K, L)", oct: "reg(sys, K, L)", sci: "interconexión regulador" },
  { name: "ctrb", cat: "Controladores & Espacio de Estados", sum: "Matriz de Controlabilidad Co = [B AB ... A^(n-1)B].", when: "Verificar si el sistema es controlable.", ml: "Co = ctrb(A, B)", py: "Co = ct.ctrb(A, B)", oct: "Co = ctrb(A, B)", sci: "cont_mat(A, B)" },
  { name: "obsv", cat: "Controladores & Espacio de Estados", sum: "Matriz de Observabilidad Ob = [C; CA; ...; CA^(n-1)].", when: "Verificar si el sistema es observable.", ml: "Ob = obsv(A, C)", py: "Ob = ct.obsv(A, C)", oct: "Ob = obsv(A, C)", sci: "obsv_mat(A, C)" },
  { name: "ctrbf", cat: "Controladores & Espacio de Estados", sum: "Forma canónica de controlabilidad (Descomposición de Kalman).", when: "Separar subespacio controlable del no controlable.", ml: "[Abar, Bbar, Cbar, T, k] = ctrbf(A, B, C)", py: "Abar, Bbar, Cbar, T, k = ct.ctrbf(A, B, C)", oct: "ctrbf(A, B, C)", sci: "contr(A, B)" },
  { name: "obsvf", cat: "Controladores & Espacio de Estados", sum: "Forma canónica de observabilidad (Descomposición de Kalman).", when: "Aislar subespacio observable.", ml: "[Abar, Bbar, Cbar, T, k] = obsvf(A, B, C)", py: "Abar, Bbar, Cbar, T, k = ct.obsvf(A, B, C)", oct: "obsvf(A, B, C)", sci: "obsv_mat(A, C)" },
  { name: "pid", cat: "Controladores", sum: "Crea objeto de controlador PID.", when: "Definir Kp, Ki, Kd.", ml: "C = pid(Kp, Ki, Kd)", py: "C = Kp + Ki/s + Kd*s", oct: "C = pid(Kp, Ki, Kd)", sci: "syslin PID" },
  { name: "pidstd", cat: "Controladores", sum: "PID en forma estándar industrial Kp*(1 + 1/(Ti*s) + Td*s).", when: "Alinearse con controladores industriales.", ml: "C = pidstd(Kp, Ti, Td)", py: "Kp*(1 + 1/(Ti*s) + Td*s)", oct: "pidstd(Kp, Ti, Td)", sci: "forma estándar" },
  { name: "pidtune", cat: "Controladores", sum: "Sintonización automática de PID.", when: "Ajuste rápido de ganancias.", ml: "C = pidtune(G, 'PID')", py: "sintonía con scipy.optimize", oct: "pidtune(G, 'PID')", sci: "optimización num" },
  { name: "pidtuner", cat: "Controladores", sum: "GUI gráfica de sintonización interactiva de PID.", when: "Ajustar sobrepico y rapidez visualmente.", ml: "pidtuner(G, 'PID')", py: "Widgets Jupyter", oct: "N/A", sci: "N/A" },
  { name: "lqg", cat: "Controladores & Espacio de Estados", sum: "Regulador dinámico estocástico óptimo LQG (LQR + Kalman).", when: "Control óptimo con ruido en estado no medible.", ml: "r = lqg(sys, Qn, Rn)", py: "r = ct.lqg(sys, Qn, Rn)", oct: "lqg(sys, Qn, Rn)", sci: "lqg nativo" },
  { name: "gram", cat: "Controladores & Espacio de Estados", sum: "Gramianos de controlabilidad y observabilidad.", when: "Reducción de modelos y balanceo.", ml: "Wc = gram(sys, 'c')", py: "Wc = ct.gram(sys, 'c')", oct: "gram(sys, 'c')", sci: "ctr_gram(sys)" },
  { name: "balreal", cat: "Reducción de Modelos", sum: "Realización balanceada (Gramianos iguales y diagonales).", when: "Preparación previa para trunca o reducir estados.", ml: "[sysb, g] = balreal(sys)", py: "sysb, g = ct.balanced_reduction(sys)", oct: "balreal(sys)", sci: "equil1(sys)" },
  { name: "modred", cat: "Reducción de Modelos", sum: "Elimina estados no dominantes manteniendo ganancia DC.", when: "Simplificar modelos de alto orden.", ml: "sys_red = modred(sysb, elim)", py: "ct.modred(sysb, elim)", oct: "modred(sysb, elim)", sci: "modred nativo" },
  { name: "minreal", cat: "Reducción de Modelos", sum: "Cancela polos y ceros redundantes.", when: "Obtener realización mínima.", ml: "sys_min = minreal(G)", py: "sys_min = ct.minreal(G)", oct: "sys_min = minreal(G)", sci: "minreal(G)" },

  // Respuesta en Frecuencia & Estabilidad (56-70)
  { name: "bode", cat: "Respuesta en Frecuencia & Estabilidad", sum: "Diagramas de Bode (Magnitud dB y Fase grados vs Frecuencia).", when: "Análisis de estabilidad frecuencial.", ml: "bode(G)", py: "ct.bode(G)", oct: "bode(G)", sci: "bode(G)" },
  { name: "bodemag", cat: "Respuesta en Frecuencia & Estabilidad", sum: "Grafica solo magnitud de Bode.", when: "Estudiar exclusivamente ganancia y ancho de banda.", ml: "bodemag(G)", py: "ct.bode_plot(G, plot_phase=False)", oct: "bodemag(G)", sci: "gainplot(G)" },
  { name: "nyquist", cat: "Respuesta en Frecuencia & Estabilidad", sum: "Diagrama polar de Nyquist G(jw).", when: "Criterio de Nyquist y rodeos al (-1, j0).", ml: "nyquist(G)", py: "ct.nyquist_plot(G)", oct: "nyquist(G)", sci: "nyquist(G)" },
  { name: "nichols", cat: "Respuesta en Frecuencia & Estabilidad", sum: "Carta de Nichols (dB vs Grados).", when: "Relacionar lazo abierto con lazo cerrado.", ml: "nichols(G)", py: "ct.nichols_plot(G)", oct: "nichols(G)", sci: "black(G)" },
  { name: "margin", cat: "Respuesta en Frecuencia & Estabilidad", sum: "Margen de Ganancia (GM) y Fase (PM) con frecuencias de cruce.", when: "Medir distancia a la inestabilidad.", ml: "[Gm, Pm, Wcg, Wcp] = margin(G)", py: "gm, pm, wg, wp = ct.margin(G)", oct: "[Gm, Pm, Wcg, Wcp] = margin(G)", sci: "[gm, wcg] = g_margin(G)" },
  { name: "allmargin", cat: "Respuesta en Frecuencia & Estabilidad", sum: "Calcula todos los márgenes para sistemas con múltiples cruces.", when: "Sistemas no mínimos en fase.", ml: "s = allmargin(G)", py: "s = ct.all_margins(G)", oct: "allmargin(G)", sci: "análisis margin" },
  { name: "bandwidth", cat: "Respuesta en Frecuencia & Estabilidad", sum: "Ancho de banda del sistema (frecuencia a -3 dB).", when: "Medir rapidez frecuencial.", ml: "bw = bandwidth(G)", py: "bw = ct.bandwidth(G)", oct: "bw = bandwidth(G)", sci: "interpolación bode" },
  { name: "dcgain", cat: "Respuesta en Frecuencia & Estabilidad", sum: "Ganancia en baja frecuencia DC.", when: "Error estacionario a escalón.", ml: "K = dcgain(G)", py: "K = ct.dcgain(G)", oct: "K = dcgain(G)", sci: "horner(G, 0)" },
  { name: "evalfr", cat: "Respuesta en Frecuencia & Estabilidad", sum: "Evalúa G(s) en s = j*w complejo.", when: "Ganancia y fase en punto s específico.", ml: "h = evalfr(G, 2j)", py: "h = ct.evalfr(G, 2j)", oct: "h = evalfr(G, 2j)", sci: "horner(G, 2*%i)" },
  { name: "freqresp", cat: "Respuesta en Frecuencia & Estabilidad", sum: "Evalúa la respuesta sobre un vector completo de frecuencias.", when: "Cálculos frecuenciales vectorizados.", ml: "H = freqresp(G, w)", py: "H = ct.freqresp(G, w)", oct: "H = freqresp(G, w)", sci: "repfreq(G, f)" },
  { name: "freqs", cat: "Filtros & Laplace", sum: "Respuesta en frecuencia de filtros analógicos continuos.", when: "Diseño de filtros analógicos.", ml: "H = freqs(b, a, w)", py: "w, H = scipy.signal.freqs(b, a, w)", oct: "freqs(b, a, w)", sci: "repfreq(G, w/(2*%pi))" },
  { name: "freqz", cat: "Filtros Digitales", sum: "Respuesta en frecuencia de filtros digitales discretos Z.", when: "Procesamiento digital de señales.", ml: "[H, w] = freqz(b, a)", py: "w, H = scipy.signal.freqz(b, a)", oct: "[H, w] = freqz(b, a)", sci: "frmag(sys, n)" },
  { name: "sgrid", cat: "Plano S & LGR", sum: "Líneas de zeta y wn en plano s.", when: "Diseño por LGR continuo.", ml: "sgrid(zeta, wn)", py: "ct.sgrid(zeta, wn)", oct: "sgrid(zeta, wn)", sci: "sgrid(zeta, wn)" },
  { name: "zgrid", cat: "Plano Z & LGR", sum: "Líneas de zeta y wn en plano z.", when: "Diseño por LGR discreto.", ml: "zgrid(zeta, wn)", py: "ct.zgrid(zeta, wn)", oct: "zgrid(zeta, wn)", sci: "zgrid nativo" },
  { name: "ngrid", cat: "Carta de Nichols", sum: "Grilla de iso-magnitud e iso-fase en Nichols.", when: "Diseño frecuencial en Nichols.", ml: "ngrid", py: "ct.ngrid()", oct: "ngrid", sci: "chart nativo" },

  // LGR & Polos/Ceros (71-80)
  { name: "rlocus", cat: "Lugar Geométrico de Raíces (LGR)", sum: "Dibuja la trayectoria de polos al variar K.", when: "Diseño gráfico clásico.", ml: "rlocus(G)", py: "ct.root_locus(G)", oct: "rlocus(G)", sci: "evans(G)" },
  { name: "rlocfind", cat: "Lugar Geométrico de Raíces (LGR)", sum: "Encuentra la ganancia K en un punto seleccionado del LGR.", when: "Diseño numérico interactivo por LGR.", ml: "[k, poles] = rlocfind(G)", py: "rlist, klist = ct.root_locus(G)", oct: "[k, poles] = rlocfind(G)", sci: "evans interactivo" },
  { name: "pzmap", cat: "Lugar Geométrico de Raíces (LGR)", sum: "Mapa de polos (X) y ceros (O).", when: "Diagnóstico visual de estabilidad.", ml: "pzmap(G)", py: "ct.pzmap(G)", oct: "pzmap(G)", sci: "plzr(G)" },
  { name: "iopzmap", cat: "Lugar Geométrico de Raíces (LGR)", sum: "Mapa de polos y ceros para cada par E/S en MIMO.", when: "Sistemas multivariables.", ml: "iopzmap(sys)", py: "ct.pzmap(sys)", oct: "iopzmap(sys)", sci: "plzr(sys)" },
  { name: "pole", cat: "Lugar Geométrico de Raíces (LGR)", sum: "Vector numérico de polos.", when: "Verificar raíces del denominador.", ml: "p = pole(G)", py: "p = ct.poles(G)", oct: "p = pole(G)", sci: "roots(G.den)" },
  { name: "zero", cat: "Lugar Geométrico de Raíces (LGR)", sum: "Vector numérico de ceros.", when: "Verificar raíces del numerador.", ml: "z = zero(G)", py: "z = ct.zeros(G)", oct: "z = zero(G)", sci: "roots(G.num)" },
  { name: "roots", cat: "Polinomios & Raíces", sum: "Calcula raíces complejas de un polinomio.", when: "Resolver a(s) = 0.", ml: "r = roots([1 3 2])", py: "np.roots([1, 3, 2])", oct: "roots([1 3 2])", sci: "roots(p)" },
  { name: "poly", cat: "Polinomios & Raíces", sum: "Polinomio característico a partir de raíces o matriz A.", when: "Obtener det(sI-A).", ml: "p = poly(A)", py: "np.poly(A)", oct: "p = poly(A)", sci: "poly(A, 's')" },
  { name: "conv", cat: "Polinomios & Raíces", sum: "Multiplica dos polinomios (convolución).", when: "Multiplicar términos como (s+2)(s+3).", ml: "p = conv(p1, p2)", py: "np.convolve(p1, p2)", oct: "conv(p1, p2)", sci: "p1 * p2" },
  { name: "deconv", cat: "Polinomios & Raíces", sum: "Divide dos polinomios (desconvolución).", when: "Simplificación polinomial.", ml: "[q, r] = deconv(num, den)", py: "q, r = np.polydiv(num, den)", oct: "[q, r] = deconv(num, den)", sci: "pdiv(num, den)" },

  // Diagramas de Bloques & Conexiones (81-95)
  { name: "feedback", cat: "Conexiones & Bloques", sum: "Realimentación T = G/(1 + G*H).", when: "Cerrar el lazo de control.", ml: "T = feedback(G*C, 1)", py: "T = ct.feedback(G*C, 1)", oct: "T = feedback(G*C, 1)", sci: "T = G*C /. 1" },
  { name: "series", cat: "Conexiones & Bloques", sum: "Conexión en cascada (multiplica sistemas).", when: "Conectar controlador y planta.", ml: "sys = series(C, G)", py: "sys = ct.series(C, G)", oct: "sys = series(C, G)", sci: "sys = G * C" },
  { name: "parallel", cat: "Conexiones & Bloques", sum: "Conexión en paralelo (suma sistemas).", when: "Sumar respuestas dinámicas.", ml: "sys = parallel(G1, G2)", py: "sys = ct.parallel(G1, G2)", oct: "sys = parallel(G1, G2)", sci: "sys = G1 + G2" },
  { name: "connect", cat: "Conexiones & Bloques", sum: "Interconexión arbitraria de diagramas de bloques complejos.", when: "Sistemas MIMO y múltiples lazos.", ml: "sys = connect(sys1, sys2, in, out)", py: "ct.interconnect([sys1, sys2], in, out)", oct: "connect(...)", sci: "interconexión manual" },
  { name: "sumblk", cat: "Conexiones & Bloques", sum: "Punto de suma para interconectar señales.", when: "Definir e = r - y.", ml: "s = sumblk('e = r - y')", py: "s = ct.sumblk('e = r - y')", oct: "sumblk(...)", sci: "sumador" },
  { name: "append", cat: "Conexiones & Bloques", sum: "Agrupa varios modelos LTI en un sistema global no acoplado.", when: "Paso previo a connect.", ml: "sys_app = append(sys1, sys2)", py: "ct.append(sys1, sys2)", oct: "append(sys1, sys2)", sci: "sysdiag(sys1, sys2)" },
  { name: "blkdiag", cat: "Conexiones & Bloques", sum: "Matriz diagonal por bloques.", when: "Combinar matrices de estado independientes.", ml: "M = blkdiag(A, B, C)", py: "scipy.linalg.block_diag(A, B, C)", oct: "blkdiag(A, B, C)", sci: "sysdiag(A, B, C)" },
  { name: "augstate", cat: "Conexiones & Bloques", sum: "Añade variables de estado x a la salida y.", when: "Realimentar todo el estado.", ml: "sys_aug = augstate(sys)", py: "ct.augstate(sys)", oct: "augstate(sys)", sci: "augstate manual" },
  { name: "sens", cat: "Conexiones & Bloques", sum: "Función de sensibilidad S = (1 + P*C)^(-1).", when: "Análisis de rechazo a perturbaciones.", ml: "S = feedback(1, P*C)", py: "S = ct.feedback(1, P*C)", oct: "S = feedback(1, P*C)", sci: "S = 1 /. (P*C)" },
  { name: "norm", cat: "Conexiones & Bloques", sum: "Norma H2 o H-infinito del sistema.", when: "Medir máxima ganancia de energía en frecuencia.", ml: "n = norm(sys, inf)", py: "n = ct.hinfnorm(sys)", oct: "norm(sys, inf)", sci: "h_norm(sys)" },
  { name: "hinfsyn", cat: "Control Robusto", sum: "Sintetiza un controlador dinámico H-infinito.", when: "Garantizar estabilidad robusta.", ml: "[K, CL, g] = hinfsyn(sys, nmeas, ncon)", py: "K, CL, g = ct.hinfsyn(sys)", oct: "hinfsyn(...)", sci: "h_inf(sys)" },
  { name: "hinfstruct", cat: "Control Robusto", sum: "Diseña controlador H-infinito con estructura fija.", when: "Optimización de PID con restricciones H-infinito.", ml: "K = hinfstruct(sys)", py: "ct.hinfstruct(sys)", oct: "hinfstruct(sys)", sci: "h_inf nativo" },
  { name: "loopmargin", cat: "Control Robusto", sum: "Márgenes de ganancia y fase multivariables.", when: "Evaluación de robustez en sistemas MIMO.", ml: "m = loopmargin(L)", py: "m = ct.loopmargin(L)", oct: "loopmargin(L)", sci: "margin MIMO" },
  { name: "robstab", cat: "Control Robusto", sum: "Análisis de estabilidad robusta ante incertidumbres.", when: "Verificar estabilidad con parámetros inciertos.", ml: "[m, w] = robstab(sys)", py: "ct.robustness_margin(sys)", oct: "robstab(sys)", sci: "análisis robustez" },
  { name: "robgain", cat: "Control Robusto", sum: "Margen de desempeño robusto.", when: "Desempeño con modelo incierto.", ml: "[m, w] = robgain(sys)", py: "ct.robust_performance(sys)", oct: "robgain(sys)", sci: "desempeño robusto" },

  // Conversión Continuo / Discreto & Propiedades (96-110)
  { name: "c2d", cat: "Conversión Continuo/Discreto", sum: "Discretiza sistema continuo LTI (ZOH, Tustin, FOH).", when: "Implementación en microcontroladores.", ml: "sysd = c2d(sys, Ts, 'tustin')", py: "sysd = ct.sample_system(sys, Ts, 'tustin')", oct: "sysd = c2d(sys, Ts, 'tustin')", sci: "dscr(sys, Ts)" },
  { name: "d2c", cat: "Conversión Continuo/Discreto", sum: "Convierte sistema discreto a equivalente continuo.", when: "Análisis continuo de modelo discreto.", ml: "sysc = d2c(sysd)", py: "sysc = ct.c2d(sysd).inverse()", oct: "d2c(sysd)", sci: "d2c(sysd)" },
  { name: "d2d", cat: "Conversión Continuo/Discreto", sum: "Re-muestrea modelo discreto a otro período Ts.", when: "Cambiar frecuencia de muestreo.", ml: "sys_new = d2d(sysd, Ts_new)", py: "ct.resample(sysd, Ts_new)", oct: "d2d(sysd, Ts_new)", sci: "d2d nativo" },
  { name: "isstable", cat: "Propiedades del Sistema", sum: "Verifica si el sistema es BIBO estable.", when: "Comprobación booleana.", ml: "bool = isstable(G)", py: "bool = ct.isstable(G)", oct: "isstable(G)", sci: "check_stable(G)" },
  { name: "isct", cat: "Propiedades del Sistema", sum: "Verifica si el sistema está en tiempo continuo.", when: "Validación de tipo de modelo.", ml: "bool = isct(G)", py: "bool = ct.iscontinuous(G)", oct: "isct(G)", sci: "G.dt == 'c'" },
  { name: "isdt", cat: "Propiedades del Sistema", sum: "Verifica si el sistema está en tiempo discreto.", when: "Validación de tiempo discreto.", ml: "bool = isdt(G)", py: "bool = ct.isdiscrete(G)", oct: "isdt(G)", sci: "G.dt == 'd'" },
  { name: "issiso", cat: "Propiedades del Sistema", sum: "Verifica si el sistema es SISO.", when: "Validación para técnicas SISO.", ml: "bool = issiso(G)", py: "bool = ct.issiso(G)", oct: "issiso(G)", sci: "size(G.B,2)==1" },
  { name: "order", cat: "Propiedades del Sistema", sum: "Número total de estados internos.", when: "Conocer el número de estados.", ml: "n = order(G)", py: "n = ct.order(G)", oct: "n = order(G)", sci: "size(G.A,1)" },
  { name: "tzero", cat: "Propiedades del Sistema", sum: "Ceros de transmisión en sistemas multivariables MIMO.", when: "Evaluación de bloqueo de frecuencia MIMO.", ml: "z = tzero(sys)", py: "z = ct.transmission_zeros(sys)", oct: "tzero(sys)", sci: "tzero(sys)" },
  { name: "ssbal", cat: "Propiedades del Sistema", sum: "Equilibra las normas de matrices A para estabilidad numérica.", when: "Pre-procesamiento numérico.", ml: "[B, T] = ssbal(A)", py: "B, T = scipy.linalg.matrix_balance(A)", oct: "ssbal(A)", sci: "balanc(A)" },
  { name: "ss2ss", cat: "Propiedades del Sistema", sum: "Transformación de coordenadas de estado z = T*x.", when: "Cambio de base en espacio de estados.", ml: "sys_t = ss2ss(sys, T)", py: "sys_t = ct.ss2ss(sys, T)", oct: "ss2ss(sys, T)", sci: "transformación de estados" },
  { name: "canon", cat: "Espacio de Estados", sum: "Transforma a forma canónica modal o compañera.", when: "Desacoplar ecuaciones diferenciales.", ml: "sys_can = canon(sys, 'modal')", py: "sys_can, T = ct.canonical_form(sys, 'modal')", oct: "canon(sys, 'modal')", sci: "bdiag(sys.A)" },
  { name: "rss", cat: "Generación Sintética", sum: "Genera modelo continuo aleatorio y estable de orden n.", when: "Pruebas sintéticas de algoritmos.", ml: "sys = rss(4)", py: "sys = ct.rss(4)", oct: "sys = rss(4)", sci: "modelo aleatorio" },
  { name: "drss", cat: "Generación Sintética", sum: "Genera modelo discreto aleatorio y estable de orden n.", when: "Pruebas sintéticas discretas.", ml: "sysd = drss(4)", py: "sysd = ct.drss(4)", oct: "sysd = drss(4)", sci: "discreto aleatorio" },
  { name: "linmod", cat: "Linealización & Simulink", sum: "Linealiza un modelo de Simulink alrededor de un punto.", when: "Obtener A,B,C,D de modelos no lineales.", ml: "[A, B, C, D] = linmod('modelo')", py: "scipy.optimize / PyDy", oct: "linmod('modelo')", sci: "linealización Xcos" },

  // Extracción de Datos & Herramientas GUI (111-125)
  { name: "ssdata", cat: "Extracción de Datos", sum: "Extrae matrices A, B, C, D.", when: "Acceso a arreglos numéricos de estados.", ml: "[A, B, C, D] = ssdata(sys)", py: "A, B, C, D = ct.ssdata(sys)", oct: "[A, B, C, D] = ssdata(sys)", sci: "A=sys.A; B=sys.B; C=sys.C; D=sys.D" },
  { name: "tfdata", cat: "Extracción de Datos", sum: "Extrae polinomios de numerador y denominador.", when: "Acceso numérico a coeficientes.", ml: "[num, den] = tfdata(sys, 'v')", py: "num, den = ct.tfdata(sys)", oct: "[num, den] = tfdata(sys, 'v')", sci: "num=sys.num; den=sys.den" },
  { name: "zpkdata", cat: "Extracción de Datos", sum: "Extrae ceros, polos y ganancia.", when: "Inspección de raíces.", ml: "[z, p, k] = zpkdata(sys, 'v')", py: "z, p, k = ct.zpkdata(sys)", oct: "[z, p, k] = zpkdata(sys, 'v')", sci: "z=roots(sys.num); p=roots(sys.den)" },
  { name: "getpvec", cat: "Parámetros", sum: "Obtiene vector de parámetros sintonizables.", when: "Optimización de controladores.", ml: "p = getpvec(sys)", py: "p = sys.get_params()", oct: "getpvec(sys)", sci: "inspección parámetros" },
  { name: "setpvec", cat: "Parámetros", sum: "Actualiza vector de parámetros en modelo.", when: "Aplicar valores de optimización.", ml: "sys = setpvec(sys, p)", py: "sys.set_params(p)", oct: "setpvec(sys, p)", sci: "actualizar parámetros" },
  { name: "simulink", cat: "Entorno Gráfico", sum: "Abre el entorno gráfico Simulink.", when: "Simulación por bloques no lineal.", ml: "simulink", py: "Xcos / OpenModelica", oct: "OpenModelica", sci: "xcos()" },
  { name: "frestimate", cat: "Identificación", sum: "Estima experimentalmente la función de transferencia.", when: "Identificación de sistemas en laboratorio.", ml: "sys = frestimate(model, in, out)", py: "identificación frecuencial", oct: "N/A", sci: "identificación nativa" },
  { name: "polyval", cat: "Polinomios & Raíces", sum: "Evalúa un polinomio en valores escalares o vectores.", when: "Calcular el valor de p(s).", ml: "y = polyval(p, x)", py: "y = np.polyval(p, x)", oct: "y = polyval(p, x)", sci: "y = horner(p, x)" },
  { name: "polyfit", cat: "Polinomios & Raíces", sum: "Ajuste polinomial por mínimos cuadrados a datos x, y.", when: "Identificación y curvas de calibración.", ml: "p = polyfit(x, y, n)", py: "p = np.polyfit(x, y, n)", oct: "p = polyfit(x, y, n)", sci: "p = polyfit(x, y, n)" },
  { name: "polyder", cat: "Polinomios & Raíces", sum: "Calcula la derivada analítica de un polinomio.", when: "Cálculo de máximos/mínimos en raíces.", ml: "dp = polyder(p)", py: "dp = np.polyder(p)", oct: "dp = polyder(p)", sci: "dp = derivat(p)" },
  { name: "polyint", cat: "Polinomios & Raíces", sum: "Calcula la integral analítica de un polinomio.", when: "Integración de funciones de prueba.", ml: "ip = polyint(p)", py: "ip = np.polyint(p)", oct: "ip = polyint(p)", sci: "ip = intg(p)" },
  { name: "trapz", cat: "Análisis Numérico", sum: "Integración numérica por método del trapecio.", when: "Cálculo de índices de desempeño IAE/ITAE.", ml: "I = trapz(t, e.^2)", py: "I = np.trapz(e**2, t)", oct: "I = trapz(t, e.^2)", sci: "I = inttrap(t, e^2)" },
  { name: "diff", cat: "Análisis Numérico", sum: "Calcula diferencias finitas y derivadas discretas.", when: "Aproximación de derivadas de señales.", ml: "dy = diff(y)./diff(t)", py: "dy = np.diff(y)/np.diff(t)", oct: "dy = diff(y)./diff(t)", sci: "dy = diff(y)./diff(t)" },
  { name: "gradient", cat: "Análisis Numérico", sum: "Calcula el gradiente numérico central.", when: "Derivadas en superficies de costo de control.", ml: "[fx, fy] = gradient(F)", py: "fx, fy = np.gradient(F)", oct: "[fx, fy] = gradient(F)", sci: "gradient(F)" },
  { name: "linspace", cat: "Vectores & Grillas", sum: "Genera vectores con puntos equiespaciados.", when: "Creación de vectores de tiempo t.", ml: "t = linspace(0, 10, 1000)", py: "t = np.linspace(0, 10, 1000)", oct: "t = linspace(0, 10, 1000)", sci: "t = linspace(0, 10, 1000)" }
];

// Unir todos los comandos extras garantizando exactamente 125 comandos en total
ALL_EXTRA_COMMANDS.forEach((cmd, idx) => {
  COMMANDS_DATA.push({
    id: 11 + idx,
    name: cmd.name,
    category: cmd.cat,
    summary: cmd.sum,
    whenToUse: cmd.when,
    matlab: { syntax: cmd.ml, example: `% Ejemplo de ${cmd.name}\n${cmd.ml};` },
    python: { library: "control / scipy", code: `# Equivalente Python\n${cmd.py}` },
    octave: { library: "pkg load control", code: `% Equivalente Octave\n${cmd.oct};` },
    scilab: { library: "Scilab nativo", code: `// Equivalente Scilab\n${cmd.sci};` }
  });
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = COMMANDS_DATA;
}
