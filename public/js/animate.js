// PLOT OF TWITTER ACTIVITY FOR BOTH TRUMP AND OBAMA
var obamaData,
    trumpData,
    dates,
    obamaFake,
    trumpFake;

Plotly.d3.csv("https://raw.githubusercontent.com/clairesay/DECO3100_A3_csay9246/main/public/data/tweet_values.csv", function (err, rows) {
    obamaData = unpack(rows, 'obama_tweet_count');
    trumpData = unpack(rows, 'trump_tweet_count');
    dates = unpack(rows, 'date');
    obamaFake = Array(obamaData.length).fill(0);
    trumpFake = Array(trumpData.length).fill(0);

    var data = [{
        type: 'scatter',
        mode: 'markers',
        x: dates,
        y: obamaFake,
    }, {
        type: 'scatter',
        mode: 'markers',
        x: dates,
        y: trumpFake
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

function animate(id) {
    let data;
    if (id == 'obama-tweet') {
        data = [{
            x: dates,
            y: obamaData,
        }, {
            x: dates,
            y: trumpFake,
        }]
    } else if (id == 'trump-tweet') {
        data = [{
            x: dates,
            y: obamaFake,
        }, {
            x: dates,
            y: trumpData,
        }]
    }

    console.log(data)
    Plotly.animate('total-obama-line', {
        data
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