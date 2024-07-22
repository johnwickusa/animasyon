const canvas = document.getElementById('romanticCanvas');
const ctx = canvas.getContext('2d');

// Canvas boyutları güncelleniyor
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Arka plan gökyüzü ve hilal çizimi
function drawNightSky() {
    // Arka plan gradienti
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#001d3d'); // Gece mavisi
    gradient.addColorStop(1, '#1a1a1a'); // Siyah
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Yıldızlar
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 2;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
    }

    // Hilal
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
const finalMessage = "Sana butun kalbimle inaniyorum sen o sinavi verip Uzman Doktor olacaksin";
const showFinalMessageTime = 30000; // 30 saniye

// Zamanlayıcı ve mesaj durumu
let messageShown = false;
let animationRunning = false;

// Animasyon fonksiyonu
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Arka plan gökyüzü ve hilal çizimi
    drawNightSky();

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
        drawNightSky(); // Arka planı tekrar çiz
        drawText(canvas.width / 2, canvas.height / 2, 50, finalMessage, 'white', 'Arial');
        messageShown = true;
    } else {
        requestAnimationFrame(animate);
    }
}

// Kalp oluşturma işlemi periyodik olarak devam ediyor
let heartInterval;

// Animasyonu başlat
function startAnimation() {
    animationRunning = true; // Animasyonu başlat
    startTime = Date.now(); // Başlangıç zamanını ayarla
    heartInterval = setInterval(createHeart, 300); // Kalp oluşturma işlemi başlatılıyor
    animate();
}
