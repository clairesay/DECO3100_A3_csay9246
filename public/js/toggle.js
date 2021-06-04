var positions = [
    {

    },
]

var articles = document.querySelectorAll('article')
articles.forEach(function(article) {
    article.setAttribute('status', 0)
})

// updates the corresponding plot to the evolved state
function plotChange(id) {
    // section.style.backgroundColor = 'green';
    // child.style.backgroundColor = 'olive'
    let triggerArticle = document.querySelector('#' + id)
    triggerArticle.setAttribute('status', parseInt(triggerArticle.getAttribute('status')) + 1)
    // article.setAttribute('status', 0)
    switch (id) {

        case 'ethnic':
            // updateImmigration()
            break;
        case 'neither':
        case 'obama-tweet':
        case 'trump-tweet':
        case 'obama-tweet-reelect':
        case 'trump-tweet-reelect':
        case 'both':
            // code block
            // console.log(id)
            // observe(id)
            if (triggerArticle.getAttribute('status') == 1) {
                animate(id)
            }
            articles.forEach(function(article) {
                if (article.id != id) {
                    article.setAttribute('status', 0)
                }
            })
            
            break;
        // case 'obama-tweet-reelect':
        //     if (triggerArticle.getAttribute('status') == 1) {
        //         console.log(id)
        //         animate(id)
        //     }

        //     articles.forEach(function(article) {

        //         if (article.id != id) {
        //             article.setAttribute('status', 0)
        //         }
        //     })
            
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