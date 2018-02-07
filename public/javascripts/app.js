var audioObject = new Audio();
let play = false;

$('body').on('click', '.album', function (e) { 
	play = !play;
	//functionality to toggle between play/pause and pausing previous song when playing another song
	/*if(!play){
		audioObject.pause();
		return;
	} */
	console.log(this);
	console.log($(this).data('album-id'))

	let album = $(this).data('album-id')
	let artist = $(this).data('artist-name')
	let preview = $(this).data('')

	let data = {
	    album: album,
	    artist: artist
	}
	console.log(data);

	$.post("/tracks", data, function(result, status, xhr){
			console.log(result, status, xhr);
        	console.log(result);
        	//$('.results').html(result.data);
        	//loopThroughVid(result.data);
        	//create a for loop function here
        	for(let i = 0; i < result.data.length; i++){
        		console.log(result.data[i].preview_url);
				if(result.data[i].preview_url !== null){
					console.log('We have something to play!');
	        		audioObject.pause();
	        		audioObject = new Audio(result.data[i].preview_url); //create a new audio object using the data returned from Spotify.com
					audioObject.play(); //play the song!!!

					return;
				}
        	}
    		console.log('There is no preview to play!!');
    		var bar = new $.peekABar({
    			html: 'Override all, puny humans!',
    			backgroundColor: 'white',
				autohide: true
			});
			bar.show();
    	});   
    });


//functionality to toggle the play button
$('.results').on('click', '.js-play-toggle', function(){

	/*let playing = false;
	if(playing === false){
		playing = true;
		audioObject.play();
	}else{
		playing = false;
		audioObject.pause();
		console.log('toggle is set to true');
	}
	console.log('play button clicked');*/

});
//functionality to display alert if no preview is available


//functionality to list previously searched countries
	//track and log country codes based on the user's Input history
	//create an array
	//on submission, pass country string and push to array
	//display array items in a list on webpage

$(function(){
	const recentSearch = [];

    $("form").submit(function(event) {
	    event.preventDefault();
	    codeAddress();
	    
	    const userInput = $(".searchBox").val().toUpperCase();
	    let historyHTML= '';
	    
	    
	    //clear the text from input box
	    $(".searchBox").val('');
	    
	    //add item to list
	    console.log(`add ${userInput} to list`);
	    console.log('Submit Event Listener is working!');
	    recentSearch.push(userInput);
	    console.log(recentSearch);
	    for(let i=0; i < recentSearch.length; i++){
	    	historyHTML += `<div class="recentCountry">${recentSearch[i]}</div>`;
	    }
	    $('#previouslySearched').html(historyHTML);
  	});

  	/*$('.js-button').click(function(event) {
	    event.preventDefault();
	    codeAddress();
	    
	    const userInput = $(".searchBox").val().toUpperCase();
	    let historyHTML= '';
	    
	    //clear the text from input box
	    $(".searchBox").val('');
	    
	    //add item to list
	    console.log(`add ${userInput} to list`);
	    console.log('Click Event Listener is working!');
	    recentSearch.push(userInput);
	    console.log(recentSearch);
	    for(let i=0; i < recentSearch.length; i++){
	    	historyHTML += `<div class="recentCountry">${recentSearch[i]}</div>`;
	    }
	    $('#previouslySearched').html(historyHTML);
  	});*/
 
 	$('#previouslySearched').on('click', '.recentCountry', function(){
 		console.log($(this).text());
 		codeAddress($(this).text()).toUpperCase();
 	});
});

//<iframe src="https://open.spotify.com/embed?uri=${data[i].uri}" width="300" height="380" frameborder="0" allowtransparency="true"></iframe><br>`;