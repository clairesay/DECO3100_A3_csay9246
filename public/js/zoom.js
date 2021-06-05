// // generating random dots
// var n = 500;
// var x = [], y = [];
// for (var i = 0; i < n; i++) {
//   x[i] = i / (n - 1);
//   y[i] = x[i] + 0.2 * (Math.random() - 0.5);
// }

// // plotting the dots
// Plotly.plot('graph', [{
//   x: x,
//   y: y,
//   mode: 'markers'
// }], {
//   xaxis: {range: [0, 1]},
//   yaxis: {range: [0, 1]}
// }, {showSendToCloud:true});

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

Plotly.d3.csv("https://raw.githubusercontent.com/clairesay/DECO3100_A3_csay9246/main/public/data/state-diversity-update.csv", function (err, rows) {

  function filter_and_unpack(rows, key, year) {
    return rows.filter(row => row['year'] == year).map(row => row[key])
  }

  var frames = []
  var slider_steps = []

  var n = 4;
  var num = 1980;
  for (var i = 0; i <= n; i++) {
    //   value of life expectancy
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
    if (num == 2010) {
      num = num + 7
    } else {
      num = num + 10
    }

  }

  var data = [{
    type: 'choropleth',
    locationmode: 'USA-states',
    locations: frames[0].data[0].locations,
    z: frames[0].data[0].z,
    // text: frames[0].data[0].locations,
    // hoverinfo: 'skip',
    zauto: false,
    zmin: 0,
    zmax: 1.8,
    hoverinfo: 'none',
    colorscale: [[0, white], [0.7, '#824e7b'], [1, purple]],
    colorbar: {
      title: {
        color: white,
        text: 'Diversity<br>Index',
        font: 'PT Sans',

      },
      thickness: 16,
      len: 0.9,
      tick0: 1.4,
      tickcolor: white,
      outlinecolor: 'transparent',
      nticks: 2,
      tickmode: 'array',
      // tickvals: ['More Diverse', 'Less Diverse'],
      ticktext: ['More Diverse', 'Less Diverse'],
      tickfont: {
        family: 'PT Sans',
        color: white
      },
    },
    // },{
    //   type: 'choropleth',
    //   locationmode: 'USA-states',
    //   locations: unpack(rows, 'code'),
    //   // z: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    //   z: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   // text: frames[0].data[0].locations,
    //   zauto: false,
    //   zmin: 0,
    //   zmax: 1.79,
    //   colorscale: [
    //                 [0, 'blue'], [1, 'blue']
    //             ],
  }];
  var layout = {
    dragmode: false,
    scrollzoom: false,
    // title: 'Diversity Index across the US<br>1980 - 2017',
    geo: {
      scope: 'usa',
      // projection: {
      //   type: 'equirectangular'
      // },
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

    // BUTTONS
    // updatemenus: [{
    //   x: 0.1,
    //   y: 0,
    //   yanchor: "top",
    //   xanchor: "right",
    //   showactive: false,
    //   direction: "left",
    //   type: "buttons",
    //   pad: {"t": 87, "r": 10},
    //   buttons: [{
    //     method: "animate",
    //     args: [null, {
    //       fromcurrent: true,
    //       transition: {
    //         duration: 200,
    //       },
    //       frame: {
    //         duration: 500
    //       }
    //     }],
    //     label: "Play"
    //   }, {
    //     method: "animate",
    //     args: [
    //       [null],
    //       {
    //         mode: "immediate",
    //         transition: {
    //           duration: 0
    //         },
    //         frame: {
    //           duration: 0
    //         }
    //       }
    //     ],
    //     label: "Pause"
    //   }]
    // }],
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

  Plotly.newPlot('diversity-plot', data, layout, { displayModeBar: false }).then(function (event) {

    Plotly.addFrames('diversity-plot', frames);

    let currentState = 'US';
    let myPlot = document.getElementById('diversity-plot')
    event.on('plotly_click', d => {


      var pt = (d.points || [])[0]
      miniScatter(pt.location)

      // myPlot.parentElement
      console.log(myPlot.data[0].z)
      
      if (myPlot.data.length > 1) {
    Plotly.deleteTraces('diversity-plot', 1)
      }

      // search all the states, if a match in state codes, create a line plot.

      // get its z value create a new trace, covering all below it except for the current one. 
      allStates = d.points[0].data.locations

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
        // hoverinfo: 'none',
        hovertemplate:
        "<b>%{text}</b><br>" +
        "%{customdata}<br>" +
        // "%{xaxis.title.text}: %{x:.0%}<br>" +
        // "Number Employed: %{marker.size:,}" +
        "<extra></extra>",
        // hoverinfo: "text",
      }
      coverTrace.z[allStates.indexOf(pt.location)] = 1
      Plotly.addTraces('diversity-plot', coverTrace)
      currentState = pt.location
    })

    event.on('plotly_hover', d=> {
      var pt = (d.points || [])[0]
      event.style.cursor = "pointer"

      if (myPlot.data.length > 1) {
        Plotly.deleteTraces('diversity-plot', 1)
          }
    
          // search all the states, if a match in state codes, create a line plot.
    
          // get its z value create a new trace, covering all below it except for the current one. 
          allStates = d.points[0].data.locations
    
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
            // hoverinfo: 'none',
            hovertemplate:
            "<b>%{text}</b><br>" +
            "%{customdata}<br>" +
            // "%{xaxis.title.text}: %{x:.0%}<br>" +
            // "Number Employed: %{marker.size:,}" +
            "<extra></extra>",
            // hoverinfo: "text",
          
          }
          coverTrace.z[allStates.indexOf(currentState)] = 1
          coverTrace.z[allStates.indexOf(pt.location)] = 1
          Plotly.addTraces('diversity-plot', coverTrace)
    })
    event.on('plotly_unhover', d=> {
      // plotly.deleteTraces()
      // var pt = (d.points || [])[0]
      // event.style.cursor = "initial"

      // ///////////////////////////
      if (myPlot.data.length > 1) {
        Plotly.deleteTraces('diversity-plot', 1)
          }
    
      //     // search all the states, if a match in state codes, create a line plot.
    
      //     // get its z value create a new trace, covering all below it except for the current one. 
      //     allStates = d.points[0].data.locations
    
      //     let coverTrace = {
      //       type: 'choropleth',
      //       locationmode: 'USA-states',
      //       locations: frames[0].data[0].locations,
      //       z: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      //       zauto: false,
      //       zmin: 0,
      //       zmax: 1.8,
      //       colorscale: [[0, '#303030CC'], [1, 'transparent']],
      //       showscale: false,
      //     }
      //     coverTrace.z[allStates.indexOf(currentState)] = 1
      //     // coverTrace.z[allStates.indexOf(pt.location)] = 1
      //     Plotly.addTraces('diversity-plot', coverTrace)
      // ///////////////////////////
    })
  })


  // .then(gd => {
  //   gd.on('plotly_click', d => {
  //     var pt = (d.points || [])[0]

  //     switch(pt.location) {
  //       case 'CA':
  //         console.log('you clicked on CALIFORNIA')
  //         break
  //       case 'USA':
  //         console.log('you clicked on USA')
  //         break
  //     }

  //   })
  // })
  function miniScatter(state) {
    // alert('called')
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

    // Plotly.d3.csv("", function (err, rows) {
    var data = [{
      type: 'scatter',
      x: dates,
      y: diversity,
      line: {
        simplify: false,
        // color: '#683962',
        color: white,
        shape: 'spline'
      }
    }
    ];

    var layout = {
      title: {
        text: stateName,
        font: {
          color: '#909090',
          family: 'PT Sans',
          size: 18
        },
        y: 0.05,
        x: 0.43
        // y: 0.95,
        // x: 0.25
      },
      // title: stateName,
      width: 300,
      height: 400,
      xaxis: {
        visible: true,
        color: '#909090',
        gridcolor: '#90909048'
        // showgrid: false 
      },
      yaxis: {
        title: {
          text: 'Diversity Index',
          // text: 'DIVERSITY INDEX',
          family: 'PT Sans'
        },
        range: [0, 1.79],
        visible: true,
        color: '#909090',
        gridcolor: '#90909048'
        // showgrid: false 
      },
      // title: 'Diversity across the US,'
      paper_bgcolor: 'transparent',
      plot_bgcolor: '#90909048',
      margin: { t: 75, r: 0 }
      // "margin": { "l": 0, "r": 0, "b": 0, "t": 0 },
    };

    if (state == 'US') {
      Plotly.react('state-diversity', data, layout, { displayModeBar: false });
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

    // Plotly.newPlot('total-trump-line', [data[1]], layout, { displayModeBar: false });
    // })
  }
  miniScatter('US')
})


