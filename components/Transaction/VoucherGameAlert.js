import React, { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showFirst: true
    };
  }

  render() {
    const { showFirst } = this.state;

    return (
      <div>
        {showFirst && (
          <div className="section section-plnwarning">
            <p>
              Harga sudah termasuk PPN 10%. Selanjutnya akan ditambahkan dengan Admin Fee sejumlah Rp 3.000
            </p>
            <img
              src="/static/transaction/icon-close-red.svg"
              onClick={() => this.setState({ showFirst: false })}
            />
          </div>
        )}
      </div>
    );
  }
}
