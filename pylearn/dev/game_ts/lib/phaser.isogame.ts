module Phaser {
	export class IsoGame extends Phaser.Game {
        iso:Phaser.Plugin.Isometric.Projector;
        plugins: Phaser.PluginManager;

        constructor(width?: number, height?: number, renderer?: number, parent?: any, state?: any, transparent?: boolean, antialias?: boolean, physicsConfig?: any)
        {
            super(width, height, renderer, parent, state, transparent, antialias, physicsConfig);
            console.log(this);
            console.log(this.plugins);
            console.log(this.iso);
            console.log(Object.getOwnPropertyNames(Phaser.Game.prototype));
            this.plugins.add(new Phaser.Plugin.Isometric(this));
            this.iso.anchor.set(0.5, 0.2);

        }

        addIsoSprite(x: number, y: number, z: number, key?: any, frame?: any, group?: Phaser.Group) : Phaser.Sprite {
            var isoSprite = new Phaser.Plugin.Isometric.IsoSprite(this, x, y, z);
            var sprite = this.add.sprite(isoSprite.x, isoSprite.y, key, frame, group);
            return sprite;
        }
    }
}