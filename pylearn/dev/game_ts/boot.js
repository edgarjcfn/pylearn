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
//# sourceMappingURL=boot.js.map