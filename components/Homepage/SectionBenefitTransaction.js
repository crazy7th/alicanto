import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

function index() {
  return (
    <div className="section section-pros">
      <h2> Kelebihan Bertransaksi di Sepulsa </h2>
      <Paper elevation={0} className="pros-base">
        <Grid container wrap="nowrap" spacing={3} align="center">
          <Grid item xs={4} align="center" className="bordered">
            <img src="/static/homepage/pros1.svg" />
          </Grid>

          <Grid item xs={4} className="bordered">
            <img src="/static/homepage/pros2.svg" />
          </Grid>

          <Grid item xs={4} xs>
            <img src="/static/homepage/pros3.svg" />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default index;
