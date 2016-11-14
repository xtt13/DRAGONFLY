<?php

class controller{

    public $view;
    public $model;

    public function __construct()
    {
        $this -> view = new view();
    }

    public function loadModel($controller)
    {
        $classname = $controller . '_model';
        $file = __DIR__ . '/../' . APP_MODELS . $classname . '.php';

        if( file_exists($file) )
        {
            $this -> model = new $classname();
        }
    }
}