<?php

class logout extends user_controller{

    public function index()
    {
        sessions::clearAll();
        header('Location:' . APP_ROOT . 'home');
    }
}