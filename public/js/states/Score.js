var DRAGONFLY = DRAGONFLY || {};

var distance = 300;
var speed = 6;
var star;
var texture;

var max = 400;
var xx = [];
var yy = [];
var zz = [];

DRAGONFLY.ScoreState = {


  init: function(score, duration) {

    //this.score = score;

    this.scoresound_switch = true;

    this.ScorefireRate = 100;
    this.ScorenextFire = 0;
    this.score = score ? score : 0;
    this.scorenumberstart = 0;

    this.scoregameduration = duration ? duration : 0;

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

    //this.game.time.slowMotion = 1.0;

    this.newlevelunlocked = this.game.add.audio('newlevelunlocked');
    this.newlevelunlocked.play();

    this.scoresound = this.game.add.audio('scoresound');
    //this.scoresound.allowMultiple = false;


    // FullscreenMode Aktuell auf Taste 1
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;
    this.key1 = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    this.key1.onDown.add(this.gofull, this);

    this.font_score = this.game.add.retroFont('knightHawks', 31, 25, Phaser.RetroFont.TEXT_SET6, 10, 1, 1);
    this.myvar_score = this.game.add.image(window.innerWidth/2, window.innerHeight/2, this.font_score);
    this.myvar_score.fixedToCamera = true;
    this.myvar_score.anchor.set(0.5, 0.5);
    this.myvar_score.scale.setTo(2, 2);

    this.font_score2 = this.game.add.retroFont('knightHawks', 31, 25, Phaser.RetroFont.TEXT_SET6, 10, 1, 1);
    this.myvar_score2 = this.game.add.image(window.innerWidth/2, (window.innerHeight/2)+200, this.font_score2);
    this.myvar_score2.fixedToCamera = true;
    this.myvar_score2.anchor.set(0.5, 0.5);
    this.myvar_score2.scale.setTo(1, 1);

    //console.log(this.scoregameduration);
    this.font_score2.text = this.scoregameduration + ' Seconds';

    this.game.stage.backgroundColor = '#000';

    var style_score = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "left" };
    this.texttt = this.game.add.text(window.innerWidth/2, (window.innerHeight/2)+300, 'Click To Move On', style_score);
    this.texttt.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    this.texttt.anchor.set(0.5, 0.5);
    this.texttt.fixedToCamera = true;

    console.log('SCORE');


  },
  update: function(){

    // this.font_score2.text = this.scoregameduration;

    console.log('SCORE');

    if (this.game.time.now > this.ScorenextFire) {
        if(this.scorenumberstart < this.score){
          this.scorenumberstart++;


          // if(this.scoresound_switch){
          //   this.scoresound.play();
          //   this.scoresound_switch = false;
          // }
          //this.scoresound.allowMultiple = false;
          this.scoresound.play();


          this.font_score.text = this.scorenumberstart + ' COINS';
        }

        // if(this.scorenumberstart === this.score){
        //   this.game.add.tween(this.myvar_score.scale).to({ x: 4, y: 4});
        // }

    }

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

    this.game.debug.body(this.myvar_score);


    //this.game.debug.pointer( this.game.input.activePointer );


  }
};
