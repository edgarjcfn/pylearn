//
// Character Animator
// 
var CharacterAnimator = function(scene, character) {
	this._sprite = character
	this._game = scene;
    this._direction = Direction.E;
}

CharacterAnimator.prototype.moveTo = function (tile, next) {
	var actualPos = getIsoPos(tile);
	var moveTween = this._game.add.tween(this._sprite).to(actualPos, 1000);
	moveTween.onComplete.add(next);
	moveTween.start();
    var animation = 'walk'+ this._direction;
    console.log(animation)
    this._sprite.animations.play(animation);
}

CharacterAnimator.prototype.rotateTo = function(direction, next) {
	this._direction = direction;
    next();
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

function getIsoPos(tilePos) {
    return {
        'isoX' : tilePos.x * 64, 
        'isoY' : tilePos.y * 64
    };
}