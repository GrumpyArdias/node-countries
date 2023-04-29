// const fs = require("fs");
// const regex = /\b\d+\b/;
// const regexNumbers = /\d+/g;
// fs.readFile("./countries.txt", "utf8", (err, data) => {
//   if (err) throw err;
//   if (!data) return;
//   console.log(data);
//   const lines = data.split("\n").slice(1);
//   const countries = lines.map((line) => {
//     const country = line.split(regex, 1)[0].trim();
//     let [population, area] = line.split(" ").slice(1);
//     // Change , to .
//     population !== null ? (population = population.replace(/,/g, ".")) : null;
//     area !== null ? (area = area.replace(/,/g, ".")) : null;
//     return { country, population, area };
//   });
//   if (!countries) return;
//   console.log(countries);
// });
var fs = require("fs");
var regex = /,(?=\s)/;
var regexNumbers = /\d+/g;
fs.readFile("./countries.txt", "utf8", function (err, data) {
    if (err)
        throw err;
    if (!data)
        return;
    var lines = data.split("\n").slice(1);
    var countries = lines.map(function (line) {
        var country = line.split(regex);
        console.log(country);
        //console.log(line.split(regex));
        // const [population, area] = line.split(regex, 1)[1].split(" ");
        // console.log(population, area);
        // // Change , to .
        // const newPopulation =
        //   population !== undefined ? population.replace(/,/g, ".") : null;
        // const newArea = area !== undefined ? area.replace(/,/g, ".") : null;
        // return { country, population: newPopulation, area: newArea };
    });
    if (!countries)
        return;
    console.log(countries);
});
