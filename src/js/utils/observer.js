export default class Observer {
  constructor(threshold, element, hasTransform = false) {
    this.threshold = threshold;
    this.element = element;
    this.observer = null;
    this.hasTransform = hasTransform;
  }

  _init() {
    this.element.style.opacity = 0;

    if (this.hasTransform) {
      this.element.style.transform = 'translateY(300px)';
    }
  }

  createObserver(onEnter, onExit = null) {
    this.observer = new IntersectionObserver((entries) => {
      console.log('IntersectionObserver triggered', entries);
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animation d'entrée (scroll vers le bas)
          onEnter(entry.target);
        } else if (onExit) {
          // Animation de sortie (scroll vers le haut)
          onExit(entry.target);
        }
      });
    }, {
      threshold: this.threshold
    });

    return this.observer;
  }

  // Nouvelle méthode pour les animations bidirectionnelles
  startBidirectionalObserving(onEnter, onExit) {
    this._init();
    this.createObserver(onEnter, onExit);
    this.observer.observe(this.element);
  }

  // Ancienne méthode pour compatibilité
  startObserving(callback) {
    this._init();
    this.createObserver(callback);
    this.observer.observe(this.element);
  }

  unobserve(element) {
    if (this.observer) {
      this.observer.unobserve(element);
    }
  }
}