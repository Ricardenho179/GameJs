alert("Descubra as funcionalidades de cada quadrado")
function startGame() {
    myGameArea.start();
    GamePiece1 = new component(15, 15, "grey", 10, 10);
    GamePiece2 = new component(15, 15, "green", 10, 60);    
    GamePiece3 = new component(15, 15, "purple", 10, 110);
    myGamePiece = new component(15, 15, "black", 10, 160);
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
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1080;
        this.canvas.height = 500;
        this.canvas.id = "idCanvas";
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        //inserindo comando por teclado
        window.addEventListener('keydown', function (e) {
          myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
          myGameArea.key = false;
        })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function updateGameArea() {
    //caso queira criar uma trilha de onde foi andado tirar o clear()
    myGameArea.clear();
    myGamePiece.newPos();
    myGamePiece.update();
    GamePiece1.newPos();
    GamePiece1.update();
    GamePiece2.speedX = 0;
    GamePiece2.speedY = 0;
    if (myGameArea.key && myGameArea.key == 65) {GamePiece2.speedX = -2; }
    if (myGameArea.key && myGameArea.key == 68) {GamePiece2.speedX = 2; }
    if (myGameArea.key && myGameArea.key == 87) {GamePiece2.speedY = -2; }
    if (myGameArea.key && myGameArea.key == 83) {GamePiece2.speedY = 2; }
    GamePiece2.newPos();
    GamePiece2.update();
    GamePiece3.x += 1.9;
    GamePiece3.update();
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
