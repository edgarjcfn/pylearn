module Pylearn.Controller {
    export class LevelController {

        game:Phaser.Game;

        constructor(game: Phaser.Game) {
            this.game = game;
        }

        create() {
            var tile;
            var isoGroup = this.game.add.group();
            for (var xx = 0; xx < 256; xx += 64) {
                for (var yy = 0; yy < 256; yy += 64) {
                    // Create a tile using the new game.add.isoSprite factory method at the specified position.
                    // The last parameter is the group you want to add it to (just like game.add.sprite)
                    tile = this.game.add.isoSprite(xx, yy, 0, 'tile', 0, isoGroup);
                    tile.anchor.set(0.5, 0);
                }
            }
        }

    }
}