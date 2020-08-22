import {
    PRODUCTS_FOR_SALE,
    PRODUCTS_FOR_SALE_SUCCESS,
    PRODUCTS_FOR_SALE_ERROR,
    PURCHASE_PRODUCT,
    PURCHASE_PRODUCT_SUCCESS,
    PURCHASE_PRODUCT_ERROR,
    USER_BALANCE_HISTORY,
    USER_BALANCE_HISTORY_ERROR,
    USER_BALANCE_HISTORY_SUCCESS,
    BUY_CREDIT,
    BUY_CREDIT_SUCCESS,
    BUY_CREDIT_ERROR
} from './transaction.action';

const INIT_STATE = {
    user:
    {
        id: null,
        email: '',
        name: '',
        role: '',
        designation: '',
        profilePicture: ''
    },
    productList: [],
    history: [],
    loading: false,
    error: '',
    message: ''
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case PURCHASE_PRODUCT:
            return { ...state, loading: true, error: '' };
        case PURCHASE_PRODUCT_SUCCESS:
            return { ...state, loading: false, error: '' };
        case PURCHASE_PRODUCT_ERROR:
            return { ...state, loading: false, error: action.payload.message };
        case BUY_CREDIT:
            return { ...state, loading: true, error: '' };
        case BUY_CREDIT_SUCCESS:
            return { ...state, loading: false, error: '' };
        case BUY_CREDIT_ERROR:
            return { ...state, loading: false, error: action.payload.message };
        case PRODUCTS_FOR_SALE:
            return { ...state, loading: true, error: "" };
        case PRODUCTS_FOR_SALE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
                productList: action.payload.products
            };
        case PRODUCTS_FOR_SALE_ERROR:
            return { ...state, loading: false, error: action.payload.message };
        case USER_BALANCE_HISTORY:
            return { ...state, loading: true, error: "" };
        case USER_BALANCE_HISTORY_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
                history: action.payload.history
            };
        case USER_BALANCE_HISTORY_ERROR:
            return { ...state, loading: false, error: action.payload.message };
        default: return { ...state };

    }
}
