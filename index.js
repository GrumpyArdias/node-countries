var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var fs = require("fs");
var regex = /\s(?=\d)/;
var regexNumbers = /\d+/g;
fs.readFile("./countries.txt", "utf8", function (err, data) {
    if (err)
        throw err;
    if (!data)
        return;
    var lines = data.split("\n").slice(1);
    var countries = lines.map(function (line) {
        var _a = line.split(regex), country = _a[0], population = _a[1], area = _a[2];
        var populationFixed = population === undefined ? 0 : parseFloat(population.replace(/,/g, 0));
        var areaFixed = area === undefined ? 0 : parseFloat(area.replace(/,/g, 0));
        var populationDensity;
        if (areaFixed > 0 && populationFixed > 0) {
            populationDensity = parseFloat((populationFixed / areaFixed).toFixed(3));
        }
        else {
            populationDensity = 0;
        }
        var countryObjet = {
            country: country,
            population: populationFixed,
            area: areaFixed,
            populationDensity: populationDensity
        };
        return countryObjet;
    });
    function sortCountriesByPopulationDensity(countries) {
        var sortedCountries = countries.sort(function (a, b) {
            return (b.populationDensity || Number.MIN_SAFE_INTEGER) -
                (a.populationDensity || Number.MIN_SAFE_INTEGER);
        });
        var nonZeroValues = sortedCountries.filter(function (country) { return country.populationDensity !== 0; });
        var zeroValues = sortedCountries.filter(function (country) { return country.populationDensity === 0; });
        return __spreadArray(__spreadArray([], nonZeroValues, true), zeroValues, true);
    }
    var shortedCountries = sortCountriesByPopulationDensity(countries).pop();
    console.table(shortedCountries);
    // const csvString = [
    //   ["country", "area", "population", "density"],
    //   ...shortedCountries.map((item) => [
    //     item.country,
    //     item.area,
    //     item.population,
    //     item.populationDensity,
    //   ]),
    // ]
    //   .map((e) => e.join(","))
    //   .join("\n");
    // console.log(csvString);
    if (!countries)
        return;
});
