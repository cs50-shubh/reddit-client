import { combineReducers } from 'redux';
import forSale from './transactions/transaction.reducer'


const reducers = combineReducers({
    forSale
});

export default reducers;
