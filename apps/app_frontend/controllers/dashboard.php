<?php

class dashboard extends user_controller{

    public function index()
    {
        $this -> view -> data['statistics'] = $this -> model -> getStatistics();
        $this -> view -> render('dashboard/index', $this -> view -> data);
    }
}
