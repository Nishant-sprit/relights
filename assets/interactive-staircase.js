// Interactive Staircase Simulator Script
document.addEventListener('DOMContentLoaded', () => {
  const preview = document.getElementById('staircasePreview');
  const countInput = document.getElementById('stairCountInput');
  const countVal = document.getElementById('stairCountVal');
  const triggerBtn = document.getElementById('triggerMotionBtn');
  const colorBtns = document.querySelectorAll('.stair-color-btn');

  let activeColor = '#f59e0b';
  let stepCount = parseInt(countInput ? countInput.value : '10');

  function renderSteps() {
    if (!preview) return;
    preview.innerHTML = '';

    for (let i = 0; i < stepCount; i++) {
      const step = document.createElement('div');
      step.className = 'w-full h-8 rounded-lg border border-slate-800 bg-slate-900 flex items-center justify-between px-4 transition-all duration-300 stair-step-item';
      step.dataset.stepIndex = i;
      step.style.width = `${100 - i * 3}%`;

      step.innerHTML = `
        <span class="text-xs font-semibold text-slate-500">Step #${i + 1}</span>
        <div class="step-led w-3 h-3 rounded-full bg-slate-800 transition-all duration-300"></div>
      `;

      preview.appendChild(step);
    }
  }

  function runMotionSequence() {
    const steps = preview.querySelectorAll('.stair-step-item');
    steps.forEach((step, idx) => {
      setTimeout(() => {
        const led = step.querySelector('.step-led');
        step.style.borderColor = activeColor;
        step.style.boxShadow = `0 0 15px ${activeColor}80`;
        if (led) {
          led.style.backgroundColor = activeColor;
          led.style.boxShadow = `0 0 10px ${activeColor}`;
        }

        setTimeout(() => {
          step.style.borderColor = '';
          step.style.boxShadow = '';
          if (led) {
            led.style.backgroundColor = '';
            led.style.boxShadow = '';
          }
        }, 1800);
      }, idx * 180);
    });
  }

  if (countInput) {
    countInput.addEventListener('input', (e) => {
      stepCount = parseInt(e.target.value);
      if (countVal) countVal.textContent = `${stepCount} Steps`;
      renderSteps();
    });
  }

  colorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activeColor = btn.dataset.color || '#f59e0b';
      colorBtns.forEach(b => b.classList.remove('ring-2', 'ring-amber-500'));
      btn.classList.add('ring-2', 'ring-amber-500');
      runMotionSequence();
    });
  });

  if (triggerBtn) {
    triggerBtn.addEventListener('click', runMotionSequence);
  }

  renderSteps();
});
