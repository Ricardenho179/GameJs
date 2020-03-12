// alert("Descubra as funcionalidades de cada quadrado")
var obstacle;
function startGame() {
    myGameArea.start();
    GamePiece1 = new component(15, 15, "grey", 20, 20);
    GamePiece2 = new component(15, 15, "green", 20, 170);    
    GamePiece3 = new component(15, 15, "purple", 20, 270);
    myGamePiece = new component(15, 15, "black", 20, 70);
    GamePiece4 = new component(15, 15, "blue",20, 120);
    GamePiece5 = new component(15, 15, "red", 20, 220);
    obstacle  = new component(10, 700, "yellow", 1070, 0);
    obstacle2  = new component(1100, 10, "yellow", 0, 0);
    obstacle3  = new component(1100, 10, "yellow", 0, 690);
    obstacle4  = new component(10, 700, "yellow", 0, 0);
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
    // this.resetSpeed = function(otherobj) {
    //   var myleft = this.x;
    //   var myright = this.x + (this.width);
    //   var mytop = this.y;
    //   var mybottom = this.y + (this.height);
    //   var otherleft = otherobj.x;
    //   var otherright = otherobj.x + (otherobj.width);
    //   var othertop = otherobj.y;
    //   var otherbottom = otherobj.y + (otherobj.height);
    //   if(otherright) {
        
    //   }
    // }
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
    || myGamePiece.crashWith(obstacle3)|| myGamePiece.crashWith(obstacle4)) {
      myGamePiece.stop();
    } else if (GamePiece1.crashWith(obstacle)|| GamePiece1.crashWith(obstacle2)
    || GamePiece1.crashWith(obstacle3)|| GamePiece1.crashWith(obstacle4)) {
      GamePiece1.stop()
    } else if(GamePiece2.crashWith(obstacle) || GamePiece2.crashWith(obstacle2)
    || GamePiece2.crashWith(obstacle3)|| GamePiece2.crashWith(obstacle4)) {
      GamePiece2.stop()
    } 
    else if(GamePiece3.crashWith(obstacle)|| GamePiece3.crashWith(obstacle2)
    || GamePiece3.crashWith(obstacle3)|| GamePiece3.crashWith(obstacle4)) {
      GamePiece3.stop()
    }
     else if(GamePiece4.crashWith(obstacle)
     || GamePiece4.crashWith(obstacle2)|| GamePiece4.crashWith(obstacle3)
     || GamePiece4.crashWith(obstacle4)) {
      GamePiece4.stop()
    } else if(GamePiece5.crashWith(obstacle)
    || GamePiece5.crashWith(obstacle2)|| GamePiece5.crashWith(obstacle3)
    || GamePiece5.crashWith(obstacle4)) {
      GamePiece5.stop()
    }
    
    else {
    myGameArea.clear();
    myGamePiece.newPos();
    myGamePiece.update();
    GamePiece1.newPos();
    GamePiece1.update();
    GamePiece2.speedX = 0;
    GamePiece2.speedY = 0;
    if (myGameArea.keys && myGameArea.keys[65]) {GamePiece2.speedX = -3; }
    if (myGameArea.keys && myGameArea.keys[68]) {GamePiece2.speedX = 3; }
    if (myGameArea.keys && myGameArea.keys[87]) {GamePiece2.speedY = -3; }
    if (myGameArea.keys && myGameArea.keys[83]) {GamePiece2.speedY = 3; }
    GamePiece2.newPos();
    GamePiece2.update();
    // if (myGameArea.x && myGameArea.y) {
    //   GamePiece3.x = myGameArea.x;
    //   GamePiece3.y = myGameArea.y;
    // }
    // GamePiece3.update();
    GamePiece4.newPos();
    GamePiece4.speedX = 0;
    GamePiece4.speedY = 0;
    GamePiece4.update();
    GamePiece5.newPos();
    GamePiece4.speedX = 0;
    GamePiece4.speedY = 0;
    GamePiece5.update();
    obstacle.update();
    obstacle2.update();
    obstacle3.update();
    obstacle4.update();
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
