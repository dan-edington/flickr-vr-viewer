import aframe from 'aframe';

aframe.registerComponent('text-field', {

  schema: {
    width: { type: "number", default: 10 },
    height: { type: "number", default: 1 },
    value: { type: "string", default: "" },
    textColor: { type: "color", default: "#000" },
    backgroundColor: { type: "color", default: "#fff" },
    borderSize: { type: "number", default: 0.5 },
    borderColor: { type: "color", default: "#000" }
  },

  init: function() {

    this.createTextField();
    this.el.setObject3D('mesh', this.textFieldMesh);

  },

  createTextField: function() {

    this.textFieldTexture = this.createTextFieldTexture();
    this.textFieldGeometry = new aframe.THREE.PlaneBufferGeometry(this.data.width, this.data.height);
    this.textFieldMesh = new aframe.THREE.Mesh(this.textFieldGeometry, this.textFieldTexture);

  },

  createTextFieldTexture: function() {

    const createCanvasForTexture = textureSize => {

      const canvasElement = document.createElement('canvas');
      canvasElement.setAttribute('width', textureSize.width);
      canvasElement.setAttribute('height', textureSize.height);
  
      return canvasElement;

    };

    const drawTextFieldOntoCanvas = canvasContext => {

      const canvasSize = {
        width: canvasContext.canvas.width,
        height: canvasContext.canvas.height
      };

      const drawBorder = () => {

        canvasContext.fillStyle = this.data.borderColor;
        canvasContext.fillRect(0, 0, canvasSize.width, canvasSize.height);

      };

      const drawBackground = () => {

        canvasContext.fillStyle = this.data.backgroundColor;
        canvasContext.fillRect(
          this.data.borderSize,
          this.data.borderSize,
          canvasSize.width - (this.data.borderSize * 2),
          canvasSize.height - (this.data.borderSize * 2));

      };

      const drawText = () => {

        canvasContext.fillStyle = this.data.textColor;
        canvasContext.textAlign = 'center';
        canvasContext.textBaseline = 'middle';
        canvasContext.font = `${ canvasSize.height / 2 }px sans-serif`;
        canvasContext.fillText(this.data.value, canvasSize.width / 2, canvasSize.height / 2);

      }

      // Due to how canvas works, the order these functions
      // are called in is important
      drawBorder();
      drawBackground();
      drawText();

    };

    const canvas = createCanvasForTexture({ width: 128 * this.data.width, height: 128 * this.data.height });
    const canvasContext = canvas.getContext('2d');
    const material = new aframe.THREE.MeshBasicMaterial();
    material.map = new aframe.THREE.Texture(canvas);
    material.map.needsUpdate = true;

    drawTextFieldOntoCanvas(canvasContext);

    return material;

  },

  update: function() {

    this.textFieldMesh.material = this.createTextFieldTexture();

  }

});