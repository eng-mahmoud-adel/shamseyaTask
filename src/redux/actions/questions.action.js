import request from "../../api";
import { GET_QUESTIONS_SUCCESS, GET_QUESTIONS_REQUEST, GET_QUESTIONS_FAIL } from "../actionTypes";

export const getQuestions = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_QUESTIONS_REQUEST
        });

        const {data} = await request('questions');

        dispatch({
            type: GET_QUESTIONS_SUCCESS,

            // get question(2) and question(4)
            payload: data[0].questions.filter(question => question.id == 2 || question.id == 4),
        });

    } catch (error) {
        console.log(error.response.data);
        dispatch({
            type: GET_QUESTIONS_FAIL,
            payload: error.response.data.message
        })
    }
}