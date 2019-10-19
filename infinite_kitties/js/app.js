//testing giphy API



$(() => {

    const $gifsContainer = $('.carousel-gifs')

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
                //get url for the src on iframe
                // console.log(data.data[0].embed_url);
                // const $url = data.data[0].embed_url;
                //
                // //height and width for the iframe attr
                // // console.log(data.data[0].images.original.height);
                // const $height = data.data[0].images.original.height;
                //
                // // console.log(data.data[0].images.original.width);
                // const $width = data.data[0].images.original.width;
                //
                // //adding to the $gif variable
                //
                // $gif.attr('src', $url);
                // $gif.attr('height', $height)
                // $gif.attr('width', $width)
                //
                // //appending to the body
                // $container.append($gif)



            },
            ()=>{
                console.log('bad request');
            }
        );

    }) //end of on click handler




})
