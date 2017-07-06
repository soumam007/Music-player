
$('.fading').fadeIn(5000);


var audio;


// hiding pause button...
$('#pause').hide();




//Initialize.....
initAudio($('#playlist li:first-child'));




//Initializer Function
function initAudio(element)
{
    
    
    
    var song=element.attr('song');
    var title= element.text();
    var cover=element.attr('cover');
    var artist=element.attr('artist');
    
   
    
    
    // create an audio abject....
    
    audio= new Audio('media/' + song);//concatinating the path of the actual song since the name and path for each song is common upto media/ but after that each song has a diff name...now that is stored in our attribute...hence we can use it get ready our audio object.....
    
    
    
    if(!audio.currentTime)
    {   $('#duration').html('0.00');            // why???
    }
    
    
    
    $('#audio-player .title').text(title);
    $('#audio-player .artist').text(artist);
    
      //Insert cover
    
    $('img.cover').attr('src','img/covers/'+cover);
    
   
    
    
    
    $('#playlist li').removeClass('active');
    element.addClass('active'); 
    
    //dekh bhai last 2 line samajh le.... :-P
    
    
}




//play button
$('#play').click(function()
{
    audio.play();
    $('#play').hide();
    $('#pause').show();
    $('#duration').fadeIn(400);
    
    showDuration();
});

//pause button
$('#pause').click(function()
{
    audio.pause();
    
    $('#pause').hide();
    $('#play').show();
    
    
    //showDuration();
});

//stop button
$('#stop').click(function()
{
    audio.pause();
     audio.currentTime = 0;
    
    $('#pause').hide();
    $('#play').show();

    $('#duration').fadeOut(400);
    
  
   
});












// next button
$('#next').click(function()
{

    
    audio.pause();
    var next=$('#playlist li.active').next();
    
    
    if(next.length == 0)
    {
        next=$('#playlist li:first-child');
    }
    
    initAudio(next);
    audio.play();
    showDuration();
    

});


// prev button

$('#prev').click(function()
{

    
    audio.pause();
    var prev=$('#playlist li.active').prev();
    
    
    if(prev.length == 0)
    {
        prev=$('#playlist li:last-child');
    }
    
    initAudio(prev);
    audio.play();
    showDuration();
    

});







// volume range...
$('#volume').change(  function()
{
    
    audio.volume=parseFloat(this.value/100);

});


//Playlist Song Click
$('#playlist li').click(function () {
    audio.pause();
    initAudio($(this));
	$('#play').hide();
	$('#pause').show();
	$('#duration').fadeIn(400);
	audio.play();
	showDuration();
});    
    

    



// showDuration
function showDuration()
{
   
    
    $(audio).bind('timeupdate',function(){

        // get mins and secs
        var s=parseInt(audio.currentTime%60);
        var m=parseInt((audio.currentTime/60)%60);
    
        
        // add 0 if less than 10...
        
        
        if(s<10)
        {s='0'+s;}
        
        //and then....
        
        
        $('#duration').html(m +':'+s );
        
        
        
        // now to get the nil progress bar...
        var value=0;
       
        
       if(audio.currentTime>0)
        {
        value=Math.floor((audio.currentTime/audio.duration)*100 );
          }
        
        $('#progress').css('width',value+'%');
    
          });
    
}
    