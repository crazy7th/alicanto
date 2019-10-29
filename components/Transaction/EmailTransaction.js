import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import PropTypes from "prop-types"
import { withStyles } from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'
import Input from '@material-ui/core/Input'

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing.unit,
    },
    cssLabel: {
      '&$cssFocused': {
        color: green[500],
      },
    },
    cssFocused: {},
    cssUnderline: {
      '&:after': {
        borderBottomColor: green[500],
      },
    }
  }
);


class Email extends React.Component{
render(){
const { classes } = this.props;
  return(
    <div className="section section-email">
        <Paper elevation={0} className="inputnum-base">
            <Grid container wrap="nowrap" spacing={16} alignItems="center">
                <Grid container>
                    <Grid item xs>
                    <p>Email</p>
                    <Input type="email" name="user.email" placeholder="jhon@gmail.com" fullWidth 
                    classes={{
                        underline: classes.cssUnderline,
                    }}
                    />
                    <p className="email-desc">Bukti dan riwayat transaksi akan dikirimkan ke email ini</p>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    </div>
  )
}
}

Email.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(Email);

