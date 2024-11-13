import React, { useState } from "react";
import InputField from "./inputField";

const AuthForm = ({ fields, handleSubmit }) => {
    const [data, setData] = useState({});
    fields.map((field) => {
        console.log(field);
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-6">
                {fields.map((field) => {
                    <InputField
                        key={field.name}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        onChange={handleInputChange}
                    />;
                })}

                <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    );
};
export default AuthForm;
