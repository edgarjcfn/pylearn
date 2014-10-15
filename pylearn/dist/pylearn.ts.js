var Pylearn;
(function (Pylearn) {
    var Command;
    (function (Command) {
        var ExecutionListItem = (function () {
            function ExecutionListItem(command, lineNumber) {
                this.command = command;
                this.lineNumber = lineNumber;
            }
            return ExecutionListItem;
        })();
        var CommandQueue = (function () {
            function CommandQueue(onExecute) {
                this.commands = [];
                this.onExecute = onExecute;
                this._currentIndex = 0;
            }
            CommandQueue.prototype.append = function (command, lineNumber) {
                command.next = this.proceed.bind(this);
                this.commands.push(new ExecutionListItem(command, lineNumber));
            };
            CommandQueue.prototype.proceed = function () {
                this._currentIndex++;
                this.execute();
            };
            CommandQueue.prototype.execute = function () {
                if (this._currentIndex < this.commands.length) {
                    var executionListItem = this.commands[this._currentIndex];
                    this.onExecute(executionListItem.lineNumber);
                    executionListItem.command.execute();
                }
                else {
                    console.log('command chain finished');
                }
            };
            CommandQueue.prototype.clear = function () {
                this.commands = [];
            };
            return CommandQueue;
        })();
        Command.CommandQueue = CommandQueue;
    })(Command = Pylearn.Command || (Pylearn.Command = {}));
})(Pylearn || (Pylearn = {}));
var Pylearn;
(function (Pylearn) {
    var Command;
    (function (Command) {
        var MoveCommand = (function () {
            function MoveCommand(amount, controller) {
                this.amount = amount;
                this.animator = controller;
            }
            MoveCommand.prototype.execute = function () {
                switch (this.animator.character.direction) {
                    case (0 /* N */):
                        this.animator.character.moveBy(0, -(this.amount));
                        break;
                    case (2 /* S */):
                        this.animator.character.moveBy(0, (this.amount));
                        break;
                    case (1 /* E */):
                        this.animator.character.moveBy((this.amount), 0);
                        break;
                    case (3 /* W */):
                        this.animator.character.moveBy(-(this.amount), 0);
                        break;
                }
                var newPosition = this.animator.character.position;
                this.animator.moveTo(newPosition, this.next);
            };
            return MoveCommand;
        })();
        Command.MoveCommand = MoveCommand;
        var TurnLeftCommand = (function () {
            function TurnLeftCommand(controller) {
                this.animator = controller;
            }
            TurnLeftCommand.prototype.execute = function () {
                var newDirection = this.animator.character.direction - 1;
                if (newDirection < 0) {
                    newDirection = 3;
                }
                this.animator.character.direction = newDirection;
                this.animator.rotateTo(newDirection, this.next);
            };
            return TurnLeftCommand;
        })();
        Command.TurnLeftCommand = TurnLeftCommand;
        var TurnRightCommand = (function () {
            function TurnRightCommand(controller) {
                this.animator = controller;
            }
            TurnRightCommand.prototype.execute = function () {
                var newDirection = (this.animator.character.direction + 1) % 4;
                this.animator.character.direction = newDirection;
                this.animator.rotateTo(newDirection, this.next);
            };
            return TurnRightCommand;
        })();
        Command.TurnRightCommand = TurnRightCommand;
        var AttackCommand = (function () {
            function AttackCommand(controller) {
                this.animator = controller;
            }
            AttackCommand.prototype.execute = function () {
                this.animator.attack(this.next);
            };
            return AttackCommand;
        })();
        Command.AttackCommand = AttackCommand;
    })(Command = Pylearn.Command || (Pylearn.Command = {}));
})(Pylearn || (Pylearn = {}));
var Pylearn;
(function (Pylearn) {
    var Controller;
    (function (Controller) {
        var CharacterController = (function () {
            function CharacterController(game, pirate) {
                this.character = pirate;
                this.game = game;
            }
            CharacterController.prototype.create = function () {
                var worldPos = Pylearn.Util.getWorldPosition(this.character.position);
                this.sprite = this.game.isoPlugin.addIsoSprite(worldPos.x, worldPos.y, 0, 'pirate', 0);
                this.sprite.anchor.set(0.5, 0.5);
                this.sprite.animations.add('walk0', Phaser.Animation.generateFrameNames('', 52, 60), 24, true);
                this.sprite.animations.add('walk3', Phaser.Animation.generateFrameNames('', 61, 69), 24, true);
                this.sprite.animations.add('walk1', Phaser.Animation.generateFrameNames('', 70, 78), 24, true);
                this.sprite.animations.add('walk2', Phaser.Animation.generateFrameNames('', 79, 87), 24, true);
                this.sprite.animations.add('attack0', Phaser.Animation.generateFrameNames('', 0, 12), 24, false);
                this.sprite.animations.add('attack3', Phaser.Animation.generateFrameNames('', 13, 25), 24, false);
                this.sprite.animations.add('attack1', Phaser.Animation.generateFrameNames('', 26, 38), 24, false);
                this.sprite.animations.add('attack2', Phaser.Animation.generateFrameNames('', 39, 51), 24, false);
                this.sprite.animations.add('idle0', [12], 24, false);
                this.sprite.animations.add('idle3', [25], 24, false);
                this.sprite.animations.add('idle1', [38], 24, false);
                this.sprite.animations.add('idle2', [51], 24, false);
                this.sprite.animations.play('idle0');
            };
            CharacterController.prototype.moveTo = function (tile, next) {
                var worldPos = Pylearn.Util.getWorldPosition(tile);
                var animationName = 'walk' + this.character.direction;
                var animation = this.sprite.animations.play(animationName);
                console.log(animation);
                var moveTween = this.game.add.tween(this.sprite).to({ 'isoX': worldPos.x, 'isoY': worldPos.y }, 1000);
                moveTween.onComplete.add(next);
                moveTween.start();
                console.log(moveTween);
            };
            CharacterController.prototype.rotateTo = function (direction, next) {
                next();
            };
            CharacterController.prototype.attack = function (next) {
                var animationName = 'attack' + this.character.direction;
                console.log(animationName);
                var animation = this.sprite.animations.play(animationName);
                console.log(animation);
                animation.onComplete.add(next);
            };
            return CharacterController;
        })();
        Controller.CharacterController = CharacterController;
    })(Controller = Pylearn.Controller || (Pylearn.Controller = {}));
})(Pylearn || (Pylearn = {}));
var Pylearn;
(function (Pylearn) {
    var Controller;
    (function (Controller) {
        var LevelController = (function () {
            function LevelController(game) {
                this.game = game;
            }
            LevelController.prototype.create = function () {
                var tile;
                var isoGroup = this.game.add.group();
                for (var xx = 0; xx < 256; xx += 64) {
                    for (var yy = 0; yy < 256; yy += 64) {
                        tile = this.game.isoPlugin.addIsoSprite(xx, yy, 0, 'tile', 0, isoGroup);
                        tile.anchor.set(0.5, 0);
                    }
                }
            };
            return LevelController;
        })();
        Controller.LevelController = LevelController;
    })(Controller = Pylearn.Controller || (Pylearn.Controller = {}));
})(Pylearn || (Pylearn = {}));
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
            this.state.add('Gameplay', Pylearn.Gameplay, false);
        }
        Game.prototype.boot = function () {
            _super.prototype.boot.call(this);
            this.isoPlugin = this.plugins.add(new Phaser.Plugin.Isometric(this));
            this.isoPlugin.projector.anchor.setTo(0.5, 0.2);
            this.state.start('Boot');
        };
        return Game;
    })(Phaser.Game);
    Pylearn.Game = Game;
})(Pylearn || (Pylearn = {}));
window.onload = function () {
    var game = new Pylearn.Game();
};
var Pylearn;
(function (Pylearn) {
    var Model;
    (function (Model) {
        (function (Direction) {
            Direction[Direction["N"] = 0] = "N";
            Direction[Direction["E"] = 1] = "E";
            Direction[Direction["S"] = 2] = "S";
            Direction[Direction["W"] = 3] = "W";
        })(Model.Direction || (Model.Direction = {}));
        var Direction = Model.Direction;
        var Character = (function () {
            function Character(x, y, direction) {
                this.position = new Model.TileCoordinate(x, y);
                this.direction = direction;
            }
            Character.prototype.moveBy = function (x, y) {
                this.position.x += x;
                this.position.y += y;
            };
            return Character;
        })();
        Model.Character = Character;
    })(Model = Pylearn.Model || (Pylearn.Model = {}));
})(Pylearn || (Pylearn = {}));
var Pylearn;
(function (Pylearn) {
    var Model;
    (function (Model) {
        var Level = (function () {
            function Level() {
            }
            return Level;
        })();
        Model.Level = Level;
    })(Model = Pylearn.Model || (Pylearn.Model = {}));
})(Pylearn || (Pylearn = {}));
var Pylearn;
(function (Pylearn) {
    var Model;
    (function (Model) {
        var TileCoordinate = (function () {
            function TileCoordinate(x, y) {
                this.x = x;
                this.y = y;
            }
            return TileCoordinate;
        })();
        Model.TileCoordinate = TileCoordinate;
    })(Model = Pylearn.Model || (Pylearn.Model = {}));
})(Pylearn || (Pylearn = {}));
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
            this.game.state.start('Preloader', true, false);
        };
        return Boot;
    })(Phaser.State);
    Pylearn.Boot = Boot;
})(Pylearn || (Pylearn = {}));
var Pylearn;
(function (Pylearn) {
    var Gameplay = (function (_super) {
        __extends(Gameplay, _super);
        function Gameplay() {
            _super.apply(this, arguments);
        }
        Gameplay.prototype.create = function () {
            var pirate = new Pylearn.Model.Character(0, 0, 0 /* N */);
            this.level = new Pylearn.Controller.LevelController(this.game);
            this.character = new Pylearn.Controller.CharacterController(this.game, pirate);
            this.level.create();
            this.character.create();
            SkulptAnimator = this.character;
        };
        return Gameplay;
    })(Phaser.State);
    Pylearn.Gameplay = Gameplay;
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
var Pylearn;
(function (Pylearn) {
    var Util = (function () {
        function Util() {
        }
        Util.getDirectionAngle = function (direction) {
            switch (direction) {
                case 0 /* N */:
                    return 0;
                case 1 /* E */:
                    return Math.PI / 2;
                case 2 /* S */:
                    return Math.PI;
                case 3 /* W */:
                    return 3 * (Math.PI / 2);
            }
        };
        Util.getWorldPosition = function (tile) {
            return new Phaser.Point(tile.x * 64, tile.y * 64);
        };
        return Util;
    })();
    Pylearn.Util = Util;
})(Pylearn || (Pylearn = {}));
//# sourceMappingURL=pylearn.ts.js.map