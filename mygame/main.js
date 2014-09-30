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

    //
    // Character Animator methods
    // 
    this.moveTo = function(tileCoord, next) {
        var worldPos = getWorldPos(tileCoord);
        ship.moveTo(worldPos.x, worldPos.y, 20);
        wade.setMainLoopCallback(function()
        {
            var position = ship.getPosition();
            if (position.x == worldPos.x &&
                position.y == worldPos.y)
            {
                // Arrived at position
                wade.setMainLoopCallback(null, 'move');
                next();
            }
        }, 'move');
    };

    this.rotateTo = function(dir, next) {
        ship.rotateTo(getDirectionAngle(dir));
        next();
    };

    // 
    // Helper methods
    // 
    this.getDirectionAngle = function(dir) {
        switch (dir) 
        {
            case Direction.N :
                return 0;
            case Direction.E : 
                return 90;
            case Direction.S :
                return 180;
            case Direction.W : 
                return 270;
        }

        return 0;
    }
};