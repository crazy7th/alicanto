import React from "react";

class StepperTrans extends React.Component {
  render() {
    return (
      <div className="section section-stepper">
        <div className="stepper-static">
          <ul>
            <li className="left active">
              <p>1</p> <span>Pilih Produk</span>
            </li>
            <li className="line" />
            <li className="mid text-active">
              <p>2</p> <span>Pembayaran</span>
            </li>
            <li className="line" />
            <li className="right">
              <p>3</p> <span>Selesai</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default StepperTrans;
