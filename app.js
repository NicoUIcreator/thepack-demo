// STATIC HORIZONTAL CHARTS — no animation, no hover, fixed-size canvases
Chart.defaults.animation = false;
Chart.defaults.transitions = {
  active: { animation: { duration: 0 } },
  show:   { animations: {} },
  hide:   { animations: {} }
};

// Fictional stable data
const enpsData = {
  labels: ['Week 0', 'Week 2', 'Week 4', 'Week 6', 'Week 8', 'Week 10', 'Week 12'],
  values: [10, 15, 19, 23, 28, 31, 34]
};

const npsBenchmarks = {
  labels: ['Retail', 'Tech', 'Manufacturing', 'Healthcare', 'Financial Services'],
  values: [40, 48, 46, 50, 45]
};

const retention = {
  labels: ['W0', 'W2', 'W4', 'W6', 'W8', 'W10', 'W12'],
  withPack: [92, 93, 94, 95, 95, 96, 96],
  control:  [92, 91, 90, 90, 89, 89, 88]
};

const roi = {
  labels: ['Day 30', 'Day 60', 'Day 90'],
  investment: [32, 0, 0],  // €k up-front pilot
  savings:    [60, 120, 180] // €k avoided costs (illustrative)
};

const STATIC_OPTS_BASE = {
  responsive: false,          // fixed-size (CSS sets height)
  maintainAspectRatio: false,
  animation: false,
  animations: {},
  events: [],                 // no hover/interaction
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
    type: 'bar',
    data: {
      labels: enpsData.labels,
      datasets: [{
        label: 'Program eNPS',
        data: enpsData.values,
        borderWidth: 1
      }]
    },
    options: {
      ...STATIC_OPTS_BASE,
      indexAxis: 'y', // horizontal
      scales: {
        x: { suggestedMin: 0, suggestedMax: 70, ticks: { stepSize: 10 } }
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
      indexAxis: 'y', // horizontal
      scales: {
        x: { suggestedMin: 0, suggestedMax: 80, ticks: { stepSize: 10 } }
      }
    }
  });
}

function makeRetentionChart(){
  const ctx = document.getElementById('retentionChart');
  if(!ctx) return;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: retention.labels,
      datasets: [
        { label: 'With Pack', data: retention.withPack, borderWidth: 1 },
        { label: 'Control', data: retention.control, borderWidth: 1 }
      ]
    },
    options: {
      ...STATIC_OPTS_BASE,
      indexAxis: 'y', // horizontal grouped bars per week
      plugins: { legend: { display: true }, tooltip: { enabled: false } },
      scales: { x: { suggestedMin: 85, suggestedMax: 100, ticks: { stepSize: 5 } } }
    }
  });
}

function makeROIChart(){
  const ctx = document.getElementById('roiChart');
  if(!ctx) return;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: roi.labels,
      datasets: [
        { label: 'Investment (€k)', data: roi.investment, borderWidth: 1 },
        { label: 'Avoided costs (€k)', data: roi.savings, borderWidth: 1 }
      ]
    },
    options: {
      ...STATIC_OPTS_BASE,
      indexAxis: 'y', // horizontal
      plugins: { legend: { display: true }, tooltip: { enabled: false } },
      scales: { x: { suggestedMin: 0, suggestedMax: 200, ticks: { stepSize: 50 } } }
    }
  });
}

// Package selection highlight (kept interactive)
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
      alert((id === 'A' ? 'Pilot 90‑day' : '6‑month cohort') + ' — proposal requested. (Replace with your link/action)');
    });
  });
}

// Init on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  makeENPSChart();
  makeNPSChart();
  makeRetentionChart();
  makeROIChart();
  bindPackageSelection();
});
