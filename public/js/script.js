var plots = document.querySelectorAll('.plots')

// code structure borrwed from https://slides.com/robdongas/deco3100-plotly-js?token=033oWhr3#/1/4

// unpack function unpacks all the data from the relevant row
function unpack(rows, key) {
  return rows.map(function(row) {return row[key]; });
}

// CHOROPLETH MAP describing increasing diversity over time
Plotly.d3.csv("https://raw.githubusercontent.com/clairesay/DECO3100_A3_csay9246/main/public/data/diversity.csv", function(err, rows){
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
          line:{
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
          line:{
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
          line:{
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
        plot_bgcolor:'transparent'
    };
  
  Plotly.newPlot('diversity-map', data, layout, {displayModeBar: false});

})

// frequency by which Obama or Trump mention the word America
var data = [{
  type: 'bar',
  // x: [0.0000417336, 0.000109534],
  x: [0.004100622, 0.009529447],
  y: ['Trump', 'Obama'],
  orientation: 'h'
}];
  
var layout = {
      // title: 'Diversity across the US,'
      paper_bgcolor: 'transparent',
      plot_bgcolor:'transparent'
  };

Plotly.newPlot('america-mentioned-bar', data, layout, {displayModeBar: false});


// MAP OF WHERE IN THE WORLD they tweeted about
Plotly.d3.csv("https://raw.githubusercontent.com/clairesay/DECO3100_A3_csay9246/main/public/data/countries-mentioned.csv", function(err, rows){
  
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
        plot_bgcolor:'transparent'
    };
  
  Plotly.newPlot('countries-mentioned-map', data, layout, {displayModeBar: false});
})

// PLOT OF TWITTER ACTIVITY FOR BOTH TRUMP AND OBAMA
// MAP OF WHERE IN THE WORLD they tweeted about
Plotly.d3.csv("https://raw.githubusercontent.com/clairesay/DECO3100_A3_csay9246/main/public/data/tweet_values.csv", function(err, rows){
  var data = [{
    type: 'scatter',
    // x: [0.0000417336, 0.000109534],
    x: unpack(rows, 'date'),
    y: unpack(rows, 'obama_tweet_count'),
  },{
    type: 'scatter',
    x: unpack(rows, 'date'),
    y: unpack(rows, 'trump_tweet_count')
  }
];
    
  var layout = {
        // title: 'Diversity across the US,'
        paper_bgcolor: 'transparent',
        plot_bgcolor:'transparent'
    };  
  Plotly.newPlot('total-obama-line', [data[0]], layout, {displayModeBar: false});
  Plotly.newPlot('total-trump-line', [data[1]], layout, {displayModeBar: false});
})

// ////////////////////
// // Scatter plot demonstrating the topics discussed in the lead up to election y-axis: sentiment vertically, date horizontally
Plotly.d3.csv("https://raw.githubusercontent.com/clairesay/DECO3100_A3_csay9246/main/public/data/child_values.csv", function(err, rows){
    console.log(unpack(rows, 'words'))    
var data = [
        {
          "type": "sunburst",
          "labels": ["First person", "Second person", "Third person", "Collective"] + unpack(rows, 'words'), 
          "parents": ["", "Eve", "Eve", "Seth", "Seth", "Eve", "Eve", "Awan", "Eve" ],
        //   who is their parent: ["", "Personal", "Personal", "Personal", "Personal, "]
          "values":  [65, 14, 12, 10, 2, 6, 6, 4, 4],
          "leaf": {"opacity": 0.4},
          "marker": {"line": {"width": 2}},
          "branchvalues": 'total'
        }];
        
        var layout = {
          "margin": {"l": 0, "r": 0, "b": 0, "t": 0},
        };
        
        
        Plotly.newPlot('words', data, layout, {showSendToCloud: true})
})

///// TWEETS IN CIRCLES BY TOPCI code borrowed from tutorial for packed bubble charts
Highcharts.chart('special', {
  chart: {
      type: 'packedbubble',
      height: '100%',
      animation: false
  },
  title: {
      text: "Popular tweeted topics by Trump and Obama"
  },
  tooltip: {
      useHTML: true,
      pointFormat: '<b>{point.name}:</b> {point.value}m CO<sub>2</sub>'
  },
  plotOptions: {
      packedbubble: {
          minSize: '30%',
          maxSize: '120%',
          zMin: 0,
          zMax: 1000,
          layoutAlgorithm: {
              splitSeries: true,
              gravitationalConstant: 0.02
          },
          dataLabels: {
              enabled: true,
              format: '{point.name}',
              filter: {
                  property: 'y',
                  operator: '>',
                  value: 250
              },
              style: {
                  color: 'black',
                  textOutline: 'none',
                  fontWeight: 'normal'
              }
          }
      }
  },
  series: [{
      name: 'Europe',
      data: [{
          name: 'Germany',
          value: 1
      }, {
          name: 'Croatia',
          value: 1
      },
      {
          name: "Belgium",
          value: 1
      },
      {
          name: "Czech Republic",
          value: 1
      },
      {
          name: "Netherlands",
          value: 1
      },
      {
          name: "Spain",
          value: 1
      },
      {
          name: "Ukraine",
          value: 1
      },
      {
          name: "Poland",
          value: 1
      },
      {
          name: "France",
          value: 1
      },
      {
          name: "Romania",
          value: 1
      },
      {
          name: "United Kingdom",
          value: 1
      }, {
          name: "Turkey",
          value: 1
      }, {
          name: "Italy",
          value: 1
      },
      {
          name: "Greece",
          value: 1
      },
      {
          name: "Austria",
          value: 1
      },
      {
          name: "Belarus",
          value: 1
      },
      {
          name: "Serbia",
          value: 1
      },
      {
          name: "Finland",
          value: 1
      },
      {
          name: "Bulgaria",
          value: 1
      },
      {
          name: "Portugal",
          value: 1
      },
      {
          name: "Norway",
          value: 1
      },
      {
          name: "Sweden",
          value: 1
      },
      {
          name: "Hungary",
          value: 43.7
      },
      {
          name: "Switzerland",
          value: 40.2
      },
      {
          name: "Denmark",
          value: 40
      },
      {
          name: "Slovakia",
          value: 34.7
      },
      {
          name: "Ireland",
          value: 34.6
      },
      {
          name: "Croatia",
          value: 20.7
      },
      {
          name: "Estonia",
          value: 19.4
      },
      {
          name: "Slovenia",
          value: 16.7
      },
      {
          name: "Lithuania",
          value: 12.3
      },
      {
          name: "Luxembourg",
          value: 10.4
      },
      {
          name: "Macedonia",
          value: 9.5
      },
      {
          name: "Moldova",
          value: 7.8
      },
      {
          name: "Latvia",
          value: 7.5
      },
      {
          name: "Cyprus",
          value: 7.2
      }]
  }, {
      name: 'Africa',
      data: [{
          name: "Senegal",
          value: 8.2
      },
      {
          name: "Cameroon",
          value: 9.2
      },
      {
          name: "Zimbabwe",
          value: 13.1
      },
      {
          name: "Ghana",
          value: 14.1
      },
      {
          name: "Kenya",
          value: 14.1
      },
      {
          name: "Sudan",
          value: 17.3
      },
      {
          name: "Tunisia",
          value: 24.3
      },
      {
          name: "Angola",
          value: 25
      },
      {
          name: "Libya",
          value: 50.6
      },
      {
          name: "Ivory Coast",
          value: 7.3
      },
      {
          name: "Morocco",
          value: 60.7
      },
      {
          name: "Ethiopia",
          value: 8.9
      },
      {
          name: "United Republic of Tanzania",
          value: 9.1
      },
      {
          name: "Nigeria",
          value: 93.9
      },
      {
          name: "South Africa",
          value: 392.7
      }, {
          name: "Egypt",
          value: 225.1
      }, {
          name: "Algeria",
          value: 141.5
      }]
  }, {
      name: 'Oceania',
      data: [{
          name: "Australia",
          value: 409.4
      },
      {
          name: "New Zealand",
          value: 34.1
      },
      {
          name: "Papua New Guinea",
          value: 7.1
      }]
  }, {
      name: 'North America',
      data: [{
          name: "Costa Rica",
          value: 7.6
      },
      {
          name: "Honduras",
          value: 8.4
      },
      {
          name: "Jamaica",
          value: 8.3
      },
      {
          name: "Panama",
          value: 10.2
      },
      {
          name: "Guatemala",
          value: 12
      },
      {
          name: "Dominican Republic",
          value: 23.4
      },
      {
          name: "Cuba",
          value: 30.2
      },
      {
          name: "USA",
          value: 5334.5
      }, {
          name: "Canada",
          value: 566
      }, {
          name: "Mexico",
          value: 456.3
      }]
  }, {
      name: 'South America',
      data: [{
          name: "El Salvador",
          value: 7.2
      },
      {
          name: "Uruguay",
          value: 8.1
      },
      {
          name: "Bolivia",
          value: 17.8
      },
      {
          name: "Trinidad and Tobago",
          value: 34
      },
      {
          name: "Ecuador",
          value: 43
      },
      {
          name: "Chile",
          value: 78.6
      },
      {
          name: "Peru",
          value: 52
      },
      {
          name: "Colombia",
          value: 74.1
      },
      {
          name: "Brazil",
          value: 501.1
      }, {
          name: "Argentina",
          value: 199
      },
      {
          name: "Venezuela",
          value: 195.2
      }]
  }, {
      name: 'Asia',
      data: [{
          name: "Nepal",
          value: 6.5
      },
      {
          name: "Georgia",
          value: 6.5
      },
      {
          name: "Brunei Darussalam",
          value: 7.4
      },
      {
          name: "Kyrgyzstan",
          value: 7.4
      },
      {
          name: "Afghanistan",
          value: 7.9
      },
      {
          name: "Myanmar",
          value: 9.1
      },
      {
          name: "Mongolia",
          value: 14.7
      },
      {
          name: "Sri Lanka",
          value: 16.6
      },
      {
          name: "Bahrain",
          value: 20.5
      },
      {
          name: "Yemen",
          value: 22.6
      },
      {
          name: "Jordan",
          value: 22.3
      },
      {
          name: "Lebanon",
          value: 21.1
      },
      {
          name: "Azerbaijan",
          value: 31.7
      },
      {
          name: "Singapore",
          value: 47.8
      },
      {
          name: "Hong Kong",
          value: 49.9
      },
      {
          name: "Syria",
          value: 52.7
      },
      {
          name: "DPR Korea",
          value: 59.9
      },
      {
          name: "Israel",
          value: 64.8
      },
      {
          name: "Turkmenistan",
          value: 70.6
      },
      {
          name: "Oman",
          value: 74.3
      },
      {
          name: "Qatar",
          value: 88.8
      },
      {
          name: "Philippines",
          value: 96.9
      },
      {
          name: "Kuwait",
          value: 98.6
      },
      {
          name: "Uzbekistan",
          value: 122.6
      },
      {
          name: "Iraq",
          value: 139.9
      },
      {
          name: "Pakistan",
          value: 158.1
      },
      {
          name: "Vietnam",
          value: 190.2
      },
      {
          name: "United Arab Emirates",
          value: 201.1
      },
      {
          name: "Malaysia",
          value: 227.5
      },
      {
          name: "Kazakhstan",
          value: 236.2
      },
      {
          name: "Thailand",
          value: 272
      },
      {
          name: "Taiwan",
          value: 276.7
      },
      {
          name: "Indonesia",
          value: 453
      },
      {
          name: "Saudi Arabia",
          value: 494.8
      },
      {
          name: "Japan",
          value: 1278.9
      },
      {
          name: "China",
          value: 10540.8
      },
      {
          name: "India",
          value: 2341.9
      },
      {
          name: "Russia",
          value: 1766.4
      },
      {
          name: "Iran",
          value: 618.2
      },
      {
          name: "Korea",
          value: 610.1
      }]
  }]
});
