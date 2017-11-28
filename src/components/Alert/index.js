// @flow
import React from 'react';
import classnames from 'classnames';
import closeIcon from './close.svg';
import './styles.css';

type Props = {
  children: string,
  type: 'success' | 'error' | 'info',
  onClose: () => void
};

export default function Alert(props: Props) {
  return (
    <div className={classnames('Alert', `Alert--${props.type}`)}>
      {props.children}

      <a onClick={props.onClose}>
        <img className="Alert__close-icon" src={closeIcon} alt="Dismiss" />
      </a>
    </div>
  );
}

Alert.defaultProps = {
  type: 'info'
};
