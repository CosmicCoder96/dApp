import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import web3Reducer from '../util/web3/web3Reducer';
import marketReducer from '../util/marketjs/marketReducer';
import deploy from './deploy';
import explorer from './explorer';
import find from './find';
import simExchange from './simExchange';
import testQuery from './testQuery';

export default combineReducers({
  route: routerReducer,
  web3: web3Reducer,
  marketjs: marketReducer,
  find: find,
  deploy: deploy,
  explorer: explorer,
  simExchange: simExchange,
  testQuery: testQuery
});
