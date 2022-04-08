import userTypeActions from "./types/userTypeActions";

export const setUserData = (data) => {
    return {
        type: userTypeActions.SET_USER_DATA,
        payload: data
    };
}

export const deleteUserData = () => {
    return {
        type: userTypeActions.DELETE_USER_DATA,
        payload: null
    };
}