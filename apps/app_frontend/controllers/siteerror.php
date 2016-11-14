<?php

class siteerror extends controller{

    public function index()
    {
        $this -> view -> render('siteerror/index');
    }
}