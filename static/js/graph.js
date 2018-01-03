queue()
    .defer(d3.json, '/socialHousing/projects')
    .await(makeGraphs);
function makeGraphs(error, socialHousingProjects) {
    if (error) {
        console.error("makeGraphs error on receiving dataset:", error.statusText);
        throw error;
    }

    socialHousingProjects.forEach(function (d) {
        d["LA"] = d["LA"];
        d["Number of Units"] = +d["Number of Units"];
    });


    var ndx = crossfilter(socialHousingProjects);
    var all = ndx.groupAll();

    var cityDim = ndx.dimension( function(d) { return d["LA"]; });
    var numberOfUnitsDim = ndx.dimension( function(d) { return d["Number of Units"]; });

    var cityGroup = cityDim.group();
    var numberOfUnitsGroup = numberOfUnitsDim.group();

    var cityGroupChart = dc.lineChart("#housesPerArea");

    cityGroupChart
        .dimension(cityDim)
        .group(cityGroup);


    dc.renderAll();



}

