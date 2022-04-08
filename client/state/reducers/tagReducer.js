import tagTypeActions from "../actions/types/tagTypeActions";

const initialState = {
    tags: null
};

const tagReducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case tagTypeActions.SET_TAGS:
            return {
                ...state,
                tags: payload
            };
        default: state;
    }
}

export default tagReducer;