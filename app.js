// --- STATIC CHARTS CONFIG ---
// Kill all animations globally
Chart.defaults.animation = false;
// Make sure no active/hover transitions sneak in
Chart.defaults.transitions = {
  active: { animation: { duration: 0 } },
  show:   { animations: {} },
  hide:   { animations: {} }
};

// Fictional data (stable)
const enpsData = {
  labels: ['Week 0', 'Week 2', 'Week 4', 'Week 6', 'Week 8', 'Week 10', 'Week 12'],
  values: [10, 15, 19, 23, 28, 31, 34]
};

const npsBenchmarks = {
  labels: ['Retail', 'Tech', 'Manufacturing', 'Healthcare', 'Financial Services'],
  values: [40, 48, 46, 50, 45]
};

const adoptionFunnel = {
  labels: ['Invited', 'Activated', 'Matched', 'Sessions Booked', 'Sessions Completed'],
  values: [100, 80, 70, 63, 60]
};

// One place to enforce “no interaction / no animation”
const STATIC_OPTS_BASE = {
  responsive: true,             // set to false if you want fixed-size canvases
  maintainAspectRatio: false,
  animation: false,
  animations: {},               // explicitly no keyframe animations
  events: [],                   // disable all mouse/touch events (no hover glow)
  parsing: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false }
  }
};

function makeENPSChart(){
  const ctx = document.getElementById('enpsChart');
  if(!ctx) return;
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: enpsData.labels,
      datasets: [{
        label: 'Program eNPS',
        data: enpsData.values,
        tension: 0,             // straight segments (also reduces “motion” feel)
        fill: true,
        borderWidth: 2,
        pointRadius: 3
      }]
    },
    options: {
      ...STATIC_OPTS_BASE,
      scales: {
        y: { suggestedMin: 0, suggestedMax: 70, ticks: { stepSize: 10 } }
      }
    }
  });
}

function makeNPSChart(){
  const ctx = document.getElementById('npsChart');
  if(!ctx) return;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: npsBenchmarks.labels,
      datasets: [{
        label: 'Client NPS (anonymized)',
        data: npsBenchmarks.values,
        borderWidth: 1
      }]
    },
    options: {
      ...STATIC_OPTS_BASE,
      indexAxis: 'y',
      scales: {
        x: { suggestedMin: 0, suggestedMax: 80, ticks: { stepSize: 10 } }
      }
    }
  });
}

function makeFunnelChart(){
  const ctx = document.getElementById('funnelChart');
  if(!ctx) return;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: adoptionFunnel.labels,
      datasets: [{
        label: '% of invited',
        data: adoptionFunnel.values,
        borderWidth: 1
      }]
    },
    options: {
      ...STATIC_OPTS_BASE,
      scales: {
        y: { suggestedMin: 0, suggestedMax: 100, ticks: { stepSize: 20 } }
      }
    }
  });
}

// Package selection highlight (still interactive buttons if you want)
function bindPackageSelection(){
  document.querySelectorAll('.btn.select').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.select; // 'A' or 'B'
      document.getElementById('pkgA').classList.toggle('active', id === 'A');
      document.getElementById('pkgB').classList.toggle('active', id === 'B');
    });
  });

  document.querySelectorAll('[data-cta]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const id = a.dataset.cta;
      alert((id === 'A' ? 'Pilot 90-day' : '6-month cohort') + ' — proposal requested. (Replace with your link/action)');
    });
  });
}

// Init on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  makeENPSChart();
  makeNPSChart();
  makeFunnelChart();
  bindPackageSelection();
});
