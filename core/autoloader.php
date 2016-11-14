<?php

class autoloader {

    static public function loadController($class)
    {
        $file = __DIR__ . '/../apps/' . CURRENT_APP . '/' . APP_CONTROLLERS . $class . '.php';
        
        if(file_exists($file)) {
            require $file;
        }
    }

    static public function loadModel($class)
    {
        $file = __DIR__ . '/../' . APP_MODELS . $class . '.php';
        
        if(file_exists($file)) {
            require $file;
        }
    }

    static public function loadLib($class)
    {
        $file = __DIR__ . '/../' . APP_LIBS . $class . '.php';
        
        if(file_exists($file)) {
            require $file;
        }
    }

    static public function loadCore($class)
    {
        $file = __DIR__ . '/../' . APP_CORE . $class . '.php';
        
        if(file_exists($file)) {
            require $file;
        }
    }
}