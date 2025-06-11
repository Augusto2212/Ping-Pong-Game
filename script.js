// Selecionando elementos do HTML
const ball = document.querySelector(".ball");
const paddleLeft = document.querySelector(".paddle-left");
const paddleRight = document.querySelector(".paddle-right");
const scoreLeft = document.getElementById("score-left");
const scoreRight = document.getElementById("score-right");

// Variáveis globais para posição e velocidade da bola
let ballX = 300, ballY = 200;
let ballSpeedX = 1, ballSpeedY = 1;

// Variáveis globais para posição das raquetes
let paddleLeftY = 150, paddleRightY = 150;
const paddleSpeed = 10;

// Variáveis de pontuação
let scoreL = 0, scoreR = 0;

// Sons do jogo
const soundPoint = new Audio("sons/ponto.mp3");
const soundHit = new Audio("sons/rebate.mp3");

let isPaused = false;

// Selecionar o menu de pausa e botões
const pauseMenu = document.getElementById("pause-menu");
const resumeBtn = document.getElementById("resume-btn");
const restartBtn = document.getElementById("restart-btn");
const exitBtn = document.getElementById("exit-btn");

// Alternar pausa ao pressionar espaço
document.addEventListener("keydown", (event) => {
    if (event.key === " ") { // Espaço para pausar
        isPaused = !isPaused;

        if (isPaused) {
            pauseMenu.style.display = "block"; // Mostra o menu
        } else {
            pauseMenu.style.display = "none"; // Esconde o menu
            gameLoop(); // Retorna ao jogo
        }
    }
});

// Botão para continuar
resumeBtn.addEventListener("click", () => {
    isPaused = false;
    pauseMenu.style.display = "none";
    gameLoop();
});

// Botão para reiniciar
restartBtn.addEventListener("click", () => {
    scoreL = 0;
    scoreR = 0;
    scoreLeft.textContent = scoreL;
    scoreRight.textContent = scoreR;
    resetBall();
    isPaused = false;
    pauseMenu.style.display = "none";
    gameLoop();
});

// Botão para sair (recarrega a página)
exitBtn.addEventListener("click", () => {
    window.location.reload();
});

// Função principal do jogo
function gameLoop() {

    // Se pausado, não executa o loop
    if (isPaused) return; 

    // Atualizar posição da bola
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Detectar colisões com as paredes
    if (ballY <= 0 || ballY >= 380) {
        ballSpeedY *= -1;
        soundHit.currentTime = 0;
        soundHit.play(); // Som de colisão com a parede
    }

    // Detectar colisões com as raquetes
    if ((ballX <= 20 && ballY >= paddleLeftY && ballY <= paddleLeftY + 80) ||
        (ballX >= 570 && ballY >= paddleRightY && ballY <= paddleRightY + 80)) {
        ballSpeedX *= -1;
        soundHit.currentTime = 0;
        soundHit.play(); // Som de colisão com a raquete
    }

    // Detectar ponto marcado
    if (ballX <= 0) {
        scoreR++;
        scoreRight.textContent = scoreR;
        soundPoint.currentTime = 0;
        soundPoint.play(); // Som ao marcar ponto
        resetBall();
    } else if (ballX >= 600) {
        scoreL++;
        scoreLeft.textContent = scoreL;
        soundPoint.currentTime = 0;
        soundPoint.play(); // Som ao marcar ponto
        resetBall();
    }

    // Atualizar posição dos elementos na tela
    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";

    requestAnimationFrame(gameLoop);
}

// Função para resetar posição da bola
function resetBall() {
    ballX = 300;
    ballY = 200;
    ballSpeedX = Math.random() > 0.5 ? 3 : -3;
    ballSpeedY = Math.random() > 0.5 ? 3 : -3;
}

// Movimentação das raquetes
document.addEventListener("keydown", (event) => {
    if (event.key === "w" && paddleLeftY > 0) paddleLeftY -= paddleSpeed;
    if (event.key === "s" && paddleLeftY < 320) paddleLeftY += paddleSpeed;
    if (event.key === "ArrowUp" && paddleRightY > 0) paddleRightY -= paddleSpeed;
    if (event.key === "ArrowDown" && paddleRightY < 320) paddleRightY += paddleSpeed;

    paddleLeft.style.top = paddleLeftY + "px";
    paddleRight.style.top = paddleRightY + "px";
});

// Iniciar o jogo
gameLoop();