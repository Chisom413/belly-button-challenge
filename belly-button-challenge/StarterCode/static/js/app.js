// Function to initialize the dashboard
function init() {
  // Select the dropdown menu
  var dropdown = d3.select("#selDataset");

  // Use D3 to fetch the JSON file
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
    // Get the sample names from the data
    var names = data.names;

    // Populate the dropdown menu with the sample names
    names.forEach((name) => {
      dropdown.append("option").text(name).property("value", name);
    });

    // Initialize the dashboard with the first sample
    var firstSample = names[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Function to update the charts and metadata when a new sample is selected
function optionChanged(newSample) {
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Function to build the charts
function buildCharts(sample) {
  // Use D3 to fetch the JSON file
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
    // Get the sample data
    var samples = data.samples;
    var resultArray = samples.filter(sampleObj => sampleObj.id === sample);
    var result = resultArray[0];

    // Build the bar chart
    var barData = [{
      x: result.sample_values.slice(0, 10).reverse(),
      y: result.otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
      text: result.otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h"
    }];

    var barLayout = {
      title: "Top 10 OTUs",
      margin: {
        t: 30,
        l: 150
      }
    };

    Plotly.newPlot("bar", barData, barLayout);

    // Build the bubble chart
    var bubbleData = [{
      x: result.otu_ids,
      y: result.sample_values,
      text: result.otu_labels,
      mode: "markers",
      marker: {
        size: result.sample_values,
        color: result.otu_ids,
        colorscale: "Earth"
      }
    }];

    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: { title: "OTU ID" },
      hovermode: "closest",
      margin: { t: 30 }
    };

    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
  });
}

// Function to build the metadata
function buildMetadata(sample) {
  // Use D3 to fetch the JSON file
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
    // Get the metadata
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];

    // Select the metadata element
    var metadataPanel = d3.select("#sample-metadata");

    // Clear the existing metadata
    metadataPanel.html("");

    // Append each key-value pair from the metadata to the panel
    Object.entries(result).forEach(([key, value]) => {
      metadataPanel.append("p").text(`${key}: ${value}`);
    });
  });
}

// Initialize the dashboard
init();
