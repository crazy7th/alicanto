import Layout from "../components/Layouts/Layout";
import "../static/css/style.sass";
import Link from "next/link";
import Button from "@material-ui/core/Button";

const PasswordSuccess = () => (
  <Layout
    content={
      <div className="section-signin section-forgot">
        <div className="signup-background" />
        <div className="forgot-top" align="center">
          <img src="/static/login/icon-lock2.svg" />
          <h2> Berhasil buat password baru! </h2>
          <p>
            {" "}
            Diingat-ingat ya password barunya. Sekarang kamu sudah bisa lanjut
            transaksi lagi :)
          </p>
        </div>
        <div className="signup-form forgot-form">
          <div className="signup-button">
            <Link prefetch href="/signin">
              <Button variant="contained" type="submit">
                Masuk
              </Button>
            </Link>
          </div>
        </div>
      </div>
    }
    bottomNav="profile"
  />
);

export default PasswordSuccess;
