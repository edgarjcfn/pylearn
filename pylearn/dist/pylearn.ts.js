var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Pylearn;
(function (Pylearn) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            this.load.image('preloadBar', 'pylearn/dev/game/assets/loader.png');
        };
        Boot.prototype.create = function () {
            this.game.time.advancedTiming = true;
            var isoPlugin = new Phaser.Plugin.Isometric(this.game, this.game.plugins);
            isoPlugin.anchor = new Phaser.Point(0.5, 0.2);
            this.game.plugins.add(isoPlugin);
            this.game.state.start('Preloader', true, false);
        };
        return Boot;
    })(Phaser.State);
    Pylearn.Boot = Boot;
})(Pylearn || (Pylearn = {}));
var Pylearn;
(function (Pylearn) {
    var Character = (function (_super) {
        __extends(Character, _super);
        function Character(game, x, y) {
            _super.call(this, game, x, y, 'pirate', 0);
        }
        Character.prototype.create = function () {
        };
        return Character;
    })(Phaser.Sprite);
    Pylearn.Character = Character;
})(Pylearn || (Pylearn = {}));
var Pylearn;
(function (Pylearn) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 700, 600, Phaser.AUTO, 'gameCanvas', null);
            this.state.add('Boot', Pylearn.Boot, false);
            this.state.add('Preloader', Pylearn.Preloader, false);
            this.state.add('Gameplay', Pylearn.Gameplay, false);
            this.state.start('Boot');
        }
        return Game;
    })(Phaser.Game);
    Pylearn.Game = Game;
})(Pylearn || (Pylearn = {}));
window.onload = function () {
    var game = new Pylearn.Game();
};
var Pylearn;
(function (Pylearn) {
    var Gameplay = (function (_super) {
        __extends(Gameplay, _super);
        function Gameplay() {
            _super.apply(this, arguments);
        }
        Gameplay.prototype.create = function () {
            this.character = new Pylearn.Character(this.game, 0, 0);
            this.character.create();
            this.level = new Pylearn.Level(this.game);
            this.level.create();
        };
        return Gameplay;
    })(Phaser.State);
    Pylearn.Gameplay = Gameplay;
})(Pylearn || (Pylearn = {}));
var Pylearn;
(function (Pylearn) {
    var Level = (function () {
        function Level(game) {
            this.game = game;
        }
        Level.prototype.create = function () {
            var tile;
            var isoGroup = this.game.add.group();
            for (var xx = 0; xx < 256; xx += 64) {
                for (var yy = 0; yy < 256; yy += 64) {
                    tile = this.game.add.isoSprite(xx, yy, 0, 'tile', 0, isoGroup);
                    tile.anchor.set(0.5, 0);
                }
            }
        };
        return Level;
    })();
    Pylearn.Level = Level;
})(Pylearn || (Pylearn = {}));
var Pylearn;
(function (Pylearn) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);
            this.load.image('tile', 'pylearn/dev/game/assets/tile.png');
            this.load.atlasJSONHash('pirate', 'pylearn/dev/game/assets/pirate.png', 'pylearn/dev/game/assets/pirate.json');
        };
        Preloader.prototype.create = function () {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        };
        Preloader.prototype.startGame = function () {
            this.game.state.start('Gameplay', true, false);
        };
        return Preloader;
    })(Phaser.State);
    Pylearn.Preloader = Preloader;
})(Pylearn || (Pylearn = {}));
//# sourceMappingURL=pylearn.ts.js.map