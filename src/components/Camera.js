import React, { Component } from 'react';
import { Entity } from 'aframe-react';

class Camera extends Component {

  render() {

    return(
      <Entity camera look-controls position="0 0 0" ref="cameraEntity">
        <Entity position="0 0 -1"
          geometry="primitive: ring; radiusInner: 0.025; radiusOuter: 0.045;"
          material="color: red; shader: flat"
          cursor={{ fuse: true, fuseTimeout: this.props.fuseTime }}>
          <a-animation begin="fusing" easing="ease-out" attribute="scale"
            fill="backwards" from="1 1 1" to="0.2 0.2 0.2" dur={this.props.fuseTime}></a-animation>
        </Entity>
      </Entity>
    );

  }


};

export default Camera;