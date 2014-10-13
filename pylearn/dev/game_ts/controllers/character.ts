module Pylearn.Controller {
    export class CharacterController {
        pirate: Pylearn.Model.Character;
        game: Pylearn.Game;
        sprite: Phaser.Sprite;

        constructor(game:Pylearn.Game, pirate:Pylearn.Model.Character) {
            this.pirate = pirate;
            this.game = game;
        }

        getWorldPos(tilePos:Pylearn.Model.TileCoordinate) : Phaser.Point {
            var isoX = tilePos.x * 64;
            var isoY = tilePos.y * 64;
            var isoPoint = new Phaser.Point(isoX, isoY);
            return isoPoint;
        } 
        
        create() {
            var worldPos = this.getWorldPos(this.pirate.position);
            this.sprite = this.game.addIsoSprite(worldPos.x, worldPos.y, 0, 'pirate', 0);
            this.sprite.anchor.set(0.5, 0.5);

            this.sprite.animations.add('walkN', Phaser.Animation.generateFrameNames('', 52, 60), 24, true);
            this.sprite.animations.add('walkW', Phaser.Animation.generateFrameNames('', 61, 69), 24, true);
            this.sprite.animations.add('walkE', Phaser.Animation.generateFrameNames('', 70, 78), 24, true);
            this.sprite.animations.add('walkS', Phaser.Animation.generateFrameNames('', 79, 87), 24, true);

            this.sprite.animations.add('attackN', Phaser.Animation.generateFrameNames('', 0, 12), 24,  false);
            this.sprite.animations.add('attackW', Phaser.Animation.generateFrameNames('', 13, 25), 24, false);
            this.sprite.animations.add('attackE', Phaser.Animation.generateFrameNames('', 26, 38), 24, false);
            this.sprite.animations.add('attackS', Phaser.Animation.generateFrameNames('', 39, 51), 24, false);

            this.sprite.animations.add('idleN', [12], 24,  false);
            this.sprite.animations.add('idleW', [25], 24, false);
            this.sprite.animations.add('idleE', [38], 24, false);
            this.sprite.animations.add('idleS', [51], 24, false);

            this.sprite.animations.play('idleN');

        }
    } 
}