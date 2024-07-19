const canvas = document.getElementById('romanticCanvas');
const ctx = canvas.getContext('2d');

// Canvas boyutları güncelleniyor
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Arka plan gradienti çiziliyor
const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
gradient.addColorStop(0, '#001f3f'); // Koyu mavi renk
gradient.addColorStop(1, '#0052d4'); // Daha açık mavi renk

// Yıldızlar dizisi
const stars = [];
const numStars = 200; // Yıldız sayısı

// Yıldız çizme fonksiyonu
function drawStar(x, y, size) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
}

// Arka plan yıldızları oluşturma fonksiyonu
function createStars() {
    for (let i = 0; i < numStars; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 1.5 + 0.5; // Yıldız boyutu
        stars.push({ x, y, size });
    }
}

// Kalp çizme fonksiyonu
function drawHeart(x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x + size / 2, y - size / 2, x + size * 2, y + size / 3, x, y + size);
    ctx.bezierCurveTo(x - size * 2, y + size / 3, x - size / 2, y - size / 2, x, y);
    ctx.closePath();
    ctx.fillStyle = 'red';
    ctx.fill();
}

// Metin çizme fonksiyonu
function drawText(x, y, size, text, color = 'white', font = 'Arial') {
    ctx.font = `${size}px ${font}`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.fillText(text, x, y);
}

// Kalp nesneleri dizisi
let hearts = [];

// Metinler dizisi
const texts = [
    "En güzel doktor, En seksi doktor Benim doktor",
    "O sınavı kazanacaksın sana inanıyorum",
    "Kalbim seninle",
    "Sana İnanıyorum",
    "Sana Güveniyorum",
    "Sunshine",
    "YAVRUMMM"
];

// Kalp oluşturma fonksiyonu
function createHeart() {
    const x = Math.random() * canvas.width;
    const y = canvas.height + 100;
    const size = Math.random() * 40 + 30; // Kalplerin boyutunu rastgele seç
    const speed = Math.random() * 1 + 0.5; // Hız aralığını düşürdük
    const text = texts[Math.floor(Math.random() * texts.length)]; // Rastgele metin seçimi
    hearts.push({ x, y, size, speed, text });
}

// Ekranın ortasında gösterilecek metin
const finalMessage = "Sana bütün kalbimle inanıyorum sen o sınavı verip Uzman Doktor olacaksın";
const showFinalMessageTime = 30000; // 30 saniye

// Zamanlayıcı ve mesaj durumu
let messageShown = false;
let animationRunning = false;
let startTime = 0;
let heartInterval;

// Animasyon fonksiyonu
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Arka plan gradienti tekrar çiziliyor
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Yıldızların çizimi
    for (let star of stars) {
        drawStar(star.x, star.y, star.size);
    }

    // Kalplerin hareketi ve çizimi
    for (let i = 0; i < hearts.length; i++) {
        const heart = hearts[i];
        drawHeart(heart.x, heart.y, heart.size);
        drawText(heart.x, heart.y - heart.size / 2, heart.size / 2, heart.text); // Metni kalbin ortasına yerleştir
        heart.y -= heart.speed; // Yeniden hesaplama: y - speed
        if (heart.y + heart.size < 0) {
            hearts.splice(i, 1);
            i--;
        }
    }

    // 30 saniye sonra final mesajını göster
    if (Date.now() - startTime > showFinalMessageTime && !messageShown) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Ekranı temizle
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height); // Arka planı tekrar çiz
        drawText(canvas.width / 2, canvas.height / 2, 50, finalMessage, 'white', 'Arial');
        messageShown = true;
    } else {
        requestAnimationFrame(animate);
    }
}

// Kalp oluşturma işlemi periyodik olarak devam ediyor
function startAnimation() {
    if (!animationRunning) {
        animationRunning = true; // Animasyonu başlat
        startTime = Date.now(); // Başlangıç zamanını ayarla
        heartInterval = setInterval(createHeart, 300); // Kalp oluşturma işlemi başlatılıyor
        createStars(); // Yıldızları oluştur
        animate();
    }
}
