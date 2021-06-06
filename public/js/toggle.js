// this file handles all the animated changes for the sunburst and scatter plots

// initialise an attribute status with nothing for all at the beginning
var articles = document.querySelectorAll('article')
articles.forEach(function (article) {
    article.setAttribute('status', 0)
})

// updates the corresponding plot to the evolved state
function plotChange(id) {
    let triggerArticle = document.querySelector('#' + id)
    triggerArticle.setAttribute('status', parseInt(triggerArticle.getAttribute('status')) + 1)

    switch (id) {
        // sunburst chart cases
        case 'obama-we':
        case 'obama-you':
        case 'trump-they':
        case 'trump-i':
            if (triggerArticle.getAttribute('status') == 1) {
                animateSunburst(id)
            }
            articles.forEach(function (article) {
                if (article.id != id) {
                    article.setAttribute('status', 0)
                }
            })
            break;

        // scatterplot cases
        case 'neither':
        case 'obama-tweet':
        case 'trump-tweet':
        case 'obama-tweet-reelect':
        case 'trump-tweet-reelect':
        case 'both':
            if (triggerArticle.getAttribute('status') == 1) {
                animate(id)
            }
            articles.forEach(function (article) {
                if (article.id != id) {
                    article.setAttribute('status', 0)
                }
            })

            break;
        default:
        // code block
    }
}