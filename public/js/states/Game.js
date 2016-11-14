var DRAGONFLY = DRAGONFLY || {};


var playerData = {
  health: 100,
  defence: 0,
  money: 0,

  ammo: 500,

  photongun_ammo: 100,
  raygun_ammo: 20,
  sniperrifle_ammo: 2,
  torpedolauncher_ammo: 2,
  shotgun_ammo: 20,
  quantumrifle_ammo: 20,
  minigun_ammo: 200,

  currentLevel: 1,
  weapondamage: 0,

  healthpacks: 0,
  shield_items:0,
  collected_rings:0,

  killed_gunmen:0,
  killed_hammers:0,
  killed_frogs:0,

  playerweapons: ['Photongun', 'Torpedolauncher', 'Sniperrifle', 'Raygun', 'Shotgun', 'Quantumrifle', 'Minigun']
};




DRAGONFLY.GameState = {
  init: function(currentLevel, levelNumber) {

    // Switch Hilfvariable für Audio am Schluss
    this.welldone_switch = true;

    // Hilfsbariablen für Default - Regular Weapon Steuerung
    this.defaultweapon_switch = true;
    this.defaultweaponback_switch = true;

    // Var für Gamepad
    this.gamepad = true;

    // Teleporter aktiv
    this.enableTeleporter = true;

    // Switch Hilfsvariable für Teleporter Fix
    this.switch = true;

    // Alle Gunmen
    this.enemies = [];

    // Alle Hammers
    this.hammers = [];

    // Alle Frogs
    this.frogs = [];

    // Alle Items
    this.items = [];

    this.autoaim = false;
    this.mute = false;

    // Hilfsvar für Waffentausch
    this.changeweapon = true;

    this.enableMenu = true;

    // Beim Start des Levels wird vom Menü die Levelnummmer übergeben
    playerData.levelNumber = levelNumber;

    // Beim Start des Levels wird vom Menü der Levelkey übergeben
    this.currentlevel = currentLevel ? currentLevel : 'maze';

    // Beim Start des Levels wird vom Menü der Musictrack übergeben (in Arbeit!)
    //this.currentmusic = currentMusic ? currentMusic : 'music';

    // Gegner folgen Spieler
    this.followingenemies  = true;

    // CollisionHandler zwischen Spielerkugeln und Gegner werden aktiviert
    this.killenemies = true;

    this.levelcookies = false;

    this.playerweapons = playerData.playerweapons;

    // Aktuelle Waffe
    this.currentweapon = 'Photongun';

    this.game.physics.startSystem(Phaser.Physics.P2JS);

    this.received_money = 0;


    // $.ajax({
    //   type : 'GET',
    //   url: APP_ROOT + 'api/game/getMoney',
    //   success: function(data){
    //       this.received_money = data.money;
    //
    //   }
    // });

//     function checkPassword() {
//     return $.ajax({
//         url: '/password',
//         data: {
//             username: $('#username').val(),
//             password: $('#password').val()
//         },
//         type: 'POST',
//         dataType: 'json'
//     });
// }

    // function testAjax() {
    //     var money;
    //     $.ajax({
    //       type : 'GET',
    //       url: APP_ROOT + 'api/game/getMoney',
    //       success: function(data){
    //             money = data.money;
    //
    //       }
    //     });
    //   return money;
    // }

    var return_first = function () {
    var tmp = null;
    $.ajax({
        'async': false,
        'type': "GET",
        'global': false,

        'url': APP_ROOT + 'api/game/getMoney',
        'success': function (data) {
            tmp = data;
        }
    });
    return tmp;
    }();

    if(return_first !== null){
      this.received_money = return_first.money;
    }



  },
  create: function() {


    this.ui_group = this.game.add.group();

    // FPS aktivieren
    this.game.time.advancedTiming = true;

    this.game.time.slowMotion = 1.0;

    //this.game.physics.startSystem(Phaser.Physics.P2JS);

    // Bei Levelstart wird Spiel nicht im Pausemode gestartet
    this.game.physics.arcade.isPaused = false;

    // Unsichtbares Sprite welches auf den Cursor gesetzt wird. Für spezielle Kamerafunktion (SHIFT-Taste). Für Kameratracking des Sprites
    this.cameramovehelp = this.game.add.sprite(80, 80);
    this.cameramovehelp.anchor.set(0.5);
    this.game.physics.enable(this.cameramovehelp, Phaser.Physics.ARCADE);

    // To listen to buttons from a specific pad listen directly on that pad game.input.gamepad.padX, where X = pad 1-4
    this.game.input.gamepad.start();
    this.pad1 = this.game.input.gamepad.pad1;

    // FullscreenMode Aktuell auf Taste 1
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;
    this.key1 = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    this.key1.onDown.add(this.gofull, this);

    // Next Weapon
    this.nextweaponkey = this.game.input.keyboard.addKey(Phaser.Keyboard.E);
    this.nextweaponkey.onDown.add(this.nextWeapon, this);

    // Previous Weapon
    this.prevweaponkey = this.game.input.keyboard.addKey(Phaser.Keyboard.Q);
    this.prevweaponkey.onDown.add(this.prevWeapon, this);

    // JSON Map Data
    this.map = this.game.add.tilemap(this.currentlevel, 20, 20);

    //  Mit Tileset verknüpfen
    this.map.addTilesetImage('sum', 'tiles');

    //  Hintergrundlayer definieren, Collisionlayer für Spieler und Bulletcollsionlayer für Kugeln (Bug, Noch in Arbeit)
    this.layer = this.map.createLayer('Background');
    this.CollisionLayer = this.map.createLayer('CollisionLayer');
    this.BulletCollisionLayer = this.map.createLayer('BulletCollisionLayer');

    // Jedes Layer wird um das 3. Fache skaliert!
    this.layer.setScale(3);
    this.CollisionLayer.setScale(3);
    this.BulletCollisionLayer.setScale(3);

    //  Resize the world
    this.CollisionLayer.resizeWorld();
    this.layer.resizeWorld();
    this.BulletCollisionLayer.resizeWorld();

    // Kollisionstiles bestimmen
    this.map.setCollisionBetween(40, 1226, true, 'CollisionLayer');
    this.map.setCollisionBetween(40, 1226, true, 'BulletCollisionLayer');

    this.game.physics.p2.convertTilemap(this.map, this.CollisionLayer);
    this.game.physics.p2.setBoundsToWorld(true, true, true, true, false);

    //  Un-comment this on to see the collision tiles
    //this.layer.debug = true;
    //this.CollisionLayer.debug = true;
    //this.BulletCollisionLayer.debug = true;

    // Gegner und Items werden aus der JSON Map geladen
    this.loadEnemies();
    //debugger;
    this.loadItems();

    // Player erstellen
    this.player = new DRAGONFLY.Player(this, this.startPoint.x, this.startPoint.y, playerData, this.currentweapon);
    this.player.body.setSize(30, 30);
    //this.game.physics.p2.enable(ship);

    // Gamemusik wird erstellt und abgespielt
    this.music = this.game.add.audio(this.currentmusic);
    this.music.play();

    // WASD Tasten belegen
    this.cursor_w = this.input.keyboard.addKey(Phaser.Keyboard.W);
    this.cursor_a = this.input.keyboard.addKey(Phaser.Keyboard.A);
    this.cursor_s = this.input.keyboard.addKey(Phaser.Keyboard.S);
    this.cursor_d = this.input.keyboard.addKey(Phaser.Keyboard.D);

    // Fire Taste definieren
    this.fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

    // PauseTaste P definieren
    this.pauseKey = this.input.keyboard.addKey(Phaser.Keyboard.P);
    this.pauseKey.onDown.add(this.togglePause, this);

    // Camerainspectmode auf SHIFT-Taste
    this.CameraKey = this.input.keyboard.addKey(Phaser.KeyCode.SHIFT);
    this.CameraKey.onDown.add(this.CameraMove, this);

    if(this.CameraKey.onDown){

    } else {

    }
    //console.log(this.CameraKey);

    // Var für Anzahl der übrig gebliebenen Gegner
    this.enemiesleft = this.enemies.length + this.hammers.length + this.frogs.length;



    // Hilfssprite bei Controllerbenützung. Auf dem Spieler wird ein Sprite gesetzt welches sich bei Gamepadstickbenutzung verschiebt. Bullet wird dann in die Richtung des Sprites geschickt
    this.myhelp = this.game.add.sprite(400, 300);
    this.myhelp.anchor.set(0.5);
    this.game.physics.enable(this.myhelp, Phaser.Physics.ARCADE);

    // ? Wahrscheinlich XBOX ICON
    // this.sprite = this.game.add.sprite(400, 300);
    // this.sprite.anchor.set(0.5);
    // this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

    // WEAPONS

    // DRAGONFLY Logo
    // this.logo = this.game.add.sprite(0, -50, 'logo');
    // this.logo.scale.setTo(0.15);
    // this.logo.fixedToCamera = true;

    // Weapon GUI
    this.weapongui = this.game.add.sprite((window.innerWidth)-720, 0, 'weapon-gui');
    this.weapongui.scale.setTo(4);
    this.game.world.bringToTop(this.weapongui);
    this.weapongui.fixedToCamera = true;
    this.ui_group.add(this.weapongui);

    this.heart_def_gui = this.game.add.sprite((window.innerWidth)-1225, 0, 'weapon-gui-heart-defence');
    this.heart_def_gui.scale.setTo(4);
    this.heart_def_gui.fixedToCamera = true;
    this.ui_group.add(this.heart_def_gui);

    this.menu_button = this.game.add.button((window.innerWidth)-200, 0, 'ingame_menu_button', this.goToGameMenu, this, 1, 0, 1);
    this.menu_button.scale.setTo(4);
    this.game.world.bringToTop(this.menu_button);
    this.menu_button.fixedToCamera = true;
    this.ui_group.add(this.menu_button);





    this.weapon_gui_name = this.game.add.bitmapText((window.innerWidth)-360, 30, 'carrier_command',this.currentweapon,15);
    this.weapon_gui_name.anchor.set(0.5);
    this.weapon_gui_name.fixedToCamera = true;
    this.ui_group.add(this.weapon_gui_name);

    this.menu_button_text = this.game.add.bitmapText((window.innerWidth)-115, 35, 'carrier_command',this.currentweapon,15);
    this.menu_button_text.anchor.set(0.5);
    this.menu_button_text.fixedToCamera = true;
    this.menu_button_text.text = 'Menu';
    this.ui_group.add(this.menu_button_text);

    this.weapon_gui_ammo = this.game.add.bitmapText((window.innerWidth)-590, 30, 'carrier_command',playerData.ammo,15);
    this.weapon_gui_ammo.anchor.set(0.5);
    this.weapon_gui_ammo.fixedToCamera = true;
    this.ui_group.add(this.weapon_gui_ammo);

    this.weapon_gui_defence = this.game.add.bitmapText((window.innerWidth)-955, 30, 'carrier_command',playerData.defence,15);
    this.weapon_gui_defence.anchor.set(0.5);
    this.weapon_gui_defence.fixedToCamera = true;
    this.ui_group.add(this.weapon_gui_defence);

    this.weapon_gui_health = this.game.add.bitmapText((window.innerWidth)-1120, 30, 'carrier_command',playerData.health,15);
    this.weapon_gui_health.anchor.set(0.5);
    this.weapon_gui_health.fixedToCamera = true;
    this.ui_group.add(this.weapon_gui_health);

    this.weapon_gui_money = this.game.add.bitmapText((window.innerWidth)-790, 30, 'carrier_command',playerData.money,15);
    this.weapon_gui_money.anchor.set(0.5);
    this.weapon_gui_money.fixedToCamera = true;
    this.ui_group.add(this.weapon_gui_money);



    this.weapon_gui_ammo_icon = this.game.add.sprite((window.innerWidth)-690, -5, 'ammo');
    this.weapon_gui_ammo_icon.scale.setTo(2);
    this.weapon_gui_ammo_icon.fixedToCamera = true;
    this.weapon_gui_ammo_icon.animations.add('ammo', [0,1,2,3,4,5,6], 7, true);
    this.weapon_gui_ammo_icon.play('ammo');
    this.ui_group.add(this.weapon_gui_ammo_icon);

    this.weapon_gui_defence_icon = this.game.add.sprite((window.innerWidth)-1025, 15, 'shield');
    this.weapon_gui_defence_icon.scale.setTo(1.3);
    this.weapon_gui_defence_icon.fixedToCamera = true;
    this.weapon_gui_defence_icon.animations.add('shield', [0,1,2,3,4,5,6], 7, true);
    this.weapon_gui_defence_icon.play('shield');
    this.ui_group.add(this.weapon_gui_defence_icon);

    this.weapon_gui_health_icon = this.game.add.sprite((window.innerWidth)-1200, 5, 'health');
    this.weapon_gui_health_icon.scale.setTo(1.8);
    this.weapon_gui_health_icon.fixedToCamera = true;
    this.weapon_gui_health_icon.animations.add('health', [0,1,2,3,4,5,6], 7, true);
    this.weapon_gui_health_icon.play('health');
    this.ui_group.add(this.weapon_gui_health_icon);

    this.weapon_gui_money_icon = this.game.add.sprite((window.innerWidth)-865, 15, 'coin_gui');
    this.weapon_gui_money_icon.scale.setTo(1.2);
    this.weapon_gui_money_icon.fixedToCamera = true;
    this.weapon_gui_money_icon.animations.add('health', [0,1,2,3,4,5,6], 7, true);
    this.weapon_gui_money_icon.play('health');
    this.ui_group.add(this.weapon_gui_money_icon);


    // this.menu_ui = this.game.add.sprite(700, 430, 'menu_ui');
    // this.menu_ui.scale.setTo(3.5);
    // this.menu_ui.anchor.set(0.5);
    // this.menu_ui.fixedToCamera = true;





    // Crosshair Ansatz
    //this.crosshair = this.game.add.sprite(this.game.input.mousePointer.x, this.game.input.mousePointer.y, 'crosshair');

    //Frogs Debug
    // for (i = 0; i < this.frogs.length; i++) {
    //   console.log(this.frogs[i]);
    //
    // }

    // Timer wird gesetzt wenn Autoaim aktiv
    if(this.autoaim === true){
      this.game.time.events.add(Phaser.Timer.SECOND * 10, this.autoaim_off, this);
    }

    // Ansatz für Autoaim Animation auf Spieler
    // this.autoaim_anim = this.game.add.sprite(this.player.x, this.player.y);
    // this.autoaim_anim.anchor.set(0.5);
    // this.autoaim_anim.animations.add('autoaim_defence', [0,1,2,3], 2, true);
    // this.game.physics.enable(this.autoaim_anim, Phaser.Physics.ARCADE);

    // Statistiken RetroFont

    this.font5 = this.game.add.retroFont('knightHawks', 31, 25, Phaser.RetroFont.TEXT_SET6, 10, 1, 1);
    this.myvar5 = this.game.add.image(20, 100, this.font5);
    this.myvar5.fixedToCamera = true;

    //this.firesound = this.game.add.audio('fire');

    //this.game.physics.p2.setBoundsToWorld(true, true, true, true, false);


  },
  update: function() {


    this.ammoleft = playerData.photongun_ammo + playerData.sniperrifle_ammo + playerData.torpedolauncher_ammo + playerData.raygun_ammo + playerData.shotgun_ammo + playerData.quantumrifle_ammo + playerData.minigun_ammo;

    this.weapon_gui_name.text = this.currentweapon;
    this.weapon_gui_defence.text = playerData.defence;
    this.weapon_gui_health.text = playerData.health;
    this.weapon_gui_money.text = playerData.money + parseInt(this.received_money);

    this.font5.text = "FPS: " + this.game.time.fps;

    if(playerData.health <= 30) {
      this.weapon_gui_health.tint =  0xFF0000;
    } else {
      this.weapon_gui_health.tint = 16777215;
    }



    if(this.changeweapon){

      switch(this.currentweapon) {
      case 'Photongun':
          this.weapon = this.game.add.weapon(30, 'bullet');
          this.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
          this.weapon.bulletLifespan = 2000;
          this.weapon.bulletSpeed = 500;
          this.weapon.bulletSpeedVariance = 50;
          this.weapon.fireRate = 60;
          this.weapon.fireRateVariance = 100;



          this.weapon.bulletAngleVariance = 10;
          this.weapon.bulletWorldWrap = false;
          this.weapon.trackSprite(this.player, 40, 0, true);

          this.weapon.weapontype = 'Photongun';

          playerData.weapondamage = 10;
          this.weapon.firesound = this.game.add.audio('fire');

          this.changeweapon = false;
          break;

      case 'Defaultgun':
          this.weapon = this.game.add.weapon(5, 'defaultbullet');
          this.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
          this.weapon.bulletLifespan = 2000;
          this.weapon.bulletSpeed = 500;
          this.weapon.fireRate = 400;
          this.weapon.bulletWorldWrap = false;
          this.weapon.weapontype = 'Defaultgun';
          this.weapon.trackSprite(this.player, 40, 0, true);
          playerData.weapondamage = 10;
          this.weapon.firesound = this.game.add.audio('fire');

          this.changeweapon = false;
          break;

      case 'Raygun':
          this.weapon = this.game.add.weapon(5, 'raybullet');
          this.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
          this.weapon.bulletLifespan = 2000;
          this.weapon.bulletSpeed = 500;
          this.weapon.fireRate = 200;
          this.weapon.bulletWorldWrap = false;
          this.weapon.weapontype = 'Raygun';
          this.weapon.trackSprite(this.player, 40, 0, true);
          this.changeweapon = false;
          playerData.weapondamage = 40;
          this.weapon.firesound = this.game.add.audio('fire');
          this.weapon.multiFire = true;
          break;

      case 'Minigun':
          this.weapon = this.game.add.weapon(30, 'shotgun_ammo');
          this.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
          this.weapon.bulletLifespan = 2000;
          this.weapon.bulletSpeed = 500;
          this.weapon.fireRate = 40;
          this.weapon.bulletWorldWrap = false;
          this.weapon.weapontype = 'Minigun';
          this.weapon.bulletAngleVariance = 3;
          this.weapon.trackSprite(this.player, 40, 0, true);
          this.changeweapon = false;
          playerData.weapondamage = 20;
          this.weapon.firesound = this.game.add.audio('fire');
          this.weapon.multiFire = true;
          break;

      case 'Shotgun':
          this.weapon = this.game.add.weapon(20, 'shotgun_ammo');
          this.weapon.multiFire = true;
          this.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
          this.weapon.bulletLifespan = 500;
          this.weapon.bulletSpeed = 500;
          this.weapon.bulletAngleVariance = 10;
          this.weapon.fireRate = 1000;
          this.weapon.bulletWorldWrap = false;
          this.weapon.weapontype = 'Shotgun';
          playerData.weapondamage = 20;
          //this.trackRotation = false;
          this.weapon.trackSprite(this.player, 40, 0, true);
          this.changeweapon = false;
          this.weapon.firesound = this.game.add.audio('fire');
          break;

      case 'Quantumrifle':
          this.weapon = this.game.add.weapon(40, 'quantum_ammo');
          this.weapon.setBulletFrames(0, 80, true, true);
          this.weapon.multiFire = true;
          this.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
          this.weapon.bulletLifespan = 1000;
          this.weapon.bulletSpeed = 500;
          this.weapon.bulletAngleVariance = 360;
          this.weapon.fireRate = 1000;
          this.weapon.bulletWorldWrap = false;
          this.weapon.weapontype = 'Quantumrifle';
          playerData.weapondamage = 100;
          //this.trackRotation = false;
          this.weapon.trackSprite(this.player, 40, 0, true);
          this.changeweapon = false;
          this.weapon.firesound = this.game.add.audio('fire');
          break;



      case 'Sniperrifle':
          this.weapon = this.game.add.weapon(1, 'shotgun_ammo');
          this.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
          this.weapon.bulletLifespan = 2000;
          this.weapon.bulletSpeed = 2000;
          this.weapon.bulletAngleVariance = 0;
          //this.weapon.fireRate = 400;
          this.weapon.bulletWorldWrap = false;
          this.weapon.trackSprite(this.player, 40, 0, true);
          playerData.weapondamage = 100;
          this.weapon.weapontype = 'Sniperrifle';
          this.changeweapon = false;
          this.weapon.firesound = this.game.add.audio('fire');
          this.weapon.fireRate = 2000;
          break;

      case 'Torpedolauncher':
          this.weapon = this.game.add.weapon(1, 'torpedo');
          this.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
          this.weapon.bulletLifespan = 2000;
          this.weapon.bulletSpeed = 800;
          this.weapon.bulletAngleVariance = 0;
          this.weapon.weapontype = 'Torpedolauncher';
          this.weapon.fireRate = 2000;
          this.weapon.bulletWorldWrap = false;
          this.weapon.trackSprite(this.player, 40, 0, true);
          playerData.weapondamage = 1000;
          this.changeweapon = false;
          //console.log('TORPEDOLAUNCHER ACTIVE');
          this.weapon.firesound = this.game.add.audio('fire');
          break;

      default:

      }
  }

  switch (this.weapon.weapontype) {
    case 'Photongun':
      this.weapon_gui_ammo.text = playerData.photongun_ammo;
      break;
    case 'Raygun':
      this.weapon_gui_ammo.text = playerData.raygun_ammo;
      break;
    case 'Shotgun':
      this.weapon_gui_ammo.text = playerData.shotgun_ammo;
      break;
    case 'Minigun':
      this.weapon_gui_ammo.text = playerData.minigun_ammo;
      break;
    case 'Quantumrifle':
      this.weapon_gui_ammo.text = playerData.quantumrifle_ammo;
      break;
    case 'Torpedolauncher':
      this.weapon_gui_ammo.text = playerData.torpedolauncher_ammo;
      break;
    case 'Sniperrifle':
      this.weapon_gui_ammo.text = playerData.sniperrifle_ammo;
      break;
    default:

  }


    // Wenn kein Gegner mehr übrig -> Spiel pausieren -> Ausfaden & 4 Sek warten -> Weiter zur Punkteauflistung
    if(this.enemiesleft === 0){

      this.welldone = this.game.add.audio('welldone');

      if(this.welldone_switch){
        this.welldone.play();
      }

      this.welldone_switch = false;


      this.game.physics.arcade.isPaused = true;
      //this.game.time.slowMotion = 5.0;
      this.playDuration = Math.round(this.game.time.totalElapsedSeconds() * 10) / 10;
      this.game.camera.fade(0x000000, 4000);
      this.game.time.events.add(Phaser.Timer.SECOND * 4, this.nextLevel, this);
    }

    // HIER NOCH AUF VAR ÜBERPRÜFEN
    // Kamerahilfe wird aktualisiert (auf Cursor), (SHIFT-Taste)
    if(this.game.physics.arcade.distanceToPointer(this.cameramovehelp) <= 200){
      this.game.physics.arcade.moveToPointer(this.cameramovehelp, 0);
    } else {
      this.game.physics.arcade.moveToPointer(this.cameramovehelp, 800);
    }


    // Wenn keine Munition mehr -> dann auf Defaultwaffe wechseln
    if( this.ammoleft === 0 || this.ammoleft < 0){
      if(this.defaultweapon_switch){
        playerData.ammo = 0;

        this.currentweapon = 'Defaultgun';
        this.changeweapon = true;

        this.defaultweapon_switch = false;
        this.defaultweaponback_switch = true;
      }

    } else {
        // console.log('NEAR SWITCH BACK');
        // console.log('this.defaultweaponback_switch: ' + this.defaultweaponback_switch);
        // console.log('this.defaultweapon_switch: ' + this.defaultweapon_switch);

      if(this.defaultweaponback_switch && this.defaultweapon_switch === false){
        // console.log('SWITCH BACK');

        this.currentweapon = 'Photongun';
        this.changeweapon = true;

        this.defaultweaponback_switch = false;
        this.defaultweapon_switch = true;
      }
    }






    // Autoaim Animation wird aktualisiert (auf Spieler)
    // this.autoaim_anim.x = this.player.x;
    // this.autoaim_anim.y = this.player.y;

    // Autoaim Var wird überprüft
    if(this.autoaim === true){
      this.game.time.events.add(Phaser.Timer.SECOND * 10, this.autoaim_off, this);
    }

    // Healthbar und Defencebar werden upgedated!
    this.player.refreshHealthbar();
    this.player.refreshDefencebar();
    this.player.refreshAmmobar(this.currentweapon);


    // Gegner übrig wird geupdated
    this.enemiesleft = this.enemies.length + this.hammers.length + this.frogs.length;

    // // FPS aktivieren
    // this.game.time.advancedTiming = true;

    // Das Gehirn des Hammers
    for (i = 0; i < this.hammers.length; i++) {

        var distance_player_hammer = Phaser.Math.distance(this.player.x, this.player.y, this.hammers[i].x , this.hammers[i].y);

        if(distance_player_hammer <= 600){
          this.current_target = this.hammers[i];
        }

        this.hammers[i].refreshHealthbar();
        //this.hammers[i].rotation = this.game.physics.arcade.angleToXY(this.player, this.hammers[i].x, this.hammers[i].y);

        // Sobald der Hammer getroffenwird vergrößert sich sein Aktionsradius
        if(this.hammers[i].health <= 990){
          this.hammerradius = 900;
        } else {
          this.hammerradius = 300;
        }

        // Überprüfung auf Aktionsradius
        if(distance_player_hammer <= this.hammerradius && this.followingenemies){

          // Ansatz für Bugfix
          //
          // if(this.hammers[i].body.velocity.x === 0 && this.hammers[i].body.velocity.y === 0) {
          //   console.log('STEHT');
          //   this.hammers[i].play('enemie_hammer_walk');
          // } else {
          //   this.hammers[i].animations.stop();
          //   //this.hammers[i].frame = 0;
          // }

          // Hammer bewegt sich auf Spieler zu , Nach Oben gesetzt
          this.game.physics.arcade.moveToXY(this.hammers[i], this.player.x, this.player.y, 160);

          // Gehanimation wird abgespielt
          this.hammers[i].play('enemie_hammer_walk', 4, false);

          // Rotation des Hammers auf den Winkel zum Spieler
          this.hammers[i].rotation = this.game.physics.arcade.angleToXY(this.player, this.hammers[i].x, this.hammers[i].y);

        } else {
          this.hammers[i].animations.stop();
        }

        // Stoppt gegner wenn Radius > 550px
        if(distance_player_hammer >= 901 && this.followingenemies){
          this.hammers[i].body.velocity.setTo(0, 0);
          //this.hammers[i].rotation = this.game.physics.arcade.angleToXY(this.player, this.hammers[i].x, this.hammers[i].y);
        }

        // Wenn Gegner Player berührt
        if(distance_player_hammer <= 40 && this.followingenemies){

          // Hammer wird gestoppt
          this.hammers[i].body.velocity.setTo(0, 0);

          // Animation wird abgespielt
          this.hammers[i].play('enemie_hammer_hit', 10, false);

          var blood_hit = this.game.add.sprite(this.player.x, this.player.y, 'blood_hit');
          blood_hit.scale.setTo(4);
          blood_hit.anchor.set(0.5);
          blood_hit.animations.add('run');
          blood_hit.animations.play('run', 30, false, true);



            if(playerData.defence === 0){

              // Kampf

              // Wenn Spieler tot ist dann starte das Spiel neu
              if( playerData.health === 0 || playerData.health < 0){
                playerData.health = 0;
                this.game.state.start("Game",true,false, this.currentlevel);
                playerData.health = 100;
                playerData.ammo = 500;
                playerData.defence = 0;
                //this.music.stop();
              } else {
                // Roter Blitz bei Hit
                this.game.camera.flash(0xff0000, 100);
                playerData.health = playerData.health-1;
              }
            } else {
              this.game.camera.flash(0xff0000, 100);
              playerData.defence -= 10;
            }
        //  }


        } else {
          //this.hammers[i].animations.stop();
          // this.hammers[i].frame = 0;
        }

        this.game.physics.arcade.collide(this.weapon.bullets, this.hammers[i], this.collisionHandlerEnemieHammer, null, this);
        this.game.physics.arcade.collide(this.hammers[i], this.CollisionLayer);

    }



  // Autoaim + Enemies running
  for (i = 0; i < this.enemies.length; i++) {

        var distance_player_gunman = Phaser.Math.distance(this.player.x, this.player.y, this.enemies[i].x , this.enemies[i].y);

        if(distance_player_gunman <= 600){
          this.current_target = this.enemies[i];
        }

        this.enemies[i].refreshHealthbar();

        this.enemies[i].rotation = this.game.physics.arcade.angleToXY(this.player, this.enemies[i].x, this.enemies[i].y);

        if(this.enemies[i].health <= 95){
          this.enemieradius = 900;
        } else {
          this.enemieradius = 600;
        }


    // Gegner Bewegen sich Richtung Player ab 350px Radius
    if(distance_player_gunman <= this.enemieradius && this.followingenemies){

      this.game.physics.arcade.moveToXY(this.enemies[i], this.player.x, this.player.y, 160);
      this.enemies[i].play('enemie_walk', 10, false);

      // Nach Oben Gesetzt!
      //this.enemies[i].rotation = this.game.physics.arcade.angleToXY(this.player, this.enemies[i].x, this.enemies[i].y);

      // this.enemies[i].animations.stop();
      // this.enemies[i].frame = 0;


        this.enemies[i].enemie_weapon.fireAtSprite(this.player);
        //this.enemies[i].play('enemie_shoot', 10, false);

        if(this.enemies[i].enemie_weapon.shots > 0){
          this.enemies[i].firesound.play();
        }
        this.enemies[i].enemie_weapon.resetShots(0);


    }

    // Stoppt gegner wenn Radius > 550px
    if(distance_player_gunman >= 901 && this.followingenemies){
      this.enemies[i].body.velocity.setTo(0, 0);
      // this.game.physics.arcade.moveToXY(this.enemies[i], this.player.x, this.player.y, 10);
      // this.enemies[i].play('enemie_walk');
    }

    // Wenn gegner Player berührt
    if(distance_player_gunman <= 10 && this.followingenemies){
      this.enemies[i].body.velocity.setTo(0, 0);
    }


    this.game.physics.arcade.collide(this.enemies[i].enemie_weapon.bullets, this.player, this.collisionHandlerHero, null, this);
    this.game.physics.arcade.collide(this.enemies[i].enemie_weapon.bullets, this.BulletCollisionLayer, this.collisionHandlerEnemieBullet, null, this);
    this.game.physics.arcade.collide(this.enemies[i], this.CollisionLayer);
    this.game.physics.arcade.collide(this.weapon.bullets, this.enemies[i], this.collisionHandlerEnemie, null, this);


  }




  // Autoaim + Enemies running
  for (i = 0; i < this.frogs.length; i++) {



    var distance_player_frog = Phaser.Math.distance(this.player.x, this.player.y, this.frogs[i].x , this.frogs[i].y);

    if(distance_player_frog <= 600){
      this.current_target = this.frogs[i];
    }


    this.frogs[i].refreshHealthbar();
    this.frogs[i].rotation = this.game.physics.arcade.angleToXY(this.player, this.frogs[i].x, this.frogs[i].y);

        if(this.frogs[i].health <= 24){
          this.enemieradius_frog = 900;
        } else {
          this.enemieradius_frog = 600;
        }



    // Gegner Bewegen sich Richtung Player ab 350px Radius
    if(distance_player_frog <= this.enemieradius_frog && this.followingenemies){

      this.game.physics.arcade.moveToXY(this.frogs[i], this.player.x, this.player.y, 325);
      //accelerateToObject(this.frogs[i],this.player,30);
      this.frogs[i].play('frog_walk');

    } else {
      this.frogs[i].body.velocity.setTo(0, 0);
    }

    // Stoppt gegner wenn Radius > 550px
    if(distance_player_frog >= 601 && this.followingenemies){
      this.frogs[i].body.velocity.setTo(0, 0);
      // this.game.physics.arcade.moveToXY(this.enemies[i], this.player.x, this.player.y, 10);
      // this.enemies[i].play('enemie_walk');
    }

    // Wenn gegner Player berührt
    if(distance_player_frog <= 20 && this.followingenemies){
      this.frogs[i].body.velocity.setTo(0, 0);

      this.frogs[i].play('frog_attack');

      if(playerData.defence === 0){

        // Kampf

        // Wenn Spieler tot ist dann starte das Spiel neu
        if( playerData.health === 0 || playerData.health < 0){
          playerData.health = 0;
        this.game.state.start("Game",true,false, this.currentlevel);
          playerData.health = 100;
          playerData.ammo = 500;
          playerData.defence = 0;
          //this.music.stop();
        } else {
          this.game.camera.flash(0xff0000, 100);
          playerData.health = playerData.health-1;
        }
      } else {
        playerData.defence -= 10;
        this.game.camera.flash(0xff0000, 100);
      }

    }

    this.game.physics.arcade.collide(this.weapon.bullets, this.frogs[i], this.collisionHandlerFrog, null, this);
    //this.game.physics.arcade.collide(this.frogs[i], this.CollisionLayer);


  }






// Schießmechanismus für Gamepad oder für Maus und Autoaim
if(this.gamepadConnected){

  this.player.rotation = (this.game.physics.arcade.angleToXY(this.myhelp, this.player.x, this.player.y))+3;

} else if(this.autoaim && this.current_target){

  this.player.rotation = (this.game.physics.arcade.angleToXY(this.player, this.current_target.x, this.current_target.y));

} else {
  this.player.rotation = this.game.physics.arcade.angleToPointer(this.player);
}




  this.myhelp.x = this.player.x;
  this.myhelp.y = this.player.y;


  // Spieler stoppt nach Bewegung wieder
  this.player.body.velocity.set(0);


  //########

  // // Pad "connected or not" indicator
  //   if (this.game.input.gamepad.supported && this.game.input.gamepad.active && this.pad1.connected)
  //   {
  //       this.gamepadConnected = true;
  //       this.indicator.animations.frame = 0;
  //   }
  //   else
  //   {
  //       this.indicator.animations.frame = 1;
  //       this.gamepadConnected = false;
  //   }
  //
  //   // if(this.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) || this.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) || this.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_UP) || this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y)){
  //   //   this.player.play('walk');
  //   // } else {
  //   //   this.player.animations.stop();
  //   // }
  //
  //   // Controls
  //   if (this.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1)
  //   {
  //
  //     this.player.body.velocity.x = -300;
  //     this.player.play('walk');
  //
  //   }
  //   else if (this.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1)
  //   {
  //     this.player.body.velocity.x = 300;
  //     this.player.play('walk');
  //   }
  //
  //   if (this.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_UP) || this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1)
  //   {
  //     this.player.body.velocity.y = -300;
  //     this.player.play('walk');
  //   }
  //   else if (this.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN) || this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1)
  //   {
  //     this.player.body.velocity.y = 300;
  //     this.player.play('walk');
  //   }
  //
  //
  //
  //
  //
  //
  //   if (this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X) < -0.1){
  //     this.myhelp.x -= 100;
  //     //this.player.angle -= 45;
  //     //console.log('walk');
  //     //this.player.rotation = (this.game.physics.arcade.angleToXY(this.myhelp, this.player.x, this.player.y) + 45);
  //
  //   }
  //   if (this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X) > 0.1){
  //     this.myhelp.x += 100;
  //     //console.log('right');
  //     //this.player.angle = 0;
  //     //this.player.rotation = (this.game.physics.arcade.angleToXY(this.myhelp, this.player.x, this.player.y) + 90);
  //   }
  //
  //
  //
  //   if (this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_Y) < -0.1)
  //   {
  //     this.myhelp.y -= 100;
  //     //this.player.rotation = (this.game.physics.arcade.angleToXY(this.myhelp, this.player.x, this.player.y) + 90);
  //     //console.log('up');
  //
  //   }
  //   if (this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_Y) > 0.1)
  //   //this.player.rotation = (this.game.physics.arcade.angleToXY(this.myhelp, this.player.x, this.player.y) + 90);
  //   {
  //     this.myhelp.y += 100;
  //     //console.log('down');
  //
  //   }
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //   if (this.pad1.justPressed(Phaser.Gamepad.XBOX360_RIGHT_TRIGGER))
  //   {
  //     if(this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_Y) > 0.1 || this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_Y) < -0.1 || this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X) > 0.1 || this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X) < -0.1){
  //       //this.fire(this.gamepad);
  //       this.weapon.fireAtSprite(this.myhelp);
  //       //this.weapon.fire();
  //     }
  //
  //   }
  //
  //   if (this.pad1.justReleased(Phaser.Gamepad.XBOX360_B))
  //   {
      //  // this.sprite.scale.x += 0.01;
      //  // this.sprite.scale.y = sprite.scale.x;
  //   }
  //
  //   if (this.pad1.connected)
  //   {
  //       this.rightStickX = this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X);
  //       this.rightStickY = this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_Y);
  //
  //       if (this.rightStickX)
  //       {
  //           //sprite.x += rightStickX * 10;
  //       }
  //
  //       if (this.rightStickY)
  //       {
  //           //sprite.y += rightStickY * 10;
  //       }
  //   }



  for (i = 0; i < this.items.length; i++) {
    this.game.physics.arcade.overlap(this.player, this.items[i], this.collisionHandlerItem, null, this);
  }

  this.game.physics.arcade.collide(this.weapon.bullets, this.BulletCollisionLayer, this.collisionHandler, null, this);

  // XBOX ICON SPRITE?
  // this.sprite.x = this.player.x;
  // this.sprite.y = this.player.y;
  // this.sprite.rotation = this.player.rotation;
  // this.sprite.rotation = this.player.rotation;


  if (this.game.input.activePointer.isDown){


        if((this.ammoleft > 0 || this.currentweapon == 'Defaultgun') && this.game.physics.arcade.isPaused !== true){


        if(this.ammoleft !== 0 || this.ammoleft > 0){

          this.fire_switch = false;

          switch (this.weapon.weapontype) {
            case 'Photongun':
                if(playerData.photongun_ammo > 0){
                  playerData.photongun_ammo -= this.weapon.shots;
                  this.fire_switch = true;
                }
              break;
            case 'Raygun':
                if(playerData.raygun_ammo > 0){
                    playerData.raygun_ammo -= this.weapon.shots;
                    this.fire_switch = true;
                  }
              break;
            case 'Shotgun':
                if(playerData.shotgun_ammo > 0){
                    playerData.shotgun_ammo -= this.weapon.shots;
                    this.fire_switch = true;
                  }
              break;
            case 'Minigun':
                if(playerData.minigun_ammo > 0){
                    playerData.minigun_ammo -= this.weapon.shots;
                    this.fire_switch = true;
                  }
              break;
            case 'Quantumrifle':
                if(playerData.quantumrifle_ammo > 0){
                    playerData.quantumrifle_ammo -= this.weapon.shots;
                    this.fire_switch = true;
                  }
              break;
            case 'Torpedolauncher':
                if(playerData.torpedolauncher_ammo > 0){
                    playerData.torpedolauncher_ammo -= this.weapon.shots;
                    this.fire_switch = true;
                }
              break;
            case 'Sniperrifle':
                if(playerData.sniperrifle_ammo > 0){
                    playerData.sniperrifle_ammo -= this.weapon.shots;
                    this.fire_switch = true;
                }
              break;
            default:

          }

          if(this.weapon.shots > 0){
            this.weapon.firesound.play();
          }

          this.weapon.resetShots(0);

        } else {

          if(this.weapon.shots > 0){
            this.weapon.firesound.play();
          }

          this.weapon.resetShots(0);
        }


        if(this.autoaim && this.current_target && this.fire_switch){
            this.weapon.fireAtSprite(this.current_target);
            this.weapon.bulletAngleVariance = 0;
        } else {
            if(this.fire_switch){
              switch (this.currentweapon) {
                case 'Shotgun':
                  this.weapon.fire();
                  this.weapon.fire();
                  this.weapon.fire();
                  this.weapon.fire();
                  this.weapon.fire();
                  this.weapon.fire();
                  this.weapon.fire();
                  this.weapon.fire();
                  this.weapon.fire();
                  this.weapon.fire();
                  break;
                case 'Quantumrifle':
                  this.weapon.fire();
                  this.weapon.fire();
                  this.weapon.fire();
                  this.weapon.fire();
                  this.weapon.fire();
                  this.weapon.fire();
                  this.weapon.fire();
                  this.weapon.fire();
                  this.weapon.fire();
                  this.weapon.fire();
                  this.weapon.fire();
                  this.weapon.fire();
                  this.weapon.fire();
                  this.weapon.fire();
                  this.weapon.fire();
                  this.weapon.fire();
                  this.weapon.fire();
                  this.weapon.fire();
                  this.weapon.fire();
                  this.weapon.fire();
                  this.weapon.fire();
                  this.weapon.fire();
                  this.weapon.fire();
                  this.weapon.fire();
                  this.weapon.fire();
                  break;
                default:
                  this.weapon.fire();

              }



            }


            if(this.currentweapon === 'Photongun'){
              this.weapon.bulletAngleVariance = 10;
            }

        }

      }

    }


  this.game.physics.arcade.collide(this.player, this.CollisionLayer);

  if(this.cursor_a.isDown || this.cursor_d.isDown || this.cursor_s.isDown || this.cursor_w.isDown){
    this.player.play('walk');
  } else {
    this.player.animations.stop();
  }

  if (this.cursor_a.isDown){
      this.player.body.velocity.x = -300;
      //this.player.play('walk');
      this.myhelp.x -= 30;
  }

  if (this.cursor_d.isDown){
      this.player.body.velocity.x = 300;
      //this.player.play('walk');
      this.myhelp.x += 30;
      }

  if (this.cursor_w.isDown){

      this.player.body.velocity.y = -300;
      //this.player.play('walk');
      this.myhelp.y -= 30;
      //console.log('up');
      //console.log(this.player.play('walk'));
    }

  if (this.cursor_s.isDown){

      this.player.body.velocity.y = 300;
      //this.player.play('walk');
      this.myhelp.y += 30;
  }else {
      //this.player.animations.stop();
  }



  //this.sprite.rotation = this.game.physics.arcade.angleToPointer(this.sprite);
  //this.myhelp.rotation = this.game.physics.arcade.angleToXY(this.myhelp, this.player.x, this.player.y);

  this.game.world.bringToTop(this.ui_group);


},

  collisionHandlerItem: function(bullet,alien){

    if(alien.type == 'teleport_A' && this.enableTeleporter === true){

      this.teleportsound = this.game.add.audio('teleport');
      this.teleportsound.play();

      this.enableTeleporter = false;
      this.game.time.events.add(Phaser.Timer.SECOND * 2, this.enableTeleporterFunction, this);

      this.player.x = this.teleport_B.x;
      this.player.y = this.teleport_B.y;

    }

    if(alien.type == 'teleport_B' && this.enableTeleporter === true){

      this.teleportsound = this.game.add.audio('teleport');
      this.teleportsound.play();

      this.enableTeleporter = false;
      this.game.time.events.add(Phaser.Timer.SECOND * 2, this.enableTeleporterFunction, this);

      this.player.x = this.teleport_A.x;
      this.player.y = this.teleport_A.y;
    }

    if(alien.type == 'teleport_C' && this.enableTeleporter === true){

      this.teleportsound = this.game.add.audio('teleport');
      this.teleportsound.play();

      this.enableTeleporter = false;
      this.game.time.events.add(Phaser.Timer.SECOND * 2, this.enableTeleporterFunction, this);

      this.player.x = this.teleport_D.x;
      this.player.y = this.teleport_D.y;
    }

    if(alien.type == 'teleport_D' && this.enableTeleporter === true){

      this.teleportsound = this.game.add.audio('teleport');
      this.teleportsound.play();

      this.enableTeleporter = false;
      this.game.time.events.add(Phaser.Timer.SECOND * 2, this.enableTeleporterFunction, this);

      this.player.x = this.teleport_C.x;
      this.player.y = this.teleport_C.y;
    }


    if(alien.type == 'health'){
      if(playerData.health == 100){
        playerData.health += 0;

      } else {
        playerData.health += 25;
        playerData.healthpacks++;
        this.healthsound = this.game.add.audio('health');
        this.healthsound.play();
      }
      alien.destroy();
    }

    if(alien.type == 'ammo'){


      switch (this.weapon.weapontype) {
        case 'Photongun':
          if(playerData.photongun_ammo > 2000){
            playerData.photongun_ammo = 2000;
          } else {
            playerData.photongun_ammo += 500;
            if(playerData.photongun_ammo > 2000){
              playerData.photongun_ammo = 2000;
            }
          }
          break;
        case 'Raygun':
          if(playerData.raygun_ammo > 500){
            playerData.raygun_ammo = 500;
          } else {
            playerData.raygun_ammo += 100;
            if(playerData.raygun_ammo > 500){
              playerData.raygun_ammo = 500;
            }
          }
          break;
        case 'Shotgun':
          if(playerData.shotgun_ammo > 500){
            playerData.shotgun_ammo = 500;
          } else {
            playerData.shotgun_ammo += 100;
            if(playerData.shotgun_ammo > 500){
              playerData.shotgun_ammo = 500;
            }
          }
          break;
        case 'Minigun':
          if(playerData.minigun_ammo > 500){
            playerData.minigun_ammo = 500;
          } else {
            playerData.minigun_ammo += 100;
            if(playerData.minigun_ammo > 500){
              playerData.minigun_ammo = 500;
            }
          }
          break;
        case 'Quantumrifle':
          if(playerData.quantumrifle_ammo > 500){
            playerData.quantumrifle_ammo = 500;
          } else {
            playerData.quantumrifle_ammo += 100;
            if(playerData.quantumrifle_ammo > 500){
              playerData.quantumrifle_ammo = 500;
            }
          }
          break;
        case 'Torpedolauncher':
          if(playerData.torpedolauncher_ammo > 10){
            playerData.torpedolauncher_ammo = 10;
          } else {
            playerData.torpedolauncher_ammo += 2;
            if(playerData.torpedolauncher_ammo > 10){
              playerData.torpedolauncher_ammo = 10;
            }
          }
          break;
        case 'Sniperrifle':
          if(playerData.sniperrifle_ammo > 10){
            playerData.sniperrifle_ammo = 10;
          } else {
            playerData.sniperrifle_ammo += 2;
            if(playerData.sniperrifle_ammo > 10){
              playerData.sniperrifle_ammo = 10;
            }
          }
          break;
        default:

      }

        this.ammosound = this.game.add.audio('ammo_sound');
        this.ammosound.play();


      alien.destroy();
    }

    if(alien.type == 'shield'){
      if(playerData.defence > 100){
        playerData.defence = 100;
      } else {
        playerData.defence += 100;
        if(playerData.defence > 100){
          playerData.defence = 100;
        }
        playerData.shield_items++;
        this.shieldsound = this.game.add.audio('shield');
        this.shieldsound.play();
      }
      alien.destroy();
    }

    if(alien.type == 'coin'){
      playerData.money += 10;
      this.coinsound = this.game.add.audio('coin');
      this.coinsound.play();
      alien.destroy();
    }

    if(alien.type == 'ring'){
      playerData.money += 100;
      playerData.collected_rings++;
      this.coinsound = this.game.add.audio('coin');
      this.coinsound.play();
      alien.destroy();
    }

    if(alien.type == 'autoaim'){
      this.autoaim = true;
      this.autoaimenabled = this.game.add.audio('autoaim_enabled');
      this.autoaimenabled.play();

      alien.destroy();
    }


  },
  collisionHandlerEnemieHammer: function(bullet,alien){

    var index = this.hammers.indexOf(bullet);
    bullet.health -= playerData.weapondamage;

    // Kugel wird zerstört, ACHTUNG destroy() entfernt die Kugel für immer!
    alien.kill();

    var blood_hit = this.game.add.sprite(bullet.x, bullet.y, 'blood_hit');
    blood_hit.scale.setTo(4);
    blood_hit.anchor.set(0.5);
    blood_hit.animations.add('run');
    blood_hit.animations.play('run', 30, false, true);

    this.explosionsound = this.game.add.audio('explosionsound');
    this.explosionsound.play();

    //console.log(bullet.tint);

    bullet.tint = 0xFF0000;
    this.game.time.events.add(Phaser.Timer.SECOND * 0.1, this.tint_off, this, bullet);


    // bullet.tint = 16777215;

    if(bullet.health === 0 || bullet.health < 0) {
      this.hammers.splice(index, 1);
      playerData.killed_hammers++;

      // Coin erzeugen
      elementObj = new DRAGONFLY.Item(this, bullet.x, bullet.y, 'coin', 'coin');
      elementObj.body.setSize(30, 30);
      elementObj.animations.add('spin', [0,1,2,3,4,5,6,7], 10, true);
      elementObj.play('spin');
      this.items.push(elementObj);

      bullet.visible = false;
      bullet.healthBar.kill();
      bullet.kill();
      alien.kill();

      var explosion_dead = this.game.add.sprite(bullet.x, bullet.y, 'kaboom');
      explosion_dead.anchor.set(0.5);
      explosion_dead.animations.add('run');
      explosion_dead.animations.play('run', 30, false, true);

      this.explosionsound = this.game.add.audio('explosionsound');
      this.explosionsound.play();
    }


    if(this.currentweapon == "Torpedolauncher"){
      var explosion = this.game.add.sprite(bullet.x, bullet.y, 'kaboom');
      explosion.anchor.set(0.5);
      explosion.animations.add('run');
      explosion.animations.play('run', 30, false, true);

      this.explosionsound = this.game.add.audio('explosionsound');
      this.explosionsound.play();
    }

  },
  begin: function(){
    //Funktion welche 2 Sek nach Spielstart eine Ansage macht!
  },
  collisionHandlerFrog: function(bullet, alien){

    // Kugel wird zerstört, ACHTUNG destroy() entfernt die Kugel für immer!
    alien.kill();

    var blood_hit = this.game.add.sprite(bullet.x, bullet.y, 'blood_hit');
    blood_hit.scale.setTo(2);
    blood_hit.anchor.set(0.5);
    blood_hit.animations.add('run');
    blood_hit.animations.play('run', 30, false, true);

    bullet.tint = 0xFF0000;
    this.game.time.events.add(Phaser.Timer.SECOND * 0.1, this.tint_off, this, bullet);

    var index = this.frogs.indexOf(bullet);

    bullet.health -= playerData.weapondamage;


    if(bullet.health === 0 || bullet.health < 0) {

      this.frogs.splice(index, 1);
      playerData.killed_frogs++;
      // Coin erzeugen
      elementObj = new DRAGONFLY.Item(this, bullet.x, bullet.y, 'coin', 'coin');
      elementObj.body.setSize(30, 30);
      elementObj.animations.add('spin', [0,1,2,3,4,5,6,7], 10, true);
      elementObj.play('spin');
      this.items.push(elementObj);

      bullet.healthBar.kill();
      bullet.kill();

      var explosion_dead = this.game.add.sprite(bullet.x, bullet.y, 'kaboom');
      explosion_dead.anchor.set(0.5);
      explosion_dead.animations.add('run');
      explosion_dead.animations.play('run', 30, false, true);

      this.explosionsound = this.game.add.audio('explosionsound');
      this.explosionsound.play();


    }


    if(this.currentweapon == "Torpedolauncher"){
      var explosion = this.game.add.sprite(bullet.x, bullet.y, 'kaboom');
      explosion.anchor.set(0.5);
      explosion.animations.add('run');
      explosion.animations.play('run', 30, false, true);

      this.explosionsound = this.game.add.audio('explosionsound');
      this.explosionsound.play();
    }

  },
  collisionHandlerEnemie: function(bullet, alien){

    // Kugel wird zerstört, ACHTUNG destroy() entfernt die Kugel für immer!
    alien.kill();

    var blood_hit = this.game.add.sprite(bullet.x, bullet.y, 'blood_hit');
    blood_hit.scale.setTo(3);
    blood_hit.anchor.set(0.5);
    blood_hit.animations.add('run');
    blood_hit.animations.play('run', 30, false, true);

    bullet.tint = 0xFF0000;
    this.game.time.events.add(Phaser.Timer.SECOND * 0.1, this.tint_off, this, bullet);

    var index = this.enemies.indexOf(bullet);
     //console.log(index);
    //console.log(bullet);
    //console.log(bullet.health);

    // DIE Kugel wird zerstört
    //alien.kill();
    bullet.health -= playerData.weapondamage;


    if(bullet.health === 0 || bullet.health < 0) {
      this.enemies.splice(index, 1);
      playerData.killed_gunmen++;
      // Coin erzeugen
      elementObj = new DRAGONFLY.Item(this, bullet.x, bullet.y, 'coin', 'coin');
      elementObj.body.setSize(30, 30);
      elementObj.animations.add('spin', [0,1,2,3,4,5,6,7], 10, true);
      elementObj.play('spin');
      this.items.push(elementObj);

      bullet.enemie_weapon.bullets.destroy();
      bullet.healthBar.kill();
      bullet.kill();
      alien.kill();

      var explosion_dead = this.game.add.sprite(bullet.x, bullet.y, 'kaboom');
      explosion_dead.anchor.set(0.5);
      explosion_dead.animations.add('run');
      explosion_dead.animations.play('run', 30, false, true);

      this.explosionsound = this.game.add.audio('explosionsound');
      this.explosionsound.play();


    }


    //console.log('Gegner: ' + this.enemies.length + ' von 6');

    if(this.currentweapon == "Torpedolauncher"){
      var explosion = this.game.add.sprite(bullet.x, bullet.y, 'kaboom');
      explosion.anchor.set(0.5);
      explosion.animations.add('run');
      explosion.animations.play('run', 30, false, true);

      this.explosionsound = this.game.add.audio('explosionsound');
      this.explosionsound.play();
    }

  },
  collisionHandlerEnemieBullet: function(bullet, alien){
    // BULLET
    // console.log(bullet);
    var explosion = this.game.add.sprite(bullet.x, bullet.y, 'kaboom');
    this.game.world.moveDown(explosion);
    explosion.anchor.set(0.5);
    explosion.animations.add('run');
    explosion.animations.play('run', 30, false, true);

    this.explosionsound = this.game.add.audio('explosionsound');
    //this.explosionsound.play();
    // COLLISIONLAYER
    // console.log(alien);
    bullet.kill();
  },
  collisionHandlerHero: function(player, bullet){

    player.tint = 0xFF0000;
    this.game.time.events.add(Phaser.Timer.SECOND * 0.2, this.tint_off, this, player);

    var blood_hit = this.game.add.sprite(bullet.x, bullet.y, 'blood_hit');
    blood_hit.scale.setTo(4);
    blood_hit.anchor.set(0.5);
    blood_hit.animations.add('run');
    blood_hit.animations.play('run', 30, false, true);

    this.explosionsound = this.game.add.audio('explosionsound');
    this.explosionsound.play();

    this.game.camera.flash(0xff0000, 100);
    this.game.camera.shake(0.01, 500, true, Phaser.Camera.SHAKE_BOTH, false);

    bullet.kill();
    //bullet.kill();
    //console.log('HIT');


    if(playerData.defence === 0){
      if( playerData.health === 0 || playerData.health < 0){
        playerData.health = 0;
        this.game.state.start("Game",true,false, this.currentlevel);
        playerData.health = 100;
        playerData.ammo = 500;
        playerData.defence = 0;
        //this.music.stop();
      } else {
        playerData.health = playerData.health-10;
      }
    } else {
      playerData.defence -= 10;
      //this.player.tint = '0xFFFF00';
    }


    //this.text.setText("HEALTH: " + playerData.health);
  },
  collisionHandler: function(bullet, alien){

    bullet.kill();

    if(this.currentweapon == "Torpedolauncher"){
      // var explosion = this.game.add.sprite(bullet.x, bullet.y, 'monsterexplosion');
      // explosion.animations.play('run', 15, false, true);
      // explosion.scale.setTo(2);
      // explosion.anchor.set(0.5);
      // explosion.animations.add('run');
      // explosion.animations.play('run', 15, false, true);

      var explosion = this.game.add.sprite(bullet.x, bullet.y, 'kaboom');
      explosion.anchor.set(0.5);
      explosion.animations.add('run');
      explosion.animations.play('run', 30, false, true);

      this.explosionsound = this.game.add.audio('explosionsound');
      this.explosionsound.play();
    }

  },

  gofull: function(){

    if (this.game.scale.isFullScreen){
      this.game.scale.stopFullScreen();
    } else {
      this.game.scale.startFullScreen(false);
    }

  },
  goToMainMenu: function(){

    DRAGONFLY.game.state.start("Menu",true,false);

  },
  goToGameMenu: function(){



    if(this.enableMenu){

      this.game.physics.arcade.isPaused = true;

      this.menu_ui = this.game.add.sprite(this.game.camera.width / 2, this.game.camera.height/2, 'menu_ui');
      this.menu_ui.scale.setTo(3.5);
      this.menu_ui.anchor.set(0.5);
      this.menu_ui.fixedToCamera = true;

      this.menu_logo = this.game.add.sprite(this.game.camera.width / 2, 130, 'logo');
      this.menu_logo.scale.setTo(0.10);
      this.menu_logo.anchor.set(0.5);
      this.menu_logo.fixedToCamera = true;

      this.menu_button2 = this.game.add.button(this.game.camera.width / 2, 300, 'menu_menu_button', this.goToGameMenu, this, 1, 0, 1);
      this.menu_button2.scale.setTo(4);
      this.menu_button2.anchor.set(0.5);
      this.menu_button2.fixedToCamera = true;

      this.menu_button3 = this.game.add.button(this.game.camera.width / 2, 370, 'menu_menu_button', null, this, 1, 0, 1);
      this.menu_button3.scale.setTo(4);
      this.menu_button3.anchor.set(0.5);
      this.menu_button3.fixedToCamera = true;

      this.menu_button4 = this.game.add.button(this.game.camera.width / 2, 440, 'menu_menu_button', null, this, 1, 0, 1);
      this.menu_button4.scale.setTo(4);
      this.menu_button4.anchor.set(0.5);
      this.menu_button4.fixedToCamera = true;

      this.menu_button5 = this.game.add.button(this.game.camera.width / 2, 510, 'menu_menu_button', this.goToMainMenu, this, 1, 0, 1);
      this.menu_button5.scale.setTo(4);
      this.menu_button5.anchor.set(0.5);
      this.menu_button5.fixedToCamera = true;

      this.menu_button5_text = this.game.add.bitmapText(this.game.camera.width / 2, 505, 'carrier_command','Main Menu',15);
      this.menu_button5_text.anchor.set(0.5);
      this.menu_button5_text.fixedToCamera = true;

      this.menu_button2_text = this.game.add.bitmapText(this.game.camera.width / 2, 295, 'carrier_command','Continue',15);
      this.menu_button2_text.anchor.set(0.5);
      this.menu_button2_text.fixedToCamera = true;

      this.menu_button3_text = this.game.add.bitmapText(this.game.camera.width / 2, 365, 'carrier_command','Music Off',15);
      this.menu_button3_text.anchor.set(0.5);
      this.menu_button3_text.fixedToCamera = true;

      this.menu_button4_text = this.game.add.bitmapText(this.game.camera.width / 2, 435, 'carrier_command','Sound Off',15);
      this.menu_button4_text.anchor.set(0.5);
      this.menu_button4_text.fixedToCamera = true;

      this.enableMenu = false;
    } else {

      this.menu_ui.destroy();
      this.menu_logo.destroy();
      this.menu_button2.destroy();
      this.menu_button3.destroy();
      this.menu_button4.destroy();
      this.menu_button5.destroy();

      this.menu_button2_text.destroy();
      this.menu_button3_text.destroy();
      this.menu_button4_text.destroy();
      this.menu_button5_text.destroy();

      this.enableMenu = true;
      this.game.physics.arcade.isPaused = false;
    }

  },
  findObjectsByType: function(targetType, tilemap, layer){
  var result = [];

  tilemap.objects[layer].forEach(function(element){

    // //console.log(element.properties);
    // var testtt = element.properties;
    // console.log(testtt);
    // //console.log(testtt.type);


    if(element.properties.type == targetType) {
      element.y -= tilemap.tileHeight/2;
      element.x += tilemap.tileHeight/2;
      result.push(element);
    }

  }, this);

  return result;
},
  loadEnemies: function(){

  var elementsArr = this.findObjectsByType('enemy', this.map, 'ObjectLayer');
  var elementObj;
  // console.log(elementsArr);

  elementsArr.forEach(function(element){
    //console.log('LOOP');

    if(element.properties.asset == 'hammer'){
      elementObj = new DRAGONFLY.Hammer(this, (element.x)*3, (element.y)*3);
      elementObj.body.setSize(30, 30);
      this.hammers.push(elementObj);
    }

    if(element.properties.asset == 'gunman'){
      elementObj = new DRAGONFLY.Gunman(this, (element.x)*3, (element.y)*3);
      elementObj.body.setSize(30, 30);
      this.enemies.push(elementObj);
    }

    if(element.properties.asset == 'frog'){
      elementObj = new DRAGONFLY.Frog(this, (element.x)*3, (element.y)*3);
      elementObj.body.setSize(30, 30);
      this.game.physics.enable(elementObj, Phaser.Physics.P2JS);
      this.frogs.push(elementObj);
    }

    // elementObj = new RPG.Enemy(this, element.x, element.y, element.properties.asset, element.properties);
    // this.enemies.add(elementObj);




  }, this);

  },

  autoaim_off: function(){
    this.autoaim = false;
    // this.autoaimdisabled = this.game.add.audio('autoaim_disabled');
    // this.autoaimdisabled.play();
  },
  enableTeleporterFunction: function(){
    this.enableTeleporter = true;
  },

  nextLevel: function(){

    var current_level_game = 2;
    var current_track_game = 2;
    var game_money = playerData.money;
    var healthpacks = playerData.healthpacks;
    var shielditems = playerData.shield_items;
    var collected_rings = playerData.collected_rings;

    var killed_frogs = playerData.killed_frogs;
    var killed_gunmen = playerData.killed_gunmen;
    var killed_hammers = playerData.killed_hammers;

    console.log(playerData.killed_gunmen);


    $.ajax({
      type : 'POST',
      url: APP_ROOT + 'api/game/updateGameData',
      data: { money : game_money, current_level : current_level_game, current_track : current_track_game, health_packs : healthpacks, shield_items : shielditems, rings : collected_rings, frogs_killed : killed_frogs, gunmen_killed : killed_gunmen, hammers_killed : killed_hammers},
      success: function(data){
          //alert('AN DIE DATENBANK!');
      }
    });

    playerData.health = 100;
    playerData.ammo = 500;
    playerData.defence = 0;
    

    if(this.levelcookies){
      var cookieValue = parseInt(document.cookie.replace(/(?:(?:^|.*;\s*)currentLevel\s*\=\s*([^;]*).*$)|^.*$/, "$1"));

      if (typeof cookieValue == 'undefined') {
        document.cookie = "currentLevel=2";
      } else {

        if(playerData.levelNumber == cookieValue){
          cookieValue = cookieValue +1;
          document.cookie = "currentLevel=" + cookieValue;
        }
      }
    }



    this.state.start('Score', true, false, playerData.money, this.playDuration);

    //this.music.stop();
  },
  togglePause: function(){
     this.game.physics.arcade.isPaused = (this.game.physics.arcade.isPaused) ? false : true;
     //this.weapon.pauseAll();
  },
  tint_off: function(bullet){
     bullet.tint = 16777215;
     //this.weapon.pauseAll();
  },

  CameraMove: function(){

     //console.log('SHIFT PRESSED');
     if(this.switch){

        this.game.camera.follow(this.cameramovehelp, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        this.switch = false;

     } else {
       this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
       this.switch = true;
     }

  },
  nextWeapon: function(){

    var index = this.playerweapons.indexOf(this.currentweapon);
    index++;

    if((index+1) > this.playerweapons.length){
      index = 0;
    }

    this.currentweapon = this.playerweapons[index];
    this.changeweapon = true;
    //console.log(this.currentweapon);


  },
  prevWeapon: function(){

    var index = this.playerweapons.indexOf(this.currentweapon);

    if(index === 0){
      index = this.playerweapons.length - 1;
    } else {
      index--;
    }

    this.currentweapon = this.playerweapons[index];
    this.changeweapon = true;

    //console.log(this.currentweapon);

  },
  loadItems: function(){

  var elementsArr = this.findObjectsByType('item', this.map, 'ObjectLayer');
  var elementObj;
  // console.log(elementsArr);

  elementsArr.forEach(function(element){
    //console.log('LOOP');

    if(element.properties.asset == 'startpoint'){
      this.startPoint = new DRAGONFLY.Item(this, (element.x)*3, (element.y)*3);

    }

    if(element.properties.asset == 'teleport_A'){
      elementObj = new DRAGONFLY.Item(this, (element.x)*3, (element.y)*3, '', element.properties.asset);
      elementObj.body.setSize(30, 30);
      //elementObj.animations.add('shield', [0,1,2,3,4,5,6], 9, true);
      //elementObj.play('shield');
      this.teleport_A = elementObj;
      this.items.push(elementObj);
    }

    if(element.properties.asset == 'teleport_B'){
      elementObj = new DRAGONFLY.Item(this, (element.x)*3, (element.y)*3, '', element.properties.asset);
      elementObj.body.setSize(30, 30);
      //elementObj.animations.add('shield', [0,1,2,3,4,5,6], 9, true);
      //elementObj.play('shield');
      this.teleport_B = elementObj;
      this.items.push(elementObj);
    }

    if(element.properties.asset == 'teleport_C'){
      elementObj = new DRAGONFLY.Item(this, (element.x)*3, (element.y)*3, '', element.properties.asset);
      elementObj.body.setSize(30, 30);
      //elementObj.animations.add('shield', [0,1,2,3,4,5,6], 9, true);
      //elementObj.play('shield');
      this.teleport_C = elementObj;
      this.items.push(elementObj);
    }

    if(element.properties.asset == 'teleport_D'){
      elementObj = new DRAGONFLY.Item(this, (element.x)*3, (element.y)*3, '', element.properties.asset);
      elementObj.body.setSize(30, 30);
      //elementObj.animations.add('shield', [0,1,2,3,4,5,6], 9, true);
      //elementObj.play('shield');
      this.teleport_D = elementObj;
      this.items.push(elementObj);
    }

    if(element.properties.asset == 'shield'){
      elementObj = new DRAGONFLY.Item(this, (element.x)*3, (element.y)*3, element.properties.asset, element.properties.asset);
      elementObj.body.setSize(30, 30);
      elementObj.animations.add('shield', [0,1,2,3,4,5,6], 9, true);
      elementObj.play('shield');
      this.items.push(elementObj);

    }

    if(element.properties.asset == 'ammo'){
      elementObj = new DRAGONFLY.Item(this, (element.x)*3, (element.y)*3, element.properties.asset, element.properties.asset);
      elementObj.body.setSize(30, 30);
      elementObj.animations.add('ammo', [0,1,2,3,4,5,6], 7, true);
      elementObj.play('ammo');
      this.items.push(elementObj);
      //console.log('itemerstellt');
      //console.log(elementObj);
    }

    if(element.properties.asset == 'health'){
      elementObj = new DRAGONFLY.Item(this, (element.x)*3, (element.y)*3, element.properties.asset, element.properties.asset);
      elementObj.body.setSize(30, 30);
      elementObj.animations.add('health', [0,1,2,3,4,5,6], 7, true);
      elementObj.play('health');
      this.items.push(elementObj);
      //console.log('itemerstellt');
      //console.log(elementObj);
    }

    if(element.properties.asset == 'ring'){
      elementObj = new DRAGONFLY.Item(this, (element.x)*3, (element.y)*3, element.properties.asset, element.properties.asset);
      elementObj.body.setSize(30, 30);
      elementObj.animations.add('ring', [0,1,2,3,4,5,6,7], 7, true);
      elementObj.play('ring');
      this.items.push(elementObj);
      //console.log('itemerstellt');
      //console.log(elementObj);
    }

    if(element.properties.asset == 'autoaim'){
      elementObj = new DRAGONFLY.Item(this, (element.x)*3, (element.y)*3, element.properties.asset, element.properties.asset);
      elementObj.body.setSize(30, 30);
      elementObj.animations.add('autoaim', [0,1,2,3,4,5,6,7], 7, true);
      elementObj.play('autoaim');
      this.items.push(elementObj);
      //console.log('itemerstellt');
      //console.log(elementObj);
    }




    // elementObj = new RPG.Enemy(this, element.x, element.y, element.properties.asset, element.properties);
    // this.enemies.add(elementObj);




  }, this);

  },
  render: function(){
    //this.game.debug.text('Active Bullets: ' + this.bullets.countLiving() + ' / ' + this.bullets.total, 32, 32);
    //this.game.debug.spriteInfo(this.sprite, 32, 700);
    // this.game.debug.text("Autoaim mSeconds Left: " + this.game.time.events.duration, 32, 700);
    //this.game.debug.body(this.player);
    // this.game.debug.body(this.font);
    //this.game.debug.body(this.cameramovehelp);


    // for (i = 0; i < this.frogs.length; i++) {
    //   this.game.debug.body(this.frogs[i]);
    //
    // }


    // this.game.debug.spriteInfo(this.frogs[1], 32, 32);

    // this.game.debug.body(this.enemie_hammer);
    // this.game.debug.body(this.bullets);

    //this.game.debug.body(this.myhelp);




  }
};
