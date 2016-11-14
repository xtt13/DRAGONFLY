var DRAGONFLY = DRAGONFLY || {};

//loading the game assets
DRAGONFLY.PreloadState = {
  preload: function() {
    //show loading screen


    this.game.stage.backgroundColor = "#000000";

    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bar');
    this.preloadBar.anchor.setTo(0.5);
    this.preloadBar.scale.setTo(100, 1);
    this.load.setPreloadSprite(this.preloadBar);

    //this.prozent = 0;

    // this.meinevaar = this.load.onFileComplete.add(function( progress ) {
    //
    //   console.log('Progress: ' + progress + '%');
    //  });

     //console.log('MEIN TEST ' + this.meinevaar);

    var prestyle = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "left" };
    this.preText = this.game.add.text(this.game.world.centerX, 350, 'LOADING', prestyle);
    this.preText.anchor.setTo(0.5);
    this.preText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

    this.game.load.image('metal', 'public/assets/images/metal.png');

    //load game assets
    this.load.image('tiles', 'public/assets/images/sum.png');
    this.load.image('bullet', 'public/assets/images/bullet.png');
    this.load.image('ammo-bar', 'public/assets/images/ammo-bar.png');
    this.load.image('tinystar', 'public/assets/images/star2.png');

    this.load.image('menu_ui', 'public/assets/images/menu_ui.png');

    this.load.image('defaultbullet', 'public/assets/images/bullet2.png');
    this.load.image('shotgun_ammo', 'public/assets/images/shotgun_ammo.png');
    this.load.image('bullet2', 'public/assets/images/ball.png');

    this.load.spritesheet('quantum_ammo', 'public/assets/images/quantum_ammo.png', 4, 4);
    this.load.image('raybullet', 'public/assets/images/bullet9.png');
    this.load.image('torpedo', 'public/assets/images/torpedo.png');

    this.load.image('bulletenemie', 'public/assets/images/ball2.png');
    this.load.image('ball', 'public/assets/images/ball.png');
    this.load.image('mute', 'public/assets/images/mute.png');
    this.load.image('nomute', 'public/assets/images/nomute.png');
    this.load.image('logo', 'public/assets/images/logo_alpha_pixels.png');
    this.load.image('weapon-gui', 'public/assets/images/weapon-gui.png');
    this.load.image('weapon-gui-heart-defence', 'public/assets/images/weapon-gui-heart-defence.png');

    //this.load.image('shield', 'public/assets/images/defence.png');
    //this.load.image('health', 'public/assets/images/health.png');


    // this.load.image('knightHawks', 'public/assets/images/knighthawks.png');
    // this.game.load.image('raster', 'public/assets/images/multi-color-raster.png');
    this.game.load.bitmapFont('carrier_command', 'public/assets/fonts/carrier_command.png', 'public/assets/fonts/carrier_command.xml');
    this.load.image('knightHawks', 'public/assets/images/KNIGHT3.png');
    //this.load.image('crosshair', 'public/assets/images/cursor3.png');

    this.load.spritesheet('menu_button1', 'public/assets/images/button_sprite_sheet_level1.png', 193, 71);
    this.load.spritesheet('menu_button2', 'public/assets/images/button_sprite_sheet_level2.png', 193, 71);
    this.load.spritesheet('menu_button3', 'public/assets/images/button_sprite_sheet_level3.png', 193, 71);
    this.load.spritesheet('menu_button4', 'public/assets/images/button_sprite_sheet_level4.png', 193, 71);
    this.load.spritesheet('menu_button5', 'public/assets/images/button_sprite_sheet_level5.png', 193, 71);
    this.load.spritesheet('menu_button6', 'public/assets/images/button_sprite_sheet_level6.png', 193, 71);
    this.load.spritesheet('menu_button7', 'public/assets/images/button_sprite_sheet_level7.png', 193, 71);
    this.load.spritesheet('menu_button8', 'public/assets/images/button_sprite_sheet_level8.png', 193, 71);
    this.load.spritesheet('menu_shop', 'public/assets/images/button_sprite_sheet_shop.png', 193, 71);
    this.load.spritesheet('ingame_menu_button', 'public/assets/images/menu-button.png', 43, 20);
    this.load.spritesheet('menu_menu_button', 'public/assets/images/menu-button-ingame_w66_h20.png', 66, 20);



    this.load.shader('myshader', 'public/assets/shaders/shader.frag');

    this.load.audio('autoaim_enabled', 'public/assets/sounds/autoaim_enabled.mp3');
    this.load.audio('autoaim_disabled', 'public/assets/sounds/autoaim_disabled.mp3');

    this.load.audio('music', 'public/assets/sounds/waveshaper2.mp3');
    this.load.audio('music2', 'public/assets/sounds/waveshaper.mp3');

    this.load.audio('fire', 'public/assets/sounds/fire.wav');
    this.load.audio('newlevelunlocked', 'public/assets/sounds/newlevelunlocked.mp3');
    this.load.audio('scoresound', 'public/assets/sounds/scoresound.wav');
    this.load.audio('teleport', 'public/assets/sounds/teleport.wav');
    this.load.audio('explosionsound', 'public/assets/sounds/explosionsound.mp3');
    this.load.audio('kill', 'public/assets/sounds/kill.wav');
    this.load.audio('one_enemy_left', 'public/assets/sounds/oneenemieleft.wav');
    this.load.audio('welldone', 'public/assets/sounds/welldone.wav');
    this.load.audio('coin', 'public/assets/sounds/coin.wav');
    this.load.audio('health', 'public/assets/sounds/health.wav');
    //this.load.audio('shield', 'public/assets/sounds/shield.wav');
    this.load.audio('ammo_sound', 'public/assets/sounds/ammo.wav');

    this.load.spritesheet('sniper_shop', 'public/assets/images/sniper_w_130_h_57.png', 130, 57);
    this.load.spritesheet('railgun_shop', 'public/assets/images/railgun_w112_h57.png', 112, 57);
    this.load.spritesheet('pistol_shop', 'public/assets/images/pistol_w_63_h_45.png', 64, 45);

    this.load.spritesheet('blood_hit', 'public/assets/images/blood_w21_h21.png', 21, 21);







    this.load.spritesheet('autoaim_defence', 'public/assets/images/autoaim_defence_w32_h32.png', 32, 32);
    this.load.spritesheet('autoaim', 'public/assets/images/autoaim_w25_h28.png', 25, 28);
    this.load.spritesheet('ring', 'public/assets/images/ring.png', 24, 24);
    this.load.spritesheet('frog', 'public/assets/images/frog_w_46_h_39.png', 46, 39);
    this.load.spritesheet('health', 'public/assets/images/health.png', 23, 24);
    this.load.spritesheet('shield', 'public/assets/images/defence.png', 24, 20);
    this.load.spritesheet('ammo', 'public/assets/images/ammo.png', 24, 22);
    this.load.spritesheet('player', 'public/assets/images/spaceman.png', 16, 16);
    this.load.spritesheet('coin', 'public/assets/images/coin_gold_w32_h32.png', 32, 32);
    this.load.spritesheet('coin_gui', 'public/assets/images/coin_gold_gui.png', 32, 32);
    this.load.spritesheet('kaboom', 'public/assets/images/explode.png', 128, 128);
    this.load.spritesheet('monsterexplosion', 'public/assets/images/monster_explosion_w115h_125.png', 115, 125);
    this.load.spritesheet('controller-indicator', 'public/assets/images/controller-indicator.png', 16, 16);

    this.load.spritesheet('hero', 'public/assets/images/walking_hero_new_w44_h24.png', 44, 24);
    //this.load.spritesheet('hero_fire', 'public/assets/images/shooting_hero_w44_h25', 44, 25);
    this.load.spritesheet('enemie', 'public/assets/images/enemie_w288_h26.png', 48, 26);
    this.load.spritesheet('enemie_hammer', 'public/assets/images/enemie_hammer_w52_h37.png', 52, 37, 8);
    this.load.spritesheet('rolling_enemie', 'public/assets/images/hard_enemy_w_59_h_46.png', 59, 46);


    //load game data
    this.load.tilemap('world1', 'public/assets/levels/world4.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('world2', 'public/assets/levels/world2.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('world3', 'public/assets/levels/world3.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('maze', 'public/assets/levels/maze.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('endboss', 'public/assets/levels/endboss.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('world5', 'public/assets/levels/world5.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('world6', 'public/assets/levels/world6.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('world7', 'public/assets/levels/world7.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('world11', 'public/assets/levels/world11.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('world12', 'public/assets/levels/world12.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('world13', 'public/assets/levels/world13.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('testlevel', 'public/assets/levels/testlevel.json', null, Phaser.Tilemap.TILED_JSON);



    this.game.load.script('filter-vignette', 'public/js/plugins/Vignette.js');
    //this.game.load.script('filter-snoise', '../src/SNoise.js');
    this.game.load.script('filter-filmgrain', 'public/js/plugins/FilmGrain.js');

  },
  create: function() {
    var prestyle = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "left" };
    this.preText = this.game.add.text(this.game.world.centerX, 350, 'LOADING', prestyle);
    this.preText.anchor.setTo(0.5);
    this.preText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

    this.state.start('Menu');
  },
  loadUpdate: function(){
    this.meinevaar = this.load.onFileComplete.add(function( progress ) {

      // var prestyle = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "left" };
      // this.preText = this.game.add.text(this.game.world.centerX, 350, 'LOADING', prestyle);
      // this.preText.anchor.setTo(0.5);
      // this.preText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

      //this.preText.setLoadingText(this.load.progress);

      console.log('Progress: ' + progress + '%');
      //this.preText.setText = progress;
      //console.log(this.preText);

     });


    //
    //  console.log('TEST');

  }

};
