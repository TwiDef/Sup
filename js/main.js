window.addEventListener('DOMContentLoaded', () => {
    /* Modal Window */

    const modal = document.querySelector('#popup');
    const trigger = document.querySelectorAll('#modal-btn');

    function openModal(modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
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
});