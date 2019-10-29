import React from "react";
import Lottie from "react-lottie";
import animationData from "../../static/animation/loading.json";

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
      <div className="section-loading">
        <div>
          <div className="success-animation">
            <Lottie options={defaultOptions} />
          </div>
        </div>
      </div>
    );
  }
}

export default Loading;
