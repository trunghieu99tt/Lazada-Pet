import React from "react";

const TextAreaDash = ({ id, disabled, label, value, name, onChange }) => {
    return (
        <div className="form-group">
            <label htmlFor={id}>{label}</label>
            <textarea
                className="form-control"
                value={value}
                id={id}
                rows="2"
                disabled={disabled}
                name={name}
                onInput={onChange}
            ></textarea>
        </div>
    );
};

export default TextAreaDash;
