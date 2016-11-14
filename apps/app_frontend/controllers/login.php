<?php

class login extends guest_controller{

    public function index()
    {


        //var_dump($_POST);

        if($_SERVER['REQUEST_METHOD'] == "POST" && !empty($_POST)) {
            $this -> proceed();
        }

        $form = new formbuilder("login", 1);
        $form
            -> addHeadline("Login")
            -> addInput("text", "uname", "Username")
            -> addInput("password", "pw", "Password")
            -> addInput("submit", "dologin", false, array('value' => 'Jetzt einloggen', 'class' => 'login-btn'))
        ;

        $this -> view -> data['form'] = $form -> output();
        $this -> view -> render('login/index', $this -> view -> data);
    }

    private function proceed()
    {
      var_dump($_POST['token']);
      var_dump(sessions::get('form-token'));

        //if(sessions::get('form-token') == $_POST['token']) {

          echo "INSIDE2";

            $uname = $_POST['f-uname'];
            $pw = $_POST['f-pw'];

            echo "INSIDE";

            if($this -> model -> checkUname($uname)) {
                if($this -> model -> checkIfUserIsActive($uname)) {
                    if($this -> model -> checkPw($uname, $pw)) {
                        // Daten vom User holen
                        $user = $this -> model -> getUserDataByUname($uname);

                        // In die Session speichern
                        sessions::set('login', 1);
                        sessions::set('uname', $user['uname']);
                        sessions::set('email', $user['email']);
                        sessions::set('uid', $user['id']);
                        sessions::set('role', $user['user_group']);

                        // Weiterleitung
                        // if (sessions::get('redirect') !== false) {
                        //     header('Location:' . APP_ROOT . sessions::get('redirect'));
                        // }else{
                            header('Location: ' . APP_ROOT . 'dashboard');
                        // }

                        echo "LOGIN";

                    }else{
                        // Fehler Benutzerdaten
                        $this -> view -> data['errors'] = ['Benutzerdaten sind falsch!'];
                    }

                }else{
                    // Fehler nicht aktiv
                    $this -> view -> data['errors'] = ['Der User wurde noch nicht freigeschalten!'];
                }

            }else{
                // Fehler Benutzerdaten
                $this -> view -> data['errors'] = ['Benutzerdaten sind falsch!'];
            }
        // } else {
        //     $this -> view -> data['errors'] = ['Form-token falsch!'];
        // }
    }
}
