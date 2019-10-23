//////////////////////////////////////////
// TO DO                                //
//////////////////////////////////////////

//testing giphy API

//trying to make the code DRY

//trying to create objects for respective sections


$(() => {

    //Global variables
    const $gifsContainer = $('.carousel-gifs')
    let currentIndex = 0;
    let highestIndex = 0;


    //trying to make the code DRY
    const UI = {
        //defining addGif method
        //params: data(object) -- comes from AJAX call
        //returns nothing
        //summary: for each data object coming from the AJAX call, it loops 50 times(the amount of limit of the API). Grabs the embed URL, height and width, then appends an iframe element to the gifs container. It also changes the value of the variable highestIndex based on the amount of elements added.
        addGif: (data) => {
            for(let i = 0; i < 50; i++){
                const $gif = $('<iframe>').attr('frameBorder', '0');

                const $url = data.data[i].embed_url;

                //height and width for the iframe attr
                const $height = data.data[i].images.original.height;

                const $width = data.data[i].images.original.width;

                //adding to the $gif variable
                $gif.attr('src', $url);
                $gif.attr('height', $height);
                $gif.attr('width', $width);

                //appending to the body
                $gifsContainer.append($gif);
            }
            highestIndex = $('.carousel-gifs').children().length -1;
        }
    } //end of UI object


    const App = {
        //defining ajaxCall
        //params: search(string), randomIndex(int)
        //returns nothing
        //summary: calls the giphy API to return data based on the search query(search variable) and the index for the search(offset), if the call is successfull, it calls the method addGif passing data as an argument
        ajaxCall: (search, randomIndex) => {
            $.ajax({
                url:'https://api.giphy.com/v1/gifs/search?api_key=xj0u5sGZ4wDzUWFeai6BjNWSAuOIlmUk&q='+search+'&limit=100&offset='+randomIndex+'&rating=PG&lang=en'
                }).then(
                (data)=>{
                    UI.addGif(data);
                },
                ()=>{
                    console.log('bad request');
                })
        }
    } //end of App object


    const EventHandlers = {
        //defining generateGif
        //params: event
        //returns nothing
        //summary: it generates a random index amount and based on the button clicked(dogs or cats), it defines the sarch query for the ajax call. It also empties the gifs container.
        generateGif: (event) => {
            const randomIndex = Math.floor(Math.random() * 1000);
            const search = $(event.target).attr('id');

            currentIndex = 0;
            highestIndex = 0;

            $('.carousel-button').css('display', 'block');

            $gifsContainer.empty();

            App.ajaxCall(search, randomIndex);
        },

        //defining nextGif
        //params none
        //returns nothing
        //summary: when clicked, changes the display of current gif appended to none, and it goes to the next gif appended and changes the display to block, based on the current index of the children appended on the carousel-gifs container.
        nextGif: () => {
            $('.carousel-gifs').children().eq(currentIndex).css('display', 'none');

            if (currentIndex < highestIndex){
                currentIndex++
            } else {
                currentIndex = 0;
            }

            $('.carousel-gifs').children().eq(currentIndex).css('display', 'block');
        },

        //defining previousGif
        //params none
        //returns nothing
        //summary: when clicked, changes the display of current gif appended to none, and it goes to the previous gif appended and changes the display to block, based on the current index of the children appended on the carousel-gifs container.
        previousGif: () => {
            $('.carousel-gifs').children().eq(currentIndex).css('display', 'none');

            if (currentIndex > 0){
                currentIndex--
            } else {
                currentIndex = highestIndex;
            }

            $('.carousel-gifs').children().eq(currentIndex).css('display', 'block');
        }
    }



    //event listeners
    $('.gifButton').on('click', EventHandlers.generateGif);

    $('.next').on('click', EventHandlers.nextGif);

    $('.previous').on('click', EventHandlers.previousGif);


})
