var plots = document.querySelectorAll('.plots')

Plotly.d3.csv("https://raw.githubusercontent.com/dongasr/DECO3100/main/beer.csv", function(err, rows){
  
    var data = [{
        type:'choropleth',
        lon: unpack(rows, 'Longitude'),
        lat: unpack(rows, 'Latitude'),
        customdata: unpack(rows, 'City'),
        text: unpack(rows, 'BeerPrice'),
        hovertemplate:
              "City: %{customdata}<br>" +
              "Price: <b>%{text} dollarydoos</b><br><br>" +
              "Longitude: %{lon:.2f}<br>" +
              "Latitude: %{lat:.2f}<br>" +
              "<extra></extra>", // Hides the trace number
        mode: 'markers',
        marker: {
            size: 8,
            opacity: 0.8,
            reversescale: true,
            autocolorscale: false,
            symbol: 'square',
            line: {
                width: 1,
                color: 'rgb(102,102,102)'
            },
            cmax: 12,
            cmin: 0,
            color: unpack(rows, 'BeerPrice'),
            colorbar: {
                title: 'Diversity Index',
            },
          colorscale: 'Picnic'
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