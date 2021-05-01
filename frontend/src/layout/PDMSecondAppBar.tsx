import React from 'react';
import { makeStyles, AppBar, Toolbar, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    secondAppBar: {
        backgroundColor: 'hsla(0, 0%, 100%, .95)'
    },
    button: {
        textTransform: 'none'
    },
    input: {
        display: 'none',
    },
}));

export const PDMSecondAppBar: React.FC = () => {
    const classes = useStyles();

    return (
        <AppBar position="sticky" className={classes.secondAppBar}>
            <Toolbar variant="dense">
                <input type="file" accept=".pdm" className={classes.input} id="outlined-button-file" />
                <label htmlFor="outlined-button-file">
                    <Button variant="outlined" className={classes.button} component="span">
                        Choice file
                    </Button>
                </label>
            </Toolbar>
        </AppBar>
    );
}