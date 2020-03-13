// alert("Descubra as funcionalidades de cada quadrado")
function startGame() {
    myGameArea.start();
    GamePiece1 = new component(15, 15, "grey", 20, 20);
    GamePiece2 = new component(15, 15, "green", 20, 70);    
    myGamePiece = new component(15, 15, "black", 20, 120);
    GamePiece4 = new componentAutomatic(15, 15, "blue",27, 170);
    GamePiece5 = new componentAutomatic(15, 15, "red", 27, 220);
    GamePiece6 = new componentAutomatic(15,15,"orange", 27, 270)
    GamePiece3 = new component(15, 15, "purple", 20, 320);
    obstacle  = new component(10, 700, "yellow", 1070, 0);
    obstacle2  = new component(1100, 10, "yellow", 0, 0);
    obstacle3  = new component(1100, 10, "yellow", 0, 690);
    obstacle4  = new component(10, 700, "yellow", 0, 0);
    area = new component(30, 30, "#11b06a", 995, 560);
}
function componentAutomatic(width, height, color, x, y, type) {
  this.type = type;
  this.width = width;
  this.moveAngle = 1;
  this.height = height;
  this.speed = 1;
  this.angle = 0;
  this.x = x;
  this.y = y;    
  this.update = function() {
      ctx = myGameArea.context;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.fillStyle = color;
      ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);        
      ctx.restore();    
  }
  this.newPosBlue = function() {
    // this.angle += this.moveAngle * Math.PI / 30;
    this.x += this.speed * 2;
    this.y -= this.speed * 0;
    if (this.x >= 300) {
      this.x -= this.speed * 2;
      this.y += this.speed * 2;
      if(this.y >= 300) {
        this.y -= this.speed * 2;
        this.x -= this.speed * 0;
      }
    }
  }
  this.newPosRed = function() {
    this.angle += this.moveAngle * Math.PI / 30;
    this.x += this.speed * 50;
    if (this.x >= 100) {
      this.x -= this.speed * 50;
      this.y += this.speed * 50;
      if(this.y >= 300) {
        this.y -= this.speed * 50;
        this.x += this.speed * 50;
        if(this.x >=300) {
          this.x -= this.speed * 50;

        }
      }
    }
  }
  this.newPosOrange = function() {
    this.angle += this.moveAngle * Math.PI / 30;
    this.x += this.speed * 5;
    this.y -= this.speed * 0;
    if (this.x >= 400) {
      this.x = 600;
      this.y = 600;  
    }
  }
  this.crashWith = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;
    if ((mybottom < othertop) ||
    (mytop > otherbottom) ||
    (myright < otherleft) ||
    (myleft > otherright)) {
      crash = false;
    }
    return crash;
  }
}
function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.crashWith = function(otherobj) {
      var myleft = this.x;
      var myright = this.x + (this.width);
      var mytop = this.y;
      var mybottom = this.y + (this.height);
      var otherleft = otherobj.x;
      var otherright = otherobj.x + (otherobj.width);
      var othertop = otherobj.y;
      var otherbottom = otherobj.y + (otherobj.height);
      var crash = true;
      if ((mybottom < othertop) ||
      (mytop > otherbottom) ||
      (myright < otherleft) ||
      (myleft > otherright)) {
        crash = false;
      }
      return crash;
    }
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1080;
        this.canvas.height = 700;
        this.canvas.id = "idCanvas";
        this.canvas.style.cursor = "none";
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        //inserindo comando por teclado
        window.addEventListener('keydown', function (e) {
          myGameArea.keys = (myGameArea.keys || []);
          myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
          myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('mousemove', function (e) {
          myGameArea.x = e.pageX;
          myGameArea.y = e.pageY;
        })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
      clearInterval(this.interval)
    }
}

function updateGameArea() {
    //caso queira criar uma trilha de onde foi andado tirar o clear()
    if (myGamePiece.crashWith(obstacle) || myGamePiece.crashWith(obstacle2)
    || myGamePiece.crashWith(obstacle3)|| myGamePiece.crashWith(obstacle4) 
      || myGamePiece.crashWith(area)) {
        if(myGamePiece.crashWith(area)) {
          alert("O quadrado preto ganhou, por favor aperte F5");
        }
        alert("O quadrado preto perdeu, por favor aperte F5");
        myGamePiece.stop();
        
    } else if (GamePiece1.crashWith(obstacle)|| GamePiece1.crashWith(obstacle2)
    || GamePiece1.crashWith(obstacle3)|| GamePiece1.crashWith(obstacle4)
    || GamePiece1.crashWith(area)) {
      if(GamePiece1.crashWith(area)) {
        alert("O quadrado cinza ganhou, por favor aperte F5");
      }
      GamePiece1.stop()
      alert("O quadrado cinza perdeu, por favor aperte F5");
    } else if(GamePiece2.crashWith(obstacle) || GamePiece2.crashWith(obstacle2)
    || GamePiece2.crashWith(obstacle3)|| GamePiece2.crashWith(obstacle4)
    || GamePiece2.crashWith(area)) {
      if(GamePiece2.crashWith(area)) {
        alert("O quadrado verde ganhou, por favor aperte F5");
      }
      alert("O quadrado verde perdeu, por favor aperte F5");
      GamePiece2.stop();
    } 
    else if(GamePiece3.crashWith(obstacle)|| GamePiece3.crashWith(obstacle2)
    || GamePiece3.crashWith(obstacle3)|| GamePiece3.crashWith(obstacle4)
    || GamePiece3.crashWith(area)) {
      if(GamePiece3.crashWith(area)) {
        alert("O quadrado roxo ganhou, por favor aperte F5");
      }
      alert("O quadrado roxo perdeu, por favor aperte F5");
      GamePiece3.stop();
    }
     else if(GamePiece4.crashWith(obstacle)
     || GamePiece4.crashWith(obstacle2)|| GamePiece4.crashWith(obstacle3)
     || GamePiece4.crashWith(obstacle4)|| GamePiece4.crashWith(area)) {
      if(GamePiece4.crashWith(area)) {
        alert("O quadrado azul ganhou, por favor aperte F5");
      }
      alert("O quadrado azul perdeu, por favor aperte F5");
      GamePiece4.stop()
      
    } else if(GamePiece5.crashWith(obstacle)
    || GamePiece5.crashWith(obstacle2)|| GamePiece5.crashWith(obstacle3)
    || GamePiece5.crashWith(obstacle4)|| GamePiece5.crashWith(area)) {
      if(GamePiece5.crashWith(area)) {
        alert("O quadrado vermelho ganhou, por favor aperte F5");
      }
      alert("O quadrado vermelho perdeu, por favor aperte F5");
      GamePiece5.stop();
    }
    else if (GamePiece6.crashWith(obstacle)|| GamePiece6.crashWith(obstacle2)
    || GamePiece6.crashWith(obstacle3)|| GamePiece6.crashWith(obstacle4)
    || GamePiece6.crashWith(area)) {
      if(GamePiece6.crashWith(area)) {
        alert("O quadrado laranja ganhou, por favor aperte F5");
      }
      alert("O quadrado laranja perdeu, por favor aperte F5");
      GamePiece6.stop();
    }
    else {
    myGameArea.clear();
    //peça preta
    myGamePiece.newPos();
    myGamePiece.update();
    //peça cinza
    GamePiece1.newPos();
    GamePiece1.update();
    //peça verde
    GamePiece2.speedX = 0;
    GamePiece2.speedY = 0;
    if (myGameArea.keys && myGameArea.keys[65]) {GamePiece2.speedX = -3; }
    if (myGameArea.keys && myGameArea.keys[68]) {GamePiece2.speedX = 3; }
    if (myGameArea.keys && myGameArea.keys[87]) {GamePiece2.speedY = -3; }
    if (myGameArea.keys && myGameArea.keys[83]) {GamePiece2.speedY = 3; }
    GamePiece2.newPos();
    GamePiece2.update();
    //peça roxa
    // if (myGameArea.x && myGameArea.y) {
    //   GamePiece3.x = myGameArea.x;
    //   GamePiece3.y = myGameArea.y;
    // }
    // GamePiece3.update();
    //peça azul
    GamePiece4.newPosBlue();
    GamePiece4.update();
    //peça vermelha
    GamePiece5.newPosRed();
    GamePiece5.update();
    //peça laranja
    GamePiece6.newPosOrange();
    GamePiece6.update()
    //OBSTACULOS
    obstacle.update();
    obstacle2.update();
    obstacle3.update();
    obstacle4.update();
    //AREA DE VITÓRIA
    area.update();
  }
}
//CIMA
function moveupBlackPiece() {
  myGamePiece.speedY -= 1;
}
function moveUpGreyPiece() {
  GamePiece1.speedY -=1;
}
//BAIXO
function moveDownBlackPiece() {
  myGamePiece.speedY += 1;
}
function moveDownGreyPiece() {
  GamePiece1.speedY +=1;
}
//Esquerda
function moveLeftBlackPiece() {
  myGamePiece.speedX -= 1;
}
function moveLeftGreyPiece() {
  GamePiece1.speedX -= 1;
}
//Direita
function moveRightBlackPiece() {
  myGamePiece.speedX += 1;  
}
function moveRightGreyPiece() {
GamePiece1.speedX += 1;
}
//função de parar peça cinza
function stopMove() {
  GamePiece1.speedX = 0;
  GamePiece1.speedY = 0;
}

