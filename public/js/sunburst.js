// PRONOUN SUNBURST CHART
var words, someWords, parents, someParents, obamaValues, trumpValues, someObamaValues, someTrumpValues, allObamaValues, allTrumpValues;

Plotly.d3.csv("https://raw.githubusercontent.com/clairesay/DECO3100_A3_csay9246/main/public/data/pronouns.csv", function (err, rows) {
    // unpacking all data
    words = unpack(rows, 'words'),
        parents = unpack(rows, 'parent'),
        allObamaValues = unpack(rows, 'obama_all_pcnt');
    allTrumpValues = unpack(rows, 'trump_all_pcnt');
    someObamaValues = []
    someTrumpValues = []
    someWords = []
    someParents = []

    // filtering out the first five parent data (this is the most important)
    allObamaValues.forEach(function (value, index) {
        if (index < 5) {
            someObamaValues.push(value)
            someWords.push(words[index])
            someParents.push(parents[index])
        }
    })
    allTrumpValues.forEach(function (value, index) {
        if (index < 5) {
            someTrumpValues.push(value)
        }
    })

    obamaValues = someObamaValues
    trumpValues = someTrumpValues

    // setting up the data
    // structure from https://plotly.com/javascript/sunburst-charts/
    var data = [
        {
            "type": "sunburst",
            "labels": someWords,
            "parents": someParents,
            values: obamaValues,
            meta: 'obama',
            "leaf": { opacity: 0.6 },
            "marker": {
                line: { width: 2, color: black },
            },
            "branchvalues": 'total',
            textfont: {
                family: 'PT Sans',
                color: white,
                size: 12,
            },
            hovertemplate: '%{value:.2f}<extra></extra>',
            outsidetextfont: { color: white, size: 12 },
            sort: false,
            rotation: 90,
            insidetextorientation: 'horizontal'
        }];

    var layout = {
        // this is the color palette for the sunburst chart. changes as needed
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

        // clicking on a leaf
        event.on('plotly_sunburstclick', d => {

            var pt = (d.points || [])[0]

            // as long as its not the middle, proceed
            if (pt.label != 'Pronoun') {
                let extraValues = [],
                    extraLabels = [],
                    extraParents = [],
                    newValues,
                    newLabels,
                    newParents;

                // gets all the relevant labels to the parent leaf selected
                parents.forEach(function (parentLeaf, index) {
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

                // check if the current topic is either obama or trump
                if (pt.fullData.meta == 'obama') {
                    newValues = someObamaValues.concat(extraValues)
                } else if (pt.fullData.meta == 'trump') {
                    newValues = someTrumpValues.concat(extraValues)
                }

                // sets the newLabels and newParents
                newLabels = someWords.concat(extraLabels)
                newParents = someParents.concat(extraParents)

                // RAW
                // just the four parents, 

                // NEW
                // four parents with added children

                // based on that parent element, get all its children, and on hover, update the data. 
                var data = [{
                    values: newValues,
                    parents: newParents,
                    labels: newLabels,
                }]

                // consolidates and animates
                Plotly.animate('words', {
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
            } else {
                return false
            }
        })
    })
})

// animating function for the sunburst chart
function animateSunburst(id) {

    let layout = null,
        data = null;

    obamaValues = someObamaValues
    trumpValues = someTrumpValues

    // phased setting for the state of the chart at each point in time
    // first
    if (id == 'obama-we') {
        data = [{
            values: obamaValues,
            meta: 'obama'
        }]
        // highlight collective section
        layout = {
            sunburstcolorway: ['#cccccc', obamaColor, '#cccccc', '#909090'],
            annotations: [null]
        };
        // second
    } else if (id == 'obama-you') {
        data = [{
            values: obamaValues,
            meta: 'obama'
        }]
        // highlight second person section
        layout = {
            sunburstcolorway: ['#cccccc', '#909090', '#cccccc', obamaColor],
            annotations: [null]
        };
        // third
    } else if (id == 'trump-they') {
        data = [{
            values: trumpValues,
            meta: 'trump'
        }]
        // highlight third person section
        layout = {
            sunburstcolorway: ['#909090', '#cccccc', trumpColor, '#cccccc'],
            annotations: [null]
        }
        // fourth
    } else if (id == 'trump-i') {
        data = [{
            values: trumpValues,
            meta: 'trump'
        }]
        // highlight first person section
        layout = {
            sunburstcolorway: [trumpColor, '#cccccc', '#909090', '#cccccc'],
            annotations: [null]
        }
    }

    // consolidate and animate the plot
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