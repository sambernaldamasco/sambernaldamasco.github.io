//testing giphy API



$(() => {
    const $gifsContainer = $('.carousel-gifs')
    let currentIndex = 0;
    let highestIndex = 0;
    $('.gifButton').on('click', (event) => {
        $gifsContainer.empty();
        const randomIndex = Math.floor(Math.random() * 1000);
        const search = $(event.target).attr('id');

        $.ajax({
            url:'https://api.giphy.com/v1/gifs/search?api_key=xj0u5sGZ4wDzUWFeai6BjNWSAuOIlmUk&q='+search+'&limit=5&offset='+randomIndex+'&rating=PG&lang=en'
            }).then(
            (data)=>{

                // console.log(data.data);
                // console.log(data.data[0]);
                // console.log(data.data[0].images);
                // console.log(data.data[0].images.original);
                for(let i = 0; i < 5; i++){
                    const $gif = $('<iframe>').attr('frameBorder', '0');
                    console.log(data.data[i].embed_url);
                    const $url = data.data[i].embed_url;

                    //height and width for the iframe attr
                    // console.log(data.data[i].images.original.height);
                    const $height = data.data[i].images.original.height;

                    // console.log(data.data[i].images.original.width);
                    const $width = data.data[i].images.original.width;

                    //adding to the $gif variable

                    $gif.attr('src', $url);
                    $gif.attr('height', $height);
                    $gif.attr('width', $width);

                    console.log($gif);
                    //appending to the body
                    $gifsContainer.append($gif);
                }
                highestIndex = $('.carousel-gifs').children().length -1;
            },
            ()=>{
                console.log('bad request');
            }

        );//end of then method
    }) //end of on click handler

    $('.next').on('click', () => {

        $('.carousel-gifs').children().eq(currentIndex).css('display', 'none');

        if (currentIndex < highestIndex){
            currentIndex++
        } else {
            currentIndex = 0;
        }

        $('.carousel-gifs').children().eq(currentIndex).css('display', 'block');
    })


})
