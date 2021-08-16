
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

// //валидация формы Send Message
// (function() {
//     const popupWindow = document.querySelector('.send-message-form_js');
//     const popupOverlay = document.querySelector('.send-message-overlay_js');
//     const form = document.forms.sendMessage;
//     const emailInput = form.elements.email;
//     const nameInput = form.elements.name;
//     const subjectInput = form.elements.subject;
//     const phoneInput = form.elements.phone;

//     const confirmInput = form.elements.confirm;

//     const submitBtn = form.elements.submitButton;

//     emailInput.isValid = () => isValidEmail(emailInput.value);
//     nameInput.isValid = () => !!nameInput.value;
//     subjectInput.isValid = () => !!subjectInput.value;
//     phoneInput.isValid = () => isValidPhone(phoneInput.value);

//     confirmInput.isValid = () => confirmInput.checked;

//     const textInputFields = [
//         emailInput,
//         nameInput,
//         subjectInput,
//         phoneInput
//     ];

//     let areTextInputsValid = false;
//     let isCheckboxInputValid = false;
//     let formNeedsValidation = false;

//     //запуск проверок при нажатии на кнопку сабмит
//     form.addEventListener("submit", (e) => {
//         e.preventDefault();
//         formNeedsValidation = true;
//         areTextInputsValid = validateTextInputs(formNeedsValidation, textInputFields);
//         isCheckboxInputValid = validateCheckboxInputs(formNeedsValidation, confirmInput);
//         if (areTextInputsValid && isCheckboxInputValid) {
//             closeWindow(popupWindow, 'popup-form_open', popupOverlay, 'popup-overlay_open');
//         }
//     });
    
//     // запуск проверки после ввода информации в текстовые поля
//     textInputFields.forEach(input => {
//         input.addEventListener("input", () => {
//             areTextInputsValid = validateTextInputs(formNeedsValidation, textInputFields);
//         });
//     });

//     // запуск проверки при изменении состояния чекбокса
//     confirmInput.addEventListener("input", () => {
//         isCheckboxInputValid = validateCheckboxInputs(formNeedsValidation, confirmInput);
//     });

//     //запуск блокировщика-разблокировщика кнопки submit
//     confirmInput.addEventListener("input", () => {
//         submitButtonUnBlocker(confirmInput, submitBtn)
//     });
// })();

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

//функция закрытия окна и мобильного меню.
function closeWindow(popupWindow, windowUnhideClass, popupOverlay, OverlayUnhideClass) {
    popupWindow.classList.remove(windowUnhideClass);
    if (popupOverlay) {
        popupOverlay.classList.remove(OverlayUnhideClass);
    }; 
}


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
