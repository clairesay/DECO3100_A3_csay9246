// ////////////////////
var words, parents, obamaValues, trumpValues, someObamaValues, someTrumpValues, allObamaValues, allTrumpValues;
// // Scatter plot demonstrating the topics discussed in the lead up to election y-axis: sentiment vertically, date horizontally
Plotly.d3.csv("https://raw.githubusercontent.com/clairesay/DECO3100_A3_csay9246/main/public/data/pronouns.csv", function (err, rows) {
    // console.log(unpack(rows, 'words'))
    // console.log(unpack(rows, 'parent'))
    // console.log(unpack(rows, 'trump_all_pcnt'))
    words = unpack(rows, 'words'),
        parents = unpack(rows, 'parent'),
        obamaValues = unpack(rows, 'obama_all_pcnt');
        trumpValues = unpack(rows, 'trump_all_pcnt');

    var data = [
        {
            "type": "sunburst",
            "labels": words,
            "parents": parents,
            "values": obamaValues,
            "leaf": { opacity: 0.6 },
            "marker": { 
                line: { width: 2, color: black }, 
            },
            "branchvalues": 'total',
            textfont: {
                family: 'PT Sans',
                color: white,
                size: 10,
            },
            hoverinfo: 'skip',
            outsidetextfont: {color: white, size: 12},
            sort: false,
            rotation: 90,
            insidetextorientation: 'horizontal'
        }];

    var layout = {
        // sunburstcolorway: ['#eeeeee', '#909090', '#eeeeee', '#909090'],
        sunburstcolorway: ['#909090', '#909090', '#909090', '#909090'],
        annotations: [null],
        font: {
            family: 'PT Sans',
            size: 12,
            color: black
        },
        title: {
            text: '<b>PRONOUN USAGE: FREQUENCY AS A % OF ALL PRONOUN USES</b>',
            font: {
                color: white,
            },
        },
        plot_bgcolor: white,
        paper_bgcolor: 'transparent',
        "margin": { "l": 0, "r": 0, "b": 20, "t": 30 },
    };

    Plotly.newPlot('words', data, layout, { displayModeBar: false }).then(function (event) {
        event.on('plotly_hover', d=> {
            var pt = (d.points || [])[0]
        })
    })
})

function animateSunburst(id) {
    let layout = null, 
        data = null;
    if (id == 'obama-blank') {
       layout = {
        sunburstcolorway: ['#eeeeee', '#909090', '#eeeeee', '#909090'],
        annotations: [null],
       }
    } else if (id == 'obama-we') {
        layout = {
            sunburstcolorway:  ['#eeeeee', '#3462E0', '#eeeeee', '#909090'],
            // annotations: [
            //     {
            //         text: 'Inclusive  ',
            //         font: {
            //             family: 'PT Sans',
            //             color: white,
            //             size: 16
            //         },
            //         bgcolor: obamaColor,
            //         width: 92,
            //         align: 'right',
            //         arrowcolor: white,
            //         xref: "paper", 
            //         yref: "paper",
            //         x: 0.23,
            //         y: 0.3,
            //         ax: -30,
            //         ay: 30,
            //         xanchor: 'right',
            //         yanchor: 'top'
            //     },
                // {
                //     text: '  Engaging',
                //     font: {
                //         family: 'PT Sans',
                //         color: white,
                //         size: 16
                //     },
                //     bgcolor: '#7793E0',
                //     arrowcolor: white,
                //     xref: "paper", 
                //     yref: "paper",
                //     width: 89,
                //     align: 'left',
                //     x: 0.75,
                //     y: 0.8,
                //     ax: 30,
                //     ay: -30,
                //     xanchor: 'left',
                //     yanchor: 'bottom'
                // },
            // ],
        };
    } else if (id == 'obama-you') {
        data = [{
            values: obamaValues,
        }]
        layout = {
            sunburstcolorway: ['#3462E0', '#909090', '#eeeeee', '#909090'],
            annotations: [
                // {
                //     text: 'Inclusive  ',
                //     font: {
                //         family: 'PT Sans',
                //         color: white,
                //         size: 16
                //     },
                //     bgcolor: obamaColor,
                //     width: 92,
                //     align: 'right',
                //     arrowcolor: white,
                //     xref: "paper", 
                //     yref: "paper",
                //     x: 0.23,
                //     y: 0.3,
                //     ax: -30,
                //     ay: 30,
                //     xanchor: 'right',
                //     yanchor: 'top'
                // },
                // {
                //     text: '  Engaging',
                //     font: {
                //         family: 'PT Sans',
                //         color: white,
                //         size: 16
                //     },
                //     bgcolor: '#7793E0',
                //     arrowcolor: white,
                //     xref: "paper", 
                //     yref: "paper",
                //     width: 89,
                //     align: 'left',
                //     x: 0.75,
                //     y: 0.8,
                //     ax: 30,
                //     ay: -30,
                //     xanchor: 'left',
                //     yanchor: 'bottom'
                // },
            ],
        };
    } else if (id == 'trump-blank') {
        // console.log('trump-blank')
        data = [{
            values: trumpValues,
        }]
        layout = {
            sunburstcolorway: ['#eeeeee', '#909090', '#eeeeee', '#909090'],
            annotations: [null]
        }
    }

    if (data == null) {
        // console.log('null')
        Plotly.animate('words', {
            // data,
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
    } else {
        console.log('dataonly')
        Plotly.animate('words', {
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



}