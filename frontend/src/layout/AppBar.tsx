import React from 'react';
import { makeStyles, AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import GitHub from '@material-ui/icons/GitHub';
import Settings from '@material-ui/icons/Settings';
import { NavMenu } from './NavMenu';

const useStyles = makeStyles(() => ({
    toolbar: {
        paddingRight: 24
    },
    title: {
        flexGrow: 1
    }
}));

export const AppBarComponent: React.FC = () => {
    const classes = useStyles();

    return (
        <AppBar position="relative">
            <Toolbar className={classes.toolbar}>
                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                    My-Toolkit
                </Typography>
                <NavMenu />
                <IconButton color="inherit">
                    <Settings />
                </IconButton>
                <IconButton color="inherit" href="https://github.com/doricat/my-toolkit">
                    <GitHub />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};
