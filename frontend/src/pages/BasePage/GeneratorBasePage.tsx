import React from 'react';
import { makeStyles, Container } from '@material-ui/core';
import { AppBarComponent } from '../../layout/AppBar';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    }
}));

interface Props {
    children: React.ReactChild;
}

export const GeneratorBasePage: React.FC<Props> = (props: Props) => {
    const classes = useStyles();

    return (
        <>
            <AppBarComponent />

            <main>
                <Container maxWidth={false} className={classes.container}>
                    {props.children}
                </Container>
            </main>
        </>
    );
};
