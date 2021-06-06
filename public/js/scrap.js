Plotly.d3.csv("https://raw.githubusercontent.com/clairesay/DECO3100_A3_csay9246/main/public/data/child_values.csv", function(err, rows){
console.log(["First person", "Second person", "Third person", "Collective"].concat(unpack(rows, 'words')))
var percentages = unpack(rows, 'trump_all_value')
// console.log(percentages)
percentages = percentages.map(function(x) {
    let whole;
    if (percentages.indexOf(x) <= 3 ) {
        whole = 21
    } else if (percentages.indexOf(x) <= 7) {
        whole = 12
    } else if (percentages.indexOf(x) <= 18) {
        whole = 43
    } else if (percentages.indexOf(x) <= 21) {
        whole = 24
    }
    return parseInt(x, 10)/100 * whole
})
// 21, 12, 43, 24
//               [21, 12, 43, 24, 12.18, 2.31, 6.09, 0, 5.16, 0.72, 6, 0, 6.0200000000000005, 1.29, 9.46, 8.6, 1.29, 0.86, 1.72, 3.44, 0, 3.8699999999999997, 3.8699999999999997, 17.52, 6.24, 0]
percentages = [21, 12, 43, 24].concat(percentages) //
// var numbers = [21, 12, 43, 24].concat(unpack(rows, 'trump_all_value'))
// // console.log([25, 25, 25, 25].concat(unpack(rows, 'trump_all')),)

// var result = numbers.map(function (x) { 
//   return parseInt(x, 10); 
// });
// console.log(result)
// .concat(unpack(rows, 'words'))
var data = [
        {
          "type": "sunburst",
          "labels": ["First person", "Collective", "Third person", "Second person"].concat(unpack(rows, 'words')), 
          "parents": ["", "", "", ""].concat(unpack(rows, 'parent')),
        //   who is their parent: ["", "Personal", "Personal", "Personal", "Personal, "]
        //   "values":  [25, 25, 25, 25].concat(unpack(rows, 'trump_all')),
            "values": percentages,
          "leaf": {"opacity": 0.4},
          "marker": {"line": {"width": 2}},
          "branchvalues": 'total'
        }];

        var layout = {
          "margin": {"l": 0, "r": 0, "b": 0, "t": 0},
        };

        Plotly.newPlot('words', data, layout, {showSendToCloud: true})
})


/////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////
// ////////////////////
var words, parents, obamaValues, trumpValues;
// // Scatter plot demonstrating the topics discussed in the lead up to election y-axis: sentiment vertically, date horizontally
Plotly.d3.csv("https://raw.githubusercontent.com/clairesay/DECO3100_A3_csay9246/main/public/data/pronouns.csv", function (err, rows) {
    // console.log(unpack(rows, 'words'))
    // console.log(unpack(rows, 'parent'))
    // console.log(unpack(rows, 'trump_all_pcnt'))
    words = unpack(rows, 'words');
    parents = unpack(rows, 'parent');
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
                line: { width: 1, color: black }, 
            },
            "branchvalues": 'total',
            textfont: {
                family: 'PT Sans',
                color: black,
                size: 12,
            },
            outsidetextfont: {color: white, size: 12},
        }];

    var layout = {
        sunburstcolorway: ['#eeeeee', '#909090', '#eeeeee', '#909090'],
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

    Plotly.newPlot('words', data, layout, { displayModeBar: false })
})

function animateSunburst(id) {
    console.log('animation')
    var layout = null, 
        data = null;
    if (id == 'obama-blank') {
       layout = {
        sunburstcolorway: ['#eeeeee', '#909090', '#eeeeee', '#909090'],
        annotations: [null],
       }
    } else if (id == 'obama-we') {
        layout = {
            sunburstcolorway:  ['#eeeeee', '#3462E0', '#eeeeee', '#909090'],
            annotations: [
                {
                    text: 'Inclusive  ',
                    font: {
                        family: 'PT Sans',
                        color: white,
                        size: 16
                    },
                    bgcolor: obamaColor,
                    width: 92,
                    align: 'right',
                    arrowcolor: white,
                    xref: "paper", 
                    yref: "paper",
                    x: 0.23,
                    y: 0.3,
                    ax: -30,
                    ay: 30,
                    xanchor: 'right',
                    yanchor: 'top'
                },
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
    } else if (id == 'obama-you') {
        data = {
            values: obamaValues
        }
        layout = {
            sunburstcolorway: ['#7793E0', '#909090', '#eeeeee', '#909090'],
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
                {
                    text: '  Engaging',
                    font: {
                        family: 'PT Sans',
                        color: white,
                        size: 16
                    },
                    bgcolor: '#7793E0',
                    arrowcolor: white,
                    xref: "paper", 
                    yref: "paper",
                    width: 89,
                    align: 'left',
                    x: 0.75,
                    y: 0.8,
                    ax: 30,
                    ay: -30,
                    xanchor: 'left',
                    yanchor: 'bottom'
                },
            ],
        };
    } else if (id == 'trump-blank') {
        data = {
            values: trumpValues
        }
        layout = {
            sunburstcolorway: ['#7793E0', '#909090', '#eeeeee', '#909090'],
            annotations = [null]
        }
    }

    if (data == null) {
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