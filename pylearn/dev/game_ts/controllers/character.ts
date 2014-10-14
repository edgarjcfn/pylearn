module Pylearn.Controller {
    export interface ControllerDelegate {
        ():void;
    }

    export interface ICharacterController {
        character: Pylearn.Model.Character;

        moveTo(tile: Pylearn.Model.TileCoordinate, next: ControllerDelegate) : void;
        rotateTo(direction: Pylearn.Model.Direction, next: ControllerDelegate) : void;
        attack(next: ControllerDelegate) : void;
    }

    export class CharacterController implements ICharacterController{
        character: Pylearn.Model.Character;
        game: Pylearn.Game;
        sprite: Phaser.Sprite;

        constructor(game:Pylearn.Game, pirate:Pylearn.Model.Character) {
            this.character = pirate;
            this.game = game;
        }
        
        create() {
            var worldPos = Pylearn.Util.getWorldPosition(this.character.position);
            this.sprite = this.game.isoPlugin.addIsoSprite(worldPos.x, worldPos.y, 0, 'pirate', 0);
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

        moveTo(tile: Pylearn.Model.TileCoordinate, next: ControllerDelegate) : void {
            var worldPos = Pylearn.Util.getWorldPosition(tile);

            var animation = 'walk'+ this.character.direction;
            this.sprite.animations.play(animation);

            var moveTween = this.game.add.tween(this.sprite).to(worldPos, 1000);
            moveTween.onComplete.add(next);
            moveTween.start();
    
        }

        rotateTo(direction: Pylearn.Model.Direction, next: ControllerDelegate) : void {
            next();
        }

        attack(next: ControllerDelegate) : void {
            var animationName = 'attack'+this.character.direction;
            var animation = this.sprite.animations.play(animationName);
            animation.onComplete.add(next);
        }

        
    } 
}