// this is for the hybrid line chart and choropleth map for diversity.
// The data is from the National Equity Atlas, which depcits changes in the Diversity Index of the US from 1980 to 2017 for each state and the nation as a whole. 
Plotly.d3.csv("https://raw.githubusercontent.com/clairesay/DECO3100_A3_csay9246/main/public/data/state-diversity-update.csv", function (err, rows) {

  // code structure from https://plotly.com/javascript/map-animations/ for multi stage 'framed' animations
  function filter_and_unpack(rows, key, year) {
    return rows.filter(row => row['year'] == year).map(row => row[key])
  }

  var frames = []
  var slider_steps = []

  // number of increments
  var n = 4;
  // year beginning
  var num = 1980;
  for (var i = 0; i <= n; i++) {
    // value
    var z = filter_and_unpack(rows, 'diversity', num)
    // location
    var locations = filter_and_unpack(rows, 'code', num)
    var states = filter_and_unpack(rows, 'state', num)
    // set the frames[i]
    frames[i] = { data: [{ z: z, locations: locations, text: states, customdata: z }], name: num }
    slider_steps.push({
      label: num.toString(),
      method: "animate",
      args: [[num], {
        mode: "immediate",
        transition: { duration: 300 },
        frame: { duration: 300 }
      }
      ]
    })
    //   increment by year
    // if its 2010, only go up to 2017 because that's the limit
    if (num == 2010) {
      num = num + 7
    // otherwise its every decade
    } else {
      num = num + 10
    }
  }

  // setting data attributes for the choropleth map
  var data = [{
    type: 'choropleth',
    locationmode: 'USA-states',
    // frames determined by slider
    locations: frames[0].data[0].locations,
    z: frames[0].data[0].z,
    zauto: false,
    zmin: 0,
    zmax: 1.8,
    hoverinfo: 'none',
    colorscale: [[0, white], [0.7, '#824e7b'], [1, purple]],
    colorbar: {
      title: {
        text: '<b>DIVERSITY INDEX</b>',
        font: {
          family: 'PT Sans',
          color: white
        },
      },
      thickness: 8,
      len: 1.2,
      tick0: 1.4,
      tickcolor: white,
      outlinecolor: 'transparent',
      nticks: 2,
      tickmode: 'array',
      tickvals: [0, 0.5, 1, 1.5, 1.79],
      ticktext: ['<b>0</b>       Least Diverse', '<b>0.5</b>', '<b>1.0</b>', '<b>1.5</b>', '<b>1.8</b>   Most Diverse'],
      tickfont: {
        family: 'PT Sans',
        color: white
      },
    },
  }];
  var layout = {
    dragmode: false,
    scrollzoom: false,
    geo: {
      scope: 'usa',
      countrycolor: 'rgb(255, 255, 255)',
      showland: true,
      landcolor: 'rgb(217, 217, 217)',
      showlakes: true,
      lakecolor: 'transparent',
      lakecolor: black,
      showocean: false,
      subunitcolor: 'rgb(255, 255, 255)',
      lonaxis: {},
      lataxis: {}
    },
    "margin": { "l": 0, "r": 0, "b": 0, "t": 50 },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',

    // slider for the year being displayed currently
    sliders: [{
      active: 0,
      steps: slider_steps,
      bgcolor: white,
      bordercolor: '#eeeeee',
      tickcolor: white,
      x: 0.1,
      len: 0.9,
      xanchor: "left",
      y: 0,
      yanchor: "top",
      pad: { t: 50, b: 10 },
      // displaying the curernt value of the year
      currentvalue: {
        x: 0,
        xanchor: 'left',
        offset: 15,
        visible: true,
        prefix: "YEAR: ",
        font: {
          family: 'PT Sans',
          size: 18,
          color: "#FAFAFA"
        }
      },
      font: {
        family: 'PT Sans',
        color: "#FAFAFA"
      },
      transition: {
        duration: 300,
        easing: "cubic-in"
      }
    }]
  };

  // creating the plot
  Plotly.newPlot('diversity-plot', data, layout, { displayModeBar: false }).then(function (event) {

    // adding the frames for the different years
    Plotly.addFrames('diversity-plot', frames);

    let currentState = 'US';
    let myPlot = document.getElementById('diversity-plot')

    // on clicking a state in the map
    event.on('plotly_click', d => {
      var pt = (d.points || [])[0]
      miniScatter(pt.location)

      // delete any extra traces to ensure there is only the necessary layer
      if (myPlot.data.length > 1) {
    Plotly.deleteTraces('diversity-plot', 1)
      }

      // search all the states, if a match in state codes, create a line plot.

      // get its z value create a new trace, covering all below it except for the current one. 
      allStates = d.points[0].data.locations

      // cover trace shadows all other states that aren't being clicked or hovered on. 
      let coverTrace = {
        type: 'choropleth',
        locationmode: 'USA-states',
        locations: frames[0].data[0].locations,
        z: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        zauto: false,
        zmin: 0,
        zmax: 1.8,
        colorscale: [[0, '#303030CC'], [1, 'transparent']],
        showscale: false,
        text: frames[0].data[0].text,
        customdata: myPlot.data[0].z,
        hovertemplate:
        "<b>%{text}</b><br>" +
        "%{customdata}<br>" +
        "<extra></extra>",
      }

      coverTrace.z[allStates.indexOf(pt.location)] = 1
      Plotly.addTraces('diversity-plot', coverTrace)
      currentState = pt.location
    })

    // same effect on hovering, as is clicking
    event.on('plotly_hover', d=> {
      var pt = (d.points || [])[0]
      event.style.cursor = "pointer"

      // delete any extra traces to ensure there is only the necessary layer
      if (myPlot.data.length > 1) {
        Plotly.deleteTraces('diversity-plot', 1)
          }

          // search all the states, if a match in state codes, create a line plot.
    
          // get its z value create a new trace, covering all below it except for the current one. 
          allStates = d.points[0].data.locations
    
          // cover trace shadows all other states that aren't being clicked or hovered on. 
          let coverTrace = {
            type: 'choropleth',
            locationmode: 'USA-states',
            locations: frames[0].data[0].locations,
            z: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            zauto: false,
            zmin: 0,
            zmax: 1.8,
            colorscale: [[0, '#303030CC'], [1, 'transparent']],
            showscale: false,
            text: frames[0].data[0].text,
            customdata: myPlot.data[0].z,
            hovertemplate:
            "<b>%{text}</b><br>" +
            "%{customdata}<br>" +
            "<extra></extra>",
          }
          coverTrace.z[allStates.indexOf(currentState)] = 1
          coverTrace.z[allStates.indexOf(pt.location)] = 1
          Plotly.addTraces('diversity-plot', coverTrace)
    })

    // after hovering, or mouseout from the plot
    event.on('plotly_unhover', d=> {

      // delete any extra traces to ensure there is only the necessary layer
      if (myPlot.data.length > 1) {
        Plotly.deleteTraces('diversity-plot', 1)
          }
    })
  })

  // this function creates the mini scatter/line plot next to the choropleth map. it shows changes in diversity index over time for a certain state
  // through a simple line chart
  function miniScatter(state) {
    // getting the state dates, contents, etc.
    let raw_states = unpack(rows, 'code'),
      raw_dates = unpack(rows, 'year'),
      dates = [],
      raw_diversity = unpack(rows, 'diversity'),
      diversity = [],
      raw_state = unpack(rows, 'state'),
      stateName = null;
    raw_states.forEach(function (thisState, index) {
      if (thisState == state) {
        dates.push(raw_dates[index])
        diversity.push(raw_diversity[index])
        stateName = raw_state[index]
      }
    })

    var data = [{
      type: 'scatter',
      x: dates,
      y: diversity,
      line: {
        simplify: false,
        color: white,
        shape: 'spline'
      },
      hoverinfo: 'y'
    }
    ];

    var layout = {
      font: {
        color: '#909090',
        family: 'PT Sans',
        size: 12
      },
      title: {
        text: stateName,
        font: {
          color: '#909090',
          family: 'PT Sans',
          size: 18
        },
        y: 0.05,
        x: 0.43
      },
      // setting the size to better match map
      width: 300,
      height: 400,
      xaxis: {
        visible: true,
        color: '#909090',
        gridcolor: '#90909048'
      },
      yaxis: {
        title: {
          text: '<b>DIVERSITY INDEX</b>',
          family: 'PT Sans'
        },
        range: [0, 1.79],
        visible: true,
        color: '#909090',
        gridcolor: '#90909048'
      },
      paper_bgcolor: 'transparent',
      plot_bgcolor: '#90909048',
      margin: { t: 75, r: 0 }
    };

    // if initial/on page load, generate a line graph of the US
    if (state == 'US') {
      Plotly.react('state-diversity', data, layout, { displayModeBar: false });
    // otherwise, display the relevant state
    } else {
      Plotly.animate('state-diversity', {
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
  // czll function onload
  miniScatter('US')
})


