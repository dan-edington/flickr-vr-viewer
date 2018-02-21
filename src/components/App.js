import React, { Component } from 'react';
import { Entity, Scene } from 'aframe-react';
import aframe from 'aframe';
import Camera from './Camera';
import Skybox from './Skybox';
import Search from './Search';
import SearchOpener from './SearchOpener';

class App extends Component {

  constructor() {

    super();
  
    this.state = {
      imageURL: null,
      searchIsVisible: false,
      searchPosition: { x: 0, y: 0, z: 0 },
      searchRotation: 0
    }

    this.doSearch = this.doSearch.bind(this);
    this.determineSearchPositionAndVisibility = this.determineSearchPositionAndVisibility.bind(this);

  }

  componentDidMount() {

    this.doSearch('Japan');

  }

  doSearch(searchTerm) {

    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=8c226f8233af4f331fc8c0322631bfdb&text=${searchTerm}&extras=url_k&group_id=44671723%40N00&format=json&nojsoncallback=1`;

    fetch(url)
      .then(res => res.json())
      .then(res => {
        const photoURLs = res.photos.photo.map(photo => {
          return photo.url_k;
        }).filter(photo => {
          return !!photo;
        });

        this.setState({
          imageURL: photoURLs[Math.floor(Math.random() * (photoURLs.length - 1))]
        });

      });   

  }

  determineSearchPositionAndVisibility(visibility) {

    let searchXPosition = this.state.searchPosition.x;
    let searchZPosition = this.state.searchPosition.z;
    let cameraRotationY = this.state.searchRotation;

    if(visibility && this.refs.camera) {

      const cameraEntity = this.refs.camera.refs.cameraEntity.el;
      cameraRotationY = cameraEntity.getAttribute('rotation').y;
      searchZPosition = Math.cos(cameraRotationY * Math.PI / 180) * -5;
      searchXPosition = Math.sin(cameraRotationY * Math.PI / 180) * -5;

    }

    this.setState({
      searchIsVisible: visibility,
      searchPosition: {
        x: searchXPosition,
        y: 0,
        z: searchZPosition
      },
      searchRotation: cameraRotationY
    });

  }

  renderSearch() {

    if(this.state.searchIsVisible && this.refs.camera) {

      return(
        <Search
          position={ this.state.searchPosition }
          rotation={{ x: 0, y: this.state.searchRotation, z: 0 }}
          determineSearchPositionAndVisibility={this.determineSearchPositionAndVisibility}
          doSearch={this.doSearch} />
      );

    }

    return false;

  }

  render() {
    return(
      <Scene>
        <Skybox imageURL={this.state.imageURL} />
        <Camera fuseTime="750" ref="camera" />
        { this.renderSearch() }
        <SearchOpener determineSearchPositionAndVisibility={this.determineSearchPositionAndVisibility} />
      </Scene>
    )
  }

};

export default App;