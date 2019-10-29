import React from "react";
import Lottie from "react-lottie";
import Button from "@material-ui/core/Button";
import animationData from "../../static/animation/maintenance.json";

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
          <p className="empty__title-trans mt20">
            Website juga butuh skincare..
          </p>
          <p className="empty__desc">
            Sabar ya, Sepulsa lagi perawatan nih, biar makin kece dan up-to-date
            buat kamu. Tungguin yaaa
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
