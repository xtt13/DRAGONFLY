<?php

class game extends guest_controller{

    public function index()
    {

        //$this -> view -> data['form'] = $form -> output();
        $this -> view -> render('game/index', null, "game");
    }
}



 ?>
