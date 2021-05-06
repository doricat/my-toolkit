import React from 'react';
import { PDMStore } from './pdm';
import { RouterStore } from './router';

export type RootState = {
    router: RouterStore,
    PDM: PDMStore
};

export type StoreContext = React.Context<RootState>;
