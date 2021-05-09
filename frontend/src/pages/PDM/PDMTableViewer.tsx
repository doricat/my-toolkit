import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { MyTable } from '../../types/table';

const useStyles = makeStyles({
    table: {
        minWidth: 650
    },
    cellActive: {
        backgroundColor: 'darkgray'
    }
});

interface Props {
    headers: string[];
    table: MyTable;
}

export const PDMTableViewer: React.FC<Props> = (props: Props) => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        {props.headers.map(x => <TableCell key={x}>{x}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.table.cells.map((row, i) => (
                        <TableRow key={i.toString()}>
                            <TableCell component="th" scope="row">
                                {i + 1}
                            </TableCell>
                            {row.map((c, l) => (
                                <TableCell key={l.toString()} className={c.focused ? classes.cellActive : ''}>{c.content}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
