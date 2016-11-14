var DRAGONFLY = DRAGONFLY || {};

DRAGONFLY.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', null, false, false);

DRAGONFLY.game.state.add('Boot', DRAGONFLY.BootState);
DRAGONFLY.game.state.add('Preload', DRAGONFLY.PreloadState);
DRAGONFLY.game.state.add('Menu', DRAGONFLY.MenuState);
DRAGONFLY.game.state.add('Game', DRAGONFLY.GameState);
DRAGONFLY.game.state.add('Score', DRAGONFLY.ScoreState);
DRAGONFLY.game.state.add('Shop', DRAGONFLY.ShopState);


DRAGONFLY.game.state.start('Boot');
