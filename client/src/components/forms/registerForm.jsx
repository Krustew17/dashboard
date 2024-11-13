import AuthForm from "./authForm";
import authFields from "../../config/authFields";

const RegisterForm = () => {
    return (
        <div>
            <div>Sign Up</div>
            <div>
                <AuthForm
                    fields={authFields.register}
                    handleSubmit={(e) => {
                        e.preventDefault();
                    }}
                />
            </div>
        </div>
    );
};
export default RegisterForm;
