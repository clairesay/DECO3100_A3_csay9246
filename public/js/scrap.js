Plotly.d3.csv("https://raw.githubusercontent.com/clairesay/DECO3100_A3_csay9246/main/public/data/child_values.csv", function(err, rows){
console.log(["First person", "Second person", "Third person", "Collective"].concat(unpack(rows, 'words')))
var percentages = unpack(rows, 'trump_all_value')
// console.log(percentages)
percentages = percentages.map(function(x) {
    let whole;
    if (percentages.indexOf(x) <= 3 ) {
        whole = 21
    } else if (percentages.indexOf(x) <= 7) {
        whole = 12
    } else if (percentages.indexOf(x) <= 18) {
        whole = 43
    } else if (percentages.indexOf(x) <= 21) {
        whole = 24
    }
    return parseInt(x, 10)/100 * whole
})
// 21, 12, 43, 24
//               [21, 12, 43, 24, 12.18, 2.31, 6.09, 0, 5.16, 0.72, 6, 0, 6.0200000000000005, 1.29, 9.46, 8.6, 1.29, 0.86, 1.72, 3.44, 0, 3.8699999999999997, 3.8699999999999997, 17.52, 6.24, 0]
percentages = [21, 12, 43, 24].concat(percentages) //
// var numbers = [21, 12, 43, 24].concat(unpack(rows, 'trump_all_value'))
// // console.log([25, 25, 25, 25].concat(unpack(rows, 'trump_all')),)

// var result = numbers.map(function (x) { 
//   return parseInt(x, 10); 
// });
// console.log(result)
// .concat(unpack(rows, 'words'))
var data = [
        {
          "type": "sunburst",
          "labels": ["First person", "Collective", "Third person", "Second person"].concat(unpack(rows, 'words')), 
          "parents": ["", "", "", ""].concat(unpack(rows, 'parent')),
        //   who is their parent: ["", "Personal", "Personal", "Personal", "Personal, "]
        //   "values":  [25, 25, 25, 25].concat(unpack(rows, 'trump_all')),
            "values": percentages,
          "leaf": {"opacity": 0.4},
          "marker": {"line": {"width": 2}},
          "branchvalues": 'total'
        }];

        var layout = {
          "margin": {"l": 0, "r": 0, "b": 0, "t": 0},
        };

        Plotly.newPlot('words', data, layout, {showSendToCloud: true})
})