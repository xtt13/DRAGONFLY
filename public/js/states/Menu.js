var DRAGONFLY = DRAGONFLY || {};

var distance = 300;
var speed = 6;
var star;
var texture;

var max = 400;
var xx = [];
var yy = [];
var zz = [];

var filter;

DRAGONFLY.MenuState = {


  init: function() {

    this.buttons = [];

    this.levelcookies = false;
    //this.currentLevel = parseInt(document.cookie.replace(/(?:(?:^|.*;\s*)currentLevel\s*\=\s*([^;]*).*$)|^.*$/, "$1"));

  },
  create: function() {




    //document.cookie = "currentLevel=6";
    this.currentLevel = parseInt(document.cookie.replace(/(?:(?:^|.*;\s*)currentLevel\s*\=\s*([^;]*).*$)|^.*$/, "$1"));

    if (isNaN(this.currentLevel)) {
      //this.currentLevel = 2;
      document.cookie = "currentLevel=1";
      this.currentLevel = 1;
    }

    // alert(this.currentLevel);

    var buttons = [];

    // FullscreenMode Aktuell auf Taste 1
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;
    this.key1 = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    this.key1.onDown.add(this.gofull, this);

    star = this.game.make.sprite(0, 0, 'tinystar');
    texture = this.game.add.renderTexture(window.innerWidth, window.innerHeight, 'texture');

    this.game.add.sprite(0, 0, texture);

    for (var i = 0; i < max; i++){
        xx[i] = Math.floor(Math.random() * 800) - 400;
        yy[i] = Math.floor(Math.random() * 600) - 300;
        zz[i] = Math.floor(Math.random() * 1700) - 100;
    }


    this.menu_button  = new DRAGONFLY.MenuButton(this,   400, 500, 'menu_button1', 'world11', false, 1);
    this.buttons.push(this.menu_button);
    this.menu_button2 = new DRAGONFLY.MenuButton(this,  200, 500, 'menu_button2', 'world12', false, 2);
    this.buttons.push(this.menu_button2);
    this.menu_button3 = new DRAGONFLY.MenuButton(this,    0, 500, 'menu_button3', 'world13', false, 3);
    this.buttons.push(this.menu_button3);
    this.menu_button4 = new DRAGONFLY.MenuButton(this, -200, 500, 'menu_button4', 'maze', false, 4);
    this.buttons.push(this.menu_button4);
    this.menu_button5 = new DRAGONFLY.MenuButton(this,  400, 600, 'menu_button5', 'world5', false, 5);
    this.buttons.push(this.menu_button5);
    this.menu_button6 = new DRAGONFLY.MenuButton(this,  200, 600, 'menu_button6', 'world6', false, 6);
    this.buttons.push(this.menu_button6);
    this.menu_button7 = new DRAGONFLY.MenuButton(this,    0, 600, 'menu_button7', 'endboss', false, 7);
    this.buttons.push(this.menu_button7);
    this.menu_button8 = new DRAGONFLY.MenuButton(this, -200, 600, 'menu_button8', 'testlevel', false, 8);
    this.buttons.push(this.menu_button8);

    this.menu_shop = new DRAGONFLY.MenuButton(this, 100, 700, 'menu_shop', 'shop', false, 0);



    this.logo = this.game.add.sprite(window.innerWidth/2-230, 150, 'logo');
    this.logo.scale.setTo(0.15);
    this.logo.fixedToCamera = true;

    //this.game.add.tween(this.logo).to( { y: this.game.world.centerY }, 4000, Phaser.Easing.Bounce.Out, true);

    if(this.levelcookies){
      for (var e = 0; e < this.buttons.length; e++) {
          //console.log('INSIDE');

        var key = this.buttons.indexOf(this.buttons[e]);
        key = key+1;

        //console.log(key);

        if(key > this.currentLevel) {

          this.buttons[e].locked = true;

        //  console.log(this.buttons[e]);
          this.buttons[e].lockIt();
          //console.log('LOCKED_REAL');

        } else {
          this.buttons[e].locked = false;
        //  console.log('NOTLOCKED_REAL');
        }

      }
    }



  },
  update: function(){



    texture.clear();

for (var i = 0; i < max; i++)
{
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
    //this.state.start('Game');
    // console.log(level);
     console.log(level.selectedLevel);
    console.log('TEST');
    this.game.state.start("Game",true,false, level.selectedLevel);
    //this.game.state.start("Game",true,false, 'world2', 'music2');
  },
  gofull: function(){

    if (this.game.scale.isFullScreen){
      this.game.scale.stopFullScreen();
    } else {
      this.game.scale.startFullScreen(false);
    }

  }
};
