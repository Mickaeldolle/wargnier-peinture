const mail = {
    contactForm: document.querySelector('.contact-form'),
    contactSubmitBtn: document.querySelector('.contact-button'),
    init() {
        emailjs.init({
            publicKey: '8SKxUt94XDmjW5dQ2',
        });
    },
    notificationContact: document.querySelector('.contact-notification'),
    displayLoaderOnSubmit() {
        mail.contactSubmitBtn.textContent = 'Chargement...'
    },
    resetSubmitBtn() {
        mail.contactSubmitBtn.textContent = 'envoyer'
    },
    showConfirmMessage(messageData) {
        mail.notificationContact.classList.add('contact-notification--active')
        mail.notificationContact.textContent = messageData.message
        if (messageData.success) {
            mail.notificationContact.classList.add('contact-notification--success')
            return;
        }
        mail.notificationContact.classList.add('contact-notification--fail')

    },
    sendContactMail(contactData) {
        mail.displayLoaderOnSubmit();
        emailjs.send("service_386oinm", 'template_o0hm4k6', {
            from_name: 'Wargnier peinture',
            from_email: 'contact@wargnierpeinture.fr',
            to_email: 'wargnierpeinture51@gmail.com',
            to_name: 'Client',
            message: `Message de ${contactData.email} - tel : ${contactData.phone}
            contenu du message : 
            ${contactData.message}`,
        })
            .then(() => {
                mail.showConfirmMessage({ success: true, message: 'Merci pour votre message, nous reviendrons vers vous très bientôt !' })
                mail.resetSubmitBtn();

            }, (error) => {
                console.log(error)
                mail.showConfirmMessage({
                    success: false, message: 'Oups, une erreur est survenue... Envoyez votre mail directement via votre service de messagerie à l\'adresse wargnierpeinture51@gmail.com'
                })
                mail.resetSubmitBtn();
            });
        mail.contactForm.reset();
    }
}

export default mail