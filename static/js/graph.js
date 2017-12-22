queue()
    .defer(d3.json, "/socialHousing/projects")
    .await(makeGraphs);
function makeGraphs(error, socialHousingProjects) {
    if (error) {
        console.error("makeGraphs error on receiving dataset:", error.statusText);
        throw error;
    }

    socialHousingProjects.forEach(function (d) {
        d["Number of Units"] = +d["Number of Units"];
        d["Stage 1 Capital Appraisal"] = d["Stage 1 Capital Appraisal"];
        d["Stage 2 Pre Planning"] = d["Stage 2 Pre Planning"];
        d["Stage 3 Pre Tender design"] = d["Stage 3 Pre Tender design"];
        d["Stage4 Tender Report or Final Turnkey/CALF approval"] = d["Stage4 Tender Report or Final Turnkey/CALF approval"];
        d["Site Start"] = d["Site Start"];
        d["Site Finish"] = d["Site Finish"];
        d["LA"] = d["LA"];
    });

    var ndx = crossfilter(socialHousingProjects);

    var numberOfUnits = ndx.dimension(function (d) {
        return d["Number of Units"];
    });
    var stage1 = ndx.dimension(function (d) {
        return d["Stage 1 Capital Appraisal"];
    });
    var stage2 = ndx.dimension(function (d) {
        return d["Stage 2 Pre Planning"];
    });
    var stage3 = ndx.dimension(function (d) {
        return d["Stage 3 Pre Tender design"];
    });
    var stage4 = ndx.dimension(function (d) {
        return d["Stage 4 Tender Report or Final Turnkey/CALF approval"];
    });
    var siteStart = ndx.dimension(function (d) {
        return d["Site Start"];
    });
    var siteFinish = ndx.dimension(function (d) {
        return d["Site Finish"];
    });
    var housesperArea = ndx.dimension(function (d) {
        return d["LA"];
        housesperArea.filterAll()
        var filteredCities = housesperArea.filter (function(d) {if (d === "Galway City" || d ==="Dublin City" || d === "Cork City" || d === "Cork City") {return d;}});
    });

    var numOfUnits = numberOfUnits.group();
    var numStage1 = stage1.group();
    var numStage2 = stage2.group();
    var numStage3 = stage3.group();
    var numStage4 = stage4.group();
    var numsiteStart = siteStart.group();
    var numsiteFinish = siteFinish.group();
    var housesPerCity = filteredCities.group().reduceSum(function (d) {
        return d["numberofUnits"];
    });



}

