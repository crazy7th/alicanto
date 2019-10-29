import Layout from "../components/Layouts/Layout";
import SignInForm from "../components/Form/VerivicationForm";
import "../static/css/style.sass";

const SignIn = () => <Layout content={<SignInForm />} bottomNav="profile" />;

export default SignIn;
