import { GET_QUESTIONS_REQUEST, GET_QUESTIONS_SUCCESS, GET_QUESTIONS_FAIL} from "../actionTypes";

const initialState= {
    questions: [],
    loading: false,
}

export const questionsReducer = (prevState = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case GET_QUESTIONS_REQUEST:
            return {
                ...prevState,
                loading: true,
            }

        case GET_QUESTIONS_SUCCESS:
            return {
                ...prevState,
                questions: payload,
                loading: false
            }

        case GET_QUESTIONS_FAIL:
            return {
                ...prevState,
                questions: null,
                loading: false,
                error: payload
            }  

        default:
            return prevState;
    }
}
