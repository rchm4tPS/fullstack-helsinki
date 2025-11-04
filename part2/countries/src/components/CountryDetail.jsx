// Component to display the details of a single country
const CountryDetail = ({ country }) => (
    <>
        <h1>{country.name.common}</h1>
        <span>Capital: {country.capital?.[0]}</span>
        <br />
        <span>Area: {country.area} km²</span>
        <h2>Languages</h2>
        <ul>
            {Object.values(country.languages).map(lang => (
                <li key={lang}>{lang}</li>
            ))}
        </ul>
        <img className='flag-img' src={country.flags.svg} alt={country.flags.alt} />
    </>
)

export default CountryDetail