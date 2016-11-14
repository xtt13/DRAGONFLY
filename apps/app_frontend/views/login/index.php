<!-- HIER SIND LOGIN VIEWS-->



<div class="ajax-wrapper">
  <?php

  if(isset($errors) && count($errors) > 0):
      echo '<div class="errors">';
      foreach($errors as $error):
          echo "<p>$error</p>";
      endforeach;
      echo '</div>';
  endif;

  ?>
<?php echo $form; ?>
</div>
