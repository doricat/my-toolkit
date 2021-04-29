import React from 'react';
import { makeStyles, AppBar, Container, Toolbar, Button } from '@material-ui/core';
import { AppBarComponent } from '../../layout/AppBar';

const useStyles = makeStyles((theme) => ({
    secondAppBar: {
        backgroundColor: 'hsla(0, 0%, 100%, .95)'
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
    button: {
        textTransform: 'none'
    }
}));

interface Props {
    children: React.ReactChild;
}

export const PDMBasePage: React.FC<Props> = (props: Props) => {
    const classes = useStyles();

    return (
        <>
            <AppBarComponent />

            <AppBar position="sticky" className={classes.secondAppBar}>
                <Toolbar variant="dense">
                    <Button variant="outlined" className={classes.button}>Choice file</Button>
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
