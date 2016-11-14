<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
		<title>Dragonfly</title>

		<style>
		  body {
		  	background-color: black;
		    padding: 0px;
		    margin: 0px;
				cursor:  url(assets/images/cursor.png), auto;
				box-shadow: 0 0 200px rgba(0,0,0,1) inset;

		  }

			.vignette {
			position: fixed;
		  top: 0;
		  left: 0;
		  width: 100%;
		  height: 100%;
		  box-shadow: 0 0 50px rgba(0,0,0,1) inset;
			pointer-events: none
			}

			/*START*/



			/*@keyframes flicker {
			  0% {
			    opacity: 0.5753167;
			  }
			  5% {
			    opacity: 0.61739877;
			  }
			  10% {
			    opacity: 0.81397524;
			  }
			  15% {
			    opacity: 0.91966786;
			  }
			  20% {
			    opacity: 0.10335068;
			  }
			  25% {
			    opacity: 0.47368816;
			  }
			  30% {
			    opacity: 0.27234666;
			  }
			  35% {
			    opacity: 0.40314851;
			  }
			  40% {
			    opacity: 0.41164215;
			  }
			  45% {
			    opacity: 0.01179952;
			  }
			  50% {
			    opacity: 0.74438005;
			  }
			  55% {
			    opacity: 0.67331313;
			  }
			  60% {
			    opacity: 0.96947399;
			  }
			  65% {
			    opacity: 0.53336182;
			  }
			  70% {
			    opacity: 0.46814556;
			  }
			  75% {
			    opacity: 0.85837362;
			  }
			  80% {
			    opacity: 0.913137;
			  }
			  85% {
			    opacity: 0.20869179;
			  }
			  90% {
			    opacity: 0.04622777;
			  }
			  95% {
			    opacity: 0.56338291;
			  }
			  100% {
			    opacity: 0.44598843;
			  }
			}*/
			.container {
			  width: 100%;
			  height: 100%;
			  /*background: #121010;*/
			  position: relative;
			  overflow: hidden;

			}
			.container::after {
			  content: " ";
			  display: block;
			  position: absolute;
			  top: 0;
			  left: 0;
			  bottom: 0;
			  right: 0;
			  background: rgba(18, 16, 16, 0.1);
			  opacity: 0;
			  z-index: 2;
			  pointer-events: none;
			}
			.container::before {
			  content: " ";
			  display: block;
			  position: absolute;
			  top: 0;
			  left: 0;
			  bottom: 0;
			  right: 0;
			  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
			  z-index: 2;
			  background-size: 100% 2px, 3px 100%;
			  pointer-events: none;
			}

			.container::after {
			  animation: flicker 0.15s infinite;
			}

			@keyframes turn-on {
			  0% {
			    transform: scale(1, 0.8) translate3d(0, 0, 0);
			    -webkit-filter: brightness(30);
			    filter: brightness(30);
			    opacity: 1;
			  }
			  3.5% {
			    transform: scale(1, 0.8) translate3d(0, 100%, 0);
			  }
			  3.6% {
			    transform: scale(1, 0.8) translate3d(0, -100%, 0);
			    opacity: 1;
			  }
			  9% {
			    transform: scale(1.3, 0.6) translate3d(0, 100%, 0);
			    -webkit-filter: brightness(30);
			    filter: brightness(30);
			    opacity: 0;
			  }
			  11% {
			    transform: scale(1, 1) translate3d(0, 0, 0);
			    -webkit-filter: contrast(0) brightness(0);
			    filter: contrast(0) brightness(0);
			    opacity: 0;
			  }
			  100% {
			    transform: scale(1, 1) translate3d(0, 0, 0);
			    -webkit-filter: contrast(1) brightness(1.2) saturate(1.3);
			    filter: contrast(1) brightness(1.2) saturate(1.3);
			    opacity: 1;
			  }
			}
			@keyframes turn-off {
			  0% {
			    transform: scale(1, 1.3) translate3d(0, 0, 0);
			    -webkit-filter: brightness(1);
			    filter: brightness(1);
			    opacity: 1;
			  }
			  60% {
			    transform: scale(1.3, 0.001) translate3d(0, 0, 0);
			    -webkit-filter: brightness(10);
			    filter: brightness(10);
			  }
			  100% {
			    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
			    transform: scale(0, 0.0001) translate3d(0, 0, 0);
			    -webkit-filter: brightness(50);
			    filter: brightness(50);
			  }
			}
			.screen {
			  width: 100%;
			  height: 100%;
			  border: none;
			}

			.container > .screen {
			  animation: turn-off 0.55s cubic-bezier(0.23, 1, 0.32, 1);
			  animation-fill-mode: forwards;
			}

			.container > .screen {
			  animation: turn-on 4s linear;
			  animation-fill-mode: forwards;
			}

			@keyframes overlay-anim {
			  0% {
			    visibility: hidden;
			  }
			  20% {
			    visibility: hidden;
			  }
			  21% {
			    visibility: visible;
			  }
			  100% {
			    visibility: hidden;
			  }
			}
			.overlay {
			  color: #00FF00;
			  position: absolute;
			  top: 20px;
			  left: 20px;
			  font-size: 60px;
			  visibility: hidden;
			  pointer-events: none;
			}

			.overlay {
			  animation: overlay-anim 5s linear;
			  animation-fill-mode: forwards;
			}

			/*END*/
	  </style>
	</head>

	<body class="container screen">
