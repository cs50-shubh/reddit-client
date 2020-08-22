import {
    all,
    call,
    fork,
    put,
    takeLatest
} from "redux-saga/effects";
import {
    FETCH_CAMPAIGNS,
    ADD_CAMPAIGN,
    EDIT_CAMPAIGN,
    DELETE_CAMPAIGN
} from "./transaction.action";

import {
    fetchCampaigns,
    fetchCampaignsSuccess,
    fetchCampaignsError,
    addCampaignSuccess,
    addCampaignError,
    editCampaignSuccess,
    editCampaignError,
    deleteCampaignSuccess,
    deleteCampaignError
} from "./transaction.action";
import Api from "../../constants/Api";


export function* watchFetchCampaigns() {
    yield takeLatest(FETCH_CAMPAIGNS, fetchAllCampaigns);
}

const fetchAllCampaignsAsync = async () =>
    await Api.get("/all").then(
        response => response.data
    );

function* fetchAllCampaigns() {
    try {
        const data = yield call(fetchAllCampaignsAsync);
        if (data) {
            yield put(fetchCampaignsSuccess(data));
        } else {
            const message = "No Data Fetched"
            yield put(fetchCampaignsError(message));
            // yield put(toastr.add({ type: 'error', message }));
        }
    } catch (error) {
        const message = error.message
        yield put(
            fetchCampaignsError(
                message
            )
        );
        // yield put(toastr.add({ type: 'error', message }));
    }

}

export function* watchAddCampaign() {
    yield takeLatest(ADD_CAMPAIGN, addNewCampaign);
}

const addNewCampaignAsync = async (data) =>
    await Api.post("/create", data).then(
        response => response.data
    );

function* addNewCampaign({ payload: { item } }) {
    try {
        const data = yield call(addNewCampaignAsync, item);
        if (data) {
            yield call(fetchAllCampaigns)
            yield put(addCampaignSuccess(data));
            // yield put(toastr.add({ type: 'success', message }));
        } else {
            yield put(addCampaignError("Error: Failed"));
            // yield put(toastr.add({ type: 'error', message }));
        }
    } catch (error) {
        const message = error.message
        yield put(
            addCampaignError(
                message
            )
        );
        // yield put(toastr.add({ type: 'error', message }));
    }
}


export function* watchEditCampaign() {
    yield takeLatest(EDIT_CAMPAIGN, editCampaign);
}

const editCampaignAsync = async (data) => {
    const id = data.id
    delete data.id
    const res = await Api.put("/update/" + id, data).then(
        response => response.data
    );
    return res;
}

function* editCampaign({ payload: { item } }) {
    try {
        const data = yield call(editCampaignAsync, item);
        console.log(data)
        if (data) {
            yield call(fetchAllCampaigns)
            yield put(editCampaignSuccess(data));
            // yield put(toastr.Edit({ type: 'success', message }));
        } else {
            yield put(editCampaignError("Error: Failed"));
            // yield put(toastr.Edit({ type: 'error', message }));
        }
    } catch (error) {
        const message = error.message
        yield put(
            editCampaignError(
                message
            )
        );
        // yield put(toastr.add({ type: 'error', message }));
    }
}



export function* watchDeleteCampaign() {
    yield takeLatest(DELETE_CAMPAIGN, deleteCampaign);
}

const deleteCampaignAsync = async (data) => {
    return await Api.delete("/delete/" + data).then(
        response => response.data

    )
};

function* deleteCampaign({ payload: { item } }) {
    try {
        const data = yield call(deleteCampaignAsync, item);
        if (data) {
            yield call(fetchAllCampaigns)
            yield put(deleteCampaignSuccess(data));
        } else {
            const message = "Error: Campaign not deleted"
            yield put(deleteCampaignError(message));
            // yield put(toastr.add({ type: 'error', message }));
        }
    } catch (error) {
        const message = error.message
        yield put(
            deleteCampaignError(
                message
            )
        );
        // yield put(toastr.add({ type: 'error', message }));
    }
}


export default function* rootSaga() {
    yield all([
        fork(watchFetchCampaigns),
        fork(watchAddCampaign),
        fork(watchEditCampaign),
        fork(watchDeleteCampaign)
    ]);
}
