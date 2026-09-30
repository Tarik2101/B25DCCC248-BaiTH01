//menu hamburger
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
});
// dark/light mode
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if(document.body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
});

// smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        navLinks.classList.remove('nav-active');
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// lọc/tìm theo tag
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// scroll reveal
function reveal() {
    var reveals = document.querySelectorAll('.reveal');
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}
window.addEventListener('scroll', reveal);
reveal();

// đếm ký tự
const form = document.getElementById('contact-form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');
const charCurrent = document.getElementById('char-current');

message.addEventListener('input', () => {
    const currentLength = message.value.length;
    charCurrent.textContent = currentLength;
    if(currentLength > 200) {
        charCurrent.style.color = 'red';
    } else {
        charCurrent.style.color = '#888';
    }
});

// validate form
form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputs();
});

function checkInputs() {
    const nameValue = name.value.trim();
    const emailValue = email.value.trim();
    const messageValue = message.value.trim();
    let isFormValid = true;

    // Validate Tên (không rỗng)
    if(nameValue === '') {
        setErrorFor(name, 'Vui lòng nhập tên của bạn');
        isFormValid = false;
    } else {
        setSuccessFor(name);
    }

    // Validate Email (đúng định dạng)
    if(emailValue === '') {
        setErrorFor(email, 'Vui lòng nhập email');
        isFormValid = false;
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Email không hợp lệ');
        isFormValid = false;
    } else {
        setSuccessFor(email);
    }

    // Validate Message (không rỗng và <= 200 ký tự)
    if(messageValue === '') {
        setErrorFor(message, 'Vui lòng nhập lời nhắn');
        isFormValid = false;
    } else if(messageValue.length > 200) {
        setErrorFor(message, 'Lời nhắn không được vượt quá 200 ký tự');
        isFormValid = false;
    } else {
        setSuccessFor(message);
    }

    if(isFormValid) {
        alert('Gửi thông tin thành công!');
        form.reset();
        charCurrent.textContent = '0';
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}


document.getElementById('current-year').textContent = new Date().getFullYear();