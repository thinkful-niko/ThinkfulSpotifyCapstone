var audioObject = new Audio();

$('body').on('click', '.album', function (e) { 
	console.log(this);
	console.log($(this).data('album-id'))

	let album = $(this).data('album-id')
	let artist = $(this).data('artist-name')

	let data = {
	    album:album,
	     artist: artist
	}
	console.log(data);

	$.post("/tracks", data, function(result){
        	console.log(result);
        	//S$('.results').html(result.data);
        	//loopThroughVid(result.data);
        	audioObject.pause();
        	audioObject = new Audio(result.data[0].preview_url); //create a new audio object using the data returned from Spotify.com
			audioObject.play(); //play the song!!!
    	});   
    });


//<iframe src="https://open.spotify.com/embed?uri=${data[i].uri}" width="300" height="380" frameborder="0" allowtransparency="true"></iframe><br>`;