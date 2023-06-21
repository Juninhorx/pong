// Variáveis Bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 22;
let raio = diametro / 2;

// Velocidadde Bolinha
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;

// Variável de controle de colisão
let colidiu = false;

// Variáveis minha Raquete
let raqueteComprimento = 8;
let raqueteAltura = 100;
let xRaquete = 5;
let yRaquete = 150;

// Variáveis Raquete Oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

// Pontos do Jogo
let meusPontos = 0;
let pontosDoOponente = 0;

// Variáveis Controle Multiplayer
let button;
let modo;
let multiplayer = false;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(color(173, 255, 47));
  mostraBolinha();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  mostraRede();
  movimentaBolinha();
  movimentaRaquete();
  verificaColisaoBorda();
  verificaColisaoRaquete(xRaquete, yRaquete);
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  mudaMultiplayer()
  mostraPlacar();
  marcaPontos();
  mostraBotao()
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function mostraRaquete(x, y) {
  fill(180);
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function movimentaRaquete() {
  if (keyIsDown(87)) {
    yRaquete -= 10;
  }
  if (keyIsDown(83)) {
    yRaquete += 10;
  }
  yRaquete = constrain(yRaquete, 10, 290);
}

function movimentaRaqueteP2() {
  if (keyIsDown(UP_ARROW)) {
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaqueteOponente += 10;
  }
  yRaquete = constrain(yRaquete, 10, 290);
}

function movimentaRaqueteOponente() {
  velocidadeYOponente =
    yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente;
  yRaqueteOponente = constrain(yRaqueteOponente, 10, 290);
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0) velocidadeXBolinha *= -1;
  if (yBolinha + raio > height || yBolinha - raio < 0) velocidadeYBolinha *= -1;
}

function verificaColisaoRaquete(x, y) {
  colidiu = collideRectCircle(
    x,
    y,
    raqueteComprimento,
    raqueteAltura,
    xBolinha,
    yBolinha,
    diametro
  );
  if (colidiu) {
    velocidadeXBolinha *= -1;
    //raquetada.play();
  }
}

function mostraPlacar() {
  textAlign(CENTER);
  textSize(20);
  fill(color(250, 140, 0));
  rect(125, 10, 50, 20);
  fill(255);
  text(meusPontos, 150, 26);
  fill(color(250, 140, 0));
  rect(425, 10, 50, 20);
  fill(255);
  text(pontosDoOponente, 450, 26);
}

function marcaPontos() {
  if (xBolinha < 15) {
    pontosDoOponente += 1;
    //ponto.play();
  }
  if (xBolinha > 585) {
    meusPontos += 1;
    //ponto.play();
  }
}

function mostraRede() {
  line(300, 10, 300, 390);
  stroke(150);
}


function mudaMultiplayer() {
  if(multiplayer){
    movimentaRaqueteP2()
    modo = 'multiplayer'
  } else {
    movimentaRaqueteOponente();
    modo = 'solo'
  }
}

function mostraBotao(){
  button = createButton(modo)
  button.position(890, 120)
  button.mousePressed(mudaModo)
}

function mudaModo(){
  console.log('pegou')
  if (!multiplayer) {
    multiplayer = true
  } else {
    multiplayer = false
  }
}

