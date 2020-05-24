import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './SearchCity.scss';

SearchCity.propTypes = {
    
};

function SearchCity(props) {
    const {onSubmit} = props;
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')

    function handleCity(event){
        setCity(event.target.value);
    }

    function handleCountry(event){
        setCountry(event.target.value);
    }

    function handleSubmit(event){
        //prevent reloading browser 
        event.preventDefault();
        if(!onSubmit) return;
        //co the them nhieu fill vao object de submit
        const formValue = {
            city,
            country
        };
        console.log(formValue);
        onSubmit(formValue);

        //reset form
        setCity('');
        setCountry('');
    }
    return (
        <div className="container search-city">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-3 offset-md-2">
                        <input 
                            type="text" 
                            className="form-input"
                            name="city"
                            placeholder="City..."
                            onChange={handleCity}
                        />
                    </div>
                    <div className="col-md-3">
                        <input 
                            type="text" 
                            className="form-input"
                            name="country"
                            placeholder="Country..."
                            onChange={handleCountry}
                        />
                    </div>
                    <div className="col-md-3 mt-md-0 text-md-left">
                        <button className="btn btn-warning">Get Weather</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SearchCity;