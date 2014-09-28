 App = function()
 {
    this.ship = {};

    this.load = function()
    {
        wade.loadImage('assets/ship.png');
    };

    this.init = function()
    {
        wade.setMinScreenSize(708, 398);
        wade.setMaxScreenSize(708, 398);

        var sprite = new Sprite('assets/ship.png');
        ship = new SceneObject(sprite, 0, 0, 0);
        wade.addSceneObject(ship);
    };

    this.update = function(character) 
    {
        console.debug('updating... ' + character);
        var pos = character.position();
        ship.moveTo(pos.x, pos.y);
    }


};