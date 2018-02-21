import React, { Component } from 'react';
import { Entity } from 'aframe-react';
import isEqual from 'lodash.isequal';
import '../aframe-components/Keyboard'
import '../aframe-components/TextField';
import '../aframe-components/TextButton';

class Search extends Component {

  constructor() {

    super();

    this.state = {
      searchValue: '',
      capsLock: false
    }

    this.handleKeyboardClick = this.handleKeyboardClick.bind(this);
    this.clearSearchField = this.clearSearchField.bind(this);

  }

  shouldComponentUpdate(newProps, newState) {

    if(isEqual(newProps, this.props) && isEqual(newState, this.state)) {
      return false;
    }

    return true;

  }

  clearSearchField() {

    this.setState({
      searchValue: ''
    });

  }

  handleKeyboardClick(e) {

    const { text, action } = e.target.components['text-button'].data;
    
    switch(action) {

      case 'NONE':
        return;

      case 'DEFAULT':
        const transformedCharacter = this.state.capsLock ? text.toUpperCase() : text;
        this.setState({
          searchValue: `${this.state.searchValue}${transformedCharacter}`
        });
        break;

      case 'SPACE':
        this.setState({
          searchValue: `${this.state.searchValue} ` // note the space added at the end
        });
        break;

      case 'CAPS':
        this.setState({
          capsLock: !this.state.capsLock
        });
        break;
      
      case 'BACKSPACE':
        this.setState({
          searchValue: this.state.searchValue.slice(0,-1)
        });
        break;

      case 'ENTER':
        this.props.doSearch(this.state.searchValue);
        break;

    }

  }

  render() {

    return (
      <Entity 
        position={this.props.position}
        rotation={this.props.rotation} >
        <Entity
          keyboard={{ keyColor: '#aaa', characterColor: '#fff' }}
          position={{ x: 0, y: 0, z: 0 }}
          rotation={{ x: -25, y: 0, z: 0 }}
          scale={{ x: 0.5, y: 0.5, z: 0.5 }}
          events={{
            click: this.handleKeyboardClick
          }} />
        <Entity
          text-field={{ value: this.state.searchValue }}
          scale={{ x: 0.5, y: 0.5, z: 0.5 }}
          position={{ x: 0, y: 1.420, z: 0 }} />
        <Entity
          text-button={{
            text: 'Close',
            width: 2
          }}
          scale={{ x: 0.5, y: 0.5, z: 0.5 }}
          position={{ x: -3.025, y: 1.420, z: 0 }}
          events={{
            click: () => { this.props.determineSearchPositionAndVisibility(false) }
          }} />
        <Entity
          text-button={{
            text: 'Clear',
            width: 2
          }}
          scale={{ x: 0.5, y: 0.5, z: 0.5 }}
          position={{ x: 3.025, y: 1.420, z: 0 }}
          events={{
            click: this.clearSearchField
          }} />
      </Entity>
    );


  };

};

export default Search;