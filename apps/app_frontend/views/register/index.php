<h1>Registrierung</h1>

<?php

if( isset($errors) && count($errors) > 0 ) {

    echo '<div class="errors">';
    foreach($errors as $error):

        echo "<p>$error</p>";

    endforeach;
    echo '</div>';
}

?>

<?php echo $form; ?>
