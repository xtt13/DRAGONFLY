<?php

class home extends controller{

    public function index()
    {
        // $this -> view -> data['headline'] = "Willkommen auf der Home Seite";
        // $this -> view -> data['text'] = $this -> model -> getText();

        $this -> view -> render('home/index', $this -> view -> data);
    }

}
