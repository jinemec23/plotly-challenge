// Use the D3 library to read in samples.json.
d3.json("samples.json").then((importedData) => {
    var data = importedData;
    console.log(data);

    var names = data.names;
    // console.log(names);
    var metadata = data.metadata;
    // console.log(metadata);
    var samples = data.samples;
    console.log(samples);


    var name_data = Object.values(data.names);
    var metadata_data = Object.values(data.metadata);
    var sample_data = Object.values(data.samples);

    var sample_keys = Object.keys(data.samples);

    var otuValues = samples.map(row => row.sample_values);
    var otuValues = otuValues[testSel].slice(0, 10).reverse();
    var otuIds = samples.map(row => row.otu_ids);
    var otuIds = otuIds[testSel].slice(0, 10);
    var otuLabels = samples.map(row => row.otu_labels);
    var otuLabels = otuLabels[testSel].slice(0, 10);
    var trace = {
        x: otuValues,
        y: otuIds.map(r => `UTO ${r}`),
        text: otuLabels,
        type: 'bar',
        orientation: 'h'
    }

    function init() {
        var chart_data = [{
            x: otuValues,
            y: otuIds.map(r => `UTO ${r}`),
            type = "bar"
        }];
        var layout = {
            height: 600,
            width: 900
        };

        Plotly.newPlot("bar", chart_data, layout);
    }

    d3.selectAll("#selDataset").on('change', optionChanged);
    // Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
    var dropdown = d3.selectAll("#selDataset").on('change', optionChanged);
    Object.entries(names).forEach(([i, v]) => {
        dropdown.append('option').text(v);
    })

    // function optionChangd(selectedID) {
    //     console.log(selectedID);
    //     d3.json("samples.json").then((importedData) => {
    //             var data = importedData;
    //             console.log(data);
    //             d3.select('#selDataset').html("");
    //         }


    function optionChanged() {
        var dropdown = d3.selectAll("#selDataset")

    }
    // Use sample_values as the values for the bar chart.
    // Use otu_ids as the label for the bar chart.
    function updatePlotly(testId) {
        var samples = data.samples;
        var testSel = samples.map(row => row.id).indexOf(testId);
        // Make bar plot
        var otuValues = samples.map(row => row.sample_values);
        var otuValues = otuValues[testSel].slice(0, 10).reverse();
        var otuIds = samples.map(row => row.otu_ids);
        var otuIds = otuIds[testSel].slice(0, 10);
        var otuLabels = samples.map(row => row.otu_labels);
        var otuLabels = otuLabels[testSel].slice(0, 10);
        var trace = {
            x: otuValues,
            y: otuIds.map(r => `UTO ${r}`),
            text: otuLabels,
            type: 'bar',
            orientation: 'h'
        }

        Plotly.newPlot('bar', [trace]);
        // make bubble chart
        var otu_Value = samples.map(row => row.sample_values);
        var otu_Value = otu_Value[testNum];
        var otu_Id = samples.map(row => row.otu_ids);
        var otu_Id = otu_Id[testNum];
        var otu_Label = samples.map(row => row.otu_labels);
        var otu_Label = otu_Label[testNum];
        var min_Ids = d3.min(otu_Id);
        var max_Ids = d3.max(otu_Id);
        var mapNr = d3.scaleLinear().domain([min_Ids, max_Ids]).range([0, 1]);
        var bubbleColors = otu_Id.map(val => d3.interpolateRgbBasis(["royalblue", "yellow", "red"])(mapNr(val)));
        var trace1 = {
            x: otu_Id,
            y: otu_Value,
            text: otu_Label,
            mode: 'markers',
            marker: {
                color: bubbleColors,
                size: otuValue.map(x => x * 10),
                sizemode: 'area'
            }
        };
        var data1 = [trace1];
        var bubbleLayout = {
            xaxis: {
                autochange: true,
                height: 600,
                width: 1000,
                title: {
                    text: 'OTU ID'
                }
            },
        };
        Plotly.newPlot('bubble', data1, bubbleLayout);
        // make gauge chart 
        var meta = data.metadata;
        var data2 = [{
            domain: { x: [0, 1], y: [0, 1] },
            value: meta[testId].wfreq,
            title: { text: "Washing frequency" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [null, 9] },
                bar: { color: 'orange' },
                steps: [
                    { range: [0, 2], color: "rgba(14, 127, 0, .5)" },
                    { range: [2, 3], color: "rgba(110, 154, 22, .5)" },
                    { range: [3, 4], color: "rgba(170, 202, 42, .5)" },
                    { range: [4, 5], color: "rgba(202, 209, 95, .5)" },
                    { range: [5, 6], color: "rgba(210, 206, 145, .5)" },
                    { range: [6, 8], color: "rgba(232, 226, 202, .5)" },
                    { range: [8, 9], color: "rgba(255, 255, 255, 0)" }
                ]
            }
        }];

        var gaugeLayout = { width: 600, height: 500 };
        Plotly.newPlot('gauge', data2, gaugeLayout);
        // display meta info
        var metadata = d3.select('#sample-metadata');
        metadata.html('');
        Object.entries(meta[testId]).forEach(([k, v]) => {
            metadata.append('p').text(`${k.toUpperCase()}:\n${v}`);
        })

    }

    // Submit Button handler
    function optionChanged(newId) {
        // Select the input value from the form
        updatePlotly(newId);
    }
    // var otu_values = samples.map(row => row.sample_values.slice(0, 10));
    // console.log(otu_values);
    // // console.log(otu_values);
    // var topten_ids = samples.map(row => row.otu_ids.slice(0, 10));
    // // console.log(topten_ids);
    // var topten_labels = samples.map(row => row.otu_labels.slice(0, 10));
    // // console.log(topten_labels);
    // var trace = {
    //     x: otu_values,
    //     y: topten_ids.map(r => `UTO ${r}`),
    //     text: topten_labels,
    //     type: 'bar',
    //     orientation: 'h'
    // }

    // Plotly.Plot('bar', [trace]);
    // var sample_values = samples.map(row => row.sample_values);
    // var otu_ids = samples.map(row => row.otu_ids);
    // var otu_labels = samples.map(row => row.otu_labels);
    // var min_id = d3.min(otu_ids);
    // var max_id = d3.max(otu_ids);
    // var map_nr = d3.scaleLinear()
    //     .domain([min_id, max_id])
    //     .range([0, 1]);
    // var trace1 = {
    //     x: otu_ids,
    //     y: sample_values,
    //     text: otu_labels,
    //     mode: 'markers',
    //     marker:
    // }
});



// Use otu_labels as the hovertext for the chart.}



// function optionChanged(updateID) {
//     updatePlotly(updateID);
// }