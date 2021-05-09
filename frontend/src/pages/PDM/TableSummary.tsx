import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    title: {
        fontSize: 14
    }
});

interface Props {
    summary: {
        name: string | null;
        code: string | null;
        comment: string | null;
    };
}

export const TableSummary: React.FC<Props> = (props: Props) => {
    const classes = useStyles();

    return (
        <Card>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {props.summary.code}
                </Typography>
                <Typography variant="h5" component="h3">
                    {props.summary.name}
                </Typography>
                <Typography variant="body2" component="p">
                    {props.summary.comment}
                </Typography>
            </CardContent>
        </Card>
    );
};
