// Use the D3 library to read in samples.json.
d3.json("samples.json").then((importedData) => {
    var data = importedData;
    // console.log(data);

    var names = data.names;
    // console.log(names);
    var metadata = data.metadata;
    // console.log(metadata);
    var samples = data.samples;
    // console.log(samples);

    // Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.


    // Use sample_values as the values for the bar chart.

    // Use otu_ids as the label for the bar chart.

    // Use otu_labels as the hovertext for the chart.



});