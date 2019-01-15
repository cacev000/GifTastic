$(document).ready(function() {
    var topics = [];
    var apiKey = 'W0gseXupH5WJ4810nnjtEbFFT4CZxl0C';
    var selectedTopic;

    $('#addGifForm').submit(function(event) {
        // prevent form from submitting
        event.preventDefault();
        var buttonElement;

        var userInput = $('#userHero').val();

        // obtain user input and add it to the topics array
        topics.push(userInput);

        buttonElement = $('<button>' + userInput + '</button>');
        buttonElement.attr('data-item-value', 'item-' + userInput);
        buttonElement.addClass('btn btn-default gifName');
        buttonElement.css('margin', '5px');

        $('#gifList').append(buttonElement);

        $('#userHero').val('');
    });

    $(document.body).on('click', '.gifName', function() {
        selectedTopic = $(this).attr('data-item-value');
        var queryUrl = 'https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&q=' + selectedTopic + '&limit=10&offset=0&rating=G&lang=en';

        $.ajax(queryUrl).then(function(response) {
            console.log(response);

            response.data.forEach(function(gifData) {
                var cardElement = $('<div>');
                cardElement.addClass('card');

                var gifElement = $('<img>');
                gifElement.attr('src', gifData.url);

                var cardBody = $('<div>');
                cardBody.addClass('card-body');

                var cardInnerText = $('<p>Rating: ' + gifData.rating + '</p>');

                cardBody.append(cardInnerText);
                gifElement.append(cardBody);

                cardElement.append(gifElement);

                $('#displayGifs').append(cardElement);
            });


        });
    });
});