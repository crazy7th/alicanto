import Layout from "../components/Layouts/Layout";
import Form from "../components/Form/SignIn";
import "../static/css/style.sass";
import { inject } from "mobx-react";
import { withFormik } from "formik";
import * as Status from "http-status-codes";
import Router from "next/router";

// Formik form
const SignInForm = withFormik({
  initialValues: {
    email: "",
    password: ""
  },

  mapPropsToValues: () => ({
    email: "",
    password: ""
  }),

  handleSubmit: async (values, { props, setSubmitting }) => {
    const { authenticate, token } = props.userStore;
    const status = await authenticate(values);
    switch (status) {
      case Status.OK:
        Router.push("/indexlogin");
        break;
      case Status.BAD_REQUEST:
        alert("Eits, kamu belum memasukkan alamat e-mail/ nomor handphone. ");
        break;
      case Status.UNAUTHORIZED:
        alert(
          "Coba ingat-ingat lagi alamat e-mail/ nomor handphone dan password kamu. Masih ada yang salah nih."
        );
        break;
      default:
        break;
    }
    setSubmitting(false);
  }
})(Form);

const SignIn = props => {
  return <Layout content={<SignInForm {...props} />} bottomNav="profile" />;
};

export default inject("userStore")(SignIn);
