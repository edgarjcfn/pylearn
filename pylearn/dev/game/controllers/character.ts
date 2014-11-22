module Pylearn.Controller {
    export interface ControllerDelegate {
        ():void;
    }

    export class CharacterController implements Pylearn.Interfaces.ICharacterController{
        character: Pylearn.Model.Character;
        game: Pylearn.Game;
        sprite: Phaser.Sprite;

        constructor(game:Pylearn.Game) {
            this.game = game;
        }
        
        create(pirate:Pylearn.Model.Character) {
            this.character = pirate;

            var worldPos = Pylearn.Util.getWorldPosition(this.character.position);
            this.sprite = this.game.isoPlugin.addIsoSprite(worldPos.x, worldPos.y, 0, 'pirate', 0);
            this.sprite.anchor.set(0.5, 0.5);

            this.sprite.animations.add('walk0', Phaser.Animation.generateFrameNames('', 52, 60), 24, true);
            this.sprite.animations.add('walk3', Phaser.Animation.generateFrameNames('', 61, 69), 24, true);
            this.sprite.animations.add('walk1', Phaser.Animation.generateFrameNames('', 70, 78), 24, true);
            this.sprite.animations.add('walk2', Phaser.Animation.generateFrameNames('', 79, 87), 24, true);

            this.sprite.animations.add('attack0', Phaser.Animation.generateFrameNames('', 0, 12), 24,  false);
            this.sprite.animations.add('attack3', Phaser.Animation.generateFrameNames('', 13, 25), 24, false);
            this.sprite.animations.add('attack1', Phaser.Animation.generateFrameNames('', 26, 38), 24, false);
            this.sprite.animations.add('attack2', Phaser.Animation.generateFrameNames('', 39, 51), 24, false);

            this.sprite.animations.add('idle0', [12], 24,  false);
            this.sprite.animations.add('idle3', [25], 24, false);
            this.sprite.animations.add('idle1', [38], 24, false);
            this.sprite.animations.add('idle2', [51], 24, false);

            var idleAnimation = 'idle' + this.character.direction;
            this.sprite.animations.play(idleAnimation);

        }

        moveTo(tile: Pylearn.Model.TileCoordinate, next: ControllerDelegate) : void {
            var worldPos = Pylearn.Util.getWorldPosition(tile);

            var animationName = 'walk'+ this.character.direction;
            var animation = this.sprite.animations.play(animationName);
            
            var moveTween = this.game.add.tween(this.sprite).to({'isoX':worldPos.x, 'isoY':worldPos.y}, 1000);
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