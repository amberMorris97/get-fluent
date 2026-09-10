const Input = ({ id, label, type, value, required, handleChange }) => {
    return (
        <>
            <label htmlFor={id}>
                {label}
                {required && '*'}
            </label>     
            <input id={id} type={type || 'text'} value={value} onChange={handleChange} />   
        </>
    );
};