

<div class="ajax-wrapper">

  <h1 class="headline">DRAGONFLY</h1>

  <div id="dragonfly">
    <a href="<?php echo APP_ROOT;?>game">PLAY!</a>
    <a class="ajax-link" href="#">HOW TO PLAY</a>
    <a class="ajax-link inprogress" href="#">MULTIPLAYER</a>
    <a class="ajax-link" href="<?php echo APP_ROOT;?><?php if(sessions::get('role') > 0){echo "dashboard";} else {echo "login";} ?>"><?php if(sessions::get('role') > 0){echo "DASHBOARD";} else {echo "LOGIN/SIGNIN";} ?></a>
  </div>

</div>



<!-- <div class="overlay">AV-1</div> -->
