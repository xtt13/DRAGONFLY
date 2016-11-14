var DRAGONFLY = DRAGONFLY || {};

DRAGONFLY.Item = function(state, x, y, spritename, type){
  Phaser.Sprite.call(this, state.game, x, y, spritename);
  this.type = type;
  this.anchor.set(0.5, 0.5);
  this.scale.setTo(-2.4, 2.4);
  state.game.add.existing(this);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
};

DRAGONFLY.Item.prototype = Object.create(Phaser.Sprite.prototype);
DRAGONFLY.Item.prototype.constructor = DRAGONFLY.Item;
