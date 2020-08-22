import {
    FETCH_CAMPAIGNS,
    FETCH_CAMPAIGNS_SUCCESS,
    FETCH_CAMPAIGNS_ERROR,
    ADD_CAMPAIGN,
    ADD_CAMPAIGN_SUCCESS,
    ADD_CAMPAIGN_ERROR,
    EDIT_CAMPAIGN,
    EDIT_CAMPAIGN_ERROR,
    EDIT_CAMPAIGN_SUCCESS,
    DELETE_CAMPAIGN,
    DELETE_CAMPAIGN_SUCCESS,
    DELETE_CAMPAIGN_ERROR
} from './transaction.action';

const INIT_STATE = {
    campaignList: [],
    campaign: [],
    loading: false,
    error: '',
    message: ''
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case FETCH_CAMPAIGNS:
            return { ...state, loading: true, error: '' };
        case FETCH_CAMPAIGNS_SUCCESS:
            return { ...state, loading: false, error: '', campaignList: action.payload.item };
        case FETCH_CAMPAIGNS_ERROR:
            return { ...state, loading: false, error: action.payload.message };
        case ADD_CAMPAIGN:
            return { ...state, loading: true, error: '' };
        case ADD_CAMPAIGN_SUCCESS:
            return { ...state, loading: false, error: '' };
        case ADD_CAMPAIGN_ERROR:
            return { ...state, loading: false, error: action.payload.message };
        case EDIT_CAMPAIGN:
            return { ...state, loading: true, error: "" };
        case EDIT_CAMPAIGN_SUCCESS:
            return { ...state, loading: false, error: "" };
        case EDIT_CAMPAIGN_ERROR:
            return { ...state, loading: false, error: action.payload.message };
        case DELETE_CAMPAIGN:
            return { ...state, loading: true, error: "" };
        case DELETE_CAMPAIGN_SUCCESS:
            return { ...state, loading: false, error: "" };
        case DELETE_CAMPAIGN_ERROR:
            return { ...state, loading: false, error: action.payload.message };
        default: return { ...state };

    }
}
