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

Plotly.d3.csv("https://raw.githubusercontent.com/clairesay/DECO3100_A3_csay9246/main/public/data/tweet_count_condensed.csv", function (err, rows) {
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

// https://codepen.io/plotly/pen/ZpWPpj
function animate(id) {
    let data, layout;
    if (id == 'neither') {
        data = [{
            x: obamaDates,
            y: obamaFake,
        }, {
            x: trumpDates,
            y: trumpFake,
        }]
    } else if (id == 'obama-tweet') {
        data = [{
            x: obamaDates,
            y: obamaData,
        }, {
            x: trumpDates,
            y: trumpFake,
        }]

        layout = {
            shapes: [
                // 1st highlight during Feb 4 - Feb 6
                {
                    type: 'rect',
                    // x-reference is assigned to the x-values
                    xref: 'x',
                    // y-reference is assigned to the plot paper [0,1]
                    yref: 'paper',
                    x0: '1/07/2007',
                    y0: 0,
                    x1: '1/11/2007',
                    y1: 1,
                    fillcolor: black,
                    opacity: 2,
                    line: {
                        width: 0
                    }
                },
            ]
        }
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
        layout
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