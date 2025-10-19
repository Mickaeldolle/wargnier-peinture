import ScrollAnimation from './utils/animation';

const home = {
  service: document.querySelectorAll('.service'),
  explainer: document.getElementById('explainer'),
  explainerTitle: document.querySelector('.explainer-title'),
  explainerSubtitle: document.querySelector('.explainer-subtitle'),
  explainerText: document.querySelector('.explainer-text-container'),
  scrollAnimation: null,

  init() {
    const scrollAnimation = new ScrollAnimation();

    const scrollExplainerAnimation = (element, startOffset, endOffset) => {
      scrollAnimation.addElement(element, {
        startOffset,
        endOffset,
        hasTransform: false,
        fade: true,
        translateY: 0
      });
    }

    scrollExplainerAnimation(home.explainerTitle, 0.9, 0.5);
    scrollExplainerAnimation(home.explainerSubtitle, 0.8, 0.5);
    scrollExplainerAnimation(home.explainerText, 0.7, 0.5);

    home.service.forEach((serviceElement, index) => {
      scrollAnimation.addElement(serviceElement, {
        startOffset: 0.9,   // Commence plus tard
        endOffset: 0.2,     // Termine plus tôt
        hasTransform: true,
        fade: true,
        translateY: 200     // Distance de translation plus petite pour plus de fluidité
      });
    });

    setTimeout(() => {
      scrollAnimation.update();
    }, 100);
  },

  adjustAnimationSettings() {
    home.scrollAnimation.elements.forEach(elementData => {
      if (elementData.element.classList.contains('service')) {
        elementData.options.translateY = 150;
      }
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  home.init();
});

window.addEventListener('beforeunload', () => {
  if (home.scrollAnimation) {
    home.scrollAnimation.destroy();
  }
});