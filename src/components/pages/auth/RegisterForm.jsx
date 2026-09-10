import { useState } from 'react';
import Input from "../../common/forms/inputs/Input";
import FormButton from '../../common/forms/inputs/FormButton';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Post request to api/register
        console.log('helllo test register')
    }
    return (
        <>
            <form className="user-register-form">
                <Input 
                  id="firstName"
                  label="First Name"
                  value={formData.firstName}
                  handleChange={handleChange}
                />
                <Input 
                  id="lastName"
                  label="Last Name"
                  value={formData.lastName}
                  handleChange={handleChange}
                />
                <Input 
                  id="email"
                  label="Email Address"
                  value={formData.email}
                  handleChange={handleChange}
                />
                <Input 
                  id="password"
                  label="Enter a password"
                  type="password"
                  value={formData.password}
                  handleChange={handleChange}
                />
                <FormButton
                  id="sign-up"
                  type="submit"
                  label="Sign Up"
                  classes="btn"
                  handleClick={handleSubmit}
                />
            </form>
        </>
    );
};

export default RegisterForm;