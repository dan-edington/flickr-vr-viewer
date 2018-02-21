import React from 'react';

const Skybox = (props) => {

  return (
    <a-sky src={props.imageURL} />
  );

};

export default Skybox;