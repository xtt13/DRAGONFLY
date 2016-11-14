var DRAGONFLY = DRAGONFLY || {};

DRAGONFLY.Hammer = function(state, x, y){

  Phaser.Sprite.call(this, state.game, x, y, 'enemie_hammer');
  this.animations.add('enemie_hammer_walk', [0,1,2,3,4,5,6,7], 4, false);
  this.animations.add('enemie_hammer_hit', [4,5,6,7], 10, false);
  this.anchor.set(0.5);
  // this.body.allowRotation = false;
  // this.body.setSize(30, 30);
  this.scale.setTo(-2, 2);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  state.game.add.existing(this);
  this.health = 500;

  this.healthBar = new Phaser.Sprite(state.game, this.x,this.y, 'bar');
  this.game.add.existing(this.healthBar);
  this.healthBar.anchor.setTo(0.5);
  this.game.physics.arcade.enable(this.healthBar);
  this.refreshHealthbar();

  // this.game.world.bringToTop(this.healthBar);
  // this.healthBar.bringToTop();
};

DRAGONFLY.Hammer.prototype = Object.create(Phaser.Sprite.prototype);
DRAGONFLY.Hammer.prototype.constructor = DRAGONFLY.Hammer;

DRAGONFLY.Hammer.prototype.refreshHealthbar = function() {
  this.healthBar.tint = '0xFFFF00';
  this.healthBar.scale.setTo(this.health/10,0.8);

};

DRAGONFLY.Hammer.prototype.update = function() {
  this.healthBar.x = this.x;
  this.healthBar.y = this.y - 35;

  this.healthBar.body.velocity = this.body.velocity;
};
