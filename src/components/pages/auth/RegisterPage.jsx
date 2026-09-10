import { requestLogin } from "../../../services/authService";
import FormWrapper from "./FormWrapper";
import RegisterForm from "./RegisterForm";

const RegisterPage = () => {

    const registerAndLogInUser = async () => {
        try {
            let response = await requestLogin({ email, password });
            // if (response?.status === 200)
        } catch(error) {
            
        }
    }
  const subtitle = "New to Get Fluent Creole? Register here!";
    return (
        <div className="register-page">
            <h2>Join Get Fluent Creole</h2>
            <FormWrapper subtitle={subtitle}>
              <RegisterForm />
            </FormWrapper>
        </div>
    );
};

export default RegisterPage;