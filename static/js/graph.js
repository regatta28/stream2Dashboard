queue()
    .defer(d3.json, '/socialHousing/projects')
    .await(makeGraphs);
function makeGraphs(error, socialHousingProjects) {
    if (error) {
        console.error("makeGraphs error on receiving dataset:", error.statusText);
        throw error;
    }

    socialHousingProjects.forEach(function (d) {
        d.county = d["la"];
        d.number_of_Units = +d["number_of_units"];
    });


    var ndx = crossfilter(socialHousingProjects);
    var all = ndx.groupAll();

    var cityDim = ndx.dimension( function(d) { return d["la"];
    });
    var numberOfUnitsDim = ndx.dimension( function(d) { return d["number_of_units"];
    });

    var cityGroup = cityDim.group();
    var numberOfUnitsGroup = numberOfUnitsDim.group();

    var numberOfHousesPerCountyorCity = cityDim.group().reduceSum(function(d) {return d.number_of_Units});

    var cityGroupChart = dc.lineChart("#housesPerArea");

  

    cityGroupChart
        .dimension(cityDim)
        .group(numberOfHousesPerCountyorCity)
        .x(d3.scale.linear().domain([0, d3.max[numberOfHousesPerCountyorCity]]));



    dc.renderAll();



}

