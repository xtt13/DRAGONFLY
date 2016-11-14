<?php
class game extends controller{

    public function __construct()
    {
      parent::__construct();
      header('Content-Type: application/json');
    }

    public function updateGameData()
    {
      if(sessions::get('role') > 0){
        if(isset($_POST['current_level']) && isset($_POST['current_track']) && isset($_POST['money']) && isset($_POST['health_packs']) && isset($_POST['shield_items']) && isset($_POST['rings']) && isset($_POST['frogs_killed']) && isset($_POST['gunmen_killed'])){
          $current_level = $_POST['current_level'];
          $current_track = $_POST['current_track'];
          $money = $_POST['money'];
          $health_packs = $_POST['health_packs'];
          $shield_items = $_POST['shield_items'];
          $rings = $_POST['rings'];
          $frogs_killed = $_POST['frogs_killed'];
          $gunmen_killed = $_POST['gunmen_killed'];
          $hammers_killed = $_POST['hammers_killed'];



          $this -> model -> setGameData($money, $current_level, $current_track, $health_packs, $shield_items, $rings, $frogs_killed, $gunmen_killed, $hammers_killed);

        }
      }
    }

    public function getMoney()
    {
      if(sessions::get('role') > 0){
        echo $this -> model -> getMoney();
      }
    }
}

// UPDATE
//
// current_level
// current_track
// time_played
// enemies_killed
// deaths
// weapons
// money
// healthpacks (+value)
// shield_items
// gunmen_killed
// frogs_killed
// rings
// Hammers_killed

// UPDATE `some_table` SET `value` = `value` + 1000 WHERE `id` = 1

//UPDATE table_name
//SET column1=value1,column2=value2,...
//WHERE some_column=some_value;
