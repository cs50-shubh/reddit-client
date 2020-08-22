import { all, spawn, call, put } from "redux-saga/effects";
import forSale from './transactions/transaction.saga'
import { actions as toastr } from 'react-redux-toastr'

//https://redux-saga.js.org/docs/advanced/RootSaga.html
// Keep Everything Alive , Automatically restart sagas after crash
export default function* rootSaga(getState) {
    const sagas = [
        forSale
    ];

    yield all(
        sagas.map(saga =>
            spawn(function* () {
                while (true) {
                    try {
                        yield call(saga);
                        break;
                    } catch (e) {
                        console.error(e);
                        yield put(toastr.add({
                            type: 'error',
                            message: e.message
                        }));
                    }
                }
            })
        )
    );
}
