alert("Aposte em um quadrado: 1: Vermelho, 2: Amarelo, 3: Azul ou 4: Pretinho")
function startGame() {
    myGameArea.start();
    redGamePiece = new component(75, 75, "red", 10, 10);
    yellowGamePiece = new component(75, 75, "yellow", 10, 60);    
    blueGamePiece = new component(75, 75, "blue", 10, 110);
    myGamePiece = new component(75, 75, "black", 10, 160);
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
        this.canvas.width = 1180;
        this.canvas.height = 570;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
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
    redGamePiece.x += 1.5;
    redGamePiece.update();
    yellowGamePiece.x += 3;
    yellowGamePiece.y += 3;
    yellowGamePiece.update();
    blueGamePiece.x += 1.9;
    blueGamePiece.update();
  }
  function moveup() {
    myGamePiece.speedY -= 1;
  }
  
  function movedown() {
    myGamePiece.speedY += 1;
  }
  
  function moveleft() {
    myGamePiece.speedX -= 1;
  }
  
  function moveright() {
    myGamePiece.speedX += 1;
  }

