import React, { Component } from "react";

class TelkomAlert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showFirst: true
    };
  }

  render() {
    const { showFirst } = this.state;
    return (
      <>
        {showFirst && (
          <div className="section section-plnwarning mt0">
            <ol>
              <li>
                <p>
                  Sepulsa Mate, Pembayaran Tagihan Telkom tidak dapat dilakukan
                  pada jam <span>23.00 - 00.30</span> WIB setiap harinya sesuai
                  dengan ketentuan dari Telkom.
                </p>
              </li>
              <li>
                <p>
                  Pembayaran Telkom meliputi produk Indihome dan Telepon rumah.
                </p>
              </li>
            </ol>

            <img
              src="/static/transaction/icon-close-red.svg"
              onClick={() => this.setState({ showFirst: false })}
            />
          </div>
        )}
      </>
    );
  }
}

export default TelkomAlert;
