import React, { useContext, useEffect } from 'react';
import { makeStyles, AppBar, Toolbar, Button, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import { MyContext } from '../configureStore';

const useStyles = makeStyles((theme) => ({
    secondAppBar: {
        backgroundColor: 'hsla(0, 0%, 100%, .95)'
    },
    button: {
        textTransform: 'none',
        marginRight: theme.spacing(2)
    },
    input: {
        display: 'none'
    },
    fileName: {
        color: '#000'
    }
}));

export const PDMSecondAppBar: React.FC = observer(() => {
    const context = useContext(MyContext);
    const classes = useStyles();

    useEffect(() => {
        return () => {
            context.PDM.clean();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const choiceFile = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const files = evt.target.files;
        if (files != null && files.length > 0) {
            context.PDM.file = files[0]
            evt.target.value = '';
        }
    };

    return (
        <AppBar position="sticky" className={classes.secondAppBar}>
            <Toolbar variant="dense">
                <input type="file" accept=".pdm" className={classes.input} id="outlined-button-file" onChange={x => choiceFile(x)} />
                <label htmlFor="outlined-button-file">
                    <Button variant="outlined" className={classes.button} component="span">
                        Choice file
                    </Button>
                </label>
                <Typography variant="h6" className={classes.fileName}>
                    {context.PDM.file?.name}
                </Typography>
            </Toolbar>
        </AppBar>
    );
});
