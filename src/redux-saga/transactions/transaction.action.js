export const FETCH_CAMPAIGNS = "FETCH_CAMPAIGNS";
export const FETCH_CAMPAIGNS_SUCCESS = "FETCH_CAMPAIGNS_SUCCESS";
export const FETCH_CAMPAIGNS_ERROR = "FETCH_CAMPAIGNS_ERROR";

export const ADD_CAMPAIGN = "ADD_CAMPAIGN";
export const ADD_CAMPAIGN_SUCCESS = "ADD_CAMPAIGN_SUCCESS";
export const ADD_CAMPAIGN_ERROR = "ADD_CAMPAIGN_ERROR";

export const EDIT_CAMPAIGN = "EDIT_CAMPAIGN";
export const EDIT_CAMPAIGN_SUCCESS = "EDIT_CAMPAIGN_SUCCESS";
export const EDIT_CAMPAIGN_ERROR = "EDIT_CAMPAIGN_ERROR";

export const DELETE_CAMPAIGN = "DELETE_CAMPAIGN";
export const DELETE_CAMPAIGN_SUCCESS = "DELETE_CAMPAIGN_SUCCESS";
export const DELETE_CAMPAIGN_ERROR = "DELETE_CAMPAIGN_ERROR";


export const fetchCampaigns = () => ({
    type: FETCH_CAMPAIGNS,
    payload: {}
});
export const fetchCampaignsSuccess = (item) => ({
    type: FETCH_CAMPAIGNS_SUCCESS,
    payload: { item }
});
export const fetchCampaignsError = (message) => ({
    type: FETCH_CAMPAIGNS_ERROR,
    payload: { message }
});


export const addCampaign = (item) => ({
    type: ADD_CAMPAIGN,
    payload: { item }
});
export const addCampaignSuccess = (item) => ({
    type: ADD_CAMPAIGN_SUCCESS,
    payload: { item }
});
export const addCampaignError = (message) => ({
    type: ADD_CAMPAIGN_ERROR,
    payload: { message }
});


export const editCampaign = (item) => ({
    type: EDIT_CAMPAIGN,
    payload: { item }
});
export const editCampaignSuccess = (item) => ({
    type: EDIT_CAMPAIGN_SUCCESS,
    payload: { item }
});
export const editCampaignError = (message) => ({
    type: EDIT_CAMPAIGN_ERROR,
    payload: { message }
});


export const deleteCampaign = (item) => ({
    type: DELETE_CAMPAIGN,
    payload: { item }
});
export const deleteCampaignSuccess = (item) => ({
    type: DELETE_CAMPAIGN_SUCCESS,
    payload: { item }
});
export const deleteCampaignError = (message) => ({
    type: DELETE_CAMPAIGN_ERROR,
    payload: { message }
});