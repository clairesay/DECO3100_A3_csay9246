// ////////////////////
var words, someWords, parents, someParents, obamaValues, trumpValues, someObamaValues, someTrumpValues, allObamaValues, allTrumpValues;
// // Scatter plot demonstrating the topics discussed in the lead up to election y-axis: sentiment vertically, date horizontally
Plotly.d3.csv("https://raw.githubusercontent.com/clairesay/DECO3100_A3_csay9246/main/public/data/pronouns.csv", function (err, rows) {
    // console.log(unpack(rows, 'words'))
    // console.log(unpack(rows, 'parent'))
    // console.log(unpack(rows, 'trump_all_pcnt'))
    words = unpack(rows, 'words'),
        parents = unpack(rows, 'parent'),
        allObamaValues = unpack(rows, 'obama_all_pcnt');
        allTrumpValues = unpack(rows, 'trump_all_pcnt');
        someObamaValues = []
        someTrumpValues = []
        someWords = []
        someParents = []

        allObamaValues.forEach(function(value, index) {
            if (index < 5) {
                someObamaValues.push(value)
                someWords.push(words[index])
                someParents.push(parents[index])
            }
        })
        console.log(someWords)
        console.log(someParents)
        allTrumpValues.forEach(function(value, index) {
            if (index < 5) {
                someTrumpValues.push(value)
            }
        })

        obamaValues = someObamaValues
        trumpValues = someTrumpValues
    var data = [
        {
            "type": "sunburst",
            "labels": someWords,
            "parents": someParents,
            values: obamaValues,
            // maxdepth: 2,
            meta: 'obama',
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
            // hoverinfo: 'skip',
            hovertemplate: '%{value:.2f}<extra></extra>',
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
        // event.on('plotly_sunburstclick', d=> {
        //     false
        // })
        event.on('plotly_sunburstclick', d=> {
            
            var pt = (d.points || [])[0]

            if (pt.label != 'Pronoun') {
                
            

            let extraValues = [],
                extraLabels = [],
                extraParents = [],
                newValues,
                newLabels,
                newParents;
            
            parents.forEach(function(parentLeaf, index) {
                if (parentLeaf == pt.label) {
                    if (pt.fullData.meta == 'obama') {
                        extraValues.push(allObamaValues[index])
                    } else {
                        extraValues.push(allTrumpValues[index])
                    }
                    extraLabels.push(words[index])
                    extraParents.push(parents[index])
                }   
            })

            if (pt.fullData.meta == 'obama') {
                newValues = someObamaValues.concat(extraValues)
            } else if (pt.fullData.meta == 'trump') {
                newValues = someTrumpValues.concat(extraValues)
            }

            newLabels = someWords.concat(extraLabels)
            newParents = someParents.concat(extraParents)

            // RAW
            // just the four parents, 

            // NEW
            // four parents with added children

            console.log(newValues)
            console.log(newParents)
            console.log(newLabels)
            // based on that parent element, get all its children, and on hover, update the data. 
            var data = [{
                values: newValues,
                parents: newParents,
                labels: newLabels,
                // maxdepth: 3,
            }]
            
            Plotly.animate('words', {
                data,
                // layout
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
            return false
        }
 
            // animateSunburst(null, 'showall')
        })
        // event.on('plotly_unhover', d=> {
        //     var data;
        //     obamaValues = someObamaValues
        //     trumpValues = someTrumpValues

        //     if (pt.fullData.meta == 'obama') {
        //         data = [{
        //             "labels": someWords,
        //             "parents": someParents,
        //             "values": obamaValues,
        //             // maxdepth: 2,
        //         }]
        //     } else if (pt.fullData.meta == 'trump') {
        //         data = [{
        //             "labels": someWords,
        //             "parents": someParents,
        //             "values": trumpValues,
        //             // maxdepth: 2,
        //         }]
        //     }
            
        //     setTimeout(function() {
        //         Plotly.animate('words', {
        //             data,
        //             // layout
        //         }, {
        //           transition: {
        //             duration: 500,
        //             easing: 'cubic-in-out',
        //           },
        //           frame: {
        //             duration: 500,
        //           }
        //         });
        //     }, 3000)

        //     // animateSunburst(null, 'showall')
        // })
    })
})

function animateSunburst(id) {

    let layout = null, 
        data = null;

    obamaValues = someObamaValues
    trumpValues = someTrumpValues
    // if (id == 'obama-blank') {
    //     data = [{
    //         meta:'obama'
    //     }]
    //    layout = {
    //     sunburstcolorway: ['#eeeeee', '#909090', '#eeeeee', '#909090'],
    //     annotations: [null],
    //    }
    // } else 
    if (id == 'obama-we') {
        data = [{
            values : obamaValues,
            meta: 'obama'
        }]
        layout = {
            sunburstcolorway:  ['#cccccc', obamaColor, '#cccccc', '#909090'],
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
            meta: 'obama'
        }]
        layout = {
            sunburstcolorway: ['#cccccc', '#909090', '#cccccc', obamaColor  ],
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
    } else if (id == 'trump-they') {
        // console.log('trump-blank')
        data = [{
            values: trumpValues,
            meta: 'trump'
        }]
        layout = {
            sunburstcolorway: ['#909090', '#cccccc', trumpColor, '#cccccc'],
            annotations: [null]
        }
    } else if (id == 'trump-i') {
        data = [{
            values: trumpValues,
            meta: 'trump'
        }]
        layout = {
            sunburstcolorway: [trumpColor, '#cccccc', '#909090', '#cccccc'],
            annotations: [null]
        }
    }

    // if (data == null) {
    //     // console.log('null')
    //     Plotly.animate('words', {
    //         // data,
    //         layout
    //     }, {
    //       transition: {
    //         duration: 500,
    //         easing: 'cubic-in-out',
    //       },
    //       frame: {
    //         duration: 500,
    //       }
    //     });
    // } else {
    //     console.log('dataonly')
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
    // }



}