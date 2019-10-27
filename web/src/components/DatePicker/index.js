import React, { useRef, useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import PT from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';

import 'react-datepicker/dist/react-datepicker.css';

import { Container } from './styles';

export default function DatePicker({ name, placeholder }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      charValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]);

  return (
    <Container>
      <ReactDatePicker
        name={fieldName}
        selected={selected}
        showTimeSelect
        onChange={date => setSelected(date)}
        ref={ref}
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Hora"
        dateFormat="dd 'de' MMMM 'de' yyyy, 'às' HH:mm'h'"
        minDate={new Date()}
        className="datepicker"
        placeholderText={placeholder}
        locale={PT}
      />
      {error && <span>{error}</span>}
    </Container>
  );
}

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};
