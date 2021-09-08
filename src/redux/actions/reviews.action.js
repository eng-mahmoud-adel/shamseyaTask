import request from "../../api";
import { GET_REVIEWS_FAIL, GET_REVIEWS_REQUEST, GET_REVIEWS_SUCCESS } from "../actionTypes";
import store from "../store";

export const getReviews = (startDate, endDate) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_REVIEWS_REQUEST
        });

        const {data} = await request('branches/1/progress', {
            params: {
                date_from: startDate,
                date_to: endDate
            }
        });

        // needed reviews
        let obj = {};

        // get months
        let months = data?.line_chart_data?.map(item => item['submitted_at'].slice(5, 7));

        // get unique months
        let unique_months = [...new Set(months)];

        for(let month of unique_months) {
            obj[month] = {
                "2": [],
                "4": []
            };
        }

        Object.keys(obj).map(month => {
            data?.line_chart_data?.map(item => {
                if(month == item['submitted_at'].slice(5, 7)) {
                    item['answers'].map(answer => {
                        if(answer['question'] == '2') {
                            obj[month]["2"].push(answer['choice']);
                        }

                        if(answer['question'] == '4') {
                            obj[month]["4"].push(answer['choice']);
                        }
                    })
                }
            })
        });

        let questions = store.getState().questions.questions;

        // coverting from rating text (Good, Neutral, Bad) to weights (1, 0, -1)
        let reviewsObj = {};
        Object.keys(obj).map(month => {
            Object.keys(obj[month]).map(question => {
                questions.map(item => {
                    if(item.id == question) {
                        item.choices.map(choice => {
                            switch (choice.text) {
                                case 'Good':
                                    reviewsObj[choice.id] = 1
                                    break;

                                case 'Neutral':
                                    reviewsObj[choice.id] = 0
                                    break;

                                case 'Bad':
                                    reviewsObj[choice.id] = -1
                                    break;
                            
                                default:
                                    break;
                            }
                        })
                    }
                })
            })
        });

        // function to return the mean with percision 1
        const mean = (arr) => {
            let result = 0;
            for (let i = 0; i < arr.length; i++) {
                result += arr[i];
            }
            return (result / arr.length).toFixed(1);
        }

        // mapping choices in (obj) to weights in (reviewsObj)
        Object.keys(obj).map(month => {
            Object.keys(obj[month]).map(question => {
                obj[month][question].map((number, i) => {
                    obj[month][question][i] = reviewsObj[number]
                });
                // calculate the mean for the weights
                obj[month][question] = mean(obj[month][question]);
            });
        });

        dispatch({
            type: GET_REVIEWS_SUCCESS,
            payload: obj,
        });

    } catch (error) {
        console.log(error.response.data);
        dispatch({
            type: GET_REVIEWS_FAIL,
            payload: error.response.data.message
        })
    }
}