import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import rootReducer from "../reducers";
import rootSaga from "../sagas";

const logger = createLogger();
const saga = createSagaMiddleware();
const middleware = [logger, saga];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(rootReducer, undefined, enhancer);

saga.run(rootSaga);

export default store;
