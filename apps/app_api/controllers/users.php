<?php

class users extends controller{

    public function __construct()
    {
        parent::__construct();
        header('Content-Type: application/json');
    }

    public function getusers()
    {
        $limit = (isset($_POST['limit'])) ? $_POST['limit'] : null;
        $order = (isset($_POST['order'])) ? $_POST['order'] : null;
        $start = (isset($_POST['start'])) ? $_POST['start'] : null;

        echo $this -> model -> getUsers($limit, $order, $start);
    }
}