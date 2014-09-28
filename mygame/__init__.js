var $builtinmodule = function(name)
{
    'use strict';

    var canvas = Sk.canvas;

    var Character = function() {
        this.health = 0;
        this.x = 0;
        this.y = 0;
    };

    Character.prototype.moveForward = function(n) {
        this.y += n;
        canvas.update(this);
    };

    Character.prototype.jump = function() {
        
    };

    Character.prototype.position  = function() {
        var pos = {'x':this.x, 'y':this.y};
        return pos;
    };


    /**
    * SKULPT module definition
    */
    var mod = {};

    // 
    // functions
    // 
    mod.alert = new Sk.builtin.func(function(a) {
        alert(a.v);
    });

    // 
    // classes
    // 
    mod.Character = Sk.misceval.buildClass(mod, function($gbl, $loc) {
         $loc.__init__ = new Sk.builtin.func(function(self) {
            self.character = new Character();
         });

         $loc.moveForward = new Sk.builtin.func(function(self,x) {
            self.character.moveForward(x.v);
         });
         $loc.jump = new Sk.builtin.func(function(self) {
            self.character.jump();
         });
         $loc.position = new Sk.builtin.func(function(self) {
            var pos = self.character.position();

            return new Sk.builtin.tuple([
                    Sk.builtin.assk$(pos.x, Sk.builtin.nmber.float$),
                    Sk.builtin.assk$(pos.y, Sk.builtin.nmber.float$)
                ]);
         });

    },
    'Character', []);


    return mod;
}