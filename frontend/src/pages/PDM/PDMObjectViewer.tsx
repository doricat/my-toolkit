import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { TreeNode } from '../../types/tree';
import { NormalListItem } from './NormalListItem';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            backgroundColor: theme.palette.background.paper
        }
    })
);

interface Props {
    nodes: TreeNode[];
    selected?: string;
    onNavigate: (id: string) => void;
}

export const PDMObjectViewer: React.FC<Props> = (props: Props) => {
    const classes = useStyles();

    return (
        <List component="nav" aria-labelledby="nested-list-subheader" className={classes.root}>
            <NormalListItem nodes={props.nodes} level={0} onNavigate={props.onNavigate} selected={props.selected} />
        </List>
    );
};
