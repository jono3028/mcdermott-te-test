import React, { useState } from 'react';
import moment from 'moment';
import { Form } from 'semantic-ui-react';

export const FilterControls = props => {
  const { onFilterChange, startDate, endDate, options} = props;
  const [ selectedDates,  setSelectedDates ] = useState({startDate, endDate});

  const onHandleDateChange = (value, name) => {
    const currentDates = selectedDates;
    const valueAsMoment = moment(value)
    setSelectedDates({...currentDates, [name]: valueAsMoment});
    onFilterChange(valueAsMoment, name);
  }

  return (
    <div>
      <Form>
        <Form.Group width="equal">
          <Form.Field>
            <label>Released from: </label>
            <input 
              type="date" 
              min={startDate.format('YYYY-MM-DD')} 
              max={endDate.format('YYYY-MM-DD')}
              value={selectedDates.startDate.format('YYYY-MM-DD')}
              onChange={e => onHandleDateChange(e.target.value, 'startDate')}
            />
          </Form.Field>
          <Form.Field>
            <label>Released up to:</label>
            <input type="date"
              min={startDate.format('YYYY-MM-DD')} 
              max={endDate.format('YYYY-MM-DD')}
              value={selectedDates.endDate.format('YYYY-MM-DD')}
              onChange={e => onHandleDateChange(e.target.value, 'endDate')}
            />
          </Form.Field>
          <Form.Select
            label="Lead Actor"
            options={options}
            placeholder="Select Actors"
            multiple
            onChange={(evt, data) => onFilterChange(data.value, 'leadActor')}
          />
        </Form.Group>
      </Form>
    </div>
  )
}