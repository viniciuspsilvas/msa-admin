import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },


 
});

function DateAndTimePickers(props) {
  const { classes } = props;

  return (
      <TextField
      { ... props  }
        type="datetime-local"
        style={{border: '1px solid #ced4da', borderRadius: '.25rem', padding:'.375rem .75rem'}} 
        className={classes.container}
        InputLabelProps={{
          shrink: true,
        }}
      />
  );
}

DateAndTimePickers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DateAndTimePickers);