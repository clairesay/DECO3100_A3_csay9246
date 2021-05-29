var plots = document.querySelectorAll('.plots')

// code structure borrwed from https://slides.com/robdongas/deco3100-plotly-js?token=033oWhr3#/1/4

// unpack function unpacks all the data from the relevant row
function unpack(rows, key) {
  return rows.map(function(row) {return row[key]; });
}

// CHOROPLETH MAP describing increasing diversity over time
Plotly.d3.csv("https://raw.githubusercontent.com/clairesay/DECO3100_A3_csay9246/main/public/data/diversity.csv", function(err, rows){
  
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
        title: 'Countries mentioned by Trump and Obama in their speeches',
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
  
  Plotly.newPlot(plots[0], data, layout, {displayModeBar: false});

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

Plotly.newPlot(plots[1], data, layout, {displayModeBar: false});


// MAP OF WHERE IN THE WORLD they tweeted about
Plotly.d3.csv("https://raw.githubusercontent.com/clairesay/DECO3100_A3_csay9246/main/public/data/countries-mentioned.csv", function(err, rows){
  
    var data = [{
      type: 'choropleth',
      locationmode: 'country names',
      locations: unpack(rows, 'country'),
      z: unpack(rows, 'trump_frequency'),
      text: unpack(rows, 'country'),
      zmin: 0,
      zmax: 0.002,
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
        title: 'Countries mentioned by Trump and Obama in their speeches',
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
  
  Plotly.newPlot(plots[2], data, layout, {displayModeBar: false});
})

