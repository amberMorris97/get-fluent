import { useState } from 'react';
import validateForm from '../../utils/validateForm';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phrase: '',
        translation: '',
    });

    const [formErrors, setFormErrors] = useState({
        name: '',
        email: '',
        phrase: '',
        translation: '',
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        setFormErrors({
            ...formErrors,
            [e.target.name]: ''
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validateForm(formData));
        setFormData({
            name: '',
            email: '',
            phrase: '',
            translation: '',
        });
    };

  return (
    <div className="form-container">
        <h2>Submit a phrase!</h2>
        <form className="contact-form" onSubmit={handleFormSubmit}>
            <>
                <label>
                    Name: 
                    <input id="name" name="name" value={formData.name} onChange={handleInputChange} />
                    <span>{formErrors.name}</span>
                </label>
            </>
            <>
                <label>
                    Email:
                    <input id="email" name="email" value={formData.email} onChange={handleInputChange} />
                    <span>{formErrors.email}</span>
                </label>
            </>
            <>
                <label>
                    Phrase:
                    <textarea id="phrase" name="phrase" value={formData.phrase} onChange={handleInputChange} />
                    <span>{formErrors.phrase}</span>
                </label>
            </>
            <>
                <label>
                    Translation:
                    <textarea id="translation" name="translation" value={formData.translation} onChange={handleInputChange} />
                    <span>{formErrors.translation}</span>
                </label>
            </>
            <button className="btn" type="submit">Submit Phrase</button>
        </form>
    </div>
  );
};

export default ContactForm;