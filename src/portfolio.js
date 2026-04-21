
// Avatar upload
const avatarWrap = document.getElementById('nav-avatar-wrap');
const avatarImg = document.getElementById('nav-avatar-img');
const avatarInitials = document.getElementById('nav-avatar-initials');
const avatarFileInput = document.getElementById('avatar-file-input');
avatarWrap.addEventListener('click', () => avatarFileInput.click());
avatarFileInput.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    avatarImg.src = ev.target.result;
    avatarImg.style.display = 'block';
    avatarInitials.style.display = 'none';
  };
  reader.readAsDataURL(file);
});

// CV modal
const cvBtn = document.getElementById('cv-btn');
const cvModalBg = document.getElementById('cv-modal-bg');
cvBtn.addEventListener('click', e => {
  e.preventDefault();
  cvModalBg.classList.add('open');
});
function closeCVModal() { cvModalBg.classList.remove('open'); }
function closeCVModalBg(e) { if (e.target === cvModalBg) closeCVModal(); }

const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function animateCursor() {
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
  rx += (mx - rx) * 0.15;
  ry += (my - ry) * 0.15;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Typing animation
const phrases = [
  'Full Stack Developer',
  'MERN Stack Engineer',
  'AI Enthusiast',
  'Building scalable systems',
  'React + Node.js + MongoDB',
];
let pi = 0, ci = 0, deleting = false;
const el = document.getElementById('typed-text');
function type() {
  const phrase = phrases[pi];
  if (!deleting) {
    el.textContent = phrase.slice(0, ++ci);
    if (ci === phrase.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    el.textContent = phrase.slice(0, --ci);
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
  }
  setTimeout(type, deleting ? 40 : 80);
}
type();

// Theme toggle
const toggleBtn = document.getElementById('theme-toggle');
let isDark = true;
toggleBtn.addEventListener('click', () => {
  isDark = !isDark;
  document.documentElement.setAttribute('data-theme', isDark ? '' : 'light');
  toggleBtn.textContent = isDark ? '☀ Light' : '🌙 Dark';
});

// Scroll fade
const fadeEls = document.querySelectorAll('.fade-in');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
fadeEls.forEach(el => obs.observe(el));

// Modal data
const projects = {
  eventra: {
    title: 'Eventra',
    sub: 'MERN Stack · Event Booking Platform',
    color: '#00d4ff',
    features: [
      'Full-stack event booking with browse, book & manage flows',
      'Secure JWT authentication + email OTP verification',
      'Role-based access control for users and admins',
      'Admin dashboard with event management & booking approvals',
      'Real-time booking status updates',
      'Optimized API performance with debouncing on search',
      'RESTful API design with Express and MongoDB',
    ],
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'OTP', 'REST API'],
  },
  wanderlust: {
    title: 'WanderLust',
    sub: 'Node.js · Airbnb-style Listing Platform',
    color: '#10b981',
    features: [
      'Complete CRUD for property listings (Create, Read, Update, Delete)',
      'MVC architecture with clean separation of concerns',
      'Passport.js authentication with session management',
      'Server-side rendering with EJS templating engine',
      'Mongoose schema validation for robust data integrity',
      'Joi-based form validation and detailed error handling',
      'Multer for image uploads with cloud storage integration',
    ],
    stack: ['Node.js', 'Express', 'MongoDB', 'EJS', 'Passport.js', 'Multer', 'Joi'],
  },
  aichat: {
    title: 'AI Chatbot Platform',
    sub: 'React · Gemini API · Full-Stack AI Chat',
    color: '#8b5cf6',
    features: [
      'Full-stack AI chatbot powered by Google Gemini API',
      'JWT authentication with protected route middleware',
      'Persistent chat history stored per user in MongoDB',
      'Dynamic AI responses with real-time streaming',
      'Rate limiting and CORS management for production safety',
      'Scalable backend API architecture with proper error handling',
      'Clean React frontend with responsive chat interface',
    ],
    stack: ['React', 'Node.js', 'MongoDB', 'Gemini API', 'JWT', 'REST API', 'CORS'],
  }
};

function openModal(id) {
  const p = projects[id];
  document.getElementById('modal-inner').innerHTML = `
    <div class="modal-title" style="background:linear-gradient(135deg,${p.color},#8b5cf6);-webkit-background-clip:text;-webkit-text-fill-color:transparent">${p.title}</div>
    <div class="modal-sub">${p.sub}</div>
    <div class="tech-badges" style="margin-bottom:1.5rem">${p.stack.map(t=>`<span class="badge badge-blue">${t}</span>`).join('')}</div>
    <ul class="modal-features">${p.features.map(f=>`<li>${f}</li>`).join('')}</ul>
  `;
  document.getElementById('modal-bg').classList.add('open');
}
function closeModal() { document.getElementById('modal-bg').classList.remove('open'); }
function closeModalBg(e) { if (e.target === document.getElementById('modal-bg')) closeModal(); }

// Form submit
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = '✓ Message Sent!';
  btn.style.background = 'var(--green)';
  setTimeout(() => {
    btn.textContent = 'Send Message →';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
}
