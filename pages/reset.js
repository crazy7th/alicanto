import Layout from "../components/Layouts/Layout";
import Form from "../components/Form/ResetPassword";
import "../static/css/style.sass";
import { inject } from "mobx-react";
import { withFormik } from "formik";
import * as Status from "http-status-codes";
import Router from "next/router";

const ResetPassword = withFormik({
  initialValues: {
    password: "",
    token: ""
  },
  mapPropsToValues: () => ({
    password: "",
    token: ""
  }),

  handleSubmit: async (values, { props, setSubmitting }) => {
    if (values.password !== values.confirmPassword) {
      alert("Passwords don't match");
    } else {
      const { ResetPassword, token } = props.userStore;
      const status = await ResetPassword(values);

      switch (status) {
        case Status.OK:
          alert("Proses Berhasil");
          Router.push("/reseted");
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
          break;
      }
    }

    setSubmitting(false);
  }
})(Form);

const Reset = props => {
  return <Layout content={<ResetPassword {...props} />} bottomNav="profile" />;
};

export default inject("userStore")(Reset);
