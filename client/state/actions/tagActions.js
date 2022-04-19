import tagTypeActions from "./types/tagTypeActions";

export const setTags = (tags) => {
    return {
        type: tagTypeActions.SET_TAGS,
        payload: tags
    };
}