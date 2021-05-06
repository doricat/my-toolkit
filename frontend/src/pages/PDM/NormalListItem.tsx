import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import { TreeNode } from '../../types/tree';
import { CollapsedListItem } from './CollapsedListItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    selected: {
        fontWeight: 600,
        color: '#1976d2'
    }
});

interface Props {
    nodes: TreeNode[];
    level: number;
    selected?: string;
    onNavigate: (id: string) => void;
}

export const NormalListItem: React.FC<Props> = (props: Props) => {
    const classes = useStyles();

    const handleClick = (id: string) => {
        props.onNavigate(id);
    };

    return (
        <>
            {props.nodes.map(x => {
                if (x.children) {
                    return <CollapsedListItem node={x} key={x.id} level={props.level} onNavigate={props.onNavigate} selected={props.selected} />
                }

                return (
                    <ListItem button onClick={() => handleClick(x.id)} key={x.id}>
                        <ListItemText primary={x.name} className={props.selected === x.id ? classes.selected : undefined}
                            style={{ paddingLeft: (props.level * 32).toString() + 'px' }} />
                    </ListItem>
                );
            })}
        </>
    );
};
