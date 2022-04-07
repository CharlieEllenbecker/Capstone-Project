import jwtTypeActions from "./types/jwtTypeActions";

export const setJWT = (jwt) => {
    return {
        type: jwtTypeActions.SET_JWT,
        payload: jwt
    };
}
export const deleteJWT = () => {
    return {
        type: jwtTypeActions.DELETE_JWT,
        payload: null
    };
}