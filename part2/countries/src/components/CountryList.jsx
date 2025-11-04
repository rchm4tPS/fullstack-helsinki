// Component to display the list of matched countries
const CountryList = ({ countries, onSelectCountry }) => (
    <div>
        {countries.map(country => (
            <div key={country.name.common} className='list-result'>
                <span>{country.name.common} </span>
                <button onClick={() => onSelectCountry(country)}>show</button>
            </div>
        ))}
    </div>
);

export default CountryList