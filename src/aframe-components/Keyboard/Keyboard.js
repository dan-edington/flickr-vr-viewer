import aframe from 'aframe';
import '../TextButton/TextButton';

aframe.registerComponent('keyboard', {

  schema: {
    keyColor: { type: 'color', default: '#666' },
    characterColor: { type: 'color', default: '#fff' }
  },

  init: function() {

    this.keyboard = {
      keyboardLayout: [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        [{ character: ' ', action: 'NONE', width: 0.5 }, 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', { character: ' ', action: 'NONE', width: 0.5 }],
        [{ character: '↥', action: 'CAPS', width: 1.5 }, 'z', 'x', 'c', 'v', 'b', 'n', 'm', { character: '⇐', action: 'BACKSPACE', width: 1.5 }],
        [{ character: ' ', action: 'NONE', width: 1.5 }, '@', { character: '―', action: 'SPACE', width: 5 }, '.', { character: '↵', action: 'ENTER', width: 1.5 }]
      ]
    };

    this.generateKeyboard();

  },

  generateKeyboard: function() {

    const calculateKeyboardDimensions = () => {

      const lettersPerRow = this.keyboard.keyboardLayout.map(row => {
  
        return row.reduce((accumulator, character) => {
  
          if(typeof character === 'string') {
            return ++accumulator;
          } else if(typeof character === 'object') {
            return accumulator + (character.size || 1);
          }
  
        }, 0);
        
      });
  
      return {
        width: Math.max(...lettersPerRow),
        height: lettersPerRow.length
      }
  
    };

    const createKeyboardElement = defaultKeySize => {

      const keyboardDimensions = calculateKeyboardDimensions();
      const keyboardElement = document.createElement('a-entity');

      keyboardElement.setAttribute('position', `
        ${ ((keyboardDimensions.width / 2) - defaultKeySize) * -1 }
        ${ (keyboardDimensions.height / 2) - (defaultKeySize / 2) }
        0`);

      return keyboardElement;
      
    };

    const getCurrentCharacterAndAction = (i, j) => {

      return {
        character: this.keyboard.keyboardLayout[i][j].character || this.keyboard.keyboardLayout[i][j],
        action: this.keyboard.keyboardLayout[i][j].action || 'DEFAULT'
      }

    };

    const calculateCurrentKeyWidth = currentKey => {

      if (typeof currentKey === 'object') {
        return (currentKey.width || 1) * defaultKeySize;
      } else {
        return defaultKeySize;
      }

    };

    const createKeyElement = (keyAttributes, defaultKeySize) => {

      const { currentKeyDimensions, character, action, nextKeyPosition } = keyAttributes;

      const keyElement = document.createElement('a-entity');
      keyElement.setAttribute('text-button',
        `width: ${ currentKeyDimensions.width };
        height: ${ currentKeyDimensions.height };
        text: ${ character };
        action: ${ action };
        buttonColor: ${ this.data.keyColor };
        textColor: ${ this.data.characterColor };`);

      keyElement.setAttribute('position', 
        `${ nextKeyPosition.x + ((currentKeyDimensions.width - defaultKeySize) / 2) }
         ${ nextKeyPosition.y }
         0`);

      return keyElement;

    };

    const nextKeyPosition = { x: 0, y: 0 };
    const defaultKeySize = 1;
    const currentKeyDimensions = { width: defaultKeySize, height: defaultKeySize };
    const keyboardElement = createKeyboardElement(defaultKeySize);

    this.keyboard.keyboardLayout.forEach((row, i) => {

      row.forEach((currentKey, j) => {

        const { character, action } = getCurrentCharacterAndAction(i, j);
        currentKeyDimensions.width = calculateCurrentKeyWidth(currentKey);

        const keyElement = createKeyElement({
          currentKeyDimensions,
          character,
          action,
          nextKeyPosition
        }, defaultKeySize);

        nextKeyPosition.x += currentKeyDimensions.width;
        keyboardElement.appendChild(keyElement);

      });

      nextKeyPosition.y -= currentKeyDimensions.height;
      nextKeyPosition.x = 0;

    });

    this.el.appendChild(keyboardElement);

  }

});