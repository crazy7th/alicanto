import React from "react";
import Lottie from "react-lottie";
import Button from "@material-ui/core/Button";
import animationData from "../../static/animation/empty-riwayat.json";

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
          <p className="empty__title-trans">Belum ada riwayat</p>
          <p className="empty__desc">
            Sayangnya, kamu belum pernah beli apa-apa <br /> di Sepulsa :(
          </p>
          <Button
            variant="contained"
            elevation={0}
            fullWidth
            size="large"
            className="success-button"
          >
            Transaksi Sekarang
          </Button>
        </div>
      </div>
    );
  }
}

export default Loading;
