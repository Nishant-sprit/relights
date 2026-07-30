/**
 * LuminaStep Interactive Staircase Simulation Component
 */
class InteractiveStaircaseElement extends HTMLElement {
  constructor() {
    super();
    this.totalSteps = 12;
    this.litSteps = new Set();
    this.isSimulating = false;
    this.lightColor = 'blue';
    this.cascadeSpeed = 150;
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  setupEventListeners() {
    const btnUp = this.querySelector('#btn-walk-up');
    const btnDown = this.querySelector('#btn-walk-down');
    const btnReset = this.querySelector('#btn-reset');
    const colorButtons = this.querySelectorAll('.color-picker-btn');

    if (btnUp) btnUp.addEventListener('click', () => this.triggerWalk('up'));
    if (btnDown) btnDown.addEventListener('click', () => this.triggerWalk('down'));
    if (btnReset) btnReset.addEventListener('click', () => this.resetAll());

    colorButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const color = e.currentTarget.getAttribute('data-color');
        if (color) {
          this.lightColor = color;
          this.updateColorStyles();
        }
      });
    });

    const stepElements = this.querySelectorAll('.stair-step-item');
    stepElements.forEach((el) => {
      el.addEventListener('click', (e) => {
        const stepIdx = parseInt(e.currentTarget.getAttribute('data-step-index'), 10);
        this.toggleStep(stepIdx);
      });
    });
  }

  triggerWalk(dir) {
    if (this.isSimulating) return;
    this.isSimulating = true;
    this.litSteps.clear();
    this.updateStepDisplay();

    const order = dir === 'up'
      ? Array.from({ length: this.totalSteps }, (_, i) => i)
      : Array.from({ length: this.totalSteps }, (_, i) => this.totalSteps - 1 - i);

    order.forEach((stepIdx, i) => {
      setTimeout(() => {
        this.litSteps.add(stepIdx);
        this.updateStepDisplay();
      }, i * this.cascadeSpeed);
    });

    const totalDuration = order.length * this.cascadeSpeed + 2500;

    setTimeout(() => {
      order.forEach((stepIdx, i) => {
        setTimeout(() => {
          this.litSteps.delete(stepIdx);
          this.updateStepDisplay();
        }, i * (this.cascadeSpeed * 0.8));
      });

      setTimeout(() => {
        this.isSimulating = false;
      }, order.length * (this.cascadeSpeed * 0.8) + 300);
    }, totalDuration);
  }

  toggleStep(stepIdx) {
    if (this.litSteps.has(stepIdx)) {
      this.litSteps.delete(stepIdx);
    } else {
      this.litSteps.add(stepIdx);
    }
    this.updateStepDisplay();
  }

  resetAll() {
    this.litSteps.clear();
    this.isSimulating = false;
    this.updateStepDisplay();
  }

  updateStepDisplay() {
    const steps = this.querySelectorAll('.stair-step-item');
    steps.forEach((el, idx) => {
      const ledBar = el.querySelector('.led-light-bar');
      if (this.litSteps.has(idx)) {
        el.classList.add('step-lit');
        if (ledBar) ledBar.style.opacity = '1';
      } else {
        el.classList.remove('step-lit');
        if (ledBar) ledBar.style.opacity = '0.15';
      }
    });
  }

  updateColorStyles() {
    const colorClasses = {
      blue: 'from-blue-500 to-cyan-400 shadow-blue-500/50',
      warm: 'from-amber-400 to-yellow-500 shadow-amber-400/50',
      cool: 'from-sky-200 to-blue-300 shadow-sky-200/50',
      rgb: 'from-indigo-500 via-purple-500 to-pink-500 shadow-purple-500/50'
    };

    const activeBg = colorClasses[this.lightColor] || colorClasses.blue;
    const ledBars = this.querySelectorAll('.led-light-bar');
    
    ledBars.forEach((bar) => {
      bar.className = `led-light-bar absolute bottom-0 left-0 right-0 h-2 rounded-full transition-all duration-300 bg-gradient-to-r shadow-lg ${activeBg}`;
    });
  }

  render() {
    // Structural DOM is defined in liquid section template for max SEO and editability
  }
}

if (!customElements.get('interactive-staircase')) {
  customElements.define('interactive-staircase', InteractiveStaircaseElement);
}
