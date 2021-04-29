import React from 'react';
import { makeStyles, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    link: {
        margin: theme.spacing(1, 1.5),
        color: '#fff',
        textTransform: 'none'
    }
}));

export const NavMenu: React.FC = () => {
    const classes = useStyles();

    return (
        <nav>
            <Link variant="button" color="textPrimary" className={classes.link} component={RouterLink} to="/pdm-tools">
                PDM-Tools
            </Link>
            <Link variant="button" color="textPrimary" className={classes.link} component={RouterLink} to="/generator">
                Generator
            </Link>
        </nav>
    );
};
