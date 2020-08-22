import {
    all,
    call,
    fork,
    put,
    takeLatest
} from "redux-saga/effects";
import {
    USER_BALANCE_HISTORY,
    PRODUCTS_FOR_SALE,
    PURCHASE_PRODUCT,
    BUY_CREDIT
} from "./transaction.action";

import {
    productForSaleError,
    productForSaleSuccess,
    purchaseProductSuccess,
    purchaseProductError,
    userBalanceHistorySuccess,
    userBalanceHistoryError,
    buyCreditSuccess,
    buyCreditError
} from "./transaction.action";
import Api from "../../constants/Api";
import { ACCESS_TOKEN, USER_DATA } from "../../constants/storage";


export function* watchPurchaseProduct() {
    yield takeLatest(PURCHASE_PRODUCT, purchaseNewProduct);
}

const purchaseNewProductAsync = async (data) =>
    await Api.post("/purchaseProduct", data).then(
        response => response.data
    );

function* purchaseNewProduct({ payload: { product } }) {
    try {
        const { message, data } = yield call(purchaseNewProductAsync, product);
        if (data) {
            yield put(purchaseProductSuccess(data));
            // Router.push("/my/products");
            // yield put(toastr.add({ type: 'success', message }));
        } else {
            yield put(purchaseProductError(message));
            // yield put(toastr.add({ type: 'error', message }));
        }
    } catch (error) {
        const message = error.message
        yield put(
            purchaseProductError(
                message
            )
        );
        // yield put(toastr.add({ type: 'error', message }));
    }
}



export function* watchBuyCredit() {
    yield takeLatest(BUY_CREDIT, buyCreditBalance);
}

const buyCreditAsync = async (data) =>
    await Api.post("/requestBalance", data).then(
        response => response.data
    );

function* buyCreditBalance({ payload: { credit } }) {
    try {
        const { success, message, data } = yield call(buyCreditAsync, credit);
        if (success) {
            yield put(buyCreditSuccess(data));
            // Router.push("/my/balance");
            // yield put(toastr.add({ type: 'success', message }));
        } else {
            yield put(buyCreditError(message));
            // yield put(toastr.add({ type: 'error', message }));
        }
    } catch (error) {
        const message = error.message
        yield put(
            buyCreditError(
                message
            )
        );
        // yield put(toastr.add({ type: 'error', message }));
    }
}



export function* watchProductsForSale() {
    yield takeLatest(PRODUCTS_FOR_SALE, productForSaleList);
}

const productForSaleAsync = async () => {
    return await Api.get("/listProduct").then(
        response => response.data
    );
};

function* productForSaleList() {
    try {
        const data = yield call(productForSaleAsync);
        if (data) {
            yield put(productForSaleSuccess(data));
        } else {
            const message = "No Data Fetched"
            yield put(productForSaleError(message));
            // yield put(toastr.add({ type: 'error', message }));
        }
    } catch (error) {
        const message = error.message
        yield put(
            productForSaleError(
                message
            )
        );
        // yield put(toastr.add({ type: 'error', message }));
    }
}



export function* watchUserBalanceHistory() {
    yield takeLatest(USER_BALANCE_HISTORY, userBalanceHistoryList);
}

const userBalanceHistoryAsync = async () => {
    const userId = localStorage.getItem('user_data').split('"')[3]
    return await Api.get("/fetchBalance?userId=" + userId).then(
        response => response.data

    )
};

function* userBalanceHistoryList() {
    try {
        const data = yield call(userBalanceHistoryAsync);
        if (data) {
            yield put(userBalanceHistorySuccess(data));
        } else {
            const message = "No Data Fetched"
            yield put(userBalanceHistoryError(message));
            // yield put(toastr.add({ type: 'error', message }));
        }
    } catch (error) {
        const message = error.message
        yield put(
            userBalanceHistoryError(
                message
            )
        );
        // yield put(toastr.add({ type: 'error', message }));
    }
}


export default function* rootSaga() {
    yield all([
        fork(watchPurchaseProduct),
        fork(watchProductsForSale),
        fork(watchUserBalanceHistory),
        fork(watchBuyCredit)
    ]);
}
