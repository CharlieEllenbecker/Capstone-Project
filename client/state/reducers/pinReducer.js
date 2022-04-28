import pinTypeActions from "../actions/types/pinTypeActions";

const initialState = {
    selectedPin: null,
    selectedPinReviews: [],
    selectedPinPosts: [],
    userSpecificPins: [],
    allPins: [],
    filteredPins: []
};

const pinReducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case pinTypeActions.SET_SELECTED_PIN:
            return {
                ...state,
                selectedPin: payload
            };
        case pinTypeActions.SET_SELECTED_PIN_REVIEWS:
            return {
                ...state,
                selectedPinReviews: payload
            };
        case pinTypeActions.SET_SELECTED_PIN_POSTS:
            return {
                ...state,
                selectedPinPosts: payload
            };
        case pinTypeActions.SET_USER_SPECIFIC_PINS:
            return {
                ...state,
                userSpecificPins: payload
            };
        case pinTypeActions.SET_ALL_PINS:
            return {
                ...state,
                allPins: payload
            };
        case pinTypeActions.SET_FILTERED_PINS:
            return {
                ...state,
                filteredPins: payload
            };
        default: 
            return state;
    }
}

export default pinReducer;