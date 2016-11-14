<?php

class admin_controller extends controller{

    public function __construct()
    {
        parent::__construct();

        if ($this -> checkUserAccess() === false) {
            header('Location:' . APP_ROOT . 'login');
            exit();
        }
    }

    private function checkUserAccess()
    {
        return (sessions::get('role') == 2) ? true : false;
    }
}