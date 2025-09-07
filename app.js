// Charts + simple interactivity (no frameworks)

// Fictional data for charts — edit as needed
const enpsData = {
  labels: ['Week 0', 'Week 2', 'Week 4', 'Week 6', 'Week 8', 'Week 10', 'Week 12'],
  values: [12, 18, 22, 27, 31, 35, 39]
};

const npsBenchmarks = {
  labels: ['Retail', 'Tech', 'Manufacturing', 'Healthcare', 'Financial Services'],
  values: [38, 52, 44, 47, 49]
};

const adoptionFunnel = {
  labels: ['Invited', 'Activated', 'Matched', 'Sessions Booked', 'Sessions Completed'],
  values: [100, 78, 66, 61, 58] // percentages of invited
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
        tension: 0.35,
        fill: true,
        borderWidth: 3,
        pointRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { suggestedMin: 0, suggestedMax: 70, ticks: { stepSize: 10 } }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: { label: (c) => ` eNPS: ${c.parsed.y}` }
        }
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
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { suggestedMin: 0, suggestedMax: 80, ticks: { stepSize: 10 } }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: { label: (c) => ` NPS: ${c.parsed.x}` }
        }
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
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { suggestedMin: 0, suggestedMax: 100, ticks: { stepSize: 20 } }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: { label: (c) => ` ${c.raw}%` }
        }
      }
    }
  });
}

// Package selection highlight
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
  makeFunnelChart();
  bindPackageSelection();
});
