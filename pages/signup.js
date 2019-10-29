import Layout from "../components/Layouts/Layout";
import Form2 from "../components/Form/SignUpForm";
import "../static/css/style.sass";
import { inject, observer } from "mobx-react";
import { Formik, Field, Form, ErrorMessage, withFormik } from "formik";
import * as Status from "http-status-codes";
import Router from "next/router";

const SignUpForm = withFormik({
  initialValues: {
    user: {
      full_name: "",
      email: "",
      password: ""
    },
    phone: ""
  },
  mapPropsToValues: () => ({
    user: {
      full_name: "",
      email: "",
      password: ""
    },
    phone: ""
  }),
  handleSubmit: async (values, { props, setSubmitting }) => {
    const { authenticate2 } = props.userStore;
    const status = await authenticate2(values);
    switch (status) {
      case Status.CREATED:
        // alert("User sukses");
        localStorage.setItem("identity", JSON.stringify(values));
        Router.push("/verification");
        break;
      case Status.BAD_REQUEST:
        alert(
          "Tunggu dulu, Kamu belum memasukkan alamat e-mail atau nomor handphone."
        );
        break;
      case Status.UNAUTHORIZED:
        alert(
          "Oow, Alamat e-mail / nomor handphone dan password yang kamu masukkan salah. Coba ingat-ingat lagi yah."
        );
        break;
      default:
        // console.log(values);
        break;
    }
    setSubmitting(false);
  }
})(Form2);

const SignUp = props => {
  return <Layout content={<SignUpForm {...props} />} bottomNav="profile" />;
};

export default inject("userStore")(SignUp);
