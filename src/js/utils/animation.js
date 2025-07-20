export default class ScrollAnimation {
  constructor() {
    this.elements = [];
    this.isScrolling = false;
    this.init();
  }

  // Ajouter un élément à animer
  addElement(element, options = {}) {
    const defaultOptions = {
      startOffset: 0.8, // Commence l'animation quand l'élément est à 80% du viewport
      endOffset: 0.2,   // Termine quand il est à 20%
      translateY: 300,  // Distance de translation
      hasTransform: true,
      fade: true
    };

    const elementData = {
      element,
      options: { ...defaultOptions, ...options },
      rect: null,
      progress: 0
    };

    this.elements.push(elementData);

    // Initialiser l'élément
    this.initElement(elementData);

    return elementData;
  }

  initElement(elementData) {
    const { element, options } = elementData;

    if (options.fade) {
      element.style.opacity = '0';
    }

    if (options.hasTransform) {
      element.style.transform = `translateY(${options.translateY}px)`;
    }

    element.style.transition = 'none'; // Désactiver les transitions CSS
  }

  // Calculer le pourcentage de visibilité d'un élément
  calculateProgress(elementData) {
    const { element, options } = elementData;
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Points de déclenchement basés sur le haut de l'élément
    const elementTop = rect.top;

    // Point de début : quand le haut de l'élément atteint X% du viewport
    const startPoint = windowHeight * options.startOffset;
    // Point de fin : quand le haut de l'élément atteint Y% du viewport  
    const endPoint = windowHeight * options.endOffset;

    // Distance totale d'animation
    const totalDistance = startPoint - endPoint;

    // Distance parcourue depuis le début
    const traveledDistance = startPoint - elementTop;

    // Calculer le progrès linéaire
    let progress = traveledDistance / totalDistance;

    // Clamp entre 0 et 1
    progress = Math.max(0, Math.min(1, progress));

    return progress;
  }

  // Fonction d'easing pour adoucir l'animation
  easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 0.7);
  }

  // Appliquer l'animation basée sur le progrès
  applyAnimation(elementData, progress) {
    const { element, options } = elementData;

    // Appliquer l'easing pour une animation plus fluide
    const easedProgress = this.easeOutCubic(progress);

    // Interpolation fluide
    const opacity = options.fade ? easedProgress : 1;
    const translateY = options.hasTransform ?
      options.translateY * (1 - easedProgress) : 0;

    // Appliquer les styles
    if (options.fade) {
      element.style.opacity = opacity;
    }

    if (options.hasTransform) {
      element.style.transform = `translateY(${translateY}px)`;
    }

    // Sauvegarder le progrès
    elementData.progress = progress;
  }

  // Fonction principale de mise à jour
  updateAnimations() {
    this.elements.forEach(elementData => {
      const progress = this.calculateProgress(elementData);

      // Optimisation : ne mettre à jour que si le progrès a changé significativement
      if (Math.abs(progress - elementData.progress) > 0.01) {
        this.applyAnimation(elementData, progress);
      }
    });
  }

  // Gestionnaire de scroll optimisé
  onScroll = () => {
    if (!this.isScrolling) {
      this.isScrolling = true;

      requestAnimationFrame(() => {
        this.updateAnimations();
        this.isScrolling = false;
      });
    }
  };

  // Initialiser les événements
  init() {
    // Utiliser passive pour de meilleures performances
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onScroll, { passive: true });
  }

  // Mettre à jour immédiatement (utile au chargement)
  update() {
    this.updateAnimations();
  }

  // Nettoyer les événements
  destroy() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onScroll);
  }
}