declare module Phaser{

    module Plugin {
        class Isometric extends Phaser.Plugin {
            constructor(game: Phaser.Game);
        }

        module Isometric {
            class Projector {
                anchor: Phaser.Point;
            }

            class IsoSprite extends Phaser.Sprite{
                constructor(game: Phaser.Game, x: number, y: number, z: number, key?: any, frame?: any, group?: Phaser.Group);
            }
        }
    }
}   
