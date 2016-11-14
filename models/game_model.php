<?php

class game_model extends model{

    public function setGameData($money, $current_level, $current_track, $health_packs, $shield_items, $rings, $frogs_killed, $gunmen_killed, $hammers_killed)
    {

      $uID = sessions::get('uid');
      $this -> db -> query("UPDATE users SET `money` = `money` + '$money', `health_packs` = `health_packs` + '$health_packs', `shield_items` = `shield_items` + '$shield_items', `current_track` = `current_track` + 1, `rings` = `rings` + '$rings'  WHERE users.id = '$uID'");
      $this -> db -> query("UPDATE users SET `frogs_killed` = `frogs_killed` + '$frogs_killed', `gunmen_killed` = `gunmen_killed` + '$gunmen_killed', `hammers_killed` = `hammers_killed` + '$hammers_killed' WHERE users.id = '$uID'");
    }

    public function getMoney()
    {
      $uID = sessions::get('uid');
      $res = $this -> db -> query("SELECT users.money FROM users WHERE users.id = '$uID'");
      $money = $res -> fetch_assoc();

      return json_encode($money);
    }
}
