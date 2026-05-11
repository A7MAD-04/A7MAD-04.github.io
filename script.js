// Smooth scroll counter animation
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    let count = 0;
    const step = target / 50;
    const timer = setInterval(() => {
      count += step;
      if (count >= target) { el.textContent = target; clearInterval(timer); }
      else { el.textContent = Math.floor(count); }
    }, 30);
  });
}

// Skill bar animation
function animateSkills() {
  document.querySelectorAll('.skill-fill').forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => { bar.style.width = width; }, 200);
  });
}

// Fade in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.id === 'hero') animateCounters();
      if (entry.target.id === 'skills') animateSkills();
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section, .project-card, .cert-card, .info-card').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 50) nav.style.borderBottomColor = 'var(--accent)';
  else nav.style.borderBottomColor = 'var(--bg3)';
});

// Project modal
const projects = {
  churn: {
    title: 'Customer Churn Intelligence Platform',
    desc: 'End-to-end ML platform predicting telecom customer churn. Built with Python, FastAPI, React, and Docker.',
    metrics: ['AUC Score: 0.8435', '7,043 customers analyzed', '3 ML models compared', 'Full REST API'],
    stack: ['Python', 'Scikit-learn', 'FastAPI', 'React', 'TypeScript', 'Docker'],
    github: 'https://github.com/A7MAD-04/customer-churn-platform'
  }
};

function openProject(id) {
  const p = projects[id];
  if (!p) return;
  document.getElementById('modal-body').innerHTML = `
    <h2 style="margin-bottom:12px">${p.title}</h2>
    <p style="color:var(--muted);margin-bottom:24px">${p.desc}</p>
    <h4 style="margin-bottom:12px;color:var(--accent)">Key Metrics</h4>
    <ul style="margin-bottom:24px;padding-left:20px;color:var(--muted)">
      ${p.metrics.map(m => `<li>${m}</li>`).join('')}
    </ul>
    <h4 style="margin-bottom:12px;color:var(--accent)">Tech Stack</h4>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:24px">
      ${p.stack.map(s => `<span style="background:rgba(99,102,241,0.15);color:var(--accent);padding:4px 12px;border-radius:6px;font-size:13px">${s}</span>`).join('')}
    </div>
    <a href="${p.github}" target="_blank" class="btn btn-primary">View on GitHub ↗</a>
  `;
  document.getElementById('modal').classList.add('open');
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
}

function openCert(url) {
  window.open(url, '_blank');
}

// Animate counters on load
window.addEventListener('load', () => {
  setTimeout(animateCounters, 500);
});