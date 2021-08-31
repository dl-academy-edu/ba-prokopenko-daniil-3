
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



//фильтр и загрузка постов
(function() {
    //исходные данные для работы фильтра и загрузки постов.
    const SERVER_URL = 'https://academy.directlinedev.com';
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
        getData(data);
        setSearchParams(data);
    });
    // получение списка тегов с сервера
    let xhr = new XMLHttpRequest();
    xhr.open('GET', SERVER_URL + '/api/tags');
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
        const params = getParamsFromLocation();
        setDataToFilter(params);
        getData(params);
        hideLoader();
    };
    ResetBtn.addEventListener('click', () => {
        setDataToFilter(resetedFilterValues);
    });
    buttonBack.addEventListener('click', () => {
        turnPageTo(getParamsFromLocation().page - 1);
    });
    buttonNext.addEventListener('click', () => {
        turnPageTo(getParamsFromLocation().page + 1);
    });

    //
    function getParamsFromLocation() {
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
    };

    //preparing parameters, getting posts from server.
    function getData(params) {
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
        xhr.open('GET', SERVER_URL + '/api/posts?' + searchParams.toString());
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
            if(getParamsFromLocation().page > 0) {
                buttonBack.removeAttribute('disabled');
            };
            if(getParamsFromLocation().page < (pageCount - 1)) {
                buttonNext.removeAttribute('disabled');
            };

            if(getParamsFromLocation().page === 0) {
                buttonBack.setAttribute('disabled', '');
            };
            if(getParamsFromLocation().page === (pageCount - 1) || pageCount === 0) {
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
        let params = getParamsFromLocation();
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
        let params = getParamsFromLocation();
        links[params.page].classList.remove('pagination-link_active');
        searchParams.set('page', page);
        links[page].classList.add('pagination-link_active');
        history.replaceState(null, document.title, '?' + searchParams.toString());
        getData(getParamsFromLocation());
    };

    //creator of post entry item card
    function cardCreate({title, text, photo, tags, commentsCount, date, views}) {
        return `
        <section class="myblog__main-item blog-item">   
            <picture class="blog-item__img-wrapper">
                <source class="blog-item__img" media="screen and (min-width: 1200px)" srcset="${SERVER_URL}${photo.desktopPhotoUrl}, ${SERVER_URL}${photo.desktop2xPhotoUrl} 2x">
                <source class="blog-item__img" media="screen and (min-width: 768px) and (max-width: 1199px)" srcset="${SERVER_URL}${photo.tabletPhotoUrl}, ${SERVER_URL}${photo.tablet2xPhotoUrl} 2x">
                <source class="blog-item__img" media="screen and (max-width: 767px)" srcset="${SERVER_URL}${photo.mobilePhotoUrl}, ${SERVER_URL}${photo.mobile2xPhotoUrl} 2x">
                <img class="blog-item__img" src="${SERVER_URL}${photo.desktopPhotoUrl}" alt="${title}">
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






