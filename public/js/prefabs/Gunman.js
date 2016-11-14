var DRAGONFLY = DRAGONFLY || {};

DRAGONFLY.Gunman = function(state, x, y){

  Phaser.Sprite.call(this, state.game, x, y, 'enemie');
  this.animations.add('enemie_walk', [0,1,2,3], 10, true);
  this.animations.add('enemie_shoot', [4], 10, true);
  this.firesound = this.game.add.audio('fire');
  this.anchor.set(0.5);
  // this.body.allowRotation = false;
  // this.body.setSize(30, 30);
  this.scale.setTo(-2, 2);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  state.game.add.existing(this);
  this.health = 100;

  this.healthBar = new Phaser.Sprite(state.game, this.x,this.y, 'bar');
  this.game.add.existing(this.healthBar);
  this.healthBar.anchor.setTo(0.5);
  this.game.physics.arcade.enable(this.healthBar);
  this.refreshHealthbar();

  this.enemie_weapon = this.game.add.weapon(20, 'defaultbullet');
  this.enemie_weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
  this.enemie_weapon.bulletLifespan = 2000;
  this.enemie_weapon.bulletSpeed = 500;
  this.enemie_weapon.bulletSpeedVariance = 50;
  this.enemie_weapon.bulletAngleVariance = 10;
  this.enemie_weapon.fireRate = 100;
  this.enemie_weapon.bulletWorldWrap = false;
  this.enemie_weapon.trackSprite(this, -30, 5, true);
};

DRAGONFLY.Gunman.prototype = Object.create(Phaser.Sprite.prototype);
DRAGONFLY.Gunman.prototype.constructor = DRAGONFLY.Gunman;

DRAGONFLY.Gunman.prototype.refreshHealthbar = function() {
  this.healthBar.tint = '0xFFFF00';
  this.healthBar.scale.setTo(this.health,0.8);

};

DRAGONFLY.Gunman.prototype.update = function() {
  this.healthBar.x = this.x;
  this.healthBar.y = this.y - 35;

  this.healthBar.body.velocity = this.body.velocity;
};
