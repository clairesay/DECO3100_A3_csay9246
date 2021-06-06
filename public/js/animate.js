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
    trumpFake,
    obama500Fake,
    trump500Fake;

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
    obama500Fake = Array(obamaData.length).fill(500);
    trumpFake = Array(trumpData.length).fill(0);
    trump500Fake = Array(obamaData.length).fill(500);

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
            color: '#909090'
            // color: obamaSentiment
        },
        marker: {
            size: 24,
            cmin: cmin,
            cmax: cmax,
            showscale: false,
            colorbar: {
                title: '<b>Sentiment</b>',
                outlinecolor: 'transparent',
                thickness: 8,
                nticks: 4,
            },
            colorscale: 'Bluered',
            color: obamaFake

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
            color: '#909090'
            // color: trumpSentiment
        },
        marker: {
            size: 24,
            showscale: false,
            cmin: cmin,
            cmax: cmax,
            colorbar: {
                title: '<b>Sentiment</b>',
                outlinecolor: 'transparent',
                thickness: 8,
                nticks: 4,
            },
            colorscale: 'Bluered',
            color: obamaFake

        }
    }
    ];

    var layout = {
        showlegend: false,
        title: {
            text:  '<b>TWEET SENTIMENT: MONTHLY AVERAGE</b>',
            font: {
                size: 16
            }
        },
        font: {
            family: 'PT Sans',
            size: 12,
            color: black
        },
        xaxis: {
            // range: ['2009-01-01', '2021-03-01']
            // range: ['2008-10-01', '2013-03-01']
            range: ['2008-01-01', '2013-12-01']
        },
        yaxis: {
            title: {
                text: 'Monthly Tweet Count',
                // family: 'PT Sans',
                // size: 14,
                // color: obamaColor,
            },
            range: [-100, 1000]
        },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
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
            y: obamaData,
            opacity: 1,
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
                size: 12,
                showscale: true,
                color: obamaSentiment
            },
            hoverinfo: 'auto'
        }, {
            x: trumpDates,
            y: trumpFake,
            opacity: 0,
            marker: {
                showscale: false,
                color: trumpSentiment
            }
        }]

        layout = {
            xaxis: {
                range: ['2008-01-01', '2013-12-01']
            },
            yaxis: {
                range: [-100, 1000],
                // https://stackoverflow.com/questions/54826436/how-to-remove-axes-and-numbers-from-plotly
                zeroline: true, // thick line at x=0
                visible: true,  // numbers below
            },
            shapes: [
                {
                    type: 'rect',
                    layer: 'below',
                    // x-reference is assigned to the x-values
                    xref: 'x',
                    // y-reference is assigned to the plot paper [0,1]
                    yref: 'paper',
                    x0: '2012-01-01',
                    y0: 0,
                    x1: '2013-03-01',
                    y1: 1,
                    fillcolor: grey,
                    opacity: 0.9,
                    line: {
                        width: 0
                    }
                }, null, null],
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
                showscale: false,
                color: obamaSentiment
            }
        }, {
            x: trumpDates,
            y: trumpData,
            opacity: 1,
            marker: {
                size: 12,
                showscale: true,
                color: trumpSentiment,
            },
            hoverinfo: 'auto'
        }]
        layout = {
            xaxis: {
                // range: ['2009-01-01', '2021-03-01']
                range: ['2016-01-01', '2021-12-01']
            },
            yaxis: {
                range: [-100, 1000],
                // https://stackoverflow.com/questions/54826436/how-to-remove-axes-and-numbers-from-plotly
                zeroline: true, // thick line at x=0
                visible: true,  // numbers below
            },
            shapes: [
                {
                    type: 'rect',
                    layer: 'below',
                    // x-reference is assigned to the x-values
                    xref: 'x',
                    // y-reference is assigned to the plot paper [0,1]
                    yref: 'paper',
                    x0: '2020-01-01',
                    y0: 0,
                    x1: '2021-03-01',
                    y1: 1,
                    fillcolor: grey,
                    opacity: 0.9,
                    line: {
                        width: 0
                    }
                }, null, null, null, null, null],
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
                },
                null
            ]
        }
    } else if (id == 'obama-tweet-reelect') {
        data = [{
            x: obamaDates,
            y: obama500Fake,
            opacity: 1,
            marker: {
                size: 36,
                showscale: true,
                color: obamaSentiment
            },
            hoverinfo: 'x'
        }, {
            x: trumpDates,
            y: trumpFake,
            opacity: 0,
            marker: {
                showscale: false,
                color: trumpSentiment
            }
        }]
        layout = {
            xaxis: {
            // range: ['2009-01-01', '2021-03-01']
            range: ['2008-01-01', '2013-12-01']
            },
            yaxis: {
                // range: [-100, 100],
                // https://stackoverflow.com/questions/54826436/how-to-remove-axes-and-numbers-from-plotly
                zeroline: false, // thick line at x=0
                visible: false,  // numbers below
            },
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
                    // layer: 'below',
                    // x-reference is assigned to the x-values
                    xref: 'x',
                    // y-reference is assigned to the plot paper [0,1]
                    yref: 'y',
                    x0: '2009-01-01',
                    y0: 700,
                    x1: '2012-12-01',
                    y1: 705,
                    fillcolor: black,
                    // opacity: 0.6,
                    line: {
                        width: 0
                    }
                },
                {
                    type: 'rect',
                    xref: 'x',
                    yref: 'y',
                    x0: '2009-01-01',
                    y0: 680,
                    x1: '2009-01-01',
                    y1: 705,
                },
                {
                    type: 'rect',
                    xref: 'x',
                    yref: 'y',
                    x0: '2012-12-01',
                    y0: 680,
                    x1: '2012-12-01',
                    y1: 705,
                }
            ],
            annotations: [{
                x: 0.5,
                    y: 0.85,
                    xref: 'paper',
                    yref: 'paper',
                    text: 'consistency in sentiment',
                    showarrow: false,
                    // arrowhead: 0,
                    // ax: 0,
                    // ay: -40,
                    font: {
                        family: 'PT Sans',
                        size: 14,
                        color: black
                },
            }],
        }
    } else if (id == 'trump-tweet-reelect') {
        data = [{
            x: obamaDates,
            y: obamaFake,
            opacity: 0,
            marker: {
                color: obamaSentiment
            }
        }, {
            x: trumpDates,
            y: trump500Fake,
            opacity: 1,
            marker: {
                size: 36,
                color: trumpSentiment,
                showscale: true
            },
            hoverinfo: 'x'
        }]
        layout = {
            xaxis: {
                range: ['2016-01-01', '2021-12-01']
            },
            yaxis: {
                // range: [-100, 100],
                // https://stackoverflow.com/questions/54826436/how-to-remove-axes-and-numbers-from-plotly
                zeroline: false, // thick line at x=0
                visible: false,  // numbers below
            },
            shapes: [
                {
                    type: 'rect',
                    // layer: 'below',
                    // x-reference is assigned to the x-values
                    xref: 'x',
                    // y-reference is assigned to the plot paper [0,1]
                    yref: 'y',
                    x0: '2017-01-01',
                    y0: 700,
                    x1: '2018-12-01',
                    y1: 705,
                    fillcolor: black,
                    // opacity: 0.6,
                    line: {
                        width: 0
                    }
                },
                {
                    type: 'rect',
                    xref: 'x',
                    yref: 'y',
                    x0: '2017-01-01',
                    y0: 680,
                    x1: '2017-01-01',
                    y1: 705,
                },
                {
                    type: 'rect',
                    xref: 'x',
                    yref: 'y',
                    x0: '2018-12-01',
                    y0: 680,
                    x1: '2018-12-01',
                    y1: 705,
                },
                // ///
                {
                    type: 'rect',
                    // layer: 'below',
                    // x-reference is assigned to the x-values
                    xref: 'x',
                    // y-reference is assigned to the plot paper [0,1]
                    yref: 'y',
                    x0: '2019-03-01',
                    y0: 700,
                    x1: '2020-12-01',
                    y1: 705,
                    fillcolor: black,
                    // opacity: 0.6,
                    line: {
                        width: 0
                    }
                },
                {
                    type: 'rect',
                    xref: 'x',
                    yref: 'y',
                    x0: '2019-03-01',
                    y0: 680,
                    x1: '2019-03-01',
                    y1: 705,
                },
                {
                    type: 'rect',
                    xref: 'x',
                    yref: 'y',
                    x0: '2020-12-01',
                    y0: 680,
                    x1: '2020-12-01',
                    y1: 705,
                }
            ],
            annotations: [
                {
                    x: 0.25,
                    y: 0.85,
                    xref: 'paper',
                    yref: 'paper',
                    text: 'mostly positive',
                    showarrow: false,
                    // arrowhead: 0,
                    // ax: 0,
                    // ay: -40,
                    font: {
                        family: 'PT Sans',
                        size: 14,
                        color: black
                    },
                },
                {
                    x: 0.78,
                    y: 0.85,
                    xref: 'paper',
                    yref: 'paper',
                    text: 'mostly negative',
                    showarrow: false,
                    // arrowhead: 0,
                    // ax: 0,
                    // ay: -40,
                    font: {
                        family: 'PT Sans',
                        size: 14,
                        color: black
                    },
                }
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