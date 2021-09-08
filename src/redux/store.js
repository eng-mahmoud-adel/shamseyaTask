import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { questionsReducer } from './reducers/questions.reducer';
import { reviewsReducer } from './reducers/reviews.reducer';

const rootReducer = combineReducers({
    reviews: reviewsReducer,
    questions: questionsReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;