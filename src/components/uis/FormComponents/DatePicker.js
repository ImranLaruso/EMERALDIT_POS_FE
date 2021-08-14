import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const DatePicker = ({ entry, handleDatePickerChange, selectedDate }) => {
  const { name, id } = entry;
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        margin='medium'
        id={id}
        name={name}
        format=' yyyy / MM / dd'
        value={selectedDate}
        onChange={handleDatePickerChange}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
