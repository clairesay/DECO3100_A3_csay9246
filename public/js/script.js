var plots = document.querySelectorAll('.plots')

Plotly.d3.csv("https://raw.githubusercontent.com/clairesay/DECO3100_A3_csay9246/main/public/data/diversity.csv", function(err, rows){
  
    var data = [{
      type: 'choropleth',
      locationmode: 'USA-states',
      locations: unpack(rows, 'code'),
      z: unpack(rows, 'index'),
      text: unpack(rows, 'state'),
      zmin: 0,
      zmax: 1.79,
      colorscale: [
          [0, 'rgb(242,240,247)'], [0.2, 'rgb(218,218,235)'],
          [0.4, 'rgb(188,189,220)'], [0.6, 'rgb(158,154,200)'],
          [0.8, 'rgb(117,107,177)'], [1, 'rgb(84,39,143)']
      ],
      colorbar: {
          title: 'Millions USD',
          thickness: 0.2
      },
      marker: {
          line:{
              color: 'rgb(255,255,255)',
              width: 2
          }
      }
    }];
  
  var layout = {
        title: 'Diversity across the US',
        colorbar: true,
        geo: {
            scope: 'north america',
            projection: {
                type: 'equirectangular'
            },
            showland: true,
            landcolor: 'rgb(250,250,250)',
            subunitcolor: 'rgb(217,217,217)',
            countrycolor: 'rgb(217,217,217)',
            countrywidth: 0.5,
            subunitwidth: 0.5
        }
    };
  
  Plotly.newPlot(plots[0], data, layout, {showLink: false, responsive: true, modeBar: false});
  
})

function unpack(rows, key) {
  return rows.map(function(row) {return row[key]; });
}