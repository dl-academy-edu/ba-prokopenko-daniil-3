// Базовый путь на сервер
const BASE_SERVER_PATH = 'https://academy.directlinedev.com';

//выделение текущей страницы в меню.
(function() {
    const currentPageNameClass = 'menu__my-blog-btn_js';
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
    }
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
            console.log('Получили ошибку с сервера');
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

})();

//фильтр и загрузка постов
(function() {
    const restoreLastFilterSettingsNextTime = true;
    const postsByPageCountByDefaultLimit = 5; // макс количество постов на странице по дефолту.
    const monthsByNumber = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    const resetedFilterValues = {"name": "", "tags": [""], "views": "", "comments": [""], "howShow": "", "sortBy": ""};
    const form = document.forms.filter;
    const ResetBtn = document.querySelector('.blogs-control-panel__reset-btn_js');
    const buttonBack = document.querySelector('.myblog-button_back_js');
    const buttonNext = document.querySelector('.myblog-button_next_js');
    const mainLoader = document.querySelector('.preloader__loader_js');
    let loaderCount = 0;

    form.addEventListener('submit', e => {
        e.preventDefault();
        let data = {
            page: 0,
        };
        data.name = form.elements.name.value;
        data.tags = [...form.elements.tags].filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
        data.views = ([...form.elements.views].find(radio => radio.checked) || {value: null}).value;
        data.comments = [...form.elements.comments].filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
        data.howShow = ([...form.elements.howShow].find(radio => radio.checked) || {value: null}).value;
        data.sortBy = ([...form.elements.sortBy].find(radio => radio.checked) || {value: null}).value;
        getPostsDataFromServer(data);
        setSearchParams(data);
    });
    // получение списка тегов с сервера
    let xhr = new XMLHttpRequest();
    xhr.open('GET', BASE_SERVER_PATH + '/api/tags');
    xhr.send();
    showLoader();
    xhr.onload = () => {
        const tags = JSON.parse(xhr.response).data;
        const tagsBox = document.querySelector('.blogs-control-panel__column-tags-wrapper_js');  // обёртка куда отрисовывать теги в форме
        tags.forEach(tag => {
            const tagHTML = createTag({
                id: tag.id,
                name: tag.name,
                color: tag.color,
            });
            tagsBox.insertAdjacentHTML('beforeend', tagHTML);
        });
        // console.log('search params not empty:', !!location.search.length);
        // console.log('search params exist in local storage:', !!localStorage.getItem('searchParams'));
        if(restoreLastFilterSettingsNextTime && !location.search.length && localStorage.getItem('searchParams')) {
            // console.log('filter settings restored from location');
            location.search = localStorage.getItem('searchParams');
        };
        
        const params = getSearchParamsFromLocation();
        
        setDataToFilter(params);
        getPostsDataFromServer(params);
        hideLoader();
    };
    ResetBtn.addEventListener('click', () => {
        setDataToFilter(resetedFilterValues);
    });
    buttonBack.addEventListener('click', () => {
        turnPageTo(getSearchParamsFromLocation().page - 1);
    });
    buttonNext.addEventListener('click', () => {
        turnPageTo(getSearchParamsFromLocation().page + 1);
    });

    //
    function getSearchParamsFromLocation() {
        let searchParams = new URLSearchParams(location.search);
        return {
            name: searchParams.get('name') || '',
            tags: searchParams.getAll('tags'),
            views: searchParams.get('views'),
            comments: searchParams.getAll('comments'),
            howShow: searchParams.get('howShow'),
            sortBy: searchParams.get('sortBy'),
            page: +searchParams.get('page') || 0,
        };
    };

    //
    function setDataToFilter(data) {
        const form = document.forms.filter;
        form.elements.name.value = data.name;
        form.elements.tags.forEach(checkbox => {
            checkbox.checked = data.tags.includes(checkbox.value);
        });
        form.elements.views.forEach(radio => {
            radio.checked = data.views === radio.value
        });
        form.elements.comments.forEach(checkbox => {
            checkbox.checked = data.comments.includes(checkbox.value);
        });
        form.elements.howShow.forEach(radio => {
            radio.checked = data.howShow === radio.value
        });
        form.elements.sortBy.forEach(radio => {
            radio.checked = data.sortBy === radio.value
        });
    };

    //
    function setSearchParams(data) {
        let searchParams = new URLSearchParams();
        searchParams.set('name', data.name);
        data.tags.forEach(item => {
            searchParams.append('tags', item);
        });
        if(data.views) {
            searchParams.set('views', data.views);
        };
        data.comments.forEach(item => {
            searchParams.append('comments', item);
        });
        if(data.howShow) {
            searchParams.set('howShow', data.howShow);
        };
        if(data.sortBy) {
            searchParams.set('sortBy', data.sortBy);
        };
        if(data.page) {
            searchParams.append('page', data.page);
        } else {
            searchParams.set('page', 0);
        };
        history.replaceState(null, document.title, '?' + searchParams.toString());
        localStorage.setItem('searchParams', searchParams.toString());
    };

    //preparing parameters, getting posts from server.
    function getPostsDataFromServer(params) {
        let xhr = new XMLHttpRequest();
        let searchParams = new URLSearchParams();
        searchParams.set('v', '1.0.0');
        if(params.tags && Array.isArray(params.tags) && params.tags.length) {
            searchParams.set('tags', JSON.stringify(params.tags));
        };
        let filter = {};
        if(params.name) {
            filter.title = params.name;
        };
        let postsByPageCountSelectedLimit = postsByPageCountByDefaultLimit;
        if(+params.howShow) {
            postsByPageCountSelectedLimit = +params.howShow;
        };
        searchParams.set('limit', postsByPageCountSelectedLimit);
        if (params.views) {
            const viewsSelected = (params.views).split('-');
            filter.views = {"$between": viewsSelected};
        };
        if(params.comments.length) {
            const commentsCountSelected = [params.comments[0].split('-')[0], params.comments[params.comments.length-1].split('-')[1]];
            filter.commentsCount = {"$between": commentsCountSelected};
        };
        searchParams.set('filter', JSON.stringify(filter));

        if(+params.page) {
            searchParams.set('offset', (+params.page) * postsByPageCountSelectedLimit)
        };
        if(params.sortBy) {
            searchParams.set('sort', JSON.stringify([params.sortBy, 'ASC']));
        };
        xhr.open('GET', BASE_SERVER_PATH + '/api/posts?' + searchParams.toString());
        xhr.send();

        showLoader();
        xhr.onload = () => {
            const response = JSON.parse(xhr.response);
            let dataPosts = '';
            response.data.forEach(post => {
                dataPosts += cardCreate({
                    title: post.title,
                    text: post.text,
                    photo: post.photo,
                    tags: post.tags,
                    commentsCount: post.commentsCount,
                    date: new Date(post.date),
                    views: post.views,
                });
            });
            const result = document.querySelector('.result_js');
            result.innerHTML = dataPosts;
            const links = document.querySelector('.pagination_js');
            links.innerHTML = '';
            const pageCount = Math.ceil(response.count / postsByPageCountSelectedLimit);
            // console.log(pageCount);
            for (let i = 0; i < pageCount; i++) {
                const link = linkElementCreate(i);
                links.insertAdjacentElement('beforeend', link);
            };
            if(getSearchParamsFromLocation().page > 0) {
                buttonBack.removeAttribute('disabled');
            };
            if(getSearchParamsFromLocation().page < (pageCount - 1)) {
                buttonNext.removeAttribute('disabled');
            };

            if(getSearchParamsFromLocation().page === 0) {
                buttonBack.setAttribute('disabled', '');
            };
            if(getSearchParamsFromLocation().page === (pageCount - 1) || pageCount === 0) {
                buttonNext.setAttribute('disabled', '');
            };
            hideLoader();
        };
    };

    //creator of pagination link
    function linkElementCreate(page) {        
        const link = document.createElement('a');
        link.href = '?page=' + page;
        link.innerText = '' + (page + 1);
        link.classList.add('pagination-panel__pagination-link');
        link.classList.add('pagination-link_js');
        let params = getSearchParamsFromLocation();
        if(page === +params.page) {
            link.classList.add('pagination-link_active');
        }
        link.addEventListener('click', (e) => {
            e.preventDefault();
            turnPageTo(page);
        });
        return link;
    };

    function turnPageTo(page) {
        const links = document.querySelectorAll('.pagination-link_js');
        let searchParams = new URLSearchParams(location.search);
        let params = getSearchParamsFromLocation();
        links[params.page].classList.remove('pagination-link_active');
        searchParams.set('page', page);
        links[page].classList.add('pagination-link_active');
        history.replaceState(null, document.title, '?' + searchParams.toString());
        getPostsDataFromServer(getSearchParamsFromLocation());
    };

    //creator of post entry item card
    function cardCreate({title, text, photo, tags, commentsCount, date, views}) {
        return `
        <section class="myblog__main-item blog-item">   
            <picture class="blog-item__img-wrapper">
                <source class="blog-item__img" media="screen and (min-width: 1200px)" srcset="${BASE_SERVER_PATH}${photo.desktopPhotoUrl}, ${BASE_SERVER_PATH}${photo.desktop2xPhotoUrl} 2x">
                <source class="blog-item__img" media="screen and (min-width: 768px) and (max-width: 1199px)" srcset="${BASE_SERVER_PATH}${photo.tabletPhotoUrl}, ${BASE_SERVER_PATH}${photo.tablet2xPhotoUrl} 2x">
                <source class="blog-item__img" media="screen and (max-width: 767px)" srcset="${BASE_SERVER_PATH}${photo.mobilePhotoUrl}, ${BASE_SERVER_PATH}${photo.mobile2xPhotoUrl} 2x">
                <img class="blog-item__img" src="${BASE_SERVER_PATH}${photo.desktopPhotoUrl}" alt="${title}">
            </picture>
            <div class="blog-item__text-block">
                <div class="blog-item__tags">
                    ${tags.map(tag => `<div class="blog-item__tags-item" style="background-color: ${tag.color}"></div>`).join('')}
                </div>
                <div class="blog-item__dates">
                    <div class="blog-item__dates-item blog-item__post-date">${date.getDate()}.${monthsByNumber[date.getMonth()]}.${date.getFullYear()}</div>

                    <div class="blog-item__dates-item blog-item__post-views">${views} views</div>
                    <div class="blog-item__dates-item blog-item__post-comments">${commentsCount} comments</div>
                </div>
                <h3 class="blog-item__title">${title}</h3>
                <p class="blog-item__text">${text}</p>
                <a class="blog-item__link" href="#">Go to this post</a>
            </div>
        </section>`
    };

    //tag creator in filter form (control panel)
    function createTag({id, name, color}) {
        return `
        <input type="checkbox" name="tags" id="tags-${id}" value="${id}">
        <label for="tags-${id}" class="checkbox-label-tag">
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1.25" y="1.25" width="22.5" height="22.5" rx="3.75" stroke="${color}" stroke-width="2.5"/>
                <path d="M7 11.75L10.913 17.77C11.2013 18.2135 11.8584 18.1893 12.1133 17.7259L18.425 6.25" stroke="${color}" stroke-opacity="0" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
        </label>`
    };

    function showLoader() {
        loaderCount++;
        mainLoader.classList.remove('preloader_hidden');
        // console.log(`loader count increased:` + loaderCount);
    };
    function hideLoader () {
        loaderCount--;
        // console.log(`loader count decreased:` + loaderCount);
        if(loaderCount <= 0) {
            mainLoader.classList.add('preloader_hidden');
            loaderCount = 0;
        };
    };
})();

















