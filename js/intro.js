const images = [
    { src: 'img/nei1.png', caption: 'Em uma famosa padaria, um jovem padeiro mirim, filho do dono do estabelecimento, auxiliava o seu pai no dia a dia. ' },
    { src: 'img/nei2.png', caption: 'Numa tarde monótona, o jovem acabou se distraindo e tropeçando enquanto carregava uma travessa de pães.' },
    { src: 'img/nei3.png', caption: 'Para que ele não fique de castigo, e seu salário seja descontado, você controlando o jovem terá que coletar todos os pães antes que caiam no chão.' },
];

let currentIndex = 0;
const introMusic = document.getElementById('introMusic');

function startIntro() {
    document.getElementById('startMessage').classList.add('hidden');
    introMusic.play();
    showImage();
}

function showImage() {
    if (currentIndex < images.length) {
        const imgElement = document.getElementById('image');
        const captionElement = document.getElementById('caption');

        imgElement.src = images[currentIndex].src;
        captionElement.textContent = '';

        imgElement.classList.remove('hidden');
        captionElement.classList.remove('hidden');

        typeCaption(images[currentIndex].caption);
        currentIndex++;
    } else {
        endIntro();
    }
}

function typeCaption(caption) {
    let index = 0;
    const captionElement = document.getElementById('caption');

    function type() {
        if (index < caption.length) {
            captionElement.textContent += caption[index];
            index++;
            setTimeout(type, 100);
        } else {
            setTimeout(showImage, 2000);
        }
    }
    type();
}

function endIntro() {
    document.getElementById('image').classList.add('hidden');
    document.getElementById('caption').classList.add('hidden');
    document.getElementById('finalMessage').classList.remove('hidden');
}

window.addEventListener('keydown', startIntro, { once: true });
