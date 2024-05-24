import React from 'react'
import { useSelector } from 'react-redux';
import { selectFormData } from './form/formSlice';
import './style.css'

const Success = () => {
    const formData = useSelector(selectFormData);

    return (
        <div className='container'>
            <h1>Success</h1>
            <div>
                <h2>Form Data:</h2>
                <p>First Name: {formData.firstName}</p>
                <p>Last Name: {formData.lastName}</p>
                <p>Username: {formData.username}</p>
                <p>Email: {formData.email}</p>
                <p>Phone No.: {formData.phoneNo}</p>
                <p>Country: {formData.country}</p>
                <p>City: {formData.city}</p>
                <p>PAN No.: {formData.panNo}</p>
                <p>Aadhar No.: {formData.aadharNo}</p>
            </div>
        </div>
    )
}

export default Success