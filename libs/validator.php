<?php

class validator{

    private $name;
    private $errors = array();
    private $filters = array(
        'text' => '/^[a-z]$/i',
        'textnumber' => '/^[\w]$/i',
        'number' => '/^[0-9]$/',
        'email' => '/^([\w]){2,60}@([\w]){2,60}\.([a-z]){2,4}$/i',
        'tel' => '',
        'url' => ''
    );

    public function __construct()
    {
    }

    /**
     * Validates input-data
     *
     * @param $data
     * @param $name
     * @param bool $required
     * @param string $type
     * @param null $min
     * @param null $max
     * @return $this|bool
     */
    public function val($data, $name, $required = false, $type = "text", $min = null, $max = null)
    {
        $this -> name = $name;

        if( $required && empty($data) ){
            $this -> setError("required");
            return false;
        }

        if($min !== null && ($this -> min($data, $min) === false)) {
            $this -> setError("min");
            return false;
        }

        if($max !== null && ($this -> max($data, $max) === false)) {
            $this -> setError("max");
            return false;
        }

        if(in_array($type, $this -> filters)) {
            if(! preg_match($this -> filters[$type], $data)) {
                $this -> setError("type");
                return false;
            }
        }

    }

    /**
     * @param $data
     * @param $min
     * @return bool
     */
    private function min($data, $min)
    {
        return (strlen($data) < $min) ? false : true;
    }

    /**
     * @param $data
     * @param $max
     * @return bool
     */
    private function max($data, $max)
    {
        return (strlen($data) > $max) ? false : true;
    }

    public function check($data1, $data2)
    {

    }

    /**
     * @param $errorcode
     */
    private function setError($errorcode)
    {
        switch ($errorcode){
            case "required":
                array_push($this -> errors, "{$this->name} muss ausgefüllt sein.");
                break;
            case "min":
                array_push($this -> errors, "{$this->name} ist zu kurz.");
                break;
            case "max":
                array_push($this -> errors, "{$this->name} ist zu lang.");
                break;
            case "type":
                array_push($this -> errors, "{$this->name} ist nicht valide");
        }
    }

    /**
     * @return array
     */
    public function getErrors()
    {
        return $this -> errors;
    }
}