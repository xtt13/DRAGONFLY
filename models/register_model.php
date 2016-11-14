<?php

class register_model extends model{

    public function setNewUser($data)
    {
        $uname = $this -> checkXSS($data['f-uname']);
        $pw = $this -> setPassword($data['f-pw']);
        $email = $this -> checkXSS($data['f-email']);

        $content = [
            'street'    => $this -> checkXSS($data['f-street']),
            'zip'       => $this -> checkXSS($data['f-zip']),
            'city'      => $this -> checkXSS($data['f-city'])
        ];

        $content = json_encode($content);
        $hash = $this -> generateUserhash();
        $userGroup = 1;
        $createdAt = time();
        $isActive = 0;

        $stmt = $this -> db -> prepare("INSERT INTO users (uname, pw, email, data, hash, user_group, created_at, is_active) VALUES (?,?,?,?,?,?,?,?)");

        $stmt -> bind_param("sssssisi", $uname, $pw, $email, $content, $hash, $userGroup, $createdAt, $isActive);
        $stmt -> execute();

        $stmt -> close();

        return $hash;
    }
    
    public function checkIfEmailExist($email)
    {
        $stmt = $this -> db -> prepare("SELECT id FROM users WHERE email = ?");
        $stmt -> bind_param("s", $email);
        
        $stmt -> execute();
        
        $stmt -> store_result();

        return ($stmt -> num_rows > 0) ? true : false;
    }
    
    public function checkIfUnameExist($uname)
    {
        $res = $this -> db -> query("SELECT id FROM users WHERE uname = '$uname'");
        
        return ($res -> num_rows > 0) ? true : false;
    }

    private function generateSalt()
    {
        return rand(10000, 99999);
    }

    private function setPassword($pw)
    {
        $salt = $this -> generateSalt();
        $pwHash = sha1($pw . $salt) . ':' . $salt;

        return $pwHash;
    }

    private function generateUserhash()
    {
        return uniqid();
    }

    private function checkXSS($string)
    {
        return $this -> db -> real_escape_string($string);
    }

    public function checkIfUserIsActiveByHash($hash)
    {
        $stmt = $this -> db -> prepare("SELECT id FROM users WHERE hash = ? AND is_active = 1");
        $stmt -> bind_param("s", $hash);
        $stmt -> execute();
        $stmt -> store_result();

        return ($stmt -> num_rows == 1) ? true : false;
    }

    public function checkIfHashExist($hash)
    {
        $stmt = $this -> db -> prepare("SELECT id FROM users WHERE hash = ?");
        $stmt -> bind_param("s", $hash);
        $stmt -> execute();
        $stmt -> store_result();

        return ($stmt -> num_rows == 1) ? true : false;
    }

    public function activateUserByHash($hash)
    {
        $stmt = $this -> db -> prepare("UPDATE users SET is_active = '1' WHERE hash = ?");
        $stmt -> bind_param("s", $hash);
        $stmt -> execute();
    }
}






