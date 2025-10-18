import ScrollAnimation from './utils/animation';

const home = {
  service: document.querySelectorAll('.service'),
  explainer: document.getElementById('explainer'),
  explainerTitle: document.querySelector('.explainer-title'),
  explainerSubtitle: document.querySelector('.explainer-subtitle'),
  explainerText: document.querySelector('.explainer-text-container'),
  scrollAnimation: null,

  init() {
    // Créer l'instance d'animation au scroll
    const scrollAnimation = new ScrollAnimation();

    const scrollExplainerAnimation = (element, startOffset, endOffset) => {
      scrollAnimation.addElement(element, {
        startOffset,  // Commence à animer à 90% du viewport
        endOffset,    // Termine à 10%
        hasTransform: false, // Pas de translation, juste fade
        fade: true,
        translateY: 0
      });
    }

    scrollExplainerAnimation(home.explainerTitle, 0.9, 0.5);
    scrollExplainerAnimation(home.explainerSubtitle, 0.8, 0.5);
    scrollExplainerAnimation(home.explainerText, 0.7, 0.5);

    // Ajouter chaque service avec animation complète
    home.service.forEach((serviceElement, index) => {
      scrollAnimation.addElement(serviceElement, {
        startOffset: 0.9,   // Commence plus tard
        endOffset: 0.2,     // Termine plus tôt
        hasTransform: true,
        fade: true,
        translateY: 200     // Distance de translation plus petite pour plus de fluidité
      });
    });

    // Mettre à jour une première fois après le chargement
    setTimeout(() => {
      scrollAnimation.update();
    }, 100);
  },

  // Méthode pour ajuster les paramètres si besoin
  adjustAnimationSettings() {
    // Exemple d'ajustements dynamiques
    home.scrollAnimation.elements.forEach(elementData => {
      if (elementData.element.classList.contains('service')) {
        // Ajuster les services
        elementData.options.translateY = 150;
      }
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  home.init();
});

// Optionnel : nettoyer au déchargement de la page
window.addEventListener('beforeunload', () => {
  if (home.scrollAnimation) {
    home.scrollAnimation.destroy();
  }
});