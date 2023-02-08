var heroi, caveira, maca, arvore;
var imgFundo, imgFundo2, imgHeroi, imgCaveira, imgMaca, imgArvore, imgEstrela, imgBomba, imgExplosao, imgExplosao, imgVida;
var soloInvisivel;
var groupCaveira, groupArvore;
var fundo, fundo2, fundo3, fundo1;
var limiteTela;
var esq=false, dir=false;

function preload(){
  imgFundo=loadImage("imagens/fundo.png");
  imgHeroi=loadImage("imagens/heroi.png");
  imgCaveira=loadImage("imagens/caveira.png");
  imgMaca=loadImage("imagens/maca.png");
  imgArvore=loadImage("imagens/arvore.png");
  imgEstrela=loadImage("imagens/estrela.png");
  imgBomba=loadImage("imagens/bomba.png");
  imgExplosao=loadImage("imagens/explosao.png");
  imgVida=loadImage("imagens/vida.png");
 
}

function setup(){
createCanvas(windowWidth, windowHeight);

fundo2=createSprite(3/2*width,height/2,width,height);
fundo2.addImage(imgFundo);
fundo2.scale=width/7000;

fundo=createSprite(width/2,height/2,width,height);
fundo.addImage(imgFundo);
fundo.scale=width/7000;

fundo3=createSprite(-width/2,height/2,width,height);
fundo3.addImage(imgFundo);
fundo3.scale=width/7000;

fundo1=createSprite(width/2,height/2,width,height);
fundo1.addImage(imgFundo);
fundo1.scale=width/7000;

//sprite heroi
heroi=createSprite(width/2,height/2);
heroi.addImage("heroi", imgHeroi);
heroi.scale=0.3;

//solo invisivel
soloInvisivel = createSprite(width/2-1000,height-135,100000,20);

//velocidade caveira
//caveira

//grupos
groupCaveira=new Group();
groupArvore=new Group();;
}

function draw(){
  //background(imgFundo);

  console.log("direita: "+dir);
  console.log("esquerda: "+esq);

  console.log("heroi: " + heroi.x);
  console.log("fundo: " + fundo.x);
  console.log("fundo2: " + fundo2.x);
  console.log("width: " + width);
  console.log("fundo1: " + fundo1.x);
  console.log("fundo3: " + fundo3.x);

  //movimentacao do  fundo
  if(dir===true){
    if(heroi.x-fundo.x>width){
      fundo.x=heroi.x+width;
    }
    console.log("entrou no if da direita");
    if(heroi.x-fundo2.x>width){
      fundo2.x=heroi.x+width;
    }
  } 

  if(esq===true){
    if(heroi.x-fundo1.x<-width){
      fundo1.x=heroi.x-width;
    }
    console.log("entrou no if da esquerda");

    if(heroi.x-fundo3.x<-width){
      fundo3.x=heroi.x-width;
    }
  }

  //biblioteca p5
  if(keyIsDown(RIGHT_ARROW)){
    heroi.x+=20; //biblioteca p5.play (p5: heroi.position.x += 20)
    dir=true;
    esq=false;
  }
  
  if(keyIsDown(LEFT_ARROW)){
    heroi.x-=20;
    esq=true;
    dir=false;
  }

  if(keyDown("space") && heroi.y>=height-135-76){
    heroi.y-=120
  }

  //movimento da caveira
  if(caveira<1100){
    caveira.velocityX+=0.5
  }
  //console.log(heroi.y);
  //console.log(soloInvisivel.y);
  //console.log(height-135);

  //camera do jogo
  camera.x = heroi.x;
  //fundo.x = camera.x;

  //gravidade
  heroi.velocityY+=1;
  groupCaveira.setVelocityYEach(3);
  //groupArvore.setVelocityXEach(-5);

  //colisao
  heroi.collide(soloInvisivel);
  groupCaveira.collide(soloInvisivel);

  //chamar funçao
  criarArvore();
  criarCaveira();

  drawSprites();
}

function criarArvore(){
  if(frameCount%100===0){
    arvore=createSprite(Math.round(random(width/2+460, width*30)),height/2+250);
    arvore.addImage("arvore", imgArvore);
    arvore.scale=0.7;
    groupArvore.add(arvore);
  }
}


function criarCaveira(){
  if(frameCount%100===0){
    caveira=createSprite(Math.round(random(width/2+500, width*30)),height/2);
    caveira.addImage("caveira", imgCaveira);
    caveira.scale=0.5;
    groupCaveira.add(caveira);
    heroi.depth=arvore.depth+1;
  }
}

