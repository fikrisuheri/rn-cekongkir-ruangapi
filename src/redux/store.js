import {createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import {createLogger} from 'redux-logger';

import reducer from './reducer'

const logger = createLogger({});

const store = createStore(
    reducer,
    applyMiddleware(logger,promiseMiddleware)
)

export default store