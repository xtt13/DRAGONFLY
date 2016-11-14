<?php

class login_model extends model{

    public function checkUname($uname)
    {
        $res = $this -> db -> query("SELECT id FROM users WHERE uname = '$uname'");

        return ($res -> num_rows == 1) ? true : false;
    }

    public function checkPw($uname, $pw)
    {
        $stmt = $this -> db -> prepare("SELECT pw FROM users WHERE uname = ?");
        $stmt -> bind_param("s", $uname);
        $stmt -> execute();
        $stmt -> store_result();

        $stmt -> bind_result($databasePw);
        $stmt -> fetch();

        $hash = explode(":", $databasePw);

        return (sha1($pw . $hash[1]) == $hash[0]) ? true : false;
    }

    public function checkIfUserIsActive($uname)
    {
        $res = $this -> db -> query("SELECT id FROM users WHERE uname = '$uname' AND is_active = 1");

        var_dump($res->num_rows);

        return ($res->num_rows == 1) ? true : false;
    }

    public function getUserDataByUname($uname)
    {
        $res = $this -> db -> query("SELECT id, uname, email, user_group FROM users WHERE uname = '$uname'");
        return $res -> fetch_assoc();
    }
}
