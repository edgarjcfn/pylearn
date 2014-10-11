var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Pylearn;
(function (Pylearn) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 700, 600, Phaser.AUTO, 'gameCanvas', null);
            this.state.add('Boot', Pylearn.Boot, false);
            this.state.add('Preloader', Pylearn.Preloader, false);
            this.state.add('Level1', Level1, false);
            this.state.start('Boot');
        }
        return Game;
    })(Phaser.Game);
    Pylearn.Game = Game;
})(Pylearn || (Pylearn = {}));
//# sourceMappingURL=game.js.map