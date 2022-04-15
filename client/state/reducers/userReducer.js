import userTypeActions from "../actions/types/userTypeActions";

const initialState = {
    userData: null
};

const userReducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case userTypeActions.SET_USER_DATA:
            return {
                ...state,
                userData: payload
            };
        case userTypeActions.DELETE_USER_DATA:
            return {
                ...state,
                userData: null
            };
        default:
            return state;
    }
}

export default userReducer;