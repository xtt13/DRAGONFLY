<div class="ajax-wrapper">
  <div class="dashboard-wrapper">
    <h1>STATISTICS</h1>
    <div class="values-wrapper">
      <div class="row gunman"><?php echo $statistics['gunmen_killed'] ?></div>
      <div class="row hammer"><?php echo $statistics['hammers_killed'] ?></div>
      <div class="row frog"><?php echo $statistics['frogs_killed'] ?></div>
      <div class="row health"><?php echo $statistics['health_packs'] ?></div>
      <div class="row shield"><?php echo $statistics['shield_items'] ?></div>
      <div class="row ring"><?php echo $statistics['rings'] ?></div>
      <div class="row money"><?php echo $statistics['money'] ?></div>
      <div class="link-wrapper">
        <a href="<?php echo APP_ROOT;?>game">PLAY!</a>
        <a href="<?php echo APP_ROOT;?>how-to-play">HOW TO PLAY</a>
        <a href="<?php echo APP_ROOT;?>logout">LOGOUT</a>
      </div>

    </div>
  </div>
</div>
