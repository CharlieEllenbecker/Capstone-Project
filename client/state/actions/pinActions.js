import pinTypeActions from "./types/pinTypeActions";

export const setSelectedPin = (pin) => {
    return {
        type: pinTypeActions.SET_SELECTED_PIN,
        payload: pin
    };
}

export const setUserSpecificPins = (pins) => {
    return {
        type: pinTypeActions.SET_USER_SPECIFIC_PINS,
        payload: pins
    };
}

export const setAllPins = (pins) => {
    return {
        type: pinTypeActions.SET_ALL_PINS,
        payload: pins
    };
}