import mail from "./mail"
const app = {

    body: document.querySelector('body'),
    menuMobileElement: document.getElementById('menu-mobile-container'),
    menuMobileBtn: document.querySelector('.hero__burger-btn'),
    closeMenuBtn: document.querySelector('.menu-mobile__close-btn'),
    menuLinkElement: document.querySelectorAll('.menu-mobile__nav-link'),
    showMoreBtn: document.querySelectorAll('.customer-review__show-more'),


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
            const commentElement = container.querySelector('.customer-review__comment')
            const fullText = commentElement.textContent

            if (fullText.length > 300) {
                const truncatedText = fullText.slice(0, 300) + '...'

                // Sauvegarder le texte complet dans un attribut data
                container.dataset.fullText = fullText
                container.innerHTML = `<p class="customer-review__comment">${truncatedText}</p>` + showMoreBtn
            }
        })

        const showMoreButtons = document.querySelectorAll('.customer-review__show-more')
        showMoreButtons.forEach((button) => {
            button.addEventListener('click', (event) => app.displayComment(event))
        })
    },

    displayComment: (event) => {
        const container = event.currentTarget.parentElement
        const fullText = container.dataset.fullText
        container.innerHTML = `<p class="customer-review__comment">${fullText}</p>`
        const showLessBtn = container.querySelector('.customer-review__show-less')
        showLessBtn.addEventListener('click', (e) => {
            const truncatedText = fullText.slice(0, 300) + '...'
            container.innerHTML = `<p class="customer-review__comment">${truncatedText}</p> <button class="customer-review__show-more">Voir plus ...</button>`
            container.querySelector('.customer-review__show-more')
                .addEventListener('click', (event) => app.displayComment(event))
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

        mail.contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const form = new FormData(event.currentTarget)
            const senderData = {
                phone: '',
                email: '',
                message: ''
            }
            for (const formData of form.entries()) {
                senderData[formData[0]] = formData[1]
            }
            mail.sendContactMail(senderData)
        })

        app.setShowMoreBtn()
    }
}


window.addEventListener('DOMContentLoaded', () => {
    app.init()
    mail.init()
});