const canvas = document.getElementById('romanticCanvas');
const ctx = canvas.getContext('2d');

// Canvas boyutları güncelleniyor
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Arka plan gökyüzü ve hilal çizimi
function drawNightSky() {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#001d3d'); 
    gradient.addColorStop(1, '#1a1a1a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 2;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
    }

    const moonX = canvas.width - 100;
    const moonY = 100;
    const moonRadius = 50;
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonRadius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(moonX + 20, moonY - 10, moonRadius, 0, 2 * Math.PI);
    ctx.fillStyle = '#001d3d';
    ctx.fill();
}

function drawHeart(x, y, size) {
    const colors = ['red', 'pink', 'purple', 'orange'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(Math.sin(Date.now() / 200) * 0.2 + 0.8, Math.sin(Date.now() / 200) * 0.2 + 0.8);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(size / 2, -size / 2, size * 2, size / 3, 0, size);
    ctx.bezierCurveTo(-size * 2, size / 3, -size / 2, -size / 2, 0, 0);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
}

function drawText(x, y, size, text, color = 'white', font = 'Arial') {
    ctx.font = `${size}px ${font}`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.fillText(text, x, y);
}

let hearts = [];

const texts = [
    "En güzel doktor, En seksi doktor Benim doktor",
    "O sınavı kazanacaksın sana inanıyorum",
    "Kalbim seninle",
    "Sana İnanıyorum",
    "Sana Güveniyorum",
    "Sunshine",
    "YAVRUMMM"
];

function createHeart() {
    const x = Math.random() * canvas.width;
    const y = canvas.height + 100;
    const size = Math.random() * 40 + 30; 
    const speed = Math.random() * 1 + 0.5;
    const text = texts[Math.floor(Math.random() * texts.length)];
    hearts.push({ x, y, size, speed, text });
}

const finalMessage = "Sana butun kalbimle inaniyorum sen o sinavi verip Uzman Doktor olacaksin";
const showFinalMessageTime = 30000; 

let messageShown = false;
let animationRunning = false;
let startTime = null;

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawNightSky();

    for (let i = 0; i < hearts.length; i++) {
        const heart = hearts[i];
        drawHeart(heart.x, heart.y, heart.size);
        drawText(heart.x, heart.y - heart.size / 2, heart.size / 2, heart.text);
        heart.y -= heart.speed; 
        heart.x += Math.sin(heart.y / 50) * 2;

        if (heart.y + heart.size < 0) {
            hearts.splice(i, 1);
            i--;
        }
    }

    if (Date.now() - startTime > showFinalMessageTime && !messageShown) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawNightSky();
        drawText(canvas.width / 2, canvas.height / 2, 50, finalMessage, 'white', 'Arial');
        messageShown = true;
    } else {
        requestAnimationFrame(animate);
    }
}

let heartInterval;

function startAnimation() {
    animationRunning = true; 
    startTime = Date.now();
    heartInterval = setInterval(createHeart, 300);
    drawText(canvas.width / 2, canvas.height / 2, 100, "Liselim", 'white', 'Arial');
    animate();
}

canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    hearts.forEach((heart, index) => {
        if (Math.abs(x - heart.x) < heart.size && Math.abs(y - heart.y) < heart.size) {
            hearts.splice(index, 1);
            createHeart();
            showHeartMessage(heart.x, heart.y, "♥ Seni Seviyorum ♥");
        }
    });
});

function showHeartMessage(x, y, message) {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(message, x, y);
    setTimeout(() => {
        ctx.clearRect(x - 50, y - 30, 100, 50);
    }, 2000);
}

drawNightSky();
