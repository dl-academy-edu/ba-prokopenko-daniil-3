// Базовый путь на сервер
const BASE_SERVER_PATH = 'https://academy.directlinedev.com';

//выделение текущей страницы в меню.
(function() {
    const currentPageNameClass = 'menu__home-btn_js';
    const currentPage = document.querySelector(`.${currentPageNameClass}`)
    currentPage.classList.add('header__menu-item_current');
})();

// Инициализация ссылок в меню при выполненном логине
(function initPageMenu() {
    rerenderLinks();
})();

function rerenderLinks() {
    const loginButton = document.querySelector('.menu__sign-in-btn_js');
    const registerButton = document.querySelector('.menu__register-btn_js');
    const toProfileButton = document.querySelector('.menu__my-profile-btn_js');
    const isLogin = localStorage.getItem('token');

    if(isLogin) {
        loginButton.classList.add('header__menu-item_hidden');
        registerButton.classList.add('header__menu-item_hidden');
        toProfileButton.classList.remove('header__menu-item_hidden');
    } else {
        loginButton.classList.remove('header__menu-item_hidden');
        registerButton.classList.remove('header__menu-item_hidden');
        toProfileButton.classList.add('header__menu-item_hidden');
    };
};

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

// функция-обработчик открытия-закрытия для всплывающих окон и попап-меню. version 1.1
function popupWindowHandler(openBtnClass = null, popupFormClass, closeBtnClass, popupFormUnhideClass, popupOverlayClass, popupOverlayUnhideClass) {
    const popupForm = document.querySelector(`.${popupFormClass}`);
    const popupOverlay = document.querySelector(`.${popupOverlayClass}`);  //non-mandatory;
    const closeBtn = document.querySelector(`.${closeBtnClass}`);
    const input = popupForm.querySelector('input');
    if (!popupForm || !closeBtn) {
        return;
    };

    if (openBtnClass) {
        const openBtn = document.querySelector(`.${openBtnClass}`);
        openBtn.addEventListener('click', openPopupWindow);
    };

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

//функция закрытия попап-окна и мобильного меню version 1.1.
function closeWindow(popupWindow, windowUnhideClass, popupOverlay = false, OverlayUnhideClass) {
    popupWindow.classList.remove(windowUnhideClass);
    if (popupOverlay) {
        popupOverlay.classList.remove(OverlayUnhideClass);
    }; 
};

//валидация форм и обработка запросов на сервер (регистрация пользователя, логин и send message)
(function() {





    //валидация формы sign-in
    (function() {
        // const popupWindow = document.querySelector('.sign-in-form_js');
        // const popupOverlay = document.querySelector('.sign-in-overlay_js');
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
                // closeWindow(popupWindow, 'popup-form_open', popupOverlay, 'popup-overlay_open');
                 initSignIn();
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
        // const popupWindow = document.querySelector('.register-form_js');
        // const popupOverlay = document.querySelector('.register-overlay_js');
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
                // closeWindow(popupWindow, 'popup-form_open', popupOverlay, 'popup-overlay_open');
                // starting initialization register process with server
                initRegister();

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
        // const popupWindow = document.querySelector('.send-message-form_js');
        // const popupOverlay = document.querySelector('.send-message-overlay_js');
        const form = document.forms.sendMessage;
        const emailInput = form.elements.to;
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
                // closeWindow(popupWindow, 'popup-form_open', popupOverlay, 'popup-overlay_open');
                initSendMessage();
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

    // маркировщик текстового поля, прошедшего проверку версия 1.1. с очисткой ошибки сервера
    function markTextInputAsValid(elm) {
        elm.classList.remove("text-input-field_invalid");
        elm.nextElementSibling.classList.add("hidden");
        elm.classList.add("text-input-field_valid");
        if (elm.nextElementSibling.nextElementSibling.classList.contains("hidden")) {
            elm.nextElementSibling.nextElementSibling.classList.remove("hidden");
        };
        if (elm.nextElementSibling.nextElementSibling.nextElementSibling) {
            elm.nextElementSibling.nextElementSibling.nextElementSibling.remove();
        };
    }

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

    //обработчик запроса на сервер
    function sendRequest({url, method = 'GET', headers, body = null}) {
        // let customBody = null;
        return fetch(BASE_SERVER_PATH + url + '?v=1.0.0', {
            method,
            headers,
            body,
        });
    };

    function initSendMessage() {
        const modalSendMessage = document.querySelector('.send-message-form_js');
        const loaderSendMessage = document.querySelector(".preloader__loader_js");
        const sendMessageForm = document.forms.sendMessage;
        const sendMessageOverlay = document.querySelector('.send-message-overlay_js');
        const submitBtn = sendMessageForm.elements.submitButton;
        // console.log("запрос ушёл на сервер");
        const myName = sendMessageForm.name.value;
        const mySubject = sendMessageForm.subject.value;
        const myPhone = sendMessageForm.phone.value;
        const myMessage = sendMessageForm.message.value;
    
        let data = {};
        data.to = sendMessageForm.to.value;
        data.body = JSON.stringify({myName, mySubject, myPhone, myMessage});
        // console.log(data);
        // console.log(JSON.stringify(data));
    
        const textInputFields = [
            sendMessageForm.to,
            sendMessageForm.name,
            sendMessageForm.subject,
            sendMessageForm.phone,
            sendMessageForm.message
        ];
    
        // console.log('textInputFields:', textInputFields);
        // console.log('sendMessageForm.confirm:', sendMessageForm.confirm);
        // console.log('submitBtn', submitBtn);
        loaderSendMessage.classList.remove('preloader_hidden');
        sendRequest({
            method: 'POST',
            url: '/api/emails',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(res => {
            if(res.success) {
                // console.log('Процесс завершился удачно');
                emptyFormInputs(textInputFields, sendMessageForm.confirm, submitBtn);
                closeWindow(modalSendMessage, 'popup-form_open', sendMessageOverlay, 'popup-overlay_open');
                loaderSendMessage.classList.add('preloader_hidden');
                alert('Ваше сообщение успешно отправлено!');
            } else {
                // console.log('Выкинули исключение');
                throw res;
            };
        })
        .catch(err => {
            // console.log('Получили ошибку с сервера');
                // console.log('err:', err);
            if(err.errors) {
                // console.error('err.errors:', err.errors);
                errorFormHandler(err.errors, sendMessageForm);
            };
        })
        .finally(() => {
            loaderSendMessage.classList.add('preloader_hidden');
        });
    }
    
    function initRegister() {
        // const buttonOpeningModalRegister = document.querySelector(".menu__register-btn_js");
        const modalRegister = document.querySelector(".register-form_js");
        // const buttonCloseModalRegister = document.querySelector(".register-form__close-btn_js");
        const loaderRegister = document.querySelector(".preloader__loader_js");
        const registerForm = document.forms.register;
        const registerOverlay = document.querySelector(".register-overlay_js");
        const submitBtn = registerForm.elements.submitButton;
        // console.log("запрос ушёл на сервер");
    
        let data = {};
        data.email = registerForm.email.value;
        data.name = registerForm.name.value;
        data.surname = registerForm.surname.value;
        data.password = registerForm.password.value;
        data.location = registerForm.location.value;
        data.age = +registerForm.age.value;
    
        const textInputFields = [
            registerForm.email,
            registerForm.name,
            registerForm.surname,
            registerForm.password,
            registerForm.passwordRepeat,
            registerForm.location,
            registerForm.age
        ];
    
        loaderRegister.classList.remove('preloader_hidden');
        sendRequest({
            method: 'POST',
            url: '/api/users',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(res => {
            if(res.success) {
                // console.log('Процесс завершился удачно');            
                emptyFormInputs(textInputFields, registerForm.confirm, submitBtn);
                closeWindow(modalRegister, 'popup-form_open', registerOverlay, 'popup-overlay_open');
                alert(`Пользователь с id ${res.data.id} & email ${res.data.email} создан!`);
                loaderRegister.classList.add('preloader_hidden');
            } else {
                // console.log('Выкинули исключение');
                throw res;
            };
        })
        .catch(err => {
            // console.log('Получили ошибку с сервера');
            // console.error(err.errors);
            errorFormHandler(err.errors, registerForm);
        })
        .finally(() => {
            loaderRegister.classList.add('preloader_hidden');
        });
    };
    
    function  initSignIn() {
        const modalLogin = document.querySelector(".sign-in-form_js");
        // const buttonOpenLogin = document.querySelector(".menu__sign-in-btn_js");
        // const buttonCloseLogin = document.querySelector(".sign-in-form__close-btn_js");
        const loaderSignIn = document.querySelector(".preloader__loader_js");
        const loginForm = document.forms.signIn;
        const loginOverlay = document.querySelector(".sign-in-overlay_js")
        loaderSignIn.classList.remove('preloader_hidden');
    
        let data = {};
        data.email = loginForm.email.value;
        data.password = loginForm.password.value;
    
        const textInputFields = [
            loginForm.email,
            loginForm.password
        ];
    
        sendRequest({
            method: 'POST',
            url: '/api/users/login',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(res => {
            if(res.success) {
                // console.log('Процесс завершился удачно');
                // console.log('Вы успешно вошли!');
                // console.log(res);
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userId', res.data.userId);
                emptyFormInputs(textInputFields);
                closeWindow(modalLogin, 'popup-form_open', loginOverlay, 'popup-overlay_open');
                loaderSignIn.classList.add('preloader_hidden');
                rerenderLinks();
                setTimeout(() => {
                    location.pathname = '/pages/profile';
                }, 2000);
            } else {
                // console.log('Выкинули исключение');
                throw res;
            };
        })
        .catch(err => {
            // console.log('Получили ошибку с сервера');
            if(err._message) {
                // alert(err._message);
                // console.log('err._message:', err._message);
                const errorObj = {"email" : err._message};
                errorFormHandler(errorObj, loginForm);
            };
        })
        .finally(() => {
            loaderSignIn.classList.add('preloader_hidden');
        });
    };
    
    function errorFormHandler(errors, form) {
        if(Object.keys(errors).length) {
            Object.keys(errors).forEach(key => {
                const messageError = errors[key];
                const input = form.elements[key];
                showErrorMessageFromServer(input, messageError);
            });
            return;
        };
    };
    
    function showErrorMessageFromServer(input, messageError) {
        // console.log("ошибка записана в соответсвующее поле")
        markTextInputAsInvalid(input);
        let errorElement = document.createElement('div');
        errorElement.classList.add('text-input-error');
        errorElement.innerText = messageError;
        if (!input.nextElementSibling.classList.contains("hidden")) {
            input.nextElementSibling.classList.add("hidden");
        };
        if (!input.nextElementSibling.nextElementSibling.classList.contains("hidden")) {
            input.nextElementSibling.nextElementSibling.classList.add("hidden");
        };    
        if(!input.nextElementSibling.nextElementSibling.nextElementSibling) {
            input.nextElementSibling.nextElementSibling.insertAdjacentElement('afterend', errorElement);
        } else {
            input.nextElementSibling.nextElementSibling.nextElementSibling.innerText = messageError;
        };
    };
    
    function emptyFormInputs(textInputsArray, confirmCheckbox = null, submitButton = null) {
        textInputsArray.forEach((input) => {
            unmarkTextInput(input);    
            input.value = '';
        });
        if(confirmCheckbox) {
            unmarkCheckboxInput(confirmCheckbox);
            confirmCheckbox.checked = false;
        };
        if(submitButton) {
            submitButtonUnBlocker(confirmCheckbox, submitButton)
        };
    };
    
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
    
    //демаркировщик текстового поля  v.1.1.0 с добавлением исключения для корректной работы send-message text area
    function unmarkTextInput(elm) {
        if(elm.classList.contains("text-input-field_invalid")) {
            elm.classList.remove("text-input-field_invalid");
        };
        if(elm.classList.contains("text-input-field_valid")) {
            elm.classList.remove("text-input-field_valid");
        };
        if (!!elm.nextElementSibling && !!elm.nextElementSibling.nextElementSibling && !elm.nextElementSibling.nextElementSibling.classList.contains("hidden")) {
            elm.nextElementSibling.nextElementSibling.classList.add("hidden");
        };
        if (!!elm.nextElementSibling && !elm.nextElementSibling.classList.contains("hidden")) {
            elm.nextElementSibling.classList.add("hidden");
        };
    };
    
    //демаркировщик чекбокса
    function unmarkCheckboxInput(elm) {
        // markCheckboxInputAsValid(elm);
        if (elm.nextElementSibling.classList.contains("checkbox-input-error")) {
            elm.nextElementSibling.classList.remove("checkbox-input-error");
        };
    };

})();

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
const swiper = new Swiper('.swiper', {
    direction: 'horizontal',

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
});





