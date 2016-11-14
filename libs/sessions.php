<?php

class sessions{

    static public function init()
    {
        session_save_path(__DIR__ . '/../storage/sessions/');
        session_start();
    }

    static public function set($key, $value)
    {
        $_SESSION[$key] = $value;
    }

    static public function get($key)
    {
        return (isset($_SESSION[$key])) ? $_SESSION[$key] : false;
    }

    static public function clear($key)
    {
        unset($_SESSION[$key]);
    }

    static public function clearAll()
    {
        session_destroy();
    }

}