var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameCanvas', { preload: preload, create: create, update: update });
 
var characterAnimator;
var ship;

function preload() {
	game.load.image('ship', 'mygame/assets/ship.png');
}
 
function create() {
	ship = game.add.sprite(350, 300, 'ship');
	ship.anchor.setTo(0.5, 0.5);
	characterAnimator = new CharacterAnimator(game, ship);
}
 
function update() {
	characterAnimator.update();
}


//
// Character Animator
// 
CharacterAnimator = function(scene, character) {
	this._ship = character
	this._game = scene;
}

CharacterAnimator.prototype.moveTo = function (tile, next) {
	var actualPos = getWorldPos(tile);
	var moveTween = this._game.add.tween(this._ship).to(actualPos, 500);
	moveTween.onComplete.add(next);
	moveTween.start();
}

CharacterAnimator.prototype.rotateTo = function(direction, next) {
	var angle = getDirectionAngle(direction);
	var rotateTween = this._game.add.tween(this._ship).to({rotation:angle}, 500);
	rotateTween.onComplete.add(next);
	rotateTween.start();
}

CharacterAnimator.prototype.update = function(sprite) {

}

// 
// Helper functions
//
function getDirectionAngle(dir) {
    switch (dir) 
    {
        case Direction.N :
            return 0;
        case Direction.E : 
            return Math.PI/2;
        case Direction.S :
            return Math.PI;
        case Direction.W : 
            return 3*(Math.PI/2);
    }

    return 0;
}

function getWorldPos(tilePos) {
    return {
        'x' : 350 + (tilePos.x * 30), 
        'y' : 300 + (tilePos.y * 30)
    };
}