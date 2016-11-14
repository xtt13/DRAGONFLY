<?php

class register extends guest_controller{

    public function index()
    {

        if($_SERVER['REQUEST_METHOD'] == "POST" && !empty($_POST)) {
            $this -> proceed();
        }

        $form = new formbuilder("register", 2);
        $form
            -> addInput("text", "uname", "Username")
            -> addInput("email", "email", "E-Mail Adresse")
            -> addInput("password", "pw", "Passwort")

            -> addInput("text", "street", "Straße &amp; Hr.")
            -> addInput("text", "zip", "PLZ")
            -> addInput("text", "city", "Stadt/Ort")

            -> addInput("submit", "doregister", false, array('value' => 'Jetzt registrieren', 'class' => 'btn btn-default'))
        ;

        $this -> view -> data['form'] = $form -> output();

        $this -> view -> render('register/index', $this -> view -> data);
    }

    private function proceed()
    {
        //if(sessions::get('form-token') == $_POST['token']){

            $this -> view -> data['errors'] = [];

            $val = new validator();
            $val -> val($_POST['f-uname'], "Username", true, "textnumber", 3, 20);
            $val -> val($_POST['f-email'], "E-Mail", true, "email");
            $val -> val($_POST['f-pw'], "Passwort", true, "password", 5);
            $val -> val($_POST['f-street'], "Strasse", true, "textnumber", 3);
            $val -> val($_POST['f-zip'], "PLZ", true, "number", 4, 6);
            $val -> val($_POST['f-city'], "Stadt", true, "text", 3);

            if(count($val -> getErrors()) > 0) {
                // var_dump($this -> view -> data['errors']);
                // Es gibt Fehler
                $this -> view -> data['errors'] = $val -> getErrors();
            }else{

                // Überprüfung ob E-Mail und Uname existieren
                if($this -> model -> checkIfUnameExist($_POST['f-uname'])) {
                    array_push($this -> view -> data['errors'], "Username existiert bereits.");
                }

                if($this -> model -> checkIfEmailExist($_POST['f-email'])) {
                    array_push($this -> view -> data['errors'], "E-Mail existiert bereits.");
                }

                if(isset($this->view->data['errors']) && count($this->view->data['errors']) > 0) return false;

                // Es gibt keine Fehler
                $userHash = $this -> model -> setNewUser($_POST);

                // E-Mail wegsenden
                $message = "<p>Danke für deine Registrierung. Um diese abzuschließen klicke bitte auf den nachfolgenden Link:<br><br><a href=\"".APP_ROOT."register/activate/$userHash\">Hier klicken</a></p>";
                $mail = new PHPMailer();
                $mail -> IsHTML(true);
                $mail -> SetFrom("michael.dorn2@gmail.com", "Guillermo Neugebauer");
                $mail -> AddAddress($_POST['f-email']);
                $mail -> Subject = 'Registrierung MVC';
                $mail -> Body = $message;

                // Weiterleitung auf register/success
                header('Location: '. APP_ROOT .'register/success');
            }
      //  }
    }

    public function success()
    {
        $this -> view -> render('register/success');
    }

    public function activate($hash)
    {
        if($this -> model -> checkIfHashExist($hash)) {

            if($this -> model -> checkIfUserIsActiveByHash($hash) === false) {

                $this -> model -> activateUserByHash($hash);
                $this -> view -> data['headline'] = "Danke";
                $this -> view -> data['text'] = "Du wurdest erfolgreich aktiviert. Du kannst dich nun <a href='/login'>einloggen</a>";
            }else{
                $this -> view -> data['headline'] = "Fehler";
                $this -> view -> data['text'] = "Du wurdest bereits aktiviert";
            }
        }else{
            $this -> view -> data = [
                'headline' => "Fehler Fehler",
                'text' => "Irgendwas passt ned"
            ];
        }

        $this -> view -> render('register/activate', $this -> view -> data);
    }
}
