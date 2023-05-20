const $searchForm = $("form")



$searchForm.on('submit', event => {
    // prevents page from refreshing
    event.preventDefault()
    console.log(event.target) 

    // generate data from the target object
    const formData = new FormData(event.target);

    // get the value from the generated data where the name value is "pokemon"
    const pokemon = formData.get('pokemon').toLowerCase();

    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`

    console.log(url)

    const $screen = $(".screen")
    const $results = $('.results')

    // empty out the input field b/w searches
    $('[name="pokemon"]')[0].value = "";

    // empty out previous result & add in a loading indicator
    $screen.empty();

    $results.html(`<div>Loading...</div>`)
      
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            $screen.html(`<img src=${data.sprites.front_default} alt=${data.name}>`)
        
           $results.html(`
             <div>
                <b>name:&nbsp;</b> ${data.name}
             </div>
             <div>
                <b>id:&nbsp;</b> ${data.id}
             </div>
             <div>
                <b>weight:&nbsp;</b> ${data.weight}
             </div>
             <div>
                <b>type:&nbsp;</b> ${data.types.map(v => v.type.name)}
             </div>`)
        })
        .catch(() => {
            $results.html(`<div> there was an error...</div>`)
        });

    })