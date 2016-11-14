<?php

class users_model extends model{

    public function getUsers($limit, $order, $start)
    {
        $sql = "SELECT id, uname, email FROM users";

        if($start !== null) {
            $sql .= " WHERE uname LIKE '$start%'";
        }

        if($order !== null) {
            $sql .= " ORDER BY id $order";
        }

        if($limit !== null) {
            $sql .= " LIMIT $limit";
        }

        $res = $this -> db -> query($sql);

        $users = $res -> fetch_all(MYSQLI_ASSOC);
        
        return json_encode($users);
    }
}