// @flow
import React from 'react';
import debounce from 'lodash/debounce';
import update from 'immutability-helper';
import {typeaheadSearch} from '../../services/maps';
import type {Place, GooglePlacesSuggestion} from '../../state/types';
import './styles.css';

type Props = {
  onSubmit: (place: Place) => void
};

type State = {
  place: Place,
  searchTerm: string,
  suggestions: Array<GooglePlacesSuggestion>
};

export default class Form extends React.Component<Props, State> {
  state = {

  };

  constructor() {
    super();

    this.state = {
      place: {
        name: '',
        description: '',
        country: '',
        coords: {
          lat: 0,
          lng: 0
        }
      },
      searchTerm: '',
      suggestions: []
    };

    this.onTypeaheadSearch = debounce(this.onTypeaheadSearch, 400);
  }

  onNameChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const nextName = event.target.value;
    const nextState = update(this.state, {
      place: { name: { $set: nextName } }
    });

    this.setState(nextState);
  };

  onDescriptionChange = (event: SyntheticInputEvent<HTMLTextAreaElement>) => {
    const nextDescription = event.target.value;
    const nextState = update(this.state, {
      place: { description: { $set: nextDescription } }
    });

    this.setState(nextState);
  };

  onSearchTermChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;

    this.setState(
      { searchTerm },
      this.onTypeaheadSearch
    );
  };

  onTypeaheadSearch = () => {
    typeaheadSearch(this.state.searchTerm).then(suggestions => {
      this.setState({
        suggestions
      });
    });
  };

  onSubmit = (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    this.props.onSubmit(this.state.place);
  };

  render() {
    return (
      <form method="POST">
        <ul className="Form__list">
          <li className="Form__list-item">
            <label className="Form__label" htmlFor="place-name">Place or Activity</label>
            <input
              id="place-name"
              type="text"
              className="Form__input"
              placeholder="e.g.: Go diving to the Great Barrier Reef"
              value={this.state.place.name}
              onChange={this.onNameChange}
              required />
          </li>

          <li className="Form__list-item">
            <label className="Form__label" htmlFor="place-description">Description</label>
            <textarea
              id="place-description"
              className="Form__input"
              rows={4}
              placeholder="e.g.: Home to diverse marine life of the most vivid colours, the Great Barrier Reef offers the opportunity for great adventure."
              value={this.state.place.description}
              onChange={this.onDescriptionChange}
              required />
          </li>

          <li className="Form__list-item">
            <label className="Form__label" htmlFor="place-typeahead">Find in Google Maps</label>
            <input
              id="place-typeahead"
              type="text"
              className="Form__input"
              placeholder="e.g.: Cairns, Queensland, Australia"
              value={this.state.searchTerm}
              onChange={this.onSearchTermChange}
              required />
            <ul className="Form__suggestions">
              {
                this.state.suggestions.map((suggestion, index) => (
                  <li className="Form__suggestions-item" key={index}>
                    {suggestion.formatted_address}
                  </li>
                ))
              }
            </ul>
          </li>

          <li className="Form__list-item">
            <label className="Form__label" htmlFor="place-country">Country</label>
            <input
              id="place-country"
              type="text"
              className="Form__input"
              placeholder="e.g.: Australia"
              value={this.state.place.country}
              required
              disabled />
          </li>

          <li>
            <button type="submit" className="Form__submit" onClick={this.onSubmit}>
              Save
            </button>
          </li>
        </ul>
      </form>
    );
  }
}
