<?php

class guest_controller extends controller{

    public function __construct()
    {
        parent::__construct();

        // if($this -> checkUserAccess()) {
        //     header('Location: ' . APP_ROOT . 'dashboard');
        // }
    }

    private function checkUserAccess()
    {
        return (sessions::get('role') > 0) ? true : false;
    }
}
