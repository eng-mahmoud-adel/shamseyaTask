import { GET_REVIEWS_FAIL, GET_REVIEWS_REQUEST, GET_REVIEWS_SUCCESS } from "../actionTypes";

const initialState= {
    reviews: {},
    loading: true,
}

export const reviewsReducer = (prevState = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case GET_REVIEWS_REQUEST:
            return {
                ...prevState,
                loading: true,
            }

        case GET_REVIEWS_SUCCESS:
            return {
                ...prevState,
                reviews: payload,
                loading: false
            }

        case GET_REVIEWS_FAIL:
            return {
                ...prevState,
                reviews: null,
                loading: false,
                error: payload
            }  

        default:
            return prevState;
    }
}
