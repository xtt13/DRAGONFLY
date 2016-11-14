<?php

class dashboard_model extends model{

    public function getStatistics()
    {
      $ownID = sessions::get('uid');

      $res = $this -> db -> query("SELECT * FROM users WHERE id = '$ownID'");
      $data = $res -> fetch_assoc();

      return $data;
    }
}
