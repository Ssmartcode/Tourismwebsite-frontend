import countries from "countries-list";

const countryCodes = Object.keys(countries.countries);
const countryNames = countryCodes.map((code) => {
  const countryName = countries.countries[code].name;
  return {
    value: countryName,
    text: countryName,
  };
});

export default countryNames;
