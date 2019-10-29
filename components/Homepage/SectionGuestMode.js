import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import red from "@material-ui/core/colors/red";
import NumberFormat from "react-number-format";
import Link from "next/link";

const message = `Sepulsa Kredit`;
const unlogin = "Saat ini kamu masih Guest lho, masuk ke akun kamu yuk";
const bgred = {
  background: "#FF5959"
};

function Credit() {
  return (
    <div className="section section-credit">
      <Paper elevation={0} className="credit-base">
        <Grid container wrap="nowrap" spacing={2} alignItems="center">
          <Grid item>
            <img src="/static/homepage/icon-credit.svg" />
          </Grid>
          <Grid item xs>
            <p className="kredit-top">{unlogin}</p>
          </Grid>
          <Grid item>
            <Link href="signin">
              <Button
                variant="contained"
                size="medium"
                color="primary"
                className="credit-button"
                style={bgred}
              >
                Masuk
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default Credit;
