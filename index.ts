interface countryObjet {
  country: string;
  population: number;
  area: number;
  populationDensity: number;
}
const fs = require("fs");
const regex = /\s(?=\d)/;

fs.readFile("./countries.txt", "utf8", (err, data) => {
  if (err) throw err;
  if (!data) return;

  const lines = data.split("\n").slice(1);

  const countries = lines.map((line) => {
    const [country, population, area] = line.split(regex);

    const populationFixed =
      population === undefined ? 0 : parseFloat(population.replace(/,/g, 0));
    const areaFixed =
      area === undefined ? 0 : parseFloat(area.replace(/,/g, 0));
    let populationDensity: number | string;

    if (areaFixed > 0 && populationFixed > 0) {
      populationDensity = parseFloat((populationFixed / areaFixed).toFixed(3));
    } else {
      populationDensity = 0;
    }

    const countryObjet: countryObjet = {
      country: country,
      population: populationFixed,
      area: areaFixed,
      populationDensity: populationDensity,
    };

    return countryObjet;
  });
  function sortCountriesByPopulationDensity(countries) {
    const sortedCountries = countries.sort(
      (a, b) =>
        (b.populationDensity || Number.MIN_SAFE_INTEGER) -
        (a.populationDensity || Number.MIN_SAFE_INTEGER)
    );
    const nonZeroValues = sortedCountries.filter(
      (country) => country.populationDensity !== 0
    );
    const zeroValues = sortedCountries.filter(
      (country) => country.populationDensity === 0
    );
    return [...nonZeroValues, ...zeroValues];
  }
  const shortedCountries = sortCountriesByPopulationDensity(countries);

  shortedCountries.pop();

  const csvString = [
    ["Country", "Area", "Population", "Density"],
    ...shortedCountries.map((item) => [
      item.country,
      item.area,
      item.population,
      item.populationDensity,
    ]),
  ]
    .map((e) => e.join(","))
    .join("\n");

  fs.writeFile("./countries.csv", csvString, (err) => {
    if (err) throw err;
  });

  console.log(csvString);

  if (!countries) return;
});
