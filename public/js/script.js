var plots = document.querySelectorAll('.plots')

// code structure borrwed from https://slides.com/robdongas/deco3100-plotly-js?token=033oWhr3#/1/4

// unpack function unpacks all the data from the relevant row
function unpack(rows, key) {
    return rows.map(function (row) { return row[key]; });
}

// CHOROPLETH MAP describing increasing diversity over time
Plotly.d3.csv("https://raw.githubusercontent.com/clairesay/DECO3100_A3_csay9246/main/public/data/diversity.csv", function (err, rows) {
    console.log(rows)
    var data = [{
        type: 'choropleth',
        locationmode: 'USA-states',
        locations: unpack(rows, 'code'),
        z: unpack(rows, '2000'),
        text: unpack(rows, 'state'),
        zmin: 0,
        zmax: 1.79,
        colorscale: [
            [0, 'rgb(242,240,247)'], [0.2, 'rgb(218,218,235)'],
            [0.4, 'rgb(188,189,220)'], [0.6, 'rgb(158,154,200)'],
            [0.8, 'rgb(117,107,177)'], [1, 'rgb(84,39,143)']
        ],
        colorbar: {
            title: 'Diversity Index',
            thickness: 0.2
        },
        marker: {
            line: {
                color: 'rgb(255,255,255)',
                width: 1
            }
        }
    },
    {
        type: 'choropleth',
        locationmode: 'USA-states',
        locations: unpack(rows, 'code'),
        z: unpack(rows, '2010'),
        text: unpack(rows, 'state'),
        marker: {
            line: {
                color: 'rgb(255,255,255)',
                width: 1
            }
        }
    },
    {
        type: 'choropleth',
        locationmode: 'USA-states',
        locations: unpack(rows, '2017'),
        z: unpack(rows, 'index'),
        text: unpack(rows, 'state'),
        marker: {
            line: {
                color: 'rgb(255,255,255)',
                width: 1
            }
        }
    }
    ];


    var layout = {
        title: 'Countries mentioned by Trump and Obama in their tweets',
        colorbar: true,
        geo: {
            scope: 'north america',
            projection: {
                type: 'equirectangular'
            },
            showland: true,
            showocean: true,
            oceancolor: '#303030',
            landcolor: 'rgb(250,250,250)',
            subunitcolor: 'transparent',
            countrycolor: 'transparent',
            countrywidth: 0.5,
            subunitwidth: 0.5
        },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent'
    };

    Plotly.newPlot('diversity-map', data, layout, { displayModeBar: false });

})

// frequency by which Obama or Trump mention the word America
var data = [{
    type: 'bar',
    // x: [0.0000417336, 0.000109534],
    //   x: [0.004100622, 0.009529447],
    x: [0.006342344, 0.009898671],
    y: ['Trump', 'Obama'],
    orientation: 'h'
}];

var layout = {
    // title: 'Diversity across the US,'
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent'
};

Plotly.newPlot('america-mentioned-bar', data, layout, { displayModeBar: false });


// MAP OF WHERE IN THE WORLD they tweeted about
Plotly.d3.csv("https://raw.githubusercontent.com/clairesay/DECO3100_A3_csay9246/main/public/data/countries-mentioned.csv", function (err, rows) {

    var data = [{
        type: 'choropleth',
        locationmode: 'country names',
        locations: unpack(rows, 'country'),
        z: unpack(rows, 'obama_frequency'),
        text: unpack(rows, 'country'),
        zmin: 0,
        zmax: 0.00001,
        colorscale: [
            [0, 'rgb(242,240,247)'], [0.2, 'rgb(218,218,235)'],
            [0.4, 'rgb(188,189,220)'], [0.6, 'rgb(158,154,200)'],
            [0.8, 'rgb(117,107,177)'], [1, 'rgb(84,39,143)']
        ],
        colorbar: {
            title: 'Diversity Index',
            thickness: 0.2
        },
    }];

    var layout = {
        title: 'Countries mentioned by Trump and Obama in their tweets',
        colorbar: true,
        geo: {
            scope: 'world',
            showland: true,
            showocean: true,
            oceancolor: '#303030',
            landcolor: 'rgb(250,250,250)',
            subunitcolor: 'transparent',
            countrycolor: 'transparent',
            countrywidth: 0.5,
            subunitwidth: 0.5
        },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent'
    };

    Plotly.newPlot('countries-mentioned-map', data, layout, { displayModeBar: false });
})

// PLOT OF TWITTER ACTIVITY FOR BOTH TRUMP AND OBAMA
// MAP OF WHERE IN THE WORLD they tweeted about
Plotly.d3.csv("https://raw.githubusercontent.com/clairesay/DECO3100_A3_csay9246/main/public/data/tweet_values.csv", function (err, rows) {
    var data = [{
        type: 'scatter',
        // x: [0.0000417336, 0.000109534],
        x: unpack(rows, 'date'),
        y: unpack(rows, 'obama_tweet_count'),
    }, {
        type: 'scatter',
        x: unpack(rows, 'date'),
        y: unpack(rows, 'trump_tweet_count')
    }
    ];

    var layout = {
        // title: 'Diversity across the US,'
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent'
    };
    Plotly.newPlot('total-obama-line', [data[0]], layout, { displayModeBar: false });
    Plotly.newPlot('total-trump-line', [data[1]], layout, { displayModeBar: false });
})

// ////////////////////
// // Scatter plot demonstrating the topics discussed in the lead up to election y-axis: sentiment vertically, date horizontally
Plotly.d3.csv("https://raw.githubusercontent.com/clairesay/DECO3100_A3_csay9246/main/public/data/pronouns.csv", function (err, rows) {
    console.log(unpack(rows, 'words'))
    console.log(unpack(rows, 'parent'))
    console.log(unpack(rows, 'trump_all_pcnt'))
    var words = unpack(rows, 'words'),
        parents = unpack(rows, 'parent'),
        values = unpack(rows, 'obama_all_pcnt');

    var data = [
        {
            "type": "sunburst",
            "labels": words,
            "parents": parents,
            "values": values,
            "leaf": { "opacity": 0.4 },
            "marker": { "line": { "width": 2 } },
            "branchvalues": 'total'
        }];

    var layout = {
        "margin": { "l": 0, "r": 0, "b": 0, "t": 0 },
    };

    Plotly.newPlot('words', data, layout, { showSendToCloud: true })
})

Plotly.d3.csv('https://raw.githubusercontent.com/clairesay/DECO3100_A3_csay9246/main/public/data/immigration.csv', function(err, rows){
    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }

    function getMaxOfArray(numArray) {
        return Math.max.apply(null, numArray);
    }

    var data = [];
    var count = unpack(rows, 'cnt');
    var startLongitude = unpack(rows, 'start_lon');
    var endLongitude = unpack(rows, 'end_lon');
    var startLat = unpack(rows, 'start_lat');
    var endLat = unpack(rows, 'end_lat');

    for ( var i = 0 ; i < count.length; i++ ) {
        var opacityValue = count[i]/getMaxOfArray(count);

        var result = {
            type: 'scattergeo',
            locationmode: 'USA-states',
            lon: [ startLongitude[i] , endLongitude[i] ],
            lat: [ startLat[i] , endLat[i] ],
            mode: 'lines',
            line: {
                width: 1,
                color: 'red'
            },
            opacity: opacityValue
        };

        data.push(result);
    };

    var layout = {
        title: 'Top 10 countries of origin Immigration',
        showlegend: false,
        geo:{
            scope: 'world',
            projection: {
                // type: 'azimuthal equal area'
            },
            showland: true,
            landcolor: 'rgb(243,243,243)',
            countrycolor: 'rgb(204,204,204)'
        }
    };

    Plotly.newPlot("immigration", data, layout, {showLink: false});

});