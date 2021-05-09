import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { PDMTools } from './pages/PDM/PDMTools';

export const ToolsRoutes: React.FC = () => {
    return (
        <Switch>
            <Route path="/pdm-tools" component={PDMTools} />
            <Redirect to="/pdm-tools" />
        </Switch>
    );
};
