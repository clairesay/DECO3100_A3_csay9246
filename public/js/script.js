var plots = document.querySelectorAll('.plots')
const obamaColor = '#224193'
// additional colors: #3462E0, #586DA6, #7793E0, #162A61
const trumpColor = '#AE3131'
// additional colors: #FA4646, #BB6C6C, #FA9191, #7A2222
const purple = '#683962'
const white = '#FAFAFA'
const black = '#303030'
const grey = '#eeeeee'

// code structure from https://slides.com/robdongas/deco3100-plotly-js?token=033oWhr3#/1/4
// unpack function unpacks all the data from the relevant row
function unpack(rows, key) {
    return rows.map(function (row) { return row[key]; });
}

///////////////////////// frequency by which Obama or Trump mention the word America
var data = [{
    type: 'bar',
    x: [0.006342344, 0.009898671],
    y: ['Trump    ', 'Obama    '],
    marker: {
        color: [trumpColor, obamaColor],
    },
    // horizontal
    orientation: 'h',
    hoverinfo: 'x'
}];

var layout = {
    font: {
        family: 'PT Sans',
        size: 12,
    },
    xaxis: {
        title: {
            text: '<b>USE FREQUENCY OF WORD</b>',
            font: {
                color: '#909090',
            },
            standoff: 20,

        }
    },
    yaxis: {
        size: 18
    },
    height: 300,
    margin: { r: 0, t: 20, l: 50 },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent'
};
// create bar chart
Plotly.newPlot('america-mentioned-bar', data, layout, { displayModeBar: false });



////////////////////////// Map of where in the world they tweeted about
const dropDown = document.querySelector('div.dropdown');
var dropDownToggle = false;

// listen for changes in the dropdown menu. 
dropDown.addEventListener('click', function (event) {
    event.stopPropagation()
    if (dropDownToggle == false) {
        dropDown.classList.add('active')
        dropDownToggle = true
    } else {
        dropDown.classList.remove('active')
        dropDownToggle = false
    }
})

// update changes in ordering of dropdown links showing
const dropdownLinks = dropDown.querySelectorAll('a')
dropdownLinks.forEach(function (link, index) {
    link.addEventListener('click', function (event) {
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

// FUNCTION GENERATES MAP OF WHERE IN THE WORLD WHICH PRESIDENT TWEETED ABOUT
function changePresident() {
    Plotly.d3.csv("https://raw.githubusercontent.com/clairesay/DECO3100_A3_csay9246/main/public/data/countries-mentioned.csv", function (err, rows) {
        let president = dropDown.querySelector('a').classList,
            presidentColor,
            presidentMax;

        // sets the color of the colorscales
        if (president == 'obama') {
            presidentColor = obamaColor
        } else {
            presidentColor = trumpColor
        }
        presidentMax = 0.0015

        // set the frequency of the tweets and country by president
        let prez_frequency = unpack(rows, president + '_frequency'),
            prez_locations = unpack(rows, 'country')

        // filtering this based on relevance i.e. Obama doesn't mention Australia, so it doesn't show up in the tweets
        let frequency = [],
            locations = [];

        prez_frequency.forEach(function (times_used, index) {
            if (times_used > 0) {
                frequency.push(prez_frequency[index])
                locations.push(prez_locations[index])
            }
        })

        // setting up the map's data
        var data = [{
            type: 'choropleth',
            locationmode: 'country names',
            locations: locations,
            z: frequency,
            zmin: 0,
            zmax: presidentMax,
            hoverinfo: 'location',
            colorscale: [
                [0, grey], [0.3, presidentColor], [1, black],
            ],
            colorbar: {
                title: '<b>FREQUENCY</b>',
                nticks: 4,
                thickness: 8,
                outlinecolor: 'transparent',
                len: 0.7,
                x: -0.15,
                xref: 'left'
            },
            marker: {
                line: {
                    color: black,

                },
            },

        }];

        var layout = {
            font: {
                family: 'PT Sans',
                size: 12,
                color: black
            },
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
            margin: { l: 0, r: 0, b: 0, t: 0 },
            paper_bgcolor: 'transparent',
            plot_bgcolor: 'transparent'
        };

        // generate the map
        Plotly.react('countries-mentioned-map', data, layout, { displayModeBar: false }).then(function (event) {
            // on click, show a random tweet
            event.on('plotly_click', d => {
                var pt = (d.points || [])[0]
                let location = pt.location.toLowerCase()

                showRandomTweet(location)
            })

            // allow cursor pointer when hovering over the active countries
            event.on('plotly_hover', d => {
                event.style.cursor = "pointer"
            })
            event.on('plotly_unhover', d => {
                event.style.cursor = "initial"
            })
        })

        // this function generates a random tweet aout of a pool of 100 tweets per country mentioned by each president
        function showRandomTweet(location) {
            let president = dropDown.querySelector('a').classList;
            let url, allTweets,
                theTweet = null;
            let randomTweetBox = document.querySelector('div#random-tweet-box'),
                author = randomTweetBox.querySelector('h3'),
                tweetText = randomTweetBox.querySelector('p');

            // setting the data url for retrieval
            if (president == 'obama') {
                url = "https://raw.githubusercontent.com/clairesay/DECO3100_A3_csay9246/main/public/data/obama_tweets_by_country.csv"
            } else if (president == 'trump') {
                url = "https://raw.githubusercontent.com/clairesay/DECO3100_A3_csay9246/main/public/data/trump_tweets_by_country.csv"
            }

            Plotly.d3.csv(url, function (err, rows) {
                allTweets = unpack(rows, location.toString())

                // Pickiing a random array https://www.kirupa.com/html5/picking_random_item_from_array.htm
                while (theTweet == null) {
                    let randomTweet = allTweets[Math.floor(Math.random() * allTweets.length)];
                    if (randomTweet != "") {
                        theTweet = randomTweet
                    }
                }

                // make the box visible
                randomTweetBox.style.opacity = 1;
                // set the author's name
                author.textContent = president

                // typewriter.js for a typewriter effect https://safi.me.uk/typewriterjs/
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
// call function on load to retrieve president
changePresident()


//////////////////////// FLOW OF IMMIGRATIONS LINES ON MAP
// code structured based on https://plotly.com/javascript/lines-on-maps/
Plotly.d3.csv('https://raw.githubusercontent.com/clairesay/DECO3100_A3_csay9246/main/public/data/country_of_origin.csv', function (err, rows) {
    // unpacking data and getting maximum of array
    function unpack(rows, key) {
        return rows.map(function (row) { return row[key]; });
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

    // counting all the paths
    for (var i = 0; i < count.length; i++) {
        var opacityValue = count[i] / getMaxOfArray(count);
        var result = {
            type: 'scattergeo',
            locationmode: 'country names',
            lon: [startLongitude[i], endLongitude[i]],
            lat: [startLat[i], endLat[i]],
            mode: 'lines+markers',
            hoverinfo: 'none',
            line: {
                width: 2,
                color: '#F587E6'
            },
            marker: {
                size: 10,
                color: '#F587E6'
            },
            opacity: opacityValue
        };

        data.push(result);
    };

    // combining with choropleth map to highlight immigrant locations
    data.push({
        type: 'choropleth',
        locationmode: 'country names',
        locations: country.concat(['united states']),
        z: count.concat([20]),
        zmin: 0,
        zmax: 20,
        hovertemplate: '<b style="text-transform: uppercase">%{location}</b><extra></extra>',
        colorscale: [
            [0, grey], [0.9, grey], [1, '#B59AB1']
        ],
        showscale: false,
    })

    var layout = {
        showlegend: false,
        dragmode: false,
        scrollzoom: false,
        geo: {
            scope: 'world',
            projection: {
                rotation: {
                    lon: 180
                }
            },
            center: {

            },
            showland: true,
            landcolor: '#90909036',
            countrycolor: 'rgb(204,204,204)'
        },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        margin: { l: 0, r: 0, b: 0, t: 0 },
    };

    Plotly.newPlot("immigration", data, layout, { displayModeBar: false });
});

// this function has been deprecated
function zoom() {
    var min = 100
    var max = 200
    Plotly.animate('immigration', {
        layout: {
            geo: {
                lonaxis: { range: [-180, -60] },
                lataxis: { range: [15, 75] }
            }
        }
    }, {
        transition: {
            duration: 500,
            easing: 'linear'
        }
    })
}