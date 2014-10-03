var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameCanvas', { preload: preload, create: create, update: update });
 
var characterAnimator;
var ship;

function preload() {
	game.load.image('ship', 'pylearn/dev/game/assets/ship.png');
}
 
function create() {
	ship = game.add.sprite(350, 300, 'ship');
	ship.anchor.setTo(0.5, 0.5);
	characterAnimator = new CharacterAnimator(game, ship);
}
 
function update() {
	characterAnimator.update();
}