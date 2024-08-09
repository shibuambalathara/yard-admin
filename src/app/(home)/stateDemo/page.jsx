import { State, City } from 'country-state-city';

const StateAndCityComponent = ({ countryCode = 'IN', cityCode = 'KL' }) => {
    const stateData = State.getStatesOfCountry(countryCode).map(state => ({
        value: state.name,
        displayValue: state.name
    }))

    const cityData = City.getCitiesOfState(countryCode, cityCode).map(city => ({
        value: city.name,
        displayValue: city.name
    }))

    return <>
        <p>All States of - India</p>
        <Dropdown options={stateData}></Dropdown>
        <p>All Cities of Telangana(IN)</p>
        <Dropdown options={cityData}></Dropdown>
    </>
}

export default StateAndCityComponent;

const Dropdown = ({options}) => {
	return <select>
		{
			options.map((option, index) => {
				return <option key={index} value={option.value}>{option.displayValue}</option>
			})
		}
	</select>
}

