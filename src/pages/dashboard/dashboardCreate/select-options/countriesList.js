import countries from "countries-list";

const countryCodes = Object.keys(countries.countries);
const countryNames = countryCodes
  .map((code) => {
    const countryName = countries.countries[code].name;
    return {
      value: countryName,
      text: countryName,
    };
  })
  .sort((a, b) => (a.value > b.value ? 1 : -1));

export default countryNames;
