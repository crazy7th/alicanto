import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import red from "@material-ui/core/colors/red";
import NumberFormat from 'react-number-format';
import Link from 'next/link';

const message = `Sepulsa Kredit`;
const unlogin = 'Saat ini anda dalam mode belum login, yuk login dulu!';
const bgred = {
    background: red[400]
}

function Credit() {
  return(
    <div className="section section-credit">
        <Paper elevation={0} className="credit-base">
            <Grid container wrap="nowrap" spacing={2} alignItems="center">
                <Grid item>
                    <img src="/static/homepage/wallet.svg" />
                </Grid>
                <Grid item xs>
                    <p className="kredit-top">{message}</p>
                    <NumberFormat disabled className="kredit-bot" value="2000000" thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp'} />
                </Grid>
                <Grid item>
                    <Button variant="contained" size="medium" color="primary" style={bgred} className='credit-button' >
                    Top Up
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    </div>
  )
}

export default Credit