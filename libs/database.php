<?php

class database extends mysqli{

    public function __construct($host, $user, $pass, $name)
    {
        parent::__construct($host, $user, $pass, $name);
    }
}