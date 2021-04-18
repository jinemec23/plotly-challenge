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




    // Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
    var dropdown = d3.selectAll("#selDataset");
    Object.entries(names).forEach(([i, v]) => {
        dropdown.append('option').text(v);
    })

    var  topten_samples  =  samples.map(row  =>  row.sample_values.slice(0,  10));    
    // console.log(`top_ten${topten_samples}`);




    // Use sample_values as the values for the bar chart.
    // Use otu_ids as the label for the bar chart.
    function updatePlotly() {

        var otu_values = samples.map(row => row.sample_values.slice(0, 10));
        console.log(otu_values);
        // console.log(otu_values);
        var topten_ids = samples.map(row => row.otu_ids.slice(0, 10));
        // console.log(topten_ids);
        var topten_labels = samples.map(row => row.otu_labels.slice(0, 10));
        // console.log(topten_labels);

    };



    // Use otu_labels as the hovertext for the chart.}



    function optionChanged() {
        updatePlotly(newID);
    }


});