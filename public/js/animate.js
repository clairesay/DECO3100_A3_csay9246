// PLOT OF TWITTER ACTIVITY FOR BOTH TRUMP AND OBAMA
var allObama,
    allTrump,    
    obamaData = [],
    trumpData = [],
    obamaDates = [],
    trumpDates = [],
    allDates,
    obamaFake,
    trumpFake;

Plotly.d3.csv("https://raw.githubusercontent.com/clairesay/DECO3100_A3_csay9246/main/public/data/tweet_values.csv", function (err, rows) {
    allObama = unpack(rows, 'obama_tweet_count');
    allTrump = unpack(rows, 'trump_tweet_count');

    allDates = unpack(rows, 'date');

    allObama.forEach(function(data, index) {
        if (data != "") {
            obamaData.push(allObama[index])
            obamaDates.push(allDates[index])
        }
    })

    allTrump.forEach(function(data, index) {
        if (data != "") {
            trumpData.push(allTrump[index])
            trumpDates.push(allDates[index])
        }
    })

    obamaFake = Array(obamaData.length).fill(0);
    trumpFake = Array(trumpData.length).fill(0);

    // 6 months before first election
    // first 100 days
    // middle period
    // one year before re-election (until January of the next term)

    var data = [{
        // type: 'scatter',
        // mode: 'markers',
        x: obamaDates,
        y: obamaFake,
        line: {simplify: false},
    }, {
        // type: 'scatter',
        // mode: 'markers',
        x: trumpDates,
        y: trumpFake,
        line: {simplify: false},
    }
    ];

    var layout = {
        // title: 'Diversity across the US,'
        yaxis: {
            range: [0, 1500]
        },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent'
    };
    Plotly.react('total-obama-line', data, layout, { displayModeBar: false });
    // Plotly.newPlot('total-trump-line', [data[1]], layout, { displayModeBar: false });
})


function observe(id) {

}

    // let article = document.querySelector('#' + id)
    // if (article.getAttribute('status') != 1) {
    //     return
    // }


// When you scroll into an article, you increment its attribute by 1, all other articles have attribute 0
// Only run the function once, when the attribute == 1 otherwise, rest
// When you scroll into a different article, the previous article gest reset to 0 and the one you scrolled into increments by one.

function animate(id) {
    let data;

    if (id == 'obama-tweet') {
        data = [{
            x: obamaDates,
            y: obamaData,
        }, {
            x: trumpDates,
            y: trumpFake,
        }]
    } else if (id == 'trump-tweet') {
        data = [{
            x: obamaDates,
            y: obamaFake,
        }, {
            x: trumpDates,
            y: trumpData,
        }]
    } else if (id == 'obama-tweet-reelect') {

    } else if (id == 'both') {
        data = [{
            x: obamaDates,
            y: obamaFake,
        }, {
            x: trumpDates,
            y: trumpData,
        }]
    }

    // console.log(data)
    Plotly.animate('total-obama-line', {
        data,
    }, {
      transition: {
        duration: 500,
        easing: 'cubic-in-out',
      },
      frame: {
        duration: 500,
      }
    });
}