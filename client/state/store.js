import { applyMiddleware, createStore } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
// compose with dev tools
import reducers from './reducers/index.js'; 
import thunk from 'redux-thunk';
const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk))
    ); 

export default store;