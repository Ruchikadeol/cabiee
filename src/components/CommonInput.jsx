import React from 'react'

const CommonInput = ({label, type,name , value, onChange, placeholder, error}) => {
  return (<>
    <div className='common-input'>
    {label && <label htmlFor={name}>{label}</label>}
    <input
    type={type}
    name={name}
    id={name}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    className={error ? "error-input" : ""}
      />
      {error && <p className="error-text">{error}</p>}
    </div>
</>
  )
}

export default CommonInput