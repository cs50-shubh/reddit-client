import { combineReducers } from 'redux';
import campaigns from './transactions/transaction.reducer'


const reducers = combineReducers({
    campaigns
});

export default reducers;
