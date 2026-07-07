import { useState } from 'react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        email: '',
        phrase: '',
        translation: '',
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

  return (
    <div className='form-container'>
        <h2>Submit a phrase!</h2>
        <form>
            <label>
                First Name: 
                <input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} />
            </label>
            <label>
                Email:
                <input id="email" name="email" value={formData.email} onChange={handleInputChange} />
            </label>
            <label>
                Phrase:
                <textarea id="phrase" name="phrase" value={formData.phrase} onChange={handleInputChange} />
            </label>
            <label>
                Translation:
                <textarea id="translation" name="translation" value={formData.translation} onChange={handleInputChange} />
            </label>
            <button type="submit">Submit Phrase</button>
            
        </form>
    </div>
  );
};

export default ContactForm;