
//открытие-закрытие sign-in формы
popupWindowHandler('menu__sign-in-btn_js', 'sign-in-form_js', 
    'sign-in-form__close-btn_js', 'popup-form_open', 
    'sign-in-overlay_js', 'popup-overlay_open');
//открытие-закрытие register формы
popupWindowHandler('menu__register-btn_js', 'register-form_js', 
    'register-form__close-btn_js', 'popup-form_open', 
    'register-overlay_js', 'popup-overlay_open');

//открытие-закрытие send-message формы
popupWindowHandler('send-message-btn_js', 'send-message-form_js', 
    'send-message-form__close-btn_js', 'popup-form_open', 
    'send-message-overlay_js', 'popup-overlay_open');

//открытие-закрытие попап-меню
popupWindowHandler('mobile__menu-burger_js', 'popup-menu_js', 
    'header__popup-menu-close-btn_js', 'popup-menu_open');

//обработчик кнопки наверх.
(function () {
    const button = document.querySelector('.button-to-top_js');
    if (!button) {
        return;
    };
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    });
    window.addEventListener('scroll', (e) => {
        console.log(window.pageYOffset);
        if(window.pageYOffset > 1500) {
            button.classList.remove('button-to-top_hidden');
        }
        if(window.pageYOffset <= 1500) {
            button.classList.add('button-to-top_hidden');
        }
    })
})();

// функция-обработчик для всплывающих окон и попап-меню.
function popupWindowHandler(openBtnClass, popupFormClass, closeBtnClass, popupFormUnhideClass, popupOverlayClass, popupOverlayUnhideClass) {
    const openBtn = document.querySelector(`.${openBtnClass}`);
    const popupForm = document.querySelector(`.${popupFormClass}`);
    const popupOverlay = document.querySelector(`.${popupOverlayClass}`);  //non-mandatory;
    const closeBtn = document.querySelector(`.${closeBtnClass}`);
    const input = popupForm.querySelector('input');
    if (!openBtn || !popupForm || !closeBtn) {
        return
    }
    openBtn.addEventListener('click', openPopupForm);
    closeBtn.addEventListener('click', closePopupForm);
    window.addEventListener('keydown', escHandler);
    function escHandler(evt) {
        if(evt.keyCode === 27) {
            if(popupForm.classList.contains(popupFormUnhideClass)) {
                closePopupForm();
            }
        }
    }
    function openPopupForm() {
        popupForm.classList.add(popupFormUnhideClass);
        if (input) {
            input.focus();
        };
        if (popupOverlay) {
            popupOverlay.classList.add(popupOverlayUnhideClass);
        };
    };
    function closePopupForm() {
        popupForm.classList.remove(popupFormUnhideClass);
        if (popupOverlay) {
            popupOverlay.classList.remove(popupOverlayUnhideClass);
        }; 
    }
};