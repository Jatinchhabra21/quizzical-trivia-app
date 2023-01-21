import React from 'react';
import { CATEGORIES, DIFFICULTY } from '/src/constants';
import Dropdown from './Dropdown';
import NumberInput from './NumberInput';
import { Link } from 'react-router-dom';

export default function Preference() {
  return (
    <div className="container">
      <div className="display-flex align-center gap-1">
        <NumberInput />
        <Dropdown
          list={Object.values(DIFFICULTY)}
          placeholderText="difficulty"
          size="size-1"
        />
      </div>
      <Dropdown
        list={Object.values(CATEGORIES)}
        placeholderText="category"
        size="size-2"
      />
      <Link to="/quiz">
        <button className="btn-large">Take Quiz</button>
      </Link>
    </div>
  );
}
