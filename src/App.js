// import './App.css';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from './redux/actions/reviews.action';
import { getQuestions } from './redux/actions/questions.action';
import DatePicker from './components/DatePicker';
import BarChart from './components/BarChart';
import { Container, Box } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

function App() {
  const [selectedStartDate, setSelectedStartDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [selectedEndDate, setSelectedEndDate] = useState(moment(new Date()).format("YYYY-MM-DD"));

  const handleStartDateChange = (date) => {
    setSelectedStartDate(moment(date).format("YYYY-MM-DD"));
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(moment(date).format("YYYY-MM-DD"));
  };
  
  const dispatch = useDispatch();

  const fetchData = () => {
    dispatch(getReviews(selectedStartDate, selectedEndDate));
  }
  
  // call the quetions API once the component is mounted to use them and get the weight
  useEffect(() => {
    dispatch(getQuestions());
  }, [getQuestions]);
  
  const {reviews, loading} = useSelector(state => state.reviews);

  // data for datasets
  let data_1 = [];
  let data_2 = [];
  Object.values(reviews).map(value => data_1.push(value[2]));
  Object.values(reviews).map(value => data_2.push(value[4], 'M'));
  
  return (
    <>
      <Container>
        <DatePicker 
          fetchData={fetchData}
          selectedStartDate={selectedStartDate}
          selectedEndDate={selectedEndDate}
          handleStartDateChange={handleStartDateChange}
          handleEndDateChange={handleEndDateChange}
        />

        <Box marginTop={5} marginBottom={5}>
          <Alert variant="filled" severity="info">Note: If there is no data for any question at any month, that means the data equals <b>Zero</b> at this month.</Alert>
        </Box>

        {Object.keys(reviews).length === 0 && loading != true? <Box marginBottom={5}>
          <Alert variant="filled" severity="error">Please Choose Another Date.</Alert>
        </Box>
        :
        ''
        }

        <BarChart 
          labels={Object.keys(reviews).map(label => moment(parseInt(label, 10), 'M').format('MMM'))} 
          data_1={data_1} 
          data_2={data_2} 
        />
      </Container>
    </>
  );
}

export default App;