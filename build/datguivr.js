(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createButton;

var _SubdivisionModifier = require('../thirdparty/SubdivisionModifier');

var SubdivisionModifier = _interopRequireWildcard(_SubdivisionModifier);

var _textlabel = require('./textlabel');

var _textlabel2 = _interopRequireDefault(_textlabel);

var _interaction = require('./interaction');

var _interaction2 = _interopRequireDefault(_interaction);

var _colors = require('./colors');

var Colors = _interopRequireWildcard(_colors);

var _layout = require('./layout');

var Layout = _interopRequireWildcard(_layout);

var _sharedmaterials = require('./sharedmaterials');

var SharedMaterials = _interopRequireWildcard(_sharedmaterials);

var _grab = require('./grab');

var Grab = _interopRequireWildcard(_grab);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function createButton() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      textCreator = _ref.textCreator,
      object = _ref.object,
      _ref$propertyName = _ref.propertyName,
      propertyName = _ref$propertyName === undefined ? 'undefined' : _ref$propertyName,
      _ref$width = _ref.width,
      width = _ref$width === undefined ? Layout.PANEL_WIDTH : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === undefined ? Layout.PANEL_HEIGHT : _ref$height,
      _ref$depth = _ref.depth,
      depth = _ref$depth === undefined ? Layout.PANEL_DEPTH : _ref$depth;

  var BUTTON_WIDTH = width * 0.5 - Layout.PANEL_MARGIN;
  var BUTTON_HEIGHT = height - Layout.PANEL_MARGIN;
  var BUTTON_DEPTH = Layout.BUTTON_DEPTH;

  var group = new THREE.Group();

  var panel = Layout.createPanel(width, height, depth);
  group.add(panel);

  //  base checkbox
  var divisions = 4;
  var aspectRatio = BUTTON_WIDTH / BUTTON_HEIGHT;
  var rect = new THREE.BoxGeometry(BUTTON_WIDTH, BUTTON_HEIGHT, BUTTON_DEPTH, Math.floor(divisions * aspectRatio), divisions, divisions);
  var modifier = new THREE.SubdivisionModifier(1);
  modifier.modify(rect);
  rect.translate(BUTTON_WIDTH * 0.5, 0, 0);

  //  hitscan volume
  var hitscanMaterial = new THREE.MeshBasicMaterial();
  hitscanMaterial.visible = false;

  var hitscanVolume = new THREE.Mesh(rect.clone(), hitscanMaterial);
  hitscanVolume.position.z = BUTTON_DEPTH * 0.5;
  hitscanVolume.position.x = width * 0.5;

  var material = new THREE.MeshBasicMaterial({ color: Colors.BUTTON_COLOR });
  var filledVolume = new THREE.Mesh(rect.clone(), material);
  hitscanVolume.add(filledVolume);

  var buttonLabel = textCreator.create(propertyName, { scale: 0.866 });

  //  This is a real hack since we need to fit the text position to the font scaling
  //  Please fix me.
  buttonLabel.position.x = BUTTON_WIDTH * 0.5 - buttonLabel.layout.width * 0.000011 * 0.5;
  buttonLabel.position.z = BUTTON_DEPTH * 1.2;
  buttonLabel.position.y = -0.025;
  filledVolume.add(buttonLabel);

  var descriptorLabel = textCreator.create(propertyName);
  descriptorLabel.position.x = Layout.PANEL_LABEL_TEXT_MARGIN;
  descriptorLabel.position.z = depth;
  descriptorLabel.position.y = -0.03;

  var controllerID = Layout.createControllerIDBox(height, Colors.CONTROLLER_ID_BUTTON);
  controllerID.position.z = depth;

  panel.add(descriptorLabel, hitscanVolume, controllerID);

  var interaction = (0, _interaction2.default)(hitscanVolume);
  interaction.events.on('onPressed', handleOnPress);
  interaction.events.on('onReleased', handleOnRelease);

  updateView();

  function handleOnPress(p) {
    if (group.visible === false) {
      return;
    }

    object[propertyName]();

    hitscanVolume.position.z = BUTTON_DEPTH * 0.1;

    p.locked = true;
  }

  function handleOnRelease() {
    hitscanVolume.position.z = BUTTON_DEPTH * 0.5;
  }

  function updateView() {

    if (interaction.hovering()) {
      material.color.setHex(Colors.BUTTON_HIGHLIGHT_COLOR);
    } else {
      material.color.setHex(Colors.BUTTON_COLOR);
    }
  }

  group.interaction = interaction;
  group.hitscan = [hitscanVolume, panel];

  var grabInteraction = Grab.create({ group: group, panel: panel });

  group.update = function (inputObjects) {
    interaction.update(inputObjects);
    grabInteraction.update(inputObjects);
    updateView();
  };

  group.name = function (str) {
    descriptorLabel.update(str);
    return group;
  };

  return group;
} /**
  * dat-guiVR Javascript Controller Library for VR
  * https://github.com/dataarts/dat.guiVR
  *
  * Copyright 2016 Data Arts Team, Google Inc.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */

},{"../thirdparty/SubdivisionModifier":18,"./colors":3,"./grab":7,"./interaction":11,"./layout":12,"./sharedmaterials":15,"./textlabel":17}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createCheckbox;

var _textlabel = require('./textlabel');

var _textlabel2 = _interopRequireDefault(_textlabel);

var _interaction = require('./interaction');

var _interaction2 = _interopRequireDefault(_interaction);

var _colors = require('./colors');

var Colors = _interopRequireWildcard(_colors);

var _layout = require('./layout');

var Layout = _interopRequireWildcard(_layout);

var _graphic = require('./graphic');

var Graphic = _interopRequireWildcard(_graphic);

var _sharedmaterials = require('./sharedmaterials');

var SharedMaterials = _interopRequireWildcard(_sharedmaterials);

var _grab = require('./grab');

var Grab = _interopRequireWildcard(_grab);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createCheckbox() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      textCreator = _ref.textCreator,
      object = _ref.object,
      _ref$propertyName = _ref.propertyName,
      propertyName = _ref$propertyName === undefined ? 'undefined' : _ref$propertyName,
      _ref$initialValue = _ref.initialValue,
      initialValue = _ref$initialValue === undefined ? false : _ref$initialValue,
      _ref$width = _ref.width,
      width = _ref$width === undefined ? Layout.PANEL_WIDTH : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === undefined ? Layout.PANEL_HEIGHT : _ref$height,
      _ref$depth = _ref.depth,
      depth = _ref$depth === undefined ? Layout.PANEL_DEPTH : _ref$depth;

  var CHECKBOX_WIDTH = Layout.CHECKBOX_SIZE;
  var CHECKBOX_HEIGHT = CHECKBOX_WIDTH;
  var CHECKBOX_DEPTH = depth;

  var INACTIVE_SCALE = 0.001;
  var ACTIVE_SCALE = 0.9;

  var state = {
    value: initialValue,
    listen: false
  };

  var group = new THREE.Group();

  var panel = Layout.createPanel(width, height, depth);
  group.add(panel);

  //  base checkbox
  var rect = new THREE.BoxGeometry(CHECKBOX_WIDTH, CHECKBOX_HEIGHT, CHECKBOX_DEPTH);
  rect.translate(CHECKBOX_WIDTH * 0.5, 0, 0);

  //  hitscan volume
  var hitscanMaterial = new THREE.MeshBasicMaterial();
  hitscanMaterial.visible = false;

  var hitscanVolume = new THREE.Mesh(rect.clone(), hitscanMaterial);
  hitscanVolume.position.z = depth;
  hitscanVolume.position.x = width * 0.5;

  //  outline volume
  // const outline = new THREE.BoxHelper( hitscanVolume );
  // outline.material.color.setHex( Colors.OUTLINE_COLOR );

  //  checkbox volume
  var material = new THREE.MeshBasicMaterial({ color: Colors.CHECKBOX_BG_COLOR });
  var filledVolume = new THREE.Mesh(rect.clone(), material);
  // filledVolume.scale.set( ACTIVE_SCALE, ACTIVE_SCALE,ACTIVE_SCALE );
  hitscanVolume.add(filledVolume);

  var descriptorLabel = textCreator.create(propertyName);
  descriptorLabel.position.x = Layout.PANEL_LABEL_TEXT_MARGIN;
  descriptorLabel.position.z = depth;
  descriptorLabel.position.y = -0.03;

  var controllerID = Layout.createControllerIDBox(height, Colors.CONTROLLER_ID_CHECKBOX);
  controllerID.position.z = depth;

  var borderBox = Layout.createPanel(CHECKBOX_WIDTH + Layout.BORDER_THICKNESS, CHECKBOX_HEIGHT + Layout.BORDER_THICKNESS, CHECKBOX_DEPTH, true);
  borderBox.material.color.setHex(0x1f7ae7);
  borderBox.position.x = -Layout.BORDER_THICKNESS * 0.5 + width * 0.5;
  borderBox.position.z = depth * 0.5;

  var checkmark = Graphic.checkmark();
  checkmark.position.z = depth * 0.51;
  hitscanVolume.add(checkmark);

  panel.add(descriptorLabel, hitscanVolume, controllerID, borderBox);

  // group.add( filledVolume, outline, hitscanVolume, descriptorLabel );

  var interaction = (0, _interaction2.default)(hitscanVolume);
  interaction.events.on('onPressed', handleOnPress);

  updateView();

  function handleOnPress(p) {
    if (group.visible === false) {
      return;
    }

    state.value = !state.value;

    object[propertyName] = state.value;

    if (onChangedCB) {
      onChangedCB(state.value);
    }

    p.locked = true;
  }

  function updateView() {

    if (state.value) {
      checkmark.visible = true;
    } else {
      checkmark.visible = false;
    }
    if (interaction.hovering()) {
      borderBox.visible = true;
    } else {
      borderBox.visible = false;
    }
  }

  var onChangedCB = void 0;
  var onFinishChangeCB = void 0;

  group.onChange = function (callback) {
    onChangedCB = callback;
    return group;
  };

  group.interaction = interaction;
  group.hitscan = [hitscanVolume, panel];

  var grabInteraction = Grab.create({ group: group, panel: panel });

  group.listen = function () {
    state.listen = true;
    return group;
  };

  group.name = function (str) {
    descriptorLabel.update(str);
    return group;
  };

  group.update = function (inputObjects) {
    if (state.listen) {
      state.value = object[propertyName];
    }
    interaction.update(inputObjects);
    grabInteraction.update(inputObjects);
    updateView();
  };

  return group;
} /**
  * dat-guiVR Javascript Controller Library for VR
  * https://github.com/dataarts/dat.guiVR
  *
  * Copyright 2016 Data Arts Team, Google Inc.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */

},{"./colors":3,"./grab":7,"./graphic":8,"./interaction":11,"./layout":12,"./sharedmaterials":15,"./textlabel":17}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.colorizeGeometry = colorizeGeometry;
/**
* dat-guiVR Javascript Controller Library for VR
* https://github.com/dataarts/dat.guiVR
*
* Copyright 2016 Data Arts Team, Google Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

var DEFAULT_COLOR = exports.DEFAULT_COLOR = 0x2FA1D6;
var HIGHLIGHT_COLOR = exports.HIGHLIGHT_COLOR = 0x43b5ea;
var INTERACTION_COLOR = exports.INTERACTION_COLOR = 0x07ABF7;
var EMISSIVE_COLOR = exports.EMISSIVE_COLOR = 0x222222;
var HIGHLIGHT_EMISSIVE_COLOR = exports.HIGHLIGHT_EMISSIVE_COLOR = 0x999999;
var OUTLINE_COLOR = exports.OUTLINE_COLOR = 0x999999;
var DEFAULT_BACK = exports.DEFAULT_BACK = 0x1a1a1a;
var HIGHLIGHT_BACK = exports.HIGHLIGHT_BACK = 0x313131;
var INACTIVE_COLOR = exports.INACTIVE_COLOR = 0x161829;
var CONTROLLER_ID_SLIDER = exports.CONTROLLER_ID_SLIDER = 0x2fa1d6;
var CONTROLLER_ID_CHECKBOX = exports.CONTROLLER_ID_CHECKBOX = 0x806787;
var CONTROLLER_ID_BUTTON = exports.CONTROLLER_ID_BUTTON = 0xe61d5f;
var CONTROLLER_ID_TEXT = exports.CONTROLLER_ID_TEXT = 0x1ed36f;
var CONTROLLER_ID_DROPDOWN = exports.CONTROLLER_ID_DROPDOWN = 0xfff000;
var DROPDOWN_BG_COLOR = exports.DROPDOWN_BG_COLOR = 0xffffff;
var DROPDOWN_FG_COLOR = exports.DROPDOWN_FG_COLOR = 0x000000;
var CHECKBOX_BG_COLOR = exports.CHECKBOX_BG_COLOR = 0xffffff;
var BUTTON_COLOR = exports.BUTTON_COLOR = 0xe61d5f;
var BUTTON_HIGHLIGHT_COLOR = exports.BUTTON_HIGHLIGHT_COLOR = 0xfa3173;
var SLIDER_BG = exports.SLIDER_BG = 0x444444;

function colorizeGeometry(geometry, color) {
  geometry.faces.forEach(function (face) {
    face.color.setHex(color);
  });
  geometry.colorsNeedUpdate = true;
  return geometry;
}

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createCheckbox;

var _textlabel = require('./textlabel');

var _textlabel2 = _interopRequireDefault(_textlabel);

var _interaction = require('./interaction');

var _interaction2 = _interopRequireDefault(_interaction);

var _colors = require('./colors');

var Colors = _interopRequireWildcard(_colors);

var _layout = require('./layout');

var Layout = _interopRequireWildcard(_layout);

var _graphic = require('./graphic');

var Graphic = _interopRequireWildcard(_graphic);

var _sharedmaterials = require('./sharedmaterials');

var SharedMaterials = _interopRequireWildcard(_sharedmaterials);

var _grab = require('./grab');

var Grab = _interopRequireWildcard(_grab);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
                                                                                                                                                                                                    * dat-guiVR Javascript Controller Library for VR
                                                                                                                                                                                                    * https://github.com/dataarts/dat.guiVR
                                                                                                                                                                                                    *
                                                                                                                                                                                                    * Copyright 2016 Data Arts Team, Google Inc.
                                                                                                                                                                                                    *
                                                                                                                                                                                                    * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                    * you may not use this file except in compliance with the License.
                                                                                                                                                                                                    * You may obtain a copy of the License at
                                                                                                                                                                                                    *
                                                                                                                                                                                                    *     http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                    *
                                                                                                                                                                                                    * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                    * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                    * See the License for the specific language governing permissions and
                                                                                                                                                                                                    * limitations under the License.
                                                                                                                                                                                                    */

function createCheckbox() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      textCreator = _ref.textCreator,
      object = _ref.object,
      _ref$propertyName = _ref.propertyName,
      propertyName = _ref$propertyName === undefined ? 'undefined' : _ref$propertyName,
      _ref$initialValue = _ref.initialValue,
      initialValue = _ref$initialValue === undefined ? false : _ref$initialValue,
      _ref$options = _ref.options,
      options = _ref$options === undefined ? [] : _ref$options,
      _ref$width = _ref.width,
      width = _ref$width === undefined ? Layout.PANEL_WIDTH : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === undefined ? Layout.PANEL_HEIGHT : _ref$height,
      _ref$depth = _ref.depth,
      depth = _ref$depth === undefined ? Layout.PANEL_DEPTH : _ref$depth;

  var state = {
    open: false,
    listen: false
  };

  var DROPDOWN_WIDTH = width * 0.5 - Layout.PANEL_MARGIN;
  var DROPDOWN_HEIGHT = height - Layout.PANEL_MARGIN;
  var DROPDOWN_DEPTH = depth;
  var DROPDOWN_OPTION_HEIGHT = height - Layout.PANEL_MARGIN * 1.2;
  var DROPDOWN_MARGIN = Layout.PANEL_MARGIN * -0.4;

  var group = new THREE.Group();

  var panel = Layout.createPanel(width, height, depth);
  group.add(panel);

  group.hitscan = [panel];

  var labelInteractions = [];
  var optionLabels = [];

  //  find actually which label is selected
  var initialLabel = findLabelFromProp();

  function findLabelFromProp() {
    if (Array.isArray(options)) {
      return options.find(function (optionName) {
        return optionName === object[propertyName];
      });
    } else {
      return Object.keys(options).find(function (optionName) {
        return object[propertyName] === options[optionName];
      });
    }
  }

  function createOption(labelText, isOption) {
    var label = (0, _textlabel2.default)(textCreator, labelText, DROPDOWN_WIDTH, depth, Colors.DROPDOWN_FG_COLOR, Colors.DROPDOWN_BG_COLOR, 0.866);

    group.hitscan.push(label.back);
    var labelInteraction = (0, _interaction2.default)(label.back);
    labelInteractions.push(labelInteraction);
    optionLabels.push(label);

    if (isOption) {
      labelInteraction.events.on('onPressed', function (p) {
        selectedLabel.setString(labelText);

        var propertyChanged = false;

        if (Array.isArray(options)) {
          propertyChanged = object[propertyName] !== labelText;
          if (propertyChanged) {
            object[propertyName] = labelText;
          }
        } else {
          propertyChanged = object[propertyName] !== options[labelText];
          if (propertyChanged) {
            object[propertyName] = options[labelText];
          }
        }

        collapseOptions();
        state.open = false;

        if (onChangedCB && propertyChanged) {
          onChangedCB(object[propertyName]);
        }

        p.locked = true;
      });
    } else {
      labelInteraction.events.on('onPressed', function (p) {
        if (state.open === false) {
          openOptions();
          state.open = true;
        } else {
          collapseOptions();
          state.open = false;
        }

        p.locked = true;
      });
    }
    label.isOption = isOption;
    return label;
  }

  function collapseOptions() {
    optionLabels.forEach(function (label) {
      if (label.isOption) {
        label.visible = false;
        label.back.visible = false;
      }
    });
  }

  function openOptions() {
    optionLabels.forEach(function (label) {
      if (label.isOption) {
        label.visible = true;
        label.back.visible = true;
      }
    });
  }

  //  base option
  var selectedLabel = createOption(initialLabel, false);
  selectedLabel.position.x = Layout.PANEL_MARGIN * 0.5 + width * 0.5;
  selectedLabel.position.z = depth;

  var downArrow = Graphic.downArrow();
  // Colors.colorizeGeometry( downArrow.geometry, Colors.DROPDOWN_FG_COLOR );
  downArrow.position.set(DROPDOWN_WIDTH - 0.04, 0, depth * 1.01);
  selectedLabel.add(downArrow);

  function configureLabelPosition(label, index) {
    label.position.y = -DROPDOWN_MARGIN - (index + 1) * DROPDOWN_OPTION_HEIGHT;
    label.position.z = depth;
  }

  function optionToLabel(optionName, index) {
    var optionLabel = createOption(optionName, true);
    configureLabelPosition(optionLabel, index);
    return optionLabel;
  }

  if (Array.isArray(options)) {
    selectedLabel.add.apply(selectedLabel, _toConsumableArray(options.map(optionToLabel)));
  } else {
    selectedLabel.add.apply(selectedLabel, _toConsumableArray(Object.keys(options).map(optionToLabel)));
  }

  collapseOptions();

  var descriptorLabel = textCreator.create(propertyName);
  descriptorLabel.position.x = Layout.PANEL_LABEL_TEXT_MARGIN;
  descriptorLabel.position.z = depth;
  descriptorLabel.position.y = -0.03;

  var controllerID = Layout.createControllerIDBox(height, Colors.CONTROLLER_ID_DROPDOWN);
  controllerID.position.z = depth;

  var borderBox = Layout.createPanel(DROPDOWN_WIDTH + Layout.BORDER_THICKNESS, DROPDOWN_HEIGHT + Layout.BORDER_THICKNESS * 0.5, DROPDOWN_DEPTH, true);
  borderBox.material.color.setHex(0x1f7ae7);
  borderBox.position.x = -Layout.BORDER_THICKNESS * 0.5 + width * 0.5;
  borderBox.position.z = depth * 0.5;

  panel.add(descriptorLabel, controllerID, selectedLabel, borderBox);

  updateView();

  function updateView() {

    labelInteractions.forEach(function (interaction, index) {
      var label = optionLabels[index];
      if (label.isOption) {
        if (interaction.hovering()) {
          Colors.colorizeGeometry(label.back.geometry, Colors.HIGHLIGHT_COLOR);
        } else {
          Colors.colorizeGeometry(label.back.geometry, Colors.DROPDOWN_BG_COLOR);
        }
      }
    });

    if (labelInteractions[0].hovering() || state.open) {
      borderBox.visible = true;
    } else {
      borderBox.visible = false;
    }
  }

  var onChangedCB = void 0;
  var onFinishChangeCB = void 0;

  group.onChange = function (callback) {
    onChangedCB = callback;
    return group;
  };

  var grabInteraction = Grab.create({ group: group, panel: panel });

  group.listen = function () {
    state.listen = true;
    return group;
  };

  group.update = function (inputObjects) {
    if (state.listen) {
      selectedLabel.setString(findLabelFromProp());
    }
    labelInteractions.forEach(function (labelInteraction) {
      labelInteraction.update(inputObjects);
    });
    grabInteraction.update(inputObjects);
    updateView();
  };

  group.name = function (str) {
    descriptorLabel.update(str);
    return group;
  };

  return group;
}

},{"./colors":3,"./grab":7,"./graphic":8,"./interaction":11,"./layout":12,"./sharedmaterials":15,"./textlabel":17}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createFolder;

var _textlabel = require('./textlabel');

var _textlabel2 = _interopRequireDefault(_textlabel);

var _interaction = require('./interaction');

var _interaction2 = _interopRequireDefault(_interaction);

var _colors = require('./colors');

var Colors = _interopRequireWildcard(_colors);

var _layout = require('./layout');

var Layout = _interopRequireWildcard(_layout);

var _graphic = require('./graphic');

var Graphic = _interopRequireWildcard(_graphic);

var _sharedmaterials = require('./sharedmaterials');

var SharedMaterials = _interopRequireWildcard(_sharedmaterials);

var _grab = require('./grab');

var Grab = _interopRequireWildcard(_grab);

var _palette = require('./palette');

var Palette = _interopRequireWildcard(_palette);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* dat-guiVR Javascript Controller Library for VR
* https://github.com/dataarts/dat.guiVR
*
* Copyright 2016 Data Arts Team, Google Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

function createFolder() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      textCreator = _ref.textCreator,
      name = _ref.name,
      guiAdd = _ref.guiAdd,
      addSlider = _ref.addSlider,
      addDropdown = _ref.addDropdown,
      addCheckbox = _ref.addCheckbox,
      addButton = _ref.addButton,
      addImageButton = _ref.addImageButton;

  var width = Layout.FOLDER_WIDTH;
  var depth = Layout.PANEL_DEPTH;

  var state = {
    collapsed: false,
    previousParent: undefined
  };

  var group = new THREE.Group();
  var collapseGroup = new THREE.Group();
  group.add(collapseGroup);
  // function addDebugBox() {
  //   const box = Layout.createPanel(0.01, 0.01, 0.02, true);
  //   box.material.color.setHex(0x00ff00);
  //   //Colors.colorizeGeometry( box.geometry,  );
  //   group.add(box);
  // }
  // addDebugBox();

  //expose as public interface so that children can call it when their spacing changes
  group.performLayout = performLayout;

  //  Yeah. Gross.  
  //PJT: Would probably be better to have the THREE object be a member
  //rather than just adding properties to it in dodgy ways.
  var addOriginal = THREE.Group.prototype.add;

  function addImpl(o) {
    addOriginal.call(group, o);
  }

  addImpl(collapseGroup);

  var panel = Layout.createPanel(width, Layout.FOLDER_HEIGHT, depth, true);
  addImpl(panel);

  var descriptorLabel = textCreator.create(name);
  descriptorLabel.position.x = Layout.PANEL_LABEL_TEXT_MARGIN * 1.5;
  descriptorLabel.position.y = -0.03;
  descriptorLabel.position.z = depth;
  panel.add(descriptorLabel);

  var downArrow = Layout.createDownArrow();
  Colors.colorizeGeometry(downArrow.geometry, 0xffffff);
  downArrow.position.set(0.05, 0, depth * 1.01);
  panel.add(downArrow);

  //PJT: this grabber should really belong to 'gui' rather than folder
  var grabber = Layout.createPanel(width, Layout.FOLDER_GRAB_HEIGHT, depth, true);
  grabber.position.y = Layout.FOLDER_HEIGHT * 0.86; //XXX: magic number
  grabber.name = 'grabber';
  addImpl(grabber);

  var grabBar = Graphic.grabBar();
  grabBar.position.set(width * 0.5, 0, depth * 1.001);
  grabber.add(grabBar);
  group.isFolder = true;
  group.hideGrabber = function () {
    grabber.visible = false;
  };

  group.add = function () {
    var newController = guiAdd.apply(undefined, arguments);

    if (newController) {
      group.addController(newController);
      return newController;
    } else {
      return new THREE.Group();
    }
  };

  group.addController = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    args.forEach(function (obj) {
      // PJT: not sure what purpose this extra group has.
      // const container = new THREE.Group();
      // if (obj.spacing) container.spacing = obj.spacing;
      // container.add( obj );
      // collapseGroup.add( container );
      collapseGroup.add(obj);
      obj.folder = group;
      //quick & dirty hack to hide grabBar
      //if (obj.children[2]) obj.children[2].visible = false;
      if (obj.hideGrabber) obj.hideGrabber();
    });

    performLayout();
  };

  function performLayout() {
    var spacingPerController = Layout.PANEL_HEIGHT + Layout.PANEL_SPACING;
    var y = 0,
        lastHeight = spacingPerController,
        totalSpacing = spacingPerController;
    collapseGroup.children.forEach(function (child, index) {
      var h = child.spacing ? child.spacing : spacingPerController;
      var spacing = 0.5 * (lastHeight + h);
      var lastY = y;
      // for the next child to be in right place, y needs to move by full spacing...
      y -= spacing;

      lastHeight = h;
      // but for folders, the origin needs to be in the middle of the top row,
      // not the middle of the whole object...
      child.position.y = child.isFolder ? lastY - spacingPerController : y;
      child.position.x = 0.026;
      if (state.collapsed) {
        child.visible = false;
      } else {
        totalSpacing += h;
        child.visible = true;
      }
    });

    if (state.collapsed) {
      downArrow.rotation.z = Math.PI * 0.5;
    } else {
      downArrow.rotation.z = 0;
    }

    group.spacing = totalSpacing;
    if (state.collapsed) group.spacing = spacingPerController;

    //make sure parent folder also performs layout.
    if (group.folder !== group) group.folder.performLayout();
  }

  function updateView() {
    if (interaction.hovering()) {
      panel.material.color.setHex(Colors.HIGHLIGHT_BACK);
    } else {
      panel.material.color.setHex(Colors.DEFAULT_BACK);
    }

    if (grabInteraction.hovering()) {
      grabber.material.color.setHex(Colors.HIGHLIGHT_BACK);
    } else {
      grabber.material.color.setHex(Colors.DEFAULT_BACK);
    }
  }

  var interaction = (0, _interaction2.default)(panel);
  interaction.events.on('onPressed', function (p) {
    state.collapsed = !state.collapsed;
    performLayout();
    p.locked = true;
  });

  group.folder = group;

  var grabInteraction = Grab.create({ group: group, panel: grabber });
  var paletteInteraction = Palette.create({ group: group, panel: panel });

  group.update = function (inputObjects) {
    interaction.update(inputObjects);
    grabInteraction.update(inputObjects);
    paletteInteraction.update(inputObjects);

    updateView();
  };

  group.name = function (str) {
    descriptorLabel.update(str);
    return group;
  };

  group.hitscan = [panel, grabber];

  group.beingMoved = false;

  group.addSlider = function () {
    var controller = addSlider.apply(undefined, arguments);
    if (controller) {
      group.addController(controller);
      return controller;
    } else {
      return new THREE.Group();
    }
  };
  group.addDropdown = function () {
    var controller = addDropdown.apply(undefined, arguments);
    if (controller) {
      group.addController(controller);
      return controller;
    } else {
      return new THREE.Group();
    }
  };
  group.addCheckbox = function () {
    var controller = addCheckbox.apply(undefined, arguments);
    if (controller) {
      group.addController(controller);
      return controller;
    } else {
      return new THREE.Group();
    }
  };
  group.addButton = function () {
    var controller = addButton.apply(undefined, arguments);
    if (controller) {
      group.addController(controller);
      return controller;
    } else {
      return new THREE.Group();
    }
  };
  group.addImageButton = function () {
    var controller = addImageButton.apply(undefined, arguments);
    if (controller) {
      group.addController(controller);
      return controller;
    } else {
      return new THREE.Group();
    }
  };

  return group;
}

},{"./colors":3,"./grab":7,"./graphic":8,"./interaction":11,"./layout":12,"./palette":13,"./sharedmaterials":15,"./textlabel":17}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.image = image;
exports.fnt = fnt;
/**
* dat-guiVR Javascript Controller Library for VR
* https://github.com/dataarts/dat.guiVR
*
* Copyright 2016 Data Arts Team, Google Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

function image() {
  var image = new Image();
  image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAEACAMAAADyTj5VAAAAjVBMVEVHcEz///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+umAc7AAAAL3RSTlMAWnJfbnqDWGR4a2ZcYnBRalRLgH6ETnR8UGh2RoZDXlaHSYo8QHU2LyYcFAwFmmUR1OIAAJFhSURBVHhetL2JWmu7jjUKIQkkQLqZvgMCZO2zT/33/R/vSkNDkj2TrOarVd5V6xDP3pJlWdKQ7qaPb6+vrw8vj+PZ/vvrxz///Pj63s/G7/cP2n0/XZ6Op6X8fJHfaG/3j9q5X/LKt/t3v/QfufQk/Xoubolz/Dq5LH7y1nLVl9xeH4b28jidncZy/ZM0P+Wff/7zn//8++9//sG5Uztav3H1inJIXkle8Qvn3+OROP2oj5OPmz7ev+m5PDDFyXan/UwewBd8124ZDn2o3eTBBmCKAzZQfjY75WX//Y+/Kj6Ln77//uF3r24vHyfP5ae9cRRsaH5I/48veQqP5Kh9X9z86wvn+wjhZfmYjTzmyBflSOBz5V1lXO8eH54mw8nzK8dTHsnPepbupwft1Vu+PslvaZPts73FaWxXbp/iUjx/I9SUc3HLqZ2DhntVP0ERfN79q918+/T2uFlO8ew8BW+qw4Rz5RZbOTp5fsJj+dTqFZ/llTAquLc+Em8jA/4dA/S89c95khEh8ZTYm8e3p+0QV9xP5f5fQjU8VLueJ3ite9CT9Lezn5ID+Kp8tB3EmOfdefsl580PY1WMDkaBNFXqH5VjeSSG5HjRdTzq+eAMjP+EL8vHyCSzFzW6LE96Prjv7uVpMup0uluMp7IpuWXb7XQ6wycZttkUb93toI269rHLKa8cbp0UnM2vTxM9t/v88IhzeN3k6SV/4tbyZse9fd4Qfd2JvO7m8eG5W57yDRbArMK5uDveGCT9Qb7IV+zaGM72xxPuPcLpSs8j59nzpBufM3x24nHavtoDhnIP6SXV8N64aDQkPTlRtnb2s99E39RfdRifrrwknbw7bo/JhXlLwelPmciT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";
  return image;
}

function fnt() {
  return "info face=\"Roboto\" size=192 bold=0 italic=0 charset=\"\" unicode=1 stretchH=100 smooth=1 aa=1 padding=24,24,24,24 spacing=12,12 outline=0\ncommon lineHeight=192 base=152 scaleW=3072 scaleH=1536 pages=1 packed=0 alphaChnl=0 redChnl=4 greenChnl=4 blueChnl=4\npage id=0 file=\"roboto_0.png\"\nchars count=194\nchar id=0    x=636   y=1438  width=48    height=49    xoffset=-24   yoffset=167   xadvance=0     page=0  chnl=15\nchar id=2    x=576   y=1438  width=48    height=49    xoffset=-24   yoffset=167   xadvance=0     page=0  chnl=15\nchar id=13   x=450   y=1439  width=51    height=49    xoffset=-25   yoffset=167   xadvance=40    page=0  chnl=15\nchar id=32   x=2987  y=1242  width=51    height=49    xoffset=-25   yoffset=167   xadvance=40    page=0  chnl=15\nchar id=33   x=1714  y=769   width=66    height=163   xoffset=-12   yoffset=14    xadvance=41    page=0  chnl=15\nchar id=34   x=1999  y=1263  width=81    height=87    xoffset=-14   yoffset=8     xadvance=51    page=0  chnl=15\nchar id=35   x=1214  y=951   width=136   height=162   xoffset=-15   yoffset=14    xadvance=99    page=0  chnl=15\nchar id=36   x=1610  y=0     width=122   height=196   xoffset=-16   yoffset=-4    xadvance=90    page=0  chnl=15\nchar id=37   x=1341  y=595   width=152   height=165   xoffset=-17   yoffset=13    xadvance=117   page=0  chnl=15\nchar id=38   x=1658  y=592   width=141   height=165   xoffset=-17   yoffset=13    xadvance=99    page=0  chnl=15\nchar id=39   x=2092  y=1263  width=62    height=85    xoffset=-17   yoffset=8     xadvance=28    page=0  chnl=15\nchar id=40   x=103   y=0     width=90    height=213   xoffset=-14   yoffset=0     xadvance=55    page=0  chnl=15\nchar id=41   x=0     y=0     width=91    height=213   xoffset=-22   yoffset=0     xadvance=56    page=0  chnl=15\nchar id=42   x=664   y=1294  width=114   height=114   xoffset=-23   yoffset=14    xadvance=69    page=0  chnl=15\nchar id=43   x=0     y=1317  width=128   height=129   xoffset=-19   yoffset=34    xadvance=91    page=0  chnl=15\nchar id=44   x=1916  y=1264  width=71    height=88    xoffset=-22   yoffset=111   xadvance=31    page=0  chnl=15\nchar id=45   x=233   y=1457  width=88    height=60    xoffset=-22   yoffset=74    xadvance=44    page=0  chnl=15\nchar id=46   x=2828  y=1245  width=68    height=65    xoffset=-14   yoffset=112   xadvance=42    page=0  chnl=15\nchar id=47   x=0     y=429   width=109   height=172   xoffset=-23   yoffset=14    xadvance=66    page=0  chnl=15\nchar id=48   x=2392  y=583   width=122   height=165   xoffset=-16   yoffset=13    xadvance=90    page=0  chnl=15\nchar id=49   x=112   y=1143  width=93    height=162   xoffset=-11   yoffset=14    xadvance=90    page=0  chnl=15\nchar id=50   x=1443  y=772   width=126   height=163   xoffset=-17   yoffset=13    xadvance=90    page=0  chnl=15\nchar id=51   x=2660  y=575   width=121   height=165   xoffset=-17   yoffset=13    xadvance=90    page=0  chnl=15\nchar id=52   x=1794  y=943   width=132   height=162   xoffset=-21   yoffset=14    xadvance=90    page=0  chnl=15\nchar id=53   x=539   y=779   width=121   height=164   xoffset=-13   yoffset=14    xadvance=90    page=0  chnl=15\nchar id=54   x=406   y=779   width=121   height=164   xoffset=-14   yoffset=14    xadvance=90    page=0  chnl=15\nchar id=55   x=2082  y=941   width=127   height=162   xoffset=-19   yoffset=14    xadvance=90    page=0  chnl=15\nchar id=56   x=2526  y=581   width=122   height=165   xoffset=-16   yoffset=13    xadvance=90    page=0  chnl=15\nchar id=57   x=1581  y=771   width=121   height=163   xoffset=-17   yoffset=13    xadvance=90    page=0  chnl=15\nchar id=58   x=2383  y=1113  width=67    height=134   xoffset=-14   yoffset=43    xadvance=39    page=0  chnl=15\nchar id=59   x=372   y=1140  width=73    height=156   xoffset=-22   yoffset=43    xadvance=34    page=0  chnl=15\nchar id=60   x=539   y=1307  width=113   height=119   xoffset=-19   yoffset=42    xadvance=81    page=0  chnl=15\nchar id=61   x=1688  y=1269  width=115   height=93    xoffset=-13   yoffset=51    xadvance=88    page=0  chnl=15\nchar id=62   x=411   y=1308  width=116   height=119   xoffset=-14   yoffset=42    xadvance=84    page=0  chnl=15\nchar id=63   x=800   y=779   width=113   height=164   xoffset=-19   yoffset=13    xadvance=76    page=0  chnl=15\nchar id=64   x=1421  y=0     width=177   height=196   xoffset=-16   yoffset=16    xadvance=144   page=0  chnl=15\nchar id=65   x=2708  y=752   width=150   height=162   xoffset=-23   yoffset=14    xadvance=104   page=0  chnl=15\nchar id=66   x=2221  y=939   width=127   height=162   xoffset=-12   yoffset=14    xadvance=100   page=0  chnl=15\nchar id=67   x=1811  y=592   width=137   height=165   xoffset=-15   yoffset=13    xadvance=104   page=0  chnl=15\nchar id=68   x=1650  y=946   width=132   height=162   xoffset=-12   yoffset=14    xadvance=105   page=0  chnl=15\nchar id=69   x=2496  y=934   width=122   height=162   xoffset=-12   yoffset=14    xadvance=91    page=0  chnl=15\nchar id=70   x=2630  y=932   width=120   height=162   xoffset=-12   yoffset=14    xadvance=88    page=0  chnl=15\nchar id=71   x=1960  y=590   width=137   height=165   xoffset=-15   yoffset=13    xadvance=109   page=0  chnl=15\nchar id=72   x=916   y=955   width=137   height=162   xoffset=-12   yoffset=14    xadvance=114   page=0  chnl=15\nchar id=73   x=296   y=1142  width=64    height=162   xoffset=-10   yoffset=14    xadvance=44    page=0  chnl=15\nchar id=74   x=272   y=790   width=122   height=164   xoffset=-21   yoffset=14    xadvance=88    page=0  chnl=15\nchar id=75   x=767   y=955   width=137   height=162   xoffset=-12   yoffset=14    xadvance=100   page=0  chnl=15\nchar id=76   x=2762  y=926   width=119   height=162   xoffset=-12   yoffset=14    xadvance=86    page=0  chnl=15\nchar id=77   x=2197  y=765   width=163   height=162   xoffset=-12   yoffset=14    xadvance=140   page=0  chnl=15\nchar id=78   x=1065  y=952   width=137   height=162   xoffset=-12   yoffset=14    xadvance=114   page=0  chnl=15\nchar id=79   x=1505  y=594   width=141   height=165   xoffset=-16   yoffset=13    xadvance=110   page=0  chnl=15\nchar id=80   x=1938  y=943   width=132   height=162   xoffset=-12   yoffset=14    xadvance=101   page=0  chnl=15\nchar id=81   x=2222  y=207   width=141   height=183   xoffset=-16   yoffset=13    xadvance=110   page=0  chnl=15\nchar id=82   x=1362  y=949   width=132   height=162   xoffset=-11   yoffset=14    xadvance=99    page=0  chnl=15\nchar id=83   x=2109  y=588   width=132   height=165   xoffset=-18   yoffset=13    xadvance=95    page=0  chnl=15\nchar id=84   x=617   y=955   width=138   height=162   xoffset=-21   yoffset=14    xadvance=95    page=0  chnl=15\nchar id=85   x=128   y=792   width=132   height=164   xoffset=-14   yoffset=14    xadvance=104   page=0  chnl=15\nchar id=86   x=2870  y=749   width=147   height=162   xoffset=-22   yoffset=14    xadvance=102   page=0  chnl=15\nchar id=87   x=2002  y=767   width=183   height=162   xoffset=-20   yoffset=14    xadvance=142   page=0  chnl=15\nchar id=88   x=312   y=966   width=141   height=162   xoffset=-20   yoffset=14    xadvance=100   page=0  chnl=15\nchar id=89   x=157   y=968   width=143   height=162   xoffset=-24   yoffset=14    xadvance=96    page=0  chnl=15\nchar id=90   x=1506  y=947   width=132   height=162   xoffset=-18   yoffset=14    xadvance=96    page=0  chnl=15\nchar id=91   x=658   y=0     width=79    height=202   xoffset=-13   yoffset=-2    xadvance=42    page=0  chnl=15\nchar id=92   x=2945  y=204   width=111   height=172   xoffset=-22   yoffset=14    xadvance=66    page=0  chnl=15\nchar id=93   x=567   y=0     width=79    height=202   xoffset=-24   yoffset=-2    xadvance=42    page=0  chnl=15\nchar id=94   x=1570  y=1271  width=106   height=105   xoffset=-20   yoffset=14    xadvance=67    page=0  chnl=15\nchar id=95   x=0     y=1458  width=121   height=60    xoffset=-24   yoffset=128   xadvance=72    page=0  chnl=15\nchar id=96   x=2622  y=1258  width=82    height=71    xoffset=-20   yoffset=8     xadvance=49    page=0  chnl=15\nchar id=97   x=1585  y=1121  width=119   height=136   xoffset=-16   yoffset=42    xadvance=87    page=0  chnl=15\nchar id=98   x=677   y=418   width=121   height=170   xoffset=-14   yoffset=8     xadvance=90    page=0  chnl=15\nchar id=99   x=1453  y=1123  width=120   height=136   xoffset=-17   yoffset=42    xadvance=84    page=0  chnl=15\nchar id=100  x=1209  y=413   width=120   height=170   xoffset=-17   yoffset=8     xadvance=90    page=0  chnl=15\nchar id=101  x=1320  y=1125  width=121   height=136   xoffset=-17   yoffset=42    xadvance=85    page=0  chnl=15\nchar id=102  x=1866  y=408   width=101   height=170   xoffset=-20   yoffset=6     xadvance=56    page=0  chnl=15\nchar id=103  x=134   y=612   width=121   height=167   xoffset=-17   yoffset=42    xadvance=90    page=0  chnl=15\nchar id=104  x=2627  y=395   width=116   height=168   xoffset=-14   yoffset=8     xadvance=88    page=0  chnl=15\nchar id=105  x=1050  y=776   width=67    height=164   xoffset=-14   yoffset=12    xadvance=39    page=0  chnl=15\nchar id=106  x=1327  y=0     width=82    height=198   xoffset=-30   yoffset=12    xadvance=38    page=0  chnl=15\nchar id=107  x=2495  y=401   width=120   height=168   xoffset=-14   yoffset=8     xadvance=81    page=0  chnl=15\nchar id=108  x=2755  y=392   width=64    height=168   xoffset=-13   yoffset=8     xadvance=39    page=0  chnl=15\nchar id=109  x=1973  y=1117  width=168   height=134   xoffset=-14   yoffset=42    xadvance=140   page=0  chnl=15\nchar id=110  x=2153  y=1115  width=116   height=134   xoffset=-14   yoffset=42    xadvance=88    page=0  chnl=15\nchar id=111  x=1181  y=1126  width=127   height=136   xoffset=-18   yoffset=42    xadvance=91    page=0  chnl=15\nchar id=112  x=267   y=611   width=121   height=167   xoffset=-14   yoffset=42    xadvance=90    page=0  chnl=15\nchar id=113  x=400   y=600   width=120   height=167   xoffset=-17   yoffset=42    xadvance=91    page=0  chnl=15\nchar id=114  x=2281  y=1113  width=90    height=134   xoffset=-14   yoffset=42    xadvance=54    page=0  chnl=15\nchar id=115  x=1716  y=1120  width=117   height=136   xoffset=-17   yoffset=42    xadvance=83    page=0  chnl=15\nchar id=116  x=457   y=1140  width=95    height=155   xoffset=-24   yoffset=23    xadvance=52    page=0  chnl=15\nchar id=117  x=1845  y=1117  width=116   height=135   xoffset=-14   yoffset=43    xadvance=88    page=0  chnl=15\nchar id=118  x=2772  y=1100  width=122   height=133   xoffset=-22   yoffset=43    xadvance=78    page=0  chnl=15\nchar id=119  x=2462  y=1113  width=163   height=133   xoffset=-22   yoffset=43    xadvance=120   page=0  chnl=15\nchar id=120  x=2637  y=1106  width=123   height=133   xoffset=-22   yoffset=43    xadvance=79    page=0  chnl=15\nchar id=121  x=0     y=613   width=122   height=167   xoffset=-23   yoffset=43    xadvance=76    page=0  chnl=15\nchar id=122  x=2906  y=1097  width=117   height=133   xoffset=-18   yoffset=43    xadvance=79    page=0  chnl=15\nchar id=123  x=458   y=0     width=97    height=202   xoffset=-20   yoffset=3     xadvance=54    page=0  chnl=15\nchar id=124  x=2451  y=206   width=61    height=183   xoffset=-11   yoffset=14    xadvance=39    page=0  chnl=15\nchar id=125  x=349   y=0     width=97    height=202   xoffset=-23   yoffset=3     xadvance=54    page=0  chnl=15\nchar id=126  x=2378  y=1259  width=138   height=79    xoffset=-14   yoffset=65    xadvance=109   page=0  chnl=15\nchar id=160  x=513   y=1439  width=51    height=49    xoffset=-25   yoffset=167   xadvance=40    page=0  chnl=15\nchar id=161  x=217   y=1142  width=67    height=162   xoffset=-14   yoffset=42    xadvance=39    page=0  chnl=15\nchar id=162  x=1341  y=413   width=120   height=170   xoffset=-16   yoffset=25    xadvance=88    page=0  chnl=15\nchar id=163  x=1300  y=774   width=131   height=163   xoffset=-18   yoffset=13    xadvance=93    page=0  chnl=15\nchar id=164  x=702   y=1129  width=149   height=149   xoffset=-17   yoffset=30    xadvance=114   page=0  chnl=15\nchar id=165  x=465   y=955   width=140   height=162   xoffset=-22   yoffset=14    xadvance=97    page=0  chnl=15\nchar id=166  x=2375  y=206   width=64    height=183   xoffset=-13   yoffset=14    xadvance=38    page=0  chnl=15\nchar id=167  x=205   y=0     width=132   height=202   xoffset=-18   yoffset=13    xadvance=98    page=0  chnl=15\nchar id=168  x=2716  y=1251  width=100   height=65    xoffset=-17   yoffset=12    xadvance=67    page=0  chnl=15\nchar id=169  x=995   y=599   width=161   height=165   xoffset=-18   yoffset=13    xadvance=126   page=0  chnl=15\nchar id=170  x=1368  y=1273  width=99    height=109   xoffset=-13   yoffset=13    xadvance=71    page=0  chnl=15\nchar id=171  x=1131  y=1277  width=110   height=110   xoffset=-17   yoffset=54    xadvance=75    page=0  chnl=15\nchar id=172  x=2251  y=1261  width=115   height=81    xoffset=-15   yoffset=65    xadvance=89    page=0  chnl=15\nchar id=173  x=133   y=1458  width=88    height=60    xoffset=-22   yoffset=74    xadvance=44    page=0  chnl=15\nchar id=174  x=1168  y=597   width=161   height=165   xoffset=-18   yoffset=13    xadvance=126   page=0  chnl=15\nchar id=175  x=333   y=1448  width=105   height=59    xoffset=-15   yoffset=14    xadvance=73    page=0  chnl=15\nchar id=176  x=1815  y=1268  width=89    height=88    xoffset=-15   yoffset=13    xadvance=60    page=0  chnl=15\nchar id=177  x=863   y=1129  width=121   height=147   xoffset=-17   yoffset=29    xadvance=85    page=0  chnl=15\nchar id=178  x=899   y=1288  width=97    height=111   xoffset=-19   yoffset=13    xadvance=59    page=0  chnl=15\nchar id=179  x=790   y=1290  width=97    height=112   xoffset=-20   yoffset=13    xadvance=59    page=0  chnl=15\nchar id=180  x=2528  y=1258  width=82    height=71    xoffset=-15   yoffset=8     xadvance=50    page=0  chnl=15\nchar id=181  x=866   y=599   width=117   height=166   xoffset=-13   yoffset=43    xadvance=91    page=0  chnl=15\nchar id=182  x=2893  y=923   width=110   height=162   xoffset=-20   yoffset=14    xadvance=78    page=0  chnl=15\nchar id=183  x=2908  y=1242  width=67    height=65    xoffset=-13   yoffset=62    xadvance=42    page=0  chnl=15\nchar id=184  x=2166  y=1261  width=73    height=82    xoffset=-15   yoffset=128   xadvance=40    page=0  chnl=15\nchar id=185  x=1479  y=1271  width=79    height=109   xoffset=-15   yoffset=14    xadvance=59    page=0  chnl=15\nchar id=186  x=1253  y=1274  width=103   height=109   xoffset=-15   yoffset=13    xadvance=73    page=0  chnl=15\nchar id=187  x=1008  y=1277  width=111   height=110   xoffset=-17   yoffset=54    xadvance=75    page=0  chnl=15\nchar id=188  x=2542  y=758   width=154   height=162   xoffset=-18   yoffset=14    xadvance=117   page=0  chnl=15\nchar id=189  x=2372  y=760   width=158   height=162   xoffset=-18   yoffset=14    xadvance=124   page=0  chnl=15\nchar id=190  x=1129  y=776   width=159   height=163   xoffset=-16   yoffset=13    xadvance=124   page=0  chnl=15\nchar id=191  x=925   y=777   width=113   height=164   xoffset=-19   yoffset=42    xadvance=76    page=0  chnl=15\nchar id=192  x=162   y=225   width=150   height=192   xoffset=-23   yoffset=-16   xadvance=104   page=0  chnl=15\nchar id=193  x=324   y=214   width=150   height=192   xoffset=-23   yoffset=-16   xadvance=104   page=0  chnl=15\nchar id=194  x=0     y=225   width=150   height=192   xoffset=-23   yoffset=-16   xadvance=104   page=0  chnl=15\nchar id=195  x=1359  y=210   width=150   height=190   xoffset=-23   yoffset=-14   xadvance=104   page=0  chnl=15\nchar id=196  x=1814  y=208   width=150   height=188   xoffset=-23   yoffset=-12   xadvance=104   page=0  chnl=15\nchar id=197  x=1016  y=0     width=150   height=199   xoffset=-23   yoffset=-23   xadvance=104   page=0  chnl=15\nchar id=198  x=1792  y=769   width=198   height=162   xoffset=-26   yoffset=14    xadvance=150   page=0  chnl=15\nchar id=199  x=1178  y=0     width=137   height=198   xoffset=-15   yoffset=13    xadvance=104   page=0  chnl=15\nchar id=200  x=2922  y=0     width=122   height=192   xoffset=-12   yoffset=-16   xadvance=91    page=0  chnl=15\nchar id=201  x=641   y=214   width=122   height=192   xoffset=-12   yoffset=-16   xadvance=91    page=0  chnl=15\nchar id=202  x=775   y=213   width=122   height=192   xoffset=-12   yoffset=-16   xadvance=91    page=0  chnl=15\nchar id=203  x=1976  y=207   width=122   height=188   xoffset=-12   yoffset=-12   xadvance=91    page=0  chnl=15\nchar id=204  x=1018  y=211   width=82    height=192   xoffset=-27   yoffset=-16   xadvance=44    page=0  chnl=15\nchar id=205  x=1112  y=211   width=82    height=192   xoffset=-11   yoffset=-16   xadvance=44    page=0  chnl=15\nchar id=206  x=909   y=213   width=97    height=192   xoffset=-27   yoffset=-16   xadvance=44    page=0  chnl=15\nchar id=207  x=2110  y=207   width=100   height=188   xoffset=-28   yoffset=-12   xadvance=44    page=0  chnl=15\nchar id=208  x=0     y=969   width=145   height=162   xoffset=-22   yoffset=14    xadvance=107   page=0  chnl=15\nchar id=209  x=1521  y=208   width=137   height=190   xoffset=-12   yoffset=-14   xadvance=114   page=0  chnl=15\nchar id=210  x=2184  y=0     width=141   height=195   xoffset=-16   yoffset=-17   xadvance=110   page=0  chnl=15\nchar id=211  x=2031  y=0     width=141   height=195   xoffset=-16   yoffset=-17   xadvance=110   page=0  chnl=15\nchar id=212  x=1878  y=0     width=141   height=195   xoffset=-16   yoffset=-17   xadvance=110   page=0  chnl=15\nchar id=213  x=2769  y=0     width=141   height=193   xoffset=-16   yoffset=-15   xadvance=110   page=0  chnl=15\nchar id=214  x=1206  y=210   width=141   height=191   xoffset=-16   yoffset=-13   xadvance=110   page=0  chnl=15\nchar id=215  x=279   y=1316  width=120   height=120   xoffset=-18   yoffset=40    xadvance=85    page=0  chnl=15\nchar id=216  x=2655  y=206   width=143   height=174   xoffset=-16   yoffset=10    xadvance=110   page=0  chnl=15\nchar id=217  x=2625  y=0     width=132   height=194   xoffset=-14   yoffset=-16   xadvance=104   page=0  chnl=15\nchar id=218  x=2481  y=0     width=132   height=194   xoffset=-14   yoffset=-16   xadvance=104   page=0  chnl=15\nchar id=219  x=2337  y=0     width=132   height=194   xoffset=-14   yoffset=-16   xadvance=104   page=0  chnl=15\nchar id=220  x=1670  y=208   width=132   height=190   xoffset=-14   yoffset=-12   xadvance=104   page=0  chnl=15\nchar id=221  x=486   y=214   width=143   height=192   xoffset=-24   yoffset=-16   xadvance=96    page=0  chnl=15\nchar id=222  x=2360  y=939   width=124   height=162   xoffset=-12   yoffset=14    xadvance=95    page=0  chnl=15\nchar id=223  x=121   y=429   width=127   height=171   xoffset=-14   yoffset=7     xadvance=95    page=0  chnl=15\nchar id=224  x=1604  y=410   width=119   height=170   xoffset=-16   yoffset=8     xadvance=87    page=0  chnl=15\nchar id=225  x=1473  y=412   width=119   height=170   xoffset=-16   yoffset=8     xadvance=87    page=0  chnl=15\nchar id=226  x=1735  y=410   width=119   height=170   xoffset=-16   yoffset=8     xadvance=87    page=0  chnl=15\nchar id=227  x=532   y=600   width=119   height=167   xoffset=-16   yoffset=11    xadvance=87    page=0  chnl=15\nchar id=228  x=2926  y=569   width=119   height=165   xoffset=-16   yoffset=13    xadvance=87    page=0  chnl=15\nchar id=229  x=2524  y=206   width=119   height=177   xoffset=-16   yoffset=1     xadvance=87    page=0  chnl=15\nchar id=230  x=996   y=1129  width=173   height=136   xoffset=-19   yoffset=42    xadvance=135   page=0  chnl=15\nchar id=231  x=1979  y=407   width=120   height=169   xoffset=-17   yoffset=42    xadvance=84    page=0  chnl=15\nchar id=232  x=1076  y=415   width=121   height=170   xoffset=-17   yoffset=8     xadvance=85    page=0  chnl=15\nchar id=233  x=943   y=417   width=121   height=170   xoffset=-17   yoffset=8     xadvance=85    page=0  chnl=15\nchar id=234  x=810   y=417   width=121   height=170   xoffset=-17   yoffset=8     xadvance=85    page=0  chnl=15\nchar id=235  x=2793  y=572   width=121   height=165   xoffset=-17   yoffset=13    xadvance=85    page=0  chnl=15\nchar id=236  x=772   y=600   width=82    height=167   xoffset=-29   yoffset=9     xadvance=40    page=0  chnl=15\nchar id=237  x=2970  y=388   width=82    height=167   xoffset=-13   yoffset=9     xadvance=40    page=0  chnl=15\nchar id=238  x=663   y=600   width=97    height=167   xoffset=-29   yoffset=9     xadvance=40    page=0  chnl=15\nchar id=239  x=0     y=1143  width=100   height=162   xoffset=-30   yoffset=14    xadvance=40    page=0  chnl=15\nchar id=240  x=2810  y=205   width=123   height=173   xoffset=-15   yoffset=5     xadvance=94    page=0  chnl=15\nchar id=241  x=0     y=792   width=116   height=165   xoffset=-14   yoffset=11    xadvance=88    page=0  chnl=15\nchar id=242  x=260   y=429   width=127   height=170   xoffset=-18   yoffset=8     xadvance=91    page=0  chnl=15\nchar id=243  x=538   y=418   width=127   height=170   xoffset=-18   yoffset=8     xadvance=91    page=0  chnl=15\nchar id=244  x=399   y=418   width=127   height=170   xoffset=-18   yoffset=8     xadvance=91    page=0  chnl=15\nchar id=245  x=2831  y=390   width=127   height=167   xoffset=-18   yoffset=11    xadvance=91    page=0  chnl=15\nchar id=246  x=2253  y=583   width=127   height=165   xoffset=-18   yoffset=13    xadvance=91    page=0  chnl=15\nchar id=247  x=140   y=1317  width=127   height=128   xoffset=-19   yoffset=34    xadvance=91    page=0  chnl=15\nchar id=248  x=564   y=1129  width=126   height=153   xoffset=-17   yoffset=34    xadvance=91    page=0  chnl=15\nchar id=249  x=2111  y=407   width=116   height=169   xoffset=-14   yoffset=9     xadvance=88    page=0  chnl=15\nchar id=250  x=2239  y=402   width=116   height=169   xoffset=-14   yoffset=9     xadvance=88    page=0  chnl=15\nchar id=251  x=2367  y=402   width=116   height=169   xoffset=-14   yoffset=9     xadvance=88    page=0  chnl=15\nchar id=252  x=672   y=779   width=116   height=164   xoffset=-14   yoffset=14    xadvance=88    page=0  chnl=15\nchar id=253  x=749   y=0     width=122   height=201   xoffset=-23   yoffset=9     xadvance=76    page=0  chnl=15\nchar id=254  x=883   y=0     width=121   height=201   xoffset=-13   yoffset=8     xadvance=92    page=0  chnl=15\nchar id=255  x=1744  y=0     width=122   height=196   xoffset=-23   yoffset=14    xadvance=76    page=0  chnl=15\nkernings count=1686\nkerning first=32  second=84  amount=-3\nkerning first=40  second=86  amount=2\nkerning first=40  second=87  amount=1\nkerning first=40  second=89  amount=2\nkerning first=40  second=221 amount=2\nkerning first=70  second=44  amount=-18\nkerning first=70  second=46  amount=-18\nkerning first=70  second=65  amount=-13\nkerning first=70  second=74  amount=-21\nkerning first=70  second=84  amount=2\nkerning first=70  second=97  amount=-3\nkerning first=70  second=99  amount=-2\nkerning first=70  second=100 amount=-2\nkerning first=70  second=101 amount=-2\nkerning first=70  second=103 amount=-2\nkerning first=70  second=111 amount=-2\nkerning first=70  second=113 amount=-2\nkerning first=70  second=117 amount=-2\nkerning first=70  second=118 amount=-2\nkerning first=70  second=121 amount=-2\nkerning first=70  second=192 amount=-13\nkerning first=70  second=193 amount=-13\nkerning first=70  second=194 amount=-13\nkerning first=70  second=195 amount=-13\nkerning first=70  second=196 amount=-13\nkerning first=70  second=197 amount=-13\nkerning first=70  second=224 amount=-3\nkerning first=70  second=225 amount=-3\nkerning first=70  second=226 amount=-3\nkerning first=70  second=227 amount=-3\nkerning first=70  second=228 amount=-3\nkerning first=70  second=229 amount=-3\nkerning first=70  second=231 amount=-2\nkerning first=70  second=232 amount=-2\nkerning first=70  second=233 amount=-2\nkerning first=70  second=234 amount=-2\nkerning first=70  second=235 amount=-2\nkerning first=70  second=242 amount=-2\nkerning first=70  second=243 amount=-2\nkerning first=70  second=244 amount=-2\nkerning first=70  second=245 amount=-2\nkerning first=70  second=246 amount=-2\nkerning first=70  second=249 amount=-2\nkerning first=70  second=250 amount=-2\nkerning first=70  second=251 amount=-2\nkerning first=70  second=252 amount=-2\nkerning first=70  second=253 amount=-2\nkerning first=70  second=255 amount=-2\nkerning first=81  second=84  amount=-3\nkerning first=81  second=86  amount=-2\nkerning first=81  second=87  amount=-2\nkerning first=81  second=89  amount=-3\nkerning first=81  second=221 amount=-3\nkerning first=82  second=84  amount=-6\nkerning first=82  second=86  amount=-1\nkerning first=82  second=89  amount=-4\nkerning first=82  second=221 amount=-4\nkerning first=91  second=74  amount=-1\nkerning first=91  second=85  amount=-1\nkerning first=91  second=217 amount=-1\nkerning first=91  second=218 amount=-1\nkerning first=91  second=219 amount=-1\nkerning first=91  second=220 amount=-1\nkerning first=102 second=34  amount=1\nkerning first=102 second=39  amount=1\nkerning first=102 second=99  amount=-2\nkerning first=102 second=100 amount=-2\nkerning first=102 second=101 amount=-2\nkerning first=102 second=103 amount=-2\nkerning first=102 second=113 amount=-2\nkerning first=102 second=231 amount=-2\nkerning first=102 second=232 amount=-2\nkerning first=102 second=233 amount=-2\nkerning first=102 second=234 amount=-2\nkerning first=102 second=235 amount=-2\nkerning first=107 second=99  amount=-2\nkerning first=107 second=100 amount=-2\nkerning first=107 second=101 amount=-2\nkerning first=107 second=103 amount=-2\nkerning first=107 second=113 amount=-2\nkerning first=107 second=231 amount=-2\nkerning first=107 second=232 amount=-2\nkerning first=107 second=233 amount=-2\nkerning first=107 second=234 amount=-2\nkerning first=107 second=235 amount=-2\nkerning first=116 second=111 amount=-2\nkerning first=116 second=242 amount=-2\nkerning first=116 second=243 amount=-2\nkerning first=116 second=244 amount=-2\nkerning first=116 second=245 amount=-2\nkerning first=116 second=246 amount=-2\nkerning first=119 second=44  amount=-10\nkerning first=119 second=46  amount=-10\nkerning first=123 second=74  amount=-2\nkerning first=123 second=85  amount=-2\nkerning first=123 second=217 amount=-2\nkerning first=123 second=218 amount=-2\nkerning first=123 second=219 amount=-2\nkerning first=123 second=220 amount=-2\nkerning first=34  second=34  amount=-8\nkerning first=34  second=39  amount=-8\nkerning first=34  second=111 amount=-5\nkerning first=34  second=242 amount=-5\nkerning first=34  second=243 amount=-5\nkerning first=34  second=244 amount=-5\nkerning first=34  second=245 amount=-5\nkerning first=34  second=246 amount=-5\nkerning first=34  second=65  amount=-9\nkerning first=34  second=192 amount=-9\nkerning first=34  second=193 amount=-9\nkerning first=34  second=194 amount=-9\nkerning first=34  second=195 amount=-9\nkerning first=34  second=196 amount=-9\nkerning first=34  second=197 amount=-9\nkerning first=34  second=99  amount=-5\nkerning first=34  second=100 amount=-5\nkerning first=34  second=101 amount=-5\nkerning first=34  second=103 amount=-5\nkerning first=34  second=113 amount=-5\nkerning first=34  second=231 amount=-5\nkerning first=34  second=232 amount=-5\nkerning first=34  second=233 amount=-5\nkerning first=34  second=234 amount=-5\nkerning first=34  second=235 amount=-5\nkerning first=34  second=109 amount=-2\nkerning first=34  second=110 amount=-2\nkerning first=34  second=112 amount=-2\nkerning first=34  second=241 amount=-2\nkerning first=34  second=97  amount=-4\nkerning first=34  second=224 amount=-4\nkerning first=34  second=225 amount=-4\nkerning first=34  second=226 amount=-4\nkerning first=34  second=227 amount=-4\nkerning first=34  second=228 amount=-4\nkerning first=34  second=229 amount=-4\nkerning first=34  second=115 amount=-6\nkerning first=39  second=34  amount=-8\nkerning first=39  second=39  amount=-8\nkerning first=39  second=111 amount=-5\nkerning first=39  second=242 amount=-5\nkerning first=39  second=243 amount=-5\nkerning first=39  second=244 amount=-5\nkerning first=39  second=245 amount=-5\nkerning first=39  second=246 amount=-5\nkerning first=39  second=65  amount=-9\nkerning first=39  second=192 amount=-9\nkerning first=39  second=193 amount=-9\nkerning first=39  second=194 amount=-9\nkerning first=39  second=195 amount=-9\nkerning first=39  second=196 amount=-9\nkerning first=39  second=197 amount=-9\nkerning first=39  second=99  amount=-5\nkerning first=39  second=100 amount=-5\nkerning first=39  second=101 amount=-5\nkerning first=39  second=103 amount=-5\nkerning first=39  second=113 amount=-5\nkerning first=39  second=231 amount=-5\nkerning first=39  second=232 amount=-5\nkerning first=39  second=233 amount=-5\nkerning first=39  second=234 amount=-5\nkerning first=39  second=235 amount=-5\nkerning first=39  second=109 amount=-2\nkerning first=39  second=110 amount=-2\nkerning first=39  second=112 amount=-2\nkerning first=39  second=241 amount=-2\nkerning first=39  second=97  amount=-4\nkerning first=39  second=224 amount=-4\nkerning first=39  second=225 amount=-4\nkerning first=39  second=226 amount=-4\nkerning first=39  second=227 amount=-4\nkerning first=39  second=228 amount=-4\nkerning first=39  second=229 amount=-4\nkerning first=39  second=115 amount=-6\nkerning first=44  second=34  amount=-13\nkerning first=44  second=39  amount=-13\nkerning first=46  second=34  amount=-13\nkerning first=46  second=39  amount=-13\nkerning first=65  second=118 amount=-4\nkerning first=65  second=121 amount=-4\nkerning first=65  second=253 amount=-4\nkerning first=65  second=255 amount=-4\nkerning first=65  second=67  amount=-1\nkerning first=65  second=71  amount=-1\nkerning first=65  second=79  amount=-1\nkerning first=65  second=81  amount=-1\nkerning first=65  second=216 amount=-1\nkerning first=65  second=199 amount=-1\nkerning first=65  second=210 amount=-1\nkerning first=65  second=211 amount=-1\nkerning first=65  second=212 amount=-1\nkerning first=65  second=213 amount=-1\nkerning first=65  second=214 amount=-1\nkerning first=65  second=85  amount=-1\nkerning first=65  second=217 amount=-1\nkerning first=65  second=218 amount=-1\nkerning first=65  second=219 amount=-1\nkerning first=65  second=220 amount=-1\nkerning first=65  second=34  amount=-9\nkerning first=65  second=39  amount=-9\nkerning first=65  second=111 amount=-1\nkerning first=65  second=242 amount=-1\nkerning first=65  second=243 amount=-1\nkerning first=65  second=244 amount=-1\nkerning first=65  second=245 amount=-1\nkerning first=65  second=246 amount=-1\nkerning first=65  second=87  amount=-5\nkerning first=65  second=84  amount=-10\nkerning first=65  second=117 amount=-1\nkerning first=65  second=249 amount=-1\nkerning first=65  second=250 amount=-1\nkerning first=65  second=251 amount=-1\nkerning first=65  second=252 amount=-1\nkerning first=65  second=122 amount=1\nkerning first=65  second=86  amount=-7\nkerning first=65  second=89  amount=-7\nkerning first=65  second=221 amount=-7\nkerning first=66  second=84  amount=-2\nkerning first=66  second=86  amount=-2\nkerning first=66  second=89  amount=-4\nkerning first=66  second=221 amount=-4\nkerning first=67  second=84  amount=-2\nkerning first=68  second=84  amount=-2\nkerning first=68  second=86  amount=-2\nkerning first=68  second=89  amount=-3\nkerning first=68  second=221 amount=-3\nkerning first=68  second=65  amount=-2\nkerning first=68  second=192 amount=-2\nkerning first=68  second=193 amount=-2\nkerning first=68  second=194 amount=-2\nkerning first=68  second=195 amount=-2\nkerning first=68  second=196 amount=-2\nkerning first=68  second=197 amount=-2\nkerning first=68  second=88  amount=-2\nkerning first=68  second=44  amount=-8\nkerning first=68  second=46  amount=-8\nkerning first=68  second=90  amount=-2\nkerning first=69  second=118 amount=-2\nkerning first=69  second=121 amount=-2\nkerning first=69  second=253 amount=-2\nkerning first=69  second=255 amount=-2\nkerning first=69  second=111 amount=-1\nkerning first=69  second=242 amount=-1\nkerning first=69  second=243 amount=-1\nkerning first=69  second=244 amount=-1\nkerning first=69  second=245 amount=-1\nkerning first=69  second=246 amount=-1\nkerning first=69  second=84  amount=2\nkerning first=69  second=117 amount=-1\nkerning first=69  second=249 amount=-1\nkerning first=69  second=250 amount=-1\nkerning first=69  second=251 amount=-1\nkerning first=69  second=252 amount=-1\nkerning first=69  second=99  amount=-1\nkerning first=69  second=100 amount=-1\nkerning first=69  second=101 amount=-1\nkerning first=69  second=103 amount=-1\nkerning first=69  second=113 amount=-1\nkerning first=69  second=231 amount=-1\nkerning first=69  second=232 amount=-1\nkerning first=69  second=233 amount=-1\nkerning first=69  second=234 amount=-1\nkerning first=69  second=235 amount=-1\nkerning first=72  second=84  amount=-2\nkerning first=72  second=89  amount=-2\nkerning first=72  second=221 amount=-2\nkerning first=72  second=65  amount=1\nkerning first=72  second=192 amount=1\nkerning first=72  second=193 amount=1\nkerning first=72  second=194 amount=1\nkerning first=72  second=195 amount=1\nkerning first=72  second=196 amount=1\nkerning first=72  second=197 amount=1\nkerning first=72  second=88  amount=1\nkerning first=73  second=84  amount=-2\nkerning first=73  second=89  amount=-2\nkerning first=73  second=221 amount=-2\nkerning first=73  second=65  amount=1\nkerning first=73  second=192 amount=1\nkerning first=73  second=193 amount=1\nkerning first=73  second=194 amount=1\nkerning first=73  second=195 amount=1\nkerning first=73  second=196 amount=1\nkerning first=73  second=197 amount=1\nkerning first=73  second=88  amount=1\nkerning first=74  second=65  amount=-2\nkerning first=74  second=192 amount=-2\nkerning first=74  second=193 amount=-2\nkerning first=74  second=194 amount=-2\nkerning first=74  second=195 amount=-2\nkerning first=74  second=196 amount=-2\nkerning first=74  second=197 amount=-2\nkerning first=75  second=118 amount=-3\nkerning first=75  second=121 amount=-3\nkerning first=75  second=253 amount=-3\nkerning first=75  second=255 amount=-3\nkerning first=75  second=67  amount=-2\nkerning first=75  second=71  amount=-2\nkerning first=75  second=79  amount=-2\nkerning first=75  second=81  amount=-2\nkerning first=75  second=216 amount=-2\nkerning first=75  second=199 amount=-2\nkerning first=75  second=210 amount=-2\nkerning first=75  second=211 amount=-2\nkerning first=75  second=212 amount=-2\nkerning first=75  second=213 amount=-2\nkerning first=75  second=214 amount=-2\nkerning first=75  second=111 amount=-2\nkerning first=75  second=242 amount=-2\nkerning first=75  second=243 amount=-2\nkerning first=75  second=244 amount=-2\nkerning first=75  second=245 amount=-2\nkerning first=75  second=246 amount=-2\nkerning first=75  second=117 amount=-2\nkerning first=75  second=249 amount=-2\nkerning first=75  second=250 amount=-2\nkerning first=75  second=251 amount=-2\nkerning first=75  second=252 amount=-2\nkerning first=75  second=99  amount=-2\nkerning first=75  second=100 amount=-2\nkerning first=75  second=101 amount=-2\nkerning first=75  second=103 amount=-2\nkerning first=75  second=113 amount=-2\nkerning first=75  second=231 amount=-2\nkerning first=75  second=232 amount=-2\nkerning first=75  second=233 amount=-2\nkerning first=75  second=234 amount=-2\nkerning first=75  second=235 amount=-2\nkerning first=75  second=45  amount=-5\nkerning first=75  second=173 amount=-5\nkerning first=75  second=109 amount=-2\nkerning first=75  second=110 amount=-2\nkerning first=75  second=112 amount=-2\nkerning first=75  second=241 amount=-2\nkerning first=76  second=118 amount=-10\nkerning first=76  second=121 amount=-10\nkerning first=76  second=253 amount=-10\nkerning first=76  second=255 amount=-10\nkerning first=76  second=67  amount=-5\nkerning first=76  second=71  amount=-5\nkerning first=76  second=79  amount=-5\nkerning first=76  second=81  amount=-5\nkerning first=76  second=216 amount=-5\nkerning first=76  second=199 amount=-5\nkerning first=76  second=210 amount=-5\nkerning first=76  second=211 amount=-5\nkerning first=76  second=212 amount=-5\nkerning first=76  second=213 amount=-5\nkerning first=76  second=214 amount=-5\nkerning first=76  second=85  amount=-4\nkerning first=76  second=217 amount=-4\nkerning first=76  second=218 amount=-4\nkerning first=76  second=219 amount=-4\nkerning first=76  second=220 amount=-4\nkerning first=76  second=34  amount=-26\nkerning first=76  second=39  amount=-26\nkerning first=76  second=87  amount=-11\nkerning first=76  second=84  amount=-21\nkerning first=76  second=117 amount=-3\nkerning first=76  second=249 amount=-3\nkerning first=76  second=250 amount=-3\nkerning first=76  second=251 amount=-3\nkerning first=76  second=252 amount=-3\nkerning first=76  second=86  amount=-14\nkerning first=76  second=89  amount=-19\nkerning first=76  second=221 amount=-19\nkerning first=76  second=65  amount=1\nkerning first=76  second=192 amount=1\nkerning first=76  second=193 amount=1\nkerning first=76  second=194 amount=1\nkerning first=76  second=195 amount=1\nkerning first=76  second=196 amount=1\nkerning first=76  second=197 amount=1\nkerning first=77  second=84  amount=-2\nkerning first=77  second=89  amount=-2\nkerning first=77  second=221 amount=-2\nkerning first=77  second=65  amount=1\nkerning first=77  second=192 amount=1\nkerning first=77  second=193 amount=1\nkerning first=77  second=194 amount=1\nkerning first=77  second=195 amount=1\nkerning first=77  second=196 amount=1\nkerning first=77  second=197 amount=1\nkerning first=77  second=88  amount=1\nkerning first=78  second=84  amount=-2\nkerning first=78  second=89  amount=-2\nkerning first=78  second=221 amount=-2\nkerning first=78  second=65  amount=1\nkerning first=78  second=192 amount=1\nkerning first=78  second=193 amount=1\nkerning first=78  second=194 amount=1\nkerning first=78  second=195 amount=1\nkerning first=78  second=196 amount=1\nkerning first=78  second=197 amount=1\nkerning first=78  second=88  amount=1\nkerning first=79  second=84  amount=-2\nkerning first=79  second=86  amount=-2\nkerning first=79  second=89  amount=-3\nkerning first=79  second=221 amount=-3\nkerning first=79  second=65  amount=-2\nkerning first=79  second=192 amount=-2\nkerning first=79  second=193 amount=-2\nkerning first=79  second=194 amount=-2\nkerning first=79  second=195 amount=-2\nkerning first=79  second=196 amount=-2\nkerning first=79  second=197 amount=-2\nkerning first=79  second=88  amount=-2\nkerning first=79  second=44  amount=-8\nkerning first=79  second=46  amount=-8\nkerning first=79  second=90  amount=-2\nkerning first=80  second=118 amount=1\nkerning first=80  second=121 amount=1\nkerning first=80  second=253 amount=1\nkerning first=80  second=255 amount=1\nkerning first=80  second=111 amount=-1\nkerning first=80  second=242 amount=-1\nkerning first=80  second=243 amount=-1\nkerning first=80  second=244 amount=-1\nkerning first=80  second=245 amount=-1\nkerning first=80  second=246 amount=-1\nkerning first=80  second=65  amount=-11\nkerning first=80  second=192 amount=-11\nkerning first=80  second=193 amount=-11\nkerning first=80  second=194 amount=-11\nkerning first=80  second=195 amount=-11\nkerning first=80  second=196 amount=-11\nkerning first=80  second=197 amount=-11\nkerning first=80  second=88  amount=-2\nkerning first=80  second=44  amount=-25\nkerning first=80  second=46  amount=-25\nkerning first=80  second=90  amount=-2\nkerning first=80  second=99  amount=-1\nkerning first=80  second=100 amount=-1\nkerning first=80  second=101 amount=-1\nkerning first=80  second=103 amount=-1\nkerning first=80  second=113 amount=-1\nkerning first=80  second=231 amount=-1\nkerning first=80  second=232 amount=-1\nkerning first=80  second=233 amount=-1\nkerning first=80  second=234 amount=-1\nkerning first=80  second=235 amount=-1\nkerning first=80  second=97  amount=-1\nkerning first=80  second=224 amount=-1\nkerning first=80  second=225 amount=-1\nkerning first=80  second=226 amount=-1\nkerning first=80  second=227 amount=-1\nkerning first=80  second=228 amount=-1\nkerning first=80  second=229 amount=-1\nkerning first=80  second=74  amount=-16\nkerning first=84  second=118 amount=-6\nkerning first=84  second=121 amount=-6\nkerning first=84  second=253 amount=-6\nkerning first=84  second=255 amount=-6\nkerning first=84  second=67  amount=-2\nkerning first=84  second=71  amount=-2\nkerning first=84  second=79  amount=-2\nkerning first=84  second=81  amount=-2\nkerning first=84  second=216 amount=-2\nkerning first=84  second=199 amount=-2\nkerning first=84  second=210 amount=-2\nkerning first=84  second=211 amount=-2\nkerning first=84  second=212 amount=-2\nkerning first=84  second=213 amount=-2\nkerning first=84  second=214 amount=-2\nkerning first=84  second=111 amount=-8\nkerning first=84  second=242 amount=-8\nkerning first=84  second=243 amount=-8\nkerning first=84  second=244 amount=-8\nkerning first=84  second=245 amount=-8\nkerning first=84  second=246 amount=-8\nkerning first=84  second=87  amount=1\nkerning first=84  second=84  amount=1\nkerning first=84  second=117 amount=-7\nkerning first=84  second=249 amount=-7\nkerning first=84  second=250 amount=-7\nkerning first=84  second=251 amount=-7\nkerning first=84  second=252 amount=-7\nkerning first=84  second=122 amount=-5\nkerning first=84  second=86  amount=1\nkerning first=84  second=89  amount=1\nkerning first=84  second=221 amount=1\nkerning first=84  second=65  amount=-6\nkerning first=84  second=192 amount=-6\nkerning first=84  second=193 amount=-6\nkerning first=84  second=194 amount=-6\nkerning first=84  second=195 amount=-6\nkerning first=84  second=196 amount=-6\nkerning first=84  second=197 amount=-6\nkerning first=84  second=44  amount=-17\nkerning first=84  second=46  amount=-17\nkerning first=84  second=99  amount=-8\nkerning first=84  second=100 amount=-8\nkerning first=84  second=101 amount=-8\nkerning first=84  second=103 amount=-8\nkerning first=84  second=113 amount=-8\nkerning first=84  second=231 amount=-8\nkerning first=84  second=232 amount=-8\nkerning first=84  second=233 amount=-8\nkerning first=84  second=234 amount=-8\nkerning first=84  second=235 amount=-8\nkerning first=84  second=120 amount=-6\nkerning first=84  second=45  amount=-18\nkerning first=84  second=173 amount=-18\nkerning first=84  second=109 amount=-9\nkerning first=84  second=110 amount=-9\nkerning first=84  second=112 amount=-9\nkerning first=84  second=241 amount=-9\nkerning first=84  second=83  amount=-1\nkerning first=84  second=97  amount=-9\nkerning first=84  second=224 amount=-9\nkerning first=84  second=225 amount=-9\nkerning first=84  second=226 amount=-9\nkerning first=84  second=227 amount=-9\nkerning first=84  second=228 amount=-9\nkerning first=84  second=229 amount=-9\nkerning first=84  second=115 amount=-9\nkerning first=84  second=74  amount=-19\nkerning first=85  second=65  amount=-2\nkerning first=85  second=192 amount=-2\nkerning first=85  second=193 amount=-2\nkerning first=85  second=194 amount=-2\nkerning first=85  second=195 amount=-2\nkerning first=85  second=196 amount=-2\nkerning first=85  second=197 amount=-2\nkerning first=86  second=118 amount=-1\nkerning first=86  second=121 amount=-1\nkerning first=86  second=253 amount=-1\nkerning first=86  second=255 amount=-1\nkerning first=86  second=67  amount=-1\nkerning first=86  second=71  amount=-1\nkerning first=86  second=79  amount=-1\nkerning first=86  second=81  amount=-1\nkerning first=86  second=216 amount=-1\nkerning first=86  second=199 amount=-1\nkerning first=86  second=210 amount=-1\nkerning first=86  second=211 amount=-1\nkerning first=86  second=212 amount=-1\nkerning first=86  second=213 amount=-1\nkerning first=86  second=214 amount=-1\nkerning first=86  second=111 amount=-4\nkerning first=86  second=242 amount=-4\nkerning first=86  second=243 amount=-4\nkerning first=86  second=244 amount=-4\nkerning first=86  second=245 amount=-4\nkerning first=86  second=246 amount=-4\nkerning first=86  second=117 amount=-2\nkerning first=86  second=249 amount=-2\nkerning first=86  second=250 amount=-2\nkerning first=86  second=251 amount=-2\nkerning first=86  second=252 amount=-2\nkerning first=86  second=65  amount=-6\nkerning first=86  second=192 amount=-6\nkerning first=86  second=193 amount=-6\nkerning first=86  second=194 amount=-6\nkerning first=86  second=195 amount=-6\nkerning first=86  second=196 amount=-6\nkerning first=86  second=197 amount=-6\nkerning first=86  second=44  amount=-18\nkerning first=86  second=46  amount=-18\nkerning first=86  second=99  amount=-3\nkerning first=86  second=100 amount=-3\nkerning first=86  second=101 amount=-3\nkerning first=86  second=103 amount=-3\nkerning first=86  second=113 amount=-3\nkerning first=86  second=231 amount=-3\nkerning first=86  second=232 amount=-3\nkerning first=86  second=233 amount=-3\nkerning first=86  second=234 amount=-3\nkerning first=86  second=235 amount=-3\nkerning first=86  second=45  amount=-3\nkerning first=86  second=173 amount=-3\nkerning first=86  second=97  amount=-4\nkerning first=86  second=224 amount=-4\nkerning first=86  second=225 amount=-4\nkerning first=86  second=226 amount=-4\nkerning first=86  second=227 amount=-4\nkerning first=86  second=228 amount=-4\nkerning first=86  second=229 amount=-4\nkerning first=87  second=111 amount=-2\nkerning first=87  second=242 amount=-2\nkerning first=87  second=243 amount=-2\nkerning first=87  second=244 amount=-2\nkerning first=87  second=245 amount=-2\nkerning first=87  second=246 amount=-2\nkerning first=87  second=84  amount=1\nkerning first=87  second=117 amount=-1\nkerning first=87  second=249 amount=-1\nkerning first=87  second=250 amount=-1\nkerning first=87  second=251 amount=-1\nkerning first=87  second=252 amount=-1\nkerning first=87  second=65  amount=-3\nkerning first=87  second=192 amount=-3\nkerning first=87  second=193 amount=-3\nkerning first=87  second=194 amount=-3\nkerning first=87  second=195 amount=-3\nkerning first=87  second=196 amount=-3\nkerning first=87  second=197 amount=-3\nkerning first=87  second=44  amount=-10\nkerning first=87  second=46  amount=-10\nkerning first=87  second=99  amount=-2\nkerning first=87  second=100 amount=-2\nkerning first=87  second=101 amount=-2\nkerning first=87  second=103 amount=-2\nkerning first=87  second=113 amount=-2\nkerning first=87  second=231 amount=-2\nkerning first=87  second=232 amount=-2\nkerning first=87  second=233 amount=-2\nkerning first=87  second=234 amount=-2\nkerning first=87  second=235 amount=-2\nkerning first=87  second=45  amount=-5\nkerning first=87  second=173 amount=-5\nkerning first=87  second=97  amount=-3\nkerning first=87  second=224 amount=-3\nkerning first=87  second=225 amount=-3\nkerning first=87  second=226 amount=-3\nkerning first=87  second=227 amount=-3\nkerning first=87  second=228 amount=-3\nkerning first=87  second=229 amount=-3\nkerning first=88  second=118 amount=-2\nkerning first=88  second=121 amount=-2\nkerning first=88  second=253 amount=-2\nkerning first=88  second=255 amount=-2\nkerning first=88  second=67  amount=-2\nkerning first=88  second=71  amount=-2\nkerning first=88  second=79  amount=-2\nkerning first=88  second=81  amount=-2\nkerning first=88  second=216 amount=-2\nkerning first=88  second=199 amount=-2\nkerning first=88  second=210 amount=-2\nkerning first=88  second=211 amount=-2\nkerning first=88  second=212 amount=-2\nkerning first=88  second=213 amount=-2\nkerning first=88  second=214 amount=-2\nkerning first=88  second=111 amount=-2\nkerning first=88  second=242 amount=-2\nkerning first=88  second=243 amount=-2\nkerning first=88  second=244 amount=-2\nkerning first=88  second=245 amount=-2\nkerning first=88  second=246 amount=-2\nkerning first=88  second=117 amount=-2\nkerning first=88  second=249 amount=-2\nkerning first=88  second=250 amount=-2\nkerning first=88  second=251 amount=-2\nkerning first=88  second=252 amount=-2\nkerning first=88  second=86  amount=1\nkerning first=88  second=99  amount=-2\nkerning first=88  second=100 amount=-2\nkerning first=88  second=101 amount=-2\nkerning first=88  second=103 amount=-2\nkerning first=88  second=113 amount=-2\nkerning first=88  second=231 amount=-2\nkerning first=88  second=232 amount=-2\nkerning first=88  second=233 amount=-2\nkerning first=88  second=234 amount=-2\nkerning first=88  second=235 amount=-2\nkerning first=88  second=45  amount=-4\nkerning first=88  second=173 amount=-4\nkerning first=89  second=118 amount=-2\nkerning first=89  second=121 amount=-2\nkerning first=89  second=253 amount=-2\nkerning first=89  second=255 amount=-2\nkerning first=89  second=67  amount=-2\nkerning first=89  second=71  amount=-2\nkerning first=89  second=79  amount=-2\nkerning first=89  second=81  amount=-2\nkerning first=89  second=216 amount=-2\nkerning first=89  second=199 amount=-2\nkerning first=89  second=210 amount=-2\nkerning first=89  second=211 amount=-2\nkerning first=89  second=212 amount=-2\nkerning first=89  second=213 amount=-2\nkerning first=89  second=214 amount=-2\nkerning first=89  second=85  amount=-7\nkerning first=89  second=217 amount=-7\nkerning first=89  second=218 amount=-7\nkerning first=89  second=219 amount=-7\nkerning first=89  second=220 amount=-7\nkerning first=89  second=111 amount=-5\nkerning first=89  second=242 amount=-5\nkerning first=89  second=243 amount=-5\nkerning first=89  second=244 amount=-5\nkerning first=89  second=245 amount=-5\nkerning first=89  second=246 amount=-5\nkerning first=89  second=87  amount=1\nkerning first=89  second=84  amount=1\nkerning first=89  second=117 amount=-3\nkerning first=89  second=249 amount=-3\nkerning first=89  second=250 amount=-3\nkerning first=89  second=251 amount=-3\nkerning first=89  second=252 amount=-3\nkerning first=89  second=122 amount=-2\nkerning first=89  second=86  amount=1\nkerning first=89  second=89  amount=1\nkerning first=89  second=221 amount=1\nkerning first=89  second=65  amount=-7\nkerning first=89  second=192 amount=-7\nkerning first=89  second=193 amount=-7\nkerning first=89  second=194 amount=-7\nkerning first=89  second=195 amount=-7\nkerning first=89  second=196 amount=-7\nkerning first=89  second=197 amount=-7\nkerning first=89  second=88  amount=1\nkerning first=89  second=44  amount=-16\nkerning first=89  second=46  amount=-16\nkerning first=89  second=99  amount=-5\nkerning first=89  second=100 amount=-5\nkerning first=89  second=101 amount=-5\nkerning first=89  second=103 amount=-5\nkerning first=89  second=113 amount=-5\nkerning first=89  second=231 amount=-5\nkerning first=89  second=232 amount=-5\nkerning first=89  second=233 amount=-5\nkerning first=89  second=234 amount=-5\nkerning first=89  second=235 amount=-5\nkerning first=89  second=120 amount=-2\nkerning first=89  second=45  amount=-4\nkerning first=89  second=173 amount=-4\nkerning first=89  second=109 amount=-3\nkerning first=89  second=110 amount=-3\nkerning first=89  second=112 amount=-3\nkerning first=89  second=241 amount=-3\nkerning first=89  second=83  amount=-1\nkerning first=89  second=97  amount=-6\nkerning first=89  second=224 amount=-6\nkerning first=89  second=225 amount=-6\nkerning first=89  second=226 amount=-6\nkerning first=89  second=227 amount=-6\nkerning first=89  second=228 amount=-6\nkerning first=89  second=229 amount=-6\nkerning first=89  second=115 amount=-5\nkerning first=89  second=74  amount=-7\nkerning first=90  second=118 amount=-2\nkerning first=90  second=121 amount=-2\nkerning first=90  second=253 amount=-2\nkerning first=90  second=255 amount=-2\nkerning first=90  second=67  amount=-2\nkerning first=90  second=71  amount=-2\nkerning first=90  second=79  amount=-2\nkerning first=90  second=81  amount=-2\nkerning first=90  second=216 amount=-2\nkerning first=90  second=199 amount=-2\nkerning first=90  second=210 amount=-2\nkerning first=90  second=211 amount=-2\nkerning first=90  second=212 amount=-2\nkerning first=90  second=213 amount=-2\nkerning first=90  second=214 amount=-2\nkerning first=90  second=111 amount=-2\nkerning first=90  second=242 amount=-2\nkerning first=90  second=243 amount=-2\nkerning first=90  second=244 amount=-2\nkerning first=90  second=245 amount=-2\nkerning first=90  second=246 amount=-2\nkerning first=90  second=117 amount=-1\nkerning first=90  second=249 amount=-1\nkerning first=90  second=250 amount=-1\nkerning first=90  second=251 amount=-1\nkerning first=90  second=252 amount=-1\nkerning first=90  second=65  amount=1\nkerning first=90  second=192 amount=1\nkerning first=90  second=193 amount=1\nkerning first=90  second=194 amount=1\nkerning first=90  second=195 amount=1\nkerning first=90  second=196 amount=1\nkerning first=90  second=197 amount=1\nkerning first=90  second=99  amount=-2\nkerning first=90  second=100 amount=-2\nkerning first=90  second=101 amount=-2\nkerning first=90  second=103 amount=-2\nkerning first=90  second=113 amount=-2\nkerning first=90  second=231 amount=-2\nkerning first=90  second=232 amount=-2\nkerning first=90  second=233 amount=-2\nkerning first=90  second=234 amount=-2\nkerning first=90  second=235 amount=-2\nkerning first=97  second=118 amount=-1\nkerning first=97  second=121 amount=-1\nkerning first=97  second=253 amount=-1\nkerning first=97  second=255 amount=-1\nkerning first=97  second=34  amount=-5\nkerning first=97  second=39  amount=-5\nkerning first=98  second=118 amount=-1\nkerning first=98  second=121 amount=-1\nkerning first=98  second=253 amount=-1\nkerning first=98  second=255 amount=-1\nkerning first=98  second=34  amount=-2\nkerning first=98  second=39  amount=-2\nkerning first=98  second=122 amount=-1\nkerning first=98  second=120 amount=-1\nkerning first=99  second=34  amount=-1\nkerning first=99  second=39  amount=-1\nkerning first=101 second=118 amount=-1\nkerning first=101 second=121 amount=-1\nkerning first=101 second=253 amount=-1\nkerning first=101 second=255 amount=-1\nkerning first=101 second=34  amount=-1\nkerning first=101 second=39  amount=-1\nkerning first=104 second=34  amount=-8\nkerning first=104 second=39  amount=-8\nkerning first=109 second=34  amount=-8\nkerning first=109 second=39  amount=-8\nkerning first=110 second=34  amount=-8\nkerning first=110 second=39  amount=-8\nkerning first=111 second=118 amount=-1\nkerning first=111 second=121 amount=-1\nkerning first=111 second=253 amount=-1\nkerning first=111 second=255 amount=-1\nkerning first=111 second=34  amount=-11\nkerning first=111 second=39  amount=-11\nkerning first=111 second=122 amount=-1\nkerning first=111 second=120 amount=-2\nkerning first=112 second=118 amount=-1\nkerning first=112 second=121 amount=-1\nkerning first=112 second=253 amount=-1\nkerning first=112 second=255 amount=-1\nkerning first=112 second=34  amount=-2\nkerning first=112 second=39  amount=-2\nkerning first=112 second=122 amount=-1\nkerning first=112 second=120 amount=-1\nkerning first=114 second=118 amount=1\nkerning first=114 second=121 amount=1\nkerning first=114 second=253 amount=1\nkerning first=114 second=255 amount=1\nkerning first=114 second=34  amount=1\nkerning first=114 second=39  amount=1\nkerning first=114 second=111 amount=-2\nkerning first=114 second=242 amount=-2\nkerning first=114 second=243 amount=-2\nkerning first=114 second=244 amount=-2\nkerning first=114 second=245 amount=-2\nkerning first=114 second=246 amount=-2\nkerning first=114 second=44  amount=-10\nkerning first=114 second=46  amount=-10\nkerning first=114 second=99  amount=-1\nkerning first=114 second=100 amount=-1\nkerning first=114 second=101 amount=-1\nkerning first=114 second=103 amount=-1\nkerning first=114 second=113 amount=-1\nkerning first=114 second=231 amount=-1\nkerning first=114 second=232 amount=-1\nkerning first=114 second=233 amount=-1\nkerning first=114 second=234 amount=-1\nkerning first=114 second=235 amount=-1\nkerning first=114 second=97  amount=-3\nkerning first=114 second=224 amount=-3\nkerning first=114 second=225 amount=-3\nkerning first=114 second=226 amount=-3\nkerning first=114 second=227 amount=-3\nkerning first=114 second=228 amount=-3\nkerning first=114 second=229 amount=-3\nkerning first=118 second=34  amount=1\nkerning first=118 second=39  amount=1\nkerning first=118 second=111 amount=-1\nkerning first=118 second=242 amount=-1\nkerning first=118 second=243 amount=-1\nkerning first=118 second=244 amount=-1\nkerning first=118 second=245 amount=-1\nkerning first=118 second=246 amount=-1\nkerning first=118 second=44  amount=-8\nkerning first=118 second=46  amount=-8\nkerning first=118 second=99  amount=-1\nkerning first=118 second=100 amount=-1\nkerning first=118 second=101 amount=-1\nkerning first=118 second=103 amount=-1\nkerning first=118 second=113 amount=-1\nkerning first=118 second=231 amount=-1\nkerning first=118 second=232 amount=-1\nkerning first=118 second=233 amount=-1\nkerning first=118 second=234 amount=-1\nkerning first=118 second=235 amount=-1\nkerning first=118 second=97  amount=-1\nkerning first=118 second=224 amount=-1\nkerning first=118 second=225 amount=-1\nkerning first=118 second=226 amount=-1\nkerning first=118 second=227 amount=-1\nkerning first=118 second=228 amount=-1\nkerning first=118 second=229 amount=-1\nkerning first=120 second=111 amount=-2\nkerning first=120 second=242 amount=-2\nkerning first=120 second=243 amount=-2\nkerning first=120 second=244 amount=-2\nkerning first=120 second=245 amount=-2\nkerning first=120 second=246 amount=-2\nkerning first=120 second=99  amount=-2\nkerning first=120 second=100 amount=-2\nkerning first=120 second=101 amount=-2\nkerning first=120 second=103 amount=-2\nkerning first=120 second=113 amount=-2\nkerning first=120 second=231 amount=-2\nkerning first=120 second=232 amount=-2\nkerning first=120 second=233 amount=-2\nkerning first=120 second=234 amount=-2\nkerning first=120 second=235 amount=-2\nkerning first=121 second=34  amount=1\nkerning first=121 second=39  amount=1\nkerning first=121 second=111 amount=-1\nkerning first=121 second=242 amount=-1\nkerning first=121 second=243 amount=-1\nkerning first=121 second=244 amount=-1\nkerning first=121 second=245 amount=-1\nkerning first=121 second=246 amount=-1\nkerning first=121 second=44  amount=-8\nkerning first=121 second=46  amount=-8\nkerning first=121 second=99  amount=-1\nkerning first=121 second=100 amount=-1\nkerning first=121 second=101 amount=-1\nkerning first=121 second=103 amount=-1\nkerning first=121 second=113 amount=-1\nkerning first=121 second=231 amount=-1\nkerning first=121 second=232 amount=-1\nkerning first=121 second=233 amount=-1\nkerning first=121 second=234 amount=-1\nkerning first=121 second=235 amount=-1\nkerning first=121 second=97  amount=-1\nkerning first=121 second=224 amount=-1\nkerning first=121 second=225 amount=-1\nkerning first=121 second=226 amount=-1\nkerning first=121 second=227 amount=-1\nkerning first=121 second=228 amount=-1\nkerning first=121 second=229 amount=-1\nkerning first=122 second=111 amount=-1\nkerning first=122 second=242 amount=-1\nkerning first=122 second=243 amount=-1\nkerning first=122 second=244 amount=-1\nkerning first=122 second=245 amount=-1\nkerning first=122 second=246 amount=-1\nkerning first=122 second=99  amount=-1\nkerning first=122 second=100 amount=-1\nkerning first=122 second=101 amount=-1\nkerning first=122 second=103 amount=-1\nkerning first=122 second=113 amount=-1\nkerning first=122 second=231 amount=-1\nkerning first=122 second=232 amount=-1\nkerning first=122 second=233 amount=-1\nkerning first=122 second=234 amount=-1\nkerning first=122 second=235 amount=-1\nkerning first=254 second=118 amount=-1\nkerning first=254 second=121 amount=-1\nkerning first=254 second=253 amount=-1\nkerning first=254 second=255 amount=-1\nkerning first=254 second=34  amount=-2\nkerning first=254 second=39  amount=-2\nkerning first=254 second=122 amount=-1\nkerning first=254 second=120 amount=-1\nkerning first=208 second=84  amount=-2\nkerning first=208 second=86  amount=-2\nkerning first=208 second=89  amount=-3\nkerning first=208 second=221 amount=-3\nkerning first=208 second=65  amount=-2\nkerning first=208 second=192 amount=-2\nkerning first=208 second=193 amount=-2\nkerning first=208 second=194 amount=-2\nkerning first=208 second=195 amount=-2\nkerning first=208 second=196 amount=-2\nkerning first=208 second=197 amount=-2\nkerning first=208 second=88  amount=-2\nkerning first=208 second=44  amount=-8\nkerning first=208 second=46  amount=-8\nkerning first=208 second=90  amount=-2\nkerning first=192 second=118 amount=-4\nkerning first=192 second=121 amount=-4\nkerning first=192 second=253 amount=-4\nkerning first=192 second=255 amount=-4\nkerning first=192 second=67  amount=-1\nkerning first=192 second=71  amount=-1\nkerning first=192 second=79  amount=-1\nkerning first=192 second=81  amount=-1\nkerning first=192 second=216 amount=-1\nkerning first=192 second=199 amount=-1\nkerning first=192 second=210 amount=-1\nkerning first=192 second=211 amount=-1\nkerning first=192 second=212 amount=-1\nkerning first=192 second=213 amount=-1\nkerning first=192 second=214 amount=-1\nkerning first=192 second=85  amount=-1\nkerning first=192 second=217 amount=-1\nkerning first=192 second=218 amount=-1\nkerning first=192 second=219 amount=-1\nkerning first=192 second=220 amount=-1\nkerning first=192 second=34  amount=-9\nkerning first=192 second=39  amount=-9\nkerning first=192 second=111 amount=-1\nkerning first=192 second=242 amount=-1\nkerning first=192 second=243 amount=-1\nkerning first=192 second=244 amount=-1\nkerning first=192 second=245 amount=-1\nkerning first=192 second=246 amount=-1\nkerning first=192 second=87  amount=-5\nkerning first=192 second=84  amount=-10\nkerning first=192 second=117 amount=-1\nkerning first=192 second=249 amount=-1\nkerning first=192 second=250 amount=-1\nkerning first=192 second=251 amount=-1\nkerning first=192 second=252 amount=-1\nkerning first=192 second=122 amount=1\nkerning first=192 second=86  amount=-7\nkerning first=192 second=89  amount=-7\nkerning first=192 second=221 amount=-7\nkerning first=193 second=118 amount=-4\nkerning first=193 second=121 amount=-4\nkerning first=193 second=253 amount=-4\nkerning first=193 second=255 amount=-4\nkerning first=193 second=67  amount=-1\nkerning first=193 second=71  amount=-1\nkerning first=193 second=79  amount=-1\nkerning first=193 second=81  amount=-1\nkerning first=193 second=216 amount=-1\nkerning first=193 second=199 amount=-1\nkerning first=193 second=210 amount=-1\nkerning first=193 second=211 amount=-1\nkerning first=193 second=212 amount=-1\nkerning first=193 second=213 amount=-1\nkerning first=193 second=214 amount=-1\nkerning first=193 second=85  amount=-1\nkerning first=193 second=217 amount=-1\nkerning first=193 second=218 amount=-1\nkerning first=193 second=219 amount=-1\nkerning first=193 second=220 amount=-1\nkerning first=193 second=34  amount=-9\nkerning first=193 second=39  amount=-9\nkerning first=193 second=111 amount=-1\nkerning first=193 second=242 amount=-1\nkerning first=193 second=243 amount=-1\nkerning first=193 second=244 amount=-1\nkerning first=193 second=245 amount=-1\nkerning first=193 second=246 amount=-1\nkerning first=193 second=87  amount=-5\nkerning first=193 second=84  amount=-10\nkerning first=193 second=117 amount=-1\nkerning first=193 second=249 amount=-1\nkerning first=193 second=250 amount=-1\nkerning first=193 second=251 amount=-1\nkerning first=193 second=252 amount=-1\nkerning first=193 second=122 amount=1\nkerning first=193 second=86  amount=-7\nkerning first=193 second=89  amount=-7\nkerning first=193 second=221 amount=-7\nkerning first=194 second=118 amount=-4\nkerning first=194 second=121 amount=-4\nkerning first=194 second=253 amount=-4\nkerning first=194 second=255 amount=-4\nkerning first=194 second=67  amount=-1\nkerning first=194 second=71  amount=-1\nkerning first=194 second=79  amount=-1\nkerning first=194 second=81  amount=-1\nkerning first=194 second=216 amount=-1\nkerning first=194 second=199 amount=-1\nkerning first=194 second=210 amount=-1\nkerning first=194 second=211 amount=-1\nkerning first=194 second=212 amount=-1\nkerning first=194 second=213 amount=-1\nkerning first=194 second=214 amount=-1\nkerning first=194 second=85  amount=-1\nkerning first=194 second=217 amount=-1\nkerning first=194 second=218 amount=-1\nkerning first=194 second=219 amount=-1\nkerning first=194 second=220 amount=-1\nkerning first=194 second=34  amount=-9\nkerning first=194 second=39  amount=-9\nkerning first=194 second=111 amount=-1\nkerning first=194 second=242 amount=-1\nkerning first=194 second=243 amount=-1\nkerning first=194 second=244 amount=-1\nkerning first=194 second=245 amount=-1\nkerning first=194 second=246 amount=-1\nkerning first=194 second=87  amount=-5\nkerning first=194 second=84  amount=-10\nkerning first=194 second=117 amount=-1\nkerning first=194 second=249 amount=-1\nkerning first=194 second=250 amount=-1\nkerning first=194 second=251 amount=-1\nkerning first=194 second=252 amount=-1\nkerning first=194 second=122 amount=1\nkerning first=194 second=86  amount=-7\nkerning first=194 second=89  amount=-7\nkerning first=194 second=221 amount=-7\nkerning first=195 second=118 amount=-4\nkerning first=195 second=121 amount=-4\nkerning first=195 second=253 amount=-4\nkerning first=195 second=255 amount=-4\nkerning first=195 second=67  amount=-1\nkerning first=195 second=71  amount=-1\nkerning first=195 second=79  amount=-1\nkerning first=195 second=81  amount=-1\nkerning first=195 second=216 amount=-1\nkerning first=195 second=199 amount=-1\nkerning first=195 second=210 amount=-1\nkerning first=195 second=211 amount=-1\nkerning first=195 second=212 amount=-1\nkerning first=195 second=213 amount=-1\nkerning first=195 second=214 amount=-1\nkerning first=195 second=85  amount=-1\nkerning first=195 second=217 amount=-1\nkerning first=195 second=218 amount=-1\nkerning first=195 second=219 amount=-1\nkerning first=195 second=220 amount=-1\nkerning first=195 second=34  amount=-9\nkerning first=195 second=39  amount=-9\nkerning first=195 second=111 amount=-1\nkerning first=195 second=242 amount=-1\nkerning first=195 second=243 amount=-1\nkerning first=195 second=244 amount=-1\nkerning first=195 second=245 amount=-1\nkerning first=195 second=246 amount=-1\nkerning first=195 second=87  amount=-5\nkerning first=195 second=84  amount=-10\nkerning first=195 second=117 amount=-1\nkerning first=195 second=249 amount=-1\nkerning first=195 second=250 amount=-1\nkerning first=195 second=251 amount=-1\nkerning first=195 second=252 amount=-1\nkerning first=195 second=122 amount=1\nkerning first=195 second=86  amount=-7\nkerning first=195 second=89  amount=-7\nkerning first=195 second=221 amount=-7\nkerning first=196 second=118 amount=-4\nkerning first=196 second=121 amount=-4\nkerning first=196 second=253 amount=-4\nkerning first=196 second=255 amount=-4\nkerning first=196 second=67  amount=-1\nkerning first=196 second=71  amount=-1\nkerning first=196 second=79  amount=-1\nkerning first=196 second=81  amount=-1\nkerning first=196 second=216 amount=-1\nkerning first=196 second=199 amount=-1\nkerning first=196 second=210 amount=-1\nkerning first=196 second=211 amount=-1\nkerning first=196 second=212 amount=-1\nkerning first=196 second=213 amount=-1\nkerning first=196 second=214 amount=-1\nkerning first=196 second=85  amount=-1\nkerning first=196 second=217 amount=-1\nkerning first=196 second=218 amount=-1\nkerning first=196 second=219 amount=-1\nkerning first=196 second=220 amount=-1\nkerning first=196 second=34  amount=-9\nkerning first=196 second=39  amount=-9\nkerning first=196 second=111 amount=-1\nkerning first=196 second=242 amount=-1\nkerning first=196 second=243 amount=-1\nkerning first=196 second=244 amount=-1\nkerning first=196 second=245 amount=-1\nkerning first=196 second=246 amount=-1\nkerning first=196 second=87  amount=-5\nkerning first=196 second=84  amount=-10\nkerning first=196 second=117 amount=-1\nkerning first=196 second=249 amount=-1\nkerning first=196 second=250 amount=-1\nkerning first=196 second=251 amount=-1\nkerning first=196 second=252 amount=-1\nkerning first=196 second=122 amount=1\nkerning first=196 second=86  amount=-7\nkerning first=196 second=89  amount=-7\nkerning first=196 second=221 amount=-7\nkerning first=197 second=118 amount=-4\nkerning first=197 second=121 amount=-4\nkerning first=197 second=253 amount=-4\nkerning first=197 second=255 amount=-4\nkerning first=197 second=67  amount=-1\nkerning first=197 second=71  amount=-1\nkerning first=197 second=79  amount=-1\nkerning first=197 second=81  amount=-1\nkerning first=197 second=216 amount=-1\nkerning first=197 second=199 amount=-1\nkerning first=197 second=210 amount=-1\nkerning first=197 second=211 amount=-1\nkerning first=197 second=212 amount=-1\nkerning first=197 second=213 amount=-1\nkerning first=197 second=214 amount=-1\nkerning first=197 second=85  amount=-1\nkerning first=197 second=217 amount=-1\nkerning first=197 second=218 amount=-1\nkerning first=197 second=219 amount=-1\nkerning first=197 second=220 amount=-1\nkerning first=197 second=34  amount=-9\nkerning first=197 second=39  amount=-9\nkerning first=197 second=111 amount=-1\nkerning first=197 second=242 amount=-1\nkerning first=197 second=243 amount=-1\nkerning first=197 second=244 amount=-1\nkerning first=197 second=245 amount=-1\nkerning first=197 second=246 amount=-1\nkerning first=197 second=87  amount=-5\nkerning first=197 second=84  amount=-10\nkerning first=197 second=117 amount=-1\nkerning first=197 second=249 amount=-1\nkerning first=197 second=250 amount=-1\nkerning first=197 second=251 amount=-1\nkerning first=197 second=252 amount=-1\nkerning first=197 second=122 amount=1\nkerning first=197 second=86  amount=-7\nkerning first=197 second=89  amount=-7\nkerning first=197 second=221 amount=-7\nkerning first=199 second=84  amount=-2\nkerning first=200 second=118 amount=-2\nkerning first=200 second=121 amount=-2\nkerning first=200 second=253 amount=-2\nkerning first=200 second=255 amount=-2\nkerning first=200 second=111 amount=-1\nkerning first=200 second=242 amount=-1\nkerning first=200 second=243 amount=-1\nkerning first=200 second=244 amount=-1\nkerning first=200 second=245 amount=-1\nkerning first=200 second=246 amount=-1\nkerning first=200 second=84  amount=2\nkerning first=200 second=117 amount=-1\nkerning first=200 second=249 amount=-1\nkerning first=200 second=250 amount=-1\nkerning first=200 second=251 amount=-1\nkerning first=200 second=252 amount=-1\nkerning first=200 second=99  amount=-1\nkerning first=200 second=100 amount=-1\nkerning first=200 second=101 amount=-1\nkerning first=200 second=103 amount=-1\nkerning first=200 second=113 amount=-1\nkerning first=200 second=231 amount=-1\nkerning first=200 second=232 amount=-1\nkerning first=200 second=233 amount=-1\nkerning first=200 second=234 amount=-1\nkerning first=200 second=235 amount=-1\nkerning first=201 second=118 amount=-2\nkerning first=201 second=121 amount=-2\nkerning first=201 second=253 amount=-2\nkerning first=201 second=255 amount=-2\nkerning first=201 second=111 amount=-1\nkerning first=201 second=242 amount=-1\nkerning first=201 second=243 amount=-1\nkerning first=201 second=244 amount=-1\nkerning first=201 second=245 amount=-1\nkerning first=201 second=246 amount=-1\nkerning first=201 second=84  amount=2\nkerning first=201 second=117 amount=-1\nkerning first=201 second=249 amount=-1\nkerning first=201 second=250 amount=-1\nkerning first=201 second=251 amount=-1\nkerning first=201 second=252 amount=-1\nkerning first=201 second=99  amount=-1\nkerning first=201 second=100 amount=-1\nkerning first=201 second=101 amount=-1\nkerning first=201 second=103 amount=-1\nkerning first=201 second=113 amount=-1\nkerning first=201 second=231 amount=-1\nkerning first=201 second=232 amount=-1\nkerning first=201 second=233 amount=-1\nkerning first=201 second=234 amount=-1\nkerning first=201 second=235 amount=-1\nkerning first=202 second=118 amount=-2\nkerning first=202 second=121 amount=-2\nkerning first=202 second=253 amount=-2\nkerning first=202 second=255 amount=-2\nkerning first=202 second=111 amount=-1\nkerning first=202 second=242 amount=-1\nkerning first=202 second=243 amount=-1\nkerning first=202 second=244 amount=-1\nkerning first=202 second=245 amount=-1\nkerning first=202 second=246 amount=-1\nkerning first=202 second=84  amount=2\nkerning first=202 second=117 amount=-1\nkerning first=202 second=249 amount=-1\nkerning first=202 second=250 amount=-1\nkerning first=202 second=251 amount=-1\nkerning first=202 second=252 amount=-1\nkerning first=202 second=99  amount=-1\nkerning first=202 second=100 amount=-1\nkerning first=202 second=101 amount=-1\nkerning first=202 second=103 amount=-1\nkerning first=202 second=113 amount=-1\nkerning first=202 second=231 amount=-1\nkerning first=202 second=232 amount=-1\nkerning first=202 second=233 amount=-1\nkerning first=202 second=234 amount=-1\nkerning first=202 second=235 amount=-1\nkerning first=203 second=118 amount=-2\nkerning first=203 second=121 amount=-2\nkerning first=203 second=253 amount=-2\nkerning first=203 second=255 amount=-2\nkerning first=203 second=111 amount=-1\nkerning first=203 second=242 amount=-1\nkerning first=203 second=243 amount=-1\nkerning first=203 second=244 amount=-1\nkerning first=203 second=245 amount=-1\nkerning first=203 second=246 amount=-1\nkerning first=203 second=84  amount=2\nkerning first=203 second=117 amount=-1\nkerning first=203 second=249 amount=-1\nkerning first=203 second=250 amount=-1\nkerning first=203 second=251 amount=-1\nkerning first=203 second=252 amount=-1\nkerning first=203 second=99  amount=-1\nkerning first=203 second=100 amount=-1\nkerning first=203 second=101 amount=-1\nkerning first=203 second=103 amount=-1\nkerning first=203 second=113 amount=-1\nkerning first=203 second=231 amount=-1\nkerning first=203 second=232 amount=-1\nkerning first=203 second=233 amount=-1\nkerning first=203 second=234 amount=-1\nkerning first=203 second=235 amount=-1\nkerning first=204 second=84  amount=-2\nkerning first=204 second=89  amount=-2\nkerning first=204 second=221 amount=-2\nkerning first=204 second=65  amount=1\nkerning first=204 second=192 amount=1\nkerning first=204 second=193 amount=1\nkerning first=204 second=194 amount=1\nkerning first=204 second=195 amount=1\nkerning first=204 second=196 amount=1\nkerning first=204 second=197 amount=1\nkerning first=204 second=88  amount=1\nkerning first=205 second=84  amount=-2\nkerning first=205 second=89  amount=-2\nkerning first=205 second=221 amount=-2\nkerning first=205 second=65  amount=1\nkerning first=205 second=192 amount=1\nkerning first=205 second=193 amount=1\nkerning first=205 second=194 amount=1\nkerning first=205 second=195 amount=1\nkerning first=205 second=196 amount=1\nkerning first=205 second=197 amount=1\nkerning first=205 second=88  amount=1\nkerning first=206 second=84  amount=-2\nkerning first=206 second=89  amount=-2\nkerning first=206 second=221 amount=-2\nkerning first=206 second=65  amount=1\nkerning first=206 second=192 amount=1\nkerning first=206 second=193 amount=1\nkerning first=206 second=194 amount=1\nkerning first=206 second=195 amount=1\nkerning first=206 second=196 amount=1\nkerning first=206 second=197 amount=1\nkerning first=206 second=88  amount=1\nkerning first=207 second=84  amount=-2\nkerning first=207 second=89  amount=-2\nkerning first=207 second=221 amount=-2\nkerning first=207 second=65  amount=1\nkerning first=207 second=192 amount=1\nkerning first=207 second=193 amount=1\nkerning first=207 second=194 amount=1\nkerning first=207 second=195 amount=1\nkerning first=207 second=196 amount=1\nkerning first=207 second=197 amount=1\nkerning first=207 second=88  amount=1\nkerning first=209 second=84  amount=-2\nkerning first=209 second=89  amount=-2\nkerning first=209 second=221 amount=-2\nkerning first=209 second=65  amount=1\nkerning first=209 second=192 amount=1\nkerning first=209 second=193 amount=1\nkerning first=209 second=194 amount=1\nkerning first=209 second=195 amount=1\nkerning first=209 second=196 amount=1\nkerning first=209 second=197 amount=1\nkerning first=209 second=88  amount=1\nkerning first=210 second=84  amount=-2\nkerning first=210 second=86  amount=-2\nkerning first=210 second=89  amount=-3\nkerning first=210 second=221 amount=-3\nkerning first=210 second=65  amount=-2\nkerning first=210 second=192 amount=-2\nkerning first=210 second=193 amount=-2\nkerning first=210 second=194 amount=-2\nkerning first=210 second=195 amount=-2\nkerning first=210 second=196 amount=-2\nkerning first=210 second=197 amount=-2\nkerning first=210 second=88  amount=-2\nkerning first=210 second=44  amount=-8\nkerning first=210 second=46  amount=-8\nkerning first=210 second=90  amount=-2\nkerning first=211 second=84  amount=-2\nkerning first=211 second=86  amount=-2\nkerning first=211 second=89  amount=-3\nkerning first=211 second=221 amount=-3\nkerning first=211 second=65  amount=-2\nkerning first=211 second=192 amount=-2\nkerning first=211 second=193 amount=-2\nkerning first=211 second=194 amount=-2\nkerning first=211 second=195 amount=-2\nkerning first=211 second=196 amount=-2\nkerning first=211 second=197 amount=-2\nkerning first=211 second=88  amount=-2\nkerning first=211 second=44  amount=-8\nkerning first=211 second=46  amount=-8\nkerning first=211 second=90  amount=-2\nkerning first=212 second=84  amount=-2\nkerning first=212 second=86  amount=-2\nkerning first=212 second=89  amount=-3\nkerning first=212 second=221 amount=-3\nkerning first=212 second=65  amount=-2\nkerning first=212 second=192 amount=-2\nkerning first=212 second=193 amount=-2\nkerning first=212 second=194 amount=-2\nkerning first=212 second=195 amount=-2\nkerning first=212 second=196 amount=-2\nkerning first=212 second=197 amount=-2\nkerning first=212 second=88  amount=-2\nkerning first=212 second=44  amount=-8\nkerning first=212 second=46  amount=-8\nkerning first=212 second=90  amount=-2\nkerning first=213 second=84  amount=-2\nkerning first=213 second=86  amount=-2\nkerning first=213 second=89  amount=-3\nkerning first=213 second=221 amount=-3\nkerning first=213 second=65  amount=-2\nkerning first=213 second=192 amount=-2\nkerning first=213 second=193 amount=-2\nkerning first=213 second=194 amount=-2\nkerning first=213 second=195 amount=-2\nkerning first=213 second=196 amount=-2\nkerning first=213 second=197 amount=-2\nkerning first=213 second=88  amount=-2\nkerning first=213 second=44  amount=-8\nkerning first=213 second=46  amount=-8\nkerning first=213 second=90  amount=-2\nkerning first=214 second=84  amount=-2\nkerning first=214 second=86  amount=-2\nkerning first=214 second=89  amount=-3\nkerning first=214 second=221 amount=-3\nkerning first=214 second=65  amount=-2\nkerning first=214 second=192 amount=-2\nkerning first=214 second=193 amount=-2\nkerning first=214 second=194 amount=-2\nkerning first=214 second=195 amount=-2\nkerning first=214 second=196 amount=-2\nkerning first=214 second=197 amount=-2\nkerning first=214 second=88  amount=-2\nkerning first=214 second=44  amount=-8\nkerning first=214 second=46  amount=-8\nkerning first=214 second=90  amount=-2\nkerning first=217 second=65  amount=-2\nkerning first=217 second=192 amount=-2\nkerning first=217 second=193 amount=-2\nkerning first=217 second=194 amount=-2\nkerning first=217 second=195 amount=-2\nkerning first=217 second=196 amount=-2\nkerning first=217 second=197 amount=-2\nkerning first=218 second=65  amount=-2\nkerning first=218 second=192 amount=-2\nkerning first=218 second=193 amount=-2\nkerning first=218 second=194 amount=-2\nkerning first=218 second=195 amount=-2\nkerning first=218 second=196 amount=-2\nkerning first=218 second=197 amount=-2\nkerning first=219 second=65  amount=-2\nkerning first=219 second=192 amount=-2\nkerning first=219 second=193 amount=-2\nkerning first=219 second=194 amount=-2\nkerning first=219 second=195 amount=-2\nkerning first=219 second=196 amount=-2\nkerning first=219 second=197 amount=-2\nkerning first=220 second=65  amount=-2\nkerning first=220 second=192 amount=-2\nkerning first=220 second=193 amount=-2\nkerning first=220 second=194 amount=-2\nkerning first=220 second=195 amount=-2\nkerning first=220 second=196 amount=-2\nkerning first=220 second=197 amount=-2\nkerning first=221 second=118 amount=-2\nkerning first=221 second=121 amount=-2\nkerning first=221 second=253 amount=-2\nkerning first=221 second=255 amount=-2\nkerning first=221 second=67  amount=-2\nkerning first=221 second=71  amount=-2\nkerning first=221 second=79  amount=-2\nkerning first=221 second=81  amount=-2\nkerning first=221 second=216 amount=-2\nkerning first=221 second=199 amount=-2\nkerning first=221 second=210 amount=-2\nkerning first=221 second=211 amount=-2\nkerning first=221 second=212 amount=-2\nkerning first=221 second=213 amount=-2\nkerning first=221 second=214 amount=-2\nkerning first=221 second=85  amount=-7\nkerning first=221 second=217 amount=-7\nkerning first=221 second=218 amount=-7\nkerning first=221 second=219 amount=-7\nkerning first=221 second=220 amount=-7\nkerning first=221 second=111 amount=-5\nkerning first=221 second=242 amount=-5\nkerning first=221 second=243 amount=-5\nkerning first=221 second=244 amount=-5\nkerning first=221 second=245 amount=-5\nkerning first=221 second=246 amount=-5\nkerning first=221 second=87  amount=1\nkerning first=221 second=84  amount=1\nkerning first=221 second=117 amount=-3\nkerning first=221 second=249 amount=-3\nkerning first=221 second=250 amount=-3\nkerning first=221 second=251 amount=-3\nkerning first=221 second=252 amount=-3\nkerning first=221 second=122 amount=-2\nkerning first=221 second=86  amount=1\nkerning first=221 second=89  amount=1\nkerning first=221 second=221 amount=1\nkerning first=221 second=65  amount=-7\nkerning first=221 second=192 amount=-7\nkerning first=221 second=193 amount=-7\nkerning first=221 second=194 amount=-7\nkerning first=221 second=195 amount=-7\nkerning first=221 second=196 amount=-7\nkerning first=221 second=197 amount=-7\nkerning first=221 second=88  amount=1\nkerning first=221 second=44  amount=-16\nkerning first=221 second=46  amount=-16\nkerning first=221 second=99  amount=-5\nkerning first=221 second=100 amount=-5\nkerning first=221 second=101 amount=-5\nkerning first=221 second=103 amount=-5\nkerning first=221 second=113 amount=-5\nkerning first=221 second=231 amount=-5\nkerning first=221 second=232 amount=-5\nkerning first=221 second=233 amount=-5\nkerning first=221 second=234 amount=-5\nkerning first=221 second=235 amount=-5\nkerning first=221 second=120 amount=-2\nkerning first=221 second=45  amount=-4\nkerning first=221 second=173 amount=-4\nkerning first=221 second=109 amount=-3\nkerning first=221 second=110 amount=-3\nkerning first=221 second=112 amount=-3\nkerning first=221 second=241 amount=-3\nkerning first=221 second=83  amount=-1\nkerning first=221 second=97  amount=-6\nkerning first=221 second=224 amount=-6\nkerning first=221 second=225 amount=-6\nkerning first=221 second=226 amount=-6\nkerning first=221 second=227 amount=-6\nkerning first=221 second=228 amount=-6\nkerning first=221 second=229 amount=-6\nkerning first=221 second=115 amount=-5\nkerning first=221 second=74  amount=-7\nkerning first=224 second=118 amount=-1\nkerning first=224 second=121 amount=-1\nkerning first=224 second=253 amount=-1\nkerning first=224 second=255 amount=-1\nkerning first=224 second=34  amount=-5\nkerning first=224 second=39  amount=-5\nkerning first=225 second=118 amount=-1\nkerning first=225 second=121 amount=-1\nkerning first=225 second=253 amount=-1\nkerning first=225 second=255 amount=-1\nkerning first=225 second=34  amount=-5\nkerning first=225 second=39  amount=-5\nkerning first=226 second=118 amount=-1\nkerning first=226 second=121 amount=-1\nkerning first=226 second=253 amount=-1\nkerning first=226 second=255 amount=-1\nkerning first=226 second=34  amount=-5\nkerning first=226 second=39  amount=-5\nkerning first=227 second=118 amount=-1\nkerning first=227 second=121 amount=-1\nkerning first=227 second=253 amount=-1\nkerning first=227 second=255 amount=-1\nkerning first=227 second=34  amount=-5\nkerning first=227 second=39  amount=-5\nkerning first=228 second=118 amount=-1\nkerning first=228 second=121 amount=-1\nkerning first=228 second=253 amount=-1\nkerning first=228 second=255 amount=-1\nkerning first=228 second=34  amount=-5\nkerning first=228 second=39  amount=-5\nkerning first=229 second=118 amount=-1\nkerning first=229 second=121 amount=-1\nkerning first=229 second=253 amount=-1\nkerning first=229 second=255 amount=-1\nkerning first=229 second=34  amount=-5\nkerning first=229 second=39  amount=-5\nkerning first=231 second=34  amount=-1\nkerning first=231 second=39  amount=-1\nkerning first=232 second=118 amount=-1\nkerning first=232 second=121 amount=-1\nkerning first=232 second=253 amount=-1\nkerning first=232 second=255 amount=-1\nkerning first=232 second=34  amount=-1\nkerning first=232 second=39  amount=-1\nkerning first=233 second=118 amount=-1\nkerning first=233 second=121 amount=-1\nkerning first=233 second=253 amount=-1\nkerning first=233 second=255 amount=-1\nkerning first=233 second=34  amount=-1\nkerning first=233 second=39  amount=-1\nkerning first=234 second=118 amount=-1\nkerning first=234 second=121 amount=-1\nkerning first=234 second=253 amount=-1\nkerning first=234 second=255 amount=-1\nkerning first=234 second=34  amount=-1\nkerning first=234 second=39  amount=-1\nkerning first=235 second=118 amount=-1\nkerning first=235 second=121 amount=-1\nkerning first=235 second=253 amount=-1\nkerning first=235 second=255 amount=-1\nkerning first=235 second=34  amount=-1\nkerning first=235 second=39  amount=-1\nkerning first=241 second=34  amount=-8\nkerning first=241 second=39  amount=-8\nkerning first=242 second=118 amount=-1\nkerning first=242 second=121 amount=-1\nkerning first=242 second=253 amount=-1\nkerning first=242 second=255 amount=-1\nkerning first=242 second=34  amount=-11\nkerning first=242 second=39  amount=-11\nkerning first=242 second=122 amount=-1\nkerning first=242 second=120 amount=-2\nkerning first=243 second=118 amount=-1\nkerning first=243 second=121 amount=-1\nkerning first=243 second=253 amount=-1\nkerning first=243 second=255 amount=-1\nkerning first=243 second=34  amount=-11\nkerning first=243 second=39  amount=-11\nkerning first=243 second=122 amount=-1\nkerning first=243 second=120 amount=-2\nkerning first=244 second=118 amount=-1\nkerning first=244 second=121 amount=-1\nkerning first=244 second=253 amount=-1\nkerning first=244 second=255 amount=-1\nkerning first=244 second=34  amount=-11\nkerning first=244 second=39  amount=-11\nkerning first=244 second=122 amount=-1\nkerning first=244 second=120 amount=-2\nkerning first=245 second=118 amount=-1\nkerning first=245 second=121 amount=-1\nkerning first=245 second=253 amount=-1\nkerning first=245 second=255 amount=-1\nkerning first=245 second=34  amount=-11\nkerning first=245 second=39  amount=-11\nkerning first=245 second=122 amount=-1\nkerning first=245 second=120 amount=-2\nkerning first=246 second=118 amount=-1\nkerning first=246 second=121 amount=-1\nkerning first=246 second=253 amount=-1\nkerning first=246 second=255 amount=-1\nkerning first=246 second=34  amount=-11\nkerning first=246 second=39  amount=-11\nkerning first=246 second=122 amount=-1\nkerning first=246 second=120 amount=-2\nkerning first=253 second=34  amount=1\nkerning first=253 second=39  amount=1\nkerning first=253 second=111 amount=-1\nkerning first=253 second=242 amount=-1\nkerning first=253 second=243 amount=-1\nkerning first=253 second=244 amount=-1\nkerning first=253 second=245 amount=-1\nkerning first=253 second=246 amount=-1\nkerning first=253 second=44  amount=-8\nkerning first=253 second=46  amount=-8\nkerning first=253 second=99  amount=-1\nkerning first=253 second=100 amount=-1\nkerning first=253 second=101 amount=-1\nkerning first=253 second=103 amount=-1\nkerning first=253 second=113 amount=-1\nkerning first=253 second=231 amount=-1\nkerning first=253 second=232 amount=-1\nkerning first=253 second=233 amount=-1\nkerning first=253 second=234 amount=-1\nkerning first=253 second=235 amount=-1\nkerning first=253 second=97  amount=-1\nkerning first=253 second=224 amount=-1\nkerning first=253 second=225 amount=-1\nkerning first=253 second=226 amount=-1\nkerning first=253 second=227 amount=-1\nkerning first=253 second=228 amount=-1\nkerning first=253 second=229 amount=-1\nkerning first=255 second=34  amount=1\nkerning first=255 second=39  amount=1\nkerning first=255 second=111 amount=-1\nkerning first=255 second=242 amount=-1\nkerning first=255 second=243 amount=-1\nkerning first=255 second=244 amount=-1\nkerning first=255 second=245 amount=-1\nkerning first=255 second=246 amount=-1\nkerning first=255 second=44  amount=-8\nkerning first=255 second=46  amount=-8\nkerning first=255 second=99  amount=-1\nkerning first=255 second=100 amount=-1\nkerning first=255 second=101 amount=-1\nkerning first=255 second=103 amount=-1\nkerning first=255 second=113 amount=-1\nkerning first=255 second=231 amount=-1\nkerning first=255 second=232 amount=-1\nkerning first=255 second=233 amount=-1\nkerning first=255 second=234 amount=-1\nkerning first=255 second=235 amount=-1\nkerning first=255 second=97  amount=-1\nkerning first=255 second=224 amount=-1\nkerning first=255 second=225 amount=-1\nkerning first=255 second=226 amount=-1\nkerning first=255 second=227 amount=-1\nkerning first=255 second=228 amount=-1\nkerning first=255 second=229 amount=-1\n";
}

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;

var _interaction = require('./interaction');

var _interaction2 = _interopRequireDefault(_interaction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function create() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      group = _ref.group,
      panel = _ref.panel;

  var interaction = (0, _interaction2.default)(panel);

  interaction.events.on('onPressed', handleOnPress);
  interaction.events.on('tick', handleTick);
  interaction.events.on('onReleased', handleOnRelease);

  var tempMatrix = new THREE.Matrix4();
  var tPosition = new THREE.Vector3();

  var oldParent = void 0;

  function getTopLevelFolder(group) {
    var folder = group.folder;
    while (folder.folder !== folder) {
      folder = folder.folder;
    }return folder;
  }

  function handleTick() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        input = _ref2.input;

    var folder = getTopLevelFolder(group);
    if (folder === undefined) {
      return;
    }

    if (input.mouse) {
      if (input.pressed && input.selected && input.raycast.ray.intersectPlane(input.mousePlane, input.mouseIntersection)) {
        if (input.interaction.press === interaction) {
          folder.position.copy(input.mouseIntersection.sub(input.mouseOffset));
          return;
        }
      } else if (input.intersections.length > 0) {
        var hitObject = input.intersections[0].object;
        if (hitObject === panel) {
          hitObject.updateMatrixWorld();
          tPosition.setFromMatrixPosition(hitObject.matrixWorld);

          input.mousePlane.setFromNormalAndCoplanarPoint(input.mouseCamera.getWorldDirection(input.mousePlane.normal), tPosition);
          // console.log( input.mousePlane );
        }
      }
    }
  }

  function handleOnPress(p) {
    var inputObject = p.inputObject,
        input = p.input;


    var folder = getTopLevelFolder(group);
    if (folder === undefined) {
      return;
    }

    if (folder.beingMoved === true) {
      return;
    }

    if (input.mouse) {
      if (input.intersections.length > 0) {
        if (input.raycast.ray.intersectPlane(input.mousePlane, input.mouseIntersection)) {
          var hitObject = input.intersections[0].object;
          if (hitObject !== panel) {
            return;
          }

          input.selected = folder;

          input.selected.updateMatrixWorld();
          tPosition.setFromMatrixPosition(input.selected.matrixWorld);

          input.mouseOffset.copy(input.mouseIntersection).sub(tPosition);
          // console.log( input.mouseOffset );
        }
      }
    } else {
      tempMatrix.getInverse(inputObject.matrixWorld);

      folder.matrix.premultiply(tempMatrix);
      folder.matrix.decompose(folder.position, folder.quaternion, folder.scale);

      oldParent = folder.parent;
      inputObject.add(folder);
    }

    p.locked = true;

    folder.beingMoved = true;

    input.events.emit('grabbed', input);
  }

  function handleOnRelease(p) {
    var inputObject = p.inputObject,
        input = p.input;


    var folder = getTopLevelFolder(group);
    if (folder === undefined) {
      return;
    }

    if (folder.beingMoved === false) {
      return;
    }

    if (input.mouse) {
      input.selected = undefined;
    } else {

      if (oldParent === undefined) {
        return;
      }

      folder.matrix.premultiply(inputObject.matrixWorld);
      folder.matrix.decompose(folder.position, folder.quaternion, folder.scale);
      oldParent.add(folder);
      oldParent = undefined;
    }

    folder.beingMoved = false;

    input.events.emit('grabReleased', input);
  }

  return interaction;
} /**
  * dat-guiVR Javascript Controller Library for VR
  * https://github.com/dataarts/dat.guiVR
  *
  * Copyright 2016 Data Arts Team, Google Inc.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */

},{"./interaction":11}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var grabBar = exports.grabBar = function () {
  var image = new Image();
  image.src = 'data:image/png;base64,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/GMzLdsAADskaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzMiA3OS4xNTkyODQsIDIwMTYvMDQvMTktMTM6MTM6NDAgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgICAgICAgICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iPgogICAgICAgICA8eG1wOkNyZWF0b3JUb29sPkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1LjUgKFdpbmRvd3MpPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDE2LTA5LTI4VDE2OjI1OjMyLTA3OjAwPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMTYtMDktMjhUMTY6Mzc6MjMtMDc6MDA8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8eG1wOk1ldGFkYXRhRGF0ZT4yMDE2LTA5LTI4VDE2OjM3OjIzLTA3OjAwPC94bXA6TWV0YWRhdGFEYXRlPgogICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3BuZzwvZGM6Zm9ybWF0PgogICAgICAgICA8cGhvdG9zaG9wOkNvbG9yTW9kZT4zPC9waG90b3Nob3A6Q29sb3JNb2RlPgogICAgICAgICA8cGhvdG9zaG9wOklDQ1Byb2ZpbGU+c1JHQiBJRUM2MTk2Ni0yLjE8L3Bob3Rvc2hvcDpJQ0NQcm9maWxlPgogICAgICAgICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOmFhYTFjMTQzLTUwZmUtOTQ0My1hNThmLWEyM2VkNTM3MDdmMDwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjdlNzdmYmZjLTg1ZDQtMTFlNi1hYzhmLWFjNzU0ZWQ1ODM3ZjwveG1wTU06RG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOmM1ZmM0ZGYyLTkxY2MtZTI0MS04Y2VjLTMzODIyY2Q1ZWFlOTwveG1wTU06T3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06SGlzdG9yeT4KICAgICAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmNyZWF0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDpjNWZjNGRmMi05MWNjLWUyNDEtOGNlYy0zMzgyMmNkNWVhZTk8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTYtMDktMjhUMTY6MjU6MzItMDc6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1LjUgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y29udmVydGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpwYXJhbWV0ZXJzPmZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmc8L3N0RXZ0OnBhcmFtZXRlcnM+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmFhYTFjMTQzLTUwZmUtOTQ0My1hNThmLWEyM2VkNTM3MDdmMDwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNi0wOS0yOFQxNjozNzoyMy0wNzowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgIDwveG1wTU06SGlzdG9yeT4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+MzAwMDAwMC8xMDAwMDwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+MzAwMDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT4xPC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj42NDwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4zMjwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+OhF7RwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAAlElEQVR42uzZsQ3AIAxEUTuTZJRskt5LRFmCdTLapUKCBijo/F0hn2SkJxIKXJJlrsOSFwAAAABA6vKI6O7BUorXdZu1/VEWEZeZfbN5m/ZamjfK+AQAAAAAAAAAAAAAAAAAAAAAACBfuaSna7i/dd1mbX+USTrN7J7N27TX0rxRxgngZYifIAAAAJC4fgAAAP//AwAuMVPw20hxCwAAAABJRU5ErkJggg==';

  var texture = new THREE.Texture();
  texture.image = image;
  texture.needsUpdate = true;
  // texture.minFilter = THREE.LinearMipMapLinearFilter;
  // texture.magFilter = THREE.LinearFilter;
  // texture.generateMipmaps = false;

  var material = new THREE.MeshBasicMaterial({
    // color: 0xff0000,
    side: THREE.DoubleSide,
    transparent: true,
    map: texture
  });
  material.alphaTest = 0.5;

  return function () {
    var geometry = new THREE.PlaneGeometry(image.width / 1000, image.height / 1000, 1, 1);

    var mesh = new THREE.Mesh(geometry, material);
    return mesh;
  };
}();

var downArrow = exports.downArrow = function () {
  var image = new Image();
  image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAABACAYAAADS1n9/AAAACXBIWXMAACxLAAAsSwGlPZapAAA4K2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzIgNzkuMTU5Mjg0LCAyMDE2LzA0LzE5LTEzOjEzOjQwICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNS41IChXaW5kb3dzKTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8eG1wOkNyZWF0ZURhdGU+MjAxNi0xMC0xOFQxNzozMzowNi0wNzowMDwveG1wOkNyZWF0ZURhdGU+CiAgICAgICAgIDx4bXA6TW9kaWZ5RGF0ZT4yMDE2LTEwLTIwVDIxOjE4OjI1LTA3OjAwPC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAxNi0xMC0yMFQyMToxODoyNS0wNzowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDozMDQyYjI0ZS1iMzc2LWI0NGItOGI4Yy1lZTFjY2IzYWU1MDU8L3htcE1NOkluc3RhbmNlSUQ+CiAgICAgICAgIDx4bXBNTTpEb2N1bWVudElEPnhtcC5kaWQ6MzA0MmIyNGUtYjM3Ni1iNDRiLThiOGMtZWUxY2NiM2FlNTA1PC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6MzA0MmIyNGUtYjM3Ni1iNDRiLThiOGMtZWUxY2NiM2FlNTA1PC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjMwNDJiMjRlLWIzNzYtYjQ0Yi04YjhjLWVlMWNjYjNhZTUwNTwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNi0xMC0xOFQxNzozMzowNi0wNzowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgIDwveG1wTU06SGlzdG9yeT4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+Mjg4MDAwMC8xMDAwMDwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+Mjg4MDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT42NTUzNTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MTI4PC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjY0PC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz5Uilz0AAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAJdSURBVHja7N3LccJAEIThRuW7ncUeTQhkQAiIDMgIhUIIcFQWJgJ88FKlovwArN2d6Z45cZGA/T9viYftxeVyQYzudLEEASAmAMQEgBjJeWl1xymlNwAHAMdxHHvFxU8pDQCWAFbjOH7I7ACT+O8ANnkhFONv8hoc8prwA7iJfx0pBJP412mGoDMQXwrBN/GbIuiMxJdA8Ev8Zgg6Q/GpEdwRvwmCzlh8SgQPxK+OoMYOMDwYnwrBE/GnCAbXAPKTX//jFJuUUu84fv9k/OusS/8QdAbl387eI4L8mPcznKroTlhyB1jOeC5XCGaMX2ItqwFYATipISgQ/5TX0heA/N62FIJS8Ut+TlD0IlAJgcf4VV4GKiDwGr/W+wDUCDzHrwaAFYH3+FUBsCFgiF8dAAsClvhNAHhHwBS/GQCvCNjiNwXgDQFj/OYAvCBgjW8CgHUEzPHNALCKgD2+KQDWECjENwfACgKV+CYBTBD0AM61ERSIfwbQW4xvFkBGcMw7QTUEheKv8nNBADCMQDG+eQC1EKjGB4CFl78RlFJa4usXTF7njJRvz35eD/FdASiIAKrx3QEohACq8V1cA1S6JpCM7xKAQQRu47sFYAiB6/iuARhA4D6+ewANEVDEpwDQAAFNfBoAFRFQxacCUAEBXXw6AAURUManBFAAAW18WgAzIqCOTw1gBgT08ekBTBDsnjh0xx5fAkBGMADYPnDINh+DAKCHQCa+FIA7EUjFlwPwBwK5+JIAfkAgGR9w+JWwOef6zWDV+PIAYuLfxgWAWIIAEBMAYgJAjOR8DgD+6Ozgv4uy9gAAAABJRU5ErkJggg==';

  var texture = new THREE.Texture();
  texture.image = image;
  texture.needsUpdate = true;
  texture.minFilter = THREE.LinearMipMapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  // texture.anisotropic
  // texture.generateMipmaps = false;

  var material = new THREE.MeshBasicMaterial({
    // color: 0xff0000,
    side: THREE.DoubleSide,
    transparent: true,
    map: texture
  });
  material.alphaTest = 0.2;

  return function () {
    var h = 0.3;
    var geo = new THREE.PlaneGeometry(image.width / 1000 * h, image.height / 1000 * h, 1, 1);
    geo.translate(-0.005, -0.004, 0);
    return new THREE.Mesh(geo, material);
  };
}();

var checkmark = exports.checkmark = function () {
  var image = new Image();
  image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAABACAYAAADS1n9/AAAACXBIWXMAACxLAAAsSwGlPZapAAA4K2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzIgNzkuMTU5Mjg0LCAyMDE2LzA0LzE5LTEzOjEzOjQwICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNS41IChXaW5kb3dzKTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8eG1wOkNyZWF0ZURhdGU+MjAxNi0xMC0xOFQxNzozMzowNi0wNzowMDwveG1wOkNyZWF0ZURhdGU+CiAgICAgICAgIDx4bXA6TW9kaWZ5RGF0ZT4yMDE2LTEwLTIwVDIxOjMzOjUzLTA3OjAwPC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAxNi0xMC0yMFQyMTozMzo1My0wNzowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDo2ODcxYTk5Yy0zNjE5LTlkNGEtODdkNi0wYWE5YTRiNWU4Mjc8L3htcE1NOkluc3RhbmNlSUQ+CiAgICAgICAgIDx4bXBNTTpEb2N1bWVudElEPnhtcC5kaWQ6Njg3MWE5OWMtMzYxOS05ZDRhLTg3ZDYtMGFhOWE0YjVlODI3PC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6Njg3MWE5OWMtMzYxOS05ZDRhLTg3ZDYtMGFhOWE0YjVlODI3PC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjY4NzFhOTljLTM2MTktOWQ0YS04N2Q2LTBhYTlhNGI1ZTgyNzwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNi0xMC0xOFQxNzozMzowNi0wNzowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgIDwveG1wTU06SGlzdG9yeT4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+Mjg4MDAwMC8xMDAwMDwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+Mjg4MDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT42NTUzNTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MTI4PC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjY0PC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz5z9RT3AAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAATtSURBVHja7Jzbb5RFGMZ/2xbCvVhASExUiI144w0hQtHEGrHgISqgN6KgtNYWAb0w0Wo1XqrbPbSlokYSxfMhemX/Aa7wGAVq8XTp30DXi5mJm0a2u9v3/b6Z2XludrOHdw/PMzPP+74zX6FWqyGFgYEBElpGD/AecCtwB/Dbcm+Ym5sT+/Cu9P/nim6gCDwCXAt8DVyX5RdIAsgPBaAEjNQ9diPwFbA5CSB+TAFP/c/jW4HPgL4kgHgxCww1eP5m4GN7mwQQEbos+U808dqtwEf2NgkgErc/0yT5Dn12OdiSBBA++aUWyXfYAnwDXJ8EEG6qNwkMryDGZpsi3pAEEB6qV3D7raIP+NKmikkAgeAt4IhgvJvsTJAE4DkKwCngsELss0kA/q/5s8AhhdjTwEFpd5ogS35VaeTPAk8Di0kA/pJfEl7zHU7SuHKYlgAP1vyykNtfihkt8pMAZEkaVohbVYqbBCCIU8CTCnFLwJj2l08CWNma/7aS268Cx6QNXxKArHmeBh5XWk7GsiA/TwGMYfa/hUp+mfYaO824/eGsyM9LAC9gmiPvAzsDI7/Lrs1DSiN/KI8flCXGgVft/V7gDLArIAFMh+r2fRDAS8DEksc2Ah8C/R3s9svAaJ5TWlbkv3yF59Zjdr1s93ja13L7Fev2azELYLwB+Q5rMb3ubR4avpNKbn8aeAa4nLe6tQ3fRJOv7QW+8Ggm6LEjVKOxM4M5D3A57x+pKYAX6wxfs9gAfALs8IB8rcaOKxvXfFC5lgDGgVfafK8zhrty/E+0XHklL7efpQAmWpj2lxPBbTn8J7Po1fZH8QzSAnjNjn4JrMecjsmqWFQA3lVy+yXr9oldAHcKx7sa+DwDY9hj8/yDiqneYicI4FHgR+GYa5WzA83GzhRw1FfyNQTwC3CPvZXEOuBTzEUUJLEqg1TPW/K1TOCfwCBwUTjuNciWjbsxZViNVC+32r4vaeAfwF3AgnDcTVYEtwuNUA3yy5jdu3SyAAB+B3YrLAcbBOoE7yhN+5N2zScJwGAeeAD4TjhuL6aB1Kon6LbkP6Y08o/jSYXPFwEAnAceVhDBVS1mB66xo0H+FKaxs0hgyKodfAF4EPhJqU6w3EywyhqzQ0rkj4RIfpYCALgE7LEzgiRcxbC/wcivoFPedeQHi6y3hP1ljeG8Uoq4NDsoYIo8Wjt5giY/DwHUp4i/KmQHZ+pEUMDs5NFw+0UyOLQRqwDccnAv8L1w3HXAaZsivq5k+IrACSJBnqeD54EDwAfALYJxNwHfKpmysiV/MRYB5H0y6AKwH/hBOO5qYI2C4TsaE/k+CADM1bH3Il8xlETVGr4akcGXs4F/A3fbGcE3VAioth+qAMB0EXd7JoJJPNzGFasAwDSQBpHfVNKu2z9G5PDxePgC8BBwLueRfyLGNT8EAYDZTHIA+QZSs2v+8djcfmgCcHWC+5FvIC3n9kc7hXzfBeCM4R7ky8Yd5/ZDFQD810C6qPgZ0bv9kAVQnyJqFIvexGzmIAnAb1wC7hM2hkXgWToYoV0lzDWQJFLE6Bo7nSAAlyLuY2UNpAoZXootCUAeC5gG0s9tkj9KQtACANNAGqS1PYalRH48AnApYrPby4oEdmgjCaD5FHEvjbeXvYEp7yZEKADnCfZbEfwDPI85L+DIf44OaOy0g38HAM/e7guIRx94AAAAAElFTkSuQmCC';

  var texture = new THREE.Texture();
  texture.image = image;
  texture.needsUpdate = true;
  texture.minFilter = THREE.LinearMipMapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  // texture.anisotropic
  // texture.generateMipmaps = false;

  var material = new THREE.MeshBasicMaterial({
    // color: 0xff0000,
    side: THREE.DoubleSide,
    transparent: true,
    map: texture
  });
  material.alphaTest = 0.2;

  return function () {
    var h = 0.4;
    var geo = new THREE.PlaneGeometry(image.width / 1000 * h, image.height / 1000 * h, 1, 1);
    geo.translate(0.025, 0, 0);
    return new THREE.Mesh(geo, material);
  };
}();

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createImageButton;

var _SubdivisionModifier = require('../thirdparty/SubdivisionModifier');

var SubdivisionModifier = _interopRequireWildcard(_SubdivisionModifier);

var _textlabel = require('./textlabel');

var _textlabel2 = _interopRequireDefault(_textlabel);

var _interaction = require('./interaction');

var _interaction2 = _interopRequireDefault(_interaction);

var _colors = require('./colors');

var Colors = _interopRequireWildcard(_colors);

var _layout = require('./layout');

var Layout = _interopRequireWildcard(_layout);

var _sharedmaterials = require('./sharedmaterials');

var SharedMaterials = _interopRequireWildcard(_sharedmaterials);

var _grab = require('./grab');

var Grab = _interopRequireWildcard(_grab);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function createImageButton() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      textCreator = _ref.textCreator,
      object = _ref.object,
      _ref$propertyName = _ref.propertyName,
      propertyName = _ref$propertyName === undefined ? 'undefined' : _ref$propertyName,
      _ref$image = _ref.image,
      image = _ref$image === undefined ? "textures/spotlight.jpg" : _ref$image,
      _ref$width = _ref.width,
      width = _ref$width === undefined ? Layout.PANEL_WIDTH : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === undefined ? Layout.PANEL_WIDTH / 3 : _ref$height,
      _ref$depth = _ref.depth,
      depth = _ref$depth === undefined ? Layout.PANEL_DEPTH : _ref$depth;

  function applyImageToMaterial(image, targetMaterial) {
    if (typeof image === "string") {
      //TODO cache.  Does TextureLoader already cache?
      //TODO Image only on front face of button.
      new THREE.TextureLoader().load(image, function (texture) {
        texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
        targetMaterial.map = texture;
        targetMaterial.needsUpdate = true;
      });
    } else if (image.isTexture) {
      targetMaterial.map = image;
    } else if (image.isWebGLRenderTarget) {
      targetMaterial.map = image.texture;
    } else throw "not sure how to interpret image " + image;
    targetMaterial.needsUpdate = true;
  }

  var BUTTON_WIDTH = width * 0.5 - Layout.PANEL_MARGIN;
  var BUTTON_HEIGHT = height - Layout.PANEL_MARGIN;
  var BUTTON_DEPTH = Layout.BUTTON_DEPTH;

  var group = new THREE.Group();
  group.spacing = height;

  var panel = Layout.createPanel(width, height, depth);
  group.add(panel);

  //  base checkbox
  var divisions = 4;
  var aspectRatio = BUTTON_WIDTH / BUTTON_HEIGHT;
  var rect = new THREE.BoxGeometry(BUTTON_WIDTH, BUTTON_HEIGHT, BUTTON_DEPTH, Math.floor(divisions * aspectRatio), divisions, divisions);
  var modifier = new THREE.SubdivisionModifier(1);
  modifier.modify(rect);
  rect.translate(BUTTON_WIDTH * 0.5, 0, 0);

  //  hitscan volume
  var hitscanMaterial = new THREE.MeshBasicMaterial();
  hitscanMaterial.visible = false;

  var hitscanVolume = new THREE.Mesh(rect.clone(), hitscanMaterial);
  hitscanVolume.position.z = BUTTON_DEPTH * 0.5;
  hitscanVolume.position.x = width * 0.5;

  var material = new THREE.MeshBasicMaterial();
  applyImageToMaterial(image, material);
  var filledVolume = new THREE.Mesh(rect.clone(), material);
  hitscanVolume.add(filledVolume);

  //button label removed.

  var descriptorLabel = textCreator.create(propertyName);
  descriptorLabel.position.x = Layout.PANEL_LABEL_TEXT_MARGIN;
  descriptorLabel.position.z = depth;
  descriptorLabel.position.y = -0.03;

  var controllerID = Layout.createControllerIDBox(height, Colors.CONTROLLER_ID_BUTTON);
  controllerID.position.z = depth;

  panel.add(descriptorLabel, hitscanVolume, controllerID);

  var interaction = (0, _interaction2.default)(hitscanVolume);
  interaction.events.on('onPressed', handleOnPress);
  interaction.events.on('onReleased', handleOnRelease);

  updateView();

  function handleOnPress(p) {
    if (group.visible === false) {
      return;
    }

    object[propertyName]();

    hitscanVolume.position.z = BUTTON_DEPTH * 0.1;

    p.locked = true;
  }

  function handleOnRelease() {
    hitscanVolume.position.z = BUTTON_DEPTH * 0.5;
  }

  function updateView() {

    if (interaction.hovering()) {
      material.color.setHex(Colors.BUTTON_HIGHLIGHT_COLOR);
    } else {
      material.color.setHex(Colors.BUTTON_COLOR);
    }
  }

  group.interaction = interaction;
  group.hitscan = [hitscanVolume, panel];

  var grabInteraction = Grab.create({ group: group, panel: panel });

  group.update = function (inputObjects) {
    interaction.update(inputObjects);
    grabInteraction.update(inputObjects);
    updateView();
  };

  group.name = function (str) {
    descriptorLabel.update(str);
    return group;
  };

  return group;
} /** 
   * Big button with an image on (which might come from a file or existing texture,
   * the texture might be from a RenderTarget...).
   * 
   * I'd put this more separate from the datgui modules but need to think a little
   * bit about how to structure that etc.  Very un-DRY, but I'm starting by just
   * copying existing button.js in its entirety.
   * 
   * TODO: not just simple 'bang' function but callbacks for hover / etc.
   * 
   * 
   * Copyright  Data Arts Team, Google inc. 2016 / Peter Todd, 2017
   * 
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
   */

},{"../thirdparty/SubdivisionModifier":18,"./colors":3,"./grab":7,"./interaction":11,"./layout":12,"./sharedmaterials":15,"./textlabel":17}],10:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _slider = require('./slider');

var _slider2 = _interopRequireDefault(_slider);

var _checkbox = require('./checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

var _folder = require('./folder');

var _folder2 = _interopRequireDefault(_folder);

var _dropdown = require('./dropdown');

var _dropdown2 = _interopRequireDefault(_dropdown);

var _imagebutton = require('./imagebutton');

var _imagebutton2 = _interopRequireDefault(_imagebutton);

var _sdftext = require('./sdftext');

var SDFText = _interopRequireWildcard(_sdftext);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
                                                                                                                                                                                                    * dat-guiVR Javascript Controller Library for VR
                                                                                                                                                                                                    * https://github.com/dataarts/dat.guiVR
                                                                                                                                                                                                    *
                                                                                                                                                                                                    * Copyright 2016 Data Arts Team, Google Inc.
                                                                                                                                                                                                    *
                                                                                                                                                                                                    * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                    * you may not use this file except in compliance with the License.
                                                                                                                                                                                                    * You may obtain a copy of the License at
                                                                                                                                                                                                    *
                                                                                                                                                                                                    *     http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                    *
                                                                                                                                                                                                    * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                    * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                    * See the License for the specific language governing permissions and
                                                                                                                                                                                                    * limitations under the License.
                                                                                                                                                                                                    */

//PJT: I'd rather inject custom extensions like this, but will work that out later.


var GUIVR = function DATGUIVR() {

  /*
    SDF font
  */
  var textCreator = SDFText.creator();

  /*
    Lists.
    InputObjects are things like VIVE controllers, cardboard headsets, etc.
    Controllers are the DAT GUI sliders, checkboxes, etc.
    HitscanObjects are anything raycasts will hit-test against.
  */
  var inputObjects = [];
  var controllers = [];
  var hitscanObjects = [];

  var mouseEnabled = false;
  var mouseRenderer = undefined;

  function enableMouse(camera, renderer) {
    mouseEnabled = true;
    mouseRenderer = renderer;
    mouseInput.mouseCamera = camera;
    return mouseInput.laser;
  }

  function disableMouse() {
    mouseEnabled = false;
  }

  /*
    The default laser pointer coming out of each InputObject.
  */
  var laserMaterial = new THREE.LineBasicMaterial({ color: 0x55aaff, transparent: true, blending: THREE.AdditiveBlending });
  function createLaser() {
    var g = new THREE.Geometry();
    g.vertices.push(new THREE.Vector3());
    g.vertices.push(new THREE.Vector3(0, 0, 0));
    return new THREE.Line(g, laserMaterial);
  }

  /*
    A "cursor", eg the ball that appears at the end of your laser.
  */
  var cursorMaterial = new THREE.MeshBasicMaterial({ color: 0x444444, transparent: true, blending: THREE.AdditiveBlending });
  function createCursor() {
    return new THREE.Mesh(new THREE.SphereGeometry(0.006, 4, 4), cursorMaterial);
  }

  /*
    Creates a generic Input type.
    Takes any THREE.Object3D type object and uses its position
    and orientation as an input device.
     A laser pointer is included and will be updated.
    Contains state about which Interaction is currently being used or hover.
  */
  function createInput() {
    var inputObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new THREE.Group();

    var input = {
      raycast: new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3()),
      laser: createLaser(),
      cursor: createCursor(),
      object: inputObject,
      pressed: false,
      gripped: false,
      events: new _events2.default(),
      interaction: {
        grip: undefined,
        press: undefined,
        hover: undefined
      }
    };

    input.laser.add(input.cursor);

    return input;
  }

  /*
    MouseInput.
    Allows you to click on the screen when not in VR for debugging.
  */
  var mouseInput = createMouseInput();

  function createMouseInput() {
    var mouse = new THREE.Vector2(-1, -1);

    var input = createInput();
    input.mouse = mouse;
    input.mouseIntersection = new THREE.Vector3();
    input.mouseOffset = new THREE.Vector3();
    input.mousePlane = new THREE.Plane();
    input.intersections = [];

    //  set my enableMouse
    input.mouseCamera = undefined;

    window.addEventListener('mousemove', function (event) {
      // if a specific renderer has been defined
      if (mouseRenderer) {
        var clientRect = mouseRenderer.domElement.getBoundingClientRect();
        mouse.x = (event.clientX - clientRect.left) / clientRect.width * 2 - 1;
        mouse.y = -((event.clientY - clientRect.top) / clientRect.height) * 2 + 1;
      }
      // default to fullscreen
      else {
          mouse.x = event.clientX / window.innerWidth * 2 - 1;
          mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        }
    }, false);

    window.addEventListener('mousedown', function (event) {
      if (input.intersections.length > 0) {
        // prevent mouse down from triggering other listeners (polyfill, etc)
        event.stopImmediatePropagation();
        input.pressed = true;
      }
    }, true);

    window.addEventListener('mouseup', function (event) {
      input.pressed = false;
    }, false);

    return input;
  }

  /*
    Public function users run to give DAT GUI an input device.
    Automatically detects for ViveController and binds buttons + haptic feedback.
     Returns a laser pointer so it can be directly added to scene.
     The laser will then have two methods:
    laser.pressed(), laser.gripped()
     These can then be bound to any button the user wants. Useful for binding to
    cardboard or alternate input devices.
     For example...
      document.addEventListener( 'mousedown', function(){ laser.pressed( true ); } );
  */
  function addInputObject(object) {
    var input = createInput(object);

    input.laser.pressed = function (flag) {
      // only pay attention to presses over the GUI
      if (flag && input.intersections.length > 0) {
        input.pressed = true;
      } else {
        input.pressed = false;
      }
    };

    input.laser.gripped = function (flag) {
      input.gripped = flag;
    };

    input.laser.cursor = input.cursor;

    if (THREE.ViveController && object instanceof THREE.ViveController) {
      bindViveController(input, object, input.laser.pressed, input.laser.gripped);
    }

    inputObjects.push(input);

    return input.laser;
  }

  /*
    Here are the main dat gui controller types.
  */

  function addSlider(object, propertyName) {
    var min = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.0;
    var max = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 100.0;

    var slider = (0, _slider2.default)({
      textCreator: textCreator, propertyName: propertyName, object: object, min: min, max: max,
      initialValue: object[propertyName]
    });

    controllers.push(slider);
    hitscanObjects.push.apply(hitscanObjects, _toConsumableArray(slider.hitscan));

    return slider;
  }

  function addCheckbox(object, propertyName) {
    var checkbox = (0, _checkbox2.default)({
      textCreator: textCreator, propertyName: propertyName, object: object,
      initialValue: object[propertyName]
    });

    controllers.push(checkbox);
    hitscanObjects.push.apply(hitscanObjects, _toConsumableArray(checkbox.hitscan));

    return checkbox;
  }

  function addButton(object, propertyName) {
    var button = (0, _button2.default)({
      textCreator: textCreator, propertyName: propertyName, object: object
    });

    controllers.push(button);
    hitscanObjects.push.apply(hitscanObjects, _toConsumableArray(button.hitscan));
    return button;
  }

  function addImageButton(object, propertyName, image) {
    //see also folder.js where this is added to group object...
    //as such this function also needs to be passed as an argument to createFolder.
    //perhaps all of these 'addX' functions could be initially put onto an object so that
    //new additions could be added slightly more easily.
    var button = (0, _imagebutton2.default)({
      textCreator: textCreator, object: object, propertyName: propertyName, image: image
    });
    controllers.push(button);
    hitscanObjects.push.apply(hitscanObjects, _toConsumableArray(button.hitscan)); //PJT: what does this ... actually mean?
    return button;
  }

  function addDropdown(object, propertyName, options) {
    var dropdown = (0, _dropdown2.default)({
      textCreator: textCreator, propertyName: propertyName, object: object, options: options
    });

    controllers.push(dropdown);
    hitscanObjects.push.apply(hitscanObjects, _toConsumableArray(dropdown.hitscan));
    return dropdown;
  }

  /*
    An implicit Add function which detects for property type
    and gives you the correct controller.
     Dropdown:
      add( object, propertyName, objectType )
     Slider:
      add( object, propertyOfNumberType, min, max )
     Checkbox:
      add( object, propertyOfBooleanType )
     Button:
      add( object, propertyOfFunctionType )
     Not used directly. Used by folders.
  */

  function add(object, propertyName, arg3, arg4) {

    if (object === undefined) {
      return undefined;
    } else if (object[propertyName] === undefined) {
      //why not throw an exception?
      console.warn('no property named', propertyName, 'on object', object);
      return new THREE.Group();
    }

    if (isObject(arg3) || isArray(arg3)) {
      return addDropdown(object, propertyName, arg3);
    }

    if (isNumber(object[propertyName])) {
      return addSlider(object, propertyName, arg3, arg4);
    }

    if (isBoolean(object[propertyName])) {
      return addCheckbox(object, propertyName);
    }

    if (isFunction(object[propertyName])) {
      return addButton(object, propertyName);
    }

    //  add couldn't figure it out, pass it back to folder
    return undefined;
  }

  function addSimpleSlider() {
    var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    var proxy = {
      number: min
    };

    return addSlider(proxy, 'number', min, max);
  }

  function addSimpleDropdown() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var proxy = {
      option: ''
    };

    if (options !== undefined) {
      proxy.option = isArray(options) ? options[0] : options[Object.keys(options)[0]];
    }

    return addDropdown(proxy, 'option', options);
  }

  function addSimpleCheckbox() {
    var defaultOption = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var proxy = {
      checked: defaultOption
    };

    return addCheckbox(proxy, 'checked');
  }

  function addSimpleButton(fn) {
    var proxy = {
      button: fn !== undefined ? fn : function () {}
    };

    return addButton(proxy, 'button');
  }

  /*
    Creates a folder with the name.
     Folders are THREE.Group type objects and can do group.add() for siblings.
    Folders will automatically attempt to lay its children out in sequence.
     Folders are given the add() functionality so that they can do
    folder.add( ... ) to create controllers.
  */

  function create(name) {
    var folder = (0, _folder2.default)({
      textCreator: textCreator,
      name: name,
      guiAdd: add,
      addSlider: addSimpleSlider,
      addDropdown: addSimpleDropdown,
      addCheckbox: addSimpleCheckbox,
      addButton: addSimpleButton,
      addImageButton: addImageButton
    });

    controllers.push(folder);
    if (folder.hitscan) {
      hitscanObjects.push.apply(hitscanObjects, _toConsumableArray(folder.hitscan));
    }

    return folder;
  }

  /*
    Perform the necessary updates, raycasts on its own RAF.
  */

  var tPosition = new THREE.Vector3();
  var tDirection = new THREE.Vector3(0, 0, -1);
  var tMatrix = new THREE.Matrix4();

  function update() {
    requestAnimationFrame(update);

    if (mouseEnabled) {
      mouseInput.intersections = performMouseInput(hitscanObjects, mouseInput);
    }

    inputObjects.forEach(function () {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          box = _ref.box,
          object = _ref.object,
          raycast = _ref.raycast,
          laser = _ref.laser,
          cursor = _ref.cursor;

      var index = arguments[1];

      object.updateMatrixWorld();

      tPosition.set(0, 0, 0).setFromMatrixPosition(object.matrixWorld);
      tMatrix.identity().extractRotation(object.matrixWorld);
      tDirection.set(0, 0, -1).applyMatrix4(tMatrix).normalize();

      raycast.set(tPosition, tDirection);

      laser.geometry.vertices[0].copy(tPosition);

      //  debug...
      // laser.geometry.vertices[ 1 ].copy( tPosition ).add( tDirection.multiplyScalar( 1 ) );

      var intersections = raycast.intersectObjects(hitscanObjects, false);
      parseIntersections(intersections, laser, cursor);

      inputObjects[index].intersections = intersections;
    });

    var inputs = inputObjects.slice();

    if (mouseEnabled) {
      inputs.push(mouseInput);
    }

    controllers.forEach(function (controller) {
      controller.update(inputs);
    });
  }

  function updateLaser(laser, point) {
    laser.geometry.vertices[1].copy(point);
    laser.visible = true;
    laser.geometry.computeBoundingSphere();
    laser.geometry.computeBoundingBox();
    laser.geometry.verticesNeedUpdate = true;
  }

  function parseIntersections(intersections, laser, cursor) {
    if (intersections.length > 0) {
      var firstHit = intersections[0];
      updateLaser(laser, firstHit.point);
      cursor.position.copy(firstHit.point);
      cursor.visible = true;
      cursor.updateMatrixWorld();
    } else {
      laser.visible = false;
      cursor.visible = false;
    }
  }

  function parseMouseIntersection(intersection, laser, cursor) {
    cursor.position.copy(intersection);
    updateLaser(laser, cursor.position);
  }

  function performMouseIntersection(raycast, mouse, camera) {
    raycast.setFromCamera(mouse, camera);
    return raycast.intersectObjects(hitscanObjects, false);
  }

  function mouseIntersectsPlane(raycast, v, plane) {
    return raycast.ray.intersectPlane(plane, v);
  }

  function performMouseInput(hitscanObjects) {
    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        box = _ref2.box,
        object = _ref2.object,
        raycast = _ref2.raycast,
        laser = _ref2.laser,
        cursor = _ref2.cursor,
        mouse = _ref2.mouse,
        mouseCamera = _ref2.mouseCamera;

    var intersections = [];

    if (mouseCamera) {
      intersections = performMouseIntersection(raycast, mouse, mouseCamera);
      parseIntersections(intersections, laser, cursor);
      cursor.visible = true;
      laser.visible = true;
    }

    return intersections;
  }

  update();

  /*
    Public methods.
  */

  return {
    create: create,
    addInputObject: addInputObject,
    enableMouse: enableMouse,
    disableMouse: disableMouse
  };
}();

if (window) {
  if (window.dat === undefined) {
    window.dat = {};
  }

  window.dat.GUIVR = GUIVR;
}

if (module) {
  module.exports = {
    dat: GUIVR
  };
}

if (typeof define === 'function' && define.amd) {
  define([], GUIVR);
}

/*
  Bunch of state-less utility functions.
*/

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function isBoolean(n) {
  return typeof n === 'boolean';
}

function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

//  only {} objects not arrays
//                    which are technically objects but you're just being pedantic
function isObject(item) {
  return (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && !Array.isArray(item) && item !== null;
}

function isArray(o) {
  return Array.isArray(o);
}

/*
  Controller-specific support.
*/

function bindViveController(input, controller, pressed, gripped) {
  controller.addEventListener('triggerdown', function () {
    return pressed(true);
  });
  controller.addEventListener('triggerup', function () {
    return pressed(false);
  });
  controller.addEventListener('gripsdown', function () {
    return gripped(true);
  });
  controller.addEventListener('gripsup', function () {
    return gripped(false);
  });

  var gamepad = controller.getGamepad();
  function vibrate(t, a) {
    if (gamepad && gamepad.hapticActuators.length > 0) {
      gamepad.hapticActuators[0].pulse(t, a);
    }
  }

  function hapticsTap() {
    setIntervalTimes(function (x, t, a) {
      return vibrate(1 - a, 0.5);
    }, 10, 20);
  }

  function hapticsEcho() {
    setIntervalTimes(function (x, t, a) {
      return vibrate(4, 1.0 * (1 - a));
    }, 100, 4);
  }

  input.events.on('onControllerHeld', function (input) {
    vibrate(0.3, 0.3);
  });

  input.events.on('grabbed', function () {
    hapticsTap();
  });

  input.events.on('grabReleased', function () {
    hapticsEcho();
  });

  input.events.on('pinned', function () {
    hapticsTap();
  });

  input.events.on('pinReleased', function () {
    hapticsEcho();
  });
}

function setIntervalTimes(cb, delay, times) {
  var x = 0;
  var id = setInterval(function () {
    cb(x, times, x / times);
    x++;
    if (x >= times) {
      clearInterval(id);
    }
  }, delay);
  return id;
}

},{"./button":1,"./checkbox":2,"./dropdown":4,"./folder":5,"./imagebutton":9,"./sdftext":14,"./slider":16,"events":22}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createInteraction;

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createInteraction(hitVolume) {
  var events = new _events2.default();

  var anyHover = false;
  var anyPressing = false;

  var hover = false;
  var anyActive = false;

  var tVector = new THREE.Vector3();
  var availableInputs = [];

  function update(inputObjects) {

    hover = false;
    anyPressing = false;
    anyActive = false;

    inputObjects.forEach(function (input) {

      if (availableInputs.indexOf(input) < 0) {
        availableInputs.push(input);
      }

      var _extractHit = extractHit(input),
          hitObject = _extractHit.hitObject,
          hitPoint = _extractHit.hitPoint;

      hover = hover || hitVolume === hitObject;

      performStateEvents({
        input: input,
        hover: hover,
        hitObject: hitObject, hitPoint: hitPoint,
        buttonName: 'pressed',
        interactionName: 'press',
        downName: 'onPressed',
        holdName: 'pressing',
        upName: 'onReleased'
      });

      performStateEvents({
        input: input,
        hover: hover,
        hitObject: hitObject, hitPoint: hitPoint,
        buttonName: 'gripped',
        interactionName: 'grip',
        downName: 'onGripped',
        holdName: 'gripping',
        upName: 'onReleaseGrip'
      });

      events.emit('tick', {
        input: input,
        hitObject: hitObject,
        inputObject: input.object
      });
    });
  }

  function extractHit(input) {
    if (input.intersections.length <= 0) {
      return {
        hitPoint: tVector.setFromMatrixPosition(input.cursor.matrixWorld).clone(),
        hitObject: undefined
      };
    } else {
      return {
        hitPoint: input.intersections[0].point,
        hitObject: input.intersections[0].object
      };
    }
  }

  function performStateEvents() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        input = _ref.input,
        hover = _ref.hover,
        hitObject = _ref.hitObject,
        hitPoint = _ref.hitPoint,
        buttonName = _ref.buttonName,
        interactionName = _ref.interactionName,
        downName = _ref.downName,
        holdName = _ref.holdName,
        upName = _ref.upName;

    if (input[buttonName] === true && hitObject === undefined) {
      return;
    }

    //  hovering and button down but no interactions active yet
    if (hover && input[buttonName] === true && input.interaction[interactionName] === undefined) {

      var payload = {
        input: input,
        hitObject: hitObject,
        point: hitPoint,
        inputObject: input.object,
        locked: false
      };
      events.emit(downName, payload);

      if (payload.locked) {
        input.interaction[interactionName] = interaction;
        input.interaction.hover = interaction;
      }

      anyPressing = true;
      anyActive = true;
    }

    //  button still down and this is the active interaction
    if (input[buttonName] && input.interaction[interactionName] === interaction) {
      var _payload = {
        input: input,
        hitObject: hitObject,
        point: hitPoint,
        inputObject: input.object,
        locked: false
      };

      events.emit(holdName, _payload);

      anyPressing = true;

      input.events.emit('onControllerHeld');
    }

    //  button not down and this is the active interaction
    if (input[buttonName] === false && input.interaction[interactionName] === interaction) {
      input.interaction[interactionName] = undefined;
      input.interaction.hover = undefined;
      events.emit(upName, {
        input: input,
        hitObject: hitObject,
        point: hitPoint,
        inputObject: input.object
      });
    }
  }

  function isMainHover() {

    var noMainHover = true;
    for (var i = 0; i < availableInputs.length; i++) {
      if (availableInputs[i].interaction.hover !== undefined) {
        noMainHover = false;
        break;
      }
    }

    if (noMainHover) {
      return hover;
    }

    if (availableInputs.filter(function (input) {
      return input.interaction.hover === interaction;
    }).length > 0) {
      return true;
    }

    return false;
  }

  var interaction = {
    hovering: isMainHover,
    pressing: function pressing() {
      return anyPressing;
    },
    update: update,
    events: events
  };

  return interaction;
} /**
  * dat-guiVR Javascript Controller Library for VR
  * https://github.com/dataarts/dat.guiVR
  *
  * Copyright 2016 Data Arts Team, Google Inc.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */

},{"events":22}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CHECKBOX_SIZE = exports.BORDER_THICKNESS = exports.FOLDER_GRAB_HEIGHT = exports.FOLDER_HEIGHT = exports.FOLDER_WIDTH = exports.BUTTON_DEPTH = exports.CONTROLLER_ID_DEPTH = exports.CONTROLLER_ID_WIDTH = exports.PANEL_VALUE_TEXT_MARGIN = exports.PANEL_LABEL_TEXT_MARGIN = exports.PANEL_MARGIN = exports.PANEL_SPACING = exports.PANEL_DEPTH = exports.ALT_HEIGHT = exports.PANEL_HEIGHT = exports.PANEL_WIDTH = undefined;
exports.alignLeft = alignLeft;
exports.createPanel = createPanel;
exports.createControllerIDBox = createControllerIDBox;
exports.createDownArrow = createDownArrow;

var _sharedmaterials = require('./sharedmaterials');

var SharedMaterials = _interopRequireWildcard(_sharedmaterials);

var _colors = require('./colors');

var Colors = _interopRequireWildcard(_colors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
* dat-guiVR Javascript Controller Library for VR
* https://github.com/dataarts/dat.guiVR
*
* Copyright 2016 Data Arts Team, Google Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

function alignLeft(obj) {
  if (obj instanceof THREE.Mesh) {
    obj.geometry.computeBoundingBox();
    var width = obj.geometry.boundingBox.max.x - obj.geometry.boundingBox.max.y;
    obj.geometry.translate(width, 0, 0);
    return obj;
  } else if (obj instanceof THREE.Geometry) {
    obj.computeBoundingBox();
    var _width = obj.boundingBox.max.x - obj.boundingBox.max.y;
    obj.translate(_width, 0, 0);
    return obj;
  }
}

function createPanel(width, height, depth, uniqueMaterial) {
  var material = uniqueMaterial ? new THREE.MeshBasicMaterial({ color: 0xffffff }) : SharedMaterials.PANEL;
  var panel = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
  panel.geometry.translate(width * 0.5, 0, 0);

  if (uniqueMaterial) {
    material.color.setHex(Colors.DEFAULT_BACK);
  } else {
    Colors.colorizeGeometry(panel.geometry, Colors.DEFAULT_BACK);
  }

  return panel;
}

function createControllerIDBox(height, color) {
  var panel = new THREE.Mesh(new THREE.BoxGeometry(CONTROLLER_ID_WIDTH, height, CONTROLLER_ID_DEPTH), SharedMaterials.PANEL);
  panel.geometry.translate(CONTROLLER_ID_WIDTH * 0.5, 0, 0);
  Colors.colorizeGeometry(panel.geometry, color);
  return panel;
}

function createDownArrow() {
  var w = 0.0096;
  var h = 0.016;
  var sh = new THREE.Shape();
  sh.moveTo(0, 0);
  sh.lineTo(-w, h);
  sh.lineTo(w, h);
  sh.lineTo(0, 0);

  var geo = new THREE.ShapeGeometry(sh);
  geo.translate(0, -h * 0.5, 0);

  return new THREE.Mesh(geo, SharedMaterials.PANEL);
}

var PANEL_WIDTH = exports.PANEL_WIDTH = 1.0;
var PANEL_HEIGHT = exports.PANEL_HEIGHT = 0.08;
var ALT_HEIGHT = exports.ALT_HEIGHT = 0.08; //pjt experimenting with non-uniform element heights.
var PANEL_DEPTH = exports.PANEL_DEPTH = 0.01;
var PANEL_SPACING = exports.PANEL_SPACING = 0.001;
var PANEL_MARGIN = exports.PANEL_MARGIN = 0.015;
var PANEL_LABEL_TEXT_MARGIN = exports.PANEL_LABEL_TEXT_MARGIN = 0.06;
var PANEL_VALUE_TEXT_MARGIN = exports.PANEL_VALUE_TEXT_MARGIN = 0.02;
var CONTROLLER_ID_WIDTH = exports.CONTROLLER_ID_WIDTH = 0.02;
var CONTROLLER_ID_DEPTH = exports.CONTROLLER_ID_DEPTH = 0.001;
var BUTTON_DEPTH = exports.BUTTON_DEPTH = 0.01;
var FOLDER_WIDTH = exports.FOLDER_WIDTH = 1.026;
var FOLDER_HEIGHT = exports.FOLDER_HEIGHT = 0.08;
var FOLDER_GRAB_HEIGHT = exports.FOLDER_GRAB_HEIGHT = 0.0512;
var BORDER_THICKNESS = exports.BORDER_THICKNESS = 0.01;
var CHECKBOX_SIZE = exports.CHECKBOX_SIZE = 0.05;

},{"./colors":3,"./sharedmaterials":15}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;

var _interaction = require('./interaction');

var _interaction2 = _interopRequireDefault(_interaction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function create() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      group = _ref.group,
      panel = _ref.panel;

  var interaction = (0, _interaction2.default)(panel);

  interaction.events.on('onGripped', handleOnGrip);
  interaction.events.on('onReleaseGrip', handleOnGripRelease);

  var oldParent = void 0;
  var oldPosition = new THREE.Vector3();
  var oldRotation = new THREE.Euler();

  var rotationGroup = new THREE.Group();
  rotationGroup.scale.set(0.3, 0.3, 0.3);
  rotationGroup.position.set(-0.015, 0.015, 0.0);

  function handleOnGrip(p) {
    var inputObject = p.inputObject,
        input = p.input;


    var folder = group.folder;
    if (folder === undefined) {
      return;
    }

    if (folder.beingMoved === true) {
      return;
    }

    oldPosition.copy(folder.position);
    oldRotation.copy(folder.rotation);

    folder.position.set(0, 0, 0);
    folder.rotation.set(0, 0, 0);
    folder.rotation.x = -Math.PI * 0.5;

    oldParent = folder.parent;

    rotationGroup.add(folder);

    inputObject.add(rotationGroup);

    p.locked = true;

    folder.beingMoved = true;

    input.events.emit('pinned', input);
  }

  function handleOnGripRelease() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        inputObject = _ref2.inputObject,
        input = _ref2.input;

    var folder = group.folder;
    if (folder === undefined) {
      return;
    }

    if (oldParent === undefined) {
      return;
    }

    if (folder.beingMoved === false) {
      return;
    }

    oldParent.add(folder);
    oldParent = undefined;

    folder.position.copy(oldPosition);
    folder.rotation.copy(oldRotation);

    folder.beingMoved = false;

    input.events.emit('pinReleased', input);
  }

  return interaction;
} /**
  * dat-guiVR Javascript Controller Library for VR
  * https://github.com/dataarts/dat.guiVR
  *
  * Copyright 2016 Data Arts Team, Google Inc.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */

},{"./interaction":11}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMaterial = createMaterial;
exports.creator = creator;

var _sdf = require('three-bmfont-text/shaders/sdf');

var _sdf2 = _interopRequireDefault(_sdf);

var _threeBmfontText = require('three-bmfont-text');

var _threeBmfontText2 = _interopRequireDefault(_threeBmfontText);

var _parseBmfontAscii = require('parse-bmfont-ascii');

var _parseBmfontAscii2 = _interopRequireDefault(_parseBmfontAscii);

var _font = require('./font');

var Font = _interopRequireWildcard(_font);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* dat-guiVR Javascript Controller Library for VR
* https://github.com/dataarts/dat.guiVR
*
* Copyright 2016 Data Arts Team, Google Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

function createMaterial(color) {

  var texture = new THREE.Texture();
  var image = Font.image();
  texture.image = image;
  texture.needsUpdate = true;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;

  return new THREE.RawShaderMaterial((0, _sdf2.default)({
    side: THREE.DoubleSide,
    transparent: true,
    color: color,
    map: texture
  }));
}

var textScale = 0.00024;

function creator() {

  var font = (0, _parseBmfontAscii2.default)(Font.fnt());

  var colorMaterials = {};

  function createText(str, font) {
    var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0xffffff;
    var scale = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1.0;


    var geometry = (0, _threeBmfontText2.default)({
      text: str,
      align: 'left',
      width: 10000,
      flipY: true,
      font: font
    });

    var layout = geometry.layout;

    var material = colorMaterials[color];
    if (material === undefined) {
      material = colorMaterials[color] = createMaterial(color);
    }
    var mesh = new THREE.Mesh(geometry, material);
    mesh.scale.multiply(new THREE.Vector3(1, -1, 1));

    var finalScale = scale * textScale;

    mesh.scale.multiplyScalar(finalScale);

    mesh.position.y = layout.height * 0.5 * finalScale;

    return mesh;
  }

  function create(str) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$color = _ref.color,
        color = _ref$color === undefined ? 0xffffff : _ref$color,
        _ref$scale = _ref.scale,
        scale = _ref$scale === undefined ? 1.0 : _ref$scale;

    var group = new THREE.Group();

    var mesh = createText(str, font, color, scale);
    group.add(mesh);
    group.layout = mesh.geometry.layout;

    group.update = function (str) {
      mesh.geometry.update(str);
    };

    return group;
  }

  return {
    create: create,
    getMaterial: function getMaterial() {
      return material;
    }
  };
}

},{"./font":6,"parse-bmfont-ascii":29,"three-bmfont-text":31,"three-bmfont-text/shaders/sdf":34}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FOLDER = exports.LOCATOR = exports.PANEL = undefined;

var _colors = require('./colors');

var Colors = _interopRequireWildcard(_colors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var PANEL = exports.PANEL = new THREE.MeshBasicMaterial({ color: 0xffffff, vertexColors: THREE.VertexColors }); /**
                                                                                                                * dat-guiVR Javascript Controller Library for VR
                                                                                                                * https://github.com/dataarts/dat.guiVR
                                                                                                                *
                                                                                                                * Copyright 2016 Data Arts Team, Google Inc.
                                                                                                                * 
                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                * you may not use this file except in compliance with the License.
                                                                                                                * You may obtain a copy of the License at
                                                                                                                * 
                                                                                                                *     http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                * 
                                                                                                                * Unless required by applicable law or agreed to in writing, software
                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                * See the License for the specific language governing permissions and
                                                                                                                * limitations under the License.
                                                                                                                */

var LOCATOR = exports.LOCATOR = new THREE.MeshBasicMaterial();
var FOLDER = exports.FOLDER = new THREE.MeshBasicMaterial({ color: 0x000000 });

},{"./colors":3}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createSlider;

var _textlabel = require('./textlabel');

var _textlabel2 = _interopRequireDefault(_textlabel);

var _interaction = require('./interaction');

var _interaction2 = _interopRequireDefault(_interaction);

var _colors = require('./colors');

var Colors = _interopRequireWildcard(_colors);

var _layout = require('./layout');

var Layout = _interopRequireWildcard(_layout);

var _sharedmaterials = require('./sharedmaterials');

var SharedMaterials = _interopRequireWildcard(_sharedmaterials);

var _grab = require('./grab');

var Grab = _interopRequireWildcard(_grab);

var _palette = require('./palette');

var Palette = _interopRequireWildcard(_palette);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createSlider() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      textCreator = _ref.textCreator,
      object = _ref.object,
      _ref$propertyName = _ref.propertyName,
      propertyName = _ref$propertyName === undefined ? 'undefined' : _ref$propertyName,
      _ref$initialValue = _ref.initialValue,
      initialValue = _ref$initialValue === undefined ? 0.0 : _ref$initialValue,
      _ref$min = _ref.min,
      min = _ref$min === undefined ? 0.0 : _ref$min,
      _ref$max = _ref.max,
      max = _ref$max === undefined ? 1.0 : _ref$max,
      _ref$step = _ref.step,
      step = _ref$step === undefined ? 0.1 : _ref$step,
      _ref$width = _ref.width,
      width = _ref$width === undefined ? Layout.PANEL_WIDTH : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === undefined ? Layout.ALT_HEIGHT : _ref$height,
      _ref$depth = _ref.depth,
      depth = _ref$depth === undefined ? Layout.PANEL_DEPTH : _ref$depth;

  var SLIDER_WIDTH = width * 0.5 - Layout.PANEL_MARGIN;
  var SLIDER_HEIGHT = height - Layout.PANEL_MARGIN;
  var SLIDER_DEPTH = depth;

  var state = {
    alpha: 1.0,
    value: initialValue,
    step: step,
    useStep: true,
    precision: 1,
    listen: false,
    min: min,
    max: max,
    onChangedCB: undefined,
    onFinishedChange: undefined,
    pressing: false
  };

  state.step = getImpliedStep(state.value);
  state.precision = numDecimals(state.step);
  state.alpha = getAlphaFromValue(state.value, state.min, state.max);

  var group = new THREE.Group();
  //PJT: hacking in an extra property for non-uniform panel height
  group.spacing = height + Layout.PANEL_SPACING;

  //  filled volume
  var rect = new THREE.BoxGeometry(SLIDER_WIDTH, SLIDER_HEIGHT, SLIDER_DEPTH);
  rect.translate(SLIDER_WIDTH * 0.5, 0, 0);
  // Layout.alignLeft( rect );

  var hitscanMaterial = new THREE.MeshBasicMaterial();
  hitscanMaterial.visible = false;

  var hitscanVolume = new THREE.Mesh(rect.clone(), hitscanMaterial);
  hitscanVolume.position.z = depth;
  hitscanVolume.position.x = width * 0.5;
  hitscanVolume.name = 'hitscanVolume';

  //  sliderBG volume
  var sliderBG = new THREE.Mesh(rect.clone(), SharedMaterials.PANEL);
  Colors.colorizeGeometry(sliderBG.geometry, Colors.SLIDER_BG);
  sliderBG.position.z = depth * 0.5;
  sliderBG.position.x = SLIDER_WIDTH + Layout.PANEL_MARGIN;

  var material = new THREE.MeshBasicMaterial({ color: Colors.DEFAULT_COLOR });
  var filledVolume = new THREE.Mesh(rect.clone(), material);
  filledVolume.position.z = depth * 0.5;
  hitscanVolume.add(filledVolume);

  var endLocator = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.05, 1, 1, 1), SharedMaterials.LOCATOR);
  endLocator.position.x = SLIDER_WIDTH;
  hitscanVolume.add(endLocator);
  endLocator.visible = false;

  var valueLabel = textCreator.create(state.value.toString());
  valueLabel.position.x = Layout.PANEL_VALUE_TEXT_MARGIN + width * 0.5;
  valueLabel.position.z = depth * 2.5;
  valueLabel.position.y = -0.0325;

  var descriptorLabel = textCreator.create(propertyName);
  descriptorLabel.position.x = Layout.PANEL_LABEL_TEXT_MARGIN;
  descriptorLabel.position.z = depth;
  descriptorLabel.position.y = -0.03;

  var controllerID = Layout.createControllerIDBox(height, Colors.CONTROLLER_ID_SLIDER);
  controllerID.position.z = depth;

  var panel = Layout.createPanel(width, height, depth);
  panel.name = 'panel';
  panel.add(descriptorLabel, hitscanVolume, sliderBG, valueLabel, controllerID);

  group.add(panel);

  updateValueLabel(state.value);
  updateSlider();

  function updateValueLabel(value) {
    if (state.useStep) {
      valueLabel.update(roundToDecimal(state.value, state.precision).toString());
    } else {
      valueLabel.update(state.value.toString());
    }
  }

  function updateView() {
    if (state.pressing) {
      material.color.setHex(Colors.INTERACTION_COLOR);
    } else if (interaction.hovering()) {
      material.color.setHex(Colors.HIGHLIGHT_COLOR);
    } else {
      material.color.setHex(Colors.DEFAULT_COLOR);
    }
  }

  function updateSlider() {
    filledVolume.scale.x = Math.min(Math.max(getAlphaFromValue(state.value, state.min, state.max) * width, 0.000001), width);
  }

  function updateObject(value) {
    object[propertyName] = value;
  }

  function updateStateFromAlpha(alpha) {
    state.alpha = getClampedAlpha(alpha);
    state.value = getValueFromAlpha(state.alpha, state.min, state.max);
    if (state.useStep) {
      state.value = getSteppedValue(state.value, state.step);
    }
    state.value = getClampedValue(state.value, state.min, state.max);
  }

  function listenUpdate() {
    state.value = getValueFromObject();
    state.alpha = getAlphaFromValue(state.value, state.min, state.max);
    state.alpha = getClampedAlpha(state.alpha);
  }

  function getValueFromObject() {
    return parseFloat(object[propertyName]);
  }

  group.onChange = function (callback) {
    state.onChangedCB = callback;
    return group;
  };

  group.step = function (step) {
    state.step = step;
    state.precision = numDecimals(state.step);
    state.useStep = true;

    state.alpha = getAlphaFromValue(state.value, state.min, state.max);

    updateStateFromAlpha(state.alpha);
    updateValueLabel(state.value);
    updateSlider();
    return group;
  };

  group.listen = function () {
    state.listen = true;
    return group;
  };

  var interaction = (0, _interaction2.default)(hitscanVolume);
  interaction.events.on('onPressed', handlePress);
  interaction.events.on('pressing', handleHold);
  interaction.events.on('onReleased', handleRelease);

  function handlePress(p) {
    if (group.visible === false) {
      return;
    }
    state.pressing = true;
    p.locked = true;
  }

  function handleHold() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        point = _ref2.point;

    if (group.visible === false) {
      return;
    }

    state.pressing = true;

    filledVolume.updateMatrixWorld();
    endLocator.updateMatrixWorld();

    var a = new THREE.Vector3().setFromMatrixPosition(filledVolume.matrixWorld);
    var b = new THREE.Vector3().setFromMatrixPosition(endLocator.matrixWorld);

    var previousValue = state.value;

    updateStateFromAlpha(getPointAlpha(point, { a: a, b: b }));
    updateValueLabel(state.value);
    updateSlider();
    updateObject(state.value);

    if (previousValue !== state.value && state.onChangedCB) {
      state.onChangedCB(state.value);
    }
  }

  function handleRelease() {
    state.pressing = false;
  }

  group.interaction = interaction;
  group.hitscan = [hitscanVolume, panel];

  var grabInteraction = Grab.create({ group: group, panel: panel });
  var paletteInteraction = Palette.create({ group: group, panel: panel });

  group.update = function (inputObjects) {
    interaction.update(inputObjects);
    grabInteraction.update(inputObjects);
    paletteInteraction.update(inputObjects);

    if (state.listen) {
      listenUpdate();
      updateValueLabel(state.value);
      updateSlider();
    }
    updateView();
  };

  group.name = function (str) {
    descriptorLabel.update(str);
    return group;
  };

  group.min = function (m) {
    state.min = m;
    state.alpha = getAlphaFromValue(state.value, state.min, state.max);
    updateStateFromAlpha(state.alpha);
    updateValueLabel(state.value);
    updateSlider();
    return group;
  };

  group.max = function (m) {
    state.max = m;
    state.alpha = getAlphaFromValue(state.value, state.min, state.max);
    updateStateFromAlpha(state.alpha);
    updateValueLabel(state.value);
    updateSlider();
    return group;
  };

  return group;
} /**
  * dat-guiVR Javascript Controller Library for VR
  * https://github.com/dataarts/dat.guiVR
  *
  * Copyright 2016 Data Arts Team, Google Inc.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */

var ta = new THREE.Vector3();
var tb = new THREE.Vector3();
var tToA = new THREE.Vector3();
var aToB = new THREE.Vector3();

function getPointAlpha(point, segment) {
  ta.copy(segment.b).sub(segment.a);
  tb.copy(point).sub(segment.a);

  var projected = tb.projectOnVector(ta);

  tToA.copy(point).sub(segment.a);

  aToB.copy(segment.b).sub(segment.a).normalize();

  var side = tToA.normalize().dot(aToB) >= 0 ? 1 : -1;

  var length = segment.a.distanceTo(segment.b) * side;

  var alpha = projected.length() / length;
  if (alpha > 1.0) {
    alpha = 1.0;
  }
  if (alpha < 0.0) {
    alpha = 0.0;
  }
  return alpha;
}

function lerp(min, max, value) {
  return (1 - value) * min + value * max;
}

function map_range(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function getClampedAlpha(alpha) {
  if (alpha > 1) {
    return 1;
  }
  if (alpha < 0) {
    return 0;
  }
  return alpha;
}

function getClampedValue(value, min, max) {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

function getImpliedStep(value) {
  if (value === 0) {
    return 1; // What are we, psychics?
  } else {
    // Hey Doug, check this out.
    return Math.pow(10, Math.floor(Math.log(Math.abs(value)) / Math.LN10)) / 10;
  }
}

function getValueFromAlpha(alpha, min, max) {
  return map_range(alpha, 0.0, 1.0, min, max);
}

function getAlphaFromValue(value, min, max) {
  return map_range(value, min, max, 0.0, 1.0);
}

function getSteppedValue(value, step) {
  if (value % step != 0) {
    return Math.round(value / step) * step;
  }
  return value;
}

function numDecimals(x) {
  x = x.toString();
  if (x.indexOf('.') > -1) {
    return x.length - x.indexOf('.') - 1;
  } else {
    return 0;
  }
}

function roundToDecimal(value, decimals) {
  var tenTo = Math.pow(10, decimals);
  return Math.round(value * tenTo) / tenTo;
}

},{"./colors":3,"./grab":7,"./interaction":11,"./layout":12,"./palette":13,"./sharedmaterials":15,"./textlabel":17}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createTextLabel;

var _colors = require('./colors');

var Colors = _interopRequireWildcard(_colors);

var _sharedmaterials = require('./sharedmaterials');

var SharedMaterials = _interopRequireWildcard(_sharedmaterials);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
* dat-guiVR Javascript Controller Library for VR
* https://github.com/dataarts/dat.guiVR
*
* Copyright 2016 Data Arts Team, Google Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

function createTextLabel(textCreator, str) {
  var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.4;
  var depth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.029;
  var fgColor = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0xffffff;
  var bgColor = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : Colors.DEFAULT_BACK;
  var scale = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 1.0;


  var group = new THREE.Group();
  var internalPositioning = new THREE.Group();
  group.add(internalPositioning);

  var text = textCreator.create(str, { color: fgColor, scale: scale });
  internalPositioning.add(text);

  group.setString = function (str) {
    text.update(str.toString());
  };

  group.setNumber = function (str) {
    text.update(str.toFixed(2));
  };

  text.position.z = depth;

  var backBounds = 0.01;
  var margin = 0.01;
  var totalWidth = width;
  var totalHeight = 0.04 + margin * 2;
  var labelBackGeometry = new THREE.BoxGeometry(totalWidth, totalHeight, depth, 1, 1, 1);
  labelBackGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(totalWidth * 0.5 - margin, 0, 0));

  var labelBackMesh = new THREE.Mesh(labelBackGeometry, SharedMaterials.PANEL);
  Colors.colorizeGeometry(labelBackMesh.geometry, bgColor);

  labelBackMesh.position.y = 0.03;
  internalPositioning.add(labelBackMesh);
  internalPositioning.position.y = -totalHeight * 0.5;

  group.back = labelBackMesh;

  return group;
}

},{"./colors":3,"./sharedmaterials":15}],18:[function(require,module,exports){
'use strict';

/*
 *	@author zz85 / http://twitter.com/blurspline / http://www.lab4games.net/zz85/blog
 *	@author centerionware / http://www.centerionware.com
 *
 *	Subdivision Geometry Modifier
 *		using Loop Subdivision Scheme
 *
 *	References:
 *		http://graphics.stanford.edu/~mdfisher/subdivision.html
 *		http://www.holmes3d.net/graphics/subdivision/
 *		http://www.cs.rutgers.edu/~decarlo/readings/subdiv-sg00c.pdf
 *
 *	Known Issues:
 *		- currently doesn't handle "Sharp Edges"
 */

THREE.SubdivisionModifier = function (subdivisions) {

	this.subdivisions = subdivisions === undefined ? 1 : subdivisions;
};

// Applies the "modify" pattern
THREE.SubdivisionModifier.prototype.modify = function (geometry) {

	var repeats = this.subdivisions;

	while (repeats-- > 0) {

		this.smooth(geometry);
	}

	geometry.computeFaceNormals();
	geometry.computeVertexNormals();
};

(function () {

	// Some constants
	var WARNINGS = !true; // Set to true for development
	var ABC = ['a', 'b', 'c'];

	function getEdge(a, b, map) {

		var vertexIndexA = Math.min(a, b);
		var vertexIndexB = Math.max(a, b);

		var key = vertexIndexA + "_" + vertexIndexB;

		return map[key];
	}

	function processEdge(a, b, vertices, map, face, metaVertices) {

		var vertexIndexA = Math.min(a, b);
		var vertexIndexB = Math.max(a, b);

		var key = vertexIndexA + "_" + vertexIndexB;

		var edge;

		if (key in map) {

			edge = map[key];
		} else {

			var vertexA = vertices[vertexIndexA];
			var vertexB = vertices[vertexIndexB];

			edge = {

				a: vertexA, // pointer reference
				b: vertexB,
				newEdge: null,
				// aIndex: a, // numbered reference
				// bIndex: b,
				faces: [] // pointers to face

			};

			map[key] = edge;
		}

		edge.faces.push(face);

		metaVertices[a].edges.push(edge);
		metaVertices[b].edges.push(edge);
	}

	function generateLookups(vertices, faces, metaVertices, edges) {

		var i, il, face, edge;

		for (i = 0, il = vertices.length; i < il; i++) {

			metaVertices[i] = { edges: [] };
		}

		for (i = 0, il = faces.length; i < il; i++) {

			face = faces[i];

			processEdge(face.a, face.b, vertices, edges, face, metaVertices);
			processEdge(face.b, face.c, vertices, edges, face, metaVertices);
			processEdge(face.c, face.a, vertices, edges, face, metaVertices);
		}
	}

	function newFace(newFaces, a, b, c) {

		newFaces.push(new THREE.Face3(a, b, c));
	}

	function midpoint(a, b) {

		return Math.abs(b - a) / 2 + Math.min(a, b);
	}

	function newUv(newUvs, a, b, c) {

		newUvs.push([a.clone(), b.clone(), c.clone()]);
	}

	/////////////////////////////

	// Performs one iteration of Subdivision
	THREE.SubdivisionModifier.prototype.smooth = function (geometry) {

		var tmp = new THREE.Vector3();

		var oldVertices, oldFaces, oldUvs;
		var newVertices,
		    newFaces,
		    newUVs = [];

		var n, l, i, il, j, k;
		var metaVertices, sourceEdges;

		// new stuff.
		var sourceEdges, newEdgeVertices, newSourceVertices;

		oldVertices = geometry.vertices; // { x, y, z}
		oldFaces = geometry.faces; // { a: oldVertex1, b: oldVertex2, c: oldVertex3 }
		oldUvs = geometry.faceVertexUvs[0];

		var hasUvs = oldUvs !== undefined && oldUvs.length > 0;

		/******************************************************
   *
   * Step 0: Preprocess Geometry to Generate edges Lookup
   *
   *******************************************************/

		metaVertices = new Array(oldVertices.length);
		sourceEdges = {}; // Edge => { oldVertex1, oldVertex2, faces[]  }

		generateLookups(oldVertices, oldFaces, metaVertices, sourceEdges);

		/******************************************************
   *
   *	Step 1.
   *	For each edge, create a new Edge Vertex,
   *	then position it.
   *
   *******************************************************/

		newEdgeVertices = [];
		var other, currentEdge, newEdge, face;
		var edgeVertexWeight, adjacentVertexWeight, connectedFaces;

		for (i in sourceEdges) {

			currentEdge = sourceEdges[i];
			newEdge = new THREE.Vector3();

			edgeVertexWeight = 3 / 8;
			adjacentVertexWeight = 1 / 8;

			connectedFaces = currentEdge.faces.length;

			// check how many linked faces. 2 should be correct.
			if (connectedFaces != 2) {

				// if length is not 2, handle condition
				edgeVertexWeight = 0.5;
				adjacentVertexWeight = 0;

				if (connectedFaces != 1) {

					if (WARNINGS) console.warn('Subdivision Modifier: Number of connected faces != 2, is: ', connectedFaces, currentEdge);
				}
			}

			newEdge.addVectors(currentEdge.a, currentEdge.b).multiplyScalar(edgeVertexWeight);

			tmp.set(0, 0, 0);

			for (j = 0; j < connectedFaces; j++) {

				face = currentEdge.faces[j];

				for (k = 0; k < 3; k++) {

					other = oldVertices[face[ABC[k]]];
					if (other !== currentEdge.a && other !== currentEdge.b) break;
				}

				tmp.add(other);
			}

			tmp.multiplyScalar(adjacentVertexWeight);
			newEdge.add(tmp);

			currentEdge.newEdge = newEdgeVertices.length;
			newEdgeVertices.push(newEdge);

			// console.log(currentEdge, newEdge);
		}

		/******************************************************
   *
   *	Step 2.
   *	Reposition each source vertices.
   *
   *******************************************************/

		var beta, sourceVertexWeight, connectingVertexWeight;
		var connectingEdge, connectingEdges, oldVertex, newSourceVertex;
		newSourceVertices = [];

		for (i = 0, il = oldVertices.length; i < il; i++) {

			oldVertex = oldVertices[i];

			// find all connecting edges (using lookupTable)
			connectingEdges = metaVertices[i].edges;
			n = connectingEdges.length;

			if (n == 3) {

				beta = 3 / 16;
			} else if (n > 3) {

				beta = 3 / (8 * n); // Warren's modified formula
			}

			// Loop's original beta formula
			// beta = 1 / n * ( 5/8 - Math.pow( 3/8 + 1/4 * Math.cos( 2 * Math. PI / n ), 2) );

			sourceVertexWeight = 1 - n * beta;
			connectingVertexWeight = beta;

			if (n <= 2) {

				// crease and boundary rules
				// console.warn('crease and boundary rules');

				if (n == 2) {

					if (WARNINGS) console.warn('2 connecting edges', connectingEdges);
					sourceVertexWeight = 3 / 4;
					connectingVertexWeight = 1 / 8;

					// sourceVertexWeight = 1;
					// connectingVertexWeight = 0;
				} else if (n == 1) {

					if (WARNINGS) console.warn('only 1 connecting edge');
				} else if (n == 0) {

					if (WARNINGS) console.warn('0 connecting edges');
				}
			}

			newSourceVertex = oldVertex.clone().multiplyScalar(sourceVertexWeight);

			tmp.set(0, 0, 0);

			for (j = 0; j < n; j++) {

				connectingEdge = connectingEdges[j];
				other = connectingEdge.a !== oldVertex ? connectingEdge.a : connectingEdge.b;
				tmp.add(other);
			}

			tmp.multiplyScalar(connectingVertexWeight);
			newSourceVertex.add(tmp);

			newSourceVertices.push(newSourceVertex);
		}

		/******************************************************
   *
   *	Step 3.
   *	Generate Faces between source vertices
   *	and edge vertices.
   *
   *******************************************************/

		newVertices = newSourceVertices.concat(newEdgeVertices);
		var sl = newSourceVertices.length,
		    edge1,
		    edge2,
		    edge3;
		newFaces = [];

		var uv, x0, x1, x2;
		var x3 = new THREE.Vector2();
		var x4 = new THREE.Vector2();
		var x5 = new THREE.Vector2();

		for (i = 0, il = oldFaces.length; i < il; i++) {

			face = oldFaces[i];

			// find the 3 new edges vertex of each old face

			edge1 = getEdge(face.a, face.b, sourceEdges).newEdge + sl;
			edge2 = getEdge(face.b, face.c, sourceEdges).newEdge + sl;
			edge3 = getEdge(face.c, face.a, sourceEdges).newEdge + sl;

			// create 4 faces.

			newFace(newFaces, edge1, edge2, edge3);
			newFace(newFaces, face.a, edge1, edge3);
			newFace(newFaces, face.b, edge2, edge1);
			newFace(newFaces, face.c, edge3, edge2);

			// create 4 new uv's

			if (hasUvs) {

				uv = oldUvs[i];

				x0 = uv[0];
				x1 = uv[1];
				x2 = uv[2];

				x3.set(midpoint(x0.x, x1.x), midpoint(x0.y, x1.y));
				x4.set(midpoint(x1.x, x2.x), midpoint(x1.y, x2.y));
				x5.set(midpoint(x0.x, x2.x), midpoint(x0.y, x2.y));

				newUv(newUVs, x3, x4, x5);
				newUv(newUVs, x0, x3, x5);

				newUv(newUVs, x1, x4, x3);
				newUv(newUVs, x2, x5, x4);
			}
		}

		// Overwrite old arrays
		geometry.vertices = newVertices;
		geometry.faces = newFaces;
		if (hasUvs) geometry.faceVertexUvs[0] = newUVs;

		// console.log('done');
	};
})();

},{}],19:[function(require,module,exports){
var str = Object.prototype.toString

module.exports = anArray

function anArray(arr) {
  return (
       arr.BYTES_PER_ELEMENT
    && str.call(arr.buffer) === '[object ArrayBuffer]'
    || Array.isArray(arr)
  )
}

},{}],20:[function(require,module,exports){
module.exports = function numtype(num, def) {
	return typeof num === 'number'
		? num 
		: (typeof def === 'number' ? def : 0)
}
},{}],21:[function(require,module,exports){
module.exports = function(dtype) {
  switch (dtype) {
    case 'int8':
      return Int8Array
    case 'int16':
      return Int16Array
    case 'int32':
      return Int32Array
    case 'uint8':
      return Uint8Array
    case 'uint16':
      return Uint16Array
    case 'uint32':
      return Uint32Array
    case 'float32':
      return Float32Array
    case 'float64':
      return Float64Array
    case 'array':
      return Array
    case 'uint8_clamped':
      return Uint8ClampedArray
  }
}

},{}],22:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],23:[function(require,module,exports){
/*eslint new-cap:0*/
var dtype = require('dtype')
module.exports = flattenVertexData
function flattenVertexData (data, output, offset) {
  if (!data) throw new TypeError('must specify data as first parameter')
  offset = +(offset || 0) | 0

  if (Array.isArray(data) && Array.isArray(data[0])) {
    var dim = data[0].length
    var length = data.length * dim

    // no output specified, create a new typed array
    if (!output || typeof output === 'string') {
      output = new (dtype(output || 'float32'))(length + offset)
    }

    var dstLength = output.length - offset
    if (length !== dstLength) {
      throw new Error('source length ' + length + ' (' + dim + 'x' + data.length + ')' +
        ' does not match destination length ' + dstLength)
    }

    for (var i = 0, k = offset; i < data.length; i++) {
      for (var j = 0; j < dim; j++) {
        output[k++] = data[i][j]
      }
    }
  } else {
    if (!output || typeof output === 'string') {
      // no output, create a new one
      var Ctor = dtype(output || 'float32')
      if (offset === 0) {
        output = new Ctor(data)
      } else {
        output = new Ctor(data.length + offset)
        output.set(data, offset)
      }
    } else {
      // store output in existing array
      output.set(data, offset)
    }
  }

  return output
}

},{"dtype":21}],24:[function(require,module,exports){
module.exports = function compile(property) {
	if (!property || typeof property !== 'string')
		throw new Error('must specify property for indexof search')

	return new Function('array', 'value', 'start', [
		'start = start || 0',
		'for (var i=start; i<array.length; i++)',
		'  if (array[i]["' + property +'"] === value)',
		'      return i',
		'return -1'
	].join('\n'))
}
},{}],25:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],26:[function(require,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

},{}],27:[function(require,module,exports){
var wordWrap = require('word-wrapper')
var xtend = require('xtend')
var findChar = require('indexof-property')('id')
var number = require('as-number')

var X_HEIGHTS = ['x', 'e', 'a', 'o', 'n', 's', 'r', 'c', 'u', 'm', 'v', 'w', 'z']
var M_WIDTHS = ['m', 'w']
var CAP_HEIGHTS = ['H', 'I', 'N', 'E', 'F', 'K', 'L', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']


var TAB_ID = '\t'.charCodeAt(0)
var SPACE_ID = ' '.charCodeAt(0)
var ALIGN_LEFT = 0, 
    ALIGN_CENTER = 1, 
    ALIGN_RIGHT = 2

module.exports = function createLayout(opt) {
  return new TextLayout(opt)
}

function TextLayout(opt) {
  this.glyphs = []
  this._measure = this.computeMetrics.bind(this)
  this.update(opt)
}

TextLayout.prototype.update = function(opt) {
  opt = xtend({
    measure: this._measure
  }, opt)
  this._opt = opt
  this._opt.tabSize = number(this._opt.tabSize, 4)

  if (!opt.font)
    throw new Error('must provide a valid bitmap font')

  var glyphs = this.glyphs
  var text = opt.text||'' 
  var font = opt.font
  this._setupSpaceGlyphs(font)
  
  var lines = wordWrap.lines(text, opt)
  var minWidth = opt.width || 0

  //clear glyphs
  glyphs.length = 0

  //get max line width
  var maxLineWidth = lines.reduce(function(prev, line) {
    return Math.max(prev, line.width, minWidth)
  }, 0)

  //the pen position
  var x = 0
  var y = 0
  var lineHeight = number(opt.lineHeight, font.common.lineHeight)
  var baseline = font.common.base
  var descender = lineHeight-baseline
  var letterSpacing = opt.letterSpacing || 0
  var height = lineHeight * lines.length - descender
  var align = getAlignType(this._opt.align)

  //draw text along baseline
  y -= height
  
  //the metrics for this text layout
  this._width = maxLineWidth
  this._height = height
  this._descender = lineHeight - baseline
  this._baseline = baseline
  this._xHeight = getXHeight(font)
  this._capHeight = getCapHeight(font)
  this._lineHeight = lineHeight
  this._ascender = lineHeight - descender - this._xHeight
    
  //layout each glyph
  var self = this
  lines.forEach(function(line, lineIndex) {
    var start = line.start
    var end = line.end
    var lineWidth = line.width
    var lastGlyph
    
    //for each glyph in that line...
    for (var i=start; i<end; i++) {
      var id = text.charCodeAt(i)
      var glyph = self.getGlyph(font, id)
      if (glyph) {
        if (lastGlyph) 
          x += getKerning(font, lastGlyph.id, glyph.id)

        var tx = x
        if (align === ALIGN_CENTER) 
          tx += (maxLineWidth-lineWidth)/2
        else if (align === ALIGN_RIGHT)
          tx += (maxLineWidth-lineWidth)

        glyphs.push({
          position: [tx, y],
          data: glyph,
          index: i,
          line: lineIndex
        })  

        //move pen forward
        x += glyph.xadvance + letterSpacing
        lastGlyph = glyph
      }
    }

    //next line down
    y += lineHeight
    x = 0
  })
  this._linesTotal = lines.length;
}

TextLayout.prototype._setupSpaceGlyphs = function(font) {
  //These are fallbacks, when the font doesn't include
  //' ' or '\t' glyphs
  this._fallbackSpaceGlyph = null
  this._fallbackTabGlyph = null

  if (!font.chars || font.chars.length === 0)
    return

  //try to get space glyph
  //then fall back to the 'm' or 'w' glyphs
  //then fall back to the first glyph available
  var space = getGlyphById(font, SPACE_ID) 
          || getMGlyph(font) 
          || font.chars[0]

  //and create a fallback for tab
  var tabWidth = this._opt.tabSize * space.xadvance
  this._fallbackSpaceGlyph = space
  this._fallbackTabGlyph = xtend(space, {
    x: 0, y: 0, xadvance: tabWidth, id: TAB_ID, 
    xoffset: 0, yoffset: 0, width: 0, height: 0
  })
}

TextLayout.prototype.getGlyph = function(font, id) {
  var glyph = getGlyphById(font, id)
  if (glyph)
    return glyph
  else if (id === TAB_ID) 
    return this._fallbackTabGlyph
  else if (id === SPACE_ID) 
    return this._fallbackSpaceGlyph
  return null
}

TextLayout.prototype.computeMetrics = function(text, start, end, width) {
  var letterSpacing = this._opt.letterSpacing || 0
  var font = this._opt.font
  var curPen = 0
  var curWidth = 0
  var count = 0
  var glyph
  var lastGlyph

  if (!font.chars || font.chars.length === 0) {
    return {
      start: start,
      end: start,
      width: 0
    }
  }

  end = Math.min(text.length, end)
  for (var i=start; i < end; i++) {
    var id = text.charCodeAt(i)
    var glyph = this.getGlyph(font, id)

    if (glyph) {
      //move pen forward
      var xoff = glyph.xoffset
      var kern = lastGlyph ? getKerning(font, lastGlyph.id, glyph.id) : 0
      curPen += kern

      var nextPen = curPen + glyph.xadvance + letterSpacing
      var nextWidth = curPen + glyph.width

      //we've hit our limit; we can't move onto the next glyph
      if (nextWidth >= width || nextPen >= width)
        break

      //otherwise continue along our line
      curPen = nextPen
      curWidth = nextWidth
      lastGlyph = glyph
    }
    count++
  }
  
  //make sure rightmost edge lines up with rendered glyphs
  if (lastGlyph)
    curWidth += lastGlyph.xoffset

  return {
    start: start,
    end: start + count,
    width: curWidth
  }
}

//getters for the private vars
;['width', 'height', 
  'descender', 'ascender',
  'xHeight', 'baseline',
  'capHeight',
  'lineHeight' ].forEach(addGetter)

function addGetter(name) {
  Object.defineProperty(TextLayout.prototype, name, {
    get: wrapper(name),
    configurable: true
  })
}

//create lookups for private vars
function wrapper(name) {
  return (new Function([
    'return function '+name+'() {',
    '  return this._'+name,
    '}'
  ].join('\n')))()
}

function getGlyphById(font, id) {
  if (!font.chars || font.chars.length === 0)
    return null

  var glyphIdx = findChar(font.chars, id)
  if (glyphIdx >= 0)
    return font.chars[glyphIdx]
  return null
}

function getXHeight(font) {
  for (var i=0; i<X_HEIGHTS.length; i++) {
    var id = X_HEIGHTS[i].charCodeAt(0)
    var idx = findChar(font.chars, id)
    if (idx >= 0) 
      return font.chars[idx].height
  }
  return 0
}

function getMGlyph(font) {
  for (var i=0; i<M_WIDTHS.length; i++) {
    var id = M_WIDTHS[i].charCodeAt(0)
    var idx = findChar(font.chars, id)
    if (idx >= 0) 
      return font.chars[idx]
  }
  return 0
}

function getCapHeight(font) {
  for (var i=0; i<CAP_HEIGHTS.length; i++) {
    var id = CAP_HEIGHTS[i].charCodeAt(0)
    var idx = findChar(font.chars, id)
    if (idx >= 0) 
      return font.chars[idx].height
  }
  return 0
}

function getKerning(font, left, right) {
  if (!font.kernings || font.kernings.length === 0)
    return 0

  var table = font.kernings
  for (var i=0; i<table.length; i++) {
    var kern = table[i]
    if (kern.first === left && kern.second === right)
      return kern.amount
  }
  return 0
}

function getAlignType(align) {
  if (align === 'center')
    return ALIGN_CENTER
  else if (align === 'right')
    return ALIGN_RIGHT
  return ALIGN_LEFT
}
},{"as-number":20,"indexof-property":24,"word-wrapper":36,"xtend":37}],28:[function(require,module,exports){
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],29:[function(require,module,exports){
module.exports = function parseBMFontAscii(data) {
  if (!data)
    throw new Error('no data provided')
  data = data.toString().trim()

  var output = {
    pages: [],
    chars: [],
    kernings: []
  }

  var lines = data.split(/\r\n?|\n/g)

  if (lines.length === 0)
    throw new Error('no data in BMFont file')

  for (var i = 0; i < lines.length; i++) {
    var lineData = splitLine(lines[i], i)
    if (!lineData) //skip empty lines
      continue

    if (lineData.key === 'page') {
      if (typeof lineData.data.id !== 'number')
        throw new Error('malformed file at line ' + i + ' -- needs page id=N')
      if (typeof lineData.data.file !== 'string')
        throw new Error('malformed file at line ' + i + ' -- needs page file="path"')
      output.pages[lineData.data.id] = lineData.data.file
    } else if (lineData.key === 'chars' || lineData.key === 'kernings') {
      //... do nothing for these two ...
    } else if (lineData.key === 'char') {
      output.chars.push(lineData.data)
    } else if (lineData.key === 'kerning') {
      output.kernings.push(lineData.data)
    } else {
      output[lineData.key] = lineData.data
    }
  }

  return output
}

function splitLine(line, idx) {
  line = line.replace(/\t+/g, ' ').trim()
  if (!line)
    return null

  var space = line.indexOf(' ')
  if (space === -1) 
    throw new Error("no named row at line " + idx)

  var key = line.substring(0, space)

  line = line.substring(space + 1)
  //clear "letter" field as it is non-standard and
  //requires additional complexity to parse " / = symbols
  line = line.replace(/letter=[\'\"]\S+[\'\"]/gi, '')  
  line = line.split("=")
  line = line.map(function(str) {
    return str.trim().match((/(".*?"|[^"\s]+)+(?=\s*|\s*$)/g))
  })

  var data = []
  for (var i = 0; i < line.length; i++) {
    var dt = line[i]
    if (i === 0) {
      data.push({
        key: dt[0],
        data: ""
      })
    } else if (i === line.length - 1) {
      data[data.length - 1].data = parseData(dt[0])
    } else {
      data[data.length - 1].data = parseData(dt[0])
      data.push({
        key: dt[1],
        data: ""
      })
    }
  }

  var out = {
    key: key,
    data: {}
  }

  data.forEach(function(v) {
    out.data[v.key] = v.data;
  })

  return out
}

function parseData(data) {
  if (!data || data.length === 0)
    return ""

  if (data.indexOf('"') === 0 || data.indexOf("'") === 0)
    return data.substring(1, data.length - 1)
  if (data.indexOf(',') !== -1)
    return parseIntList(data)
  return parseInt(data, 10)
}

function parseIntList(data) {
  return data.split(',').map(function(val) {
    return parseInt(val, 10)
  })
}
},{}],30:[function(require,module,exports){
var dtype = require('dtype')
var anArray = require('an-array')
var isBuffer = require('is-buffer')

var CW = [0, 2, 3]
var CCW = [2, 1, 3]

module.exports = function createQuadElements(array, opt) {
    //if user didn't specify an output array
    if (!array || !(anArray(array) || isBuffer(array))) {
        opt = array || {}
        array = null
    }

    if (typeof opt === 'number') //backwards-compatible
        opt = { count: opt }
    else
        opt = opt || {}

    var type = typeof opt.type === 'string' ? opt.type : 'uint16'
    var count = typeof opt.count === 'number' ? opt.count : 1
    var start = (opt.start || 0) 

    var dir = opt.clockwise !== false ? CW : CCW,
        a = dir[0], 
        b = dir[1],
        c = dir[2]

    var numIndices = count * 6

    var indices = array || new (dtype(type))(numIndices)
    for (var i = 0, j = 0; i < numIndices; i += 6, j += 4) {
        var x = i + start
        indices[x + 0] = j + 0
        indices[x + 1] = j + 1
        indices[x + 2] = j + 2
        indices[x + 3] = j + a
        indices[x + 4] = j + b
        indices[x + 5] = j + c
    }
    return indices
}
},{"an-array":19,"dtype":21,"is-buffer":26}],31:[function(require,module,exports){
var createLayout = require('layout-bmfont-text')
var inherits = require('inherits')
var createIndices = require('quad-indices')
var buffer = require('three-buffer-vertex-data')
var assign = require('object-assign')

var vertices = require('./lib/vertices')
var utils = require('./lib/utils')

var Base = THREE.BufferGeometry

module.exports = function createTextGeometry (opt) {
  return new TextGeometry(opt)
}

function TextGeometry (opt) {
  Base.call(this)

  if (typeof opt === 'string') {
    opt = { text: opt }
  }

  // use these as default values for any subsequent
  // calls to update()
  this._opt = assign({}, opt)

  // also do an initial setup...
  if (opt) this.update(opt)
}

inherits(TextGeometry, Base)

TextGeometry.prototype.update = function (opt) {
  if (typeof opt === 'string') {
    opt = { text: opt }
  }

  // use constructor defaults
  opt = assign({}, this._opt, opt)

  if (!opt.font) {
    throw new TypeError('must specify a { font } in options')
  }

  this.layout = createLayout(opt)

  // get vec2 texcoords
  var flipY = opt.flipY !== false

  // the desired BMFont data
  var font = opt.font

  // determine texture size from font file
  var texWidth = font.common.scaleW
  var texHeight = font.common.scaleH

  // get visible glyphs
  var glyphs = this.layout.glyphs.filter(function (glyph) {
    var bitmap = glyph.data
    return bitmap.width * bitmap.height > 0
  })

  // provide visible glyphs for convenience
  this.visibleGlyphs = glyphs

  // get common vertex data
  var positions = vertices.positions(glyphs)
  var uvs = vertices.uvs(glyphs, texWidth, texHeight, flipY)
  var indices = createIndices({
    clockwise: true,
    type: 'uint16',
    count: glyphs.length
  })

  // update vertex data
  buffer.index(this, indices, 1, 'uint16')
  buffer.attr(this, 'position', positions, 2)
  buffer.attr(this, 'uv', uvs, 2)

  // update multipage data
  if (!opt.multipage && 'page' in this.attributes) {
    // disable multipage rendering
    this.removeAttribute('page')
  } else if (opt.multipage) {
    var pages = vertices.pages(glyphs)
    // enable multipage rendering
    buffer.attr(this, 'page', pages, 1)
  }
}

TextGeometry.prototype.computeBoundingSphere = function () {
  if (this.boundingSphere === null) {
    this.boundingSphere = new THREE.Sphere()
  }

  var positions = this.attributes.position.array
  var itemSize = this.attributes.position.itemSize
  if (!positions || !itemSize || positions.length < 2) {
    this.boundingSphere.radius = 0
    this.boundingSphere.center.set(0, 0, 0)
    return
  }
  utils.computeSphere(positions, this.boundingSphere)
  if (isNaN(this.boundingSphere.radius)) {
    console.error('THREE.BufferGeometry.computeBoundingSphere(): ' +
      'Computed radius is NaN. The ' +
      '"position" attribute is likely to have NaN values.')
  }
}

TextGeometry.prototype.computeBoundingBox = function () {
  if (this.boundingBox === null) {
    this.boundingBox = new THREE.Box3()
  }

  var bbox = this.boundingBox
  var positions = this.attributes.position.array
  var itemSize = this.attributes.position.itemSize
  if (!positions || !itemSize || positions.length < 2) {
    bbox.makeEmpty()
    return
  }
  utils.computeBox(positions, bbox)
}

},{"./lib/utils":32,"./lib/vertices":33,"inherits":25,"layout-bmfont-text":27,"object-assign":28,"quad-indices":30,"three-buffer-vertex-data":35}],32:[function(require,module,exports){
var itemSize = 2
var box = { min: [0, 0], max: [0, 0] }

function bounds (positions) {
  var count = positions.length / itemSize
  box.min[0] = positions[0]
  box.min[1] = positions[1]
  box.max[0] = positions[0]
  box.max[1] = positions[1]

  for (var i = 0; i < count; i++) {
    var x = positions[i * itemSize + 0]
    var y = positions[i * itemSize + 1]
    box.min[0] = Math.min(x, box.min[0])
    box.min[1] = Math.min(y, box.min[1])
    box.max[0] = Math.max(x, box.max[0])
    box.max[1] = Math.max(y, box.max[1])
  }
}

module.exports.computeBox = function (positions, output) {
  bounds(positions)
  output.min.set(box.min[0], box.min[1], 0)
  output.max.set(box.max[0], box.max[1], 0)
}

module.exports.computeSphere = function (positions, output) {
  bounds(positions)
  var minX = box.min[0]
  var minY = box.min[1]
  var maxX = box.max[0]
  var maxY = box.max[1]
  var width = maxX - minX
  var height = maxY - minY
  var length = Math.sqrt(width * width + height * height)
  output.center.set(minX + width / 2, minY + height / 2, 0)
  output.radius = length / 2
}

},{}],33:[function(require,module,exports){
module.exports.pages = function pages (glyphs) {
  var pages = new Float32Array(glyphs.length * 4 * 1)
  var i = 0
  glyphs.forEach(function (glyph) {
    var id = glyph.data.page || 0
    pages[i++] = id
    pages[i++] = id
    pages[i++] = id
    pages[i++] = id
  })
  return pages
}

module.exports.uvs = function uvs (glyphs, texWidth, texHeight, flipY) {
  var uvs = new Float32Array(glyphs.length * 4 * 2)
  var i = 0
  glyphs.forEach(function (glyph) {
    var bitmap = glyph.data
    var bw = (bitmap.x + bitmap.width)
    var bh = (bitmap.y + bitmap.height)

    // top left position
    var u0 = bitmap.x / texWidth
    var v1 = bitmap.y / texHeight
    var u1 = bw / texWidth
    var v0 = bh / texHeight

    if (flipY) {
      v1 = (texHeight - bitmap.y) / texHeight
      v0 = (texHeight - bh) / texHeight
    }

    // BL
    uvs[i++] = u0
    uvs[i++] = v1
    // TL
    uvs[i++] = u0
    uvs[i++] = v0
    // TR
    uvs[i++] = u1
    uvs[i++] = v0
    // BR
    uvs[i++] = u1
    uvs[i++] = v1
  })
  return uvs
}

module.exports.positions = function positions (glyphs) {
  var positions = new Float32Array(glyphs.length * 4 * 2)
  var i = 0
  glyphs.forEach(function (glyph) {
    var bitmap = glyph.data

    // bottom left position
    var x = glyph.position[0] + bitmap.xoffset
    var y = glyph.position[1] + bitmap.yoffset

    // quad size
    var w = bitmap.width
    var h = bitmap.height

    // BL
    positions[i++] = x
    positions[i++] = y
    // TL
    positions[i++] = x
    positions[i++] = y + h
    // TR
    positions[i++] = x + w
    positions[i++] = y + h
    // BR
    positions[i++] = x + w
    positions[i++] = y
  })
  return positions
}

},{}],34:[function(require,module,exports){
var assign = require('object-assign')

module.exports = function createSDFShader (opt) {
  opt = opt || {}
  var opacity = typeof opt.opacity === 'number' ? opt.opacity : 1
  var alphaTest = typeof opt.alphaTest === 'number' ? opt.alphaTest : 0.0001
  var precision = opt.precision || 'highp'
  var color = opt.color
  var map = opt.map

  // remove to satisfy r73
  delete opt.map
  delete opt.color
  delete opt.precision
  delete opt.opacity

  return assign({
    uniforms: {
      opacity: { type: 'f', value: opacity },
      map: { type: 't', value: map || new THREE.Texture() },
      color: { type: 'c', value: new THREE.Color(color) }
    },
    vertexShader: [
      'attribute vec2 uv;',
      'attribute vec4 position;',
      'uniform mat4 projectionMatrix;',
      'uniform mat4 modelViewMatrix;',
      'varying vec2 vUv;',
      'void main() {',
      'vUv = uv;',
      'gl_Position = projectionMatrix * modelViewMatrix * position;',
      '}'
    ].join('\n'),
    fragmentShader: [
      '#ifdef GL_OES_standard_derivatives',
      '#extension GL_OES_standard_derivatives : enable',
      '#endif',
      'precision ' + precision + ' float;',
      'uniform float opacity;',
      'uniform vec3 color;',
      'uniform sampler2D map;',
      'varying vec2 vUv;',

      'float aastep(float value) {',
      '  #ifdef GL_OES_standard_derivatives',
      '    float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;',
      '  #else',
      '    float afwidth = (1.0 / 32.0) * (1.4142135623730951 / (2.0 * gl_FragCoord.w));',
      '  #endif',
      '  return smoothstep(0.5 - afwidth, 0.5 + afwidth, value);',
      '}',

      'void main() {',
      '  vec4 texColor = texture2D(map, vUv);',
      '  float alpha = aastep(texColor.a);',
      '  gl_FragColor = vec4(color, opacity * alpha);',
      alphaTest === 0
        ? ''
        : '  if (gl_FragColor.a < ' + alphaTest + ') discard;',
      '}'
    ].join('\n')
  }, opt)
}

},{"object-assign":28}],35:[function(require,module,exports){
var flatten = require('flatten-vertex-data')
var warned = false;

module.exports.attr = setAttribute
module.exports.index = setIndex

function setIndex (geometry, data, itemSize, dtype) {
  if (typeof itemSize !== 'number') itemSize = 1
  if (typeof dtype !== 'string') dtype = 'uint16'

  var isR69 = !geometry.index && typeof geometry.setIndex !== 'function'
  var attrib = isR69 ? geometry.getAttribute('index') : geometry.index
  var newAttrib = updateAttribute(attrib, data, itemSize, dtype)
  if (newAttrib) {
    if (isR69) geometry.addAttribute('index', newAttrib)
    else geometry.index = newAttrib
  }
}

function setAttribute (geometry, key, data, itemSize, dtype) {
  if (typeof itemSize !== 'number') itemSize = 3
  if (typeof dtype !== 'string') dtype = 'float32'
  if (Array.isArray(data) &&
    Array.isArray(data[0]) &&
    data[0].length !== itemSize) {
    throw new Error('Nested vertex array has unexpected size; expected ' +
      itemSize + ' but found ' + data[0].length)
  }

  var attrib = geometry.getAttribute(key)
  var newAttrib = updateAttribute(attrib, data, itemSize, dtype)
  if (newAttrib) {
    geometry.addAttribute(key, newAttrib)
  }
}

function updateAttribute (attrib, data, itemSize, dtype) {
  data = data || []
  if (!attrib || rebuildAttribute(attrib, data, itemSize)) {
    // create a new array with desired type
    data = flatten(data, dtype)

    var needsNewBuffer = attrib && typeof attrib.setArray !== 'function'
    if (!attrib || needsNewBuffer) {
      // We are on an old version of ThreeJS which can't
      // support growing / shrinking buffers, so we need
      // to build a new buffer
      if (needsNewBuffer && !warned) {
        warned = true
        console.warn([
          'A WebGL buffer is being updated with a new size or itemSize, ',
          'however this version of ThreeJS only supports fixed-size buffers.',
          '\nThe old buffer may still be kept in memory.\n',
          'To avoid memory leaks, it is recommended that you dispose ',
          'your geometries and create new ones, or update to ThreeJS r82 or newer.\n',
          'See here for discussion:\n',
          'https://github.com/mrdoob/three.js/pull/9631'
        ].join(''))
      }

      // Build a new attribute
      attrib = new THREE.BufferAttribute(data, itemSize);
    }

    attrib.itemSize = itemSize
    attrib.needsUpdate = true

    // New versions of ThreeJS suggest using setArray
    // to change the data. It will use bufferData internally,
    // so you can change the array size without any issues
    if (typeof attrib.setArray === 'function') {
      attrib.setArray(data)
    }

    return attrib
  } else {
    // copy data into the existing array
    flatten(data, attrib.array)
    attrib.needsUpdate = true
    return null
  }
}

// Test whether the attribute needs to be re-created,
// returns false if we can re-use it as-is.
function rebuildAttribute (attrib, data, itemSize) {
  if (attrib.itemSize !== itemSize) return true
  if (!attrib.array) return true
  var attribLength = attrib.array.length
  if (Array.isArray(data) && Array.isArray(data[0])) {
    // [ [ x, y, z ] ]
    return attribLength !== data.length * itemSize
  } else {
    // [ x, y, z ]
    return attribLength !== data.length
  }
  return false
}

},{"flatten-vertex-data":23}],36:[function(require,module,exports){
var newline = /\n/
var newlineChar = '\n'
var whitespace = /\s/

module.exports = function(text, opt) {
    var lines = module.exports.lines(text, opt)
    return lines.map(function(line) {
        return text.substring(line.start, line.end)
    }).join('\n')
}

module.exports.lines = function wordwrap(text, opt) {
    opt = opt||{}

    //zero width results in nothing visible
    if (opt.width === 0 && opt.mode !== 'nowrap') 
        return []

    text = text||''
    var width = typeof opt.width === 'number' ? opt.width : Number.MAX_VALUE
    var start = Math.max(0, opt.start||0)
    var end = typeof opt.end === 'number' ? opt.end : text.length
    var mode = opt.mode

    var measure = opt.measure || monospace
    if (mode === 'pre')
        return pre(measure, text, start, end, width)
    else
        return greedy(measure, text, start, end, width, mode)
}

function idxOf(text, chr, start, end) {
    var idx = text.indexOf(chr, start)
    if (idx === -1 || idx > end)
        return end
    return idx
}

function isWhitespace(chr) {
    return whitespace.test(chr)
}

function pre(measure, text, start, end, width) {
    var lines = []
    var lineStart = start
    for (var i=start; i<end && i<text.length; i++) {
        var chr = text.charAt(i)
        var isNewline = newline.test(chr)

        //If we've reached a newline, then step down a line
        //Or if we've reached the EOF
        if (isNewline || i===end-1) {
            var lineEnd = isNewline ? i : i+1
            var measured = measure(text, lineStart, lineEnd, width)
            lines.push(measured)
            
            lineStart = i+1
        }
    }
    return lines
}

function greedy(measure, text, start, end, width, mode) {
    //A greedy word wrapper based on LibGDX algorithm
    //https://github.com/libgdx/libgdx/blob/master/gdx/src/com/badlogic/gdx/graphics/g2d/BitmapFontCache.java
    var lines = []

    var testWidth = width
    //if 'nowrap' is specified, we only wrap on newline chars
    if (mode === 'nowrap')
        testWidth = Number.MAX_VALUE

    while (start < end && start < text.length) {
        //get next newline position
        var newLine = idxOf(text, newlineChar, start, end)

        //eat whitespace at start of line
        while (start < newLine) {
            if (!isWhitespace( text.charAt(start) ))
                break
            start++
        }

        //determine visible # of glyphs for the available width
        var measured = measure(text, start, newLine, testWidth)

        var lineEnd = start + (measured.end-measured.start)
        var nextStart = lineEnd + newlineChar.length

        //if we had to cut the line before the next newline...
        if (lineEnd < newLine) {
            //find char to break on
            while (lineEnd > start) {
                if (isWhitespace(text.charAt(lineEnd)))
                    break
                lineEnd--
            }
            if (lineEnd === start) {
                if (nextStart > start + newlineChar.length) nextStart--
                lineEnd = nextStart // If no characters to break, show all.
            } else {
                nextStart = lineEnd
                //eat whitespace at end of line
                while (lineEnd > start) {
                    if (!isWhitespace(text.charAt(lineEnd - newlineChar.length)))
                        break
                    lineEnd--
                }
            }
        }
        if (lineEnd >= start) {
            var result = measure(text, start, lineEnd, testWidth)
            lines.push(result)
        }
        start = nextStart
    }
    return lines
}

//determines the visible number of glyphs within a given width
function monospace(text, start, end, width) {
    var glyphs = Math.min(width, end-start)
    return {
        start: start,
        end: start+glyphs
    }
}
},{}],37:[function(require,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}]},{},[10])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtb2R1bGVzL2RhdGd1aXZyL2J1dHRvbi5qcyIsIm1vZHVsZXMvZGF0Z3VpdnIvY2hlY2tib3guanMiLCJtb2R1bGVzL2RhdGd1aXZyL2NvbG9ycy5qcyIsIm1vZHVsZXMvZGF0Z3VpdnIvZHJvcGRvd24uanMiLCJtb2R1bGVzL2RhdGd1aXZyL2ZvbGRlci5qcyIsIm1vZHVsZXMvZGF0Z3VpdnIvZm9udC5qcyIsIm1vZHVsZXMvZGF0Z3VpdnIvZ3JhYi5qcyIsIm1vZHVsZXMvZGF0Z3VpdnIvZ3JhcGhpYy5qcyIsIm1vZHVsZXMvZGF0Z3VpdnIvaW1hZ2VidXR0b24uanMiLCJtb2R1bGVzL2RhdGd1aXZyL2luZGV4LmpzIiwibW9kdWxlcy9kYXRndWl2ci9pbnRlcmFjdGlvbi5qcyIsIm1vZHVsZXMvZGF0Z3VpdnIvbGF5b3V0LmpzIiwibW9kdWxlcy9kYXRndWl2ci9wYWxldHRlLmpzIiwibW9kdWxlcy9kYXRndWl2ci9zZGZ0ZXh0LmpzIiwibW9kdWxlcy9kYXRndWl2ci9zaGFyZWRtYXRlcmlhbHMuanMiLCJtb2R1bGVzL2RhdGd1aXZyL3NsaWRlci5qcyIsIm1vZHVsZXMvZGF0Z3VpdnIvdGV4dGxhYmVsLmpzIiwibW9kdWxlcy90aGlyZHBhcnR5L1N1YmRpdmlzaW9uTW9kaWZpZXIuanMiLCJub2RlX21vZHVsZXMvYW4tYXJyYXkvaW5kZXguanMiLCJub2RlX21vZHVsZXMvYXMtbnVtYmVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2R0eXBlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJub2RlX21vZHVsZXMvZmxhdHRlbi12ZXJ0ZXgtZGF0YS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9pbmRleG9mLXByb3BlcnR5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2luaGVyaXRzL2luaGVyaXRzX2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvaXMtYnVmZmVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xheW91dC1ibWZvbnQtdGV4dC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3BhcnNlLWJtZm9udC1hc2NpaS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9xdWFkLWluZGljZXMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvdGhyZWUtYm1mb250LXRleHQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvdGhyZWUtYm1mb250LXRleHQvbGliL3V0aWxzLmpzIiwibm9kZV9tb2R1bGVzL3RocmVlLWJtZm9udC10ZXh0L2xpYi92ZXJ0aWNlcy5qcyIsIm5vZGVfbW9kdWxlcy90aHJlZS1ibWZvbnQtdGV4dC9zaGFkZXJzL3NkZi5qcyIsIm5vZGVfbW9kdWxlcy90aHJlZS1idWZmZXItdmVydGV4LWRhdGEvaW5kZXguanMiLCJub2RlX21vZHVsZXMvd29yZC13cmFwcGVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3h0ZW5kL2ltbXV0YWJsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O2tCQzRCd0IsWTs7QUFUeEI7O0lBQVksbUI7O0FBRVo7Ozs7QUFDQTs7OztBQUNBOztJQUFZLE07O0FBQ1o7O0lBQVksTTs7QUFDWjs7SUFBWSxlOztBQUNaOztJQUFZLEk7Ozs7OztBQUVHLFNBQVMsWUFBVCxHQU9QO0FBQUEsaUZBQUosRUFBSTtBQUFBLE1BTk4sV0FNTSxRQU5OLFdBTU07QUFBQSxNQUxOLE1BS00sUUFMTixNQUtNO0FBQUEsK0JBSk4sWUFJTTtBQUFBLE1BSk4sWUFJTSxxQ0FKUyxXQUlUO0FBQUEsd0JBSE4sS0FHTTtBQUFBLE1BSE4sS0FHTSw4QkFIRSxPQUFPLFdBR1Q7QUFBQSx5QkFGTixNQUVNO0FBQUEsTUFGTixNQUVNLCtCQUZHLE9BQU8sWUFFVjtBQUFBLHdCQUROLEtBQ007QUFBQSxNQUROLEtBQ00sOEJBREUsT0FBTyxXQUNUOztBQUVOLE1BQU0s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TUFBSyxNQUFMLEVBQWMsU0FBUyxhQUFULENBQXdCLENBQXhCLElBQThCLE1BQTlCOztBQUVkO0FBRUEsRUFuUEQ7QUFxUEEsQ0E1VkQ7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDalNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuKiBkYXQtZ3VpVlIgSmF2YXNjcmlwdCBDb250cm9sbGVyIExpYnJhcnkgZm9yIFZSXG4qIGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRhYXJ0cy9kYXQuZ3VpVlJcbipcbiogQ29weXJpZ2h0IDIwMTYgRGF0YSBBcnRzIFRlYW0sIEdvb2dsZSBJbmMuXG4qXG4qIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4qIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4qXG4qICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbipcbiogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4qIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4qIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0ICogYXMgU3ViZGl2aXNpb25Nb2RpZmllciBmcm9tICcuLi90aGlyZHBhcnR5L1N1YmRpdmlzaW9uTW9kaWZpZXInO1xuXG5pbXBvcnQgY3JlYXRlVGV4dExhYmVsIGZyb20gJy4vdGV4dGxhYmVsJztcbmltcG9ydCBjcmVhdGVJbnRlcmFjdGlvbiBmcm9tICcuL2ludGVyYWN0aW9uJztcbmltcG9ydCAqIGFzIENvbG9ycyBmcm9tICcuL2NvbG9ycyc7XG5pbXBvcnQgKiBhcyBMYXlvdXQgZnJvbSAnLi9sYXlvdXQnO1xuaW1wb3J0ICogYXMgU2hhcmVkTWF0ZXJpYWxzIGZyb20gJy4vc2hhcmVkbWF0ZXJpYWxzJztcbmltcG9ydCAqIGFzIEdyYWIgZnJvbSAnLi9ncmFiJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlQnV0dG9uKCB7XG4gIHRleHRDcmVhdG9yLFxuICBvYmplY3QsXG4gIHByb3BlcnR5TmFtZSA9ICd1bmRlZmluZWQnLFxuICB3aWR0aCA9IExheW91dC5QQU5FTF9XSURUSCxcbiAgaGVpZ2h0ID0gTGF5b3V0LlBBTkVMX0hFSUdIVCxcbiAgZGVwdGggPSBMYXlvdXQuUEFORUxfREVQVEhcbn0gPSB7fSApe1xuICBcbiAgY29uc3QgQlVUVE9OX1dJRFRIID0gd2lkdGggKiAwLjUgLSBMYXlvdXQuUEFORUxfTUFSR0lOO1xuICBjb25zdCBCVVRUT05fSEVJR0hUID0gaGVpZ2h0IC0gTGF5b3V0LlBBTkVMX01BUkdJTjtcbiAgY29uc3QgQlVUVE9OX0RFUFRIID0gTGF5b3V0LkJVVFRPTl9ERVBUSDtcblxuICBjb25zdCBncm91cCA9IG5ldyBUSFJFRS5Hcm91cCgpO1xuXG4gIGNvbnN0IHBhbmVsID0gTGF5b3V0LmNyZWF0ZVBhbmVsKCB3aWR0aCwgaGVpZ2h0LCBkZXB0aCApO1xuICBncm91cC5hZGQoIHBhbmVsICk7XG5cbiAgLy8gIGJhc2UgY2hlY2tib3hcbiAgY29uc3QgZGl2aXNpb25zID0gNDtcbiAgY29uc3QgYXNwZWN0UmF0aW8gPSBCVVRUT05fV0lEVEggLyBCVVRUT05fSEVJR0hUO1xuICBjb25zdCByZWN0ID0gbmV3IFRIUkVFLkJveEdlb21ldHJ5KCBCVVRUT05fV0lEVEgsIEJVVFRPTl9IRUlHSFQsIEJVVFRPTl9ERVBUSCwgTWF0aC5mbG9vciggZGl2aXNpb25zICogYXNwZWN0UmF0aW8gKSwgZGl2aXNpb25zLCBkaXZpc2lvbnMgKTtcbiAgY29uc3QgbW9kaWZpZXIgPSBuZXcgVEhSRUUuU3ViZGl2aXNpb25Nb2RpZmllciggMSApO1xuICBtb2RpZmllci5tb2RpZnkoIHJlY3QgKTtcbiAgcmVjdC50cmFuc2xhdGUoIEJVVFRPTl9XSURUSCAqIDAuNSwgMCwgMCApO1xuXG4gIC8vICBoaXRzY2FuIHZvbHVtZVxuICBjb25zdCBoaXRzY2FuTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoKTtcbiAgaGl0c2Nhbk1hdGVyaWFsLnZpc2libGUgPSBmYWxzZTtcblxuICBjb25zdCBoaXRzY2FuVm9sdW1lID0gbmV3IFRIUkVFLk1lc2goIHJlY3QuY2xvbmUoKSwgaGl0c2Nhbk1hdGVyaWFsICk7XG4gIGhpdHNjYW5Wb2x1bWUucG9zaXRpb24ueiA9IEJVVFRPTl9ERVBUSCAqIDAuNTtcbiAgaGl0c2NhblZvbHVtZS5wb3NpdGlvbi54ID0gd2lkdGggKiAwLjU7XG5cbiAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoeyBjb2xvcjogQ29sb3JzLkJVVFRPTl9DT0xPUiB9KTtcbiAgY29uc3QgZmlsbGVkVm9sdW1lID0gbmV3IFRIUkVFLk1lc2goIHJlY3QuY2xvbmUoKSwgbWF0ZXJpYWwgKTtcbiAgaGl0c2NhblZvbHVtZS5hZGQoIGZpbGxlZFZvbHVtZSApO1xuXG5cbiAgY29uc3QgYnV0dG9uTGFiZWwgPSB0ZXh0Q3JlYXRvci5jcmVhdGUoIHByb3BlcnR5TmFtZSwgeyBzY2FsZTogMC44NjYgfSApO1xuXG4gIC8vICBUaGlzIGlzIGEgcmVhbCBoYWNrIHNpbmNlIHdlIG5lZWQgdG8gZml0IHRoZSB0ZXh0IHBvc2l0aW9uIHRvIHRoZSBmb250IHNjYWxpbmdcbiAgLy8gIFBsZWFzZSBmaXggbWUuXG4gIGJ1dHRvbkxhYmVsLnBvc2l0aW9uLnggPSBCVVRUT05fV0lEVEggKiAwLjUgLSBidXR0b25MYWJlbC5sYXlvdXQud2lkdGggKiAwLjAwMDAxMSAqIDAuNTtcbiAgYnV0dG9uTGFiZWwucG9zaXRpb24ueiA9IEJVVFRPTl9ERVBUSCAqIDEuMjtcbiAgYnV0dG9uTGFiZWwucG9zaXRpb24ueSA9IC0wLjAyNTtcbiAgZmlsbGVkVm9sdW1lLmFkZCggYnV0dG9uTGFiZWwgKTtcblxuXG4gIGNvbnN0IGRlc2NyaXB0b3JMYWJlbCA9IHRleHRDcmVhdG9yLmNyZWF0ZSggcHJvcGVydHlOYW1lICk7XG4gIGRlc2NyaXB0b3JMYWJlbC5wb3NpdGlvbi54ID0gTGF5b3V0LlBBTkVMX0xBQkVMX1RFWFRfTUFSR0lOO1xuICBkZXNjcmlwdG9yTGFiZWwucG9zaXRpb24ueiA9IGRlcHRoO1xuICBkZXNjcmlwdG9yTGFiZWwucG9zaXRpb24ueSA9IC0wLjAzO1xuXG4gIGNvbnN0IGNvbnRyb2xsZXJJRCA9IExheW91dC5jcmVhdGVDb250cm9sbGVySURCb3goIGhlaWdodCwgQ29sb3JzLkNPTlRST0xMRVJfSURfQlVUVE9OICk7XG4gIGNvbnRyb2xsZXJJRC5wb3NpdGlvbi56ID0gZGVwdGg7XG5cbiAgcGFuZWwuYWRkKCBkZXNjcmlwdG9yTGFiZWwsIGhpdHNjYW5Wb2x1bWUsIGNvbnRyb2xsZXJJRCApO1xuXG4gIGNvbnN0IGludGVyYWN0aW9uID0gY3JlYXRlSW50ZXJhY3Rpb24oIGhpdHNjYW5Wb2x1bWUgKTtcbiAgaW50ZXJhY3Rpb24uZXZlbnRzLm9uKCAnb25QcmVzc2VkJywgaGFuZGxlT25QcmVzcyApO1xuICBpbnRlcmFjdGlvbi5ldmVudHMub24oICdvblJlbGVhc2VkJywgaGFuZGxlT25SZWxlYXNlICk7XG5cbiAgdXBkYXRlVmlldygpO1xuXG4gIGZ1bmN0aW9uIGhhbmRsZU9uUHJlc3MoIHAgKXtcbiAgICBpZiggZ3JvdXAudmlzaWJsZSA9PT0gZmFsc2UgKXtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBvYmplY3RbIHByb3BlcnR5TmFtZSBdKCk7XG5cbiAgICBoaXRzY2FuVm9sdW1lLnBvc2l0aW9uLnogPSBCVVRUT05fREVQVEggKiAwLjE7XG5cbiAgICBwLmxvY2tlZCA9IHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVPblJlbGVhc2UoKXtcbiAgICBoaXRzY2FuVm9sdW1lLnBvc2l0aW9uLnogPSBCVVRUT05fREVQVEggKiAwLjU7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVWaWV3KCl7XG5cbiAgICBpZiggaW50ZXJhY3Rpb24uaG92ZXJpbmcoKSApe1xuICAgICAgbWF0ZXJpYWwuY29sb3Iuc2V0SGV4KCBDb2xvcnMuQlVUVE9OX0hJR0hMSUdIVF9DT0xPUiApO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgbWF0ZXJpYWwuY29sb3Iuc2V0SGV4KCBDb2xvcnMuQlVUVE9OX0NPTE9SICk7XG4gICAgfVxuXG4gIH1cblxuICBncm91cC5pbnRlcmFjdGlvbiA9IGludGVyYWN0aW9uO1xuICBncm91cC5oaXRzY2FuID0gWyBoaXRzY2FuVm9sdW1lLCBwYW5lbCBdO1xuXG4gIGNvbnN0IGdyYWJJbnRlcmFjdGlvbiA9IEdyYWIuY3JlYXRlKCB7IGdyb3VwLCBwYW5lbCB9ICk7XG5cbiAgZ3JvdXAudXBkYXRlID0gZnVuY3Rpb24oIGlucHV0T2JqZWN0cyApe1xuICAgIGludGVyYWN0aW9uLnVwZGF0ZSggaW5wdXRPYmplY3RzICk7XG4gICAgZ3JhYkludGVyYWN0aW9uLnVwZGF0ZSggaW5wdXRPYmplY3RzICk7XG4gICAgdXBkYXRlVmlldygpO1xuICB9O1xuXG4gIGdyb3VwLm5hbWUgPSBmdW5jdGlvbiggc3RyICl7XG4gICAgZGVzY3JpcHRvckxhYmVsLnVwZGF0ZSggc3RyICk7XG4gICAgcmV0dXJuIGdyb3VwO1xuICB9O1xuXG5cbiAgcmV0dXJuIGdyb3VwO1xufSIsIi8qKlxuKiBkYXQtZ3VpVlIgSmF2YXNjcmlwdCBDb250cm9sbGVyIExpYnJhcnkgZm9yIFZSXG4qIGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRhYXJ0cy9kYXQuZ3VpVlJcbipcbiogQ29weXJpZ2h0IDIwMTYgRGF0YSBBcnRzIFRlYW0sIEdvb2dsZSBJbmMuXG4qXG4qIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4qIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4qXG4qICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbipcbiogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4qIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4qIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IGNyZWF0ZVRleHRMYWJlbCBmcm9tICcuL3RleHRsYWJlbCc7XG5pbXBvcnQgY3JlYXRlSW50ZXJhY3Rpb24gZnJvbSAnLi9pbnRlcmFjdGlvbic7XG5pbXBvcnQgKiBhcyBDb2xvcnMgZnJvbSAnLi9jb2xvcnMnO1xuaW1wb3J0ICogYXMgTGF5b3V0IGZyb20gJy4vbGF5b3V0JztcbmltcG9ydCAqIGFzIEdyYXBoaWMgZnJvbSAnLi9ncmFwaGljJztcbmltcG9ydCAqIGFzIFNoYXJlZE1hdGVyaWFscyBmcm9tICcuL3NoYXJlZG1hdGVyaWFscyc7XG5pbXBvcnQgKiBhcyBHcmFiIGZyb20gJy4vZ3JhYic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUNoZWNrYm94KCB7XG4gIHRleHRDcmVhdG9yLFxuICBvYmplY3QsXG4gIHByb3BlcnR5TmFtZSA9ICd1bmRlZmluZWQnLFxuICBpbml0aWFsVmFsdWUgPSBmYWxzZSxcbiAgd2lkdGggPSBMYXlvdXQuUEFORUxfV0lEVEgsXG4gIGhlaWdodCA9IExheW91dC5QQU5FTF9IRUlHSFQsXG4gIGRlcHRoID0gTGF5b3V0LlBBTkVMX0RFUFRIXG59ID0ge30gKXtcblxuICBjb25zdCBDSEVDS0JPWF9XSURUSCA9IExheW91dC5DSEVDS0JPWF9TSVpFO1xuICBjb25zdCBDSEVDS0JPWF9IRUlHSFQgPSBDSEVDS0JPWF9XSURUSDtcbiAgY29uc3QgQ0hFQ0tCT1hfREVQVEggPSBkZXB0aDtcblxuICBjb25zdCBJTkFDVElWRV9TQ0FMRSA9IDAuMDAxO1xuICBjb25zdCBBQ1RJVkVfU0NBTEUgPSAwLjk7XG5cbiAgY29uc3Qgc3RhdGUgPSB7XG4gICAgdmFsdWU6IGluaXRpYWxWYWx1ZSxcbiAgICBsaXN0ZW46IGZhbHNlXG4gIH07XG5cbiAgY29uc3QgZ3JvdXAgPSBuZXcgVEhSRUUuR3JvdXAoKTtcblxuICBjb25zdCBwYW5lbCA9IExheW91dC5jcmVhdGVQYW5lbCggd2lkdGgsIGhlaWdodCwgZGVwdGggKTtcbiAgZ3JvdXAuYWRkKCBwYW5lbCApO1xuXG4gIC8vICBiYXNlIGNoZWNrYm94XG4gIGNvbnN0IHJlY3QgPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkoIENIRUNLQk9YX1dJRFRILCBDSEVDS0JPWF9IRUlHSFQsIENIRUNLQk9YX0RFUFRIICk7XG4gIHJlY3QudHJhbnNsYXRlKCBDSEVDS0JPWF9XSURUSCAqIDAuNSwgMCwgMCApO1xuXG5cbiAgLy8gIGhpdHNjYW4gdm9sdW1lXG4gIGNvbnN0IGhpdHNjYW5NYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCgpO1xuICBoaXRzY2FuTWF0ZXJpYWwudmlzaWJsZSA9IGZhbHNlO1xuXG4gIGNvbnN0IGhpdHNjYW5Wb2x1bWUgPSBuZXcgVEhSRUUuTWVzaCggcmVjdC5jbG9uZSgpLCBoaXRzY2FuTWF0ZXJpYWwgKTtcbiAgaGl0c2NhblZvbHVtZS5wb3NpdGlvbi56ID0gZGVwdGg7XG4gIGhpdHNjYW5Wb2x1bWUucG9zaXRpb24ueCA9IHdpZHRoICogMC41O1xuXG4gIC8vICBvdXRsaW5lIHZvbHVtZVxuICAvLyBjb25zdCBvdXRsaW5lID0gbmV3IFRIUkVFLkJveEhlbHBlciggaGl0c2NhblZvbHVtZSApO1xuICAvLyBvdXRsaW5lLm1hdGVyaWFsLmNvbG9yLnNldEhleCggQ29sb3JzLk9VVExJTkVfQ09MT1IgKTtcblxuICAvLyAgY2hlY2tib3ggdm9sdW1lXG4gIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgY29sb3I6IENvbG9ycy5DSEVDS0JPWF9CR19DT0xPUiB9KTtcbiAgY29uc3QgZmlsbGVkVm9sdW1lID0gbmV3IFRIUkVFLk1lc2goIHJlY3QuY2xvbmUoKSwgbWF0ZXJpYWwgKTtcbiAgLy8gZmlsbGVkVm9sdW1lLnNjYWxlLnNldCggQUNUSVZFX1NDQUxFLCBBQ1RJVkVfU0NBTEUsQUNUSVZFX1NDQUxFICk7XG4gIGhpdHNjYW5Wb2x1bWUuYWRkKCBmaWxsZWRWb2x1bWUgKTtcblxuXG4gIGNvbnN0IGRlc2NyaXB0b3JMYWJlbCA9IHRleHRDcmVhdG9yLmNyZWF0ZSggcHJvcGVydHlOYW1lICk7XG4gIGRlc2NyaXB0b3JMYWJlbC5wb3NpdGlvbi54ID0gTGF5b3V0LlBBTkVMX0xBQkVMX1RFWFRfTUFSR0lOO1xuICBkZXNjcmlwdG9yTGFiZWwucG9zaXRpb24ueiA9IGRlcHRoO1xuICBkZXNjcmlwdG9yTGFiZWwucG9zaXRpb24ueSA9IC0wLjAzO1xuXG4gIGNvbnN0IGNvbnRyb2xsZXJJRCA9IExheW91dC5jcmVhdGVDb250cm9sbGVySURCb3goIGhlaWdodCwgQ29sb3JzLkNPTlRST0xMRVJfSURfQ0hFQ0tCT1ggKTtcbiAgY29udHJvbGxlcklELnBvc2l0aW9uLnogPSBkZXB0aDtcblxuICBjb25zdCBib3JkZXJCb3ggPSBMYXlvdXQuY3JlYXRlUGFuZWwoIENIRUNLQk9YX1dJRFRIICsgTGF5b3V0LkJPUkRFUl9USElDS05FU1MsIENIRUNLQk9YX0hFSUdIVCArIExheW91dC5CT1JERVJfVEhJQ0tORVNTLCBDSEVDS0JPWF9ERVBUSCwgdHJ1ZSApO1xuICBib3JkZXJCb3gubWF0ZXJpYWwuY29sb3Iuc2V0SGV4KCAweDFmN2FlNyApO1xuICBib3JkZXJCb3gucG9zaXRpb24ueCA9IC1MYXlvdXQuQk9SREVSX1RISUNLTkVTUyAqIDAuNSArIHdpZHRoICogMC41O1xuICBib3JkZXJCb3gucG9zaXRpb24ueiA9IGRlcHRoICogMC41O1xuXG4gIGNvbnN0IGNoZWNrbWFyayA9IEdyYXBoaWMuY2hlY2ttYXJrKCk7XG4gIGNoZWNrbWFyay5wb3NpdGlvbi56ID0gZGVwdGggKiAwLjUxO1xuICBoaXRzY2FuVm9sdW1lLmFkZCggY2hlY2ttYXJrICk7XG5cbiAgcGFuZWwuYWRkKCBkZXNjcmlwdG9yTGFiZWwsIGhpdHNjYW5Wb2x1bWUsIGNvbnRyb2xsZXJJRCwgYm9yZGVyQm94ICk7XG5cbiAgLy8gZ3JvdXAuYWRkKCBmaWxsZWRWb2x1bWUsIG91dGxpbmUsIGhpdHNjYW5Wb2x1bWUsIGRlc2NyaXB0b3JMYWJlbCApO1xuXG4gIGNvbnN0IGludGVyYWN0aW9uID0gY3JlYXRlSW50ZXJhY3Rpb24oIGhpdHNjYW5Wb2x1bWUgKTtcbiAgaW50ZXJhY3Rpb24uZXZlbnRzLm9uKCAnb25QcmVzc2VkJywgaGFuZGxlT25QcmVzcyApO1xuXG4gIHVwZGF0ZVZpZXcoKTtcblxuICBmdW5jdGlvbiBoYW5kbGVPblByZXNzKCBwICl7XG4gICAgaWYoIGdyb3VwLnZpc2libGUgPT09IGZhbHNlICl7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc3RhdGUudmFsdWUgPSAhc3RhdGUudmFsdWU7XG5cbiAgICBvYmplY3RbIHByb3BlcnR5TmFtZSBdID0gc3RhdGUudmFsdWU7XG5cbiAgICBpZiggb25DaGFuZ2VkQ0IgKXtcbiAgICAgIG9uQ2hhbmdlZENCKCBzdGF0ZS52YWx1ZSApO1xuICAgIH1cblxuICAgIHAubG9ja2VkID0gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVZpZXcoKXtcblxuICAgIGlmKCBzdGF0ZS52YWx1ZSApe1xuICAgICAgY2hlY2ttYXJrLnZpc2libGUgPSB0cnVlO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgY2hlY2ttYXJrLnZpc2libGUgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYoIGludGVyYWN0aW9uLmhvdmVyaW5nKCkgKXtcbiAgICAgIGJvcmRlckJveC52aXNpYmxlID0gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgIGJvcmRlckJveC52aXNpYmxlID0gZmFsc2U7XG4gICAgfVxuXG4gIH1cblxuICBsZXQgb25DaGFuZ2VkQ0I7XG4gIGxldCBvbkZpbmlzaENoYW5nZUNCO1xuXG4gIGdyb3VwLm9uQ2hhbmdlID0gZnVuY3Rpb24oIGNhbGxiYWNrICl7XG4gICAgb25DaGFuZ2VkQ0IgPSBjYWxsYmFjaztcbiAgICByZXR1cm4gZ3JvdXA7XG4gIH07XG5cbiAgZ3JvdXAuaW50ZXJhY3Rpb24gPSBpbnRlcmFjdGlvbjtcbiAgZ3JvdXAuaGl0c2NhbiA9IFsgaGl0c2NhblZvbHVtZSwgcGFuZWwgXTtcblxuICBjb25zdCBncmFiSW50ZXJhY3Rpb24gPSBHcmFiLmNyZWF0ZSggeyBncm91cCwgcGFuZWwgfSApO1xuXG4gIGdyb3VwLmxpc3RlbiA9IGZ1bmN0aW9uKCl7XG4gICAgc3RhdGUubGlzdGVuID0gdHJ1ZTtcbiAgICByZXR1cm4gZ3JvdXA7XG4gIH07XG5cbiAgZ3JvdXAubmFtZSA9IGZ1bmN0aW9uKCBzdHIgKXtcbiAgICBkZXNjcmlwdG9yTGFiZWwudXBkYXRlKCBzdHIgKTtcbiAgICByZXR1cm4gZ3JvdXA7XG4gIH07XG5cbiAgZ3JvdXAudXBkYXRlID0gZnVuY3Rpb24oIGlucHV0T2JqZWN0cyApe1xuICAgIGlmKCBzdGF0ZS5saXN0ZW4gKXtcbiAgICAgIHN0YXRlLnZhbHVlID0gb2JqZWN0WyBwcm9wZXJ0eU5hbWUgXTtcbiAgICB9XG4gICAgaW50ZXJhY3Rpb24udXBkYXRlKCBpbnB1dE9iamVjdHMgKTtcbiAgICBncmFiSW50ZXJhY3Rpb24udXBkYXRlKCBpbnB1dE9iamVjdHMgKTtcbiAgICB1cGRhdGVWaWV3KCk7XG4gIH07XG5cblxuICByZXR1cm4gZ3JvdXA7XG59IiwiLyoqXG4qIGRhdC1ndWlWUiBKYXZhc2NyaXB0IENvbnRyb2xsZXIgTGlicmFyeSBmb3IgVlJcbiogaHR0cHM6Ly9naXRodWIuY29tL2RhdGFhcnRzL2RhdC5ndWlWUlxuKlxuKiBDb3B5cmlnaHQgMjAxNiBEYXRhIEFydHMgVGVhbSwgR29vZ2xlIEluYy5cbipcbiogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbipcbiogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuKlxuKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4qIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4qIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9DT0xPUiA9IDB4MkZBMUQ2O1xuZXhwb3J0IGNvbnN0IEhJR0hMSUdIVF9DT0xPUiA9IDB4NDNiNWVhO1xuZXhwb3J0IGNvbnN0IElOVEVSQUNUSU9OX0NPTE9SID0gMHgwN0FCRjc7XG5leHBvcnQgY29uc3QgRU1JU1NJVkVfQ09MT1IgPSAweDIyMjIyMjtcbmV4cG9ydCBjb25zdCBISUdITElHSFRfRU1JU1NJVkVfQ09MT1IgPSAweDk5OTk5OTtcbmV4cG9ydCBjb25zdCBPVVRMSU5FX0NPTE9SID0gMHg5OTk5OTk7XG5leHBvcnQgY29uc3QgREVGQVVMVF9CQUNLID0gMHgxYTFhMWFcbmV4cG9ydCBjb25zdCBISUdITElHSFRfQkFDSyA9IDB4MzEzMTMxO1xuZXhwb3J0IGNvbnN0IElOQUNUSVZFX0NPTE9SID0gMHgxNjE4Mjk7XG5leHBvcnQgY29uc3QgQ09OVFJPTExFUl9JRF9TTElERVIgPSAweDJmYTFkNjtcbmV4cG9ydCBjb25zdCBDT05UUk9MTEVSX0lEX0NIRUNLQk9YID0gMHg4MDY3ODc7XG5leHBvcnQgY29uc3QgQ09OVFJPTExFUl9JRF9CVVRUT04gPSAweGU2MWQ1ZjtcbmV4cG9ydCBjb25zdCBDT05UUk9MTEVSX0lEX1RFWFQgPSAweDFlZDM2ZjtcbmV4cG9ydCBjb25zdCBDT05UUk9MTEVSX0lEX0RST1BET1dOID0gMHhmZmYwMDA7XG5leHBvcnQgY29uc3QgRFJPUERPV05fQkdfQ09MT1IgPSAweGZmZmZmZjtcbmV4cG9ydCBjb25zdCBEUk9QRE9XTl9GR19DT0xPUiA9IDB4MDAwMDAwO1xuZXhwb3J0IGNvbnN0IENIRUNLQk9YX0JHX0NPTE9SID0gMHhmZmZmZmY7XG5leHBvcnQgY29uc3QgQlVUVE9OX0NPTE9SID0gMHhlNjFkNWY7XG5leHBvcnQgY29uc3QgQlVUVE9OX0hJR0hMSUdIVF9DT0xPUiA9IDB4ZmEzMTczO1xuZXhwb3J0IGNvbnN0IFNMSURFUl9CRyA9IDB4NDQ0NDQ0O1xuXG5leHBvcnQgZnVuY3Rpb24gY29sb3JpemVHZW9tZXRyeSggZ2VvbWV0cnksIGNvbG9yICl7XG4gIGdlb21ldHJ5LmZhY2VzLmZvckVhY2goIGZ1bmN0aW9uKGZhY2Upe1xuICAgIGZhY2UuY29sb3Iuc2V0SGV4KGNvbG9yKTtcbiAgfSk7XG4gIGdlb21ldHJ5LmNvbG9yc05lZWRVcGRhdGUgPSB0cnVlO1xuICByZXR1cm4gZ2VvbWV0cnk7XG59IiwiLyoqXG4qIGRhdC1ndWlWUiBKYXZhc2NyaXB0IENvbnRyb2xsZXIgTGlicmFyeSBmb3IgVlJcbiogaHR0cHM6Ly9naXRodWIuY29tL2RhdGFhcnRzL2RhdC5ndWlWUlxuKlxuKiBDb3B5cmlnaHQgMjAxNiBEYXRhIEFydHMgVGVhbSwgR29vZ2xlIEluYy5cbipcbiogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbipcbiogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuKlxuKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4qIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4qIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgY3JlYXRlVGV4dExhYmVsIGZyb20gJy4vdGV4dGxhYmVsJztcbmltcG9ydCBjcmVhdGVJbnRlcmFjdGlvbiBmcm9tICcuL2ludGVyYWN0aW9uJztcbmltcG9ydCAqIGFzIENvbG9ycyBmcm9tICcuL2NvbG9ycyc7XG5pbXBvcnQgKiBhcyBMYXlvdXQgZnJvbSAnLi9sYXlvdXQnO1xuaW1wb3J0ICogYXMgR3JhcGhpYyBmcm9tICcuL2dyYXBoaWMnO1xuaW1wb3J0ICogYXMgU2hhcmVkTWF0ZXJpYWxzIGZyb20gJy4vc2hhcmVkbWF0ZXJpYWxzJztcbmltcG9ydCAqIGFzIEdyYWIgZnJvbSAnLi9ncmFiJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlQ2hlY2tib3goIHtcbiAgdGV4dENyZWF0b3IsXG4gIG9iamVjdCxcbiAgcHJvcGVydHlOYW1lID0gJ3VuZGVmaW5lZCcsXG4gIGluaXRpYWxWYWx1ZSA9IGZhbHNlLFxuICBvcHRpb25zID0gW10sXG4gIHdpZHRoID0gTGF5b3V0LlBBTkVMX1dJRFRILFxuICBoZWlnaHQgPSBMYXlvdXQuUEFORUxfSEVJR0hULFxuICBkZXB0aCA9IExheW91dC5QQU5FTF9ERVBUSFxufSA9IHt9ICl7XG5cblxuICBjb25zdCBzdGF0ZSA9IHtcbiAgICBvcGVuOiBmYWxzZSxcbiAgICBsaXN0ZW46IGZhbHNlXG4gIH07XG5cbiAgY29uc3QgRFJPUERPV05fV0lEVEggPSB3aWR0aCAqIDAuNSAtIExheW91dC5QQU5FTF9NQVJHSU47XG4gIGNvbnN0IERST1BET1dOX0hFSUdIVCA9IGhlaWdodCAtIExheW91dC5QQU5FTF9NQVJHSU47XG4gIGNvbnN0IERST1BET1dOX0RFUFRIID0gZGVwdGg7XG4gIGNvbnN0IERST1BET1dOX09QVElPTl9IRUlHSFQgPSBoZWlnaHQgLSBMYXlvdXQuUEFORUxfTUFSR0lOICogMS4yO1xuICBjb25zdCBEUk9QRE9XTl9NQVJHSU4gPSBMYXlvdXQuUEFORUxfTUFSR0lOICogLTAuNDtcblxuICBjb25zdCBncm91cCA9IG5ldyBUSFJFRS5Hcm91cCgpO1xuXG4gIGNvbnN0IHBhbmVsID0gTGF5b3V0LmNyZWF0ZVBhbmVsKCB3aWR0aCwgaGVpZ2h0LCBkZXB0aCApO1xuICBncm91cC5hZGQoIHBhbmVsICk7XG5cbiAgZ3JvdXAuaGl0c2NhbiA9IFsgcGFuZWwgXTtcblxuICBjb25zdCBsYWJlbEludGVyYWN0aW9ucyA9IFtdO1xuICBjb25zdCBvcHRpb25MYWJlbHMgPSBbXTtcblxuICAvLyAgZmluZCBhY3R1YWxseSB3aGljaCBsYWJlbCBpcyBzZWxlY3RlZFxuICBjb25zdCBpbml0aWFsTGFiZWwgPSBmaW5kTGFiZWxGcm9tUHJvcCgpO1xuXG5cblxuICBmdW5jdGlvbiBmaW5kTGFiZWxGcm9tUHJvcCgpe1xuICAgIGlmKCBBcnJheS5pc0FycmF5KCBvcHRpb25zICkgKXtcbiAgICAgIHJldHVybiBvcHRpb25zLmZpbmQoIGZ1bmN0aW9uKCBvcHRpb25OYW1lICl7XG4gICAgICAgIHJldHVybiBvcHRpb25OYW1lID09PSBvYmplY3RbIHByb3BlcnR5TmFtZSBdXG4gICAgICB9KTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvcHRpb25zKS5maW5kKCBmdW5jdGlvbiggb3B0aW9uTmFtZSApe1xuICAgICAgICByZXR1cm4gb2JqZWN0W3Byb3BlcnR5TmFtZV0gPT09IG9wdGlvbnNbIG9wdGlvbk5hbWUgXTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU9wdGlvbiggbGFiZWxUZXh0LCBpc09wdGlvbiApe1xuICAgIGNvbnN0IGxhYmVsID0gY3JlYXRlVGV4dExhYmVsKFxuICAgICAgdGV4dENyZWF0b3IsIGxhYmVsVGV4dCxcbiAgICAgIERST1BET1dOX1dJRFRILCBkZXB0aCxcbiAgICAgIENvbG9ycy5EUk9QRE9XTl9GR19DT0xPUiwgQ29sb3JzLkRST1BET1dOX0JHX0NPTE9SLFxuICAgICAgMC44NjZcbiAgICApO1xuXG4gICAgZ3JvdXAuaGl0c2Nhbi5wdXNoKCBsYWJlbC5iYWNrICk7XG4gICAgY29uc3QgbGFiZWxJbnRlcmFjdGlvbiA9IGNyZWF0ZUludGVyYWN0aW9uKCBsYWJlbC5iYWNrICk7XG4gICAgbGFiZWxJbnRlcmFjdGlvbnMucHVzaCggbGFiZWxJbnRlcmFjdGlvbiApO1xuICAgIG9wdGlvbkxhYmVscy5wdXNoKCBsYWJlbCApO1xuXG5cbiAgICBpZiggaXNPcHRpb24gKXtcbiAgICAgIGxhYmVsSW50ZXJhY3Rpb24uZXZlbnRzLm9uKCAnb25QcmVzc2VkJywgZnVuY3Rpb24oIHAgKXtcbiAgICAgICAgc2VsZWN0ZWRMYWJlbC5zZXRTdHJpbmcoIGxhYmVsVGV4dCApO1xuXG4gICAgICAgIGxldCBwcm9wZXJ0eUNoYW5nZWQgPSBmYWxzZTtcblxuICAgICAgICBpZiggQXJyYXkuaXNBcnJheSggb3B0aW9ucyApICl7XG4gICAgICAgICAgcHJvcGVydHlDaGFuZ2VkID0gb2JqZWN0WyBwcm9wZXJ0eU5hbWUgXSAhPT0gbGFiZWxUZXh0O1xuICAgICAgICAgIGlmKCBwcm9wZXJ0eUNoYW5nZWQgKXtcbiAgICAgICAgICAgIG9iamVjdFsgcHJvcGVydHlOYW1lIF0gPSBsYWJlbFRleHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgcHJvcGVydHlDaGFuZ2VkID0gb2JqZWN0WyBwcm9wZXJ0eU5hbWUgXSAhPT0gb3B0aW9uc1sgbGFiZWxUZXh0IF07XG4gICAgICAgICAgaWYoIHByb3BlcnR5Q2hhbmdlZCApe1xuICAgICAgICAgICAgb2JqZWN0WyBwcm9wZXJ0eU5hbWUgXSA9IG9wdGlvbnNbIGxhYmVsVGV4dCBdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgY29sbGFwc2VPcHRpb25zKCk7XG4gICAgICAgIHN0YXRlLm9wZW4gPSBmYWxzZTtcblxuICAgICAgICBpZiggb25DaGFuZ2VkQ0IgJiYgcHJvcGVydHlDaGFuZ2VkICl7XG4gICAgICAgICAgb25DaGFuZ2VkQ0IoIG9iamVjdFsgcHJvcGVydHlOYW1lIF0gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHAubG9ja2VkID0gdHJ1ZTtcblxuICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICBsYWJlbEludGVyYWN0aW9uLmV2ZW50cy5vbiggJ29uUHJlc3NlZCcsIGZ1bmN0aW9uKCBwICl7XG4gICAgICAgIGlmKCBzdGF0ZS5vcGVuID09PSBmYWxzZSApe1xuICAgICAgICAgIG9wZW5PcHRpb25zKCk7XG4gICAgICAgICAgc3RhdGUub3BlbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICBjb2xsYXBzZU9wdGlvbnMoKTtcbiAgICAgICAgICBzdGF0ZS5vcGVuID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBwLmxvY2tlZCA9IHRydWU7XG4gICAgICB9KTtcbiAgICB9XG4gICAgbGFiZWwuaXNPcHRpb24gPSBpc09wdGlvbjtcbiAgICByZXR1cm4gbGFiZWw7XG4gIH1cblxuICBmdW5jdGlvbiBjb2xsYXBzZU9wdGlvbnMoKXtcbiAgICBvcHRpb25MYWJlbHMuZm9yRWFjaCggZnVuY3Rpb24oIGxhYmVsICl7XG4gICAgICBpZiggbGFiZWwuaXNPcHRpb24gKXtcbiAgICAgICAgbGFiZWwudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICBsYWJlbC5iYWNrLnZpc2libGUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9wZW5PcHRpb25zKCl7XG4gICAgb3B0aW9uTGFiZWxzLmZvckVhY2goIGZ1bmN0aW9uKCBsYWJlbCApe1xuICAgICAgaWYoIGxhYmVsLmlzT3B0aW9uICl7XG4gICAgICAgIGxhYmVsLnZpc2libGUgPSB0cnVlO1xuICAgICAgICBsYWJlbC5iYWNrLnZpc2libGUgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gIGJhc2Ugb3B0aW9uXG4gIGNvbnN0IHNlbGVjdGVkTGFiZWwgPSBjcmVhdGVPcHRpb24oIGluaXRpYWxMYWJlbCwgZmFsc2UgKTtcbiAgc2VsZWN0ZWRMYWJlbC5wb3NpdGlvbi54ID0gTGF5b3V0LlBBTkVMX01BUkdJTiAqIDAuNSArIHdpZHRoICogMC41O1xuICBzZWxlY3RlZExhYmVsLnBvc2l0aW9uLnogPSBkZXB0aDtcblxuICBjb25zdCBkb3duQXJyb3cgPSBHcmFwaGljLmRvd25BcnJvdygpO1xuICAvLyBDb2xvcnMuY29sb3JpemVHZW9tZXRyeSggZG93bkFycm93Lmdlb21ldHJ5LCBDb2xvcnMuRFJPUERPV05fRkdfQ09MT1IgKTtcbiAgZG93bkFycm93LnBvc2l0aW9uLnNldCggRFJPUERPV05fV0lEVEggLSAwLjA0LCAwLCBkZXB0aCAqIDEuMDEgKTtcbiAgc2VsZWN0ZWRMYWJlbC5hZGQoIGRvd25BcnJvdyApO1xuXG5cbiAgZnVuY3Rpb24gY29uZmlndXJlTGFiZWxQb3NpdGlvbiggbGFiZWwsIGluZGV4ICl7XG4gICAgbGFiZWwucG9zaXRpb24ueSA9IC1EUk9QRE9XTl9NQVJHSU4gLSAoaW5kZXgrMSkgKiAoIERST1BET1dOX09QVElPTl9IRUlHSFQgKTtcbiAgICBsYWJlbC5wb3NpdGlvbi56ID0gZGVwdGg7XG4gIH1cblxuICBmdW5jdGlvbiBvcHRpb25Ub0xhYmVsKCBvcHRpb25OYW1lLCBpbmRleCApe1xuICAgIGNvbnN0IG9wdGlvbkxhYmVsID0gY3JlYXRlT3B0aW9uKCBvcHRpb25OYW1lLCB0cnVlICk7XG4gICAgY29uZmlndXJlTGFiZWxQb3NpdGlvbiggb3B0aW9uTGFiZWwsIGluZGV4ICk7XG4gICAgcmV0dXJuIG9wdGlvbkxhYmVsO1xuICB9XG5cbiAgaWYoIEFycmF5LmlzQXJyYXkoIG9wdGlvbnMgKSApe1xuICAgIHNlbGVjdGVkTGFiZWwuYWRkKCAuLi5vcHRpb25zLm1hcCggb3B0aW9uVG9MYWJlbCApICk7XG4gIH1cbiAgZWxzZXtcbiAgICBzZWxlY3RlZExhYmVsLmFkZCggLi4uT2JqZWN0LmtleXMob3B0aW9ucykubWFwKCBvcHRpb25Ub0xhYmVsICkgKTtcbiAgfVxuXG5cbiAgY29sbGFwc2VPcHRpb25zKCk7XG5cbiAgY29uc3QgZGVzY3JpcHRvckxhYmVsID0gdGV4dENyZWF0b3IuY3JlYXRlKCBwcm9wZXJ0eU5hbWUgKTtcbiAgZGVzY3JpcHRvckxhYmVsLnBvc2l0aW9uLnggPSBMYXlvdXQuUEFORUxfTEFCRUxfVEVYVF9NQVJHSU47XG4gIGRlc2NyaXB0b3JMYWJlbC5wb3NpdGlvbi56ID0gZGVwdGg7XG4gIGRlc2NyaXB0b3JMYWJlbC5wb3NpdGlvbi55ID0gLTAuMDM7XG5cbiAgY29uc3QgY29udHJvbGxlcklEID0gTGF5b3V0LmNyZWF0ZUNvbnRyb2xsZXJJREJveCggaGVpZ2h0LCBDb2xvcnMuQ09OVFJPTExFUl9JRF9EUk9QRE9XTiApO1xuICBjb250cm9sbGVySUQucG9zaXRpb24ueiA9IGRlcHRoO1xuXG5cbiAgY29uc3QgYm9yZGVyQm94ID0gTGF5b3V0LmNyZWF0ZVBhbmVsKCBEUk9QRE9XTl9XSURUSCArIExheW91dC5CT1JERVJfVEhJQ0tORVNTLCBEUk9QRE9XTl9IRUlHSFQgKyBMYXlvdXQuQk9SREVSX1RISUNLTkVTUyAqIDAuNSwgRFJPUERPV05fREVQVEgsIHRydWUgKTtcbiAgYm9yZGVyQm94Lm1hdGVyaWFsLmNvbG9yLnNldEhleCggMHgxZjdhZTcgKTtcbiAgYm9yZGVyQm94LnBvc2l0aW9uLnggPSAtTGF5b3V0LkJPUkRFUl9USElDS05FU1MgKiAwLjUgKyB3aWR0aCAqIDAuNTtcbiAgYm9yZGVyQm94LnBvc2l0aW9uLnogPSBkZXB0aCAqIDAuNTtcblxuICBwYW5lbC5hZGQoIGRlc2NyaXB0b3JMYWJlbCwgY29udHJvbGxlcklELCBzZWxlY3RlZExhYmVsLCBib3JkZXJCb3ggKTtcblxuXG4gIHVwZGF0ZVZpZXcoKTtcblxuICBmdW5jdGlvbiB1cGRhdGVWaWV3KCl7XG5cbiAgICBsYWJlbEludGVyYWN0aW9ucy5mb3JFYWNoKCBmdW5jdGlvbiggaW50ZXJhY3Rpb24sIGluZGV4ICl7XG4gICAgICBjb25zdCBsYWJlbCA9IG9wdGlvbkxhYmVsc1sgaW5kZXggXTtcbiAgICAgIGlmKCBsYWJlbC5pc09wdGlvbiApe1xuICAgICAgICBpZiggaW50ZXJhY3Rpb24uaG92ZXJpbmcoKSApe1xuICAgICAgICAgIENvbG9ycy5jb2xvcml6ZUdlb21ldHJ5KCBsYWJlbC5iYWNrLmdlb21ldHJ5LCBDb2xvcnMuSElHSExJR0hUX0NPTE9SICk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICBDb2xvcnMuY29sb3JpemVHZW9tZXRyeSggbGFiZWwuYmFjay5nZW9tZXRyeSwgQ29sb3JzLkRST1BET1dOX0JHX0NPTE9SICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmKCBsYWJlbEludGVyYWN0aW9uc1swXS5ob3ZlcmluZygpIHx8IHN0YXRlLm9wZW4gKXtcbiAgICAgIGJvcmRlckJveC52aXNpYmxlID0gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgIGJvcmRlckJveC52aXNpYmxlID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgbGV0IG9uQ2hhbmdlZENCO1xuICBsZXQgb25GaW5pc2hDaGFuZ2VDQjtcblxuICBncm91cC5vbkNoYW5nZSA9IGZ1bmN0aW9uKCBjYWxsYmFjayApe1xuICAgIG9uQ2hhbmdlZENCID0gY2FsbGJhY2s7XG4gICAgcmV0dXJuIGdyb3VwO1xuICB9O1xuXG4gIGNvbnN0IGdyYWJJbnRlcmFjdGlvbiA9IEdyYWIuY3JlYXRlKCB7IGdyb3VwLCBwYW5lbCB9ICk7XG5cbiAgZ3JvdXAubGlzdGVuID0gZnVuY3Rpb24oKXtcbiAgICBzdGF0ZS5saXN0ZW4gPSB0cnVlO1xuICAgIHJldHVybiBncm91cDtcbiAgfTtcblxuICBncm91cC51cGRhdGUgPSBmdW5jdGlvbiggaW5wdXRPYmplY3RzICl7XG4gICAgaWYoIHN0YXRlLmxpc3RlbiApe1xuICAgICAgc2VsZWN0ZWRMYWJlbC5zZXRTdHJpbmcoIGZpbmRMYWJlbEZyb21Qcm9wKCkgKTtcbiAgICB9XG4gICAgbGFiZWxJbnRlcmFjdGlvbnMuZm9yRWFjaCggZnVuY3Rpb24oIGxhYmVsSW50ZXJhY3Rpb24gKXtcbiAgICAgIGxhYmVsSW50ZXJhY3Rpb24udXBkYXRlKCBpbnB1dE9iamVjdHMgKTtcbiAgICB9KTtcbiAgICBncmFiSW50ZXJhY3Rpb24udXBkYXRlKCBpbnB1dE9iamVjdHMgKTtcbiAgICB1cGRhdGVWaWV3KCk7XG4gIH07XG5cbiAgZ3JvdXAubmFtZSA9IGZ1bmN0aW9uKCBzdHIgKXtcbiAgICBkZXNjcmlwdG9yTGFiZWwudXBkYXRlKCBzdHIgKTtcbiAgICByZXR1cm4gZ3JvdXA7XG4gIH07XG5cblxuICByZXR1cm4gZ3JvdXA7XG59IiwiLyoqXG4qIGRhdC1ndWlWUiBKYXZhc2NyaXB0IENvbnRyb2xsZXIgTGlicmFyeSBmb3IgVlJcbiogaHR0cHM6Ly9naXRodWIuY29tL2RhdGFhcnRzL2RhdC5ndWlWUlxuKlxuKiBDb3B5cmlnaHQgMjAxNiBEYXRhIEFydHMgVGVhbSwgR29vZ2xlIEluYy5cbipcbiogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbipcbiogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuKlxuKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4qIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4qIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgY3JlYXRlVGV4dExhYmVsIGZyb20gJy4vdGV4dGxhYmVsJztcbmltcG9ydCBjcmVhdGVJbnRlcmFjdGlvbiBmcm9tICcuL2ludGVyYWN0aW9uJztcbmltcG9ydCAqIGFzIENvbG9ycyBmcm9tICcuL2NvbG9ycyc7XG5pbXBvcnQgKiBhcyBMYXlvdXQgZnJvbSAnLi9sYXlvdXQnO1xuaW1wb3J0ICogYXMgR3JhcGhpYyBmcm9tICcuL2dyYXBoaWMnO1xuaW1wb3J0ICogYXMgU2hhcmVkTWF0ZXJpYWxzIGZyb20gJy4vc2hhcmVkbWF0ZXJpYWxzJztcbmltcG9ydCAqIGFzIEdyYWIgZnJvbSAnLi9ncmFiJztcbmltcG9ydCAqIGFzIFBhbGV0dGUgZnJvbSAnLi9wYWxldHRlJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlRm9sZGVyKHtcbiAgdGV4dENyZWF0b3IsXG4gIG5hbWUsXG4gIGd1aUFkZCxcbiAgYWRkU2xpZGVyLFxuICBhZGREcm9wZG93bixcbiAgYWRkQ2hlY2tib3gsXG4gIGFkZEJ1dHRvbixcbiAgYWRkSW1hZ2VCdXR0b25cbn0gPSB7fSApe1xuXG4gIGNvbnN0IHdpZHRoID0gTGF5b3V0LkZPTERFUl9XSURUSDtcbiAgY29uc3QgZGVwdGggPSBMYXlvdXQuUEFORUxfREVQVEg7XG5cbiAgY29uc3Qgc3RhdGUgPSB7XG4gICAgY29sbGFwc2VkOiBmYWxzZSxcbiAgICBwcmV2aW91c1BhcmVudDogdW5kZWZpbmVkXG4gIH07XG5cbiAgY29uc3QgZ3JvdXAgPSBuZXcgVEhSRUUuR3JvdXAoKTtcbiAgY29uc3QgY29sbGFwc2VHcm91cCA9IG5ldyBUSFJFRS5Hcm91cCgpO1xuICBncm91cC5hZGQoIGNvbGxhcHNlR3JvdXAgKTtcbiAgLy8gZnVuY3Rpb24gYWRkRGVidWdCb3goKSB7XG4gIC8vICAgY29uc3QgYm94ID0gTGF5b3V0LmNyZWF0ZVBhbmVsKDAuMDEsIDAuMDEsIDAuMDIsIHRydWUpO1xuICAvLyAgIGJveC5tYXRlcmlhbC5jb2xvci5zZXRIZXgoMHgwMGZmMDApO1xuICAvLyAgIC8vQ29sb3JzLmNvbG9yaXplR2VvbWV0cnkoIGJveC5nZW9tZXRyeSwgICk7XG4gIC8vICAgZ3JvdXAuYWRkKGJveCk7XG4gIC8vIH1cbiAgLy8gYWRkRGVidWdCb3goKTtcbiAgXG4gIC8vZXhwb3NlIGFzIHB1YmxpYyBpbnRlcmZhY2Ugc28gdGhhdCBjaGlsZHJlbiBjYW4gY2FsbCBpdCB3aGVuIHRoZWlyIHNwYWNpbmcgY2hhbmdlc1xuICBncm91cC5wZXJmb3JtTGF5b3V0ID0gcGVyZm9ybUxheW91dDtcblxuXG4gIC8vICBZZWFoLiBHcm9zcy4gIFxuICAvL1BKVDogV291bGQgcHJvYmFibHkgYmUgYmV0dGVyIHRvIGhhdmUgdGhlIFRIUkVFIG9iamVjdCBiZSBhIG1lbWJlclxuICAvL3JhdGhlciB0aGFuIGp1c3QgYWRkaW5nIHByb3BlcnRpZXMgdG8gaXQgaW4gZG9kZ3kgd2F5cy5cbiAgY29uc3QgYWRkT3JpZ2luYWwgPSBUSFJFRS5Hcm91cC5wcm90b3R5cGUuYWRkO1xuXG4gIGZ1bmN0aW9uIGFkZEltcGwoIG8gKXtcbiAgICBhZGRPcmlnaW5hbC5jYWxsKCBncm91cCwgbyApO1xuICB9XG5cbiAgYWRkSW1wbCggY29sbGFwc2VHcm91cCApO1xuXG4gIGNvbnN0IHBhbmVsID0gTGF5b3V0LmNyZWF0ZVBhbmVsKCB3aWR0aCwgTGF5b3V0LkZPTERFUl9IRUlHSFQsIGRlcHRoLCB0cnVlICk7XG4gIGFkZEltcGwoIHBhbmVsICk7XG5cbiAgY29uc3QgZGVzY3JpcHRvckxhYmVsID0gdGV4dENyZWF0b3IuY3JlYXRlKCBuYW1lICk7XG4gIGRlc2NyaXB0b3JMYWJlbC5wb3NpdGlvbi54ID0gTGF5b3V0LlBBTkVMX0xBQkVMX1RFWFRfTUFSR0lOICogMS41O1xuICBkZXNjcmlwdG9yTGFiZWwucG9zaXRpb24ueSA9IC0wLjAzO1xuICBkZXNjcmlwdG9yTGFiZWwucG9zaXRpb24ueiA9IGRlcHRoO1xuICBwYW5lbC5hZGQoIGRlc2NyaXB0b3JMYWJlbCApO1xuXG4gIGNvbnN0IGRvd25BcnJvdyA9IExheW91dC5jcmVhdGVEb3duQXJyb3coKTtcbiAgQ29sb3JzLmNvbG9yaXplR2VvbWV0cnkoIGRvd25BcnJvdy5nZW9tZXRyeSwgMHhmZmZmZmYgKTtcbiAgZG93bkFycm93LnBvc2l0aW9uLnNldCggMC4wNSwgMCwgZGVwdGggICogMS4wMSApO1xuICBwYW5lbC5hZGQoIGRvd25BcnJvdyApO1xuXG4gIC8vUEpUOiB0aGlzIGdyYWJiZXIgc2hvdWxkIHJlYWxseSBiZWxvbmcgdG8gJ2d1aScgcmF0aGVyIHRoYW4gZm9sZGVyXG4gIGNvbnN0IGdyYWJiZXIgPSBMYXlvdXQuY3JlYXRlUGFuZWwoIHdpZHRoLCBMYXlvdXQuRk9MREVSX0dSQUJfSEVJR0hULCBkZXB0aCwgdHJ1ZSApO1xuICBncmFiYmVyLnBvc2l0aW9uLnkgPSBMYXlvdXQuRk9MREVSX0hFSUdIVCAqIDAuODY7IC8vWFhYOiBtYWdpYyBudW1iZXJcbiAgZ3JhYmJlci5uYW1lID0gJ2dyYWJiZXInO1xuICBhZGRJbXBsKCBncmFiYmVyICk7XG5cbiAgY29uc3QgZ3JhYkJhciA9IEdyYXBoaWMuZ3JhYkJhcigpO1xuICBncmFiQmFyLnBvc2l0aW9uLnNldCggd2lkdGggKiAwLjUsIDAsIGRlcHRoICogMS4wMDEgKTtcbiAgZ3JhYmJlci5hZGQoIGdyYWJCYXIgKTtcbiAgZ3JvdXAuaXNGb2xkZXIgPSB0cnVlO1xuICBncm91cC5oaWRlR3JhYmJlciA9IGZ1bmN0aW9uKCkgeyBncmFiYmVyLnZpc2libGUgPSBmYWxzZSB9O1xuXG4gIGdyb3VwLmFkZCA9IGZ1bmN0aW9uKCAuLi5hcmdzICl7XG4gICAgY29uc3QgbmV3Q29udHJvbGxlciA9IGd1aUFkZCggLi4uYXJncyApO1xuXG4gICAgaWYoIG5ld0NvbnRyb2xsZXIgKXtcbiAgICAgIGdyb3VwLmFkZENvbnRyb2xsZXIoIG5ld0NvbnRyb2xsZXIgKTtcbiAgICAgIHJldHVybiBuZXdDb250cm9sbGVyO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgcmV0dXJuIG5ldyBUSFJFRS5Hcm91cCgpO1xuICAgIH1cbiAgfTtcblxuICBncm91cC5hZGRDb250cm9sbGVyID0gZnVuY3Rpb24oIC4uLmFyZ3MgKXtcbiAgICBhcmdzLmZvckVhY2goIGZ1bmN0aW9uKCBvYmogKXtcbiAgICAgIC8vIFBKVDogbm90IHN1cmUgd2hhdCBwdXJwb3NlIHRoaXMgZXh0cmEgZ3JvdXAgaGFzLlxuICAgICAgLy8gY29uc3QgY29udGFpbmVyID0gbmV3IFRIUkVFLkdyb3VwKCk7XG4gICAgICAvLyBpZiAob2JqLnNwYWNpbmcpIGNvbnRhaW5lci5zcGFjaW5nID0gb2JqLnNwYWNpbmc7XG4gICAgICAvLyBjb250YWluZXIuYWRkKCBvYmogKTtcbiAgICAgIC8vIGNvbGxhcHNlR3JvdXAuYWRkKCBjb250YWluZXIgKTtcbiAgICAgIGNvbGxhcHNlR3JvdXAuYWRkKCBvYmogKTtcbiAgICAgIG9iai5mb2xkZXIgPSBncm91cDtcbiAgICAgIC8vcXVpY2sgJiBkaXJ0eSBoYWNrIHRvIGhpZGUgZ3JhYkJhclxuICAgICAgLy9pZiAob2JqLmNoaWxkcmVuWzJdKSBvYmouY2hpbGRyZW5bMl0udmlzaWJsZSA9IGZhbHNlO1xuICAgICAgaWYgKG9iai5oaWRlR3JhYmJlcikgb2JqLmhpZGVHcmFiYmVyKCk7XG4gICAgfSk7XG5cbiAgICBwZXJmb3JtTGF5b3V0KCk7XG4gIH07XG5cbiAgZnVuY3Rpb24gcGVyZm9ybUxheW91dCgpe1xuICAgIGNvbnN0IHNwYWNpbmdQZXJDb250cm9sbGVyID0gTGF5b3V0LlBBTkVMX0hFSUdIVCArIExheW91dC5QQU5FTF9TUEFDSU5HO1xuICAgIHZhciB5ID0gMCwgbGFzdEhlaWdodCA9IHNwYWNpbmdQZXJDb250cm9sbGVyLCB0b3RhbFNwYWNpbmcgPSBzcGFjaW5nUGVyQ29udHJvbGxlcjtcbiAgICBjb2xsYXBzZUdyb3VwLmNoaWxkcmVuLmZvckVhY2goIGZ1bmN0aW9uKCBjaGlsZCwgaW5kZXggKXtcbiAgICAgIHZhciBoID0gY2hpbGQuc3BhY2luZyA/IGNoaWxkLnNwYWNpbmcgOiBzcGFjaW5nUGVyQ29udHJvbGxlcjtcbiAgICAgIHZhciBzcGFjaW5nID0gMC41ICogKGxhc3RIZWlnaHQgKyBoKTtcbiAgICAgIHZhciBsYXN0WSA9IHk7XG4gICAgICAvLyBmb3IgdGhlIG5leHQgY2hpbGQgdG8gYmUgaW4gcmlnaHQgcGxhY2UsIHkgbmVlZHMgdG8gbW92ZSBieSBmdWxsIHNwYWNpbmcuLi5cbiAgICAgIHkgLT0gc3BhY2luZzsgXG4gICAgICBcbiAgICAgIGxhc3RIZWlnaHQgPSBoO1xuICAgICAgLy8gYnV0IGZvciBmb2xkZXJzLCB0aGUgb3JpZ2luIG5lZWRzIHRvIGJlIGluIHRoZSBtaWRkbGUgb2YgdGhlIHRvcCByb3csXG4gICAgICAvLyBub3QgdGhlIG1pZGRsZSBvZiB0aGUgd2hvbGUgb2JqZWN0Li4uXG4gICAgICBjaGlsZC5wb3NpdGlvbi55ID0gY2hpbGQuaXNGb2xkZXIgPyBsYXN0WSAtIHNwYWNpbmdQZXJDb250cm9sbGVyIDogeTtcbiAgICAgIGNoaWxkLnBvc2l0aW9uLnggPSAwLjAyNjtcbiAgICAgIGlmKCBzdGF0ZS5jb2xsYXBzZWQgKXtcbiAgICAgICAgY2hpbGQudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgZWxzZXtcbiAgICAgICAgdG90YWxTcGFjaW5nICs9IGg7XG4gICAgICAgIGNoaWxkLnZpc2libGUgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYoIHN0YXRlLmNvbGxhcHNlZCApe1xuICAgICAgZG93bkFycm93LnJvdGF0aW9uLnogPSBNYXRoLlBJICogMC41O1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgZG93bkFycm93LnJvdGF0aW9uLnogPSAwO1xuICAgIH1cbiAgICBcbiAgICBncm91cC5zcGFjaW5nID0gdG90YWxTcGFjaW5nO1xuICAgIGlmIChzdGF0ZS5jb2xsYXBzZWQpIGdyb3VwLnNwYWNpbmcgPSBzcGFjaW5nUGVyQ29udHJvbGxlcjtcblxuICAgIC8vbWFrZSBzdXJlIHBhcmVudCBmb2xkZXIgYWxzbyBwZXJmb3JtcyBsYXlvdXQuXG4gICAgaWYgKGdyb3VwLmZvbGRlciAhPT0gZ3JvdXApIGdyb3VwLmZvbGRlci5wZXJmb3JtTGF5b3V0KCk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVWaWV3KCl7XG4gICAgaWYoIGludGVyYWN0aW9uLmhvdmVyaW5nKCkgKXtcbiAgICAgIHBhbmVsLm1hdGVyaWFsLmNvbG9yLnNldEhleCggQ29sb3JzLkhJR0hMSUdIVF9CQUNLICk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICBwYW5lbC5tYXRlcmlhbC5jb2xvci5zZXRIZXgoIENvbG9ycy5ERUZBVUxUX0JBQ0sgKTtcbiAgICB9XG5cbiAgICBpZiggZ3JhYkludGVyYWN0aW9uLmhvdmVyaW5nKCkgKXtcbiAgICAgIGdyYWJiZXIubWF0ZXJpYWwuY29sb3Iuc2V0SGV4KCBDb2xvcnMuSElHSExJR0hUX0JBQ0sgKTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgIGdyYWJiZXIubWF0ZXJpYWwuY29sb3Iuc2V0SGV4KCBDb2xvcnMuREVGQVVMVF9CQUNLICk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgaW50ZXJhY3Rpb24gPSBjcmVhdGVJbnRlcmFjdGlvbiggcGFuZWwgKTtcbiAgaW50ZXJhY3Rpb24uZXZlbnRzLm9uKCAnb25QcmVzc2VkJywgZnVuY3Rpb24oIHAgKXtcbiAgICBzdGF0ZS5jb2xsYXBzZWQgPSAhc3RhdGUuY29sbGFwc2VkO1xuICAgIHBlcmZvcm1MYXlvdXQoKTtcbiAgICBwLmxvY2tlZCA9IHRydWU7XG4gIH0pO1xuXG4gIGdyb3VwLmZvbGRlciA9IGdyb3VwO1xuXG4gIGNvbnN0IGdyYWJJbnRlcmFjdGlvbiA9IEdyYWIuY3JlYXRlKCB7IGdyb3VwLCBwYW5lbDogZ3JhYmJlciB9ICk7XG4gIGNvbnN0IHBhbGV0dGVJbnRlcmFjdGlvbiA9IFBhbGV0dGUuY3JlYXRlKCB7IGdyb3VwLCBwYW5lbCB9ICk7XG5cbiAgZ3JvdXAudXBkYXRlID0gZnVuY3Rpb24oIGlucHV0T2JqZWN0cyApe1xuICAgIGludGVyYWN0aW9uLnVwZGF0ZSggaW5wdXRPYmplY3RzICk7XG4gICAgZ3JhYkludGVyYWN0aW9uLnVwZGF0ZSggaW5wdXRPYmplY3RzICk7XG4gICAgcGFsZXR0ZUludGVyYWN0aW9uLnVwZGF0ZSggaW5wdXRPYmplY3RzICk7XG5cbiAgICB1cGRhdGVWaWV3KCk7XG4gIH07XG5cbiAgZ3JvdXAubmFtZSA9IGZ1bmN0aW9uKCBzdHIgKXtcbiAgICBkZXNjcmlwdG9yTGFiZWwudXBkYXRlKCBzdHIgKTtcbiAgICByZXR1cm4gZ3JvdXA7XG4gIH07XG5cbiAgZ3JvdXAuaGl0c2NhbiA9IFsgcGFuZWwsIGdyYWJiZXIgXTtcblxuICBncm91cC5iZWluZ01vdmVkID0gZmFsc2U7XG5cbiAgZ3JvdXAuYWRkU2xpZGVyID0gKC4uLmFyZ3MpPT57XG4gICAgY29uc3QgY29udHJvbGxlciA9IGFkZFNsaWRlciguLi5hcmdzKTtcbiAgICBpZiggY29udHJvbGxlciApe1xuICAgICAgZ3JvdXAuYWRkQ29udHJvbGxlciggY29udHJvbGxlciApO1xuICAgICAgcmV0dXJuIGNvbnRyb2xsZXI7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICByZXR1cm4gbmV3IFRIUkVFLkdyb3VwKCk7XG4gICAgfVxuICB9O1xuICBncm91cC5hZGREcm9wZG93biA9ICguLi5hcmdzKT0+e1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBhZGREcm9wZG93biguLi5hcmdzKTtcbiAgICBpZiggY29udHJvbGxlciApe1xuICAgICAgZ3JvdXAuYWRkQ29udHJvbGxlciggY29udHJvbGxlciApO1xuICAgICAgcmV0dXJuIGNvbnRyb2xsZXI7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICByZXR1cm4gbmV3IFRIUkVFLkdyb3VwKCk7XG4gICAgfVxuICB9O1xuICBncm91cC5hZGRDaGVja2JveCA9ICguLi5hcmdzKT0+e1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBhZGRDaGVja2JveCguLi5hcmdzKTtcbiAgICBpZiggY29udHJvbGxlciApe1xuICAgICAgZ3JvdXAuYWRkQ29udHJvbGxlciggY29udHJvbGxlciApO1xuICAgICAgcmV0dXJuIGNvbnRyb2xsZXI7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICByZXR1cm4gbmV3IFRIUkVFLkdyb3VwKCk7XG4gICAgfVxuICB9O1xuICBncm91cC5hZGRCdXR0b24gPSAoLi4uYXJncyk9PntcbiAgICBjb25zdCBjb250cm9sbGVyID0gYWRkQnV0dG9uKC4uLmFyZ3MpO1xuICAgIGlmKCBjb250cm9sbGVyICl7XG4gICAgICBncm91cC5hZGRDb250cm9sbGVyKCBjb250cm9sbGVyICk7XG4gICAgICByZXR1cm4gY29udHJvbGxlcjtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgIHJldHVybiBuZXcgVEhSRUUuR3JvdXAoKTtcbiAgICB9XG4gIH07XG4gIGdyb3VwLmFkZEltYWdlQnV0dG9uID0gKC4uLmFyZ3MpPT57XG4gICAgY29uc3QgY29udHJvbGxlciA9IGFkZEltYWdlQnV0dG9uKC4uLmFyZ3MpO1xuICAgIGlmKCBjb250cm9sbGVyICl7XG4gICAgICBncm91cC5hZGRDb250cm9sbGVyKCBjb250cm9sbGVyICk7XG4gICAgICByZXR1cm4gY29udHJvbGxlcjtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgIHJldHVybiBuZXcgVEhSRUUuR3JvdXAoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGdyb3VwO1xufSIsIi8qKlxuKiBkYXQtZ3VpVlIgSmF2YXNjcmlwdCBDb250cm9sbGVyIExpYnJhcnkgZm9yIFZSXG4qIGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRhYXJ0cy9kYXQuZ3VpVlJcbipcbiogQ29weXJpZ2h0IDIwMTYgRGF0YSBBcnRzIFRlYW0sIEdvb2dsZSBJbmMuXG4qXG4qIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4qIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4qXG4qICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbipcbiogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4qIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4qIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGltYWdlKCl7XG4gIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XG4gIGltYWdlLnNyYyA9IGBkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQWdBQUFBRUFDQU1BQUFEeVRqNVZBQUFBalZCTVZFVkhjRXovLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8rdW1BYzdBQUFBTDNSU1RsTUFXbkpmYm5xRFdHUjRhMlpjWW5CUmFsUkxnSDZFVG5SOFVHaDJSb1pEWGxhSFNZbzhRSFUyTHlZY0ZBd0ZtbVVSMU9JQUFKRmhTVVJCVkhoZXRMMkpXbXU3ampVS0lRa2tRTHFadmdNQ1pPMnpULzMzL1IvdlNrTkRrajJUck9hclZkNVY2eERQM3BKbFdkS1E3cWFQYjYrdnJ3OHZqK1BaL3Z2cnh6Ly8vUGo2M3MvRzcvY1AybjAvWFo2T3A2WDhmSkhmYUcvM2o5cTVYL0xLdC90M3YvUWZ1ZlFrL1hvdWJvbHovRHE1TEg3eTFuTFZsOXhlSDRiMjhqaWRuY1p5L1pNMFArV2ZmLzd6bi8vOCsrOS8vc0c1VXp0YXYzSDFpbkpJWGtsZThRdm4zK09ST1Ayb2o1T1BtejdldittNVBEREZ5WGFuL1V3ZXdCZDgxMjRaRG4ybzNlVEJCbUNLQXpaUWZqWTc1V1gvL1krL0tqNkxuNzcvL3VGM3IyNHZIeWZQNWFlOWNSUnNhSDVJLzQ4dmVRcVA1S2g5WDl6ODZ3dm4rd2poWmZtWWpUem15QmZsU09CejVWMWxYTzhlSDU0bXc4bnpLOGRUSHNuUGVwYnVwd2Z0MVZ1K1BzbHZhWlB0czczRmFXeFhicC9pVWp4L0k5U1VjM0hMcVoyRGhudFZQMEVSZk43OXE5MTgrL1QydUZsTzhldzhCVytxdzRSejVSWmJPVHA1ZnNKaitkVHFGWi9sbFRBcXVMYytFbThqQS80ZEEvUzg5Yzk1a2hFaDhaVFltOGUzcCswUVY5eFA1ZjVmUWpVOFZMdWVKM2l0ZTlDVDlMZXpuNUlEK0twOHRCM0VtT2ZkZWZzbDU4MFBZMVdNRGthQk5GWHFINVZqZVNTRzVIalJkVHpxK2VBTWpQK0VMOHZIeUNTekZ6VzZMRTk2UHJqdjd1VnBNdXAwdWx1TXA3SXB1V1hiN1hRNnd5Y1p0dGtVYjkzdG9JMjY5ckhMS2E4Y2JwMFVuTTJ2VHhNOXQvdjg4SWh6ZU4zazZTVi80dGJ5WnNlOWZkNFFmZDJKdk83bThlRzVXNTd5RFJiQXJNSzV1RHZlR0NUOVFiN0lWK3phR003Mnh4UHVQY0xwU3M4ajU5bnpwQnVmTTN4MjRuSGF2dG9EaG5JUDZTWFY4TjY0YURRa1BUbFJ0bmIyczk5RTM5UmZkUmlmcnJ3a25idzdiby9KaFhsTHdlbFBtY2lUeDdQVC9sdjdUN1BaNWhIamxrUHl0WmZSajV1RFJyT1RuQTltdlg5NHhrQjBoM3l2eDgxSkJ3SXZxdjE0VXpuLytLMHZleWVqZmU0TlZ1Q0FEY1htT3o1cjE5dDE5Zkt4dnBuOEhQUzA3VllqKzlqSE43bFNmbmZpMGgrY3pjUE9lZEFiZElTYTcyOVBjZzdhdWZ2MGxqL3Qxc3Y5YWJaVTNwekl3NlN0OVB2R01rYWRRWndpQTNIa1BQbmU0OXlSbmp0WWthUkNOdkJRdnVKZ3h6RThZY0J4NzRFTkhjWVpwNjc0T1lOemh4d2Q0dUZwdU5Lbmo3WVBrQXpIazc0UkhyclM5OXAxSnZaZ09RRDZyN1FUQk1XOHhTSjZQUEZWNDlPWHhnQzh1MXlnaEpOUnMxVnd0akg2NzNENlJLZlVjcmJYL3ZGMEtoK3g3ZTZLVVpPNzZ5eXhtMk1jcGxPY2I4dzZ4RUNjT3p0N1dRNkVkT3NuRDhEWk9CL3k1MDVIdTVselBGMXN2c29jSE16N0lPSVlYSHNlekp2K1l0SHZONzBkYmlFVGRUdmFOZjI4VkhuSDJIN1hhL3FnNXJzd3lXNitrRGFYZDMvTG40MTl5bkk4ZlgvWHp6djMrb3VtWUFENWlWUHdwaWVUbERJWHgvaHVPZGh2UUZJYjFwTk5rWE52M3RkWGxLK1JNUVM5T2VEOXhaeERSL29MelpxK2ZjNTZjRmFPQnZIMkpoNkdxL1dpUHhodGpTOU9Td3dlYnJLVEo5aGJ6bkEySnNxZ1dmVFh1MUdzV0pqUUdFUjhWditTQWVRQ0VnN2ZCcjY3Ri9wekdEQWI3NFVGMEM5TlBucWxkMXJqSzlDUGdWajNGeGlIQnoxSit2ZkhtVEhyV2orczE1T1hCUVZQZXpKQW80UlFtZkh5OG1pYUd4aWcxeHprUHJqMzdPaEVITXpsTGVYbTkzaVd2dlNIak5maThJR1BsWGRYQnRBN05zSUJ5aENuYnhWQWVQNjhmK2l2a3dIa3NvK0NBVDRPL2I1UlYrZmIyeHVlMW56b21PaDl5UUFmT09WTlZVNTVVeFd0eWwrUURzS0U4eURwdDhwRDhKQy80b2VPSWI3bXRNU0FydzhmZk41c3pIbldnUGlOOHJSek5JYkpoSjFjSWN6Zm5VRFNnV2VFQVJhZi9ZRzg1Z0VmUnJINmdJbXlhR1NrTWE3djFBMHdvZjJ6ZHZVU0FESi9jTUNubTVuekhRNDBpL2xCQnhTYVZTak5JSWNNcWJ4bzlHdW5UcWE1eWhKcFVLQ1Y0OEdzQjNDM1BHVUVDZUN5cWlmdm8yT0Q4NDFkN3g0dy9RNXp6cWdUbHBlSjNydHYwczRHdlRrY2xLZGs1SEVMK1NMd3hXQzlPQWhQZ2MyTzhpVXE1RmY2ZlhxdE1NK0wvaFJXckJoZ0Fja2xuNjlEKy9UOGpLZlpRSWxPV3pLQU5LanB5NzFKU2g2Yjc0UUpuQUZNN09IakZvM2NlZDBzRGcxRlBzZWo2YS94UENvdU94MmdlVzhnVGM5MmpsN2lSaEFQd2dEeWlyWk9ZM2xSV3NwanordSt5aW5UckhCejBMK0gxNWNuWUJwQU54Qk5UR2RDeWdhc3JuZ0NYc0FJOTNDdmVnRDFhZjBFb1VNRERvQWFFNXFlVEhhUWVqaXMrbTNjenQxUW9JUGpHL2t3NWUyenZSUVZhMmM5UFo4cTFBOVZBbkg3TldUU2VBYStoaXhhNzZEdlFIamd3bFZIbHM2NVVwd0szclpyUEk3Um5tRUZlbEFTSDVSSFZLNVM1N2xnQUNwR0dHOXBjb0lPbFB5bHN5Z1pRSnJxOUZEb3ZyK1NBWVRPL1pBQUx2Ym1oOE1jcnlpdnRGQ0N2K21NaDJ3WURIYkdFUDV0TWtBNzFlbEduYk5LT2dvTW41K05TSkhEb2xsam5aNUNxSzFXSzJHWGppeXVnL09xZ3lmN1lEY3l6THQ1STVOdGEycWRiNkw0V1IwWmEyZ1R3cXBVVmpzcW85ZXJMamRmTXlySHUwYnVJbHpRekhkVWlGMzUwenRwWjZmVnIrdTBQRGo2Wi9aT3ZmWDZEQjNuUERKTkl4VHJYZHhJcUEydXZGTWlLQmtiSXlNbUNUcTR1a3lOQVNERWg1TXVTQU1GQ1YvWlBhOFBDd2hGYkRiR1dCZjZJaXpCM2xPVnVOdkpKUVBZb0lCdzU5MXVwK082VzhrZnE2N2NPQmdBUGE0VXE0NEpYVlpYbUw1T1JGdFp2NmtSVTZ4aUlpMzhGWFhwZzBacFFzdk81QndiZFlTcW5hN09JcmtRSXVDZGt1VFExNVdrVHpIRklSV2VHc3JGOGdkSXZlSFNzS1BtT2RBSkJMWHV0REVsK2t5dFdiOEFPZ1kxa0ZCV3p4MjdaQm5Lc1k3QWVSY0tjZlRyQUEwNnE4dCtaY3RkOUUrNXhLMTJ2ZlY4UG9jUWc3U2lZcjN1c2ExN1NtMm9zbmNRNWFrbmJjQXNaeE1KV0FPVEFXVEtUR1RaZDJZZm04SzhPRGdEeEF6bGtqdGRZbnQrbFFHRXFHUXRlZFBkU05wQS9vRE80dmNZNkNGUjk2blF3ZnhoT3E2UWd3b0RWbEM3N2VHZ1F1eEpDZDQvVUgrZFVYejE3ZkdtUTY0eDVYR1h0WkJIRDRNLzlQQVdONUtuNmxwbmZFRTk4cUMvWktBZ0FKVUJxRTY0NXJrZWRFeXRvMG9pckdKYTgxelhOdWdZcDF1WHVITGMweEh1ZGtVSHRVbFY5TXNBRFcvMGo5aFBEbGNaTmhmK3BSQlRRVHgyeFRwYk1vQytyczk0MThGRy9HbkxxRjM4MlY4UGREN3FqTFdWaGFPYkRMQnZNWUJxME95NVpBQmpMVDJHTlVUSlJKM0Y3OUgwRC9vUkxwK1B0c3VsQ0pCZURHcXNPNzRVNmQ1RUtGc3hnT3VnSmc4YVdkeTZLb1VYaDRWc1lrUUVjRkhEdTVyOEdoVnJtL2J5bDdMSFltMnlSL3VoVGh4TTg1eFRqdzdka0ZyendkWEE1YzFMaW5GNWZ0Sk55TUhHdEpTWTIrMnYrNmRjNGhwNWFOUGdDVHVvZG1PblliUmtnTk00MW0zY2cvTFV4K1Iwc25tQnp4R2hvanpRdFRsWk1RQ3NhWnRweFFDUUNiY1pZT1l6VG9VTnA3QmU1aSs3MEkvNENJVnUvNVhTL2hQVDhEVVlZS3NzYTNzZUZSRXJhWHFuTmdOQXhLc0E2SXgwQWpYelJ2K1crMUZienJlWGFSU2p5dkhSUnhvalFMMGRVM0xLSUVQejFPTTJaVEFJT21DaE5aT0hiMTVTanN2TDAxVkNQejM4dXAvRVV4MElLdTVhbnJTR3VJb3Y2M21UQ1VJRzJGTnZjTjFPQmdrclFJL1Rla2EyYlQ1VXFLanlmT2FXdDJDQUx0VDNwVnFCLzRBQnNQWnh4UjdsakNNRHlFZklXZ21GanZvMWFJMzE2ZU9UNTlhS2h5MGd6ME5xdWNtamZMeVJVbjlnelJ2c2VtUUE0NTFrZ0JFa1VwK2ptaXFHWE1ZVkFOWVJHMnVaRTUyemJyRDRvazVtVVE2aE5jZGFjdk9TV3d6d3AvMVREby91NlVZamxUVTVwdnl5RGh1bGxUREFjUlpIOFdVY0pKY1JNTDdoZS9xUXliclY0cTRwR0FEcW9jb0FIZnp1N3pQQXJKQ3VIUGlTRFBvUjUxNXVaby9IdUtCWkpGc2tBMEExVVNiVVJ2MjZaZ0NzYmlMRFJRQ29aSUhCcHlQWHVzV0RyNk9LbStsZGJwa2lmNnE0b3ZhSllVbk5NMTcwUGs4L1EydkduOUF4Ymw3eXR4Z2d4MU8wNlMxMlJyWWZlaTlrR3h0Y0FudlpCbklBNVRMTW9NZjhnVkczU1ljN3lYd1VtZm1CMjdzT1FGS2RZUTE4MTZteTJxMXA5L3NsQThUcUl5Unh0Yk95QTJ6NU9UUytnaG1IbUlVWU91dXRKY0FqbkVYNHdQc0xDVUJWQ095bVQ0UEJSMlpLd3pmQzY2ak1YZzhHSzUxRFhibkx1RkNMT1REMFdQRFY1U1NvRnB3MDFEdE5pWHA5bG9lNGNMMTF5ZDlqQVBuaDI3UlhYUnRpTHVhWUp2MGhBSVFCVW9taURpNmppZkhkNmdRcjJVTU42TEp5K1pRTTdVQk1SUGdPMDdHVk9KVFB2MkFBcmo0NEdrcGNaUW5NMDRQVXBxN28vL01aeVFCNGYyeVIzUXZTWWdEOUFYbHZpb0RlU3EwTnpnQmNRcW51RE1UcEFSOWlzYzFNM1FnUGRZM2doWlFOS2dUUk1VVjhORzllOHRjWWdJL0dUSEtORm8rdWxvQjBFcWtwV0RRcjQwd3lRSzNHVlF3Z0ZpbXNYRzVobGpVY0F5YTZSaktBTWtpUFJxWGp6eG5nV0t3QnpyZVA0NXNNUUJ0bGl4S24xaTRBYXJCN1FhNHh3TUpFZVgrZ0RLQlBHUTJDQWVnRVVVTlFPRDJXWm4zQUFLMFhsT2JMM0RIb1N6c1Z6T1AxbkJxa1hKbnF5YzFML2hJRHNKOWNWYW5HdFJLWVRpSmhnQy9zbzI4eHdCN0RpNmV0ZFFNd3pCUEhWTW5VcnRva0Eram1kMDRkODFjTWNFcnBHaXZBOGlZRHFCMDFaREczcmVDTFVyUStnS05jcTd2TkFCOG0rL1dBRUlXYXZXelRuK0VHbFMyOE9UM0F4MnA5c00xNVBuVmNLVTR2K1pTYW1oQlpUb1ZibC94bEJtQi9MZGZyYmFCVDhQaExDYkJQODc1S3hkMHFGK1V4QmdHLzFRTkxYVVpXQ1NNRlBDTy9ZSUEwNHMzbmxJelROZ09rUGtxVGI2Mk5tVW1XbTRtQlNMYXRXeFIrTGdIMERKa2dLa2ZrZkpBVjBRdXdySFRPTUFUNUtwUEtUc3FkMnVMQnAxeCtaRTJGK3BLL3p3Qy9ldlRuZ3EzTkFPMVRCMjd1M2NDUmlHMXRYNldpOE1DNkhsMGo3Z2hlQTFqQXV1ajVyVjJBcVBXaE11T01iV3RvSjhPUzM1YUZqb05iY29MR1FxS0dkN0h3Y3M5K1RRY0FIV01KT0dNaEdZVWhDQUpHYmF2aUpGZ05hSmNRaFQ5MWp3V05KY3VhQVc1UDU1c004SDh2QWVDdXY3VUVEQW9HT0czOFZQVEdrbzhGK1ZTNCtMRXl3bis2cWtZWDR3VExQM3dndjc4TlBPYkdYaG9OYkx5Q3pxZmRXaWMyWHFYY00zVElHQ1NHM2FRUDdWM21iajhPdFJrQXpDM1hxenlmaTVFQjZpZFlRb2Z2M1pZd0hZZEpOMTk2R1Z2aHoxZ0I4SmFwM2hWNjMxdDdJVTc5OU5vbGY1c0JicXNmVkFKWCtLL1REU1dRTkFyRnYrSlplSmdSc1FjSFE5T0hDV1lITS95bEpWQzlvSzkveEFCcDJqUC9VVEcwbitLeE0yTVdYYm1GeHFodG5hYUFjR0IvTE13Q3FxOUk0VkF4QUZmaytRN21HRmtLeFJ3OG4vZTUyRThMWlhJeUxCamdGT1p5MEl1Ym8zSjhPZkMzVlhIdzhNMUwvaFlEM042QUpGMkdhRzRHa0cwZzNkb2h0NTJCZlpkbC9oZTBzL0pBTEkyenRpOUFsb3R4VzRQNCtUWVFFVnF2VysxTHBUN3Mxb2MrRGVhbUcxQVpDVTNtRU5OeHBpSkFoSlJHQW54QWYyZDB4bWxUTXdCbUNIYUE2dlBWOCtCWVhGUGRUNXV2T2s3blBqMlhjaGZ1Mm5Mdm1Wc1ArZmlIVjVlMlA5Mk0zN2drQ2FvSFhwKzZKT2lmOTk4MlFSUjBlVUpqQUlrd3dNbDFYR3B1Ym12aDlPSUNnU0E1YzUvNzFtVzVzVSs5N1EwY3o0UUNOeG5nWFE5ckxMYzluZHVyd3FFMGQyOE43b1U1Qi9vczJEQ1N1Q1lpRWRleW5LL1hZYXlHYmJwZ2dQUnppQjhWL3RnZC9vY2huVTQ2OVhuSVFoTG1ac1RaaG9jTSsxdmJPcDBaRHZPOHhZckJvemZOY1Rjdk1mTTdOSmNKcnZpd0JlUlArNmVYUmtpT2F5RUIyTGFNNHJwRHpNUW9sZTEwRHByQmwyYVdoUXF1TFp6dEhFMGhIbWhYTWNCanJpWnFhc0xZWFdjQU9NTGxZVS9QcGw5eE5oZE1SSDh0WGFZa1R5b3k4bURYRzhVaVlWYm9IY0pnM0FIUDFTc1lnUDVlNWZWZEo2SjhPeVBHZnRIcklhdk9BUUttejFDbk1lSnNsVjZ4Nk1UYVJidXhPQTlUOHpSQjRnYjVjeHJrYjE2U24zYVc5NUlyUGttTVArMkhNcFJ1aUxXN0lhNzVBaGphZWpkK3RMdTVmODNmM3dRVmZtL0pWU1BSanMraHVHQjBzVm93R0tGMnpDSG15TWJ1Q2dOMGgwcFZJUWlITmxhQWtnSGcxUnRwMElSSklzNGZmZ1IxSzdBZTBRaGQ0Um5lU3AyVFhMM2MwYVVHZkpyNjFFbXZOOThOTks2QWNlRWVVYXVxenVjaVZnWVZkSWo3S0ZhQUwxb2w1WDFjODhSWTQyakxKYWZ1TEJ2YW01ZEVTSk13dDRSdDZLVXdpdjF4dnp5NmRFVDJQYWdsdllGci9nZWFnUUUwV3BBRWgyQmZwcHdjSVR5WkF5OFhEeVFVQU80NXhnU3ExQTB4QmdaWXVsSS90NG5Mc2J0Z0FBa0Mwb2Y1MEpMZGFEbW94ZFVrM0RycGx0ZldEZEVxM0NFY0FPNFhpalpPN0ZPc1htNlltQzdEVlM4c3NKWTJiL0R5aGd4aFREMk1BQi96WEJuc3JlY2lYSHpqcVpnQU1GTnFub2REMkQvSDk5ZWQ4c3VibDFoUTR3QkJyZFI3d0h0LzJyKzhGWXJnZXRVaW1rdnRyenVoUHdPQ1J0U283c2tSK25aUUNzRFFJaEtiK1p3TytnbGRaN3QwYVk1UGlNL2x5WDBMTXVYWXpWc01JRDBoK2xZNjRZUm9aS0tLQVJDOUN1aFpGZmVGS0ZncVY0eEgzVlA0ekJ0d2N1VWtXQnpvbkVESUhJTjFGdEFsWU1QVU93ajlpYW9ScVNZMFF2eVRPWlRJQU9vSDVUQ2ZORDZ4clhuT1piaE04MnlGNWZROUxHZDI4eEtMSVJMVGd4THRZS0ZDZVBZZjlzK3VCaU5sUkZEUmtnR01aUTROZVV2WDB3eWNnK1N5OE4rNStvTHgydEpOcWNLUWVNcmhiNDRLZUxQeWNrZ3JHVUJhVXpEQUFVUEx4YldsU0w2ODNDTjAyczJWSHFubUQyOVpGSFlOSkhmdEp1ejNiYVpsZURRbXVjeCtqVGlUSTR6WkpaenZTWi9UekpYOUFLd2pBelROMmhBUTBKMHJESXp3ODFvUE1uaHhaa2dhQnVaSkhCVUQ4MDQzTHdHd0FUYm8zbHFhQndzdS83aS9IWTY0QXYxVjhtRzJscTNqUzRDTzVEeUJDc0FXS0JFQkZqQzFrQTlUZ2RuTWlTS2EwaXd6NzVHL2lmUER5U3RSeDR2OVRTTU5ESkEvQ3dhUXdWZ251TVFaSUlURWVLUGdDVEtBdnptMUhXbHBVV0NYakFheFcrUUo2UG5jRmpKZ2Q2aklJRFJ4YjNnNHZ3TTBiVm1DMUg0MHFySG5EQXlVUVRxSmdveGJpVElHWWdhOFJFWmgxR0ZVcTlBZkVNMmJseEJqS0FkVTdjRVZXUGYrdFA4WUFja2pVL1M2REVqZVFQUlVEV3VQTTBEaUdpVEVLa1JZdy9tRmgra1cwSWFNT0VJZmwwNFhLeVVqOSszTjlBdlBxcFg0MkhGQWk1OHI1UWVMdVBaN0FzWnE0UWt5ZmFnbUNGY0xLb1NMUzc0NUE2TWp1aGtub010MStqMkJaRjNpR2NHakhyS3ZNZkxkaURvSDkwcVROZXhrUWxRYWdUdEhteEI2dXFJSURVMkJ0ZzhjTEc4RW5LNE1vRU5WL1FBbGlTQVlibDVpaEhzeXdDcXVBSjMvdUQrL1Q0NEF1SXNIRUg5YnRXZENLKzh3ajN1SmJJS0NhekFscXBiMnNHTElRaXZiNm04aXFJNFZzTGpiQlhmam5CSCt3NEMyZmhxa1QxcGdmYWxkb1JNYkJRQUNBaFlhaUliNjE0bXJqNHdJNEw1R09ldkNkejliWExiMENXZ0g2T0NuWjdRbjRrNzJjbXl2RGNCSUhJUk1SUS9XQldtQmcvN211YndWYndUWVBHOGlaQkRzamgzUkp3ajlyMThDK2hPUXJ3ZTA0WjBVTUNMdFd2L1B6dmZ2UTNzQWxKK2lCMzNaSG9qb3ZjT2tYSEhucktQOUhRZ3B6TUhISlY3aUxZY01jQmFPbFA0MlNVbDRNamdBZUIvY2tLUEpBYTEvSW4wQUJvTWNyR1Q0eGhJYUpNREFIYjlLUUR5b29GSTJmK25UOSt3eWlzNEFseVZVbm4wbmE3T2w1Z2Q0ZVh1UVpzaXpwZlF0Wi9LUHRCaytWZzVCOTBRSExJSGE4MktaRUw2UGZ1cVN0NUptdWdyNmwvcnZSZy9neUwxY2hlNk5QdVRVdW1RRDlLdE8zZVgwWFE1b3d6dkptWnZOV0k3WC9XTzk0TXI1ZUU4NXVwbmhDWExrWHRyN1ZIN0xVQWpqYVYvWnlFby83ckFva2Y2bkk0aklSV3pvY3hCY2xVTm1nTFlqUndvb1JtbjZXcmlZK1JjdzVrdU9wZzlvK1ZNSnQrUmczSXMwc0xFVHdMaDM2aFhvU3dEbGkvd0hLaEEyaVYveTJlRHlwWDJqcWcxamc4dHEyZ2p0c2hGYXlwazhKUCs4VzV0dTlNQlVPOUVsNTIybVBJSWU5TE1CVVl1eHh4SDlkOHBiUVZmQjBEL3kzdjRRL2ZmUm43YWN5ZFYrd1BxSTZ6MGFaMnJEQU0vNFl6cldmbXZ2NkFCYWx1ZjdBWDEvSEFXakN5dE1kWHdlMzIwc3h0Ykh3WkNSbHhib1lDeEtYSXd3QmI4aTMwTE9RZHd5aDh5ZzZ4d3BQY0J2TXc3UWNTaEhJSzZiK1NYeDVTY09ocExFUDA2ZUhrUEhDM1hZZzVpUWFnNmNMbm80Z3ZqOTZMMmdPcVlOMkNNUFlVWnVsbVFTblVka09wSFdNOHhXdVVCN3JOKzRYREgxa0w3V3AvK3FlRGR4Y0RwUlVyem9WTkVEMm8vRlFINmkwMFFJTVBIeVVPM0JpZThnNlJITE45cTlyYnY0R3hKdU5yTWJvVU5mMGRZaDdSK0hISGpoUEpPanVCcExBT2NFK3lnMHdTVjc1Z2ZZVFBVN01DUXhrWmx4NVkxaWNFTzVoZ2FSUlVwTEh5N25kTVgrQ0MrR2swUFVQVTU1SFM3aHdOb3plU3I2OU9OQVNuYkNVVURSc1U5eGJyeXF0eHBIRCtEOXVkSTlJSW1NS2RnaTg3bVVZb0hJVyt5dGdkZGY5WHdzYUEvMzVjcXZQVmlPNERxeDJZR0JSQjh2NERwMVdtSXU4UXBxSFhFeTlBRkdZcG9tZ010VFI3QTE5WGtyRGZOT2xHbjhNQ1F5YjRRT1puMzVhbXNDT1A4SnFxdmNTcFVmaGRhK01VOU01Z2paRWxIRERDRTJYNmNiemswaTFpbm0xTVU3elFtOE54bkJkRFJ5VmlwSWVHblRCRTFINGxMT29kRDFIVnR0NE9NNEdsQy8vVngwY1NIU1RteVpjdFJPQmpPVXRyWDdBWUpuS3A3Q0VLV0h1cTZuY3RsUzhUOUt3LzRmbHo4am9Rc1BmWnUrdzNHWlFORTNteWFzZ3FiTDZncUpRY09vTTlrSyt2d0M2RTdtTng5cUYzWVJlQVpPdHA4VFUydlRjTDExcmRwSUNqZm9jM2VFV0dUcXkvcjMxbTBhdUpIMHhCTy9uYjI0RjVqWVVYbXNHZk4wRzRpaE1JTlc1QWdocHU2TE9ZSk1vNWx4dXIzb3ErRG0xajF6d2ZOR0JVaW96NHd0cGl6RUZva21FdWtGVFMxcEE3NXdRcjhUR0dNV21yOXZ3TzA3MEplcWlNNG5qcWNCS0RPNUNvRjJEc0d6cEMxdjhDUDZibmZZamR3cCtseW1jckJVTVR4RXFCRVI0YnFkSGlsT3RVT0ROUDBJWjkzOFk2OUxJS0xaS2JiV0p6dllzNGZYQm01UkR1Z205bXpQd01uNGlidkRndWFmWnZ2cWM0ZE1STFE1MFFnSWM1Ty9hZFdrZlVXd0NtRjI0Ymc5aHpWZ0pFZUpjdlZicVlsZzFMRXJJa2ZJcWt0enB0TC8zenVRcFpodTVBQ2J4cGc1ejYwWi9vOXlEbFAyOEtOOTA1NnNZK1NCd2NPc3RYc3VEY2ljY2lZU0dBS1J0b016VGlVSFdJWU5qaWRleWxNTkFKYWl3VDYwZTJ1UDNvblllTXVMc2hxZzk5VmgrWGJ1RG1ZaU9XUVJKdGhPRXhHdWJrYzFTVEdTREhFS0NqS2NpMTFSVUtzWU5Nd0FHaVNrYjdBNjkrUXcvY05IangxdTVucEYwNE9YQWlmYnovTzZZYXlzZlJvdGEzTjVjT0dOWHEzN1ZXb045MnRzM0J5cnR3L2ZLKzJCQTdoTkJ5dUdOZ1ZvQWJIdDhoeTdnc0VDN3RDd2RFYi8vdmRPUlRrdFZKUm9SbWpZT3RJczRobGtzRzZRL3A0SFp5N04wZnFod2hsQVNvN3duV1pVRHBFNXhmckJHTHBuTnV0aFk0RWNXT0pOdEhSMFBBZG1TVFZuZXI5UFdNcFVGd0RFS3ZibmhEQXMvWlQxdWJRUzYyZVFEbW9VSHF3WEhxN0NMU3ZTbjZpRHNHRW9qYm14WHdsY1pWUUZWcUk2RUNDeElET1RXSGtGRE5sQzFjeFFBdCs4SXpqaGRCUlhnVFRZMG1HN25GNEorbkVHb09HOVAyODhRR3F2WDVVZUFYRXZ5VmZRZ2MyekVSc2poKzBLRDI1UGwrWVBMQUZHU0o5dUdPd3c2K0JyTVkwcHZXUUs0Q29rN1FON0JBek9vRURmdVltenZDWUx1SGxlZFBES2hEQk1OT01JY3REL3NFQzAyWk11UTVEbVNJQUJYeHJNeGpacTdyV3d0REQ0ellRTjRiWFJCQ0tmQ1lDV2QvSjQ4ajY4WitSV0xGTWVqaURPdVFYeVdrQUZNenRUeFFBME9Ya1FmWnNCb0FIQWhZSXI5QmtUdnJYOXhCRU1mZmhzNlYzcjB4TjJtd0VZZlZlblJqbUYzK1dqYi9rTTNGdTFNUVpZeTczbEdRdlBwV0Y1VkFwUUhVVEFIUlAxY2JwUkhDSGIxWThJR0c3MHdNUnpnVEVWSWpOU1JYb2ZrMHVwKzAwaXJ3a1ZPV3AvS2pLc0g0aFM2SDlkT0ovY0EybUR3VHdheGdIdWZ0Wkx3VHFJb2tGMm8vQWpNRHhjQk1sS0JFTTRxYi9pTXhaejlkRHBFZUplcVduQkZONHpQNUtwWUxRN0YwdkFpa2JuRzBzQXZjUFN0UmI4eEU0ZFBhczBmdU9uSHNISkhyV2hlUHVkUmoxU3FQME9Bd3g2d1FDZXlZTlJBWE5FVDlwUTZDUGdFV29XbnpJNXFkbTRRejFHaGd4d1BMV21HMkdqS1FHVWVmM2VleklBTXZZbzJETFMrMkJ2a1liY0xoRzRIVnRBaW9Rd1o4dVFRelVRNTQrUWFRZi93TGZ3R05KY0phVWx4L0pGZ1FzZGw3bW01eG51VEpVY25RZHNPcWpZSGpvRGFGYUp5REFIb3JtbUJiVkJWQ2hjNjlIY09KVktZT0YyZ29iTnZrRW9nZjZJc3AwSlNGYStrSi9DUkJEMVZSQTc4aFNRSkQ5akFManpkSHlhUHZFemlaUkcrTFJHdXB1cm5JbGl0b2prbHNDNUJVTmVaMVVlQU9qZjJBYjZDZ2xDNm1ESENtRkNuc21sbERJVUhFemJtWDQ3NWtGeXJEWjFQK2dHZ3c1MFhYQzRKNFJCLzg3VlFId0dodE9TclZBVFp4S1VIWTZBQVpoNHpiSHRqNGtCZ3grQk82NlZ6QVdOOTZTWEVvR1BQajBsR2x3bmM2ZGJTM05relJucUhvb3FHQmtBZWdTMmdTcDNuQUc0RFJ5Wnk5dTNnUzVrRHRrWWg1cHhVeDNMSjBvOEpLZ2w4akFEM0c4ekFOUWtLSUZOcy9ZUExtTVBrWG1zYjZFNnhpK21VQjRhQ0JnTFkxaTJVajlBbW9NQnl1bldKeGlDaVQ4eHE1aEd6T0Zrc1Fjd1hoWnllcGF0WXpBRkJocXF3MWtHM2RRMEpvVEoxa3NjUXRIdy9YVHQ2WUdCSjhqa0dCUFhWUDFRRDJrRVNlam9VN2V5M1RzWDZLR0c0U0x5emZVNWp2SW5aSENrMnFqeEhFK3ZiVENMQjlGOUFwcGlTck16Z0R6WFcwWk81ZzJZWURPaW1SNHdpUjJCY3BNQnFPNmZCNUE2Wk9DTWtCa0JRTE1RclNMd01GaWNlem9Ob0szQXFaY29ITVpaNzVNQmNycGxYc3NmcWdSRVlyMzFPc0VrLzBBRkNMQjI2cFhmc1N6SUJFRFdMd3VPVzVkZ3FHajlaSUIrOWpMRUZGcVlIRkNFQ2cwM05ZSXBmM0F6UVlYa2NOQm9yNllQTlpPN2R4anBpRC9JbDAwR3NOaThZdmpMbTdmUlRBRlFPZVNIbC9DcUFSdTM4SnRXWGh5ZXlHdEJSQ2ZjVFFZZ2I4dFhxV3pqRWxhQUFMQVFOd0VDR0h0dTE1NjJpRzZlVmVtZnpEWURCcGlWMHkwejIxb09XNC9GYXlyVlFRNGxXUHR6RVRMRkZjTmUzMmFWTDFLUTZtU0FKbG95Z0p3KzkyWU1vSzY5U1B0ZzZhbC95Z0FlM0x6UURIQ3JNM1VyR2ljc05nU1NQSlhnZ2dFK3NYLzZQUWJZWjVhS2pCSStsdmk2RVpvYjhaWXRNTVNtaG13UnZmRnpCZ2gxZjZGck9wWFlBb0hVaFFrZ01DZHUzSmdqRlZWR1JKYllPajBOdEtRUytJUUVXR0JMVERmTGU4MjhYSEdJcWdNWUlNSGEvUVRxYWk4SmdUVURBb0REbEJnTk5vc1ppZXdPMFV0clNSeGcwdDc5VHhrZ1AwN0lEdDBxbzhZcm9qSGV2VndDRm1UWDMySUFINUVLSzF3eHdHVExCdDIwelFEanEyaXhaSURGNHBJQk1sWG4ya0tBNjd3eXVpbVJ6aHdONW5ZOUlEUzA3d0ltTVk0cHVZUUJWSmJEN0tWem1mcUJIZUkwcnc4bGF5UllPeUtLVDk5dVEyVk9VZ29BTERuSkFCWVRRaU54MHJuTE5pUU9KQTZRaWo5bEFCeU1YSEdpZVhPTVFiU0FPQi9teGRjbkF6QkErL2NZZ0NQQ0xCV0VzNVF2bDhnTE5aejhJUVAwcEYweUFIaGJkN3lyY3dqNnZLK09zb2pUQlBRRnd5QVhsVWRnd2gvRVlVaGEzbUV1T3lURzlBTjNGZHc4QkJVd3dkcjl6Tm5GVEc1T2VHcXBlRnFKMG1JVFdWTk9kTytGd0c4endQZlBHU0FrSzhoTHZRdERXYWNXS2I2K29BMzBsTkh2TU1DK2tLT1pNYW9TVDJ4MEgxeGRBZ1kzQU1NMHExOWxBTjFZZG14RVd3elE2Y0UrbUF3QVRpSzhOamxHMXNuYUZHRFFzSzhDb3F2L2w2NkNIN2NQUVd6RXBxSkpiWWplc2lFcGI0S1lEb3BrZ0NFYWRsRGpTZ0trNytoUEdZQ1lKSzZDTHdUTXVTc2xOV1orZllzMlBkTVlmb01CVG5YR29JQ201TXZWeUl0TEJ2QVQ4ZHZmSzVlQXBybGNBcUFEcmxhbTFOVU1vQys4bTZ1OUpjVktzYytZRE1zeGpKZFBrZjBsT2tCaUxoSjBqN1RuTnc5UkJTU0s5SnhBWFFibmhZV0NBL3RVcCt4YldUUHJjcVVEaE8vb2p4bmdFcTZkZUtDU2FHVm1pYVFObE1kQjU5Y01VQUZVeWcvM2x6dTBrUmR0QnVCYXhUMDdZSmw4MGR2YndQYzNBdlNSNjVORGtyc0FTM1dhWDE5dVlxc3hMR2R0NUFyMjdSeDZ3MVdBT09uYmh5RHBYWnJ3eVc1NHhWTTRScllKbmRRSnU5WnM5bGJ0WFFESDZZOFo0SGI2amFXdFZwR096dmZGQlFOd3Mvb2JERkNNQ0liY1Zjb0xPOEJOQm9ENWtSRFJKL2pTZkswaUExeVZBSVpaeE4wNUpDblY0QVFLMUdiRkFJUnF1aDVWQVVFSkREbVdxVUtUcGVGR3ZYVUlndjR0OUlueWhoUUI5QkdwVUtJNXhobmc4OERXcnhqZ2cyM3hmOEFBbVlpbVNraTVMR2hqRU03ZllJQVVmQ3FUODE3NWN0NDYxNWNBNUp2eGZmSVFPemlxVjdjWklGREw1UklRbHNBNU5vYWR6R0w3bm9zTUxnd2wwRGQxcGNpKzIrdmlURDdodjV6TFh6Y1BjWGZnaWVGZDJub3BIVStXYWdaUm9tbENBdlM5MVJLZ1lmdGZNVUNkZmlNTXFabnFVRnArZlVFYnl5c3orQ1VEK0loOE1rdEZmSGkrWElXOHVHUUFLcVEwV01pNjN1aDcvZHdaWkRMREVvenV5QUFKMnV3cmJsY1R3YnN2SUhRQTBiYm91YWF2RmxTb1BVTElEeENwQkVoUmh1cmNQbFNxVlRLbVpBNW95UlFjbVZKbGFJQ1RYQUlHYkx0YUIyQ2plKzF2S29IVG1DdG93Y2tGYmJyWXVLNS96UUFjRVlkWmZzUzk4cElDZWJFNXRSbUFma1BicGNtTW5zdi9jcEJ1NmdDWnM2UGJ6VjNBMkhHWUFnV0dOekJRbXRPdzBPNlkxaTlCelJjZUljOFBnTk9VYUdrK09kNCtWSUMxclgza0hvRWlBSXNiNWhvbVFqQUE1REFhWXJZS09zTTZZT21tTnFlL3VBMTB5MDBzTTUvOCtwSTJ5REhVWERMQXNQWUZjRVJ5cWY5d2xiTFV2TmdRWU5wbUFJZmVLWVQzc0ZDVTZCd1l3WjlMQUU3RGxTS3BDM3ZmRmpRZ1JqaFFtaHg5N2FIaEtFSE5GeDZodTJJdWF5djRaWC96VUtxQTJlSXBySXlTWDQzSXZKSUJ1bHRyK3RFbG5iVTlJMFR5SnhMZ3p3MUJFUXJUc0lYY0xtaGpTOWJjR1NBMWRRRlpGV2xnMjFrcVVxVXNlTWFiQVhiYkRLQkdTNXIyeVVKelloZC9wUU1zMU1teFdIQ3o1dzZmaFVjRUJVclR6UEhrTUxtcUFqVkhGaEdLN0x1WXl4eWR6TTU5dW4wb1djTmJ2VWU0K0dvOCtSZUdJS1crUlRZTHk5eGtnRDgzQlNjYnMvVTlJMVh4bHFhMUh1aUxncVpPVjdzdnIzaE83aWM3YURrck1nR1FOK1A5aTZHSVdENnI2cUpwc0JwemVQOXFGM0Q0QUJpY2tnMGpoM0luamhGVytyY3FWdlNKSFkrSVhTZHFLRnQzRjNNNWRqYXoyNGRLdFFxdE1nWDhrZ0hZV3FaZ2ExMDZVZjZRQWJEVnUrb01DamJtZ3lPcDZGdVZwaDI1WXo0L3lRQlVsUllJdHNsVVpXV1dpb20wOE92bTNtc2REVVM5WklERVQ0NUdxT0tqZFFQd2tiK3lBOHdialhOWXU3OE1BNlNCSm80Ujl2S2xwMlVCRWsvcytEZERQTUxnQ0ZMZWVRN3pPVnV4czdsOWlBTUU1WUJWbjFLdi9DVURvTG5OcDFBQ2QvS2ZOSHZFSHpMQWFYUExIWnhFUTNBYU42aFlzTXEzdEJCR1o0Q3N2R0hMSzhQU01DSjBwNkdjR3o4ODMrZmo0SzI1d1FCZkFlRlZuTUp3Skk5aHlvV2JVY0VJaHBJZ2RPaklaL3JMOEk1SyttNWdoSW5TUFFhSHNUU3FsNGlqZDRlUi9LWnMzWG5Wamw3TTVVaUlmZnNRZDVNSHJ1ZlFpekxTNkJjTUVBMEhxMjFnWmhMNFV3YllMMjhGaEtSbGZEVFJpc3BGREU2WkVzOU1GNTV2alFoNUxxOWVlNGVDajFFenpGSlJocWcxL1d3MUF4UkZXbGhYOEFYMXExR21ib0FZajl1NEFNdTFCVmpJeUdnSFpaKzFNYWgwRWdGcmNKZmtNRUNKdkM2MDJmQ0pBTEFheUhlTWJ1a1BMdWJ5OVBZaHFsWFFnQjhlVXNSaURmZ0ZBM2pqUVFhRVpLc1o0T09DQVJZbEEyVFcyK3NoWWJIWGF4cVgxUHlWbVRYWFNIWnY2NncwTUVDRVZPVHl5cjBlZzlJb0pqSkV6ZlBNWnJQWXZRZzhEQUZKL0tSaEZSODA5WUlsd3ZvSk1nZzEwQWtWQzlwdEZCWUVERnlCS2RhMmR4QThrZEhBTFNQTkFxSzhpQUVpdjl3VjFKTkd1dEtnZFBNUXJDNGVKR0lSVWxGTXJHQ0FwcmxnZ0NyNEt4aGdYalptWitRQmovb3Zrb1NreUMyeTNtWnVDcXdqa2JnaTF6d1FyZjcxNGdXR3RsbHNDT3RHSnZuZzhncThCSk5RZU1FVmlBbitpa3pUMlZoWmlhUWthb3RlTmtYVkxjY0tpUVVlRUVMNko5aEFCYW9RVngxd3k1bmlOMGw1YlVEQWJnd0p1MDhPVTc3QTRTWHdQc1EybzBrWE1vU01CcFRmYittYlFMam16dzV0UjFFK0RFc0ZmNEZVbDVyR2tlNWpkR1Z6UXE3cVh1Z0FHeit3cWxQejVZRHpCdytuYm9YUmpzUVZSb0NRbTVudWd5S2ROZGhmSHZOdkt6cGJwdUFnQnBSSktMemdpb2lKL0tVL1FMRnNWaXN1U2ZsNnowQUw0aWRQUU1YY094NzROam9ZVU5rcDRkOEVvMCt6YllEaTA1dlpLYUFzT095ZGdHaEhDSDk5RWR0TUlMUXlBR000TFdNbGRMc0k0cng5eUNPOHdlUVpDWjdKb25MVW4wQWUyMzg4U2V4dC9tY0hBWHFMUnRLb2R5VU9iTzJ1bVNTRUF4NC9jTmgxSzBwS0Z0K2xTa3o4S2dUQ2ZmN0MyaW9OQUlYNEd3RXhUUEpScE9EWUtMMlloRUk2eUNRUC9ncy82dllTK1g4OFF3SnhGV0FCVEVhZG5KNFJBSEliVGVkcjVnY0FrYVhIRWtBczBhYkVoQ01YQnJLUEhJRnp6dWNlNC9XNEVrU2FJZzRIUzZaTDdlQ2NaK05xMWozZVBqUjlKQ1lZVVM5Zy92amxFTnBTMDlEbVFPSnNXMDh4WG5jemJhTWZnSGdNeEhZTWYvVkR4NVc2bGExdlRGd2gvVXhrNGNCWHJvRDhwUU5KS1ZvT3Fnenp5Y2lSS1RnNC9DbFhnWFY3ajErUXVYV2JjaWJ5QU9MYUNLMnplRXU5SEUydVJ3b2haQmJ4SHNzUWttL0ZCZDZSMThHc0t0bVp0dzdNYjdCb0FyZFZQaGxpR3ZMSGRPVmh6ck1qYWdmN1BLdG4zZnZ0UTg1c1dJekFlbS84WlN0TmpycXRWbWlYYzRRcHhpbVMyQ2liOW5GQUtPbEpDcVl4WUxLQWVvNlFxU0hXTWpjRlp4SEdIMnlSdVRpVWF2NExkUzN0aDBNWHBUbnRwQU1UbE11cno4ZWxaNXc0RmN1c1pRZkNDdnp1OUhySFdxeFRUajQ3U0FnQllCTEFscXlTaDVuaHdIdVExOEJKalZrQmREWUNOWVUwdVZ5cGR1ZTVsZHpFdmlSd1c5ZklZUllKSXFRMlY5cjlYU2Jrc1lVbmY0MXZIeUpYazhuamw2ZnpLRWRkcG80blVibVlJOUJNWmpqT2x0ckpOdzZRT3Bta2dBcU5qL3c3dFJ0RXNERTNSVGxwd0FGQkEwRGNBVjdtb3BtNUtwQzVJMW4weFRwT015eXZQRUFwam93VEptSTliUkdUdlNGRkNQMEFMMkJNUnFRSENVLzJwa1RrSW1ORHJtS0dpZVo4eFJzVXBIWmY2NWNqMUVOaFJlSUtUNVRvVHJZTjg5NE9rQkk3aWdRUlVwdTY5djZPV0U0bVFhbG1YWEZvVmszSUltR0k3aTZnY1BCa2JqbS9jNXpIZGFLUUhQUXA4aDNsbVhXZUVCNjRURklnTFpaaUxuZUdXYVp1ZFRGcGtnWVlWYVF2NEtLWjJTM2c0a3BGN2drZDMwYzdlZVlIbmd3OWZ6eCtNeW5WTTlPeFBiZ1NwM29qdTBCQ1lsSklRazk2SmpkMmcyM3FzYUEvTXh5d0VIV1MydjB6OG16ZlVQbVcxVkxYMEhZZWJuWm12b1l0T0NwajRwbm05L0xNQTNlUmtJZFplbnpXYmV4M0pPa3BaNm9tSDRwOElaRld5bk9walBHVkhPYVVIRWFQbVNjSThRa2haL3FwMHpwUGlCK1lWVWtLNUVBcTQ4eDJZZ3VyYWRjWGsrYVlOTmg2RldwdGU4dmNXdWlaeTlqSzZmano3VXk1NUlGQXozL2hhdTRDbVhCQzFTdTVYK1J1QkFtSlNnTUpMYkhGa2RPRCtRMXlKN3QzVEx6MmRBRTVJcWtkYU1oTU82MUtIVnphU3N0WitvUVhpZzJBRmN3emdjUHpEVWlseFFOa2xwNndEa1NDSDgrTlJrazZZOW9lNXZpeUZVa0huUUFpRGlVNVFJZVo1cG5jaFRFalIrb2dPaCswOFI1MW5oQnQ1UzBZVzVMYmNUa1ZoS0pxcldrdExpWk5RUU5HQTMvVElBSUR4amwzbW9ZaU4xQVBwNnV2MVU5YkhBajBQUGxzcEprb21IQ0NNM3JYcTdMY0oyaVVpUzJFVnN5aFFKVDRZazRHaUZUQ2hxbkZrNXpVRU5pdXlGUU00Q1JxTXdETHg0anZvSWtxUDB3Wk96OFF6cTFpNTA2a0VWWDBUT2h6NG9SbWRrUlN3NlJXeXN5WjVRdkpLYklDM3BNeTRJZTBiemZRQnQ3RGZEYm4wRUdZY2VpSDM2UE1Fd0pDRWJ5T1cvZzFZWkREWnhXYmE2Z0FyVW1qMzBJYVlLQ1pBSVd2SnYxcGExcTZwWmM0ZTZZWDJkREUyUFFUUGMvb2QxUlNZc0lKem1oWWo3UE94VEpLNnhrTm9QZlk5R0orQTU0cGlnNVlBbEk3VU5wVnhaTklyVlV3UUpMb2dnR2VrUGxFSEdOZ1VaaTNITG1KUEF5QUxYeHBocERTUXpBeEhHa21NUnB1U1kzeUxPSnI2Vi93S2RLYkcyNk5lUVRzQ0JKQ0JPS0w3KzQ2eU1hU0FEb01GVUJrNUFuaDJ4VzNTQy9CL2hxaHNQNmZWT0Y4ckNiTkVrbXBBTnhGZUFCRk9CZUFMZ05uS0FGMDBKRFZndFBWa3o4eGdVV0Juajl0M01sOGNLdC81bjJBazUvUjhOQzZScEhZd2tRczFXdm1OK2gwc1IvR0N0SUZISDdkWjE2Tjk1SUJNclZXTW9DVFNEcmJTd0FFMUdwWGVRUU51VWt6dFZIMVRtYU93N3djclRWR01vWlJ4NEJha01obXpBdjducEk1MGtqSXdKRjJ3SVB4RUtpNkxPVWNnaVFybGxhVlEwVWk1bVBrQ2FGOGl1Z2lqR0RlWXVsQlZkckZ5dnpJUUFZdFhwZW9LaUowaXFXYXNCbGJ4SmNucFQ5dmN1aXZtU2M1U2MzcGFtbDV5UlpDS3FEblRaQTU2UGR3MEVCTnlCb1AwWU1IbVFXakFROS9nbHhIWWd2YnBNY0dHM2tzVmx3ZXNVRlhvTFFXTW9NUlhRYXlISzVNclpVTWNBYUowTm1XQUpDbmcza1ZFMkFTd0ZrV2ErZmRmd3FZVjlNUVcwYi9zOXJyZXo3R1NndENGNHlaSHhNaXdIRnJHcVZTSUFST1NKS2xBdEM2MjZVOFlZNnhQUit6SUZtZUVLK2p3Q3pLbEtIa0xVL0hBcG80b2FBeXlxeGtSdHVDQVF6ZExQRUI2cXJ2TVFXT3Bkdkd3Z0N2SVZrY1ZqTGpaTmFSUUlMQ1NFV3hjMSt0NVhseVF6bVZ3UEE2bndISFlZZzJaV2JISENNVXNaRkRRZWVpdTNmQloyWUw1LzhvQStWd0ZhbTFnZ0Y2U2d6eFZXRmdhZ2F3WkFvQWxCNGlLcWlPblRac1lBbnpZa25JYVVTZ2ZIeGdQb1k2elV3U0VGQmNCR0QzOVFJRElEWHpDSmd0MG85UUJwVU1VQmxzR2VUTVBDSHVRNkpta05VTDlKa3FjamhWKzZyZDRoWk0xTWljMXNrQXRodnFlWWtHMWdmRGJaV0N1aFoxcU51ZjZIVWQwZDhuaWs3RVJXbVg3cWNaN1czcDF4bUUybUhWekVUZVRqcDh0WVI3UWJ5NmlPVktqT2hJL1NQRDBNeEpQc1NMdFFMY1I3dElyUlVNMEtoekZjTWx2Rkl4UU5TdFVVQXBWaVRZREs0eUFLZDJGa1hpTDdsNDNoRGJXU0RqSVRZeFJ6bnpZcS9TVzVWNUJDempzRUp1b1JwZ25hc1lBQjZ5cldYTUp3TmdtQWVSajRVN1FOeGNJeWROZnJ0YVBsb2hRVWpYVVpqWTdZMmdMV1pwS3k3MFZxUWw0aU16S0V2YWlybzlkMkdtMkljYW4wVWVzSmhhcjJuVHdONTdtcnBwZ1VZQ3c2QTc0VjZRK0UzVExpSU1Rcllqa1lXUWx3aUhjOCtEWEVJQzlCZU5Cam5UUTFjeFFGYXVFajBnY2poY1k0QUM1clhnV1I3dk5SK2dFTENqM0VLbkg3Q1dSSlRhUWU5cUJ6UFVpbHNvYnVzNHlqdGRmaDhxaEtCMW16WjZJbTkxTEV1TVpXUlNJRjRWMjBSQ1piMk05UnFNQVdHRXRZSUwxN3hYRlF0RkFTZDVXbzZEbDdVb2s4bU1hVHVEWXQ4UE5kNzNadWhGWkVpS1VoU1hndVdsanVtVlJjZnpWMmJ2OWZyTXY4MEFaMFd3OHZHT3NVR2FxWjdId3RjTTRBc1NDbjVIdE1ZMUJraVlGem1wS0kzZlhWVmxBWkZPY2lLZGlLSGc5dURFWmRZRE1jNU1HTFdrR3BLai9GVHVhM3B6ZERPOW1GY2EwWHRrNGZaV2RDTnZVVmJNRVpwNHJSTnE0WDJUOWM0QW1aQUhnYUxNbFJBWkZ5UjJLTkswUmRXNEJRc3hvVGVVZS9SU2hKQUJGc0FIWERLQTJaM0FybitOQVpUK3ZnMU42MENueTFqNE5nUGtnclFOZE5EMktnTVVNQzhDUDhBQWhpaXJHTURUeVdGck1SajQ5bURKWmRhR2M0RmRYQlEyT3JOYmRlMDZTMEFmM1EyMXVIR1JCQ01LdDA5OXlXRXZDUlg2SXNyN0hiZ0NNbURYRmk3TndkZ3E1QXRwMnpTdGpBdno5VHlpUnlQanpScXh1aXcrcFdNRDVSNjluNFVvSGNRU0VBeGdoWlExdnREQnIzK0xBUXI2bDNhQUx1NTZnd0VvQmw4bjdMN0JBQW56WXJ4WE1JQXMwNWxPWW1hWVA2SlVyU0lWakVtYldHYWJOU3JMc3JiMGU2Z2hIT1V5VDhnbjZyWTFoOGdlNFdnWjZjM2l6NFNZTFpBYVEzc1J5NHRlVkYxVVFJekhxSVFXRHJIWWtBRXdxb1F1YnNNQUZldjFZS2NJOXFwb0xxcEtpckFJNjV1dmptZkRqMlhRYUNpQktaYUpvWmJSSlBqMXJ6R0FEZzBOa1pVbDhEY1lnTjAzR2FDdEFtNEtCcUQwTEhNaG9wRDh3bXJTUWZZU2Vxc3F3L2s4RUlJd2Rwd1FPT2tXOVhmdDRMRll2bm95OXN3ZmsrRm4wRmx5eFlvZ1hIaTBHTXZMdVlZYmpyak9PYlJTUGhsaThSeVdoaHhWWGJ4WXF3Ym5Jcnk2MDhueDhGeFpQWjIrMGtzRzhOQXo5TG84bklwdTZoUExmTzFGMXJiUlNDN1hxT0MveUFBS3FXUFc1Tk1mTW9BODdHY01rRWtnUE9ZN0dZREJ2c1NKZU9GVlJhbXU1d3RLemdLbTdOQzFsSktRa2RxOWkxUkY4V1pDQ3g5bWl6R3pTNlVOM0htUk9EYnR6YlV1OGJtcnFIT2R3aDZqZXAwQnRKbDVaUUluQUZSN0h3OTZHQmdJR2d5QTBMTVZlNTBCMUl4UTVyQjZYL29vb3VoNXIyRlJ5Ny9FQUo4ZkI1a3FGTG0veVFDT2xaMzhRZ2VJSkJBQjdrb0dzRnN3TVdGVUdkZkp1eHBFL2puSHUrc0hNK3NkS1AyU0czNWRJaWhTUzlhOHdwazl0RXlnUXJaQTQycWtIeG9RaktSSktld0xCbmk3dWdURWhzSEMvbW5NRDkxU3l6RzZFaEVadDdTVHlLRUwyTUxVd1ZJNkxGWVZsSGJMdjhRQWg4WVcwZTN2TGdFWjBObnR3bzdLMGI5a2dFZ0NFZkRPTmdORW5iak1iRERzaHV4dG95dDZGL2t1UkNtNkR0MHYwNldSdDlqWTYwS0VyUW9ranp3REh4ZmpWekFBVlRoa1M2bVZRR0t0RnRKU0FpRGhvaUUvL1FaUWtBRVJRZTkxQmhqRE9KRUZOc01aOUpjWVFLaGdTWmZNK2ZVYkRCRHlTTlVjR2NQYmRvQUVETlBnYzZxWGdNV2NIQUFaNTVqYkJGUzgxQXlRUTE5dWk2NHpRSUhzY05YUVd6bFEyVnN4UUQvYXp4Z2cxcWVWNm5EY0Jyb1dZUVdFaS9MK3hPMkxFQThkZ09pWXd4eTlOeG5BdlJrcVZ3NG9Bb0NZZ3BzTXdIVk83Q1M5U3hFbWZIZ3hYTkI2YWREOU5RT1FtN25SU1F2WUZRWWd6Q3Z4d3FkS0NkUnJtWSs3V2srSnYvOWZNY0EyR2NCN2U5NEc1VXlKM21BQXdGdWpkVzR1QWU5Wlp4dlZ0SnRhWDlCMFJZTmtBTDZRQWtLVEFaeFk2TDNOQU83UGxFbGpDY21GL2c1TXRYenpvNXBVOWlRUkdUbU9oQnJxSnVSaXVMQ2hvdC9xTnhoZ1hKZzYwZ1orbFFHWThpQVNRWllNTUFKMFVUNituWHFtaERGQ3lwclNZMkxIRlB2U05Eck1CRGFYT2dDdDQxeHZWdndQVCtRV2xyMHNGQnFrWG8ya2RYWXJRR2xLWVYvNEF0eVZCenNPbDlIOEVxaXR5UUFjUUd3am5BRml5RWF3Sk4xa0FPSVN0Rnk1ZUhOeEZqTmpVUUpCRWp1cDBwTTRYeENQNk5zWXN1cFZVekRWZ0o4eGdLZmVjUXg2QlpQS3NyekpBRXg1a05qT1pBQjRvQUJleGJFYkVxRFlCUXdkU2srQUxidkIvSmU3Z0NGeGxnbEN3UWNxVFdnS0RKaStiaGxRKzRUYk5XNFpPMHIvZVE4ZzA0U0htN0FuL2RKcStDbmFHU3ZrdnZPK2NrUFZackc5TFBDOXV6UWs1SnNobVRuczdsZWhpOFFsc0lTOXM4bHBIS1pvVUpVTTROdmJneW9Wb1ZmZ1ZMTHE0bEpnam5aUUE5SkhpTFdQdU1OZ0FMYy9iR3AzQjB0TjFXVjVqUUU0Y0ludXJoaEFvWXNrYWJIOWd2U20xRTgvcUFyVXpIN3ZDVFZsOWFuY0VXa0hnUGpEYzhNT0lPUkRGZ3lZQW8zVVdLdUorSjVIWG4wT3FsREtmWWRLNlJUMllRbmN2Tk52Z0R6T1ZrMTdiT29zTTJnc0RwUkNDS0xTWHBnU29ScW1WMFgwQmUwOWVFTHVTd2I0K2k1TDJJT2trVlhRVENjTG42dTBuWnA3d1FnWjl1azVPdGZ1c3llcDVhbFc4eVpOK2p1c2ZZWTdoSXRJcnc4TDVMTEdTVEVTcGwyV1YzTUYxMzZnNWI1a0FJMHBoM2pIRU9jdVFDVm55RFBEU0RLSlZacjgxTFZDSGNJY2ttdU1wMHVBaFJvVDRHc015RjVpdXhIcDRkWTlHMzFRaXF6bEQxejRoaXNUWm5BR3lkUktrQ25TKzFQaUsvME4zVTRMODBKT0pZUFh6Z1FONGtwMmsrOWliOE1KbGdJM0dZQ2RKbWt3d3ZSUTBKbmgza0R6bnREQkdIaGdFOW83ZEhyVVRwQmFqYjZkQVhzUlpVQVlLWEdIc0VVV1BvZ2xDeUk5RTVYR2dwSjFXVjRraTZiZ2ljeUJKUU9vWTI2VklGOE1HNmE2Q0paNVp1RHdvQ2NZQ0t0TU5XSkRzMjRpN0ZOL2tjdGxraDA4MnFEVVdSQy9nTExGNkxYUjExN1RSUUQ0RGg5L1J0K0ZzT2UwSWdOZ0ppU1FHQ1dwZUYrUVpkNExER3ZwVG93WXdyRUZuMWh2U3RoTklYQlpnTWREOCtHNFpLa0Ntcy9wenN5UXF5S2ltSVNrajlvTHZ6dTRORWk5QmFuWnE3R1poSkU2R09oK0NyUXdvOTgzQUpVZ3pGNmJZU1FRTVpsbGVXZFdMOERtYWVZT0xSbGczc3doVHZ1RGNxcHpQa0tqOWtyZUdEaTZDS1EzNG45SDdJNEVObzRSWG5QMEdXKzByQnkwYXdiL1JLQXRISTNxK2QxU0FiTUpOSi83aG92NUxISUdaY2s5MENDQnhGWk5QYjNNdTFWZ1dNdUFnb3dpTm84MGUwUENMbXVCZTJKZVRTOWh6MXFXckt6b3FSb3k2Rkk1d0RBRkV4SVNyT3A0MU1temcwdEJhdndBZEppOUc2L0JmTys0UTdVUEVTMk1LQ3VyT3owbW9oVDFmazhPZElwS3YyQ0E5QVBacWxBd2dCWWVvM011NE5BbzNFVzMzNW5nOVVoZzBldVp2cEVJZ0VrM1hQd21tUUlqek5GbjJmcFRyYk00TUdMam93L2hSNHZVeWVQOEFGVmNqV3pEZFpvVk02akkxMzlzb1lxQmtMUTRFNXpiVFF3cnZkMW9pU1BnV2hxZGpCNXBDVnpHd05ZbDdLM21kYVJxUVBPdzY2enhyaTJ3TjZ5SkhzaTVJUFVMb01QczFldlJwbzdKQWpxY0ZCNFRKanoxSTRpOWhVQ1E5bmhmNGRUdW9HUmt5WWRnZ0tacHNIUng5c1pVei9sNHRraU1DS1V5cUx4bnFtR1IyTzBRM2E2R0VDTXNqWk9DRWVBdGJEZWhVYTNlNGZNVEFWT2NRQ0NLM0JpOSszSUdaYjcrWXd0VkhMVks5UTVLbGdJcXU4a3krWlNsRHZqeDNwU3dJWEF6Q0xwVndoNkkxV05CNjZTZjlBYTBNZXFGSDRsSDFSYkl1WnJVN0JWc0dvdkY0ellKWUxWeXI0SHhpREw0ZXpDOXdkWlFhaGdsT0V3SFlEMVJWd0Y5SlVNQTRqbG5MejMvaUJibWZQVFFjbkQ1bTBvcWpLZVZjajU2RFhJTzg3UGhrd3M0MW9Sblc3WGdXbWRoVmhQdGZRL0U5elBSVmc3aUkrRG8xYXZhWHBsQlk0aTBOcEFZTzdhQWRyOEZXUmhXak44dVN4V1p0cm5vVmNoZ0NseURRUUE2a3lYc3ZmWWlrWk1WVlExTnQzSDQvcU5mRUhoVW5xK0Mya205U2R5cFFtcVJYWURqUUFnN0lLcUI4Y0F3Nmo4UXBaQ0RKcks4ZWpKTHdPa1NrSWxOZFhDSWtFTGo3T1hwSitJRllqNHE4YUsyL3h2SDg1NDRFdWtHMUxEc2R0UzZ0TEo3aGhZNkMzbzNLSnB1ZUduMnZpaG9GNTA2VGc0NTFEc1l1UHAwTVlQUUQ3SVVRR0xna0lJc0xPMnZnaE5WOW9uWHo5VlNENHpMWHZ6R0lmN0VQVm5RSHc4bVdvdGlvVVFSZzlBNFBTVEQyNXVMREZUWFBXVnlGMExjbGRRRjdqUTQzcGNYVDJMQnVVVEVtOHBSenpHRHVDMHFMYnFEQTJxS1JZUHVpRkFsMGtOYjR2MkZqWHoyWXBvU01SVHpNVW10WUdEbjJySEtxS09Oc25aclB6bGZtWVdqaEc0UW1vamZRbWVKWWNlQjZHVWZ6dzVNNDRaSVV1a0pZcHA4UENuOTg5WGtlZ0RzajBvdW9MbTE4U2lQQjZaMTR4eUdmdllhOCtrUkhMTEpxSitWcUlUazFTVUhZWlByUGFicDVtUjRFd0ljbjU0VXcwOGtqRlp4cHM2QTZ1L2tpOFNkZ2xTRURsUEJMTExFNmRuTXpxSWJSdjBYMjZsd1Z1cldSdkZDMktaYXhSREhxQU9RanBaNC8zcFMrMVIvcWI4UjJNQWxocEdOcDhlU2hpTmdabU1BL2hiU2pqR2NlWkZtd1FnbzkzdmthNUJlRUxSTzJSQW83NzJ1SUlGbWZJQlFzSDVmRng3NEdlT2x5TklacGlCbW00c3VOSmVoaW5yTmhkOFpuWWhpZVgxVkZGckxEK2ljaVp4eWRudzdSU2RLdkZ3SnZ3bVMxTkJScmU5TkpBeXJPR1BYSUowV002MmtMbkduSXdTc28vNkhiVEVaSE91eG1MUTlOVDNkUUNNYzNGUGpuNnNpdHBheDZnNUx5LzI5Zmtqa1B1QWtmZWZNSWFsRWZtTzJjZ0pUeWpIVkJZYng2YldBeStlU2JBTmNKQzZKazhCc1hMWWhaVW9vOTh0clp0emxnbGNuYllFK2NLUllnZjdtY01ZM1I3UlNNNlIyOHBJS2w2NERvYnkwaVBQdGlmWU1MT2RMM2JmU0dhOWZ3T2FJaEFUbFlubk05YkdnS0ZkVDRvc3RaU3VBKzZKV094Sm1uMEhvRExzRVRkRkwzR251ZXhuRnZHN1UxRUxqVTlhbFV5OTVHT3VpTm9KYU1nZjBxNU1CTnE1eEtHRXozNG0wV0xteWw3UFZwMlk1eUJ4R2JZVExveGVpYk9zMWxJemdXSFFJQWFhRzdtcEpDZVhHYWN5NGUrUU15N1JOMEFoRDJVaXlrQzQyQWQxRjE4WGd5ekwzWnNobXk1dWIyNWR5b3dMb2IyNytJVnVKUHlTRVdReUxQRFFhWW1QSzR1RlFrRk5EUm5COFVsUmJZQkJPTTdxa1pZb0NkZFF4MDNFR29VdWJPNllUVzZjTDNHa1p4ZHhuTEtiYUdNSzJHeENuVEtXTHdzcFd5UDZWRE1DY0pESnA3alAvRVJWaVR1b0g5dVpzTFJNVEVoczY1REFTTHUrR0daaEZ1bEZEaVdBQm5JUTVFa2h2TXgrVlVHNGFXckFEcFNTZFpPSzJJUmRJbTVZa3l4a1dCdERsZ1FJbXJFT0NxbEttSW5Pb2RoQUdqQlp4aUhUb3dOSkU0QUdleEVxcWdDVFFDRVdZTE9qc1cyU2d0ZkI5bTFrSkt5Z1RPaStMd3ZMOVR5OHdROHN4MHp4N3pQUW1UT0lMSnBmT1FGcEVNU000bGhHVEhFTFVRd2FlaWNEWGdHa0RvV1FzQkNWUUJaUzJwNGN5QTlvcDgxOWs5dnZZVHpQL2dnMHlzYUVkbXVEOG1mNUVIVm1GOEpoZHprdlI5aHdDSEpHWVJHZ21sRnNCVnBGeEY1S1V4R0xxUmtjRWZTT3poSk9sYVl3dUlXRG9ZVkdraDBZTHFscHNFenFqbk9Wb0VvZlZwRERqRURJRUttQzBQT2pqakxrb2gzQlBTQ2lhU0hBRmcrTnQ4aEpOeDJrYUZ2SGxkUW13TFB3cTZmeGd1V0hVRzFmY0tSMW9HZFdRd2JGcFBnVmJBM21EeDdsSm1veUw2V1pLb1BZYmpLWE1nYmpFbUxwWmpkdEVuNjIxMnFuQXdpdHVMREtpREM3Z2Z2VE5FVWZlQkFUWUdLQnZFRVNhbXdubFZtOXlaTnpsRE12a3JaaVltZG5GSzJXQ2xvRk84UUlaNGdrMmZIWkhtZDlyUFlabDg1REVnY3JNaUdicGFvaU5lMDFzSEFQRUdrRE5ES0QrWHFUb2I5YkNoUkV4NjZHaVZ1NGxmV0xqVWdjWTlPUjlvUU9NR1J4cnZsSlB2MXVVQUZIY3FZZXdaZlhrNGFRc2FVQzJMdXZNSXBVZkJCRVlGLzRhR2pEdlZMZ1l1R0diZVUrWkt0VmdjcWdvWEpYMGh0NUpLVWVSdzFnNitUKytYaFJyMWI0Rm83OERXaFlRWURwMjVDb01aUmwxVXNhdWVJWDdQdkFFSW1kNWZXUjJRV3BuakxMd3dRRVRrTG5OTE5wbGg2QkhXVExubEVYN1UwQkpjTms4RVpTempHZ0dOczZCRVZYSi9nRmlmK2xFUS9Ka3p0R3pHSzZqV0ZZRWl5dWhFZHJPSVBiVURVclVXeEZFTVl4eVl1V2dESXNpVUVYOTlKSUJuSzJ0V0FDSGxSSGRmV1hwMEJjUUVYSm5JRGZlVy9tSmQzbkZtTnA4cWpKWUwvcktSNGVBQUkzRFk3NHVRMW5vVVpCT1VDMldMVUlMNTFqZ0VITm52a1NPL2cwR0FKUGgyUU9NY0s4SjBUenphYW54QVdnOWFFQkZTUWdkUi95NzZtVjVkRWhuZWplRE9Qak1Bc0JZUm9IdHE1TDlvdXVmUGRneWt5ZXZOVVZ0SFJ3ZkZKME1pd3BobDVCRGVsc2lyRFkvL3dZRGhFRFd3dmU1QkJSc0xjZ2JobTdqUGJpSVdBZ01uWml5Qkd3OTZYMFVJOC9xc3loVWRtZ1dWZlNmem5QcE5UWnlTQTZtU3huTTV2N1NnUW1ZVGtFUFZVWGhhOERsWEQzSmVtMEd5SWh0Z1BsRCtnem1Ya1RacCtWaXJ2ZUVLemNQOHBYQkFCWlpPZWRWM0M5amxobHhNaGw2d1FCeUFrbUdQRXdaYkQxNVpsRWNIUFJLWUFyZWVjYnl3UU5aeTBvTzROc3pIVGwxQTY0K3J0ZXRHSGNXcEs0eFMrY285MExQRXpKK0NQc3ZXZ2dwVlFLVEVTT3dSRENTVlJ5THVZUEJFbEhKUHUvQzhKclBpZ0ZNN1NTc2l6QWJCbmtOazJZMFBWNnBlYi96QmdrQVZieHI4UzAzSlFBVlhxVS9kcjJOL3VGQlRDUmtNeGowTGNKam5nZERBb3p3N3hwKzd6TDJsWFVFa1BvL3FtK25KSmFsbEpBbU1Tek0yRzg5V2hkTDdwY1JzQTdFZVMxS0FKZXpvOXZOTk5XY3B3bEV4T3RXQ05OMmlHOHFnY1J3UWsrbkFPOGZYTDNNV015T2NNdTZaRVRnc2JYSkxaSUJzcHhDVVZJdjBWZnR1RlhLT2Fvb2tkbmVXS2VNLzc5YTh4NmRYU1lCcDVsNkdaa1Jiak9BblVJcjFueXVTcUxNQkdOQVRrdnBHZlFYdlo3SmZ6OVk2d0RDRjRTZExrOVphQTRuTWlMWTlTaUdsODJkTnJibm5aYmwvcm5aNm5tY09jY0FWdHh1RkEvTzlYRWdkZ09tUzZ2bmFWR1M1am9EVUFEMitpcVBzeElHck5YNEJ1dzdDQjJQR2dob2dkSkFZTWxLTjdhTnRKSUJvdmpMMmVIRVdBR3krdXpWQVBDSmk0dW50N0xxUWsyenk1cjNTQ0VjWlFDWWREUnBmcHNCU09OVlQya0pZc3E5SyttRzBvYnlFaXY4eTRQMzFTNkFLd1A4bFV6QkYwOTRhOWNaUXpxOXhRSVJUcDZSY0ZyV0k0UnhqblNHbmRXR2FUS3FDZ2R5TDJReGNEMmtTVkIxcnhhYjhlUWJET0RCVG9hL25qdENDQ1ljYkpZQnFMWFEvNnFDYWVKYkVyV2lyVndDT05ubFBDK0ZHelhRR0dSL2pRRXE4QTE3YXdhNFd2TitvOTdkL0RMNGZIL0ZBTHdaYUN5TUppdzZrczJQdm00VmZ5NmZyNlRmV1ZyTTNad2pXdG9CTFBCcGlFVHlwYVlIR0hjWjU4dzlwNkRCRDQwU3phZHowQWNpV0kzRlpBMk9nVjdlUFZlbFE4ZjNqRDVid0c3Z3RnWnlEQ0tsSWFQNExkY1o0SjNoam90R1NlMzJJVXNyQ3cvQmVSZmxBYk9HTVZzTmlPODNJbXNyQ1ZBSW94RHFUaE9BaFpJQjJxVG0yQkVYMEZ0VkRIQzE1djI0WFF0cXR2OHRCdUFrMzVrK2g1eU5DdFhOOVZlWlFSbEF4QnRTckVrSGFlbEdLbWdOS0Z6TkdPbVNBWExreVRVT2cvN1EzZWJPQmYyMFBpc3owaFlNRUhWajdDU0l2QzRzTUgyTmdhU2cvaFdhcG1ZQW9wT0F2eGEySlA0YXJnQnR3Z1NqODBYSncyamtMSUlPTG5TQTJLK3ZmUVZnZGtPZWRvc0I2cXJuTENWUjlGNnRlVC8rZzJwd3d3czQwZHdZZ0g3dVRvc0JWaU1xZ1VxellJRDBCZXlnSi9iV2JnZXJHYUNTQUJtTWpCM2Z3RlU5cHcva1pKbVJsaE9hREFDOFlkd0tIZ3BZNXRhUnBlaVBHSURTdE1aZkV5RkZFMDZCeVhTalVaYXZnNG1WRWdkZ21wb0Jzckl5TkViNkU1SW12MTRDN2d0NCtDcG9WdFc4LzJNR0FFRHEvQWNTUUFmV2xjQm1vT1RqN3AyT3FpNU1BQnBKdkdDbWtTczZ3TUV1aXJRRVBWaDBFaWRZNlFCVlJsb1NUbDhPWHh4RHh0eHZxR1ZZb0RSTHhha3NkVitrR1FITkU5VE5sK0JsaVpGY3FKaWVZQlVoN2pHRDk1SHdiR1ZLQ2k3a3NHTDRKeXdmbjdYVjUwYndWTXh0aDNTVkFiYkVnSEY1SVlwVUVUVUgxOXZxbXZkL3lBQXkrTmp4L0VRSDJNMjVicm9TT0RJbDBIUUExeEJuY0ZVREJpQ2tiRVFsd1M0aENoOHhGVUVBWHhObUNDWkUwcEplR2pMQitFYVdseklqN1lzZkdFRXFjOGlxM0cvYkNkTWtVTnZMc212ZEdqZEZVc2NmSmFxL3RQbjV1RUZMQVZ0VUpROWhrNFQ3cjhLZGlReHNIS0VFQmdqejFnS1BBMVdXUkY4eEM5RUZBNGducGxOWnFqRmhrTFBzNEF4UTE3ei9Zd2I0NkJNZzVma2pidXdDS0xCeEVBelE2ZW0vc1VlYzdTTkZlcitudkhHV29XcUJ2blJGd0toZExFTXdoaTBpVFU2WWlMR1hNS2xmNkZpWTNxamlSd1pJWG9MbFNOK0MvVC9McW9IUndiaVQ4Zkx1cTJML3phM0hJcjJCZzhvU2FCcWpFNGxLb0ExclBHNG1EQkFaWWo3VnFtV1FzVElYaEE3M1I4VUFtSjM1UkF4TDVKVnNuR1pWemZzLzF3RWF4WmpNM2JORUhyMXVCd2dqUVRJQWZtWmlFL05WckhlOWhVeDNJVTdjbEM0V05ldGxQY25TOGdyWG5KdTh2SklpUERwRHF5bk1hUmR3VDVpQ3E1MXo0aGhIblRRZE9tb1p0ZFNaYklQZll0MFk5eXB2SDVPUHVKOGhraE5IUE1ENU1uai8wS2ZCM25kRFdBTG5rZkYwTHd3dzgrTEtyS2hMbTZkOGFlRGthZ1pRWjF5VFQ5d1VtV1huNjFoVXE1cjNmODRBOFByQ3QveExTNkFkYk1UVTBqUXdad25yOStzNjExWmpWNFIwczBzR0NDNVhpUVpyT25mQlNVM1RIVC9sREZneU53bFd0RU5od01uNnpnTUVVN3Z0ck1BeERteld1UE1BZDBJS0xXVGpaQTF5M2dmZG9UR08wY3Y1SzUvUGt4M2ZSUCtvWTJ6Q3lVMWNzQVVtTUM3Q1Fvb2lESHdHSGVBOTY0QVNITUFVKzRHVGF5MEJ1cUZCYVU1SDlXakZOZWFXRGdhb2E5Ny9PUU9zcEVWMHlVOTlBV01YOFd0a25qenZrTk4zWjNIT0pzME0rNlFMaU9xSFpJQnc0ZEsxQi9kN1JscWtsMUJrSHIycWtLVHUrS3BLOXVNRmpYTDBCMU0wNkx1Ri8xZ3ZOUGRoSnRHVGxpQWIzZ2ZkaDc3WC9YWkRFRWpOUUtIRVRSVXhnUmZCK3g0WkVhZ1pCQldPaWpEd08xUXVnajlnUVJNekFVMkprN3ZRQVhyck1xb2dvc1dscFZwOXRlYjlIMjBEaDhPSUwwdHY0UHpTRzdpTVBQc3l6VERQbFA2c1czOGtBelR3N1BVVnB0M25STThxNnlBTzhpQ1FtcTYvbU5OTGhDNWgyVnhPS0hZUFdiSWY1U05rdkFodVRGOHB3R0lJVmNCY0NwRE54aW9zREJEQ3d1QUdsQ3l3ODlIZDI3SHVkNGJjWUFMTHlRaGJZSW1TT2p5akhielAyQ2dMMEdOWXNVZjRMSFViYUpXTFpDWms0QU5DVmlIVmQyaFVNSk1CcklCeGx4aXdZOWFYcUswRDdacjNmMWdVL09rcGdrZG5QNHNIeVB5RlFwVkd0eDNoWHAxWndSaXJ6enRFTW40OVROSEJwT05HSElUM0VHWElyL2N3cmw3anNHeS9CRjVjQWlFaE5DMGthSFIyMzRkRlN4anFWUW5OR0RMcHRnc1lHeGVZUTRKc29oRE5HZDFlOTN0R2lMTlIybUthbUVuNUVoZEFjclRLSjhySkVWTHJrWCtBaDk2cGpLcWNqQlpLYVhwZGIzZm01clZPQitXVkpCd0R4SmpzTXYvSTFacjNmMVlWL2lWTHN2MHNJc2psRlVkZmptVXAvZStNdis1dUtkTFduT2dNL2F3RC9DemUrakZpQlFHUXprckFXWmdkaHdJSWlYY0E1VXp5Y2tMYSttaXlWeGZJcVBITzZGaGlEalB5MlBGMDdHWmxGZys3SGFKTlBLcFJ1aStRUWRJcWhBS3dKU2d1T1l0cWFsbjVVT3NGSU5XN2hnNWtob0JqZU1yNnRwV2dxN213QTFTMVpMNElpcW1xRVR4ZXJYbS85RGlSQ3daZ21vdktOVGlXQnBUSjhXY3hnY2RUakg3VXg1aUFMbGJkeVVaNjh1elFYMXhLMFFFWm1paFRZZzl4dnd6bFRsaDJwRjNvOEpBRElma09jalBHaFdmRUpBT1dDV1I4TGk0QVdPL1pzUWMxbmc1TmlCcW90L2NNaWJlNDVxT0JqdDZyNHBZQXhDaWNMSVAzdmJ3c3dHaUUxV2dqUEJnTUlPdC94a1BKamJFTGlQUy80V291TFlGdlVVM3FCMkZ4clhvazEydmV6MXJWN2NBQUxOV0V2VTJhenNBZjBnRGp1SXdLbmtSVThGZU8vb2dWOHpITWpsckJTS3ZNMCt1bDZlR2NXQURjdElQOGdTWjhkcnhBd3JLSkdLSFlWYWdCeVJrRTlaT2RwQWFFU1NSSm9FejBnRS9VRExFbjh1VGxqZDFLT0paOERsQU1rUTFhZmV4NHJiZ2xTbUxPck5Kc0FCZ0pLUTZzRFdBelFBY3pWSVR1Wk5iNVhUS0ZSWlZpYUZ5VkJIZjRtOXlFNWJxZ09EQ3p3YTJhOTZlcXZpVVZUdS9SNTRmeEhJZFJvUStJak51NEFEbk0wU2VpcWtLdGZSR2RxVEtQME44RW1RbzVBYm1yWUQ3YUNFS3g5a1poU3JIclNLL0VUTEV0Q1c1TWtxYnNmU1NXTEJGTkozbEtZQTZCR0dUWlN3VzRFZU5tM1VRWWd0VHZEaHFXRytzaHZZYkZMYk5HTVhnUzROR0VNQXYzNnVxU1dCdWhzOUpmR01DaVFnY1JFeTJ6aHRqK1ZrV0Zka253MCttb0wvZVBOSlVDdGd6bVpMbGE4MzdmcW5CNy9NNXlqVkU2S1lvanpUQW50QW5HNmlveTZDaUh5OUUzWkRBbkZGQ2dPa0FFMkdMQ09jaVV1RExJMEVTWnNrVHRpWUJPWUtiS1NzQ0I5WlFqTDRTM1RjZUduREowWXBSL0R0bkxPUXFLQnA0ZkwyLzNjcUllSWFQeE5zcHNpbUpEWFU2dE4rOFlZNityT2RZcEQxVGl0NVY5TzJhVmNodG9PVUROeWN1akJ3YUhXQnZRLzk4N3F3L1ZBZEtDdFUwTnVwb3JHaUV6clpMZytuUnR4Z0VVeEc4NVdhN1Z2RC9WTmE0eFFkaEQxaFdDRUpOSnVDd3BwY0swWGM3NWhDRWtVSDVXb0xBcG5EaHZ4c1R3NnZWVEcveEVsdUk2LzlzaGNUaWJRRlRYbURZT2hBT3kyNTlWNHlGTEljdS9nTGdLS1F6VVpSWmVQRldEZ2F1QmVzZGtjYjdJTEFQSy9UYTk4RllzMUl6RzRtWWdWd3J5U0dNQ0t3YnNIcXZFMmlnRC9QdXZ4Z01BRUlJUythQnFwaldJclFRT3RVdUNvK0Y4b2IvRGMzT3lIRSt0bXZmc2pTcjNuQ0NjYmV6SnlZS3plUXdaVFZ3TUpzQVBoL09STE95c09HKzgxN0VFclJKcmoxYlAraGw1ckYwc0U2V2JzejQ4ZENhUmRWSGp1VzV2VlBtOXFqZi9rdjZpUkgzZ3JxSGVVM1h4RWFYSW5BeXhYSUl6b3Z5eFRVaGRITEhBNHEyOEhMMDJGRGRqeHJCVTVTS1JVVVQxcjJCZ1paSkFaWUQvM3NtM1JGS0xEVmNXNUM5b3B4ZzYxU1hCVHpFMUFiVWxRRHd5SnNUbU1KdHZTS21ZNEZqVzNaYkhKZVlRTnpadHpBYUNpSGhjSEhrdktpRURKZGhFc1pIZklhTkdLVndCN1F0dzdjdDFuenBHRnNzazV1bTV0SnFvc0dQTlNmUm53NHBXQWgzanI1ZVV3akRmUncxVVdtMURwa0pwVXJzT0ZHYWxOemZhV0NhcEFlOVV4UVptQzJJWkVodExCUDBVZllhMmN3ZnNlVzVCYy85Uk04QXBrMXFNSVNveHM3aGppTG1LQTJWSmNJTHhNYWhGaW9nczBmeHRPZ0VicDRYdnZUSlZDYmEvSkd3TGMvajluVlBFOHJCZ29UTXhpQTRxNjlxZzk4bUhVR3BTL1UvUUtxNXd1TzZGNXE5ZlRIUXZ1NGw1cXRObm1NTHJtTEpzYnJFT0lTdVRrSC9KbFE1MlpNQWViRHlaN293bDR1Q3pmNElGdDRjdHM5QTdjazBSUzN3RzlrM0loNmVQdUpTREFkS2xsK1ljbHdvOXV1MFl1aDdiL1M5akFKbTc0eHJHeitVYlRiaUNmOWFsMThzYTRLZGo0cXl6UkxQaHFOREJCc3VZSVFtaHgwKzhiMGF1b0lJZmU3aTlJZUNaMTlDTDFtd3o3MFZ1TkZTRGdXQ003RHlFREJLMFNxdzlFTTczMWQ3ZkNsTGp6cTFpbVZOemlwYWVFeXgyWGc2ekY2MzBXVUhJaWszZC90SXJEZXhZcERtV05oaWw1MVorK3NFdURDY3d2TXZmYXMrQ2Q5WWRHZzFUMitQcHUxekt2N0xvdzZlNzlPU0FPY0xDMld3ZUgwZCt6STVrQU52WlloVnpHUCtzVEtyamlHRGFwTkRhTmNBTG5IV1VhQ1pQcnJJRjdHcHJTVXBHNklOd3BhdkNqZHEwNGhHa1NUQ3JaV1lpaGdBZE5oRmhha0E1TnhYTHoyV2hXMEpHdFFWS0VqeFZXUC9BU25YTnNUV2hoWXdDVHQrcE1zQTNoaFV1OTZJcFdkcWw0eGptd2JCazJGS1pmNDF1M25lRzRsUnA4QThMNWhZWGVsdmx1YzNKUzNZNjhBNityNVRrRUVvZTFoTmhYVnc1bmtQc3Y5S1ZEVjVGZXBqL0tBT1liUXVybU1QNE4yVmFMZjdKSERMZmFPMGE0SW16enJxQk5QQ3NvM0VVMzVtcVpLZEVJRkp5T1MzcndKMGR1c28xek9Ic1NDYUhja0Y5ZEdDODVTTExXU1lYQ1FWWnlVckZ4ekpLUFFEZnh2S2F0UE92dy81djFnL2pWZ1kxaENlbkRnSmxMamg4UEh5OG41bkluZ3dRMFhHQ3ROUXpHTm9UY1VlMGc3dWNwdFQrTEJoQTJBOFNBRVcrV2RVNkdHRGRhN3pJZ0R2RGxkZUx5bytIZVlUMno0N3NEaWpMOE1vSzhGL3hCbDdDK012RWVnNUFZeUpSRzROV0RmREVXU1BUUHhtQVFGODJIOFdJUWRXNk9qdzVRTnpBSExxYk9mT1dlMFlUUERlVDFETDJSVk11dzNNdXI2QStHTUM0S0JSWjZrR3g5Z05NdXJGNytyS1NKTjZBOTBJQVJJQW5MeGtBWTAwMzhxSk1aRzhMYndZWlRURGFrTWZwYW5jR1lPakZDNmRuR2VLbGxRb3N1anhRVExMZk1VeVNoQVNEQWZCMGVyUTJLTjZhUlI5Njg5S21EOEhnd1ZzT2hDTWxqUUgrNTQ2K1pqZzlITTlVcHRZa0lwZ2tZRkh3dWdZNDEwVGlyTWtBbUw0SVFHVmptSGFad0lRT29Nd1VYSWEyYkJ5OWxTbHRzc0JzVkVyVUg2d21NMUZoWVVIUVVFRUNtWUNRSkpDZ1Jsa05zZ3hja1FZWDJONEdmSEhKQU5RQUxYd0k2WlNaeWQ2b0VmbTBRVUVyZkRGa2o1NUFobVpGb1FjR2ZySVFodGxJTzhZQUhVY3htYkdSK3dWakFDRUltQU8rQWlwTEpIUXo2QzA4R0lvbG1aUHVpTnlNbExCQ2Z6QUFJdm9HRFp6cERLVWxrV3d5RTVlWURQQVBHU0REZ2kxY2d6aHI3RU9ydWhObFdZY3BvZndxMVRVVHJjV3JlT0JVNDhGdHZBWEw5cTROeitYMVJTUHZSY1JGNzliS0FCYjQ2d3d3UyttM1lpQnNwOER3QUNXNW16UEV1MFRVbFNGNmJRWUlEUkI1enVIVFRBMjNxcW9EWXZYaFloMUZkWjFnQUlKd1NSdU9ybVcvTkFid09lNlpGRzA3UkFaUTVnQ2thR0tWc00xMHo3cE04ckJNKzFxdEFmeGZIdU1LOFAvdTRQYVJTUVpKeWpDVzBpZWJEcUMyQk1paURFVTFxUTR0VVltOVE0bGt6NGlNdFlNYklkTzRLMHo0cWlnT1JqMXlvcXBocFFRaTUzSTRIRHRhL3czZzhoRld6WTR0QWZicEpJYktaWXFtS3Q0NVB5SEN0Q2twb2IxZE1rQ2hBWDQwZEdxalZaV1IrMFlsK1hTbDF5aFZnSmdUckd4aTYwVmtZOWRkS3huQVFwak00WWpkaTFxQ3lBQmtEbTA2MUpSMld4WWt3VHJBMkU2b2dUd2lmZWRZaW5JRitIOTM5T0ZxZ0pOSHpGOW5nTnNTSUpiMVhTY1R1akxMQXVhQXRLRmxSQzdXamkxSzl4V1ZDT1pLUFZESFZ4SFRJejNOY3lKNkd4MVBZcU5BSVlCQll0V2tUeitwRjRrVVhoOExkN1BQK1dTQXk0cEROUU53YThHeUdCYm9oa2IvRjVWVVFLbzB4R3FOcGNreEd3L0pBT3doSG9NTWdPQTJNb0RPY2FacDVhMlh3UUJnampPK3FOUVJ5V2R5MU5PNEk5MVZ4dnNWNEYrekFoa0Q0SHNTeGovVXFmYUhFaURXSDIwZVZwRzF6YmkxQmllWEZ3NVgvdW5wQTU1a0lURllTbk10U2dZZ3REUWtnQ3dSalhBQVYwMG1PZHJBQmtEcURlSHR3TGNWN21ZQWdDbnpnZ0VTOVpZNGpXQ0ExQUIxUUhlc1c1VGhJaWFoaXBtSU9EdGlBT1VPR1ExanNEc1RPc0VBczJBQW9KaVE1R1hPV04rQ0FRYVc2cUpoMFdJdWxheVhNNnJJL0VYMUVjOHNWNEJqckFCMzlPRWovTVVEbHY2VUFiZ0RXVGRsVmhwdWloZTlJdXB0ZXAwQjBnZXMrbzNyQUpCNnczSk5xQ0lLVXdkWW5mVXhMaGd6aDFxM1kyZ2RFSDh5d1lxWmp4TFZOMGNreTA2aTRsQy8vTEprZ05BQW9Ud1dHRnd2d3JRRXFBaVVzQm1oc3pGaDUvbjZjNFQ4Rzk3cmdnSDZhL3QvMVo4amp6c1pvR2tRRzZ2YWJVUlZGZlllQ3pMUHZYN3VEeFk5Y0VnYUFiZ0NNRVhNdk9jRnVuK2hBOEQ5WGpNQXNWa0xvcGNqdEpMeTA3Zlc2TDNCQVBReUlVNDJUQlhNdkxYMmhDYVhESUFmR25HdFk0SlZjK0JKam96OWVvcmo0aTd0RlM2dGNEYy9VOW5MMEhMYVREdXE0VjFuQUdxQXFKT0xtbm9mQjJ0a2dBUlV6SGVReElpMEhBUkw1K3NibTF2bXpvSUJIcG14U1pVWmtTRDZZWDRNbVI3VmZObFRRU2ZjbnRWS1dQa3hLdWxSamFZcGdBY1ZGL1ZSR3dGMEQwQUdrR0xlckF5QThmZ0pBOUFRZUFtc1JPU1FDdU5EUGFrTVd2REIyakEzR0FBK1lPUWFheUlObmxWZjJHWFI2UEh5a2dFc0RWVmZ3M1liZ0VjanlSRzU4dU16N1RRYUNEUERvK1JaQ082VlM3SzhDZVAzc1JHcEdNQ3pSSm5MbFVtQ09sQ3QxbXhrQU5OOFFYSE0wN054NW1XaG9RR1dDWkNrR04yTitSaWd6S2lpb3N0OU1BQ2VqWjFMTXppcmlBQUQwS2VFb1k1V0xQWEhGQStzYlAxYXFZQmtBQzNtM1V1d3oyMEdPQzNSS2dZSVN2ZDJ4S216N2pvTTNRWXVDdERGZFFaUXQyM1VENmVkMThMOWU1NFJBNDZKbWdHWXpROUxwUXc0eHVWelVUSUFRcmREUkd0OGhYcUlhUTFHdERldGprVWRJdXlIRGhVRDhDVlRBMXlzSVdzSlgwZ1hlNkVFSU1vYTFiaTRwNmhxelptcUJwSVVvd3VIQkUwQXFxakl4NlVOQkJaYk13RWdJeFlZQUN0MkxQUGt4bFQyUzFPQUlOeWlPQ3pOd01rQUtPYWRxTFBiRE9BSnVkc000Qm15OUVtbHllVzhFN3NBeXZCUmp0OWdBQjg1Z0toU2gwQ1dEcXhMVDRpeXF4bUFHWFJScUFRbUFCa1hwNWI3Y1d3Sm9DYTFuRmtNZTlJZmVSNVZ4ODQ2UkJxODd5U3JHU0Ewd00reWxpMmE1eGhkUnZsQzhCQktNbU95dDBLaWJhdUFmV2ZKQUhnTG1nQmt0bU01cCtYdVpFWnNDRHJwbncrVUFieGMxck5qTU5ESzdYNWhEdTVidm9mS0NKQkx3STRXcTU4emdQaU5HSzc0NnhRaDhQcXBxMjRTRlNJbnJ6Y1pZUHlZOE1xdCtub2piNEcrV3RUN3FJUEtIUmpSTWNPNWduLzdCUGpTa3d2RUxyMjFGZ205bkZLMVFJbEJmUmI4aDR6ck45d1I3RXF4WUhsTnFiUUJIdGlJNzA4bjluNldObm5sSVZobmFabXBVVEZnRWhDcXRRUjRCU2RBZ2JBeGg0ekNDRzJOT1lUWUZGUzR6dGpTekwzU1NFZk9kVFVIOC9qbnBSRWdHWUFFK1JVRGlCUmlBTXZsRXJDZ2FhTkE5SG9PblNMdS95WURKQVFhSllBTXNVaVpsQlYvYWdid3dpOW1BdERCd1pvSkNhS3hIRzZVVVUrWHgvWElmS0ZxQVdpSnh5blFud2wvWkJqVG9zQVJmcVFHdUdiRDYwK3NXU0JrS0FGbW5GYkZzaDhxUU1rQWVETm81VG02YnJtSGd3SUpsaXlGWVZHREVpYUExWnJ5aHd4UU9ueWtxVWt3VjN0NDdzeFR6RmlSTUFMOE9RTkVVT0NrbmRiQzY4ZVh5QkQ2MGkzWnhlOHhRTk9RU1d1T3lKcGZOUU13cUplcnBnNk9Nb0NsbnlNRExNQUFtZStZdGN4WWhyV0lVNEJIRXFXTVRPeGtRZm5kemp6WmhRYTRRa1BHalE0YStCeExtZnM2c09SaFY4LzE1TDNTWVFFTjFqRzVaSUM1MTJBOU5PbG5vcEZKSEc3SUxTdE54UlJFZWl5ZXlGMm14c1NxSWdEV0FMRE9wUkhnVHhrQU94RXJmbmV0UXJjdUk2dk1haERscUNiaEVQVmVTL1RTV2dLSyt2N1VwM21aV3RNWDF3b2themhoWUgvbHE0Ry9iREpEU1llcE10ZzhNcEpsZUhjWnB4RGlkNmNCT2ExeWx2UEdUS3Z2b1FHQ2M4eksxR1B6QkxSTE9ocys1U3lXeDNhSDA2eGtBQmdUMUR4WE1nRERIVlF5SVpONGVwcGhaQUw4U1JVdDVxRG9tN3JzK2JYdEtmR0xETUJvTVdBeGFpUEE3MGdBNUVISVYzUmJCTzJvemdCbHpydEJKTHRBTHdSdHB4TU1tbFdpTGRWQk1BQTl3Z1BpWWQwVjNJQlF1K0NmRmdQUUltR2FNVktSeUtnbE50R3lLbnBMLzQ1MnQrSVVaaXo3T2dkS2xBVWN1TGlSbzhscUxtcEJvcjQzK2tWRDVUS3FVL1FPTGcyWkhER29DYVVTaUxDa0VSTHpOTmJJQURCQ0FrcUdPajZJTnhxTUZNdm9HZmFaaXJINmhZalN3R0owSjI0Ry9wMGxBTGtNUkhyU0ZsZjJhN0sxYnJyU3VJVUNadG9IS0ZJa3NuQzdwN2ZreXE0b1hWRzVQLzNUZmJlS1pIZjArMFNlYmFEVDlGRzNHRURvdG1Qa2o2WUp5dFJWZlhsQzBHaGRaT0w3UEVTck1XdUlFdW14SXA2cjlCRytvVnhHZndObVFEWm5BSXB4eWx2UHo1cStyQzJ6Wk9waVF1ZUgvQzYzZWsrcVQxd21WQ1UyQ29DeFYwWWNodEV6dzA1aEZKakVMeFRHU0N3RzlCUWdnc3dPOVA5dU1BQzltaXlhbjRrc0k5OEZjcitCZzl0NWJ3OWVEYlpNa1dpNCtGRlpmZFNzTjdFRXVHa3BTTXVwWk1rUm8vTHN0UFFGTUZXOFllUTdwaWhDQ1V4UDdxSnNCUVAwaTFZeGdKVWJXTkVGRjRXV3NNMEh6ZWxVZXVFdU14dmQwQkJsSVcvZHpzNWpYR1pBVTVIbS9GLzNpUUo0WmpIYWI2ajd4ZjlzVjh4dzVqZUZGTnlyd2hxYno2eXlZMjdEOHRjK3dYR0J4VGdwdm9HTHdBMEdpRVJEVFUrVENzWDhtMGIraW5WcDgzT2JMWE9MZTZZS2dxL1JHOGd6TUl1ZktvU29HVUNoMnlZQmFIYnZWT2kweC9RR0VscktHRk1aSmdTa2RubzJtenc4cjI2WnNxTnF0a0NucDlueDE4c290WmJhQTUyd3ZzZFo1WCtNUktybExiRnl1Snd1YXRPaXQwRGR4UDhTOE84UVFDRXg3ZFdKSWRnYmxBeXdsVEh3QjFuRE1xRW5qSy8zWDRZclN5ekdWQnJCSmx3RWJqQUFCZ1BSVkdXZGk2bm5ySVY2a3NXY3E5ejNuRDRKdmtadkFMYkJMSDdxd0RKRVV3bWtaNGVLQ3F0ejFPaTBvRkk0T3dpY0ZsK3pOS2pzWjFmWkp6V0ZxS2dyVzQ2OFpaekNLYXNsRW4vTkdzT1FwOXcvR0VBYlRpWHdYZGtZaTFqTDI4REtLYUdFZ25oWm8rbEQ5YjlXWUFoRVJvVzBkOEs3SFVXMExOb01DQ1NIWUtBNURLMUMyR3dBWlNJRDhJS3lhdXpQR0lBbEdBS016L2xIODd6MFY5VW9yR0lTcGtkV2cwM3dOWm9EdGkxK2xLZHFNOHdvNGFoUTFkUDFubVZqV1cwcnFVUjE1anVnSW1JcXhqSE9KcEtyYWtvU1pOWFlWczBDdzdOYUl2SFhKTmhEUUIyODNCa0NzZlRsNmdhWklhMlV0NG1WQXdsUmhwYkF0MGYrTHlGS0xKcUhzM0NUOTF0Tlp6QW9XamVoZDRteEErck9RU1BFUnljOEkwMEJZQUFHOTJXQXhwUVIxUUhHSnpyVThsZFltZWhlZVA1UjdjNHgwMWtOTmhKWVZNSCt4SG9VQlg2eHdMR09vcDZJVzdJWUdiU2VSS2VWVkNKMmxQQXZTRGZreGVCc1NuSmwwM21ObTdZYVp4aVJVTUNMYlpab21Ea09kdktDaDNwNFBBYThqUDg1VUJSdEUvSjJuTUExYjRLV2E1RTJRWW8wc3dOMEQzZzMvZ05lcld3dnhCaGVma1NKc29YNEovMDU1TFdvQ24vd2c5V1NnaG4zN09xSWxlR3F3UGlzL1BzWWRkYXltSE5kSGRQTFRINERmTTFlQWpha3RRdG5LOEtOM1c4RkRBK2szZFRGWk11YWxnYnpBVGgwQ1NBdHNYMCtRa3VRNjZWRm83R0JoTFBWNUhGbzZEaXBOQ1cwRklXTW81YXBseUpscTVDaXdLaVJFU3BrSEJuSlA2SEFrUlBkWGVEdUNJcVdJU1JYczVHL1NlcVdHS1AyRWZEUUg4U3gwTWpaS2MwZXVRYThSSUIvcVk0RXFrcWJBMGN6R3hCc241NVE0UWc2QklMSXkwenFlSTNyM2luK1EyY0NyNmNiSWpyWk94Mmo1cXRkbm1WajdhUW96NXVpME1nRTRSS0VlM1R5c1JYMDBWcjY5c1R4SllIQU96SHBFdEVQSkR5cUUwc2pCNU5YWjdOQWlwS3BDUzBOREZ3MkRGZ0NSTXZrSUxiZ0Zlb0FFaU5RcGN4R0FtRWx2RkJreWt3Ym5PU0UrcHVHVnBvOTlzRUFJVGZ2QzNWRUNkb0M0MjlPUG45OVZoT3lDUUMrWWZCakxxQytCdWpNaVFLaVowdW1rSXZpaXJ4QW1JMlhVN0xtU1FyaWZDbEZJZjltOGUyaWREcElzVUVCeTVKQW9ISmtUNmdiWkdjMTZaaDdCeUR0cis4b3JWd2sycXFSb3B3WGREQmVhQ0hjTkhkemp6YzBMQlBkL2FIQ0FPQ01VdjZRME40Z29wUFUyVEpUZkQvVHdKb0F5SlJYaGRrakdTQnFKSE1zWFFLMXdmZ3pGdkNkZVQxbzY4WGNwNVNrR0tmQWozRlhsWVEvMm1vVEQvQUsvb25sdmtKbWx5Y0ZYbFNKVmZ5TjZBZXdPM3J3RHhRWFUrV2pTU2NBalVRRDFtMUNBMFpPdXNpK0JZVWFrR01jVDhqb3BrYUtSbVkyN2lHckZsbFBuWnlaVGFvd3M3OUcrWEVheE9kRksweXkvV3hscHZpS0FZNnpTSHIzcWUyU0FkcHlNNnRldXpLaktwSFNscklZWWpnQm85WGZxc2k1YTh5aDFVQzRrZ2lYaUdvYzRCVitBZWhXSXJQeE4wL1NDZ3lSY3VZeC9zNGdXRzRGb2h1RVNQb1k1RlpuN2hVQzBkaVVrMjYxeWtSUVFHRjY2bUUzTFdjY0Y1dm5aaHliU1hCZHRnTE93amFQR3FPRm1mMDFTbk9IUnlSYVphdi9PSGk3eVFBWkR2RDUvMG03d2dDNWJVbWRCR1hYMGU4SzV1YWRHeHFmenI2a1ZYOUhJVE1rTWFBN1dGV1NkeExoRWxHdEIraE04d3V3NWF5UTJmRTMwVG93bm1rc2x6eXZTRUIxUEZtQXZQWWdIMWdCK2duNkRGZ3ZZaG5aRTdLWlpidWNkT3ZlZ0tuZ2lNS00xTU5oUWlTTnZEV29XaWxjeS81RHR0S2ZSWG9tRHJHZ1hwWWZUNWRZdEhVd1FPblF1TVVBTWlVWUx3YjZYMk1BRjVxcGsyQUpwa0VqRkV6Tkk2SXRwak9YdE1mOFc4NkMvWWpXSExHalk5d1JvNTVFcUJIVlBBQm5HaUJxSHI5ZkliT3pQaE96VlNwcDFGOER1eTVUMEVFMFpRakhJQXEwb1N2cDR4bE9hZnhQK2tUbTc1eDBDQS9pK1pDTEhqcmtsZFNTQVFnVVBVVGVWL1puKyt4WEhtMHdHSkJ3TFRET1NKcXJCdWtVajlaT3FKdTYvU1VEUkphUTV1TW1BMUJvVWlYcHVzWlAvVE1VVEVYL2F2UHFudUZmemI4ZGRXR09rQ2Y0empSYUw3M0FWYVBYTnYwbGlOTjFyM1dGek9iZm9FK21MRmU2bE1BTmJMc0lveDZZVnlBWllFRUNmUndjL1VJR3lQWVpESkNUamw2TU5EdE43K25NYURNQWdhSmFISWlWZ0prMWp3MmU4Y3FmcGRRY1JNYU9vSjdoRExpT0pBTUVpWlFiazlTbElmSXFBL0F6UWYrckRFQkhmT29rUSt6NUdkbmdDaVlzK0w3RHdPTG1FNTJUay9ERzlKZy9lL3o4S3VoTUVwQVV5UUQwSzV2cmgvYmxDcFZsZjFjQmFFb3Q0YktTQVV5cmg3eHJkbkpUeXpZYWtlZ042V092eEZVM0NjUVFzYUxXbzlJSGZrekhaaHdMWUZCenVHQUF4QjBJSGlCSUNrOEEyODVSdSsvcDBJemN5anBGcW1wZkxELys4bGd3UU1yb2FyMG8wcS84bEFGdVNnQjdSS0dUZEhLSkJLUU9lR0lEVC9jYjNOczh0NHlwUmhidlJlTVJRMTVhRlVWT3dkNGpPRktjVHl4TUU2M0ZBSWpUWkp6V3kvU1hETUFjN2dVRFVLdFhTRHBxaW1tMXptMUdvb05BcTZpYlNtMmY5TEc2djVaQ29KeDBrUkwreWIwNUZoVFFMK1JPbnE5UFgwWHNBckxtV1ZNcHg2RW80MW9SUUVVSGFLWFhRVFZvdlV5eGsxd21xYS8zcGc3QUhBcy9XUUlxUGZPUWVaWXhRYUk2YnM1c3ZDdG50LzdVdit6QXE0MnBuNGdEWHJzNG5XZWdkZ2V0eGdtQS9sNVVmUHdyQnZnd0xpc1p3TFg2UWQ5aWJUVklObm5NeHJDYjJRWEdvZVJzaCtUVlRudlN5UkhQODJIT2ZuNzZZWDZWQVo2ZkhJWUZEbk5Qd0t1RDBEQVVsUVJZcFFSSXZRN3A1aWt2NHVheGs2eWdXOWQ3eVFDV3pvQVJnYjlnQUNvbFRWYTRqMHJaNEZ3UGhtTjEwb3lOd1FnZDVuWUFlMThudkRNQzVFazR6MGh0WDdhU0FRZ0IyYkVrZWNrQUR3K1hETEN3RjV0VURFQ3R2dCtIdDlyM1hYd0VDTFF0c0llK3pkR1BzWS9ETUpZRVZheEtsQmJVWlpIZ2hYNHZHYUNXMGlVRG1KTUMxK0E0YTIybkRvQWFTd1JNbERUZERTNGlxS3FkWkpENmVpOFpRRzJKMkFaNlBwT2ZNUUJmYU9BVjdpTnRCMFVBYnVIVkVSSWZJU1JBV28xSTNlK2xVQ0NFQWJ5d3pEenVQSXNGSDh0V1dieHY1eEFRR3NhU0FiYlNMaG5Bd3pxVEFVS3JOem1xS255dlpnRFFKMGNJaG81N3NtemZkUGVhb0o3LzNBbkt1aFV5UkZjWlFGb0JnZGdnOFN1RW44d1cxenpHOVM1QWl3RzI0SGd1cDRBb0ozVnlKMW1TK2lONnJ6R0F0RDJoNC9EdHd4TDBjWU1CS0pJNlJhR2FrcGdqRndCUWg2RUt1NHFIZVc3TWpiaTFCODhWUUl6UU13N000RDhwNFNTVzZqSVpRQmNTQnNIVGprcmFqdEF1R2NCZXFNMEFqVFFvOEpvQ3Bta3hnSHhnQVQ3Vi9JVE95NzRBaVBaYk1VQUFPZlNDUXI1bFVhQkNZcUFsdUZGVGFkcUhKQzQzMFVFZmFKOVIvNk9nWGltbm5EcHNOYWtYVjN2NXkreTJTSFlJM3o0UVZCK1hFc0NTRWpEWGdSSGNaQklIQjJTR1BJL0MyL2dxWHdROGh2YU5RVytpK1haUmlSMnhkUEQzYzZ4YnRUcVJmVFc2ZW8zUjM2SUc5c2tBQTdZTEJxQUVTZ2FnalJVNm9NeFFSYXZEcmhvTUFMVSt3YWVubzM4SWVZa0FqSm9Ca2hiVWNMQ2ErMU5mQzUwQlU3cnBNeDJSQnpVa2N0c0dMeVFBdDVrT215Mm85MnlKSXdiSkFJVGVoNk1uVG03M0pnTkU0bkNXcGtCa3p2cUtMMEFYWnpMQVVDdGhwUVNEeENNV0hpVDFlWTdQY3JVd2Rub0tublFraGI2L3ZvbGI0elFUNDZrRktkWGd0T3dTZVNheWtBaXJZekpBUDFxYkFTaUJrZ0hvcVJZZGNHMDZJRDByemdCb0ttZWNQdktVaXdWZzMyYUFIRkl2UDFld0hkNlhrL1REMnFGUHdCblRkRkV0SmxPVTJBQzBLM2pNa0ZNc0drcVNzR0dxNWNuWGVtRk56c1RoeThpWHVMckdBRkNkd1FDd2hYZFM0dEdQWktIVkRPdjFGSlRUUUc1aUdtSmxpQ0J0U0dCWm54cHA4YndMVVBseVgzVHBDc1Vic1FnSU5mOEM4dHBpQU5zMXBqRG1yazZHeStEem1peWhLQkhyQk9vNytIUjJuQVVmODlIS2xEZVhnSHVPaGo3VDJJNWh1YlcxZHQ0VCtqT25YZ29BR29GcWhMdTB6RWNVMUt2bFZMNU1tWXVtSVBXdDN1ejJHaFNUNFZVR01JOEZvYVhuYnBtaEk5RFFoL2tjOHR6bXlMZTd4RHBxWXVZQ29HUUxlbXI3TUZoRDVsZTZaSURzK2hTNXFmTVo1dDMzYWdtSWRtZ3pBQ25uSCtWMkhiRUF3ZTdXbzJUa0kweEVZeTNXaHhEdHo1V01Dd0I4bW0wbE1IZnFwaEpSOWNhcjFaUFUyc3BUcEhpdXdpQnlwcjZMOUVMNGxNcVE3M0tLSXVPWGhxRFhUTFNldlpXNE9LbTJDd1RWTFFiUUtNOVAyc0lyTlpKWkhhVkhxUU02SXo5MVlSSzFlZnRLTEhvYWZKeDJMQlYwL0FVREhFeVpDS1d4VUFMWkxoa0FqODhOV1ZoMnNXd0FQa25KblRvQVlDdXMwQWJxME5TQjV6SmtwMklBS24zRmp1eVRRZ21PZ3BvQndvRWNsVWMyWVRmdzVJMi9ZZ0J0S0RUUE5CdXRtNmNYTkFubGkvMnlwUmxrWkFndzhTOC9ZNEMrSVo1YkRLQXlrdWdNS3h2RS9HSmxycVFQVndIR250UFlDdGFGL3RiNURRYUFLRmRWUEZTeGNodUlkb1VCaHRCUG1wb0JFSzdNZjlvTVFMdUxjZkt5dlFDZ3ZiYXNyelFFcFpldzd3M3FTWXNCSW9RRTlLOEV3R3BvWU4xZkxnSHplVkhCYXRwMkJ0SHpXVEVBMWYzOXNyMDNDRHFxYi84bUE4QmowYU5Tc21KU08xNllPZ3lFcEMxczlJblJGa1NxSWU3WjZla0RwTzNYU3dDN1dLYVgxcmpxZmFWZFpRQ2pYc2tBTytDTjFKWUdRTktneFFDeHEvVUVCSk5JRTFHWVZNdEpSMU53N2R4SkJuZkprRHJEQTBwZGdQNldVZGVOZllUcnQ1VEFLMGs1ZG1VRnE5eGllTHZpK01XR1A2cHZIYUtsU1ZCNThUTHZjV1FKbzkwQjBkZUo1SmNMS1FKWU1oOXBnVzBCS0l4RU1BTlFneTRaNE9QakR4bUF3cGhxd0cxVGNESUFBV25jMjFyT01OTUJzUlVrb3J4Z2dHZTNCTk1teXh2MFZ0RXFndEl5NXZhdjBybERFd1UweDVJQkVLeUltRWI3WUtvTk5BSkpxdVdMYmFEN21wS21aUjc3aTRDUU12UWpLU3dtUDJlQUtnQWxHSUI1TXd1UkhBd2dscHUwQXpCekZwTlVJeXFrbGh6QW1xVkpWSVo1dlVoRDRDeURMd0k1KytzbGdGMllqYUVHL0E0RDJBVDJNQ2RtRFlRWEVPNEE1cFFvR1FCR2VlNW5JeTFRZThTS1NkY1VxSmhsNGR5SkJJUzZYbFVNZ0xoK0ZPU3EwM1RhQmpxOWN4L2hmTkg0aHpveFYxU3lTTlI4dG1TQWtzS28yVVNVYURZamk5RU1RSzNFd1NRRFlCeWNBY29sYjRsVjdHTHBpS2dvbUU5NmhSdmxuVmlxTEtBZmdYTy9aZ0M2ZzIxQitRMTM4Q0pkVk00QTc2cVh3Z3RvWW1Cb1dXWDRDRi9UWGVkTHBhNHRNMjk0eDJaUkVnbjY5SUs2bXkvVER1TkdQSzhRQkJUQnUvWmRoSnl5ak11Y0xaT2psd1VUdlpiTlBsSHoyUnluMkNrcC9JTUM1L2t5Q0hXSkdIc0F0UmpmWXlzNThhR2xLWGdVM2s4Uyt5b0RjQUdnRXpEZGdtVUFwbCtTMVZaK2d3R2VTelhndHhpQXRnaWNGS21hNVRRaEQrMW8wMGhZQ1FLWldYNVIybGlxbGd3UXUzcjZ4N0Z0Wkl5Nnd3N1RGOERRSjZadlJ5azFTZ0JBM2dlUm52UGJBYUpzV1V1MHlHREovV2dSNHpncS9zUDBBS21Ud21oVzlDUmJGbTlCdkxRallxQ2lKajYwWUFCcGRmekRWUWJRbDRKbVNDY2c2Mjh6Yk1yaWQzT0daSTNhb0haQ3FWdGRSczRGOHowVDNac013T3ZLNG9XbXhZVzFpWk5vdmRLWnhFb0V0RDg2Z2Z6UDJOY1B2T1crcVpwMGlZbzVIczI1d3h5VWtSUms0MUl2cG8xOExDQjVSU0V2SDlBdkFrU2pPV1pxVmhkTVJPRWpPYnNWc09laHppUTFLWHhDMng4ZEpab055OGd4SXJjZjBXcDhhREpBSTgwTFlwTmZyekdBdTVkODdmZU5sSUU4RVNSY3poQ3F4TWtBZzRSU3Q3dUFPL1RENVUzd2R4N0k0b1U2OUM0V1l4S2RPOXJYc1djUVFPNEV5ai9mR0xGVE4vWm5qRnlpWXF3SW9UVENEb2sxeEk2b0tIOGp5SUZ2S0dYZlpTay9NNkZySTBDVUxXcUpubG9GRTQvQVJyR3dYRGFDSFVocVFvMElSSnJ0czRoYWtCdjNUc1pvNDBPVEFiamlSUXdrOVAxckRCRDIzajZjdDB4ZHg4aEdGS2l0WjRqWHFQMHFTRUVvZGJ0TDUyY2NMbStDdi9OQUZpLzB2ekhEWWhJTjhZOVpMUnhBVGdLOUZBQmZLblZzYVR1dEoxMFdlMlVWMHoxaGg4UWFuaEpCQ3JzckczZ2xpM2tDMkNoTm9Tc0FpSHJ6SW1sMXdjUVpvSFVuaHlkbW84MEhwQ2FCODQ5bFdibXhlUEltbDRaTGZPamQrR1lVTkVxSVpoMmtJWW1XcXI0c0FEbHQzZW16YjgrUS9kRjBvaUJGUXFsYlhib2hpY1BsVGZDM0h5aUxGK0p2RjRzeGlaNkl2RmE1amZ3WWdlcXRBTDRjTGJiMG5zU2tpMTE5d0xLdGppOWhoNG8xM0l5Sld3cWtrL1VvNFlpQzR6dzBLVHoyeW9oMWU1VC94c3ZzVmdWd24yaFJsQmNGWnRFNUlER3VML25IdEt6ZCtwYXlKNVhESy9qUXUvRnRITVFQMzhxV21FSTZPRHh4RzlMcmxkcCtlNFpZYmN0dktDSWtSVUtwOTFXWHZINGVMbTh5TGErTDRvWGwzMENZemppSnJFNHZjR3RmZU95N0UyaVpmd3FsS0MvcjZXVXRmbGRsUmpFekFaQWtOQ3IveUl2WWd3Y0JpYWhjRWUrUVJVU1hJUXNDN2Jvc3l5UVdhRkYwNXY4eTViSFh0STQvd2xTaFJDeTBqMnA3Mk1hSDNpMHZrVkQzUmVIbHNoWWlZZHVKdFpKWkJ1UnBBdVd3Y2lXT2VxeUNSTG9pODBHU1lvbDFhN2tzdXhKSnFpZm5UUXBndGdGRzBZaFQ0NVJoY2VVQ2NiMjBRdUNiQVAxdWVCS3hpbzV2eXhhMTJERmxTNFE0Y2FKWUN4SUFkMy8vRm53WjBCbERpTXFQeEU4V3JNOXlvbUJZYWdNSitpM0xKSTRMdENnNjhiOHU3bkpYcjJHNS9DT05sUmFVN2ZrM0tnTlJHeDk2Tjd1QmhXVFo1cUlhYWhSckQ2Q2ZiYk01R280VVI3SG1CRlZqRG1JY2M3SVloaDQvT08wZUhWWnRoNHVUSFdpTUtlYXpLcWVYM0RxclFIUHFzL1FvYmVBczBVNndGVjRQNjIwVW1rYjVXc29QcnBVc0tPcEttSTBQNlpZQU9ORVBuaExqNXRBWlBTU2JiWjVpanFGYzZTaUNkVjhSKzRGQVpXZVpSQml3QWkzcXVPM0V3WVZkVDhOeU8xR3hnRHRiRFhuU1NKWittZm4zSWkwV0dXQi9EUTJOclNNelZtUTk1S1hWT0E5c0lEVDhsSWVvaDUyMHR6SzBtSU02M2NnMGIxQnh2S1MvMDBaL2dJUFF5R0hXaFp2c0FVdjJXZlhtMUh2am5HUUNKWmxlcVZlYkdxWHprdXdkRmYzMzlJOTdxWG1qOVd5Y2dIZzN4TnBzbHpOWlpqVG9ObUVCQ3RUZERvemJFRE1SUFYwbVVlalNwQis2cm9waWd0UENJaEJwb3FveWlRVmFkTkxKLzVXalJhNHJodVV5RXhsMnNBd3NuSVFKc29hU0NrS21aZ0F2ejR4bWNoS0pGMEJtNkpaUlJCWTB6dUxQS3NMeHkvSGcrKzlhK2dOVEh6V1pXWndRSm1NaXJKK2ROa29OekJXaHo5SFhHSFNaMUFFbDVRNUVucEo2a1l6RTY4RU9ZMmVkM1ZxUWxEc0ZaSDdhZTBWUlVvclBQWGxDRzJCRXJhRG94c09wc3N5b0VBbm1CcGFnc1J5bUVia0I2UXYxZUdWcFZBWURjK3FsTFVMMTZTcmpsUnIvYU5hNGp6S0o2ZkhERWZIRzVQK0NmRkRFYWRZK3c4V0piUytZeHVMUCtMOWdpd1NUSTl5NGNnZmN5YTROZW9mUWlETXFxSzlkU0N5RzlZMDJwQ3JsMkQ1ME5meHE2My9JOHhKenNPdVRSYmpFRU5aRHA0MU9EOGFDZkJkYXBxYzhkMHJLWXFlOVhia01od0dmc3RDT29oNXNwOVU5V3BWRmEyWlJVUlNVT2pNOEJDbXBtQlFuQzRwQ1FWTEVJbDIwbUxrRkRGOEkyTUs0cmRlb3ZORmpJaVc2OWQzZXRkYXNTNHRXenJ1bThjcUJ6SzFwVTVRNStaaHoycUFXeEJjNUNNTGliZ2ROWUZya09SN0dyT1VNZUc2a2s2akMzMDlrQUdZZmZBS1JNS05ZQ0R3VDdpd0pEY1ZjQ1RnRjVqSjNheXpNMjlvQk1rK1F6OEhPZ0pQRkZyK3pKaFlsYlVZcm5TczZ1cnBUOW4wbUpnSmtQUE9RclZoSGFjUWM4WnFiemFQUm94NnNFTFhkblVWclFHb2o2dHhycEhRVFJNN2FsUWdiMHkvd2tHcVdHVVdxdXpJYXd3aVlEQ0RUeTZLaCtzZ1J2SWdBVVI1dEZpcUUyMWt2RitKM1NnWm9XTWNvOG82akF0bW5QaVpqUmNjWnJEWFFmeGpTckVLRlhKSlFoTWdkUk4rbjhRcXJoLzk3cDJNRXdlbWF5TmowcGllaEpIc3dqc0pDa0dZQnFOSW5ScklFTTJBdUsvTU43VnRSazNrMzUwckZ0TEROWExGM2xwcHgwRUF3NFI2c1JrQU5CanFKbHladE1LczR2VElsb1J6MmVyRHdyOVhkY3k5YVExUURLNG9pWmlSQ1JDTXRwZHczQzRwNnpZSXNNN3A5L1JrREtNVUJTcEVhdnZnRHRCYlo3QURWQm5rWEdaaE9CcEJYb0E0UVpSSTdoYmV5c1Fwa0h5UXFRU29iNXVFODlDdGNCc3VGeTFQdFgzaWhJYlRCM3d6aFIvU0dXd0l4c3FKWklDczI2TVkwUUxKR25pMWZCWFNUM2NDa21ZZmVPU21STEFGY2hSMUJZY0NOeENjK0IwRlNRODZ6OEU1anRPblA5UWZ1YUJueXNrNkRiWkM1NVBXRnZBdDEyalVIKzRNME5iKzdVbzhlOXV6dW9CdVlKMDVHUnp5QlZKNERzNnhkT1Voc2hQWWllWGhSWnZUK3B3elFETTRvVThsc3FrUVY1ZEd5TW1KVTF1eVVxWDg2eUZQQjJtMll6U2dUbzdIT3EzVmtIaThLbUI3S2dJeXM0SlkxWkUrTThFZUF0OGRjcVFBQUEyQ01HcEVoUWlRRDRETzhlaVVTMVpBVkpsY005TTIzWmpRVTNkV09EWVVpaHJla3E5eG03b0J6OEVEVW1lakU1c25YTkxLV252bmdWSnRhamt4bkFDYUVBMk1MdFZqWWhuOWtySTRlQnRreTBGckp4KzZtRjlHQVNXcFFhTmZXbEZHdE1XRS9XUVd1cS96M1N3WkF6dnhobHlWYXBhTjlWS1lZYjRobnh2V1ovR3RyTnBlaTdOcGFvK1htUURzb1VRbFVUWjg4aUlwSlhkWVFockJnc1JFVkZ5WCtqVHQ5TEFIS0FCaTZ6SXI5WXFrQVZXRXBYNVNKbmZtalpBQS9CRHRVRlN3VGM1QTFtWTFWd1JiV0xWTUxBTG5QUHVXMkozMHhCdkNVa0pHOUdvVnRFRUV1MUp0VHlBRng3VVZyVkN4Uzdocmpnclc2aWZCQ3I4RmNob0hhdmcvVkhvVzVGaVVENlAwRzhqeUxNZnNwQStBNnZlVFhSMnNHTUVFSGxkcTlDcGpOWG9FTVJhRUhPclZaQ0tLSXlrb0I0QUU4UmFXaU42YXhLaFFBdXo5REFzZ0Fjdk1NWGtlNWFNMWRvV1FwaWpUM3J6SkFsbk8vaHlDT2NEbHVRR0lPcmhjaFdUMVVDaFFUbGpIRko3SVI3N1NoRktBbmhhV2pWd1NOZ2NTc1FHQXJYbGQ3V1Ewd2daVlJ2TGpFMmpqNFFRV0VaOVpYdGtjdXRiazBad0RweGYxRVRWUGVzSDNKL3drRG1KVUt4bUY2NjVqbTMyb0xOUWgwNy9VZHRYWHlxQ3lVbmNpdzNGd0RsR0ZNV0lCVlFnRUlxNjV2QTlWMEFMMGpzbUpqM2RQa0tMRldRV2VERjcxZHNrRVBVVDBnSGFxQTJVZUhWcDJSQ3Q3VmtyS2lzUUEyQXlUOWlpUE1sTDlZNEg5d0g0K1c4SUJqWmhpNHJFTHhET3JXM1ExYm91MmNkZWptY0NDK0RJUXBKUkZrcEwxUUxoR3AzY3Rkd045bkFGUTBNOGNpelJ0TExsYWk4cUFvdEtMdGZGbVBGVUQzSGNVYUVGbjIrNDFYQ0NJODBWU1pqclhTRVBTbUFuK2xJOHVzMkl5NFdQZENXWWthQkpjWiszWDNETzlEaHROZUM1a2ZhQVc5ZVlRYlltSkJSZ2tSNEUrTVI0RUJqQWpBOHRoOVdPTmVnUE1HRWd1ckZoK1RZVVhsMnpub2hPMlNBY0xOOFJLeUNwalN4aVdBYlhKVUdjSlRyWXI1L3hFRDdHRmpWN09qNVptYkdlRlVuRnZDZzBNelozNTJtTklDMURZdnRNQ01RMXl3UU1QU2cwVXRSOHE2dDg3WUpUQUFuRDFNMHdQN0YrcEFxb1VrcUFKTzlCREVpN0pOTUJGRVFQM0FRVFAxMUZRQjBJdkx5bExObHZTUWRicklBSE5weXJEYVhBS2dpQktCM3g4TGJ6OW5BSFpIYXpNQTdiTlJpaDZGTEFBdVNzQ3htV09aTEFiejcvK0tBUmdzQkhNWnpDaGpGK2NMRktPT1daMlpDa0Q3WHJFUHpCcGhVVG1PREtDYUUxdFRNWUNxMERsOFFrYnU1UXVJQ0JlRmExVjdZT2lESDkxdEtTVnNMaWtqQWdCRmRHc0dHREFmV0t0U3diblVBVnpzV0czS09WRlowWGFYUzBCN1pXaUsyaHRiczVlN0RqQU1lMVBvQzZKbFpMWFkrMGlsM2RFcGFMMEpUNFZ1K2RjWTRMVEp0UmJCdnI0UkJHMDZBelV0Y1ZiUE1peDNFTHM3VFBlb0VSWXJnRE5BUDFyTkFLMHFvT093MDdjWjRPTWFBNWlOd1p4cXpJMWFBR2Z6MW9PR05rdGNWdDBRU21jd3dPVXVnSXNMeTFzNlNLekRobFU1OWJyaEpGTjZSRGZ1SStxcDVlK0xyZDFLT21Odmw0dVZna0djQWJKWEM3b0dBenh4SHlsc09qLzhQUVpnOFhsZjZHZStFZnlrT2RpVWNxOHc2YWhtcW5jVURiNEdxTGdqQnRxZEY5bk9KUU5jeE9yU1UvZDdESkFaeW4wOUdCYlErUVRacUFESXFmbE9tbHYxSFptUnZEdmp0R283UUlYV0dtR2JDWnJxam5PSEREU1ExTnhVd003Q2ljSUpwRHYranBvUmJlMEw2OEJnVjlnQjdsbWxjRzBKdzVneFR2M3JBeTRNUFFkeFpkMFV6ZkR4RnhtQW54bnVPcXIwdHZTQXNiMktOZ1BPcFltd0VPSnlxYVFwb0N5Y01TTzhhMVNuNktRU2VKVUJ6TUgzOEhzTU1LME13NmdUVkNiUGVIUm9uQXFBYzgvbFVwcTVsY1R5dXA2MmcweVVER0NSWDFsQzdueFdxNEZRUkttMzYxVVdIMVN0S3NCV1U5YXpzd3BWYytjK0cxVkZoS0VhVlZFdis3eW1MYkh2TXNTeG5ZZktRR3pKZDJsZzdoOStud0VXUEZyYVYwSWlFd1JnRnJjc002Y0tPVXNRTmcwM2daem05QTFQRU1Qc2xWYVlFU1RMMEJ3WndKQ05QdG5qRFFhQVQvL3hOeGtnTXBUajhlMFEwaXovS21PSEZjQ21abUFtWVFlZzdZYm1Xd1pKbUMvQTR6M056dzFEdTZiVlVUdnVYUDF1dFBqWUhtN04wcytIaGlxUkxaUkt2NFYxbjhNVDRkV29EaDRFemExU0gxNGZVYnVUV2VRT1RlMGlndFpFODdZcXZVbGlRUGNDNEdITzNuWVZUVWpqdEQ1NkxJZk92TWV3dVp1eHB3QUx5RFFwcWlyT2lvekpyMFp1VmxvQnZZdkNHZUtUanhDbWJQQ0xvNEwwRlFaQVVOZnZNZ0QxQy82cUdlQXhDMENyYVZJTitIT2Jta0dDL2hweVdNc3hyKzNqQWphaEkwTXdMTXNqNjlRL29FcjlvQUgxbEZTd0JKSWtJRlJVZlZQQVBDdmNBQ3dlM2R4VDF0V28zTjIwaHQ5WFRZSmtjSE1IcjBzbnNieGtPcG05ZExqeUlOTVdEd253a0tkNGZIclcwYVUwVnE1b2xmUGJ6OUxyaHZnNmRMRElGTW1NZDQyNks1N20vNmtzTGJXdkMyZXd5a09kckw4TUM3OWtnSy92UDJXQWoyc004UG9XSmVDQkZNMHFVN295Z1A3YU5ZZVBISnZzTURQTXM0VkJCa3NkYWFiVWd5KzN4eWxSMWtUSXNsVlI0YVluTGJxeGhmSnFWRHNQZ2piWDhRaTEzRks3WklVVWkrUHBkQmttZ3RGbktFT1VEZ2VyMUpVM0dQREZTc1owayt1VlJDMjJ5dmtKb2RMdkRteEFBUlo0ZWZONFFFeHpyNXFRYWY2enRKUUhSNWFsTkxMMkFndHZHUDJ2TThDUFAyS0E3WFVHSU1LRm1TUDdOZ2NoMjdpa3c1UEptZHkzRENScFoycUJZYU9HRWRBN25SR3BKN1lLVG9tcUtvcFhmZHZ2ZzM3YXV0NDlLNnRSMGZGeVFzaEp4QlE1ZEdBRzZjbHlPN3AwSWxCTUhoZUJaaXd6OFk1SFZaVTNCT0ZINHNGUkg0RXlHVUpaeDlZdzdpVWlieFJaVU95eWhjd2UvdXdCVzZ3d3hEK001SStJaGtYaGpBanh3ZnZ5b2NRUjdWazg4dmNZNFBFbUF3akJ3L1JhNlFCbjIzTjdnZ2t6M2JMSzFNWnQwK3VkeStFQmFuOUdKdDBtRzdVSmorS1NKdlFCOWZBbjZ5T1ZkWkdpNnR1M1Y3alplaldybDZxYWxVMCtCa0V6Zk5Cb0dOQUJDMFgwZ2xzeS9GTWxUQmxxeW5ESlRWbThKQXFEMlIrSThVYkFNU1loaFRFbVk1U1hZcGtjaHg5T28wSUhxVXRNQU1EblJBQkZwTHJoL3BUYUNPdnl3a1RPaGd3Mm5wallBZjk4SzM2UjVXTi9pd0h5UjgwQTFKSTk5bXdKR0FtMksydXp1bm1oeHg1RnFDWFBNWXZYU3VaeVZBWHNESmdpcks2bkVWbkdHTWZKT21OT3ZXZlNOS04zdGJIcW16U2pGQlVnR0t1OG1sVVVibnJoZXNnQVlxT2hVeFVORWJEV0k5Tk43Z25LUkxDNU5pZFJYYTlJeitIZlh1d0lIRUNFU0M3TEdWTnJPekErSzg2SFlDOGsvU3gvUUhSQXBDVWlobkZidVJXUUh4YTl5aHd2aWw1MSt2OHZHU0NEVnNxTnF5aHJaZkpLMUcrQVVHV3NyYjZ3UnJOTEoyZXlpR2xHWExLaVR2NEhHVTgvbVlQam9wYVkxV2NTZ1lkSTlLeHdzd0dOTmxxTWF4TWpyVFRhTUZvOFFYU3NrSUxxaWs1TE5CQ1VMYWZiSHZGeUlEM29JajhUMFZVVUJBT2hMTG9sWEwwcGhtY1V5bXpzWmtVMVNodElIaDdZVStramVYVjZ4L3llR2J3SzFKNUE1M0IvNjVraFBoWk8wK3RoRTJNR0lKQWZCY1QvQWdQTUdXYUdlRXNZbmVhZVZ4eDJBbXBFVDE1bFNtZWdvU2FmWWs3ckQ0MjVoaDN5RWd5THZXbWlXd1BTTTdXcDVjMytFc3J6T0VqR0V6aWZnQmRoYkRzbUc0R1NXQzdjRlR2VEJySGFCbVZhTVMzK3BEb1FzallMZ3BGUWlHNWhUSXR2eHEzVUhvUnkyWjR0TWhVblVkOG9JcU5ubU1TKzJ3dUZrMXJ0K041TlA2TXFwcnpYTUFFK0MybDdZVzZBQXBFY1FPai8rd3h3S09NQjZPMWp2WHNtMlR2dEdYQzVZNUxPSEpLbkI0eStJVVhCQVpnYUxvZnhRK21QT1hBNTdrSXcxbmdMNll6VVNJbDh6YlY0eGdVNmlYVEtBb2Jzd2lLZ1hkRGdHRW9CQkNWL0c0ajNraE5aVHMvZFg3UGNrT3NJdklmNHNvclBUalVhR3FJeUtrS2NJSlNqbWVFQ2dydkRIY2Z6TUE1c29FeUh2UWZUR3orUW40M3hqR0xuT1BjWVcwbjYwYUJwbWxtVTNJWUI0TC8vQmYyREFlYnpGZ09FT1NPaFJja0E3dTJMZXZkRVJtTUNtNFlHN2d5aHFBQS8zWDJ3L3Q0c3dBaEU1RG1rZVV3MGJBMkc5V1VPalZvM0liaEV2bWEvbHpaTUlyblNWeUIxMENNblFUT3lPdlFzdTg3ZjlMZTNFek9Bb2JmNFBwVzBWSHU1N2FjNXNhajV6bU5wYWxRUUxWa0RrSUpvQTVvNzFLem4wQUVWMnp6QUdHQzMrRHJGR0VSak0xd054WU9tVERySHJSV2g5ZzAyMmlZQldEeGU2WDhIQy9Rb3JVeGdnRHBmUlNZa29UZTg0N1hyTWJKYm1CYXRwQXJWYm1ub213RjJRbUZzdVhOMC9wdDJwTlRtV2wzV0lWdWloVVptNmxFVTRjdXE2WVk2SXZJMSs3MjRLUXZ2RUpqRklzYmN5aThCM0VmZzR5b0NMUENSK1J0QzlFSWJUUWxuaE1ScE9WT284cTRiTSs4eXVvVnBKckVmWGcrS3FJcHNkSVVpT3FkUmF4YWkyM3ArSUZFQTlISmxlalBkMmtZQ2paMTZrbUNHTHd2Zm14VkZOOUI2eEp4QXN2NEwrY0VBbThLRWNjKzBBSFcrQ2d5eVIwN3dCMGViME1BMzFxVzNsWlJ5blNBVHQwNGsvY2RwcWZKcWxJazJSRTIvWXFkdGUrOG93bWMwUW1waXl1MW4wQzBzY203OGdjVUFKalU1eWN1WU85M1FBNWdCOHlGNVR0ZTFwL1BoSXRqZWo0YU93NFN6bXlzMmtrVnZmU2dZb0lxTjBmUTB4WmxzaktsMEw1UDVIUVlyY2FIUi9jZTByQ3hmOU80eGxZanhkaVZQcUMwQms0d3A1d2V1QUxZd3NleUpTb29FWVdoQzdEUmhDRVdRektQT1Z4RUpTZlFINjIyeWRqMnNqTnpiakZWV2g1WnNHRU5BVEttSGpRRXROS1JzUGc5a2ZJeDYwdExwdGpaeUlJUzJCNXYwaEVhdzNyOUJ0alB5WC92Y0pqK05BdWZObkZtYkVkWnVRSkE1NW93RnZTZ29nWVdvY3YvaVlSUmtnTFpGeWd0R2lFYUZFOGRYR0tCL2xRR3N1dUM2bjVwVUxBRnpBb01pb25lZ2RTU2FBa0RBaWoxckp1L0FKR1RlOGk0amFVRnQwQnhrcHVuUkJONlVQbHVuOEQ4bEEzeWZZbGVKeVllOEFOQzVjbmZqaXBiK3dCSDhlTWRHS3lzRVE4N0hQbmtEYUxCaGczRUp5dEV4YWVrMjdOcExrdEh3SkZheUNwYUxzTXRDNzRYMW1NR1J1cFpaYXY4TmpQMllLTnFkYXkxd09aN0NrdDdpaFpBTjJYQWpJRUhPY05WM2FaSGxWbEVLeW90Ukkxc1pDdEQwS0p3anUxdWJBZVlGQTFnWW5PVlJkNkZ1U1ExWCtNOVRYbkVGMGVKR1o2d0RrWURQM3dWK0MwRFJNY0VIcnJqSlQ4eWY3ZFpObUNodnorMWt3dm1LMURESkFMWUJmbWNiNHdURGRFYW5Kam1Zb20xbXRGWFJsQUhUQ09hcjdWamZ3UUo3RnF0QVZnamxubnU4ak14dFl4LzRlK0EyZ1U1dU9ac0JxblRYRE1ZSG5obXVtUjRDdDVpeitNYlcrSVNKcGRhRGh2Q29kRFN1cVFPNTlGVnpKQ09EUGU1eDNuY0dnSXRYS2VGWmZWMExxbEswOGpveGRPby91ZFppcGdJemxBeVEybmM2aE5WYlJSRURrcUYxYXdZQVVSVzVCb2loaVhpK0N3WW5BRmZtYWdJWHVpWU1pNlhKVUorbjBLQmNFeU41UXdDZ2ljREhxcHhGMlhVUlVGRzlyQXpLMGtTTjh5dzA5NnIva2Fkc0JnT1VxektDZFkrL3Y0TDhxaFpTYWRoQS9PTTdrUVNXVmlzQThOUmZRQ3E2eC8xdzhLelpvRFhtdXNucFlUaDJsZllENVlyTUM2b3NBZmR6azlZS1ZBMWQwMENGZ0JyNTdRd1E4WmNKcDBGUDJib1JIYWxwYUp0Rkw3VHRnT0dTQWVReGE0am1Dd2JBc3FTL3N1STRjNTV4Q1NCUlhXVlpXUVVsMThpOG5BSk5hYW00YmN5R29SWkxTdHJFNlovMlJvaU5XY0crUWdBa0ErU2VGMHNyeWlUcjdDME15bkJPSE9tR2hMdUtwcHdIT24xTmZNTU1hOG9BbmpwMjhuYzdwcUxacHd4SHFPckFlcU1HYVVXbWRJZDBNR0Nra1ZuTW5xSmVFK1FBZFNPdWhPdUZCOFlhQXlnN1lHbE9hNFU1RU1rQWpIc01Ca2hBVForMHRKN2VPdjRyQVpzYVhsQW9jM01vQkhJMEdJQVpjbTBYZ0VkNFVqcTZsREV4dEpVNXozSnRmTEpOeTRnNFo5ZklNTGxodDI0cFVpZFNPMm4rZlZRZlFXamVSMGhscEdzUytwc0FZSXZNbjI2eHNGU0hrUjZHM1pycDJyWHU3a2crd295NWVFRWJLL2ptMUZCdkxFRHlQeWcyZUtUaVBFSnNPcnNWY3JsMk90aFkrcVR0OTNRYlc4aE82VGw3VHhZa1EyTDVmZzJnWHZjOUtuSnpqUUVZQXJSSUJyQzR4MUV3QU5Sc1BBdDI3YXpoczRpR0p6TEVSRDFZbWVGWFZHOGlycm03bDhtYnNXTXVwZ0diaXEycGs2ektlWlpFOWZ3VmhHdERub2VXOXNXdFZIVEJQUWhxaytaZTYxN25MUEpXNms5cDZRTXFHRUN1alQwdmErbW90VWE3ZFZoZ1VBYlR5bzBkcGF1YktYUG5nQU80WTFyRFV6dXh4R29iN3UwQU1sV2xQREE4TW1OVStDNDBXUUtvRmpubXBUY1hUeFhhdTFYUGU2eTZDMzVqemljRDZPTGVSTmtLUitKWERFRHgzb3NsWUt6dnRrMEdlR2Rkang3K2dScllEcVhsTnREVkZZTE5MWkI3eFdsTis1N0VGYU1qN0xkYkJqc1d4aWtsbWJSbG1mTnNHVVQxRERaRThZVkdoc2t0QktVeEpidEliZnhyMDF4T1FwTS9wU2tQL01EZmJmb2pRd2dwYUN1bVplVkJ0dzV3cjJGOHFYVFQ3clhXVGJEU24wcEs1S21mSzNhZjVZZTV0d1BJVkNPdFltT0VKRFlTQkNLOUZPK1dYV1hYcUlwa3oySzVjR0RHckNkcnRsb1YzcEVEVnFBVWVsZVVpdGFRM1o0aDZUSWdUeEdpWkFBWjY1SUJ3SmZnSW5RUi9sR0gwdUkxSUJRcG5XSGhaL0ZzWFJNM2J1R255VitabG50cHdONUxId0lTU1Vxanc1OEtlaEtWZVZlNGw2WkdocnhIY09RckIxUmRwSGJRSEVSSEE4bi84dzliK29DaVlRdFh4UFhBR2pjN2JiTGI1aUN5dnZpY1V3N0lWQWFzR1Eyc3Iwd043dVdZWEdVQThzdVIzQmlKSkpZbS83RFRKc3BPNkkrQ1M5aW5LKzlvSFY2aWNjeVVic1J1SE9OTTdIR0RWY0d4RVE0N2JPWjZNY0x0bURhajMzaEJUaEZuTlFORWtHcm00R2lGMG5KT2s2MURPaU5mWDZSc1ZTS25keSs5Z1JoUnV2b3h2MGd5bThpNS8wcWlNaGhnRXpQK3VOZDJoQkFYY3NyVng2S0wxUDRuU0s1TnpzTmZRbkw3aWI5Si8yem1md3dHd01lWTdZY3FxcW00NkZZeU1LUHpRTFV2Q0Y3c2pvbWZRcm4xd1RtRDVBWTk2MXdQTXNzMTBrSWNQcVZ6YmZHUUJJTWdiTkJZZ3FYdWxNTjJsdHJGdDRGcmVTRmluTEVONU9adzBNU21ueUFpQkE4eUU3dnRLUmJTc1REbFBSaWdId3hBbUdnbmttTFdvYlNjMDF6WVFqcnZxWUFyaWF2Z08yNi9wdHhHeTBFUWRiUHhXU3cwS3lleWRpZFJxYlJSYlJPNjV1dzJtcmE3U0czOEMxY2ZpQjRrMTUvUzhhODArb0N5TWRFdEdXQVltam03VnpBb2U5WVhzeXFEQTFqamg4QksxZk9GMmhBRHpicmMrRUlzV1BDVys4YzZTak9ac21mTExFSTRtTm8rNTF3cHVERThLS3JZa2xTd1lMVkJwYytXMTRjUjBPanFOY1JHNk1zd3EwL2JxaUJmNGptK1p4c3FiQ3dZSGpEUmJpUlNqRkRhbk5PeHBYWUtNN1JneW1tTmpHalcwSkdTR3o3UTBNUVJqdWNUZVcrdEZ1UmNJYjVyZVk2L2JVYXpoMTFWK3hkUy9sOXYvMFg3Ri8rWkM1RDBaL09zbjJBQWwzV1BHRE5yVVh4Z1FybU9LTThGSzMzREpQZit3cTJlaW9GRksyWEdXbkhWb1JqY3YzSXBieXg2MjMwWm1qRmNiSjlaTVpjYnd5ai95YjA4TVB5c0xrZm5ZMmZIZmx6S2tFL3NwMGVsWFZFL0pITjhVMkhqejh5R21Va3hsOWRpZG5ScXBuVG1Ca3Y5SEpqV1h6NXhaeVEwSmJlYVJGTVI1eXlPaVp6ZFNWUW83aDY1azJzNC9maVU2VlZYMlpUT1JuZVMvSC8rNTMvUTh6OUIvbXdjV0t2MHF2dmR0RlZ6QjR6R21XTWVTd1hVZkpEK2pJTUEvYmtNRkF3Z3Z5Z0FNS3FBaW5BcDczdVFlQ0ExRkxmWWd3NUEyeDBhcmF4a1ZLVlpKRGt4UDhZdys1bUM3TlV5K3lFaEl6MExwR3prcjRxUURJVGtSamJNdDB5S3FTYnNxbUdTZjVYUytmOG43MnhiNGdpQ0lCd1NBU0VTQ0w3bElCd1lEd0luOS8vL1hxYjdxYnFhMmZzVVJCQ3RqWHR1YVFDczdkbCttOTRTcUIzd1BXWk44TFh2cnlKS1JOUkYwOFVUUHk2R0RJMmsrU2JydVNHVGhna1ZSSFBoTkNRL0RmUjN5TDhnZjJydEhrMVdFbnFKZzhsQjF2UC9tVGU5MWwrNGE2UjVBdHhOZy9NRzFTNUFoUWUxMm51bVRMK0xWQTRaQ2IzYSszM3JGK2xpN3dLM1NhdUtoRFR5OXFxS3R1RlQ2L2RvejlRV0JTYll6WjJ5REtudCtnWWZLbVFPUzg0UnhRL0w2dXgxZTQ2MkRnaTlxTHUxNGdLR0hENnF5b2REMzZ6bmVvYTNlUy9VQ25RK2JRWFA5eGMzUU9QNXZzNUwzMCtRaVFuZTAvSGtPNEJ3c1kzL0NYY3ZvelA3RmlBOGNJS3RudEIzL2RwSDdZSmxSQjk3Z3ZINGR0ajdJMGM2RHdZODlwdWFCYW5Kb3NMVDdlTktGaFZJQkM2RmJ6VEJPQTRiNVF3WE8vcE04TVZ6MkhBcnJWWm5WRzM5K0pZTGZMczZEVVRjYUZvZmtUR0dERzBVTDdjdDYvbFJ4bzA1WDFEQmwvOUMyV2tlQVJpYyszNEN1Y2FVMy9IL2ZBYzRFWFJmcjgxVlBwQ2FwWk9BZC9VejdZRFR5SVhIVWU4WXAxYmJRem9MdUpwNkJ3TmdFMFZhUm02eXNZVTdZUEEzNGUyWE1VNjZyZzg0WjBqckNjWndyT3hNUnUzV1VqNUlwc21jYzFoeFpNYVVIVzRsMnRLQmdodDFpeHVRWmlXaSthYUJQcHM1VHM5d1lPTmVxVmVnRk4wNGdVN1pQaTVJNnFYMTEvdmUwNENXSk1DMXhtZTdERkR0LzU1S0lIL2hhZ3p6MGFCUHQyeVJFS1BQRzhLZ1l6WUQ5MXZYdHNab0M0L2hUdkYwdTE4NFo2MnNKaGlMSzloYjIvTktDRDRUcU9YSUtvM0M4Y2ZXYU11SEVISHI1OGhyR2JGanMraXBjMkdjbzNnaFVpL1U2MUR4M29EQ1FQZWh1dStIak94WFhHUFgwWHNTWDNtQ3kxdFBrd2FrMTE0OStkZEVpTDkwQTZqQi8vdklNWGd3NmRTbjM3c292SW9IUDVNNzVmU2JvaFpoMUliSEwzTm9oWkRPakRjZzRleXRKUUJMTXMxSyt4UjNHL1BHWkdGaXZzS2dXYmxSdDNWRlVqUzFpQllkcVNlMDJhUHYyMElaSHllQ2NJdmM5OU55Vno1TnJqR3Z3YnF0bVc0ZEMxQ0NZWXR3Q2dHOFdXSHZWb0F1YlkydFF2UmU2ZFVvWTlTK1J4TWZXTFNkRUV0MGJUamREUkR0L0FEV2s5cDgvTElJV1V3b1lpdHhmN2VKMHpuYzF1R1RaY2JXYmJPcjUvMGlsZnM2MmlKdUhQR2dXTDZnQTY3ZkhyVnhZazRGRS9EU1R6Q25ndHMxVnBhbDlPODJOQWI4YWtoQVNvR2QrRWd6VU5jRXJqekdpTUtHMmtMeDVWaTBrOXFHT0VQKzk0V0JPb3phOG12ZXBCQ0I2NEQwbzl5WGpTVzRCaTg1b1NxV2JadkZoakZycm15N0lsQTNxcjQzRER2ZGJQTGVQYWlmUUsxbzJsMVFham5MVWtYQWJxTHRFZDhhRXpJMUF4QUV1d0djblhnYUI2LzBHSHF6U1ZHNTdxemFUVXp3U3U1RENuVVlOZFB3Yzk0a1VUVGExa2U0WEY3bTBvNDJaWi9xd0lJbHNWVzl0R3ErM2oxU0RuYmxTNitNN1dhdWVvYVR1YS9aT3BTRDFZbENKUDZOZ1diWjVacDJJRXlSa0ZtM1FDLzRYUVpEYkFTWHM3VWt4RXhzRFQ2SGRIVStKTHkwaFFYOEdrdzRRbXVrdHZzV3hOcXhaWjBXUS80NE9Cd3lST1pIZGN3K3VQNmsvVWphNDdFYnhxdE9GUHlCdVFybS9rQ3QxcGdvTXFvenFGL2FreklZS2JMTE5kdi9kYlgzWkVsaW9ZbWtReWRQWnRpQVE5US9jYkJjcmtCOTJ6S25qd3FVcHZKVmhzM3UwWEt0dENQUmV6d3dXcHlEOGdkY0JTTXhUc2NaWHZpOEVyTzgvOG1DWDF4QWJXUEpoeVc2WGcwYjhlYkhNV0ZVYVBQYkpBbHhGVEFKVnpTV3ZnTDVQd2U2ZDB5VkwvYktseEhqaE0zdHhPT2FCemZWTDR3ZVlQMVorOUhMdXM3VmJNcGdRWDQxY0R3ZEF2VUZiRm9LbFhCYlBuN1pTNUtpaTdSTkp0RGlFamgvK29td3ZwQkxRZGM1REVzVHcyNE95M1JyQkxRVFcvNnN4TG9Gc3VCajNvR1VUY29rQkladGJyVlNhWVNPSzI4Vy9HdnZERlliaUdFZ2FnaHRvYWVrbDNhaHAxd0tZZnYvdjFka1dYNmFRQytGd0pycU9SZjdhbHZ4V3FOeEM2SnZEZWorVzB4OHBGeENFSVNqRUpmcEkxWGlCMy9BZDJ6TXFZZllDQU1TOEFOaU5qY21rZGpRZitXNWwrT1hZZlF2VTFuWW9VN2FLUVJCM3ZjVWkxbVA1WmRuL2RNZnpsUWQzc2hZc0FSU3dHZXlwMENCQ3pIdVRJVEhSZVhDYThoZzNnU2Y4ME96cG9aOVpZQ1h5Qnl0TzQ1SXpCSUlTRjB5dGI5Y2lMSFpIenIzaGV0djFhb0FRWkFSTXQyY0ZWTFJ0RGdQM1BhOUJTTnZLUUdmeSs0amJPeWlLL0EvYUtQZ2hlSlY1RDBwTDZ4bEUzZldFM3VEYjFKZXh1RStyNHF1M0FNcGREZkVDZGRnQVR4Tk1KL3hDQUI4Z3lGSU94cTFBSjRoTDRCT0Z2Z1psTDBoMlhsM1cwMnNKNEIvZUtNZGpzSWY2UVFyVTN6QndrWmZ4aldpNXA1VFlkaHFmbUk5c1FZRnNuQXdrVmMyc1VMZ04raXVHMGp4c05YRWUyUUZDZ3BEQk52TTJOako2L2lPbGJxNWpuWTJ5d1A2L0srMkFBcXZkTkxOdkczWnlESUVmcWZBOHJySUxKTm9oeVBBQ2hRVWg0SnZabkdZRDRIZjVMSzVSQTg4RDdoV0FDaFFCQWxkMDVGSFhlRDNGaU9iRjBYZGllYXhudGpiU2hTMmxhVmRoN25YTmZwRDRHY2pXaFNWK1VyV0V3dFIvQUJ0d3pZbStJeFNsd0FBQUFCSlJVNUVya0pnZ2c9PWA7XG4gIHJldHVybiBpbWFnZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZudCgpe1xuICByZXR1cm4gYGluZm8gZmFjZT1cIlJvYm90b1wiIHNpemU9MTkyIGJvbGQ9MCBpdGFsaWM9MCBjaGFyc2V0PVwiXCIgdW5pY29kZT0xIHN0cmV0Y2hIPTEwMCBzbW9vdGg9MSBhYT0xIHBhZGRpbmc9MjQsMjQsMjQsMjQgc3BhY2luZz0xMiwxMiBvdXRsaW5lPTBcbmNvbW1vbiBsaW5lSGVpZ2h0PTE5MiBiYXNlPTE1MiBzY2FsZVc9MzA3MiBzY2FsZUg9MTUzNiBwYWdlcz0xIHBhY2tlZD0wIGFscGhhQ2hubD0wIHJlZENobmw9NCBncmVlbkNobmw9NCBibHVlQ2hubD00XG5wYWdlIGlkPTAgZmlsZT1cInJvYm90b18wLnBuZ1wiXG5jaGFycyBjb3VudD0xOTRcbmNoYXIgaWQ9MCAgICB4PTYzNiAgIHk9MTQzOCAgd2lkdGg9NDggICAgaGVpZ2h0PTQ5ICAgIHhvZmZzZXQ9LTI0ICAgeW9mZnNldD0xNjcgICB4YWR2YW5jZT0wICAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MiAgICB4PTU3NiAgIHk9MTQzOCAgd2lkdGg9NDggICAgaGVpZ2h0PTQ5ICAgIHhvZmZzZXQ9LTI0ICAgeW9mZnNldD0xNjcgICB4YWR2YW5jZT0wICAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTMgICB4PTQ1MCAgIHk9MTQzOSAgd2lkdGg9NTEgICAgaGVpZ2h0PTQ5ICAgIHhvZmZzZXQ9LTI1ICAgeW9mZnNldD0xNjcgICB4YWR2YW5jZT00MCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MzIgICB4PTI5ODcgIHk9MTI0MiAgd2lkdGg9NTEgICAgaGVpZ2h0PTQ5ICAgIHhvZmZzZXQ9LTI1ICAgeW9mZnNldD0xNjcgICB4YWR2YW5jZT00MCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MzMgICB4PTE3MTQgIHk9NzY5ICAgd2lkdGg9NjYgICAgaGVpZ2h0PTE2MyAgIHhvZmZzZXQ9LTEyICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT00MSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MzQgICB4PTE5OTkgIHk9MTI2MyAgd2lkdGg9ODEgICAgaGVpZ2h0PTg3ICAgIHhvZmZzZXQ9LTE0ICAgeW9mZnNldD04ICAgICB4YWR2YW5jZT01MSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MzUgICB4PTEyMTQgIHk9OTUxICAgd2lkdGg9MTM2ICAgaGVpZ2h0PTE2MiAgIHhvZmZzZXQ9LTE1ICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT05OSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MzYgICB4PTE2MTAgIHk9MCAgICAgd2lkdGg9MTIyICAgaGVpZ2h0PTE5NiAgIHhvZmZzZXQ9LTE2ICAgeW9mZnNldD0tNCAgICB4YWR2YW5jZT05MCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MzcgICB4PTEzNDEgIHk9NTk1ICAgd2lkdGg9MTUyICAgaGVpZ2h0PTE2NSAgIHhvZmZzZXQ9LTE3ICAgeW9mZnNldD0xMyAgICB4YWR2YW5jZT0xMTcgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MzggICB4PTE2NTggIHk9NTkyICAgd2lkdGg9MTQxICAgaGVpZ2h0PTE2NSAgIHhvZmZzZXQ9LTE3ICAgeW9mZnNldD0xMyAgICB4YWR2YW5jZT05OSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MzkgICB4PTIwOTIgIHk9MTI2MyAgd2lkdGg9NjIgICAgaGVpZ2h0PTg1ICAgIHhvZmZzZXQ9LTE3ICAgeW9mZnNldD04ICAgICB4YWR2YW5jZT0yOCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9NDAgICB4PTEwMyAgIHk9MCAgICAgd2lkdGg9OTAgICAgaGVpZ2h0PTIxMyAgIHhvZmZzZXQ9LTE0ICAgeW9mZnNldD0wICAgICB4YWR2YW5jZT01NSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9NDEgICB4PTAgICAgIHk9MCAgICAgd2lkdGg9OTEgICAgaGVpZ2h0PTIxMyAgIHhvZmZzZXQ9LTIyICAgeW9mZnNldD0wICAgICB4YWR2YW5jZT01NiAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9NDIgICB4PTY2NCAgIHk9MTI5NCAgd2lkdGg9MTE0ICAgaGVpZ2h0PTExNCAgIHhvZmZzZXQ9LTIzICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT02OSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9NDMgICB4PTAgICAgIHk9MTMxNyAgd2lkdGg9MTI4ICAgaGVpZ2h0PTEyOSAgIHhvZmZzZXQ9LTE5ICAgeW9mZnNldD0zNCAgICB4YWR2YW5jZT05MSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9NDQgICB4PTE5MTYgIHk9MTI2NCAgd2lkdGg9NzEgICAgaGVpZ2h0PTg4ICAgIHhvZmZzZXQ9LTIyICAgeW9mZnNldD0xMTEgICB4YWR2YW5jZT0zMSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9NDUgICB4PTIzMyAgIHk9MTQ1NyAgd2lkdGg9ODggICAgaGVpZ2h0PTYwICAgIHhvZmZzZXQ9LTIyICAgeW9mZnNldD03NCAgICB4YWR2YW5jZT00NCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9NDYgICB4PTI4MjggIHk9MTI0NSAgd2lkdGg9NjggICAgaGVpZ2h0PTY1ICAgIHhvZmZzZXQ9LTE0ICAgeW9mZnNldD0xMTIgICB4YWR2YW5jZT00MiAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9NDcgICB4PTAgICAgIHk9NDI5ICAgd2lkdGg9MTA5ICAgaGVpZ2h0PTE3MiAgIHhvZmZzZXQ9LTIzICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT02NiAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9NDggICB4PTIzOTIgIHk9NTgzICAgd2lkdGg9MTIyICAgaGVpZ2h0PTE2NSAgIHhvZmZzZXQ9LTE2ICAgeW9mZnNldD0xMyAgICB4YWR2YW5jZT05MCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9NDkgICB4PTExMiAgIHk9MTE0MyAgd2lkdGg9OTMgICAgaGVpZ2h0PTE2MiAgIHhvZmZzZXQ9LTExICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT05MCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9NTAgICB4PTE0NDMgIHk9NzcyICAgd2lkdGg9MTI2ICAgaGVpZ2h0PTE2MyAgIHhvZmZzZXQ9LTE3ICAgeW9mZnNldD0xMyAgICB4YWR2YW5jZT05MCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9NTEgICB4PTI2NjAgIHk9NTc1ICAgd2lkdGg9MTIxICAgaGVpZ2h0PTE2NSAgIHhvZmZzZXQ9LTE3ICAgeW9mZnNldD0xMyAgICB4YWR2YW5jZT05MCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9NTIgICB4PTE3OTQgIHk9OTQzICAgd2lkdGg9MTMyICAgaGVpZ2h0PTE2MiAgIHhvZmZzZXQ9LTIxICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT05MCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9NTMgICB4PTUzOSAgIHk9Nzc5ICAgd2lkdGg9MTIxICAgaGVpZ2h0PTE2NCAgIHhvZmZzZXQ9LTEzICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT05MCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9NTQgICB4PTQwNiAgIHk9Nzc5ICAgd2lkdGg9MTIxICAgaGVpZ2h0PTE2NCAgIHhvZmZzZXQ9LTE0ICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT05MCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9NTUgICB4PTIwODIgIHk9OTQxICAgd2lkdGg9MTI3ICAgaGVpZ2h0PTE2MiAgIHhvZmZzZXQ9LTE5ICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT05MCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9NTYgICB4PTI1MjYgIHk9NTgxICAgd2lkdGg9MTIyICAgaGVpZ2h0PTE2NSAgIHhvZmZzZXQ9LTE2ICAgeW9mZnNldD0xMyAgICB4YWR2YW5jZT05MCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9NTcgICB4PTE1ODEgIHk9NzcxICAgd2lkdGg9MTIxICAgaGVpZ2h0PTE2MyAgIHhvZmZzZXQ9LTE3ICAgeW9mZnNldD0xMyAgICB4YWR2YW5jZT05MCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9NTggICB4PTIzODMgIHk9MTExMyAgd2lkdGg9NjcgICAgaGVpZ2h0PTEzNCAgIHhvZmZzZXQ9LTE0ICAgeW9mZnNldD00MyAgICB4YWR2YW5jZT0zOSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9NTkgICB4PTM3MiAgIHk9MTE0MCAgd2lkdGg9NzMgICAgaGVpZ2h0PTE1NiAgIHhvZmZzZXQ9LTIyICAgeW9mZnNldD00MyAgICB4YWR2YW5jZT0zNCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9NjAgICB4PTUzOSAgIHk9MTMwNyAgd2lkdGg9MTEzICAgaGVpZ2h0PTExOSAgIHhvZmZzZXQ9LTE5ICAgeW9mZnNldD00MiAgICB4YWR2YW5jZT04MSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9NjEgICB4PTE2ODggIHk9MTI2OSAgd2lkdGg9MTE1ICAgaGVpZ2h0PTkzICAgIHhvZmZzZXQ9LTEzICAgeW9mZnNldD01MSAgICB4YWR2YW5jZT04OCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9NjIgICB4PTQxMSAgIHk9MTMwOCAgd2lkdGg9MTE2ICAgaGVpZ2h0PTExOSAgIHhvZmZzZXQ9LTE0ICAgeW9mZnNldD00MiAgICB4YWR2YW5jZT04NCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9NjMgICB4PTgwMCAgIHk9Nzc5ICAgd2lkdGg9MTEzICAgaGVpZ2h0PTE2NCAgIHhvZmZzZXQ9LTE5ICAgeW9mZnNldD0xMyAgICB4YWR2YW5jZT03NiAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9NjQgICB4PTE0MjEgIHk9MCAgICAgd2lkdGg9MTc3ICAgaGVpZ2h0PTE5NiAgIHhvZmZzZXQ9LTE2ICAgeW9mZnNldD0xNiAgICB4YWR2YW5jZT0xNDQgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9NjUgICB4PTI3MDggIHk9NzUyICAgd2lkdGg9MTUwICAgaGVpZ2h0PTE2MiAgIHhvZmZzZXQ9LTIzICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT0xMDQgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9NjYgICB4PTIyMjEgIHk9OTM5ICAgd2lkdGg9MTI3ICAgaGVpZ2h0PTE2MiAgIHhvZmZzZXQ9LTEyICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT0xMDAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9NjcgICB4PTE4MTEgIHk9NTkyICAgd2lkdGg9MTM3ICAgaGVpZ2h0PTE2NSAgIHhvZmZzZXQ9LTE1ICAgeW9mZnNldD0xMyAgICB4YWR2YW5jZT0xMDQgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9NjggICB4PTE2NTAgIHk9OTQ2ICAgd2lkdGg9MTMyICAgaGVpZ2h0PTE2MiAgIHhvZmZzZXQ9LTEyICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT0xMDUgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9NjkgICB4PTI0OTYgIHk9OTM0ICAgd2lkdGg9MTIyICAgaGVpZ2h0PTE2MiAgIHhvZmZzZXQ9LTEyICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT05MSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9NzAgICB4PTI2MzAgIHk9OTMyICAgd2lkdGg9MTIwICAgaGVpZ2h0PTE2MiAgIHhvZmZzZXQ9LTEyICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT04OCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9NzEgICB4PTE5NjAgIHk9NTkwICAgd2lkdGg9MTM3ICAgaGVpZ2h0PTE2NSAgIHhvZmZzZXQ9LTE1ICAgeW9mZnNldD0xMyAgICB4YWR2YW5jZT0xMDkgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9NzIgICB4PTkxNiAgIHk9OTU1ICAgd2lkdGg9MTM3ICAgaGVpZ2h0PTE2MiAgIHhvZmZzZXQ9LTEyICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT0xMTQgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9NzMgICB4PTI5NiAgIHk9MTE0MiAgd2lkdGg9NjQgICAgaGVpZ2h0PTE2MiAgIHhvZmZzZXQ9LTEwICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT00NCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9NzQgICB4PTI3MiAgIHk9NzkwICAgd2lkdGg9MTIyICAgaGVpZ2h0PTE2NCAgIHhvZmZzZXQ9LTIxICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT04OCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9NzUgICB4PTc2NyAgIHk9OTU1ICAgd2lkdGg9MTM3ICAgaGVpZ2h0PTE2MiAgIHhvZmZzZXQ9LTEyICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT0xMDAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9NzYgICB4PTI3NjIgIHk9OTI2ICAgd2lkdGg9MTE5ICAgaGVpZ2h0PTE2MiAgIHhvZmZzZXQ9LTEyICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT04NiAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9NzcgICB4PTIxOTcgIHk9NzY1ICAgd2lkdGg9MTYzICAgaGVpZ2h0PTE2MiAgIHhvZmZzZXQ9LTEyICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT0xNDAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9NzggICB4PTEwNjUgIHk9OTUyICAgd2lkdGg9MTM3ICAgaGVpZ2h0PTE2MiAgIHhvZmZzZXQ9LTEyICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT0xMTQgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9NzkgICB4PTE1MDUgIHk9NTk0ICAgd2lkdGg9MTQxICAgaGVpZ2h0PTE2NSAgIHhvZmZzZXQ9LTE2ICAgeW9mZnNldD0xMyAgICB4YWR2YW5jZT0xMTAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9ODAgICB4PTE5MzggIHk9OTQzICAgd2lkdGg9MTMyICAgaGVpZ2h0PTE2MiAgIHhvZmZzZXQ9LTEyICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT0xMDEgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9ODEgICB4PTIyMjIgIHk9MjA3ICAgd2lkdGg9MTQxICAgaGVpZ2h0PTE4MyAgIHhvZmZzZXQ9LTE2ICAgeW9mZnNldD0xMyAgICB4YWR2YW5jZT0xMTAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9ODIgICB4PTEzNjIgIHk9OTQ5ICAgd2lkdGg9MTMyICAgaGVpZ2h0PTE2MiAgIHhvZmZzZXQ9LTExICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT05OSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9ODMgICB4PTIxMDkgIHk9NTg4ICAgd2lkdGg9MTMyICAgaGVpZ2h0PTE2NSAgIHhvZmZzZXQ9LTE4ICAgeW9mZnNldD0xMyAgICB4YWR2YW5jZT05NSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9ODQgICB4PTYxNyAgIHk9OTU1ICAgd2lkdGg9MTM4ICAgaGVpZ2h0PTE2MiAgIHhvZmZzZXQ9LTIxICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT05NSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9ODUgICB4PTEyOCAgIHk9NzkyICAgd2lkdGg9MTMyICAgaGVpZ2h0PTE2NCAgIHhvZmZzZXQ9LTE0ICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT0xMDQgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9ODYgICB4PTI4NzAgIHk9NzQ5ICAgd2lkdGg9MTQ3ICAgaGVpZ2h0PTE2MiAgIHhvZmZzZXQ9LTIyICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT0xMDIgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9ODcgICB4PTIwMDIgIHk9NzY3ICAgd2lkdGg9MTgzICAgaGVpZ2h0PTE2MiAgIHhvZmZzZXQ9LTIwICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT0xNDIgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9ODggICB4PTMxMiAgIHk9OTY2ICAgd2lkdGg9MTQxICAgaGVpZ2h0PTE2MiAgIHhvZmZzZXQ9LTIwICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT0xMDAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9ODkgICB4PTE1NyAgIHk9OTY4ICAgd2lkdGg9MTQzICAgaGVpZ2h0PTE2MiAgIHhvZmZzZXQ9LTI0ICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT05NiAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9OTAgICB4PTE1MDYgIHk9OTQ3ICAgd2lkdGg9MTMyICAgaGVpZ2h0PTE2MiAgIHhvZmZzZXQ9LTE4ICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT05NiAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9OTEgICB4PTY1OCAgIHk9MCAgICAgd2lkdGg9NzkgICAgaGVpZ2h0PTIwMiAgIHhvZmZzZXQ9LTEzICAgeW9mZnNldD0tMiAgICB4YWR2YW5jZT00MiAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9OTIgICB4PTI5NDUgIHk9MjA0ICAgd2lkdGg9MTExICAgaGVpZ2h0PTE3MiAgIHhvZmZzZXQ9LTIyICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT02NiAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9OTMgICB4PTU2NyAgIHk9MCAgICAgd2lkdGg9NzkgICAgaGVpZ2h0PTIwMiAgIHhvZmZzZXQ9LTI0ICAgeW9mZnNldD0tMiAgICB4YWR2YW5jZT00MiAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9OTQgICB4PTE1NzAgIHk9MTI3MSAgd2lkdGg9MTA2ICAgaGVpZ2h0PTEwNSAgIHhvZmZzZXQ9LTIwICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT02NyAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9OTUgICB4PTAgICAgIHk9MTQ1OCAgd2lkdGg9MTIxICAgaGVpZ2h0PTYwICAgIHhvZmZzZXQ9LTI0ICAgeW9mZnNldD0xMjggICB4YWR2YW5jZT03MiAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9OTYgICB4PTI2MjIgIHk9MTI1OCAgd2lkdGg9ODIgICAgaGVpZ2h0PTcxICAgIHhvZmZzZXQ9LTIwICAgeW9mZnNldD04ICAgICB4YWR2YW5jZT00OSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9OTcgICB4PTE1ODUgIHk9MTEyMSAgd2lkdGg9MTE5ICAgaGVpZ2h0PTEzNiAgIHhvZmZzZXQ9LTE2ICAgeW9mZnNldD00MiAgICB4YWR2YW5jZT04NyAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9OTggICB4PTY3NyAgIHk9NDE4ICAgd2lkdGg9MTIxICAgaGVpZ2h0PTE3MCAgIHhvZmZzZXQ9LTE0ICAgeW9mZnNldD04ICAgICB4YWR2YW5jZT05MCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9OTkgICB4PTE0NTMgIHk9MTEyMyAgd2lkdGg9MTIwICAgaGVpZ2h0PTEzNiAgIHhvZmZzZXQ9LTE3ICAgeW9mZnNldD00MiAgICB4YWR2YW5jZT04NCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTAwICB4PTEyMDkgIHk9NDEzICAgd2lkdGg9MTIwICAgaGVpZ2h0PTE3MCAgIHhvZmZzZXQ9LTE3ICAgeW9mZnNldD04ICAgICB4YWR2YW5jZT05MCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTAxICB4PTEzMjAgIHk9MTEyNSAgd2lkdGg9MTIxICAgaGVpZ2h0PTEzNiAgIHhvZmZzZXQ9LTE3ICAgeW9mZnNldD00MiAgICB4YWR2YW5jZT04NSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTAyICB4PTE4NjYgIHk9NDA4ICAgd2lkdGg9MTAxICAgaGVpZ2h0PTE3MCAgIHhvZmZzZXQ9LTIwICAgeW9mZnNldD02ICAgICB4YWR2YW5jZT01NiAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTAzICB4PTEzNCAgIHk9NjEyICAgd2lkdGg9MTIxICAgaGVpZ2h0PTE2NyAgIHhvZmZzZXQ9LTE3ICAgeW9mZnNldD00MiAgICB4YWR2YW5jZT05MCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTA0ICB4PTI2MjcgIHk9Mzk1ICAgd2lkdGg9MTE2ICAgaGVpZ2h0PTE2OCAgIHhvZmZzZXQ9LTE0ICAgeW9mZnNldD04ICAgICB4YWR2YW5jZT04OCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTA1ICB4PTEwNTAgIHk9Nzc2ICAgd2lkdGg9NjcgICAgaGVpZ2h0PTE2NCAgIHhvZmZzZXQ9LTE0ICAgeW9mZnNldD0xMiAgICB4YWR2YW5jZT0zOSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTA2ICB4PTEzMjcgIHk9MCAgICAgd2lkdGg9ODIgICAgaGVpZ2h0PTE5OCAgIHhvZmZzZXQ9LTMwICAgeW9mZnNldD0xMiAgICB4YWR2YW5jZT0zOCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTA3ICB4PTI0OTUgIHk9NDAxICAgd2lkdGg9MTIwICAgaGVpZ2h0PTE2OCAgIHhvZmZzZXQ9LTE0ICAgeW9mZnNldD04ICAgICB4YWR2YW5jZT04MSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTA4ICB4PTI3NTUgIHk9MzkyICAgd2lkdGg9NjQgICAgaGVpZ2h0PTE2OCAgIHhvZmZzZXQ9LTEzICAgeW9mZnNldD04ICAgICB4YWR2YW5jZT0zOSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTA5ICB4PTE5NzMgIHk9MTExNyAgd2lkdGg9MTY4ICAgaGVpZ2h0PTEzNCAgIHhvZmZzZXQ9LTE0ICAgeW9mZnNldD00MiAgICB4YWR2YW5jZT0xNDAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTEwICB4PTIxNTMgIHk9MTExNSAgd2lkdGg9MTE2ICAgaGVpZ2h0PTEzNCAgIHhvZmZzZXQ9LTE0ICAgeW9mZnNldD00MiAgICB4YWR2YW5jZT04OCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTExICB4PTExODEgIHk9MTEyNiAgd2lkdGg9MTI3ICAgaGVpZ2h0PTEzNiAgIHhvZmZzZXQ9LTE4ICAgeW9mZnNldD00MiAgICB4YWR2YW5jZT05MSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTEyICB4PTI2NyAgIHk9NjExICAgd2lkdGg9MTIxICAgaGVpZ2h0PTE2NyAgIHhvZmZzZXQ9LTE0ICAgeW9mZnNldD00MiAgICB4YWR2YW5jZT05MCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTEzICB4PTQwMCAgIHk9NjAwICAgd2lkdGg9MTIwICAgaGVpZ2h0PTE2NyAgIHhvZmZzZXQ9LTE3ICAgeW9mZnNldD00MiAgICB4YWR2YW5jZT05MSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTE0ICB4PTIyODEgIHk9MTExMyAgd2lkdGg9OTAgICAgaGVpZ2h0PTEzNCAgIHhvZmZzZXQ9LTE0ICAgeW9mZnNldD00MiAgICB4YWR2YW5jZT01NCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTE1ICB4PTE3MTYgIHk9MTEyMCAgd2lkdGg9MTE3ICAgaGVpZ2h0PTEzNiAgIHhvZmZzZXQ9LTE3ICAgeW9mZnNldD00MiAgICB4YWR2YW5jZT04MyAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTE2ICB4PTQ1NyAgIHk9MTE0MCAgd2lkdGg9OTUgICAgaGVpZ2h0PTE1NSAgIHhvZmZzZXQ9LTI0ICAgeW9mZnNldD0yMyAgICB4YWR2YW5jZT01MiAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTE3ICB4PTE4NDUgIHk9MTExNyAgd2lkdGg9MTE2ICAgaGVpZ2h0PTEzNSAgIHhvZmZzZXQ9LTE0ICAgeW9mZnNldD00MyAgICB4YWR2YW5jZT04OCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTE4ICB4PTI3NzIgIHk9MTEwMCAgd2lkdGg9MTIyICAgaGVpZ2h0PTEzMyAgIHhvZmZzZXQ9LTIyICAgeW9mZnNldD00MyAgICB4YWR2YW5jZT03OCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTE5ICB4PTI0NjIgIHk9MTExMyAgd2lkdGg9MTYzICAgaGVpZ2h0PTEzMyAgIHhvZmZzZXQ9LTIyICAgeW9mZnNldD00MyAgICB4YWR2YW5jZT0xMjAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTIwICB4PTI2MzcgIHk9MTEwNiAgd2lkdGg9MTIzICAgaGVpZ2h0PTEzMyAgIHhvZmZzZXQ9LTIyICAgeW9mZnNldD00MyAgICB4YWR2YW5jZT03OSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTIxICB4PTAgICAgIHk9NjEzICAgd2lkdGg9MTIyICAgaGVpZ2h0PTE2NyAgIHhvZmZzZXQ9LTIzICAgeW9mZnNldD00MyAgICB4YWR2YW5jZT03NiAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTIyICB4PTI5MDYgIHk9MTA5NyAgd2lkdGg9MTE3ICAgaGVpZ2h0PTEzMyAgIHhvZmZzZXQ9LTE4ICAgeW9mZnNldD00MyAgICB4YWR2YW5jZT03OSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTIzICB4PTQ1OCAgIHk9MCAgICAgd2lkdGg9OTcgICAgaGVpZ2h0PTIwMiAgIHhvZmZzZXQ9LTIwICAgeW9mZnNldD0zICAgICB4YWR2YW5jZT01NCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTI0ICB4PTI0NTEgIHk9MjA2ICAgd2lkdGg9NjEgICAgaGVpZ2h0PTE4MyAgIHhvZmZzZXQ9LTExICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT0zOSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTI1ICB4PTM0OSAgIHk9MCAgICAgd2lkdGg9OTcgICAgaGVpZ2h0PTIwMiAgIHhvZmZzZXQ9LTIzICAgeW9mZnNldD0zICAgICB4YWR2YW5jZT01NCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTI2ICB4PTIzNzggIHk9MTI1OSAgd2lkdGg9MTM4ICAgaGVpZ2h0PTc5ICAgIHhvZmZzZXQ9LTE0ICAgeW9mZnNldD02NSAgICB4YWR2YW5jZT0xMDkgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTYwICB4PTUxMyAgIHk9MTQzOSAgd2lkdGg9NTEgICAgaGVpZ2h0PTQ5ICAgIHhvZmZzZXQ9LTI1ICAgeW9mZnNldD0xNjcgICB4YWR2YW5jZT00MCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTYxICB4PTIxNyAgIHk9MTE0MiAgd2lkdGg9NjcgICAgaGVpZ2h0PTE2MiAgIHhvZmZzZXQ9LTE0ICAgeW9mZnNldD00MiAgICB4YWR2YW5jZT0zOSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTYyICB4PTEzNDEgIHk9NDEzICAgd2lkdGg9MTIwICAgaGVpZ2h0PTE3MCAgIHhvZmZzZXQ9LTE2ICAgeW9mZnNldD0yNSAgICB4YWR2YW5jZT04OCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTYzICB4PTEzMDAgIHk9Nzc0ICAgd2lkdGg9MTMxICAgaGVpZ2h0PTE2MyAgIHhvZmZzZXQ9LTE4ICAgeW9mZnNldD0xMyAgICB4YWR2YW5jZT05MyAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTY0ICB4PTcwMiAgIHk9MTEyOSAgd2lkdGg9MTQ5ICAgaGVpZ2h0PTE0OSAgIHhvZmZzZXQ9LTE3ICAgeW9mZnNldD0zMCAgICB4YWR2YW5jZT0xMTQgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTY1ICB4PTQ2NSAgIHk9OTU1ICAgd2lkdGg9MTQwICAgaGVpZ2h0PTE2MiAgIHhvZmZzZXQ9LTIyICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT05NyAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTY2ICB4PTIzNzUgIHk9MjA2ICAgd2lkdGg9NjQgICAgaGVpZ2h0PTE4MyAgIHhvZmZzZXQ9LTEzICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT0zOCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTY3ICB4PTIwNSAgIHk9MCAgICAgd2lkdGg9MTMyICAgaGVpZ2h0PTIwMiAgIHhvZmZzZXQ9LTE4ICAgeW9mZnNldD0xMyAgICB4YWR2YW5jZT05OCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTY4ICB4PTI3MTYgIHk9MTI1MSAgd2lkdGg9MTAwICAgaGVpZ2h0PTY1ICAgIHhvZmZzZXQ9LTE3ICAgeW9mZnNldD0xMiAgICB4YWR2YW5jZT02NyAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTY5ICB4PTk5NSAgIHk9NTk5ICAgd2lkdGg9MTYxICAgaGVpZ2h0PTE2NSAgIHhvZmZzZXQ9LTE4ICAgeW9mZnNldD0xMyAgICB4YWR2YW5jZT0xMjYgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTcwICB4PTEzNjggIHk9MTI3MyAgd2lkdGg9OTkgICAgaGVpZ2h0PTEwOSAgIHhvZmZzZXQ9LTEzICAgeW9mZnNldD0xMyAgICB4YWR2YW5jZT03MSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTcxICB4PTExMzEgIHk9MTI3NyAgd2lkdGg9MTEwICAgaGVpZ2h0PTExMCAgIHhvZmZzZXQ9LTE3ICAgeW9mZnNldD01NCAgICB4YWR2YW5jZT03NSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTcyICB4PTIyNTEgIHk9MTI2MSAgd2lkdGg9MTE1ICAgaGVpZ2h0PTgxICAgIHhvZmZzZXQ9LTE1ICAgeW9mZnNldD02NSAgICB4YWR2YW5jZT04OSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTczICB4PTEzMyAgIHk9MTQ1OCAgd2lkdGg9ODggICAgaGVpZ2h0PTYwICAgIHhvZmZzZXQ9LTIyICAgeW9mZnNldD03NCAgICB4YWR2YW5jZT00NCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTc0ICB4PTExNjggIHk9NTk3ICAgd2lkdGg9MTYxICAgaGVpZ2h0PTE2NSAgIHhvZmZzZXQ9LTE4ICAgeW9mZnNldD0xMyAgICB4YWR2YW5jZT0xMjYgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTc1ICB4PTMzMyAgIHk9MTQ0OCAgd2lkdGg9MTA1ICAgaGVpZ2h0PTU5ICAgIHhvZmZzZXQ9LTE1ICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT03MyAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTc2ICB4PTE4MTUgIHk9MTI2OCAgd2lkdGg9ODkgICAgaGVpZ2h0PTg4ICAgIHhvZmZzZXQ9LTE1ICAgeW9mZnNldD0xMyAgICB4YWR2YW5jZT02MCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTc3ICB4PTg2MyAgIHk9MTEyOSAgd2lkdGg9MTIxICAgaGVpZ2h0PTE0NyAgIHhvZmZzZXQ9LTE3ICAgeW9mZnNldD0yOSAgICB4YWR2YW5jZT04NSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTc4ICB4PTg5OSAgIHk9MTI4OCAgd2lkdGg9OTcgICAgaGVpZ2h0PTExMSAgIHhvZmZzZXQ9LTE5ICAgeW9mZnNldD0xMyAgICB4YWR2YW5jZT01OSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTc5ICB4PTc5MCAgIHk9MTI5MCAgd2lkdGg9OTcgICAgaGVpZ2h0PTExMiAgIHhvZmZzZXQ9LTIwICAgeW9mZnNldD0xMyAgICB4YWR2YW5jZT01OSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTgwICB4PTI1MjggIHk9MTI1OCAgd2lkdGg9ODIgICAgaGVpZ2h0PTcxICAgIHhvZmZzZXQ9LTE1ICAgeW9mZnNldD04ICAgICB4YWR2YW5jZT01MCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTgxICB4PTg2NiAgIHk9NTk5ICAgd2lkdGg9MTE3ICAgaGVpZ2h0PTE2NiAgIHhvZmZzZXQ9LTEzICAgeW9mZnNldD00MyAgICB4YWR2YW5jZT05MSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTgyICB4PTI4OTMgIHk9OTIzICAgd2lkdGg9MTEwICAgaGVpZ2h0PTE2MiAgIHhvZmZzZXQ9LTIwICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT03OCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTgzICB4PTI5MDggIHk9MTI0MiAgd2lkdGg9NjcgICAgaGVpZ2h0PTY1ICAgIHhvZmZzZXQ9LTEzICAgeW9mZnNldD02MiAgICB4YWR2YW5jZT00MiAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTg0ICB4PTIxNjYgIHk9MTI2MSAgd2lkdGg9NzMgICAgaGVpZ2h0PTgyICAgIHhvZmZzZXQ9LTE1ICAgeW9mZnNldD0xMjggICB4YWR2YW5jZT00MCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTg1ICB4PTE0NzkgIHk9MTI3MSAgd2lkdGg9NzkgICAgaGVpZ2h0PTEwOSAgIHhvZmZzZXQ9LTE1ICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT01OSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTg2ICB4PTEyNTMgIHk9MTI3NCAgd2lkdGg9MTAzICAgaGVpZ2h0PTEwOSAgIHhvZmZzZXQ9LTE1ICAgeW9mZnNldD0xMyAgICB4YWR2YW5jZT03MyAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTg3ICB4PTEwMDggIHk9MTI3NyAgd2lkdGg9MTExICAgaGVpZ2h0PTExMCAgIHhvZmZzZXQ9LTE3ICAgeW9mZnNldD01NCAgICB4YWR2YW5jZT03NSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTg4ICB4PTI1NDIgIHk9NzU4ICAgd2lkdGg9MTU0ICAgaGVpZ2h0PTE2MiAgIHhvZmZzZXQ9LTE4ICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT0xMTcgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTg5ICB4PTIzNzIgIHk9NzYwICAgd2lkdGg9MTU4ICAgaGVpZ2h0PTE2MiAgIHhvZmZzZXQ9LTE4ICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT0xMjQgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTkwICB4PTExMjkgIHk9Nzc2ICAgd2lkdGg9MTU5ICAgaGVpZ2h0PTE2MyAgIHhvZmZzZXQ9LTE2ICAgeW9mZnNldD0xMyAgICB4YWR2YW5jZT0xMjQgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTkxICB4PTkyNSAgIHk9Nzc3ICAgd2lkdGg9MTEzICAgaGVpZ2h0PTE2NCAgIHhvZmZzZXQ9LTE5ICAgeW9mZnNldD00MiAgICB4YWR2YW5jZT03NiAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTkyICB4PTE2MiAgIHk9MjI1ICAgd2lkdGg9MTUwICAgaGVpZ2h0PTE5MiAgIHhvZmZzZXQ9LTIzICAgeW9mZnNldD0tMTYgICB4YWR2YW5jZT0xMDQgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTkzICB4PTMyNCAgIHk9MjE0ICAgd2lkdGg9MTUwICAgaGVpZ2h0PTE5MiAgIHhvZmZzZXQ9LTIzICAgeW9mZnNldD0tMTYgICB4YWR2YW5jZT0xMDQgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTk0ICB4PTAgICAgIHk9MjI1ICAgd2lkdGg9MTUwICAgaGVpZ2h0PTE5MiAgIHhvZmZzZXQ9LTIzICAgeW9mZnNldD0tMTYgICB4YWR2YW5jZT0xMDQgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTk1ICB4PTEzNTkgIHk9MjEwICAgd2lkdGg9MTUwICAgaGVpZ2h0PTE5MCAgIHhvZmZzZXQ9LTIzICAgeW9mZnNldD0tMTQgICB4YWR2YW5jZT0xMDQgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTk2ICB4PTE4MTQgIHk9MjA4ICAgd2lkdGg9MTUwICAgaGVpZ2h0PTE4OCAgIHhvZmZzZXQ9LTIzICAgeW9mZnNldD0tMTIgICB4YWR2YW5jZT0xMDQgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTk3ICB4PTEwMTYgIHk9MCAgICAgd2lkdGg9MTUwICAgaGVpZ2h0PTE5OSAgIHhvZmZzZXQ9LTIzICAgeW9mZnNldD0tMjMgICB4YWR2YW5jZT0xMDQgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTk4ICB4PTE3OTIgIHk9NzY5ICAgd2lkdGg9MTk4ICAgaGVpZ2h0PTE2MiAgIHhvZmZzZXQ9LTI2ICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT0xNTAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MTk5ICB4PTExNzggIHk9MCAgICAgd2lkdGg9MTM3ICAgaGVpZ2h0PTE5OCAgIHhvZmZzZXQ9LTE1ICAgeW9mZnNldD0xMyAgICB4YWR2YW5jZT0xMDQgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjAwICB4PTI5MjIgIHk9MCAgICAgd2lkdGg9MTIyICAgaGVpZ2h0PTE5MiAgIHhvZmZzZXQ9LTEyICAgeW9mZnNldD0tMTYgICB4YWR2YW5jZT05MSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjAxICB4PTY0MSAgIHk9MjE0ICAgd2lkdGg9MTIyICAgaGVpZ2h0PTE5MiAgIHhvZmZzZXQ9LTEyICAgeW9mZnNldD0tMTYgICB4YWR2YW5jZT05MSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjAyICB4PTc3NSAgIHk9MjEzICAgd2lkdGg9MTIyICAgaGVpZ2h0PTE5MiAgIHhvZmZzZXQ9LTEyICAgeW9mZnNldD0tMTYgICB4YWR2YW5jZT05MSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjAzICB4PTE5NzYgIHk9MjA3ICAgd2lkdGg9MTIyICAgaGVpZ2h0PTE4OCAgIHhvZmZzZXQ9LTEyICAgeW9mZnNldD0tMTIgICB4YWR2YW5jZT05MSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjA0ICB4PTEwMTggIHk9MjExICAgd2lkdGg9ODIgICAgaGVpZ2h0PTE5MiAgIHhvZmZzZXQ9LTI3ICAgeW9mZnNldD0tMTYgICB4YWR2YW5jZT00NCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjA1ICB4PTExMTIgIHk9MjExICAgd2lkdGg9ODIgICAgaGVpZ2h0PTE5MiAgIHhvZmZzZXQ9LTExICAgeW9mZnNldD0tMTYgICB4YWR2YW5jZT00NCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjA2ICB4PTkwOSAgIHk9MjEzICAgd2lkdGg9OTcgICAgaGVpZ2h0PTE5MiAgIHhvZmZzZXQ9LTI3ICAgeW9mZnNldD0tMTYgICB4YWR2YW5jZT00NCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjA3ICB4PTIxMTAgIHk9MjA3ICAgd2lkdGg9MTAwICAgaGVpZ2h0PTE4OCAgIHhvZmZzZXQ9LTI4ICAgeW9mZnNldD0tMTIgICB4YWR2YW5jZT00NCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjA4ICB4PTAgICAgIHk9OTY5ICAgd2lkdGg9MTQ1ICAgaGVpZ2h0PTE2MiAgIHhvZmZzZXQ9LTIyICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT0xMDcgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjA5ICB4PTE1MjEgIHk9MjA4ICAgd2lkdGg9MTM3ICAgaGVpZ2h0PTE5MCAgIHhvZmZzZXQ9LTEyICAgeW9mZnNldD0tMTQgICB4YWR2YW5jZT0xMTQgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjEwICB4PTIxODQgIHk9MCAgICAgd2lkdGg9MTQxICAgaGVpZ2h0PTE5NSAgIHhvZmZzZXQ9LTE2ICAgeW9mZnNldD0tMTcgICB4YWR2YW5jZT0xMTAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjExICB4PTIwMzEgIHk9MCAgICAgd2lkdGg9MTQxICAgaGVpZ2h0PTE5NSAgIHhvZmZzZXQ9LTE2ICAgeW9mZnNldD0tMTcgICB4YWR2YW5jZT0xMTAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjEyICB4PTE4NzggIHk9MCAgICAgd2lkdGg9MTQxICAgaGVpZ2h0PTE5NSAgIHhvZmZzZXQ9LTE2ICAgeW9mZnNldD0tMTcgICB4YWR2YW5jZT0xMTAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjEzICB4PTI3NjkgIHk9MCAgICAgd2lkdGg9MTQxICAgaGVpZ2h0PTE5MyAgIHhvZmZzZXQ9LTE2ICAgeW9mZnNldD0tMTUgICB4YWR2YW5jZT0xMTAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjE0ICB4PTEyMDYgIHk9MjEwICAgd2lkdGg9MTQxICAgaGVpZ2h0PTE5MSAgIHhvZmZzZXQ9LTE2ICAgeW9mZnNldD0tMTMgICB4YWR2YW5jZT0xMTAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjE1ICB4PTI3OSAgIHk9MTMxNiAgd2lkdGg9MTIwICAgaGVpZ2h0PTEyMCAgIHhvZmZzZXQ9LTE4ICAgeW9mZnNldD00MCAgICB4YWR2YW5jZT04NSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjE2ICB4PTI2NTUgIHk9MjA2ICAgd2lkdGg9MTQzICAgaGVpZ2h0PTE3NCAgIHhvZmZzZXQ9LTE2ICAgeW9mZnNldD0xMCAgICB4YWR2YW5jZT0xMTAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjE3ICB4PTI2MjUgIHk9MCAgICAgd2lkdGg9MTMyICAgaGVpZ2h0PTE5NCAgIHhvZmZzZXQ9LTE0ICAgeW9mZnNldD0tMTYgICB4YWR2YW5jZT0xMDQgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjE4ICB4PTI0ODEgIHk9MCAgICAgd2lkdGg9MTMyICAgaGVpZ2h0PTE5NCAgIHhvZmZzZXQ9LTE0ICAgeW9mZnNldD0tMTYgICB4YWR2YW5jZT0xMDQgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjE5ICB4PTIzMzcgIHk9MCAgICAgd2lkdGg9MTMyICAgaGVpZ2h0PTE5NCAgIHhvZmZzZXQ9LTE0ICAgeW9mZnNldD0tMTYgICB4YWR2YW5jZT0xMDQgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjIwICB4PTE2NzAgIHk9MjA4ICAgd2lkdGg9MTMyICAgaGVpZ2h0PTE5MCAgIHhvZmZzZXQ9LTE0ICAgeW9mZnNldD0tMTIgICB4YWR2YW5jZT0xMDQgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjIxICB4PTQ4NiAgIHk9MjE0ICAgd2lkdGg9MTQzICAgaGVpZ2h0PTE5MiAgIHhvZmZzZXQ9LTI0ICAgeW9mZnNldD0tMTYgICB4YWR2YW5jZT05NiAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjIyICB4PTIzNjAgIHk9OTM5ICAgd2lkdGg9MTI0ICAgaGVpZ2h0PTE2MiAgIHhvZmZzZXQ9LTEyICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT05NSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjIzICB4PTEyMSAgIHk9NDI5ICAgd2lkdGg9MTI3ICAgaGVpZ2h0PTE3MSAgIHhvZmZzZXQ9LTE0ICAgeW9mZnNldD03ICAgICB4YWR2YW5jZT05NSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjI0ICB4PTE2MDQgIHk9NDEwICAgd2lkdGg9MTE5ICAgaGVpZ2h0PTE3MCAgIHhvZmZzZXQ9LTE2ICAgeW9mZnNldD04ICAgICB4YWR2YW5jZT04NyAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjI1ICB4PTE0NzMgIHk9NDEyICAgd2lkdGg9MTE5ICAgaGVpZ2h0PTE3MCAgIHhvZmZzZXQ9LTE2ICAgeW9mZnNldD04ICAgICB4YWR2YW5jZT04NyAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjI2ICB4PTE3MzUgIHk9NDEwICAgd2lkdGg9MTE5ICAgaGVpZ2h0PTE3MCAgIHhvZmZzZXQ9LTE2ICAgeW9mZnNldD04ICAgICB4YWR2YW5jZT04NyAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjI3ICB4PTUzMiAgIHk9NjAwICAgd2lkdGg9MTE5ICAgaGVpZ2h0PTE2NyAgIHhvZmZzZXQ9LTE2ICAgeW9mZnNldD0xMSAgICB4YWR2YW5jZT04NyAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjI4ICB4PTI5MjYgIHk9NTY5ICAgd2lkdGg9MTE5ICAgaGVpZ2h0PTE2NSAgIHhvZmZzZXQ9LTE2ICAgeW9mZnNldD0xMyAgICB4YWR2YW5jZT04NyAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjI5ICB4PTI1MjQgIHk9MjA2ICAgd2lkdGg9MTE5ICAgaGVpZ2h0PTE3NyAgIHhvZmZzZXQ9LTE2ICAgeW9mZnNldD0xICAgICB4YWR2YW5jZT04NyAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjMwICB4PTk5NiAgIHk9MTEyOSAgd2lkdGg9MTczICAgaGVpZ2h0PTEzNiAgIHhvZmZzZXQ9LTE5ICAgeW9mZnNldD00MiAgICB4YWR2YW5jZT0xMzUgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjMxICB4PTE5NzkgIHk9NDA3ICAgd2lkdGg9MTIwICAgaGVpZ2h0PTE2OSAgIHhvZmZzZXQ9LTE3ICAgeW9mZnNldD00MiAgICB4YWR2YW5jZT04NCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjMyICB4PTEwNzYgIHk9NDE1ICAgd2lkdGg9MTIxICAgaGVpZ2h0PTE3MCAgIHhvZmZzZXQ9LTE3ICAgeW9mZnNldD04ICAgICB4YWR2YW5jZT04NSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjMzICB4PTk0MyAgIHk9NDE3ICAgd2lkdGg9MTIxICAgaGVpZ2h0PTE3MCAgIHhvZmZzZXQ9LTE3ICAgeW9mZnNldD04ICAgICB4YWR2YW5jZT04NSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjM0ICB4PTgxMCAgIHk9NDE3ICAgd2lkdGg9MTIxICAgaGVpZ2h0PTE3MCAgIHhvZmZzZXQ9LTE3ICAgeW9mZnNldD04ICAgICB4YWR2YW5jZT04NSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjM1ICB4PTI3OTMgIHk9NTcyICAgd2lkdGg9MTIxICAgaGVpZ2h0PTE2NSAgIHhvZmZzZXQ9LTE3ICAgeW9mZnNldD0xMyAgICB4YWR2YW5jZT04NSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjM2ICB4PTc3MiAgIHk9NjAwICAgd2lkdGg9ODIgICAgaGVpZ2h0PTE2NyAgIHhvZmZzZXQ9LTI5ICAgeW9mZnNldD05ICAgICB4YWR2YW5jZT00MCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjM3ICB4PTI5NzAgIHk9Mzg4ICAgd2lkdGg9ODIgICAgaGVpZ2h0PTE2NyAgIHhvZmZzZXQ9LTEzICAgeW9mZnNldD05ICAgICB4YWR2YW5jZT00MCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjM4ICB4PTY2MyAgIHk9NjAwICAgd2lkdGg9OTcgICAgaGVpZ2h0PTE2NyAgIHhvZmZzZXQ9LTI5ICAgeW9mZnNldD05ICAgICB4YWR2YW5jZT00MCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjM5ICB4PTAgICAgIHk9MTE0MyAgd2lkdGg9MTAwICAgaGVpZ2h0PTE2MiAgIHhvZmZzZXQ9LTMwICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT00MCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjQwICB4PTI4MTAgIHk9MjA1ICAgd2lkdGg9MTIzICAgaGVpZ2h0PTE3MyAgIHhvZmZzZXQ9LTE1ICAgeW9mZnNldD01ICAgICB4YWR2YW5jZT05NCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjQxICB4PTAgICAgIHk9NzkyICAgd2lkdGg9MTE2ICAgaGVpZ2h0PTE2NSAgIHhvZmZzZXQ9LTE0ICAgeW9mZnNldD0xMSAgICB4YWR2YW5jZT04OCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjQyICB4PTI2MCAgIHk9NDI5ICAgd2lkdGg9MTI3ICAgaGVpZ2h0PTE3MCAgIHhvZmZzZXQ9LTE4ICAgeW9mZnNldD04ICAgICB4YWR2YW5jZT05MSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjQzICB4PTUzOCAgIHk9NDE4ICAgd2lkdGg9MTI3ICAgaGVpZ2h0PTE3MCAgIHhvZmZzZXQ9LTE4ICAgeW9mZnNldD04ICAgICB4YWR2YW5jZT05MSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjQ0ICB4PTM5OSAgIHk9NDE4ICAgd2lkdGg9MTI3ICAgaGVpZ2h0PTE3MCAgIHhvZmZzZXQ9LTE4ICAgeW9mZnNldD04ICAgICB4YWR2YW5jZT05MSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjQ1ICB4PTI4MzEgIHk9MzkwICAgd2lkdGg9MTI3ICAgaGVpZ2h0PTE2NyAgIHhvZmZzZXQ9LTE4ICAgeW9mZnNldD0xMSAgICB4YWR2YW5jZT05MSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjQ2ICB4PTIyNTMgIHk9NTgzICAgd2lkdGg9MTI3ICAgaGVpZ2h0PTE2NSAgIHhvZmZzZXQ9LTE4ICAgeW9mZnNldD0xMyAgICB4YWR2YW5jZT05MSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjQ3ICB4PTE0MCAgIHk9MTMxNyAgd2lkdGg9MTI3ICAgaGVpZ2h0PTEyOCAgIHhvZmZzZXQ9LTE5ICAgeW9mZnNldD0zNCAgICB4YWR2YW5jZT05MSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjQ4ICB4PTU2NCAgIHk9MTEyOSAgd2lkdGg9MTI2ICAgaGVpZ2h0PTE1MyAgIHhvZmZzZXQ9LTE3ICAgeW9mZnNldD0zNCAgICB4YWR2YW5jZT05MSAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjQ5ICB4PTIxMTEgIHk9NDA3ICAgd2lkdGg9MTE2ICAgaGVpZ2h0PTE2OSAgIHhvZmZzZXQ9LTE0ICAgeW9mZnNldD05ICAgICB4YWR2YW5jZT04OCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjUwICB4PTIyMzkgIHk9NDAyICAgd2lkdGg9MTE2ICAgaGVpZ2h0PTE2OSAgIHhvZmZzZXQ9LTE0ICAgeW9mZnNldD05ICAgICB4YWR2YW5jZT04OCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjUxICB4PTIzNjcgIHk9NDAyICAgd2lkdGg9MTE2ICAgaGVpZ2h0PTE2OSAgIHhvZmZzZXQ9LTE0ICAgeW9mZnNldD05ICAgICB4YWR2YW5jZT04OCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjUyICB4PTY3MiAgIHk9Nzc5ICAgd2lkdGg9MTE2ICAgaGVpZ2h0PTE2NCAgIHhvZmZzZXQ9LTE0ICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT04OCAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjUzICB4PTc0OSAgIHk9MCAgICAgd2lkdGg9MTIyICAgaGVpZ2h0PTIwMSAgIHhvZmZzZXQ9LTIzICAgeW9mZnNldD05ICAgICB4YWR2YW5jZT03NiAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjU0ICB4PTg4MyAgIHk9MCAgICAgd2lkdGg9MTIxICAgaGVpZ2h0PTIwMSAgIHhvZmZzZXQ9LTEzICAgeW9mZnNldD04ICAgICB4YWR2YW5jZT05MiAgICBwYWdlPTAgIGNobmw9MTVcbmNoYXIgaWQ9MjU1ICB4PTE3NDQgIHk9MCAgICAgd2lkdGg9MTIyICAgaGVpZ2h0PTE5NiAgIHhvZmZzZXQ9LTIzICAgeW9mZnNldD0xNCAgICB4YWR2YW5jZT03NiAgICBwYWdlPTAgIGNobmw9MTVcbmtlcm5pbmdzIGNvdW50PTE2ODZcbmtlcm5pbmcgZmlyc3Q9MzIgIHNlY29uZD04NCAgYW1vdW50PS0zXG5rZXJuaW5nIGZpcnN0PTQwICBzZWNvbmQ9ODYgIGFtb3VudD0yXG5rZXJuaW5nIGZpcnN0PTQwICBzZWNvbmQ9ODcgIGFtb3VudD0xXG5rZXJuaW5nIGZpcnN0PTQwICBzZWNvbmQ9ODkgIGFtb3VudD0yXG5rZXJuaW5nIGZpcnN0PTQwICBzZWNvbmQ9MjIxIGFtb3VudD0yXG5rZXJuaW5nIGZpcnN0PTcwICBzZWNvbmQ9NDQgIGFtb3VudD0tMThcbmtlcm5pbmcgZmlyc3Q9NzAgIHNlY29uZD00NiAgYW1vdW50PS0xOFxua2VybmluZyBmaXJzdD03MCAgc2Vjb25kPTY1ICBhbW91bnQ9LTEzXG5rZXJuaW5nIGZpcnN0PTcwICBzZWNvbmQ9NzQgIGFtb3VudD0tMjFcbmtlcm5pbmcgZmlyc3Q9NzAgIHNlY29uZD04NCAgYW1vdW50PTJcbmtlcm5pbmcgZmlyc3Q9NzAgIHNlY29uZD05NyAgYW1vdW50PS0zXG5rZXJuaW5nIGZpcnN0PTcwICBzZWNvbmQ9OTkgIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD03MCAgc2Vjb25kPTEwMCBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9NzAgIHNlY29uZD0xMDEgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTcwICBzZWNvbmQ9MTAzIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD03MCAgc2Vjb25kPTExMSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9NzAgIHNlY29uZD0xMTMgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTcwICBzZWNvbmQ9MTE3IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD03MCAgc2Vjb25kPTExOCBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9NzAgIHNlY29uZD0xMjEgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTcwICBzZWNvbmQ9MTkyIGFtb3VudD0tMTNcbmtlcm5pbmcgZmlyc3Q9NzAgIHNlY29uZD0xOTMgYW1vdW50PS0xM1xua2VybmluZyBmaXJzdD03MCAgc2Vjb25kPTE5NCBhbW91bnQ9LTEzXG5rZXJuaW5nIGZpcnN0PTcwICBzZWNvbmQ9MTk1IGFtb3VudD0tMTNcbmtlcm5pbmcgZmlyc3Q9NzAgIHNlY29uZD0xOTYgYW1vdW50PS0xM1xua2VybmluZyBmaXJzdD03MCAgc2Vjb25kPTE5NyBhbW91bnQ9LTEzXG5rZXJuaW5nIGZpcnN0PTcwICBzZWNvbmQ9MjI0IGFtb3VudD0tM1xua2VybmluZyBmaXJzdD03MCAgc2Vjb25kPTIyNSBhbW91bnQ9LTNcbmtlcm5pbmcgZmlyc3Q9NzAgIHNlY29uZD0yMjYgYW1vdW50PS0zXG5rZXJuaW5nIGZpcnN0PTcwICBzZWNvbmQ9MjI3IGFtb3VudD0tM1xua2VybmluZyBmaXJzdD03MCAgc2Vjb25kPTIyOCBhbW91bnQ9LTNcbmtlcm5pbmcgZmlyc3Q9NzAgIHNlY29uZD0yMjkgYW1vdW50PS0zXG5rZXJuaW5nIGZpcnN0PTcwICBzZWNvbmQ9MjMxIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD03MCAgc2Vjb25kPTIzMiBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9NzAgIHNlY29uZD0yMzMgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTcwICBzZWNvbmQ9MjM0IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD03MCAgc2Vjb25kPTIzNSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9NzAgIHNlY29uZD0yNDIgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTcwICBzZWNvbmQ9MjQzIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD03MCAgc2Vjb25kPTI0NCBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9NzAgIHNlY29uZD0yNDUgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTcwICBzZWNvbmQ9MjQ2IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD03MCAgc2Vjb25kPTI0OSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9NzAgIHNlY29uZD0yNTAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTcwICBzZWNvbmQ9MjUxIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD03MCAgc2Vjb25kPTI1MiBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9NzAgIHNlY29uZD0yNTMgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTcwICBzZWNvbmQ9MjU1IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD04MSAgc2Vjb25kPTg0ICBhbW91bnQ9LTNcbmtlcm5pbmcgZmlyc3Q9ODEgIHNlY29uZD04NiAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTgxICBzZWNvbmQ9ODcgIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD04MSAgc2Vjb25kPTg5ICBhbW91bnQ9LTNcbmtlcm5pbmcgZmlyc3Q9ODEgIHNlY29uZD0yMjEgYW1vdW50PS0zXG5rZXJuaW5nIGZpcnN0PTgyICBzZWNvbmQ9ODQgIGFtb3VudD0tNlxua2VybmluZyBmaXJzdD04MiAgc2Vjb25kPTg2ICBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9ODIgIHNlY29uZD04OSAgYW1vdW50PS00XG5rZXJuaW5nIGZpcnN0PTgyICBzZWNvbmQ9MjIxIGFtb3VudD0tNFxua2VybmluZyBmaXJzdD05MSAgc2Vjb25kPTc0ICBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9OTEgIHNlY29uZD04NSAgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTkxICBzZWNvbmQ9MjE3IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD05MSAgc2Vjb25kPTIxOCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9OTEgIHNlY29uZD0yMTkgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTkxICBzZWNvbmQ9MjIwIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xMDIgc2Vjb25kPTM0ICBhbW91bnQ9MVxua2VybmluZyBmaXJzdD0xMDIgc2Vjb25kPTM5ICBhbW91bnQ9MVxua2VybmluZyBmaXJzdD0xMDIgc2Vjb25kPTk5ICBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MTAyIHNlY29uZD0xMDAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTEwMiBzZWNvbmQ9MTAxIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0xMDIgc2Vjb25kPTEwMyBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MTAyIHNlY29uZD0xMTMgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTEwMiBzZWNvbmQ9MjMxIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0xMDIgc2Vjb25kPTIzMiBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MTAyIHNlY29uZD0yMzMgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTEwMiBzZWNvbmQ9MjM0IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0xMDIgc2Vjb25kPTIzNSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MTA3IHNlY29uZD05OSAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTEwNyBzZWNvbmQ9MTAwIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0xMDcgc2Vjb25kPTEwMSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MTA3IHNlY29uZD0xMDMgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTEwNyBzZWNvbmQ9MTEzIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0xMDcgc2Vjb25kPTIzMSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MTA3IHNlY29uZD0yMzIgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTEwNyBzZWNvbmQ9MjMzIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0xMDcgc2Vjb25kPTIzNCBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MTA3IHNlY29uZD0yMzUgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTExNiBzZWNvbmQ9MTExIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0xMTYgc2Vjb25kPTI0MiBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MTE2IHNlY29uZD0yNDMgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTExNiBzZWNvbmQ9MjQ0IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0xMTYgc2Vjb25kPTI0NSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MTE2IHNlY29uZD0yNDYgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTExOSBzZWNvbmQ9NDQgIGFtb3VudD0tMTBcbmtlcm5pbmcgZmlyc3Q9MTE5IHNlY29uZD00NiAgYW1vdW50PS0xMFxua2VybmluZyBmaXJzdD0xMjMgc2Vjb25kPTc0ICBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MTIzIHNlY29uZD04NSAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTEyMyBzZWNvbmQ9MjE3IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0xMjMgc2Vjb25kPTIxOCBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MTIzIHNlY29uZD0yMTkgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTEyMyBzZWNvbmQ9MjIwIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0zNCAgc2Vjb25kPTM0ICBhbW91bnQ9LThcbmtlcm5pbmcgZmlyc3Q9MzQgIHNlY29uZD0zOSAgYW1vdW50PS04XG5rZXJuaW5nIGZpcnN0PTM0ICBzZWNvbmQ9MTExIGFtb3VudD0tNVxua2VybmluZyBmaXJzdD0zNCAgc2Vjb25kPTI0MiBhbW91bnQ9LTVcbmtlcm5pbmcgZmlyc3Q9MzQgIHNlY29uZD0yNDMgYW1vdW50PS01XG5rZXJuaW5nIGZpcnN0PTM0ICBzZWNvbmQ9MjQ0IGFtb3VudD0tNVxua2VybmluZyBmaXJzdD0zNCAgc2Vjb25kPTI0NSBhbW91bnQ9LTVcbmtlcm5pbmcgZmlyc3Q9MzQgIHNlY29uZD0yNDYgYW1vdW50PS01XG5rZXJuaW5nIGZpcnN0PTM0ICBzZWNvbmQ9NjUgIGFtb3VudD0tOVxua2VybmluZyBmaXJzdD0zNCAgc2Vjb25kPTE5MiBhbW91bnQ9LTlcbmtlcm5pbmcgZmlyc3Q9MzQgIHNlY29uZD0xOTMgYW1vdW50PS05XG5rZXJuaW5nIGZpcnN0PTM0ICBzZWNvbmQ9MTk0IGFtb3VudD0tOVxua2VybmluZyBmaXJzdD0zNCAgc2Vjb25kPTE5NSBhbW91bnQ9LTlcbmtlcm5pbmcgZmlyc3Q9MzQgIHNlY29uZD0xOTYgYW1vdW50PS05XG5rZXJuaW5nIGZpcnN0PTM0ICBzZWNvbmQ9MTk3IGFtb3VudD0tOVxua2VybmluZyBmaXJzdD0zNCAgc2Vjb25kPTk5ICBhbW91bnQ9LTVcbmtlcm5pbmcgZmlyc3Q9MzQgIHNlY29uZD0xMDAgYW1vdW50PS01XG5rZXJuaW5nIGZpcnN0PTM0ICBzZWNvbmQ9MTAxIGFtb3VudD0tNVxua2VybmluZyBmaXJzdD0zNCAgc2Vjb25kPTEwMyBhbW91bnQ9LTVcbmtlcm5pbmcgZmlyc3Q9MzQgIHNlY29uZD0xMTMgYW1vdW50PS01XG5rZXJuaW5nIGZpcnN0PTM0ICBzZWNvbmQ9MjMxIGFtb3VudD0tNVxua2VybmluZyBmaXJzdD0zNCAgc2Vjb25kPTIzMiBhbW91bnQ9LTVcbmtlcm5pbmcgZmlyc3Q9MzQgIHNlY29uZD0yMzMgYW1vdW50PS01XG5rZXJuaW5nIGZpcnN0PTM0ICBzZWNvbmQ9MjM0IGFtb3VudD0tNVxua2VybmluZyBmaXJzdD0zNCAgc2Vjb25kPTIzNSBhbW91bnQ9LTVcbmtlcm5pbmcgZmlyc3Q9MzQgIHNlY29uZD0xMDkgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTM0ICBzZWNvbmQ9MTEwIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0zNCAgc2Vjb25kPTExMiBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MzQgIHNlY29uZD0yNDEgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTM0ICBzZWNvbmQ9OTcgIGFtb3VudD0tNFxua2VybmluZyBmaXJzdD0zNCAgc2Vjb25kPTIyNCBhbW91bnQ9LTRcbmtlcm5pbmcgZmlyc3Q9MzQgIHNlY29uZD0yMjUgYW1vdW50PS00XG5rZXJuaW5nIGZpcnN0PTM0ICBzZWNvbmQ9MjI2IGFtb3VudD0tNFxua2VybmluZyBmaXJzdD0zNCAgc2Vjb25kPTIyNyBhbW91bnQ9LTRcbmtlcm5pbmcgZmlyc3Q9MzQgIHNlY29uZD0yMjggYW1vdW50PS00XG5rZXJuaW5nIGZpcnN0PTM0ICBzZWNvbmQ9MjI5IGFtb3VudD0tNFxua2VybmluZyBmaXJzdD0zNCAgc2Vjb25kPTExNSBhbW91bnQ9LTZcbmtlcm5pbmcgZmlyc3Q9MzkgIHNlY29uZD0zNCAgYW1vdW50PS04XG5rZXJuaW5nIGZpcnN0PTM5ICBzZWNvbmQ9MzkgIGFtb3VudD0tOFxua2VybmluZyBmaXJzdD0zOSAgc2Vjb25kPTExMSBhbW91bnQ9LTVcbmtlcm5pbmcgZmlyc3Q9MzkgIHNlY29uZD0yNDIgYW1vdW50PS01XG5rZXJuaW5nIGZpcnN0PTM5ICBzZWNvbmQ9MjQzIGFtb3VudD0tNVxua2VybmluZyBmaXJzdD0zOSAgc2Vjb25kPTI0NCBhbW91bnQ9LTVcbmtlcm5pbmcgZmlyc3Q9MzkgIHNlY29uZD0yNDUgYW1vdW50PS01XG5rZXJuaW5nIGZpcnN0PTM5ICBzZWNvbmQ9MjQ2IGFtb3VudD0tNVxua2VybmluZyBmaXJzdD0zOSAgc2Vjb25kPTY1ICBhbW91bnQ9LTlcbmtlcm5pbmcgZmlyc3Q9MzkgIHNlY29uZD0xOTIgYW1vdW50PS05XG5rZXJuaW5nIGZpcnN0PTM5ICBzZWNvbmQ9MTkzIGFtb3VudD0tOVxua2VybmluZyBmaXJzdD0zOSAgc2Vjb25kPTE5NCBhbW91bnQ9LTlcbmtlcm5pbmcgZmlyc3Q9MzkgIHNlY29uZD0xOTUgYW1vdW50PS05XG5rZXJuaW5nIGZpcnN0PTM5ICBzZWNvbmQ9MTk2IGFtb3VudD0tOVxua2VybmluZyBmaXJzdD0zOSAgc2Vjb25kPTE5NyBhbW91bnQ9LTlcbmtlcm5pbmcgZmlyc3Q9MzkgIHNlY29uZD05OSAgYW1vdW50PS01XG5rZXJuaW5nIGZpcnN0PTM5ICBzZWNvbmQ9MTAwIGFtb3VudD0tNVxua2VybmluZyBmaXJzdD0zOSAgc2Vjb25kPTEwMSBhbW91bnQ9LTVcbmtlcm5pbmcgZmlyc3Q9MzkgIHNlY29uZD0xMDMgYW1vdW50PS01XG5rZXJuaW5nIGZpcnN0PTM5ICBzZWNvbmQ9MTEzIGFtb3VudD0tNVxua2VybmluZyBmaXJzdD0zOSAgc2Vjb25kPTIzMSBhbW91bnQ9LTVcbmtlcm5pbmcgZmlyc3Q9MzkgIHNlY29uZD0yMzIgYW1vdW50PS01XG5rZXJuaW5nIGZpcnN0PTM5ICBzZWNvbmQ9MjMzIGFtb3VudD0tNVxua2VybmluZyBmaXJzdD0zOSAgc2Vjb25kPTIzNCBhbW91bnQ9LTVcbmtlcm5pbmcgZmlyc3Q9MzkgIHNlY29uZD0yMzUgYW1vdW50PS01XG5rZXJuaW5nIGZpcnN0PTM5ICBzZWNvbmQ9MTA5IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0zOSAgc2Vjb25kPTExMCBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MzkgIHNlY29uZD0xMTIgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTM5ICBzZWNvbmQ9MjQxIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0zOSAgc2Vjb25kPTk3ICBhbW91bnQ9LTRcbmtlcm5pbmcgZmlyc3Q9MzkgIHNlY29uZD0yMjQgYW1vdW50PS00XG5rZXJuaW5nIGZpcnN0PTM5ICBzZWNvbmQ9MjI1IGFtb3VudD0tNFxua2VybmluZyBmaXJzdD0zOSAgc2Vjb25kPTIyNiBhbW91bnQ9LTRcbmtlcm5pbmcgZmlyc3Q9MzkgIHNlY29uZD0yMjcgYW1vdW50PS00XG5rZXJuaW5nIGZpcnN0PTM5ICBzZWNvbmQ9MjI4IGFtb3VudD0tNFxua2VybmluZyBmaXJzdD0zOSAgc2Vjb25kPTIyOSBhbW91bnQ9LTRcbmtlcm5pbmcgZmlyc3Q9MzkgIHNlY29uZD0xMTUgYW1vdW50PS02XG5rZXJuaW5nIGZpcnN0PTQ0ICBzZWNvbmQ9MzQgIGFtb3VudD0tMTNcbmtlcm5pbmcgZmlyc3Q9NDQgIHNlY29uZD0zOSAgYW1vdW50PS0xM1xua2VybmluZyBmaXJzdD00NiAgc2Vjb25kPTM0ICBhbW91bnQ9LTEzXG5rZXJuaW5nIGZpcnN0PTQ2ICBzZWNvbmQ9MzkgIGFtb3VudD0tMTNcbmtlcm5pbmcgZmlyc3Q9NjUgIHNlY29uZD0xMTggYW1vdW50PS00XG5rZXJuaW5nIGZpcnN0PTY1ICBzZWNvbmQ9MTIxIGFtb3VudD0tNFxua2VybmluZyBmaXJzdD02NSAgc2Vjb25kPTI1MyBhbW91bnQ9LTRcbmtlcm5pbmcgZmlyc3Q9NjUgIHNlY29uZD0yNTUgYW1vdW50PS00XG5rZXJuaW5nIGZpcnN0PTY1ICBzZWNvbmQ9NjcgIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD02NSAgc2Vjb25kPTcxICBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9NjUgIHNlY29uZD03OSAgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTY1ICBzZWNvbmQ9ODEgIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD02NSAgc2Vjb25kPTIxNiBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9NjUgIHNlY29uZD0xOTkgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTY1ICBzZWNvbmQ9MjEwIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD02NSAgc2Vjb25kPTIxMSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9NjUgIHNlY29uZD0yMTIgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTY1ICBzZWNvbmQ9MjEzIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD02NSAgc2Vjb25kPTIxNCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9NjUgIHNlY29uZD04NSAgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTY1ICBzZWNvbmQ9MjE3IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD02NSAgc2Vjb25kPTIxOCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9NjUgIHNlY29uZD0yMTkgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTY1ICBzZWNvbmQ9MjIwIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD02NSAgc2Vjb25kPTM0ICBhbW91bnQ9LTlcbmtlcm5pbmcgZmlyc3Q9NjUgIHNlY29uZD0zOSAgYW1vdW50PS05XG5rZXJuaW5nIGZpcnN0PTY1ICBzZWNvbmQ9MTExIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD02NSAgc2Vjb25kPTI0MiBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9NjUgIHNlY29uZD0yNDMgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTY1ICBzZWNvbmQ9MjQ0IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD02NSAgc2Vjb25kPTI0NSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9NjUgIHNlY29uZD0yNDYgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTY1ICBzZWNvbmQ9ODcgIGFtb3VudD0tNVxua2VybmluZyBmaXJzdD02NSAgc2Vjb25kPTg0ICBhbW91bnQ9LTEwXG5rZXJuaW5nIGZpcnN0PTY1ICBzZWNvbmQ9MTE3IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD02NSAgc2Vjb25kPTI0OSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9NjUgIHNlY29uZD0yNTAgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTY1ICBzZWNvbmQ9MjUxIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD02NSAgc2Vjb25kPTI1MiBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9NjUgIHNlY29uZD0xMjIgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9NjUgIHNlY29uZD04NiAgYW1vdW50PS03XG5rZXJuaW5nIGZpcnN0PTY1ICBzZWNvbmQ9ODkgIGFtb3VudD0tN1xua2VybmluZyBmaXJzdD02NSAgc2Vjb25kPTIyMSBhbW91bnQ9LTdcbmtlcm5pbmcgZmlyc3Q9NjYgIHNlY29uZD04NCAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTY2ICBzZWNvbmQ9ODYgIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD02NiAgc2Vjb25kPTg5ICBhbW91bnQ9LTRcbmtlcm5pbmcgZmlyc3Q9NjYgIHNlY29uZD0yMjEgYW1vdW50PS00XG5rZXJuaW5nIGZpcnN0PTY3ICBzZWNvbmQ9ODQgIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD02OCAgc2Vjb25kPTg0ICBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9NjggIHNlY29uZD04NiAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTY4ICBzZWNvbmQ9ODkgIGFtb3VudD0tM1xua2VybmluZyBmaXJzdD02OCAgc2Vjb25kPTIyMSBhbW91bnQ9LTNcbmtlcm5pbmcgZmlyc3Q9NjggIHNlY29uZD02NSAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTY4ICBzZWNvbmQ9MTkyIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD02OCAgc2Vjb25kPTE5MyBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9NjggIHNlY29uZD0xOTQgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTY4ICBzZWNvbmQ9MTk1IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD02OCAgc2Vjb25kPTE5NiBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9NjggIHNlY29uZD0xOTcgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTY4ICBzZWNvbmQ9ODggIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD02OCAgc2Vjb25kPTQ0ICBhbW91bnQ9LThcbmtlcm5pbmcgZmlyc3Q9NjggIHNlY29uZD00NiAgYW1vdW50PS04XG5rZXJuaW5nIGZpcnN0PTY4ICBzZWNvbmQ9OTAgIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD02OSAgc2Vjb25kPTExOCBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9NjkgIHNlY29uZD0xMjEgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTY5ICBzZWNvbmQ9MjUzIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD02OSAgc2Vjb25kPTI1NSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9NjkgIHNlY29uZD0xMTEgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTY5ICBzZWNvbmQ9MjQyIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD02OSAgc2Vjb25kPTI0MyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9NjkgIHNlY29uZD0yNDQgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTY5ICBzZWNvbmQ9MjQ1IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD02OSAgc2Vjb25kPTI0NiBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9NjkgIHNlY29uZD04NCAgYW1vdW50PTJcbmtlcm5pbmcgZmlyc3Q9NjkgIHNlY29uZD0xMTcgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTY5ICBzZWNvbmQ9MjQ5IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD02OSAgc2Vjb25kPTI1MCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9NjkgIHNlY29uZD0yNTEgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTY5ICBzZWNvbmQ9MjUyIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD02OSAgc2Vjb25kPTk5ICBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9NjkgIHNlY29uZD0xMDAgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTY5ICBzZWNvbmQ9MTAxIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD02OSAgc2Vjb25kPTEwMyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9NjkgIHNlY29uZD0xMTMgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTY5ICBzZWNvbmQ9MjMxIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD02OSAgc2Vjb25kPTIzMiBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9NjkgIHNlY29uZD0yMzMgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTY5ICBzZWNvbmQ9MjM0IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD02OSAgc2Vjb25kPTIzNSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9NzIgIHNlY29uZD04NCAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTcyICBzZWNvbmQ9ODkgIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD03MiAgc2Vjb25kPTIyMSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9NzIgIHNlY29uZD02NSAgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9NzIgIHNlY29uZD0xOTIgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9NzIgIHNlY29uZD0xOTMgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9NzIgIHNlY29uZD0xOTQgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9NzIgIHNlY29uZD0xOTUgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9NzIgIHNlY29uZD0xOTYgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9NzIgIHNlY29uZD0xOTcgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9NzIgIHNlY29uZD04OCAgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9NzMgIHNlY29uZD04NCAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTczICBzZWNvbmQ9ODkgIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD03MyAgc2Vjb25kPTIyMSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9NzMgIHNlY29uZD02NSAgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9NzMgIHNlY29uZD0xOTIgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9NzMgIHNlY29uZD0xOTMgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9NzMgIHNlY29uZD0xOTQgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9NzMgIHNlY29uZD0xOTUgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9NzMgIHNlY29uZD0xOTYgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9NzMgIHNlY29uZD0xOTcgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9NzMgIHNlY29uZD04OCAgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9NzQgIHNlY29uZD02NSAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTc0ICBzZWNvbmQ9MTkyIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD03NCAgc2Vjb25kPTE5MyBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9NzQgIHNlY29uZD0xOTQgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTc0ICBzZWNvbmQ9MTk1IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD03NCAgc2Vjb25kPTE5NiBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9NzQgIHNlY29uZD0xOTcgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTc1ICBzZWNvbmQ9MTE4IGFtb3VudD0tM1xua2VybmluZyBmaXJzdD03NSAgc2Vjb25kPTEyMSBhbW91bnQ9LTNcbmtlcm5pbmcgZmlyc3Q9NzUgIHNlY29uZD0yNTMgYW1vdW50PS0zXG5rZXJuaW5nIGZpcnN0PTc1ICBzZWNvbmQ9MjU1IGFtb3VudD0tM1xua2VybmluZyBmaXJzdD03NSAgc2Vjb25kPTY3ICBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9NzUgIHNlY29uZD03MSAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTc1ICBzZWNvbmQ9NzkgIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD03NSAgc2Vjb25kPTgxICBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9NzUgIHNlY29uZD0yMTYgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTc1ICBzZWNvbmQ9MTk5IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD03NSAgc2Vjb25kPTIxMCBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9NzUgIHNlY29uZD0yMTEgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTc1ICBzZWNvbmQ9MjEyIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD03NSAgc2Vjb25kPTIxMyBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9NzUgIHNlY29uZD0yMTQgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTc1ICBzZWNvbmQ9MTExIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD03NSAgc2Vjb25kPTI0MiBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9NzUgIHNlY29uZD0yNDMgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTc1ICBzZWNvbmQ9MjQ0IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD03NSAgc2Vjb25kPTI0NSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9NzUgIHNlY29uZD0yNDYgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTc1ICBzZWNvbmQ9MTE3IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD03NSAgc2Vjb25kPTI0OSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9NzUgIHNlY29uZD0yNTAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTc1ICBzZWNvbmQ9MjUxIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD03NSAgc2Vjb25kPTI1MiBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9NzUgIHNlY29uZD05OSAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTc1ICBzZWNvbmQ9MTAwIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD03NSAgc2Vjb25kPTEwMSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9NzUgIHNlY29uZD0xMDMgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTc1ICBzZWNvbmQ9MTEzIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD03NSAgc2Vjb25kPTIzMSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9NzUgIHNlY29uZD0yMzIgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTc1ICBzZWNvbmQ9MjMzIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD03NSAgc2Vjb25kPTIzNCBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9NzUgIHNlY29uZD0yMzUgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTc1ICBzZWNvbmQ9NDUgIGFtb3VudD0tNVxua2VybmluZyBmaXJzdD03NSAgc2Vjb25kPTE3MyBhbW91bnQ9LTVcbmtlcm5pbmcgZmlyc3Q9NzUgIHNlY29uZD0xMDkgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTc1ICBzZWNvbmQ9MTEwIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD03NSAgc2Vjb25kPTExMiBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9NzUgIHNlY29uZD0yNDEgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTc2ICBzZWNvbmQ9MTE4IGFtb3VudD0tMTBcbmtlcm5pbmcgZmlyc3Q9NzYgIHNlY29uZD0xMjEgYW1vdW50PS0xMFxua2VybmluZyBmaXJzdD03NiAgc2Vjb25kPTI1MyBhbW91bnQ9LTEwXG5rZXJuaW5nIGZpcnN0PTc2ICBzZWNvbmQ9MjU1IGFtb3VudD0tMTBcbmtlcm5pbmcgZmlyc3Q9NzYgIHNlY29uZD02NyAgYW1vdW50PS01XG5rZXJuaW5nIGZpcnN0PTc2ICBzZWNvbmQ9NzEgIGFtb3VudD0tNVxua2VybmluZyBmaXJzdD03NiAgc2Vjb25kPTc5ICBhbW91bnQ9LTVcbmtlcm5pbmcgZmlyc3Q9NzYgIHNlY29uZD04MSAgYW1vdW50PS01XG5rZXJuaW5nIGZpcnN0PTc2ICBzZWNvbmQ9MjE2IGFtb3VudD0tNVxua2VybmluZyBmaXJzdD03NiAgc2Vjb25kPTE5OSBhbW91bnQ9LTVcbmtlcm5pbmcgZmlyc3Q9NzYgIHNlY29uZD0yMTAgYW1vdW50PS01XG5rZXJuaW5nIGZpcnN0PTc2ICBzZWNvbmQ9MjExIGFtb3VudD0tNVxua2VybmluZyBmaXJzdD03NiAgc2Vjb25kPTIxMiBhbW91bnQ9LTVcbmtlcm5pbmcgZmlyc3Q9NzYgIHNlY29uZD0yMTMgYW1vdW50PS01XG5rZXJuaW5nIGZpcnN0PTc2ICBzZWNvbmQ9MjE0IGFtb3VudD0tNVxua2VybmluZyBmaXJzdD03NiAgc2Vjb25kPTg1ICBhbW91bnQ9LTRcbmtlcm5pbmcgZmlyc3Q9NzYgIHNlY29uZD0yMTcgYW1vdW50PS00XG5rZXJuaW5nIGZpcnN0PTc2ICBzZWNvbmQ9MjE4IGFtb3VudD0tNFxua2VybmluZyBmaXJzdD03NiAgc2Vjb25kPTIxOSBhbW91bnQ9LTRcbmtlcm5pbmcgZmlyc3Q9NzYgIHNlY29uZD0yMjAgYW1vdW50PS00XG5rZXJuaW5nIGZpcnN0PTc2ICBzZWNvbmQ9MzQgIGFtb3VudD0tMjZcbmtlcm5pbmcgZmlyc3Q9NzYgIHNlY29uZD0zOSAgYW1vdW50PS0yNlxua2VybmluZyBmaXJzdD03NiAgc2Vjb25kPTg3ICBhbW91bnQ9LTExXG5rZXJuaW5nIGZpcnN0PTc2ICBzZWNvbmQ9ODQgIGFtb3VudD0tMjFcbmtlcm5pbmcgZmlyc3Q9NzYgIHNlY29uZD0xMTcgYW1vdW50PS0zXG5rZXJuaW5nIGZpcnN0PTc2ICBzZWNvbmQ9MjQ5IGFtb3VudD0tM1xua2VybmluZyBmaXJzdD03NiAgc2Vjb25kPTI1MCBhbW91bnQ9LTNcbmtlcm5pbmcgZmlyc3Q9NzYgIHNlY29uZD0yNTEgYW1vdW50PS0zXG5rZXJuaW5nIGZpcnN0PTc2ICBzZWNvbmQ9MjUyIGFtb3VudD0tM1xua2VybmluZyBmaXJzdD03NiAgc2Vjb25kPTg2ICBhbW91bnQ9LTE0XG5rZXJuaW5nIGZpcnN0PTc2ICBzZWNvbmQ9ODkgIGFtb3VudD0tMTlcbmtlcm5pbmcgZmlyc3Q9NzYgIHNlY29uZD0yMjEgYW1vdW50PS0xOVxua2VybmluZyBmaXJzdD03NiAgc2Vjb25kPTY1ICBhbW91bnQ9MVxua2VybmluZyBmaXJzdD03NiAgc2Vjb25kPTE5MiBhbW91bnQ9MVxua2VybmluZyBmaXJzdD03NiAgc2Vjb25kPTE5MyBhbW91bnQ9MVxua2VybmluZyBmaXJzdD03NiAgc2Vjb25kPTE5NCBhbW91bnQ9MVxua2VybmluZyBmaXJzdD03NiAgc2Vjb25kPTE5NSBhbW91bnQ9MVxua2VybmluZyBmaXJzdD03NiAgc2Vjb25kPTE5NiBhbW91bnQ9MVxua2VybmluZyBmaXJzdD03NiAgc2Vjb25kPTE5NyBhbW91bnQ9MVxua2VybmluZyBmaXJzdD03NyAgc2Vjb25kPTg0ICBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9NzcgIHNlY29uZD04OSAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTc3ICBzZWNvbmQ9MjIxIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD03NyAgc2Vjb25kPTY1ICBhbW91bnQ9MVxua2VybmluZyBmaXJzdD03NyAgc2Vjb25kPTE5MiBhbW91bnQ9MVxua2VybmluZyBmaXJzdD03NyAgc2Vjb25kPTE5MyBhbW91bnQ9MVxua2VybmluZyBmaXJzdD03NyAgc2Vjb25kPTE5NCBhbW91bnQ9MVxua2VybmluZyBmaXJzdD03NyAgc2Vjb25kPTE5NSBhbW91bnQ9MVxua2VybmluZyBmaXJzdD03NyAgc2Vjb25kPTE5NiBhbW91bnQ9MVxua2VybmluZyBmaXJzdD03NyAgc2Vjb25kPTE5NyBhbW91bnQ9MVxua2VybmluZyBmaXJzdD03NyAgc2Vjb25kPTg4ICBhbW91bnQ9MVxua2VybmluZyBmaXJzdD03OCAgc2Vjb25kPTg0ICBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9NzggIHNlY29uZD04OSAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTc4ICBzZWNvbmQ9MjIxIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD03OCAgc2Vjb25kPTY1ICBhbW91bnQ9MVxua2VybmluZyBmaXJzdD03OCAgc2Vjb25kPTE5MiBhbW91bnQ9MVxua2VybmluZyBmaXJzdD03OCAgc2Vjb25kPTE5MyBhbW91bnQ9MVxua2VybmluZyBmaXJzdD03OCAgc2Vjb25kPTE5NCBhbW91bnQ9MVxua2VybmluZyBmaXJzdD03OCAgc2Vjb25kPTE5NSBhbW91bnQ9MVxua2VybmluZyBmaXJzdD03OCAgc2Vjb25kPTE5NiBhbW91bnQ9MVxua2VybmluZyBmaXJzdD03OCAgc2Vjb25kPTE5NyBhbW91bnQ9MVxua2VybmluZyBmaXJzdD03OCAgc2Vjb25kPTg4ICBhbW91bnQ9MVxua2VybmluZyBmaXJzdD03OSAgc2Vjb25kPTg0ICBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9NzkgIHNlY29uZD04NiAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTc5ICBzZWNvbmQ9ODkgIGFtb3VudD0tM1xua2VybmluZyBmaXJzdD03OSAgc2Vjb25kPTIyMSBhbW91bnQ9LTNcbmtlcm5pbmcgZmlyc3Q9NzkgIHNlY29uZD02NSAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTc5ICBzZWNvbmQ9MTkyIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD03OSAgc2Vjb25kPTE5MyBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9NzkgIHNlY29uZD0xOTQgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTc5ICBzZWNvbmQ9MTk1IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD03OSAgc2Vjb25kPTE5NiBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9NzkgIHNlY29uZD0xOTcgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTc5ICBzZWNvbmQ9ODggIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD03OSAgc2Vjb25kPTQ0ICBhbW91bnQ9LThcbmtlcm5pbmcgZmlyc3Q9NzkgIHNlY29uZD00NiAgYW1vdW50PS04XG5rZXJuaW5nIGZpcnN0PTc5ICBzZWNvbmQ9OTAgIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD04MCAgc2Vjb25kPTExOCBhbW91bnQ9MVxua2VybmluZyBmaXJzdD04MCAgc2Vjb25kPTEyMSBhbW91bnQ9MVxua2VybmluZyBmaXJzdD04MCAgc2Vjb25kPTI1MyBhbW91bnQ9MVxua2VybmluZyBmaXJzdD04MCAgc2Vjb25kPTI1NSBhbW91bnQ9MVxua2VybmluZyBmaXJzdD04MCAgc2Vjb25kPTExMSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9ODAgIHNlY29uZD0yNDIgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTgwICBzZWNvbmQ9MjQzIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD04MCAgc2Vjb25kPTI0NCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9ODAgIHNlY29uZD0yNDUgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTgwICBzZWNvbmQ9MjQ2IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD04MCAgc2Vjb25kPTY1ICBhbW91bnQ9LTExXG5rZXJuaW5nIGZpcnN0PTgwICBzZWNvbmQ9MTkyIGFtb3VudD0tMTFcbmtlcm5pbmcgZmlyc3Q9ODAgIHNlY29uZD0xOTMgYW1vdW50PS0xMVxua2VybmluZyBmaXJzdD04MCAgc2Vjb25kPTE5NCBhbW91bnQ9LTExXG5rZXJuaW5nIGZpcnN0PTgwICBzZWNvbmQ9MTk1IGFtb3VudD0tMTFcbmtlcm5pbmcgZmlyc3Q9ODAgIHNlY29uZD0xOTYgYW1vdW50PS0xMVxua2VybmluZyBmaXJzdD04MCAgc2Vjb25kPTE5NyBhbW91bnQ9LTExXG5rZXJuaW5nIGZpcnN0PTgwICBzZWNvbmQ9ODggIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD04MCAgc2Vjb25kPTQ0ICBhbW91bnQ9LTI1XG5rZXJuaW5nIGZpcnN0PTgwICBzZWNvbmQ9NDYgIGFtb3VudD0tMjVcbmtlcm5pbmcgZmlyc3Q9ODAgIHNlY29uZD05MCAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTgwICBzZWNvbmQ9OTkgIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD04MCAgc2Vjb25kPTEwMCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9ODAgIHNlY29uZD0xMDEgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTgwICBzZWNvbmQ9MTAzIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD04MCAgc2Vjb25kPTExMyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9ODAgIHNlY29uZD0yMzEgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTgwICBzZWNvbmQ9MjMyIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD04MCAgc2Vjb25kPTIzMyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9ODAgIHNlY29uZD0yMzQgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTgwICBzZWNvbmQ9MjM1IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD04MCAgc2Vjb25kPTk3ICBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9ODAgIHNlY29uZD0yMjQgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTgwICBzZWNvbmQ9MjI1IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD04MCAgc2Vjb25kPTIyNiBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9ODAgIHNlY29uZD0yMjcgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTgwICBzZWNvbmQ9MjI4IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD04MCAgc2Vjb25kPTIyOSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9ODAgIHNlY29uZD03NCAgYW1vdW50PS0xNlxua2VybmluZyBmaXJzdD04NCAgc2Vjb25kPTExOCBhbW91bnQ9LTZcbmtlcm5pbmcgZmlyc3Q9ODQgIHNlY29uZD0xMjEgYW1vdW50PS02XG5rZXJuaW5nIGZpcnN0PTg0ICBzZWNvbmQ9MjUzIGFtb3VudD0tNlxua2VybmluZyBmaXJzdD04NCAgc2Vjb25kPTI1NSBhbW91bnQ9LTZcbmtlcm5pbmcgZmlyc3Q9ODQgIHNlY29uZD02NyAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTg0ICBzZWNvbmQ9NzEgIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD04NCAgc2Vjb25kPTc5ICBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9ODQgIHNlY29uZD04MSAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTg0ICBzZWNvbmQ9MjE2IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD04NCAgc2Vjb25kPTE5OSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9ODQgIHNlY29uZD0yMTAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTg0ICBzZWNvbmQ9MjExIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD04NCAgc2Vjb25kPTIxMiBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9ODQgIHNlY29uZD0yMTMgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTg0ICBzZWNvbmQ9MjE0IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD04NCAgc2Vjb25kPTExMSBhbW91bnQ9LThcbmtlcm5pbmcgZmlyc3Q9ODQgIHNlY29uZD0yNDIgYW1vdW50PS04XG5rZXJuaW5nIGZpcnN0PTg0ICBzZWNvbmQ9MjQzIGFtb3VudD0tOFxua2VybmluZyBmaXJzdD04NCAgc2Vjb25kPTI0NCBhbW91bnQ9LThcbmtlcm5pbmcgZmlyc3Q9ODQgIHNlY29uZD0yNDUgYW1vdW50PS04XG5rZXJuaW5nIGZpcnN0PTg0ICBzZWNvbmQ9MjQ2IGFtb3VudD0tOFxua2VybmluZyBmaXJzdD04NCAgc2Vjb25kPTg3ICBhbW91bnQ9MVxua2VybmluZyBmaXJzdD04NCAgc2Vjb25kPTg0ICBhbW91bnQ9MVxua2VybmluZyBmaXJzdD04NCAgc2Vjb25kPTExNyBhbW91bnQ9LTdcbmtlcm5pbmcgZmlyc3Q9ODQgIHNlY29uZD0yNDkgYW1vdW50PS03XG5rZXJuaW5nIGZpcnN0PTg0ICBzZWNvbmQ9MjUwIGFtb3VudD0tN1xua2VybmluZyBmaXJzdD04NCAgc2Vjb25kPTI1MSBhbW91bnQ9LTdcbmtlcm5pbmcgZmlyc3Q9ODQgIHNlY29uZD0yNTIgYW1vdW50PS03XG5rZXJuaW5nIGZpcnN0PTg0ICBzZWNvbmQ9MTIyIGFtb3VudD0tNVxua2VybmluZyBmaXJzdD04NCAgc2Vjb25kPTg2ICBhbW91bnQ9MVxua2VybmluZyBmaXJzdD04NCAgc2Vjb25kPTg5ICBhbW91bnQ9MVxua2VybmluZyBmaXJzdD04NCAgc2Vjb25kPTIyMSBhbW91bnQ9MVxua2VybmluZyBmaXJzdD04NCAgc2Vjb25kPTY1ICBhbW91bnQ9LTZcbmtlcm5pbmcgZmlyc3Q9ODQgIHNlY29uZD0xOTIgYW1vdW50PS02XG5rZXJuaW5nIGZpcnN0PTg0ICBzZWNvbmQ9MTkzIGFtb3VudD0tNlxua2VybmluZyBmaXJzdD04NCAgc2Vjb25kPTE5NCBhbW91bnQ9LTZcbmtlcm5pbmcgZmlyc3Q9ODQgIHNlY29uZD0xOTUgYW1vdW50PS02XG5rZXJuaW5nIGZpcnN0PTg0ICBzZWNvbmQ9MTk2IGFtb3VudD0tNlxua2VybmluZyBmaXJzdD04NCAgc2Vjb25kPTE5NyBhbW91bnQ9LTZcbmtlcm5pbmcgZmlyc3Q9ODQgIHNlY29uZD00NCAgYW1vdW50PS0xN1xua2VybmluZyBmaXJzdD04NCAgc2Vjb25kPTQ2ICBhbW91bnQ9LTE3XG5rZXJuaW5nIGZpcnN0PTg0ICBzZWNvbmQ9OTkgIGFtb3VudD0tOFxua2VybmluZyBmaXJzdD04NCAgc2Vjb25kPTEwMCBhbW91bnQ9LThcbmtlcm5pbmcgZmlyc3Q9ODQgIHNlY29uZD0xMDEgYW1vdW50PS04XG5rZXJuaW5nIGZpcnN0PTg0ICBzZWNvbmQ9MTAzIGFtb3VudD0tOFxua2VybmluZyBmaXJzdD04NCAgc2Vjb25kPTExMyBhbW91bnQ9LThcbmtlcm5pbmcgZmlyc3Q9ODQgIHNlY29uZD0yMzEgYW1vdW50PS04XG5rZXJuaW5nIGZpcnN0PTg0ICBzZWNvbmQ9MjMyIGFtb3VudD0tOFxua2VybmluZyBmaXJzdD04NCAgc2Vjb25kPTIzMyBhbW91bnQ9LThcbmtlcm5pbmcgZmlyc3Q9ODQgIHNlY29uZD0yMzQgYW1vdW50PS04XG5rZXJuaW5nIGZpcnN0PTg0ICBzZWNvbmQ9MjM1IGFtb3VudD0tOFxua2VybmluZyBmaXJzdD04NCAgc2Vjb25kPTEyMCBhbW91bnQ9LTZcbmtlcm5pbmcgZmlyc3Q9ODQgIHNlY29uZD00NSAgYW1vdW50PS0xOFxua2VybmluZyBmaXJzdD04NCAgc2Vjb25kPTE3MyBhbW91bnQ9LTE4XG5rZXJuaW5nIGZpcnN0PTg0ICBzZWNvbmQ9MTA5IGFtb3VudD0tOVxua2VybmluZyBmaXJzdD04NCAgc2Vjb25kPTExMCBhbW91bnQ9LTlcbmtlcm5pbmcgZmlyc3Q9ODQgIHNlY29uZD0xMTIgYW1vdW50PS05XG5rZXJuaW5nIGZpcnN0PTg0ICBzZWNvbmQ9MjQxIGFtb3VudD0tOVxua2VybmluZyBmaXJzdD04NCAgc2Vjb25kPTgzICBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9ODQgIHNlY29uZD05NyAgYW1vdW50PS05XG5rZXJuaW5nIGZpcnN0PTg0ICBzZWNvbmQ9MjI0IGFtb3VudD0tOVxua2VybmluZyBmaXJzdD04NCAgc2Vjb25kPTIyNSBhbW91bnQ9LTlcbmtlcm5pbmcgZmlyc3Q9ODQgIHNlY29uZD0yMjYgYW1vdW50PS05XG5rZXJuaW5nIGZpcnN0PTg0ICBzZWNvbmQ9MjI3IGFtb3VudD0tOVxua2VybmluZyBmaXJzdD04NCAgc2Vjb25kPTIyOCBhbW91bnQ9LTlcbmtlcm5pbmcgZmlyc3Q9ODQgIHNlY29uZD0yMjkgYW1vdW50PS05XG5rZXJuaW5nIGZpcnN0PTg0ICBzZWNvbmQ9MTE1IGFtb3VudD0tOVxua2VybmluZyBmaXJzdD04NCAgc2Vjb25kPTc0ICBhbW91bnQ9LTE5XG5rZXJuaW5nIGZpcnN0PTg1ICBzZWNvbmQ9NjUgIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD04NSAgc2Vjb25kPTE5MiBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9ODUgIHNlY29uZD0xOTMgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTg1ICBzZWNvbmQ9MTk0IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD04NSAgc2Vjb25kPTE5NSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9ODUgIHNlY29uZD0xOTYgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTg1ICBzZWNvbmQ9MTk3IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD04NiAgc2Vjb25kPTExOCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9ODYgIHNlY29uZD0xMjEgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTg2ICBzZWNvbmQ9MjUzIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD04NiAgc2Vjb25kPTI1NSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9ODYgIHNlY29uZD02NyAgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTg2ICBzZWNvbmQ9NzEgIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD04NiAgc2Vjb25kPTc5ICBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9ODYgIHNlY29uZD04MSAgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTg2ICBzZWNvbmQ9MjE2IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD04NiAgc2Vjb25kPTE5OSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9ODYgIHNlY29uZD0yMTAgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTg2ICBzZWNvbmQ9MjExIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD04NiAgc2Vjb25kPTIxMiBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9ODYgIHNlY29uZD0yMTMgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTg2ICBzZWNvbmQ9MjE0IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD04NiAgc2Vjb25kPTExMSBhbW91bnQ9LTRcbmtlcm5pbmcgZmlyc3Q9ODYgIHNlY29uZD0yNDIgYW1vdW50PS00XG5rZXJuaW5nIGZpcnN0PTg2ICBzZWNvbmQ9MjQzIGFtb3VudD0tNFxua2VybmluZyBmaXJzdD04NiAgc2Vjb25kPTI0NCBhbW91bnQ9LTRcbmtlcm5pbmcgZmlyc3Q9ODYgIHNlY29uZD0yNDUgYW1vdW50PS00XG5rZXJuaW5nIGZpcnN0PTg2ICBzZWNvbmQ9MjQ2IGFtb3VudD0tNFxua2VybmluZyBmaXJzdD04NiAgc2Vjb25kPTExNyBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9ODYgIHNlY29uZD0yNDkgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTg2ICBzZWNvbmQ9MjUwIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD04NiAgc2Vjb25kPTI1MSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9ODYgIHNlY29uZD0yNTIgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTg2ICBzZWNvbmQ9NjUgIGFtb3VudD0tNlxua2VybmluZyBmaXJzdD04NiAgc2Vjb25kPTE5MiBhbW91bnQ9LTZcbmtlcm5pbmcgZmlyc3Q9ODYgIHNlY29uZD0xOTMgYW1vdW50PS02XG5rZXJuaW5nIGZpcnN0PTg2ICBzZWNvbmQ9MTk0IGFtb3VudD0tNlxua2VybmluZyBmaXJzdD04NiAgc2Vjb25kPTE5NSBhbW91bnQ9LTZcbmtlcm5pbmcgZmlyc3Q9ODYgIHNlY29uZD0xOTYgYW1vdW50PS02XG5rZXJuaW5nIGZpcnN0PTg2ICBzZWNvbmQ9MTk3IGFtb3VudD0tNlxua2VybmluZyBmaXJzdD04NiAgc2Vjb25kPTQ0ICBhbW91bnQ9LTE4XG5rZXJuaW5nIGZpcnN0PTg2ICBzZWNvbmQ9NDYgIGFtb3VudD0tMThcbmtlcm5pbmcgZmlyc3Q9ODYgIHNlY29uZD05OSAgYW1vdW50PS0zXG5rZXJuaW5nIGZpcnN0PTg2ICBzZWNvbmQ9MTAwIGFtb3VudD0tM1xua2VybmluZyBmaXJzdD04NiAgc2Vjb25kPTEwMSBhbW91bnQ9LTNcbmtlcm5pbmcgZmlyc3Q9ODYgIHNlY29uZD0xMDMgYW1vdW50PS0zXG5rZXJuaW5nIGZpcnN0PTg2ICBzZWNvbmQ9MTEzIGFtb3VudD0tM1xua2VybmluZyBmaXJzdD04NiAgc2Vjb25kPTIzMSBhbW91bnQ9LTNcbmtlcm5pbmcgZmlyc3Q9ODYgIHNlY29uZD0yMzIgYW1vdW50PS0zXG5rZXJuaW5nIGZpcnN0PTg2ICBzZWNvbmQ9MjMzIGFtb3VudD0tM1xua2VybmluZyBmaXJzdD04NiAgc2Vjb25kPTIzNCBhbW91bnQ9LTNcbmtlcm5pbmcgZmlyc3Q9ODYgIHNlY29uZD0yMzUgYW1vdW50PS0zXG5rZXJuaW5nIGZpcnN0PTg2ICBzZWNvbmQ9NDUgIGFtb3VudD0tM1xua2VybmluZyBmaXJzdD04NiAgc2Vjb25kPTE3MyBhbW91bnQ9LTNcbmtlcm5pbmcgZmlyc3Q9ODYgIHNlY29uZD05NyAgYW1vdW50PS00XG5rZXJuaW5nIGZpcnN0PTg2ICBzZWNvbmQ9MjI0IGFtb3VudD0tNFxua2VybmluZyBmaXJzdD04NiAgc2Vjb25kPTIyNSBhbW91bnQ9LTRcbmtlcm5pbmcgZmlyc3Q9ODYgIHNlY29uZD0yMjYgYW1vdW50PS00XG5rZXJuaW5nIGZpcnN0PTg2ICBzZWNvbmQ9MjI3IGFtb3VudD0tNFxua2VybmluZyBmaXJzdD04NiAgc2Vjb25kPTIyOCBhbW91bnQ9LTRcbmtlcm5pbmcgZmlyc3Q9ODYgIHNlY29uZD0yMjkgYW1vdW50PS00XG5rZXJuaW5nIGZpcnN0PTg3ICBzZWNvbmQ9MTExIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD04NyAgc2Vjb25kPTI0MiBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9ODcgIHNlY29uZD0yNDMgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTg3ICBzZWNvbmQ9MjQ0IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD04NyAgc2Vjb25kPTI0NSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9ODcgIHNlY29uZD0yNDYgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTg3ICBzZWNvbmQ9ODQgIGFtb3VudD0xXG5rZXJuaW5nIGZpcnN0PTg3ICBzZWNvbmQ9MTE3IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD04NyAgc2Vjb25kPTI0OSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9ODcgIHNlY29uZD0yNTAgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTg3ICBzZWNvbmQ9MjUxIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD04NyAgc2Vjb25kPTI1MiBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9ODcgIHNlY29uZD02NSAgYW1vdW50PS0zXG5rZXJuaW5nIGZpcnN0PTg3ICBzZWNvbmQ9MTkyIGFtb3VudD0tM1xua2VybmluZyBmaXJzdD04NyAgc2Vjb25kPTE5MyBhbW91bnQ9LTNcbmtlcm5pbmcgZmlyc3Q9ODcgIHNlY29uZD0xOTQgYW1vdW50PS0zXG5rZXJuaW5nIGZpcnN0PTg3ICBzZWNvbmQ9MTk1IGFtb3VudD0tM1xua2VybmluZyBmaXJzdD04NyAgc2Vjb25kPTE5NiBhbW91bnQ9LTNcbmtlcm5pbmcgZmlyc3Q9ODcgIHNlY29uZD0xOTcgYW1vdW50PS0zXG5rZXJuaW5nIGZpcnN0PTg3ICBzZWNvbmQ9NDQgIGFtb3VudD0tMTBcbmtlcm5pbmcgZmlyc3Q9ODcgIHNlY29uZD00NiAgYW1vdW50PS0xMFxua2VybmluZyBmaXJzdD04NyAgc2Vjb25kPTk5ICBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9ODcgIHNlY29uZD0xMDAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTg3ICBzZWNvbmQ9MTAxIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD04NyAgc2Vjb25kPTEwMyBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9ODcgIHNlY29uZD0xMTMgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTg3ICBzZWNvbmQ9MjMxIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD04NyAgc2Vjb25kPTIzMiBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9ODcgIHNlY29uZD0yMzMgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTg3ICBzZWNvbmQ9MjM0IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD04NyAgc2Vjb25kPTIzNSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9ODcgIHNlY29uZD00NSAgYW1vdW50PS01XG5rZXJuaW5nIGZpcnN0PTg3ICBzZWNvbmQ9MTczIGFtb3VudD0tNVxua2VybmluZyBmaXJzdD04NyAgc2Vjb25kPTk3ICBhbW91bnQ9LTNcbmtlcm5pbmcgZmlyc3Q9ODcgIHNlY29uZD0yMjQgYW1vdW50PS0zXG5rZXJuaW5nIGZpcnN0PTg3ICBzZWNvbmQ9MjI1IGFtb3VudD0tM1xua2VybmluZyBmaXJzdD04NyAgc2Vjb25kPTIyNiBhbW91bnQ9LTNcbmtlcm5pbmcgZmlyc3Q9ODcgIHNlY29uZD0yMjcgYW1vdW50PS0zXG5rZXJuaW5nIGZpcnN0PTg3ICBzZWNvbmQ9MjI4IGFtb3VudD0tM1xua2VybmluZyBmaXJzdD04NyAgc2Vjb25kPTIyOSBhbW91bnQ9LTNcbmtlcm5pbmcgZmlyc3Q9ODggIHNlY29uZD0xMTggYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTg4ICBzZWNvbmQ9MTIxIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD04OCAgc2Vjb25kPTI1MyBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9ODggIHNlY29uZD0yNTUgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTg4ICBzZWNvbmQ9NjcgIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD04OCAgc2Vjb25kPTcxICBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9ODggIHNlY29uZD03OSAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTg4ICBzZWNvbmQ9ODEgIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD04OCAgc2Vjb25kPTIxNiBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9ODggIHNlY29uZD0xOTkgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTg4ICBzZWNvbmQ9MjEwIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD04OCAgc2Vjb25kPTIxMSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9ODggIHNlY29uZD0yMTIgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTg4ICBzZWNvbmQ9MjEzIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD04OCAgc2Vjb25kPTIxNCBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9ODggIHNlY29uZD0xMTEgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTg4ICBzZWNvbmQ9MjQyIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD04OCAgc2Vjb25kPTI0MyBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9ODggIHNlY29uZD0yNDQgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTg4ICBzZWNvbmQ9MjQ1IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD04OCAgc2Vjb25kPTI0NiBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9ODggIHNlY29uZD0xMTcgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTg4ICBzZWNvbmQ9MjQ5IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD04OCAgc2Vjb25kPTI1MCBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9ODggIHNlY29uZD0yNTEgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTg4ICBzZWNvbmQ9MjUyIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD04OCAgc2Vjb25kPTg2ICBhbW91bnQ9MVxua2VybmluZyBmaXJzdD04OCAgc2Vjb25kPTk5ICBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9ODggIHNlY29uZD0xMDAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTg4ICBzZWNvbmQ9MTAxIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD04OCAgc2Vjb25kPTEwMyBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9ODggIHNlY29uZD0xMTMgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTg4ICBzZWNvbmQ9MjMxIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD04OCAgc2Vjb25kPTIzMiBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9ODggIHNlY29uZD0yMzMgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTg4ICBzZWNvbmQ9MjM0IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD04OCAgc2Vjb25kPTIzNSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9ODggIHNlY29uZD00NSAgYW1vdW50PS00XG5rZXJuaW5nIGZpcnN0PTg4ICBzZWNvbmQ9MTczIGFtb3VudD0tNFxua2VybmluZyBmaXJzdD04OSAgc2Vjb25kPTExOCBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9ODkgIHNlY29uZD0xMjEgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTg5ICBzZWNvbmQ9MjUzIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD04OSAgc2Vjb25kPTI1NSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9ODkgIHNlY29uZD02NyAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTg5ICBzZWNvbmQ9NzEgIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD04OSAgc2Vjb25kPTc5ICBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9ODkgIHNlY29uZD04MSAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTg5ICBzZWNvbmQ9MjE2IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD04OSAgc2Vjb25kPTE5OSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9ODkgIHNlY29uZD0yMTAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTg5ICBzZWNvbmQ9MjExIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD04OSAgc2Vjb25kPTIxMiBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9ODkgIHNlY29uZD0yMTMgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTg5ICBzZWNvbmQ9MjE0IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD04OSAgc2Vjb25kPTg1ICBhbW91bnQ9LTdcbmtlcm5pbmcgZmlyc3Q9ODkgIHNlY29uZD0yMTcgYW1vdW50PS03XG5rZXJuaW5nIGZpcnN0PTg5ICBzZWNvbmQ9MjE4IGFtb3VudD0tN1xua2VybmluZyBmaXJzdD04OSAgc2Vjb25kPTIxOSBhbW91bnQ9LTdcbmtlcm5pbmcgZmlyc3Q9ODkgIHNlY29uZD0yMjAgYW1vdW50PS03XG5rZXJuaW5nIGZpcnN0PTg5ICBzZWNvbmQ9MTExIGFtb3VudD0tNVxua2VybmluZyBmaXJzdD04OSAgc2Vjb25kPTI0MiBhbW91bnQ9LTVcbmtlcm5pbmcgZmlyc3Q9ODkgIHNlY29uZD0yNDMgYW1vdW50PS01XG5rZXJuaW5nIGZpcnN0PTg5ICBzZWNvbmQ9MjQ0IGFtb3VudD0tNVxua2VybmluZyBmaXJzdD04OSAgc2Vjb25kPTI0NSBhbW91bnQ9LTVcbmtlcm5pbmcgZmlyc3Q9ODkgIHNlY29uZD0yNDYgYW1vdW50PS01XG5rZXJuaW5nIGZpcnN0PTg5ICBzZWNvbmQ9ODcgIGFtb3VudD0xXG5rZXJuaW5nIGZpcnN0PTg5ICBzZWNvbmQ9ODQgIGFtb3VudD0xXG5rZXJuaW5nIGZpcnN0PTg5ICBzZWNvbmQ9MTE3IGFtb3VudD0tM1xua2VybmluZyBmaXJzdD04OSAgc2Vjb25kPTI0OSBhbW91bnQ9LTNcbmtlcm5pbmcgZmlyc3Q9ODkgIHNlY29uZD0yNTAgYW1vdW50PS0zXG5rZXJuaW5nIGZpcnN0PTg5ICBzZWNvbmQ9MjUxIGFtb3VudD0tM1xua2VybmluZyBmaXJzdD04OSAgc2Vjb25kPTI1MiBhbW91bnQ9LTNcbmtlcm5pbmcgZmlyc3Q9ODkgIHNlY29uZD0xMjIgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTg5ICBzZWNvbmQ9ODYgIGFtb3VudD0xXG5rZXJuaW5nIGZpcnN0PTg5ICBzZWNvbmQ9ODkgIGFtb3VudD0xXG5rZXJuaW5nIGZpcnN0PTg5ICBzZWNvbmQ9MjIxIGFtb3VudD0xXG5rZXJuaW5nIGZpcnN0PTg5ICBzZWNvbmQ9NjUgIGFtb3VudD0tN1xua2VybmluZyBmaXJzdD04OSAgc2Vjb25kPTE5MiBhbW91bnQ9LTdcbmtlcm5pbmcgZmlyc3Q9ODkgIHNlY29uZD0xOTMgYW1vdW50PS03XG5rZXJuaW5nIGZpcnN0PTg5ICBzZWNvbmQ9MTk0IGFtb3VudD0tN1xua2VybmluZyBmaXJzdD04OSAgc2Vjb25kPTE5NSBhbW91bnQ9LTdcbmtlcm5pbmcgZmlyc3Q9ODkgIHNlY29uZD0xOTYgYW1vdW50PS03XG5rZXJuaW5nIGZpcnN0PTg5ICBzZWNvbmQ9MTk3IGFtb3VudD0tN1xua2VybmluZyBmaXJzdD04OSAgc2Vjb25kPTg4ICBhbW91bnQ9MVxua2VybmluZyBmaXJzdD04OSAgc2Vjb25kPTQ0ICBhbW91bnQ9LTE2XG5rZXJuaW5nIGZpcnN0PTg5ICBzZWNvbmQ9NDYgIGFtb3VudD0tMTZcbmtlcm5pbmcgZmlyc3Q9ODkgIHNlY29uZD05OSAgYW1vdW50PS01XG5rZXJuaW5nIGZpcnN0PTg5ICBzZWNvbmQ9MTAwIGFtb3VudD0tNVxua2VybmluZyBmaXJzdD04OSAgc2Vjb25kPTEwMSBhbW91bnQ9LTVcbmtlcm5pbmcgZmlyc3Q9ODkgIHNlY29uZD0xMDMgYW1vdW50PS01XG5rZXJuaW5nIGZpcnN0PTg5ICBzZWNvbmQ9MTEzIGFtb3VudD0tNVxua2VybmluZyBmaXJzdD04OSAgc2Vjb25kPTIzMSBhbW91bnQ9LTVcbmtlcm5pbmcgZmlyc3Q9ODkgIHNlY29uZD0yMzIgYW1vdW50PS01XG5rZXJuaW5nIGZpcnN0PTg5ICBzZWNvbmQ9MjMzIGFtb3VudD0tNVxua2VybmluZyBmaXJzdD04OSAgc2Vjb25kPTIzNCBhbW91bnQ9LTVcbmtlcm5pbmcgZmlyc3Q9ODkgIHNlY29uZD0yMzUgYW1vdW50PS01XG5rZXJuaW5nIGZpcnN0PTg5ICBzZWNvbmQ9MTIwIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD04OSAgc2Vjb25kPTQ1ICBhbW91bnQ9LTRcbmtlcm5pbmcgZmlyc3Q9ODkgIHNlY29uZD0xNzMgYW1vdW50PS00XG5rZXJuaW5nIGZpcnN0PTg5ICBzZWNvbmQ9MTA5IGFtb3VudD0tM1xua2VybmluZyBmaXJzdD04OSAgc2Vjb25kPTExMCBhbW91bnQ9LTNcbmtlcm5pbmcgZmlyc3Q9ODkgIHNlY29uZD0xMTIgYW1vdW50PS0zXG5rZXJuaW5nIGZpcnN0PTg5ICBzZWNvbmQ9MjQxIGFtb3VudD0tM1xua2VybmluZyBmaXJzdD04OSAgc2Vjb25kPTgzICBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9ODkgIHNlY29uZD05NyAgYW1vdW50PS02XG5rZXJuaW5nIGZpcnN0PTg5ICBzZWNvbmQ9MjI0IGFtb3VudD0tNlxua2VybmluZyBmaXJzdD04OSAgc2Vjb25kPTIyNSBhbW91bnQ9LTZcbmtlcm5pbmcgZmlyc3Q9ODkgIHNlY29uZD0yMjYgYW1vdW50PS02XG5rZXJuaW5nIGZpcnN0PTg5ICBzZWNvbmQ9MjI3IGFtb3VudD0tNlxua2VybmluZyBmaXJzdD04OSAgc2Vjb25kPTIyOCBhbW91bnQ9LTZcbmtlcm5pbmcgZmlyc3Q9ODkgIHNlY29uZD0yMjkgYW1vdW50PS02XG5rZXJuaW5nIGZpcnN0PTg5ICBzZWNvbmQ9MTE1IGFtb3VudD0tNVxua2VybmluZyBmaXJzdD04OSAgc2Vjb25kPTc0ICBhbW91bnQ9LTdcbmtlcm5pbmcgZmlyc3Q9OTAgIHNlY29uZD0xMTggYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTkwICBzZWNvbmQ9MTIxIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD05MCAgc2Vjb25kPTI1MyBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9OTAgIHNlY29uZD0yNTUgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTkwICBzZWNvbmQ9NjcgIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD05MCAgc2Vjb25kPTcxICBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9OTAgIHNlY29uZD03OSAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTkwICBzZWNvbmQ9ODEgIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD05MCAgc2Vjb25kPTIxNiBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9OTAgIHNlY29uZD0xOTkgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTkwICBzZWNvbmQ9MjEwIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD05MCAgc2Vjb25kPTIxMSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9OTAgIHNlY29uZD0yMTIgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTkwICBzZWNvbmQ9MjEzIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD05MCAgc2Vjb25kPTIxNCBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9OTAgIHNlY29uZD0xMTEgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTkwICBzZWNvbmQ9MjQyIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD05MCAgc2Vjb25kPTI0MyBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9OTAgIHNlY29uZD0yNDQgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTkwICBzZWNvbmQ9MjQ1IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD05MCAgc2Vjb25kPTI0NiBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9OTAgIHNlY29uZD0xMTcgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTkwICBzZWNvbmQ9MjQ5IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD05MCAgc2Vjb25kPTI1MCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9OTAgIHNlY29uZD0yNTEgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTkwICBzZWNvbmQ9MjUyIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD05MCAgc2Vjb25kPTY1ICBhbW91bnQ9MVxua2VybmluZyBmaXJzdD05MCAgc2Vjb25kPTE5MiBhbW91bnQ9MVxua2VybmluZyBmaXJzdD05MCAgc2Vjb25kPTE5MyBhbW91bnQ9MVxua2VybmluZyBmaXJzdD05MCAgc2Vjb25kPTE5NCBhbW91bnQ9MVxua2VybmluZyBmaXJzdD05MCAgc2Vjb25kPTE5NSBhbW91bnQ9MVxua2VybmluZyBmaXJzdD05MCAgc2Vjb25kPTE5NiBhbW91bnQ9MVxua2VybmluZyBmaXJzdD05MCAgc2Vjb25kPTE5NyBhbW91bnQ9MVxua2VybmluZyBmaXJzdD05MCAgc2Vjb25kPTk5ICBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9OTAgIHNlY29uZD0xMDAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTkwICBzZWNvbmQ9MTAxIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD05MCAgc2Vjb25kPTEwMyBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9OTAgIHNlY29uZD0xMTMgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTkwICBzZWNvbmQ9MjMxIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD05MCAgc2Vjb25kPTIzMiBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9OTAgIHNlY29uZD0yMzMgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTkwICBzZWNvbmQ9MjM0IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD05MCAgc2Vjb25kPTIzNSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9OTcgIHNlY29uZD0xMTggYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTk3ICBzZWNvbmQ9MTIxIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD05NyAgc2Vjb25kPTI1MyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9OTcgIHNlY29uZD0yNTUgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTk3ICBzZWNvbmQ9MzQgIGFtb3VudD0tNVxua2VybmluZyBmaXJzdD05NyAgc2Vjb25kPTM5ICBhbW91bnQ9LTVcbmtlcm5pbmcgZmlyc3Q9OTggIHNlY29uZD0xMTggYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTk4ICBzZWNvbmQ9MTIxIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD05OCAgc2Vjb25kPTI1MyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9OTggIHNlY29uZD0yNTUgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTk4ICBzZWNvbmQ9MzQgIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD05OCAgc2Vjb25kPTM5ICBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9OTggIHNlY29uZD0xMjIgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTk4ICBzZWNvbmQ9MTIwIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD05OSAgc2Vjb25kPTM0ICBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9OTkgIHNlY29uZD0zOSAgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTEwMSBzZWNvbmQ9MTE4IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xMDEgc2Vjb25kPTEyMSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTAxIHNlY29uZD0yNTMgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTEwMSBzZWNvbmQ9MjU1IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xMDEgc2Vjb25kPTM0ICBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTAxIHNlY29uZD0zOSAgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTEwNCBzZWNvbmQ9MzQgIGFtb3VudD0tOFxua2VybmluZyBmaXJzdD0xMDQgc2Vjb25kPTM5ICBhbW91bnQ9LThcbmtlcm5pbmcgZmlyc3Q9MTA5IHNlY29uZD0zNCAgYW1vdW50PS04XG5rZXJuaW5nIGZpcnN0PTEwOSBzZWNvbmQ9MzkgIGFtb3VudD0tOFxua2VybmluZyBmaXJzdD0xMTAgc2Vjb25kPTM0ICBhbW91bnQ9LThcbmtlcm5pbmcgZmlyc3Q9MTEwIHNlY29uZD0zOSAgYW1vdW50PS04XG5rZXJuaW5nIGZpcnN0PTExMSBzZWNvbmQ9MTE4IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xMTEgc2Vjb25kPTEyMSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTExIHNlY29uZD0yNTMgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTExMSBzZWNvbmQ9MjU1IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xMTEgc2Vjb25kPTM0ICBhbW91bnQ9LTExXG5rZXJuaW5nIGZpcnN0PTExMSBzZWNvbmQ9MzkgIGFtb3VudD0tMTFcbmtlcm5pbmcgZmlyc3Q9MTExIHNlY29uZD0xMjIgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTExMSBzZWNvbmQ9MTIwIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0xMTIgc2Vjb25kPTExOCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTEyIHNlY29uZD0xMjEgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTExMiBzZWNvbmQ9MjUzIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xMTIgc2Vjb25kPTI1NSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTEyIHNlY29uZD0zNCAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTExMiBzZWNvbmQ9MzkgIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0xMTIgc2Vjb25kPTEyMiBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTEyIHNlY29uZD0xMjAgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTExNCBzZWNvbmQ9MTE4IGFtb3VudD0xXG5rZXJuaW5nIGZpcnN0PTExNCBzZWNvbmQ9MTIxIGFtb3VudD0xXG5rZXJuaW5nIGZpcnN0PTExNCBzZWNvbmQ9MjUzIGFtb3VudD0xXG5rZXJuaW5nIGZpcnN0PTExNCBzZWNvbmQ9MjU1IGFtb3VudD0xXG5rZXJuaW5nIGZpcnN0PTExNCBzZWNvbmQ9MzQgIGFtb3VudD0xXG5rZXJuaW5nIGZpcnN0PTExNCBzZWNvbmQ9MzkgIGFtb3VudD0xXG5rZXJuaW5nIGZpcnN0PTExNCBzZWNvbmQ9MTExIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0xMTQgc2Vjb25kPTI0MiBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MTE0IHNlY29uZD0yNDMgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTExNCBzZWNvbmQ9MjQ0IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0xMTQgc2Vjb25kPTI0NSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MTE0IHNlY29uZD0yNDYgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTExNCBzZWNvbmQ9NDQgIGFtb3VudD0tMTBcbmtlcm5pbmcgZmlyc3Q9MTE0IHNlY29uZD00NiAgYW1vdW50PS0xMFxua2VybmluZyBmaXJzdD0xMTQgc2Vjb25kPTk5ICBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTE0IHNlY29uZD0xMDAgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTExNCBzZWNvbmQ9MTAxIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xMTQgc2Vjb25kPTEwMyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTE0IHNlY29uZD0xMTMgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTExNCBzZWNvbmQ9MjMxIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xMTQgc2Vjb25kPTIzMiBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTE0IHNlY29uZD0yMzMgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTExNCBzZWNvbmQ9MjM0IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xMTQgc2Vjb25kPTIzNSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTE0IHNlY29uZD05NyAgYW1vdW50PS0zXG5rZXJuaW5nIGZpcnN0PTExNCBzZWNvbmQ9MjI0IGFtb3VudD0tM1xua2VybmluZyBmaXJzdD0xMTQgc2Vjb25kPTIyNSBhbW91bnQ9LTNcbmtlcm5pbmcgZmlyc3Q9MTE0IHNlY29uZD0yMjYgYW1vdW50PS0zXG5rZXJuaW5nIGZpcnN0PTExNCBzZWNvbmQ9MjI3IGFtb3VudD0tM1xua2VybmluZyBmaXJzdD0xMTQgc2Vjb25kPTIyOCBhbW91bnQ9LTNcbmtlcm5pbmcgZmlyc3Q9MTE0IHNlY29uZD0yMjkgYW1vdW50PS0zXG5rZXJuaW5nIGZpcnN0PTExOCBzZWNvbmQ9MzQgIGFtb3VudD0xXG5rZXJuaW5nIGZpcnN0PTExOCBzZWNvbmQ9MzkgIGFtb3VudD0xXG5rZXJuaW5nIGZpcnN0PTExOCBzZWNvbmQ9MTExIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xMTggc2Vjb25kPTI0MiBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTE4IHNlY29uZD0yNDMgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTExOCBzZWNvbmQ9MjQ0IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xMTggc2Vjb25kPTI0NSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTE4IHNlY29uZD0yNDYgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTExOCBzZWNvbmQ9NDQgIGFtb3VudD0tOFxua2VybmluZyBmaXJzdD0xMTggc2Vjb25kPTQ2ICBhbW91bnQ9LThcbmtlcm5pbmcgZmlyc3Q9MTE4IHNlY29uZD05OSAgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTExOCBzZWNvbmQ9MTAwIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xMTggc2Vjb25kPTEwMSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTE4IHNlY29uZD0xMDMgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTExOCBzZWNvbmQ9MTEzIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xMTggc2Vjb25kPTIzMSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTE4IHNlY29uZD0yMzIgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTExOCBzZWNvbmQ9MjMzIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xMTggc2Vjb25kPTIzNCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTE4IHNlY29uZD0yMzUgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTExOCBzZWNvbmQ9OTcgIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xMTggc2Vjb25kPTIyNCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTE4IHNlY29uZD0yMjUgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTExOCBzZWNvbmQ9MjI2IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xMTggc2Vjb25kPTIyNyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTE4IHNlY29uZD0yMjggYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTExOCBzZWNvbmQ9MjI5IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xMjAgc2Vjb25kPTExMSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MTIwIHNlY29uZD0yNDIgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTEyMCBzZWNvbmQ9MjQzIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0xMjAgc2Vjb25kPTI0NCBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MTIwIHNlY29uZD0yNDUgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTEyMCBzZWNvbmQ9MjQ2IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0xMjAgc2Vjb25kPTk5ICBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MTIwIHNlY29uZD0xMDAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTEyMCBzZWNvbmQ9MTAxIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0xMjAgc2Vjb25kPTEwMyBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MTIwIHNlY29uZD0xMTMgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTEyMCBzZWNvbmQ9MjMxIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0xMjAgc2Vjb25kPTIzMiBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MTIwIHNlY29uZD0yMzMgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTEyMCBzZWNvbmQ9MjM0IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0xMjAgc2Vjb25kPTIzNSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MTIxIHNlY29uZD0zNCAgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MTIxIHNlY29uZD0zOSAgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MTIxIHNlY29uZD0xMTEgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTEyMSBzZWNvbmQ9MjQyIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xMjEgc2Vjb25kPTI0MyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTIxIHNlY29uZD0yNDQgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTEyMSBzZWNvbmQ9MjQ1IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xMjEgc2Vjb25kPTI0NiBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTIxIHNlY29uZD00NCAgYW1vdW50PS04XG5rZXJuaW5nIGZpcnN0PTEyMSBzZWNvbmQ9NDYgIGFtb3VudD0tOFxua2VybmluZyBmaXJzdD0xMjEgc2Vjb25kPTk5ICBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTIxIHNlY29uZD0xMDAgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTEyMSBzZWNvbmQ9MTAxIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xMjEgc2Vjb25kPTEwMyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTIxIHNlY29uZD0xMTMgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTEyMSBzZWNvbmQ9MjMxIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xMjEgc2Vjb25kPTIzMiBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTIxIHNlY29uZD0yMzMgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTEyMSBzZWNvbmQ9MjM0IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xMjEgc2Vjb25kPTIzNSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTIxIHNlY29uZD05NyAgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTEyMSBzZWNvbmQ9MjI0IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xMjEgc2Vjb25kPTIyNSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTIxIHNlY29uZD0yMjYgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTEyMSBzZWNvbmQ9MjI3IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xMjEgc2Vjb25kPTIyOCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTIxIHNlY29uZD0yMjkgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTEyMiBzZWNvbmQ9MTExIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xMjIgc2Vjb25kPTI0MiBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTIyIHNlY29uZD0yNDMgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTEyMiBzZWNvbmQ9MjQ0IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xMjIgc2Vjb25kPTI0NSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTIyIHNlY29uZD0yNDYgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTEyMiBzZWNvbmQ9OTkgIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xMjIgc2Vjb25kPTEwMCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTIyIHNlY29uZD0xMDEgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTEyMiBzZWNvbmQ9MTAzIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xMjIgc2Vjb25kPTExMyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTIyIHNlY29uZD0yMzEgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTEyMiBzZWNvbmQ9MjMyIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xMjIgc2Vjb25kPTIzMyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTIyIHNlY29uZD0yMzQgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTEyMiBzZWNvbmQ9MjM1IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yNTQgc2Vjb25kPTExOCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjU0IHNlY29uZD0xMjEgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTI1NCBzZWNvbmQ9MjUzIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yNTQgc2Vjb25kPTI1NSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjU0IHNlY29uZD0zNCAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTI1NCBzZWNvbmQ9MzkgIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yNTQgc2Vjb25kPTEyMiBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjU0IHNlY29uZD0xMjAgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIwOCBzZWNvbmQ9ODQgIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMDggc2Vjb25kPTg2ICBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjA4IHNlY29uZD04OSAgYW1vdW50PS0zXG5rZXJuaW5nIGZpcnN0PTIwOCBzZWNvbmQ9MjIxIGFtb3VudD0tM1xua2VybmluZyBmaXJzdD0yMDggc2Vjb25kPTY1ICBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjA4IHNlY29uZD0xOTIgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIwOCBzZWNvbmQ9MTkzIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMDggc2Vjb25kPTE5NCBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjA4IHNlY29uZD0xOTUgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIwOCBzZWNvbmQ9MTk2IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMDggc2Vjb25kPTE5NyBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjA4IHNlY29uZD04OCAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIwOCBzZWNvbmQ9NDQgIGFtb3VudD0tOFxua2VybmluZyBmaXJzdD0yMDggc2Vjb25kPTQ2ICBhbW91bnQ9LThcbmtlcm5pbmcgZmlyc3Q9MjA4IHNlY29uZD05MCAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTE5MiBzZWNvbmQ9MTE4IGFtb3VudD0tNFxua2VybmluZyBmaXJzdD0xOTIgc2Vjb25kPTEyMSBhbW91bnQ9LTRcbmtlcm5pbmcgZmlyc3Q9MTkyIHNlY29uZD0yNTMgYW1vdW50PS00XG5rZXJuaW5nIGZpcnN0PTE5MiBzZWNvbmQ9MjU1IGFtb3VudD0tNFxua2VybmluZyBmaXJzdD0xOTIgc2Vjb25kPTY3ICBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTkyIHNlY29uZD03MSAgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5MiBzZWNvbmQ9NzkgIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTIgc2Vjb25kPTgxICBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTkyIHNlY29uZD0yMTYgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5MiBzZWNvbmQ9MTk5IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTIgc2Vjb25kPTIxMCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTkyIHNlY29uZD0yMTEgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5MiBzZWNvbmQ9MjEyIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTIgc2Vjb25kPTIxMyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTkyIHNlY29uZD0yMTQgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5MiBzZWNvbmQ9ODUgIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTIgc2Vjb25kPTIxNyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTkyIHNlY29uZD0yMTggYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5MiBzZWNvbmQ9MjE5IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTIgc2Vjb25kPTIyMCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTkyIHNlY29uZD0zNCAgYW1vdW50PS05XG5rZXJuaW5nIGZpcnN0PTE5MiBzZWNvbmQ9MzkgIGFtb3VudD0tOVxua2VybmluZyBmaXJzdD0xOTIgc2Vjb25kPTExMSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTkyIHNlY29uZD0yNDIgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5MiBzZWNvbmQ9MjQzIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTIgc2Vjb25kPTI0NCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTkyIHNlY29uZD0yNDUgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5MiBzZWNvbmQ9MjQ2IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTIgc2Vjb25kPTg3ICBhbW91bnQ9LTVcbmtlcm5pbmcgZmlyc3Q9MTkyIHNlY29uZD04NCAgYW1vdW50PS0xMFxua2VybmluZyBmaXJzdD0xOTIgc2Vjb25kPTExNyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTkyIHNlY29uZD0yNDkgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5MiBzZWNvbmQ9MjUwIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTIgc2Vjb25kPTI1MSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTkyIHNlY29uZD0yNTIgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5MiBzZWNvbmQ9MTIyIGFtb3VudD0xXG5rZXJuaW5nIGZpcnN0PTE5MiBzZWNvbmQ9ODYgIGFtb3VudD0tN1xua2VybmluZyBmaXJzdD0xOTIgc2Vjb25kPTg5ICBhbW91bnQ9LTdcbmtlcm5pbmcgZmlyc3Q9MTkyIHNlY29uZD0yMjEgYW1vdW50PS03XG5rZXJuaW5nIGZpcnN0PTE5MyBzZWNvbmQ9MTE4IGFtb3VudD0tNFxua2VybmluZyBmaXJzdD0xOTMgc2Vjb25kPTEyMSBhbW91bnQ9LTRcbmtlcm5pbmcgZmlyc3Q9MTkzIHNlY29uZD0yNTMgYW1vdW50PS00XG5rZXJuaW5nIGZpcnN0PTE5MyBzZWNvbmQ9MjU1IGFtb3VudD0tNFxua2VybmluZyBmaXJzdD0xOTMgc2Vjb25kPTY3ICBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTkzIHNlY29uZD03MSAgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5MyBzZWNvbmQ9NzkgIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTMgc2Vjb25kPTgxICBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTkzIHNlY29uZD0yMTYgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5MyBzZWNvbmQ9MTk5IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTMgc2Vjb25kPTIxMCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTkzIHNlY29uZD0yMTEgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5MyBzZWNvbmQ9MjEyIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTMgc2Vjb25kPTIxMyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTkzIHNlY29uZD0yMTQgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5MyBzZWNvbmQ9ODUgIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTMgc2Vjb25kPTIxNyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTkzIHNlY29uZD0yMTggYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5MyBzZWNvbmQ9MjE5IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTMgc2Vjb25kPTIyMCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTkzIHNlY29uZD0zNCAgYW1vdW50PS05XG5rZXJuaW5nIGZpcnN0PTE5MyBzZWNvbmQ9MzkgIGFtb3VudD0tOVxua2VybmluZyBmaXJzdD0xOTMgc2Vjb25kPTExMSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTkzIHNlY29uZD0yNDIgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5MyBzZWNvbmQ9MjQzIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTMgc2Vjb25kPTI0NCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTkzIHNlY29uZD0yNDUgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5MyBzZWNvbmQ9MjQ2IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTMgc2Vjb25kPTg3ICBhbW91bnQ9LTVcbmtlcm5pbmcgZmlyc3Q9MTkzIHNlY29uZD04NCAgYW1vdW50PS0xMFxua2VybmluZyBmaXJzdD0xOTMgc2Vjb25kPTExNyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTkzIHNlY29uZD0yNDkgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5MyBzZWNvbmQ9MjUwIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTMgc2Vjb25kPTI1MSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTkzIHNlY29uZD0yNTIgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5MyBzZWNvbmQ9MTIyIGFtb3VudD0xXG5rZXJuaW5nIGZpcnN0PTE5MyBzZWNvbmQ9ODYgIGFtb3VudD0tN1xua2VybmluZyBmaXJzdD0xOTMgc2Vjb25kPTg5ICBhbW91bnQ9LTdcbmtlcm5pbmcgZmlyc3Q9MTkzIHNlY29uZD0yMjEgYW1vdW50PS03XG5rZXJuaW5nIGZpcnN0PTE5NCBzZWNvbmQ9MTE4IGFtb3VudD0tNFxua2VybmluZyBmaXJzdD0xOTQgc2Vjb25kPTEyMSBhbW91bnQ9LTRcbmtlcm5pbmcgZmlyc3Q9MTk0IHNlY29uZD0yNTMgYW1vdW50PS00XG5rZXJuaW5nIGZpcnN0PTE5NCBzZWNvbmQ9MjU1IGFtb3VudD0tNFxua2VybmluZyBmaXJzdD0xOTQgc2Vjb25kPTY3ICBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTk0IHNlY29uZD03MSAgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5NCBzZWNvbmQ9NzkgIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTQgc2Vjb25kPTgxICBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTk0IHNlY29uZD0yMTYgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5NCBzZWNvbmQ9MTk5IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTQgc2Vjb25kPTIxMCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTk0IHNlY29uZD0yMTEgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5NCBzZWNvbmQ9MjEyIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTQgc2Vjb25kPTIxMyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTk0IHNlY29uZD0yMTQgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5NCBzZWNvbmQ9ODUgIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTQgc2Vjb25kPTIxNyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTk0IHNlY29uZD0yMTggYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5NCBzZWNvbmQ9MjE5IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTQgc2Vjb25kPTIyMCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTk0IHNlY29uZD0zNCAgYW1vdW50PS05XG5rZXJuaW5nIGZpcnN0PTE5NCBzZWNvbmQ9MzkgIGFtb3VudD0tOVxua2VybmluZyBmaXJzdD0xOTQgc2Vjb25kPTExMSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTk0IHNlY29uZD0yNDIgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5NCBzZWNvbmQ9MjQzIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTQgc2Vjb25kPTI0NCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTk0IHNlY29uZD0yNDUgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5NCBzZWNvbmQ9MjQ2IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTQgc2Vjb25kPTg3ICBhbW91bnQ9LTVcbmtlcm5pbmcgZmlyc3Q9MTk0IHNlY29uZD04NCAgYW1vdW50PS0xMFxua2VybmluZyBmaXJzdD0xOTQgc2Vjb25kPTExNyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTk0IHNlY29uZD0yNDkgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5NCBzZWNvbmQ9MjUwIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTQgc2Vjb25kPTI1MSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTk0IHNlY29uZD0yNTIgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5NCBzZWNvbmQ9MTIyIGFtb3VudD0xXG5rZXJuaW5nIGZpcnN0PTE5NCBzZWNvbmQ9ODYgIGFtb3VudD0tN1xua2VybmluZyBmaXJzdD0xOTQgc2Vjb25kPTg5ICBhbW91bnQ9LTdcbmtlcm5pbmcgZmlyc3Q9MTk0IHNlY29uZD0yMjEgYW1vdW50PS03XG5rZXJuaW5nIGZpcnN0PTE5NSBzZWNvbmQ9MTE4IGFtb3VudD0tNFxua2VybmluZyBmaXJzdD0xOTUgc2Vjb25kPTEyMSBhbW91bnQ9LTRcbmtlcm5pbmcgZmlyc3Q9MTk1IHNlY29uZD0yNTMgYW1vdW50PS00XG5rZXJuaW5nIGZpcnN0PTE5NSBzZWNvbmQ9MjU1IGFtb3VudD0tNFxua2VybmluZyBmaXJzdD0xOTUgc2Vjb25kPTY3ICBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTk1IHNlY29uZD03MSAgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5NSBzZWNvbmQ9NzkgIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTUgc2Vjb25kPTgxICBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTk1IHNlY29uZD0yMTYgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5NSBzZWNvbmQ9MTk5IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTUgc2Vjb25kPTIxMCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTk1IHNlY29uZD0yMTEgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5NSBzZWNvbmQ9MjEyIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTUgc2Vjb25kPTIxMyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTk1IHNlY29uZD0yMTQgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5NSBzZWNvbmQ9ODUgIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTUgc2Vjb25kPTIxNyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTk1IHNlY29uZD0yMTggYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5NSBzZWNvbmQ9MjE5IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTUgc2Vjb25kPTIyMCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTk1IHNlY29uZD0zNCAgYW1vdW50PS05XG5rZXJuaW5nIGZpcnN0PTE5NSBzZWNvbmQ9MzkgIGFtb3VudD0tOVxua2VybmluZyBmaXJzdD0xOTUgc2Vjb25kPTExMSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTk1IHNlY29uZD0yNDIgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5NSBzZWNvbmQ9MjQzIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTUgc2Vjb25kPTI0NCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTk1IHNlY29uZD0yNDUgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5NSBzZWNvbmQ9MjQ2IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTUgc2Vjb25kPTg3ICBhbW91bnQ9LTVcbmtlcm5pbmcgZmlyc3Q9MTk1IHNlY29uZD04NCAgYW1vdW50PS0xMFxua2VybmluZyBmaXJzdD0xOTUgc2Vjb25kPTExNyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTk1IHNlY29uZD0yNDkgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5NSBzZWNvbmQ9MjUwIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTUgc2Vjb25kPTI1MSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTk1IHNlY29uZD0yNTIgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5NSBzZWNvbmQ9MTIyIGFtb3VudD0xXG5rZXJuaW5nIGZpcnN0PTE5NSBzZWNvbmQ9ODYgIGFtb3VudD0tN1xua2VybmluZyBmaXJzdD0xOTUgc2Vjb25kPTg5ICBhbW91bnQ9LTdcbmtlcm5pbmcgZmlyc3Q9MTk1IHNlY29uZD0yMjEgYW1vdW50PS03XG5rZXJuaW5nIGZpcnN0PTE5NiBzZWNvbmQ9MTE4IGFtb3VudD0tNFxua2VybmluZyBmaXJzdD0xOTYgc2Vjb25kPTEyMSBhbW91bnQ9LTRcbmtlcm5pbmcgZmlyc3Q9MTk2IHNlY29uZD0yNTMgYW1vdW50PS00XG5rZXJuaW5nIGZpcnN0PTE5NiBzZWNvbmQ9MjU1IGFtb3VudD0tNFxua2VybmluZyBmaXJzdD0xOTYgc2Vjb25kPTY3ICBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTk2IHNlY29uZD03MSAgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5NiBzZWNvbmQ9NzkgIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTYgc2Vjb25kPTgxICBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTk2IHNlY29uZD0yMTYgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5NiBzZWNvbmQ9MTk5IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTYgc2Vjb25kPTIxMCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTk2IHNlY29uZD0yMTEgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5NiBzZWNvbmQ9MjEyIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTYgc2Vjb25kPTIxMyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTk2IHNlY29uZD0yMTQgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5NiBzZWNvbmQ9ODUgIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTYgc2Vjb25kPTIxNyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTk2IHNlY29uZD0yMTggYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5NiBzZWNvbmQ9MjE5IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTYgc2Vjb25kPTIyMCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTk2IHNlY29uZD0zNCAgYW1vdW50PS05XG5rZXJuaW5nIGZpcnN0PTE5NiBzZWNvbmQ9MzkgIGFtb3VudD0tOVxua2VybmluZyBmaXJzdD0xOTYgc2Vjb25kPTExMSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTk2IHNlY29uZD0yNDIgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5NiBzZWNvbmQ9MjQzIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTYgc2Vjb25kPTI0NCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTk2IHNlY29uZD0yNDUgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5NiBzZWNvbmQ9MjQ2IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTYgc2Vjb25kPTg3ICBhbW91bnQ9LTVcbmtlcm5pbmcgZmlyc3Q9MTk2IHNlY29uZD04NCAgYW1vdW50PS0xMFxua2VybmluZyBmaXJzdD0xOTYgc2Vjb25kPTExNyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTk2IHNlY29uZD0yNDkgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5NiBzZWNvbmQ9MjUwIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTYgc2Vjb25kPTI1MSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTk2IHNlY29uZD0yNTIgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5NiBzZWNvbmQ9MTIyIGFtb3VudD0xXG5rZXJuaW5nIGZpcnN0PTE5NiBzZWNvbmQ9ODYgIGFtb3VudD0tN1xua2VybmluZyBmaXJzdD0xOTYgc2Vjb25kPTg5ICBhbW91bnQ9LTdcbmtlcm5pbmcgZmlyc3Q9MTk2IHNlY29uZD0yMjEgYW1vdW50PS03XG5rZXJuaW5nIGZpcnN0PTE5NyBzZWNvbmQ9MTE4IGFtb3VudD0tNFxua2VybmluZyBmaXJzdD0xOTcgc2Vjb25kPTEyMSBhbW91bnQ9LTRcbmtlcm5pbmcgZmlyc3Q9MTk3IHNlY29uZD0yNTMgYW1vdW50PS00XG5rZXJuaW5nIGZpcnN0PTE5NyBzZWNvbmQ9MjU1IGFtb3VudD0tNFxua2VybmluZyBmaXJzdD0xOTcgc2Vjb25kPTY3ICBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTk3IHNlY29uZD03MSAgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5NyBzZWNvbmQ9NzkgIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTcgc2Vjb25kPTgxICBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTk3IHNlY29uZD0yMTYgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5NyBzZWNvbmQ9MTk5IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTcgc2Vjb25kPTIxMCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTk3IHNlY29uZD0yMTEgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5NyBzZWNvbmQ9MjEyIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTcgc2Vjb25kPTIxMyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTk3IHNlY29uZD0yMTQgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5NyBzZWNvbmQ9ODUgIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTcgc2Vjb25kPTIxNyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTk3IHNlY29uZD0yMTggYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5NyBzZWNvbmQ9MjE5IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTcgc2Vjb25kPTIyMCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTk3IHNlY29uZD0zNCAgYW1vdW50PS05XG5rZXJuaW5nIGZpcnN0PTE5NyBzZWNvbmQ9MzkgIGFtb3VudD0tOVxua2VybmluZyBmaXJzdD0xOTcgc2Vjb25kPTExMSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTk3IHNlY29uZD0yNDIgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5NyBzZWNvbmQ9MjQzIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTcgc2Vjb25kPTI0NCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTk3IHNlY29uZD0yNDUgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5NyBzZWNvbmQ9MjQ2IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTcgc2Vjb25kPTg3ICBhbW91bnQ9LTVcbmtlcm5pbmcgZmlyc3Q9MTk3IHNlY29uZD04NCAgYW1vdW50PS0xMFxua2VybmluZyBmaXJzdD0xOTcgc2Vjb25kPTExNyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTk3IHNlY29uZD0yNDkgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5NyBzZWNvbmQ9MjUwIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0xOTcgc2Vjb25kPTI1MSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MTk3IHNlY29uZD0yNTIgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTE5NyBzZWNvbmQ9MTIyIGFtb3VudD0xXG5rZXJuaW5nIGZpcnN0PTE5NyBzZWNvbmQ9ODYgIGFtb3VudD0tN1xua2VybmluZyBmaXJzdD0xOTcgc2Vjb25kPTg5ICBhbW91bnQ9LTdcbmtlcm5pbmcgZmlyc3Q9MTk3IHNlY29uZD0yMjEgYW1vdW50PS03XG5rZXJuaW5nIGZpcnN0PTE5OSBzZWNvbmQ9ODQgIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMDAgc2Vjb25kPTExOCBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjAwIHNlY29uZD0xMjEgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIwMCBzZWNvbmQ9MjUzIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMDAgc2Vjb25kPTI1NSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjAwIHNlY29uZD0xMTEgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIwMCBzZWNvbmQ9MjQyIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMDAgc2Vjb25kPTI0MyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjAwIHNlY29uZD0yNDQgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIwMCBzZWNvbmQ9MjQ1IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMDAgc2Vjb25kPTI0NiBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjAwIHNlY29uZD04NCAgYW1vdW50PTJcbmtlcm5pbmcgZmlyc3Q9MjAwIHNlY29uZD0xMTcgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIwMCBzZWNvbmQ9MjQ5IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMDAgc2Vjb25kPTI1MCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjAwIHNlY29uZD0yNTEgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIwMCBzZWNvbmQ9MjUyIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMDAgc2Vjb25kPTk5ICBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjAwIHNlY29uZD0xMDAgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIwMCBzZWNvbmQ9MTAxIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMDAgc2Vjb25kPTEwMyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjAwIHNlY29uZD0xMTMgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIwMCBzZWNvbmQ9MjMxIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMDAgc2Vjb25kPTIzMiBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjAwIHNlY29uZD0yMzMgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIwMCBzZWNvbmQ9MjM0IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMDAgc2Vjb25kPTIzNSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjAxIHNlY29uZD0xMTggYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIwMSBzZWNvbmQ9MTIxIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMDEgc2Vjb25kPTI1MyBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjAxIHNlY29uZD0yNTUgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIwMSBzZWNvbmQ9MTExIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMDEgc2Vjb25kPTI0MiBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjAxIHNlY29uZD0yNDMgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIwMSBzZWNvbmQ9MjQ0IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMDEgc2Vjb25kPTI0NSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjAxIHNlY29uZD0yNDYgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIwMSBzZWNvbmQ9ODQgIGFtb3VudD0yXG5rZXJuaW5nIGZpcnN0PTIwMSBzZWNvbmQ9MTE3IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMDEgc2Vjb25kPTI0OSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjAxIHNlY29uZD0yNTAgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIwMSBzZWNvbmQ9MjUxIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMDEgc2Vjb25kPTI1MiBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjAxIHNlY29uZD05OSAgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIwMSBzZWNvbmQ9MTAwIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMDEgc2Vjb25kPTEwMSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjAxIHNlY29uZD0xMDMgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIwMSBzZWNvbmQ9MTEzIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMDEgc2Vjb25kPTIzMSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjAxIHNlY29uZD0yMzIgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIwMSBzZWNvbmQ9MjMzIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMDEgc2Vjb25kPTIzNCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjAxIHNlY29uZD0yMzUgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIwMiBzZWNvbmQ9MTE4IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMDIgc2Vjb25kPTEyMSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjAyIHNlY29uZD0yNTMgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIwMiBzZWNvbmQ9MjU1IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMDIgc2Vjb25kPTExMSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjAyIHNlY29uZD0yNDIgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIwMiBzZWNvbmQ9MjQzIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMDIgc2Vjb25kPTI0NCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjAyIHNlY29uZD0yNDUgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIwMiBzZWNvbmQ9MjQ2IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMDIgc2Vjb25kPTg0ICBhbW91bnQ9Mlxua2VybmluZyBmaXJzdD0yMDIgc2Vjb25kPTExNyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjAyIHNlY29uZD0yNDkgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIwMiBzZWNvbmQ9MjUwIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMDIgc2Vjb25kPTI1MSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjAyIHNlY29uZD0yNTIgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIwMiBzZWNvbmQ9OTkgIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMDIgc2Vjb25kPTEwMCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjAyIHNlY29uZD0xMDEgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIwMiBzZWNvbmQ9MTAzIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMDIgc2Vjb25kPTExMyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjAyIHNlY29uZD0yMzEgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIwMiBzZWNvbmQ9MjMyIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMDIgc2Vjb25kPTIzMyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjAyIHNlY29uZD0yMzQgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIwMiBzZWNvbmQ9MjM1IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMDMgc2Vjb25kPTExOCBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjAzIHNlY29uZD0xMjEgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIwMyBzZWNvbmQ9MjUzIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMDMgc2Vjb25kPTI1NSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjAzIHNlY29uZD0xMTEgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIwMyBzZWNvbmQ9MjQyIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMDMgc2Vjb25kPTI0MyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjAzIHNlY29uZD0yNDQgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIwMyBzZWNvbmQ9MjQ1IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMDMgc2Vjb25kPTI0NiBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjAzIHNlY29uZD04NCAgYW1vdW50PTJcbmtlcm5pbmcgZmlyc3Q9MjAzIHNlY29uZD0xMTcgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIwMyBzZWNvbmQ9MjQ5IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMDMgc2Vjb25kPTI1MCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjAzIHNlY29uZD0yNTEgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIwMyBzZWNvbmQ9MjUyIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMDMgc2Vjb25kPTk5ICBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjAzIHNlY29uZD0xMDAgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIwMyBzZWNvbmQ9MTAxIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMDMgc2Vjb25kPTEwMyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjAzIHNlY29uZD0xMTMgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIwMyBzZWNvbmQ9MjMxIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMDMgc2Vjb25kPTIzMiBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjAzIHNlY29uZD0yMzMgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIwMyBzZWNvbmQ9MjM0IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMDMgc2Vjb25kPTIzNSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjA0IHNlY29uZD04NCAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIwNCBzZWNvbmQ9ODkgIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMDQgc2Vjb25kPTIyMSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjA0IHNlY29uZD02NSAgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjA0IHNlY29uZD0xOTIgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjA0IHNlY29uZD0xOTMgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjA0IHNlY29uZD0xOTQgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjA0IHNlY29uZD0xOTUgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjA0IHNlY29uZD0xOTYgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjA0IHNlY29uZD0xOTcgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjA0IHNlY29uZD04OCAgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjA1IHNlY29uZD04NCAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIwNSBzZWNvbmQ9ODkgIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMDUgc2Vjb25kPTIyMSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjA1IHNlY29uZD02NSAgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjA1IHNlY29uZD0xOTIgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjA1IHNlY29uZD0xOTMgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjA1IHNlY29uZD0xOTQgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjA1IHNlY29uZD0xOTUgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjA1IHNlY29uZD0xOTYgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjA1IHNlY29uZD0xOTcgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjA1IHNlY29uZD04OCAgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjA2IHNlY29uZD04NCAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIwNiBzZWNvbmQ9ODkgIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMDYgc2Vjb25kPTIyMSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjA2IHNlY29uZD02NSAgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjA2IHNlY29uZD0xOTIgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjA2IHNlY29uZD0xOTMgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjA2IHNlY29uZD0xOTQgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjA2IHNlY29uZD0xOTUgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjA2IHNlY29uZD0xOTYgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjA2IHNlY29uZD0xOTcgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjA2IHNlY29uZD04OCAgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjA3IHNlY29uZD04NCAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIwNyBzZWNvbmQ9ODkgIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMDcgc2Vjb25kPTIyMSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjA3IHNlY29uZD02NSAgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjA3IHNlY29uZD0xOTIgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjA3IHNlY29uZD0xOTMgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjA3IHNlY29uZD0xOTQgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjA3IHNlY29uZD0xOTUgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjA3IHNlY29uZD0xOTYgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjA3IHNlY29uZD0xOTcgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjA3IHNlY29uZD04OCAgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjA5IHNlY29uZD04NCAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIwOSBzZWNvbmQ9ODkgIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMDkgc2Vjb25kPTIyMSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjA5IHNlY29uZD02NSAgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjA5IHNlY29uZD0xOTIgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjA5IHNlY29uZD0xOTMgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjA5IHNlY29uZD0xOTQgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjA5IHNlY29uZD0xOTUgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjA5IHNlY29uZD0xOTYgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjA5IHNlY29uZD0xOTcgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjA5IHNlY29uZD04OCAgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjEwIHNlY29uZD04NCAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIxMCBzZWNvbmQ9ODYgIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMTAgc2Vjb25kPTg5ICBhbW91bnQ9LTNcbmtlcm5pbmcgZmlyc3Q9MjEwIHNlY29uZD0yMjEgYW1vdW50PS0zXG5rZXJuaW5nIGZpcnN0PTIxMCBzZWNvbmQ9NjUgIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMTAgc2Vjb25kPTE5MiBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjEwIHNlY29uZD0xOTMgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIxMCBzZWNvbmQ9MTk0IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMTAgc2Vjb25kPTE5NSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjEwIHNlY29uZD0xOTYgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIxMCBzZWNvbmQ9MTk3IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMTAgc2Vjb25kPTg4ICBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjEwIHNlY29uZD00NCAgYW1vdW50PS04XG5rZXJuaW5nIGZpcnN0PTIxMCBzZWNvbmQ9NDYgIGFtb3VudD0tOFxua2VybmluZyBmaXJzdD0yMTAgc2Vjb25kPTkwICBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjExIHNlY29uZD04NCAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIxMSBzZWNvbmQ9ODYgIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMTEgc2Vjb25kPTg5ICBhbW91bnQ9LTNcbmtlcm5pbmcgZmlyc3Q9MjExIHNlY29uZD0yMjEgYW1vdW50PS0zXG5rZXJuaW5nIGZpcnN0PTIxMSBzZWNvbmQ9NjUgIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMTEgc2Vjb25kPTE5MiBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjExIHNlY29uZD0xOTMgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIxMSBzZWNvbmQ9MTk0IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMTEgc2Vjb25kPTE5NSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjExIHNlY29uZD0xOTYgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIxMSBzZWNvbmQ9MTk3IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMTEgc2Vjb25kPTg4ICBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjExIHNlY29uZD00NCAgYW1vdW50PS04XG5rZXJuaW5nIGZpcnN0PTIxMSBzZWNvbmQ9NDYgIGFtb3VudD0tOFxua2VybmluZyBmaXJzdD0yMTEgc2Vjb25kPTkwICBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjEyIHNlY29uZD04NCAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIxMiBzZWNvbmQ9ODYgIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMTIgc2Vjb25kPTg5ICBhbW91bnQ9LTNcbmtlcm5pbmcgZmlyc3Q9MjEyIHNlY29uZD0yMjEgYW1vdW50PS0zXG5rZXJuaW5nIGZpcnN0PTIxMiBzZWNvbmQ9NjUgIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMTIgc2Vjb25kPTE5MiBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjEyIHNlY29uZD0xOTMgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIxMiBzZWNvbmQ9MTk0IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMTIgc2Vjb25kPTE5NSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjEyIHNlY29uZD0xOTYgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIxMiBzZWNvbmQ9MTk3IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMTIgc2Vjb25kPTg4ICBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjEyIHNlY29uZD00NCAgYW1vdW50PS04XG5rZXJuaW5nIGZpcnN0PTIxMiBzZWNvbmQ9NDYgIGFtb3VudD0tOFxua2VybmluZyBmaXJzdD0yMTIgc2Vjb25kPTkwICBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjEzIHNlY29uZD04NCAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIxMyBzZWNvbmQ9ODYgIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMTMgc2Vjb25kPTg5ICBhbW91bnQ9LTNcbmtlcm5pbmcgZmlyc3Q9MjEzIHNlY29uZD0yMjEgYW1vdW50PS0zXG5rZXJuaW5nIGZpcnN0PTIxMyBzZWNvbmQ9NjUgIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMTMgc2Vjb25kPTE5MiBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjEzIHNlY29uZD0xOTMgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIxMyBzZWNvbmQ9MTk0IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMTMgc2Vjb25kPTE5NSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjEzIHNlY29uZD0xOTYgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIxMyBzZWNvbmQ9MTk3IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMTMgc2Vjb25kPTg4ICBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjEzIHNlY29uZD00NCAgYW1vdW50PS04XG5rZXJuaW5nIGZpcnN0PTIxMyBzZWNvbmQ9NDYgIGFtb3VudD0tOFxua2VybmluZyBmaXJzdD0yMTMgc2Vjb25kPTkwICBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjE0IHNlY29uZD04NCAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIxNCBzZWNvbmQ9ODYgIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMTQgc2Vjb25kPTg5ICBhbW91bnQ9LTNcbmtlcm5pbmcgZmlyc3Q9MjE0IHNlY29uZD0yMjEgYW1vdW50PS0zXG5rZXJuaW5nIGZpcnN0PTIxNCBzZWNvbmQ9NjUgIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMTQgc2Vjb25kPTE5MiBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjE0IHNlY29uZD0xOTMgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIxNCBzZWNvbmQ9MTk0IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMTQgc2Vjb25kPTE5NSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjE0IHNlY29uZD0xOTYgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIxNCBzZWNvbmQ9MTk3IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMTQgc2Vjb25kPTg4ICBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjE0IHNlY29uZD00NCAgYW1vdW50PS04XG5rZXJuaW5nIGZpcnN0PTIxNCBzZWNvbmQ9NDYgIGFtb3VudD0tOFxua2VybmluZyBmaXJzdD0yMTQgc2Vjb25kPTkwICBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjE3IHNlY29uZD02NSAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIxNyBzZWNvbmQ9MTkyIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMTcgc2Vjb25kPTE5MyBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjE3IHNlY29uZD0xOTQgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIxNyBzZWNvbmQ9MTk1IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMTcgc2Vjb25kPTE5NiBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjE3IHNlY29uZD0xOTcgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIxOCBzZWNvbmQ9NjUgIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMTggc2Vjb25kPTE5MiBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjE4IHNlY29uZD0xOTMgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIxOCBzZWNvbmQ9MTk0IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMTggc2Vjb25kPTE5NSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjE4IHNlY29uZD0xOTYgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIxOCBzZWNvbmQ9MTk3IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMTkgc2Vjb25kPTY1ICBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjE5IHNlY29uZD0xOTIgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIxOSBzZWNvbmQ9MTkzIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMTkgc2Vjb25kPTE5NCBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjE5IHNlY29uZD0xOTUgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIxOSBzZWNvbmQ9MTk2IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMTkgc2Vjb25kPTE5NyBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjIwIHNlY29uZD02NSAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIyMCBzZWNvbmQ9MTkyIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMjAgc2Vjb25kPTE5MyBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjIwIHNlY29uZD0xOTQgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIyMCBzZWNvbmQ9MTk1IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMjAgc2Vjb25kPTE5NiBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjIwIHNlY29uZD0xOTcgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIyMSBzZWNvbmQ9MTE4IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMjEgc2Vjb25kPTEyMSBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjIxIHNlY29uZD0yNTMgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIyMSBzZWNvbmQ9MjU1IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMjEgc2Vjb25kPTY3ICBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjIxIHNlY29uZD03MSAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIyMSBzZWNvbmQ9NzkgIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMjEgc2Vjb25kPTgxICBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjIxIHNlY29uZD0yMTYgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIyMSBzZWNvbmQ9MTk5IGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMjEgc2Vjb25kPTIxMCBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjIxIHNlY29uZD0yMTEgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIyMSBzZWNvbmQ9MjEyIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yMjEgc2Vjb25kPTIxMyBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjIxIHNlY29uZD0yMTQgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIyMSBzZWNvbmQ9ODUgIGFtb3VudD0tN1xua2VybmluZyBmaXJzdD0yMjEgc2Vjb25kPTIxNyBhbW91bnQ9LTdcbmtlcm5pbmcgZmlyc3Q9MjIxIHNlY29uZD0yMTggYW1vdW50PS03XG5rZXJuaW5nIGZpcnN0PTIyMSBzZWNvbmQ9MjE5IGFtb3VudD0tN1xua2VybmluZyBmaXJzdD0yMjEgc2Vjb25kPTIyMCBhbW91bnQ9LTdcbmtlcm5pbmcgZmlyc3Q9MjIxIHNlY29uZD0xMTEgYW1vdW50PS01XG5rZXJuaW5nIGZpcnN0PTIyMSBzZWNvbmQ9MjQyIGFtb3VudD0tNVxua2VybmluZyBmaXJzdD0yMjEgc2Vjb25kPTI0MyBhbW91bnQ9LTVcbmtlcm5pbmcgZmlyc3Q9MjIxIHNlY29uZD0yNDQgYW1vdW50PS01XG5rZXJuaW5nIGZpcnN0PTIyMSBzZWNvbmQ9MjQ1IGFtb3VudD0tNVxua2VybmluZyBmaXJzdD0yMjEgc2Vjb25kPTI0NiBhbW91bnQ9LTVcbmtlcm5pbmcgZmlyc3Q9MjIxIHNlY29uZD04NyAgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjIxIHNlY29uZD04NCAgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjIxIHNlY29uZD0xMTcgYW1vdW50PS0zXG5rZXJuaW5nIGZpcnN0PTIyMSBzZWNvbmQ9MjQ5IGFtb3VudD0tM1xua2VybmluZyBmaXJzdD0yMjEgc2Vjb25kPTI1MCBhbW91bnQ9LTNcbmtlcm5pbmcgZmlyc3Q9MjIxIHNlY29uZD0yNTEgYW1vdW50PS0zXG5rZXJuaW5nIGZpcnN0PTIyMSBzZWNvbmQ9MjUyIGFtb3VudD0tM1xua2VybmluZyBmaXJzdD0yMjEgc2Vjb25kPTEyMiBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjIxIHNlY29uZD04NiAgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjIxIHNlY29uZD04OSAgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjIxIHNlY29uZD0yMjEgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjIxIHNlY29uZD02NSAgYW1vdW50PS03XG5rZXJuaW5nIGZpcnN0PTIyMSBzZWNvbmQ9MTkyIGFtb3VudD0tN1xua2VybmluZyBmaXJzdD0yMjEgc2Vjb25kPTE5MyBhbW91bnQ9LTdcbmtlcm5pbmcgZmlyc3Q9MjIxIHNlY29uZD0xOTQgYW1vdW50PS03XG5rZXJuaW5nIGZpcnN0PTIyMSBzZWNvbmQ9MTk1IGFtb3VudD0tN1xua2VybmluZyBmaXJzdD0yMjEgc2Vjb25kPTE5NiBhbW91bnQ9LTdcbmtlcm5pbmcgZmlyc3Q9MjIxIHNlY29uZD0xOTcgYW1vdW50PS03XG5rZXJuaW5nIGZpcnN0PTIyMSBzZWNvbmQ9ODggIGFtb3VudD0xXG5rZXJuaW5nIGZpcnN0PTIyMSBzZWNvbmQ9NDQgIGFtb3VudD0tMTZcbmtlcm5pbmcgZmlyc3Q9MjIxIHNlY29uZD00NiAgYW1vdW50PS0xNlxua2VybmluZyBmaXJzdD0yMjEgc2Vjb25kPTk5ICBhbW91bnQ9LTVcbmtlcm5pbmcgZmlyc3Q9MjIxIHNlY29uZD0xMDAgYW1vdW50PS01XG5rZXJuaW5nIGZpcnN0PTIyMSBzZWNvbmQ9MTAxIGFtb3VudD0tNVxua2VybmluZyBmaXJzdD0yMjEgc2Vjb25kPTEwMyBhbW91bnQ9LTVcbmtlcm5pbmcgZmlyc3Q9MjIxIHNlY29uZD0xMTMgYW1vdW50PS01XG5rZXJuaW5nIGZpcnN0PTIyMSBzZWNvbmQ9MjMxIGFtb3VudD0tNVxua2VybmluZyBmaXJzdD0yMjEgc2Vjb25kPTIzMiBhbW91bnQ9LTVcbmtlcm5pbmcgZmlyc3Q9MjIxIHNlY29uZD0yMzMgYW1vdW50PS01XG5rZXJuaW5nIGZpcnN0PTIyMSBzZWNvbmQ9MjM0IGFtb3VudD0tNVxua2VybmluZyBmaXJzdD0yMjEgc2Vjb25kPTIzNSBhbW91bnQ9LTVcbmtlcm5pbmcgZmlyc3Q9MjIxIHNlY29uZD0xMjAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTIyMSBzZWNvbmQ9NDUgIGFtb3VudD0tNFxua2VybmluZyBmaXJzdD0yMjEgc2Vjb25kPTE3MyBhbW91bnQ9LTRcbmtlcm5pbmcgZmlyc3Q9MjIxIHNlY29uZD0xMDkgYW1vdW50PS0zXG5rZXJuaW5nIGZpcnN0PTIyMSBzZWNvbmQ9MTEwIGFtb3VudD0tM1xua2VybmluZyBmaXJzdD0yMjEgc2Vjb25kPTExMiBhbW91bnQ9LTNcbmtlcm5pbmcgZmlyc3Q9MjIxIHNlY29uZD0yNDEgYW1vdW50PS0zXG5rZXJuaW5nIGZpcnN0PTIyMSBzZWNvbmQ9ODMgIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMjEgc2Vjb25kPTk3ICBhbW91bnQ9LTZcbmtlcm5pbmcgZmlyc3Q9MjIxIHNlY29uZD0yMjQgYW1vdW50PS02XG5rZXJuaW5nIGZpcnN0PTIyMSBzZWNvbmQ9MjI1IGFtb3VudD0tNlxua2VybmluZyBmaXJzdD0yMjEgc2Vjb25kPTIyNiBhbW91bnQ9LTZcbmtlcm5pbmcgZmlyc3Q9MjIxIHNlY29uZD0yMjcgYW1vdW50PS02XG5rZXJuaW5nIGZpcnN0PTIyMSBzZWNvbmQ9MjI4IGFtb3VudD0tNlxua2VybmluZyBmaXJzdD0yMjEgc2Vjb25kPTIyOSBhbW91bnQ9LTZcbmtlcm5pbmcgZmlyc3Q9MjIxIHNlY29uZD0xMTUgYW1vdW50PS01XG5rZXJuaW5nIGZpcnN0PTIyMSBzZWNvbmQ9NzQgIGFtb3VudD0tN1xua2VybmluZyBmaXJzdD0yMjQgc2Vjb25kPTExOCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjI0IHNlY29uZD0xMjEgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIyNCBzZWNvbmQ9MjUzIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMjQgc2Vjb25kPTI1NSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjI0IHNlY29uZD0zNCAgYW1vdW50PS01XG5rZXJuaW5nIGZpcnN0PTIyNCBzZWNvbmQ9MzkgIGFtb3VudD0tNVxua2VybmluZyBmaXJzdD0yMjUgc2Vjb25kPTExOCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjI1IHNlY29uZD0xMjEgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIyNSBzZWNvbmQ9MjUzIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMjUgc2Vjb25kPTI1NSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjI1IHNlY29uZD0zNCAgYW1vdW50PS01XG5rZXJuaW5nIGZpcnN0PTIyNSBzZWNvbmQ9MzkgIGFtb3VudD0tNVxua2VybmluZyBmaXJzdD0yMjYgc2Vjb25kPTExOCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjI2IHNlY29uZD0xMjEgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIyNiBzZWNvbmQ9MjUzIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMjYgc2Vjb25kPTI1NSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjI2IHNlY29uZD0zNCAgYW1vdW50PS01XG5rZXJuaW5nIGZpcnN0PTIyNiBzZWNvbmQ9MzkgIGFtb3VudD0tNVxua2VybmluZyBmaXJzdD0yMjcgc2Vjb25kPTExOCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjI3IHNlY29uZD0xMjEgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIyNyBzZWNvbmQ9MjUzIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMjcgc2Vjb25kPTI1NSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjI3IHNlY29uZD0zNCAgYW1vdW50PS01XG5rZXJuaW5nIGZpcnN0PTIyNyBzZWNvbmQ9MzkgIGFtb3VudD0tNVxua2VybmluZyBmaXJzdD0yMjggc2Vjb25kPTExOCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjI4IHNlY29uZD0xMjEgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIyOCBzZWNvbmQ9MjUzIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMjggc2Vjb25kPTI1NSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjI4IHNlY29uZD0zNCAgYW1vdW50PS01XG5rZXJuaW5nIGZpcnN0PTIyOCBzZWNvbmQ9MzkgIGFtb3VudD0tNVxua2VybmluZyBmaXJzdD0yMjkgc2Vjb25kPTExOCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjI5IHNlY29uZD0xMjEgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIyOSBzZWNvbmQ9MjUzIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMjkgc2Vjb25kPTI1NSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjI5IHNlY29uZD0zNCAgYW1vdW50PS01XG5rZXJuaW5nIGZpcnN0PTIyOSBzZWNvbmQ9MzkgIGFtb3VudD0tNVxua2VybmluZyBmaXJzdD0yMzEgc2Vjb25kPTM0ICBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjMxIHNlY29uZD0zOSAgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIzMiBzZWNvbmQ9MTE4IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMzIgc2Vjb25kPTEyMSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjMyIHNlY29uZD0yNTMgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIzMiBzZWNvbmQ9MjU1IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMzIgc2Vjb25kPTM0ICBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjMyIHNlY29uZD0zOSAgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIzMyBzZWNvbmQ9MTE4IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMzMgc2Vjb25kPTEyMSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjMzIHNlY29uZD0yNTMgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIzMyBzZWNvbmQ9MjU1IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMzMgc2Vjb25kPTM0ICBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjMzIHNlY29uZD0zOSAgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIzNCBzZWNvbmQ9MTE4IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMzQgc2Vjb25kPTEyMSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjM0IHNlY29uZD0yNTMgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIzNCBzZWNvbmQ9MjU1IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMzQgc2Vjb25kPTM0ICBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjM0IHNlY29uZD0zOSAgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIzNSBzZWNvbmQ9MTE4IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMzUgc2Vjb25kPTEyMSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjM1IHNlY29uZD0yNTMgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTIzNSBzZWNvbmQ9MjU1IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yMzUgc2Vjb25kPTM0ICBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjM1IHNlY29uZD0zOSAgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTI0MSBzZWNvbmQ9MzQgIGFtb3VudD0tOFxua2VybmluZyBmaXJzdD0yNDEgc2Vjb25kPTM5ICBhbW91bnQ9LThcbmtlcm5pbmcgZmlyc3Q9MjQyIHNlY29uZD0xMTggYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTI0MiBzZWNvbmQ9MTIxIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yNDIgc2Vjb25kPTI1MyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjQyIHNlY29uZD0yNTUgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTI0MiBzZWNvbmQ9MzQgIGFtb3VudD0tMTFcbmtlcm5pbmcgZmlyc3Q9MjQyIHNlY29uZD0zOSAgYW1vdW50PS0xMVxua2VybmluZyBmaXJzdD0yNDIgc2Vjb25kPTEyMiBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjQyIHNlY29uZD0xMjAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTI0MyBzZWNvbmQ9MTE4IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yNDMgc2Vjb25kPTEyMSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjQzIHNlY29uZD0yNTMgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTI0MyBzZWNvbmQ9MjU1IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yNDMgc2Vjb25kPTM0ICBhbW91bnQ9LTExXG5rZXJuaW5nIGZpcnN0PTI0MyBzZWNvbmQ9MzkgIGFtb3VudD0tMTFcbmtlcm5pbmcgZmlyc3Q9MjQzIHNlY29uZD0xMjIgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTI0MyBzZWNvbmQ9MTIwIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yNDQgc2Vjb25kPTExOCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjQ0IHNlY29uZD0xMjEgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTI0NCBzZWNvbmQ9MjUzIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yNDQgc2Vjb25kPTI1NSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjQ0IHNlY29uZD0zNCAgYW1vdW50PS0xMVxua2VybmluZyBmaXJzdD0yNDQgc2Vjb25kPTM5ICBhbW91bnQ9LTExXG5rZXJuaW5nIGZpcnN0PTI0NCBzZWNvbmQ9MTIyIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yNDQgc2Vjb25kPTEyMCBhbW91bnQ9LTJcbmtlcm5pbmcgZmlyc3Q9MjQ1IHNlY29uZD0xMTggYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTI0NSBzZWNvbmQ9MTIxIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yNDUgc2Vjb25kPTI1MyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjQ1IHNlY29uZD0yNTUgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTI0NSBzZWNvbmQ9MzQgIGFtb3VudD0tMTFcbmtlcm5pbmcgZmlyc3Q9MjQ1IHNlY29uZD0zOSAgYW1vdW50PS0xMVxua2VybmluZyBmaXJzdD0yNDUgc2Vjb25kPTEyMiBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjQ1IHNlY29uZD0xMjAgYW1vdW50PS0yXG5rZXJuaW5nIGZpcnN0PTI0NiBzZWNvbmQ9MTE4IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yNDYgc2Vjb25kPTEyMSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjQ2IHNlY29uZD0yNTMgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTI0NiBzZWNvbmQ9MjU1IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yNDYgc2Vjb25kPTM0ICBhbW91bnQ9LTExXG5rZXJuaW5nIGZpcnN0PTI0NiBzZWNvbmQ9MzkgIGFtb3VudD0tMTFcbmtlcm5pbmcgZmlyc3Q9MjQ2IHNlY29uZD0xMjIgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTI0NiBzZWNvbmQ9MTIwIGFtb3VudD0tMlxua2VybmluZyBmaXJzdD0yNTMgc2Vjb25kPTM0ICBhbW91bnQ9MVxua2VybmluZyBmaXJzdD0yNTMgc2Vjb25kPTM5ICBhbW91bnQ9MVxua2VybmluZyBmaXJzdD0yNTMgc2Vjb25kPTExMSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjUzIHNlY29uZD0yNDIgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTI1MyBzZWNvbmQ9MjQzIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yNTMgc2Vjb25kPTI0NCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjUzIHNlY29uZD0yNDUgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTI1MyBzZWNvbmQ9MjQ2IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yNTMgc2Vjb25kPTQ0ICBhbW91bnQ9LThcbmtlcm5pbmcgZmlyc3Q9MjUzIHNlY29uZD00NiAgYW1vdW50PS04XG5rZXJuaW5nIGZpcnN0PTI1MyBzZWNvbmQ9OTkgIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yNTMgc2Vjb25kPTEwMCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjUzIHNlY29uZD0xMDEgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTI1MyBzZWNvbmQ9MTAzIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yNTMgc2Vjb25kPTExMyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjUzIHNlY29uZD0yMzEgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTI1MyBzZWNvbmQ9MjMyIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yNTMgc2Vjb25kPTIzMyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjUzIHNlY29uZD0yMzQgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTI1MyBzZWNvbmQ9MjM1IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yNTMgc2Vjb25kPTk3ICBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjUzIHNlY29uZD0yMjQgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTI1MyBzZWNvbmQ9MjI1IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yNTMgc2Vjb25kPTIyNiBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjUzIHNlY29uZD0yMjcgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTI1MyBzZWNvbmQ9MjI4IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yNTMgc2Vjb25kPTIyOSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjU1IHNlY29uZD0zNCAgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjU1IHNlY29uZD0zOSAgYW1vdW50PTFcbmtlcm5pbmcgZmlyc3Q9MjU1IHNlY29uZD0xMTEgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTI1NSBzZWNvbmQ9MjQyIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yNTUgc2Vjb25kPTI0MyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjU1IHNlY29uZD0yNDQgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTI1NSBzZWNvbmQ9MjQ1IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yNTUgc2Vjb25kPTI0NiBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjU1IHNlY29uZD00NCAgYW1vdW50PS04XG5rZXJuaW5nIGZpcnN0PTI1NSBzZWNvbmQ9NDYgIGFtb3VudD0tOFxua2VybmluZyBmaXJzdD0yNTUgc2Vjb25kPTk5ICBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjU1IHNlY29uZD0xMDAgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTI1NSBzZWNvbmQ9MTAxIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yNTUgc2Vjb25kPTEwMyBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjU1IHNlY29uZD0xMTMgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTI1NSBzZWNvbmQ9MjMxIGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yNTUgc2Vjb25kPTIzMiBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjU1IHNlY29uZD0yMzMgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTI1NSBzZWNvbmQ9MjM0IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yNTUgc2Vjb25kPTIzNSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjU1IHNlY29uZD05NyAgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTI1NSBzZWNvbmQ9MjI0IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yNTUgc2Vjb25kPTIyNSBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjU1IHNlY29uZD0yMjYgYW1vdW50PS0xXG5rZXJuaW5nIGZpcnN0PTI1NSBzZWNvbmQ9MjI3IGFtb3VudD0tMVxua2VybmluZyBmaXJzdD0yNTUgc2Vjb25kPTIyOCBhbW91bnQ9LTFcbmtlcm5pbmcgZmlyc3Q9MjU1IHNlY29uZD0yMjkgYW1vdW50PS0xXG5gO1xufSIsIi8qKlxuKiBkYXQtZ3VpVlIgSmF2YXNjcmlwdCBDb250cm9sbGVyIExpYnJhcnkgZm9yIFZSXG4qIGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRhYXJ0cy9kYXQuZ3VpVlJcbipcbiogQ29weXJpZ2h0IDIwMTYgRGF0YSBBcnRzIFRlYW0sIEdvb2dsZSBJbmMuXG4qXG4qIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4qIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4qXG4qICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbipcbiogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4qIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4qIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IGNyZWF0ZUludGVyYWN0aW9uIGZyb20gJy4vaW50ZXJhY3Rpb24nO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlKCB7IGdyb3VwLCBwYW5lbCB9ID0ge30gKXtcblxuICBjb25zdCBpbnRlcmFjdGlvbiA9IGNyZWF0ZUludGVyYWN0aW9uKCBwYW5lbCApO1xuXG4gIGludGVyYWN0aW9uLmV2ZW50cy5vbiggJ29uUHJlc3NlZCcsIGhhbmRsZU9uUHJlc3MgKTtcbiAgaW50ZXJhY3Rpb24uZXZlbnRzLm9uKCAndGljaycsIGhhbmRsZVRpY2sgKTtcbiAgaW50ZXJhY3Rpb24uZXZlbnRzLm9uKCAnb25SZWxlYXNlZCcsIGhhbmRsZU9uUmVsZWFzZSApO1xuXG4gIGNvbnN0IHRlbXBNYXRyaXggPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuICBjb25zdCB0UG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gIGxldCBvbGRQYXJlbnQ7XG4gIFxuICBmdW5jdGlvbiBnZXRUb3BMZXZlbEZvbGRlcihncm91cCkge1xuICAgIHZhciBmb2xkZXIgPSBncm91cC5mb2xkZXI7XG4gICAgd2hpbGUgKGZvbGRlci5mb2xkZXIgIT09IGZvbGRlcikgZm9sZGVyID0gZm9sZGVyLmZvbGRlcjtcbiAgICByZXR1cm4gZm9sZGVyO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlVGljayggeyBpbnB1dCB9ID0ge30gKXtcbiAgICBjb25zdCBmb2xkZXIgPSBnZXRUb3BMZXZlbEZvbGRlcihncm91cCk7XG4gICAgaWYoIGZvbGRlciA9PT0gdW5kZWZpbmVkICl7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYoIGlucHV0Lm1vdXNlICl7XG4gICAgICBpZiggaW5wdXQucHJlc3NlZCAmJiBpbnB1dC5zZWxlY3RlZCAmJiBpbnB1dC5yYXljYXN0LnJheS5pbnRlcnNlY3RQbGFuZSggaW5wdXQubW91c2VQbGFuZSwgaW5wdXQubW91c2VJbnRlcnNlY3Rpb24gKSApe1xuICAgICAgICBpZiggaW5wdXQuaW50ZXJhY3Rpb24ucHJlc3MgPT09IGludGVyYWN0aW9uICl7XG4gICAgICAgICAgZm9sZGVyLnBvc2l0aW9uLmNvcHkoIGlucHV0Lm1vdXNlSW50ZXJzZWN0aW9uLnN1YiggaW5wdXQubW91c2VPZmZzZXQgKSApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSBpZiggaW5wdXQuaW50ZXJzZWN0aW9ucy5sZW5ndGggPiAwICl7XG4gICAgICAgIGNvbnN0IGhpdE9iamVjdCA9IGlucHV0LmludGVyc2VjdGlvbnNbIDAgXS5vYmplY3Q7XG4gICAgICAgIGlmKCBoaXRPYmplY3QgPT09IHBhbmVsICl7XG4gICAgICAgICAgaGl0T2JqZWN0LnVwZGF0ZU1hdHJpeFdvcmxkKCk7XG4gICAgICAgICAgdFBvc2l0aW9uLnNldEZyb21NYXRyaXhQb3NpdGlvbiggaGl0T2JqZWN0Lm1hdHJpeFdvcmxkICk7XG5cbiAgICAgICAgICBpbnB1dC5tb3VzZVBsYW5lLnNldEZyb21Ob3JtYWxBbmRDb3BsYW5hclBvaW50KCBpbnB1dC5tb3VzZUNhbWVyYS5nZXRXb3JsZERpcmVjdGlvbiggaW5wdXQubW91c2VQbGFuZS5ub3JtYWwgKSwgdFBvc2l0aW9uICk7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coIGlucHV0Lm1vdXNlUGxhbmUgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuXG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZU9uUHJlc3MoIHAgKXtcblxuICAgIGxldCB7IGlucHV0T2JqZWN0LCBpbnB1dCB9ID0gcDtcblxuICAgIGNvbnN0IGZvbGRlciA9IGdldFRvcExldmVsRm9sZGVyKGdyb3VwKTtcbiAgICBpZiggZm9sZGVyID09PSB1bmRlZmluZWQgKXtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiggZm9sZGVyLmJlaW5nTW92ZWQgPT09IHRydWUgKXtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiggaW5wdXQubW91c2UgKXtcbiAgICAgIGlmKCBpbnB1dC5pbnRlcnNlY3Rpb25zLmxlbmd0aCA+IDAgKXtcbiAgICAgICAgaWYoIGlucHV0LnJheWNhc3QucmF5LmludGVyc2VjdFBsYW5lKCBpbnB1dC5tb3VzZVBsYW5lLCBpbnB1dC5tb3VzZUludGVyc2VjdGlvbiApICl7XG4gICAgICAgICAgY29uc3QgaGl0T2JqZWN0ID0gaW5wdXQuaW50ZXJzZWN0aW9uc1sgMCBdLm9iamVjdDtcbiAgICAgICAgICBpZiggaGl0T2JqZWN0ICE9PSBwYW5lbCApe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlucHV0LnNlbGVjdGVkID0gZm9sZGVyO1xuXG4gICAgICAgICAgaW5wdXQuc2VsZWN0ZWQudXBkYXRlTWF0cml4V29ybGQoKTtcbiAgICAgICAgICB0UG9zaXRpb24uc2V0RnJvbU1hdHJpeFBvc2l0aW9uKCBpbnB1dC5zZWxlY3RlZC5tYXRyaXhXb3JsZCApO1xuXG4gICAgICAgICAgaW5wdXQubW91c2VPZmZzZXQuY29weSggaW5wdXQubW91c2VJbnRlcnNlY3Rpb24gKS5zdWIoIHRQb3NpdGlvbiApO1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCBpbnB1dC5tb3VzZU9mZnNldCApO1xuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBlbHNle1xuICAgICAgdGVtcE1hdHJpeC5nZXRJbnZlcnNlKCBpbnB1dE9iamVjdC5tYXRyaXhXb3JsZCApO1xuXG4gICAgICBmb2xkZXIubWF0cml4LnByZW11bHRpcGx5KCB0ZW1wTWF0cml4ICk7XG4gICAgICBmb2xkZXIubWF0cml4LmRlY29tcG9zZSggZm9sZGVyLnBvc2l0aW9uLCBmb2xkZXIucXVhdGVybmlvbiwgZm9sZGVyLnNjYWxlICk7XG5cbiAgICAgIG9sZFBhcmVudCA9IGZvbGRlci5wYXJlbnQ7XG4gICAgICBpbnB1dE9iamVjdC5hZGQoIGZvbGRlciApO1xuICAgIH1cblxuICAgIHAubG9ja2VkID0gdHJ1ZTtcblxuICAgIGZvbGRlci5iZWluZ01vdmVkID0gdHJ1ZTtcblxuICAgIGlucHV0LmV2ZW50cy5lbWl0KCAnZ3JhYmJlZCcsIGlucHV0ICk7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVPblJlbGVhc2UoIHAgKXtcblxuICAgIGxldCB7IGlucHV0T2JqZWN0LCBpbnB1dCB9ID0gcDtcblxuICAgIGNvbnN0IGZvbGRlciA9IGdldFRvcExldmVsRm9sZGVyKGdyb3VwKTtcbiAgICBpZiggZm9sZGVyID09PSB1bmRlZmluZWQgKXtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiggZm9sZGVyLmJlaW5nTW92ZWQgPT09IGZhbHNlICl7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYoIGlucHV0Lm1vdXNlICl7XG4gICAgICBpbnB1dC5zZWxlY3RlZCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgZWxzZXtcblxuICAgICAgaWYoIG9sZFBhcmVudCA9PT0gdW5kZWZpbmVkICl7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZm9sZGVyLm1hdHJpeC5wcmVtdWx0aXBseSggaW5wdXRPYmplY3QubWF0cml4V29ybGQgKTtcbiAgICAgIGZvbGRlci5tYXRyaXguZGVjb21wb3NlKCBmb2xkZXIucG9zaXRpb24sIGZvbGRlci5xdWF0ZXJuaW9uLCBmb2xkZXIuc2NhbGUgKTtcbiAgICAgIG9sZFBhcmVudC5hZGQoIGZvbGRlciApO1xuICAgICAgb2xkUGFyZW50ID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGZvbGRlci5iZWluZ01vdmVkID0gZmFsc2U7XG5cbiAgICBpbnB1dC5ldmVudHMuZW1pdCggJ2dyYWJSZWxlYXNlZCcsIGlucHV0ICk7XG4gIH1cblxuICByZXR1cm4gaW50ZXJhY3Rpb247XG59IiwiZXhwb3J0IGNvbnN0IGdyYWJCYXIgPSAoZnVuY3Rpb24oKXtcbiAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgaW1hZ2Uuc3JjID0gYGRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBRUFBQUFBZ0NBWUFBQUNpblg2RUFBQUFDWEJJV1hNQUFDNGpBQUF1SXdGNHBUOTJBQUFLVDJsRFExQlFhRzkwYjNOb2IzQWdTVU5ESUhCeWIyWnBiR1VBQUhqYW5WTm5WRlBwRmozMzN2UkNTNGlBbEV0dlVoVUlJRkpDaTRBVWtTWXFJUWtRU29naG9ka1ZVY0VSUlVVRUc4aWdpQU9Pam9DTUZWRXNESW9LMkFma0lhS09nNk9JaXNyNzRYdWphOWE4OStiTi9yWFhQdWVzODUyenp3ZkFDQXlXU0ROUk5ZQU1xVUllRWVDRHg4VEc0ZVF1UUlFS0pIQUFFQWl6WkNGei9TTUJBUGgrUER3cklzQUh2Z0FCZU5NTENBREFUWnZBTUJ5SC93L3FRcGxjQVlDRUFjQjBrVGhMQ0lBVUFFQjZqa0ttQUVCR0FZQ2RtQ1pUQUtBRUFHRExZMkxqQUZBdEFHQW5mK2JUQUlDZCtKbDdBUUJibENFVkFhQ1JBQ0FUWlloRUFHZzdBS3pQVm9wRkFGZ3dBQlJtUzhRNUFOZ3RBREJKVjJaSUFMQzNBTURPRUF1eUFBZ01BREJSaUlVcEFBUjdBR0RJSXlONEFJU1pBQlJHOGxjODhTdXVFT2NxQUFCNG1iSTh1U1E1UllGYkNDMXhCMWRYTGg0b3pra1hLeFEyWVFKaG1rQXV3bm1aR1RLQk5BL2c4OHdBQUtDUkZSSGdnL1A5ZU00T3JzN09ObzYyRGw4dDZyOEcveUppWXVQKzVjK3JjRUFBQU9GMGZ0SCtMQyt6R29BN0JvQnQvcUlsN2dSb1hndWdkZmVMWnJJUFFMVUFvT25hVi9OdytINDhQRVdoa0xuWjJlWGs1TmhLeEVKYlljcFhmZjVud2wvQVYvMXMrWDQ4L1BmMTRMN2lKSUV5WFlGSEJQamd3c3owVEtVY3o1SUpoR0xjNW85SC9MY0wvL3dkMHlMRVNXSzVXQ29VNDFFU2NZNUVtb3p6TXFVaWlVS1NLY1VsMHY5azR0OHMrd00rM3pVQXNHbytBWHVSTGFoZFl3UDJTeWNRV0hUQTR2Y0FBUEs3YjhIVUtBZ0RnR2lENGM5My8rOC8vVWVnSlFDQVprbVNjUUFBWGtRa0xsVEtzei9IQ0FBQVJLQ0JLckJCRy9UQkdDekFCaHpCQmR6QkMveGdOb1JDSk1UQ1FoQkNDbVNBSEhKZ0theUNRaWlHemJBZEttQXYxRUFkTk1CUmFJYVRjQTR1d2xXNERqMXdEL3BoQ0o3QktMeUJDUVJCeUFnVFlTSGFpQUZpaWxnampnZ1htWVg0SWNGSUJCS0xKQ0RKaUJSUklrdVJOVWd4VW9wVUlGVklIZkk5Y2dJNWgxeEd1cEU3eUFBeWd2eUd2RWN4bElHeVVUM1VETFZEdWFnM0dvUkdvZ3ZRWkhReG1vOFdvSnZRY3JRYVBZdzJvZWZRcTJnUDJvOCtROGN3d09nWUJ6UEViREF1eHNOQ3NUZ3NDWk5qeTdFaXJBeXJ4aHF3VnF3RHU0bjFZOCt4ZHdRU2dVWEFDVFlFZDBJZ1lSNUJTRmhNV0U3WVNLZ2dIQ1EwRWRvSk53a0RoRkhDSnlLVHFFdTBKcm9SK2NRWVlqSXhoMWhJTENQV0VvOFRMeEI3aUVQRU55UVNpVU15SjdtUUFrbXhwRlRTRXRKRzBtNVNJK2tzcVpzMFNCb2prOG5hWkd1eUJ6bVVMQ0FyeUlYa25lVEQ1RFBrRytRaDhsc0tuV0pBY2FUNFUrSW9Vc3BxU2hubEVPVTA1UVpsbURKQlZhT2FVdDJvb1ZRUk5ZOWFRcTJodGxLdlVZZW9FelIxbWpuTmd4WkpTNld0b3BYVEdtZ1hhUGRwcitoMHVoSGRsUjVPbDlCWDBzdnBSK2lYNkFQMGR3d05oaFdEeDRobktCbWJHQWNZWnhsM0dLK1lUS1laMDRzWngxUXdOekhybU9lWkQ1bHZWVmdxdGlwOEZaSEtDcFZLbFNhVkd5b3ZWS21xcHFyZXFndFY4MVhMVkkrcFhsTjlya1pWTTFQanFRblVscXRWcXAxUTYxTWJVMmVwTzZpSHFtZW9iMVEvcEg1Wi9Za0dXY05NdzA5RHBGR2dzVi9qdk1ZZ0MyTVpzM2dzSVdzTnE0WjFnVFhFSnJITjJYeDJLcnVZL1IyN2l6MnFxYUU1UXpOS00xZXpVdk9VWmo4SDQ1aHgrSngwVGdubktLZVg4MzZLM2hUdktlSXBHNlkwVExreFpWeHJxcGFYbGxpclNLdFJxMGZydlRhdTdhZWRwcjFGdTFuN2dRNUJ4MG9uWENkSFo0L09CWjNuVTlsVDNhY0tweFpOUFRyMXJpNnFhNlVib2J0RWQ3OXVwKzZZbnI1ZWdKNU1iNmZlZWIzbitoeDlMLzFVL1czNnAvVkhERmdHc3d3a0J0c016aGc4eFRWeGJ6d2RMOGZiOFZGRFhjTkFRNlZobFdHWDRZU1J1ZEU4bzlWR2pVWVBqR25HWE9NazQyM0diY2FqSmdZbUlTWkxUZXBON3BwU1RibW1LYVk3VER0TXg4M016YUxOMXBrMW16MHgxekxubStlYjE1dmZ0MkJhZUZvc3RxaTJ1R1ZKc3VSYXBsbnV0cnh1aFZvNVdhVllWVnBkczBhdG5hMGwxcnV0dTZjUnA3bE9rMDZybnRabnc3RHh0c20ycWJjWnNPWFlCdHV1dG0yMmZXRm5ZaGRudDhXdXcrNlR2Wk45dW4yTi9UMEhEWWZaRHFzZFdoMStjN1J5RkRwV090NmF6cHp1UDMzRjlKYnBMMmRZenhEUDJEUGp0aFBMS2NScG5WT2IwMGRuRjJlNWM0UHppSXVKUzRMTExwYytMcHNieHQzSXZlUktkUFZ4WGVGNjB2V2RtN09id3UybzI2L3VOdTVwN29mY244dzBueW1lV1ROejBNUElRK0JSNWRFL0M1K1ZNR3Zmckg1UFEwK0JaN1huSXk5akw1RlhyZGV3dDZWM3F2ZGg3eGMrOWo1eW4rTSs0enczM2pMZVdWL01OOEMzeUxmTFQ4TnZubCtGMzBOL0kvOWsvM3IvMFFDbmdDVUJad09KZ1VHQld3TDcrSHA4SWIrT1B6cmJaZmF5MmUxQmpLQzVRUlZCajRLdGd1WEJyU0ZveU95UXJTSDM1NWpPa2M1cERvVlFmdWpXMEFkaDVtR0x3MzRNSjRXSGhWZUdQNDV3aUZnYTBUR1hOWGZSM0VOejMwVDZSSlpFM3B0bk1VODVyeTFLTlNvK3FpNXFQTm8zdWpTNlA4WXVabG5NMVZpZFdFbHNTeHc1TGlxdU5tNXN2dC84N2ZPSDRwM2lDK043RjVndnlGMXdlYUhPd3ZTRnB4YXBMaElzT3BaQVRJaE9PSlR3UVJBcXFCYU1KZklUZHlXT0NubkNIY0puSWkvUk50R0kyRU5jS2g1TzhrZ3FUWHFTN0pHOE5Ya2t4VE9sTE9XNWhDZXBrTHhNRFV6ZG16cWVGcHAySUcweVBUcTlNWU9Ta1pCeFFxb2hUWk8yWitwbjVtWjJ5NnhsaGJMK3hXNkx0eThlbFFmSmE3T1FyQVZaTFFxMlFxYm9WRm9vMXlvSHNtZGxWMmEvelluS09aYXJuaXZON2N5enl0dVFONXp2bi8vdEVzSVM0WksycFlaTFZ5MGRXT2E5ckdvNXNqeHhlZHNLNHhVRks0WldCcXc4dUlxMkttM1ZUNnZ0VjVldWZyMG1lazFyZ1Y3QnlvTEJ0UUZyNnd0VkN1V0ZmZXZjMSsxZFQxZ3ZXZCsxWWZxR25ScytGWW1LcmhUYkY1Y1ZmOWdvM0hqbEc0ZHZ5citaM0pTMHFhdkV1V1RQWnRKbTZlYmVMWjViRHBhcWwrYVhEbTROMmRxMERkOVd0TzMxOWtYYkw1Zk5LTnU3ZzdaRHVhTy9QTGk4WmFmSnpzMDdQMVNrVlBSVStsUTI3dExkdFdIWCtHN1I3aHQ3dlBZMDdOWGJXN3ozL1Q3SnZ0dFZBVlZOMVdiVlpmdEorN1AzUDY2SnF1bjRsdnR0WGExT2JYSHR4d1BTQS8wSEl3NjIxN25VMVIzU1BWUlNqOVlyNjBjT3h4KysvcDN2ZHkwTk5nMVZqWnpHNGlOd1JIbms2ZmNKMy9jZURUcmFkb3g3ck9FSDB4OTJIV2NkTDJwQ212S2FScHRUbXZ0YllsdTZUOHcrMGRicTNucjhSOXNmRDV3MFBGbDVTdk5VeVduYTZZTFRrMmZ5ejR5ZGxaMTlmaTc1M0dEYm9yWjc1MlBPMzJvUGIrKzZFSFRoMGtYL2krYzd2RHZPWFBLNGRQS3kyK1VUVjdoWG1xODZYMjNxZE9vOC9wUFRUOGU3bkx1YXJybGNhN251ZXIyMWUyYjM2UnVlTjg3ZDlMMTU4UmIvMXRXZU9UM2R2Zk42Yi9mRjkvWGZGdDErY2lmOXpzdTcyWGNuN3EyOFQ3eGY5RUR0UWRsRDNZZlZQMXYrM05qdjNIOXF3SGVnODlIY1IvY0doWVBQL3BIMWp3OURCWStaajh1R0RZYnJuamcrT1RuaVAzTDk2ZnluUTg5a3p5YWVGLzZpL3N1dUZ4WXZmdmpWNjlmTzBaalJvWmZ5bDVPL2JYeWwvZXJBNnhtdjI4YkN4aDYreVhnek1WNzBWdnZ0d1hmY2R4M3ZvOThQVCtSOElIOG8vMmo1c2ZWVDBLZjdreG1Uay84RUE1anovR016TGRzQUFEc2thVlJZZEZoTlREcGpiMjB1WVdSdlltVXVlRzF3QUFBQUFBQThQM2h3WVdOclpYUWdZbVZuYVc0OUl1Kzd2eUlnYVdROUlsYzFUVEJOY0VObGFHbEllbkpsVTNwT1ZHTjZhMk01WkNJL1BnbzhlRHA0YlhCdFpYUmhJSGh0Ykc1ek9uZzlJbUZrYjJKbE9tNXpPbTFsZEdFdklpQjRPbmh0Y0hSclBTSkJaRzlpWlNCWVRWQWdRMjl5WlNBMUxqWXRZekV6TWlBM09TNHhOVGt5T0RRc0lESXdNVFl2TURRdk1Ua3RNVE02TVRNNk5EQWdJQ0FnSUNBZ0lDSStDaUFnSUR4eVpHWTZVa1JHSUhodGJHNXpPbkprWmowaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1UazVPUzh3TWk4eU1pMXlaR1l0YzNsdWRHRjRMVzV6SXlJK0NpQWdJQ0FnSUR4eVpHWTZSR1Z6WTNKcGNIUnBiMjRnY21SbU9tRmliM1YwUFNJaUNpQWdJQ0FnSUNBZ0lDQWdJSGh0Ykc1ek9uaHRjRDBpYUhSMGNEb3ZMMjV6TG1Ga2IySmxMbU52YlM5NFlYQXZNUzR3THlJS0lDQWdJQ0FnSUNBZ0lDQWdlRzFzYm5NNlpHTTlJbWgwZEhBNkx5OXdkWEpzTG05eVp5OWtZeTlsYkdWdFpXNTBjeTh4TGpFdklnb2dJQ0FnSUNBZ0lDQWdJQ0I0Yld4dWN6cHdhRzkwYjNOb2IzQTlJbWgwZEhBNkx5OXVjeTVoWkc5aVpTNWpiMjB2Y0dodmRHOXphRzl3THpFdU1DOGlDaUFnSUNBZ0lDQWdJQ0FnSUhodGJHNXpPbmh0Y0UxTlBTSm9kSFJ3T2k4dmJuTXVZV1J2WW1VdVkyOXRMM2hoY0M4eExqQXZiVzB2SWdvZ0lDQWdJQ0FnSUNBZ0lDQjRiV3h1Y3pwemRFVjJkRDBpYUhSMGNEb3ZMMjV6TG1Ga2IySmxMbU52YlM5NFlYQXZNUzR3TDNOVWVYQmxMMUpsYzI5MWNtTmxSWFpsYm5Raklnb2dJQ0FnSUNBZ0lDQWdJQ0I0Yld4dWN6cDBhV1ptUFNKb2RIUndPaTh2Ym5NdVlXUnZZbVV1WTI5dEwzUnBabVl2TVM0d0x5SUtJQ0FnSUNBZ0lDQWdJQ0FnZUcxc2JuTTZaWGhwWmowaWFIUjBjRG92TDI1ekxtRmtiMkpsTG1OdmJTOWxlR2xtTHpFdU1DOGlQZ29nSUNBZ0lDQWdJQ0E4ZUcxd09rTnlaV0YwYjNKVWIyOXNQa0ZrYjJKbElGQm9iM1J2YzJodmNDQkRReUF5TURFMUxqVWdLRmRwYm1SdmQzTXBQQzk0YlhBNlEzSmxZWFJ2Y2xSdmIydytDaUFnSUNBZ0lDQWdJRHg0YlhBNlEzSmxZWFJsUkdGMFpUNHlNREUyTFRBNUxUSTRWREUyT2pJMU9qTXlMVEEzT2pBd1BDOTRiWEE2UTNKbFlYUmxSR0YwWlQ0S0lDQWdJQ0FnSUNBZ1BIaHRjRHBOYjJScFpubEVZWFJsUGpJd01UWXRNRGt0TWpoVU1UWTZNemM2TWpNdE1EYzZNREE4TDNodGNEcE5iMlJwWm5sRVlYUmxQZ29nSUNBZ0lDQWdJQ0E4ZUcxd09rMWxkR0ZrWVhSaFJHRjBaVDR5TURFMkxUQTVMVEk0VkRFMk9qTTNPakl6TFRBM09qQXdQQzk0YlhBNlRXVjBZV1JoZEdGRVlYUmxQZ29nSUNBZ0lDQWdJQ0E4WkdNNlptOXliV0YwUG1sdFlXZGxMM0J1Wnp3dlpHTTZabTl5YldGMFBnb2dJQ0FnSUNBZ0lDQThjR2h2ZEc5emFHOXdPa052Ykc5eVRXOWtaVDR6UEM5d2FHOTBiM05vYjNBNlEyOXNiM0pOYjJSbFBnb2dJQ0FnSUNBZ0lDQThjR2h2ZEc5emFHOXdPa2xEUTFCeWIyWnBiR1UrYzFKSFFpQkpSVU0yTVRrMk5pMHlMakU4TDNCb2IzUnZjMmh2Y0RwSlEwTlFjbTltYVd4bFBnb2dJQ0FnSUNBZ0lDQThlRzF3VFUwNlNXNXpkR0Z1WTJWSlJENTRiWEF1YVdsa09tRmhZVEZqTVRRekxUVXdabVV0T1RRME15MWhOVGhtTFdFeU0yVmtOVE0zTURkbU1Ed3ZlRzF3VFUwNlNXNXpkR0Z1WTJWSlJENEtJQ0FnSUNBZ0lDQWdQSGh0Y0UxTk9rUnZZM1Z0Wlc1MFNVUStZV1J2WW1VNlpHOWphV1E2Y0dodmRHOXphRzl3T2pkbE56ZG1ZbVpqTFRnMVpEUXRNVEZsTmkxaFl6aG1MV0ZqTnpVMFpXUTFPRE0zWmp3dmVHMXdUVTA2Ukc5amRXMWxiblJKUkQ0S0lDQWdJQ0FnSUNBZ1BIaHRjRTFOT2s5eWFXZHBibUZzUkc5amRXMWxiblJKUkQ1NGJYQXVaR2xrT21NMVptTTBaR1l5TFRreFkyTXRaVEkwTVMwNFkyVmpMVE16T0RJeVkyUTFaV0ZsT1R3dmVHMXdUVTA2VDNKcFoybHVZV3hFYjJOMWJXVnVkRWxFUGdvZ0lDQWdJQ0FnSUNBOGVHMXdUVTA2U0dsemRHOXllVDRLSUNBZ0lDQWdJQ0FnSUNBZ1BISmtaanBUWlhFK0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUR4eVpHWTZiR2tnY21SbU9uQmhjbk5sVkhsd1pUMGlVbVZ6YjNWeVkyVWlQZ29nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0E4YzNSRmRuUTZZV04wYVc5dVBtTnlaV0YwWldROEwzTjBSWFowT21GamRHbHZiajRLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnUEhOMFJYWjBPbWx1YzNSaGJtTmxTVVErZUcxd0xtbHBaRHBqTldaak5HUm1NaTA1TVdOakxXVXlOREV0T0dObFl5MHpNemd5TW1Oa05XVmhaVGs4TDNOMFJYWjBPbWx1YzNSaGJtTmxTVVErQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUR4emRFVjJkRHAzYUdWdVBqSXdNVFl0TURrdE1qaFVNVFk2TWpVNk16SXRNRGM2TURBOEwzTjBSWFowT25kb1pXNCtDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRHh6ZEVWMmREcHpiMlowZDJGeVpVRm5aVzUwUGtGa2IySmxJRkJvYjNSdmMyaHZjQ0JEUXlBeU1ERTFMalVnS0ZkcGJtUnZkM01wUEM5emRFVjJkRHB6YjJaMGQyRnlaVUZuWlc1MFBnb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBOEwzSmtaanBzYVQ0S0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnUEhKa1pqcHNhU0J5WkdZNmNHRnljMlZVZVhCbFBTSlNaWE52ZFhKalpTSStDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRHh6ZEVWMmREcGhZM1JwYjI0K1kyOXVkbVZ5ZEdWa1BDOXpkRVYyZERwaFkzUnBiMjQrQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUR4emRFVjJkRHB3WVhKaGJXVjBaWEp6UG1aeWIyMGdZWEJ3YkdsallYUnBiMjR2ZG01a0xtRmtiMkpsTG5Cb2IzUnZjMmh2Y0NCMGJ5QnBiV0ZuWlM5d2JtYzhMM04wUlhaME9uQmhjbUZ0WlhSbGNuTStDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lEd3ZjbVJtT214cFBnb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBOGNtUm1PbXhwSUhKa1pqcHdZWEp6WlZSNWNHVTlJbEpsYzI5MWNtTmxJajRLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnUEhOMFJYWjBPbUZqZEdsdmJqNXpZWFpsWkR3dmMzUkZkblE2WVdOMGFXOXVQZ29nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0E4YzNSRmRuUTZhVzV6ZEdGdVkyVkpSRDU0YlhBdWFXbGtPbUZoWVRGak1UUXpMVFV3Wm1VdE9UUTBNeTFoTlRobUxXRXlNMlZrTlRNM01EZG1NRHd2YzNSRmRuUTZhVzV6ZEdGdVkyVkpSRDRLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnUEhOMFJYWjBPbmRvWlc0K01qQXhOaTB3T1MweU9GUXhOam96TnpveU15MHdOem93TUR3dmMzUkZkblE2ZDJobGJqNEtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdQSE4wUlhaME9uTnZablIzWVhKbFFXZGxiblErUVdSdlltVWdVR2h2ZEc5emFHOXdJRU5ESURJd01UVXVOU0FvVjJsdVpHOTNjeWs4TDNOMFJYWjBPbk52Wm5SM1lYSmxRV2RsYm5RK0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lEeHpkRVYyZERwamFHRnVaMlZrUGk4OEwzTjBSWFowT21Ob1lXNW5aV1ErQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJRHd2Y21SbU9teHBQZ29nSUNBZ0lDQWdJQ0FnSUNBOEwzSmtaanBUWlhFK0NpQWdJQ0FnSUNBZ0lEd3ZlRzF3VFUwNlNHbHpkRzl5ZVQ0S0lDQWdJQ0FnSUNBZ1BIUnBabVk2VDNKcFpXNTBZWFJwYjI0K01Ud3ZkR2xtWmpwUGNtbGxiblJoZEdsdmJqNEtJQ0FnSUNBZ0lDQWdQSFJwWm1ZNldGSmxjMjlzZFhScGIyNCtNekF3TURBd01DOHhNREF3TUR3dmRHbG1aanBZVW1WemIyeDFkR2x2Ymo0S0lDQWdJQ0FnSUNBZ1BIUnBabVk2V1ZKbGMyOXNkWFJwYjI0K016QXdNREF3TUM4eE1EQXdNRHd2ZEdsbVpqcFpVbVZ6YjJ4MWRHbHZiajRLSUNBZ0lDQWdJQ0FnUEhScFptWTZVbVZ6YjJ4MWRHbHZibFZ1YVhRK01qd3ZkR2xtWmpwU1pYTnZiSFYwYVc5dVZXNXBkRDRLSUNBZ0lDQWdJQ0FnUEdWNGFXWTZRMjlzYjNKVGNHRmpaVDR4UEM5bGVHbG1Pa052Ykc5eVUzQmhZMlUrQ2lBZ0lDQWdJQ0FnSUR4bGVHbG1PbEJwZUdWc1dFUnBiV1Z1YzJsdmJqNDJORHd2WlhocFpqcFFhWGhsYkZoRWFXMWxibk5wYjI0K0NpQWdJQ0FnSUNBZ0lEeGxlR2xtT2xCcGVHVnNXVVJwYldWdWMybHZiajR6TWp3dlpYaHBaanBRYVhobGJGbEVhVzFsYm5OcGIyNCtDaUFnSUNBZ0lEd3ZjbVJtT2tSbGMyTnlhWEIwYVc5dVBnb2dJQ0E4TDNKa1pqcFNSRVkrQ2p3dmVEcDRiWEJ0WlhSaFBnb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQUtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQW9nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQUtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQW9nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQUtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQW9nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQUtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQW9nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQUtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQW9nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQUtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQW9nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQUtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQW9nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQUtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQW9nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQUtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQW9nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQUtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQW9nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQUtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQW9nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQUtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQW9nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQUtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQW9nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUFvOFAzaHdZV05yWlhRZ1pXNWtQU0ozSWo4K09oRjdSd0FBQUNCalNGSk5BQUI2SlFBQWdJTUFBUG4vQUFDQTZRQUFkVEFBQU9wZ0FBQTZtQUFBRjIrU1g4VkdBQUFBbEVsRVFWUjQydXpac1EzQUlBeEVVVHVUWkpSc2t0NUxSRm1DZFRMYXBVS0NCaWpvL0YwaG4yU2tKeElLWEpKbHJzT1NGd0FBQUFCQTZ2S0k2TzdCVW9yWGRadTEvVkVXRVplWmZiTjVtL1phbWpmSytBUUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFDQmZ1YVNuYTdpL2RkMW1iWCtVU1RyTjdKN04yN1RYMHJ4UnhnbmdaWWlmSUFBQUFKQzRmZ0FBQVAvL0F3QXVNVlB3MjBoeEN3QUFBQUJKUlU1RXJrSmdnZz09YDtcblxuICBjb25zdCB0ZXh0dXJlID0gbmV3IFRIUkVFLlRleHR1cmUoKTtcbiAgdGV4dHVyZS5pbWFnZSA9IGltYWdlO1xuICB0ZXh0dXJlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgLy8gdGV4dHVyZS5taW5GaWx0ZXIgPSBUSFJFRS5MaW5lYXJNaXBNYXBMaW5lYXJGaWx0ZXI7XG4gIC8vIHRleHR1cmUubWFnRmlsdGVyID0gVEhSRUUuTGluZWFyRmlsdGVyO1xuICAvLyB0ZXh0dXJlLmdlbmVyYXRlTWlwbWFwcyA9IGZhbHNlO1xuXG4gIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAgICAvLyBjb2xvcjogMHhmZjAwMDAsXG4gICAgc2lkZTogVEhSRUUuRG91YmxlU2lkZSxcbiAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICBtYXA6IHRleHR1cmVcbiAgfSk7XG4gIG1hdGVyaWFsLmFscGhhVGVzdCA9IDAuNTtcblxuICByZXR1cm4gZnVuY3Rpb24oKXtcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyBUSFJFRS5QbGFuZUdlb21ldHJ5KCBpbWFnZS53aWR0aCAvIDEwMDAsIGltYWdlLmhlaWdodCAvIDEwMDAsIDEsIDEgKTtcblxuICAgIGNvbnN0IG1lc2ggPSBuZXcgVEhSRUUuTWVzaCggZ2VvbWV0cnksIG1hdGVyaWFsICk7XG4gICAgcmV0dXJuIG1lc2g7XG4gIH1cblxufSgpKTtcblxuZXhwb3J0IGNvbnN0IGRvd25BcnJvdyA9IChmdW5jdGlvbigpe1xuICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICBpbWFnZS5zcmMgPSAnZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFJQUFBQUJBQ0FZQUFBRFMxbjkvQUFBQUNYQklXWE1BQUN4TEFBQXNTd0dsUFphcEFBQTRLMmxVV0hSWVRVdzZZMjl0TG1Ga2IySmxMbmh0Y0FBQUFBQUFQRDk0Y0dGamEyVjBJR0psWjJsdVBTTHZ1NzhpSUdsa1BTSlhOVTB3VFhCRFpXaHBTSHB5WlZONlRsUmplbXRqT1dRaVB6NEtQSGc2ZUcxd2JXVjBZU0I0Yld4dWN6cDRQU0poWkc5aVpUcHVjenB0WlhSaEx5SWdlRHA0YlhCMGF6MGlRV1J2WW1VZ1dFMVFJRU52Y21VZ05TNDJMV014TXpJZ056a3VNVFU1TWpnMExDQXlNREUyTHpBMEx6RTVMVEV6T2pFek9qUXdJQ0FnSUNBZ0lDQWlQZ29nSUNBOGNtUm1PbEpFUmlCNGJXeHVjenB5WkdZOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6RTVPVGt2TURJdk1qSXRjbVJtTFhONWJuUmhlQzF1Y3lNaVBnb2dJQ0FnSUNBOGNtUm1Pa1JsYzJOeWFYQjBhVzl1SUhKa1pqcGhZbTkxZEQwaUlnb2dJQ0FnSUNBZ0lDQWdJQ0I0Yld4dWN6cDRiWEE5SW1oMGRIQTZMeTl1Y3k1aFpHOWlaUzVqYjIwdmVHRndMekV1TUM4aUNpQWdJQ0FnSUNBZ0lDQWdJSGh0Ykc1ek9tUmpQU0pvZEhSd09pOHZjSFZ5YkM1dmNtY3ZaR012Wld4bGJXVnVkSE12TVM0eEx5SUtJQ0FnSUNBZ0lDQWdJQ0FnZUcxc2JuTTZjR2h2ZEc5emFHOXdQU0pvZEhSd09pOHZibk11WVdSdlltVXVZMjl0TDNCb2IzUnZjMmh2Y0M4eExqQXZJZ29nSUNBZ0lDQWdJQ0FnSUNCNGJXeHVjenA0YlhCTlRUMGlhSFIwY0RvdkwyNXpMbUZrYjJKbExtTnZiUzk0WVhBdk1TNHdMMjF0THlJS0lDQWdJQ0FnSUNBZ0lDQWdlRzFzYm5NNmMzUkZkblE5SW1oMGRIQTZMeTl1Y3k1aFpHOWlaUzVqYjIwdmVHRndMekV1TUM5elZIbHdaUzlTWlhOdmRYSmpaVVYyWlc1MEl5SUtJQ0FnSUNBZ0lDQWdJQ0FnZUcxc2JuTTZkR2xtWmowaWFIUjBjRG92TDI1ekxtRmtiMkpsTG1OdmJTOTBhV1ptTHpFdU1DOGlDaUFnSUNBZ0lDQWdJQ0FnSUhodGJHNXpPbVY0YVdZOUltaDBkSEE2THk5dWN5NWhaRzlpWlM1amIyMHZaWGhwWmk4eExqQXZJajRLSUNBZ0lDQWdJQ0FnUEhodGNEcERjbVZoZEc5eVZHOXZiRDVCWkc5aVpTQlFhRzkwYjNOb2IzQWdRME1nTWpBeE5TNDFJQ2hYYVc1a2IzZHpLVHd2ZUcxd09rTnlaV0YwYjNKVWIyOXNQZ29nSUNBZ0lDQWdJQ0E4ZUcxd09rTnlaV0YwWlVSaGRHVStNakF4TmkweE1DMHhPRlF4Tnpvek16b3dOaTB3Tnpvd01Ed3ZlRzF3T2tOeVpXRjBaVVJoZEdVK0NpQWdJQ0FnSUNBZ0lEeDRiWEE2VFc5a2FXWjVSR0YwWlQ0eU1ERTJMVEV3TFRJd1ZESXhPakU0T2pJMUxUQTNPakF3UEM5NGJYQTZUVzlrYVdaNVJHRjBaVDRLSUNBZ0lDQWdJQ0FnUEhodGNEcE5aWFJoWkdGMFlVUmhkR1UrTWpBeE5pMHhNQzB5TUZReU1Ub3hPRG95TlMwd056b3dNRHd2ZUcxd09rMWxkR0ZrWVhSaFJHRjBaVDRLSUNBZ0lDQWdJQ0FnUEdSak9tWnZjbTFoZEQ1cGJXRm5aUzl3Ym1jOEwyUmpPbVp2Y20xaGRENEtJQ0FnSUNBZ0lDQWdQSEJvYjNSdmMyaHZjRHBEYjJ4dmNrMXZaR1UrTXp3dmNHaHZkRzl6YUc5d09rTnZiRzl5VFc5a1pUNEtJQ0FnSUNBZ0lDQWdQSGh0Y0UxTk9rbHVjM1JoYm1ObFNVUStlRzF3TG1scFpEb3pNRFF5WWpJMFpTMWlNemMyTFdJME5HSXRPR0k0WXkxbFpURmpZMkl6WVdVMU1EVThMM2h0Y0UxTk9rbHVjM1JoYm1ObFNVUStDaUFnSUNBZ0lDQWdJRHg0YlhCTlRUcEViMk4xYldWdWRFbEVQbmh0Y0M1a2FXUTZNekEwTW1JeU5HVXRZak0zTmkxaU5EUmlMVGhpT0dNdFpXVXhZMk5pTTJGbE5UQTFQQzk0YlhCTlRUcEViMk4xYldWdWRFbEVQZ29nSUNBZ0lDQWdJQ0E4ZUcxd1RVMDZUM0pwWjJsdVlXeEViMk4xYldWdWRFbEVQbmh0Y0M1a2FXUTZNekEwTW1JeU5HVXRZak0zTmkxaU5EUmlMVGhpT0dNdFpXVXhZMk5pTTJGbE5UQTFQQzk0YlhCTlRUcFBjbWxuYVc1aGJFUnZZM1Z0Wlc1MFNVUStDaUFnSUNBZ0lDQWdJRHg0YlhCTlRUcElhWE4wYjNKNVBnb2dJQ0FnSUNBZ0lDQWdJQ0E4Y21SbU9sTmxjVDRLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdQSEprWmpwc2FTQnlaR1k2Y0dGeWMyVlVlWEJsUFNKU1pYTnZkWEpqWlNJK0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lEeHpkRVYyZERwaFkzUnBiMjQrWTNKbFlYUmxaRHd2YzNSRmRuUTZZV04wYVc5dVBnb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQThjM1JGZG5RNmFXNXpkR0Z1WTJWSlJENTRiWEF1YVdsa09qTXdOREppTWpSbExXSXpOell0WWpRMFlpMDRZamhqTFdWbE1XTmpZak5oWlRVd05Ud3ZjM1JGZG5RNmFXNXpkR0Z1WTJWSlJENEtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdQSE4wUlhaME9uZG9aVzQrTWpBeE5pMHhNQzB4T0ZReE56b3pNem93Tmkwd056b3dNRHd2YzNSRmRuUTZkMmhsYmo0S0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1BITjBSWFowT25OdlpuUjNZWEpsUVdkbGJuUStRV1J2WW1VZ1VHaHZkRzl6YUc5d0lFTkRJREl3TVRVdU5TQW9WMmx1Wkc5M2N5azhMM04wUlhaME9uTnZablIzWVhKbFFXZGxiblErQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJRHd2Y21SbU9teHBQZ29nSUNBZ0lDQWdJQ0FnSUNBOEwzSmtaanBUWlhFK0NpQWdJQ0FnSUNBZ0lEd3ZlRzF3VFUwNlNHbHpkRzl5ZVQ0S0lDQWdJQ0FnSUNBZ1BIUnBabVk2VDNKcFpXNTBZWFJwYjI0K01Ud3ZkR2xtWmpwUGNtbGxiblJoZEdsdmJqNEtJQ0FnSUNBZ0lDQWdQSFJwWm1ZNldGSmxjMjlzZFhScGIyNCtNamc0TURBd01DOHhNREF3TUR3dmRHbG1aanBZVW1WemIyeDFkR2x2Ymo0S0lDQWdJQ0FnSUNBZ1BIUnBabVk2V1ZKbGMyOXNkWFJwYjI0K01qZzRNREF3TUM4eE1EQXdNRHd2ZEdsbVpqcFpVbVZ6YjJ4MWRHbHZiajRLSUNBZ0lDQWdJQ0FnUEhScFptWTZVbVZ6YjJ4MWRHbHZibFZ1YVhRK01qd3ZkR2xtWmpwU1pYTnZiSFYwYVc5dVZXNXBkRDRLSUNBZ0lDQWdJQ0FnUEdWNGFXWTZRMjlzYjNKVGNHRmpaVDQyTlRVek5Ud3ZaWGhwWmpwRGIyeHZjbE53WVdObFBnb2dJQ0FnSUNBZ0lDQThaWGhwWmpwUWFYaGxiRmhFYVcxbGJuTnBiMjQrTVRJNFBDOWxlR2xtT2xCcGVHVnNXRVJwYldWdWMybHZiajRLSUNBZ0lDQWdJQ0FnUEdWNGFXWTZVR2w0Wld4WlJHbHRaVzV6YVc5dVBqWTBQQzlsZUdsbU9sQnBlR1ZzV1VScGJXVnVjMmx2Ymo0S0lDQWdJQ0FnUEM5eVpHWTZSR1Z6WTNKcGNIUnBiMjQrQ2lBZ0lEd3ZjbVJtT2xKRVJqNEtQQzk0T25odGNHMWxkR0UrQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQUtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQW9nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQUtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQW9nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQUtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQW9nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQUtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQW9nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQUtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQW9nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQUtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQW9nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQUtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQW9nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQUtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQW9nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQUtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQW9nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQUtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQW9nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQUtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQW9nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQUtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQW9nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQUtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQW9nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdDancvZUhCaFkydGxkQ0JsYm1ROUluY2lQejVVaWx6MEFBQUFJR05JVWswQUFIb2xBQUNBZ3dBQStmOEFBSURwQUFCMU1BQUE2bUFBQURxWUFBQVhiNUpmeFVZQUFBSmRTVVJCVkhqYTdOM0xjY0pBRUlUaFJ1VzduY1VlVFFoa1FBaUlETWdJaFVJSWNGUVdKZ0o4OEZLbG92d0FyTjJkNlo0NWNaR0EvVDl2aVlmdHhlVnlRWXp1ZExFRUFTQW1BTVFFZ0JqSmVXbDF4eW1sTndBSEFNZHhISHZGeFU4cERRQ1dBRmJqT0g3STdBQ1QrTzhBTm5raEZPTnY4aG9jOHByd0E3aUpmeDBwQkpQNDEybUdvRE1RWHdyQk4vR2JJdWlNeEpkQThFdjhaZ2c2US9HcEVkd1J2d21DemxoOFNnUVB4SytPb01ZT01Ed1lud3JCRS9HbkNBYlhBUEtUWC8vakZKdVVVdTg0ZnY5ay9PdXNTLzhRZEFibDM4N2VJNEw4bVBjem5Lcm9UbGh5QjFqT2VDNVhDR2FNWDJJdHF3RllBVGlwSVNnUS81VFgwaGVBL042MkZJSlM4VXQrVGxEMElsQUpnY2Y0VlY0R0tpRHdHci9XK3dEVUNEekhyd2FBRllIMytGVUJzQ0ZnaUY4ZEFBc0NsdmhOQUhoSHdCUy9HUUN2Q05qaU53WGdEUUZqL09ZQXZDQmdqVzhDZ0hVRXpQSE5BTENLZ0QyK0tRRFdFQ2pFTndmQUNnS1YrQ1lCVEJEMEFNNjFFUlNJZndiUVc0eHZGa0JHY013N1FUVUVoZUt2OG5OQkFEQ01RREcrZVFDMUVLakdCNENGbDc4UmxGSmE0dXNYVEY3bmpKUnZ6MzVlRC9GZEFTaUlBS3J4M1FFb2hBQ3E4VjFjQTFTNkpwQ003eEtBUVFSdTQ3c0ZZQWlCNi9pdUFSaEE0RDYrZXdBTkVWREVwd0RRQUFGTmZCb0FGUkZReGFjQ1VBRUJYWHc2QUFVUlVNYW5CRkFBQVcxOFdnQXpJcUNPVHcxZ0JnVDA4ZWtCVEJEc25qaDB4eDVmQWtCR01BRFlQbkRJTmgrREFLQ0hRQ2ErRklBN0VVakZsd1B3QndLNStKSUFma0FnR1I5dytKV3dPZWY2eldEVitQSUFZdUxmeGdXQVdJSUFFQk1BWWdKQWpPUjhEZ0QrNk96Z3Y0dXk5Z0FBQUFCSlJVNUVya0pnZ2c9PSc7XG5cbiAgY29uc3QgdGV4dHVyZSA9IG5ldyBUSFJFRS5UZXh0dXJlKCk7XG4gIHRleHR1cmUuaW1hZ2UgPSBpbWFnZTtcbiAgdGV4dHVyZS5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIHRleHR1cmUubWluRmlsdGVyID0gVEhSRUUuTGluZWFyTWlwTWFwTGluZWFyRmlsdGVyO1xuICB0ZXh0dXJlLm1hZ0ZpbHRlciA9IFRIUkVFLkxpbmVhckZpbHRlcjtcbiAgLy8gdGV4dHVyZS5hbmlzb3Ryb3BpY1xuICAvLyB0ZXh0dXJlLmdlbmVyYXRlTWlwbWFwcyA9IGZhbHNlO1xuXG4gIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAgICAvLyBjb2xvcjogMHhmZjAwMDAsXG4gICAgc2lkZTogVEhSRUUuRG91YmxlU2lkZSxcbiAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICBtYXA6IHRleHR1cmVcbiAgfSk7XG4gIG1hdGVyaWFsLmFscGhhVGVzdCA9IDAuMjtcblxuICByZXR1cm4gZnVuY3Rpb24oKXtcbiAgICBjb25zdCBoID0gMC4zO1xuICAgIGNvbnN0IGdlbyA9IG5ldyBUSFJFRS5QbGFuZUdlb21ldHJ5KCBpbWFnZS53aWR0aCAvIDEwMDAgKiBoLCBpbWFnZS5oZWlnaHQgLyAxMDAwICogaCwgMSwgMSApO1xuICAgIGdlby50cmFuc2xhdGUoIC0wLjAwNSwgLTAuMDA0LCAwICk7XG4gICAgcmV0dXJuIG5ldyBUSFJFRS5NZXNoKCBnZW8sIG1hdGVyaWFsICk7XG4gIH1cbn0oKSk7XG5cblxuZXhwb3J0IGNvbnN0IGNoZWNrbWFyayA9IChmdW5jdGlvbigpe1xuICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICBpbWFnZS5zcmMgPSAnZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFJQUFBQUJBQ0FZQUFBRFMxbjkvQUFBQUNYQklXWE1BQUN4TEFBQXNTd0dsUFphcEFBQTRLMmxVV0hSWVRVdzZZMjl0TG1Ga2IySmxMbmh0Y0FBQUFBQUFQRDk0Y0dGamEyVjBJR0psWjJsdVBTTHZ1NzhpSUdsa1BTSlhOVTB3VFhCRFpXaHBTSHB5WlZONlRsUmplbXRqT1dRaVB6NEtQSGc2ZUcxd2JXVjBZU0I0Yld4dWN6cDRQU0poWkc5aVpUcHVjenB0WlhSaEx5SWdlRHA0YlhCMGF6MGlRV1J2WW1VZ1dFMVFJRU52Y21VZ05TNDJMV014TXpJZ056a3VNVFU1TWpnMExDQXlNREUyTHpBMEx6RTVMVEV6T2pFek9qUXdJQ0FnSUNBZ0lDQWlQZ29nSUNBOGNtUm1PbEpFUmlCNGJXeHVjenB5WkdZOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6RTVPVGt2TURJdk1qSXRjbVJtTFhONWJuUmhlQzF1Y3lNaVBnb2dJQ0FnSUNBOGNtUm1Pa1JsYzJOeWFYQjBhVzl1SUhKa1pqcGhZbTkxZEQwaUlnb2dJQ0FnSUNBZ0lDQWdJQ0I0Yld4dWN6cDRiWEE5SW1oMGRIQTZMeTl1Y3k1aFpHOWlaUzVqYjIwdmVHRndMekV1TUM4aUNpQWdJQ0FnSUNBZ0lDQWdJSGh0Ykc1ek9tUmpQU0pvZEhSd09pOHZjSFZ5YkM1dmNtY3ZaR012Wld4bGJXVnVkSE12TVM0eEx5SUtJQ0FnSUNBZ0lDQWdJQ0FnZUcxc2JuTTZjR2h2ZEc5emFHOXdQU0pvZEhSd09pOHZibk11WVdSdlltVXVZMjl0TDNCb2IzUnZjMmh2Y0M4eExqQXZJZ29nSUNBZ0lDQWdJQ0FnSUNCNGJXeHVjenA0YlhCTlRUMGlhSFIwY0RvdkwyNXpMbUZrYjJKbExtTnZiUzk0WVhBdk1TNHdMMjF0THlJS0lDQWdJQ0FnSUNBZ0lDQWdlRzFzYm5NNmMzUkZkblE5SW1oMGRIQTZMeTl1Y3k1aFpHOWlaUzVqYjIwdmVHRndMekV1TUM5elZIbHdaUzlTWlhOdmRYSmpaVVYyWlc1MEl5SUtJQ0FnSUNBZ0lDQWdJQ0FnZUcxc2JuTTZkR2xtWmowaWFIUjBjRG92TDI1ekxtRmtiMkpsTG1OdmJTOTBhV1ptTHpFdU1DOGlDaUFnSUNBZ0lDQWdJQ0FnSUhodGJHNXpPbVY0YVdZOUltaDBkSEE2THk5dWN5NWhaRzlpWlM1amIyMHZaWGhwWmk4eExqQXZJajRLSUNBZ0lDQWdJQ0FnUEhodGNEcERjbVZoZEc5eVZHOXZiRDVCWkc5aVpTQlFhRzkwYjNOb2IzQWdRME1nTWpBeE5TNDFJQ2hYYVc1a2IzZHpLVHd2ZUcxd09rTnlaV0YwYjNKVWIyOXNQZ29nSUNBZ0lDQWdJQ0E4ZUcxd09rTnlaV0YwWlVSaGRHVStNakF4TmkweE1DMHhPRlF4Tnpvek16b3dOaTB3Tnpvd01Ed3ZlRzF3T2tOeVpXRjBaVVJoZEdVK0NpQWdJQ0FnSUNBZ0lEeDRiWEE2VFc5a2FXWjVSR0YwWlQ0eU1ERTJMVEV3TFRJd1ZESXhPak16T2pVekxUQTNPakF3UEM5NGJYQTZUVzlrYVdaNVJHRjBaVDRLSUNBZ0lDQWdJQ0FnUEhodGNEcE5aWFJoWkdGMFlVUmhkR1UrTWpBeE5pMHhNQzB5TUZReU1Ub3pNem8xTXkwd056b3dNRHd2ZUcxd09rMWxkR0ZrWVhSaFJHRjBaVDRLSUNBZ0lDQWdJQ0FnUEdSak9tWnZjbTFoZEQ1cGJXRm5aUzl3Ym1jOEwyUmpPbVp2Y20xaGRENEtJQ0FnSUNBZ0lDQWdQSEJvYjNSdmMyaHZjRHBEYjJ4dmNrMXZaR1UrTXp3dmNHaHZkRzl6YUc5d09rTnZiRzl5VFc5a1pUNEtJQ0FnSUNBZ0lDQWdQSGh0Y0UxTk9rbHVjM1JoYm1ObFNVUStlRzF3TG1scFpEbzJPRGN4WVRrNVl5MHpOakU1TFRsa05HRXRPRGRrTmkwd1lXRTVZVFJpTldVNE1qYzhMM2h0Y0UxTk9rbHVjM1JoYm1ObFNVUStDaUFnSUNBZ0lDQWdJRHg0YlhCTlRUcEViMk4xYldWdWRFbEVQbmh0Y0M1a2FXUTZOamczTVdFNU9XTXRNell4T1MwNVpEUmhMVGczWkRZdE1HRmhPV0UwWWpWbE9ESTNQQzk0YlhCTlRUcEViMk4xYldWdWRFbEVQZ29nSUNBZ0lDQWdJQ0E4ZUcxd1RVMDZUM0pwWjJsdVlXeEViMk4xYldWdWRFbEVQbmh0Y0M1a2FXUTZOamczTVdFNU9XTXRNell4T1MwNVpEUmhMVGczWkRZdE1HRmhPV0UwWWpWbE9ESTNQQzk0YlhCTlRUcFBjbWxuYVc1aGJFUnZZM1Z0Wlc1MFNVUStDaUFnSUNBZ0lDQWdJRHg0YlhCTlRUcElhWE4wYjNKNVBnb2dJQ0FnSUNBZ0lDQWdJQ0E4Y21SbU9sTmxjVDRLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdQSEprWmpwc2FTQnlaR1k2Y0dGeWMyVlVlWEJsUFNKU1pYTnZkWEpqWlNJK0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lEeHpkRVYyZERwaFkzUnBiMjQrWTNKbFlYUmxaRHd2YzNSRmRuUTZZV04wYVc5dVBnb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQThjM1JGZG5RNmFXNXpkR0Z1WTJWSlJENTRiWEF1YVdsa09qWTROekZoT1RsakxUTTJNVGt0T1dRMFlTMDROMlEyTFRCaFlUbGhOR0kxWlRneU56d3ZjM1JGZG5RNmFXNXpkR0Z1WTJWSlJENEtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdQSE4wUlhaME9uZG9aVzQrTWpBeE5pMHhNQzB4T0ZReE56b3pNem93Tmkwd056b3dNRHd2YzNSRmRuUTZkMmhsYmo0S0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1BITjBSWFowT25OdlpuUjNZWEpsUVdkbGJuUStRV1J2WW1VZ1VHaHZkRzl6YUc5d0lFTkRJREl3TVRVdU5TQW9WMmx1Wkc5M2N5azhMM04wUlhaME9uTnZablIzWVhKbFFXZGxiblErQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJRHd2Y21SbU9teHBQZ29nSUNBZ0lDQWdJQ0FnSUNBOEwzSmtaanBUWlhFK0NpQWdJQ0FnSUNBZ0lEd3ZlRzF3VFUwNlNHbHpkRzl5ZVQ0S0lDQWdJQ0FnSUNBZ1BIUnBabVk2VDNKcFpXNTBZWFJwYjI0K01Ud3ZkR2xtWmpwUGNtbGxiblJoZEdsdmJqNEtJQ0FnSUNBZ0lDQWdQSFJwWm1ZNldGSmxjMjlzZFhScGIyNCtNamc0TURBd01DOHhNREF3TUR3dmRHbG1aanBZVW1WemIyeDFkR2x2Ymo0S0lDQWdJQ0FnSUNBZ1BIUnBabVk2V1ZKbGMyOXNkWFJwYjI0K01qZzRNREF3TUM4eE1EQXdNRHd2ZEdsbVpqcFpVbVZ6YjJ4MWRHbHZiajRLSUNBZ0lDQWdJQ0FnUEhScFptWTZVbVZ6YjJ4MWRHbHZibFZ1YVhRK01qd3ZkR2xtWmpwU1pYTnZiSFYwYVc5dVZXNXBkRDRLSUNBZ0lDQWdJQ0FnUEdWNGFXWTZRMjlzYjNKVGNHRmpaVDQyTlRVek5Ud3ZaWGhwWmpwRGIyeHZjbE53WVdObFBnb2dJQ0FnSUNBZ0lDQThaWGhwWmpwUWFYaGxiRmhFYVcxbGJuTnBiMjQrTVRJNFBDOWxlR2xtT2xCcGVHVnNXRVJwYldWdWMybHZiajRLSUNBZ0lDQWdJQ0FnUEdWNGFXWTZVR2w0Wld4WlJHbHRaVzV6YVc5dVBqWTBQQzlsZUdsbU9sQnBlR1ZzV1VScGJXVnVjMmx2Ymo0S0lDQWdJQ0FnUEM5eVpHWTZSR1Z6WTNKcGNIUnBiMjQrQ2lBZ0lEd3ZjbVJtT2xKRVJqNEtQQzk0T25odGNHMWxkR0UrQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQUtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQW9nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQUtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQW9nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQUtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQW9nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQUtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQW9nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQUtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQW9nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQUtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQW9nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQUtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQW9nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQUtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQW9nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQUtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQW9nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQUtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQW9nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQUtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQW9nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQUtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQW9nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQUtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQW9nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdDancvZUhCaFkydGxkQ0JsYm1ROUluY2lQejV6OVJUM0FBQUFJR05JVWswQUFIb2xBQUNBZ3dBQStmOEFBSURwQUFCMU1BQUE2bUFBQURxWUFBQVhiNUpmeFVZQUFBVHRTVVJCVkhqYTdKemJiNVJGR01aLzJ4YkN2VmhBU0V4VWlJMTQ0dzBoUXRIRUdySGdJU3FnTjZLZ3ROWVdBYjB3MFdvMVhxcmJQYlNsb2tZU3hmTWhlbVgvQWE3d0dBVnE4WFRwMzBEWGk1bUptMGEydTl2My9iNloyWGx1ZHJPSGR3L1BNelBQKzc0elg2RldxeUdGZ1lFQkVscEdEL0FlY0N0d0IvRGJjbStZbTVzVCsvQ3U5UC9uaW02Z0NEd0NYQXQ4RFZ5WDVSZElBc2dQQmFBRWpOUTlkaVB3RmJBNUNTQitUQUZQL2Mvalc0SFBnTDRrZ0hneEN3dzFlUDVtNEdON213UVFFYm9zK1U4MDhkcXR3RWYyTmdrZ0VyYy8weVQ1RG4xMk9kaVNCQkErK2FVV3lYZllBbndEWEo4RUVHNnFOd2tNcnlER1pwc2kzcEFFRUI2cVYzRDdyYUlQK05LbWlra0FnZUF0NEloZ3ZKdnNUSkFFNERrS3dDbmdzRUxzczBrQS9xLzVzOEFoaGRqVHdFRnBkNW9nUzM1VmFlVFBBazhEaTBrQS9wSmZFbDd6SFU3U3VIS1lsZ0FQMXZ5eWtOdGZpaGt0OHBNQVpFa2FWb2hiVllxYkJDQ0lVOENUQ25GTHdKajJsMDhDV05tYS83YVMyNjhDeDZRTlh4S0FySG1lQmg1WFdrN0dzaUEvVHdHTVlmYS9oVXArbWZZYU84MjQvZUdzeU05TEFDOWdtaVB2QXpzREk3L0xyczFEU2lOL0tJOGZsQ1hHZ1ZmdC9WN2dETEFySUFGTWgrcjJmUkRBUzhERWtzYzJBaDhDL1IzczlzdkFhSjVUV2xia3YzeUY1OVpqZHIxczkzamExM0w3RmV2MmF6RUxZTHdCK1E1ck1iM3ViUjRhdnBOS2JuOGFlQWE0bkxlNnRRM2ZSSk92N1FXKzhHZ202TEVqVktPeE00TTVEM0E1N3grcEtZQVg2d3hmczlnQWZBTHM4SUI4cmNhT0t4dlhmRkM1bGdER2dWZmFmSzh6aHJ0eS9FKzBYSGtsTDdlZnBRQW1XcGoybHhQQmJUbjhKN1BvMWZaSDhRelNBbmpOam40SnJNZWNqc21xV0ZRQTNsVnkreVhyOW9sZEFIY0t4N3NhK0R3RFk5aGo4L3lEaXFuZVlpY0k0RkhnUitHWWE1V3pBODNHemhSdzFGZnlOUVR3QzNDUHZaWEVPdUJUekVVVUpMRXFnMVRQVy9LMVRPQ2Z3Q0J3VVRqdU5jaVdqYnN4WlZpTlZDKzMycjR2YWVBZndGM0FnbkRjVFZZRXR3dU5VQTN5eTVqZHUzU3lBQUIrQjNZckxBY2JCT29FN3loTis1TjJ6U2NKd0dBZWVBRDRUamh1TDZhQjFLb242TGJrUDZZMDhvL2pTWVhQRndFQW5BY2VWaERCVlMxbUI2NnhvMEgrRktheHMwaGd5S29kZkFGNEVQaEpxVTZ3M0V5d3locXpRMHJrajRSSWZwWUNBTGdFN0xFemdpUmN4YkMvd2Npdm9GUGVkZVFIaTZ5M2hQMWxqZUc4VW9xNE5Ec29ZSW84V2p0NWdpWS9Ed0hVcDRpL0ttUUhaK3BFVU1EczVORncrMFV5T0xRUnF3RGNjbkF2OEwxdzNIWEFhWnNpdnE1aytJckFDU0pCbnFlRDU0RUR3QWZBTFlKeE53SGZLcG15c2lWL01SWUI1SDB5NkFLd0gvaEJPTzVxWUkyQzRUc2FFL2srQ0FETTFiSDNJbDh4bEVUVkdyNGFrY0dYczRGL0EzZmJHY0UzVkFpb3RoK3FBTUIwRVhkN0pvSkpQTnpHRmFzQXdEU1FCcEhmVk5LdTJ6OUc1UER4ZVBnQzhCQndMdWVSZnlMR05UOEVBWURaVEhJQStRWlNzMnYrOGRqY2ZtZ0NjSFdDKzVGdklDM245a2M3aFh6ZkJlQ000UjdreThZZDUvWkRGUUQ4MTBDNnFQZ1owYnY5a0FWUW55SnFGSXZleEd6bUlBbkFiMXdDN2hNMmhrWGdXVG9Zb1YwbHpEV1FKRkxFNkJvN25TQUFseUx1WTJVTnBBb1pYb290Q1VBZUM1Z0cwczl0a2o5S1F0QUNBTk5BR3FTMVBZYWxSSDQ4QW5BcFlyUGJ5NG9FZG1nakNhRDVGSEV2amJlWHZZRXA3eVpFS0FEbkNmWmJFZndEUEk4NUwrRElmNDRPYU95MGczOEhBTS9lN2d1SVJ4OTRBQUFBQUVsRlRrU3VRbUNDJztcblxuICBjb25zdCB0ZXh0dXJlID0gbmV3IFRIUkVFLlRleHR1cmUoKTtcbiAgdGV4dHVyZS5pbWFnZSA9IGltYWdlO1xuICB0ZXh0dXJlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgdGV4dHVyZS5taW5GaWx0ZXIgPSBUSFJFRS5MaW5lYXJNaXBNYXBMaW5lYXJGaWx0ZXI7XG4gIHRleHR1cmUubWFnRmlsdGVyID0gVEhSRUUuTGluZWFyRmlsdGVyO1xuICAvLyB0ZXh0dXJlLmFuaXNvdHJvcGljXG4gIC8vIHRleHR1cmUuZ2VuZXJhdGVNaXBtYXBzID0gZmFsc2U7XG5cbiAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICAgIC8vIGNvbG9yOiAweGZmMDAwMCxcbiAgICBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlLFxuICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgIG1hcDogdGV4dHVyZVxuICB9KTtcbiAgbWF0ZXJpYWwuYWxwaGFUZXN0ID0gMC4yO1xuXG4gIHJldHVybiBmdW5jdGlvbigpe1xuICAgIGNvbnN0IGggPSAwLjQ7XG4gICAgY29uc3QgZ2VvID0gbmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkoIGltYWdlLndpZHRoIC8gMTAwMCAqIGgsIGltYWdlLmhlaWdodCAvIDEwMDAgKiBoLCAxLCAxICk7XG4gICAgZ2VvLnRyYW5zbGF0ZSggMC4wMjUsIDAsIDAgKTtcbiAgICByZXR1cm4gbmV3IFRIUkVFLk1lc2goIGdlbywgbWF0ZXJpYWwgKTtcbiAgfVxufSgpKTsiLCIvKiogXG4gKiBCaWcgYnV0dG9uIHdpdGggYW4gaW1hZ2Ugb24gKHdoaWNoIG1pZ2h0IGNvbWUgZnJvbSBhIGZpbGUgb3IgZXhpc3RpbmcgdGV4dHVyZSxcbiAqIHRoZSB0ZXh0dXJlIG1pZ2h0IGJlIGZyb20gYSBSZW5kZXJUYXJnZXQuLi4pLlxuICogXG4gKiBJJ2QgcHV0IHRoaXMgbW9yZSBzZXBhcmF0ZSBmcm9tIHRoZSBkYXRndWkgbW9kdWxlcyBidXQgbmVlZCB0byB0aGluayBhIGxpdHRsZVxuICogYml0IGFib3V0IGhvdyB0byBzdHJ1Y3R1cmUgdGhhdCBldGMuICBWZXJ5IHVuLURSWSwgYnV0IEknbSBzdGFydGluZyBieSBqdXN0XG4gKiBjb3B5aW5nIGV4aXN0aW5nIGJ1dHRvbi5qcyBpbiBpdHMgZW50aXJldHkuXG4gKiBcbiAqIFRPRE86IG5vdCBqdXN0IHNpbXBsZSAnYmFuZycgZnVuY3Rpb24gYnV0IGNhbGxiYWNrcyBmb3IgaG92ZXIgLyBldGMuXG4gKiBcbiAqIFxuICogQ29weXJpZ2h0ICBEYXRhIEFydHMgVGVhbSwgR29vZ2xlIGluYy4gMjAxNiAvIFBldGVyIFRvZGQsIDIwMTdcbiAqIFxuKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4qIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuKlxuKiAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4qXG4qIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgKiBhcyBTdWJkaXZpc2lvbk1vZGlmaWVyIGZyb20gJy4uL3RoaXJkcGFydHkvU3ViZGl2aXNpb25Nb2RpZmllcic7XG5cbmltcG9ydCBjcmVhdGVUZXh0TGFiZWwgZnJvbSAnLi90ZXh0bGFiZWwnO1xuaW1wb3J0IGNyZWF0ZUludGVyYWN0aW9uIGZyb20gJy4vaW50ZXJhY3Rpb24nO1xuaW1wb3J0ICogYXMgQ29sb3JzIGZyb20gJy4vY29sb3JzJztcbmltcG9ydCAqIGFzIExheW91dCBmcm9tICcuL2xheW91dCc7XG5pbXBvcnQgKiBhcyBTaGFyZWRNYXRlcmlhbHMgZnJvbSAnLi9zaGFyZWRtYXRlcmlhbHMnO1xuaW1wb3J0ICogYXMgR3JhYiBmcm9tICcuL2dyYWInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVJbWFnZUJ1dHRvbigge1xuICB0ZXh0Q3JlYXRvcixcbiAgb2JqZWN0LFxuICBwcm9wZXJ0eU5hbWUgPSAndW5kZWZpbmVkJyxcbiAgaW1hZ2UgPSBcInRleHR1cmVzL3Nwb3RsaWdodC5qcGdcIiwgLy9UT0RPIGJldHRlciBkZWZhdWx0XG4gIHdpZHRoID0gTGF5b3V0LlBBTkVMX1dJRFRILFxuICBoZWlnaHQgPSBMYXlvdXQuUEFORUxfV0lEVEggLyAzLFxuICBkZXB0aCA9IExheW91dC5QQU5FTF9ERVBUSFxufSA9IHt9ICl7XG5cbiAgZnVuY3Rpb24gYXBwbHlJbWFnZVRvTWF0ZXJpYWwoaW1hZ2UsIHRhcmdldE1hdGVyaWFsKSB7XG4gICAgICBpZiAodHlwZW9mIGltYWdlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIC8vVE9ETyBjYWNoZS4gIERvZXMgVGV4dHVyZUxvYWRlciBhbHJlYWR5IGNhY2hlP1xuICAgICAgICAvL1RPRE8gSW1hZ2Ugb25seSBvbiBmcm9udCBmYWNlIG9mIGJ1dHRvbi5cbiAgICAgICAgbmV3IFRIUkVFLlRleHR1cmVMb2FkZXIoKS5sb2FkKGltYWdlLCAodGV4dHVyZSkgPT4ge1xuICAgICAgICAgICAgdGV4dHVyZS53cmFwUyA9IHRleHR1cmUud3JhcFQgPSBUSFJFRS5DbGFtcFRvRWRnZVdyYXBwaW5nO1xuICAgICAgICAgICAgdGFyZ2V0TWF0ZXJpYWwubWFwID0gdGV4dHVyZTtcbiAgICAgICAgICAgIHRhcmdldE1hdGVyaWFsLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKGltYWdlLmlzVGV4dHVyZSkge1xuICAgICAgICAgIHRhcmdldE1hdGVyaWFsLm1hcCA9IGltYWdlO1xuICAgICAgfSBlbHNlIGlmIChpbWFnZS5pc1dlYkdMUmVuZGVyVGFyZ2V0KSB7XG4gICAgICAgICAgdGFyZ2V0TWF0ZXJpYWwubWFwID0gaW1hZ2UudGV4dHVyZTtcbiAgICAgIH0gZWxzZSB0aHJvdyBcIm5vdCBzdXJlIGhvdyB0byBpbnRlcnByZXQgaW1hZ2UgXCIgKyBpbWFnZTtcbiAgICAgIHRhcmdldE1hdGVyaWFsLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIGNvbnN0IEJVVFRPTl9XSURUSCA9IHdpZHRoICogMC41IC0gTGF5b3V0LlBBTkVMX01BUkdJTjtcbiAgY29uc3QgQlVUVE9OX0hFSUdIVCA9IGhlaWdodCAtIExheW91dC5QQU5FTF9NQVJHSU47XG4gIGNvbnN0IEJVVFRPTl9ERVBUSCA9IExheW91dC5CVVRUT05fREVQVEg7XG5cbiAgY29uc3QgZ3JvdXAgPSBuZXcgVEhSRUUuR3JvdXAoKTtcbiAgZ3JvdXAuc3BhY2luZyA9IGhlaWdodDtcblxuICBjb25zdCBwYW5lbCA9IExheW91dC5jcmVhdGVQYW5lbCggd2lkdGgsIGhlaWdodCwgZGVwdGggKTtcbiAgZ3JvdXAuYWRkKCBwYW5lbCApO1xuXG4gIC8vICBiYXNlIGNoZWNrYm94XG4gIGNvbnN0IGRpdmlzaW9ucyA9IDQ7XG4gIGNvbnN0IGFzcGVjdFJhdGlvID0gQlVUVE9OX1dJRFRIIC8gQlVUVE9OX0hFSUdIVDtcbiAgY29uc3QgcmVjdCA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSggQlVUVE9OX1dJRFRILCBCVVRUT05fSEVJR0hULCBCVVRUT05fREVQVEgsIE1hdGguZmxvb3IoIGRpdmlzaW9ucyAqIGFzcGVjdFJhdGlvICksIGRpdmlzaW9ucywgZGl2aXNpb25zICk7XG4gIGNvbnN0IG1vZGlmaWVyID0gbmV3IFRIUkVFLlN1YmRpdmlzaW9uTW9kaWZpZXIoIDEgKTtcbiAgbW9kaWZpZXIubW9kaWZ5KCByZWN0ICk7XG4gIHJlY3QudHJhbnNsYXRlKCBCVVRUT05fV0lEVEggKiAwLjUsIDAsIDAgKTtcblxuICAvLyAgaGl0c2NhbiB2b2x1bWVcbiAgY29uc3QgaGl0c2Nhbk1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKCk7XG4gIGhpdHNjYW5NYXRlcmlhbC52aXNpYmxlID0gZmFsc2U7XG5cbiAgY29uc3QgaGl0c2NhblZvbHVtZSA9IG5ldyBUSFJFRS5NZXNoKCByZWN0LmNsb25lKCksIGhpdHNjYW5NYXRlcmlhbCApO1xuICBoaXRzY2FuVm9sdW1lLnBvc2l0aW9uLnogPSBCVVRUT05fREVQVEggKiAwLjU7XG4gIGhpdHNjYW5Wb2x1bWUucG9zaXRpb24ueCA9IHdpZHRoICogMC41O1xuXG4gIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKCk7XG4gIGFwcGx5SW1hZ2VUb01hdGVyaWFsKGltYWdlLCBtYXRlcmlhbCk7XG4gIGNvbnN0IGZpbGxlZFZvbHVtZSA9IG5ldyBUSFJFRS5NZXNoKCByZWN0LmNsb25lKCksIG1hdGVyaWFsICk7XG4gIGhpdHNjYW5Wb2x1bWUuYWRkKCBmaWxsZWRWb2x1bWUgKTtcblxuICAvL2J1dHRvbiBsYWJlbCByZW1vdmVkLlxuXG4gIGNvbnN0IGRlc2NyaXB0b3JMYWJlbCA9IHRleHRDcmVhdG9yLmNyZWF0ZSggcHJvcGVydHlOYW1lICk7XG4gIGRlc2NyaXB0b3JMYWJlbC5wb3NpdGlvbi54ID0gTGF5b3V0LlBBTkVMX0xBQkVMX1RFWFRfTUFSR0lOO1xuICBkZXNjcmlwdG9yTGFiZWwucG9zaXRpb24ueiA9IGRlcHRoO1xuICBkZXNjcmlwdG9yTGFiZWwucG9zaXRpb24ueSA9IC0wLjAzO1xuXG4gIGNvbnN0IGNvbnRyb2xsZXJJRCA9IExheW91dC5jcmVhdGVDb250cm9sbGVySURCb3goIGhlaWdodCwgQ29sb3JzLkNPTlRST0xMRVJfSURfQlVUVE9OICk7XG4gIGNvbnRyb2xsZXJJRC5wb3NpdGlvbi56ID0gZGVwdGg7XG5cbiAgcGFuZWwuYWRkKCBkZXNjcmlwdG9yTGFiZWwsIGhpdHNjYW5Wb2x1bWUsIGNvbnRyb2xsZXJJRCApO1xuXG4gIGNvbnN0IGludGVyYWN0aW9uID0gY3JlYXRlSW50ZXJhY3Rpb24oIGhpdHNjYW5Wb2x1bWUgKTtcbiAgaW50ZXJhY3Rpb24uZXZlbnRzLm9uKCAnb25QcmVzc2VkJywgaGFuZGxlT25QcmVzcyApO1xuICBpbnRlcmFjdGlvbi5ldmVudHMub24oICdvblJlbGVhc2VkJywgaGFuZGxlT25SZWxlYXNlICk7XG5cbiAgdXBkYXRlVmlldygpO1xuXG4gIGZ1bmN0aW9uIGhhbmRsZU9uUHJlc3MoIHAgKXtcbiAgICBpZiggZ3JvdXAudmlzaWJsZSA9PT0gZmFsc2UgKXtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBvYmplY3RbIHByb3BlcnR5TmFtZSBdKCk7XG5cbiAgICBoaXRzY2FuVm9sdW1lLnBvc2l0aW9uLnogPSBCVVRUT05fREVQVEggKiAwLjE7XG5cbiAgICBwLmxvY2tlZCA9IHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVPblJlbGVhc2UoKXtcbiAgICBoaXRzY2FuVm9sdW1lLnBvc2l0aW9uLnogPSBCVVRUT05fREVQVEggKiAwLjU7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVWaWV3KCl7XG5cbiAgICBpZiggaW50ZXJhY3Rpb24uaG92ZXJpbmcoKSApe1xuICAgICAgbWF0ZXJpYWwuY29sb3Iuc2V0SGV4KCBDb2xvcnMuQlVUVE9OX0hJR0hMSUdIVF9DT0xPUiApO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgbWF0ZXJpYWwuY29sb3Iuc2V0SGV4KCBDb2xvcnMuQlVUVE9OX0NPTE9SICk7XG4gICAgfVxuXG4gIH1cblxuICBncm91cC5pbnRlcmFjdGlvbiA9IGludGVyYWN0aW9uO1xuICBncm91cC5oaXRzY2FuID0gWyBoaXRzY2FuVm9sdW1lLCBwYW5lbCBdO1xuXG4gIGNvbnN0IGdyYWJJbnRlcmFjdGlvbiA9IEdyYWIuY3JlYXRlKCB7IGdyb3VwLCBwYW5lbCB9ICk7XG5cbiAgZ3JvdXAudXBkYXRlID0gZnVuY3Rpb24oIGlucHV0T2JqZWN0cyApe1xuICAgIGludGVyYWN0aW9uLnVwZGF0ZSggaW5wdXRPYmplY3RzICk7XG4gICAgZ3JhYkludGVyYWN0aW9uLnVwZGF0ZSggaW5wdXRPYmplY3RzICk7XG4gICAgdXBkYXRlVmlldygpO1xuICB9O1xuXG4gIGdyb3VwLm5hbWUgPSBmdW5jdGlvbiggc3RyICl7XG4gICAgZGVzY3JpcHRvckxhYmVsLnVwZGF0ZSggc3RyICk7XG4gICAgcmV0dXJuIGdyb3VwO1xuICB9O1xuXG5cbiAgcmV0dXJuIGdyb3VwO1xufSIsIi8qKlxuKiBkYXQtZ3VpVlIgSmF2YXNjcmlwdCBDb250cm9sbGVyIExpYnJhcnkgZm9yIFZSXG4qIGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRhYXJ0cy9kYXQuZ3VpVlJcbipcbiogQ29weXJpZ2h0IDIwMTYgRGF0YSBBcnRzIFRlYW0sIEdvb2dsZSBJbmMuXG4qXG4qIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4qIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4qXG4qICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbipcbiogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4qIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4qIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IEVtaXR0ZXIgZnJvbSAnZXZlbnRzJztcbmltcG9ydCBjcmVhdGVTbGlkZXIgZnJvbSAnLi9zbGlkZXInO1xuaW1wb3J0IGNyZWF0ZUNoZWNrYm94IGZyb20gJy4vY2hlY2tib3gnO1xuaW1wb3J0IGNyZWF0ZUJ1dHRvbiBmcm9tICcuL2J1dHRvbic7XG5pbXBvcnQgY3JlYXRlRm9sZGVyIGZyb20gJy4vZm9sZGVyJztcbmltcG9ydCBjcmVhdGVEcm9wZG93biBmcm9tICcuL2Ryb3Bkb3duJztcbi8vUEpUOiBJJ2QgcmF0aGVyIGluamVjdCBjdXN0b20gZXh0ZW5zaW9ucyBsaWtlIHRoaXMsIGJ1dCB3aWxsIHdvcmsgdGhhdCBvdXQgbGF0ZXIuXG5pbXBvcnQgY3JlYXRlSW1hZ2VCdXR0b24gZnJvbSAnLi9pbWFnZWJ1dHRvbic7XG5pbXBvcnQgKiBhcyBTREZUZXh0IGZyb20gJy4vc2RmdGV4dCc7XG5cbmNvbnN0IEdVSVZSID0gKGZ1bmN0aW9uIERBVEdVSVZSKCl7XG5cbiAgLypcbiAgICBTREYgZm9udFxuICAqL1xuICBjb25zdCB0ZXh0Q3JlYXRvciA9IFNERlRleHQuY3JlYXRvcigpO1xuXG5cbiAgLypcbiAgICBMaXN0cy5cbiAgICBJbnB1dE9iamVjdHMgYXJlIHRoaW5ncyBsaWtlIFZJVkUgY29udHJvbGxlcnMsIGNhcmRib2FyZCBoZWFkc2V0cywgZXRjLlxuICAgIENvbnRyb2xsZXJzIGFyZSB0aGUgREFUIEdVSSBzbGlkZXJzLCBjaGVja2JveGVzLCBldGMuXG4gICAgSGl0c2Nhbk9iamVjdHMgYXJlIGFueXRoaW5nIHJheWNhc3RzIHdpbGwgaGl0LXRlc3QgYWdhaW5zdC5cbiAgKi9cbiAgY29uc3QgaW5wdXRPYmplY3RzID0gW107XG4gIGNvbnN0IGNvbnRyb2xsZXJzID0gW107XG4gIGNvbnN0IGhpdHNjYW5PYmplY3RzID0gW107XG5cbiAgbGV0IG1vdXNlRW5hYmxlZCA9IGZhbHNlO1xuICBsZXQgbW91c2VSZW5kZXJlciA9IHVuZGVmaW5lZDtcblxuICBmdW5jdGlvbiBlbmFibGVNb3VzZSggY2FtZXJhLCByZW5kZXJlciApe1xuICAgIG1vdXNlRW5hYmxlZCA9IHRydWU7XG4gICAgbW91c2VSZW5kZXJlciA9IHJlbmRlcmVyO1xuICAgIG1vdXNlSW5wdXQubW91c2VDYW1lcmEgPSBjYW1lcmE7XG4gICAgcmV0dXJuIG1vdXNlSW5wdXQubGFzZXI7XG4gIH1cblxuICBmdW5jdGlvbiBkaXNhYmxlTW91c2UoKXtcbiAgICBtb3VzZUVuYWJsZWQgPSBmYWxzZTtcbiAgfVxuXG5cblxuXG4gIC8qXG4gICAgVGhlIGRlZmF1bHQgbGFzZXIgcG9pbnRlciBjb21pbmcgb3V0IG9mIGVhY2ggSW5wdXRPYmplY3QuXG4gICovXG4gIGNvbnN0IGxhc2VyTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTGluZUJhc2ljTWF0ZXJpYWwoe2NvbG9yOjB4NTVhYWZmLCB0cmFuc3BhcmVudDogdHJ1ZSwgYmxlbmRpbmc6IFRIUkVFLkFkZGl0aXZlQmxlbmRpbmcgfSk7XG4gIGZ1bmN0aW9uIGNyZWF0ZUxhc2VyKCl7XG4gICAgY29uc3QgZyA9IG5ldyBUSFJFRS5HZW9tZXRyeSgpO1xuICAgIGcudmVydGljZXMucHVzaCggbmV3IFRIUkVFLlZlY3RvcjMoKSApO1xuICAgIGcudmVydGljZXMucHVzaCggbmV3IFRIUkVFLlZlY3RvcjMoMCwwLDApICk7XG4gICAgcmV0dXJuIG5ldyBUSFJFRS5MaW5lKCBnLCBsYXNlck1hdGVyaWFsICk7XG4gIH1cblxuXG5cblxuXG4gIC8qXG4gICAgQSBcImN1cnNvclwiLCBlZyB0aGUgYmFsbCB0aGF0IGFwcGVhcnMgYXQgdGhlIGVuZCBvZiB5b3VyIGxhc2VyLlxuICAqL1xuICBjb25zdCBjdXJzb3JNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7Y29sb3I6MHg0NDQ0NDQsIHRyYW5zcGFyZW50OiB0cnVlLCBibGVuZGluZzogVEhSRUUuQWRkaXRpdmVCbGVuZGluZyB9ICk7XG4gIGZ1bmN0aW9uIGNyZWF0ZUN1cnNvcigpe1xuICAgIHJldHVybiBuZXcgVEhSRUUuTWVzaCggbmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KDAuMDA2LCA0LCA0ICksIGN1cnNvck1hdGVyaWFsICk7XG4gIH1cblxuXG5cblxuICAvKlxuICAgIENyZWF0ZXMgYSBnZW5lcmljIElucHV0IHR5cGUuXG4gICAgVGFrZXMgYW55IFRIUkVFLk9iamVjdDNEIHR5cGUgb2JqZWN0IGFuZCB1c2VzIGl0cyBwb3NpdGlvblxuICAgIGFuZCBvcmllbnRhdGlvbiBhcyBhbiBpbnB1dCBkZXZpY2UuXG5cbiAgICBBIGxhc2VyIHBvaW50ZXIgaXMgaW5jbHVkZWQgYW5kIHdpbGwgYmUgdXBkYXRlZC5cbiAgICBDb250YWlucyBzdGF0ZSBhYm91dCB3aGljaCBJbnRlcmFjdGlvbiBpcyBjdXJyZW50bHkgYmVpbmcgdXNlZCBvciBob3Zlci5cbiAgKi9cbiAgZnVuY3Rpb24gY3JlYXRlSW5wdXQoIGlucHV0T2JqZWN0ID0gbmV3IFRIUkVFLkdyb3VwKCkgKXtcbiAgICBjb25zdCBpbnB1dCA9IHtcbiAgICAgIHJheWNhc3Q6IG5ldyBUSFJFRS5SYXljYXN0ZXIoIG5ldyBUSFJFRS5WZWN0b3IzKCksIG5ldyBUSFJFRS5WZWN0b3IzKCkgKSxcbiAgICAgIGxhc2VyOiBjcmVhdGVMYXNlcigpLFxuICAgICAgY3Vyc29yOiBjcmVhdGVDdXJzb3IoKSxcbiAgICAgIG9iamVjdDogaW5wdXRPYmplY3QsXG4gICAgICBwcmVzc2VkOiBmYWxzZSxcbiAgICAgIGdyaXBwZWQ6IGZhbHNlLFxuICAgICAgZXZlbnRzOiBuZXcgRW1pdHRlcigpLFxuICAgICAgaW50ZXJhY3Rpb246IHtcbiAgICAgICAgZ3JpcDogdW5kZWZpbmVkLFxuICAgICAgICBwcmVzczogdW5kZWZpbmVkLFxuICAgICAgICBob3ZlcjogdW5kZWZpbmVkXG4gICAgICB9XG4gICAgfTtcblxuICAgIGlucHV0Lmxhc2VyLmFkZCggaW5wdXQuY3Vyc29yICk7XG5cbiAgICByZXR1cm4gaW5wdXQ7XG4gIH1cblxuXG5cblxuXG4gIC8qXG4gICAgTW91c2VJbnB1dC5cbiAgICBBbGxvd3MgeW91IHRvIGNsaWNrIG9uIHRoZSBzY3JlZW4gd2hlbiBub3QgaW4gVlIgZm9yIGRlYnVnZ2luZy5cbiAgKi9cbiAgY29uc3QgbW91c2VJbnB1dCA9IGNyZWF0ZU1vdXNlSW5wdXQoKTtcblxuICBmdW5jdGlvbiBjcmVhdGVNb3VzZUlucHV0KCl7XG4gICAgY29uc3QgbW91c2UgPSBuZXcgVEhSRUUuVmVjdG9yMigtMSwtMSk7XG5cbiAgICBjb25zdCBpbnB1dCA9IGNyZWF0ZUlucHV0KCk7XG4gICAgaW5wdXQubW91c2UgPSBtb3VzZTtcbiAgICBpbnB1dC5tb3VzZUludGVyc2VjdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG4gICAgaW5wdXQubW91c2VPZmZzZXQgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICAgIGlucHV0Lm1vdXNlUGxhbmUgPSBuZXcgVEhSRUUuUGxhbmUoKTtcbiAgICBpbnB1dC5pbnRlcnNlY3Rpb25zID0gW107XG5cbiAgICAvLyAgc2V0IG15IGVuYWJsZU1vdXNlXG4gICAgaW5wdXQubW91c2VDYW1lcmEgPSB1bmRlZmluZWQ7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNlbW92ZScsIGZ1bmN0aW9uKCBldmVudCApe1xuICAgICAgLy8gaWYgYSBzcGVjaWZpYyByZW5kZXJlciBoYXMgYmVlbiBkZWZpbmVkXG4gICAgICBpZiAobW91c2VSZW5kZXJlcikge1xuICAgICAgICBjb25zdCBjbGllbnRSZWN0ID0gbW91c2VSZW5kZXJlci5kb21FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBtb3VzZS54ID0gKCAoZXZlbnQuY2xpZW50WCAtIGNsaWVudFJlY3QubGVmdCkgLyBjbGllbnRSZWN0LndpZHRoKSAqIDIgLSAxO1xuICAgICAgICBtb3VzZS55ID0gLSAoIChldmVudC5jbGllbnRZIC0gY2xpZW50UmVjdC50b3ApIC8gY2xpZW50UmVjdC5oZWlnaHQpICogMiArIDE7XG4gICAgICB9XG4gICAgICAvLyBkZWZhdWx0IHRvIGZ1bGxzY3JlZW5cbiAgICAgIGVsc2Uge1xuICAgICAgICBtb3VzZS54ID0gKCBldmVudC5jbGllbnRYIC8gd2luZG93LmlubmVyV2lkdGggKSAqIDIgLSAxO1xuICAgICAgICBtb3VzZS55ID0gLSAoIGV2ZW50LmNsaWVudFkgLyB3aW5kb3cuaW5uZXJIZWlnaHQgKSAqIDIgKyAxO1xuICAgICAgfVxuXG4gICAgfSwgZmFsc2UgKTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAnbW91c2Vkb3duJywgZnVuY3Rpb24oIGV2ZW50ICl7XG4gICAgICBpZiAoaW5wdXQuaW50ZXJzZWN0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vIHByZXZlbnQgbW91c2UgZG93biBmcm9tIHRyaWdnZXJpbmcgb3RoZXIgbGlzdGVuZXJzIChwb2x5ZmlsbCwgZXRjKVxuICAgICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgaW5wdXQucHJlc3NlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSwgdHJ1ZSApO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZXVwJywgZnVuY3Rpb24oIGV2ZW50ICl7XG4gICAgICBpbnB1dC5wcmVzc2VkID0gZmFsc2U7XG4gICAgfSwgZmFsc2UgKTtcblxuXG4gICAgcmV0dXJuIGlucHV0O1xuICB9XG5cblxuXG5cblxuICAvKlxuICAgIFB1YmxpYyBmdW5jdGlvbiB1c2VycyBydW4gdG8gZ2l2ZSBEQVQgR1VJIGFuIGlucHV0IGRldmljZS5cbiAgICBBdXRvbWF0aWNhbGx5IGRldGVjdHMgZm9yIFZpdmVDb250cm9sbGVyIGFuZCBiaW5kcyBidXR0b25zICsgaGFwdGljIGZlZWRiYWNrLlxuXG4gICAgUmV0dXJucyBhIGxhc2VyIHBvaW50ZXIgc28gaXQgY2FuIGJlIGRpcmVjdGx5IGFkZGVkIHRvIHNjZW5lLlxuXG4gICAgVGhlIGxhc2VyIHdpbGwgdGhlbiBoYXZlIHR3byBtZXRob2RzOlxuICAgIGxhc2VyLnByZXNzZWQoKSwgbGFzZXIuZ3JpcHBlZCgpXG5cbiAgICBUaGVzZSBjYW4gdGhlbiBiZSBib3VuZCB0byBhbnkgYnV0dG9uIHRoZSB1c2VyIHdhbnRzLiBVc2VmdWwgZm9yIGJpbmRpbmcgdG9cbiAgICBjYXJkYm9hcmQgb3IgYWx0ZXJuYXRlIGlucHV0IGRldmljZXMuXG5cbiAgICBGb3IgZXhhbXBsZS4uLlxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNlZG93bicsIGZ1bmN0aW9uKCl7IGxhc2VyLnByZXNzZWQoIHRydWUgKTsgfSApO1xuICAqL1xuICBmdW5jdGlvbiBhZGRJbnB1dE9iamVjdCggb2JqZWN0ICl7XG4gICAgY29uc3QgaW5wdXQgPSBjcmVhdGVJbnB1dCggb2JqZWN0ICk7XG5cbiAgICBpbnB1dC5sYXNlci5wcmVzc2VkID0gZnVuY3Rpb24oIGZsYWcgKXtcbiAgICAgIC8vIG9ubHkgcGF5IGF0dGVudGlvbiB0byBwcmVzc2VzIG92ZXIgdGhlIEdVSVxuICAgICAgaWYgKGZsYWcgJiYgKGlucHV0LmludGVyc2VjdGlvbnMubGVuZ3RoID4gMCkpIHtcbiAgICAgICAgaW5wdXQucHJlc3NlZCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbnB1dC5wcmVzc2VkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlucHV0Lmxhc2VyLmdyaXBwZWQgPSBmdW5jdGlvbiggZmxhZyApe1xuICAgICAgaW5wdXQuZ3JpcHBlZCA9IGZsYWc7XG4gICAgfTtcblxuICAgIGlucHV0Lmxhc2VyLmN1cnNvciA9IGlucHV0LmN1cnNvcjtcblxuICAgIGlmKCBUSFJFRS5WaXZlQ29udHJvbGxlciAmJiBvYmplY3QgaW5zdGFuY2VvZiBUSFJFRS5WaXZlQ29udHJvbGxlciApe1xuICAgICAgYmluZFZpdmVDb250cm9sbGVyKCBpbnB1dCwgb2JqZWN0LCBpbnB1dC5sYXNlci5wcmVzc2VkLCBpbnB1dC5sYXNlci5ncmlwcGVkICk7XG4gICAgfVxuXG4gICAgaW5wdXRPYmplY3RzLnB1c2goIGlucHV0ICk7XG5cbiAgICByZXR1cm4gaW5wdXQubGFzZXI7XG4gIH1cblxuXG5cblxuICAvKlxuICAgIEhlcmUgYXJlIHRoZSBtYWluIGRhdCBndWkgY29udHJvbGxlciB0eXBlcy5cbiAgKi9cblxuICBmdW5jdGlvbiBhZGRTbGlkZXIoIG9iamVjdCwgcHJvcGVydHlOYW1lLCBtaW4gPSAwLjAsIG1heCA9IDEwMC4wICl7XG4gICAgY29uc3Qgc2xpZGVyID0gY3JlYXRlU2xpZGVyKCB7XG4gICAgICB0ZXh0Q3JlYXRvciwgcHJvcGVydHlOYW1lLCBvYmplY3QsIG1pbiwgbWF4LFxuICAgICAgaW5pdGlhbFZhbHVlOiBvYmplY3RbIHByb3BlcnR5TmFtZSBdXG4gICAgfSk7XG5cbiAgICBjb250cm9sbGVycy5wdXNoKCBzbGlkZXIgKTtcbiAgICBoaXRzY2FuT2JqZWN0cy5wdXNoKCAuLi5zbGlkZXIuaGl0c2NhbiApXG5cbiAgICByZXR1cm4gc2xpZGVyO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkQ2hlY2tib3goIG9iamVjdCwgcHJvcGVydHlOYW1lICl7XG4gICAgY29uc3QgY2hlY2tib3ggPSBjcmVhdGVDaGVja2JveCh7XG4gICAgICB0ZXh0Q3JlYXRvciwgcHJvcGVydHlOYW1lLCBvYmplY3QsXG4gICAgICBpbml0aWFsVmFsdWU6IG9iamVjdFsgcHJvcGVydHlOYW1lIF1cbiAgICB9KTtcblxuICAgIGNvbnRyb2xsZXJzLnB1c2goIGNoZWNrYm94ICk7XG4gICAgaGl0c2Nhbk9iamVjdHMucHVzaCggLi4uY2hlY2tib3guaGl0c2NhbiApXG5cbiAgICByZXR1cm4gY2hlY2tib3g7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRCdXR0b24oIG9iamVjdCwgcHJvcGVydHlOYW1lICl7XG4gICAgY29uc3QgYnV0dG9uID0gY3JlYXRlQnV0dG9uKHtcbiAgICAgIHRleHRDcmVhdG9yLCBwcm9wZXJ0eU5hbWUsIG9iamVjdFxuICAgIH0pO1xuXG4gICAgY29udHJvbGxlcnMucHVzaCggYnV0dG9uICk7XG4gICAgaGl0c2Nhbk9iamVjdHMucHVzaCggLi4uYnV0dG9uLmhpdHNjYW4gKTtcbiAgICByZXR1cm4gYnV0dG9uO1xuICB9XG4gIFxuICBmdW5jdGlvbiBhZGRJbWFnZUJ1dHRvbihvYmplY3QsIHByb3BlcnR5TmFtZSwgaW1hZ2UpIHtcbiAgICAvL3NlZSBhbHNvIGZvbGRlci5qcyB3aGVyZSB0aGlzIGlzIGFkZGVkIHRvIGdyb3VwIG9iamVjdC4uLlxuICAgIC8vYXMgc3VjaCB0aGlzIGZ1bmN0aW9uIGFsc28gbmVlZHMgdG8gYmUgcGFzc2VkIGFzIGFuIGFyZ3VtZW50IHRvIGNyZWF0ZUZvbGRlci5cbiAgICAvL3BlcmhhcHMgYWxsIG9mIHRoZXNlICdhZGRYJyBmdW5jdGlvbnMgY291bGQgYmUgaW5pdGlhbGx5IHB1dCBvbnRvIGFuIG9iamVjdCBzbyB0aGF0XG4gICAgLy9uZXcgYWRkaXRpb25zIGNvdWxkIGJlIGFkZGVkIHNsaWdodGx5IG1vcmUgZWFzaWx5LlxuICAgIGNvbnN0IGJ1dHRvbiA9IGNyZWF0ZUltYWdlQnV0dG9uKHtcbiAgICAgIHRleHRDcmVhdG9yLCBvYmplY3QsIHByb3BlcnR5TmFtZSwgaW1hZ2VcbiAgICB9KTtcbiAgICBjb250cm9sbGVycy5wdXNoKCBidXR0b24gKTtcbiAgICBoaXRzY2FuT2JqZWN0cy5wdXNoKCAuLi5idXR0b24uaGl0c2NhbiApOyAvL1BKVDogd2hhdCBkb2VzIHRoaXMgLi4uIGFjdHVhbGx5IG1lYW4/XG4gICAgcmV0dXJuIGJ1dHRvbjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZERyb3Bkb3duKCBvYmplY3QsIHByb3BlcnR5TmFtZSwgb3B0aW9ucyApe1xuICAgIGNvbnN0IGRyb3Bkb3duID0gY3JlYXRlRHJvcGRvd24oe1xuICAgICAgdGV4dENyZWF0b3IsIHByb3BlcnR5TmFtZSwgb2JqZWN0LCBvcHRpb25zXG4gICAgfSk7XG5cbiAgICBjb250cm9sbGVycy5wdXNoKCBkcm9wZG93biApO1xuICAgIGhpdHNjYW5PYmplY3RzLnB1c2goIC4uLmRyb3Bkb3duLmhpdHNjYW4gKTtcbiAgICByZXR1cm4gZHJvcGRvd247XG4gIH1cblxuXG5cblxuXG4gIC8qXG4gICAgQW4gaW1wbGljaXQgQWRkIGZ1bmN0aW9uIHdoaWNoIGRldGVjdHMgZm9yIHByb3BlcnR5IHR5cGVcbiAgICBhbmQgZ2l2ZXMgeW91IHRoZSBjb3JyZWN0IGNvbnRyb2xsZXIuXG5cbiAgICBEcm9wZG93bjpcbiAgICAgIGFkZCggb2JqZWN0LCBwcm9wZXJ0eU5hbWUsIG9iamVjdFR5cGUgKVxuXG4gICAgU2xpZGVyOlxuICAgICAgYWRkKCBvYmplY3QsIHByb3BlcnR5T2ZOdW1iZXJUeXBlLCBtaW4sIG1heCApXG5cbiAgICBDaGVja2JveDpcbiAgICAgIGFkZCggb2JqZWN0LCBwcm9wZXJ0eU9mQm9vbGVhblR5cGUgKVxuXG4gICAgQnV0dG9uOlxuICAgICAgYWRkKCBvYmplY3QsIHByb3BlcnR5T2ZGdW5jdGlvblR5cGUgKVxuXG4gICAgTm90IHVzZWQgZGlyZWN0bHkuIFVzZWQgYnkgZm9sZGVycy5cbiAgKi9cblxuICBmdW5jdGlvbiBhZGQoIG9iamVjdCwgcHJvcGVydHlOYW1lLCBhcmczLCBhcmc0ICl7XG5cbiAgICBpZiggb2JqZWN0ID09PSB1bmRlZmluZWQgKXtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGVsc2VcblxuICAgIGlmKCBvYmplY3RbIHByb3BlcnR5TmFtZSBdID09PSB1bmRlZmluZWQgKXtcbiAgICAgIC8vd2h5IG5vdCB0aHJvdyBhbiBleGNlcHRpb24/XG4gICAgICBjb25zb2xlLndhcm4oICdubyBwcm9wZXJ0eSBuYW1lZCcsIHByb3BlcnR5TmFtZSwgJ29uIG9iamVjdCcsIG9iamVjdCApO1xuICAgICAgcmV0dXJuIG5ldyBUSFJFRS5Hcm91cCgpO1xuICAgIH1cblxuICAgIGlmKCBpc09iamVjdCggYXJnMyApIHx8IGlzQXJyYXkoIGFyZzMgKSApe1xuICAgICAgcmV0dXJuIGFkZERyb3Bkb3duKCBvYmplY3QsIHByb3BlcnR5TmFtZSwgYXJnMyApO1xuICAgIH1cblxuICAgIGlmKCBpc051bWJlciggb2JqZWN0WyBwcm9wZXJ0eU5hbWVdICkgKXtcbiAgICAgIHJldHVybiBhZGRTbGlkZXIoIG9iamVjdCwgcHJvcGVydHlOYW1lLCBhcmczLCBhcmc0ICk7XG4gICAgfVxuXG4gICAgaWYoIGlzQm9vbGVhbiggb2JqZWN0WyBwcm9wZXJ0eU5hbWVdICkgKXtcbiAgICAgIHJldHVybiBhZGRDaGVja2JveCggb2JqZWN0LCBwcm9wZXJ0eU5hbWUgKTtcbiAgICB9XG5cbiAgICBpZiggaXNGdW5jdGlvbiggb2JqZWN0WyBwcm9wZXJ0eU5hbWUgXSApICl7XG4gICAgICByZXR1cm4gYWRkQnV0dG9uKCBvYmplY3QsIHByb3BlcnR5TmFtZSApO1xuICAgIH1cblxuICAgIC8vICBhZGQgY291bGRuJ3QgZmlndXJlIGl0IG91dCwgcGFzcyBpdCBiYWNrIHRvIGZvbGRlclxuICAgIHJldHVybiB1bmRlZmluZWRcbiAgfVxuXG5cbiAgZnVuY3Rpb24gYWRkU2ltcGxlU2xpZGVyKCBtaW4gPSAwLCBtYXggPSAxICl7XG4gICAgY29uc3QgcHJveHkgPSB7XG4gICAgICBudW1iZXI6IG1pblxuICAgIH07XG5cbiAgICByZXR1cm4gYWRkU2xpZGVyKCBwcm94eSwgJ251bWJlcicsIG1pbiwgbWF4ICk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRTaW1wbGVEcm9wZG93biggb3B0aW9ucyA9IFtdICl7XG4gICAgY29uc3QgcHJveHkgPSB7XG4gICAgICBvcHRpb246ICcnXG4gICAgfTtcblxuICAgIGlmKCBvcHRpb25zICE9PSB1bmRlZmluZWQgKXtcbiAgICAgIHByb3h5Lm9wdGlvbiA9IGlzQXJyYXkoIG9wdGlvbnMgKSA/IG9wdGlvbnNbIDAgXSA6IG9wdGlvbnNbIE9iamVjdC5rZXlzKG9wdGlvbnMpWzBdIF07XG4gICAgfVxuXG4gICAgcmV0dXJuIGFkZERyb3Bkb3duKCBwcm94eSwgJ29wdGlvbicsIG9wdGlvbnMgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFNpbXBsZUNoZWNrYm94KCBkZWZhdWx0T3B0aW9uID0gZmFsc2UgKXtcbiAgICBjb25zdCBwcm94eSA9IHtcbiAgICAgIGNoZWNrZWQ6IGRlZmF1bHRPcHRpb25cbiAgICB9O1xuXG4gICAgcmV0dXJuIGFkZENoZWNrYm94KCBwcm94eSwgJ2NoZWNrZWQnICk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRTaW1wbGVCdXR0b24oIGZuICl7XG4gICAgY29uc3QgcHJveHkgPSB7XG4gICAgICBidXR0b246IChmbiE9PXVuZGVmaW5lZCkgPyBmbiA6IGZ1bmN0aW9uKCl7fVxuICAgIH07XG5cbiAgICByZXR1cm4gYWRkQnV0dG9uKCBwcm94eSwgJ2J1dHRvbicgKTtcbiAgfVxuXG5cblxuICAvKlxuICAgIENyZWF0ZXMgYSBmb2xkZXIgd2l0aCB0aGUgbmFtZS5cblxuICAgIEZvbGRlcnMgYXJlIFRIUkVFLkdyb3VwIHR5cGUgb2JqZWN0cyBhbmQgY2FuIGRvIGdyb3VwLmFkZCgpIGZvciBzaWJsaW5ncy5cbiAgICBGb2xkZXJzIHdpbGwgYXV0b21hdGljYWxseSBhdHRlbXB0IHRvIGxheSBpdHMgY2hpbGRyZW4gb3V0IGluIHNlcXVlbmNlLlxuXG4gICAgRm9sZGVycyBhcmUgZ2l2ZW4gdGhlIGFkZCgpIGZ1bmN0aW9uYWxpdHkgc28gdGhhdCB0aGV5IGNhbiBkb1xuICAgIGZvbGRlci5hZGQoIC4uLiApIHRvIGNyZWF0ZSBjb250cm9sbGVycy5cbiAgKi9cblxuICBmdW5jdGlvbiBjcmVhdGUoIG5hbWUgKXtcbiAgICBjb25zdCBmb2xkZXIgPSBjcmVhdGVGb2xkZXIoe1xuICAgICAgdGV4dENyZWF0b3IsXG4gICAgICBuYW1lLFxuICAgICAgZ3VpQWRkOiBhZGQsXG4gICAgICBhZGRTbGlkZXI6IGFkZFNpbXBsZVNsaWRlcixcbiAgICAgIGFkZERyb3Bkb3duOiBhZGRTaW1wbGVEcm9wZG93bixcbiAgICAgIGFkZENoZWNrYm94OiBhZGRTaW1wbGVDaGVja2JveCxcbiAgICAgIGFkZEJ1dHRvbjogYWRkU2ltcGxlQnV0dG9uLFxuICAgICAgYWRkSW1hZ2VCdXR0b246IGFkZEltYWdlQnV0dG9uXG4gICAgfSk7XG5cbiAgICBjb250cm9sbGVycy5wdXNoKCBmb2xkZXIgKTtcbiAgICBpZiggZm9sZGVyLmhpdHNjYW4gKXtcbiAgICAgIGhpdHNjYW5PYmplY3RzLnB1c2goIC4uLmZvbGRlci5oaXRzY2FuICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZvbGRlcjtcbiAgfVxuXG5cblxuXG5cbiAgLypcbiAgICBQZXJmb3JtIHRoZSBuZWNlc3NhcnkgdXBkYXRlcywgcmF5Y2FzdHMgb24gaXRzIG93biBSQUYuXG4gICovXG5cbiAgY29uc3QgdFBvc2l0aW9uID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbiAgY29uc3QgdERpcmVjdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCAwLCAwLCAtMSApO1xuICBjb25zdCB0TWF0cml4ID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcblxuICBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCB1cGRhdGUgKTtcblxuICAgIGlmKCBtb3VzZUVuYWJsZWQgKXtcbiAgICAgIG1vdXNlSW5wdXQuaW50ZXJzZWN0aW9ucyA9IHBlcmZvcm1Nb3VzZUlucHV0KCBoaXRzY2FuT2JqZWN0cywgbW91c2VJbnB1dCApO1xuICAgIH1cblxuICAgIGlucHV0T2JqZWN0cy5mb3JFYWNoKCBmdW5jdGlvbigge2JveCxvYmplY3QscmF5Y2FzdCxsYXNlcixjdXJzb3J9ID0ge30sIGluZGV4ICl7XG4gICAgICBvYmplY3QudXBkYXRlTWF0cml4V29ybGQoKTtcblxuICAgICAgdFBvc2l0aW9uLnNldCgwLDAsMCkuc2V0RnJvbU1hdHJpeFBvc2l0aW9uKCBvYmplY3QubWF0cml4V29ybGQgKTtcbiAgICAgIHRNYXRyaXguaWRlbnRpdHkoKS5leHRyYWN0Um90YXRpb24oIG9iamVjdC5tYXRyaXhXb3JsZCApO1xuICAgICAgdERpcmVjdGlvbi5zZXQoMCwwLC0xKS5hcHBseU1hdHJpeDQoIHRNYXRyaXggKS5ub3JtYWxpemUoKTtcblxuICAgICAgcmF5Y2FzdC5zZXQoIHRQb3NpdGlvbiwgdERpcmVjdGlvbiApO1xuXG4gICAgICBsYXNlci5nZW9tZXRyeS52ZXJ0aWNlc1sgMCBdLmNvcHkoIHRQb3NpdGlvbiApO1xuXG4gICAgICAvLyAgZGVidWcuLi5cbiAgICAgIC8vIGxhc2VyLmdlb21ldHJ5LnZlcnRpY2VzWyAxIF0uY29weSggdFBvc2l0aW9uICkuYWRkKCB0RGlyZWN0aW9uLm11bHRpcGx5U2NhbGFyKCAxICkgKTtcblxuICAgICAgY29uc3QgaW50ZXJzZWN0aW9ucyA9IHJheWNhc3QuaW50ZXJzZWN0T2JqZWN0cyggaGl0c2Nhbk9iamVjdHMsIGZhbHNlICk7XG4gICAgICBwYXJzZUludGVyc2VjdGlvbnMoIGludGVyc2VjdGlvbnMsIGxhc2VyLCBjdXJzb3IgKTtcblxuICAgICAgaW5wdXRPYmplY3RzWyBpbmRleCBdLmludGVyc2VjdGlvbnMgPSBpbnRlcnNlY3Rpb25zO1xuICAgIH0pO1xuXG4gICAgY29uc3QgaW5wdXRzID0gaW5wdXRPYmplY3RzLnNsaWNlKCk7XG5cbiAgICBpZiggbW91c2VFbmFibGVkICl7XG4gICAgICBpbnB1dHMucHVzaCggbW91c2VJbnB1dCApO1xuICAgIH1cblxuICAgIGNvbnRyb2xsZXJzLmZvckVhY2goIGZ1bmN0aW9uKCBjb250cm9sbGVyICl7XG4gICAgICBjb250cm9sbGVyLnVwZGF0ZSggaW5wdXRzICk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVMYXNlciggbGFzZXIsIHBvaW50ICl7XG4gICAgbGFzZXIuZ2VvbWV0cnkudmVydGljZXNbIDEgXS5jb3B5KCBwb2ludCApO1xuICAgIGxhc2VyLnZpc2libGUgPSB0cnVlO1xuICAgIGxhc2VyLmdlb21ldHJ5LmNvbXB1dGVCb3VuZGluZ1NwaGVyZSgpO1xuICAgIGxhc2VyLmdlb21ldHJ5LmNvbXB1dGVCb3VuZGluZ0JveCgpO1xuICAgIGxhc2VyLmdlb21ldHJ5LnZlcnRpY2VzTmVlZFVwZGF0ZSA9IHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZUludGVyc2VjdGlvbnMoIGludGVyc2VjdGlvbnMsIGxhc2VyLCBjdXJzb3IgKXtcbiAgICBpZiggaW50ZXJzZWN0aW9ucy5sZW5ndGggPiAwICl7XG4gICAgICBjb25zdCBmaXJzdEhpdCA9IGludGVyc2VjdGlvbnNbIDAgXTtcbiAgICAgIHVwZGF0ZUxhc2VyKCBsYXNlciwgZmlyc3RIaXQucG9pbnQgKTtcbiAgICAgIGN1cnNvci5wb3NpdGlvbi5jb3B5KCBmaXJzdEhpdC5wb2ludCApO1xuICAgICAgY3Vyc29yLnZpc2libGUgPSB0cnVlO1xuICAgICAgY3Vyc29yLnVwZGF0ZU1hdHJpeFdvcmxkKCk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICBsYXNlci52aXNpYmxlID0gZmFsc2U7XG4gICAgICBjdXJzb3IudmlzaWJsZSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlTW91c2VJbnRlcnNlY3Rpb24oIGludGVyc2VjdGlvbiwgbGFzZXIsIGN1cnNvciApe1xuICAgIGN1cnNvci5wb3NpdGlvbi5jb3B5KCBpbnRlcnNlY3Rpb24gKTtcbiAgICB1cGRhdGVMYXNlciggbGFzZXIsIGN1cnNvci5wb3NpdGlvbiApO1xuICB9XG5cbiAgZnVuY3Rpb24gcGVyZm9ybU1vdXNlSW50ZXJzZWN0aW9uKCByYXljYXN0LCBtb3VzZSwgY2FtZXJhICl7XG4gICAgcmF5Y2FzdC5zZXRGcm9tQ2FtZXJhKCBtb3VzZSwgY2FtZXJhICk7XG4gICAgcmV0dXJuIHJheWNhc3QuaW50ZXJzZWN0T2JqZWN0cyggaGl0c2Nhbk9iamVjdHMsIGZhbHNlICk7XG4gIH1cblxuICBmdW5jdGlvbiBtb3VzZUludGVyc2VjdHNQbGFuZSggcmF5Y2FzdCwgdiwgcGxhbmUgKXtcbiAgICByZXR1cm4gcmF5Y2FzdC5yYXkuaW50ZXJzZWN0UGxhbmUoIHBsYW5lLCB2ICk7XG4gIH1cblxuICBmdW5jdGlvbiBwZXJmb3JtTW91c2VJbnB1dCggaGl0c2Nhbk9iamVjdHMsIHtib3gsb2JqZWN0LHJheWNhc3QsbGFzZXIsY3Vyc29yLG1vdXNlLG1vdXNlQ2FtZXJhfSA9IHt9ICl7XG4gICAgbGV0IGludGVyc2VjdGlvbnMgPSBbXTtcblxuICAgIGlmIChtb3VzZUNhbWVyYSkge1xuICAgICAgaW50ZXJzZWN0aW9ucyA9IHBlcmZvcm1Nb3VzZUludGVyc2VjdGlvbiggcmF5Y2FzdCwgbW91c2UsIG1vdXNlQ2FtZXJhICk7XG4gICAgICBwYXJzZUludGVyc2VjdGlvbnMoIGludGVyc2VjdGlvbnMsIGxhc2VyLCBjdXJzb3IgKTtcbiAgICAgIGN1cnNvci52aXNpYmxlID0gdHJ1ZTtcbiAgICAgIGxhc2VyLnZpc2libGUgPSB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBpbnRlcnNlY3Rpb25zO1xuICB9XG5cbiAgdXBkYXRlKCk7XG5cblxuXG5cblxuICAvKlxuICAgIFB1YmxpYyBtZXRob2RzLlxuICAqL1xuXG4gIHJldHVybiB7XG4gICAgY3JlYXRlLFxuICAgIGFkZElucHV0T2JqZWN0LFxuICAgIGVuYWJsZU1vdXNlLFxuICAgIGRpc2FibGVNb3VzZVxuICB9O1xuXG59KCkpO1xuXG5pZiggd2luZG93ICl7XG4gIGlmKCB3aW5kb3cuZGF0ID09PSB1bmRlZmluZWQgKXtcbiAgICB3aW5kb3cuZGF0ID0ge307XG4gIH1cblxuICB3aW5kb3cuZGF0LkdVSVZSID0gR1VJVlI7XG59XG5cbmlmKCBtb2R1bGUgKXtcbiAgbW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZGF0OiBHVUlWUlxuICB9O1xufVxuXG5pZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgZGVmaW5lKFtdLCBHVUlWUik7XG59XG5cbi8qXG4gIEJ1bmNoIG9mIHN0YXRlLWxlc3MgdXRpbGl0eSBmdW5jdGlvbnMuXG4qL1xuXG5mdW5jdGlvbiBpc051bWJlcihuKSB7XG4gIHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdChuKSkgJiYgaXNGaW5pdGUobik7XG59XG5cbmZ1bmN0aW9uIGlzQm9vbGVhbihuKXtcbiAgcmV0dXJuIHR5cGVvZiBuID09PSAnYm9vbGVhbic7XG59XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oZnVuY3Rpb25Ub0NoZWNrKSB7XG4gIGNvbnN0IGdldFR5cGUgPSB7fTtcbiAgcmV0dXJuIGZ1bmN0aW9uVG9DaGVjayAmJiBnZXRUeXBlLnRvU3RyaW5nLmNhbGwoZnVuY3Rpb25Ub0NoZWNrKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn1cblxuLy8gIG9ubHkge30gb2JqZWN0cyBub3QgYXJyYXlzXG4vLyAgICAgICAgICAgICAgICAgICAgd2hpY2ggYXJlIHRlY2huaWNhbGx5IG9iamVjdHMgYnV0IHlvdSdyZSBqdXN0IGJlaW5nIHBlZGFudGljXG5mdW5jdGlvbiBpc09iamVjdCAoaXRlbSkge1xuICByZXR1cm4gKHR5cGVvZiBpdGVtID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheShpdGVtKSAmJiBpdGVtICE9PSBudWxsKTtcbn1cblxuZnVuY3Rpb24gaXNBcnJheSggbyApe1xuICByZXR1cm4gQXJyYXkuaXNBcnJheSggbyApO1xufVxuXG5cblxuXG5cblxuXG4vKlxuICBDb250cm9sbGVyLXNwZWNpZmljIHN1cHBvcnQuXG4qL1xuXG5mdW5jdGlvbiBiaW5kVml2ZUNvbnRyb2xsZXIoIGlucHV0LCBjb250cm9sbGVyLCBwcmVzc2VkLCBncmlwcGVkICl7XG4gIGNvbnRyb2xsZXIuYWRkRXZlbnRMaXN0ZW5lciggJ3RyaWdnZXJkb3duJywgKCk9PnByZXNzZWQoIHRydWUgKSApO1xuICBjb250cm9sbGVyLmFkZEV2ZW50TGlzdGVuZXIoICd0cmlnZ2VydXAnLCAoKT0+cHJlc3NlZCggZmFsc2UgKSApO1xuICBjb250cm9sbGVyLmFkZEV2ZW50TGlzdGVuZXIoICdncmlwc2Rvd24nLCAoKT0+Z3JpcHBlZCggdHJ1ZSApICk7XG4gIGNvbnRyb2xsZXIuYWRkRXZlbnRMaXN0ZW5lciggJ2dyaXBzdXAnLCAoKT0+Z3JpcHBlZCggZmFsc2UgKSApO1xuXG4gIGNvbnN0IGdhbWVwYWQgPSBjb250cm9sbGVyLmdldEdhbWVwYWQoKTtcbiAgZnVuY3Rpb24gdmlicmF0ZSggdCwgYSApe1xuICAgIGlmKCBnYW1lcGFkICYmIGdhbWVwYWQuaGFwdGljQWN0dWF0b3JzLmxlbmd0aCA+IDAgKXtcbiAgICAgIGdhbWVwYWQuaGFwdGljQWN0dWF0b3JzWyAwIF0ucHVsc2UoIHQsIGEgKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBoYXB0aWNzVGFwKCl7XG4gICAgc2V0SW50ZXJ2YWxUaW1lcyggKHgsdCxhKT0+dmlicmF0ZSgxLWEsIDAuNSksIDEwLCAyMCApO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFwdGljc0VjaG8oKXtcbiAgICBzZXRJbnRlcnZhbFRpbWVzKCAoeCx0LGEpPT52aWJyYXRlKDQsIDEuMCAqICgxLWEpKSwgMTAwLCA0ICk7XG4gIH1cblxuICBpbnB1dC5ldmVudHMub24oICdvbkNvbnRyb2xsZXJIZWxkJywgZnVuY3Rpb24oIGlucHV0ICl7XG4gICAgdmlicmF0ZSggMC4zLCAwLjMgKTtcbiAgfSk7XG5cbiAgaW5wdXQuZXZlbnRzLm9uKCAnZ3JhYmJlZCcsIGZ1bmN0aW9uKCl7XG4gICAgaGFwdGljc1RhcCgpO1xuICB9KTtcblxuICBpbnB1dC5ldmVudHMub24oICdncmFiUmVsZWFzZWQnLCBmdW5jdGlvbigpe1xuICAgIGhhcHRpY3NFY2hvKCk7XG4gIH0pO1xuXG4gIGlucHV0LmV2ZW50cy5vbiggJ3Bpbm5lZCcsIGZ1bmN0aW9uKCl7XG4gICAgaGFwdGljc1RhcCgpO1xuICB9KTtcblxuICBpbnB1dC5ldmVudHMub24oICdwaW5SZWxlYXNlZCcsIGZ1bmN0aW9uKCl7XG4gICAgaGFwdGljc0VjaG8oKTtcbiAgfSk7XG5cblxuXG59XG5cbmZ1bmN0aW9uIHNldEludGVydmFsVGltZXMoIGNiLCBkZWxheSwgdGltZXMgKXtcbiAgbGV0IHggPSAwO1xuICBsZXQgaWQgPSBzZXRJbnRlcnZhbCggZnVuY3Rpb24oKXtcbiAgICBjYiggeCwgdGltZXMsIHgvdGltZXMgKTtcbiAgICB4Kys7XG4gICAgaWYoIHg+PXRpbWVzICl7XG4gICAgICBjbGVhckludGVydmFsKCBpZCApO1xuICAgIH1cbiAgfSwgZGVsYXkgKTtcbiAgcmV0dXJuIGlkO1xufVxuIiwiLyoqXG4qIGRhdC1ndWlWUiBKYXZhc2NyaXB0IENvbnRyb2xsZXIgTGlicmFyeSBmb3IgVlJcbiogaHR0cHM6Ly9naXRodWIuY29tL2RhdGFhcnRzL2RhdC5ndWlWUlxuKlxuKiBDb3B5cmlnaHQgMjAxNiBEYXRhIEFydHMgVGVhbSwgR29vZ2xlIEluYy5cbipcbiogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbipcbiogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuKlxuKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4qIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4qIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuaW1wb3J0IEVtaXR0ZXIgZnJvbSAnZXZlbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlSW50ZXJhY3Rpb24oIGhpdFZvbHVtZSApe1xuICBjb25zdCBldmVudHMgPSBuZXcgRW1pdHRlcigpO1xuXG4gIGxldCBhbnlIb3ZlciA9IGZhbHNlO1xuICBsZXQgYW55UHJlc3NpbmcgPSBmYWxzZTtcblxuICBsZXQgaG92ZXIgPSBmYWxzZTtcbiAgbGV0IGFueUFjdGl2ZSA9IGZhbHNlO1xuXG4gIGNvbnN0IHRWZWN0b3IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICBjb25zdCBhdmFpbGFibGVJbnB1dHMgPSBbXTtcblxuICBmdW5jdGlvbiB1cGRhdGUoIGlucHV0T2JqZWN0cyApe1xuXG4gICAgaG92ZXIgPSBmYWxzZTtcbiAgICBhbnlQcmVzc2luZyA9IGZhbHNlO1xuICAgIGFueUFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgaW5wdXRPYmplY3RzLmZvckVhY2goIGZ1bmN0aW9uKCBpbnB1dCApe1xuXG4gICAgICBpZiggYXZhaWxhYmxlSW5wdXRzLmluZGV4T2YoIGlucHV0ICkgPCAwICl7XG4gICAgICAgIGF2YWlsYWJsZUlucHV0cy5wdXNoKCBpbnB1dCApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB7IGhpdE9iamVjdCwgaGl0UG9pbnQgfSA9IGV4dHJhY3RIaXQoIGlucHV0ICk7XG5cbiAgICAgIGhvdmVyID0gaG92ZXIgfHwgaGl0Vm9sdW1lID09PSBoaXRPYmplY3Q7XG5cbiAgICAgIHBlcmZvcm1TdGF0ZUV2ZW50cyh7XG4gICAgICAgIGlucHV0LFxuICAgICAgICBob3ZlcixcbiAgICAgICAgaGl0T2JqZWN0LCBoaXRQb2ludCxcbiAgICAgICAgYnV0dG9uTmFtZTogJ3ByZXNzZWQnLFxuICAgICAgICBpbnRlcmFjdGlvbk5hbWU6ICdwcmVzcycsXG4gICAgICAgIGRvd25OYW1lOiAnb25QcmVzc2VkJyxcbiAgICAgICAgaG9sZE5hbWU6ICdwcmVzc2luZycsXG4gICAgICAgIHVwTmFtZTogJ29uUmVsZWFzZWQnXG4gICAgICB9KTtcblxuICAgICAgcGVyZm9ybVN0YXRlRXZlbnRzKHtcbiAgICAgICAgaW5wdXQsXG4gICAgICAgIGhvdmVyLFxuICAgICAgICBoaXRPYmplY3QsIGhpdFBvaW50LFxuICAgICAgICBidXR0b25OYW1lOiAnZ3JpcHBlZCcsXG4gICAgICAgIGludGVyYWN0aW9uTmFtZTogJ2dyaXAnLFxuICAgICAgICBkb3duTmFtZTogJ29uR3JpcHBlZCcsXG4gICAgICAgIGhvbGROYW1lOiAnZ3JpcHBpbmcnLFxuICAgICAgICB1cE5hbWU6ICdvblJlbGVhc2VHcmlwJ1xuICAgICAgfSk7XG5cbiAgICAgIGV2ZW50cy5lbWl0KCAndGljaycsIHtcbiAgICAgICAgaW5wdXQsXG4gICAgICAgIGhpdE9iamVjdCxcbiAgICAgICAgaW5wdXRPYmplY3Q6IGlucHV0Lm9iamVjdFxuICAgICAgfSApO1xuXG4gICAgfSk7XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGV4dHJhY3RIaXQoIGlucHV0ICl7XG4gICAgaWYoIGlucHV0LmludGVyc2VjdGlvbnMubGVuZ3RoIDw9IDAgKXtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGhpdFBvaW50OiB0VmVjdG9yLnNldEZyb21NYXRyaXhQb3NpdGlvbiggaW5wdXQuY3Vyc29yLm1hdHJpeFdvcmxkICkuY2xvbmUoKSxcbiAgICAgICAgaGl0T2JqZWN0OiB1bmRlZmluZWQsXG4gICAgICB9O1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaGl0UG9pbnQ6IGlucHV0LmludGVyc2VjdGlvbnNbIDAgXS5wb2ludCxcbiAgICAgICAgaGl0T2JqZWN0OiBpbnB1dC5pbnRlcnNlY3Rpb25zWyAwIF0ub2JqZWN0XG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBlcmZvcm1TdGF0ZUV2ZW50cyh7XG4gICAgaW5wdXQsIGhvdmVyLFxuICAgIGhpdE9iamVjdCwgaGl0UG9pbnQsXG4gICAgYnV0dG9uTmFtZSwgaW50ZXJhY3Rpb25OYW1lLCBkb3duTmFtZSwgaG9sZE5hbWUsIHVwTmFtZVxuICB9ID0ge30gKXtcblxuICAgIGlmKCBpbnB1dFsgYnV0dG9uTmFtZSBdID09PSB0cnVlICYmIGhpdE9iamVjdCA9PT0gdW5kZWZpbmVkICl7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gIGhvdmVyaW5nIGFuZCBidXR0b24gZG93biBidXQgbm8gaW50ZXJhY3Rpb25zIGFjdGl2ZSB5ZXRcbiAgICBpZiggaG92ZXIgJiYgaW5wdXRbIGJ1dHRvbk5hbWUgXSA9PT0gdHJ1ZSAmJiBpbnB1dC5pbnRlcmFjdGlvblsgaW50ZXJhY3Rpb25OYW1lIF0gPT09IHVuZGVmaW5lZCApe1xuXG4gICAgICBjb25zdCBwYXlsb2FkID0ge1xuICAgICAgICBpbnB1dCxcbiAgICAgICAgaGl0T2JqZWN0LFxuICAgICAgICBwb2ludDogaGl0UG9pbnQsXG4gICAgICAgIGlucHV0T2JqZWN0OiBpbnB1dC5vYmplY3QsXG4gICAgICAgIGxvY2tlZDogZmFsc2VcbiAgICAgIH07XG4gICAgICBldmVudHMuZW1pdCggZG93bk5hbWUsIHBheWxvYWQgKTtcblxuICAgICAgaWYoIHBheWxvYWQubG9ja2VkICl7XG4gICAgICAgIGlucHV0LmludGVyYWN0aW9uWyBpbnRlcmFjdGlvbk5hbWUgXSA9IGludGVyYWN0aW9uO1xuICAgICAgICBpbnB1dC5pbnRlcmFjdGlvbi5ob3ZlciA9IGludGVyYWN0aW9uO1xuICAgICAgfVxuXG4gICAgICBhbnlQcmVzc2luZyA9IHRydWU7XG4gICAgICBhbnlBY3RpdmUgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vICBidXR0b24gc3RpbGwgZG93biBhbmQgdGhpcyBpcyB0aGUgYWN0aXZlIGludGVyYWN0aW9uXG4gICAgaWYoIGlucHV0WyBidXR0b25OYW1lIF0gJiYgaW5wdXQuaW50ZXJhY3Rpb25bIGludGVyYWN0aW9uTmFtZSBdID09PSBpbnRlcmFjdGlvbiApe1xuICAgICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgICAgaW5wdXQsXG4gICAgICAgIGhpdE9iamVjdCxcbiAgICAgICAgcG9pbnQ6IGhpdFBvaW50LFxuICAgICAgICBpbnB1dE9iamVjdDogaW5wdXQub2JqZWN0LFxuICAgICAgICBsb2NrZWQ6IGZhbHNlXG4gICAgICB9O1xuXG4gICAgICBldmVudHMuZW1pdCggaG9sZE5hbWUsIHBheWxvYWQgKTtcblxuICAgICAgYW55UHJlc3NpbmcgPSB0cnVlO1xuXG4gICAgICBpbnB1dC5ldmVudHMuZW1pdCggJ29uQ29udHJvbGxlckhlbGQnICk7XG4gICAgfVxuXG4gICAgLy8gIGJ1dHRvbiBub3QgZG93biBhbmQgdGhpcyBpcyB0aGUgYWN0aXZlIGludGVyYWN0aW9uXG4gICAgaWYoIGlucHV0WyBidXR0b25OYW1lIF0gPT09IGZhbHNlICYmIGlucHV0LmludGVyYWN0aW9uWyBpbnRlcmFjdGlvbk5hbWUgXSA9PT0gaW50ZXJhY3Rpb24gKXtcbiAgICAgIGlucHV0LmludGVyYWN0aW9uWyBpbnRlcmFjdGlvbk5hbWUgXSA9IHVuZGVmaW5lZDtcbiAgICAgIGlucHV0LmludGVyYWN0aW9uLmhvdmVyID0gdW5kZWZpbmVkO1xuICAgICAgZXZlbnRzLmVtaXQoIHVwTmFtZSwge1xuICAgICAgICBpbnB1dCxcbiAgICAgICAgaGl0T2JqZWN0LFxuICAgICAgICBwb2ludDogaGl0UG9pbnQsXG4gICAgICAgIGlucHV0T2JqZWN0OiBpbnB1dC5vYmplY3RcbiAgICAgIH0pO1xuICAgIH1cblxuICB9XG5cbiAgZnVuY3Rpb24gaXNNYWluSG92ZXIoKXtcblxuICAgIGxldCBub01haW5Ib3ZlciA9IHRydWU7XG4gICAgZm9yKCBsZXQgaT0wOyBpPGF2YWlsYWJsZUlucHV0cy5sZW5ndGg7IGkrKyApe1xuICAgICAgaWYoIGF2YWlsYWJsZUlucHV0c1sgaSBdLmludGVyYWN0aW9uLmhvdmVyICE9PSB1bmRlZmluZWQgKXtcbiAgICAgICAgbm9NYWluSG92ZXIgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYoIG5vTWFpbkhvdmVyICl7XG4gICAgICByZXR1cm4gaG92ZXI7XG4gICAgfVxuXG4gICAgaWYoIGF2YWlsYWJsZUlucHV0cy5maWx0ZXIoIGZ1bmN0aW9uKCBpbnB1dCApe1xuICAgICAgcmV0dXJuIGlucHV0LmludGVyYWN0aW9uLmhvdmVyID09PSBpbnRlcmFjdGlvbjtcbiAgICB9KS5sZW5ndGggPiAwICl7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuXG4gIGNvbnN0IGludGVyYWN0aW9uID0ge1xuICAgIGhvdmVyaW5nOiBpc01haW5Ib3ZlcixcbiAgICBwcmVzc2luZzogKCk9PmFueVByZXNzaW5nLFxuICAgIHVwZGF0ZSxcbiAgICBldmVudHNcbiAgfTtcblxuICByZXR1cm4gaW50ZXJhY3Rpb247XG59IiwiLyoqXG4qIGRhdC1ndWlWUiBKYXZhc2NyaXB0IENvbnRyb2xsZXIgTGlicmFyeSBmb3IgVlJcbiogaHR0cHM6Ly9naXRodWIuY29tL2RhdGFhcnRzL2RhdC5ndWlWUlxuKlxuKiBDb3B5cmlnaHQgMjAxNiBEYXRhIEFydHMgVGVhbSwgR29vZ2xlIEluYy5cbipcbiogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbipcbiogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuKlxuKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4qIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4qIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgKiBhcyBTaGFyZWRNYXRlcmlhbHMgZnJvbSAnLi9zaGFyZWRtYXRlcmlhbHMnO1xuaW1wb3J0ICogYXMgQ29sb3JzIGZyb20gJy4vY29sb3JzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGFsaWduTGVmdCggb2JqICl7XG4gIGlmKCBvYmogaW5zdGFuY2VvZiBUSFJFRS5NZXNoICl7XG4gICAgb2JqLmdlb21ldHJ5LmNvbXB1dGVCb3VuZGluZ0JveCgpO1xuICAgIGNvbnN0IHdpZHRoID0gb2JqLmdlb21ldHJ5LmJvdW5kaW5nQm94Lm1heC54IC0gb2JqLmdlb21ldHJ5LmJvdW5kaW5nQm94Lm1heC55O1xuICAgIG9iai5nZW9tZXRyeS50cmFuc2xhdGUoIHdpZHRoLCAwLCAwICk7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuICBlbHNlIGlmKCBvYmogaW5zdGFuY2VvZiBUSFJFRS5HZW9tZXRyeSApe1xuICAgIG9iai5jb21wdXRlQm91bmRpbmdCb3goKTtcbiAgICBjb25zdCB3aWR0aCA9IG9iai5ib3VuZGluZ0JveC5tYXgueCAtIG9iai5ib3VuZGluZ0JveC5tYXgueTtcbiAgICBvYmoudHJhbnNsYXRlKCB3aWR0aCwgMCwgMCApO1xuICAgIHJldHVybiBvYmo7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBhbmVsKCB3aWR0aCwgaGVpZ2h0LCBkZXB0aCwgdW5pcXVlTWF0ZXJpYWwgKXtcbiAgY29uc3QgbWF0ZXJpYWwgPSB1bmlxdWVNYXRlcmlhbCA/IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7Y29sb3I6MHhmZmZmZmZ9KSA6IFNoYXJlZE1hdGVyaWFscy5QQU5FTDtcbiAgY29uc3QgcGFuZWwgPSBuZXcgVEhSRUUuTWVzaCggbmV3IFRIUkVFLkJveEdlb21ldHJ5KCB3aWR0aCwgaGVpZ2h0LCBkZXB0aCApLCBtYXRlcmlhbCApO1xuICBwYW5lbC5nZW9tZXRyeS50cmFuc2xhdGUoIHdpZHRoICogMC41LCAwLCAwICk7XG5cbiAgaWYoIHVuaXF1ZU1hdGVyaWFsICl7XG4gICAgbWF0ZXJpYWwuY29sb3Iuc2V0SGV4KCBDb2xvcnMuREVGQVVMVF9CQUNLICk7XG4gIH1cbiAgZWxzZXtcbiAgICBDb2xvcnMuY29sb3JpemVHZW9tZXRyeSggcGFuZWwuZ2VvbWV0cnksIENvbG9ycy5ERUZBVUxUX0JBQ0sgKTtcbiAgfVxuXG4gIHJldHVybiBwYW5lbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNvbnRyb2xsZXJJREJveCggaGVpZ2h0LCBjb2xvciApe1xuICBjb25zdCBwYW5lbCA9IG5ldyBUSFJFRS5NZXNoKCBuZXcgVEhSRUUuQm94R2VvbWV0cnkoIENPTlRST0xMRVJfSURfV0lEVEgsIGhlaWdodCwgQ09OVFJPTExFUl9JRF9ERVBUSCApLCBTaGFyZWRNYXRlcmlhbHMuUEFORUwgKTtcbiAgcGFuZWwuZ2VvbWV0cnkudHJhbnNsYXRlKCBDT05UUk9MTEVSX0lEX1dJRFRIICogMC41LCAwLCAwICk7XG4gIENvbG9ycy5jb2xvcml6ZUdlb21ldHJ5KCBwYW5lbC5nZW9tZXRyeSwgY29sb3IgKTtcbiAgcmV0dXJuIHBhbmVsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRG93bkFycm93KCl7XG4gIGNvbnN0IHcgPSAwLjAwOTY7XG4gIGNvbnN0IGggPSAwLjAxNjtcbiAgY29uc3Qgc2ggPSBuZXcgVEhSRUUuU2hhcGUoKTtcbiAgc2gubW92ZVRvKDAsMCk7XG4gIHNoLmxpbmVUbygtdyxoKTtcbiAgc2gubGluZVRvKHcsaCk7XG4gIHNoLmxpbmVUbygwLDApO1xuXG4gIGNvbnN0IGdlbyA9IG5ldyBUSFJFRS5TaGFwZUdlb21ldHJ5KCBzaCApO1xuICBnZW8udHJhbnNsYXRlKCAwLCAtaCAqIDAuNSwgMCApO1xuXG4gIHJldHVybiBuZXcgVEhSRUUuTWVzaCggZ2VvLCBTaGFyZWRNYXRlcmlhbHMuUEFORUwgKTtcbn1cblxuZXhwb3J0IGNvbnN0IFBBTkVMX1dJRFRIID0gMS4wO1xuZXhwb3J0IGNvbnN0IFBBTkVMX0hFSUdIVCA9IDAuMDg7XG5leHBvcnQgY29uc3QgQUxUX0hFSUdIVCA9IDAuMDg7IC8vcGp0IGV4cGVyaW1lbnRpbmcgd2l0aCBub24tdW5pZm9ybSBlbGVtZW50IGhlaWdodHMuXG5leHBvcnQgY29uc3QgUEFORUxfREVQVEggPSAwLjAxO1xuZXhwb3J0IGNvbnN0IFBBTkVMX1NQQUNJTkcgPSAwLjAwMTtcbmV4cG9ydCBjb25zdCBQQU5FTF9NQVJHSU4gPSAwLjAxNTtcbmV4cG9ydCBjb25zdCBQQU5FTF9MQUJFTF9URVhUX01BUkdJTiA9IDAuMDY7XG5leHBvcnQgY29uc3QgUEFORUxfVkFMVUVfVEVYVF9NQVJHSU4gPSAwLjAyO1xuZXhwb3J0IGNvbnN0IENPTlRST0xMRVJfSURfV0lEVEggPSAwLjAyO1xuZXhwb3J0IGNvbnN0IENPTlRST0xMRVJfSURfREVQVEggPSAwLjAwMTtcbmV4cG9ydCBjb25zdCBCVVRUT05fREVQVEggPSAwLjAxO1xuZXhwb3J0IGNvbnN0IEZPTERFUl9XSURUSCA9IDEuMDI2O1xuZXhwb3J0IGNvbnN0IEZPTERFUl9IRUlHSFQgPSAwLjA4O1xuZXhwb3J0IGNvbnN0IEZPTERFUl9HUkFCX0hFSUdIVCA9IDAuMDUxMjtcbmV4cG9ydCBjb25zdCBCT1JERVJfVEhJQ0tORVNTID0gMC4wMTtcbmV4cG9ydCBjb25zdCBDSEVDS0JPWF9TSVpFID0gMC4wNTsiLCIvKipcbiogZGF0LWd1aVZSIEphdmFzY3JpcHQgQ29udHJvbGxlciBMaWJyYXJ5IGZvciBWUlxuKiBodHRwczovL2dpdGh1Yi5jb20vZGF0YWFydHMvZGF0Lmd1aVZSXG4qXG4qIENvcHlyaWdodCAyMDE2IERhdGEgQXJ0cyBUZWFtLCBHb29nbGUgSW5jLlxuKlxuKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4qIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuKlxuKiAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4qXG4qIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCBjcmVhdGVJbnRlcmFjdGlvbiBmcm9tICcuL2ludGVyYWN0aW9uJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZSggeyBncm91cCwgcGFuZWwgfSA9IHt9ICl7XG5cbiAgY29uc3QgaW50ZXJhY3Rpb24gPSBjcmVhdGVJbnRlcmFjdGlvbiggcGFuZWwgKTtcblxuICBpbnRlcmFjdGlvbi5ldmVudHMub24oICdvbkdyaXBwZWQnLCBoYW5kbGVPbkdyaXAgKTtcbiAgaW50ZXJhY3Rpb24uZXZlbnRzLm9uKCAnb25SZWxlYXNlR3JpcCcsIGhhbmRsZU9uR3JpcFJlbGVhc2UgKTtcblxuICBsZXQgb2xkUGFyZW50O1xuICBsZXQgb2xkUG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICBsZXQgb2xkUm90YXRpb24gPSBuZXcgVEhSRUUuRXVsZXIoKTtcblxuICBjb25zdCByb3RhdGlvbkdyb3VwID0gbmV3IFRIUkVFLkdyb3VwKCk7XG4gIHJvdGF0aW9uR3JvdXAuc2NhbGUuc2V0KCAwLjMsIDAuMywgMC4zICk7XG4gIHJvdGF0aW9uR3JvdXAucG9zaXRpb24uc2V0KCAtMC4wMTUsIDAuMDE1LCAwLjAgKTtcblxuXG4gIGZ1bmN0aW9uIGhhbmRsZU9uR3JpcCggcCApe1xuXG4gICAgY29uc3QgeyBpbnB1dE9iamVjdCwgaW5wdXQgfSA9IHA7XG5cbiAgICBjb25zdCBmb2xkZXIgPSBncm91cC5mb2xkZXI7XG4gICAgaWYoIGZvbGRlciA9PT0gdW5kZWZpbmVkICl7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYoIGZvbGRlci5iZWluZ01vdmVkID09PSB0cnVlICl7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgb2xkUG9zaXRpb24uY29weSggZm9sZGVyLnBvc2l0aW9uICk7XG4gICAgb2xkUm90YXRpb24uY29weSggZm9sZGVyLnJvdGF0aW9uICk7XG5cbiAgICBmb2xkZXIucG9zaXRpb24uc2V0KCAwLDAsMCApO1xuICAgIGZvbGRlci5yb3RhdGlvbi5zZXQoIDAsMCwwICk7XG4gICAgZm9sZGVyLnJvdGF0aW9uLnggPSAtTWF0aC5QSSAqIDAuNTtcblxuICAgIG9sZFBhcmVudCA9IGZvbGRlci5wYXJlbnQ7XG5cbiAgICByb3RhdGlvbkdyb3VwLmFkZCggZm9sZGVyICk7XG5cbiAgICBpbnB1dE9iamVjdC5hZGQoIHJvdGF0aW9uR3JvdXAgKTtcblxuICAgIHAubG9ja2VkID0gdHJ1ZTtcblxuICAgIGZvbGRlci5iZWluZ01vdmVkID0gdHJ1ZTtcblxuICAgIGlucHV0LmV2ZW50cy5lbWl0KCAncGlubmVkJywgaW5wdXQgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZU9uR3JpcFJlbGVhc2UoIHsgaW5wdXRPYmplY3QsIGlucHV0IH09e30gKXtcblxuICAgIGNvbnN0IGZvbGRlciA9IGdyb3VwLmZvbGRlcjtcbiAgICBpZiggZm9sZGVyID09PSB1bmRlZmluZWQgKXtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiggb2xkUGFyZW50ID09PSB1bmRlZmluZWQgKXtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiggZm9sZGVyLmJlaW5nTW92ZWQgPT09IGZhbHNlICl7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgb2xkUGFyZW50LmFkZCggZm9sZGVyICk7XG4gICAgb2xkUGFyZW50ID0gdW5kZWZpbmVkO1xuXG4gICAgZm9sZGVyLnBvc2l0aW9uLmNvcHkoIG9sZFBvc2l0aW9uICk7XG4gICAgZm9sZGVyLnJvdGF0aW9uLmNvcHkoIG9sZFJvdGF0aW9uICk7XG5cbiAgICBmb2xkZXIuYmVpbmdNb3ZlZCA9IGZhbHNlO1xuXG4gICAgaW5wdXQuZXZlbnRzLmVtaXQoICdwaW5SZWxlYXNlZCcsIGlucHV0ICk7XG4gIH1cblxuICByZXR1cm4gaW50ZXJhY3Rpb247XG59IiwiLyoqXG4qIGRhdC1ndWlWUiBKYXZhc2NyaXB0IENvbnRyb2xsZXIgTGlicmFyeSBmb3IgVlJcbiogaHR0cHM6Ly9naXRodWIuY29tL2RhdGFhcnRzL2RhdC5ndWlWUlxuKlxuKiBDb3B5cmlnaHQgMjAxNiBEYXRhIEFydHMgVGVhbSwgR29vZ2xlIEluYy5cbipcbiogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbipcbiogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuKlxuKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4qIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4qIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgU0RGU2hhZGVyIGZyb20gJ3RocmVlLWJtZm9udC10ZXh0L3NoYWRlcnMvc2RmJztcbmltcG9ydCBjcmVhdGVHZW9tZXRyeSBmcm9tICd0aHJlZS1ibWZvbnQtdGV4dCc7XG5pbXBvcnQgcGFyc2VBU0NJSSBmcm9tICdwYXJzZS1ibWZvbnQtYXNjaWknO1xuXG5pbXBvcnQgKiBhcyBGb250IGZyb20gJy4vZm9udCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVNYXRlcmlhbCggY29sb3IgKXtcblxuICBjb25zdCB0ZXh0dXJlID0gbmV3IFRIUkVFLlRleHR1cmUoKTtcbiAgY29uc3QgaW1hZ2UgPSBGb250LmltYWdlKCk7XG4gIHRleHR1cmUuaW1hZ2UgPSBpbWFnZTtcbiAgdGV4dHVyZS5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIHRleHR1cmUubWluRmlsdGVyID0gVEhSRUUuTGluZWFyRmlsdGVyO1xuICB0ZXh0dXJlLm1hZ0ZpbHRlciA9IFRIUkVFLkxpbmVhckZpbHRlcjtcbiAgdGV4dHVyZS5nZW5lcmF0ZU1pcG1hcHMgPSBmYWxzZTtcblxuICByZXR1cm4gbmV3IFRIUkVFLlJhd1NoYWRlck1hdGVyaWFsKFNERlNoYWRlcih7XG4gICAgc2lkZTogVEhSRUUuRG91YmxlU2lkZSxcbiAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICBjb2xvcjogY29sb3IsXG4gICAgbWFwOiB0ZXh0dXJlXG4gIH0pKTtcbn1cblxuY29uc3QgdGV4dFNjYWxlID0gMC4wMDAyNDtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0b3IoKXtcblxuICBjb25zdCBmb250ID0gcGFyc2VBU0NJSSggRm9udC5mbnQoKSApO1xuXG4gIGNvbnN0IGNvbG9yTWF0ZXJpYWxzID0ge307XG5cbiAgZnVuY3Rpb24gY3JlYXRlVGV4dCggc3RyLCBmb250LCBjb2xvciA9IDB4ZmZmZmZmLCBzY2FsZSA9IDEuMCApe1xuXG4gICAgY29uc3QgZ2VvbWV0cnkgPSBjcmVhdGVHZW9tZXRyeSh7XG4gICAgICB0ZXh0OiBzdHIsXG4gICAgICBhbGlnbjogJ2xlZnQnLFxuICAgICAgd2lkdGg6IDEwMDAwLFxuICAgICAgZmxpcFk6IHRydWUsXG4gICAgICBmb250XG4gICAgfSk7XG5cblxuICAgIGNvbnN0IGxheW91dCA9IGdlb21ldHJ5LmxheW91dDtcblxuICAgIGxldCBtYXRlcmlhbCA9IGNvbG9yTWF0ZXJpYWxzWyBjb2xvciBdO1xuICAgIGlmKCBtYXRlcmlhbCA9PT0gdW5kZWZpbmVkICl7XG4gICAgICBtYXRlcmlhbCA9IGNvbG9yTWF0ZXJpYWxzWyBjb2xvciBdID0gY3JlYXRlTWF0ZXJpYWwoIGNvbG9yICk7XG4gICAgfVxuICAgIGNvbnN0IG1lc2ggPSBuZXcgVEhSRUUuTWVzaCggZ2VvbWV0cnksIG1hdGVyaWFsICk7XG4gICAgbWVzaC5zY2FsZS5tdWx0aXBseSggbmV3IFRIUkVFLlZlY3RvcjMoMSwtMSwxKSApO1xuXG4gICAgY29uc3QgZmluYWxTY2FsZSA9IHNjYWxlICogdGV4dFNjYWxlO1xuXG4gICAgbWVzaC5zY2FsZS5tdWx0aXBseVNjYWxhciggZmluYWxTY2FsZSApO1xuXG4gICAgbWVzaC5wb3NpdGlvbi55ID0gbGF5b3V0LmhlaWdodCAqIDAuNSAqIGZpbmFsU2NhbGU7XG5cbiAgICByZXR1cm4gbWVzaDtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gY3JlYXRlKCBzdHIsIHsgY29sb3I9MHhmZmZmZmYsIHNjYWxlPTEuMCB9ID0ge30gKXtcbiAgICBjb25zdCBncm91cCA9IG5ldyBUSFJFRS5Hcm91cCgpO1xuXG4gICAgbGV0IG1lc2ggPSBjcmVhdGVUZXh0KCBzdHIsIGZvbnQsIGNvbG9yLCBzY2FsZSApO1xuICAgIGdyb3VwLmFkZCggbWVzaCApO1xuICAgIGdyb3VwLmxheW91dCA9IG1lc2guZ2VvbWV0cnkubGF5b3V0O1xuXG4gICAgZ3JvdXAudXBkYXRlID0gZnVuY3Rpb24oIHN0ciApe1xuICAgICAgbWVzaC5nZW9tZXRyeS51cGRhdGUoIHN0ciApO1xuICAgIH07XG5cbiAgICByZXR1cm4gZ3JvdXA7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGNyZWF0ZSxcbiAgICBnZXRNYXRlcmlhbDogKCk9PiBtYXRlcmlhbFxuICB9XG5cbn0iLCIvKipcbiogZGF0LWd1aVZSIEphdmFzY3JpcHQgQ29udHJvbGxlciBMaWJyYXJ5IGZvciBWUlxuKiBodHRwczovL2dpdGh1Yi5jb20vZGF0YWFydHMvZGF0Lmd1aVZSXG4qXG4qIENvcHlyaWdodCAyMDE2IERhdGEgQXJ0cyBUZWFtLCBHb29nbGUgSW5jLlxuKiBcbiogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiogXG4qICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiogXG4qIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCAqIGFzIENvbG9ycyBmcm9tICcuL2NvbG9ycyc7XG5cbmV4cG9ydCBjb25zdCBQQU5FTCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCggeyBjb2xvcjogMHhmZmZmZmYsIHZlcnRleENvbG9yczogVEhSRUUuVmVydGV4Q29sb3JzIH0gKTtcbmV4cG9ydCBjb25zdCBMT0NBVE9SID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKCk7XG5leHBvcnQgY29uc3QgRk9MREVSID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKCB7IGNvbG9yOiAweDAwMDAwMCB9ICk7IiwiLyoqXG4qIGRhdC1ndWlWUiBKYXZhc2NyaXB0IENvbnRyb2xsZXIgTGlicmFyeSBmb3IgVlJcbiogaHR0cHM6Ly9naXRodWIuY29tL2RhdGFhcnRzL2RhdC5ndWlWUlxuKlxuKiBDb3B5cmlnaHQgMjAxNiBEYXRhIEFydHMgVGVhbSwgR29vZ2xlIEluYy5cbipcbiogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbipcbiogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuKlxuKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4qIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4qIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgY3JlYXRlVGV4dExhYmVsIGZyb20gJy4vdGV4dGxhYmVsJztcbmltcG9ydCBjcmVhdGVJbnRlcmFjdGlvbiBmcm9tICcuL2ludGVyYWN0aW9uJztcbmltcG9ydCAqIGFzIENvbG9ycyBmcm9tICcuL2NvbG9ycyc7XG5pbXBvcnQgKiBhcyBMYXlvdXQgZnJvbSAnLi9sYXlvdXQnO1xuaW1wb3J0ICogYXMgU2hhcmVkTWF0ZXJpYWxzIGZyb20gJy4vc2hhcmVkbWF0ZXJpYWxzJztcbmltcG9ydCAqIGFzIEdyYWIgZnJvbSAnLi9ncmFiJztcbmltcG9ydCAqIGFzIFBhbGV0dGUgZnJvbSAnLi9wYWxldHRlJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlU2xpZGVyKCB7XG4gIHRleHRDcmVhdG9yLFxuICBvYmplY3QsXG4gIHByb3BlcnR5TmFtZSA9ICd1bmRlZmluZWQnLFxuICBpbml0aWFsVmFsdWUgPSAwLjAsXG4gIG1pbiA9IDAuMCwgbWF4ID0gMS4wLFxuICBzdGVwID0gMC4xLFxuICB3aWR0aCA9IExheW91dC5QQU5FTF9XSURUSCxcbiAgaGVpZ2h0ID0gTGF5b3V0LkFMVF9IRUlHSFQsXG4gIGRlcHRoID0gTGF5b3V0LlBBTkVMX0RFUFRIXG59ID0ge30gKXtcblxuXG4gIGNvbnN0IFNMSURFUl9XSURUSCA9IHdpZHRoICogMC41IC0gTGF5b3V0LlBBTkVMX01BUkdJTjtcbiAgY29uc3QgU0xJREVSX0hFSUdIVCA9IGhlaWdodCAtIExheW91dC5QQU5FTF9NQVJHSU47XG4gIGNvbnN0IFNMSURFUl9ERVBUSCA9IGRlcHRoO1xuXG4gIGNvbnN0IHN0YXRlID0ge1xuICAgIGFscGhhOiAxLjAsXG4gICAgdmFsdWU6IGluaXRpYWxWYWx1ZSxcbiAgICBzdGVwOiBzdGVwLFxuICAgIHVzZVN0ZXA6IHRydWUsXG4gICAgcHJlY2lzaW9uOiAxLFxuICAgIGxpc3RlbjogZmFsc2UsXG4gICAgbWluOiBtaW4sXG4gICAgbWF4OiBtYXgsXG4gICAgb25DaGFuZ2VkQ0I6IHVuZGVmaW5lZCxcbiAgICBvbkZpbmlzaGVkQ2hhbmdlOiB1bmRlZmluZWQsXG4gICAgcHJlc3Npbmc6IGZhbHNlXG4gIH07XG5cbiAgc3RhdGUuc3RlcCA9IGdldEltcGxpZWRTdGVwKCBzdGF0ZS52YWx1ZSApO1xuICBzdGF0ZS5wcmVjaXNpb24gPSBudW1EZWNpbWFscyggc3RhdGUuc3RlcCApO1xuICBzdGF0ZS5hbHBoYSA9IGdldEFscGhhRnJvbVZhbHVlKCBzdGF0ZS52YWx1ZSwgc3RhdGUubWluLCBzdGF0ZS5tYXggKTtcblxuICBjb25zdCBncm91cCA9IG5ldyBUSFJFRS5Hcm91cCgpO1xuICAvL1BKVDogaGFja2luZyBpbiBhbiBleHRyYSBwcm9wZXJ0eSBmb3Igbm9uLXVuaWZvcm0gcGFuZWwgaGVpZ2h0XG4gIGdyb3VwLnNwYWNpbmcgPSBoZWlnaHQgKyBMYXlvdXQuUEFORUxfU1BBQ0lORztcblxuICAvLyAgZmlsbGVkIHZvbHVtZVxuICBjb25zdCByZWN0ID0gbmV3IFRIUkVFLkJveEdlb21ldHJ5KCBTTElERVJfV0lEVEgsIFNMSURFUl9IRUlHSFQsIFNMSURFUl9ERVBUSCApO1xuICByZWN0LnRyYW5zbGF0ZShTTElERVJfV0lEVEgqMC41LDAsMCk7XG4gIC8vIExheW91dC5hbGlnbkxlZnQoIHJlY3QgKTtcblxuICBjb25zdCBoaXRzY2FuTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoKTtcbiAgaGl0c2Nhbk1hdGVyaWFsLnZpc2libGUgPSBmYWxzZTtcblxuICBjb25zdCBoaXRzY2FuVm9sdW1lID0gbmV3IFRIUkVFLk1lc2goIHJlY3QuY2xvbmUoKSwgaGl0c2Nhbk1hdGVyaWFsICk7XG4gIGhpdHNjYW5Wb2x1bWUucG9zaXRpb24ueiA9IGRlcHRoO1xuICBoaXRzY2FuVm9sdW1lLnBvc2l0aW9uLnggPSB3aWR0aCAqIDAuNTtcbiAgaGl0c2NhblZvbHVtZS5uYW1lID0gJ2hpdHNjYW5Wb2x1bWUnO1xuXG4gIC8vICBzbGlkZXJCRyB2b2x1bWVcbiAgY29uc3Qgc2xpZGVyQkcgPSBuZXcgVEhSRUUuTWVzaCggcmVjdC5jbG9uZSgpLCBTaGFyZWRNYXRlcmlhbHMuUEFORUwgKTtcbiAgQ29sb3JzLmNvbG9yaXplR2VvbWV0cnkoIHNsaWRlckJHLmdlb21ldHJ5LCBDb2xvcnMuU0xJREVSX0JHICk7XG4gIHNsaWRlckJHLnBvc2l0aW9uLnogPSBkZXB0aCAqIDAuNTtcbiAgc2xpZGVyQkcucG9zaXRpb24ueCA9IFNMSURFUl9XSURUSCArIExheW91dC5QQU5FTF9NQVJHSU47XG5cbiAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoeyBjb2xvcjogQ29sb3JzLkRFRkFVTFRfQ09MT1IgfSk7XG4gIGNvbnN0IGZpbGxlZFZvbHVtZSA9IG5ldyBUSFJFRS5NZXNoKCByZWN0LmNsb25lKCksIG1hdGVyaWFsICk7XG4gIGZpbGxlZFZvbHVtZS5wb3NpdGlvbi56ID0gZGVwdGggKiAwLjU7XG4gIGhpdHNjYW5Wb2x1bWUuYWRkKCBmaWxsZWRWb2x1bWUgKTtcblxuICBjb25zdCBlbmRMb2NhdG9yID0gbmV3IFRIUkVFLk1lc2goIG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSggMC4wNSwgMC4wNSwgMC4wNSwgMSwgMSwgMSApLCBTaGFyZWRNYXRlcmlhbHMuTE9DQVRPUiApO1xuICBlbmRMb2NhdG9yLnBvc2l0aW9uLnggPSBTTElERVJfV0lEVEg7XG4gIGhpdHNjYW5Wb2x1bWUuYWRkKCBlbmRMb2NhdG9yICk7XG4gIGVuZExvY2F0b3IudmlzaWJsZSA9IGZhbHNlO1xuXG4gIGNvbnN0IHZhbHVlTGFiZWwgPSB0ZXh0Q3JlYXRvci5jcmVhdGUoIHN0YXRlLnZhbHVlLnRvU3RyaW5nKCkgKTtcbiAgdmFsdWVMYWJlbC5wb3NpdGlvbi54ID0gTGF5b3V0LlBBTkVMX1ZBTFVFX1RFWFRfTUFSR0lOICsgd2lkdGggKiAwLjU7XG4gIHZhbHVlTGFiZWwucG9zaXRpb24ueiA9IGRlcHRoKjIuNTtcbiAgdmFsdWVMYWJlbC5wb3NpdGlvbi55ID0gLTAuMDMyNTtcblxuICBjb25zdCBkZXNjcmlwdG9yTGFiZWwgPSB0ZXh0Q3JlYXRvci5jcmVhdGUoIHByb3BlcnR5TmFtZSApO1xuICBkZXNjcmlwdG9yTGFiZWwucG9zaXRpb24ueCA9IExheW91dC5QQU5FTF9MQUJFTF9URVhUX01BUkdJTjtcbiAgZGVzY3JpcHRvckxhYmVsLnBvc2l0aW9uLnogPSBkZXB0aDtcbiAgZGVzY3JpcHRvckxhYmVsLnBvc2l0aW9uLnkgPSAtMC4wMztcblxuICBjb25zdCBjb250cm9sbGVySUQgPSBMYXlvdXQuY3JlYXRlQ29udHJvbGxlcklEQm94KCBoZWlnaHQsIENvbG9ycy5DT05UUk9MTEVSX0lEX1NMSURFUiApO1xuICBjb250cm9sbGVySUQucG9zaXRpb24ueiA9IGRlcHRoO1xuXG4gIGNvbnN0IHBhbmVsID0gTGF5b3V0LmNyZWF0ZVBhbmVsKCB3aWR0aCwgaGVpZ2h0LCBkZXB0aCApO1xuICBwYW5lbC5uYW1lID0gJ3BhbmVsJztcbiAgcGFuZWwuYWRkKCBkZXNjcmlwdG9yTGFiZWwsIGhpdHNjYW5Wb2x1bWUsIHNsaWRlckJHLCB2YWx1ZUxhYmVsLCBjb250cm9sbGVySUQgKTtcblxuICBncm91cC5hZGQoIHBhbmVsIClcblxuICB1cGRhdGVWYWx1ZUxhYmVsKCBzdGF0ZS52YWx1ZSApO1xuICB1cGRhdGVTbGlkZXIoKTtcblxuICBmdW5jdGlvbiB1cGRhdGVWYWx1ZUxhYmVsKCB2YWx1ZSApe1xuICAgIGlmKCBzdGF0ZS51c2VTdGVwICl7XG4gICAgICB2YWx1ZUxhYmVsLnVwZGF0ZSggcm91bmRUb0RlY2ltYWwoIHN0YXRlLnZhbHVlLCBzdGF0ZS5wcmVjaXNpb24gKS50b1N0cmluZygpICk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICB2YWx1ZUxhYmVsLnVwZGF0ZSggc3RhdGUudmFsdWUudG9TdHJpbmcoKSApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVZpZXcoKXtcbiAgICBpZiggc3RhdGUucHJlc3NpbmcgKXtcbiAgICAgIG1hdGVyaWFsLmNvbG9yLnNldEhleCggQ29sb3JzLklOVEVSQUNUSU9OX0NPTE9SICk7XG4gICAgfVxuICAgIGVsc2VcbiAgICBpZiggaW50ZXJhY3Rpb24uaG92ZXJpbmcoKSApe1xuICAgICAgbWF0ZXJpYWwuY29sb3Iuc2V0SGV4KCBDb2xvcnMuSElHSExJR0hUX0NPTE9SICk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICBtYXRlcmlhbC5jb2xvci5zZXRIZXgoIENvbG9ycy5ERUZBVUxUX0NPTE9SICk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlU2xpZGVyKCl7XG4gICAgZmlsbGVkVm9sdW1lLnNjYWxlLnggPVxuICAgICAgTWF0aC5taW4oXG4gICAgICAgIE1hdGgubWF4KCBnZXRBbHBoYUZyb21WYWx1ZSggc3RhdGUudmFsdWUsIHN0YXRlLm1pbiwgc3RhdGUubWF4ICkgKiB3aWR0aCwgMC4wMDAwMDEgKSxcbiAgICAgICAgd2lkdGhcbiAgICAgICk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVPYmplY3QoIHZhbHVlICl7XG4gICAgb2JqZWN0WyBwcm9wZXJ0eU5hbWUgXSA9IHZhbHVlO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlU3RhdGVGcm9tQWxwaGEoIGFscGhhICl7XG4gICAgc3RhdGUuYWxwaGEgPSBnZXRDbGFtcGVkQWxwaGEoIGFscGhhICk7XG4gICAgc3RhdGUudmFsdWUgPSBnZXRWYWx1ZUZyb21BbHBoYSggc3RhdGUuYWxwaGEsIHN0YXRlLm1pbiwgc3RhdGUubWF4ICk7XG4gICAgaWYoIHN0YXRlLnVzZVN0ZXAgKXtcbiAgICAgIHN0YXRlLnZhbHVlID0gZ2V0U3RlcHBlZFZhbHVlKCBzdGF0ZS52YWx1ZSwgc3RhdGUuc3RlcCApO1xuICAgIH1cbiAgICBzdGF0ZS52YWx1ZSA9IGdldENsYW1wZWRWYWx1ZSggc3RhdGUudmFsdWUsIHN0YXRlLm1pbiwgc3RhdGUubWF4ICk7XG4gIH1cblxuICBmdW5jdGlvbiBsaXN0ZW5VcGRhdGUoKXtcbiAgICBzdGF0ZS52YWx1ZSA9IGdldFZhbHVlRnJvbU9iamVjdCgpO1xuICAgIHN0YXRlLmFscGhhID0gZ2V0QWxwaGFGcm9tVmFsdWUoIHN0YXRlLnZhbHVlLCBzdGF0ZS5taW4sIHN0YXRlLm1heCApO1xuICAgIHN0YXRlLmFscGhhID0gZ2V0Q2xhbXBlZEFscGhhKCBzdGF0ZS5hbHBoYSApO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0VmFsdWVGcm9tT2JqZWN0KCl7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQoIG9iamVjdFsgcHJvcGVydHlOYW1lIF0gKTtcbiAgfVxuXG4gIGdyb3VwLm9uQ2hhbmdlID0gZnVuY3Rpb24oIGNhbGxiYWNrICl7XG4gICAgc3RhdGUub25DaGFuZ2VkQ0IgPSBjYWxsYmFjaztcbiAgICByZXR1cm4gZ3JvdXA7XG4gIH07XG5cbiAgZ3JvdXAuc3RlcCA9IGZ1bmN0aW9uKCBzdGVwICl7XG4gICAgc3RhdGUuc3RlcCA9IHN0ZXA7XG4gICAgc3RhdGUucHJlY2lzaW9uID0gbnVtRGVjaW1hbHMoIHN0YXRlLnN0ZXAgKVxuICAgIHN0YXRlLnVzZVN0ZXAgPSB0cnVlO1xuXG4gICAgc3RhdGUuYWxwaGEgPSBnZXRBbHBoYUZyb21WYWx1ZSggc3RhdGUudmFsdWUsIHN0YXRlLm1pbiwgc3RhdGUubWF4ICk7XG5cbiAgICB1cGRhdGVTdGF0ZUZyb21BbHBoYSggc3RhdGUuYWxwaGEgKTtcbiAgICB1cGRhdGVWYWx1ZUxhYmVsKCBzdGF0ZS52YWx1ZSApO1xuICAgIHVwZGF0ZVNsaWRlciggKTtcbiAgICByZXR1cm4gZ3JvdXA7XG4gIH07XG5cbiAgZ3JvdXAubGlzdGVuID0gZnVuY3Rpb24oKXtcbiAgICBzdGF0ZS5saXN0ZW4gPSB0cnVlO1xuICAgIHJldHVybiBncm91cDtcbiAgfTtcblxuICBjb25zdCBpbnRlcmFjdGlvbiA9IGNyZWF0ZUludGVyYWN0aW9uKCBoaXRzY2FuVm9sdW1lICk7XG4gIGludGVyYWN0aW9uLmV2ZW50cy5vbiggJ29uUHJlc3NlZCcsIGhhbmRsZVByZXNzICk7XG4gIGludGVyYWN0aW9uLmV2ZW50cy5vbiggJ3ByZXNzaW5nJywgaGFuZGxlSG9sZCApO1xuICBpbnRlcmFjdGlvbi5ldmVudHMub24oICdvblJlbGVhc2VkJywgaGFuZGxlUmVsZWFzZSApO1xuXG4gIGZ1bmN0aW9uIGhhbmRsZVByZXNzKCBwICl7XG4gICAgaWYoIGdyb3VwLnZpc2libGUgPT09IGZhbHNlICl7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHN0YXRlLnByZXNzaW5nID0gdHJ1ZTtcbiAgICBwLmxvY2tlZCA9IHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVIb2xkKCB7IHBvaW50IH0gPSB7fSApe1xuICAgIGlmKCBncm91cC52aXNpYmxlID09PSBmYWxzZSApe1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHN0YXRlLnByZXNzaW5nID0gdHJ1ZTtcblxuICAgIGZpbGxlZFZvbHVtZS51cGRhdGVNYXRyaXhXb3JsZCgpO1xuICAgIGVuZExvY2F0b3IudXBkYXRlTWF0cml4V29ybGQoKTtcblxuICAgIGNvbnN0IGEgPSBuZXcgVEhSRUUuVmVjdG9yMygpLnNldEZyb21NYXRyaXhQb3NpdGlvbiggZmlsbGVkVm9sdW1lLm1hdHJpeFdvcmxkICk7XG4gICAgY29uc3QgYiA9IG5ldyBUSFJFRS5WZWN0b3IzKCkuc2V0RnJvbU1hdHJpeFBvc2l0aW9uKCBlbmRMb2NhdG9yLm1hdHJpeFdvcmxkICk7XG5cbiAgICBjb25zdCBwcmV2aW91c1ZhbHVlID0gc3RhdGUudmFsdWU7XG5cbiAgICB1cGRhdGVTdGF0ZUZyb21BbHBoYSggZ2V0UG9pbnRBbHBoYSggcG9pbnQsIHthLGJ9ICkgKTtcbiAgICB1cGRhdGVWYWx1ZUxhYmVsKCBzdGF0ZS52YWx1ZSApO1xuICAgIHVwZGF0ZVNsaWRlciggKTtcbiAgICB1cGRhdGVPYmplY3QoIHN0YXRlLnZhbHVlICk7XG5cbiAgICBpZiggcHJldmlvdXNWYWx1ZSAhPT0gc3RhdGUudmFsdWUgJiYgc3RhdGUub25DaGFuZ2VkQ0IgKXtcbiAgICAgIHN0YXRlLm9uQ2hhbmdlZENCKCBzdGF0ZS52YWx1ZSApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZVJlbGVhc2UoKXtcbiAgICBzdGF0ZS5wcmVzc2luZyA9IGZhbHNlO1xuICB9XG5cbiAgZ3JvdXAuaW50ZXJhY3Rpb24gPSBpbnRlcmFjdGlvbjtcbiAgZ3JvdXAuaGl0c2NhbiA9IFsgaGl0c2NhblZvbHVtZSwgcGFuZWwgXTtcblxuICBjb25zdCBncmFiSW50ZXJhY3Rpb24gPSBHcmFiLmNyZWF0ZSggeyBncm91cCwgcGFuZWwgfSApO1xuICBjb25zdCBwYWxldHRlSW50ZXJhY3Rpb24gPSBQYWxldHRlLmNyZWF0ZSggeyBncm91cCwgcGFuZWwgfSApO1xuXG4gIGdyb3VwLnVwZGF0ZSA9IGZ1bmN0aW9uKCBpbnB1dE9iamVjdHMgKXtcbiAgICBpbnRlcmFjdGlvbi51cGRhdGUoIGlucHV0T2JqZWN0cyApO1xuICAgIGdyYWJJbnRlcmFjdGlvbi51cGRhdGUoIGlucHV0T2JqZWN0cyApO1xuICAgIHBhbGV0dGVJbnRlcmFjdGlvbi51cGRhdGUoIGlucHV0T2JqZWN0cyApO1xuXG4gICAgaWYoIHN0YXRlLmxpc3RlbiApe1xuICAgICAgbGlzdGVuVXBkYXRlKCk7XG4gICAgICB1cGRhdGVWYWx1ZUxhYmVsKCBzdGF0ZS52YWx1ZSApO1xuICAgICAgdXBkYXRlU2xpZGVyKCk7XG4gICAgfVxuICAgIHVwZGF0ZVZpZXcoKTtcbiAgfTtcblxuICBncm91cC5uYW1lID0gZnVuY3Rpb24oIHN0ciApe1xuICAgIGRlc2NyaXB0b3JMYWJlbC51cGRhdGUoIHN0ciApO1xuICAgIHJldHVybiBncm91cDtcbiAgfTtcblxuICBncm91cC5taW4gPSBmdW5jdGlvbiggbSApe1xuICAgIHN0YXRlLm1pbiA9IG07XG4gICAgc3RhdGUuYWxwaGEgPSBnZXRBbHBoYUZyb21WYWx1ZSggc3RhdGUudmFsdWUsIHN0YXRlLm1pbiwgc3RhdGUubWF4ICk7XG4gICAgdXBkYXRlU3RhdGVGcm9tQWxwaGEoIHN0YXRlLmFscGhhICk7XG4gICAgdXBkYXRlVmFsdWVMYWJlbCggc3RhdGUudmFsdWUgKTtcbiAgICB1cGRhdGVTbGlkZXIoICk7XG4gICAgcmV0dXJuIGdyb3VwO1xuICB9O1xuXG4gIGdyb3VwLm1heCA9IGZ1bmN0aW9uKCBtICl7XG4gICAgc3RhdGUubWF4ID0gbTtcbiAgICBzdGF0ZS5hbHBoYSA9IGdldEFscGhhRnJvbVZhbHVlKCBzdGF0ZS52YWx1ZSwgc3RhdGUubWluLCBzdGF0ZS5tYXggKTtcbiAgICB1cGRhdGVTdGF0ZUZyb21BbHBoYSggc3RhdGUuYWxwaGEgKTtcbiAgICB1cGRhdGVWYWx1ZUxhYmVsKCBzdGF0ZS52YWx1ZSApO1xuICAgIHVwZGF0ZVNsaWRlciggKTtcbiAgICByZXR1cm4gZ3JvdXA7XG4gIH07XG5cbiAgcmV0dXJuIGdyb3VwO1xufVxuXG5jb25zdCB0YSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCB0YiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCB0VG9BID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IGFUb0IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5mdW5jdGlvbiBnZXRQb2ludEFscGhhKCBwb2ludCwgc2VnbWVudCApe1xuICB0YS5jb3B5KCBzZWdtZW50LmIgKS5zdWIoIHNlZ21lbnQuYSApO1xuICB0Yi5jb3B5KCBwb2ludCApLnN1Yiggc2VnbWVudC5hICk7XG5cbiAgY29uc3QgcHJvamVjdGVkID0gdGIucHJvamVjdE9uVmVjdG9yKCB0YSApO1xuXG4gIHRUb0EuY29weSggcG9pbnQgKS5zdWIoIHNlZ21lbnQuYSApO1xuXG4gIGFUb0IuY29weSggc2VnbWVudC5iICkuc3ViKCBzZWdtZW50LmEgKS5ub3JtYWxpemUoKTtcblxuICBjb25zdCBzaWRlID0gdFRvQS5ub3JtYWxpemUoKS5kb3QoIGFUb0IgKSA+PSAwID8gMSA6IC0xO1xuXG4gIGNvbnN0IGxlbmd0aCA9IHNlZ21lbnQuYS5kaXN0YW5jZVRvKCBzZWdtZW50LmIgKSAqIHNpZGU7XG5cbiAgbGV0IGFscGhhID0gcHJvamVjdGVkLmxlbmd0aCgpIC8gbGVuZ3RoO1xuICBpZiggYWxwaGEgPiAxLjAgKXtcbiAgICBhbHBoYSA9IDEuMDtcbiAgfVxuICBpZiggYWxwaGEgPCAwLjAgKXtcbiAgICBhbHBoYSA9IDAuMDtcbiAgfVxuICByZXR1cm4gYWxwaGE7XG59XG5cbmZ1bmN0aW9uIGxlcnAobWluLCBtYXgsIHZhbHVlKSB7XG4gIHJldHVybiAoMS12YWx1ZSkqbWluICsgdmFsdWUqbWF4O1xufVxuXG5mdW5jdGlvbiBtYXBfcmFuZ2UodmFsdWUsIGxvdzEsIGhpZ2gxLCBsb3cyLCBoaWdoMikge1xuICAgIHJldHVybiBsb3cyICsgKGhpZ2gyIC0gbG93MikgKiAodmFsdWUgLSBsb3cxKSAvIChoaWdoMSAtIGxvdzEpO1xufVxuXG5mdW5jdGlvbiBnZXRDbGFtcGVkQWxwaGEoIGFscGhhICl7XG4gIGlmKCBhbHBoYSA+IDEgKXtcbiAgICByZXR1cm4gMVxuICB9XG4gIGlmKCBhbHBoYSA8IDAgKXtcbiAgICByZXR1cm4gMDtcbiAgfVxuICByZXR1cm4gYWxwaGE7XG59XG5cbmZ1bmN0aW9uIGdldENsYW1wZWRWYWx1ZSggdmFsdWUsIG1pbiwgbWF4ICl7XG4gIGlmKCB2YWx1ZSA8IG1pbiApe1xuICAgIHJldHVybiBtaW47XG4gIH1cbiAgaWYoIHZhbHVlID4gbWF4ICl7XG4gICAgcmV0dXJuIG1heDtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGdldEltcGxpZWRTdGVwKCB2YWx1ZSApe1xuICBpZiggdmFsdWUgPT09IDAgKXtcbiAgICByZXR1cm4gMTsgLy8gV2hhdCBhcmUgd2UsIHBzeWNoaWNzP1xuICB9IGVsc2Uge1xuICAgIC8vIEhleSBEb3VnLCBjaGVjayB0aGlzIG91dC5cbiAgICByZXR1cm4gTWF0aC5wb3coMTAsIE1hdGguZmxvb3IoTWF0aC5sb2coTWF0aC5hYnModmFsdWUpKS9NYXRoLkxOMTApKS8xMDtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRWYWx1ZUZyb21BbHBoYSggYWxwaGEsIG1pbiwgbWF4ICl7XG4gIHJldHVybiBtYXBfcmFuZ2UoIGFscGhhLCAwLjAsIDEuMCwgbWluLCBtYXggKVxufVxuXG5mdW5jdGlvbiBnZXRBbHBoYUZyb21WYWx1ZSggdmFsdWUsIG1pbiwgbWF4ICl7XG4gIHJldHVybiBtYXBfcmFuZ2UoIHZhbHVlLCBtaW4sIG1heCwgMC4wLCAxLjAgKTtcbn1cblxuZnVuY3Rpb24gZ2V0U3RlcHBlZFZhbHVlKCB2YWx1ZSwgc3RlcCApe1xuICBpZiggdmFsdWUgJSBzdGVwICE9IDApIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZCggdmFsdWUgLyBzdGVwICkgKiBzdGVwO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gbnVtRGVjaW1hbHMoeCkge1xuICB4ID0geC50b1N0cmluZygpO1xuICBpZiAoeC5pbmRleE9mKCcuJykgPiAtMSkge1xuICAgIHJldHVybiB4Lmxlbmd0aCAtIHguaW5kZXhPZignLicpIC0gMTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gMDtcbiAgfVxufVxuXG5mdW5jdGlvbiByb3VuZFRvRGVjaW1hbCh2YWx1ZSwgZGVjaW1hbHMpIHtcbiAgY29uc3QgdGVuVG8gPSBNYXRoLnBvdygxMCwgZGVjaW1hbHMpO1xuICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAqIHRlblRvKSAvIHRlblRvO1xufSIsIi8qKlxuKiBkYXQtZ3VpVlIgSmF2YXNjcmlwdCBDb250cm9sbGVyIExpYnJhcnkgZm9yIFZSXG4qIGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRhYXJ0cy9kYXQuZ3VpVlJcbipcbiogQ29weXJpZ2h0IDIwMTYgRGF0YSBBcnRzIFRlYW0sIEdvb2dsZSBJbmMuXG4qXG4qIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4qIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4qXG4qICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbipcbiogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4qIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4qIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0ICogYXMgQ29sb3JzIGZyb20gJy4vY29sb3JzJztcbmltcG9ydCAqIGFzIFNoYXJlZE1hdGVyaWFscyBmcm9tICcuL3NoYXJlZG1hdGVyaWFscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVRleHRMYWJlbCggdGV4dENyZWF0b3IsIHN0ciwgd2lkdGggPSAwLjQsIGRlcHRoID0gMC4wMjksIGZnQ29sb3IgPSAweGZmZmZmZiwgYmdDb2xvciA9IENvbG9ycy5ERUZBVUxUX0JBQ0ssIHNjYWxlID0gMS4wICl7XG5cbiAgY29uc3QgZ3JvdXAgPSBuZXcgVEhSRUUuR3JvdXAoKTtcbiAgY29uc3QgaW50ZXJuYWxQb3NpdGlvbmluZyA9IG5ldyBUSFJFRS5Hcm91cCgpO1xuICBncm91cC5hZGQoIGludGVybmFsUG9zaXRpb25pbmcgKTtcblxuICBjb25zdCB0ZXh0ID0gdGV4dENyZWF0b3IuY3JlYXRlKCBzdHIsIHsgY29sb3I6IGZnQ29sb3IsIHNjYWxlIH0gKTtcbiAgaW50ZXJuYWxQb3NpdGlvbmluZy5hZGQoIHRleHQgKTtcblxuXG4gIGdyb3VwLnNldFN0cmluZyA9IGZ1bmN0aW9uKCBzdHIgKXtcbiAgICB0ZXh0LnVwZGF0ZSggc3RyLnRvU3RyaW5nKCkgKTtcbiAgfTtcblxuICBncm91cC5zZXROdW1iZXIgPSBmdW5jdGlvbiggc3RyICl7XG4gICAgdGV4dC51cGRhdGUoIHN0ci50b0ZpeGVkKDIpICk7XG4gIH07XG5cbiAgdGV4dC5wb3NpdGlvbi56ID0gZGVwdGg7XG5cbiAgY29uc3QgYmFja0JvdW5kcyA9IDAuMDE7XG4gIGNvbnN0IG1hcmdpbiA9IDAuMDE7XG4gIGNvbnN0IHRvdGFsV2lkdGggPSB3aWR0aDtcbiAgY29uc3QgdG90YWxIZWlnaHQgPSAwLjA0ICsgbWFyZ2luICogMjtcbiAgY29uc3QgbGFiZWxCYWNrR2VvbWV0cnkgPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkoIHRvdGFsV2lkdGgsIHRvdGFsSGVpZ2h0LCBkZXB0aCwgMSwgMSwgMSApO1xuICBsYWJlbEJhY2tHZW9tZXRyeS5hcHBseU1hdHJpeCggbmV3IFRIUkVFLk1hdHJpeDQoKS5tYWtlVHJhbnNsYXRpb24oIHRvdGFsV2lkdGggKiAwLjUgLSBtYXJnaW4sIDAsIDAgKSApO1xuXG4gIGNvbnN0IGxhYmVsQmFja01lc2ggPSBuZXcgVEhSRUUuTWVzaCggbGFiZWxCYWNrR2VvbWV0cnksIFNoYXJlZE1hdGVyaWFscy5QQU5FTCApO1xuICBDb2xvcnMuY29sb3JpemVHZW9tZXRyeSggbGFiZWxCYWNrTWVzaC5nZW9tZXRyeSwgYmdDb2xvciApO1xuXG4gIGxhYmVsQmFja01lc2gucG9zaXRpb24ueSA9IDAuMDM7XG4gIGludGVybmFsUG9zaXRpb25pbmcuYWRkKCBsYWJlbEJhY2tNZXNoICk7XG4gIGludGVybmFsUG9zaXRpb25pbmcucG9zaXRpb24ueSA9IC10b3RhbEhlaWdodCAqIDAuNTtcblxuICBncm91cC5iYWNrID0gbGFiZWxCYWNrTWVzaDtcblxuICByZXR1cm4gZ3JvdXA7XG59IiwiLypcbiAqXHRAYXV0aG9yIHp6ODUgLyBodHRwOi8vdHdpdHRlci5jb20vYmx1cnNwbGluZSAvIGh0dHA6Ly93d3cubGFiNGdhbWVzLm5ldC96ejg1L2Jsb2dcbiAqXHRAYXV0aG9yIGNlbnRlcmlvbndhcmUgLyBodHRwOi8vd3d3LmNlbnRlcmlvbndhcmUuY29tXG4gKlxuICpcdFN1YmRpdmlzaW9uIEdlb21ldHJ5IE1vZGlmaWVyXG4gKlx0XHR1c2luZyBMb29wIFN1YmRpdmlzaW9uIFNjaGVtZVxuICpcbiAqXHRSZWZlcmVuY2VzOlxuICpcdFx0aHR0cDovL2dyYXBoaWNzLnN0YW5mb3JkLmVkdS9+bWRmaXNoZXIvc3ViZGl2aXNpb24uaHRtbFxuICpcdFx0aHR0cDovL3d3dy5ob2xtZXMzZC5uZXQvZ3JhcGhpY3Mvc3ViZGl2aXNpb24vXG4gKlx0XHRodHRwOi8vd3d3LmNzLnJ1dGdlcnMuZWR1L35kZWNhcmxvL3JlYWRpbmdzL3N1YmRpdi1zZzAwYy5wZGZcbiAqXG4gKlx0S25vd24gSXNzdWVzOlxuICpcdFx0LSBjdXJyZW50bHkgZG9lc24ndCBoYW5kbGUgXCJTaGFycCBFZGdlc1wiXG4gKi9cblxuVEhSRUUuU3ViZGl2aXNpb25Nb2RpZmllciA9IGZ1bmN0aW9uICggc3ViZGl2aXNpb25zICkge1xuXG5cdHRoaXMuc3ViZGl2aXNpb25zID0gKCBzdWJkaXZpc2lvbnMgPT09IHVuZGVmaW5lZCApID8gMSA6IHN1YmRpdmlzaW9ucztcblxufTtcblxuLy8gQXBwbGllcyB0aGUgXCJtb2RpZnlcIiBwYXR0ZXJuXG5USFJFRS5TdWJkaXZpc2lvbk1vZGlmaWVyLnByb3RvdHlwZS5tb2RpZnkgPSBmdW5jdGlvbiAoIGdlb21ldHJ5ICkge1xuXG5cdHZhciByZXBlYXRzID0gdGhpcy5zdWJkaXZpc2lvbnM7XG5cblx0d2hpbGUgKCByZXBlYXRzIC0tID4gMCApIHtcblxuXHRcdHRoaXMuc21vb3RoKCBnZW9tZXRyeSApO1xuXG5cdH1cblxuXHRnZW9tZXRyeS5jb21wdXRlRmFjZU5vcm1hbHMoKTtcblx0Z2VvbWV0cnkuY29tcHV0ZVZlcnRleE5vcm1hbHMoKTtcblxufTtcblxuKCBmdW5jdGlvbigpIHtcblxuXHQvLyBTb21lIGNvbnN0YW50c1xuXHR2YXIgV0FSTklOR1MgPSAhIHRydWU7IC8vIFNldCB0byB0cnVlIGZvciBkZXZlbG9wbWVudFxuXHR2YXIgQUJDID0gWyAnYScsICdiJywgJ2MnIF07XG5cblxuXHRmdW5jdGlvbiBnZXRFZGdlKCBhLCBiLCBtYXAgKSB7XG5cblx0XHR2YXIgdmVydGV4SW5kZXhBID0gTWF0aC5taW4oIGEsIGIgKTtcblx0XHR2YXIgdmVydGV4SW5kZXhCID0gTWF0aC5tYXgoIGEsIGIgKTtcblxuXHRcdHZhciBrZXkgPSB2ZXJ0ZXhJbmRleEEgKyBcIl9cIiArIHZlcnRleEluZGV4QjtcblxuXHRcdHJldHVybiBtYXBbIGtleSBdO1xuXG5cdH1cblxuXG5cdGZ1bmN0aW9uIHByb2Nlc3NFZGdlKCBhLCBiLCB2ZXJ0aWNlcywgbWFwLCBmYWNlLCBtZXRhVmVydGljZXMgKSB7XG5cblx0XHR2YXIgdmVydGV4SW5kZXhBID0gTWF0aC5taW4oIGEsIGIgKTtcblx0XHR2YXIgdmVydGV4SW5kZXhCID0gTWF0aC5tYXgoIGEsIGIgKTtcblxuXHRcdHZhciBrZXkgPSB2ZXJ0ZXhJbmRleEEgKyBcIl9cIiArIHZlcnRleEluZGV4QjtcblxuXHRcdHZhciBlZGdlO1xuXG5cdFx0aWYgKCBrZXkgaW4gbWFwICkge1xuXG5cdFx0XHRlZGdlID0gbWFwWyBrZXkgXTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdHZhciB2ZXJ0ZXhBID0gdmVydGljZXNbIHZlcnRleEluZGV4QSBdO1xuXHRcdFx0dmFyIHZlcnRleEIgPSB2ZXJ0aWNlc1sgdmVydGV4SW5kZXhCIF07XG5cblx0XHRcdGVkZ2UgPSB7XG5cblx0XHRcdFx0YTogdmVydGV4QSwgLy8gcG9pbnRlciByZWZlcmVuY2Vcblx0XHRcdFx0YjogdmVydGV4Qixcblx0XHRcdFx0bmV3RWRnZTogbnVsbCxcblx0XHRcdFx0Ly8gYUluZGV4OiBhLCAvLyBudW1iZXJlZCByZWZlcmVuY2Vcblx0XHRcdFx0Ly8gYkluZGV4OiBiLFxuXHRcdFx0XHRmYWNlczogW10gLy8gcG9pbnRlcnMgdG8gZmFjZVxuXG5cdFx0XHR9O1xuXG5cdFx0XHRtYXBbIGtleSBdID0gZWRnZTtcblxuXHRcdH1cblxuXHRcdGVkZ2UuZmFjZXMucHVzaCggZmFjZSApO1xuXG5cdFx0bWV0YVZlcnRpY2VzWyBhIF0uZWRnZXMucHVzaCggZWRnZSApO1xuXHRcdG1ldGFWZXJ0aWNlc1sgYiBdLmVkZ2VzLnB1c2goIGVkZ2UgKTtcblxuXG5cdH1cblxuXHRmdW5jdGlvbiBnZW5lcmF0ZUxvb2t1cHMoIHZlcnRpY2VzLCBmYWNlcywgbWV0YVZlcnRpY2VzLCBlZGdlcyApIHtcblxuXHRcdHZhciBpLCBpbCwgZmFjZSwgZWRnZTtcblxuXHRcdGZvciAoIGkgPSAwLCBpbCA9IHZlcnRpY2VzLmxlbmd0aDsgaSA8IGlsOyBpICsrICkge1xuXG5cdFx0XHRtZXRhVmVydGljZXNbIGkgXSA9IHsgZWRnZXM6IFtdIH07XG5cblx0XHR9XG5cblx0XHRmb3IgKCBpID0gMCwgaWwgPSBmYWNlcy5sZW5ndGg7IGkgPCBpbDsgaSArKyApIHtcblxuXHRcdFx0ZmFjZSA9IGZhY2VzWyBpIF07XG5cblx0XHRcdHByb2Nlc3NFZGdlKCBmYWNlLmEsIGZhY2UuYiwgdmVydGljZXMsIGVkZ2VzLCBmYWNlLCBtZXRhVmVydGljZXMgKTtcblx0XHRcdHByb2Nlc3NFZGdlKCBmYWNlLmIsIGZhY2UuYywgdmVydGljZXMsIGVkZ2VzLCBmYWNlLCBtZXRhVmVydGljZXMgKTtcblx0XHRcdHByb2Nlc3NFZGdlKCBmYWNlLmMsIGZhY2UuYSwgdmVydGljZXMsIGVkZ2VzLCBmYWNlLCBtZXRhVmVydGljZXMgKTtcblxuXHRcdH1cblxuXHR9XG5cblx0ZnVuY3Rpb24gbmV3RmFjZSggbmV3RmFjZXMsIGEsIGIsIGMgKSB7XG5cblx0XHRuZXdGYWNlcy5wdXNoKCBuZXcgVEhSRUUuRmFjZTMoIGEsIGIsIGMgKSApO1xuXG5cdH1cblxuXHRmdW5jdGlvbiBtaWRwb2ludCggYSwgYiApIHtcblxuXHRcdHJldHVybiAoIE1hdGguYWJzKCBiIC0gYSApIC8gMiApICsgTWF0aC5taW4oIGEsIGIgKTtcblxuXHR9XG5cblx0ZnVuY3Rpb24gbmV3VXYoIG5ld1V2cywgYSwgYiwgYyApIHtcblxuXHRcdG5ld1V2cy5wdXNoKCBbIGEuY2xvbmUoKSwgYi5jbG9uZSgpLCBjLmNsb25lKCkgXSApO1xuXG5cdH1cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cdC8vIFBlcmZvcm1zIG9uZSBpdGVyYXRpb24gb2YgU3ViZGl2aXNpb25cblx0VEhSRUUuU3ViZGl2aXNpb25Nb2RpZmllci5wcm90b3R5cGUuc21vb3RoID0gZnVuY3Rpb24gKCBnZW9tZXRyeSApIHtcblxuXHRcdHZhciB0bXAgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5cdFx0dmFyIG9sZFZlcnRpY2VzLCBvbGRGYWNlcywgb2xkVXZzO1xuXHRcdHZhciBuZXdWZXJ0aWNlcywgbmV3RmFjZXMsIG5ld1VWcyA9IFtdO1xuXG5cdFx0dmFyIG4sIGwsIGksIGlsLCBqLCBrO1xuXHRcdHZhciBtZXRhVmVydGljZXMsIHNvdXJjZUVkZ2VzO1xuXG5cdFx0Ly8gbmV3IHN0dWZmLlxuXHRcdHZhciBzb3VyY2VFZGdlcywgbmV3RWRnZVZlcnRpY2VzLCBuZXdTb3VyY2VWZXJ0aWNlcztcblxuXHRcdG9sZFZlcnRpY2VzID0gZ2VvbWV0cnkudmVydGljZXM7IC8vIHsgeCwgeSwgen1cblx0XHRvbGRGYWNlcyA9IGdlb21ldHJ5LmZhY2VzOyAvLyB7IGE6IG9sZFZlcnRleDEsIGI6IG9sZFZlcnRleDIsIGM6IG9sZFZlcnRleDMgfVxuXHRcdG9sZFV2cyA9IGdlb21ldHJ5LmZhY2VWZXJ0ZXhVdnNbIDAgXTtcblxuXHRcdHZhciBoYXNVdnMgPSBvbGRVdnMgIT09IHVuZGVmaW5lZCAmJiBvbGRVdnMubGVuZ3RoID4gMDtcblxuXHRcdC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblx0XHQgKlxuXHRcdCAqIFN0ZXAgMDogUHJlcHJvY2VzcyBHZW9tZXRyeSB0byBHZW5lcmF0ZSBlZGdlcyBMb29rdXBcblx0XHQgKlxuXHRcdCAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdFx0bWV0YVZlcnRpY2VzID0gbmV3IEFycmF5KCBvbGRWZXJ0aWNlcy5sZW5ndGggKTtcblx0XHRzb3VyY2VFZGdlcyA9IHt9OyAvLyBFZGdlID0+IHsgb2xkVmVydGV4MSwgb2xkVmVydGV4MiwgZmFjZXNbXSAgfVxuXG5cdFx0Z2VuZXJhdGVMb29rdXBzKCBvbGRWZXJ0aWNlcywgb2xkRmFjZXMsIG1ldGFWZXJ0aWNlcywgc291cmNlRWRnZXMgKTtcblxuXG5cdFx0LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXHRcdCAqXG5cdFx0ICpcdFN0ZXAgMS5cblx0XHQgKlx0Rm9yIGVhY2ggZWRnZSwgY3JlYXRlIGEgbmV3IEVkZ2UgVmVydGV4LFxuXHRcdCAqXHR0aGVuIHBvc2l0aW9uIGl0LlxuXHRcdCAqXG5cdFx0ICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0XHRuZXdFZGdlVmVydGljZXMgPSBbXTtcblx0XHR2YXIgb3RoZXIsIGN1cnJlbnRFZGdlLCBuZXdFZGdlLCBmYWNlO1xuXHRcdHZhciBlZGdlVmVydGV4V2VpZ2h0LCBhZGphY2VudFZlcnRleFdlaWdodCwgY29ubmVjdGVkRmFjZXM7XG5cblx0XHRmb3IgKCBpIGluIHNvdXJjZUVkZ2VzICkge1xuXG5cdFx0XHRjdXJyZW50RWRnZSA9IHNvdXJjZUVkZ2VzWyBpIF07XG5cdFx0XHRuZXdFZGdlID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuXHRcdFx0ZWRnZVZlcnRleFdlaWdodCA9IDMgLyA4O1xuXHRcdFx0YWRqYWNlbnRWZXJ0ZXhXZWlnaHQgPSAxIC8gODtcblxuXHRcdFx0Y29ubmVjdGVkRmFjZXMgPSBjdXJyZW50RWRnZS5mYWNlcy5sZW5ndGg7XG5cblx0XHRcdC8vIGNoZWNrIGhvdyBtYW55IGxpbmtlZCBmYWNlcy4gMiBzaG91bGQgYmUgY29ycmVjdC5cblx0XHRcdGlmICggY29ubmVjdGVkRmFjZXMgIT0gMiApIHtcblxuXHRcdFx0XHQvLyBpZiBsZW5ndGggaXMgbm90IDIsIGhhbmRsZSBjb25kaXRpb25cblx0XHRcdFx0ZWRnZVZlcnRleFdlaWdodCA9IDAuNTtcblx0XHRcdFx0YWRqYWNlbnRWZXJ0ZXhXZWlnaHQgPSAwO1xuXG5cdFx0XHRcdGlmICggY29ubmVjdGVkRmFjZXMgIT0gMSApIHtcblxuXHRcdFx0XHRcdGlmICggV0FSTklOR1MgKSBjb25zb2xlLndhcm4oICdTdWJkaXZpc2lvbiBNb2RpZmllcjogTnVtYmVyIG9mIGNvbm5lY3RlZCBmYWNlcyAhPSAyLCBpczogJywgY29ubmVjdGVkRmFjZXMsIGN1cnJlbnRFZGdlICk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHRcdG5ld0VkZ2UuYWRkVmVjdG9ycyggY3VycmVudEVkZ2UuYSwgY3VycmVudEVkZ2UuYiApLm11bHRpcGx5U2NhbGFyKCBlZGdlVmVydGV4V2VpZ2h0ICk7XG5cblx0XHRcdHRtcC5zZXQoIDAsIDAsIDAgKTtcblxuXHRcdFx0Zm9yICggaiA9IDA7IGogPCBjb25uZWN0ZWRGYWNlczsgaiArKyApIHtcblxuXHRcdFx0XHRmYWNlID0gY3VycmVudEVkZ2UuZmFjZXNbIGogXTtcblxuXHRcdFx0XHRmb3IgKCBrID0gMDsgayA8IDM7IGsgKysgKSB7XG5cblx0XHRcdFx0XHRvdGhlciA9IG9sZFZlcnRpY2VzWyBmYWNlWyBBQkNbIGsgXSBdIF07XG5cdFx0XHRcdFx0aWYgKCBvdGhlciAhPT0gY3VycmVudEVkZ2UuYSAmJiBvdGhlciAhPT0gY3VycmVudEVkZ2UuYiApIGJyZWFrO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0bXAuYWRkKCBvdGhlciApO1xuXG5cdFx0XHR9XG5cblx0XHRcdHRtcC5tdWx0aXBseVNjYWxhciggYWRqYWNlbnRWZXJ0ZXhXZWlnaHQgKTtcblx0XHRcdG5ld0VkZ2UuYWRkKCB0bXAgKTtcblxuXHRcdFx0Y3VycmVudEVkZ2UubmV3RWRnZSA9IG5ld0VkZ2VWZXJ0aWNlcy5sZW5ndGg7XG5cdFx0XHRuZXdFZGdlVmVydGljZXMucHVzaCggbmV3RWRnZSApO1xuXG5cdFx0XHQvLyBjb25zb2xlLmxvZyhjdXJyZW50RWRnZSwgbmV3RWRnZSk7XG5cblx0XHR9XG5cblx0XHQvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cdFx0ICpcblx0XHQgKlx0U3RlcCAyLlxuXHRcdCAqXHRSZXBvc2l0aW9uIGVhY2ggc291cmNlIHZlcnRpY2VzLlxuXHRcdCAqXG5cdFx0ICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0XHR2YXIgYmV0YSwgc291cmNlVmVydGV4V2VpZ2h0LCBjb25uZWN0aW5nVmVydGV4V2VpZ2h0O1xuXHRcdHZhciBjb25uZWN0aW5nRWRnZSwgY29ubmVjdGluZ0VkZ2VzLCBvbGRWZXJ0ZXgsIG5ld1NvdXJjZVZlcnRleDtcblx0XHRuZXdTb3VyY2VWZXJ0aWNlcyA9IFtdO1xuXG5cdFx0Zm9yICggaSA9IDAsIGlsID0gb2xkVmVydGljZXMubGVuZ3RoOyBpIDwgaWw7IGkgKysgKSB7XG5cblx0XHRcdG9sZFZlcnRleCA9IG9sZFZlcnRpY2VzWyBpIF07XG5cblx0XHRcdC8vIGZpbmQgYWxsIGNvbm5lY3RpbmcgZWRnZXMgKHVzaW5nIGxvb2t1cFRhYmxlKVxuXHRcdFx0Y29ubmVjdGluZ0VkZ2VzID0gbWV0YVZlcnRpY2VzWyBpIF0uZWRnZXM7XG5cdFx0XHRuID0gY29ubmVjdGluZ0VkZ2VzLmxlbmd0aDtcblxuXHRcdFx0aWYgKCBuID09IDMgKSB7XG5cblx0XHRcdFx0YmV0YSA9IDMgLyAxNjtcblxuXHRcdFx0fSBlbHNlIGlmICggbiA+IDMgKSB7XG5cblx0XHRcdFx0YmV0YSA9IDMgLyAoIDggKiBuICk7IC8vIFdhcnJlbidzIG1vZGlmaWVkIGZvcm11bGFcblxuXHRcdFx0fVxuXG5cdFx0XHQvLyBMb29wJ3Mgb3JpZ2luYWwgYmV0YSBmb3JtdWxhXG5cdFx0XHQvLyBiZXRhID0gMSAvIG4gKiAoIDUvOCAtIE1hdGgucG93KCAzLzggKyAxLzQgKiBNYXRoLmNvcyggMiAqIE1hdGguIFBJIC8gbiApLCAyKSApO1xuXG5cdFx0XHRzb3VyY2VWZXJ0ZXhXZWlnaHQgPSAxIC0gbiAqIGJldGE7XG5cdFx0XHRjb25uZWN0aW5nVmVydGV4V2VpZ2h0ID0gYmV0YTtcblxuXHRcdFx0aWYgKCBuIDw9IDIgKSB7XG5cblx0XHRcdFx0Ly8gY3JlYXNlIGFuZCBib3VuZGFyeSBydWxlc1xuXHRcdFx0XHQvLyBjb25zb2xlLndhcm4oJ2NyZWFzZSBhbmQgYm91bmRhcnkgcnVsZXMnKTtcblxuXHRcdFx0XHRpZiAoIG4gPT0gMiApIHtcblxuXHRcdFx0XHRcdGlmICggV0FSTklOR1MgKSBjb25zb2xlLndhcm4oICcyIGNvbm5lY3RpbmcgZWRnZXMnLCBjb25uZWN0aW5nRWRnZXMgKTtcblx0XHRcdFx0XHRzb3VyY2VWZXJ0ZXhXZWlnaHQgPSAzIC8gNDtcblx0XHRcdFx0XHRjb25uZWN0aW5nVmVydGV4V2VpZ2h0ID0gMSAvIDg7XG5cblx0XHRcdFx0XHQvLyBzb3VyY2VWZXJ0ZXhXZWlnaHQgPSAxO1xuXHRcdFx0XHRcdC8vIGNvbm5lY3RpbmdWZXJ0ZXhXZWlnaHQgPSAwO1xuXG5cdFx0XHRcdH0gZWxzZSBpZiAoIG4gPT0gMSApIHtcblxuXHRcdFx0XHRcdGlmICggV0FSTklOR1MgKSBjb25zb2xlLndhcm4oICdvbmx5IDEgY29ubmVjdGluZyBlZGdlJyApO1xuXG5cdFx0XHRcdH0gZWxzZSBpZiAoIG4gPT0gMCApIHtcblxuXHRcdFx0XHRcdGlmICggV0FSTklOR1MgKSBjb25zb2xlLndhcm4oICcwIGNvbm5lY3RpbmcgZWRnZXMnICk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHRcdG5ld1NvdXJjZVZlcnRleCA9IG9sZFZlcnRleC5jbG9uZSgpLm11bHRpcGx5U2NhbGFyKCBzb3VyY2VWZXJ0ZXhXZWlnaHQgKTtcblxuXHRcdFx0dG1wLnNldCggMCwgMCwgMCApO1xuXG5cdFx0XHRmb3IgKCBqID0gMDsgaiA8IG47IGogKysgKSB7XG5cblx0XHRcdFx0Y29ubmVjdGluZ0VkZ2UgPSBjb25uZWN0aW5nRWRnZXNbIGogXTtcblx0XHRcdFx0b3RoZXIgPSBjb25uZWN0aW5nRWRnZS5hICE9PSBvbGRWZXJ0ZXggPyBjb25uZWN0aW5nRWRnZS5hIDogY29ubmVjdGluZ0VkZ2UuYjtcblx0XHRcdFx0dG1wLmFkZCggb3RoZXIgKTtcblxuXHRcdFx0fVxuXG5cdFx0XHR0bXAubXVsdGlwbHlTY2FsYXIoIGNvbm5lY3RpbmdWZXJ0ZXhXZWlnaHQgKTtcblx0XHRcdG5ld1NvdXJjZVZlcnRleC5hZGQoIHRtcCApO1xuXG5cdFx0XHRuZXdTb3VyY2VWZXJ0aWNlcy5wdXNoKCBuZXdTb3VyY2VWZXJ0ZXggKTtcblxuXHRcdH1cblxuXG5cdFx0LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXHRcdCAqXG5cdFx0ICpcdFN0ZXAgMy5cblx0XHQgKlx0R2VuZXJhdGUgRmFjZXMgYmV0d2VlbiBzb3VyY2UgdmVydGljZXNcblx0XHQgKlx0YW5kIGVkZ2UgdmVydGljZXMuXG5cdFx0ICpcblx0XHQgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXHRcdG5ld1ZlcnRpY2VzID0gbmV3U291cmNlVmVydGljZXMuY29uY2F0KCBuZXdFZGdlVmVydGljZXMgKTtcblx0XHR2YXIgc2wgPSBuZXdTb3VyY2VWZXJ0aWNlcy5sZW5ndGgsIGVkZ2UxLCBlZGdlMiwgZWRnZTM7XG5cdFx0bmV3RmFjZXMgPSBbXTtcblxuXHRcdHZhciB1diwgeDAsIHgxLCB4Mjtcblx0XHR2YXIgeDMgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXHRcdHZhciB4NCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cdFx0dmFyIHg1ID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblxuXHRcdGZvciAoIGkgPSAwLCBpbCA9IG9sZEZhY2VzLmxlbmd0aDsgaSA8IGlsOyBpICsrICkge1xuXG5cdFx0XHRmYWNlID0gb2xkRmFjZXNbIGkgXTtcblxuXHRcdFx0Ly8gZmluZCB0aGUgMyBuZXcgZWRnZXMgdmVydGV4IG9mIGVhY2ggb2xkIGZhY2VcblxuXHRcdFx0ZWRnZTEgPSBnZXRFZGdlKCBmYWNlLmEsIGZhY2UuYiwgc291cmNlRWRnZXMgKS5uZXdFZGdlICsgc2w7XG5cdFx0XHRlZGdlMiA9IGdldEVkZ2UoIGZhY2UuYiwgZmFjZS5jLCBzb3VyY2VFZGdlcyApLm5ld0VkZ2UgKyBzbDtcblx0XHRcdGVkZ2UzID0gZ2V0RWRnZSggZmFjZS5jLCBmYWNlLmEsIHNvdXJjZUVkZ2VzICkubmV3RWRnZSArIHNsO1xuXG5cdFx0XHQvLyBjcmVhdGUgNCBmYWNlcy5cblxuXHRcdFx0bmV3RmFjZSggbmV3RmFjZXMsIGVkZ2UxLCBlZGdlMiwgZWRnZTMgKTtcblx0XHRcdG5ld0ZhY2UoIG5ld0ZhY2VzLCBmYWNlLmEsIGVkZ2UxLCBlZGdlMyApO1xuXHRcdFx0bmV3RmFjZSggbmV3RmFjZXMsIGZhY2UuYiwgZWRnZTIsIGVkZ2UxICk7XG5cdFx0XHRuZXdGYWNlKCBuZXdGYWNlcywgZmFjZS5jLCBlZGdlMywgZWRnZTIgKTtcblxuXHRcdFx0Ly8gY3JlYXRlIDQgbmV3IHV2J3NcblxuXHRcdFx0aWYgKCBoYXNVdnMgKSB7XG5cblx0XHRcdFx0dXYgPSBvbGRVdnNbIGkgXTtcblxuXHRcdFx0XHR4MCA9IHV2WyAwIF07XG5cdFx0XHRcdHgxID0gdXZbIDEgXTtcblx0XHRcdFx0eDIgPSB1dlsgMiBdO1xuXG5cdFx0XHRcdHgzLnNldCggbWlkcG9pbnQoIHgwLngsIHgxLnggKSwgbWlkcG9pbnQoIHgwLnksIHgxLnkgKSApO1xuXHRcdFx0XHR4NC5zZXQoIG1pZHBvaW50KCB4MS54LCB4Mi54ICksIG1pZHBvaW50KCB4MS55LCB4Mi55ICkgKTtcblx0XHRcdFx0eDUuc2V0KCBtaWRwb2ludCggeDAueCwgeDIueCApLCBtaWRwb2ludCggeDAueSwgeDIueSApICk7XG5cblx0XHRcdFx0bmV3VXYoIG5ld1VWcywgeDMsIHg0LCB4NSApO1xuXHRcdFx0XHRuZXdVdiggbmV3VVZzLCB4MCwgeDMsIHg1ICk7XG5cblx0XHRcdFx0bmV3VXYoIG5ld1VWcywgeDEsIHg0LCB4MyApO1xuXHRcdFx0XHRuZXdVdiggbmV3VVZzLCB4MiwgeDUsIHg0ICk7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdC8vIE92ZXJ3cml0ZSBvbGQgYXJyYXlzXG5cdFx0Z2VvbWV0cnkudmVydGljZXMgPSBuZXdWZXJ0aWNlcztcblx0XHRnZW9tZXRyeS5mYWNlcyA9IG5ld0ZhY2VzO1xuXHRcdGlmICggaGFzVXZzICkgZ2VvbWV0cnkuZmFjZVZlcnRleFV2c1sgMCBdID0gbmV3VVZzO1xuXG5cdFx0Ly8gY29uc29sZS5sb2coJ2RvbmUnKTtcblxuXHR9O1xuXG59ICkoKTtcbiIsInZhciBzdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nXG5cbm1vZHVsZS5leHBvcnRzID0gYW5BcnJheVxuXG5mdW5jdGlvbiBhbkFycmF5KGFycikge1xuICByZXR1cm4gKFxuICAgICAgIGFyci5CWVRFU19QRVJfRUxFTUVOVFxuICAgICYmIHN0ci5jYWxsKGFyci5idWZmZXIpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nXG4gICAgfHwgQXJyYXkuaXNBcnJheShhcnIpXG4gIClcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbnVtdHlwZShudW0sIGRlZikge1xuXHRyZXR1cm4gdHlwZW9mIG51bSA9PT0gJ251bWJlcidcblx0XHQ/IG51bSBcblx0XHQ6ICh0eXBlb2YgZGVmID09PSAnbnVtYmVyJyA/IGRlZiA6IDApXG59IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkdHlwZSkge1xuICBzd2l0Y2ggKGR0eXBlKSB7XG4gICAgY2FzZSAnaW50OCc6XG4gICAgICByZXR1cm4gSW50OEFycmF5XG4gICAgY2FzZSAnaW50MTYnOlxuICAgICAgcmV0dXJuIEludDE2QXJyYXlcbiAgICBjYXNlICdpbnQzMic6XG4gICAgICByZXR1cm4gSW50MzJBcnJheVxuICAgIGNhc2UgJ3VpbnQ4JzpcbiAgICAgIHJldHVybiBVaW50OEFycmF5XG4gICAgY2FzZSAndWludDE2JzpcbiAgICAgIHJldHVybiBVaW50MTZBcnJheVxuICAgIGNhc2UgJ3VpbnQzMic6XG4gICAgICByZXR1cm4gVWludDMyQXJyYXlcbiAgICBjYXNlICdmbG9hdDMyJzpcbiAgICAgIHJldHVybiBGbG9hdDMyQXJyYXlcbiAgICBjYXNlICdmbG9hdDY0JzpcbiAgICAgIHJldHVybiBGbG9hdDY0QXJyYXlcbiAgICBjYXNlICdhcnJheSc6XG4gICAgICByZXR1cm4gQXJyYXlcbiAgICBjYXNlICd1aW50OF9jbGFtcGVkJzpcbiAgICAgIHJldHVybiBVaW50OENsYW1wZWRBcnJheVxuICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICB0aGlzLl9ldmVudHMgPSB0aGlzLl9ldmVudHMgfHwge307XG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbkV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uKG4pIHtcbiAgaWYgKCFpc051bWJlcihuKSB8fCBuIDwgMCB8fCBpc05hTihuKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ24gbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlcicpO1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGVyLCBoYW5kbGVyLCBsZW4sIGFyZ3MsIGksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmICh0eXBlID09PSAnZXJyb3InKSB7XG4gICAgaWYgKCF0aGlzLl9ldmVudHMuZXJyb3IgfHxcbiAgICAgICAgKGlzT2JqZWN0KHRoaXMuX2V2ZW50cy5lcnJvcikgJiYgIXRoaXMuX2V2ZW50cy5lcnJvci5sZW5ndGgpKSB7XG4gICAgICBlciA9IGFyZ3VtZW50c1sxXTtcbiAgICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmNhdWdodCwgdW5zcGVjaWZpZWQgXCJlcnJvclwiIGV2ZW50LiAoJyArIGVyICsgJyknKTtcbiAgICAgICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzVW5kZWZpbmVkKGhhbmRsZXIpKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAoaXNGdW5jdGlvbihoYW5kbGVyKSkge1xuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgLy8gZmFzdCBjYXNlc1xuICAgICAgY2FzZSAxOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gc2xvd2VyXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgaGFuZGxlci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNPYmplY3QoaGFuZGxlcikpIHtcbiAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICBsaXN0ZW5lcnMgPSBoYW5kbGVyLnNsaWNlKCk7XG4gICAgbGVuID0gbGlzdGVuZXJzLmxlbmd0aDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspXG4gICAgICBsaXN0ZW5lcnNbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICBpZiAodGhpcy5fZXZlbnRzLm5ld0xpc3RlbmVyKVxuICAgIHRoaXMuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICBpc0Z1bmN0aW9uKGxpc3RlbmVyLmxpc3RlbmVyKSA/XG4gICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICBlbHNlIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG4gIGVsc2VcbiAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBbdGhpcy5fZXZlbnRzW3R5cGVdLCBsaXN0ZW5lcl07XG5cbiAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkgJiYgIXRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQpIHtcbiAgICBpZiAoIWlzVW5kZWZpbmVkKHRoaXMuX21heExpc3RlbmVycykpIHtcbiAgICAgIG0gPSB0aGlzLl9tYXhMaXN0ZW5lcnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgICB9XG5cbiAgICBpZiAobSAmJiBtID4gMCAmJiB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoID4gbSkge1xuICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCA9IHRydWU7XG4gICAgICBjb25zb2xlLmVycm9yKCcobm9kZSkgd2FybmluZzogcG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2xlYWsgZGV0ZWN0ZWQuICVkIGxpc3RlbmVycyBhZGRlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICdVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byBpbmNyZWFzZSBsaW1pdC4nLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoKTtcbiAgICAgIGlmICh0eXBlb2YgY29uc29sZS50cmFjZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBub3Qgc3VwcG9ydGVkIGluIElFIDEwXG4gICAgICAgIGNvbnNvbGUudHJhY2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgdmFyIGZpcmVkID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gZygpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGcpO1xuXG4gICAgaWYgKCFmaXJlZCkge1xuICAgICAgZmlyZWQgPSB0cnVlO1xuICAgICAgbGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cblxuICBnLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHRoaXMub24odHlwZSwgZyk7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBlbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWZmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZFxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBsaXN0LCBwb3NpdGlvbiwgbGVuZ3RoLCBpO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIGxpc3QgPSB0aGlzLl9ldmVudHNbdHlwZV07XG4gIGxlbmd0aCA9IGxpc3QubGVuZ3RoO1xuICBwb3NpdGlvbiA9IC0xO1xuXG4gIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fFxuICAgICAgKGlzRnVuY3Rpb24obGlzdC5saXN0ZW5lcikgJiYgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcblxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGxpc3QpKSB7XG4gICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gPiAwOykge1xuICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8XG4gICAgICAgICAgKGxpc3RbaV0ubGlzdGVuZXIgJiYgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgICBsaXN0Lmxlbmd0aCA9IDA7XG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0LnNwbGljZShwb3NpdGlvbiwgMSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIga2V5LCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICBpZiAoIXRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgZWxzZSBpZiAodGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIGZvciAoa2V5IGluIHRoaXMuX2V2ZW50cykge1xuICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgIH1cbiAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNGdW5jdGlvbihsaXN0ZW5lcnMpKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICB9IGVsc2UgaWYgKGxpc3RlbmVycykge1xuICAgIC8vIExJRk8gb3JkZXJcbiAgICB3aGlsZSAobGlzdGVuZXJzLmxlbmd0aClcbiAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2xpc3RlbmVycy5sZW5ndGggLSAxXSk7XG4gIH1cbiAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgcmV0O1xuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldCA9IFtdO1xuICBlbHNlIGlmIChpc0Z1bmN0aW9uKHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgcmV0ID0gW3RoaXMuX2V2ZW50c1t0eXBlXV07XG4gIGVsc2VcbiAgICByZXQgPSB0aGlzLl9ldmVudHNbdHlwZV0uc2xpY2UoKTtcbiAgcmV0dXJuIHJldDtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgaWYgKHRoaXMuX2V2ZW50cykge1xuICAgIHZhciBldmxpc3RlbmVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKGlzRnVuY3Rpb24oZXZsaXN0ZW5lcikpXG4gICAgICByZXR1cm4gMTtcbiAgICBlbHNlIGlmIChldmxpc3RlbmVyKVxuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICB9XG4gIHJldHVybiAwO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG59O1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09PSB2b2lkIDA7XG59XG4iLCIvKmVzbGludCBuZXctY2FwOjAqL1xudmFyIGR0eXBlID0gcmVxdWlyZSgnZHR5cGUnKVxubW9kdWxlLmV4cG9ydHMgPSBmbGF0dGVuVmVydGV4RGF0YVxuZnVuY3Rpb24gZmxhdHRlblZlcnRleERhdGEgKGRhdGEsIG91dHB1dCwgb2Zmc2V0KSB7XG4gIGlmICghZGF0YSkgdGhyb3cgbmV3IFR5cGVFcnJvcignbXVzdCBzcGVjaWZ5IGRhdGEgYXMgZmlyc3QgcGFyYW1ldGVyJylcbiAgb2Zmc2V0ID0gKyhvZmZzZXQgfHwgMCkgfCAwXG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkgJiYgQXJyYXkuaXNBcnJheShkYXRhWzBdKSkge1xuICAgIHZhciBkaW0gPSBkYXRhWzBdLmxlbmd0aFxuICAgIHZhciBsZW5ndGggPSBkYXRhLmxlbmd0aCAqIGRpbVxuXG4gICAgLy8gbm8gb3V0cHV0IHNwZWNpZmllZCwgY3JlYXRlIGEgbmV3IHR5cGVkIGFycmF5XG4gICAgaWYgKCFvdXRwdXQgfHwgdHlwZW9mIG91dHB1dCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIG91dHB1dCA9IG5ldyAoZHR5cGUob3V0cHV0IHx8ICdmbG9hdDMyJykpKGxlbmd0aCArIG9mZnNldClcbiAgICB9XG5cbiAgICB2YXIgZHN0TGVuZ3RoID0gb3V0cHV0Lmxlbmd0aCAtIG9mZnNldFxuICAgIGlmIChsZW5ndGggIT09IGRzdExlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdzb3VyY2UgbGVuZ3RoICcgKyBsZW5ndGggKyAnICgnICsgZGltICsgJ3gnICsgZGF0YS5sZW5ndGggKyAnKScgK1xuICAgICAgICAnIGRvZXMgbm90IG1hdGNoIGRlc3RpbmF0aW9uIGxlbmd0aCAnICsgZHN0TGVuZ3RoKVxuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwLCBrID0gb2Zmc2V0OyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkaW07IGorKykge1xuICAgICAgICBvdXRwdXRbaysrXSA9IGRhdGFbaV1bal1cbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKCFvdXRwdXQgfHwgdHlwZW9mIG91dHB1dCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIG5vIG91dHB1dCwgY3JlYXRlIGEgbmV3IG9uZVxuICAgICAgdmFyIEN0b3IgPSBkdHlwZShvdXRwdXQgfHwgJ2Zsb2F0MzInKVxuICAgICAgaWYgKG9mZnNldCA9PT0gMCkge1xuICAgICAgICBvdXRwdXQgPSBuZXcgQ3RvcihkYXRhKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3V0cHV0ID0gbmV3IEN0b3IoZGF0YS5sZW5ndGggKyBvZmZzZXQpXG4gICAgICAgIG91dHB1dC5zZXQoZGF0YSwgb2Zmc2V0KVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBzdG9yZSBvdXRwdXQgaW4gZXhpc3RpbmcgYXJyYXlcbiAgICAgIG91dHB1dC5zZXQoZGF0YSwgb2Zmc2V0KVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvdXRwdXRcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tcGlsZShwcm9wZXJ0eSkge1xuXHRpZiAoIXByb3BlcnR5IHx8IHR5cGVvZiBwcm9wZXJ0eSAhPT0gJ3N0cmluZycpXG5cdFx0dGhyb3cgbmV3IEVycm9yKCdtdXN0IHNwZWNpZnkgcHJvcGVydHkgZm9yIGluZGV4b2Ygc2VhcmNoJylcblxuXHRyZXR1cm4gbmV3IEZ1bmN0aW9uKCdhcnJheScsICd2YWx1ZScsICdzdGFydCcsIFtcblx0XHQnc3RhcnQgPSBzdGFydCB8fCAwJyxcblx0XHQnZm9yICh2YXIgaT1zdGFydDsgaTxhcnJheS5sZW5ndGg7IGkrKyknLFxuXHRcdCcgIGlmIChhcnJheVtpXVtcIicgKyBwcm9wZXJ0eSArJ1wiXSA9PT0gdmFsdWUpJyxcblx0XHQnICAgICAgcmV0dXJuIGknLFxuXHRcdCdyZXR1cm4gLTEnXG5cdF0uam9pbignXFxuJykpXG59IiwiaWYgKHR5cGVvZiBPYmplY3QuY3JlYXRlID09PSAnZnVuY3Rpb24nKSB7XG4gIC8vIGltcGxlbWVudGF0aW9uIGZyb20gc3RhbmRhcmQgbm9kZS5qcyAndXRpbCcgbW9kdWxlXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5oZXJpdHMoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3JcbiAgICBjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDdG9yLnByb3RvdHlwZSwge1xuICAgICAgY29uc3RydWN0b3I6IHtcbiAgICAgICAgdmFsdWU6IGN0b3IsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9XG4gICAgfSk7XG4gIH07XG59IGVsc2Uge1xuICAvLyBvbGQgc2Nob29sIHNoaW0gZm9yIG9sZCBicm93c2Vyc1xuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgdmFyIFRlbXBDdG9yID0gZnVuY3Rpb24gKCkge31cbiAgICBUZW1wQ3Rvci5wcm90b3R5cGUgPSBzdXBlckN0b3IucHJvdG90eXBlXG4gICAgY3Rvci5wcm90b3R5cGUgPSBuZXcgVGVtcEN0b3IoKVxuICAgIGN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY3RvclxuICB9XG59XG4iLCIvKiFcbiAqIERldGVybWluZSBpZiBhbiBvYmplY3QgaXMgYSBCdWZmZXJcbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8ZmVyb3NzQGZlcm9zcy5vcmc+IDxodHRwOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuXG4vLyBUaGUgX2lzQnVmZmVyIGNoZWNrIGlzIGZvciBTYWZhcmkgNS03IHN1cHBvcnQsIGJlY2F1c2UgaXQncyBtaXNzaW5nXG4vLyBPYmplY3QucHJvdG90eXBlLmNvbnN0cnVjdG9yLiBSZW1vdmUgdGhpcyBldmVudHVhbGx5XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAhPSBudWxsICYmIChpc0J1ZmZlcihvYmopIHx8IGlzU2xvd0J1ZmZlcihvYmopIHx8ICEhb2JqLl9pc0J1ZmZlcilcbn1cblxuZnVuY3Rpb24gaXNCdWZmZXIgKG9iaikge1xuICByZXR1cm4gISFvYmouY29uc3RydWN0b3IgJiYgdHlwZW9mIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIob2JqKVxufVxuXG4vLyBGb3IgTm9kZSB2MC4xMCBzdXBwb3J0LiBSZW1vdmUgdGhpcyBldmVudHVhbGx5LlxuZnVuY3Rpb24gaXNTbG93QnVmZmVyIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmoucmVhZEZsb2F0TEUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIG9iai5zbGljZSA9PT0gJ2Z1bmN0aW9uJyAmJiBpc0J1ZmZlcihvYmouc2xpY2UoMCwgMCkpXG59XG4iLCJ2YXIgd29yZFdyYXAgPSByZXF1aXJlKCd3b3JkLXdyYXBwZXInKVxudmFyIHh0ZW5kID0gcmVxdWlyZSgneHRlbmQnKVxudmFyIGZpbmRDaGFyID0gcmVxdWlyZSgnaW5kZXhvZi1wcm9wZXJ0eScpKCdpZCcpXG52YXIgbnVtYmVyID0gcmVxdWlyZSgnYXMtbnVtYmVyJylcblxudmFyIFhfSEVJR0hUUyA9IFsneCcsICdlJywgJ2EnLCAnbycsICduJywgJ3MnLCAncicsICdjJywgJ3UnLCAnbScsICd2JywgJ3cnLCAneiddXG52YXIgTV9XSURUSFMgPSBbJ20nLCAndyddXG52YXIgQ0FQX0hFSUdIVFMgPSBbJ0gnLCAnSScsICdOJywgJ0UnLCAnRicsICdLJywgJ0wnLCAnVCcsICdVJywgJ1YnLCAnVycsICdYJywgJ1knLCAnWiddXG5cblxudmFyIFRBQl9JRCA9ICdcXHQnLmNoYXJDb2RlQXQoMClcbnZhciBTUEFDRV9JRCA9ICcgJy5jaGFyQ29kZUF0KDApXG52YXIgQUxJR05fTEVGVCA9IDAsIFxuICAgIEFMSUdOX0NFTlRFUiA9IDEsIFxuICAgIEFMSUdOX1JJR0hUID0gMlxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZUxheW91dChvcHQpIHtcbiAgcmV0dXJuIG5ldyBUZXh0TGF5b3V0KG9wdClcbn1cblxuZnVuY3Rpb24gVGV4dExheW91dChvcHQpIHtcbiAgdGhpcy5nbHlwaHMgPSBbXVxuICB0aGlzLl9tZWFzdXJlID0gdGhpcy5jb21wdXRlTWV0cmljcy5iaW5kKHRoaXMpXG4gIHRoaXMudXBkYXRlKG9wdClcbn1cblxuVGV4dExheW91dC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24ob3B0KSB7XG4gIG9wdCA9IHh0ZW5kKHtcbiAgICBtZWFzdXJlOiB0aGlzLl9tZWFzdXJlXG4gIH0sIG9wdClcbiAgdGhpcy5fb3B0ID0gb3B0XG4gIHRoaXMuX29wdC50YWJTaXplID0gbnVtYmVyKHRoaXMuX29wdC50YWJTaXplLCA0KVxuXG4gIGlmICghb3B0LmZvbnQpXG4gICAgdGhyb3cgbmV3IEVycm9yKCdtdXN0IHByb3ZpZGUgYSB2YWxpZCBiaXRtYXAgZm9udCcpXG5cbiAgdmFyIGdseXBocyA9IHRoaXMuZ2x5cGhzXG4gIHZhciB0ZXh0ID0gb3B0LnRleHR8fCcnIFxuICB2YXIgZm9udCA9IG9wdC5mb250XG4gIHRoaXMuX3NldHVwU3BhY2VHbHlwaHMoZm9udClcbiAgXG4gIHZhciBsaW5lcyA9IHdvcmRXcmFwLmxpbmVzKHRleHQsIG9wdClcbiAgdmFyIG1pbldpZHRoID0gb3B0LndpZHRoIHx8IDBcblxuICAvL2NsZWFyIGdseXBoc1xuICBnbHlwaHMubGVuZ3RoID0gMFxuXG4gIC8vZ2V0IG1heCBsaW5lIHdpZHRoXG4gIHZhciBtYXhMaW5lV2lkdGggPSBsaW5lcy5yZWR1Y2UoZnVuY3Rpb24ocHJldiwgbGluZSkge1xuICAgIHJldHVybiBNYXRoLm1heChwcmV2LCBsaW5lLndpZHRoLCBtaW5XaWR0aClcbiAgfSwgMClcblxuICAvL3RoZSBwZW4gcG9zaXRpb25cbiAgdmFyIHggPSAwXG4gIHZhciB5ID0gMFxuICB2YXIgbGluZUhlaWdodCA9IG51bWJlcihvcHQubGluZUhlaWdodCwgZm9udC5jb21tb24ubGluZUhlaWdodClcbiAgdmFyIGJhc2VsaW5lID0gZm9udC5jb21tb24uYmFzZVxuICB2YXIgZGVzY2VuZGVyID0gbGluZUhlaWdodC1iYXNlbGluZVxuICB2YXIgbGV0dGVyU3BhY2luZyA9IG9wdC5sZXR0ZXJTcGFjaW5nIHx8IDBcbiAgdmFyIGhlaWdodCA9IGxpbmVIZWlnaHQgKiBsaW5lcy5sZW5ndGggLSBkZXNjZW5kZXJcbiAgdmFyIGFsaWduID0gZ2V0QWxpZ25UeXBlKHRoaXMuX29wdC5hbGlnbilcblxuICAvL2RyYXcgdGV4dCBhbG9uZyBiYXNlbGluZVxuICB5IC09IGhlaWdodFxuICBcbiAgLy90aGUgbWV0cmljcyBmb3IgdGhpcyB0ZXh0IGxheW91dFxuICB0aGlzLl93aWR0aCA9IG1heExpbmVXaWR0aFxuICB0aGlzLl9oZWlnaHQgPSBoZWlnaHRcbiAgdGhpcy5fZGVzY2VuZGVyID0gbGluZUhlaWdodCAtIGJhc2VsaW5lXG4gIHRoaXMuX2Jhc2VsaW5lID0gYmFzZWxpbmVcbiAgdGhpcy5feEhlaWdodCA9IGdldFhIZWlnaHQoZm9udClcbiAgdGhpcy5fY2FwSGVpZ2h0ID0gZ2V0Q2FwSGVpZ2h0KGZvbnQpXG4gIHRoaXMuX2xpbmVIZWlnaHQgPSBsaW5lSGVpZ2h0XG4gIHRoaXMuX2FzY2VuZGVyID0gbGluZUhlaWdodCAtIGRlc2NlbmRlciAtIHRoaXMuX3hIZWlnaHRcbiAgICBcbiAgLy9sYXlvdXQgZWFjaCBnbHlwaFxuICB2YXIgc2VsZiA9IHRoaXNcbiAgbGluZXMuZm9yRWFjaChmdW5jdGlvbihsaW5lLCBsaW5lSW5kZXgpIHtcbiAgICB2YXIgc3RhcnQgPSBsaW5lLnN0YXJ0XG4gICAgdmFyIGVuZCA9IGxpbmUuZW5kXG4gICAgdmFyIGxpbmVXaWR0aCA9IGxpbmUud2lkdGhcbiAgICB2YXIgbGFzdEdseXBoXG4gICAgXG4gICAgLy9mb3IgZWFjaCBnbHlwaCBpbiB0aGF0IGxpbmUuLi5cbiAgICBmb3IgKHZhciBpPXN0YXJ0OyBpPGVuZDsgaSsrKSB7XG4gICAgICB2YXIgaWQgPSB0ZXh0LmNoYXJDb2RlQXQoaSlcbiAgICAgIHZhciBnbHlwaCA9IHNlbGYuZ2V0R2x5cGgoZm9udCwgaWQpXG4gICAgICBpZiAoZ2x5cGgpIHtcbiAgICAgICAgaWYgKGxhc3RHbHlwaCkgXG4gICAgICAgICAgeCArPSBnZXRLZXJuaW5nKGZvbnQsIGxhc3RHbHlwaC5pZCwgZ2x5cGguaWQpXG5cbiAgICAgICAgdmFyIHR4ID0geFxuICAgICAgICBpZiAoYWxpZ24gPT09IEFMSUdOX0NFTlRFUikgXG4gICAgICAgICAgdHggKz0gKG1heExpbmVXaWR0aC1saW5lV2lkdGgpLzJcbiAgICAgICAgZWxzZSBpZiAoYWxpZ24gPT09IEFMSUdOX1JJR0hUKVxuICAgICAgICAgIHR4ICs9IChtYXhMaW5lV2lkdGgtbGluZVdpZHRoKVxuXG4gICAgICAgIGdseXBocy5wdXNoKHtcbiAgICAgICAgICBwb3NpdGlvbjogW3R4LCB5XSxcbiAgICAgICAgICBkYXRhOiBnbHlwaCxcbiAgICAgICAgICBpbmRleDogaSxcbiAgICAgICAgICBsaW5lOiBsaW5lSW5kZXhcbiAgICAgICAgfSkgIFxuXG4gICAgICAgIC8vbW92ZSBwZW4gZm9yd2FyZFxuICAgICAgICB4ICs9IGdseXBoLnhhZHZhbmNlICsgbGV0dGVyU3BhY2luZ1xuICAgICAgICBsYXN0R2x5cGggPSBnbHlwaFxuICAgICAgfVxuICAgIH1cblxuICAgIC8vbmV4dCBsaW5lIGRvd25cbiAgICB5ICs9IGxpbmVIZWlnaHRcbiAgICB4ID0gMFxuICB9KVxuICB0aGlzLl9saW5lc1RvdGFsID0gbGluZXMubGVuZ3RoO1xufVxuXG5UZXh0TGF5b3V0LnByb3RvdHlwZS5fc2V0dXBTcGFjZUdseXBocyA9IGZ1bmN0aW9uKGZvbnQpIHtcbiAgLy9UaGVzZSBhcmUgZmFsbGJhY2tzLCB3aGVuIHRoZSBmb250IGRvZXNuJ3QgaW5jbHVkZVxuICAvLycgJyBvciAnXFx0JyBnbHlwaHNcbiAgdGhpcy5fZmFsbGJhY2tTcGFjZUdseXBoID0gbnVsbFxuICB0aGlzLl9mYWxsYmFja1RhYkdseXBoID0gbnVsbFxuXG4gIGlmICghZm9udC5jaGFycyB8fCBmb250LmNoYXJzLmxlbmd0aCA9PT0gMClcbiAgICByZXR1cm5cblxuICAvL3RyeSB0byBnZXQgc3BhY2UgZ2x5cGhcbiAgLy90aGVuIGZhbGwgYmFjayB0byB0aGUgJ20nIG9yICd3JyBnbHlwaHNcbiAgLy90aGVuIGZhbGwgYmFjayB0byB0aGUgZmlyc3QgZ2x5cGggYXZhaWxhYmxlXG4gIHZhciBzcGFjZSA9IGdldEdseXBoQnlJZChmb250LCBTUEFDRV9JRCkgXG4gICAgICAgICAgfHwgZ2V0TUdseXBoKGZvbnQpIFxuICAgICAgICAgIHx8IGZvbnQuY2hhcnNbMF1cblxuICAvL2FuZCBjcmVhdGUgYSBmYWxsYmFjayBmb3IgdGFiXG4gIHZhciB0YWJXaWR0aCA9IHRoaXMuX29wdC50YWJTaXplICogc3BhY2UueGFkdmFuY2VcbiAgdGhpcy5fZmFsbGJhY2tTcGFjZUdseXBoID0gc3BhY2VcbiAgdGhpcy5fZmFsbGJhY2tUYWJHbHlwaCA9IHh0ZW5kKHNwYWNlLCB7XG4gICAgeDogMCwgeTogMCwgeGFkdmFuY2U6IHRhYldpZHRoLCBpZDogVEFCX0lELCBcbiAgICB4b2Zmc2V0OiAwLCB5b2Zmc2V0OiAwLCB3aWR0aDogMCwgaGVpZ2h0OiAwXG4gIH0pXG59XG5cblRleHRMYXlvdXQucHJvdG90eXBlLmdldEdseXBoID0gZnVuY3Rpb24oZm9udCwgaWQpIHtcbiAgdmFyIGdseXBoID0gZ2V0R2x5cGhCeUlkKGZvbnQsIGlkKVxuICBpZiAoZ2x5cGgpXG4gICAgcmV0dXJuIGdseXBoXG4gIGVsc2UgaWYgKGlkID09PSBUQUJfSUQpIFxuICAgIHJldHVybiB0aGlzLl9mYWxsYmFja1RhYkdseXBoXG4gIGVsc2UgaWYgKGlkID09PSBTUEFDRV9JRCkgXG4gICAgcmV0dXJuIHRoaXMuX2ZhbGxiYWNrU3BhY2VHbHlwaFxuICByZXR1cm4gbnVsbFxufVxuXG5UZXh0TGF5b3V0LnByb3RvdHlwZS5jb21wdXRlTWV0cmljcyA9IGZ1bmN0aW9uKHRleHQsIHN0YXJ0LCBlbmQsIHdpZHRoKSB7XG4gIHZhciBsZXR0ZXJTcGFjaW5nID0gdGhpcy5fb3B0LmxldHRlclNwYWNpbmcgfHwgMFxuICB2YXIgZm9udCA9IHRoaXMuX29wdC5mb250XG4gIHZhciBjdXJQZW4gPSAwXG4gIHZhciBjdXJXaWR0aCA9IDBcbiAgdmFyIGNvdW50ID0gMFxuICB2YXIgZ2x5cGhcbiAgdmFyIGxhc3RHbHlwaFxuXG4gIGlmICghZm9udC5jaGFycyB8fCBmb250LmNoYXJzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB7XG4gICAgICBzdGFydDogc3RhcnQsXG4gICAgICBlbmQ6IHN0YXJ0LFxuICAgICAgd2lkdGg6IDBcbiAgICB9XG4gIH1cblxuICBlbmQgPSBNYXRoLm1pbih0ZXh0Lmxlbmd0aCwgZW5kKVxuICBmb3IgKHZhciBpPXN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICB2YXIgaWQgPSB0ZXh0LmNoYXJDb2RlQXQoaSlcbiAgICB2YXIgZ2x5cGggPSB0aGlzLmdldEdseXBoKGZvbnQsIGlkKVxuXG4gICAgaWYgKGdseXBoKSB7XG4gICAgICAvL21vdmUgcGVuIGZvcndhcmRcbiAgICAgIHZhciB4b2ZmID0gZ2x5cGgueG9mZnNldFxuICAgICAgdmFyIGtlcm4gPSBsYXN0R2x5cGggPyBnZXRLZXJuaW5nKGZvbnQsIGxhc3RHbHlwaC5pZCwgZ2x5cGguaWQpIDogMFxuICAgICAgY3VyUGVuICs9IGtlcm5cblxuICAgICAgdmFyIG5leHRQZW4gPSBjdXJQZW4gKyBnbHlwaC54YWR2YW5jZSArIGxldHRlclNwYWNpbmdcbiAgICAgIHZhciBuZXh0V2lkdGggPSBjdXJQZW4gKyBnbHlwaC53aWR0aFxuXG4gICAgICAvL3dlJ3ZlIGhpdCBvdXIgbGltaXQ7IHdlIGNhbid0IG1vdmUgb250byB0aGUgbmV4dCBnbHlwaFxuICAgICAgaWYgKG5leHRXaWR0aCA+PSB3aWR0aCB8fCBuZXh0UGVuID49IHdpZHRoKVxuICAgICAgICBicmVha1xuXG4gICAgICAvL290aGVyd2lzZSBjb250aW51ZSBhbG9uZyBvdXIgbGluZVxuICAgICAgY3VyUGVuID0gbmV4dFBlblxuICAgICAgY3VyV2lkdGggPSBuZXh0V2lkdGhcbiAgICAgIGxhc3RHbHlwaCA9IGdseXBoXG4gICAgfVxuICAgIGNvdW50KytcbiAgfVxuICBcbiAgLy9tYWtlIHN1cmUgcmlnaHRtb3N0IGVkZ2UgbGluZXMgdXAgd2l0aCByZW5kZXJlZCBnbHlwaHNcbiAgaWYgKGxhc3RHbHlwaClcbiAgICBjdXJXaWR0aCArPSBsYXN0R2x5cGgueG9mZnNldFxuXG4gIHJldHVybiB7XG4gICAgc3RhcnQ6IHN0YXJ0LFxuICAgIGVuZDogc3RhcnQgKyBjb3VudCxcbiAgICB3aWR0aDogY3VyV2lkdGhcbiAgfVxufVxuXG4vL2dldHRlcnMgZm9yIHRoZSBwcml2YXRlIHZhcnNcbjtbJ3dpZHRoJywgJ2hlaWdodCcsIFxuICAnZGVzY2VuZGVyJywgJ2FzY2VuZGVyJyxcbiAgJ3hIZWlnaHQnLCAnYmFzZWxpbmUnLFxuICAnY2FwSGVpZ2h0JyxcbiAgJ2xpbmVIZWlnaHQnIF0uZm9yRWFjaChhZGRHZXR0ZXIpXG5cbmZ1bmN0aW9uIGFkZEdldHRlcihuYW1lKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUZXh0TGF5b3V0LnByb3RvdHlwZSwgbmFtZSwge1xuICAgIGdldDogd3JhcHBlcihuYW1lKSxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSlcbn1cblxuLy9jcmVhdGUgbG9va3VwcyBmb3IgcHJpdmF0ZSB2YXJzXG5mdW5jdGlvbiB3cmFwcGVyKG5hbWUpIHtcbiAgcmV0dXJuIChuZXcgRnVuY3Rpb24oW1xuICAgICdyZXR1cm4gZnVuY3Rpb24gJytuYW1lKycoKSB7JyxcbiAgICAnICByZXR1cm4gdGhpcy5fJytuYW1lLFxuICAgICd9J1xuICBdLmpvaW4oJ1xcbicpKSkoKVxufVxuXG5mdW5jdGlvbiBnZXRHbHlwaEJ5SWQoZm9udCwgaWQpIHtcbiAgaWYgKCFmb250LmNoYXJzIHx8IGZvbnQuY2hhcnMubGVuZ3RoID09PSAwKVxuICAgIHJldHVybiBudWxsXG5cbiAgdmFyIGdseXBoSWR4ID0gZmluZENoYXIoZm9udC5jaGFycywgaWQpXG4gIGlmIChnbHlwaElkeCA+PSAwKVxuICAgIHJldHVybiBmb250LmNoYXJzW2dseXBoSWR4XVxuICByZXR1cm4gbnVsbFxufVxuXG5mdW5jdGlvbiBnZXRYSGVpZ2h0KGZvbnQpIHtcbiAgZm9yICh2YXIgaT0wOyBpPFhfSEVJR0hUUy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpZCA9IFhfSEVJR0hUU1tpXS5jaGFyQ29kZUF0KDApXG4gICAgdmFyIGlkeCA9IGZpbmRDaGFyKGZvbnQuY2hhcnMsIGlkKVxuICAgIGlmIChpZHggPj0gMCkgXG4gICAgICByZXR1cm4gZm9udC5jaGFyc1tpZHhdLmhlaWdodFxuICB9XG4gIHJldHVybiAwXG59XG5cbmZ1bmN0aW9uIGdldE1HbHlwaChmb250KSB7XG4gIGZvciAodmFyIGk9MDsgaTxNX1dJRFRIUy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpZCA9IE1fV0lEVEhTW2ldLmNoYXJDb2RlQXQoMClcbiAgICB2YXIgaWR4ID0gZmluZENoYXIoZm9udC5jaGFycywgaWQpXG4gICAgaWYgKGlkeCA+PSAwKSBcbiAgICAgIHJldHVybiBmb250LmNoYXJzW2lkeF1cbiAgfVxuICByZXR1cm4gMFxufVxuXG5mdW5jdGlvbiBnZXRDYXBIZWlnaHQoZm9udCkge1xuICBmb3IgKHZhciBpPTA7IGk8Q0FQX0hFSUdIVFMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaWQgPSBDQVBfSEVJR0hUU1tpXS5jaGFyQ29kZUF0KDApXG4gICAgdmFyIGlkeCA9IGZpbmRDaGFyKGZvbnQuY2hhcnMsIGlkKVxuICAgIGlmIChpZHggPj0gMCkgXG4gICAgICByZXR1cm4gZm9udC5jaGFyc1tpZHhdLmhlaWdodFxuICB9XG4gIHJldHVybiAwXG59XG5cbmZ1bmN0aW9uIGdldEtlcm5pbmcoZm9udCwgbGVmdCwgcmlnaHQpIHtcbiAgaWYgKCFmb250Lmtlcm5pbmdzIHx8IGZvbnQua2VybmluZ3MubGVuZ3RoID09PSAwKVxuICAgIHJldHVybiAwXG5cbiAgdmFyIHRhYmxlID0gZm9udC5rZXJuaW5nc1xuICBmb3IgKHZhciBpPTA7IGk8dGFibGUubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIga2VybiA9IHRhYmxlW2ldXG4gICAgaWYgKGtlcm4uZmlyc3QgPT09IGxlZnQgJiYga2Vybi5zZWNvbmQgPT09IHJpZ2h0KVxuICAgICAgcmV0dXJuIGtlcm4uYW1vdW50XG4gIH1cbiAgcmV0dXJuIDBcbn1cblxuZnVuY3Rpb24gZ2V0QWxpZ25UeXBlKGFsaWduKSB7XG4gIGlmIChhbGlnbiA9PT0gJ2NlbnRlcicpXG4gICAgcmV0dXJuIEFMSUdOX0NFTlRFUlxuICBlbHNlIGlmIChhbGlnbiA9PT0gJ3JpZ2h0JylcbiAgICByZXR1cm4gQUxJR05fUklHSFRcbiAgcmV0dXJuIEFMSUdOX0xFRlRcbn0iLCIvKlxub2JqZWN0LWFzc2lnblxuKGMpIFNpbmRyZSBTb3JodXNcbkBsaWNlbnNlIE1JVFxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBzaG91bGRVc2VOYXRpdmUoKSB7XG5cdHRyeSB7XG5cdFx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZWN0IGJ1Z2d5IHByb3BlcnR5IGVudW1lcmF0aW9uIG9yZGVyIGluIG9sZGVyIFY4IHZlcnNpb25zLlxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDExOFxuXHRcdHZhciB0ZXN0MSA9IG5ldyBTdHJpbmcoJ2FiYycpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctd3JhcHBlcnNcblx0XHR0ZXN0MVs1XSA9ICdkZSc7XG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QxKVswXSA9PT0gJzUnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MiA9IHt9O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0dGVzdDJbJ18nICsgU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpO1xuXHRcdH1cblx0XHR2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuXHRcdFx0cmV0dXJuIHRlc3QyW25dO1xuXHRcdH0pO1xuXHRcdGlmIChvcmRlcjIuam9pbignJykgIT09ICcwMTIzNDU2Nzg5Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDMgPSB7fTtcblx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRcdHRlc3QzW2xldHRlcl0gPSBsZXR0ZXI7XG5cdFx0fSk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG5cdFx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gV2UgZG9uJ3QgZXhwZWN0IGFueSBvZiB0aGUgYWJvdmUgdG8gdGhyb3csIGJ1dCBiZXR0ZXIgdG8gYmUgc2FmZS5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaG91bGRVc2VOYXRpdmUoKSA/IE9iamVjdC5hc3NpZ24gOiBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRzeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZUJNRm9udEFzY2lpKGRhdGEpIHtcbiAgaWYgKCFkYXRhKVxuICAgIHRocm93IG5ldyBFcnJvcignbm8gZGF0YSBwcm92aWRlZCcpXG4gIGRhdGEgPSBkYXRhLnRvU3RyaW5nKCkudHJpbSgpXG5cbiAgdmFyIG91dHB1dCA9IHtcbiAgICBwYWdlczogW10sXG4gICAgY2hhcnM6IFtdLFxuICAgIGtlcm5pbmdzOiBbXVxuICB9XG5cbiAgdmFyIGxpbmVzID0gZGF0YS5zcGxpdCgvXFxyXFxuP3xcXG4vZylcblxuICBpZiAobGluZXMubGVuZ3RoID09PSAwKVxuICAgIHRocm93IG5ldyBFcnJvcignbm8gZGF0YSBpbiBCTUZvbnQgZmlsZScpXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBsaW5lRGF0YSA9IHNwbGl0TGluZShsaW5lc1tpXSwgaSlcbiAgICBpZiAoIWxpbmVEYXRhKSAvL3NraXAgZW1wdHkgbGluZXNcbiAgICAgIGNvbnRpbnVlXG5cbiAgICBpZiAobGluZURhdGEua2V5ID09PSAncGFnZScpIHtcbiAgICAgIGlmICh0eXBlb2YgbGluZURhdGEuZGF0YS5pZCAhPT0gJ251bWJlcicpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignbWFsZm9ybWVkIGZpbGUgYXQgbGluZSAnICsgaSArICcgLS0gbmVlZHMgcGFnZSBpZD1OJylcbiAgICAgIGlmICh0eXBlb2YgbGluZURhdGEuZGF0YS5maWxlICE9PSAnc3RyaW5nJylcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdtYWxmb3JtZWQgZmlsZSBhdCBsaW5lICcgKyBpICsgJyAtLSBuZWVkcyBwYWdlIGZpbGU9XCJwYXRoXCInKVxuICAgICAgb3V0cHV0LnBhZ2VzW2xpbmVEYXRhLmRhdGEuaWRdID0gbGluZURhdGEuZGF0YS5maWxlXG4gICAgfSBlbHNlIGlmIChsaW5lRGF0YS5rZXkgPT09ICdjaGFycycgfHwgbGluZURhdGEua2V5ID09PSAna2VybmluZ3MnKSB7XG4gICAgICAvLy4uLiBkbyBub3RoaW5nIGZvciB0aGVzZSB0d28gLi4uXG4gICAgfSBlbHNlIGlmIChsaW5lRGF0YS5rZXkgPT09ICdjaGFyJykge1xuICAgICAgb3V0cHV0LmNoYXJzLnB1c2gobGluZURhdGEuZGF0YSlcbiAgICB9IGVsc2UgaWYgKGxpbmVEYXRhLmtleSA9PT0gJ2tlcm5pbmcnKSB7XG4gICAgICBvdXRwdXQua2VybmluZ3MucHVzaChsaW5lRGF0YS5kYXRhKVxuICAgIH0gZWxzZSB7XG4gICAgICBvdXRwdXRbbGluZURhdGEua2V5XSA9IGxpbmVEYXRhLmRhdGFcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb3V0cHV0XG59XG5cbmZ1bmN0aW9uIHNwbGl0TGluZShsaW5lLCBpZHgpIHtcbiAgbGluZSA9IGxpbmUucmVwbGFjZSgvXFx0Ky9nLCAnICcpLnRyaW0oKVxuICBpZiAoIWxpbmUpXG4gICAgcmV0dXJuIG51bGxcblxuICB2YXIgc3BhY2UgPSBsaW5lLmluZGV4T2YoJyAnKVxuICBpZiAoc3BhY2UgPT09IC0xKSBcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJubyBuYW1lZCByb3cgYXQgbGluZSBcIiArIGlkeClcblxuICB2YXIga2V5ID0gbGluZS5zdWJzdHJpbmcoMCwgc3BhY2UpXG5cbiAgbGluZSA9IGxpbmUuc3Vic3RyaW5nKHNwYWNlICsgMSlcbiAgLy9jbGVhciBcImxldHRlclwiIGZpZWxkIGFzIGl0IGlzIG5vbi1zdGFuZGFyZCBhbmRcbiAgLy9yZXF1aXJlcyBhZGRpdGlvbmFsIGNvbXBsZXhpdHkgdG8gcGFyc2UgXCIgLyA9IHN5bWJvbHNcbiAgbGluZSA9IGxpbmUucmVwbGFjZSgvbGV0dGVyPVtcXCdcXFwiXVxcUytbXFwnXFxcIl0vZ2ksICcnKSAgXG4gIGxpbmUgPSBsaW5lLnNwbGl0KFwiPVwiKVxuICBsaW5lID0gbGluZS5tYXAoZnVuY3Rpb24oc3RyKSB7XG4gICAgcmV0dXJuIHN0ci50cmltKCkubWF0Y2goKC8oXCIuKj9cInxbXlwiXFxzXSspKyg/PVxccyp8XFxzKiQpL2cpKVxuICB9KVxuXG4gIHZhciBkYXRhID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGR0ID0gbGluZVtpXVxuICAgIGlmIChpID09PSAwKSB7XG4gICAgICBkYXRhLnB1c2goe1xuICAgICAgICBrZXk6IGR0WzBdLFxuICAgICAgICBkYXRhOiBcIlwiXG4gICAgICB9KVxuICAgIH0gZWxzZSBpZiAoaSA9PT0gbGluZS5sZW5ndGggLSAxKSB7XG4gICAgICBkYXRhW2RhdGEubGVuZ3RoIC0gMV0uZGF0YSA9IHBhcnNlRGF0YShkdFswXSlcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YVtkYXRhLmxlbmd0aCAtIDFdLmRhdGEgPSBwYXJzZURhdGEoZHRbMF0pXG4gICAgICBkYXRhLnB1c2goe1xuICAgICAgICBrZXk6IGR0WzFdLFxuICAgICAgICBkYXRhOiBcIlwiXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHZhciBvdXQgPSB7XG4gICAga2V5OiBrZXksXG4gICAgZGF0YToge31cbiAgfVxuXG4gIGRhdGEuZm9yRWFjaChmdW5jdGlvbih2KSB7XG4gICAgb3V0LmRhdGFbdi5rZXldID0gdi5kYXRhO1xuICB9KVxuXG4gIHJldHVybiBvdXRcbn1cblxuZnVuY3Rpb24gcGFyc2VEYXRhKGRhdGEpIHtcbiAgaWYgKCFkYXRhIHx8IGRhdGEubGVuZ3RoID09PSAwKVxuICAgIHJldHVybiBcIlwiXG5cbiAgaWYgKGRhdGEuaW5kZXhPZignXCInKSA9PT0gMCB8fCBkYXRhLmluZGV4T2YoXCInXCIpID09PSAwKVxuICAgIHJldHVybiBkYXRhLnN1YnN0cmluZygxLCBkYXRhLmxlbmd0aCAtIDEpXG4gIGlmIChkYXRhLmluZGV4T2YoJywnKSAhPT0gLTEpXG4gICAgcmV0dXJuIHBhcnNlSW50TGlzdChkYXRhKVxuICByZXR1cm4gcGFyc2VJbnQoZGF0YSwgMTApXG59XG5cbmZ1bmN0aW9uIHBhcnNlSW50TGlzdChkYXRhKSB7XG4gIHJldHVybiBkYXRhLnNwbGl0KCcsJykubWFwKGZ1bmN0aW9uKHZhbCkge1xuICAgIHJldHVybiBwYXJzZUludCh2YWwsIDEwKVxuICB9KVxufSIsInZhciBkdHlwZSA9IHJlcXVpcmUoJ2R0eXBlJylcbnZhciBhbkFycmF5ID0gcmVxdWlyZSgnYW4tYXJyYXknKVxudmFyIGlzQnVmZmVyID0gcmVxdWlyZSgnaXMtYnVmZmVyJylcblxudmFyIENXID0gWzAsIDIsIDNdXG52YXIgQ0NXID0gWzIsIDEsIDNdXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlUXVhZEVsZW1lbnRzKGFycmF5LCBvcHQpIHtcbiAgICAvL2lmIHVzZXIgZGlkbid0IHNwZWNpZnkgYW4gb3V0cHV0IGFycmF5XG4gICAgaWYgKCFhcnJheSB8fCAhKGFuQXJyYXkoYXJyYXkpIHx8IGlzQnVmZmVyKGFycmF5KSkpIHtcbiAgICAgICAgb3B0ID0gYXJyYXkgfHwge31cbiAgICAgICAgYXJyYXkgPSBudWxsXG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvcHQgPT09ICdudW1iZXInKSAvL2JhY2t3YXJkcy1jb21wYXRpYmxlXG4gICAgICAgIG9wdCA9IHsgY291bnQ6IG9wdCB9XG4gICAgZWxzZVxuICAgICAgICBvcHQgPSBvcHQgfHwge31cblxuICAgIHZhciB0eXBlID0gdHlwZW9mIG9wdC50eXBlID09PSAnc3RyaW5nJyA/IG9wdC50eXBlIDogJ3VpbnQxNidcbiAgICB2YXIgY291bnQgPSB0eXBlb2Ygb3B0LmNvdW50ID09PSAnbnVtYmVyJyA/IG9wdC5jb3VudCA6IDFcbiAgICB2YXIgc3RhcnQgPSAob3B0LnN0YXJ0IHx8IDApIFxuXG4gICAgdmFyIGRpciA9IG9wdC5jbG9ja3dpc2UgIT09IGZhbHNlID8gQ1cgOiBDQ1csXG4gICAgICAgIGEgPSBkaXJbMF0sIFxuICAgICAgICBiID0gZGlyWzFdLFxuICAgICAgICBjID0gZGlyWzJdXG5cbiAgICB2YXIgbnVtSW5kaWNlcyA9IGNvdW50ICogNlxuXG4gICAgdmFyIGluZGljZXMgPSBhcnJheSB8fCBuZXcgKGR0eXBlKHR5cGUpKShudW1JbmRpY2VzKVxuICAgIGZvciAodmFyIGkgPSAwLCBqID0gMDsgaSA8IG51bUluZGljZXM7IGkgKz0gNiwgaiArPSA0KSB7XG4gICAgICAgIHZhciB4ID0gaSArIHN0YXJ0XG4gICAgICAgIGluZGljZXNbeCArIDBdID0gaiArIDBcbiAgICAgICAgaW5kaWNlc1t4ICsgMV0gPSBqICsgMVxuICAgICAgICBpbmRpY2VzW3ggKyAyXSA9IGogKyAyXG4gICAgICAgIGluZGljZXNbeCArIDNdID0gaiArIGFcbiAgICAgICAgaW5kaWNlc1t4ICsgNF0gPSBqICsgYlxuICAgICAgICBpbmRpY2VzW3ggKyA1XSA9IGogKyBjXG4gICAgfVxuICAgIHJldHVybiBpbmRpY2VzXG59IiwidmFyIGNyZWF0ZUxheW91dCA9IHJlcXVpcmUoJ2xheW91dC1ibWZvbnQtdGV4dCcpXG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpXG52YXIgY3JlYXRlSW5kaWNlcyA9IHJlcXVpcmUoJ3F1YWQtaW5kaWNlcycpXG52YXIgYnVmZmVyID0gcmVxdWlyZSgndGhyZWUtYnVmZmVyLXZlcnRleC1kYXRhJylcbnZhciBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJylcblxudmFyIHZlcnRpY2VzID0gcmVxdWlyZSgnLi9saWIvdmVydGljZXMnKVxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi9saWIvdXRpbHMnKVxuXG52YXIgQmFzZSA9IFRIUkVFLkJ1ZmZlckdlb21ldHJ5XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlVGV4dEdlb21ldHJ5IChvcHQpIHtcbiAgcmV0dXJuIG5ldyBUZXh0R2VvbWV0cnkob3B0KVxufVxuXG5mdW5jdGlvbiBUZXh0R2VvbWV0cnkgKG9wdCkge1xuICBCYXNlLmNhbGwodGhpcylcblxuICBpZiAodHlwZW9mIG9wdCA9PT0gJ3N0cmluZycpIHtcbiAgICBvcHQgPSB7IHRleHQ6IG9wdCB9XG4gIH1cblxuICAvLyB1c2UgdGhlc2UgYXMgZGVmYXVsdCB2YWx1ZXMgZm9yIGFueSBzdWJzZXF1ZW50XG4gIC8vIGNhbGxzIHRvIHVwZGF0ZSgpXG4gIHRoaXMuX29wdCA9IGFzc2lnbih7fSwgb3B0KVxuXG4gIC8vIGFsc28gZG8gYW4gaW5pdGlhbCBzZXR1cC4uLlxuICBpZiAob3B0KSB0aGlzLnVwZGF0ZShvcHQpXG59XG5cbmluaGVyaXRzKFRleHRHZW9tZXRyeSwgQmFzZSlcblxuVGV4dEdlb21ldHJ5LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAob3B0KSB7XG4gIGlmICh0eXBlb2Ygb3B0ID09PSAnc3RyaW5nJykge1xuICAgIG9wdCA9IHsgdGV4dDogb3B0IH1cbiAgfVxuXG4gIC8vIHVzZSBjb25zdHJ1Y3RvciBkZWZhdWx0c1xuICBvcHQgPSBhc3NpZ24oe30sIHRoaXMuX29wdCwgb3B0KVxuXG4gIGlmICghb3B0LmZvbnQpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdtdXN0IHNwZWNpZnkgYSB7IGZvbnQgfSBpbiBvcHRpb25zJylcbiAgfVxuXG4gIHRoaXMubGF5b3V0ID0gY3JlYXRlTGF5b3V0KG9wdClcblxuICAvLyBnZXQgdmVjMiB0ZXhjb29yZHNcbiAgdmFyIGZsaXBZID0gb3B0LmZsaXBZICE9PSBmYWxzZVxuXG4gIC8vIHRoZSBkZXNpcmVkIEJNRm9udCBkYXRhXG4gIHZhciBmb250ID0gb3B0LmZvbnRcblxuICAvLyBkZXRlcm1pbmUgdGV4dHVyZSBzaXplIGZyb20gZm9udCBmaWxlXG4gIHZhciB0ZXhXaWR0aCA9IGZvbnQuY29tbW9uLnNjYWxlV1xuICB2YXIgdGV4SGVpZ2h0ID0gZm9udC5jb21tb24uc2NhbGVIXG5cbiAgLy8gZ2V0IHZpc2libGUgZ2x5cGhzXG4gIHZhciBnbHlwaHMgPSB0aGlzLmxheW91dC5nbHlwaHMuZmlsdGVyKGZ1bmN0aW9uIChnbHlwaCkge1xuICAgIHZhciBiaXRtYXAgPSBnbHlwaC5kYXRhXG4gICAgcmV0dXJuIGJpdG1hcC53aWR0aCAqIGJpdG1hcC5oZWlnaHQgPiAwXG4gIH0pXG5cbiAgLy8gcHJvdmlkZSB2aXNpYmxlIGdseXBocyBmb3IgY29udmVuaWVuY2VcbiAgdGhpcy52aXNpYmxlR2x5cGhzID0gZ2x5cGhzXG5cbiAgLy8gZ2V0IGNvbW1vbiB2ZXJ0ZXggZGF0YVxuICB2YXIgcG9zaXRpb25zID0gdmVydGljZXMucG9zaXRpb25zKGdseXBocylcbiAgdmFyIHV2cyA9IHZlcnRpY2VzLnV2cyhnbHlwaHMsIHRleFdpZHRoLCB0ZXhIZWlnaHQsIGZsaXBZKVxuICB2YXIgaW5kaWNlcyA9IGNyZWF0ZUluZGljZXMoe1xuICAgIGNsb2Nrd2lzZTogdHJ1ZSxcbiAgICB0eXBlOiAndWludDE2JyxcbiAgICBjb3VudDogZ2x5cGhzLmxlbmd0aFxuICB9KVxuXG4gIC8vIHVwZGF0ZSB2ZXJ0ZXggZGF0YVxuICBidWZmZXIuaW5kZXgodGhpcywgaW5kaWNlcywgMSwgJ3VpbnQxNicpXG4gIGJ1ZmZlci5hdHRyKHRoaXMsICdwb3NpdGlvbicsIHBvc2l0aW9ucywgMilcbiAgYnVmZmVyLmF0dHIodGhpcywgJ3V2JywgdXZzLCAyKVxuXG4gIC8vIHVwZGF0ZSBtdWx0aXBhZ2UgZGF0YVxuICBpZiAoIW9wdC5tdWx0aXBhZ2UgJiYgJ3BhZ2UnIGluIHRoaXMuYXR0cmlidXRlcykge1xuICAgIC8vIGRpc2FibGUgbXVsdGlwYWdlIHJlbmRlcmluZ1xuICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKCdwYWdlJylcbiAgfSBlbHNlIGlmIChvcHQubXVsdGlwYWdlKSB7XG4gICAgdmFyIHBhZ2VzID0gdmVydGljZXMucGFnZXMoZ2x5cGhzKVxuICAgIC8vIGVuYWJsZSBtdWx0aXBhZ2UgcmVuZGVyaW5nXG4gICAgYnVmZmVyLmF0dHIodGhpcywgJ3BhZ2UnLCBwYWdlcywgMSlcbiAgfVxufVxuXG5UZXh0R2VvbWV0cnkucHJvdG90eXBlLmNvbXB1dGVCb3VuZGluZ1NwaGVyZSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuYm91bmRpbmdTcGhlcmUgPT09IG51bGwpIHtcbiAgICB0aGlzLmJvdW5kaW5nU3BoZXJlID0gbmV3IFRIUkVFLlNwaGVyZSgpXG4gIH1cblxuICB2YXIgcG9zaXRpb25zID0gdGhpcy5hdHRyaWJ1dGVzLnBvc2l0aW9uLmFycmF5XG4gIHZhciBpdGVtU2l6ZSA9IHRoaXMuYXR0cmlidXRlcy5wb3NpdGlvbi5pdGVtU2l6ZVxuICBpZiAoIXBvc2l0aW9ucyB8fCAhaXRlbVNpemUgfHwgcG9zaXRpb25zLmxlbmd0aCA8IDIpIHtcbiAgICB0aGlzLmJvdW5kaW5nU3BoZXJlLnJhZGl1cyA9IDBcbiAgICB0aGlzLmJvdW5kaW5nU3BoZXJlLmNlbnRlci5zZXQoMCwgMCwgMClcbiAgICByZXR1cm5cbiAgfVxuICB1dGlscy5jb21wdXRlU3BoZXJlKHBvc2l0aW9ucywgdGhpcy5ib3VuZGluZ1NwaGVyZSlcbiAgaWYgKGlzTmFOKHRoaXMuYm91bmRpbmdTcGhlcmUucmFkaXVzKSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1RIUkVFLkJ1ZmZlckdlb21ldHJ5LmNvbXB1dGVCb3VuZGluZ1NwaGVyZSgpOiAnICtcbiAgICAgICdDb21wdXRlZCByYWRpdXMgaXMgTmFOLiBUaGUgJyArXG4gICAgICAnXCJwb3NpdGlvblwiIGF0dHJpYnV0ZSBpcyBsaWtlbHkgdG8gaGF2ZSBOYU4gdmFsdWVzLicpXG4gIH1cbn1cblxuVGV4dEdlb21ldHJ5LnByb3RvdHlwZS5jb21wdXRlQm91bmRpbmdCb3ggPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLmJvdW5kaW5nQm94ID09PSBudWxsKSB7XG4gICAgdGhpcy5ib3VuZGluZ0JveCA9IG5ldyBUSFJFRS5Cb3gzKClcbiAgfVxuXG4gIHZhciBiYm94ID0gdGhpcy5ib3VuZGluZ0JveFxuICB2YXIgcG9zaXRpb25zID0gdGhpcy5hdHRyaWJ1dGVzLnBvc2l0aW9uLmFycmF5XG4gIHZhciBpdGVtU2l6ZSA9IHRoaXMuYXR0cmlidXRlcy5wb3NpdGlvbi5pdGVtU2l6ZVxuICBpZiAoIXBvc2l0aW9ucyB8fCAhaXRlbVNpemUgfHwgcG9zaXRpb25zLmxlbmd0aCA8IDIpIHtcbiAgICBiYm94Lm1ha2VFbXB0eSgpXG4gICAgcmV0dXJuXG4gIH1cbiAgdXRpbHMuY29tcHV0ZUJveChwb3NpdGlvbnMsIGJib3gpXG59XG4iLCJ2YXIgaXRlbVNpemUgPSAyXG52YXIgYm94ID0geyBtaW46IFswLCAwXSwgbWF4OiBbMCwgMF0gfVxuXG5mdW5jdGlvbiBib3VuZHMgKHBvc2l0aW9ucykge1xuICB2YXIgY291bnQgPSBwb3NpdGlvbnMubGVuZ3RoIC8gaXRlbVNpemVcbiAgYm94Lm1pblswXSA9IHBvc2l0aW9uc1swXVxuICBib3gubWluWzFdID0gcG9zaXRpb25zWzFdXG4gIGJveC5tYXhbMF0gPSBwb3NpdGlvbnNbMF1cbiAgYm94Lm1heFsxXSA9IHBvc2l0aW9uc1sxXVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgIHZhciB4ID0gcG9zaXRpb25zW2kgKiBpdGVtU2l6ZSArIDBdXG4gICAgdmFyIHkgPSBwb3NpdGlvbnNbaSAqIGl0ZW1TaXplICsgMV1cbiAgICBib3gubWluWzBdID0gTWF0aC5taW4oeCwgYm94Lm1pblswXSlcbiAgICBib3gubWluWzFdID0gTWF0aC5taW4oeSwgYm94Lm1pblsxXSlcbiAgICBib3gubWF4WzBdID0gTWF0aC5tYXgoeCwgYm94Lm1heFswXSlcbiAgICBib3gubWF4WzFdID0gTWF0aC5tYXgoeSwgYm94Lm1heFsxXSlcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cy5jb21wdXRlQm94ID0gZnVuY3Rpb24gKHBvc2l0aW9ucywgb3V0cHV0KSB7XG4gIGJvdW5kcyhwb3NpdGlvbnMpXG4gIG91dHB1dC5taW4uc2V0KGJveC5taW5bMF0sIGJveC5taW5bMV0sIDApXG4gIG91dHB1dC5tYXguc2V0KGJveC5tYXhbMF0sIGJveC5tYXhbMV0sIDApXG59XG5cbm1vZHVsZS5leHBvcnRzLmNvbXB1dGVTcGhlcmUgPSBmdW5jdGlvbiAocG9zaXRpb25zLCBvdXRwdXQpIHtcbiAgYm91bmRzKHBvc2l0aW9ucylcbiAgdmFyIG1pblggPSBib3gubWluWzBdXG4gIHZhciBtaW5ZID0gYm94Lm1pblsxXVxuICB2YXIgbWF4WCA9IGJveC5tYXhbMF1cbiAgdmFyIG1heFkgPSBib3gubWF4WzFdXG4gIHZhciB3aWR0aCA9IG1heFggLSBtaW5YXG4gIHZhciBoZWlnaHQgPSBtYXhZIC0gbWluWVxuICB2YXIgbGVuZ3RoID0gTWF0aC5zcXJ0KHdpZHRoICogd2lkdGggKyBoZWlnaHQgKiBoZWlnaHQpXG4gIG91dHB1dC5jZW50ZXIuc2V0KG1pblggKyB3aWR0aCAvIDIsIG1pblkgKyBoZWlnaHQgLyAyLCAwKVxuICBvdXRwdXQucmFkaXVzID0gbGVuZ3RoIC8gMlxufVxuIiwibW9kdWxlLmV4cG9ydHMucGFnZXMgPSBmdW5jdGlvbiBwYWdlcyAoZ2x5cGhzKSB7XG4gIHZhciBwYWdlcyA9IG5ldyBGbG9hdDMyQXJyYXkoZ2x5cGhzLmxlbmd0aCAqIDQgKiAxKVxuICB2YXIgaSA9IDBcbiAgZ2x5cGhzLmZvckVhY2goZnVuY3Rpb24gKGdseXBoKSB7XG4gICAgdmFyIGlkID0gZ2x5cGguZGF0YS5wYWdlIHx8IDBcbiAgICBwYWdlc1tpKytdID0gaWRcbiAgICBwYWdlc1tpKytdID0gaWRcbiAgICBwYWdlc1tpKytdID0gaWRcbiAgICBwYWdlc1tpKytdID0gaWRcbiAgfSlcbiAgcmV0dXJuIHBhZ2VzXG59XG5cbm1vZHVsZS5leHBvcnRzLnV2cyA9IGZ1bmN0aW9uIHV2cyAoZ2x5cGhzLCB0ZXhXaWR0aCwgdGV4SGVpZ2h0LCBmbGlwWSkge1xuICB2YXIgdXZzID0gbmV3IEZsb2F0MzJBcnJheShnbHlwaHMubGVuZ3RoICogNCAqIDIpXG4gIHZhciBpID0gMFxuICBnbHlwaHMuZm9yRWFjaChmdW5jdGlvbiAoZ2x5cGgpIHtcbiAgICB2YXIgYml0bWFwID0gZ2x5cGguZGF0YVxuICAgIHZhciBidyA9IChiaXRtYXAueCArIGJpdG1hcC53aWR0aClcbiAgICB2YXIgYmggPSAoYml0bWFwLnkgKyBiaXRtYXAuaGVpZ2h0KVxuXG4gICAgLy8gdG9wIGxlZnQgcG9zaXRpb25cbiAgICB2YXIgdTAgPSBiaXRtYXAueCAvIHRleFdpZHRoXG4gICAgdmFyIHYxID0gYml0bWFwLnkgLyB0ZXhIZWlnaHRcbiAgICB2YXIgdTEgPSBidyAvIHRleFdpZHRoXG4gICAgdmFyIHYwID0gYmggLyB0ZXhIZWlnaHRcblxuICAgIGlmIChmbGlwWSkge1xuICAgICAgdjEgPSAodGV4SGVpZ2h0IC0gYml0bWFwLnkpIC8gdGV4SGVpZ2h0XG4gICAgICB2MCA9ICh0ZXhIZWlnaHQgLSBiaCkgLyB0ZXhIZWlnaHRcbiAgICB9XG5cbiAgICAvLyBCTFxuICAgIHV2c1tpKytdID0gdTBcbiAgICB1dnNbaSsrXSA9IHYxXG4gICAgLy8gVExcbiAgICB1dnNbaSsrXSA9IHUwXG4gICAgdXZzW2krK10gPSB2MFxuICAgIC8vIFRSXG4gICAgdXZzW2krK10gPSB1MVxuICAgIHV2c1tpKytdID0gdjBcbiAgICAvLyBCUlxuICAgIHV2c1tpKytdID0gdTFcbiAgICB1dnNbaSsrXSA9IHYxXG4gIH0pXG4gIHJldHVybiB1dnNcbn1cblxubW9kdWxlLmV4cG9ydHMucG9zaXRpb25zID0gZnVuY3Rpb24gcG9zaXRpb25zIChnbHlwaHMpIHtcbiAgdmFyIHBvc2l0aW9ucyA9IG5ldyBGbG9hdDMyQXJyYXkoZ2x5cGhzLmxlbmd0aCAqIDQgKiAyKVxuICB2YXIgaSA9IDBcbiAgZ2x5cGhzLmZvckVhY2goZnVuY3Rpb24gKGdseXBoKSB7XG4gICAgdmFyIGJpdG1hcCA9IGdseXBoLmRhdGFcblxuICAgIC8vIGJvdHRvbSBsZWZ0IHBvc2l0aW9uXG4gICAgdmFyIHggPSBnbHlwaC5wb3NpdGlvblswXSArIGJpdG1hcC54b2Zmc2V0XG4gICAgdmFyIHkgPSBnbHlwaC5wb3NpdGlvblsxXSArIGJpdG1hcC55b2Zmc2V0XG5cbiAgICAvLyBxdWFkIHNpemVcbiAgICB2YXIgdyA9IGJpdG1hcC53aWR0aFxuICAgIHZhciBoID0gYml0bWFwLmhlaWdodFxuXG4gICAgLy8gQkxcbiAgICBwb3NpdGlvbnNbaSsrXSA9IHhcbiAgICBwb3NpdGlvbnNbaSsrXSA9IHlcbiAgICAvLyBUTFxuICAgIHBvc2l0aW9uc1tpKytdID0geFxuICAgIHBvc2l0aW9uc1tpKytdID0geSArIGhcbiAgICAvLyBUUlxuICAgIHBvc2l0aW9uc1tpKytdID0geCArIHdcbiAgICBwb3NpdGlvbnNbaSsrXSA9IHkgKyBoXG4gICAgLy8gQlJcbiAgICBwb3NpdGlvbnNbaSsrXSA9IHggKyB3XG4gICAgcG9zaXRpb25zW2krK10gPSB5XG4gIH0pXG4gIHJldHVybiBwb3NpdGlvbnNcbn1cbiIsInZhciBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJylcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGVTREZTaGFkZXIgKG9wdCkge1xuICBvcHQgPSBvcHQgfHwge31cbiAgdmFyIG9wYWNpdHkgPSB0eXBlb2Ygb3B0Lm9wYWNpdHkgPT09ICdudW1iZXInID8gb3B0Lm9wYWNpdHkgOiAxXG4gIHZhciBhbHBoYVRlc3QgPSB0eXBlb2Ygb3B0LmFscGhhVGVzdCA9PT0gJ251bWJlcicgPyBvcHQuYWxwaGFUZXN0IDogMC4wMDAxXG4gIHZhciBwcmVjaXNpb24gPSBvcHQucHJlY2lzaW9uIHx8ICdoaWdocCdcbiAgdmFyIGNvbG9yID0gb3B0LmNvbG9yXG4gIHZhciBtYXAgPSBvcHQubWFwXG5cbiAgLy8gcmVtb3ZlIHRvIHNhdGlzZnkgcjczXG4gIGRlbGV0ZSBvcHQubWFwXG4gIGRlbGV0ZSBvcHQuY29sb3JcbiAgZGVsZXRlIG9wdC5wcmVjaXNpb25cbiAgZGVsZXRlIG9wdC5vcGFjaXR5XG5cbiAgcmV0dXJuIGFzc2lnbih7XG4gICAgdW5pZm9ybXM6IHtcbiAgICAgIG9wYWNpdHk6IHsgdHlwZTogJ2YnLCB2YWx1ZTogb3BhY2l0eSB9LFxuICAgICAgbWFwOiB7IHR5cGU6ICd0JywgdmFsdWU6IG1hcCB8fCBuZXcgVEhSRUUuVGV4dHVyZSgpIH0sXG4gICAgICBjb2xvcjogeyB0eXBlOiAnYycsIHZhbHVlOiBuZXcgVEhSRUUuQ29sb3IoY29sb3IpIH1cbiAgICB9LFxuICAgIHZlcnRleFNoYWRlcjogW1xuICAgICAgJ2F0dHJpYnV0ZSB2ZWMyIHV2OycsXG4gICAgICAnYXR0cmlidXRlIHZlYzQgcG9zaXRpb247JyxcbiAgICAgICd1bmlmb3JtIG1hdDQgcHJvamVjdGlvbk1hdHJpeDsnLFxuICAgICAgJ3VuaWZvcm0gbWF0NCBtb2RlbFZpZXdNYXRyaXg7JyxcbiAgICAgICd2YXJ5aW5nIHZlYzIgdlV2OycsXG4gICAgICAndm9pZCBtYWluKCkgeycsXG4gICAgICAndlV2ID0gdXY7JyxcbiAgICAgICdnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiBtb2RlbFZpZXdNYXRyaXggKiBwb3NpdGlvbjsnLFxuICAgICAgJ30nXG4gICAgXS5qb2luKCdcXG4nKSxcbiAgICBmcmFnbWVudFNoYWRlcjogW1xuICAgICAgJyNpZmRlZiBHTF9PRVNfc3RhbmRhcmRfZGVyaXZhdGl2ZXMnLFxuICAgICAgJyNleHRlbnNpb24gR0xfT0VTX3N0YW5kYXJkX2Rlcml2YXRpdmVzIDogZW5hYmxlJyxcbiAgICAgICcjZW5kaWYnLFxuICAgICAgJ3ByZWNpc2lvbiAnICsgcHJlY2lzaW9uICsgJyBmbG9hdDsnLFxuICAgICAgJ3VuaWZvcm0gZmxvYXQgb3BhY2l0eTsnLFxuICAgICAgJ3VuaWZvcm0gdmVjMyBjb2xvcjsnLFxuICAgICAgJ3VuaWZvcm0gc2FtcGxlcjJEIG1hcDsnLFxuICAgICAgJ3ZhcnlpbmcgdmVjMiB2VXY7JyxcblxuICAgICAgJ2Zsb2F0IGFhc3RlcChmbG9hdCB2YWx1ZSkgeycsXG4gICAgICAnICAjaWZkZWYgR0xfT0VTX3N0YW5kYXJkX2Rlcml2YXRpdmVzJyxcbiAgICAgICcgICAgZmxvYXQgYWZ3aWR0aCA9IGxlbmd0aCh2ZWMyKGRGZHgodmFsdWUpLCBkRmR5KHZhbHVlKSkpICogMC43MDcxMDY3ODExODY1NDc1NzsnLFxuICAgICAgJyAgI2Vsc2UnLFxuICAgICAgJyAgICBmbG9hdCBhZndpZHRoID0gKDEuMCAvIDMyLjApICogKDEuNDE0MjEzNTYyMzczMDk1MSAvICgyLjAgKiBnbF9GcmFnQ29vcmQudykpOycsXG4gICAgICAnICAjZW5kaWYnLFxuICAgICAgJyAgcmV0dXJuIHNtb290aHN0ZXAoMC41IC0gYWZ3aWR0aCwgMC41ICsgYWZ3aWR0aCwgdmFsdWUpOycsXG4gICAgICAnfScsXG5cbiAgICAgICd2b2lkIG1haW4oKSB7JyxcbiAgICAgICcgIHZlYzQgdGV4Q29sb3IgPSB0ZXh0dXJlMkQobWFwLCB2VXYpOycsXG4gICAgICAnICBmbG9hdCBhbHBoYSA9IGFhc3RlcCh0ZXhDb2xvci5hKTsnLFxuICAgICAgJyAgZ2xfRnJhZ0NvbG9yID0gdmVjNChjb2xvciwgb3BhY2l0eSAqIGFscGhhKTsnLFxuICAgICAgYWxwaGFUZXN0ID09PSAwXG4gICAgICAgID8gJydcbiAgICAgICAgOiAnICBpZiAoZ2xfRnJhZ0NvbG9yLmEgPCAnICsgYWxwaGFUZXN0ICsgJykgZGlzY2FyZDsnLFxuICAgICAgJ30nXG4gICAgXS5qb2luKCdcXG4nKVxuICB9LCBvcHQpXG59XG4iLCJ2YXIgZmxhdHRlbiA9IHJlcXVpcmUoJ2ZsYXR0ZW4tdmVydGV4LWRhdGEnKVxudmFyIHdhcm5lZCA9IGZhbHNlO1xuXG5tb2R1bGUuZXhwb3J0cy5hdHRyID0gc2V0QXR0cmlidXRlXG5tb2R1bGUuZXhwb3J0cy5pbmRleCA9IHNldEluZGV4XG5cbmZ1bmN0aW9uIHNldEluZGV4IChnZW9tZXRyeSwgZGF0YSwgaXRlbVNpemUsIGR0eXBlKSB7XG4gIGlmICh0eXBlb2YgaXRlbVNpemUgIT09ICdudW1iZXInKSBpdGVtU2l6ZSA9IDFcbiAgaWYgKHR5cGVvZiBkdHlwZSAhPT0gJ3N0cmluZycpIGR0eXBlID0gJ3VpbnQxNidcblxuICB2YXIgaXNSNjkgPSAhZ2VvbWV0cnkuaW5kZXggJiYgdHlwZW9mIGdlb21ldHJ5LnNldEluZGV4ICE9PSAnZnVuY3Rpb24nXG4gIHZhciBhdHRyaWIgPSBpc1I2OSA/IGdlb21ldHJ5LmdldEF0dHJpYnV0ZSgnaW5kZXgnKSA6IGdlb21ldHJ5LmluZGV4XG4gIHZhciBuZXdBdHRyaWIgPSB1cGRhdGVBdHRyaWJ1dGUoYXR0cmliLCBkYXRhLCBpdGVtU2l6ZSwgZHR5cGUpXG4gIGlmIChuZXdBdHRyaWIpIHtcbiAgICBpZiAoaXNSNjkpIGdlb21ldHJ5LmFkZEF0dHJpYnV0ZSgnaW5kZXgnLCBuZXdBdHRyaWIpXG4gICAgZWxzZSBnZW9tZXRyeS5pbmRleCA9IG5ld0F0dHJpYlxuICB9XG59XG5cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZSAoZ2VvbWV0cnksIGtleSwgZGF0YSwgaXRlbVNpemUsIGR0eXBlKSB7XG4gIGlmICh0eXBlb2YgaXRlbVNpemUgIT09ICdudW1iZXInKSBpdGVtU2l6ZSA9IDNcbiAgaWYgKHR5cGVvZiBkdHlwZSAhPT0gJ3N0cmluZycpIGR0eXBlID0gJ2Zsb2F0MzInXG4gIGlmIChBcnJheS5pc0FycmF5KGRhdGEpICYmXG4gICAgQXJyYXkuaXNBcnJheShkYXRhWzBdKSAmJlxuICAgIGRhdGFbMF0ubGVuZ3RoICE9PSBpdGVtU2l6ZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignTmVzdGVkIHZlcnRleCBhcnJheSBoYXMgdW5leHBlY3RlZCBzaXplOyBleHBlY3RlZCAnICtcbiAgICAgIGl0ZW1TaXplICsgJyBidXQgZm91bmQgJyArIGRhdGFbMF0ubGVuZ3RoKVxuICB9XG5cbiAgdmFyIGF0dHJpYiA9IGdlb21ldHJ5LmdldEF0dHJpYnV0ZShrZXkpXG4gIHZhciBuZXdBdHRyaWIgPSB1cGRhdGVBdHRyaWJ1dGUoYXR0cmliLCBkYXRhLCBpdGVtU2l6ZSwgZHR5cGUpXG4gIGlmIChuZXdBdHRyaWIpIHtcbiAgICBnZW9tZXRyeS5hZGRBdHRyaWJ1dGUoa2V5LCBuZXdBdHRyaWIpXG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlQXR0cmlidXRlIChhdHRyaWIsIGRhdGEsIGl0ZW1TaXplLCBkdHlwZSkge1xuICBkYXRhID0gZGF0YSB8fCBbXVxuICBpZiAoIWF0dHJpYiB8fCByZWJ1aWxkQXR0cmlidXRlKGF0dHJpYiwgZGF0YSwgaXRlbVNpemUpKSB7XG4gICAgLy8gY3JlYXRlIGEgbmV3IGFycmF5IHdpdGggZGVzaXJlZCB0eXBlXG4gICAgZGF0YSA9IGZsYXR0ZW4oZGF0YSwgZHR5cGUpXG5cbiAgICB2YXIgbmVlZHNOZXdCdWZmZXIgPSBhdHRyaWIgJiYgdHlwZW9mIGF0dHJpYi5zZXRBcnJheSAhPT0gJ2Z1bmN0aW9uJ1xuICAgIGlmICghYXR0cmliIHx8IG5lZWRzTmV3QnVmZmVyKSB7XG4gICAgICAvLyBXZSBhcmUgb24gYW4gb2xkIHZlcnNpb24gb2YgVGhyZWVKUyB3aGljaCBjYW4ndFxuICAgICAgLy8gc3VwcG9ydCBncm93aW5nIC8gc2hyaW5raW5nIGJ1ZmZlcnMsIHNvIHdlIG5lZWRcbiAgICAgIC8vIHRvIGJ1aWxkIGEgbmV3IGJ1ZmZlclxuICAgICAgaWYgKG5lZWRzTmV3QnVmZmVyICYmICF3YXJuZWQpIHtcbiAgICAgICAgd2FybmVkID0gdHJ1ZVxuICAgICAgICBjb25zb2xlLndhcm4oW1xuICAgICAgICAgICdBIFdlYkdMIGJ1ZmZlciBpcyBiZWluZyB1cGRhdGVkIHdpdGggYSBuZXcgc2l6ZSBvciBpdGVtU2l6ZSwgJyxcbiAgICAgICAgICAnaG93ZXZlciB0aGlzIHZlcnNpb24gb2YgVGhyZWVKUyBvbmx5IHN1cHBvcnRzIGZpeGVkLXNpemUgYnVmZmVycy4nLFxuICAgICAgICAgICdcXG5UaGUgb2xkIGJ1ZmZlciBtYXkgc3RpbGwgYmUga2VwdCBpbiBtZW1vcnkuXFxuJyxcbiAgICAgICAgICAnVG8gYXZvaWQgbWVtb3J5IGxlYWtzLCBpdCBpcyByZWNvbW1lbmRlZCB0aGF0IHlvdSBkaXNwb3NlICcsXG4gICAgICAgICAgJ3lvdXIgZ2VvbWV0cmllcyBhbmQgY3JlYXRlIG5ldyBvbmVzLCBvciB1cGRhdGUgdG8gVGhyZWVKUyByODIgb3IgbmV3ZXIuXFxuJyxcbiAgICAgICAgICAnU2VlIGhlcmUgZm9yIGRpc2N1c3Npb246XFxuJyxcbiAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9wdWxsLzk2MzEnXG4gICAgICAgIF0uam9pbignJykpXG4gICAgICB9XG5cbiAgICAgIC8vIEJ1aWxkIGEgbmV3IGF0dHJpYnV0ZVxuICAgICAgYXR0cmliID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShkYXRhLCBpdGVtU2l6ZSk7XG4gICAgfVxuXG4gICAgYXR0cmliLml0ZW1TaXplID0gaXRlbVNpemVcbiAgICBhdHRyaWIubmVlZHNVcGRhdGUgPSB0cnVlXG5cbiAgICAvLyBOZXcgdmVyc2lvbnMgb2YgVGhyZWVKUyBzdWdnZXN0IHVzaW5nIHNldEFycmF5XG4gICAgLy8gdG8gY2hhbmdlIHRoZSBkYXRhLiBJdCB3aWxsIHVzZSBidWZmZXJEYXRhIGludGVybmFsbHksXG4gICAgLy8gc28geW91IGNhbiBjaGFuZ2UgdGhlIGFycmF5IHNpemUgd2l0aG91dCBhbnkgaXNzdWVzXG4gICAgaWYgKHR5cGVvZiBhdHRyaWIuc2V0QXJyYXkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGF0dHJpYi5zZXRBcnJheShkYXRhKVxuICAgIH1cblxuICAgIHJldHVybiBhdHRyaWJcbiAgfSBlbHNlIHtcbiAgICAvLyBjb3B5IGRhdGEgaW50byB0aGUgZXhpc3RpbmcgYXJyYXlcbiAgICBmbGF0dGVuKGRhdGEsIGF0dHJpYi5hcnJheSlcbiAgICBhdHRyaWIubmVlZHNVcGRhdGUgPSB0cnVlXG4gICAgcmV0dXJuIG51bGxcbiAgfVxufVxuXG4vLyBUZXN0IHdoZXRoZXIgdGhlIGF0dHJpYnV0ZSBuZWVkcyB0byBiZSByZS1jcmVhdGVkLFxuLy8gcmV0dXJucyBmYWxzZSBpZiB3ZSBjYW4gcmUtdXNlIGl0IGFzLWlzLlxuZnVuY3Rpb24gcmVidWlsZEF0dHJpYnV0ZSAoYXR0cmliLCBkYXRhLCBpdGVtU2l6ZSkge1xuICBpZiAoYXR0cmliLml0ZW1TaXplICE9PSBpdGVtU2l6ZSkgcmV0dXJuIHRydWVcbiAgaWYgKCFhdHRyaWIuYXJyYXkpIHJldHVybiB0cnVlXG4gIHZhciBhdHRyaWJMZW5ndGggPSBhdHRyaWIuYXJyYXkubGVuZ3RoXG4gIGlmIChBcnJheS5pc0FycmF5KGRhdGEpICYmIEFycmF5LmlzQXJyYXkoZGF0YVswXSkpIHtcbiAgICAvLyBbIFsgeCwgeSwgeiBdIF1cbiAgICByZXR1cm4gYXR0cmliTGVuZ3RoICE9PSBkYXRhLmxlbmd0aCAqIGl0ZW1TaXplXG4gIH0gZWxzZSB7XG4gICAgLy8gWyB4LCB5LCB6IF1cbiAgICByZXR1cm4gYXR0cmliTGVuZ3RoICE9PSBkYXRhLmxlbmd0aFxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuIiwidmFyIG5ld2xpbmUgPSAvXFxuL1xudmFyIG5ld2xpbmVDaGFyID0gJ1xcbidcbnZhciB3aGl0ZXNwYWNlID0gL1xccy9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih0ZXh0LCBvcHQpIHtcbiAgICB2YXIgbGluZXMgPSBtb2R1bGUuZXhwb3J0cy5saW5lcyh0ZXh0LCBvcHQpXG4gICAgcmV0dXJuIGxpbmVzLm1hcChmdW5jdGlvbihsaW5lKSB7XG4gICAgICAgIHJldHVybiB0ZXh0LnN1YnN0cmluZyhsaW5lLnN0YXJ0LCBsaW5lLmVuZClcbiAgICB9KS5qb2luKCdcXG4nKVxufVxuXG5tb2R1bGUuZXhwb3J0cy5saW5lcyA9IGZ1bmN0aW9uIHdvcmR3cmFwKHRleHQsIG9wdCkge1xuICAgIG9wdCA9IG9wdHx8e31cblxuICAgIC8vemVybyB3aWR0aCByZXN1bHRzIGluIG5vdGhpbmcgdmlzaWJsZVxuICAgIGlmIChvcHQud2lkdGggPT09IDAgJiYgb3B0Lm1vZGUgIT09ICdub3dyYXAnKSBcbiAgICAgICAgcmV0dXJuIFtdXG5cbiAgICB0ZXh0ID0gdGV4dHx8JydcbiAgICB2YXIgd2lkdGggPSB0eXBlb2Ygb3B0LndpZHRoID09PSAnbnVtYmVyJyA/IG9wdC53aWR0aCA6IE51bWJlci5NQVhfVkFMVUVcbiAgICB2YXIgc3RhcnQgPSBNYXRoLm1heCgwLCBvcHQuc3RhcnR8fDApXG4gICAgdmFyIGVuZCA9IHR5cGVvZiBvcHQuZW5kID09PSAnbnVtYmVyJyA/IG9wdC5lbmQgOiB0ZXh0Lmxlbmd0aFxuICAgIHZhciBtb2RlID0gb3B0Lm1vZGVcblxuICAgIHZhciBtZWFzdXJlID0gb3B0Lm1lYXN1cmUgfHwgbW9ub3NwYWNlXG4gICAgaWYgKG1vZGUgPT09ICdwcmUnKVxuICAgICAgICByZXR1cm4gcHJlKG1lYXN1cmUsIHRleHQsIHN0YXJ0LCBlbmQsIHdpZHRoKVxuICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIGdyZWVkeShtZWFzdXJlLCB0ZXh0LCBzdGFydCwgZW5kLCB3aWR0aCwgbW9kZSlcbn1cblxuZnVuY3Rpb24gaWR4T2YodGV4dCwgY2hyLCBzdGFydCwgZW5kKSB7XG4gICAgdmFyIGlkeCA9IHRleHQuaW5kZXhPZihjaHIsIHN0YXJ0KVxuICAgIGlmIChpZHggPT09IC0xIHx8IGlkeCA+IGVuZClcbiAgICAgICAgcmV0dXJuIGVuZFxuICAgIHJldHVybiBpZHhcbn1cblxuZnVuY3Rpb24gaXNXaGl0ZXNwYWNlKGNocikge1xuICAgIHJldHVybiB3aGl0ZXNwYWNlLnRlc3QoY2hyKVxufVxuXG5mdW5jdGlvbiBwcmUobWVhc3VyZSwgdGV4dCwgc3RhcnQsIGVuZCwgd2lkdGgpIHtcbiAgICB2YXIgbGluZXMgPSBbXVxuICAgIHZhciBsaW5lU3RhcnQgPSBzdGFydFxuICAgIGZvciAodmFyIGk9c3RhcnQ7IGk8ZW5kICYmIGk8dGV4dC5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY2hyID0gdGV4dC5jaGFyQXQoaSlcbiAgICAgICAgdmFyIGlzTmV3bGluZSA9IG5ld2xpbmUudGVzdChjaHIpXG5cbiAgICAgICAgLy9JZiB3ZSd2ZSByZWFjaGVkIGEgbmV3bGluZSwgdGhlbiBzdGVwIGRvd24gYSBsaW5lXG4gICAgICAgIC8vT3IgaWYgd2UndmUgcmVhY2hlZCB0aGUgRU9GXG4gICAgICAgIGlmIChpc05ld2xpbmUgfHwgaT09PWVuZC0xKSB7XG4gICAgICAgICAgICB2YXIgbGluZUVuZCA9IGlzTmV3bGluZSA/IGkgOiBpKzFcbiAgICAgICAgICAgIHZhciBtZWFzdXJlZCA9IG1lYXN1cmUodGV4dCwgbGluZVN0YXJ0LCBsaW5lRW5kLCB3aWR0aClcbiAgICAgICAgICAgIGxpbmVzLnB1c2gobWVhc3VyZWQpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxpbmVTdGFydCA9IGkrMVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBsaW5lc1xufVxuXG5mdW5jdGlvbiBncmVlZHkobWVhc3VyZSwgdGV4dCwgc3RhcnQsIGVuZCwgd2lkdGgsIG1vZGUpIHtcbiAgICAvL0EgZ3JlZWR5IHdvcmQgd3JhcHBlciBiYXNlZCBvbiBMaWJHRFggYWxnb3JpdGhtXG4gICAgLy9odHRwczovL2dpdGh1Yi5jb20vbGliZ2R4L2xpYmdkeC9ibG9iL21hc3Rlci9nZHgvc3JjL2NvbS9iYWRsb2dpYy9nZHgvZ3JhcGhpY3MvZzJkL0JpdG1hcEZvbnRDYWNoZS5qYXZhXG4gICAgdmFyIGxpbmVzID0gW11cblxuICAgIHZhciB0ZXN0V2lkdGggPSB3aWR0aFxuICAgIC8vaWYgJ25vd3JhcCcgaXMgc3BlY2lmaWVkLCB3ZSBvbmx5IHdyYXAgb24gbmV3bGluZSBjaGFyc1xuICAgIGlmIChtb2RlID09PSAnbm93cmFwJylcbiAgICAgICAgdGVzdFdpZHRoID0gTnVtYmVyLk1BWF9WQUxVRVxuXG4gICAgd2hpbGUgKHN0YXJ0IDwgZW5kICYmIHN0YXJ0IDwgdGV4dC5sZW5ndGgpIHtcbiAgICAgICAgLy9nZXQgbmV4dCBuZXdsaW5lIHBvc2l0aW9uXG4gICAgICAgIHZhciBuZXdMaW5lID0gaWR4T2YodGV4dCwgbmV3bGluZUNoYXIsIHN0YXJ0LCBlbmQpXG5cbiAgICAgICAgLy9lYXQgd2hpdGVzcGFjZSBhdCBzdGFydCBvZiBsaW5lXG4gICAgICAgIHdoaWxlIChzdGFydCA8IG5ld0xpbmUpIHtcbiAgICAgICAgICAgIGlmICghaXNXaGl0ZXNwYWNlKCB0ZXh0LmNoYXJBdChzdGFydCkgKSlcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgc3RhcnQrK1xuICAgICAgICB9XG5cbiAgICAgICAgLy9kZXRlcm1pbmUgdmlzaWJsZSAjIG9mIGdseXBocyBmb3IgdGhlIGF2YWlsYWJsZSB3aWR0aFxuICAgICAgICB2YXIgbWVhc3VyZWQgPSBtZWFzdXJlKHRleHQsIHN0YXJ0LCBuZXdMaW5lLCB0ZXN0V2lkdGgpXG5cbiAgICAgICAgdmFyIGxpbmVFbmQgPSBzdGFydCArIChtZWFzdXJlZC5lbmQtbWVhc3VyZWQuc3RhcnQpXG4gICAgICAgIHZhciBuZXh0U3RhcnQgPSBsaW5lRW5kICsgbmV3bGluZUNoYXIubGVuZ3RoXG5cbiAgICAgICAgLy9pZiB3ZSBoYWQgdG8gY3V0IHRoZSBsaW5lIGJlZm9yZSB0aGUgbmV4dCBuZXdsaW5lLi4uXG4gICAgICAgIGlmIChsaW5lRW5kIDwgbmV3TGluZSkge1xuICAgICAgICAgICAgLy9maW5kIGNoYXIgdG8gYnJlYWsgb25cbiAgICAgICAgICAgIHdoaWxlIChsaW5lRW5kID4gc3RhcnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNXaGl0ZXNwYWNlKHRleHQuY2hhckF0KGxpbmVFbmQpKSlcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICBsaW5lRW5kLS1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsaW5lRW5kID09PSBzdGFydCkge1xuICAgICAgICAgICAgICAgIGlmIChuZXh0U3RhcnQgPiBzdGFydCArIG5ld2xpbmVDaGFyLmxlbmd0aCkgbmV4dFN0YXJ0LS1cbiAgICAgICAgICAgICAgICBsaW5lRW5kID0gbmV4dFN0YXJ0IC8vIElmIG5vIGNoYXJhY3RlcnMgdG8gYnJlYWssIHNob3cgYWxsLlxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXh0U3RhcnQgPSBsaW5lRW5kXG4gICAgICAgICAgICAgICAgLy9lYXQgd2hpdGVzcGFjZSBhdCBlbmQgb2YgbGluZVxuICAgICAgICAgICAgICAgIHdoaWxlIChsaW5lRW5kID4gc3RhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1doaXRlc3BhY2UodGV4dC5jaGFyQXQobGluZUVuZCAtIG5ld2xpbmVDaGFyLmxlbmd0aCkpKVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgbGluZUVuZC0tXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChsaW5lRW5kID49IHN0YXJ0KSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gbWVhc3VyZSh0ZXh0LCBzdGFydCwgbGluZUVuZCwgdGVzdFdpZHRoKVxuICAgICAgICAgICAgbGluZXMucHVzaChyZXN1bHQpXG4gICAgICAgIH1cbiAgICAgICAgc3RhcnQgPSBuZXh0U3RhcnRcbiAgICB9XG4gICAgcmV0dXJuIGxpbmVzXG59XG5cbi8vZGV0ZXJtaW5lcyB0aGUgdmlzaWJsZSBudW1iZXIgb2YgZ2x5cGhzIHdpdGhpbiBhIGdpdmVuIHdpZHRoXG5mdW5jdGlvbiBtb25vc3BhY2UodGV4dCwgc3RhcnQsIGVuZCwgd2lkdGgpIHtcbiAgICB2YXIgZ2x5cGhzID0gTWF0aC5taW4od2lkdGgsIGVuZC1zdGFydClcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgIGVuZDogc3RhcnQrZ2x5cGhzXG4gICAgfVxufSIsIm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kXG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbmZ1bmN0aW9uIGV4dGVuZCgpIHtcbiAgICB2YXIgdGFyZ2V0ID0ge31cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV1cblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0XG59XG4iXX0=
