import aframe from 'aframe';

aframe.registerComponent('text-button', {

  schema: {
    width: { type: 'number', default: 1 },
    height: { type: 'number', default: 1 },
    text: { type: 'string', default: '' },
    action: { type: 'string', default: 'DEFAULT' },
    buttonColor: { type: 'color', default: '#666' },
    textColor: { type: 'color', default: '#fff' },
    buttonColorHover: { type: 'color', default: '#000' },
    textColorHover: { type: 'color', default: '#fff' }
  },

  init: function() {

    this.createButton();
    this.setupEventHandlers();

  },

  createButton: function() {

    this.createButtonMesh();
    this.el.setObject3D('mesh', this.buttonMesh);

  },

  createButtonMesh: function() {

    this.buttonTexture = this.createButtonTexture({ textColor: this.data.textColor, buttonColor: this.data.buttonColor });
    this.buttonTextureHover = this.createButtonTexture({ textColor: this.data.textColorHover, buttonColor: this.data.buttonColorHover });
    this.buttonGeometry = new aframe.THREE.PlaneBufferGeometry(this.data.width, this.data.height);
    this.buttonMesh = new aframe.THREE.Mesh(this.buttonGeometry, this.buttonTexture);

  },

  createButtonTexture: function({ buttonColor, textColor }) {

    const createCanvasForTexture = textureSize => {

      const canvasElement = document.createElement('canvas');
      canvasElement.setAttribute('width', textureSize.width);
      canvasElement.setAttribute('height', textureSize.height);
  
      return canvasElement;

    };

    const drawCharacterOntoCanvas = canvasContext => {

      const canvasSize = {
        width: canvasContext.canvas.width,
        height: canvasContext.canvas.height
      };

      canvasContext.fillStyle = buttonColor;
      canvasContext.fillRect(0, 0, canvasSize.width, canvasSize.height);
      canvasContext.fillStyle = textColor;
      canvasContext.textAlign = 'center';
      canvasContext.textBaseline = 'middle';
      canvasContext.font = `${ canvasSize.height / 2 }px sans-serif`;
      canvasContext.fillText(this.data.text, canvasSize.width / 2, canvasSize.height / 2);

    };

    const canvas = createCanvasForTexture({ width: 128 * this.data.width, height: 128 * this.data.height });
    const canvasContext = canvas.getContext('2d');
    const material = new aframe.THREE.MeshBasicMaterial();
    material.map = new aframe.THREE.Texture(canvas);
    material.map.needsUpdate = true;

    drawCharacterOntoCanvas(canvasContext);

    return material;

  },

  setupEventHandlers: function() {

    this.el.addEventListener('mouseenter', () => this.handleMouseEnter());
    this.el.addEventListener('mouseleave', () => this.handleMouseLeave());

  },

  handleMouseEnter: function(e) {
    
    if(this.data.action === "NONE")
      return;

    this.buttonMesh.material = this.buttonTextureHover;

  },

  handleMouseLeave: function(e) {

    if(this.data.action === "NONE")
      return;

    this.buttonMesh.material = this.buttonTexture;

  }

});