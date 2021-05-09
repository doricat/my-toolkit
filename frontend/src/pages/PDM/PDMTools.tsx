import React, { useContext, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { PDMObjectViewer } from './PDMObjectViewer';
import { PDMTableViewer } from './PDMTableViewer';
import { PDMBasePage } from '../BasePage/PDMBasePage';
import { observer } from 'mobx-react';
import { MyContext } from '../../configureStore';
import { toTable, toTableSummary, toTreeNodes } from '../../utils/convertor';
import { TableSummary } from './TableSummary';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        nav: {
            position: 'sticky',
            top: '64px',
            display: 'block!important',
            height: 'calc(100vh - 7rem)',
            overflowY: 'auto'
        },
        summary: {
            position: 'sticky',
            top: '64px',
            display: 'block!important'
        }
    })
);

export const PDMTools: React.FC = observer(() => {
    const context = useContext(MyContext);
    const classes = useStyles();

    useEffect(() => {
        if (context.PDM.file != null) {
            context.PDM.openFile();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context.PDM.file]);

    const onNavigate = (id: string) => {
        context.PDM.selectTable(id);
        if (window.pageYOffset >= 64) {
            window.scrollTo(0, 64);
        }
    };

    return (
        <PDMBasePage>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4} lg={2}>
                    {context.PDM.nodes.length > 0
                        ?
                        <div className={classes.nav}>
                            <PDMObjectViewer nodes={toTreeNodes(context.PDM.nodes)} onNavigate={onNavigate} selected={context.PDM.selectedTable?.id} />
                        </div>
                        : undefined}

                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                    {context.PDM.selectedTable != null
                        ? <PDMTableViewer headers={['Name', 'Code', 'Comment', 'DataType', 'Length', 'Precision', 'PrimaryKey', 'Mandatory']}
                            table={toTable(context.PDM.selectedTable)} />
                        : undefined}
                </Grid>
                <Grid item xs={12} md={2} lg={2}>
                    <div className={classes.summary}>
                        {context.PDM.selectedTable != null
                            ? <TableSummary summary={toTableSummary(context.PDM.selectedTable)} />
                            : undefined}
                    </div>
                </Grid>
            </Grid>
        </PDMBasePage>
    );
});
