var pontos = 0;
var tempo = 1000;
var timer = 30;
var play;
var esfihaApareceu = false;
var boloApareceu = false;
var esfihaTimer;
var boloTimer;
var eatSound = new Audio('song/eat.mp3');
var eat2Sound = new Audio('song/eat2.mp3');
var backgroundMusic = new Audio('song/song.mp3');
var musicStarted = false;

function end() {
    clearInterval(play);
    timer = 30;
    tempo = 1000;
    esfihaApareceu = false;
    boloApareceu = false;

    $('#timer').html(timer);
    $('#pontos').html('Pontos: ' + pontos);
    
    const jogador = localStorage.getItem('Jogador') || 'Jogador';
    alert(`Parabéns ${jogador}! Você coletou: ${pontos} pães!`);

    backgroundMusic.pause();
    window.location = 'index.html'
}

function go() {
    $('.bola').show();
    play = setInterval(function() {
        if (timer > 0) {
            var largura = parseInt($('.area').css('width'));
            var altura = parseInt($('.area').css('height'));
            var l = Math.ceil(Math.random() * (largura - 50));
            var t = Math.floor(Math.random() * (altura - 50));
            $('.bola').css('margin-left', l + 'px');
            $('.bola').css('margin-top', t + 'px');
            timer--;
            $('#timer').html(timer);

            if (timer % 5 === 0 && !esfihaApareceu) {
                if (Math.random() < 0.25) {
                    var el = Math.ceil(Math.random() * (largura - 50));
                    var et = Math.floor(Math.random() * (altura - 50));
                    $('.esfiha').css('margin-left', el + 'px');
                    $('.esfiha').css('margin-top', et + 'px');
                    $('.esfiha').show();
                    esfihaApareceu = true;

                    esfihaTimer = setTimeout(function() {
                        $('.esfiha').hide();
                        esfihaApareceu = false;
                    }, 4000);
                }
            }

            if (timer % 10 === 0 && !boloApareceu) {
                var bl = Math.ceil(Math.random() * (largura - 50));
                var bt = Math.floor(Math.random() * (altura - 50));
                $('.bolo').css('margin-left', bl + 'px');
                $('.bolo').css('margin-top', bt + 'px');
                $('.bolo').show();
                boloApareceu = true;

                boloTimer = setTimeout(function() {
                    $('.bolo').hide();
                    boloApareceu = false;
                }, 4000);
            }

        } else {
            $('.bola').hide();
            $('.esfiha').hide();
            $('.bolo').hide();
            clearTimeout(esfihaTimer);
            clearTimeout(boloTimer);
            end();
        }
    }, tempo);
}

$(document).ready(function() {
    $('#mensagem').show(); 
    $('.bola').hide();
    $('.esfiha').hide();
    $('.bolo').hide();
    $('.area').hide();
});

$(document).on('keydown', function() {
    if (!musicStarted) {
        musicStarted = true;
        backgroundMusic.loop = true;
        backgroundMusic.play();
        $('#mensagem').hide();
        $('.area').show();
        go();
    }
});

$(document).on('click', '.bola', function() {
    pontos++;
    tempo -= 20;
    $('#pontos').html('Pontos: ' + pontos);
});

$(document).on('click', '.esfiha', function() {
    eatSound.play();
    clearTimeout(esfihaTimer);
    $('.esfiha').hide();
    pontos += 5;
    $('#pontos').html('Pontos: ' + pontos);
    timer += 20;
    $('#timer').html(timer);
});

$(document).on('click', '.bolo', function() {
    eat2Sound.play();
    pontos += 10;
    $('#pontos').html('Pontos: ' + pontos);
    clearTimeout(boloTimer);
    $('.bolo').hide(); 
    boloApareceu = false;
});
