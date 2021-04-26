$("#game-container").hide();
$("#game-over-container").hide();

function hideMenu() {
    $(".snake-title").hide();
  $(".snake-p").hide();
  $("#menu-container").hide();
  $(".snake-high-score-p").hide();
  $(".snake-high-score").hide();
  $("#game-over-container").hide();
}
function hideGame() {
  $(".snake-title").hide();
  $(".snake-p").hide();
  $("#game-container").hide();
  $("#game-over-container").show();
}
function playGame() {
  hideMenu();
   $("#game-over-container").hide();
  $("#game-container").show();
  
// Draw
const canvas = document.querySelector("#snakeGame");
const ctx = canvas.getContext("2d");

const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

// Snake Colour
const snakeColour = "#fff";
// Fruit Colour
const fruitColour = "#deb520";

// Score
const score = 0;

// Setup 
(function setup() {
  snake = new Snake();
  fruit = new Fruit();
  fruit.pickLocation();
  
  window.setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fruit.draw();
    snake.update();
    snake.draw();
    
    // Eat Fruit
    if (snake.eat(fruit)) {
      fruit.pickLocation();
    }
    
    document.querySelector('.snake-score').innerText = snake.total;
    snake.checkCollision();
    
  }, 250);
})();

// Key Listener
window.addEventListener("keydown", evt => {
  const direction = evt.key.replace("Arrow", "");
  snake.changeDirection(direction);
});

// Snake
function Snake() {
  this.x = 0;
  this.y = 0;
  this.xSpeed = scale;
  this.ySpeed = 0;
  this.total = 0;
  this.tail = [];

  // Draw Snake
  this.draw = function() {
    ctx.fillStyle = snakeColour;
    
    for (let i=0; i<this.tail.length; i++) {
      ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
    }
    
    ctx.fillRect(this.x, this.y, scale, scale);
  };
  // Update Snake
  this.update = function() {
    for (let i=0; i<this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i+1];
    }
    
    this.tail[this.total - 1] = { x: this.x, y: this.y };
    
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    
    if (this.x > canvas.width) {
      this.total = 0;
          this.tail = [];
          this.x = 0;
          this.y = 0;
      this.x += this.xSpeed;
          hideGame();
    }
    if (this.y > canvas.height) {
      this.total = 0;
          this.tail = [];
          this.x = 0;
          this.y = 0;
      this.x += this.xSpeed;
          hideGame();
    }
    if (this.x < 0) {
      this.total = 0;
          this.tail = [];
          this.x = 0;
          this.y = 0;
      this.x += this.xSpeed;
          hideGame();
    }
    if (this.y < 0) {
      this.total = 0;
          this.tail = [];
          this.x = 0;
          this.y = 0;
      this.x += this.xSpeed;
          hideGame();
    }
  };
  // Change Direction
  this.changeDirection = function(direction) {
    switch (direction) {
      case "Up":
        this.xSpeed = 0;
        this.ySpeed = -scale * 1;
        break;
      case "Down":
        this.xSpeed = 0;
        this.ySpeed = scale * 1;
        break;
      case "Left":
        this.xSpeed = -scale * 1;
        this.ySpeed = 0;
        break;
      case "Right":
        this.xSpeed = scale * 1;
        this.ySpeed = 0;
        break;
    }
  };
  // Snake Eats 
  this.eat = function(fruit) {
    if (this.x === fruit.x && this.y === fruit.y) {
      this.total++;
      return true;
    }
  };
  
  // Check Collision
  this.checkCollision = function() {
    for (var i=0; i<this.tail.length; i++) {
        if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
        console.log("Coliding");
          this.total = 0;
          this.tail = [];
          this.x = 0;
          this.y = 0;
          hideGame();
    }
    }
  }
}

// Button Controls
function Up() {
snake.xSpeed = 0;
        snake.ySpeed = -scale * 1;
}
function Down() {
  snake.xSpeed = 0;
        snake.ySpeed = scale * 1;
}
function Left() {
  snake.xSpeed = -scale * 1;
        snake.ySpeed = 0;
}
function Right() {
  snake.xSpeed = scale * 1;
        snake.ySpeed = 0;
}

// Fruit 
function Fruit() {
  this.x;
  this.y;
  
  this.pickLocation = function() {
    this.x = (Math.floor(Math.random() * rows - 1) + 1) * scale;
    this.y = (Math.floor(Math.random() * columns - 1) + 1) * scale;
  }
  this.draw = function() {
    ctx.fillStyle = fruitColour;
    ctx.fillRect(this.x, this.y, scale, scale);
  }
}
  }