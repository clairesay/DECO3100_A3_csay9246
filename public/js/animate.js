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
    // unpacking all of the data needed
    allObama = unpack(rows, 'obama_frequency');
    allTrump = unpack(rows, 'trump_frequency');

    allObamaSentiment = unpack(rows, 'obama_sentiment_average')
    allTrumpSentiment = unpack(rows, 'trump_sentiment_average')

    allDates = unpack(rows, 'date');

    // filtering based on relevancy to each president i.e. as long as there is tweets on a certain date, push to array
    allObama.forEach(function (data, index) {
        if (data != "") {
            obamaData.push(allObama[index])
            obamaDates.push(allDates[index])
            obamaSentiment.push(allObamaSentiment[index])
        }
    })

    allTrump.forEach(function (data, index) {
        if (data != "") {
            trumpData.push(allTrump[index])
            trumpDates.push(allDates[index])
            trumpSentiment.push(allTrumpSentiment[index])
        }
    })

    let cmin = 'auto',
        cmax = 'auto'

    // generating placeholder arrays
    obamaFake = Array(obamaData.length).fill(0);
    obama500Fake = Array(obamaData.length).fill(500);
    trumpFake = Array(trumpData.length).fill(0);
    trump500Fake = Array(obamaData.length).fill(500);

    // 6 months before first election
    // first 100 days
    // middle period
    // one year before re-election (until January of the next term)

    // initialising data - this transforms significantly as the user progresses
    var data = [{
        mode: 'markers+lines',
        x: obamaDates,
        y: obamaFake,
        name: 'Obama',
        opacity: 0,
        line: {
            width: 3,
            simplify: false,
            color: '#909090'
        },
        hoverinfo: 'x+y',
        hovertemplate: '<b>%{y} Tweets</b><extra></extra>',
        hoverlabel: {
            bgcolor: white,
            font: {
                family: 'PT Sans'
            }
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
                tickmode: 'array',
                tickvals: [-0.04, 0, 0.10, 0.2, 0.25],
                ticktext: ['<b>-0.05</b> Towards Negative', '<b>0</b>', '<b>0.1</b>', '<b>0.2</b>', '<b>0.25</b> Towards Positive'],
                tickfont: {
                    family: 'PT Sans',
                    color: black
                },
            },
            colorscale: 'Bluered',
            reversescale: true,
            color: obamaFake

        }

    }, {
        mode: 'markers+lines',
        x: trumpDates,
        y: trumpFake,
        name: 'Trump',
        opacity: 0,
        line: {
            width: 3,
            simplify: false,
            color: '#909090'
        },
        hoverinfo: 'x+y',
        hovertemplate: '<b>%{y} Tweets</b><extra></extra>',
        hoverlabel: {
            bgcolor: white,
            font: {
                family: 'PT Sans'
            }
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
                tickmode: 'array',
                tickvals: [0, 0.05, 0.10, 0.15, 0.2, 0.22],
                ticktext: ['<b>0</b>', '<b>0.05</b>', '<b>0.1</b> Towards Negative', '<b>0.15</b>', '<b>0.2</b>', '<b>0.22</b> Towards Positive'],
                tickfont: {
                    family: 'PT Sans',
                    color: black
                },
            },
            colorscale: 'Bluered',
            reversescale: true,
            color: obamaFake
        }
    }
    ];

    var layout = {
        dragmode: false,
        showlegend: false,
        title: {
            text: "<b>OBAMA'S TWEET SENTIMENT: MONTHLY AVERAGE</b>",
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
            range: ['2008-01-01', '2013-12-01']
        },
        yaxis: {
            title: {
                text: '<b>Monthly Tweet Count</b>',
                font: {
                    color: '#909090'
                }
            },
            range: [-100, 1000]
        },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
    };
    Plotly.react('total-obama-line', data, layout, { displayModeBar: false });
})


// When you scroll into an article, you increment its attribute by 1, all other articles have attribute 0
// Only run the function once, when the attribute == 1 otherwise, rest
// When you scroll into a different article, the previous article gest reset to 0 and the one you scrolled into increments by one.

// animating scatter plot https://codepen.io/plotly/pen/ZpWPpj
function animate(id) {
    let data, layout;

    // neutral
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

        // first section
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
            hoverinfo: 'x+y',
            hovertemplate: '<b>%{y} Tweets</b><extra></extra>',
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
            title: {
                text: "<b>OBAMA'S TWEET SENTIMENT: MONTHLY AVERAGE</b>",
            },
            // crop date range to obama's term
            xaxis: {
                range: ['2008-01-01', '2013-12-01']
            },
            yaxis: {
                range: [-100, 1000],
                // hide/show axis values https://stackoverflow.com/questions/54826436/how-to-remove-axes-and-numbers-from-plotly
                zeroline: true, // thick line at x=0
                visible: true,  // numbers below
            },

            // shading lead up to reelection
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

            // annotating high point
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
        // third section
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
            hoverinfo: 'x+y',
            hovertemplate: '<b>%{y} Tweets</b><extra></extra>',
        }]
        layout = {
            title: {
                text: "<b>TRUMP'S TWEET SENTIMENT: MONTHLY AVERAGE</b>",
            },
            // date range
            xaxis: {
                range: ['2016-01-01', '2021-12-01']
            },
            yaxis: {
                range: [-100, 1000],
                zeroline: true,
                visible: true,
            },
            // shading time in lead up to election
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
            // setting annotations for high point
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
        // second section
    } else if (id == 'obama-tweet-reelect') {
        data = [{
            x: obamaDates,
            // clusters all markers to center
            y: obama500Fake,
            opacity: 1,
            marker: {
                // make marker larger to view sentiment rainbow better
                size: 36,
                showscale: true,
                color: obamaSentiment
            },
            hoverinfo: 'x',
            hovertemplate: '',
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
            title: {
                text: "<b>OBAMA'S TWEET SENTIMENT: MONTHLY AVERAGE</b>",
            },
            xaxis: {
                range: ['2008-01-01', '2013-12-01']
            },
            yaxis: {
                zeroline: false,
                visible: false,
            },
            // bracket to annotate range of bubbles
            shapes: [
                {
                    type: 'rect',
                    xref: 'x',
                    yref: 'y',
                    x0: '2009-01-01',
                    y0: 700,
                    x1: '2012-12-01',
                    y1: 705,
                    fillcolor: black,
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
            // actual text annotations
            annotations: [{
                x: 0.5,
                y: 0.85,
                xref: 'paper',
                yref: 'paper',
                text: 'consistency in sentiment',
                showarrow: false,
                font: {
                    family: 'PT Sans',
                    size: 14,
                    color: black
                },
            }],
        }
        // fourth section
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
            // aligning in middle
            y: trump500Fake,
            opacity: 1,
            // markers are made bigger like previously mentioned
            marker: {
                size: 36,
                color: trumpSentiment,
                showscale: true
            },
            hoverinfo: 'x',
            hovertemplate: '',
        }]
        layout = {
            title: {
                text: "<b>TRUMP'S TWEET SENTIMENT: MONTHLY AVERAGE</b>",
            },
            xaxis: {
                range: ['2016-01-01', '2021-12-01']
            },
            yaxis: {
                zeroline: false,
                visible: false,
            },
            // annotations to demonstrate the early high sentiment VS later low sentiment
            shapes: [
                {
                    type: 'rect',
                    xref: 'x',
                    yref: 'y',
                    x0: '2017-01-01',
                    y0: 700,
                    x1: '2018-12-01',
                    y1: 705,
                    fillcolor: black,
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
                {
                    type: 'rect',
                    xref: 'x',
                    yref: 'y',
                    x0: '2019-03-01',
                    y0: 700,
                    x1: '2020-12-01',
                    y1: 705,
                    fillcolor: black,
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
            // annotated text
            annotations: [
                {
                    x: 0.25,
                    y: 0.85,
                    xref: 'paper',
                    yref: 'paper',
                    text: 'mostly positive',
                    showarrow: false,
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

    // taking the data and animating it
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