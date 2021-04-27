import React from 'react';
import { RouterStore } from './router';

export type RootState = {
    router: RouterStore
};

export type StoreContext = React.Context<RootState>;
