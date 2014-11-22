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
            function CharacterController(game) {
                this.game = game;
            }
            CharacterController.prototype.create = function (pirate) {
                this.character = pirate;
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
                var idleAnimation = 'idle' + this.character.direction;
                this.sprite.animations.play(idleAnimation);
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
            function LevelController(game, levelName) {
                this.introIndex = 0;
                this.successIndex = 0;
                this.game = game;
                this.isoGroup = this.game.add.group();
                this.levelName = levelName;
            }
            LevelController.prototype.setPlayerSpawn = function (isoX, isoY, directionName) {
                var direction = this.directionFromString(directionName);
                this.pirate = new Pylearn.Model.Character(isoX, isoY, direction);
            };
            LevelController.prototype.addIsoSprite = function (isoX, isoY, spriteName, anchorX, anchorY) {
                if (anchorX === void 0) { anchorX = 0.5; }
                if (anchorY === void 0) { anchorY = 0; }
                var screenX = isoX * 64;
                var screenY = isoY * 64;
                var tile = this.game.isoPlugin.addIsoSprite(screenX, screenY, 0, spriteName, 0, this.isoGroup);
                tile.anchor.set(anchorX, anchorY);
            };
            LevelController.prototype.directionFromString = function (dir) {
                switch (dir) {
                    case "N":
                        return 0 /* N */;
                    case "S":
                        return 2 /* S */;
                    case "E":
                        return 1 /* E */;
                    case "W":
                        return 3 /* W */;
                }
                return 0 /* N */;
            };
            LevelController.prototype.create = function () {
                var levelJson = this.game.cache.getText(this.levelName);
                var levelData = JSON.parse(levelJson);
                this.level = new Pylearn.Model.Level();
                this.level.loadFromJson(levelData);
                for (var i = 0; i < this.level.tiles.length; i++) {
                    var tile = this.level.tiles[i];
                    tile.build(this);
                }
            };
            LevelController.prototype.nextMessageIntro = function () {
                var message = null;
                if (this.level.introMessages.length > this.introIndex) {
                    message = this.level.introMessages[this.introIndex];
                    this.introIndex++;
                }
                return message;
            };
            LevelController.prototype.nextMessageSuccess = function () {
                var message = null;
                if (this.level.winMessages.length > this.successIndex) {
                    message = this.level.winMessages[this.successIndex];
                    this.successIndex++;
                }
                return message;
            };
            return LevelController;
        })();
        Controller.LevelController = LevelController;
    })(Controller = Pylearn.Controller || (Pylearn.Controller = {}));
})(Pylearn || (Pylearn = {}));
var Pylearn;
(function (Pylearn) {
    var Controller;
    (function (Controller) {
        var MessagesController = (function () {
            function MessagesController(provider, showMessage, hideMessage) {
                this.provider = provider;
                this.showMessage = showMessage;
                this.hideMessage = hideMessage;
            }
            MessagesController.prototype.showIntro = function () {
                var message = this.provider.nextMessageIntro();
                if (message) {
                    this.showMessage(message.title, message.content, message.icon, this.showIntro.bind(this));
                }
                else {
                    this.hideMessage();
                }
            };
            return MessagesController;
        })();
        Controller.MessagesController = MessagesController;
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
        function Game(showMessage, hideMessage) {
            _super.call(this, 700, 600, Phaser.AUTO, 'gameCanvas', null);
            this.showMessage = showMessage;
            this.hideMessage = hideMessage;
            this.state.add('Boot', Pylearn.Boot, false);
            this.state.add('Preloader', Pylearn.Preloader, false);
            this.state.add('Gameplay', Pylearn.Gameplay, false);
        }
        Game.prototype.boot = function () {
            _super.prototype.boot.call(this);
            this.isoPlugin = this.add.plugin(new Phaser.Plugin.Isometric(this));
            this.isoPlugin.projector.anchor.setTo(0.5, 0.2);
            this.state.start('Boot');
        };
        return Game;
    })(Phaser.Game);
    Pylearn.Game = Game;
})(Pylearn || (Pylearn = {}));
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
                this.tiles = [];
                this.introMessages = [];
                this.winMessages = [];
            }
            Level.prototype.loadFromJson = function (json) {
                for (var y = 0; y < json.tiles.length; y++) {
                    var rows = json.tiles[y];
                    for (var x = 0; x < rows.length; x++) {
                        var tile = new Model.Tile();
                        var jsonData = rows[x];
                        tile.loadFromJson(x, y, jsonData);
                        this.tiles.push(tile);
                    }
                }
                for (var i = 0; i < json.introMessages.length; i++) {
                    var jsonData = json.introMessages[i];
                    var message = new Model.Message(jsonData.title, jsonData.content, null);
                    this.introMessages.push(message);
                }
                for (var i = 0; i < json.winMessages.length; i++) {
                    var jsonData = json.winMessages[i];
                    var message = new Model.Message(jsonData.title, jsonData.content, 'success');
                    this.winMessages.push(message);
                }
            };
            return Level;
        })();
        Model.Level = Level;
    })(Model = Pylearn.Model || (Pylearn.Model = {}));
})(Pylearn || (Pylearn = {}));
var Pylearn;
(function (Pylearn) {
    var Model;
    (function (Model) {
        var Message = (function () {
            function Message(title, content, icon) {
                this.title = title;
                this.content = content;
                this.icon = icon;
            }
            return Message;
        })();
        Model.Message = Message;
    })(Model = Pylearn.Model || (Pylearn.Model = {}));
})(Pylearn || (Pylearn = {}));
var LevelBuilder = Pylearn.Controller.LevelController;
var Pylearn;
(function (Pylearn) {
    var Model;
    (function (Model) {
        (function (TileTypeId) {
            TileTypeId[TileTypeId["Simple"] = 0] = "Simple";
            TileTypeId[TileTypeId["Chest"] = 1] = "Chest";
            TileTypeId[TileTypeId["SpawnPlayer"] = 2] = "SpawnPlayer";
        })(Model.TileTypeId || (Model.TileTypeId = {}));
        var TileTypeId = Model.TileTypeId;
        var EmptyTileComponent = (function () {
            function EmptyTileComponent() {
            }
            EmptyTileComponent.prototype.id = function () {
                return 0 /* Simple */;
            };
            EmptyTileComponent.prototype.build = function (builder) {
                builder.addIsoSprite(this.tile.position.x, this.tile.position.y, 'tile');
            };
            EmptyTileComponent.prototype.setTile = function (tile) {
                this.tile = tile;
            };
            EmptyTileComponent.prototype.onPlayerAction = function (action) {
            };
            return EmptyTileComponent;
        })();
        Model.EmptyTileComponent = EmptyTileComponent;
        var ChestTileComponent = (function (_super) {
            __extends(ChestTileComponent, _super);
            function ChestTileComponent() {
                _super.apply(this, arguments);
            }
            ChestTileComponent.prototype.build = function (builder) {
                builder.addIsoSprite(this.tile.position.x, this.tile.position.y, 'blue-tile');
                builder.addIsoSprite(this.tile.position.x, this.tile.position.y, 'chest');
            };
            return ChestTileComponent;
        })(EmptyTileComponent);
        Model.ChestTileComponent = ChestTileComponent;
        var SpawnPlayerComponent = (function (_super) {
            __extends(SpawnPlayerComponent, _super);
            function SpawnPlayerComponent(direction) {
                _super.call(this);
                this.direction = direction;
            }
            SpawnPlayerComponent.prototype.build = function (builder) {
                _super.prototype.build.call(this, builder);
                builder.setPlayerSpawn(this.tile.position.x, this.tile.position.y, this.direction);
            };
            return SpawnPlayerComponent;
        })(EmptyTileComponent);
        Model.SpawnPlayerComponent = SpawnPlayerComponent;
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
        var Tile = (function () {
            function Tile() {
                this._components = [];
            }
            Tile.prototype.loadFromJson = function (x, y, jsonData) {
                this.position = new TileCoordinate(x, y);
                switch (jsonData) {
                    case "O":
                        this.addComponent(new Model.EmptyTileComponent());
                        break;
                    case "X":
                        this.addComponent(new Model.ChestTileComponent());
                        break;
                    case "N":
                    case "S":
                    case "E":
                    case "W":
                        this.addComponent(new Model.SpawnPlayerComponent(jsonData));
                        break;
                }
            };
            Tile.prototype.addComponent = function (comp) {
                this._components.push(comp);
                comp.setTile(this);
            };
            Tile.prototype.getComponent = function (id) {
                for (var i = 0; i < this._components.length; i++) {
                    if (this._components[i].id() == id) {
                        return this._components[i];
                    }
                }
                return null;
            };
            Tile.prototype.removeComponent = function (id) {
                for (var i = 0; i < this._components.length; i++) {
                    if (this._components[i].id() == id) {
                        this._components.splice(i, 1);
                        break;
                    }
                }
            };
            Tile.prototype.build = function (levelBuilder) {
                for (var i = 0; i < this._components.length; i++) {
                    this._components[i].build(levelBuilder);
                }
            };
            return Tile;
        })();
        Model.Tile = Tile;
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
            var levelToPlay = 'level01';
            var pylearnGame = this.game;
            this.levelController = new Pylearn.Controller.LevelController(pylearnGame, levelToPlay);
            this.characterController = new Pylearn.Controller.CharacterController(pylearnGame);
            this.messageController = new Pylearn.Controller.MessagesController(this.levelController, pylearnGame.showMessage, pylearnGame.hideMessage);
            this.levelController.create();
            this.characterController.create(this.levelController.pirate);
            SkulptAnimator = this.characterController;
            this.messageController.showIntro();
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
            this.levelNames = [
                'level01'
            ];
            this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);
            this.load.image('tile', 'pylearn/dev/game/assets/tile.png');
            this.load.image('blue-tile', 'pylearn/dev/game/assets/blue-tile.png');
            this.load.image('chest', 'pylearn/dev/game/assets/chest.png');
            this.load.atlasJSONHash('pirate', 'pylearn/dev/game/assets/pirate.png', 'pylearn/dev/game/assets/pirate.json');
            for (var i = 0; i < this.levelNames.length; i++) {
                this.load.text(this.levelNames[i], 'pylearn/dev/game/assets/levels/' + this.levelNames[i] + '.json');
            }
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
//# sourceMappingURL=pylearn.js.map