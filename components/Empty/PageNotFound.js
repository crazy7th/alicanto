import React from "react";
import Lottie from "react-lottie";
import Button from "@material-ui/core/Button";
import animationData from "../../static/animation/notFound.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

class Loading extends React.Component {
  render() {
    return (
      <div className="section section-empty">
        <div className="empty__animation">
          <Lottie options={defaultOptions} />
          <p className="empty__title-trans mt10">
            Ups, salah spot mancing nih..
          </p>
          <p className="empty__desc">
            Sepertinya yang kamu cari nggak ada di sini. Tapi tenang, coba cari
            di home dulu yuk.
          </p>
          <Button
            variant="contained"
            elevation={0}
            fullWidth
            size="large"
            className="success-button"
          >
            Kembali ke home
          </Button>
        </div>
      </div>
    );
  }
}

export default Loading;
