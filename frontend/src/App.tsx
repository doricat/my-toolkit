import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { ToolsRoutes } from './Routes';
import { ScrollToTop } from './widgets/ScrollToTop';

export const App: React.FC = () => {
    return (
        <ScrollToTop>
            <CssBaseline />
            <ToolsRoutes />
        </ScrollToTop>
    );
};
