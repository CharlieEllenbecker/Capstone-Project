import tagTypeActions from "../actions/types/tagTypeActions";

const initialState = {
    tags: []
};

const tagReducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case tagTypeActions.SET_TAGS:
            return {
                ...state,
                tags: payload
            };
        default:
            return state;
    }
}

export default tagReducer;