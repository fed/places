// @flow
import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import uuid from 'uuid/v1';
import get from 'lodash/get';
import type { Place, LatLng } from '../../state/types';
import './styles.css';

type Props = {
  onSubmit: (place: Place) => void
};

export type State = Place & {
  address: string
};

export default class Form extends React.Component<Props, State> {
  state = {
    address: '',
    name: '',
    description: '',
    visited: false,
    location: {
      lat: null,
      lng: null
    },
    attachments: []
  };

  componentWillMount = () => {
    // Start off with an empty field on the attachments list.
    this.onAddAttachment();
  };

  onNameChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({
      name: event.target.value
    });
  };

  onDescriptionChange = (event: SyntheticInputEvent<HTMLTextAreaElement>) => {
    this.setState({
      description: event.target.value
    });
  };

  onAddressChange = (value: string) => {
    this.setState({
      address: value
    });
  };

  onAddAttachment = () => {
    this.setState(prevState => ({
      attachments: prevState.attachments.concat([
        {
          id: uuid(),
          type: 'image',
          url: ''
        }
      ])
    }));
  };

  onAttachmentUrlChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const id = get(event, 'target.parentElement.id');
    const nextAttachments = this.state.attachments.map(attachment => {
      if (attachment.id === id) {
        attachment.url = value;
      }

      return attachment;
    });

    this.setState({
      attachments: nextAttachments
    });
  };

  onAttachmentTypeChange = (event: SyntheticEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const id = get(event, 'target.parentElement.id');
    const nextAttachments = this.state.attachments.map(attachment => {
      if (attachment.id === id) {
        attachment.type = value;
      }

      return attachment;
    });

    this.setState({
      attachments: nextAttachments
    });
  };

  onSubmit = (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then((location: LatLng) => {
        this.setState(
          {
            location
          },
          () => {
            // Parse Form component state to API expected input.
            const { address, ...place } = this.state;
            const cleanedUpAttachments = place.attachments
              .filter(attachment => attachment.url !== '')
              .map(attachment => ({
                url: attachment.url,
                type: attachment.type
              }));

            place.attachments = cleanedUpAttachments;

            this.props.onSubmit(place);
          }
        );
      })
      .catch(error => console.error('Error', error));
  };

  render() {
    return (
      <form method="POST" className="Form">
        <ul className="Form__list">
          <li className="Form__list-item">
            <label className="Form__label" htmlFor="place-name">
              Place or Activity
            </label>
            <input
              id="place-name"
              type="text"
              className="Form__input"
              placeholder="e.g.: Go diving to the Great Barrier Reef"
              value={this.state.name}
              onChange={this.onNameChange}
              required
            />
          </li>

          <li className="Form__list-item">
            <label className="Form__label" htmlFor="place-description">
              Description
            </label>
            <textarea
              id="place-description"
              className="Form__input"
              rows={4}
              placeholder="e.g.: Home to diverse marine life of the most vivid colours, the Great Barrier Reef offers the opportunity for great adventure."
              value={this.state.description}
              onChange={this.onDescriptionChange}
            />
          </li>

          <li className="Form__list-item">
            <label className="Form__label" htmlFor="place-address">
              Find in Google Maps
            </label>
            <PlacesAutocomplete
              classNames={{
                input: 'Form__input'
              }}
              inputProps={{
                htmlFor: 'place-address',
                value: this.state.address,
                onChange: this.onAddressChange
              }}
            />
          </li>

          <li className="Form__list-item">
            <label className="Form__label">
              Attachments –{' '}
              <button
                onClick={this.onAddAttachment}
                className="Form__attachment-add"
              >
                Add another one
              </button>
            </label>
            <ul className="Form__list">
              {this.state.attachments.map(attachment => (
                <li
                  className="Form__list-item Form__attachment"
                  key={attachment.id}
                  // we need this so that we can target the appropriate state field
                  id={attachment.id}
                >
                  <input
                    type="text"
                    className="Form__input"
                    value={attachment.url}
                    onChange={this.onAttachmentUrlChange}
                  />
                  <select
                    className="Form__attachment-type"
                    onChange={this.onAttachmentTypeChange}
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="link">Link</option>
                  </select>
                </li>
              ))}
            </ul>
          </li>

          <li>
            <button
              type="submit"
              className="Form__submit"
              onClick={this.onSubmit}
            >
              Save
            </button>
          </li>
        </ul>
      </form>
    );
  }
}
