var DRAGONFLY = DRAGONFLY || {};

var distance = 300;
var speed = 6;
var star;
var texture;

var max = 400;
var xx = [];
var yy = [];
var zz = [];

DRAGONFLY.ShopState = {


  init: function() {


    //this.game.stage.backgroundColor = '#000';

    // FullscreenMode Aktuell auf Taste 1
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;
    this.key1 = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    this.key1.onDown.add(this.gofull, this);

    star = this.game.make.sprite(0, 0, 'tinystar');
    texture = this.game.add.renderTexture(window.innerWidth, window.innerHeight, 'texture');

    this.game.add.sprite(0, 0, texture);

    for (var i = 0; i < max; i++)
    {
        xx[i] = Math.floor(Math.random() * 800) - 400;
        yy[i] = Math.floor(Math.random() * 600) - 300;
        zz[i] = Math.floor(Math.random() * 1700) - 100;
    }


  },
  create: function() {


    // FullscreenMode Aktuell auf Taste 1
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;
    this.key1 = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    this.key1.onDown.add(this.gofull, this);

    this.font_score = this.game.add.retroFont('knightHawks', 31, 25, Phaser.RetroFont.TEXT_SET6, 10, 1, 1);
    this.myvar_score = this.game.add.image(window.innerWidth/2, window.innerHeight/2, this.font_score);
    this.myvar_score.fixedToCamera = true;
    this.myvar_score.anchor.set(0.5, 0.5);
    this.myvar_score.scale.setTo(2, 2);

    // this.font_score2 = this.game.add.retroFont('knightHawks', 31, 25, Phaser.RetroFont.TEXT_SET6, 10, 1, 1);
    // this.myvar_score2 = this.game.add.image(window.innerWidth/2, (window.innerHeight/2)+200, this.font_score2);
    // this.myvar_score2.fixedToCamera = true;
    // this.myvar_score2.anchor.set(0.5, 0.5);
    // this.myvar_score2.scale.setTo(1, 1);



    this.game.stage.backgroundColor = '#000';

    var style_score = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "left" };
    this.texttt = this.game.add.text(window.innerWidth/2, (window.innerHeight/2)+300, 'Click To Move On', style_score);
    this.texttt.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    this.texttt.anchor.set(0.5, 0.5);
    this.texttt.fixedToCamera = true;

    console.log("Money: " + playerData.money);
    console.log(playerData.playerweapons);

    this.pistol_image = this.game.add.sprite((window.innerWidth)-650, 200, 'pistol_shop');
    this.pistol_image.scale.setTo(1);
    this.pistol_image.animations.add('pistol', [0,1,2,3], 7, true);
    this.pistol_image.play('pistol');

    this.sniper_image = this.game.add.sprite((window.innerWidth)-500, 200, 'sniper_shop');
    this.sniper_image.scale.setTo(1);
    this.sniper_image.animations.add('sniper', [0,1,2,3,4], 7, true);
    this.sniper_image.play('sniper');

    this.railgun_image = this.game.add.sprite((window.innerWidth)-300, 200, 'railgun_shop');
    this.railgun_image.scale.setTo(1);
    this.railgun_image.animations.add('railgun', [0,1,2], 7, true);
    this.railgun_image.play('railgun');




  },
  update: function(){

    // this.font_score2.text = this.scoregameduration;
    //console.log('SHOP');


    if (this.game.input.activePointer.isDown){
       this.state.start('Menu', true, false);
    }



    texture.clear();

    for (var i = 0; i < max; i++){

      var perspective = distance / (distance - zz[i]);
      var x = window.innerWidth/2 + xx[i] * perspective;
      var y = window.innerHeight/2 + yy[i] * perspective;

      zz[i] += speed;

      if (zz[i] > 300)
      {
          zz[i] -= 600;
      }

      texture.renderXY(star, x, y);
      }
  },
  actionOnClick: function(level){
    //this.game.state.start("Menu");
  },
  gofull: function(){

    if (this.game.scale.isFullScreen){
      this.game.scale.stopFullScreen();
    } else {
      this.game.scale.startFullScreen(false);
    }

  },

  render: function(){




    //this.game.debug.pointer( this.game.input.activePointer );


  }
};
