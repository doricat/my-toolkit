import React from 'react';
import { makeStyles, CssBaseline, AppBar, Toolbar, Typography, IconButton, Container } from '@material-ui/core';
import GitHub from '@material-ui/icons/GitHub';
import Settings from '@material-ui/icons/Settings';
import { NavMenu } from './NavMenu';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        paddingRight: 24 // keep right padding when drawer closed
    },
    title: {
        flexGrow: 1
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    }
}));

export const Layout = (props: { children: React.ReactChild; }) => {
    const classes = useStyles();

    return (
        <>
            <CssBaseline />
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

            <main>
                <Container maxWidth={false} className={classes.container}>
                    {props.children}
                </Container>
            </main>
        </>
    );
};
