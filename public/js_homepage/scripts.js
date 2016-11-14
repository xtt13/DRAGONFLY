$(document).ready(function(){

  // function Sound(source,volume,loop)
  // {
  //     this.source=source;
  //     this.volume=volume;
  //     this.loop=loop;
  //     var son;
  //     this.son=son;
  //     this.finish=false;
  //     this.stop=function(){
  //         document.body.removeChild(this.son);
  //     };
  //     this.start=function()
  //     {
  //         if(this.finish)return false;
  //         this.son=document.createElement("embed");
  //         this.son.setAttribute("src",this.source);
  //         this.son.setAttribute("hidden","true");
  //         this.son.setAttribute("volume",this.volume);
  //         this.son.setAttribute("autostart","true");
  //         this.son.setAttribute("loop",this.loop);
  //         document.body.appendChild(this.son);
  //     };
  //     this.remove=function()
  //     {
  //         document.body.removeChild(this.son);
  //         this.finish=true;
  //     };
  //     this.init=function(volume,loop)
  //     {
  //         this.finish=false;
  //         this.volume=volume;
  //         this.loop=loop;
  //     };
  // }
  //
  // var foo=new Sound("public/music/intro.mp3", 100, true);
  // foo.start();

  myAudio = new Audio('public/music/intro.mp3');
  myAudio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
  }, false);
  myAudio.play();





  // // AJAX PAGINATATION NUMBER LINKS
  // $('body').on('click', '.ajax-link', function() {
  //   event.preventDefault();
    // $.ajax({
    //         url: $(this).attr('href'),
    //         method: "get",
    //       })
    //       .done(function(data, textStatus, jqXhr) {
    //         // alert(data);
    //         $(".ajax-wrapper").replaceWith($(".ajax-wrapper", data));
    //
    //       })
    //       .fail(function(jqXhr, textStatus, errorThrown) {
    //         // wird bei fehlerhaftem Request ausgeführt
    //         alert('Connection Problems! Please reload the Page!');
    //       });




});
