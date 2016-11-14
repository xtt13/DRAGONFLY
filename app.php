<?php

require __DIR__ . '/config/paths.php';
require __DIR__ . '/' . APP_CORE . 'autoloader.php';

$availableApps = require __DIR__ . '/config/apps.php';
$urlApp = (isset($_GET['url'])) ? ltrim($_GET['url'], "/") : null;
$urlApp = explode("/", $urlApp);
$urlApp = $urlApp[0];

if (in_array($urlApp . '/', $availableApps)) {
    define("CURRENT_APP", array_search($urlApp . "/", $availableApps) . "/");
} else {
    define("CURRENT_APP", "app_frontend/");
}

spl_autoload_register("autoloader::loadController");
spl_autoload_register("autoloader::loadModel");
spl_autoload_register("autoloader::loadLib");
spl_autoload_register("autoloader::loadCore");

sessions::init();
$app = new bootstrap();