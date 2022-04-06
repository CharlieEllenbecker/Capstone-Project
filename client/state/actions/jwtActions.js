import jwtTypeActions from "./types/jwtTypeActions";

export const setJWT = (jwt) => {
    console.log('here');
    return {
        type: jwtTypeActions.SET_JWT,
        payload: jwt
    };
}
export const deleteJWT = () => {
    return {
        type: jwtTypeActions.DELETE_JWT,
        payload: ''
    };
}