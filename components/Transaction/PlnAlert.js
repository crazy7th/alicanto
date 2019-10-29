import React, { Component } from "react";
import { render } from "react-dom";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showFirst: true
    };
  }

  render() {
    const { showFirst } = this.state;
    const HTML = this.props.content;

    return (
      <div>
        {showFirst && (
          <div className="section section-plnwarning mt0">
            <p dangerouslySetInnerHTML={{ __html: HTML }} />
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
