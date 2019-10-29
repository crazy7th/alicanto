import { withFormik } from "formik";
import { inject, observer } from "mobx-react";
import Router from "next/router";
import * as Status from "http-status-codes";
import Layout from "../components/Layouts/Layout";
import ForgotForm from "../components/Form/ForgotPassword";
import "../static/css/style.sass";

const ForgotPass = withFormik({
  initialValues: {
    email: ""
  },
  mapPropsToValues: () => ({
    email: ""
  }),
  handleSubmit: async (values, { props, setSubmitting }) => {
    const { ForgotPassword } = props.userStore;
    const status = await ForgotPassword(values);
    switch (status) {
      case Status.OK:
        alert(
          "Cek e-mail kamu ya, kita udah mengirimkan link untuk membuat password baru"
        );
        Router.push("/");
        break;
      case Status.BAD_REQUEST:
        alert(
          "Format alamat e-mail yang kamu masukkan salah. Jangan lupa pakai tanda @ ya"
        );
        break;
      case Status.UNAUTHORIZED:
        alert(
          "Alamat e-mail yang kamu masukkan tidak terdaftar. Coba ingat-ingat lagi ya"
        );
        break;
      default:
        break;
    }
    setSubmitting(false);
  }
})(ForgotForm);

const Forgot = props => {
  return <Layout content={<ForgotPass {...props} />} bottomNav="profile" />;
};

export default inject("userStore")(Forgot);
