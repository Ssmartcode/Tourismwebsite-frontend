import countries from "countries-list";

const countryCodes = Object.keys(countries.countries);
const getEmoji = (country) => {
  let emoji;
  countryCodes.forEach((code) => {
    const countryName = countries.countries[code].name;
    if (country === countryName) emoji = countries.countries[code].emoji;
  });
  return emoji;
};

export default getEmoji;
