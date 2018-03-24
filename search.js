// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
    $('#search-button').attr('disabled', false);
  }
  
  // Search for a specified string.
  function search() {
    var results={} ;
    var q = $('#query').val();
    var request = gapi.client.youtube.search.list({
      q: q,
      type: 'video',
      part: 'snippet',
      maxResults: 2,
      order: "viewCount"
    });
  
    request.execute(function(response) {
        results = response.result;
      var str = JSON.stringify(response.result);
      $('#search-container').html('<pre>' + str + '</pre>');
      //return response.result;
      console.log(response.result);
    });

    return results;
   
  }