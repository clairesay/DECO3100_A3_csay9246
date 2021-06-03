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
//             oceancolor: '#303030',
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
    // set the frames[i]
    frames[i] = { data: [{ z: z, locations: locations, text: locations }], name: num }
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
    zauto: false,
    zmin: 0,
    zmax: 1.8,
    colorscale: [[0, '#FAFAFA'], [0.7, '#824e7b' ], [1, '#683962']],
    colorbar: {
 thickness: 16,
 len: 0.9,
 tick0: 1.4,
 tickcolor: '#fafafa',
 outlinecolor: 'transparent',
      nticks: 2,
      tickmode: 'array',
      // tickvals: ['More Diverse', 'Less Diverse'],
      ticktext: ['More Diverse', 'Less Diverse'],
 tickfont: {
   family: 'PT Sans',
   color: '#fafafa'
 }
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
      lakecolor: 'rgb(255, 255, 255)',
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
      bgcolor: '#FAFAFA',
      bordercolor: '#eeeeee',
      tickcolor: '#FAFAFA',
      x: 0.1,
      len: 0.9,
      xanchor: "left",
      y: 0,
      yanchor: "top",
      pad: { t: 50, b: 10 },
      currentvalue: {
        x: 0,
        xanchor: 'left',
        offset: 20,
        visible: true,
        prefix: "YEAR: ",
        xanchor: "right",
        font: {
          family: 'PT Sans',
          size: 24,
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

  Plotly.newPlot('diversity-plot', data, layout, {displayModeBar: false}).then(function (event) {

    Plotly.addFrames('diversity-plot', frames);

    event.on('plotly_click', d => {
      var pt = (d.points || [])[0]
      // search all the states, if a match in state codes, create a line plot.
      miniScatter(pt.location)  
      // switch(pt.location) {
      //   case 'CA':
      //     console.log('you clicked on CALIFORNIA')
      //     break
      // }
    })

    event.on('plotly_hover', d=> {
      var pt = (d.points || [])[0]
      event.style.cursor = "pointer"
      console.log(pt.location)
    })
    event.on('plotly_unhover', d=> {
      var pt = (d.points || [])[0]
      event.style.cursor = "initial"
      console.log(pt.location)
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
    diversity = [];
    raw_states.forEach(function(thisState, index) {
      if (thisState == state) {
        dates.push(raw_dates[index])
        diversity.push(raw_diversity[index])
      }
    })
  
      // Plotly.d3.csv("", function (err, rows) {
        var data = [{
            type: 'scatter',
            x: dates,
            y: diversity,
        }
        ];
  
        var layout = {
            // title: 'Diversity across the US,'
            paper_bgcolor: 'transparent',
            plot_bgcolor: '#FAFAFA',
            "margin": { "l": 0, "r": 0, "b": 0, "t": 0 },
        };
        Plotly.react('state-diversity', data, layout, { displayModeBar: false });
        // Plotly.newPlot('total-trump-line', [data[1]], layout, { displayModeBar: false });
    // })
  }
  miniScatter('US')
})


