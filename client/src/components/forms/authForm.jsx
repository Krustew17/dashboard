import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "./inputField";
import requester from "../../common/requester";
import { login } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const AuthForm = ({ fields, text, type }) => {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState();
    const [success, setSuccess] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const { response, responseJson } = await requester(`auth/${type}`, {
                method: "POST",
                body: data,
            });
            if (response.ok) {
                setSuccess(responseJson.message);
                setErrors();
            }
            if (responseJson.token && responseJson.user) {
                localStorage.setItem("token", responseJson.token);
                dispatch(
                    login({
                        user: JSON.stringify(responseJson.user),
                        token: responseJson.token,
                    })
                );
                navigate("/");
            }
            setErrors(responseJson);
            setSuccess();
        } catch (error) {
            console.log(error);
            setErrors(error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    return (
        <form className="space-y-6 min-w-[280px]" onSubmit={handleFormSubmit}>
            {fields.map((field) => {
                return (
                    <InputField
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        onChange={handleInputChange}
                    />
                );
            })}

            {errors && <div className="text-red-500">{errors.message}</div>}
            {success && <div className="text-green-500">{success}</div>}

            <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    {text.buttonText}
                </button>
            </div>
            <p className="mt-10 text-sm/6 text-gray-500 flex gap-2 justify-center">
                {text.extra}
                <Link
                    to={type === "register" ? "/login" : "/register"}
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                    {text.redirect}
                </Link>
            </p>
        </form>
    );
};
export default AuthForm;
