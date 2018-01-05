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
        d.site_start = d["site_start"];
    });


    var ndx = crossfilter(socialHousingProjects);
    var all = ndx.groupAll();

    var cityDim = ndx.dimension( function(d) { return d["la"];
    });
    var numberOfUnitsDim = ndx.dimension( function(d) { return d["number_of_units"];
    });
    var siteStart = ndx.dimension( function(d) { return d["site_start"];
    });

    var cityGroup = cityDim.group();
    var numberOfUnitsGroup = numberOfUnitsDim.group();
    var siteStartGroup = siteStart.group();

    var numberOfHousesPerCountyorCity = cityDim.group().reduceSum(function(d) {return d.number_of_Units});

    var cityGroupChart = dc.lineChart("#housesPerArea");
    var siteStartChart = dc.pieChart("#pie-chart-one");
    var selectField = dc.selectMenu("#menu-select");

    selectField
        .dimension(cityDim)
        .group(cityGroup);

    siteStartChart
        .height(220)
        .radius(90)
        .innerRadius(40)
        .transitionDuration(1500)
        .dimension(siteStart)
        .group(siteStartGroup);

    cityGroupChart
        .dimension(cityDim)
        .group(numberOfHousesPerCountyorCity)
        .x(d3.scale.linear().domain([0, d3.max[numberOfHousesPerCountyorCity]]))
        .renderArea(true)
        .xAxisLabel("County/City")
        .yAxis().ticks(6);



    dc.renderAll();



}

