<?php

class bootstrap {

    public function __construct()
    {
        $url = (isset($_GET['url'])) ? $_GET['url'] : "home";
        $url = ltrim($url, "/");
        $url = rtrim($url, "/");
        $url = explode("/", $url);

        if (CURRENT_APP != "app_frontend/") {
            array_shift($url);
        }

        $cfile =  __DIR__ . "/../apps/".CURRENT_APP."/controllers/{$url[0]}.php";

        if(file_exists($cfile)) {
            $controller = new $url[0]();
            $controller -> loadModel($url[0]);
        } else {
            $controller = new siteerror();
            $controller -> index();

            return false;
        }


        if(isset($url[1]) && method_exists($controller, $url[1])) {
            $method = $url[1];

            if(isset($url[2])){
                $controller -> $method($url[2]);
            }else{
                $controller -> $method();
            }
        }else{
            $controller -> index();
        }
    }
}