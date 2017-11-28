// @flow
import React from 'react';
import spinnerImage from './spinner.png';
import './styles.css';

type Props = {
  isVisible: boolean
};

export default function Spinner(props: Props) {
  return props.isVisible && (
    <div className="Spinner">
      <div className="Spinner__image-wrapper">
        <img src={spinnerImage} className="Spinner__image" alt="Loading" />
      </div>
    </div>
  );
}
