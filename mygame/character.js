'use strict';

var Character = function(canvas) {
    this.health = 0;
    this.x = 0;
    this.y = 0;
    this.canvas = canvas;
};

Character.prototype.moveForward = function(n) {
    this.y += n;
    this.canvas.update(this);
};


Character.prototype.position  = function() {
    var pos = {'x':this.x, 'y':this.y};
    return pos;
};
