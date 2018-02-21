import React, { Component } from 'react';
import { Entity } from 'aframe-react';

class SearchOpener extends Component {

  render() {

    return (
      <Entity
        events={{
          click: () => { this.props.determineSearchPositionAndVisibility(true) }
        }}
        position={{ x: 0, y: -4, z: 0 }}
        material={{ color: '#000000', opacity: 0 }}
        geometry={{ primitive: 'box', width: 4, height: 0.05, depth: 4 }} />
    );

  };

};

export default SearchOpener;