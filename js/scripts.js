var $ = require('jquery');
require('jquery-ui/autocomplete');

$(document).ready(function() {
    $('#movie-title').autocomplete({
        source: function(request, response) {
            var endpoint = 'http://api.themoviedb.org/3/search/movie';
            var apiKey   = 'a6f08d7a933981b288872b88b4316a83';
            
            var promise = $.ajax({
                url    : endpoint + "?api_key=" + apiKey + "&query=" + request.term,
                method : 'GET'
            });
            
            promise.done(function(data) {
               response(data.results);
            });
        },
    })
    .data('ui-autocomplete')._renderItem = function(ul, item) {
            return $('<li>')
                .attr( 'data-value', item.title )
                .append( item.title )
                .appendTo( ul );
        };
});