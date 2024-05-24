import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCount,
  selectFormData,
  updateFormData,
} from './formSlice';
import { useNavigate } from 'react-router-dom';
import { countries, states } from '../../db';

import '../style.css'


const Form = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [countryId, setCountryId] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    showPassword: false,
    phoneNo: '',
    country: '',
    city: '',
    panNo: '',
    aadharNo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCountry = (e) => {
    const getCountry = e.target.value;
    setCountryId(getCountry);
    setFormData({ ...formData, country: getCountry, city: '' }); 
  };

  const validateFields = () => {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const aadharRegex = /^\d{12}$/;

    if (!formData.firstName) errors.firstName = 'First Name is required';
    if (!formData.lastName) errors.lastName = 'Last Name is required';
    if (!formData.username) errors.username = 'Username is required';
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.password) errors.password = 'Password is required';
    if (!formData.phoneNo) {
      errors.phoneNo = 'Phone No. is required';
    } else if (!phoneRegex.test(formData.phoneNo)) {
      errors.phoneNo = 'Phone No. is invalid';
    }
    if (!formData.country) errors.country = 'Country is required';
    if (!formData.city) errors.city = 'City is required';
    if (!formData.panNo) {
      errors.panNo = 'PAN No. is required';
    } else if (!panRegex.test(formData.panNo)) {
      errors.panNo = 'PAN No. is invalid';
    }
    if (!formData.aadharNo) {
      errors.aadharNo = 'Aadhar No. is required';
    } else if (!aadharRegex.test(formData.aadharNo)) {
      errors.aadharNo = 'Aadhar No. is invalid';
    }
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  useEffect(() => {
    validateFields();
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields();
    if (isFormValid) {
      // console.log('Form submitted:', formData);
      dispatch(updateFormData(formData));
      navigate('/success');
    }
  };


  return (
    <div>
      <div className='container'>
        <h1>FORM</h1>
        <form className='form' onSubmit={handleSubmit}>

          <div className='flex_container'>
            <div className='input_Container'>
              <label>First Name</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
              {errors.firstName && <span>{errors.firstName}</span>}
            </div>
            <div className='input_Container'>
              <label>Last Name</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
              {errors.lastName && <span>{errors.lastName}</span>}
            </div>
          </div>

          <div className='input_Container' >
            <label>Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
            {errors.username && <span>{errors.username}</span>}
          </div>
          <div className='input_Container'>
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <span>{errors.email}</span>}
          </div>
          <div className='input_Container'>
            <label>Password</label>
            <input
              type={formData.showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button type="button" onClick={() => setFormData({ ...formData, showPassword: !formData.showPassword })}>
              {formData.showPassword ? 'Hide' : 'Show'}
            </button>
            {errors.password && <span>{errors.password}</span>}
          </div>
          <div className='input_Container'>
            <label>Phone No.</label>
            <input type="text" name="phoneNo" value={formData.phoneNo} onChange={handleChange} />
            {errors.phoneNo && <span>{errors.phoneNo}</span>}
          </div>

          <div className='flex_container'>
            <div className='input_Container'>
              <label>Country</label>
              <select name="country" value={formData.country} onChange={handleCountry}>
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.country_id} value={country.country_id}>
                    {country.country_name}
                  </option>
                ))}
              </select>
              {errors.country && <span>{errors.country}</span>}
            </div>
            <div className='input_Container'>
              <label>City</label>
              <select name="city" value={formData.city} onChange={handleChange} disabled={!countryId}>
                <option value="">Select City</option>
                {countryId && states[countryId].states.map((state) => (
                  <option key={state.state_id} value={state.state_id}>{state.state_name}</option>
                ))}
              </select>
              {countryId && errors.city && <span>{errors.city}</span>}
            </div>
          </div>

          <div className='input_Container'>
            <label>PAN No.</label>
            <input type="text" name="panNo" value={formData.panNo} onChange={handleChange} />
            {errors.panNo && <span>{errors.panNo}</span>}
          </div>
          <div className='input_Container'>
            <label>Aadhar No.</label>
            <input type="text" name="aadharNo" value={formData.aadharNo} onChange={handleChange} />
            {errors.aadharNo && <span>{errors.aadharNo}</span>}
          </div>
          <button type="submit" disabled={!isFormValid}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Form;