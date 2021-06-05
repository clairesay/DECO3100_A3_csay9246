// PLOT OF TWITTER ACTIVITY FOR BOTH TRUMP AND OBAMA
var allObama,
    allTrump,
    allObamaSentiment,
    allTrumpSentiment,    
    obamaData = [],
    trumpData = [],
    obamaDates = [],
    trumpDates = [],
    obamaSentiment = [],
    trumpSentiment = [],
    allDates,
    obamaFake,
    trumpFake;

Plotly.d3.csv("https://raw.githubusercontent.com/clairesay/DECO3100_A3_csay9246/main/public/data/monthly_sentiment.csv", function (err, rows) {
    allObama = unpack(rows, 'obama_frequency');
    allTrump = unpack(rows, 'trump_frequency');

    allObamaSentiment = unpack(rows, 'obama_sentiment_average')
    allTrumpSentiment = unpack(rows, 'trump_sentiment_average')

    allDates = unpack(rows, 'date');

    allObama.forEach(function(data, index) {
        if (data != "") {
            obamaData.push(allObama[index])
            obamaDates.push(allDates[index])
            obamaSentiment.push(allObamaSentiment[index])
        }
    })

    allTrump.forEach(function(data, index) {
        if (data != "") {
            trumpData.push(allTrump[index])
            trumpDates.push(allDates[index])
            trumpSentiment.push(allTrumpSentiment[index])
        }
    })

    let cmin = 'auto',
        cmax = 'auto'

    // console.log(allObama)
    // console.log(allTrump)
    console.log(obamaSentiment)
    console.log(trumpSentiment)

    obamaFake = Array(obamaData.length).fill(0);
    trumpFake = Array(trumpData.length).fill(0);

    // 6 months before first election
    // first 100 days
    // middle period
    // one year before re-election (until January of the next term)

    var heatmapData = [{
        z: [obamaSentiment],
        type: 'heatmap',
        colorscale: 'Bluered',
        showscale: false
    }]
    var heatmapLayout = {
        margin: {l: 0, r: 0, t: 0, b: 0}
    }
    Plotly.newPlot('total-trump-line', heatmapData, heatmapLayout, {displayModeBar: false});

    var data = [{
        // type: 'scatter',
        // mode: 'markers',
        // mode: 'lines',
        mode: 'markers+lines',
        x: obamaDates,
        y: obamaFake,
        name: 'Obama',
        opacity: 0,
        line: {
            width: 3,
            simplify: false,
            color: grey
            // color: obamaSentiment
        },
        marker: {
            size: 12,
            cmin: cmin,
            cmax: cmax,
            showscale: false,
            colorbar: {
                outlinecolor: 'transparent',
                thickness: 8,
            },
            colorscale: 'Bluered',
            color: obamaSentiment

        }
        
    }, {
        // type: 'scatter',
        // mode: 'markers',
        // mode: 'lines',
        mode: 'markers+lines',
        x: trumpDates,
        y: trumpFake,
        name: 'Trump',
        opacity: 0,
        line: {

            width: 3,
            simplify: false,
            color: grey
            // color: trumpSentiment
        },
        marker: {
            size: 12,
            showscale: false,
            cmin: cmin,
            cmax: cmax,
            colorbar: {
                outlinecolor: 'transparent',
                thickness: 8,
            },
            colorscale: 'Bluered',
            color: trumpSentiment

        }
    }
    ];

    var layout = {
        showlegend: false,
        // title: 'Diversity across the US,'
        font: {
            family: 'PT Sans',
            size: 12,
            color: black
        },
        xaxis: {
            range: ['2009-01-01', '2021-03-01']
        },
        yaxis: {
            title: {
                text: 'Monthly Tweet Count',
                // family: 'PT Sans',
                // size: 14,
                // color: obamaColor,
            },
            range: [0, 1000]
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
            opacity: 0,
            marker: {
                showscale: false
            }
        }, {
            x: trumpDates,
            y: trumpFake,
            opacity: 0,
            marker: {
                showscale: false
            }
        }]

        layout = {
            shapes: [null],
            annotations: [null]
        }
    } else if (id == 'obama-tweet') {
        data = [{
            x: obamaDates,
            y: obamaData,
            opacity: 1,
            marker: {
                showscale: true
            }
        }, {
            x: trumpDates,
            y: trumpFake,
            opacity: 0,
            marker: {
                showscale: false
            }
        }]

        layout = {
            shapes: [null
                // {
                //     type: 'rect',
                //     layer: 'below',
                //     // x-reference is assigned to the x-values
                //     xref: 'x',
                //     // y-reference is assigned to the plot paper [0,1]
                //     yref: 'paper',
                //     x0: '2007-04-01',
                //     y0: 0,
                //     x1: '2007-11-01',
                //     y1: 1,
                //     fillcolor: grey,
                //     opacity: 0.2,
                //     line: {
                //         width: 0
                //     }
                // },
                // {
                //     type: 'rect',
                //     layer: 'below',
                //     // x-reference is assigned to the x-values
                //     xref: 'x',
                //     // y-reference is assigned to the plot paper [0,1]
                //     yref: 'paper',
                //     x0: '2012-01-01',
                //     y0: 0,
                //     x1: '2012-12-01',
                //     y1: 1,
                //     fillcolor: grey,
                //     opacity: 0.2,
                //     line: {
                //         width: 0
                //     }
                // },
            ],

            annotations: [
                {
                    x: obamaDates[obamaData.indexOf((Math.max(...obamaData)).toString())],
                    y: Math.max(...obamaData),
                    xref: 'x',
                    yref: 'y',
                    text: '499 TWEETS',
                    showarrow: true,
                    arrowhead: 0,
                    ax: 0,
                    ay: -40,
                    font: {
                        family: 'PT Sans',
                        size: 14,
                        color: black
                    },
                  }
            ]
        }
    } else if (id == 'trump-tweet') {
        data = [{
            x: obamaDates,
            y: obamaFake,
            opacity: 0,
            marker: {
                showscale: false
            }
        }, {
            x: trumpDates,
            y: trumpData,
            opacity: 1,
            marker: {
                showscale: true
            }
        }]
        layout = {
            shapes: [
                {
                    type: 'rect',
                    layer: 'below',
                    // x-reference is assigned to the x-values
                    xref: 'x',
                    // y-reference is assigned to the plot paper [0,1]
                    yref: 'paper',
                    x0: '2016-01-01',
                    y0: 0,
                    x1: '2016-12-01',
                    y1: 1,
                    fillcolor: grey,
                    opacity: 0.2,
                    line: {
                        width: 0
                    }
                },
                {
                    type: 'rect',
                    layer: 'below',
                    // x-reference is assigned to the x-values
                    xref: 'x',
                    // y-reference is assigned to the plot paper [0,1]
                    yref: 'paper',
                    x0: '2020-04-01',
                    y0: 0,
                    x1: '2021-01-01',
                    y1: 1,
                    fillcolor: grey,
                    opacity: 0.2,
                    line: {
                        width: 0
                    }
                },
            ],
            annotations: [
                {
                    x: trumpDates[trumpData.indexOf((Math.max(...trumpData)).toString())],
                    y: Math.max(...trumpData),
                    xref: 'x',
                    yref: 'y',
                    text: '1415 TWEETS',
                    showarrow: true,
                    arrowhead: 0,
                    ax: 0,
                    ay: -40,
                    font: {
                        family: 'PT Sans',
                        size: 14,
                        color: black
                    },
                  }
            ]
        }
    } else if (id == 'obama-tweet-reelect') {
        data = [{
            x: obamaDates,
            y: obamaData,
            opacity: 1,
        }, {
            x: trumpDates,
            y: trumpFake,
            opacity: 0,
        }]
        layout = {
            shapes: [
                // {
                //     type: 'rect',
                //     layer: 'below',
                //     // x-reference is assigned to the x-values
                //     xref: 'x',
                //     // y-reference is assigned to the plot paper [0,1]
                //     yref: 'paper',
                //     x0: '2007-04-01',
                //     y0: 0,
                //     x1: '2007-11-01',
                //     y1: 1,
                //     fillcolor: grey,
                //     opacity: 0.2,
                //     line: {
                //         width: 0
                //     }
                // },
                {
                    type: 'rect',
                    layer: 'below',
                    // x-reference is assigned to the x-values
                    xref: 'x',
                    // y-reference is assigned to the plot paper [0,1]
                    yref: 'paper',
                    x0: '2012-01-01',
                    y0: 0,
                    x1: '2012-12-01',
                    y1: 1,
                    fillcolor: 'darkgrey',
                    opacity: 0.6,
                    line: {
                        width: 0
                    }
                },
            ],
            annotations: [null],
        }
    } else if (id == 'trump-tweet-reelect') {
        layout = {
            annotations: [
                null
            ]
        }
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