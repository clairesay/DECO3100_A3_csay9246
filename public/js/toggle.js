var positions = [
    {

    },
]

// updates the corresponding plot to the evolved state
function plotChange(id) {
    // section.style.backgroundColor = 'green';
    // child.style.backgroundColor = 'olive'

    switch (id) {

        case 'ethnic':
            // updateImmigration()
            break;
        case 'obama-tweet':
        case 'obama-tweet-reelect':
        case 'trump-tweet':
            // code block
            // console.log(id)
            animate(id)
            break;
        // case 'obama-tweet-reelect':
        //     animate('obama-tweet-reelect')
        //     break;
        default:
        // code block
    }
}

// returns the corresponding plot to its default state
function resetChange(id) {

    // section.style.backgroundColor = 'pink';
    // child.style.backgroundColor = 'fuschia'
}