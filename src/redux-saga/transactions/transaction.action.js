export const PURCHASE_PRODUCT = "PURCHASE_PRODUCT";
export const PURCHASE_PRODUCT_SUCCESS = "PURCHASE_PRODUCT_SUCCESS";
export const PURCHASE_PRODUCT_ERROR = "PURCHASE_PRODUCT_ERROR";

export const BUY_CREDIT = "BUY_CREDIT";
export const BUY_CREDIT_SUCCESS = "BUY_CREDIT_SUCCESS";
export const BUY_CREDIT_ERROR = "BUY_CREDIT_ERROR";

export const PRODUCTS_FOR_SALE = "PRODUCTS_FOR_SALE";
export const PRODUCTS_FOR_SALE_SUCCESS = "PRODUCTS_FOR_SALE_SUCCESS";
export const PRODUCTS_FOR_SALE_ERROR = "PRODUCTS_FOR_SALE_ERROR";

export const USER_BALANCE_HISTORY = "USER_BALANCE_HISTORY";
export const USER_BALANCE_HISTORY_SUCCESS = "USER_BALANCE_HISTORY_SUCCESS";
export const USER_BALANCE_HISTORY_ERROR = "USER_BALANCE_HISTORY_ERROR";


export const purchaseProduct = (product, history) => ({
    type: PURCHASE_PRODUCT,
    payload: { product, history }
});
export const purchaseProductSuccess = (product) => ({
    type: PURCHASE_PRODUCT_SUCCESS,
    payload: { product }
});
export const purchaseProductError = (message) => ({
    type: PURCHASE_PRODUCT_ERROR,
    payload: { message }
});



export const buyCredit = (credit) => ({
    type: BUY_CREDIT,
    payload: { credit }
});
export const buyCreditSuccess = (credit) => ({
    type: BUY_CREDIT_SUCCESS,
    payload: { credit }
});
export const buyCreditError = (message) => ({
    type: BUY_CREDIT_ERROR,
    payload: { message }
});



export const productForSale = () => ({
    type: PRODUCTS_FOR_SALE,
    payload: {}
});
export const productForSaleSuccess = products => ({
    type: PRODUCTS_FOR_SALE_SUCCESS,
    payload: { products }
});
export const productForSaleError = message => ({
    type: PRODUCTS_FOR_SALE_ERROR,
    payload: { message }
});


export const userBalanceHistory = () => ({
    type: USER_BALANCE_HISTORY,
    payload: {}
});
export const userBalanceHistorySuccess = history => ({
    type: USER_BALANCE_HISTORY_SUCCESS,
    payload: { history }
});
export const userBalanceHistoryError = message => ({
    type: USER_BALANCE_HISTORY_ERROR,
    payload: { message }
});