<?php

class user_controller extends controller{

    public function __construct()
    {
        parent::__construct();

        if($this -> checkUserAccess() === false) {
            sessions::set('redirect', $_GET['url']);
            header('Location: ' . APP_ROOT . 'login');
            exit();
        }
    }

    private function checkUserAccess()
    {
        return (sessions::get('role') > 0) ? true : false;
    }
}
