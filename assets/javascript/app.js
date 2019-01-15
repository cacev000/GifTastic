$(document).ready(function() {
    var topics = [];
    var apiKey = 'W0gseXupH5WJ4810nnjtEbFFT4CZxl0C';
    var selectedTopic;

    $('#addGifForm').submit(function(event) {
        // prevent form from submitting
        event.preventDefault();
        var buttonElement;

        var userInput = $('#userHero').val();

        var queryUrl = 'https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&q=' + selectedTopic + '&limit=10&offset=0&rating=G&lang=en';

        $.ajax(queryUrl).then(function(response) {
            // if query returns no response then notify user that it found nothing for their input
            if (response.data.length > 0) {
                // obtain user input and add it to the topics array
                topics.push(userInput);

                // create and set button attribute and classes for input provided
                buttonElement = $('<button>' + userInput + '</button>');
                buttonElement.attr('data-item-value', 'item-' + userInput);
                buttonElement.addClass('btn btn-default gifName');
                buttonElement.css('margin', '5px');

                $('#gifList').append(buttonElement);

                // empty input text
                $('#userHero').val('');
            } else {
                alert('Could not find anything related to your input');
            }
        });


    });

    // get gifs from button
    $(document.body).on('click', '.gifName', function() {
        selectedTopic = $(this).attr('data-item-value');

        if (selectedTopic !== '') {
            var queryUrl = 'https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&q=' + selectedTopic + '&limit=10&offset=0&rating=G&lang=en';
            $.ajax(queryUrl).then(function(response) {
                response.data.forEach(function(gifData) {

                    // create card element and set class and css
                    var cardElement = $('<div>');
                    cardElement.addClass('card');
                    cardElement.css('width', gifData.images.original.width);
                    cardElement.css('margin', '10px');

                    // create gif element and set class, attributes and css
                    var gifElement = $('<img class="still-gif">');
                    gifElement.attr('src', gifData.images.original_still.url);
                    gifElement.attr('data-moving-gif', gifData.images.original.url);
                    gifElement.attr('data-still-gif', gifData.images.original_still.url);
                    gifElement.css('width', gifData.images.original.width);

                    // create card body element and set class
                    var cardBody = $('<div>');
                    cardBody.addClass('card-body');

                    var cardInnerText = $('<p>Rating: ' + gifData.rating.toUpperCase() + '</p>');

                    cardBody.append(cardInnerText);

                    cardElement.append(gifElement);
                    cardElement.append(cardBody);

                    $('#displayGifs').prepend(cardElement);
                });
            });
        }
    });

    // This only works when still-gif class is available in gif so it can start the gif
    $(document.body).on('click', '.still-gif', function() {
        var movingGif = $(this).attr('data-moving-gif');

        $(this).attr('src', movingGif);
        $(this).removeClass('still-gif').addClass('moving-gif');
    });

    // This only works when the gif is running hence moving-gif in order to stop it
    $(document.body).on('click', '.moving-gif', function() {
        var stillGif = $(this).attr('data-still-gif');

        $(this).attr('src', stillGif);
        $(this).removeClass('moving-gif').addClass('still-gif');
    });


});