var DRAGONFLY = DRAGONFLY || {};

DRAGONFLY.MenuButton = function(state, x, y, spritename, level, locked, levelNumber){

  this.state = state;
  this.button_x = x;
  this.button_y = y;
  this.spritename = spritename;
  this.selectedLevel = level;
  this.locked = locked;
  this.levelNumber = levelNumber;


  if(this.locked){

    state.game.add.button(window.innerWidth/2 - x, y, spritename, this.actionOnClick, this, 0, 0, 0);
    //console.log('LOCKED');

  } else {

    state.game.add.button(window.innerWidth/2 - x, y, spritename, this.actionOnClick, this, 2, 1, 1);
    //console.log('NOT LOCKED');
  }


};

DRAGONFLY.MenuButton.prototype = Object.create(Phaser.Sprite.prototype);
DRAGONFLY.MenuButton.prototype.constructor = DRAGONFLY.MenuButton;

DRAGONFLY.MenuButton.prototype.actionOnClick = function() {

    if(this.selectedLevel === 'shop'){
        DRAGONFLY.game.state.start("Shop",true,false);
    } else {

      if(!this.locked){
        DRAGONFLY.game.state.start("Game",true,false, this.selectedLevel, this.levelNumber);
      }
    }



};

DRAGONFLY.MenuButton.prototype.lockIt = function() {

        DRAGONFLY.game.add.button(window.innerWidth/2 - this.button_x, this.button_y, this.spritename, this.actionOnClick, this, 0, 0, 0);

};
