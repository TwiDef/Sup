window.addEventListener('DOMContentLoaded', () => {
    /* Modal Window */

    const modal = document.querySelector('#popup');
    const trigger = document.querySelectorAll('#modal-btn');
    const scroll = calcScroll();

    function calcScroll() {
        let div = document.createElement('div');
        div.style.width = '50px';
        /* div.style.height = '50px'; */
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';
        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        return scrollWidth;
    }

    function openModal(modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = `${scroll}px`;
    }

    function closeModal(modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
        document.body.style.marginRight = `0px`;
    }

    trigger.forEach((btn) => {
        btn.addEventListener('click', () => {
            openModal(modal);
        });
    });


    modal.addEventListener('click', (e) => {
        if (e.target === document.querySelector('.popup__body') || e.target.getAttribute('data-close') == '') {
            closeModal(modal);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('open')) {
            closeModal(modal);
        }
    });

    function showModalbyScroll() {
        // появление модального окна при полном скролле до конца страницы
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal(modal);
            window.removeEventListener('scroll', showModalbyScroll);
        }
    }
    window.addEventListener('scroll', showModalbyScroll);

    /* ############ */

    /* Button scroll */

    window.addEventListener('scroll', () => {
        const btnUp = document.querySelector('.btnUp');

        if (window.pageYOffset > 2800) { // window.innerHeight
            btnUp.style.display = 'block';
        } else {
            btnUp.style.display = 'none';
        }
        btnUp.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    /* ############# */

    let modalState = {};

    const forms = (state) => {
        const form = document.querySelectorAll('form');
        const inputs = document.querySelectorAll('input');

        const message = {
            loading: "Подождите...",
            success: "Спасибо, скоро мы с вами свяжемся!",
            failure: "Что-то пошло не так"
        };

        const postData = async(url, data) => {
            document.querySelector('.status').textContent = message.loading;
            let res = await fetch(url, {
                method: "POST",
                body: data
            });
            return await res.text();
        };

        const clearInputs = () => {
            inputs.forEach(item => {
                item.value = "";
            });
        };

        form.forEach(item => {
            item.addEventListener('submit', (e) => {
                e.preventDefault();

                let statusMessage = document.createElement('div');
                statusMessage.classList.add('status');
                item.appendChild(statusMessage);

                const formData = new FormData(item);
                for (let key in state) {
                    formData.append(key, state[key]);
                }

                postData('./server.php', formData)
                    .then(res => {
                        console.log(res);
                        statusMessage.textContent = message.success;
                    })
                    .catch(() => statusMessage.textContent = message.failure)
                    .finally(() => {
                        clearInputs();
                        setTimeout(() => {
                            closeModal(modal);
                            statusMessage.remove();
                        }, 2000);
                    });
            });
        });
    };

    forms(modalState);

    /*  Video Modal  */


    const videoContainer = document.querySelector('.video__container');
    const videoTrigger = document.querySelectorAll('.popup-btn');
    const video = document.querySelector('#video');
    let videoLink = 'https://www.youtube.com/embed/tUZ_XbP5lr4';

    videoTrigger.forEach(btn => {
        btn.addEventListener('click', () => {
            videoContainer.innerHTML = `
            <div class="video__content">
                <iframe src=${videoLink} title="Fanatic Ray Touring 2021" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            `;
            video.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });

    video.addEventListener('click', (e) => {
        if (e.target !== document.querySelector('.video__content')) {
            videoContainer.innerHTML = ``;
            video.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    /* ############# */

});