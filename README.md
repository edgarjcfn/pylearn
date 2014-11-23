pylearn
=======

A game to learn python by typing into a browser-based interpreter

# this is a work in progress

## Current version uses
 - [Typescript](http://www.typescriptlang.org/) - Strongly typed language that compiles to Javascript
 - [Skulpt](http://skulpt.org) - Browser-based python compiler and interpreter
 - [Phaser](httpL//phaser.io) - HTML5 game framework.
 - [Phaser Isometric Plugin](https://github.com/lewster32/phaser-plugin-isometric) - By @lewster32
 - [Ace](http://ace.c9.io/) - In-browse code editor
 - Tiles from [OpenGameArt.Org](http://opengameart.org/content/isometric-painted-game-assets)
 - Character Sprites from [Rener's Tile Sets](http://www.reinerstilesets.de)
 - [Sweet Alert](https://github.com/t4t5/sweetalert) - Beautiful dialogs

## Installing

 1. Install [Node JS](http://nodejs.org/)
 2. Checkout this repository with 

 	`git clone https://github.com/edgarjcfn/pylearn.git`
 3. At the repository folder, install npm dependencies

 	`npm install`
 4. Still at the repository folder, install bower dependencies

 	`bower install`
 5. Run the local development server with

 	`grunt dev`

 After that, point your browser to `http://localhost:8081` and you're ready to go

 ## Building levels

 - See the files at `pylearn/dev/game/assets/levels`
 - Include your own files that define levels
 - Include your level names (in order) at the top of `pylearn/dev/game/states/preloader.ts`
 - Reload your browser and play your levels.

 At the moment the only objective type is to capture all treasure chests with the `char.pickUp()` python function. In the future I intend to add more objective types

## Contributing
I'm gladly accepting contributions both in code and in art/design. Send Pull Requests!

## TODO
 - [x] Migrate to Typescript
 - [X] Implement Level Loading
 - [X] Implement Level Progression (instructions, win/lose)
 - [ ] Load supporting python file with initial code for each level
 - [ ] Add a Restart (Reset) button
 - [ ] Make page look nicer
 - [ ] Make game look nicer
 - [ ] Add more objective types



