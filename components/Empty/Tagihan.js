import React from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

class Loading extends React.Component {
  render() {
    return (
      <div className="section section-empty2">
        <Paper spacing={15} elevation={0} className="empty__base">
          <img
            className="empty__image"
            src="/static/transaction/empty-tagihan.svg"
          />
          <p className="empty__title-trans">Horee, tagihanmu sudah lunas!</p>
          <p className="empty__desc">
            Kamu bisa lega karena sudah bebas dari tagihan ini. Coba bayar
            tagihan yang lain ya.
          </p>
        </Paper>
        <Button
          variant="contained"
          elevation={0}
          fullWidth
          size="large"
          className="success-button mt20"
        >
          Bayar yang lain
        </Button>
      </div>
    );
  }
}

export default Loading;
