export const FORM_UPDATE = "FORM_UPDATE";
export const FORM_RESET = "FORM_RESET";

export const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_UPDATE:
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value
      };

      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid
      };

      let updatedFormValidity = true;
      for (const key in updatedValidities) {
        updatedFormValidity = updatedFormValidity && updatedValidities[key];
      }

      return {
        inputValues: updatedValues,
        inputValidities: updatedValidities,
        isFormValid: updatedFormValidity
      };

    case FORM_RESET: {
      const { initialState } = action;
      return initialState;
    }

    default:
      return state;
  }
};
