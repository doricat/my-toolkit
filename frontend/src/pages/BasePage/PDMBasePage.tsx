import React from 'react';
import { makeStyles, Container } from '@material-ui/core';
import { AppBarComponent } from '../../layout/AppBar';
import { PDMSecondAppBar } from '../../layout/PDMSecondAppBar';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
}));

interface Props {
    children: React.ReactChild;
}

export const PDMBasePage: React.FC<Props> = (props: Props) => {
    const classes = useStyles();

    return (
        <>
            <AppBarComponent />

            <PDMSecondAppBar />

            <main>
                <Container maxWidth={false} className={classes.container}>
                    {props.children}
                </Container>
            </main>
        </>
    );
};
