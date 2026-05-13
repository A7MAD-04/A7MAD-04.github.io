// Counter animation — skips elements without data-target
function animateCounters() {
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    let count = 0;
    const step = target / 50;
    const timer = setInterval(() => {
      count += step;
      if (count >= target) {
        el.textContent = target + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(count) + suffix;
      }
    }, 30);
  });
}

// Skill bar animation
function animateSkills() {
  document.querySelectorAll('.skill-fill').forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => { bar.style.width = width; }, 100);
  });
}

// Intersection Observer — fade-in + trigger animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.id === 'hero') animateCounters();
      if (entry.target.id === 'skills') animateSkills();
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('section, .project-card, .cert-card, .info-card, .research-card').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Navbar scroll effect + accent on scroll
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 60) {
    nav.style.borderBottomColor = 'rgba(34,211,238,0.2)';
  } else {
    nav.style.borderBottomColor = 'var(--bg3)';
  }
});

// Mobile hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Trigger counters on initial load
window.addEventListener('load', () => {
  setTimeout(animateCounters, 600);
});

// ─── Project Data ─────────────────────────────────────────────

const projects = {
  churn: {
    title: 'Customer Churn Intelligence Platform',
    tag: 'Machine Learning',
    status: 'Live',
    desc: 'End-to-end ML platform predicting customer churn using Logistic Regression, Random Forest, and Gradient Boosting with SHAP-based feature importance. Served via FastAPI REST endpoints with an interactive analytics dashboard showing churn probability scores and revenue-at-risk metrics. Containerized with Docker.',
    metrics: [
      'AUC Score: 0.84',
      '7,043 customers analyzed',
      '3 ML models benchmarked',
      'Full preprocessing pipeline (imputation, encoding, scaling)',
      'Interactive analytics dashboard',
      'Containerized with Docker'
    ],
    stack: ['Python', 'Scikit-learn', 'FastAPI', 'React', 'TypeScript', 'Docker', 'Pandas', 'NumPy', 'SHAP'],
    github: 'https://github.com/A7MAD-04/customer-churn-platform',
    isPrivate: false
  },
  skilllink: {
    title: 'SkillLink — AI-Powered Freelance Marketplace',
    tag: 'Full-Stack AI · Graduation Project',
    status: 'Graduation Project',
    desc: 'Full-stack freelance marketplace with an ML-powered recommendation engine matching freelancers to job postings via skill-profile similarity. Led the data science and backend components — built real-time analytics pipelines tracking user activity, engagement metrics, and platform reporting for business stakeholders.',
    metrics: [
      'ML-powered recommender engine using skill-profile similarity',
      'Real-time analytics pipeline for user engagement',
      'RESTful API with FastAPI',
      'React + TypeScript frontend',
      'Platform reporting dashboard for stakeholders',
      'Containerized with Docker'
    ],
    stack: ['Python', 'FastAPI', 'React', 'TypeScript', 'Docker', 'Pandas', 'REST APIs'],
    github: null,
    isPrivate: true
  }
};

function openProject(id) {
  const p = projects[id];
  if (!p) return;

  const githubSection = p.isPrivate
    ? `<p style="color:var(--muted);font-size:14px;font-style:italic">🔒 Private repository — not publicly available</p>`
    : `<a href="${p.github}" target="_blank" class="btn btn-primary" style="margin-top:8px">View on GitHub ↗</a>`;

  document.getElementById('modal-body').innerHTML = `
    <div style="display:flex;gap:10px;align-items:center;margin-bottom:6px">
      <span style="background:rgba(34,211,238,0.1);color:var(--accent);padding:4px 12px;border-radius:999px;font-size:12px;font-weight:700">${p.tag}</span>
    </div>
    <h2 style="font-family:'Space Grotesk',sans-serif;font-size:22px;font-weight:800;margin-bottom:14px;line-height:1.3;letter-spacing:-0.3px">${p.title}</h2>
    <p style="color:var(--muted);margin-bottom:28px;font-size:15px;line-height:1.8">${p.desc}</p>
    <h4 style="margin-bottom:12px;color:var(--accent);font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase">Key Highlights</h4>
    <ul style="margin-bottom:28px;padding-left:20px;color:var(--muted);display:flex;flex-direction:column;gap:6px">
      ${p.metrics.map(m => `<li style="font-size:14px">${m}</li>`).join('')}
    </ul>
    <h4 style="margin-bottom:12px;color:var(--accent);font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase">Tech Stack</h4>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:28px">
      ${p.stack.map(s => `<span style="background:rgba(34,211,238,0.08);color:var(--accent3);padding:5px 12px;border-radius:7px;font-size:12px;font-weight:600">${s}</span>`).join('')}
    </div>
    ${githubSection}
  `;
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
}

function openCert(url) {
  window.open(url, '_blank');
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
