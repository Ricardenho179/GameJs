// alert("Descubra as funcionalidades de cada quadrado")
function startGame() {
    myGameArea.start();
    GamePiece1 = new component(15, 15, "grey", 20, 20);
    GamePiece2 = new component(15, 15, "green", 20, 70);    
    myGamePiece = new component(15, 15, "black", 20, 120);
    GamePiece4 = new componentAutomatic(15, 15, "blue",27, 170);
    GamePiece5 = new componentAutomatic(15, 15, "red", 27, 220);
    GamePiece3 = new component(15, 15, "purple", 20, 270);
    obstacle  = new component(10, 700, "yellow", 1070, 0);
    obstacle2  = new component(1100, 10, "yellow", 0, 0);
    obstacle3  = new component(1100, 10, "yellow", 0, 690);
    obstacle4  = new component(10, 700, "yellow", 0, 0);
    area = new component(30, 30, "#11b06a", 300, 300);
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
    this.angle += this.moveAngle * Math.PI / 180;
    this.x += this.speed * Math.sin(this.angle);
    this.y -= this.speed * Math.cos(this.angle);
  }
  this.newPosRed = function() {
    this.angle += this.moveAngle * Math.PI / 360;
    this.x += this.speed * Math.sin(this.angle);
    this.y -= this.speed * Math.cos(this.angle);
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
          alert("O quadrado preto ganhou");
        }
        alert("O quadrado preto perdeu");
        myGamePiece.stop();
        
    } else if (GamePiece1.crashWith(obstacle)|| GamePiece1.crashWith(obstacle2)
    || GamePiece1.crashWith(obstacle3)|| GamePiece1.crashWith(obstacle4)
    || GamePiece1.crashWith(area)) {
      if(GamePiece1.crashWith(area)) {
        alert("O quadrado cinza ganhou");
      }
      GamePiece1.stop()
      alert("O quadrado cinza perdeu");
    } else if(GamePiece2.crashWith(obstacle) || GamePiece2.crashWith(obstacle2)
    || GamePiece2.crashWith(obstacle3)|| GamePiece2.crashWith(obstacle4)
    || GamePiece2.crashWith(area)) {
      if(GamePiece2.crashWith(area)) {
        alert("O quadrado verde ganhou");
      }
      alert("O quadrado verde perdeu");
      GamePiece2.stop();
    } 
    else if(GamePiece3.crashWith(obstacle)|| GamePiece3.crashWith(obstacle2)
    || GamePiece3.crashWith(obstacle3)|| GamePiece3.crashWith(obstacle4)
    || GamePiece3.crashWith(area)) {
      if(GamePiece3.crashWith(area)) {
        alert("O quadrado roxo ganhou");
      }
      alert("O quadrado roxo perdeu");
      GamePiece3.stop();
    }
     else if(GamePiece4.crashWith(obstacle)
     || GamePiece4.crashWith(obstacle2)|| GamePiece4.crashWith(obstacle3)
     || GamePiece4.crashWith(obstacle4)|| GamePiece4.crashWith(area)) {
      if(GamePiece4.crashWith(area)) {
        alert("O quadrado azul ganhou");
      }
      alert("O quadrado azul perdeu");
      GamePiece4.stop()
      
    } else if(GamePiece5.crashWith(obstacle)
    || GamePiece5.crashWith(obstacle2)|| GamePiece5.crashWith(obstacle3)
    || GamePiece5.crashWith(obstacle4)|| GamePiece5.crashWith(area)) {
      if(GamePiece5.crashWith(area)) {
        alert("O quadrado vermelho ganhou");
      }
      alert("O quadrado vermelho perdeu");
      GamePiece5.stop();
    }
    else {
    myGameArea.clear();
    myGamePiece.newPos();
    myGamePiece.update();
    GamePiece1.newPos();
    GamePiece1.update();
    GamePiece2.speedX = 0;
    GamePiece2.speedY = 0;
    if (myGameArea.keys && myGameArea.keys[65]) {GamePiece2.speedX = -50; }
    if (myGameArea.keys && myGameArea.keys[68]) {GamePiece2.speedX = 50; }
    if (myGameArea.keys && myGameArea.keys[87]) {GamePiece2.speedY = -50; }
    if (myGameArea.keys && myGameArea.keys[83]) {GamePiece2.speedY = 50; }
    GamePiece2.newPos();
    GamePiece2.update();
    // if (myGameArea.x && myGameArea.y) {
    //   GamePiece3.x = myGameArea.x;
    //   GamePiece3.y = myGameArea.y;
    // }
    // GamePiece3.update();
    GamePiece4.newPosBlue();
    GamePiece4.update();
    GamePiece5.newPosRed();
    GamePiece5.update();
    obstacle.update();
    obstacle2.update();
    obstacle3.update();
    obstacle4.update();
    area.update();
    // fazendo o cara enrar numa area e ganhar
    if (myGamePiece.x > area || myGamePiece.y > area) {
      alert("Você ganhou!");
      crash = true
    }
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
// GamePiece2.speedY +=1;
// GamePiece3.speedY +=1;
//Esquerda
function moveLeftBlackPiece() {
  myGamePiece.speedX -= 1;
}
function moveLeftGreyPiece() {
  GamePiece1.speedX -= 1;
}
// GamePiece2.speedX -= 1;
// GamePiece3.speedX -= 1;
//Direita
function moveRightBlackPiece() {
  myGamePiece.speedX += 1;  
}
function moveRightGreyPiece() {
GamePiece1.speedX += 1;
}
// GamePiece2.speedX += 1;
// GamePiece3.speedX += 1;
//Stop
function stopMove() {
  GamePiece1.speedX = 0;
  GamePiece1.speedY = 0;
  GamePiece2.speedX = 0;
  GamePiece2.speedY = 0;
  GamePiece3.speedX = 0;
  GamePiece3.speedY = 0;
}
