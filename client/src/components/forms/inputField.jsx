import React from "react";

const InputField = ({ key, name, type, placeholder, onChange }) => {
    console.log(type);
    return (
        <div>
            <div className="flex items-center justify-between">
                <label htmlFor={name} className="block text-sm/6 font-medium">
                    {placeholder}
                </label>
            </div>
            <div className="mt-2">
                <input
                    id={name}
                    name={name}
                    type={type}
                    required
                    onChange={onChange}
                    placeholder={placeholder}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
            </div>
        </div>
    );
};

export default InputField;
