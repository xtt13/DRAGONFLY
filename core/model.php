<?php

class model{

    public $db;

    public function __construct()
    {
        $dbAccess = include __DIR__ . '/../config/db.php';
        extract($dbAccess);

        $this -> db = new database($host, $user, $pass, $name);
        $this -> db -> set_charset("utf8");
    }
}