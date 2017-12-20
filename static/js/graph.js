queue()
    .defer(d3.json, "/socialHousing/projects")
    .await(makeGraphs);
function makeGraphs(error, socialHousingProjects) {
    if (error) {
        console.error("makeGraphs error on receiving dataset:", error.statusText);
        throw error;
    }

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
    });
}

