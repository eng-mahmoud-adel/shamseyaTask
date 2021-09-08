import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { Grid } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import BaseButton from './BaseButton';

const DatePicker = ({ fetchData, selectedStartDate, selectedEndDate, handleStartDateChange, handleEndDateChange }) => {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent="space-between" style={{marginTop: "16px"}}>
                <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Select Start Date"
                    format="yyyy-MM-dd"
                    value={selectedStartDate}
                    onChange={handleStartDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />

                <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Select End Date"
                    format="yyyy-MM-dd"
                    value={selectedEndDate}
                    onChange={handleEndDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />

                <BaseButton fetchData={fetchData}>Get Reviews</BaseButton>
            </Grid>
        </MuiPickersUtilsProvider>
    )
}

export default DatePicker;
