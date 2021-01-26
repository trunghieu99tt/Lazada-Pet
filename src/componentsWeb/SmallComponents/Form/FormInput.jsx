import React from "react";

const FormInput = ({ handleChange, label, required, value, ...otherProps }) => (
    <div className="group">
        {label ? (
            <label className="form-input-label">
                {label}
                {required ? "*" : ""}
            </label>
        ) : null}
        <input
            className={`form-input ${!value && "form-input--error"}`}
            onChange={handleChange}
            value={value}
            {...otherProps}
            required={required}
        />
    </div>
);

export default FormInput;
