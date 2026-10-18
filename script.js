function getOS() {
    const ua = navigator.userAgent;
    const result = ua.match(/\((.*?)\)/);

    if (result) {
        return result[1];
    } else {
        return "Невідома ОС"
    }
}

function setOS() {
    if (!localStorage.getItem("OS")) {
        localStorage.setItem("OS", getOS());
    }
}

function setFooter(text) {
    const footerText = document.getElementById("Footerh1");
    if (footerText) {
        footerText.textContent = text;
    }
}

function setMain(array) {
    console.log(array);
    const mainPosts = document.getElementById("Posts");
    let htmlContent = "";

    for (let i = 0; i < array.length; i++) {
        htmlContent += `<p>${i + 1}. ${array[i].name}: ${array[i].body}</p>`;
    }

    if (mainPosts) {
        mainPosts.innerHTML = htmlContent;
    }
}

function initModal() {
    const modal = document.getElementById('feedbackModal');
    const closeBtn = document.getElementById('closeModalBtn');

    if (!modal) return;

    setTimeout(() => {
        modal.classList.add('show');
    }, 60000);

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    });
}

function initTheme() {
    const themeBtn = document.getElementById('themeToggleBtn');
    
    function applyAutoTheme() {
        const currentHour = new Date().getHours();
        
        if (currentHour >= 7 && currentHour < 21) {
            document.body.classList.remove('dark-theme');
        } else {
            document.body.classList.add('dark-theme');
        }
    }

    applyAutoTheme();

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
        });
    }
}

initTheme();

async function getPosts() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/22/comments');

        if (!response.ok) {
            throw new Error(`Помилка сервера: ${response.status}`);
        }

        const data = await response.json();
        setMain(data);
        return data
    } catch (error) {
        console.error('Сталася помилка при запиті:', error);
    }
}

// Викликаємо функції
getPosts();

setOS();
setFooter(localStorage.getItem("OS"));
getPosts()

initModal();

