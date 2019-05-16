import React, { useState } from 'react';
import { Dropdown } from '../styles/shared.css';
import { connect } from 'react-redux';
import { getAllQuestionTypes } from '../reducers';

// component for selecting types
// the onChange prop mimics an event callback by passing:
// { target: { name: 'question_type_id', value }} as the argument
const TypeSelect = ({ options, onChange, placeholder }) => {
  const [value, setValue] = useState(null);

  return (
    <Dropdown
      options={options}
      onChange={c => {
        setValue(c);
        onChange({
          target: {
            name: 'question_type_id',
            value: c.value
          }
        });
      }}
      value={value}
      placeholder={placeholder || 'Select a Question Type...'}
    />
  );
};

const mapStateToProps = state => {
  const types = getAllQuestionTypes(state);
  return {
    options: [
      {
        value: types.find(t => t.name.toLowerCase().indexOf('multiple') > -1).id,
        label: 'multiple choice'
      },
      {
        value: types.find(t => t.name.toLowerCase().indexOf('boolean') > -1).id,
        label: 'true/false'
      }
    ]
  };
};

export default connect(mapStateToProps)(TypeSelect);