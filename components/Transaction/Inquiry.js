import React from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

class Inquiry extends React.Component {
  render() {
    return (
      <div className="section section-plntab">
        <div className="section plntab-content">
          <div className="section section-info">
            <Paper spacing={15} elevation={0} className="info-content">
              <div>
                <h2> Informasi Tagihan </h2>
                <Button
                  type="submit"
                  onClick={e => this.props.editCustomerId()}
                >
                  Edit
                </Button>
              </div>
              {this.props.listInquiry.map((data, index) => (
                <div key={index}>
                  <p>{data.field}</p>
                  <p>{data.value}</p>
                </div>
              ))}
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}

export default Inquiry;
