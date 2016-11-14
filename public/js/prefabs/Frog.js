var DRAGONFLY = DRAGONFLY || {};

DRAGONFLY.Frog = function(state, x, y){

  Phaser.Sprite.call(this, state.game, x, y, 'frog');
  this.animations.add('frog_walk', [0,1,2,3], 10, true);
  this.animations.add('frog_attack', [4], 10, true);
  this.anchor.set(0.5);
  // this.body.allowRotation = false;
  // this.body.setSize(30, 30);
  this.scale.setTo(-2, 2);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  //this.game.physics.enable(this, Phaser.Physics.P2JS);
  //this.enableBody = true;
  //this.body.setSize(30,30);
  //this.body.collideWorldBounds = true;
  //this.game.physics.p2.enable(this);
  state.game.add.existing(this);
  this.health = 25;

  this.body.collideWorldBounds = true;

  this.healthBar = new Phaser.Sprite(state.game, this.x,this.y, 'bar');
  this.game.add.existing(this.healthBar);
  this.healthBar.anchor.setTo(0.5);
  this.game.physics.arcade.enable(this.healthBar);
  this.refreshHealthbar();
};

DRAGONFLY.Frog.prototype = Object.create(Phaser.Sprite.prototype);
DRAGONFLY.Frog.prototype.constructor = DRAGONFLY.Frog;

DRAGONFLY.Frog.prototype.refreshHealthbar = function() {
  this.healthBar.tint = '0xFFFF00';
  this.healthBar.scale.setTo(this.health,0.8);

};

DRAGONFLY.Frog.prototype.update = function() {
  this.healthBar.x = this.x;
  this.healthBar.y = this.y - 35;

  this.healthBar.body.velocity = this.body.velocity;
};
