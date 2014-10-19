// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.row = Math.floor(Math.random()*3) + 1;
    this.x = -101;
    this.y = this.row * 83 - 26;
    this.speed = 150 + Math.random()*300;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 505) {
        this.x = -101;
        this.speed = 150 + Math.random()*300;
        this.row = Math.floor(Math.random()*3) + 1;
        this.y = this.row * 83 - 26;
    }
    this.x += dt * this.speed;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.i = 2;
    this.j = 5;
    this.x = this.i * 101;
    this.y = this.j * 83 - 26;
}

Player.prototype.update = function() {
    // Collision detection
    var left = this.x + 20,
        right = this.x + 82,
        row = this.j;
    var self = this;
    allEnemies.forEach(function(enemy) {
        var eleft = enemy.x + 2,
            eright = enemy.x + 98;
        if (row == enemy.row &&
            ((left < eright && left > eleft) ||
             (right > eleft && right < eright))
            ) {
            console.log("A");
            self.i = 2;
            self.j = 5;
            self.x = self.i * 101;
            self.y = self.j * 83 - 26;
        }
    });
}

Player.prototype.render = function(dt) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if (this.i > 0) this.i--;
            break;
        case 'right':
            if (this.i < 4) this.i++;
            break;
        case 'up':
            if (this.j > 0) this.j--;
            break;
        case 'down':
            if (this.j < 5) this.j++;
            break;
    }
    this.x = this.i * 101;
    this.y = this.j * 83 - 26;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
    new Enemy(),
    new Enemy(),
    new Enemy()
    ];

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
