//выделение текущей страницы в меню.
(function() {
    const currentPageNameClass = 'menu__my-profile-btn_js';
    const currentPage = document.querySelector(`.${currentPageNameClass}`)
    currentPage.classList.add('header__menu-item_current');
})();


//открытие-закрытие edit-password формы
popupWindowHandler('edit-password-btn_js', 'edit-password-form_js', 
    'edit-password-form__close-btn_js', 'popup-form_open', 
    'edit-password-overlay_js', 'popup-overlay_open');

//открытие-закрытие edit-data формы
popupWindowHandler('edit-data-btn_js', 'edit-data-form_js', 
    'edit-data-form__close-btn_js', 'popup-form_open', 
    'edit-data-overlay_js', 'popup-overlay_open');


//открытие-закрытие попап-меню
popupWindowHandler('mobile__menu-burger_js', 'popup-menu_js', 
    'header__popup-menu-close-btn_js', 'popup-menu_open');


//(открытие)-закрытие successful form
popupWindowHandler(null, 'successfully-form_js', 
'successfully-form__close-btn_js', 'popup-form_open', 
'successfully-overlay_js', 'popup-overlay_open');

//(открытие)-закрытие unsuccessful form
popupWindowHandler(null, 'unsuccessfully-form_js', 
'unsuccessfully-form__close-btn_js', 'popup-form_open', 
'unsuccessfully-overlay_js', 'popup-overlay_open');

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

(function() {

    //валидация формы Edit-Data
    (function() {
        const popupWindow = document.querySelector('.edit-data-form_js');
        const popupOverlay = document.querySelector('.edit-data-overlay_js');
        const form = document.forms.editData;
        const emailInput = form.elements.email;
        const nameInput = form.elements.name;
        const surnameInput = form.elements.surname;
        const locationInput = form.elements.location;
        const ageInput = form.elements.age;
        const submitBtn = form.elements.submitButton;

        emailInput.isValid = () => isValidEmail(emailInput.value);
        nameInput.isValid = () => !!nameInput.value;
        surnameInput.isValid = () => !!surnameInput.value;
        locationInput.isValid = () => !!locationInput.value;
        ageInput.isValid = () => isValidAge(ageInput.value);

        const textInputFields = [
            emailInput,
            nameInput,
            surnameInput,
            locationInput,
            ageInput
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
                putEditedDataToServer();
            }
        });
        
        // запуск проверки после ввода информации в текстовые поля
        textInputFields.forEach(input => {
            input.addEventListener("input", () => {
                areTextInputsValid = validateTextInputs(formNeedsValidation, textInputFields);
            });
        });
    })();

    //валидация формы Edit-Password
    (function() {
        const popupWindow = document.querySelector('.edit-password-form_js');
        const popupOverlay = document.querySelector('.edit-password-overlay_js');
        const form = document.forms.editPassword;
        const passwordOldInput = form.elements.oldPassword;
        const passwordNewInput = form.elements.newPassword;
        const passwordRepeatInput = form.elements.newPasswordRepeat;
        const submitBtn = form.elements.submitButton;

        passwordOldInput.isValid = () => isValidPassword(passwordOldInput.value);
        passwordNewInput.isValid = () => isValidPassword(passwordNewInput.value);
        passwordRepeatInput.isValid = () => isValidPasswordRepeat(passwordNewInput.value, passwordRepeatInput.value);

        const textInputFields = [
            passwordOldInput,
            passwordNewInput,
            passwordRepeatInput,
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
                putEditedPasswordToServer()
            }
        });
        
        // запуск проверки после ввода информации в текстовые поля
        textInputFields.forEach(input => {
            input.addEventListener("input", () => {
                areTextInputsValid = validateTextInputs(formNeedsValidation, textInputFields);
            });
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

//функция закрытия попап-окна и мобильного меню.
function closeWindow(popupWindow, windowUnhideClass, popupOverlay = false, OverlayUnhideClass) {
    popupWindow.classList.remove(windowUnhideClass);
    if (popupOverlay) {
        popupOverlay.classList.remove(OverlayUnhideClass);
    }; 
};

//функция открытия попап-окна
function openWindow(popupWindow, windowUnhideClass, popupOverlay = false, OverlayUnhideClass) {
    popupWindow.classList.add(windowUnhideClass);
    if (popupOverlay) {
        popupOverlay.classList.add(OverlayUnhideClass);
    }; 
}

// Ссылка на бек
const BASE_SERBER_PATH = 'https://academy.directlinedev.com';

function sendRequest({url, method = 'GET', headers, body = null}) {
    // let customBody = null;
    return fetch(BASE_SERBER_PATH + url + '?v=1.0.0', {
        method,
        headers,
        body,
    });
};

(function initPage() {
    rerenderLinks();
})();

let prealoadersLaunchedOnPageCounter = 0;
let actualProfileData = null;

(function initProfilePageData() {
    const passwordEditingModal = document.querySelector(".edit-password-form_js");
    const dataEditingModal = document.querySelector(".edit-data-form_js");
    const preloader = document.querySelector(".preloader__loader_js");
    const buttonOpeningPasswordEditingModal = document.querySelector(".edit-password-btn_js");
    const buttonOpeningDataEditingModal = document.querySelector(".edit-data-btn_js");
    const passwordEditingForm = document.forms.editPassword;
    const dataEditingForm = document.forms.editData;
    const signOutBtn = document.querySelector(".sign-out-btn_js");
    const deleteAccountBtn = document.querySelector(".delete-account-btn_js");

    rerenderLinks();
    getProfile();

    // setTimeout(() => {
    //     console.log('actualProfileData after GetProfile:', actualProfileData);
    // }, 2000);

    buttonOpeningDataEditingModal.addEventListener('click', () => {
        rerenderDataEditingFormValuesFromProfile(dataEditingForm, actualProfileData);
    });

    signOutBtn.addEventListener('click', () => {
        if(confirm('You will exit from your account. Are you sure?')) {
            console.log("You have signed out succeffully");
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            location.pathname = '/';
            return;
        }
    });

    deleteAccountBtn.addEventListener('click', () => {
        if(confirm('Your account will be DELETED. Are you sure?')) {
            console.log("Your account has been deleted from database.");
            sendRequest ({
                method: 'DELETE',
                url: `/api/users/${localStorage.getItem('userId')}`,
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                }
            })
            .then(res => {
                if(res.status === 401 || res.status === 403) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                    location.pathname = '/';
                    return;
                };
                return res.json();
            })
            .then(res => {
                if(res.success) {
                    alert('Your account has been deleted successfully');
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                    location.pathname = '/';
                    return;
                }
            })
            .catch(err => {
                console.log('Получили ошибку с сервера');
                console.log('error:', err);
                console.log('error message:', err._message);
            })
        };
    })

    function getProfile() {
        unHidePreloader();
        sendRequest ({
            method: 'GET',
            url: `/api/users/${localStorage.getItem('userId')}`,
        })
        .then(res => res.json())
        .then(res => {
            if(res.success) {
                actualProfileData = res.data;
                // console.log('actualProfileData after GetProfile 1:', actualProfileData);
                renderProfile(actualProfileData);
                } else {
                location.pathname = '/';
                }
            })
        .finally(() => {
            hidePreloader();
        })
    };
})();

function putEditedPasswordToServer() {
    const preloader = document.querySelector(".preloader__loader_js");
    const passwordEditingModal = document.querySelector(".edit-password-form_js");
    const passwordEditingOverlay = document.querySelector(".edit-password-overlay_js");
    const successfullyModal = document.querySelector(".successfully-form_js");
    const successfullyOverlay = document.querySelector(".successfully-overlay_js");
    const unsuccessfullyModal = document.querySelector(".unsuccessfully-form_js");
    const unsuccessfullyOverlay = document.querySelector(".unsuccessfully-overlay_js");
    const unsuccessfullyErrorMessage = document.querySelector(".unsuccessfully-form__error-message_js");

    unHidePreloader();

    const passwordEditingForm = document.forms.editPassword;
    const data = new FormData(passwordEditingForm);
    console.log('FormData:', data);

    const textInputFields = [
        passwordEditingForm.newPassword,
        passwordEditingForm.oldPassword,
        passwordEditingForm.newPasswordRepeat
    ];

    sendRequest({
        method: 'PUT',
        url: '/api/users',
        body: data,
        headers: {
            'x-access-token': localStorage.getItem('token'),
        }
    })
    .then(res => {
        if(res.status === 401 || res.status === 403) {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            location.pathname = '/';
            return;
        };
        return res.json();
    })
    .then(res => {
        if(res.success) {
            console.log('Процесс завершился удачно');
            actualProfileData = res.data;
            // console.log('actualProfileData:', actualProfileData);
            renderProfile(actualProfileData);
            emptyFormInputs(textInputFields);
            closeWindow(passwordEditingModal, 'popup-form_open', passwordEditingOverlay, 'popup-overlay_open');
            openWindow(successfullyModal, 'popup-form_open', successfullyOverlay, 'popup-overlay_open');
            // rerenderPasswordEditingFormValuesFromProfile(passwordEditingForm, actualProfileData);
            setTimeout(() => {
                closeWindow(successfullyModal, 'popup-form_open', successfullyOverlay, 'popup-overlay_open');
            }, 2000);
        } else {
            // console.log('Выкинули исключение');
            throw res;
        }
    })
    .catch(err => {
        // console.log('Получили ошибку с сервера');
        // console.log('error:', err);
        // console.log('error message:', err._message);
        if(err._message) {
            // alert(err._message);
            unsuccessfullyErrorMessage.innerText = err._message;
        } else if(err._message === "") {
            unsuccessfullyErrorMessage.innerText = 'Unknown erorr';
        };
        emptyFormInputs(textInputFields);
        closeWindow(passwordEditingModal, 'popup-form_open', passwordEditingOverlay, 'popup-overlay_open');
        openWindow(unsuccessfullyModal, 'popup-form_open', unsuccessfullyOverlay, 'popup-overlay_open');
        setTimeout(() => {
            closeWindow(unsuccessfullyModal, 'popup-form_open', unsuccessfullyOverlay, 'popup-overlay_open');
        }, 2000);
    })
    .finally(() => {
        hidePreloader();
    })
}

//смотреть с 54й минуты.
function putEditedDataToServer() {
    const preloader = document.querySelector(".preloader__loader_js");
    const dataEditingModal = document.querySelector(".edit-data-form_js");
    const dataEditingOverlay = document.querySelector(".edit-data-overlay_js");
    const successfullyModal = document.querySelector(".successfully-form_js");
    const successfullyOverlay = document.querySelector(".successfully-overlay_js");
    const unsuccessfullyModal = document.querySelector(".unsuccessfully-form_js");
    const unsuccessfullyOverlay = document.querySelector(".unsuccessfully-overlay_js");
    const unsuccessfullyErrorMessage = document.querySelector(".unsuccessfully-form__error-message_js");

    unHidePreloader();

    const dataEditingForm = document.forms.editData;
    const data = new FormData(dataEditingForm);
    console.log('FormData:', data);
    sendRequest({
      method: 'PUT',
      url: '/api/users',
      body: data,
      headers: {
        'x-access-token': localStorage.getItem('token'),
      }
    })
    .then(res => {
      if(res.status === 401 || res.status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        location.pathname = '/';
        return;
      };
      return res.json();
    })
    .then(res => {
      if(res.success) {
        console.log('Процесс завершился удачно');
        actualProfileData = res.data;
        // console.log('actualProfileData:', actualProfileData);
        renderProfile(actualProfileData);   
        closeWindow(dataEditingModal, 'popup-form_open', dataEditingOverlay, 'popup-overlay_open');
        openWindow(successfullyModal, 'popup-form_open', successfullyOverlay, 'popup-overlay_open');
        rerenderDataEditingFormValuesFromProfile(dataEditingForm, actualProfileData);
        setTimeout(() => {
            closeWindow(successfullyModal, 'popup-form_open', successfullyOverlay, 'popup-overlay_open');
        }, 2000);
      } else {
        console.log('Выкинули исключение');
        throw res;
      }
    })
    .catch(err => {
        console.log('Получили ошибку с сервера');
        console.log('error:', err);
        console.log('error message:', err._message);
    if(err.errors) {
        console.error(err.errors);
        errorFormHandler(err.errors, dataEditingForm);
    };
    if(err._message) {
        // alert(err._message);
        unsuccessfullyErrorMessage.innerText = err._message;
        closeWindow(dataEditingModal, 'popup-form_open', dataEditingOverlay, 'popup-overlay_open');
        openWindow(unsuccessfullyModal, 'popup-form_open', unsuccessfullyOverlay, 'popup-overlay_open');
        setTimeout(() => {
            closeWindow(unsuccessfullyModal, 'popup-form_open', unsuccessfullyOverlay, 'popup-overlay_open');
        }, 2000);
      }
    })
    .finally(() => {
        hidePreloader();
    });
};

// //функция для отладки при выключенной валидации формы
// (function bypassValidationEditData() {
//     const form = document.forms.editData;
//     form.addEventListener("submit", (e) => {
//         e.preventDefault();
//         putEditedDataToServer();
//     });
// })();

function rerenderLinks() {
    const loginButton = document.querySelector('.menu__sign-in-btn_js');
    const registerButton = document.querySelector('.menu__register-btn_js');
    const toProfileButton = document.querySelector('.menu__my-profile-btn_js');
    const isLogin = localStorage.getItem('token');
    // const isLogin = true;

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

function rerenderDataEditingFormValuesFromProfile(form, profile) {
    form.email.value = profile.email;
    form.name.value = profile.name;
    console.log('profile.name:', profile.name)
    form.surname.value = profile.surname;
    form.location.value = profile.location;
    form.age.value = profile.age;
}

// function rerenderPasswordEditingFormValuesFromProfile(form, profile) {

// }

function unHidePreloader() {
    const preloader = document.querySelector(".preloader__loader_js");
    prealoadersLaunchedOnPageCounter++
    preloader.classList.remove('preloader_hidden');
};

function hidePreloader() {
    const preloader = document.querySelector(".preloader__loader_js");
    prealoadersLaunchedOnPageCounter--;
    if(prealoadersLaunchedOnPageCounter <= 0) {
      prealoadersLaunchedOnPageCounter = 0;
      preloader.classList.add('preloader_hidden');
    };
};

function renderProfile(profile) {
    const profileImg = document.querySelector(".myprofile__img-wrapper_js");
    const profileName = document.querySelector(".myprofile__name_js");
    const profileSurname = document.querySelector(".myprofile__surname_js");
    const profileEmail = document.querySelector(".myprofile__email_js");
    const profileLocation = document.querySelector(".myprofile__location_js");
    const profileAge = document.querySelector(".myprofile__age_js");

    profileImg.style.backgroundImage = `url(${BASE_SERBER_PATH + profile.photoUrl})`;
    profileName.innerText = profile.name;
    profileSurname.innerText = profile.surname;
    profileEmail.innerText = profile.email;
    profileLocation.innerText = profile.location;
    profileAge.innerText = profile.age;
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

//демаркировщик текстового поля
function unmarkTextInput(elm) {
    if(elm.classList.contains("text-input-field_invalid")) {
        elm.classList.remove("text-input-field_invalid");
    };
    if(elm.classList.contains("text-input-field_valid")) {
        elm.classList.remove("text-input-field_valid");
    };
    if (!elm.nextElementSibling.nextElementSibling.classList.contains("hidden")) {
        elm.nextElementSibling.nextElementSibling.classList.add("hidden");
    };
    if (!elm.nextElementSibling.classList.contains("hidden")) {
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
