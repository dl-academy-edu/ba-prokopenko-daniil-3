
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
        // console.log(window.pageYOffset);
        if(window.pageYOffset > 1500) {
            button.classList.remove('button-to-top_hidden');
        }
        if(window.pageYOffset <= 1500) {
            button.classList.add('button-to-top_hidden');
        }
    })
})();

// функция-обработчик открытия-закрытия для всплывающих окон и попап-меню.
function popupWindowHandler(openBtnClass, popupFormClass, closeBtnClass, popupFormUnhideClass, popupOverlayClass, popupOverlayUnhideClass) {
    const openBtn = document.querySelector(`.${openBtnClass}`);
    const popupForm = document.querySelector(`.${popupFormClass}`);
    const popupOverlay = document.querySelector(`.${popupOverlayClass}`);  //non-mandatory;
    const closeBtn = document.querySelector(`.${closeBtnClass}`); //non-mandatory;
    const input = popupForm.querySelector('input');
    if (!openBtn || !popupForm || !closeBtn) {
        return;
    };
    openBtn.addEventListener('click', openPopupWindow);
    closeBtn.addEventListener('click', closePopupWindow);
    window.addEventListener('keydown', escHandler);
    function escHandler(evt) {
        if(evt.keyCode === 27) {
            if(popupForm.classList.contains(popupFormUnhideClass)) {
                closePopupWindow();
            };
        };
    };
    function openPopupWindow() {
        popupForm.classList.add(popupFormUnhideClass);
        if (input) {
            input.focus();
        };
        if (popupOverlay) {
            popupOverlay.classList.add(popupOverlayUnhideClass);
        };
    };
    function closePopupWindow() {
        closeWindow(popupForm, popupFormUnhideClass, popupOverlay, popupOverlayUnhideClass);
    };
};

//валидация форм
(function() {

    //валидация формы sign-in
    (function() {
        const popupWindow = document.querySelector('.sign-in-form_js');
        const popupOverlay = document.querySelector('.sign-in-overlay_js');
        const form = document.forms.signIn;
        const emailInput = form.elements.email;
        const passwordInput = form.elements.password;
        emailInput.isValid = () => isValidEmail(emailInput.value);
        passwordInput.isValid = () => isValidPassword(passwordInput.value);

        const textInputFields = [
            emailInput,
            passwordInput,
        ];

        let areTextInputsValid = false;
        let formNeedsValidation = false;

        //запуск проверок при нажатии на кнопку сабмит
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            formNeedsValidation = true;
            areTextInputsValid = validateTextInputs(formNeedsValidation, textInputFields);
            if (areTextInputsValid) {
                closeWindow(popupWindow, 'popup-form_open', popupOverlay, 'popup-overlay_open');
            }
        });
        
        // запуск проверки после ввода информации в текстовые поля
        textInputFields.forEach(input => {
            input.addEventListener("input", () => {
                areTextInputsValid = validateTextInputs(formNeedsValidation, textInputFields);
            });
        });

    })();


    //валидация формы Register
    (function() {
        const popupWindow = document.querySelector('.register-form_js');
        const popupOverlay = document.querySelector('.register-overlay_js');
        const form = document.forms.register;
        const emailInput = form.elements.email;
        const nameInput = form.elements.name;
        const surnameInput = form.elements.surname;
        const passwordInput = form.elements.password;
        const passwordRepeatInput = form.elements.passwordRepeat;
        const locationInput = form.elements.location;
        const ageInput = form.elements.age;

        const confirmInput = form.elements.confirm;

        const submitBtn = form.elements.submitButton;

        emailInput.isValid = () => isValidEmail(emailInput.value);
        nameInput.isValid = () => !!nameInput.value;
        surnameInput.isValid = () => !!surnameInput.value;
        passwordInput.isValid = () => isValidPassword(passwordInput.value);
        passwordRepeatInput.isValid = () => isValidPasswordRepeat(passwordInput.value, passwordRepeatInput.value);
        locationInput.isValid = () => !!locationInput.value;
        ageInput.isValid = () => isValidAge(ageInput.value);

        confirmInput.isValid = () => confirmInput.checked;

        const textInputFields = [
            emailInput,
            nameInput,
            surnameInput,
            passwordInput,
            passwordRepeatInput,
            locationInput,
            ageInput
        ];

        let areTextInputsValid = false;
        let isCheckboxInputValid = false;
        let formNeedsValidation = false;

        //запуск проверок при нажатии на кнопку сабмит
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            formNeedsValidation = true;
            areTextInputsValid = validateTextInputs(formNeedsValidation, textInputFields);
            isCheckboxInputValid = validateCheckboxInputs(formNeedsValidation, confirmInput);
            if (areTextInputsValid && isCheckboxInputValid) {
                closeWindow(popupWindow, 'popup-form_open', popupOverlay, 'popup-overlay_open');
            }
        });
        
        // запуск проверки после ввода информации в текстовые поля
        textInputFields.forEach(input => {
            input.addEventListener("input", () => {
                areTextInputsValid = validateTextInputs(formNeedsValidation, textInputFields);
            });
        });

        // запуск проверки при изменении состояния чекбокса
        confirmInput.addEventListener("input", () => {
            isCheckboxInputValid = validateCheckboxInputs(formNeedsValidation, confirmInput);
        });

        //запуск блокировщика-разблокировщика кнопки submit
        confirmInput.addEventListener("input", () => {
            submitButtonUnBlocker(confirmInput, submitBtn)
        });
    })();

    //валидация формы Send Message
    (function() {
        const popupWindow = document.querySelector('.send-message-form_js');
        const popupOverlay = document.querySelector('.send-message-overlay_js');
        const form = document.forms.sendMessage;
        const emailInput = form.elements.email;
        const nameInput = form.elements.name;
        const subjectInput = form.elements.subject;
        const phoneInput = form.elements.phone;

        const confirmInput = form.elements.confirm;

        const submitBtn = form.elements.submitButton;

        emailInput.isValid = () => isValidEmail(emailInput.value);
        nameInput.isValid = () => !!nameInput.value;
        subjectInput.isValid = () => !!subjectInput.value;
        phoneInput.isValid = () => isValidPhone(phoneInput.value);

        confirmInput.isValid = () => confirmInput.checked;

        const textInputFields = [
            emailInput,
            nameInput,
            subjectInput,
            phoneInput
        ];

        let areTextInputsValid = false;
        let isCheckboxInputValid = false;
        let formNeedsValidation = false;

        //запуск проверок при нажатии на кнопку сабмит
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            formNeedsValidation = true;
            areTextInputsValid = validateTextInputs(formNeedsValidation, textInputFields);
            isCheckboxInputValid = validateCheckboxInputs(formNeedsValidation, confirmInput);
            if (areTextInputsValid && isCheckboxInputValid) {
                closeWindow(popupWindow, 'popup-form_open', popupOverlay, 'popup-overlay_open');
            }
        });
        
        // запуск проверки после ввода информации в текстовые поля
        textInputFields.forEach(input => {
            input.addEventListener("input", () => {
                areTextInputsValid = validateTextInputs(formNeedsValidation, textInputFields);
            });
        });

        // запуск проверки при изменении состояния чекбокса
        confirmInput.addEventListener("input", () => {
            isCheckboxInputValid = validateCheckboxInputs(formNeedsValidation, confirmInput);
        });

        //запуск блокировщика-разблокировщика кнопки submit
        confirmInput.addEventListener("input", () => {
            submitButtonUnBlocker(confirmInput, submitBtn)
        });
    })();

    // обработчик проверки текстовых полей ввода
    function validateTextInputs(validationNeeded, textInputsArray) {
        if (!validationNeeded) {
            return false;
        };
        let checkResult = true;

        textInputsArray.forEach((input) => {
            markTextInputAsValid(input);    
            if (!input.isValid()) {
                checkResult = false;
                markTextInputAsInvalid(input);
            };
        });
        return checkResult;
    };

    // обработчик проверки чекбокса
    function validateCheckboxInputs(validationNeeded, checkboxInput) {
        if (!validationNeeded) {
            return false;
        };
        let checkResult = true;
        markCheckboxInputAsValid(checkboxInput);
        if (!checkboxInput.isValid()) {
            checkResult = false;
            markCheckboxInputAsInvalid(checkboxInput);
        };
        return checkResult;
    };

    // маркировщик текстового поля, прошедшего проверку
    function markTextInputAsValid(elm) {
        elm.classList.remove("text-input-field_invalid");
        elm.nextElementSibling.classList.add("hidden");
        elm.classList.add("text-input-field_valid");
        if (elm.nextElementSibling.nextElementSibling.classList.contains("hidden")) {
            elm.nextElementSibling.nextElementSibling.classList.remove("hidden");
        };
    }

    // маркировщик текстового поля, содержащего ошибку
    function markTextInputAsInvalid(elm) {
        elm.classList.add("text-input-field_invalid");
        elm.nextElementSibling.classList.remove("hidden");
        if (!elm.nextElementSibling.nextElementSibling.classList.contains("hidden")) {
            elm.nextElementSibling.nextElementSibling.classList.add("hidden");
        }
        if (elm.classList.contains("text-input-field_valid")) {
            elm.classList.remove("text-input-field_valid");
        };
    };

    // маркировщик чекбокса, прошедшего проверку
    function markCheckboxInputAsValid(elm) {
        if (elm.nextElementSibling.classList.contains("checkbox-input-error")) {
            elm.nextElementSibling.classList.remove("checkbox-input-error");
        };
    };

    // маркировщик чекбокса, содержащего ошибку
    function markCheckboxInputAsInvalid(elm) {
        if (!elm.nextElementSibling.classList.contains("checkbox-input-error")) {
            elm.nextElementSibling.classList.add("checkbox-input-error");
        };
    }

    //блокировщик-разблокировщик кнопки submit
    function submitButtonUnBlocker(confirmInput, submitBtn) {
        if(confirmInput.checked) {
            if(submitBtn.hasAttribute('disabled'))
            submitBtn.removeAttribute('disabled');
        };
        if(!confirmInput.checked) {
            if(!submitBtn.hasAttribute('disabled'))
            submitBtn.setAttribute('disabled', '');
        };
    };

    //функция проверки email по регулярному выражению
    function isValidEmail(email) {
        return email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i);
    };

    //функция проверки phone по регулярному выражению
    function isValidPhone(phone) {
        return phone.match(/^(\s*)?(\+)?([-_():=+]?\d[- _():=+]?){10,14}(\s*)?$/);
    };

    //функция проверки password
    function isValidPassword(password) {
        return password.length > 5;
    };

    //функция проверки password repeat
    function isValidPasswordRepeat(password, passwordRepeat) {
        return (isValidPassword(password) && password === passwordRepeat);
    };

    //функция проверки возраста
    function isValidAge(Age) {
        return (!isNaN(Age) && Age !== null && Age > 0);
    };

})();


//функция закрытия попап-окна и мобильного меню.
function closeWindow(popupWindow, windowUnhideClass, popupOverlay = false, OverlayUnhideClass) {
    popupWindow.classList.remove(windowUnhideClass);
    if (popupOverlay) {
        popupOverlay.classList.remove(OverlayUnhideClass);
    }; 
}

//слайдер функция.
function Slider (selector, options = {initialActiveIndex: 0}) {
    const slider = document.querySelector(selector);
    const wrapper = slider.querySelector('.slider__wrapper_js');
    const innerWrapper = wrapper.querySelector('.slider__inner-wrapper_js');
    const slides = [...wrapper.querySelectorAll('.slider__slide_js')];
    const buttonBack = slider.querySelector('.slider-bottom-panel__button_back_js');
    const buttonNext = slider.querySelector('.slider-bottom-panel__button_next_js');
    const pagination = slider.querySelector('.slider-bottom-panel__pagination_js');
    const slidesCount = slides.length;
    
    let dots = [];
    let slideWidth = 0;
    let activeSlideIndex = options.initialActiveIndex;
    const animationDuration = 500;
    let id = null;
    let percentDiff = 0.2;
    let clientX = 0;
    let lastClientX = 0;
    let checkerMouseDown = false;
    let isTouched = false;

    wrapper.addEventListener('touchstart', (e) => {
        // e.preventDefault();
        isTouched = true;
        const touch = e.touches[0];
        clientX = touch.clientX;
        lastClientX = touch.clientX;

    });

    wrapper.addEventListener('touchmove', (e) => {
        if(!isTouched) {
            return;
        };
        const touch = e.touches[0];
        lastClientX = touch.clientX;
        setActiveSlide(activeSlideIndex, false, (clientX - lastClientX)*0.5);
    });

    wrapper.addEventListener('touchend', (e) => {
        if(!isTouched) {
            return;
        };
        isTouched = false;
        if(clientX - lastClientX > percentDiff * slideWidth) {
            nextSlide();
        } else if(lastClientX - clientX > percentDiff * slideWidth) {
            prevSlide();
        } else {
            setActiveSlide(activeSlideIndex);
        }
    });

    wrapper.addEventListener('mousedown', (e) => {
        checkerMouseDown = true;
        clientX = e.clientX;
        // console.log("мышка нажата");
    });
    
    function endMouseEvent(e) {
        if(!checkerMouseDown) {
            return;
        };
        checkerMouseDown = false;
        if(clientX - e.clientX > percentDiff * slideWidth) {
            nextSlide();
        } else if(e.clientX - clientX > percentDiff * slideWidth) {
            prevSlide();
        };
    };
    
    wrapper.addEventListener('mouseup', endMouseEvent);
    wrapper.addEventListener('mouseout', endMouseEvent);

    initWidth();
    createDots();
    setActiveSlide(activeSlideIndex, false);

    window.addEventListener('resize', () => {
        initWidth();
        setActiveSlide(activeSlideIndex, false);
    });

    buttonNext.addEventListener('click', () => {
        nextSlide();
    });

    buttonBack.addEventListener('click', () => {
        prevSlide();
    });

    function nextSlide() {
        setActiveSlide(activeSlideIndex + 1);
    };
    function prevSlide() {
        setActiveSlide(activeSlideIndex - 1);
    };

    function createDots() {
        for (let i = 0; i < slidesCount; i++) {
            const dot = createDot(i);
            dots.push(dot);
            pagination.insertAdjacentElement('beforeend', dot);
        }

    };

    function createDot(index) {
        const dot = document.createElement('button');
        dot.classList.add('pagination-panel__dot');

        if(index === activeSlideIndex) {
            dot.classList.add('pagination-panel__dot_active');

        };

        dot.addEventListener('click', () => {
            setActiveSlide(index);
        });

        return dot;
    };

    function setActiveSlide(index, withAnimation = true, diff = 0) {
        if(index < 0 || index >= slides.length) {
            return;
        };
        if(withAnimation) {
            clearTimeout(id);
            innerWrapper.style.transition = `transform ${animationDuration}ms`;
            id = setTimeout(() => {
                innerWrapper.style.transition = '';
            }, animationDuration);
        };
        buttonBack.removeAttribute('disabled');
        buttonNext.removeAttribute('disabled');
        if(index === 0) {
            buttonBack.setAttribute('disabled', '');
        };
        if(index === slides.length - 1) {
            buttonNext.setAttribute('disabled', '');
        };
        const maxAllowedTranslate = slideWidth * (slides.length - 1);
        const calculatedTranslate = slideWidth * index + diff;
        if(calculatedTranslate > maxAllowedTranslate) {
            innerWrapper.style.transform = `translateX(-${maxAllowedTranslate}px)`;
        } else {
            innerWrapper.style.transform = `translateX(-${calculatedTranslate}px)`;
        };
        
        dots[activeSlideIndex].classList.remove('pagination-panel__dot_active');
        dots[index].classList.add('pagination-panel__dot_active');
        localStorage.setItem('activeSlide', index);
        activeSlideIndex = index;
    };

    function initWidth() {
        slideWidth = wrapper.offsetWidth;
        slides.forEach(slide => {
            slide.style.width = `${slideWidth}px`;
        });
    };

    return {
        nextSlide,
        prevSlide,
    };
};

// вызов функции слайдера с параметрами
const customSlider = new Slider('.slider_js', {
    initialActiveIndex: +localStorage.getItem('activeSlide') || 0,
});

// Swiper
const swiper = new Swiper('.swiper-container', {
    direction: 'horizontal',

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
});

