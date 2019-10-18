//testing giphy API



$(() => {

    const $gif = $('<iframe>').attr('frameBorder', '0');
    const randomIndex = Math.floor(Math.random() * 100);

    $.ajax({
        url:'https://api.giphy.com/v1/gifs/search?api_key=xj0u5sGZ4wDzUWFeai6BjNWSAuOIlmUk&q=cats&limit=1&offset='+randomIndex+'&rating=PG&lang=en'
        }).then(
        (data)=>{

            // console.log(data.data);
            // console.log(data.data[0]);
            // console.log(data.data[0].images);
            // console.log(data.data[0].images.original);


            //get url for the src on iframe
            console.log(data.data[0].embed_url);
            const $url = data.data[0].embed_url;

            //height and width for the iframe attr
            // console.log(data.data[0].images.original.height);
            const $height = data.data[0].images.original.height;

            // console.log(data.data[0].images.original.width);
            const $width = data.data[0].images.original.width;

            //adding to the $gif variable

            $gif.attr('src', $url);
            $gif.attr('height', $height)
            $gif.attr('width', $width)

            //appending to the body
            $('body').append($gif)



        },
        ()=>{
            console.log('bad request');
        }
    );


})
