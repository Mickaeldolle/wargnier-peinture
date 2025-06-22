
const app = {

    body: document.querySelector('body'),
    menuMobileElement: document.getElementById('menu-mobile-container'),
    menuMobileBtn: document.querySelector('.hero__burger-btn'),
    closeMenuBtn: document.querySelector('.menu-mobile__close-btn'),
    menuLinkElement: document.querySelectorAll('.menu-mobile__nav-link'),

    openMenuHandler: () => {
        // D'abord définir la transition
        app.menuMobileElement.style.transition = `all 0.2s ease-in-out`

        // Afficher l'élément
        app.menuMobileElement.style.display = 'block'

        // Forcer un reflow pour que le display: block soit appliqué
        app.menuMobileElement.offsetHeight

        // Puis appliquer la transformation
        app.menuMobileElement.style.transform = 'translateX(0)'
        app.menuMobileElement.style.left = '0'
        app.body.style.overflow = 'hidden'
    },

    closeMenuHandler: () => {
        const transitionTime = 0.2
        app.menuMobileElement.style.transform = 'translateX(-100%)'
        app.menuMobileElement.style.left = '1000px'
        app.menuMobileElement.style.transition = `all ${transitionTime}s ease-in-out`
        app.body.style.overflow = 'auto'
        setTimeout(() => {
            app.menuMobileElement.style.display = 'none'
        }, transitionTime * 1000)
    },

    setShowMoreBtn: () => {
        const showMoreBtn = `<button class="customer-review__show-more">Voir plus ...</button>`
        const commentContainer = document.querySelectorAll('.customer-review__comment-container')
        commentContainer.forEach(container => {
            if (container.querySelector('.customer-review__comment').textContent.length > 300) {
                container.innerHTML = container.querySelector('.customer-review__comment').textContent.slice(0, 300) + showMoreBtn
            }
        })
    },
    init() {
        app.menuMobileBtn.addEventListener('click', app.openMenuHandler)
        app.closeMenuBtn.addEventListener('click', app.closeMenuHandler)
        app.menuMobileElement.addEventListener('click', (event) => {
            if (event.target === app.menuMobileElement) {
                app.closeMenuHandler()
            }
        })
        app.menuLinkElement.forEach(link => {
            link.addEventListener('click', app.closeMenuHandler)
        })
        app.setShowMoreBtn()
    }
}



window.addEventListener('DOMContentLoaded', () => {
    app.init()
});