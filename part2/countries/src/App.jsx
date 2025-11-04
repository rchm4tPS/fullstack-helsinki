import { useState, useEffect } from 'react';
import axios from "axios";
import  CountryDetail from './components/CountryDetail'
import  CountryList  from './components/CountryList'
import  Weather from './components/Weather'

import './App.css';

// Custom Hook for debouncing a value
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};


// Main App Component
const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [allCountries, setAllCountries] = useState([]);
    const [matchedCountries, setMatchedCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [weatherData, setWeatherData] = useState(null);

    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const openWeatherAPIKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

    // Effect for fetching initial data
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                let response = await axios.get('http://localhost:3001/countries');
                console.log("get dalam")
                if (Object.keys(response.data).length === 0) {
                    console.log("masuk API luar")
                    const allCountriesResponse = await axios.get('https://studies.cs.helsinki.fi/restcountries/api/all');
                    response = await axios.put('http://localhost:3001/countries', allCountriesResponse.data);
                }
                setAllCountries(response.data);
            } catch (error) {
                console.error("Error fetching country data:", error);
            }
        };

        fetchCountries();
    }, []); // Runs only once on component mount

    // Effect for filtering countries and managing selection when the search term changes
    useEffect(() => {
        if (debouncedSearchTerm) {
            const matched = allCountries.filter(country =>
                country.name.common.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
            );
            setMatchedCountries(matched);

            // This logic now correctly resets the view to the list or a single result
            if (matched.length === 1) {
                setSelectedCountry(matched[0]);
            } else {
                // Clear any previous selection when the search term leads to a new list
                setSelectedCountry(null);
            }
        } else {
            // Clear results when the input is empty
            setMatchedCountries([]);
            setSelectedCountry(null);
        }
    }, [debouncedSearchTerm, allCountries]);

    useEffect(() => {
        // If there's no selected country or it has no capital info, do nothing.
        if (!selectedCountry || !selectedCountry.capitalInfo?.latlng) {
            setWeatherData(null); // Clear any old weather data
            return;
        }

        const lat = selectedCountry.capitalInfo.latlng[0];
        const lon = selectedCountry.capitalInfo.latlng[1];
        
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherAPIKey}&units=metric`)
            .then(response => {
                setWeatherData(response.data); // <-- STEP 3: Store result in state
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                setWeatherData(null); // Clear on error
            });

    }, [selectedCountry, openWeatherAPIKey]); // This effect re-runs when selectedCountry changes

    const renderContent = () => {
        // If a country has been manually selected, show its details regardless of other conditions.
        // The useEffect above will clear this selection only when the search term changes.
        if (selectedCountry) {
            return (
                <>
                    <CountryDetail country={selectedCountry} />
                    <Weather capital={selectedCountry.capital?.[0]} weatherData={weatherData} />
                </>
            );
        }

        if (!debouncedSearchTerm) {
            return <p>Type something to find a country!</p>;
        }

        if (matchedCountries.length > 10) {
            return <p>Too many matches, please be more specific.</p>;
        }

        if (matchedCountries.length > 0) {
            return <CountryList countries={matchedCountries} onSelectCountry={setSelectedCountry} />;
        }

        return <p>No matches found for your search.</p>;
    };

    return (
        <>
            find countries:
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className='detail-area'>
                {renderContent()}
            </div>
        </>
    );
};

export default App;