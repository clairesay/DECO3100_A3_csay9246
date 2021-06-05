var plots = document.querySelectorAll('.plots')
const obamaColor = '#224193'
const trumpColor = '#AE3131'
const purple = '#683962'
const white = '#FAFAFA'
const black = '#303030'
const grey = '#eeeeee'
// code structure borrwed from https://slides.com/robdongas/deco3100-plotly-js?token=033oWhr3#/1/4

// unpack function unpacks all the data from the relevant row
function unpack(rows, key) {
    return rows.map(function (row) { return row[key]; });
}

// // CHOROPLETH MAP describing increasing diversity over time
// function updateImmigration() {
// Plotly.d3.csv("https://raw.githubusercontent.com/clairesay/DECO3100_A3_csay9246/main/public/data/diversity.csv", function (err, rows) {
//     var data = [{
//         type: 'choropleth',
//         locationmode: 'USA-states',
//         locations: unpack(rows, 'code'),
//         z: unpack(rows, '2000'),
//         text: unpack(rows, 'state'),
//         zmin: 0,
//         zmax: 1.79,
//         colorscale: [
//             [0, 'rgb(242,240,247)'], [0.2, 'rgb(218,218,235)'],
//             [0.4, 'rgb(188,189,220)'], [0.6, 'rgb(158,154,200)'],
//             [0.8, 'rgb(117,107,177)'], [1, 'rgb(84,39,143)']
//         ],
//         colorbar: {
//             title: 'Diversity Index',
//             thickness: 0.2
//         },
//         marker: {
//             line: {
//                 color: 'rgb(255,255,255)',
//                 width: 1
//             }
//         }
//     },
//     {
//         type: 'choropleth',
//         locationmode: 'USA-states',
//         locations: unpack(rows, 'code'),
//         z: unpack(rows, '2010'),
//         text: unpack(rows, 'state'),
//         marker: {
//             line: {
//                 color: 'rgb(255,255,255)',
//                 width: 1
//             }
//         }
//     },
//     {
//         type: 'choropleth',
//         locationmode: 'USA-states',
//         locations: unpack(rows, '2017'),
//         z: unpack(rows, 'index'),
//         text: unpack(rows, 'state'),
//         marker: {
//             line: {
//                 color: 'rgb(255,255,255)',
//                 width: 1
//             }
//         }
//     }
//     ];


//     var layout = {
//         title: 'Countries mentioned by Trump and Obama in their tweets',
//         colorbar: true,
//         geo: {
//             scope: 'north america',
//             projection: {
//                 type: 'equirectangular'
//             },
//             showland: true,
//             showocean: true,
//             oceancolor: black,
//             landcolor: 'rgb(250,250,250)',
//             subunitcolor: 'transparent',
//             countrycolor: 'transparent',
//             countrywidth: 0.5,
//             subunitwidth: 0.5
//         },
//         "margin": { "l": 0, "r": 0, "b": 0, "t": 0 },
//         paper_bgcolor: 'transparent',
//         plot_bgcolor: 'transparent'
//     };

//     Plotly.newPlot('diversity-plot', data, layout, { displayModeBar: false });

// })
// }

// frequency by which Obama or Trump mention the word America
var data = [{
    type: 'bar',
    // x: [0.0000417336, 0.000109534],
    //   x: [0.004100622, 0.009529447],
    x: [0.006342344, 0.009898671],
    y: ['Trump', 'Obama'],
    marker: {
        color: [trumpColor, obamaColor],
    },
    orientation: 'h'
}];

var layout = {
    font: {
        family: 'PT Sans',
        size: 12,
        color: black
    },
    xaxis: {
        title: {
            text: 'Use frequency of the word "America"'
        }
    },
    yaxis: {
        size: 18
    },
    height: 300,
    margin: { r: 0, t: 50 },
    // title: 'Diversity across the US,'
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent'
};

Plotly.newPlot('america-mentioned-bar', data, layout, { displayModeBar: false });

const dropDown = document.querySelector('div.dropdown');
var dropDownToggle = false;
dropDown.addEventListener('click', function(event) {
    event.stopPropagation()
    if (dropDownToggle == false) {
        dropDown.classList.add('active')
        dropDownToggle = true
    } else {
        dropDown.classList.remove('active')
        dropDownToggle = false
    }
})
const dropdownLinks = dropDown.querySelectorAll('a')
dropdownLinks.forEach(function(link, index) {
    link.addEventListener('click', function(event) {
        if (dropDown.classList.contains('active')) {
            if (index == 0) {
                dropDown.append(dropdownLinks[1])
            } else if (index == 1) {
                dropDown.append(dropdownLinks[0])
            }
        }
        changePresident()
    })
})
// MAP OF WHERE IN THE WORLD they tweeted about
function changePresident() {
    Plotly.d3.csv("https://raw.githubusercontent.com/clairesay/DECO3100_A3_csay9246/main/public/data/countries-mentioned.csv", function (err, rows) {
        // let president = dropdownLinks[0].classList;
        let president = dropDown.querySelector('a').classList,
            presidentColor,
            presidentMax;
        if (president == 'obama' ) {
            presidentColor = obamaColor
            // presidentMax = 0.00005
        } else {
            presidentColor = trumpColor
            // presidentMax = 0.0015
        }
        presidentMax = 0.0015
        // alert(president)
        // let data;
        // if (dropdownLinks[0].classList.contains('obama')) {
        //     data = 'obama_frequency'
        // } else {

        // }

        let prez_frequency = unpack(rows, president + '_frequency'),
            prez_locations = unpack(rows, 'country')
    
        let frequency = [],
            locations = [];

        prez_frequency.forEach(function(times_used, index) {
            if (times_used > 0) {
                frequency.push(prez_frequency[index])
                locations.push(prez_locations[index])
                // text.push(obama_text[index])
            }
        })
    
    
        var data = [{
            type: 'choropleth',
            locationmode: 'country names',
            locations: locations,
            z: frequency,
            // text: locations,
            zmin: 0,
            zmax: presidentMax,
            hoverinfo: 'location',
            colorscale: [
                [0, grey], [0.3, presidentColor], [1, black],
                // [0, 'rgb(242,240,247)'], [0.2, 'rgb(218,218,235)'],
                // [0.4, 'rgb(188,189,220)'], [0.6, 'rgb(158,154,200)'],
                // [0.8, 'rgb(117,107,177)'], [1, 'rgb(84,39,143)']
            ],
            colorbar: {
                title: 'Frequency',
                thickness: 8,
                outlinecolor: 'transparent',
                len: 0.7,
                x: -0.15,
                xref: 'left'
            },
            // markerlinecolor: 'transparent',
            marker: {
                line: {
                    color: black,
    
                },
                // opacity: 0.5,
            },
    
        }];
    
        var layout = {
            font: {
                family: 'PT Sans',
                size: 12,
                color: black
            },
            // title: 'Countries mentioned by Obama and Trump in their tweets',
            dragmode: false, 
            scrollzoom: false,
            colorbar: true,
            geo: {
                scope: 'world',
                showland: true,
                showocean: true,
                oceancolor: white,
                landcolor: white,
                countrycolor: 'transparent',
                countrywidth: 0.5,
                subunitwidth: 0.5
            },
            margin: {l: 0, r: 0, b: 0, t: 0},
            // "margin": { "l": 0, "r": 0, "b": 0, "t": 0 },
            paper_bgcolor: 'transparent',
            plot_bgcolor: 'transparent'
        };
    
        Plotly.react('countries-mentioned-map', data, layout, { displayModeBar: false }).then(function (event) {
            event.on('plotly_click', d=> {
                var pt = (d.points || [])[0]
                let location = pt.location.toLowerCase()

                showRandomTweet(location)
                

                // console.log(pt.location)
            })
            event.on('plotly_hover', d=> {
                event.style.cursor = "pointer"
            })
            event.on('plotly_unhover', d=> {
                event.style.cursor = "initial"
            })
        })

        function showRandomTweet(location) {
            let president = dropDown.querySelector('a').classList;
            let url, allTweets, 
                theTweet = null;
            let randomTweetBox = document.querySelector('div#random-tweet-box'),
                author = randomTweetBox.querySelector('h3'),
                tweetText = randomTweetBox.querySelector('p');

            if (president == 'obama') {
                url = "https://raw.githubusercontent.com/clairesay/DECO3100_A3_csay9246/main/public/data/obama_tweets_by_country.csv"
            } else if (president == 'trump') {
                url = "https://raw.githubusercontent.com/clairesay/DECO3100_A3_csay9246/main/public/data/trump_tweets_by_country.csv"
            }

            Plotly.d3.csv(url, function (err, rows) {
                allTweets = unpack(rows, location.toString())

            // Pickiing a random array https://www.kirupa.com/html5/picking_random_item_from_array.htm
            // myArray[Math.floor(Math.random() * myArray.length)];
            while (theTweet == null) {
                let randomTweet = allTweets[Math.floor(Math.random() * allTweets.length)];
                if (randomTweet != "") {
                    theTweet = randomTweet
                }
            }

            randomTweetBox.style.opacity = 1;

            author.textContent = president

            // https://safi.me.uk/typewriterjs/
            let nextTypewriter = new Typewriter(tweetText, {
                    loop: false,
                    delay: 5,
                });
    
                nextTypewriter
                    .typeString(theTweet.toString())
                    .start();

           

        })

        }
    })    
}
changePresident()

// ////////////////////
// // Scatter plot demonstrating the topics discussed in the lead up to election y-axis: sentiment vertically, date horizontally
Plotly.d3.csv("https://raw.githubusercontent.com/clairesay/DECO3100_A3_csay9246/main/public/data/pronouns.csv", function (err, rows) {
    // console.log(unpack(rows, 'words'))
    // console.log(unpack(rows, 'parent'))
    // console.log(unpack(rows, 'trump_all_pcnt'))
    var words = unpack(rows, 'words'),
        parents = unpack(rows, 'parent'),
        values = unpack(rows, 'obama_all_pcnt');

    var data = [
        {
            "type": "sunburst",
            "labels": words,
            "parents": parents,
            "values": values,
            "leaf": { opacity: 0.6 },
            // '#B564AA', 
            "marker": { line: { width: 2, color: black }, colors: [ '#826E7F', '#B59AB1', '#683962', '#F587E6']   },
            "branchvalues": 'total',
            textfont: {
                family: 'PT Sans',
                color: black,
                size: 14,
            },
            outsidetextfont: {color: white, size: 12},
            // textposition: 'outside',
            insidetextorientation: 'horizontal'
        }];

    var layout = {
        font: {
            family: 'PT Sans',
            size: 12,
            color: black
        },
        plot_bgcolor: white,
        paper_bgcolor: 'transparent',
        "margin": { "l": 0, "r": 0, "b": 0, "t": 0 },
    };

    Plotly.newPlot('words', data, layout, { displayModeBar: false })
})


// IMMIGRATIONS
Plotly.d3.csv('https://raw.githubusercontent.com/clairesay/DECO3100_A3_csay9246/main/public/data/country_of_origin.csv', function(err, rows){
    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }

    function getMaxOfArray(numArray) {
        return Math.max.apply(null, numArray);
    }

    var data = [];
    var count = unpack(rows, 'lines');
    var country = unpack(rows, 'country');
    var startLongitude = unpack(rows, 'start_lon');
    var endLongitude = unpack(rows, 'end_lon');
    var startLat = unpack(rows, 'start_lat');
    var endLat = unpack(rows, 'end_lat');

    for ( var i = 0 ; i < count.length; i++ ) {
        var opacityValue = count[i]/getMaxOfArray(count);

        var result = {
            type: 'scattergeo',
            locationmode: 'country names',
            lon: [ startLongitude[i] , endLongitude[i] ],
            lat: [ startLat[i] , endLat[i] ],
            mode: 'lines+markers',
            line: {
                width: 2,
                color: white
            },
            opacity: opacityValue
        };

        data.push(result);
    };
    data.push({
        type: 'choropleth',
        locationmode: 'country names',
        locations: country.concat(['united states']),
        z: count.concat([20]),
        zmin: 0,
        zmax: 20,
    colorscale: [
            [0, white], [0.9, white], [1, purple]
        ],
        showscale: false,
    })

    var layout = {
        // title: 'Top 10 countries of origin Immigration',
        showlegend: false,
        dragmode: false, 
        scrollzoom: false,
        geo:{
            scope: 'world',
            // lonaxis: {range: [-200, -30]},
            // lataxis: {range: [0, 90]},
            projection: {
                rotation: {
                    lon: -20
                }
            },
            center : {
                
            },
            showland: true,
            landcolor: '#90909036',
            countrycolor: 'rgb(204,204,204)'
        },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        margin: { l: 0, r: 0, b: 0, t: 0 },
    };

    Plotly.newPlot("immigration", data, layout, { displayModeBar: false});
});


function zoom() {
    var min = 100
    var max = 200
    Plotly.animate('immigration', {
      layout: {
        // lonaxis: { range: [-180, 180] },
        // lataxis: { range: [-90, 90] },

        geo:{
            // scope: 'north america',
            lonaxis: {range: [-180, -60]},
            lataxis: {range: [15, 75]}
        }
      }
    }, {
      transition: {
        duration: 500,
        easing: 'linear'
      }
    })
  }

// /////////////////////////////////////////////////////////////