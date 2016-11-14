var DRAGONFLY = DRAGONFLY || {};

//setting game configuration and loading the assets for the loading screen
DRAGONFLY.BootState = {
  init: function() {
    //loading screen will have a white background
    this.game.stage.backgroundColor = '#fff';

    //scaling options
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    //have the game centered horizontally
    // this.scale.pageAlignHorizontally = true;
    // this.scale.pageAlignVertically = true;

    //physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
  },
  preload: function() {
    //assets we'll use in the loading screen
    this.load.image('bar', 'public/assets/images/preloader-bar.png');
    this.game.load.image('star', 'public/assets/images/star2.png');
    //this.load.image('logo', 'assets/images/logo_alpha_pixels.png');
  },
  create: function() {
    var prestyle = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "left" };
    this.preText2 = this.game.add.text(this.game.world.centerX, 400, 'LOADING', prestyle);
    this.preText2.anchor.setTo(0.5);
    this.preText2.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

    this.state.start('Preload');

  }
};
