var DRAGONFLY = DRAGONFLY || {};

DRAGONFLY.Player = function(state, x, y, data, currentweapon){

  Phaser.Sprite.call(this, state.game, x, y, 'hero');
  this.animations.add('walk', [0,1,2,3], 10, true);
  this.animations.add('shoot', [3,4], 10, true);
  this.anchor.set(0.1, 0.5);
  this.data = Object.create(data);
  this.currentweapon = currentweapon;
  this.ammoBar_ammo = 0;
  // this.body.setSize(30, 30);

  this.scale.setTo(2);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.game.camera.follow(this, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

  state.game.add.existing(this);

  //add energy health
  this.healthBar = new Phaser.Sprite(state.game, this.x,this.y, 'bar');
  this.game.add.existing(this.healthBar);
  this.healthBar.anchor.setTo(0.5);
  this.game.physics.arcade.enable(this.healthBar);
  this.refreshHealthbar();

  this.defenceBar = new Phaser.Sprite(state.game, this.x,this.y, 'bar');
  this.game.add.existing(this.defenceBar);
  this.defenceBar.anchor.setTo(0.5);
  this.game.physics.arcade.enable(this.defenceBar);
  this.refreshDefencebar();

  this.ammoBar = new Phaser.Sprite(state.game, this.x,this.y, 'ammo-bar');
  this.game.add.existing(this.ammoBar);
  this.ammoBar.anchor.setTo(0.5);
  this.game.physics.arcade.enable(this.ammoBar);
  this.refreshAmmobar();


};

DRAGONFLY.Player.prototype = Object.create(Phaser.Sprite.prototype);
DRAGONFLY.Player.prototype.constructor = DRAGONFLY.Player;



DRAGONFLY.Player.prototype.refreshHealthbar = function() {
  this.healthBar.scale.setTo(this.data.health,0.8);



  this.healthBar.tint = 0xFFFF00;
  if(this.data.health <= 50){

    //this.healthBar.tint = 0x997556;
    this.healthBar.tint = 0xFF0000;
  }
  if(this.data.health > 100) {
    this.data.health = 100;
    playerData.health = 100;
  }
};

DRAGONFLY.Player.prototype.refreshDefencebar = function() {
  //console.log('DEV');
  //console.log(this.defenceBar);
  this.defenceBar.scale.setTo(this.data.defence,0.8);

  this.defenceBar.tint = '0x1AA8D5';
  this.defenceBar.tint = '0x0066FF';

  if(this.data.defence > 100) {
    this.data.defence = 100;
    playerData.defence = 100;
  }

};

DRAGONFLY.Player.prototype.refreshAmmobar = function(currentweapon) {

  //console.log(this.data);
  //console.log(currentweapon);

  switch (currentweapon) {
    case 'Photongun':
      this.ammoBar_ammo = this.data.photongun_ammo;
      this.ammoBar.scale.setTo((this.ammoBar_ammo)/-20,1);
      break;
    case 'Raygun':
      this.ammoBar_ammo = this.data.raygun_ammo;
      this.ammoBar.scale.setTo((this.ammoBar_ammo)/-5,1);
      break;
    case 'Shotgun':
      this.ammoBar_ammo = this.data.shotgun_ammo;
      this.ammoBar.scale.setTo((this.ammoBar_ammo)/-5,1);
      break;
    case 'Minigun':
      this.ammoBar_ammo = this.data.minigun_ammo;
      this.ammoBar.scale.setTo((this.ammoBar_ammo)/-5,1);
      break;
    case 'Quantumrifle':
      this.ammoBar_ammo = this.data.quantumrifle_ammo;
      this.ammoBar.scale.setTo((this.ammoBar_ammo)/-5,1);
      break;
    case 'Sniperrifle':
      this.ammoBar_ammo = this.data.sniperrifle_ammo;
      this.ammoBar.scale.setTo((this.ammoBar_ammo)*10,1);
      break;
    case 'Torpedolauncher':
      this.ammoBar_ammo = this.data.torpedolauncher_ammo;
      this.ammoBar.scale.setTo((this.ammoBar_ammo)*10,1);
      break;
    default:
      this.ammoBar.scale.setTo((0)/-20,1);

  }

  //this.ammoBar.scale.setTo((this.ammoBar_ammo)/-20,1);

  // this.ammoBar.tint = '0x1AA8D5';
  // this.ammoBar.tint = '0x0066FF';

  if(this.data.ammo > 2000) {
    this.data.ammo = 2000;
    playerData.ammo = 2000;
  }

};

DRAGONFLY.Player.prototype.update = function() {
  this.healthBar.x = this.x;
  this.healthBar.y = this.y - 35;
  this.healthBar.body.velocity = this.body.velocity;

  this.defenceBar.x = this.x;
  this.defenceBar.y = this.y - 55;
  this.defenceBar.body.velocity = this.body.velocity;

  this.ammoBar.x = this.x;
  this.ammoBar.y = this.y - 45;
  this.ammoBar.body.velocity = this.body.velocity;
};

// DRAGONFLY.Player.prototype.usePhotongun = function() {
//
//   this.weapon = this.game.add.weapon(30, 'bullet');
//   this.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
//   this.weapon.bulletLifespan = 2000;
//   this.weapon.bulletSpeed = 500;
//   this.weapon.bulletSpeedVariance = 50;
//   this.weapon.fireRate = 60;
//   this.weapon.fireRateVariance = 100;
//   this.weapon.bulletAngleVariance = 10;
//   this.weapon.bulletWorldWrap = false;
//   this.weapon.trackSprite(this.player, 40, 0, true);
//   this.weapon.weapontype = 'Photongun';
//   playerData.weapondamage = 10;
//
// };
