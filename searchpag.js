var playlistId, nextPageToken, prevPageToken;


function handleAPILoaded() {
    $('#search-button').attr('disabled', false);
  }
  
  // Search for a specified string.
  function search() {
    var q = $('#query').val();
    var request = gapi.client.youtube.search.list({
      q: q,
      part: 'snippet',
      maxResults: 10
    });
    
  
    request.execute(function(response) {

        nextPageToken = response.result.nextPageToken;
        var nextVis = nextPageToken ? 'visible' : 'hidden';
        $('#next-button').css('visibility', nextVis);
        prevPageToken = response.result.prevPageToken
        var prevVis = prevPageToken ? 'visible' : 'hidden';
        $('#prev-button').css('visibility', prevVis);

        var items = response.result.items;
      var str = JSON.stringify(response.result);
      //$('#search-container').html('<pre>' + str + '</pre>');
      $.each(items, function(index, item){
        $('#search-container').append('<p>' + item.snippet.title +' ---- ' +item.id.videoId  + '</p>');
        console.log(item.snippet);
      });
    });

  }

 

  function paginacion(pageToken){
    var requestOptions = {
        playlistId: playlistId,
        part: 'snippet',
        maxResults: 10
      };
    
      if (pageToken) {
        requestOptions.pageToken = pageToken;
      }
      
      var request = gapi.client.youtube.search.list(requestOptions);

      request.execute(function(response) {
        // Only show pagination buttons if there is a pagination token for the
        // next or previous page of results.
        
    
        var playlistItems = response.result.items;
        if (playlistItems) {
          $.each(playlistItems, function(index, item) {
            displayResult(item.snippet);
          });
        } else {
          $('#video-container').html('Sorry you have no uploaded videos');
        }
      });
  }

  // Create a listing for a video.
  function displayResult(videoSnippet) {
    var title = videoSnippet.title;
    //var videoId = videoSnippet.resourceId.videoId;
    $('#video-container').append('<p>' + title +  '</p>');
}

// Retrieve the next page of videos in the playlist.
function nextPage() {
    paginacion(nextPageToken);
}

// Retrieve the previous page of videos in the playlist.
function previousPage() {
    paginacion(prevPageToken);
}