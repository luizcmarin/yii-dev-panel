import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {
    middlewares as ToolbarApiMiddlewares,
    reducers as ToolbarApiReducers,
} from '@yiisoft/yii-dev-toolbar/Module/Toolbar/api';
import {middlewares as DebugMiddlewares, reducers as DebugReducers} from '@yiisoft/yii-dev-panel-sdk/API/Debug/api';
import {
    middlewares as ApplicationMiddlewares,
    reducers as ApplicationReducers,
} from '@yiisoft/yii-dev-panel-sdk/API/Application/api';
import {FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist';
import {TypedUseSelectorHook, useSelector} from 'react-redux';

// TODO: get reducers and middlewares from modules.ts
const rootReducer = combineReducers({
    ...ToolbarApiReducers,
    ...DebugReducers,
    ...ApplicationReducers,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat([...ToolbarApiMiddlewares, ...DebugMiddlewares, ...ApplicationMiddlewares]),
    devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export {useAppSelector as useSelector};
