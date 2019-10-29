import React from "react";
import Lottie from "react-lottie";
import Button from "@material-ui/core/Button";
import animationData from "../../static/animation/empty-favorit.json";

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
          <p className="empty__title">Sepi banget di sini..</p>
          <p className="empty__desc">
            Kalau kamu punya, nanti beli pulsanya lebih <br /> gampang lho!
          </p>
          <Button
            variant="contained"
            elevation={0}
            fullWidth
            size="large"
            className="success-button"
          >
            Buat Transaksi Favorit
          </Button>
        </div>
      </div>
    );
  }
}

export default Loading;
