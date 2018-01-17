   $('form').submit(function(e){
        e.preventDefault();
        //console.log($('#artist').val());
        let artist = $('#artist').val();
		$.post("/artist", {artist: artist}, function(result){
        	console.log(result);
        	//S$('.results').html(result.data);
        	loopThroughVid(result.data);
    	});        
    });

function loopThroughVid(data) {
	let songHTML='';
	for(let i = 0; i < data.length; i++) {
		//console.log(data[i].uri);
		songHTML += `<div data-album-id='${data[i].id}' class='album'>${data[i].name}</div><br>`

	}
	$('.results').html(songHTML);

	//let audioObject = new Audio(data.tracks.items[0].preview_url); //create a new audio object using the data returned from Spotify.com
	//				audioObject.play(); //play the song!!!
}

$('body').on('click', '.album', function (e) { 
	console.log(e);
	$.post("/tracks", {e: e}, function(result){
        	console.log(result);
        	//S$('.results').html(result.data);
        	//loopThroughVid(result.data);
        	let audioObject = new Audio(result.data[0].preview_url); //create a new audio object using the data returned from Spotify.com
			audioObject.play(); //play the song!!!
    	});   
    });


//<iframe src="https://open.spotify.com/embed?uri=${data[i].uri}" width="300" height="380" frameborder="0" allowtransparency="true"></iframe><br>`;