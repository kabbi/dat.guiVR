(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

var _sharedmaterials = require('./sharedmaterials');

var SharedMaterials = _interopRequireWildcard(_sharedmaterials);

var _grab = require('./grab');

var Grab = _interopRequireWildcard(_grab);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createCheckbox() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var guiState = _ref.guiState;
  var textCreator = _ref.textCreator;
  var object = _ref.object;
  var _ref$propertyName = _ref.propertyName;
  var propertyName = _ref$propertyName === undefined ? 'undefined' : _ref$propertyName;
  var _ref$width = _ref.width;
  var width = _ref$width === undefined ? Layout.PANEL_WIDTH : _ref$width;
  var _ref$height = _ref.height;
  var height = _ref$height === undefined ? Layout.PANEL_HEIGHT : _ref$height;
  var _ref$depth = _ref.depth;
  var depth = _ref$depth === undefined ? Layout.PANEL_DEPTH : _ref$depth;


  var BUTTON_WIDTH = width * 0.5 - Layout.PANEL_MARGIN;
  var BUTTON_HEIGHT = height - Layout.PANEL_MARGIN;
  var BUTTON_DEPTH = depth;

  var group = new THREE.Group();

  var panel = Layout.createPanel(width, height, depth);
  group.add(panel);

  //  base checkbox
  var rect = new THREE.BoxGeometry(BUTTON_WIDTH, BUTTON_HEIGHT, BUTTON_DEPTH);
  rect.translate(BUTTON_WIDTH * 0.5, 0, 0);

  //  hitscan volume
  var hitscanMaterial = new THREE.MeshBasicMaterial();
  hitscanMaterial.visible = false;

  var hitscanVolume = new THREE.Mesh(rect.clone(), hitscanMaterial);
  hitscanVolume.position.z = depth;
  hitscanVolume.position.x = width * 0.5;

  //  outline volume
  var outline = new THREE.BoxHelper(hitscanVolume);
  outline.material.color.setHex(Colors.OUTLINE_COLOR);

  //  checkbox volume
  var material = new THREE.MeshPhongMaterial({ color: Colors.DEFAULT_COLOR, emissive: Colors.EMISSIVE_COLOR });
  var filledVolume = new THREE.Mesh(rect.clone(), material);
  hitscanVolume.add(filledVolume);

  var descriptorLabel = textCreator.create(propertyName);
  descriptorLabel.position.x = Layout.PANEL_LABEL_TEXT_MARGIN;
  descriptorLabel.position.z = depth;
  descriptorLabel.position.y = -0.03;

  var controllerID = Layout.createControllerIDBox(height, Colors.CONTROLLER_ID_BUTTON);
  controllerID.position.z = depth;

  panel.add(descriptorLabel, hitscanVolume, outline, controllerID);

  var interaction = (0, _interaction2.default)(guiState, hitscanVolume);
  interaction.events.on('onPressed', handleOnPress);

  updateView();

  function handleOnPress() {
    if (group.visible === false) {
      return;
    }

    object[propertyName]();
  }

  function updateView() {

    if (interaction.hovering()) {
      material.color.setHex(Colors.HIGHLIGHT_COLOR);
      material.emissive.setHex(Colors.HIGHLIGHT_EMISSIVE_COLOR);
    } else {
      material.emissive.setHex(Colors.EMISSIVE_COLOR);

      if (state.value) {
        material.color.setHex(Colors.DEFAULT_COLOR);
      } else {
        material.color.setHex(Colors.INACTIVE_COLOR);
      }
    }
  }

  group.interaction = interaction;
  group.hitscan = [hitscanVolume, panel];

  var grabInteraction = Grab.create({ group: group, panel: panel, guiState: guiState });

  group.update = function (inputObjects) {
    interaction.update(inputObjects);
    grabInteraction.update(inputObjects);
    updateView();
  };

  return group;
}

},{"./colors":3,"./grab":6,"./interaction":8,"./layout":9,"./sharedmaterials":11,"./textlabel":13}],2:[function(require,module,exports){
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

var _sharedmaterials = require('./sharedmaterials');

var SharedMaterials = _interopRequireWildcard(_sharedmaterials);

var _grab = require('./grab');

var Grab = _interopRequireWildcard(_grab);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createCheckbox() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var guiState = _ref.guiState;
  var textCreator = _ref.textCreator;
  var object = _ref.object;
  var _ref$propertyName = _ref.propertyName;
  var propertyName = _ref$propertyName === undefined ? 'undefined' : _ref$propertyName;
  var _ref$initialValue = _ref.initialValue;
  var initialValue = _ref$initialValue === undefined ? false : _ref$initialValue;
  var _ref$width = _ref.width;
  var width = _ref$width === undefined ? Layout.PANEL_WIDTH : _ref$width;
  var _ref$height = _ref.height;
  var height = _ref$height === undefined ? Layout.PANEL_HEIGHT : _ref$height;
  var _ref$depth = _ref.depth;
  var depth = _ref$depth === undefined ? Layout.PANEL_DEPTH : _ref$depth;


  var CHECKBOX_WIDTH = height - Layout.PANEL_MARGIN;
  var CHECKBOX_HEIGHT = CHECKBOX_WIDTH;
  var CHECKBOX_DEPTH = depth;

  var INACTIVE_SCALE = 0.001;
  var ACTIVE_SCALE = 0.9;

  var state = {
    value: initialValue
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
  var outline = new THREE.BoxHelper(hitscanVolume);
  outline.material.color.setHex(Colors.OUTLINE_COLOR);

  //  checkbox volume
  var material = new THREE.MeshPhongMaterial({ color: Colors.DEFAULT_COLOR, emissive: Colors.EMISSIVE_COLOR });
  var filledVolume = new THREE.Mesh(rect.clone(), material);
  filledVolume.scale.set(ACTIVE_SCALE, ACTIVE_SCALE, ACTIVE_SCALE);
  hitscanVolume.add(filledVolume);

  var descriptorLabel = textCreator.create(propertyName);
  descriptorLabel.position.x = Layout.PANEL_LABEL_TEXT_MARGIN;
  descriptorLabel.position.z = depth;
  descriptorLabel.position.y = -0.03;

  var controllerID = Layout.createControllerIDBox(height, Colors.CONTROLLER_ID_CHECKBOX);
  controllerID.position.z = depth;

  panel.add(descriptorLabel, hitscanVolume, outline, controllerID);

  // group.add( filledVolume, outline, hitscanVolume, descriptorLabel );

  var interaction = (0, _interaction2.default)(guiState, hitscanVolume);
  interaction.events.on('onPressed', handleOnPress);

  updateView();

  function handleOnPress() {
    if (group.visible === false) {
      return;
    }

    state.value = !state.value;

    object[propertyName] = state.value;

    if (onChangedCB) {
      onChangedCB(state.value);
    }
  }

  function updateView() {

    if (interaction.hovering()) {
      material.color.setHex(Colors.HIGHLIGHT_COLOR);
      material.emissive.setHex(Colors.HIGHLIGHT_EMISSIVE_COLOR);
    } else {
      material.emissive.setHex(Colors.EMISSIVE_COLOR);

      if (state.value) {
        material.color.setHex(Colors.DEFAULT_COLOR);
      } else {
        material.color.setHex(Colors.INACTIVE_COLOR);
      }
    }

    if (state.value) {
      filledVolume.scale.set(ACTIVE_SCALE, ACTIVE_SCALE, ACTIVE_SCALE);
    } else {
      filledVolume.scale.set(INACTIVE_SCALE, INACTIVE_SCALE, INACTIVE_SCALE);
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

  var grabInteraction = Grab.create({ group: group, panel: panel, guiState: guiState });

  group.update = function (inputObjects) {
    interaction.update(inputObjects);
    grabInteraction.update(inputObjects);
    updateView();
  };

  return group;
}

},{"./colors":3,"./grab":6,"./interaction":8,"./layout":9,"./sharedmaterials":11,"./textlabel":13}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.colorizeGeometry = colorizeGeometry;
var DEFAULT_COLOR = exports.DEFAULT_COLOR = 0x2FA1D6;
var HIGHLIGHT_COLOR = exports.HIGHLIGHT_COLOR = 0x0FC3FF;
var INTERACTION_COLOR = exports.INTERACTION_COLOR = 0x07ABF7;
var EMISSIVE_COLOR = exports.EMISSIVE_COLOR = 0x222222;
var HIGHLIGHT_EMISSIVE_COLOR = exports.HIGHLIGHT_EMISSIVE_COLOR = 0x999999;
var OUTLINE_COLOR = exports.OUTLINE_COLOR = 0x999999;
var DEFAULT_BACK = exports.DEFAULT_BACK = 0x131313;
var HIGHLIGHT_BACK = exports.HIGHLIGHT_BACK = 0x494949;
var INACTIVE_COLOR = exports.INACTIVE_COLOR = 0x161829;
var CONTROLLER_ID_SLIDER = exports.CONTROLLER_ID_SLIDER = 0x2fa1d6;
var CONTROLLER_ID_CHECKBOX = exports.CONTROLLER_ID_CHECKBOX = 0x806787;
var CONTROLLER_ID_BUTTON = exports.CONTROLLER_ID_BUTTON = 0xe61d5f;
var CONTROLLER_ID_TEXT = exports.CONTROLLER_ID_TEXT = 0x1ed36f;
var DROPDOWN_BG_COLOR = exports.DROPDOWN_BG_COLOR = 0xffffff;
var DROPDOWN_FG_COLOR = exports.DROPDOWN_FG_COLOR = 0x000000;

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

var _sharedmaterials = require('./sharedmaterials');

var SharedMaterials = _interopRequireWildcard(_sharedmaterials);

var _grab = require('./grab');

var Grab = _interopRequireWildcard(_grab);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function createCheckbox() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var guiState = _ref.guiState;
  var textCreator = _ref.textCreator;
  var object = _ref.object;
  var _ref$propertyName = _ref.propertyName;
  var propertyName = _ref$propertyName === undefined ? 'undefined' : _ref$propertyName;
  var _ref$initialValue = _ref.initialValue;
  var initialValue = _ref$initialValue === undefined ? false : _ref$initialValue;
  var _ref$options = _ref.options;
  var options = _ref$options === undefined ? [] : _ref$options;
  var _ref$width = _ref.width;
  var width = _ref$width === undefined ? Layout.PANEL_WIDTH : _ref$width;
  var _ref$height = _ref.height;
  var height = _ref$height === undefined ? Layout.PANEL_HEIGHT : _ref$height;
  var _ref$depth = _ref.depth;
  var depth = _ref$depth === undefined ? Layout.PANEL_DEPTH : _ref$depth;


  var DROPDOWN_WIDTH = width * 0.5 - Layout.PANEL_MARGIN;
  var DROPDOWN_HEIGHT = height - Layout.PANEL_MARGIN;
  var DROPDOWN_DEPTH = depth;
  var DROPDOWN_OPTION_HEIGHT = height - Layout.PANEL_MARGIN * 1.8;
  var DROPDOWN_MARGIN = Layout.PANEL_MARGIN;

  var group = new THREE.Group();

  var panel = Layout.createPanel(width, height, depth);
  group.add(panel);

  group.hitscan = [panel];

  var labelInteractions = [];
  var optionLabels = [];

  //  find actually which label is selected
  var initialLabel = Object.keys(options).find(function (optionName) {
    return object[propertyName] === options[optionName];
  });

  function createOption(labelText, isOption) {
    var label = (0, _textlabel2.default)(textCreator, labelText, DROPDOWN_WIDTH, depth, Colors.DROPDOWN_FG_COLOR, Colors.DROPDOWN_BG_COLOR);
    group.hitscan.push(label.back);
    var labelInteraction = (0, _interaction2.default)(guiState, label.back);
    labelInteractions.push(labelInteraction);
    optionLabels.push(label);

    if (isOption) {
      labelInteraction.events.on('onPressed', function () {
        selectedLabel.setString(labelText);
        object[propertyName] = options[labelText];
        collapseOptions();
        if (onChangedCB) {
          onChangedCB(object[propertyName]);
        }
      });
    } else {
      labelInteraction.events.on('onPressed', function () {
        openOptions();
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
  selectedLabel.position.x = Layout.PANEL_MARGIN + width * 0.5;
  selectedLabel.position.z = depth;

  selectedLabel.add(function createDownArrow() {
    var w = 0.015;
    var h = 0.03;
    var sh = new THREE.Shape();
    sh.moveTo(0, 0);
    sh.lineTo(-w, h);
    sh.lineTo(w, h);
    sh.lineTo(0, 0);

    var geo = new THREE.ShapeGeometry(sh);
    Colors.colorizeGeometry(geo, Colors.DROPDOWN_FG_COLOR);
    geo.translate(DROPDOWN_WIDTH - w * 4, -DROPDOWN_HEIGHT * 0.5 + h * 0.5, depth * 1.01);

    return new THREE.Mesh(geo, SharedMaterials.PANEL);
  }());

  selectedLabel.add.apply(selectedLabel, _toConsumableArray(Object.keys(options).map(function (optionName, index) {
    var optionLabel = createOption(optionName, true);
    optionLabel.position.y = -DROPDOWN_MARGIN - (index + 1) * DROPDOWN_OPTION_HEIGHT;
    optionLabel.position.z = depth;
    return optionLabel;
  })));

  collapseOptions();

  var descriptorLabel = textCreator.create(propertyName);
  descriptorLabel.position.x = Layout.PANEL_LABEL_TEXT_MARGIN;
  descriptorLabel.position.z = depth;
  descriptorLabel.position.y = -0.03;

  var controllerID = Layout.createControllerIDBox(height, Colors.CONTROLLER_ID_SLIDER);
  controllerID.position.z = depth;

  panel.add(descriptorLabel, controllerID, selectedLabel);

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
  }

  var onChangedCB = void 0;
  var onFinishChangeCB = void 0;

  group.onChange = function (callback) {
    onChangedCB = callback;
    return group;
  };

  var grabInteraction = Grab.create({ group: group, panel: panel, guiState: guiState });

  group.update = function (inputObjects) {
    labelInteractions.forEach(function (labelInteraction) {
      labelInteraction.update(inputObjects);
    });
    grabInteraction.update(inputObjects);
    updateView();
  };

  return group;
}

},{"./colors":3,"./grab":6,"./interaction":8,"./layout":9,"./sharedmaterials":11,"./textlabel":13}],5:[function(require,module,exports){
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

var _sharedmaterials = require('./sharedmaterials');

var SharedMaterials = _interopRequireWildcard(_sharedmaterials);

var _grab = require('./grab');

var Grab = _interopRequireWildcard(_grab);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createFolder() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var guiState = _ref.guiState;
  var textCreator = _ref.textCreator;
  var name = _ref.name;


  var width = Layout.PANEL_WIDTH;

  var spacingPerController = Layout.PANEL_HEIGHT + Layout.PANEL_SPACING;

  var state = {
    collapsed: false,
    previousParent: undefined
  };

  var group = new THREE.Group();
  var collapseGroup = new THREE.Group();
  group.add(collapseGroup);

  //  Yeah. Gross.
  var addOriginal = THREE.Group.prototype.add;
  addOriginal.call(group, collapseGroup);

  var descriptorLabel = (0, _textlabel2.default)(textCreator, '- ' + name, 0.6);
  descriptorLabel.position.y = Layout.PANEL_HEIGHT * 0.5;

  addOriginal.call(group, descriptorLabel);

  var panel = new THREE.Mesh(new THREE.BoxGeometry(width, 1, Layout.PANEL_DEPTH), SharedMaterials.FOLDER);
  panel.geometry.translate(width * 0.5, 0, -Layout.PANEL_DEPTH);
  addOriginal.call(group, panel);

  // const interactionVolume = new THREE.Mesh( new THREE.BoxGeometry( width, 1, Layout.PANEL_DEPTH ), new THREE.MeshBasicMaterial({color:0x000000}) );
  // interactionVolume.geometry.translate( width * 0.5 - Layout.PANEL_MARGIN, 0, -Layout.PANEL_DEPTH );
  // addOriginal.call( group, interactionVolume );
  // interactionVolume.visible = false;

  var interaction = (0, _interaction2.default)(guiState, panel);
  // interaction.events.on( 'onPressed', handlePress );

  function handlePress() {
    state.collapsed = !state.collapsed;
    performLayout();
  }

  group.add = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    args.forEach(function (obj) {
      var container = new THREE.Group();
      container.add(obj);
      collapseGroup.add(container);
      obj.folder = group;
    });

    performLayout();
  };

  function performLayout() {
    collapseGroup.children.forEach(function (child, index) {
      child.position.y = -(index + 1) * spacingPerController + Layout.PANEL_HEIGHT * 0.5;
      if (state.collapsed) {
        child.children[0].visible = false;
      } else {
        child.children[0].visible = true;
      }
    });

    if (state.collapsed) {
      descriptorLabel.setString('+ ' + name);
    } else {
      descriptorLabel.setString('- ' + name);
    }

    var totalHeight = collapseGroup.children.length * spacingPerController;
    panel.geometry = new THREE.BoxGeometry(width, totalHeight, Layout.PANEL_DEPTH);
    panel.geometry.translate(width * 0.5, -totalHeight * 0.5, -Layout.PANEL_DEPTH);
    panel.geometry.computeBoundingBox();
  }

  function updateLabel() {
    // if( interaction.hovering() ){
    //   descriptorLabel.back.material.color.setHex( Colors.HIGHLIGHT_BACK );
    // }
    // else{
    // descriptorLabel.back.material.color.setHex( Colors.DEFAULT_BACK );
    // }
  }

  group.folder = group;
  var grabInteraction = Grab.create({ group: group, panel: descriptorLabel.back, guiState: guiState });

  group.update = function (inputObjects) {
    interaction.update(inputObjects);
    grabInteraction.update(inputObjects);
    updateLabel();
  };

  group.pinTo = function (newParent) {
    var oldParent = group.parent;

    if (group.parent) {
      group.parent.remove(group);
    }
    newParent.add(group);

    return oldParent;
  };

  group.hitscan = [panel, descriptorLabel.back];

  return group;
}

},{"./colors":3,"./grab":6,"./interaction":8,"./layout":9,"./sharedmaterials":11,"./textlabel":13}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;

var _interaction = require('./interaction');

var _interaction2 = _interopRequireDefault(_interaction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function create() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var group = _ref.group;
  var panel = _ref.panel;
  var guiState = _ref.guiState;


  var interaction = (0, _interaction2.default)(guiState, panel);

  interaction.events.on('onGripped', handleOnGrip);
  interaction.events.on('onReleaseGrip', handleReleaseGrip);

  var tempMatrix = new THREE.Matrix4();

  var oldParent = void 0;

  function handleOnGrip() {
    var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var inputObject = _ref2.inputObject;


    var folder = group.folder;
    if (folder === undefined) {
      return;
    }

    tempMatrix.getInverse(inputObject.matrixWorld);

    folder.matrix.premultiply(tempMatrix);
    folder.matrix.decompose(folder.position, folder.quaternion, folder.scale);

    oldParent = folder.parent;
    inputObject.add(folder);
  }

  function handleReleaseGrip() {
    var _ref3 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var inputObject = _ref3.inputObject;

    var folder = group.folder;
    if (folder === undefined) {
      return;
    }
    if (oldParent === undefined) {
      return;
    }
    folder.matrix.premultiply(inputObject.matrixWorld);
    folder.matrix.decompose(folder.position, folder.quaternion, folder.scale);
    oldParent.add(folder);
    oldParent = undefined;
  }

  return interaction;
}

},{"./interaction":8}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = DATGUIVR;

var _loadBmfont = require('load-bmfont');

var _loadBmfont2 = _interopRequireDefault(_loadBmfont);

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

var _sdftext = require('./sdftext');

var SDFText = _interopRequireWildcard(_sdftext);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function DATGUIVR() {

  var textMaterial = SDFText.createMaterial();

  var inputObjects = [];
  var controllers = [];
  var hitscanObjects = [];

  var events = new _events2.default();
  events.setMaxListeners(100);

  var DEFAULT_FNT = 'fonts/lucidasansunicode.fnt';

  var guiState = {
    currentHover: undefined,
    currentInteraction: undefined,
    events: new _events2.default()
  };

  (0, _loadBmfont2.default)(DEFAULT_FNT, function (err, font) {
    if (err) {
      console.warn(err);
    }
    events.emit('fontLoaded', font);
  });

  var textCreator = SDFText.creator(textMaterial, events);

  var cursorMaterial = new THREE.MeshBasicMaterial({ color: 0x444444, transparent: true, blending: THREE.AdditiveBlending });

  function createCursor() {
    return new THREE.Mesh(new THREE.SphereGeometry(0.006, 4, 4), cursorMaterial);
  }

  var laserMaterial = new THREE.LineBasicMaterial({ color: 0x55aaff, transparent: true, blending: THREE.AdditiveBlending });
  function createLaser() {
    var g = new THREE.Geometry();
    g.vertices.push(new THREE.Vector3());
    g.vertices.push(new THREE.Vector3(0, 0, 0));

    return new THREE.Line(g, laserMaterial);
  }

  function addInputObject(object) {
    var input = {
      raycast: new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3()),
      laser: createLaser(),
      cursor: createCursor(),
      object: object,
      pressed: false,
      gripped: false
    };

    input.laser.add(input.cursor);

    input.laser.pressed = function (flag) {
      input.pressed = flag;
    };

    input.laser.gripped = function (flag) {
      input.gripped = flag;
    };

    if (THREE.ViveController && object instanceof THREE.ViveController) {
      bindViveController(guiState, object, input.laser.pressed, input.laser.gripped);
    }

    inputObjects.push(input);

    return input.laser;
  }

  function addSlider(object, propertyName) {
    var min = arguments.length <= 2 || arguments[2] === undefined ? 0.0 : arguments[2];
    var max = arguments.length <= 3 || arguments[3] === undefined ? 100.0 : arguments[3];

    var slider = (0, _slider2.default)({
      guiState: guiState, textCreator: textCreator, propertyName: propertyName, object: object, min: min, max: max,
      initialValue: object[propertyName]
    });

    controllers.push(slider);
    hitscanObjects.push.apply(hitscanObjects, _toConsumableArray(slider.hitscan));

    return slider;
  }

  function addCheckbox(object, propertyName) {
    var checkbox = (0, _checkbox2.default)({
      guiState: guiState, textCreator: textCreator, propertyName: propertyName, object: object,
      initialValue: object[propertyName]
    });

    controllers.push(checkbox);
    hitscanObjects.push.apply(hitscanObjects, _toConsumableArray(checkbox.hitscan));

    return checkbox;
  }

  function addButton(object, propertyName) {
    var button = (0, _button2.default)({
      guiState: guiState, textCreator: textCreator, propertyName: propertyName, object: object
    });

    controllers.push(button);
    hitscanObjects.push.apply(hitscanObjects, _toConsumableArray(button.hitscan));
    return button;
  }

  function addDropdown(object, propertyName, options) {
    var dropdown = (0, _dropdown2.default)({
      guiState: guiState, textCreator: textCreator, propertyName: propertyName, object: object, options: options
    });

    controllers.push(dropdown);
    hitscanObjects.push.apply(hitscanObjects, _toConsumableArray(dropdown.hitscan));
    return dropdown;
  }

  function add(object, propertyName, arg3, arg4) {

    if (object === undefined) {
      console.warn('object is undefined');
      return new THREE.Group();
    } else if (object[propertyName] === undefined) {
      console.warn('no property named', propertyName, 'on object', object);
      return new THREE.Group();
    }

    if (isObject(arg3)) {
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
  }

  function addFolder(name) {
    var folder = (0, _folder2.default)({
      guiState: guiState, textCreator: textCreator,
      name: name
    });

    controllers.push(folder);
    if (folder.hitscan) {
      hitscanObjects.push.apply(hitscanObjects, _toConsumableArray(folder.hitscan));
    }

    return folder;
  }

  var tPosition = new THREE.Vector3();
  var tDirection = new THREE.Vector3(0, 0, -1);
  var tMatrix = new THREE.Matrix4();

  function update() {
    requestAnimationFrame(update);

    inputObjects.forEach(function () {
      var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var box = _ref.box;
      var object = _ref.object;
      var raycast = _ref.raycast;
      var laser = _ref.laser;
      var cursor = _ref.cursor;
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
      if (intersections.length > 0) {
        var firstHit = intersections[0];
        laser.geometry.vertices[1].copy(firstHit.point);
        laser.visible = true;
        laser.geometry.computeBoundingSphere();
        laser.geometry.computeBoundingBox();
        laser.geometry.verticesNeedUpdate = true;
        cursor.position.copy(firstHit.point);
        cursor.visible = true;
      } else {
        laser.visible = false;
        cursor.visible = false;
      }

      inputObjects[index].intersections = intersections;
    });

    controllers.forEach(function (controller) {
      controller.update(inputObjects);
    });
  }

  update();

  return {
    addInputObject: addInputObject,
    add: add,
    addFolder: addFolder
  };
}

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

function bindViveController(guiState, controller, pressed, gripped) {
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
  guiState.events.on('onControllerHeld', function (input) {
    if (input.object === controller) {
      if (gamepad && gamepad.haptics.length > 0) {
        gamepad.haptics[0].vibrate(0.3, 0.3);
      }
    }
  });
}

if (window) {
  window.DATGUIVR = DATGUIVR;
}

},{"./button":1,"./checkbox":2,"./dropdown":4,"./folder":5,"./sdftext":10,"./slider":12,"events":18,"load-bmfont":19}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createInteraction;

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createInteraction(guiState, hitVolume) {
  var events = new _events2.default();

  var state = {
    hover: false,
    pressed: false,
    gripped: false
  };

  function isMainInteraction() {
    return guiState.currentInteraction === interaction;
  }

  function hasMainInteraction() {
    return guiState.currentInteraction !== undefined;
  }

  function setMainInteraction() {
    guiState.currentInteraction = interaction;
  }

  function clearMainInteraction() {
    guiState.currentInteraction = undefined;
  }

  var tVector = new THREE.Vector3();

  function update(inputObjects) {
    state.lastHover = state.hover;

    state.hover = false;

    inputObjects.forEach(function (input) {
      var hitPoint = void 0;
      var hitObject = void 0;

      if (input.intersections.length <= 0) {
        state.hover = false;
        hitPoint = tVector.setFromMatrixPosition(input.cursor.matrixWorld).clone();
        hitObject = input.cursor;
      } else {
        hitPoint = input.intersections[0].point;
        hitObject = input.intersections[0].object;
      }

      if (hasMainInteraction() === false && hitVolume === hitObject) {
        state.hover = true;
      }

      var used = performStateEvents(input, hitObject, hitPoint, 'pressed', 'onPressed', 'pressing', 'onReleased');
      used = used || performStateEvents(input, hitObject, hitPoint, 'gripped', 'onGripped', 'gripping', 'onReleaseGrip');

      if (used === false && isMainInteraction()) {
        clearMainInteraction();
      }
    });
  }

  function performStateEvents(input, hitObject, hitPoint, stateToCheck, clickName, holdName, releaseName) {
    if (input[stateToCheck] && state.hover && hasMainInteraction() === false) {
      if (state[stateToCheck] === false) {
        state[stateToCheck] = true;
        setMainInteraction();

        events.emit(clickName, {
          hitObject: hitObject,
          inputObject: input.object,
          point: hitPoint
        });
      }
    }

    if (input[stateToCheck] === false && isMainInteraction()) {
      state[stateToCheck] = false;
      events.emit(releaseName, {
        hitObject: hitObject,
        inputObject: input.object,
        point: hitPoint
      });
    }

    if (state[stateToCheck]) {
      events.emit(holdName, {
        hitObject: hitObject,
        inputObject: input.object,
        point: hitPoint
      });

      guiState.events.emit('onControllerHeld', input);
    }

    return state[stateToCheck];
  }

  var interaction = {
    hovering: function hovering() {
      return state.hover;
    },
    pressing: function pressing() {
      return state.pressed;
    },
    update: update,
    events: events
  };

  return interaction;
}

},{"events":18}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CONTROLLER_ID_DEPTH = exports.CONTROLLER_ID_WIDTH = exports.PANEL_VALUE_TEXT_MARGIN = exports.PANEL_LABEL_TEXT_MARGIN = exports.PANEL_MARGIN = exports.PANEL_SPACING = exports.PANEL_DEPTH = exports.PANEL_HEIGHT = exports.PANEL_WIDTH = undefined;
exports.alignLeft = alignLeft;
exports.createPanel = createPanel;
exports.createControllerIDBox = createControllerIDBox;

var _sharedmaterials = require('./sharedmaterials');

var SharedMaterials = _interopRequireWildcard(_sharedmaterials);

var _colors = require('./colors');

var Colors = _interopRequireWildcard(_colors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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

function createPanel(width, height, depth) {
  var panel = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), SharedMaterials.PANEL);
  panel.geometry.translate(width * 0.5, 0, 0);
  Colors.colorizeGeometry(panel.geometry, Colors.DEFAULT_BACK);
  return panel;
}

function createControllerIDBox(height, color) {
  var panel = new THREE.Mesh(new THREE.BoxGeometry(CONTROLLER_ID_WIDTH, height, CONTROLLER_ID_DEPTH), SharedMaterials.PANEL);
  panel.geometry.translate(CONTROLLER_ID_WIDTH * 0.5, 0, 0);
  Colors.colorizeGeometry(panel.geometry, color);
  return panel;
}

var PANEL_WIDTH = exports.PANEL_WIDTH = 1.0;
var PANEL_HEIGHT = exports.PANEL_HEIGHT = 0.07;
var PANEL_DEPTH = exports.PANEL_DEPTH = 0.01;
var PANEL_SPACING = exports.PANEL_SPACING = 0.002;
var PANEL_MARGIN = exports.PANEL_MARGIN = 0.005;
var PANEL_LABEL_TEXT_MARGIN = exports.PANEL_LABEL_TEXT_MARGIN = 0.06;
var PANEL_VALUE_TEXT_MARGIN = exports.PANEL_VALUE_TEXT_MARGIN = 0.02;
var CONTROLLER_ID_WIDTH = exports.CONTROLLER_ID_WIDTH = 0.02;
var CONTROLLER_ID_DEPTH = exports.CONTROLLER_ID_DEPTH = 0.005;

},{"./colors":3,"./sharedmaterials":11}],10:[function(require,module,exports){
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createMaterial(color) {

  var loader = new THREE.TextureLoader();
  loader.load('fonts/lucidasansunicode.png', function (texture) {
    texture.needsUpdate = true;
    texture.minFilter = THREE.LinearMipMapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;
    material.uniforms.map.value = texture;

    //  TODO
    //  add aniso
  });

  var material = new THREE.RawShaderMaterial((0, _sdf2.default)({
    side: THREE.DoubleSide,
    transparent: true,
    color: color
  }));

  return material;
}

function creator(material, events) {

  var font = void 0;

  events.on('fontLoaded', function (font) {
    font = font;
  });

  var colorMaterials = {};

  function createText(str, font) {
    var color = arguments.length <= 2 || arguments[2] === undefined ? 0xffffff : arguments[2];


    var geometry = (0, _threeBmfontText2.default)({
      text: str,
      align: 'left',
      width: 1000,
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
    mesh.scale.multiplyScalar(0.001);

    mesh.position.y = layout.height * 0.5 * 0.001;

    return mesh;
  }

  function create(str) {
    var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var _ref$color = _ref.color;
    var color = _ref$color === undefined ? 0xffffff : _ref$color;

    var group = new THREE.Group();
    var lateText = str;

    var mesh = void 0;

    if (font) {
      mesh = createText(lateText, font, color);
      group.add(mesh);
      group.layout = mesh.geometry.layout;
    } else {
      (function () {
        var fontLoadedCB = function fontLoadedCB(font) {
          mesh = createText(lateText, font, color);
          group.add(mesh);
          group.layout = mesh.geometry.layout;
          events.removeListener('fontLoaded', fontLoadedCB);
        };

        ;
        events.on('fontLoaded', fontLoadedCB);
      })();
    }

    group.update = function (str) {
      if (mesh) {
        mesh.geometry.update(str);
      } else {
        lateText = str;
      }
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

},{"three-bmfont-text":34,"three-bmfont-text/shaders/sdf":51}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FOLDER = exports.LOCATOR = exports.PANEL = undefined;

var _colors = require('./colors');

var Colors = _interopRequireWildcard(_colors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var PANEL = exports.PANEL = new THREE.MeshBasicMaterial({ color: 0xffffff, vertexColors: THREE.VertexColors });
var LOCATOR = exports.LOCATOR = new THREE.MeshBasicMaterial();
var FOLDER = exports.FOLDER = new THREE.MeshBasicMaterial({ color: 0x000000 });

},{"./colors":3}],12:[function(require,module,exports){
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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createSlider() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var guiState = _ref.guiState;
  var textCreator = _ref.textCreator;
  var object = _ref.object;
  var _ref$propertyName = _ref.propertyName;
  var propertyName = _ref$propertyName === undefined ? 'undefined' : _ref$propertyName;
  var _ref$initialValue = _ref.initialValue;
  var initialValue = _ref$initialValue === undefined ? 0.0 : _ref$initialValue;
  var min = _ref.min;
  var max = _ref.max;
  var _ref$width = _ref.width;
  var width = _ref$width === undefined ? Layout.PANEL_WIDTH : _ref$width;
  var _ref$height = _ref.height;
  var height = _ref$height === undefined ? Layout.PANEL_HEIGHT : _ref$height;
  var _ref$depth = _ref.depth;
  var depth = _ref$depth === undefined ? Layout.PANEL_DEPTH : _ref$depth;


  var SLIDER_WIDTH = width * 0.5 - Layout.PANEL_MARGIN;
  var SLIDER_HEIGHT = height - Layout.PANEL_MARGIN;
  var SLIDER_DEPTH = depth;

  var state = {
    alpha: 1.0,
    value: initialValue,
    step: 3
  };

  state.value = state.value.toFixed(state.step - 1);
  state.alpha = map_range(initialValue, min, max, 0.0, 1.0);

  var group = new THREE.Group();

  //  filled volume
  var rect = new THREE.BoxGeometry(SLIDER_WIDTH, SLIDER_HEIGHT, SLIDER_DEPTH);
  rect.translate(SLIDER_WIDTH * 0.5, 0, 0);
  // Layout.alignLeft( rect );


  var hitscanMaterial = new THREE.MeshBasicMaterial();
  hitscanMaterial.visible = false;

  //  outline volume
  var hitscanVolume = new THREE.Mesh(rect.clone(), hitscanMaterial);
  hitscanVolume.position.z = depth;
  hitscanVolume.position.x = width * 0.5;

  var outline = new THREE.BoxHelper(hitscanVolume);
  outline.material.color.setHex(Colors.OUTLINE_COLOR);

  var material = new THREE.MeshPhongMaterial({ color: Colors.DEFAULT_COLOR, emissive: Colors.EMISSIVE_COLOR });
  var filledVolume = new THREE.Mesh(rect.clone(), material);
  hitscanVolume.add(filledVolume);

  var endLocator = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.05, 1, 1, 1), SharedMaterials.LOCATOR);
  endLocator.position.x = SLIDER_WIDTH;
  hitscanVolume.add(endLocator);
  endLocator.visible = false;

  var valueLabel = textCreator.create(state.value.toString());
  valueLabel.position.x = Layout.PANEL_VALUE_TEXT_MARGIN + width * 0.5;
  valueLabel.position.z = depth * 2;
  valueLabel.position.y = -0.03;
  updateValueLabel(state.value);

  var descriptorLabel = textCreator.create(propertyName);
  descriptorLabel.position.x = Layout.PANEL_LABEL_TEXT_MARGIN;
  descriptorLabel.position.z = depth;
  descriptorLabel.position.y = -0.03;

  var controllerID = Layout.createControllerIDBox(height, Colors.CONTROLLER_ID_SLIDER);
  controllerID.position.z = depth;

  var panel = Layout.createPanel(width, height, depth);
  panel.add(descriptorLabel, hitscanVolume, outline, valueLabel, controllerID);

  group.add(panel);

  filledVolume.scale.x = 0.5; //state.alpha * width;

  var interaction = (0, _interaction2.default)(guiState, hitscanVolume);
  interaction.events.on('pressing', handlePress);

  function handlePress() {
    var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var point = _ref2.point;

    if (group.visible === false) {
      return;
    }

    filledVolume.updateMatrixWorld();
    endLocator.updateMatrixWorld();

    var a = new THREE.Vector3().setFromMatrixPosition(filledVolume.matrixWorld);
    var b = new THREE.Vector3().setFromMatrixPosition(endLocator.matrixWorld);

    var pointAlpha = getPointAlpha(point, { a: a, b: b });
    state.alpha = pointAlpha;

    filledVolume.scale.x = Math.max(state.alpha * width, 0.000001);

    state.value = map_range(state.alpha, 0.0, 1.0, min, max);
    if (state.value < min) {
      state.value = min;
    }
    if (state.value > max) {
      state.value = max;
    }

    state.value = parseFloat(state.value.toFixed(state.step - 1));

    object[propertyName] = state.value;

    updateValueLabel(state.value);

    if (onChangedCB) {
      onChangedCB(state.value);
    }
  }

  function updateValueLabel(value) {
    valueLabel.update(parseFloat(value).toString());
  }

  function updateView() {
    if (interaction.pressing()) {
      material.color.setHex(Colors.INTERACTION_COLOR);
    } else if (interaction.hovering()) {
      material.color.setHex(Colors.HIGHLIGHT_COLOR);
      material.emissive.setHex(Colors.HIGHLIGHT_EMISSIVE_COLOR);
    } else {
      material.color.setHex(Colors.DEFAULT_COLOR);
      material.emissive.setHex(Colors.EMISSIVE_COLOR);
    }
  }

  var onChangedCB = void 0;
  var onFinishChangeCB = void 0;

  group.onChange = function (callback) {
    onChangedCB = callback;
    return group;
  };

  group.step = function (stepCount) {
    state.step = stepCount;
    return group;
  };

  group.interaction = interaction;
  group.hitscan = [hitscanVolume, panel];

  var grabInteraction = Grab.create({ group: group, panel: panel, guiState: guiState });

  group.update = function (inputObjects) {
    interaction.update(inputObjects);
    grabInteraction.update(inputObjects);
    updateView();
  };

  return group;
}

function getPointAlpha(point, segment) {
  var a = new THREE.Vector3().copy(segment.b).sub(segment.a);
  var b = new THREE.Vector3().copy(point).sub(segment.a);
  var projected = b.projectOnVector(a);

  var length = segment.a.distanceTo(segment.b);

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

},{"./colors":3,"./grab":6,"./interaction":8,"./layout":9,"./sharedmaterials":11,"./textlabel":13}],13:[function(require,module,exports){
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

function createTextLabel(textCreator, str) {
  var width = arguments.length <= 2 || arguments[2] === undefined ? 0.4 : arguments[2];
  var depth = arguments.length <= 3 || arguments[3] === undefined ? 0.029 : arguments[3];
  var fgColor = arguments.length <= 4 || arguments[4] === undefined ? 0xffffff : arguments[4];
  var bgColor = arguments.length <= 5 || arguments[5] === undefined ? Colors.DEFAULT_BACK : arguments[5];


  var group = new THREE.Group();
  var internalPositioning = new THREE.Group();
  group.add(internalPositioning);

  var text = textCreator.create(str, { color: fgColor });
  internalPositioning.add(text);

  group.setString = function (str) {
    text.update(str.toString());
  };

  group.setNumber = function (str) {
    text.update(str.toFixed(2));
  };

  text.position.z = 0.015;

  var backBounds = 0.01;
  var margin = 0.01;
  var totalWidth = width;
  var totalHeight = 0.04 + margin * 2;
  var labelBackGeometry = new THREE.BoxGeometry(totalWidth, totalHeight, depth, 1, 1, 1);
  labelBackGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(totalWidth * 0.5 - margin, 0, 0));

  var labelBackMesh = new THREE.Mesh(labelBackGeometry, SharedMaterials.PANEL);
  Colors.colorizeGeometry(labelBackMesh.geometry, bgColor);

  labelBackMesh.position.y = 0.03;
  // labelBackMesh.position.x = width * 0.5;
  internalPositioning.add(labelBackMesh);
  internalPositioning.position.y = -totalHeight * 0.5;

  // labelGroup.position.x = labelBounds.width * 0.5;
  // labelGroup.position.y = labelBounds.height * 0.5;

  group.back = labelBackMesh;

  return group;
}

},{"./colors":3,"./sharedmaterials":11}],14:[function(require,module,exports){
(function (global){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('isarray')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"base64-js":15,"ieee754":16,"isarray":17}],15:[function(require,module,exports){
'use strict'

exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

function init () {
  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i]
    revLookup[code.charCodeAt(i)] = i
  }

  revLookup['-'.charCodeAt(0)] = 62
  revLookup['_'.charCodeAt(0)] = 63
}

init()

function toByteArray (b64) {
  var i, j, l, tmp, placeHolders, arr
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0

  // base64 is 4/3 + up to two characters of the original data
  arr = new Arr(len * 3 / 4 - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}

},{}],16:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],17:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
(function (Buffer){
var xhr = require('xhr')
var noop = function(){}
var parseASCII = require('parse-bmfont-ascii')
var parseXML = require('parse-bmfont-xml')
var readBinary = require('parse-bmfont-binary')
var isBinaryFormat = require('./lib/is-binary')
var xtend = require('xtend')

var xml2 = (function hasXML2() {
  return window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest
})()

module.exports = function(opt, cb) {
  cb = typeof cb === 'function' ? cb : noop

  if (typeof opt === 'string')
    opt = { uri: opt }
  else if (!opt)
    opt = {}

  var expectBinary = opt.binary
  if (expectBinary)
    opt = getBinaryOpts(opt)

  xhr(opt, function(err, res, body) {
    if (err)
      return cb(err)
    if (!/^2/.test(res.statusCode))
      return cb(new Error('http status code: '+res.statusCode))
    if (!body)
      return cb(new Error('no body result'))

    var binary = false 

    //if the response type is an array buffer,
    //we need to convert it into a regular Buffer object
    if (isArrayBuffer(body)) {
      var array = new Uint8Array(body)
      body = new Buffer(array, 'binary')
    }

    //now check the string/Buffer response
    //and see if it has a binary BMF header
    if (isBinaryFormat(body)) {
      binary = true
      //if we have a string, turn it into a Buffer
      if (typeof body === 'string') 
        body = new Buffer(body, 'binary')
    } 

    //we are not parsing a binary format, just ASCII/XML/etc
    if (!binary) {
      //might still be a buffer if responseType is 'arraybuffer'
      if (Buffer.isBuffer(body))
        body = body.toString(opt.encoding)
      body = body.trim()
    }

    var result
    try {
      var type = res.headers['content-type']
      if (binary)
        result = readBinary(body)
      else if (/json/.test(type) || body.charAt(0) === '{')
        result = JSON.parse(body)
      else if (/xml/.test(type)  || body.charAt(0) === '<')
        result = parseXML(body)
      else
        result = parseASCII(body)
    } catch (e) {
      cb(new Error('error parsing font '+e.message))
      cb = noop
    }
    cb(null, result)
  })
}

function isArrayBuffer(arr) {
  var str = Object.prototype.toString
  return str.call(arr) === '[object ArrayBuffer]'
}

function getBinaryOpts(opt) {
  //IE10+ and other modern browsers support array buffers
  if (xml2)
    return xtend(opt, { responseType: 'arraybuffer' })
  
  if (typeof window.XMLHttpRequest === 'undefined')
    throw new Error('your browser does not support XHR loading')

  //IE9 and XML1 browsers could still use an override
  var req = new window.XMLHttpRequest()
  req.overrideMimeType('text/plain; charset=x-user-defined')
  return xtend({
    xhr: req
  }, opt)
}
}).call(this,require("buffer").Buffer)

},{"./lib/is-binary":20,"buffer":14,"parse-bmfont-ascii":22,"parse-bmfont-binary":23,"parse-bmfont-xml":24,"xhr":27,"xtend":33}],20:[function(require,module,exports){
(function (Buffer){
var equal = require('buffer-equal')
var HEADER = new Buffer([66, 77, 70, 3])

module.exports = function(buf) {
  if (typeof buf === 'string')
    return buf.substring(0, 3) === 'BMF'
  return buf.length > 4 && equal(buf.slice(0, 4), HEADER)
}
}).call(this,require("buffer").Buffer)

},{"buffer":14,"buffer-equal":21}],21:[function(require,module,exports){
var Buffer = require('buffer').Buffer; // for use with browserify

module.exports = function (a, b) {
    if (!Buffer.isBuffer(a)) return undefined;
    if (!Buffer.isBuffer(b)) return undefined;
    if (typeof a.equals === 'function') return a.equals(b);
    if (a.length !== b.length) return false;
    
    for (var i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    
    return true;
};

},{"buffer":14}],22:[function(require,module,exports){
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
},{}],23:[function(require,module,exports){
var HEADER = [66, 77, 70]

module.exports = function readBMFontBinary(buf) {
  if (buf.length < 6)
    throw new Error('invalid buffer length for BMFont')

  var header = HEADER.every(function(byte, i) {
    return buf.readUInt8(i) === byte
  })

  if (!header)
    throw new Error('BMFont missing BMF byte header')

  var i = 3
  var vers = buf.readUInt8(i++)
  if (vers > 3)
    throw new Error('Only supports BMFont Binary v3 (BMFont App v1.10)')
  
  var target = { kernings: [], chars: [] }
  for (var b=0; b<5; b++)
    i += readBlock(target, buf, i)
  return target
}

function readBlock(target, buf, i) {
  if (i > buf.length-1)
    return 0

  var blockID = buf.readUInt8(i++)
  var blockSize = buf.readInt32LE(i)
  i += 4

  switch(blockID) {
    case 1: 
      target.info = readInfo(buf, i)
      break
    case 2:
      target.common = readCommon(buf, i)
      break
    case 3:
      target.pages = readPages(buf, i, blockSize)
      break
    case 4:
      target.chars = readChars(buf, i, blockSize)
      break
    case 5:
      target.kernings = readKernings(buf, i, blockSize)
      break
  }
  return 5 + blockSize
}

function readInfo(buf, i) {
  var info = {}
  info.size = buf.readInt16LE(i)

  var bitField = buf.readUInt8(i+2)
  info.smooth = (bitField >> 7) & 1
  info.unicode = (bitField >> 6) & 1
  info.italic = (bitField >> 5) & 1
  info.bold = (bitField >> 4) & 1
  
  //fixedHeight is only mentioned in binary spec 
  if ((bitField >> 3) & 1)
    info.fixedHeight = 1
  
  info.charset = buf.readUInt8(i+3) || ''
  info.stretchH = buf.readUInt16LE(i+4)
  info.aa = buf.readUInt8(i+6)
  info.padding = [
    buf.readInt8(i+7),
    buf.readInt8(i+8),
    buf.readInt8(i+9),
    buf.readInt8(i+10)
  ]
  info.spacing = [
    buf.readInt8(i+11),
    buf.readInt8(i+12)
  ]
  info.outline = buf.readUInt8(i+13)
  info.face = readStringNT(buf, i+14)
  return info
}

function readCommon(buf, i) {
  var common = {}
  common.lineHeight = buf.readUInt16LE(i)
  common.base = buf.readUInt16LE(i+2)
  common.scaleW = buf.readUInt16LE(i+4)
  common.scaleH = buf.readUInt16LE(i+6)
  common.pages = buf.readUInt16LE(i+8)
  var bitField = buf.readUInt8(i+10)
  common.packed = 0
  common.alphaChnl = buf.readUInt8(i+11)
  common.redChnl = buf.readUInt8(i+12)
  common.greenChnl = buf.readUInt8(i+13)
  common.blueChnl = buf.readUInt8(i+14)
  return common
}

function readPages(buf, i, size) {
  var pages = []
  var text = readNameNT(buf, i)
  var len = text.length+1
  var count = size / len
  for (var c=0; c<count; c++) {
    pages[c] = buf.slice(i, i+text.length).toString('utf8')
    i += len
  }
  return pages
}

function readChars(buf, i, blockSize) {
  var chars = []

  var count = blockSize / 20
  for (var c=0; c<count; c++) {
    var char = {}
    var off = c*20
    char.id = buf.readUInt32LE(i + 0 + off)
    char.x = buf.readUInt16LE(i + 4 + off)
    char.y = buf.readUInt16LE(i + 6 + off)
    char.width = buf.readUInt16LE(i + 8 + off)
    char.height = buf.readUInt16LE(i + 10 + off)
    char.xoffset = buf.readInt16LE(i + 12 + off)
    char.yoffset = buf.readInt16LE(i + 14 + off)
    char.xadvance = buf.readInt16LE(i + 16 + off)
    char.page = buf.readUInt8(i + 18 + off)
    char.chnl = buf.readUInt8(i + 19 + off)
    chars[c] = char
  }
  return chars
}

function readKernings(buf, i, blockSize) {
  var kernings = []
  var count = blockSize / 10
  for (var c=0; c<count; c++) {
    var kern = {}
    var off = c*10
    kern.first = buf.readUInt32LE(i + 0 + off)
    kern.second = buf.readUInt32LE(i + 4 + off)
    kern.amount = buf.readInt16LE(i + 8 + off)
    kernings[c] = kern
  }
  return kernings
}

function readNameNT(buf, offset) {
  var pos=offset
  for (; pos<buf.length; pos++) {
    if (buf[pos] === 0x00) 
      break
  }
  return buf.slice(offset, pos)
}

function readStringNT(buf, offset) {
  return readNameNT(buf, offset).toString('utf8')
}
},{}],24:[function(require,module,exports){
var parseAttributes = require('./parse-attribs')
var parseFromString = require('xml-parse-from-string')

//In some cases element.attribute.nodeName can return
//all lowercase values.. so we need to map them to the correct 
//case
var NAME_MAP = {
  scaleh: 'scaleH',
  scalew: 'scaleW',
  stretchh: 'stretchH',
  lineheight: 'lineHeight',
  alphachnl: 'alphaChnl',
  redchnl: 'redChnl',
  greenchnl: 'greenChnl',
  bluechnl: 'blueChnl'
}

module.exports = function parse(data) {
  data = data.toString()
  
  var xmlRoot = parseFromString(data)
  var output = {
    pages: [],
    chars: [],
    kernings: []
  }

  //get config settings
  ;['info', 'common'].forEach(function(key) {
    var element = xmlRoot.getElementsByTagName(key)[0]
    if (element)
      output[key] = parseAttributes(getAttribs(element))
  })

  //get page info
  var pageRoot = xmlRoot.getElementsByTagName('pages')[0]
  if (!pageRoot)
    throw new Error('malformed file -- no <pages> element')
  var pages = pageRoot.getElementsByTagName('page')
  for (var i=0; i<pages.length; i++) {
    var p = pages[i]
    var id = parseInt(p.getAttribute('id'), 10)
    var file = p.getAttribute('file')
    if (isNaN(id))
      throw new Error('malformed file -- page "id" attribute is NaN')
    if (!file)
      throw new Error('malformed file -- needs page "file" attribute')
    output.pages[parseInt(id, 10)] = file
  }

  //get kernings / chars
  ;['chars', 'kernings'].forEach(function(key) {
    var element = xmlRoot.getElementsByTagName(key)[0]
    if (!element)
      return
    var childTag = key.substring(0, key.length-1)
    var children = element.getElementsByTagName(childTag)
    for (var i=0; i<children.length; i++) {      
      var child = children[i]
      output[key].push(parseAttributes(getAttribs(child)))
    }
  })
  return output
}

function getAttribs(element) {
  var attribs = getAttribList(element)
  return attribs.reduce(function(dict, attrib) {
    var key = mapName(attrib.nodeName)
    dict[key] = attrib.nodeValue
    return dict
  }, {})
}

function getAttribList(element) {
  //IE8+ and modern browsers
  var attribs = []
  for (var i=0; i<element.attributes.length; i++)
    attribs.push(element.attributes[i])
  return attribs
}

function mapName(nodeName) {
  return NAME_MAP[nodeName.toLowerCase()] || nodeName
}
},{"./parse-attribs":25,"xml-parse-from-string":26}],25:[function(require,module,exports){
//Some versions of GlyphDesigner have a typo
//that causes some bugs with parsing. 
//Need to confirm with recent version of the software
//to see whether this is still an issue or not.
var GLYPH_DESIGNER_ERROR = 'chasrset'

module.exports = function parseAttributes(obj) {
  if (GLYPH_DESIGNER_ERROR in obj) {
    obj['charset'] = obj[GLYPH_DESIGNER_ERROR]
    delete obj[GLYPH_DESIGNER_ERROR]
  }

  for (var k in obj) {
    if (k === 'face' || k === 'charset') 
      continue
    else if (k === 'padding' || k === 'spacing')
      obj[k] = parseIntList(obj[k])
    else
      obj[k] = parseInt(obj[k], 10) 
  }
  return obj
}

function parseIntList(data) {
  return data.split(',').map(function(val) {
    return parseInt(val, 10)
  })
}
},{}],26:[function(require,module,exports){
module.exports = (function xmlparser() {
  //common browsers
  if (typeof window.DOMParser !== 'undefined') {
    return function(str) {
      var parser = new window.DOMParser()
      return parser.parseFromString(str, 'application/xml')
    }
  } 

  //IE8 fallback
  if (typeof window.ActiveXObject !== 'undefined'
      && new window.ActiveXObject('Microsoft.XMLDOM')) {
    return function(str) {
      var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM")
      xmlDoc.async = "false"
      xmlDoc.loadXML(str)
      return xmlDoc
    }
  }

  //last resort fallback
  return function(str) {
    var div = document.createElement('div')
    div.innerHTML = str
    return div
  }
})()
},{}],27:[function(require,module,exports){
"use strict";
var window = require("global/window")
var isFunction = require("is-function")
var parseHeaders = require("parse-headers")
var xtend = require("xtend")

module.exports = createXHR
createXHR.XMLHttpRequest = window.XMLHttpRequest || noop
createXHR.XDomainRequest = "withCredentials" in (new createXHR.XMLHttpRequest()) ? createXHR.XMLHttpRequest : window.XDomainRequest

forEachArray(["get", "put", "post", "patch", "head", "delete"], function(method) {
    createXHR[method === "delete" ? "del" : method] = function(uri, options, callback) {
        options = initParams(uri, options, callback)
        options.method = method.toUpperCase()
        return _createXHR(options)
    }
})

function forEachArray(array, iterator) {
    for (var i = 0; i < array.length; i++) {
        iterator(array[i])
    }
}

function isEmpty(obj){
    for(var i in obj){
        if(obj.hasOwnProperty(i)) return false
    }
    return true
}

function initParams(uri, options, callback) {
    var params = uri

    if (isFunction(options)) {
        callback = options
        if (typeof uri === "string") {
            params = {uri:uri}
        }
    } else {
        params = xtend(options, {uri: uri})
    }

    params.callback = callback
    return params
}

function createXHR(uri, options, callback) {
    options = initParams(uri, options, callback)
    return _createXHR(options)
}

function _createXHR(options) {
    if(typeof options.callback === "undefined"){
        throw new Error("callback argument missing")
    }

    var called = false
    var callback = function cbOnce(err, response, body){
        if(!called){
            called = true
            options.callback(err, response, body)
        }
    }

    function readystatechange() {
        if (xhr.readyState === 4) {
            loadFunc()
        }
    }

    function getBody() {
        // Chrome with requestType=blob throws errors arround when even testing access to responseText
        var body = undefined

        if (xhr.response) {
            body = xhr.response
        } else {
            body = xhr.responseText || getXml(xhr)
        }

        if (isJson) {
            try {
                body = JSON.parse(body)
            } catch (e) {}
        }

        return body
    }

    var failureResponse = {
                body: undefined,
                headers: {},
                statusCode: 0,
                method: method,
                url: uri,
                rawRequest: xhr
            }

    function errorFunc(evt) {
        clearTimeout(timeoutTimer)
        if(!(evt instanceof Error)){
            evt = new Error("" + (evt || "Unknown XMLHttpRequest Error") )
        }
        evt.statusCode = 0
        return callback(evt, failureResponse)
    }

    // will load the data & process the response in a special response object
    function loadFunc() {
        if (aborted) return
        var status
        clearTimeout(timeoutTimer)
        if(options.useXDR && xhr.status===undefined) {
            //IE8 CORS GET successful response doesn't have a status field, but body is fine
            status = 200
        } else {
            status = (xhr.status === 1223 ? 204 : xhr.status)
        }
        var response = failureResponse
        var err = null

        if (status !== 0){
            response = {
                body: getBody(),
                statusCode: status,
                method: method,
                headers: {},
                url: uri,
                rawRequest: xhr
            }
            if(xhr.getAllResponseHeaders){ //remember xhr can in fact be XDR for CORS in IE
                response.headers = parseHeaders(xhr.getAllResponseHeaders())
            }
        } else {
            err = new Error("Internal XMLHttpRequest Error")
        }
        return callback(err, response, response.body)
    }

    var xhr = options.xhr || null

    if (!xhr) {
        if (options.cors || options.useXDR) {
            xhr = new createXHR.XDomainRequest()
        }else{
            xhr = new createXHR.XMLHttpRequest()
        }
    }

    var key
    var aborted
    var uri = xhr.url = options.uri || options.url
    var method = xhr.method = options.method || "GET"
    var body = options.body || options.data || null
    var headers = xhr.headers = options.headers || {}
    var sync = !!options.sync
    var isJson = false
    var timeoutTimer

    if ("json" in options) {
        isJson = true
        headers["accept"] || headers["Accept"] || (headers["Accept"] = "application/json") //Don't override existing accept header declared by user
        if (method !== "GET" && method !== "HEAD") {
            headers["content-type"] || headers["Content-Type"] || (headers["Content-Type"] = "application/json") //Don't override existing accept header declared by user
            body = JSON.stringify(options.json)
        }
    }

    xhr.onreadystatechange = readystatechange
    xhr.onload = loadFunc
    xhr.onerror = errorFunc
    // IE9 must have onprogress be set to a unique function.
    xhr.onprogress = function () {
        // IE must die
    }
    xhr.ontimeout = errorFunc
    xhr.open(method, uri, !sync, options.username, options.password)
    //has to be after open
    if(!sync) {
        xhr.withCredentials = !!options.withCredentials
    }
    // Cannot set timeout with sync request
    // not setting timeout on the xhr object, because of old webkits etc. not handling that correctly
    // both npm's request and jquery 1.x use this kind of timeout, so this is being consistent
    if (!sync && options.timeout > 0 ) {
        timeoutTimer = setTimeout(function(){
            aborted=true//IE9 may still call readystatechange
            xhr.abort("timeout")
            var e = new Error("XMLHttpRequest timeout")
            e.code = "ETIMEDOUT"
            errorFunc(e)
        }, options.timeout )
    }

    if (xhr.setRequestHeader) {
        for(key in headers){
            if(headers.hasOwnProperty(key)){
                xhr.setRequestHeader(key, headers[key])
            }
        }
    } else if (options.headers && !isEmpty(options.headers)) {
        throw new Error("Headers cannot be set on an XDomainRequest object")
    }

    if ("responseType" in options) {
        xhr.responseType = options.responseType
    }

    if ("beforeSend" in options &&
        typeof options.beforeSend === "function"
    ) {
        options.beforeSend(xhr)
    }

    xhr.send(body)

    return xhr


}

function getXml(xhr) {
    if (xhr.responseType === "document") {
        return xhr.responseXML
    }
    var firefoxBugTakenEffect = xhr.status === 204 && xhr.responseXML && xhr.responseXML.documentElement.nodeName === "parsererror"
    if (xhr.responseType === "" && !firefoxBugTakenEffect) {
        return xhr.responseXML
    }

    return null
}

function noop() {}

},{"global/window":28,"is-function":29,"parse-headers":32,"xtend":33}],28:[function(require,module,exports){
(function (global){
if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = global;
} else if (typeof self !== "undefined"){
    module.exports = self;
} else {
    module.exports = {};
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],29:[function(require,module,exports){
module.exports = isFunction

var toString = Object.prototype.toString

function isFunction (fn) {
  var string = toString.call(fn)
  return string === '[object Function]' ||
    (typeof fn === 'function' && string !== '[object RegExp]') ||
    (typeof window !== 'undefined' &&
     // IE8 and below
     (fn === window.setTimeout ||
      fn === window.alert ||
      fn === window.confirm ||
      fn === window.prompt))
};

},{}],30:[function(require,module,exports){
var isFunction = require('is-function')

module.exports = forEach

var toString = Object.prototype.toString
var hasOwnProperty = Object.prototype.hasOwnProperty

function forEach(list, iterator, context) {
    if (!isFunction(iterator)) {
        throw new TypeError('iterator must be a function')
    }

    if (arguments.length < 3) {
        context = this
    }
    
    if (toString.call(list) === '[object Array]')
        forEachArray(list, iterator, context)
    else if (typeof list === 'string')
        forEachString(list, iterator, context)
    else
        forEachObject(list, iterator, context)
}

function forEachArray(array, iterator, context) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            iterator.call(context, array[i], i, array)
        }
    }
}

function forEachString(string, iterator, context) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        iterator.call(context, string.charAt(i), i, string)
    }
}

function forEachObject(object, iterator, context) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            iterator.call(context, object[k], k, object)
        }
    }
}

},{"is-function":29}],31:[function(require,module,exports){

exports = module.exports = trim;

function trim(str){
  return str.replace(/^\s*|\s*$/g, '');
}

exports.left = function(str){
  return str.replace(/^\s*/, '');
};

exports.right = function(str){
  return str.replace(/\s*$/, '');
};

},{}],32:[function(require,module,exports){
var trim = require('trim')
  , forEach = require('for-each')
  , isArray = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    }

module.exports = function (headers) {
  if (!headers)
    return {}

  var result = {}

  forEach(
      trim(headers).split('\n')
    , function (row) {
        var index = row.indexOf(':')
          , key = trim(row.slice(0, index)).toLowerCase()
          , value = trim(row.slice(index + 1))

        if (typeof(result[key]) === 'undefined') {
          result[key] = value
        } else if (isArray(result[key])) {
          result[key].push(value)
        } else {
          result[key] = [ result[key], value ]
        }
      }
  )

  return result
}
},{"for-each":30,"trim":31}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
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

},{"./lib/utils":35,"./lib/vertices":36,"inherits":37,"layout-bmfont-text":38,"object-assign":43,"quad-indices":44,"three-buffer-vertex-data":48}],35:[function(require,module,exports){
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

},{}],36:[function(require,module,exports){
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

},{}],37:[function(require,module,exports){
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

},{}],38:[function(require,module,exports){
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
},{"as-number":39,"indexof-property":40,"word-wrapper":41,"xtend":42}],39:[function(require,module,exports){
module.exports = function numtype(num, def) {
	return typeof num === 'number'
		? num 
		: (typeof def === 'number' ? def : 0)
}
},{}],40:[function(require,module,exports){
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
},{}],41:[function(require,module,exports){
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
},{}],42:[function(require,module,exports){
arguments[4][33][0].apply(exports,arguments)
},{"dup":33}],43:[function(require,module,exports){
'use strict';
/* eslint-disable no-unused-vars */
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
		var test1 = new String('abc');  // eslint-disable-line
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
	} catch (e) {
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

		if (Object.getOwnPropertySymbols) {
			symbols = Object.getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],44:[function(require,module,exports){
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
},{"an-array":45,"dtype":46,"is-buffer":47}],45:[function(require,module,exports){
var str = Object.prototype.toString

module.exports = anArray

function anArray(arr) {
  return (
       arr.BYTES_PER_ELEMENT
    && str.call(arr.buffer) === '[object ArrayBuffer]'
    || Array.isArray(arr)
  )
}

},{}],46:[function(require,module,exports){
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

},{}],47:[function(require,module,exports){
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

},{}],48:[function(require,module,exports){
var flatten = require('flatten-vertex-data')

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
    attrib = new THREE.BufferAttribute(data, itemSize)
    attrib.needsUpdate = true
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

},{"flatten-vertex-data":49}],49:[function(require,module,exports){
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

},{"dtype":50}],50:[function(require,module,exports){
arguments[4][46][0].apply(exports,arguments)
},{"dup":46}],51:[function(require,module,exports){
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

},{"object-assign":43}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtb2R1bGVzXFxkYXRndWl2clxcYnV0dG9uLmpzIiwibW9kdWxlc1xcZGF0Z3VpdnJcXGNoZWNrYm94LmpzIiwibW9kdWxlc1xcZGF0Z3VpdnJcXGNvbG9ycy5qcyIsIm1vZHVsZXNcXGRhdGd1aXZyXFxkcm9wZG93bi5qcyIsIm1vZHVsZXNcXGRhdGd1aXZyXFxmb2xkZXIuanMiLCJtb2R1bGVzXFxkYXRndWl2clxcZ3JhYi5qcyIsIm1vZHVsZXNcXGRhdGd1aXZyXFxpbmRleC5qcyIsIm1vZHVsZXNcXGRhdGd1aXZyXFxpbnRlcmFjdGlvbi5qcyIsIm1vZHVsZXNcXGRhdGd1aXZyXFxsYXlvdXQuanMiLCJtb2R1bGVzXFxkYXRndWl2clxcc2RmdGV4dC5qcyIsIm1vZHVsZXNcXGRhdGd1aXZyXFxzaGFyZWRtYXRlcmlhbHMuanMiLCJtb2R1bGVzXFxkYXRndWl2clxcc2xpZGVyLmpzIiwibW9kdWxlc1xcZGF0Z3VpdnJcXHRleHRsYWJlbC5qcyIsIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9idWZmZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZ3J1bnQtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyL25vZGVfbW9kdWxlcy9iYXNlNjQtanMvbGliL2I2NC5qcyIsIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9idWZmZXIvbm9kZV9tb2R1bGVzL2llZWU3NTQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZ3J1bnQtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyL25vZGVfbW9kdWxlcy9pc2FycmF5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2dydW50LWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJub2RlX21vZHVsZXMvbG9hZC1ibWZvbnQvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9sb2FkLWJtZm9udC9saWIvaXMtYmluYXJ5LmpzIiwibm9kZV9tb2R1bGVzL2xvYWQtYm1mb250L25vZGVfbW9kdWxlcy9idWZmZXItZXF1YWwvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9hZC1ibWZvbnQvbm9kZV9tb2R1bGVzL3BhcnNlLWJtZm9udC1hc2NpaS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2FkLWJtZm9udC9ub2RlX21vZHVsZXMvcGFyc2UtYm1mb250LWJpbmFyeS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2FkLWJtZm9udC9ub2RlX21vZHVsZXMvcGFyc2UtYm1mb250LXhtbC9saWIvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9sb2FkLWJtZm9udC9ub2RlX21vZHVsZXMvcGFyc2UtYm1mb250LXhtbC9saWIvcGFyc2UtYXR0cmlicy5qcyIsIm5vZGVfbW9kdWxlcy9sb2FkLWJtZm9udC9ub2RlX21vZHVsZXMvcGFyc2UtYm1mb250LXhtbC9ub2RlX21vZHVsZXMveG1sLXBhcnNlLWZyb20tc3RyaW5nL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvYWQtYm1mb250L25vZGVfbW9kdWxlcy94aHIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9hZC1ibWZvbnQvbm9kZV9tb2R1bGVzL3hoci9ub2RlX21vZHVsZXMvZ2xvYmFsL3dpbmRvdy5qcyIsIm5vZGVfbW9kdWxlcy9sb2FkLWJtZm9udC9ub2RlX21vZHVsZXMveGhyL25vZGVfbW9kdWxlcy9pcy1mdW5jdGlvbi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2FkLWJtZm9udC9ub2RlX21vZHVsZXMveGhyL25vZGVfbW9kdWxlcy9wYXJzZS1oZWFkZXJzL25vZGVfbW9kdWxlcy9mb3ItZWFjaC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2FkLWJtZm9udC9ub2RlX21vZHVsZXMveGhyL25vZGVfbW9kdWxlcy9wYXJzZS1oZWFkZXJzL25vZGVfbW9kdWxlcy90cmltL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvYWQtYm1mb250L25vZGVfbW9kdWxlcy94aHIvbm9kZV9tb2R1bGVzL3BhcnNlLWhlYWRlcnMvcGFyc2UtaGVhZGVycy5qcyIsIm5vZGVfbW9kdWxlcy9sb2FkLWJtZm9udC9ub2RlX21vZHVsZXMveHRlbmQvaW1tdXRhYmxlLmpzIiwibm9kZV9tb2R1bGVzL3RocmVlLWJtZm9udC10ZXh0L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3RocmVlLWJtZm9udC10ZXh0L2xpYi91dGlscy5qcyIsIm5vZGVfbW9kdWxlcy90aHJlZS1ibWZvbnQtdGV4dC9saWIvdmVydGljZXMuanMiLCJub2RlX21vZHVsZXMvdGhyZWUtYm1mb250LXRleHQvbm9kZV9tb2R1bGVzL2luaGVyaXRzL2luaGVyaXRzX2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvdGhyZWUtYm1mb250LXRleHQvbm9kZV9tb2R1bGVzL2xheW91dC1ibWZvbnQtdGV4dC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy90aHJlZS1ibWZvbnQtdGV4dC9ub2RlX21vZHVsZXMvbGF5b3V0LWJtZm9udC10ZXh0L25vZGVfbW9kdWxlcy9hcy1udW1iZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvdGhyZWUtYm1mb250LXRleHQvbm9kZV9tb2R1bGVzL2xheW91dC1ibWZvbnQtdGV4dC9ub2RlX21vZHVsZXMvaW5kZXhvZi1wcm9wZXJ0eS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy90aHJlZS1ibWZvbnQtdGV4dC9ub2RlX21vZHVsZXMvbGF5b3V0LWJtZm9udC10ZXh0L25vZGVfbW9kdWxlcy93b3JkLXdyYXBwZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvdGhyZWUtYm1mb250LXRleHQvbm9kZV9tb2R1bGVzL29iamVjdC1hc3NpZ24vaW5kZXguanMiLCJub2RlX21vZHVsZXMvdGhyZWUtYm1mb250LXRleHQvbm9kZV9tb2R1bGVzL3F1YWQtaW5kaWNlcy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy90aHJlZS1ibWZvbnQtdGV4dC9ub2RlX21vZHVsZXMvcXVhZC1pbmRpY2VzL25vZGVfbW9kdWxlcy9hbi1hcnJheS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy90aHJlZS1ibWZvbnQtdGV4dC9ub2RlX21vZHVsZXMvcXVhZC1pbmRpY2VzL25vZGVfbW9kdWxlcy9kdHlwZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy90aHJlZS1ibWZvbnQtdGV4dC9ub2RlX21vZHVsZXMvcXVhZC1pbmRpY2VzL25vZGVfbW9kdWxlcy9pcy1idWZmZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvdGhyZWUtYm1mb250LXRleHQvbm9kZV9tb2R1bGVzL3RocmVlLWJ1ZmZlci12ZXJ0ZXgtZGF0YS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy90aHJlZS1ibWZvbnQtdGV4dC9ub2RlX21vZHVsZXMvdGhyZWUtYnVmZmVyLXZlcnRleC1kYXRhL25vZGVfbW9kdWxlcy9mbGF0dGVuLXZlcnRleC1kYXRhL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3RocmVlLWJtZm9udC10ZXh0L3NoYWRlcnMvc2RmLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7a0JDT3dCLGM7O0FBUHhCOzs7O0FBQ0E7Ozs7QUFDQTs7SUFBWSxNOztBQUNaOztJQUFZLE07O0FBQ1o7O0lBQVksZTs7QUFDWjs7SUFBWSxJOzs7Ozs7QUFFRyxTQUFTLGNBQVQsR0FRUDtBQUFBLG1FQUFKLEVBQUk7O0FBQUEsTUFQTixRQU9NLFFBUE4sUUFPTTtBQUFBLE1BTk4sV0FNTSxRQU5OLFdBTU07QUFBQSxNQUxOLE1BS00sUUFMTixNQUtNO0FBQUEsK0JBSk4sWUFJTTtB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDM3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDOVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ2hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUMzT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDalNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDOUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IGNyZWF0ZVRleHRMYWJlbCBmcm9tICcuL3RleHRsYWJlbCc7XHJcbmltcG9ydCBjcmVhdGVJbnRlcmFjdGlvbiBmcm9tICcuL2ludGVyYWN0aW9uJztcclxuaW1wb3J0ICogYXMgQ29sb3JzIGZyb20gJy4vY29sb3JzJztcclxuaW1wb3J0ICogYXMgTGF5b3V0IGZyb20gJy4vbGF5b3V0JztcclxuaW1wb3J0ICogYXMgU2hhcmVkTWF0ZXJpYWxzIGZyb20gJy4vc2hhcmVkbWF0ZXJpYWxzJztcclxuaW1wb3J0ICogYXMgR3JhYiBmcm9tICcuL2dyYWInO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlQ2hlY2tib3goIHtcclxuICBndWlTdGF0ZSxcclxuICB0ZXh0Q3JlYXRvcixcclxuICBvYmplY3QsXHJcbiAgcHJvcGVydHlOYW1lID0gJ3VuZGVmaW5lZCcsXHJcbiAgd2lkdGggPSBMYXlvdXQuUEFORUxfV0lEVEgsXHJcbiAgaGVpZ2h0ID0gTGF5b3V0LlBBTkVMX0hFSUdIVCxcclxuICBkZXB0aCA9IExheW91dC5QQU5FTF9ERVBUSFxyXG59ID0ge30gKXtcclxuXHJcbiAgY29uc3QgQlVUVE9OX1dJRFRIID0gd2lkdGggKiAwLjUgLSBMYXlvdXQuUEFORUxfTUFSR0lOO1xyXG4gIGNvbnN0IEJVVFRPTl9IRUlHSFQgPSBoZWlnaHQgLSBMYXlvdXQuUEFORUxfTUFSR0lOO1xyXG4gIGNvbnN0IEJVVFRPTl9ERVBUSCA9IGRlcHRoO1xyXG5cclxuICBjb25zdCBncm91cCA9IG5ldyBUSFJFRS5Hcm91cCgpO1xyXG5cclxuICBjb25zdCBwYW5lbCA9IExheW91dC5jcmVhdGVQYW5lbCggd2lkdGgsIGhlaWdodCwgZGVwdGggKTtcclxuICBncm91cC5hZGQoIHBhbmVsICk7XHJcblxyXG4gIC8vICBiYXNlIGNoZWNrYm94XHJcbiAgY29uc3QgcmVjdCA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSggQlVUVE9OX1dJRFRILCBCVVRUT05fSEVJR0hULCBCVVRUT05fREVQVEggKTtcclxuICByZWN0LnRyYW5zbGF0ZSggQlVUVE9OX1dJRFRIICogMC41LCAwLCAwICk7XHJcblxyXG4gIC8vICBoaXRzY2FuIHZvbHVtZVxyXG4gIGNvbnN0IGhpdHNjYW5NYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCgpO1xyXG4gIGhpdHNjYW5NYXRlcmlhbC52aXNpYmxlID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0IGhpdHNjYW5Wb2x1bWUgPSBuZXcgVEhSRUUuTWVzaCggcmVjdC5jbG9uZSgpLCBoaXRzY2FuTWF0ZXJpYWwgKTtcclxuICBoaXRzY2FuVm9sdW1lLnBvc2l0aW9uLnogPSBkZXB0aDtcclxuICBoaXRzY2FuVm9sdW1lLnBvc2l0aW9uLnggPSB3aWR0aCAqIDAuNTtcclxuXHJcbiAgLy8gIG91dGxpbmUgdm9sdW1lXHJcbiAgY29uc3Qgb3V0bGluZSA9IG5ldyBUSFJFRS5Cb3hIZWxwZXIoIGhpdHNjYW5Wb2x1bWUgKTtcclxuICBvdXRsaW5lLm1hdGVyaWFsLmNvbG9yLnNldEhleCggQ29sb3JzLk9VVExJTkVfQ09MT1IgKTtcclxuXHJcbiAgLy8gIGNoZWNrYm94IHZvbHVtZVxyXG4gIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKHsgY29sb3I6IENvbG9ycy5ERUZBVUxUX0NPTE9SLCBlbWlzc2l2ZTogQ29sb3JzLkVNSVNTSVZFX0NPTE9SIH0pO1xyXG4gIGNvbnN0IGZpbGxlZFZvbHVtZSA9IG5ldyBUSFJFRS5NZXNoKCByZWN0LmNsb25lKCksIG1hdGVyaWFsICk7XHJcbiAgaGl0c2NhblZvbHVtZS5hZGQoIGZpbGxlZFZvbHVtZSApO1xyXG5cclxuXHJcbiAgY29uc3QgZGVzY3JpcHRvckxhYmVsID0gdGV4dENyZWF0b3IuY3JlYXRlKCBwcm9wZXJ0eU5hbWUgKTtcclxuICBkZXNjcmlwdG9yTGFiZWwucG9zaXRpb24ueCA9IExheW91dC5QQU5FTF9MQUJFTF9URVhUX01BUkdJTjtcclxuICBkZXNjcmlwdG9yTGFiZWwucG9zaXRpb24ueiA9IGRlcHRoO1xyXG4gIGRlc2NyaXB0b3JMYWJlbC5wb3NpdGlvbi55ID0gLTAuMDM7XHJcblxyXG4gIGNvbnN0IGNvbnRyb2xsZXJJRCA9IExheW91dC5jcmVhdGVDb250cm9sbGVySURCb3goIGhlaWdodCwgQ29sb3JzLkNPTlRST0xMRVJfSURfQlVUVE9OICk7XHJcbiAgY29udHJvbGxlcklELnBvc2l0aW9uLnogPSBkZXB0aDtcclxuXHJcbiAgcGFuZWwuYWRkKCBkZXNjcmlwdG9yTGFiZWwsIGhpdHNjYW5Wb2x1bWUsIG91dGxpbmUsIGNvbnRyb2xsZXJJRCApO1xyXG5cclxuICBjb25zdCBpbnRlcmFjdGlvbiA9IGNyZWF0ZUludGVyYWN0aW9uKCBndWlTdGF0ZSwgaGl0c2NhblZvbHVtZSApO1xyXG4gIGludGVyYWN0aW9uLmV2ZW50cy5vbiggJ29uUHJlc3NlZCcsIGhhbmRsZU9uUHJlc3MgKTtcclxuXHJcbiAgdXBkYXRlVmlldygpO1xyXG5cclxuICBmdW5jdGlvbiBoYW5kbGVPblByZXNzKCl7XHJcbiAgICBpZiggZ3JvdXAudmlzaWJsZSA9PT0gZmFsc2UgKXtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIG9iamVjdFsgcHJvcGVydHlOYW1lIF0oKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHVwZGF0ZVZpZXcoKXtcclxuXHJcbiAgICBpZiggaW50ZXJhY3Rpb24uaG92ZXJpbmcoKSApe1xyXG4gICAgICBtYXRlcmlhbC5jb2xvci5zZXRIZXgoIENvbG9ycy5ISUdITElHSFRfQ09MT1IgKTtcclxuICAgICAgbWF0ZXJpYWwuZW1pc3NpdmUuc2V0SGV4KCBDb2xvcnMuSElHSExJR0hUX0VNSVNTSVZFX0NPTE9SICk7XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICBtYXRlcmlhbC5lbWlzc2l2ZS5zZXRIZXgoIENvbG9ycy5FTUlTU0lWRV9DT0xPUiApO1xyXG5cclxuICAgICAgaWYoIHN0YXRlLnZhbHVlICl7XHJcbiAgICAgICAgbWF0ZXJpYWwuY29sb3Iuc2V0SGV4KCBDb2xvcnMuREVGQVVMVF9DT0xPUiApO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2V7XHJcbiAgICAgICAgbWF0ZXJpYWwuY29sb3Iuc2V0SGV4KCBDb2xvcnMuSU5BQ1RJVkVfQ09MT1IgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIGdyb3VwLmludGVyYWN0aW9uID0gaW50ZXJhY3Rpb247XHJcbiAgZ3JvdXAuaGl0c2NhbiA9IFsgaGl0c2NhblZvbHVtZSwgcGFuZWwgXTtcclxuXHJcbiAgY29uc3QgZ3JhYkludGVyYWN0aW9uID0gR3JhYi5jcmVhdGUoIHsgZ3JvdXAsIHBhbmVsLCBndWlTdGF0ZSB9ICk7XHJcblxyXG4gIGdyb3VwLnVwZGF0ZSA9IGZ1bmN0aW9uKCBpbnB1dE9iamVjdHMgKXtcclxuICAgIGludGVyYWN0aW9uLnVwZGF0ZSggaW5wdXRPYmplY3RzICk7XHJcbiAgICBncmFiSW50ZXJhY3Rpb24udXBkYXRlKCBpbnB1dE9iamVjdHMgKTtcclxuICAgIHVwZGF0ZVZpZXcoKTtcclxuICB9O1xyXG5cclxuXHJcbiAgcmV0dXJuIGdyb3VwO1xyXG59IiwiaW1wb3J0IGNyZWF0ZVRleHRMYWJlbCBmcm9tICcuL3RleHRsYWJlbCc7XHJcbmltcG9ydCBjcmVhdGVJbnRlcmFjdGlvbiBmcm9tICcuL2ludGVyYWN0aW9uJztcclxuaW1wb3J0ICogYXMgQ29sb3JzIGZyb20gJy4vY29sb3JzJztcclxuaW1wb3J0ICogYXMgTGF5b3V0IGZyb20gJy4vbGF5b3V0JztcclxuaW1wb3J0ICogYXMgU2hhcmVkTWF0ZXJpYWxzIGZyb20gJy4vc2hhcmVkbWF0ZXJpYWxzJztcclxuaW1wb3J0ICogYXMgR3JhYiBmcm9tICcuL2dyYWInO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlQ2hlY2tib3goIHtcclxuICBndWlTdGF0ZSxcclxuICB0ZXh0Q3JlYXRvcixcclxuICBvYmplY3QsXHJcbiAgcHJvcGVydHlOYW1lID0gJ3VuZGVmaW5lZCcsXHJcbiAgaW5pdGlhbFZhbHVlID0gZmFsc2UsXHJcbiAgd2lkdGggPSBMYXlvdXQuUEFORUxfV0lEVEgsXHJcbiAgaGVpZ2h0ID0gTGF5b3V0LlBBTkVMX0hFSUdIVCxcclxuICBkZXB0aCA9IExheW91dC5QQU5FTF9ERVBUSFxyXG59ID0ge30gKXtcclxuXHJcbiAgY29uc3QgQ0hFQ0tCT1hfV0lEVEggPSBoZWlnaHQgLSBMYXlvdXQuUEFORUxfTUFSR0lOO1xyXG4gIGNvbnN0IENIRUNLQk9YX0hFSUdIVCA9IENIRUNLQk9YX1dJRFRIO1xyXG4gIGNvbnN0IENIRUNLQk9YX0RFUFRIID0gZGVwdGg7XHJcblxyXG4gIGNvbnN0IElOQUNUSVZFX1NDQUxFID0gMC4wMDE7XHJcbiAgY29uc3QgQUNUSVZFX1NDQUxFID0gMC45O1xyXG5cclxuICBjb25zdCBzdGF0ZSA9IHtcclxuICAgIHZhbHVlOiBpbml0aWFsVmFsdWVcclxuICB9O1xyXG5cclxuICBjb25zdCBncm91cCA9IG5ldyBUSFJFRS5Hcm91cCgpO1xyXG5cclxuICBjb25zdCBwYW5lbCA9IExheW91dC5jcmVhdGVQYW5lbCggd2lkdGgsIGhlaWdodCwgZGVwdGggKTtcclxuICBncm91cC5hZGQoIHBhbmVsICk7XHJcblxyXG4gIC8vICBiYXNlIGNoZWNrYm94XHJcbiAgY29uc3QgcmVjdCA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSggQ0hFQ0tCT1hfV0lEVEgsIENIRUNLQk9YX0hFSUdIVCwgQ0hFQ0tCT1hfREVQVEggKTtcclxuICByZWN0LnRyYW5zbGF0ZSggQ0hFQ0tCT1hfV0lEVEggKiAwLjUsIDAsIDAgKTtcclxuXHJcblxyXG4gIC8vICBoaXRzY2FuIHZvbHVtZVxyXG4gIGNvbnN0IGhpdHNjYW5NYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCgpO1xyXG4gIGhpdHNjYW5NYXRlcmlhbC52aXNpYmxlID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0IGhpdHNjYW5Wb2x1bWUgPSBuZXcgVEhSRUUuTWVzaCggcmVjdC5jbG9uZSgpLCBoaXRzY2FuTWF0ZXJpYWwgKTtcclxuICBoaXRzY2FuVm9sdW1lLnBvc2l0aW9uLnogPSBkZXB0aDtcclxuICBoaXRzY2FuVm9sdW1lLnBvc2l0aW9uLnggPSB3aWR0aCAqIDAuNTtcclxuXHJcbiAgLy8gIG91dGxpbmUgdm9sdW1lXHJcbiAgY29uc3Qgb3V0bGluZSA9IG5ldyBUSFJFRS5Cb3hIZWxwZXIoIGhpdHNjYW5Wb2x1bWUgKTtcclxuICBvdXRsaW5lLm1hdGVyaWFsLmNvbG9yLnNldEhleCggQ29sb3JzLk9VVExJTkVfQ09MT1IgKTtcclxuXHJcbiAgLy8gIGNoZWNrYm94IHZvbHVtZVxyXG4gIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKHsgY29sb3I6IENvbG9ycy5ERUZBVUxUX0NPTE9SLCBlbWlzc2l2ZTogQ29sb3JzLkVNSVNTSVZFX0NPTE9SIH0pO1xyXG4gIGNvbnN0IGZpbGxlZFZvbHVtZSA9IG5ldyBUSFJFRS5NZXNoKCByZWN0LmNsb25lKCksIG1hdGVyaWFsICk7XHJcbiAgZmlsbGVkVm9sdW1lLnNjYWxlLnNldCggQUNUSVZFX1NDQUxFLCBBQ1RJVkVfU0NBTEUsQUNUSVZFX1NDQUxFICk7XHJcbiAgaGl0c2NhblZvbHVtZS5hZGQoIGZpbGxlZFZvbHVtZSApO1xyXG5cclxuXHJcbiAgY29uc3QgZGVzY3JpcHRvckxhYmVsID0gdGV4dENyZWF0b3IuY3JlYXRlKCBwcm9wZXJ0eU5hbWUgKTtcclxuICBkZXNjcmlwdG9yTGFiZWwucG9zaXRpb24ueCA9IExheW91dC5QQU5FTF9MQUJFTF9URVhUX01BUkdJTjtcclxuICBkZXNjcmlwdG9yTGFiZWwucG9zaXRpb24ueiA9IGRlcHRoO1xyXG4gIGRlc2NyaXB0b3JMYWJlbC5wb3NpdGlvbi55ID0gLTAuMDM7XHJcblxyXG4gIGNvbnN0IGNvbnRyb2xsZXJJRCA9IExheW91dC5jcmVhdGVDb250cm9sbGVySURCb3goIGhlaWdodCwgQ29sb3JzLkNPTlRST0xMRVJfSURfQ0hFQ0tCT1ggKTtcclxuICBjb250cm9sbGVySUQucG9zaXRpb24ueiA9IGRlcHRoO1xyXG5cclxuICBwYW5lbC5hZGQoIGRlc2NyaXB0b3JMYWJlbCwgaGl0c2NhblZvbHVtZSwgb3V0bGluZSwgY29udHJvbGxlcklEICk7XHJcblxyXG4gIC8vIGdyb3VwLmFkZCggZmlsbGVkVm9sdW1lLCBvdXRsaW5lLCBoaXRzY2FuVm9sdW1lLCBkZXNjcmlwdG9yTGFiZWwgKTtcclxuXHJcbiAgY29uc3QgaW50ZXJhY3Rpb24gPSBjcmVhdGVJbnRlcmFjdGlvbiggZ3VpU3RhdGUsIGhpdHNjYW5Wb2x1bWUgKTtcclxuICBpbnRlcmFjdGlvbi5ldmVudHMub24oICdvblByZXNzZWQnLCBoYW5kbGVPblByZXNzICk7XHJcblxyXG4gIHVwZGF0ZVZpZXcoKTtcclxuXHJcbiAgZnVuY3Rpb24gaGFuZGxlT25QcmVzcygpe1xyXG4gICAgaWYoIGdyb3VwLnZpc2libGUgPT09IGZhbHNlICl7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0ZS52YWx1ZSA9ICFzdGF0ZS52YWx1ZTtcclxuXHJcbiAgICBvYmplY3RbIHByb3BlcnR5TmFtZSBdID0gc3RhdGUudmFsdWU7XHJcblxyXG4gICAgaWYoIG9uQ2hhbmdlZENCICl7XHJcbiAgICAgIG9uQ2hhbmdlZENCKCBzdGF0ZS52YWx1ZSApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gdXBkYXRlVmlldygpe1xyXG5cclxuICAgIGlmKCBpbnRlcmFjdGlvbi5ob3ZlcmluZygpICl7XHJcbiAgICAgIG1hdGVyaWFsLmNvbG9yLnNldEhleCggQ29sb3JzLkhJR0hMSUdIVF9DT0xPUiApO1xyXG4gICAgICBtYXRlcmlhbC5lbWlzc2l2ZS5zZXRIZXgoIENvbG9ycy5ISUdITElHSFRfRU1JU1NJVkVfQ09MT1IgKTtcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgIG1hdGVyaWFsLmVtaXNzaXZlLnNldEhleCggQ29sb3JzLkVNSVNTSVZFX0NPTE9SICk7XHJcblxyXG4gICAgICBpZiggc3RhdGUudmFsdWUgKXtcclxuICAgICAgICBtYXRlcmlhbC5jb2xvci5zZXRIZXgoIENvbG9ycy5ERUZBVUxUX0NPTE9SICk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZXtcclxuICAgICAgICBtYXRlcmlhbC5jb2xvci5zZXRIZXgoIENvbG9ycy5JTkFDVElWRV9DT0xPUiApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYoIHN0YXRlLnZhbHVlICl7XHJcbiAgICAgIGZpbGxlZFZvbHVtZS5zY2FsZS5zZXQoIEFDVElWRV9TQ0FMRSwgQUNUSVZFX1NDQUxFLCBBQ1RJVkVfU0NBTEUgKTtcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgIGZpbGxlZFZvbHVtZS5zY2FsZS5zZXQoIElOQUNUSVZFX1NDQUxFLCBJTkFDVElWRV9TQ0FMRSwgSU5BQ1RJVkVfU0NBTEUgKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBsZXQgb25DaGFuZ2VkQ0I7XHJcbiAgbGV0IG9uRmluaXNoQ2hhbmdlQ0I7XHJcblxyXG4gIGdyb3VwLm9uQ2hhbmdlID0gZnVuY3Rpb24oIGNhbGxiYWNrICl7XHJcbiAgICBvbkNoYW5nZWRDQiA9IGNhbGxiYWNrO1xyXG4gICAgcmV0dXJuIGdyb3VwO1xyXG4gIH07XHJcblxyXG4gIGdyb3VwLmludGVyYWN0aW9uID0gaW50ZXJhY3Rpb247XHJcbiAgZ3JvdXAuaGl0c2NhbiA9IFsgaGl0c2NhblZvbHVtZSwgcGFuZWwgXTtcclxuXHJcbiAgY29uc3QgZ3JhYkludGVyYWN0aW9uID0gR3JhYi5jcmVhdGUoIHsgZ3JvdXAsIHBhbmVsLCBndWlTdGF0ZSB9ICk7XHJcblxyXG4gIGdyb3VwLnVwZGF0ZSA9IGZ1bmN0aW9uKCBpbnB1dE9iamVjdHMgKXtcclxuICAgIGludGVyYWN0aW9uLnVwZGF0ZSggaW5wdXRPYmplY3RzICk7XHJcbiAgICBncmFiSW50ZXJhY3Rpb24udXBkYXRlKCBpbnB1dE9iamVjdHMgKTtcclxuICAgIHVwZGF0ZVZpZXcoKTtcclxuICB9O1xyXG5cclxuXHJcbiAgcmV0dXJuIGdyb3VwO1xyXG59IiwiZXhwb3J0IGNvbnN0IERFRkFVTFRfQ09MT1IgPSAweDJGQTFENjtcclxuZXhwb3J0IGNvbnN0IEhJR0hMSUdIVF9DT0xPUiA9IDB4MEZDM0ZGO1xyXG5leHBvcnQgY29uc3QgSU5URVJBQ1RJT05fQ09MT1IgPSAweDA3QUJGNztcclxuZXhwb3J0IGNvbnN0IEVNSVNTSVZFX0NPTE9SID0gMHgyMjIyMjI7XHJcbmV4cG9ydCBjb25zdCBISUdITElHSFRfRU1JU1NJVkVfQ09MT1IgPSAweDk5OTk5OTtcclxuZXhwb3J0IGNvbnN0IE9VVExJTkVfQ09MT1IgPSAweDk5OTk5OTtcclxuZXhwb3J0IGNvbnN0IERFRkFVTFRfQkFDSyA9IDB4MTMxMzEzXHJcbmV4cG9ydCBjb25zdCBISUdITElHSFRfQkFDSyA9IDB4NDk0OTQ5O1xyXG5leHBvcnQgY29uc3QgSU5BQ1RJVkVfQ09MT1IgPSAweDE2MTgyOTtcclxuZXhwb3J0IGNvbnN0IENPTlRST0xMRVJfSURfU0xJREVSID0gMHgyZmExZDY7XHJcbmV4cG9ydCBjb25zdCBDT05UUk9MTEVSX0lEX0NIRUNLQk9YID0gMHg4MDY3ODc7XHJcbmV4cG9ydCBjb25zdCBDT05UUk9MTEVSX0lEX0JVVFRPTiA9IDB4ZTYxZDVmO1xyXG5leHBvcnQgY29uc3QgQ09OVFJPTExFUl9JRF9URVhUID0gMHgxZWQzNmY7XHJcbmV4cG9ydCBjb25zdCBEUk9QRE9XTl9CR19DT0xPUiA9IDB4ZmZmZmZmO1xyXG5leHBvcnQgY29uc3QgRFJPUERPV05fRkdfQ09MT1IgPSAweDAwMDAwMDtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb2xvcml6ZUdlb21ldHJ5KCBnZW9tZXRyeSwgY29sb3IgKXtcclxuICBnZW9tZXRyeS5mYWNlcy5mb3JFYWNoKCBmdW5jdGlvbihmYWNlKXtcclxuICAgIGZhY2UuY29sb3Iuc2V0SGV4KGNvbG9yKTtcclxuICB9KTtcclxuICBnZW9tZXRyeS5jb2xvcnNOZWVkVXBkYXRlID0gdHJ1ZTtcclxuICByZXR1cm4gZ2VvbWV0cnk7XHJcbn0iLCJpbXBvcnQgY3JlYXRlVGV4dExhYmVsIGZyb20gJy4vdGV4dGxhYmVsJztcclxuaW1wb3J0IGNyZWF0ZUludGVyYWN0aW9uIGZyb20gJy4vaW50ZXJhY3Rpb24nO1xyXG5pbXBvcnQgKiBhcyBDb2xvcnMgZnJvbSAnLi9jb2xvcnMnO1xyXG5pbXBvcnQgKiBhcyBMYXlvdXQgZnJvbSAnLi9sYXlvdXQnO1xyXG5pbXBvcnQgKiBhcyBTaGFyZWRNYXRlcmlhbHMgZnJvbSAnLi9zaGFyZWRtYXRlcmlhbHMnO1xyXG5pbXBvcnQgKiBhcyBHcmFiIGZyb20gJy4vZ3JhYic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVDaGVja2JveCgge1xyXG4gIGd1aVN0YXRlLFxyXG4gIHRleHRDcmVhdG9yLFxyXG4gIG9iamVjdCxcclxuICBwcm9wZXJ0eU5hbWUgPSAndW5kZWZpbmVkJyxcclxuICBpbml0aWFsVmFsdWUgPSBmYWxzZSxcclxuICBvcHRpb25zID0gW10sXHJcbiAgd2lkdGggPSBMYXlvdXQuUEFORUxfV0lEVEgsXHJcbiAgaGVpZ2h0ID0gTGF5b3V0LlBBTkVMX0hFSUdIVCxcclxuICBkZXB0aCA9IExheW91dC5QQU5FTF9ERVBUSFxyXG59ID0ge30gKXtcclxuXHJcbiAgY29uc3QgRFJPUERPV05fV0lEVEggPSB3aWR0aCAqIDAuNSAtIExheW91dC5QQU5FTF9NQVJHSU47XHJcbiAgY29uc3QgRFJPUERPV05fSEVJR0hUID0gaGVpZ2h0IC0gTGF5b3V0LlBBTkVMX01BUkdJTjtcclxuICBjb25zdCBEUk9QRE9XTl9ERVBUSCA9IGRlcHRoO1xyXG4gIGNvbnN0IERST1BET1dOX09QVElPTl9IRUlHSFQgPSBoZWlnaHQgLSBMYXlvdXQuUEFORUxfTUFSR0lOICogMS44O1xyXG4gIGNvbnN0IERST1BET1dOX01BUkdJTiA9IExheW91dC5QQU5FTF9NQVJHSU47XHJcblxyXG4gIGNvbnN0IGdyb3VwID0gbmV3IFRIUkVFLkdyb3VwKCk7XHJcblxyXG4gIGNvbnN0IHBhbmVsID0gTGF5b3V0LmNyZWF0ZVBhbmVsKCB3aWR0aCwgaGVpZ2h0LCBkZXB0aCApO1xyXG4gIGdyb3VwLmFkZCggcGFuZWwgKTtcclxuXHJcbiAgZ3JvdXAuaGl0c2NhbiA9IFsgcGFuZWwgXTtcclxuXHJcbiAgY29uc3QgbGFiZWxJbnRlcmFjdGlvbnMgPSBbXTtcclxuICBjb25zdCBvcHRpb25MYWJlbHMgPSBbXTtcclxuXHJcbiAgLy8gIGZpbmQgYWN0dWFsbHkgd2hpY2ggbGFiZWwgaXMgc2VsZWN0ZWRcclxuICBjb25zdCBpbml0aWFsTGFiZWwgPSBPYmplY3Qua2V5cyhvcHRpb25zKS5maW5kKCBmdW5jdGlvbiggb3B0aW9uTmFtZSApe1xyXG4gICAgcmV0dXJuIG9iamVjdFtwcm9wZXJ0eU5hbWVdID09PSBvcHRpb25zWyBvcHRpb25OYW1lIF07XHJcbiAgfSk7XHJcblxyXG4gIGZ1bmN0aW9uIGNyZWF0ZU9wdGlvbiggbGFiZWxUZXh0LCBpc09wdGlvbiApe1xyXG4gICAgY29uc3QgbGFiZWwgPSBjcmVhdGVUZXh0TGFiZWwoIHRleHRDcmVhdG9yLCBsYWJlbFRleHQsIERST1BET1dOX1dJRFRILCBkZXB0aCwgQ29sb3JzLkRST1BET1dOX0ZHX0NPTE9SLCBDb2xvcnMuRFJPUERPV05fQkdfQ09MT1IgKVxyXG4gICAgZ3JvdXAuaGl0c2Nhbi5wdXNoKCBsYWJlbC5iYWNrICk7XHJcbiAgICBjb25zdCBsYWJlbEludGVyYWN0aW9uID0gY3JlYXRlSW50ZXJhY3Rpb24oIGd1aVN0YXRlLCBsYWJlbC5iYWNrICk7XHJcbiAgICBsYWJlbEludGVyYWN0aW9ucy5wdXNoKCBsYWJlbEludGVyYWN0aW9uICk7XHJcbiAgICBvcHRpb25MYWJlbHMucHVzaCggbGFiZWwgKTtcclxuXHJcblxyXG4gICAgaWYoIGlzT3B0aW9uICl7XHJcbiAgICAgIGxhYmVsSW50ZXJhY3Rpb24uZXZlbnRzLm9uKCAnb25QcmVzc2VkJywgZnVuY3Rpb24oKXtcclxuICAgICAgICBzZWxlY3RlZExhYmVsLnNldFN0cmluZyggbGFiZWxUZXh0ICk7XHJcbiAgICAgICAgb2JqZWN0WyBwcm9wZXJ0eU5hbWUgXSA9IG9wdGlvbnNbIGxhYmVsVGV4dCBdO1xyXG4gICAgICAgIGNvbGxhcHNlT3B0aW9ucygpO1xyXG4gICAgICAgIGlmKCBvbkNoYW5nZWRDQiApe1xyXG4gICAgICAgICAgb25DaGFuZ2VkQ0IoIG9iamVjdFsgcHJvcGVydHlOYW1lIF0gKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgbGFiZWxJbnRlcmFjdGlvbi5ldmVudHMub24oICdvblByZXNzZWQnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIG9wZW5PcHRpb25zKCk7XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBsYWJlbC5pc09wdGlvbiA9IGlzT3B0aW9uO1xyXG4gICAgcmV0dXJuIGxhYmVsO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gY29sbGFwc2VPcHRpb25zKCl7XHJcbiAgICBvcHRpb25MYWJlbHMuZm9yRWFjaCggZnVuY3Rpb24oIGxhYmVsICl7XHJcbiAgICAgIGlmKCBsYWJlbC5pc09wdGlvbiApe1xyXG4gICAgICAgIGxhYmVsLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICBsYWJlbC5iYWNrLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBvcGVuT3B0aW9ucygpe1xyXG4gICAgb3B0aW9uTGFiZWxzLmZvckVhY2goIGZ1bmN0aW9uKCBsYWJlbCApe1xyXG4gICAgICBpZiggbGFiZWwuaXNPcHRpb24gKXtcclxuICAgICAgICBsYWJlbC52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICBsYWJlbC5iYWNrLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vICBiYXNlIG9wdGlvblxyXG4gIGNvbnN0IHNlbGVjdGVkTGFiZWwgPSBjcmVhdGVPcHRpb24oIGluaXRpYWxMYWJlbCwgZmFsc2UgKTtcclxuICBzZWxlY3RlZExhYmVsLnBvc2l0aW9uLnggPSBMYXlvdXQuUEFORUxfTUFSR0lOICsgd2lkdGggKiAwLjU7XHJcbiAgc2VsZWN0ZWRMYWJlbC5wb3NpdGlvbi56ID0gZGVwdGg7XHJcblxyXG4gIHNlbGVjdGVkTGFiZWwuYWRkKChmdW5jdGlvbiBjcmVhdGVEb3duQXJyb3coKXtcclxuICAgIGNvbnN0IHcgPSAwLjAxNTtcclxuICAgIGNvbnN0IGggPSAwLjAzO1xyXG4gICAgY29uc3Qgc2ggPSBuZXcgVEhSRUUuU2hhcGUoKTtcclxuICAgIHNoLm1vdmVUbygwLDApO1xyXG4gICAgc2gubGluZVRvKC13LGgpO1xyXG4gICAgc2gubGluZVRvKHcsaCk7XHJcbiAgICBzaC5saW5lVG8oMCwwKTtcclxuXHJcbiAgICBjb25zdCBnZW8gPSBuZXcgVEhSRUUuU2hhcGVHZW9tZXRyeSggc2ggKTtcclxuICAgIENvbG9ycy5jb2xvcml6ZUdlb21ldHJ5KCBnZW8sIENvbG9ycy5EUk9QRE9XTl9GR19DT0xPUiApO1xyXG4gICAgZ2VvLnRyYW5zbGF0ZSggRFJPUERPV05fV0lEVEggLSB3ICogNCwgLURST1BET1dOX0hFSUdIVCAqIDAuNSArIGggKiAwLjUgLCBkZXB0aCAqIDEuMDEgKTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFRIUkVFLk1lc2goIGdlbywgU2hhcmVkTWF0ZXJpYWxzLlBBTkVMICk7XHJcbiAgfSkoKSk7XHJcblxyXG4gIHNlbGVjdGVkTGFiZWwuYWRkKCAuLi5PYmplY3Qua2V5cyhvcHRpb25zKS5tYXAoIGZ1bmN0aW9uKCBvcHRpb25OYW1lLCBpbmRleCApe1xyXG4gICAgY29uc3Qgb3B0aW9uTGFiZWwgPSBjcmVhdGVPcHRpb24oIG9wdGlvbk5hbWUsIHRydWUgKTtcclxuICAgIG9wdGlvbkxhYmVsLnBvc2l0aW9uLnkgPSAtRFJPUERPV05fTUFSR0lOIC0gKGluZGV4KzEpICogKCBEUk9QRE9XTl9PUFRJT05fSEVJR0hUICk7XHJcbiAgICBvcHRpb25MYWJlbC5wb3NpdGlvbi56ID0gZGVwdGg7XHJcbiAgICByZXR1cm4gb3B0aW9uTGFiZWw7XHJcbiAgfSkpO1xyXG5cclxuICBjb2xsYXBzZU9wdGlvbnMoKTtcclxuXHJcbiAgY29uc3QgZGVzY3JpcHRvckxhYmVsID0gdGV4dENyZWF0b3IuY3JlYXRlKCBwcm9wZXJ0eU5hbWUgKTtcclxuICBkZXNjcmlwdG9yTGFiZWwucG9zaXRpb24ueCA9IExheW91dC5QQU5FTF9MQUJFTF9URVhUX01BUkdJTjtcclxuICBkZXNjcmlwdG9yTGFiZWwucG9zaXRpb24ueiA9IGRlcHRoO1xyXG4gIGRlc2NyaXB0b3JMYWJlbC5wb3NpdGlvbi55ID0gLTAuMDM7XHJcblxyXG4gIGNvbnN0IGNvbnRyb2xsZXJJRCA9IExheW91dC5jcmVhdGVDb250cm9sbGVySURCb3goIGhlaWdodCwgQ29sb3JzLkNPTlRST0xMRVJfSURfU0xJREVSICk7XHJcbiAgY29udHJvbGxlcklELnBvc2l0aW9uLnogPSBkZXB0aDtcclxuXHJcbiAgcGFuZWwuYWRkKCBkZXNjcmlwdG9yTGFiZWwsIGNvbnRyb2xsZXJJRCwgc2VsZWN0ZWRMYWJlbCApO1xyXG5cclxuXHJcbiAgdXBkYXRlVmlldygpO1xyXG5cclxuICBmdW5jdGlvbiB1cGRhdGVWaWV3KCl7XHJcblxyXG4gICAgbGFiZWxJbnRlcmFjdGlvbnMuZm9yRWFjaCggZnVuY3Rpb24oIGludGVyYWN0aW9uLCBpbmRleCApe1xyXG4gICAgICBjb25zdCBsYWJlbCA9IG9wdGlvbkxhYmVsc1sgaW5kZXggXTtcclxuICAgICAgaWYoIGxhYmVsLmlzT3B0aW9uICl7XHJcbiAgICAgICAgaWYoIGludGVyYWN0aW9uLmhvdmVyaW5nKCkgKXtcclxuICAgICAgICAgIENvbG9ycy5jb2xvcml6ZUdlb21ldHJ5KCBsYWJlbC5iYWNrLmdlb21ldHJ5LCBDb2xvcnMuSElHSExJR0hUX0NPTE9SICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICBDb2xvcnMuY29sb3JpemVHZW9tZXRyeSggbGFiZWwuYmFjay5nZW9tZXRyeSwgQ29sb3JzLkRST1BET1dOX0JHX0NPTE9SICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGxldCBvbkNoYW5nZWRDQjtcclxuICBsZXQgb25GaW5pc2hDaGFuZ2VDQjtcclxuXHJcbiAgZ3JvdXAub25DaGFuZ2UgPSBmdW5jdGlvbiggY2FsbGJhY2sgKXtcclxuICAgIG9uQ2hhbmdlZENCID0gY2FsbGJhY2s7XHJcbiAgICByZXR1cm4gZ3JvdXA7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZ3JhYkludGVyYWN0aW9uID0gR3JhYi5jcmVhdGUoIHsgZ3JvdXAsIHBhbmVsLCBndWlTdGF0ZSB9ICk7XHJcblxyXG4gIGdyb3VwLnVwZGF0ZSA9IGZ1bmN0aW9uKCBpbnB1dE9iamVjdHMgKXtcclxuICAgIGxhYmVsSW50ZXJhY3Rpb25zLmZvckVhY2goIGZ1bmN0aW9uKCBsYWJlbEludGVyYWN0aW9uICl7XHJcbiAgICAgIGxhYmVsSW50ZXJhY3Rpb24udXBkYXRlKCBpbnB1dE9iamVjdHMgKTtcclxuICAgIH0pO1xyXG4gICAgZ3JhYkludGVyYWN0aW9uLnVwZGF0ZSggaW5wdXRPYmplY3RzICk7XHJcbiAgICB1cGRhdGVWaWV3KCk7XHJcbiAgfTtcclxuXHJcblxyXG4gIHJldHVybiBncm91cDtcclxufSIsImltcG9ydCBjcmVhdGVUZXh0TGFiZWwgZnJvbSAnLi90ZXh0bGFiZWwnO1xyXG5pbXBvcnQgY3JlYXRlSW50ZXJhY3Rpb24gZnJvbSAnLi9pbnRlcmFjdGlvbic7XHJcbmltcG9ydCAqIGFzIENvbG9ycyBmcm9tICcuL2NvbG9ycyc7XHJcbmltcG9ydCAqIGFzIExheW91dCBmcm9tICcuL2xheW91dCc7XHJcbmltcG9ydCAqIGFzIFNoYXJlZE1hdGVyaWFscyBmcm9tICcuL3NoYXJlZG1hdGVyaWFscyc7XHJcbmltcG9ydCAqIGFzIEdyYWIgZnJvbSAnLi9ncmFiJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUZvbGRlcih7XHJcbiAgZ3VpU3RhdGUsXHJcbiAgdGV4dENyZWF0b3IsXHJcbiAgbmFtZVxyXG59ID0ge30gKXtcclxuXHJcbiAgY29uc3Qgd2lkdGggPSBMYXlvdXQuUEFORUxfV0lEVEg7XHJcblxyXG4gIGNvbnN0IHNwYWNpbmdQZXJDb250cm9sbGVyID0gTGF5b3V0LlBBTkVMX0hFSUdIVCArIExheW91dC5QQU5FTF9TUEFDSU5HO1xyXG5cclxuICBjb25zdCBzdGF0ZSA9IHtcclxuICAgIGNvbGxhcHNlZDogZmFsc2UsXHJcbiAgICBwcmV2aW91c1BhcmVudDogdW5kZWZpbmVkXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZ3JvdXAgPSBuZXcgVEhSRUUuR3JvdXAoKTtcclxuICBjb25zdCBjb2xsYXBzZUdyb3VwID0gbmV3IFRIUkVFLkdyb3VwKCk7XHJcbiAgZ3JvdXAuYWRkKCBjb2xsYXBzZUdyb3VwICk7XHJcblxyXG4gIC8vICBZZWFoLiBHcm9zcy5cclxuICBjb25zdCBhZGRPcmlnaW5hbCA9IFRIUkVFLkdyb3VwLnByb3RvdHlwZS5hZGQ7XHJcbiAgYWRkT3JpZ2luYWwuY2FsbCggZ3JvdXAsIGNvbGxhcHNlR3JvdXAgKTtcclxuXHJcbiAgY29uc3QgZGVzY3JpcHRvckxhYmVsID0gY3JlYXRlVGV4dExhYmVsKCB0ZXh0Q3JlYXRvciwgJy0gJyArIG5hbWUsIDAuNiApO1xyXG4gIGRlc2NyaXB0b3JMYWJlbC5wb3NpdGlvbi55ID0gTGF5b3V0LlBBTkVMX0hFSUdIVCAqIDAuNTtcclxuXHJcbiAgYWRkT3JpZ2luYWwuY2FsbCggZ3JvdXAsIGRlc2NyaXB0b3JMYWJlbCApO1xyXG5cclxuICBjb25zdCBwYW5lbCA9IG5ldyBUSFJFRS5NZXNoKCBuZXcgVEhSRUUuQm94R2VvbWV0cnkoIHdpZHRoLCAxLCBMYXlvdXQuUEFORUxfREVQVEggKSwgU2hhcmVkTWF0ZXJpYWxzLkZPTERFUiApO1xyXG4gIHBhbmVsLmdlb21ldHJ5LnRyYW5zbGF0ZSggd2lkdGggKiAwLjUsIDAsIC1MYXlvdXQuUEFORUxfREVQVEggKTtcclxuICBhZGRPcmlnaW5hbC5jYWxsKCBncm91cCwgcGFuZWwgKTtcclxuXHJcbiAgLy8gY29uc3QgaW50ZXJhY3Rpb25Wb2x1bWUgPSBuZXcgVEhSRUUuTWVzaCggbmV3IFRIUkVFLkJveEdlb21ldHJ5KCB3aWR0aCwgMSwgTGF5b3V0LlBBTkVMX0RFUFRIICksIG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7Y29sb3I6MHgwMDAwMDB9KSApO1xyXG4gIC8vIGludGVyYWN0aW9uVm9sdW1lLmdlb21ldHJ5LnRyYW5zbGF0ZSggd2lkdGggKiAwLjUgLSBMYXlvdXQuUEFORUxfTUFSR0lOLCAwLCAtTGF5b3V0LlBBTkVMX0RFUFRIICk7XHJcbiAgLy8gYWRkT3JpZ2luYWwuY2FsbCggZ3JvdXAsIGludGVyYWN0aW9uVm9sdW1lICk7XHJcbiAgLy8gaW50ZXJhY3Rpb25Wb2x1bWUudmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICBjb25zdCBpbnRlcmFjdGlvbiA9IGNyZWF0ZUludGVyYWN0aW9uKCBndWlTdGF0ZSwgcGFuZWwgKTtcclxuICAvLyBpbnRlcmFjdGlvbi5ldmVudHMub24oICdvblByZXNzZWQnLCBoYW5kbGVQcmVzcyApO1xyXG5cclxuICBmdW5jdGlvbiBoYW5kbGVQcmVzcygpe1xyXG4gICAgc3RhdGUuY29sbGFwc2VkID0gIXN0YXRlLmNvbGxhcHNlZDtcclxuICAgIHBlcmZvcm1MYXlvdXQoKTtcclxuICB9XHJcblxyXG4gIGdyb3VwLmFkZCA9IGZ1bmN0aW9uKCAuLi5hcmdzICl7XHJcbiAgICBhcmdzLmZvckVhY2goIGZ1bmN0aW9uKCBvYmogKXtcclxuICAgICAgY29uc3QgY29udGFpbmVyID0gbmV3IFRIUkVFLkdyb3VwKCk7XHJcbiAgICAgIGNvbnRhaW5lci5hZGQoIG9iaiApO1xyXG4gICAgICBjb2xsYXBzZUdyb3VwLmFkZCggY29udGFpbmVyICk7XHJcbiAgICAgIG9iai5mb2xkZXIgPSBncm91cDtcclxuICAgIH0pO1xyXG5cclxuICAgIHBlcmZvcm1MYXlvdXQoKTtcclxuICB9O1xyXG5cclxuICBmdW5jdGlvbiBwZXJmb3JtTGF5b3V0KCl7XHJcbiAgICBjb2xsYXBzZUdyb3VwLmNoaWxkcmVuLmZvckVhY2goIGZ1bmN0aW9uKCBjaGlsZCwgaW5kZXggKXtcclxuICAgICAgY2hpbGQucG9zaXRpb24ueSA9IC0oaW5kZXgrMSkgKiBzcGFjaW5nUGVyQ29udHJvbGxlciArIExheW91dC5QQU5FTF9IRUlHSFQgKiAwLjU7XHJcbiAgICAgIGlmKCBzdGF0ZS5jb2xsYXBzZWQgKXtcclxuICAgICAgICBjaGlsZC5jaGlsZHJlblswXS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZXtcclxuICAgICAgICBjaGlsZC5jaGlsZHJlblswXS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYoIHN0YXRlLmNvbGxhcHNlZCApe1xyXG4gICAgICBkZXNjcmlwdG9yTGFiZWwuc2V0U3RyaW5nKCAnKyAnICsgbmFtZSApO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgZGVzY3JpcHRvckxhYmVsLnNldFN0cmluZyggJy0gJyArIG5hbWUgKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0b3RhbEhlaWdodCA9IGNvbGxhcHNlR3JvdXAuY2hpbGRyZW4ubGVuZ3RoICogc3BhY2luZ1BlckNvbnRyb2xsZXI7XHJcbiAgICBwYW5lbC5nZW9tZXRyeSA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSggd2lkdGgsIHRvdGFsSGVpZ2h0LCBMYXlvdXQuUEFORUxfREVQVEggKTtcclxuICAgIHBhbmVsLmdlb21ldHJ5LnRyYW5zbGF0ZSggd2lkdGggKiAwLjUsIC10b3RhbEhlaWdodCAqIDAuNSwgLUxheW91dC5QQU5FTF9ERVBUSCApO1xyXG4gICAgcGFuZWwuZ2VvbWV0cnkuY29tcHV0ZUJvdW5kaW5nQm94KCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiB1cGRhdGVMYWJlbCgpe1xyXG4gICAgLy8gaWYoIGludGVyYWN0aW9uLmhvdmVyaW5nKCkgKXtcclxuICAgIC8vICAgZGVzY3JpcHRvckxhYmVsLmJhY2subWF0ZXJpYWwuY29sb3Iuc2V0SGV4KCBDb2xvcnMuSElHSExJR0hUX0JBQ0sgKTtcclxuICAgIC8vIH1cclxuICAgIC8vIGVsc2V7XHJcbiAgICAgIC8vIGRlc2NyaXB0b3JMYWJlbC5iYWNrLm1hdGVyaWFsLmNvbG9yLnNldEhleCggQ29sb3JzLkRFRkFVTFRfQkFDSyApO1xyXG4gICAgLy8gfVxyXG4gIH1cclxuXHJcbiAgZ3JvdXAuZm9sZGVyID0gZ3JvdXA7XHJcbiAgY29uc3QgZ3JhYkludGVyYWN0aW9uID0gR3JhYi5jcmVhdGUoIHsgZ3JvdXAsIHBhbmVsOiBkZXNjcmlwdG9yTGFiZWwuYmFjaywgZ3VpU3RhdGUgfSApO1xyXG5cclxuICBncm91cC51cGRhdGUgPSBmdW5jdGlvbiggaW5wdXRPYmplY3RzICl7XHJcbiAgICBpbnRlcmFjdGlvbi51cGRhdGUoIGlucHV0T2JqZWN0cyApO1xyXG4gICAgZ3JhYkludGVyYWN0aW9uLnVwZGF0ZSggaW5wdXRPYmplY3RzICk7XHJcbiAgICB1cGRhdGVMYWJlbCgpO1xyXG4gIH07XHJcblxyXG4gIGdyb3VwLnBpblRvID0gZnVuY3Rpb24oIG5ld1BhcmVudCApe1xyXG4gICAgY29uc3Qgb2xkUGFyZW50ID0gZ3JvdXAucGFyZW50O1xyXG5cclxuICAgIGlmKCBncm91cC5wYXJlbnQgKXtcclxuICAgICAgZ3JvdXAucGFyZW50LnJlbW92ZSggZ3JvdXAgKTtcclxuICAgIH1cclxuICAgIG5ld1BhcmVudC5hZGQoIGdyb3VwICk7XHJcblxyXG4gICAgcmV0dXJuIG9sZFBhcmVudDtcclxuICB9O1xyXG5cclxuICBncm91cC5oaXRzY2FuID0gWyBwYW5lbCwgZGVzY3JpcHRvckxhYmVsLmJhY2sgXTtcclxuXHJcbiAgcmV0dXJuIGdyb3VwO1xyXG59IiwiaW1wb3J0IGNyZWF0ZUludGVyYWN0aW9uIGZyb20gJy4vaW50ZXJhY3Rpb24nO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZSggeyBncm91cCwgcGFuZWwsIGd1aVN0YXRlIH0gPSB7fSApe1xyXG5cclxuICBjb25zdCBpbnRlcmFjdGlvbiA9IGNyZWF0ZUludGVyYWN0aW9uKCBndWlTdGF0ZSwgcGFuZWwgKTtcclxuXHJcbiAgaW50ZXJhY3Rpb24uZXZlbnRzLm9uKCAnb25HcmlwcGVkJywgaGFuZGxlT25HcmlwICk7XHJcbiAgaW50ZXJhY3Rpb24uZXZlbnRzLm9uKCAnb25SZWxlYXNlR3JpcCcsIGhhbmRsZVJlbGVhc2VHcmlwICk7XHJcblxyXG4gIGNvbnN0IHRlbXBNYXRyaXggPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xyXG5cclxuICBsZXQgb2xkUGFyZW50O1xyXG5cclxuICBmdW5jdGlvbiBoYW5kbGVPbkdyaXAoIHtpbnB1dE9iamVjdH09e30gKXtcclxuXHJcbiAgICBjb25zdCBmb2xkZXIgPSBncm91cC5mb2xkZXI7XHJcbiAgICBpZiggZm9sZGVyID09PSB1bmRlZmluZWQgKXtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRlbXBNYXRyaXguZ2V0SW52ZXJzZSggaW5wdXRPYmplY3QubWF0cml4V29ybGQgKTtcclxuXHJcbiAgICBmb2xkZXIubWF0cml4LnByZW11bHRpcGx5KCB0ZW1wTWF0cml4ICk7XHJcbiAgICBmb2xkZXIubWF0cml4LmRlY29tcG9zZSggZm9sZGVyLnBvc2l0aW9uLCBmb2xkZXIucXVhdGVybmlvbiwgZm9sZGVyLnNjYWxlICk7XHJcblxyXG4gICAgb2xkUGFyZW50ID0gZm9sZGVyLnBhcmVudDtcclxuICAgIGlucHV0T2JqZWN0LmFkZCggZm9sZGVyICk7XHJcblxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaGFuZGxlUmVsZWFzZUdyaXAoIHtpbnB1dE9iamVjdH09e30gKXtcclxuICAgIGNvbnN0IGZvbGRlciA9IGdyb3VwLmZvbGRlcjtcclxuICAgIGlmKCBmb2xkZXIgPT09IHVuZGVmaW5lZCApe1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiggb2xkUGFyZW50ID09PSB1bmRlZmluZWQgKXtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgZm9sZGVyLm1hdHJpeC5wcmVtdWx0aXBseSggaW5wdXRPYmplY3QubWF0cml4V29ybGQgKTtcclxuICAgIGZvbGRlci5tYXRyaXguZGVjb21wb3NlKCBmb2xkZXIucG9zaXRpb24sIGZvbGRlci5xdWF0ZXJuaW9uLCBmb2xkZXIuc2NhbGUgKTtcclxuICAgIG9sZFBhcmVudC5hZGQoIGZvbGRlciApO1xyXG4gICAgb2xkUGFyZW50ID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGludGVyYWN0aW9uO1xyXG59IiwiaW1wb3J0IGxvYWRGb250IGZyb20gJ2xvYWQtYm1mb250JztcclxuaW1wb3J0IEVtaXR0ZXIgZnJvbSAnZXZlbnRzJztcclxuXHJcbmltcG9ydCBjcmVhdGVTbGlkZXIgZnJvbSAnLi9zbGlkZXInO1xyXG5pbXBvcnQgY3JlYXRlQ2hlY2tib3ggZnJvbSAnLi9jaGVja2JveCc7XHJcbmltcG9ydCBjcmVhdGVCdXR0b24gZnJvbSAnLi9idXR0b24nO1xyXG5pbXBvcnQgY3JlYXRlRm9sZGVyIGZyb20gJy4vZm9sZGVyJztcclxuaW1wb3J0IGNyZWF0ZURyb3Bkb3duIGZyb20gJy4vZHJvcGRvd24nO1xyXG5pbXBvcnQgKiBhcyBTREZUZXh0IGZyb20gJy4vc2RmdGV4dCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBEQVRHVUlWUigpe1xyXG5cclxuICBjb25zdCB0ZXh0TWF0ZXJpYWwgPSBTREZUZXh0LmNyZWF0ZU1hdGVyaWFsKCk7XHJcblxyXG4gIGNvbnN0IGlucHV0T2JqZWN0cyA9IFtdO1xyXG4gIGNvbnN0IGNvbnRyb2xsZXJzID0gW107XHJcbiAgY29uc3QgaGl0c2Nhbk9iamVjdHMgPSBbXTtcclxuXHJcbiAgY29uc3QgZXZlbnRzID0gbmV3IEVtaXR0ZXIoKTtcclxuICBldmVudHMuc2V0TWF4TGlzdGVuZXJzKCAxMDAgKTtcclxuXHJcbiAgY29uc3QgREVGQVVMVF9GTlQgPSAnZm9udHMvbHVjaWRhc2Fuc3VuaWNvZGUuZm50JztcclxuXHJcbiAgY29uc3QgZ3VpU3RhdGUgPSB7XHJcbiAgICBjdXJyZW50SG92ZXI6IHVuZGVmaW5lZCxcclxuICAgIGN1cnJlbnRJbnRlcmFjdGlvbjogdW5kZWZpbmVkLFxyXG4gICAgZXZlbnRzOiBuZXcgRW1pdHRlcigpXHJcbiAgfTtcclxuXHJcbiAgbG9hZEZvbnQoIERFRkFVTFRfRk5ULCBmdW5jdGlvbiggZXJyLCBmb250ICl7XHJcbiAgICBpZiggZXJyICl7XHJcbiAgICAgIGNvbnNvbGUud2FybiggZXJyICk7XHJcbiAgICB9XHJcbiAgICBldmVudHMuZW1pdCggJ2ZvbnRMb2FkZWQnLCBmb250ICk7XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHRleHRDcmVhdG9yID0gU0RGVGV4dC5jcmVhdG9yKCB0ZXh0TWF0ZXJpYWwsIGV2ZW50cyApO1xyXG5cclxuICBjb25zdCBjdXJzb3JNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7Y29sb3I6MHg0NDQ0NDQsIHRyYW5zcGFyZW50OiB0cnVlLCBibGVuZGluZzogVEhSRUUuQWRkaXRpdmVCbGVuZGluZyB9ICk7XHJcblxyXG4gIGZ1bmN0aW9uIGNyZWF0ZUN1cnNvcigpe1xyXG4gICAgcmV0dXJuIG5ldyBUSFJFRS5NZXNoKCBuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoMC4wMDYsIDQsIDQgKSwgY3Vyc29yTWF0ZXJpYWwgKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGxhc2VyTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTGluZUJhc2ljTWF0ZXJpYWwoe2NvbG9yOjB4NTVhYWZmLCB0cmFuc3BhcmVudDogdHJ1ZSwgYmxlbmRpbmc6IFRIUkVFLkFkZGl0aXZlQmxlbmRpbmcgfSk7XHJcbiAgZnVuY3Rpb24gY3JlYXRlTGFzZXIoKXtcclxuICAgIGNvbnN0IGcgPSBuZXcgVEhSRUUuR2VvbWV0cnkoKTtcclxuICAgIGcudmVydGljZXMucHVzaCggbmV3IFRIUkVFLlZlY3RvcjMoKSApO1xyXG4gICAgZy52ZXJ0aWNlcy5wdXNoKCBuZXcgVEhSRUUuVmVjdG9yMygwLDAsMCkgKTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFRIUkVFLkxpbmUoIGcsIGxhc2VyTWF0ZXJpYWwgKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFkZElucHV0T2JqZWN0KCBvYmplY3QgKXtcclxuICAgIGNvbnN0IGlucHV0ID0ge1xyXG4gICAgICByYXljYXN0OiBuZXcgVEhSRUUuUmF5Y2FzdGVyKCBuZXcgVEhSRUUuVmVjdG9yMygpLCBuZXcgVEhSRUUuVmVjdG9yMygpICksXHJcbiAgICAgIGxhc2VyOiBjcmVhdGVMYXNlcigpLFxyXG4gICAgICBjdXJzb3I6IGNyZWF0ZUN1cnNvcigpLFxyXG4gICAgICBvYmplY3QsXHJcbiAgICAgIHByZXNzZWQ6IGZhbHNlLFxyXG4gICAgICBncmlwcGVkOiBmYWxzZVxyXG4gICAgfTtcclxuXHJcbiAgICBpbnB1dC5sYXNlci5hZGQoIGlucHV0LmN1cnNvciApO1xyXG5cclxuICAgIGlucHV0Lmxhc2VyLnByZXNzZWQgPSBmdW5jdGlvbiggZmxhZyApe1xyXG4gICAgICBpbnB1dC5wcmVzc2VkID0gZmxhZztcclxuICAgIH07XHJcblxyXG4gICAgaW5wdXQubGFzZXIuZ3JpcHBlZCA9IGZ1bmN0aW9uKCBmbGFnICl7XHJcbiAgICAgIGlucHV0LmdyaXBwZWQgPSBmbGFnO1xyXG4gICAgfTtcclxuXHJcbiAgICBpZiggVEhSRUUuVml2ZUNvbnRyb2xsZXIgJiYgb2JqZWN0IGluc3RhbmNlb2YgVEhSRUUuVml2ZUNvbnRyb2xsZXIgKXtcclxuICAgICAgYmluZFZpdmVDb250cm9sbGVyKCBndWlTdGF0ZSwgb2JqZWN0LCBpbnB1dC5sYXNlci5wcmVzc2VkLCBpbnB1dC5sYXNlci5ncmlwcGVkICk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5wdXRPYmplY3RzLnB1c2goIGlucHV0ICk7XHJcblxyXG4gICAgcmV0dXJuIGlucHV0Lmxhc2VyO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYWRkU2xpZGVyKCBvYmplY3QsIHByb3BlcnR5TmFtZSwgbWluID0gMC4wLCBtYXggPSAxMDAuMCApe1xyXG4gICAgY29uc3Qgc2xpZGVyID0gY3JlYXRlU2xpZGVyKCB7XHJcbiAgICAgIGd1aVN0YXRlLCB0ZXh0Q3JlYXRvciwgcHJvcGVydHlOYW1lLCBvYmplY3QsIG1pbiwgbWF4LFxyXG4gICAgICBpbml0aWFsVmFsdWU6IG9iamVjdFsgcHJvcGVydHlOYW1lIF1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnRyb2xsZXJzLnB1c2goIHNsaWRlciApO1xyXG4gICAgaGl0c2Nhbk9iamVjdHMucHVzaCggLi4uc2xpZGVyLmhpdHNjYW4gKVxyXG5cclxuICAgIHJldHVybiBzbGlkZXI7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhZGRDaGVja2JveCggb2JqZWN0LCBwcm9wZXJ0eU5hbWUgKXtcclxuICAgIGNvbnN0IGNoZWNrYm94ID0gY3JlYXRlQ2hlY2tib3goe1xyXG4gICAgICBndWlTdGF0ZSwgdGV4dENyZWF0b3IsIHByb3BlcnR5TmFtZSwgb2JqZWN0LFxyXG4gICAgICBpbml0aWFsVmFsdWU6IG9iamVjdFsgcHJvcGVydHlOYW1lIF1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnRyb2xsZXJzLnB1c2goIGNoZWNrYm94ICk7XHJcbiAgICBoaXRzY2FuT2JqZWN0cy5wdXNoKCAuLi5jaGVja2JveC5oaXRzY2FuIClcclxuXHJcbiAgICByZXR1cm4gY2hlY2tib3g7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhZGRCdXR0b24oIG9iamVjdCwgcHJvcGVydHlOYW1lICl7XHJcbiAgICBjb25zdCBidXR0b24gPSBjcmVhdGVCdXR0b24oe1xyXG4gICAgICBndWlTdGF0ZSwgdGV4dENyZWF0b3IsIHByb3BlcnR5TmFtZSwgb2JqZWN0XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb250cm9sbGVycy5wdXNoKCBidXR0b24gKTtcclxuICAgIGhpdHNjYW5PYmplY3RzLnB1c2goIC4uLmJ1dHRvbi5oaXRzY2FuICk7XHJcbiAgICByZXR1cm4gYnV0dG9uO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYWRkRHJvcGRvd24oIG9iamVjdCwgcHJvcGVydHlOYW1lLCBvcHRpb25zICl7XHJcbiAgICBjb25zdCBkcm9wZG93biA9IGNyZWF0ZURyb3Bkb3duKHtcclxuICAgICAgZ3VpU3RhdGUsIHRleHRDcmVhdG9yLCBwcm9wZXJ0eU5hbWUsIG9iamVjdCwgb3B0aW9uc1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29udHJvbGxlcnMucHVzaCggZHJvcGRvd24gKTtcclxuICAgIGhpdHNjYW5PYmplY3RzLnB1c2goIC4uLmRyb3Bkb3duLmhpdHNjYW4gKTtcclxuICAgIHJldHVybiBkcm9wZG93bjtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFkZCggb2JqZWN0LCBwcm9wZXJ0eU5hbWUsIGFyZzMsIGFyZzQgKXtcclxuXHJcbiAgICBpZiggb2JqZWN0ID09PSB1bmRlZmluZWQgKXtcclxuICAgICAgY29uc29sZS53YXJuKCAnb2JqZWN0IGlzIHVuZGVmaW5lZCcgKTtcclxuICAgICAgcmV0dXJuIG5ldyBUSFJFRS5Hcm91cCgpO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAgaWYoIG9iamVjdFsgcHJvcGVydHlOYW1lIF0gPT09IHVuZGVmaW5lZCApe1xyXG4gICAgICBjb25zb2xlLndhcm4oICdubyBwcm9wZXJ0eSBuYW1lZCcsIHByb3BlcnR5TmFtZSwgJ29uIG9iamVjdCcsIG9iamVjdCApO1xyXG4gICAgICByZXR1cm4gbmV3IFRIUkVFLkdyb3VwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoIGlzT2JqZWN0KCBhcmczICkgKXtcclxuICAgICAgcmV0dXJuIGFkZERyb3Bkb3duKCBvYmplY3QsIHByb3BlcnR5TmFtZSwgYXJnMyApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKCBpc051bWJlciggb2JqZWN0WyBwcm9wZXJ0eU5hbWVdICkgKXtcclxuICAgICAgcmV0dXJuIGFkZFNsaWRlciggb2JqZWN0LCBwcm9wZXJ0eU5hbWUsIGFyZzMsIGFyZzQgKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiggaXNCb29sZWFuKCBvYmplY3RbIHByb3BlcnR5TmFtZV0gKSApe1xyXG4gICAgICByZXR1cm4gYWRkQ2hlY2tib3goIG9iamVjdCwgcHJvcGVydHlOYW1lICk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoIGlzRnVuY3Rpb24oIG9iamVjdFsgcHJvcGVydHlOYW1lIF0gKSApe1xyXG4gICAgICByZXR1cm4gYWRkQnV0dG9uKCBvYmplY3QsIHByb3BlcnR5TmFtZSApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYWRkRm9sZGVyKCBuYW1lICl7XHJcbiAgICBjb25zdCBmb2xkZXIgPSBjcmVhdGVGb2xkZXIoe1xyXG4gICAgICBndWlTdGF0ZSwgdGV4dENyZWF0b3IsXHJcbiAgICAgIG5hbWVcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnRyb2xsZXJzLnB1c2goIGZvbGRlciApO1xyXG4gICAgaWYoIGZvbGRlci5oaXRzY2FuICl7XHJcbiAgICAgIGhpdHNjYW5PYmplY3RzLnB1c2goIC4uLmZvbGRlci5oaXRzY2FuICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZvbGRlcjtcclxuICB9XHJcblxyXG4gIGNvbnN0IHRQb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XHJcbiAgY29uc3QgdERpcmVjdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCAwLCAwLCAtMSApO1xyXG4gIGNvbnN0IHRNYXRyaXggPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xyXG5cclxuICBmdW5jdGlvbiB1cGRhdGUoKSB7XHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIHVwZGF0ZSApO1xyXG5cclxuICAgIGlucHV0T2JqZWN0cy5mb3JFYWNoKCBmdW5jdGlvbigge2JveCxvYmplY3QscmF5Y2FzdCxsYXNlcixjdXJzb3J9ID0ge30sIGluZGV4ICl7XHJcbiAgICAgIG9iamVjdC51cGRhdGVNYXRyaXhXb3JsZCgpO1xyXG5cclxuICAgICAgdFBvc2l0aW9uLnNldCgwLDAsMCkuc2V0RnJvbU1hdHJpeFBvc2l0aW9uKCBvYmplY3QubWF0cml4V29ybGQgKTtcclxuICAgICAgdE1hdHJpeC5pZGVudGl0eSgpLmV4dHJhY3RSb3RhdGlvbiggb2JqZWN0Lm1hdHJpeFdvcmxkICk7XHJcbiAgICAgIHREaXJlY3Rpb24uc2V0KDAsMCwtMSkuYXBwbHlNYXRyaXg0KCB0TWF0cml4ICkubm9ybWFsaXplKCk7XHJcblxyXG4gICAgICByYXljYXN0LnNldCggdFBvc2l0aW9uLCB0RGlyZWN0aW9uICk7XHJcblxyXG4gICAgICBsYXNlci5nZW9tZXRyeS52ZXJ0aWNlc1sgMCBdLmNvcHkoIHRQb3NpdGlvbiApO1xyXG5cclxuICAgICAgLy8gIGRlYnVnLi4uXHJcbiAgICAgIC8vIGxhc2VyLmdlb21ldHJ5LnZlcnRpY2VzWyAxIF0uY29weSggdFBvc2l0aW9uICkuYWRkKCB0RGlyZWN0aW9uLm11bHRpcGx5U2NhbGFyKCAxICkgKTtcclxuXHJcbiAgICAgIGNvbnN0IGludGVyc2VjdGlvbnMgPSByYXljYXN0LmludGVyc2VjdE9iamVjdHMoIGhpdHNjYW5PYmplY3RzLCBmYWxzZSApO1xyXG4gICAgICBpZiggaW50ZXJzZWN0aW9ucy5sZW5ndGggPiAwICl7XHJcbiAgICAgICAgY29uc3QgZmlyc3RIaXQgPSBpbnRlcnNlY3Rpb25zWyAwIF07XHJcbiAgICAgICAgbGFzZXIuZ2VvbWV0cnkudmVydGljZXNbIDEgXS5jb3B5KCBmaXJzdEhpdC5wb2ludCApO1xyXG4gICAgICAgIGxhc2VyLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIGxhc2VyLmdlb21ldHJ5LmNvbXB1dGVCb3VuZGluZ1NwaGVyZSgpO1xyXG4gICAgICAgIGxhc2VyLmdlb21ldHJ5LmNvbXB1dGVCb3VuZGluZ0JveCgpO1xyXG4gICAgICAgIGxhc2VyLmdlb21ldHJ5LnZlcnRpY2VzTmVlZFVwZGF0ZSA9IHRydWU7XHJcbiAgICAgICAgY3Vyc29yLnBvc2l0aW9uLmNvcHkoIGZpcnN0SGl0LnBvaW50ICk7XHJcbiAgICAgICAgY3Vyc29yLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2V7XHJcbiAgICAgICAgbGFzZXIudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGN1cnNvci52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlucHV0T2JqZWN0c1sgaW5kZXggXS5pbnRlcnNlY3Rpb25zID0gaW50ZXJzZWN0aW9ucztcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnRyb2xsZXJzLmZvckVhY2goIGZ1bmN0aW9uKCBjb250cm9sbGVyICl7XHJcbiAgICAgIGNvbnRyb2xsZXIudXBkYXRlKCBpbnB1dE9iamVjdHMgKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBhZGRJbnB1dE9iamVjdCxcclxuICAgIGFkZCxcclxuICAgIGFkZEZvbGRlclxyXG4gIH07XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBpc051bWJlcihuKSB7XHJcbiAgcmV0dXJuICFpc05hTihwYXJzZUZsb2F0KG4pKSAmJiBpc0Zpbml0ZShuKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaXNCb29sZWFuKG4pe1xyXG4gIHJldHVybiB0eXBlb2YgbiA9PT0gJ2Jvb2xlYW4nO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGZ1bmN0aW9uVG9DaGVjaykge1xyXG4gIGNvbnN0IGdldFR5cGUgPSB7fTtcclxuICByZXR1cm4gZnVuY3Rpb25Ub0NoZWNrICYmIGdldFR5cGUudG9TdHJpbmcuY2FsbChmdW5jdGlvblRvQ2hlY2spID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xyXG59XHJcblxyXG4vLyAgb25seSB7fSBvYmplY3RzIG5vdCBhcnJheXNcclxuLy8gICAgICAgICAgICAgICAgICAgIHdoaWNoIGFyZSB0ZWNobmljYWxseSBvYmplY3RzIGJ1dCB5b3UncmUganVzdCBiZWluZyBwZWRhbnRpY1xyXG5mdW5jdGlvbiBpc09iamVjdCAoaXRlbSkge1xyXG4gIHJldHVybiAodHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KGl0ZW0pICYmIGl0ZW0gIT09IG51bGwpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBiaW5kVml2ZUNvbnRyb2xsZXIoIGd1aVN0YXRlLCBjb250cm9sbGVyLCBwcmVzc2VkLCBncmlwcGVkICl7XHJcbiAgY29udHJvbGxlci5hZGRFdmVudExpc3RlbmVyKCAndHJpZ2dlcmRvd24nLCAoKT0+cHJlc3NlZCggdHJ1ZSApICk7XHJcbiAgY29udHJvbGxlci5hZGRFdmVudExpc3RlbmVyKCAndHJpZ2dlcnVwJywgKCk9PnByZXNzZWQoIGZhbHNlICkgKTtcclxuICBjb250cm9sbGVyLmFkZEV2ZW50TGlzdGVuZXIoICdncmlwc2Rvd24nLCAoKT0+Z3JpcHBlZCggdHJ1ZSApICk7XHJcbiAgY29udHJvbGxlci5hZGRFdmVudExpc3RlbmVyKCAnZ3JpcHN1cCcsICgpPT5ncmlwcGVkKCBmYWxzZSApICk7XHJcblxyXG4gIGNvbnN0IGdhbWVwYWQgPSBjb250cm9sbGVyLmdldEdhbWVwYWQoKTtcclxuICBndWlTdGF0ZS5ldmVudHMub24oICdvbkNvbnRyb2xsZXJIZWxkJywgZnVuY3Rpb24oIGlucHV0ICl7XHJcbiAgICBpZiggaW5wdXQub2JqZWN0ID09PSBjb250cm9sbGVyICl7XHJcbiAgICAgIGlmKCBnYW1lcGFkICYmIGdhbWVwYWQuaGFwdGljcy5sZW5ndGggPiAwICl7XHJcbiAgICAgICAgZ2FtZXBhZC5oYXB0aWNzWyAwIF0udmlicmF0ZSggMC4zLCAwLjMgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxufVxyXG5cclxuaWYoIHdpbmRvdyApe1xyXG4gIHdpbmRvdy5EQVRHVUlWUiA9IERBVEdVSVZSO1xyXG59IiwiaW1wb3J0IEVtaXR0ZXIgZnJvbSAnZXZlbnRzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUludGVyYWN0aW9uKCBndWlTdGF0ZSwgaGl0Vm9sdW1lICl7XHJcbiAgY29uc3QgZXZlbnRzID0gbmV3IEVtaXR0ZXIoKTtcclxuXHJcbiAgY29uc3Qgc3RhdGUgPSB7XHJcbiAgICBob3ZlcjogZmFsc2UsXHJcbiAgICBwcmVzc2VkOiBmYWxzZSxcclxuICAgIGdyaXBwZWQ6IGZhbHNlLFxyXG4gIH07XHJcblxyXG4gIGZ1bmN0aW9uIGlzTWFpbkludGVyYWN0aW9uKCl7XHJcbiAgICByZXR1cm4gKCBndWlTdGF0ZS5jdXJyZW50SW50ZXJhY3Rpb24gPT09IGludGVyYWN0aW9uICk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBoYXNNYWluSW50ZXJhY3Rpb24oKXtcclxuICAgIHJldHVybiAoIGd1aVN0YXRlLmN1cnJlbnRJbnRlcmFjdGlvbiAhPT0gdW5kZWZpbmVkICk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzZXRNYWluSW50ZXJhY3Rpb24oKXtcclxuICAgIGd1aVN0YXRlLmN1cnJlbnRJbnRlcmFjdGlvbiA9IGludGVyYWN0aW9uO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gY2xlYXJNYWluSW50ZXJhY3Rpb24oKXtcclxuICAgIGd1aVN0YXRlLmN1cnJlbnRJbnRlcmFjdGlvbiA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIGNvbnN0IHRWZWN0b3IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xyXG5cclxuICBmdW5jdGlvbiB1cGRhdGUoIGlucHV0T2JqZWN0cyApe1xyXG4gICAgc3RhdGUubGFzdEhvdmVyID0gc3RhdGUuaG92ZXI7XHJcblxyXG4gICAgc3RhdGUuaG92ZXIgPSBmYWxzZTtcclxuXHJcbiAgICBpbnB1dE9iamVjdHMuZm9yRWFjaCggZnVuY3Rpb24oIGlucHV0ICl7XHJcbiAgICAgIGxldCBoaXRQb2ludDtcclxuICAgICAgbGV0IGhpdE9iamVjdDtcclxuXHJcbiAgICAgIGlmKCBpbnB1dC5pbnRlcnNlY3Rpb25zLmxlbmd0aCA8PSAwICl7XHJcbiAgICAgICAgc3RhdGUuaG92ZXIgPSBmYWxzZTtcclxuICAgICAgICBoaXRQb2ludCA9IHRWZWN0b3Iuc2V0RnJvbU1hdHJpeFBvc2l0aW9uKCBpbnB1dC5jdXJzb3IubWF0cml4V29ybGQgKS5jbG9uZSgpO1xyXG4gICAgICAgIGhpdE9iamVjdCA9IGlucHV0LmN1cnNvcjtcclxuICAgICAgfVxyXG4gICAgICBlbHNle1xyXG4gICAgICAgIGhpdFBvaW50ID0gaW5wdXQuaW50ZXJzZWN0aW9uc1sgMCBdLnBvaW50O1xyXG4gICAgICAgIGhpdE9iamVjdCA9IGlucHV0LmludGVyc2VjdGlvbnNbIDAgXS5vYmplY3Q7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmKCBoYXNNYWluSW50ZXJhY3Rpb24oKSA9PT0gZmFsc2UgJiYgaGl0Vm9sdW1lID09PSBoaXRPYmplY3QgKXtcclxuICAgICAgICBzdGF0ZS5ob3ZlciA9IHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCB1c2VkID0gcGVyZm9ybVN0YXRlRXZlbnRzKCBpbnB1dCwgaGl0T2JqZWN0LCBoaXRQb2ludCwgJ3ByZXNzZWQnLCAnb25QcmVzc2VkJywgJ3ByZXNzaW5nJywgJ29uUmVsZWFzZWQnICk7XHJcbiAgICAgIHVzZWQgPSB1c2VkIHx8IHBlcmZvcm1TdGF0ZUV2ZW50cyggaW5wdXQsIGhpdE9iamVjdCwgaGl0UG9pbnQsICdncmlwcGVkJywgJ29uR3JpcHBlZCcsICdncmlwcGluZycsICdvblJlbGVhc2VHcmlwJyApO1xyXG5cclxuICAgICAgaWYoIHVzZWQgPT09IGZhbHNlICYmIGlzTWFpbkludGVyYWN0aW9uKCkgKXtcclxuICAgICAgICBjbGVhck1haW5JbnRlcmFjdGlvbigpO1xyXG4gICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcGVyZm9ybVN0YXRlRXZlbnRzKCBpbnB1dCwgaGl0T2JqZWN0LCBoaXRQb2ludCwgc3RhdGVUb0NoZWNrLCBjbGlja05hbWUsIGhvbGROYW1lLCByZWxlYXNlTmFtZSApe1xyXG4gICAgaWYoIGlucHV0WyBzdGF0ZVRvQ2hlY2sgXSAmJiBzdGF0ZS5ob3ZlciAmJiBoYXNNYWluSW50ZXJhY3Rpb24oKSA9PT0gZmFsc2UgKXtcclxuICAgICAgaWYoIHN0YXRlWyBzdGF0ZVRvQ2hlY2sgXSA9PT0gZmFsc2UgKXtcclxuICAgICAgICBzdGF0ZVsgc3RhdGVUb0NoZWNrIF0gPSB0cnVlO1xyXG4gICAgICAgIHNldE1haW5JbnRlcmFjdGlvbigpO1xyXG5cclxuICAgICAgICBldmVudHMuZW1pdCggY2xpY2tOYW1lLCB7XHJcbiAgICAgICAgICBoaXRPYmplY3QsXHJcbiAgICAgICAgICBpbnB1dE9iamVjdDogaW5wdXQub2JqZWN0LFxyXG4gICAgICAgICAgcG9pbnQ6IGhpdFBvaW50LFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmKCBpbnB1dFsgc3RhdGVUb0NoZWNrIF0gPT09IGZhbHNlICYmIGlzTWFpbkludGVyYWN0aW9uKCkgKXtcclxuICAgICAgc3RhdGVbIHN0YXRlVG9DaGVjayBdID0gZmFsc2U7XHJcbiAgICAgIGV2ZW50cy5lbWl0KCByZWxlYXNlTmFtZSwge1xyXG4gICAgICAgIGhpdE9iamVjdCxcclxuICAgICAgICBpbnB1dE9iamVjdDogaW5wdXQub2JqZWN0LFxyXG4gICAgICAgIHBvaW50OiBoaXRQb2ludCxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoIHN0YXRlWyBzdGF0ZVRvQ2hlY2sgXSApe1xyXG4gICAgICBldmVudHMuZW1pdCggaG9sZE5hbWUsIHtcclxuICAgICAgICBoaXRPYmplY3QsXHJcbiAgICAgICAgaW5wdXRPYmplY3Q6IGlucHV0Lm9iamVjdCxcclxuICAgICAgICBwb2ludDogaGl0UG9pbnQsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgZ3VpU3RhdGUuZXZlbnRzLmVtaXQoICdvbkNvbnRyb2xsZXJIZWxkJywgaW5wdXQgKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc3RhdGVbIHN0YXRlVG9DaGVjayBdO1xyXG5cclxuICB9XHJcblxyXG4gIGNvbnN0IGludGVyYWN0aW9uID0ge1xyXG4gICAgaG92ZXJpbmc6ICgpPT5zdGF0ZS5ob3ZlcixcclxuICAgIHByZXNzaW5nOiAoKT0+c3RhdGUucHJlc3NlZCxcclxuICAgIHVwZGF0ZSxcclxuICAgIGV2ZW50c1xyXG4gIH07XHJcblxyXG4gIHJldHVybiBpbnRlcmFjdGlvbjtcclxufSIsImltcG9ydCAqIGFzIFNoYXJlZE1hdGVyaWFscyBmcm9tICcuL3NoYXJlZG1hdGVyaWFscyc7XHJcbmltcG9ydCAqIGFzIENvbG9ycyBmcm9tICcuL2NvbG9ycyc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWxpZ25MZWZ0KCBvYmogKXtcclxuICBpZiggb2JqIGluc3RhbmNlb2YgVEhSRUUuTWVzaCApe1xyXG4gICAgb2JqLmdlb21ldHJ5LmNvbXB1dGVCb3VuZGluZ0JveCgpO1xyXG4gICAgY29uc3Qgd2lkdGggPSBvYmouZ2VvbWV0cnkuYm91bmRpbmdCb3gubWF4LnggLSBvYmouZ2VvbWV0cnkuYm91bmRpbmdCb3gubWF4Lnk7XHJcbiAgICBvYmouZ2VvbWV0cnkudHJhbnNsYXRlKCB3aWR0aCwgMCwgMCApO1xyXG4gICAgcmV0dXJuIG9iajtcclxuICB9XHJcbiAgZWxzZSBpZiggb2JqIGluc3RhbmNlb2YgVEhSRUUuR2VvbWV0cnkgKXtcclxuICAgIG9iai5jb21wdXRlQm91bmRpbmdCb3goKTtcclxuICAgIGNvbnN0IHdpZHRoID0gb2JqLmJvdW5kaW5nQm94Lm1heC54IC0gb2JqLmJvdW5kaW5nQm94Lm1heC55O1xyXG4gICAgb2JqLnRyYW5zbGF0ZSggd2lkdGgsIDAsIDAgKTtcclxuICAgIHJldHVybiBvYmo7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUGFuZWwoIHdpZHRoLCBoZWlnaHQsIGRlcHRoICl7XHJcbiAgY29uc3QgcGFuZWwgPSBuZXcgVEhSRUUuTWVzaCggbmV3IFRIUkVFLkJveEdlb21ldHJ5KCB3aWR0aCwgaGVpZ2h0LCBkZXB0aCApLCBTaGFyZWRNYXRlcmlhbHMuUEFORUwgKTtcclxuICBwYW5lbC5nZW9tZXRyeS50cmFuc2xhdGUoIHdpZHRoICogMC41LCAwLCAwICk7XHJcbiAgQ29sb3JzLmNvbG9yaXplR2VvbWV0cnkoIHBhbmVsLmdlb21ldHJ5LCBDb2xvcnMuREVGQVVMVF9CQUNLICk7XHJcbiAgcmV0dXJuIHBhbmVsO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcklEQm94KCBoZWlnaHQsIGNvbG9yICl7XHJcbiAgY29uc3QgcGFuZWwgPSBuZXcgVEhSRUUuTWVzaCggbmV3IFRIUkVFLkJveEdlb21ldHJ5KCBDT05UUk9MTEVSX0lEX1dJRFRILCBoZWlnaHQsIENPTlRST0xMRVJfSURfREVQVEggKSwgU2hhcmVkTWF0ZXJpYWxzLlBBTkVMICk7XHJcbiAgcGFuZWwuZ2VvbWV0cnkudHJhbnNsYXRlKCBDT05UUk9MTEVSX0lEX1dJRFRIICogMC41LCAwLCAwICk7XHJcbiAgQ29sb3JzLmNvbG9yaXplR2VvbWV0cnkoIHBhbmVsLmdlb21ldHJ5LCBjb2xvciApO1xyXG4gIHJldHVybiBwYW5lbDtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFBBTkVMX1dJRFRIID0gMS4wO1xyXG5leHBvcnQgY29uc3QgUEFORUxfSEVJR0hUID0gMC4wNztcclxuZXhwb3J0IGNvbnN0IFBBTkVMX0RFUFRIID0gMC4wMTtcclxuZXhwb3J0IGNvbnN0IFBBTkVMX1NQQUNJTkcgPSAwLjAwMjtcclxuZXhwb3J0IGNvbnN0IFBBTkVMX01BUkdJTiA9IDAuMDA1O1xyXG5leHBvcnQgY29uc3QgUEFORUxfTEFCRUxfVEVYVF9NQVJHSU4gPSAwLjA2O1xyXG5leHBvcnQgY29uc3QgUEFORUxfVkFMVUVfVEVYVF9NQVJHSU4gPSAwLjAyO1xyXG5leHBvcnQgY29uc3QgQ09OVFJPTExFUl9JRF9XSURUSCA9IDAuMDI7XHJcbmV4cG9ydCBjb25zdCBDT05UUk9MTEVSX0lEX0RFUFRIID0gMC4wMDU7IiwiaW1wb3J0IFNERlNoYWRlciBmcm9tICd0aHJlZS1ibWZvbnQtdGV4dC9zaGFkZXJzL3NkZic7XHJcbmltcG9ydCBjcmVhdGVHZW9tZXRyeSBmcm9tICd0aHJlZS1ibWZvbnQtdGV4dCc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTWF0ZXJpYWwoIGNvbG9yICl7XHJcblxyXG4gIGNvbnN0IGxvYWRlciA9IG5ldyBUSFJFRS5UZXh0dXJlTG9hZGVyKCk7XHJcbiAgbG9hZGVyLmxvYWQoICdmb250cy9sdWNpZGFzYW5zdW5pY29kZS5wbmcnLCBmdW5jdGlvbiggdGV4dHVyZSApe1xyXG4gICAgdGV4dHVyZS5uZWVkc1VwZGF0ZSA9IHRydWU7XHJcbiAgICB0ZXh0dXJlLm1pbkZpbHRlciA9IFRIUkVFLkxpbmVhck1pcE1hcExpbmVhckZpbHRlcjtcclxuICAgIHRleHR1cmUubWFnRmlsdGVyID0gVEhSRUUuTGluZWFyRmlsdGVyO1xyXG4gICAgdGV4dHVyZS5nZW5lcmF0ZU1pcG1hcHMgPSB0cnVlO1xyXG4gICAgbWF0ZXJpYWwudW5pZm9ybXMubWFwLnZhbHVlID0gdGV4dHVyZTtcclxuXHJcbiAgICAvLyAgVE9ET1xyXG4gICAgLy8gIGFkZCBhbmlzb1xyXG5cclxuICB9ICk7XHJcblxyXG4gIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLlJhd1NoYWRlck1hdGVyaWFsKFNERlNoYWRlcih7XHJcbiAgICBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlLFxyXG4gICAgdHJhbnNwYXJlbnQ6IHRydWUsXHJcbiAgICBjb2xvcjogY29sb3JcclxuICB9KSk7XHJcblxyXG4gIHJldHVybiBtYXRlcmlhbDtcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdG9yKCBtYXRlcmlhbCwgZXZlbnRzICl7XHJcblxyXG4gIGxldCBmb250O1xyXG5cclxuICBldmVudHMub24oICdmb250TG9hZGVkJywgZnVuY3Rpb24oIGZvbnQgKXtcclxuICAgIGZvbnQgPSBmb250O1xyXG4gIH0pO1xyXG5cclxuICBjb25zdCBjb2xvck1hdGVyaWFscyA9IHt9O1xyXG5cclxuICBmdW5jdGlvbiBjcmVhdGVUZXh0KCBzdHIsIGZvbnQsIGNvbG9yID0gMHhmZmZmZmYgKXtcclxuXHJcbiAgICBjb25zdCBnZW9tZXRyeSA9IGNyZWF0ZUdlb21ldHJ5KHtcclxuICAgICAgdGV4dDogc3RyLFxyXG4gICAgICBhbGlnbjogJ2xlZnQnLFxyXG4gICAgICB3aWR0aDogMTAwMCxcclxuICAgICAgZmxpcFk6IHRydWUsXHJcbiAgICAgIGZvbnRcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICBjb25zdCBsYXlvdXQgPSBnZW9tZXRyeS5sYXlvdXQ7XHJcblxyXG4gICAgbGV0IG1hdGVyaWFsID0gY29sb3JNYXRlcmlhbHNbIGNvbG9yIF07XHJcbiAgICBpZiggbWF0ZXJpYWwgPT09IHVuZGVmaW5lZCApe1xyXG4gICAgICBtYXRlcmlhbCA9IGNvbG9yTWF0ZXJpYWxzWyBjb2xvciBdID0gY3JlYXRlTWF0ZXJpYWwoIGNvbG9yICk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBtZXNoID0gbmV3IFRIUkVFLk1lc2goIGdlb21ldHJ5LCBtYXRlcmlhbCApO1xyXG4gICAgbWVzaC5zY2FsZS5tdWx0aXBseSggbmV3IFRIUkVFLlZlY3RvcjMoMSwtMSwxKSApO1xyXG4gICAgbWVzaC5zY2FsZS5tdWx0aXBseVNjYWxhciggMC4wMDEgKTtcclxuXHJcbiAgICBtZXNoLnBvc2l0aW9uLnkgPSBsYXlvdXQuaGVpZ2h0ICogMC41ICogMC4wMDE7XHJcblxyXG4gICAgcmV0dXJuIG1lc2g7XHJcbiAgfVxyXG5cclxuXHJcbiAgZnVuY3Rpb24gY3JlYXRlKCBzdHIsIHsgY29sb3I9MHhmZmZmZmYgfSA9IHt9ICl7XHJcbiAgICBjb25zdCBncm91cCA9IG5ldyBUSFJFRS5Hcm91cCgpO1xyXG4gICAgbGV0IGxhdGVUZXh0ID0gc3RyO1xyXG5cclxuICAgIGxldCBtZXNoO1xyXG5cclxuICAgIGlmKCBmb250ICl7XHJcbiAgICAgIG1lc2ggPSBjcmVhdGVUZXh0KCBsYXRlVGV4dCwgZm9udCwgY29sb3IgKTtcclxuICAgICAgZ3JvdXAuYWRkKCBtZXNoICk7XHJcbiAgICAgIGdyb3VwLmxheW91dCA9IG1lc2guZ2VvbWV0cnkubGF5b3V0O1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgZnVuY3Rpb24gZm9udExvYWRlZENCKCBmb250ICl7XHJcbiAgICAgICAgbWVzaCA9IGNyZWF0ZVRleHQoIGxhdGVUZXh0LCBmb250LCBjb2xvciApO1xyXG4gICAgICAgIGdyb3VwLmFkZCggbWVzaCApO1xyXG4gICAgICAgIGdyb3VwLmxheW91dCA9IG1lc2guZ2VvbWV0cnkubGF5b3V0O1xyXG4gICAgICAgIGV2ZW50cy5yZW1vdmVMaXN0ZW5lciggJ2ZvbnRMb2FkZWQnLCBmb250TG9hZGVkQ0IgKTtcclxuICAgICAgfTtcclxuICAgICAgZXZlbnRzLm9uKCAnZm9udExvYWRlZCcsIGZvbnRMb2FkZWRDQiApO1xyXG4gICAgfVxyXG5cclxuICAgIGdyb3VwLnVwZGF0ZSA9IGZ1bmN0aW9uKCBzdHIgKXtcclxuICAgICAgaWYoIG1lc2ggKXtcclxuICAgICAgICBtZXNoLmdlb21ldHJ5LnVwZGF0ZSggc3RyICk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZXtcclxuICAgICAgICBsYXRlVGV4dCA9IHN0cjtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gZ3JvdXA7XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgY3JlYXRlLFxyXG4gICAgZ2V0TWF0ZXJpYWw6ICgpPT4gbWF0ZXJpYWxcclxuICB9XHJcblxyXG59IiwiaW1wb3J0ICogYXMgQ29sb3JzIGZyb20gJy4vY29sb3JzJztcclxuXHJcbmV4cG9ydCBjb25zdCBQQU5FTCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCggeyBjb2xvcjogMHhmZmZmZmYsIHZlcnRleENvbG9yczogVEhSRUUuVmVydGV4Q29sb3JzIH0gKTtcclxuZXhwb3J0IGNvbnN0IExPQ0FUT1IgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoKTtcclxuZXhwb3J0IGNvbnN0IEZPTERFUiA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCggeyBjb2xvcjogMHgwMDAwMDAgfSApOyIsImltcG9ydCBjcmVhdGVUZXh0TGFiZWwgZnJvbSAnLi90ZXh0bGFiZWwnO1xyXG5pbXBvcnQgY3JlYXRlSW50ZXJhY3Rpb24gZnJvbSAnLi9pbnRlcmFjdGlvbic7XHJcbmltcG9ydCAqIGFzIENvbG9ycyBmcm9tICcuL2NvbG9ycyc7XHJcbmltcG9ydCAqIGFzIExheW91dCBmcm9tICcuL2xheW91dCc7XHJcbmltcG9ydCAqIGFzIFNoYXJlZE1hdGVyaWFscyBmcm9tICcuL3NoYXJlZG1hdGVyaWFscyc7XHJcbmltcG9ydCAqIGFzIEdyYWIgZnJvbSAnLi9ncmFiJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVNsaWRlcigge1xyXG4gIGd1aVN0YXRlLFxyXG4gIHRleHRDcmVhdG9yLFxyXG4gIG9iamVjdCxcclxuICBwcm9wZXJ0eU5hbWUgPSAndW5kZWZpbmVkJyxcclxuICBpbml0aWFsVmFsdWUgPSAwLjAsXHJcbiAgbWluLCBtYXgsXHJcbiAgd2lkdGggPSBMYXlvdXQuUEFORUxfV0lEVEgsXHJcbiAgaGVpZ2h0ID0gTGF5b3V0LlBBTkVMX0hFSUdIVCxcclxuICBkZXB0aCA9IExheW91dC5QQU5FTF9ERVBUSFxyXG59ID0ge30gKXtcclxuXHJcblxyXG4gIGNvbnN0IFNMSURFUl9XSURUSCA9IHdpZHRoICogMC41IC0gTGF5b3V0LlBBTkVMX01BUkdJTjtcclxuICBjb25zdCBTTElERVJfSEVJR0hUID0gaGVpZ2h0IC0gTGF5b3V0LlBBTkVMX01BUkdJTjtcclxuICBjb25zdCBTTElERVJfREVQVEggPSBkZXB0aDtcclxuXHJcbiAgY29uc3Qgc3RhdGUgPSB7XHJcbiAgICBhbHBoYTogMS4wLFxyXG4gICAgdmFsdWU6IGluaXRpYWxWYWx1ZSxcclxuICAgIHN0ZXA6IDNcclxuICB9O1xyXG5cclxuICBzdGF0ZS52YWx1ZSA9IHN0YXRlLnZhbHVlLnRvRml4ZWQoIHN0YXRlLnN0ZXAtMSApO1xyXG4gIHN0YXRlLmFscGhhID0gbWFwX3JhbmdlKCBpbml0aWFsVmFsdWUsIG1pbiwgbWF4LCAwLjAsIDEuMCApO1xyXG5cclxuXHJcbiAgY29uc3QgZ3JvdXAgPSBuZXcgVEhSRUUuR3JvdXAoKTtcclxuXHJcbiAgLy8gIGZpbGxlZCB2b2x1bWVcclxuICBjb25zdCByZWN0ID0gbmV3IFRIUkVFLkJveEdlb21ldHJ5KCBTTElERVJfV0lEVEgsIFNMSURFUl9IRUlHSFQsIFNMSURFUl9ERVBUSCApO1xyXG4gIHJlY3QudHJhbnNsYXRlKFNMSURFUl9XSURUSCowLjUsMCwwKTtcclxuICAvLyBMYXlvdXQuYWxpZ25MZWZ0KCByZWN0ICk7XHJcblxyXG5cclxuICBjb25zdCBoaXRzY2FuTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoKTtcclxuICBoaXRzY2FuTWF0ZXJpYWwudmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAvLyAgb3V0bGluZSB2b2x1bWVcclxuICBjb25zdCBoaXRzY2FuVm9sdW1lID0gbmV3IFRIUkVFLk1lc2goIHJlY3QuY2xvbmUoKSwgaGl0c2Nhbk1hdGVyaWFsICk7XHJcbiAgaGl0c2NhblZvbHVtZS5wb3NpdGlvbi56ID0gZGVwdGg7XHJcbiAgaGl0c2NhblZvbHVtZS5wb3NpdGlvbi54ID0gd2lkdGggKiAwLjU7XHJcblxyXG4gIGNvbnN0IG91dGxpbmUgPSBuZXcgVEhSRUUuQm94SGVscGVyKCBoaXRzY2FuVm9sdW1lICk7XHJcbiAgb3V0bGluZS5tYXRlcmlhbC5jb2xvci5zZXRIZXgoIENvbG9ycy5PVVRMSU5FX0NPTE9SICk7XHJcblxyXG4gIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKHsgY29sb3I6IENvbG9ycy5ERUZBVUxUX0NPTE9SLCBlbWlzc2l2ZTogQ29sb3JzLkVNSVNTSVZFX0NPTE9SIH0pO1xyXG4gIGNvbnN0IGZpbGxlZFZvbHVtZSA9IG5ldyBUSFJFRS5NZXNoKCByZWN0LmNsb25lKCksIG1hdGVyaWFsICk7XHJcbiAgaGl0c2NhblZvbHVtZS5hZGQoIGZpbGxlZFZvbHVtZSApO1xyXG5cclxuICBjb25zdCBlbmRMb2NhdG9yID0gbmV3IFRIUkVFLk1lc2goIG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSggMC4wNSwgMC4wNSwgMC4wNSwgMSwgMSwgMSApLCBTaGFyZWRNYXRlcmlhbHMuTE9DQVRPUiApO1xyXG4gIGVuZExvY2F0b3IucG9zaXRpb24ueCA9IFNMSURFUl9XSURUSDtcclxuICBoaXRzY2FuVm9sdW1lLmFkZCggZW5kTG9jYXRvciApO1xyXG4gIGVuZExvY2F0b3IudmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICBjb25zdCB2YWx1ZUxhYmVsID0gdGV4dENyZWF0b3IuY3JlYXRlKCBzdGF0ZS52YWx1ZS50b1N0cmluZygpICk7XHJcbiAgdmFsdWVMYWJlbC5wb3NpdGlvbi54ID0gTGF5b3V0LlBBTkVMX1ZBTFVFX1RFWFRfTUFSR0lOICsgd2lkdGggKiAwLjU7XHJcbiAgdmFsdWVMYWJlbC5wb3NpdGlvbi56ID0gZGVwdGgqMjtcclxuICB2YWx1ZUxhYmVsLnBvc2l0aW9uLnkgPSAtMC4wMztcclxuICB1cGRhdGVWYWx1ZUxhYmVsKCBzdGF0ZS52YWx1ZSApO1xyXG5cclxuXHJcblxyXG4gIGNvbnN0IGRlc2NyaXB0b3JMYWJlbCA9IHRleHRDcmVhdG9yLmNyZWF0ZSggcHJvcGVydHlOYW1lICk7XHJcbiAgZGVzY3JpcHRvckxhYmVsLnBvc2l0aW9uLnggPSBMYXlvdXQuUEFORUxfTEFCRUxfVEVYVF9NQVJHSU47XHJcbiAgZGVzY3JpcHRvckxhYmVsLnBvc2l0aW9uLnogPSBkZXB0aDtcclxuICBkZXNjcmlwdG9yTGFiZWwucG9zaXRpb24ueSA9IC0wLjAzO1xyXG5cclxuICBjb25zdCBjb250cm9sbGVySUQgPSBMYXlvdXQuY3JlYXRlQ29udHJvbGxlcklEQm94KCBoZWlnaHQsIENvbG9ycy5DT05UUk9MTEVSX0lEX1NMSURFUiApO1xyXG4gIGNvbnRyb2xsZXJJRC5wb3NpdGlvbi56ID0gZGVwdGg7XHJcblxyXG4gIGNvbnN0IHBhbmVsID0gTGF5b3V0LmNyZWF0ZVBhbmVsKCB3aWR0aCwgaGVpZ2h0LCBkZXB0aCApO1xyXG4gIHBhbmVsLmFkZCggZGVzY3JpcHRvckxhYmVsLCBoaXRzY2FuVm9sdW1lLCBvdXRsaW5lLCB2YWx1ZUxhYmVsLCBjb250cm9sbGVySUQgKTtcclxuXHJcbiAgZ3JvdXAuYWRkKCBwYW5lbCApXHJcblxyXG5cclxuICBmaWxsZWRWb2x1bWUuc2NhbGUueCA9IDAuNTsvL3N0YXRlLmFscGhhICogd2lkdGg7XHJcblxyXG4gIGNvbnN0IGludGVyYWN0aW9uID0gY3JlYXRlSW50ZXJhY3Rpb24oIGd1aVN0YXRlLCBoaXRzY2FuVm9sdW1lICk7XHJcbiAgaW50ZXJhY3Rpb24uZXZlbnRzLm9uKCAncHJlc3NpbmcnLCBoYW5kbGVQcmVzcyApO1xyXG5cclxuICBmdW5jdGlvbiBoYW5kbGVQcmVzcyggeyBwb2ludCB9ID0ge30gKXtcclxuICAgIGlmKCBncm91cC52aXNpYmxlID09PSBmYWxzZSApe1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZmlsbGVkVm9sdW1lLnVwZGF0ZU1hdHJpeFdvcmxkKCk7XHJcbiAgICBlbmRMb2NhdG9yLnVwZGF0ZU1hdHJpeFdvcmxkKCk7XHJcblxyXG4gICAgY29uc3QgYSA9IG5ldyBUSFJFRS5WZWN0b3IzKCkuc2V0RnJvbU1hdHJpeFBvc2l0aW9uKCBmaWxsZWRWb2x1bWUubWF0cml4V29ybGQgKTtcclxuICAgIGNvbnN0IGIgPSBuZXcgVEhSRUUuVmVjdG9yMygpLnNldEZyb21NYXRyaXhQb3NpdGlvbiggZW5kTG9jYXRvci5tYXRyaXhXb3JsZCApO1xyXG5cclxuICAgIGNvbnN0IHBvaW50QWxwaGEgPSBnZXRQb2ludEFscGhhKCBwb2ludCwge2EsYn0gKTtcclxuICAgIHN0YXRlLmFscGhhID0gcG9pbnRBbHBoYTtcclxuXHJcbiAgICBmaWxsZWRWb2x1bWUuc2NhbGUueCA9IE1hdGgubWF4KCBzdGF0ZS5hbHBoYSAqIHdpZHRoLCAwLjAwMDAwMSApO1xyXG5cclxuICAgIHN0YXRlLnZhbHVlID0gbWFwX3JhbmdlKCBzdGF0ZS5hbHBoYSwgMC4wLCAxLjAsIG1pbiwgbWF4ICk7XHJcbiAgICBpZiggc3RhdGUudmFsdWUgPCBtaW4gKXtcclxuICAgICAgc3RhdGUudmFsdWUgPSBtaW47XHJcbiAgICB9XHJcbiAgICBpZiggc3RhdGUudmFsdWUgPiBtYXggKXtcclxuICAgICAgc3RhdGUudmFsdWUgPSBtYXg7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGUudmFsdWUgPSBwYXJzZUZsb2F0KCBzdGF0ZS52YWx1ZS50b0ZpeGVkKCBzdGF0ZS5zdGVwLTEgKSApO1xyXG5cclxuICAgIG9iamVjdFsgcHJvcGVydHlOYW1lIF0gPSBzdGF0ZS52YWx1ZTtcclxuXHJcbiAgICB1cGRhdGVWYWx1ZUxhYmVsKCBzdGF0ZS52YWx1ZSApO1xyXG5cclxuICAgIGlmKCBvbkNoYW5nZWRDQiApe1xyXG4gICAgICBvbkNoYW5nZWRDQiggc3RhdGUudmFsdWUgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHVwZGF0ZVZhbHVlTGFiZWwoIHZhbHVlICl7XHJcbiAgICB2YWx1ZUxhYmVsLnVwZGF0ZSggcGFyc2VGbG9hdCggdmFsdWUgKS50b1N0cmluZygpICk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiB1cGRhdGVWaWV3KCl7XHJcbiAgICBpZiggaW50ZXJhY3Rpb24ucHJlc3NpbmcoKSApe1xyXG4gICAgICBtYXRlcmlhbC5jb2xvci5zZXRIZXgoIENvbG9ycy5JTlRFUkFDVElPTl9DT0xPUiApO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAgaWYoIGludGVyYWN0aW9uLmhvdmVyaW5nKCkgKXtcclxuICAgICAgbWF0ZXJpYWwuY29sb3Iuc2V0SGV4KCBDb2xvcnMuSElHSExJR0hUX0NPTE9SICk7XHJcbiAgICAgIG1hdGVyaWFsLmVtaXNzaXZlLnNldEhleCggQ29sb3JzLkhJR0hMSUdIVF9FTUlTU0lWRV9DT0xPUiApO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgbWF0ZXJpYWwuY29sb3Iuc2V0SGV4KCBDb2xvcnMuREVGQVVMVF9DT0xPUiApO1xyXG4gICAgICBtYXRlcmlhbC5lbWlzc2l2ZS5zZXRIZXgoIENvbG9ycy5FTUlTU0lWRV9DT0xPUiApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbGV0IG9uQ2hhbmdlZENCO1xyXG4gIGxldCBvbkZpbmlzaENoYW5nZUNCO1xyXG5cclxuICBncm91cC5vbkNoYW5nZSA9IGZ1bmN0aW9uKCBjYWxsYmFjayApe1xyXG4gICAgb25DaGFuZ2VkQ0IgPSBjYWxsYmFjaztcclxuICAgIHJldHVybiBncm91cDtcclxuICB9O1xyXG5cclxuICBncm91cC5zdGVwID0gZnVuY3Rpb24oIHN0ZXBDb3VudCApe1xyXG4gICAgc3RhdGUuc3RlcCA9IHN0ZXBDb3VudDtcclxuICAgIHJldHVybiBncm91cDtcclxuICB9O1xyXG5cclxuICBncm91cC5pbnRlcmFjdGlvbiA9IGludGVyYWN0aW9uO1xyXG4gIGdyb3VwLmhpdHNjYW4gPSBbIGhpdHNjYW5Wb2x1bWUsIHBhbmVsIF07XHJcblxyXG5cclxuICBjb25zdCBncmFiSW50ZXJhY3Rpb24gPSBHcmFiLmNyZWF0ZSggeyBncm91cCwgcGFuZWwsIGd1aVN0YXRlIH0gKTtcclxuXHJcbiAgZ3JvdXAudXBkYXRlID0gZnVuY3Rpb24oIGlucHV0T2JqZWN0cyApe1xyXG4gICAgaW50ZXJhY3Rpb24udXBkYXRlKCBpbnB1dE9iamVjdHMgKTtcclxuICAgIGdyYWJJbnRlcmFjdGlvbi51cGRhdGUoIGlucHV0T2JqZWN0cyApO1xyXG4gICAgdXBkYXRlVmlldygpO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiBncm91cDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0UG9pbnRBbHBoYSggcG9pbnQsIHNlZ21lbnQgKXtcclxuICBjb25zdCBhID0gbmV3IFRIUkVFLlZlY3RvcjMoKS5jb3B5KCBzZWdtZW50LmIgKS5zdWIoIHNlZ21lbnQuYSApO1xyXG4gIGNvbnN0IGIgPSBuZXcgVEhSRUUuVmVjdG9yMygpLmNvcHkoIHBvaW50ICkuc3ViKCBzZWdtZW50LmEgKTtcclxuICBjb25zdCBwcm9qZWN0ZWQgPSBiLnByb2plY3RPblZlY3RvciggYSApO1xyXG5cclxuICBjb25zdCBsZW5ndGggPSBzZWdtZW50LmEuZGlzdGFuY2VUbyggc2VnbWVudC5iICk7XHJcblxyXG4gIGxldCBhbHBoYSA9IHByb2plY3RlZC5sZW5ndGgoKSAvIGxlbmd0aDtcclxuICBpZiggYWxwaGEgPiAxLjAgKXtcclxuICAgIGFscGhhID0gMS4wO1xyXG4gIH1cclxuICBpZiggYWxwaGEgPCAwLjAgKXtcclxuICAgIGFscGhhID0gMC4wO1xyXG4gIH1cclxuICByZXR1cm4gYWxwaGE7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxlcnAobWluLCBtYXgsIHZhbHVlKSB7XHJcbiAgcmV0dXJuICgxLXZhbHVlKSptaW4gKyB2YWx1ZSptYXg7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1hcF9yYW5nZSh2YWx1ZSwgbG93MSwgaGlnaDEsIGxvdzIsIGhpZ2gyKSB7XHJcbiAgICByZXR1cm4gbG93MiArIChoaWdoMiAtIGxvdzIpICogKHZhbHVlIC0gbG93MSkgLyAoaGlnaDEgLSBsb3cxKTtcclxufSIsImltcG9ydCAqIGFzIENvbG9ycyBmcm9tICcuL2NvbG9ycyc7XHJcbmltcG9ydCAqIGFzIFNoYXJlZE1hdGVyaWFscyBmcm9tICcuL3NoYXJlZG1hdGVyaWFscyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVUZXh0TGFiZWwoIHRleHRDcmVhdG9yLCBzdHIsIHdpZHRoID0gMC40LCBkZXB0aCA9IDAuMDI5LCBmZ0NvbG9yID0gMHhmZmZmZmYsIGJnQ29sb3IgPSBDb2xvcnMuREVGQVVMVF9CQUNLICl7XHJcblxyXG4gIGNvbnN0IGdyb3VwID0gbmV3IFRIUkVFLkdyb3VwKCk7XHJcbiAgY29uc3QgaW50ZXJuYWxQb3NpdGlvbmluZyA9IG5ldyBUSFJFRS5Hcm91cCgpO1xyXG4gIGdyb3VwLmFkZCggaW50ZXJuYWxQb3NpdGlvbmluZyApO1xyXG5cclxuICBjb25zdCB0ZXh0ID0gdGV4dENyZWF0b3IuY3JlYXRlKCBzdHIsIHsgY29sb3I6IGZnQ29sb3IgfSApO1xyXG4gIGludGVybmFsUG9zaXRpb25pbmcuYWRkKCB0ZXh0ICk7XHJcblxyXG4gIGdyb3VwLnNldFN0cmluZyA9IGZ1bmN0aW9uKCBzdHIgKXtcclxuICAgIHRleHQudXBkYXRlKCBzdHIudG9TdHJpbmcoKSApO1xyXG4gIH07XHJcblxyXG4gIGdyb3VwLnNldE51bWJlciA9IGZ1bmN0aW9uKCBzdHIgKXtcclxuICAgIHRleHQudXBkYXRlKCBzdHIudG9GaXhlZCgyKSApO1xyXG4gIH07XHJcblxyXG4gIHRleHQucG9zaXRpb24ueiA9IDAuMDE1XHJcblxyXG4gIGNvbnN0IGJhY2tCb3VuZHMgPSAwLjAxO1xyXG4gIGNvbnN0IG1hcmdpbiA9IDAuMDE7XHJcbiAgY29uc3QgdG90YWxXaWR0aCA9IHdpZHRoO1xyXG4gIGNvbnN0IHRvdGFsSGVpZ2h0ID0gMC4wNCArIG1hcmdpbiAqIDI7XHJcbiAgY29uc3QgbGFiZWxCYWNrR2VvbWV0cnkgPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkoIHRvdGFsV2lkdGgsIHRvdGFsSGVpZ2h0LCBkZXB0aCwgMSwgMSwgMSApO1xyXG4gIGxhYmVsQmFja0dlb21ldHJ5LmFwcGx5TWF0cml4KCBuZXcgVEhSRUUuTWF0cml4NCgpLm1ha2VUcmFuc2xhdGlvbiggdG90YWxXaWR0aCAqIDAuNSAtIG1hcmdpbiwgMCwgMCApICk7XHJcblxyXG4gIGNvbnN0IGxhYmVsQmFja01lc2ggPSBuZXcgVEhSRUUuTWVzaCggbGFiZWxCYWNrR2VvbWV0cnksIFNoYXJlZE1hdGVyaWFscy5QQU5FTCApO1xyXG4gIENvbG9ycy5jb2xvcml6ZUdlb21ldHJ5KCBsYWJlbEJhY2tNZXNoLmdlb21ldHJ5LCBiZ0NvbG9yICk7XHJcblxyXG4gIGxhYmVsQmFja01lc2gucG9zaXRpb24ueSA9IDAuMDM7XHJcbiAgLy8gbGFiZWxCYWNrTWVzaC5wb3NpdGlvbi54ID0gd2lkdGggKiAwLjU7XHJcbiAgaW50ZXJuYWxQb3NpdGlvbmluZy5hZGQoIGxhYmVsQmFja01lc2ggKTtcclxuICBpbnRlcm5hbFBvc2l0aW9uaW5nLnBvc2l0aW9uLnkgPSAtdG90YWxIZWlnaHQgKiAwLjU7XHJcblxyXG4gIC8vIGxhYmVsR3JvdXAucG9zaXRpb24ueCA9IGxhYmVsQm91bmRzLndpZHRoICogMC41O1xyXG4gIC8vIGxhYmVsR3JvdXAucG9zaXRpb24ueSA9IGxhYmVsQm91bmRzLmhlaWdodCAqIDAuNTtcclxuXHJcbiAgZ3JvdXAuYmFjayA9IGxhYmVsQmFja01lc2g7XHJcblxyXG4gIHJldHVybiBncm91cDtcclxufSIsIi8qIVxuICogVGhlIGJ1ZmZlciBtb2R1bGUgZnJvbSBub2RlLmpzLCBmb3IgdGhlIGJyb3dzZXIuXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGZlcm9zc0BmZXJvc3Mub3JnPiA8aHR0cDovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG5cbid1c2Ugc3RyaWN0J1xuXG52YXIgYmFzZTY0ID0gcmVxdWlyZSgnYmFzZTY0LWpzJylcbnZhciBpZWVlNzU0ID0gcmVxdWlyZSgnaWVlZTc1NCcpXG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJ2lzYXJyYXknKVxuXG5leHBvcnRzLkJ1ZmZlciA9IEJ1ZmZlclxuZXhwb3J0cy5TbG93QnVmZmVyID0gU2xvd0J1ZmZlclxuZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFUyA9IDUwXG5cbi8qKlxuICogSWYgYEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUYDpcbiAqICAgPT09IHRydWUgICAgVXNlIFVpbnQ4QXJyYXkgaW1wbGVtZW50YXRpb24gKGZhc3Rlc3QpXG4gKiAgID09PSBmYWxzZSAgIFVzZSBPYmplY3QgaW1wbGVtZW50YXRpb24gKG1vc3QgY29tcGF0aWJsZSwgZXZlbiBJRTYpXG4gKlxuICogQnJvd3NlcnMgdGhhdCBzdXBwb3J0IHR5cGVkIGFycmF5cyBhcmUgSUUgMTArLCBGaXJlZm94IDQrLCBDaHJvbWUgNyssIFNhZmFyaSA1LjErLFxuICogT3BlcmEgMTEuNissIGlPUyA0LjIrLlxuICpcbiAqIER1ZSB0byB2YXJpb3VzIGJyb3dzZXIgYnVncywgc29tZXRpbWVzIHRoZSBPYmplY3QgaW1wbGVtZW50YXRpb24gd2lsbCBiZSB1c2VkIGV2ZW5cbiAqIHdoZW4gdGhlIGJyb3dzZXIgc3VwcG9ydHMgdHlwZWQgYXJyYXlzLlxuICpcbiAqIE5vdGU6XG4gKlxuICogICAtIEZpcmVmb3ggNC0yOSBsYWNrcyBzdXBwb3J0IGZvciBhZGRpbmcgbmV3IHByb3BlcnRpZXMgdG8gYFVpbnQ4QXJyYXlgIGluc3RhbmNlcyxcbiAqICAgICBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY5NTQzOC5cbiAqXG4gKiAgIC0gQ2hyb21lIDktMTAgaXMgbWlzc2luZyB0aGUgYFR5cGVkQXJyYXkucHJvdG90eXBlLnN1YmFycmF5YCBmdW5jdGlvbi5cbiAqXG4gKiAgIC0gSUUxMCBoYXMgYSBicm9rZW4gYFR5cGVkQXJyYXkucHJvdG90eXBlLnN1YmFycmF5YCBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGFycmF5cyBvZlxuICogICAgIGluY29ycmVjdCBsZW5ndGggaW4gc29tZSBzaXR1YXRpb25zLlxuXG4gKiBXZSBkZXRlY3QgdGhlc2UgYnVnZ3kgYnJvd3NlcnMgYW5kIHNldCBgQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlRgIHRvIGBmYWxzZWAgc28gdGhleVxuICogZ2V0IHRoZSBPYmplY3QgaW1wbGVtZW50YXRpb24sIHdoaWNoIGlzIHNsb3dlciBidXQgYmVoYXZlcyBjb3JyZWN0bHkuXG4gKi9cbkJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUID0gZ2xvYmFsLlRZUEVEX0FSUkFZX1NVUFBPUlQgIT09IHVuZGVmaW5lZFxuICA/IGdsb2JhbC5UWVBFRF9BUlJBWV9TVVBQT1JUXG4gIDogdHlwZWRBcnJheVN1cHBvcnQoKVxuXG4vKlxuICogRXhwb3J0IGtNYXhMZW5ndGggYWZ0ZXIgdHlwZWQgYXJyYXkgc3VwcG9ydCBpcyBkZXRlcm1pbmVkLlxuICovXG5leHBvcnRzLmtNYXhMZW5ndGggPSBrTWF4TGVuZ3RoKClcblxuZnVuY3Rpb24gdHlwZWRBcnJheVN1cHBvcnQgKCkge1xuICB0cnkge1xuICAgIHZhciBhcnIgPSBuZXcgVWludDhBcnJheSgxKVxuICAgIGFyci5fX3Byb3RvX18gPSB7X19wcm90b19fOiBVaW50OEFycmF5LnByb3RvdHlwZSwgZm9vOiBmdW5jdGlvbiAoKSB7IHJldHVybiA0MiB9fVxuICAgIHJldHVybiBhcnIuZm9vKCkgPT09IDQyICYmIC8vIHR5cGVkIGFycmF5IGluc3RhbmNlcyBjYW4gYmUgYXVnbWVudGVkXG4gICAgICAgIHR5cGVvZiBhcnIuc3ViYXJyYXkgPT09ICdmdW5jdGlvbicgJiYgLy8gY2hyb21lIDktMTAgbGFjayBgc3ViYXJyYXlgXG4gICAgICAgIGFyci5zdWJhcnJheSgxLCAxKS5ieXRlTGVuZ3RoID09PSAwIC8vIGllMTAgaGFzIGJyb2tlbiBgc3ViYXJyYXlgXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5mdW5jdGlvbiBrTWF4TGVuZ3RoICgpIHtcbiAgcmV0dXJuIEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUXG4gICAgPyAweDdmZmZmZmZmXG4gICAgOiAweDNmZmZmZmZmXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUJ1ZmZlciAodGhhdCwgbGVuZ3RoKSB7XG4gIGlmIChrTWF4TGVuZ3RoKCkgPCBsZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW52YWxpZCB0eXBlZCBhcnJheSBsZW5ndGgnKVxuICB9XG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIC8vIFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlLCBmb3IgYmVzdCBwZXJmb3JtYW5jZVxuICAgIHRoYXQgPSBuZXcgVWludDhBcnJheShsZW5ndGgpXG4gICAgdGhhdC5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIH0gZWxzZSB7XG4gICAgLy8gRmFsbGJhY2s6IFJldHVybiBhbiBvYmplY3QgaW5zdGFuY2Ugb2YgdGhlIEJ1ZmZlciBjbGFzc1xuICAgIGlmICh0aGF0ID09PSBudWxsKSB7XG4gICAgICB0aGF0ID0gbmV3IEJ1ZmZlcihsZW5ndGgpXG4gICAgfVxuICAgIHRoYXQubGVuZ3RoID0gbGVuZ3RoXG4gIH1cblxuICByZXR1cm4gdGhhdFxufVxuXG4vKipcbiAqIFRoZSBCdWZmZXIgY29uc3RydWN0b3IgcmV0dXJucyBpbnN0YW5jZXMgb2YgYFVpbnQ4QXJyYXlgIHRoYXQgaGF2ZSB0aGVpclxuICogcHJvdG90eXBlIGNoYW5nZWQgdG8gYEJ1ZmZlci5wcm90b3R5cGVgLiBGdXJ0aGVybW9yZSwgYEJ1ZmZlcmAgaXMgYSBzdWJjbGFzcyBvZlxuICogYFVpbnQ4QXJyYXlgLCBzbyB0aGUgcmV0dXJuZWQgaW5zdGFuY2VzIHdpbGwgaGF2ZSBhbGwgdGhlIG5vZGUgYEJ1ZmZlcmAgbWV0aG9kc1xuICogYW5kIHRoZSBgVWludDhBcnJheWAgbWV0aG9kcy4gU3F1YXJlIGJyYWNrZXQgbm90YXRpb24gd29ya3MgYXMgZXhwZWN0ZWQgLS0gaXRcbiAqIHJldHVybnMgYSBzaW5nbGUgb2N0ZXQuXG4gKlxuICogVGhlIGBVaW50OEFycmF5YCBwcm90b3R5cGUgcmVtYWlucyB1bm1vZGlmaWVkLlxuICovXG5cbmZ1bmN0aW9uIEJ1ZmZlciAoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCAmJiAhKHRoaXMgaW5zdGFuY2VvZiBCdWZmZXIpKSB7XG4gICAgcmV0dXJuIG5ldyBCdWZmZXIoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICAvLyBDb21tb24gY2FzZS5cbiAgaWYgKHR5cGVvZiBhcmcgPT09ICdudW1iZXInKSB7XG4gICAgaWYgKHR5cGVvZiBlbmNvZGluZ09yT2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnSWYgZW5jb2RpbmcgaXMgc3BlY2lmaWVkIHRoZW4gdGhlIGZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBzdHJpbmcnXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBhbGxvY1Vuc2FmZSh0aGlzLCBhcmcpXG4gIH1cbiAgcmV0dXJuIGZyb20odGhpcywgYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wb29sU2l6ZSA9IDgxOTIgLy8gbm90IHVzZWQgYnkgdGhpcyBpbXBsZW1lbnRhdGlvblxuXG4vLyBUT0RPOiBMZWdhY3ksIG5vdCBuZWVkZWQgYW55bW9yZS4gUmVtb3ZlIGluIG5leHQgbWFqb3IgdmVyc2lvbi5cbkJ1ZmZlci5fYXVnbWVudCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgYXJyLl9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiBmcm9tICh0aGF0LCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJ2YWx1ZVwiIGFyZ3VtZW50IG11c3Qgbm90IGJlIGEgbnVtYmVyJylcbiAgfVxuXG4gIGlmICh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICByZXR1cm4gZnJvbUFycmF5QnVmZmVyKHRoYXQsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBmcm9tU3RyaW5nKHRoYXQsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0KVxuICB9XG5cbiAgcmV0dXJuIGZyb21PYmplY3QodGhhdCwgdmFsdWUpXG59XG5cbi8qKlxuICogRnVuY3Rpb25hbGx5IGVxdWl2YWxlbnQgdG8gQnVmZmVyKGFyZywgZW5jb2RpbmcpIGJ1dCB0aHJvd3MgYSBUeXBlRXJyb3JcbiAqIGlmIHZhbHVlIGlzIGEgbnVtYmVyLlxuICogQnVmZmVyLmZyb20oc3RyWywgZW5jb2RpbmddKVxuICogQnVmZmVyLmZyb20oYXJyYXkpXG4gKiBCdWZmZXIuZnJvbShidWZmZXIpXG4gKiBCdWZmZXIuZnJvbShhcnJheUJ1ZmZlclssIGJ5dGVPZmZzZXRbLCBsZW5ndGhdXSlcbiAqKi9cbkJ1ZmZlci5mcm9tID0gZnVuY3Rpb24gKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGZyb20obnVsbCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbn1cblxuaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gIEJ1ZmZlci5wcm90b3R5cGUuX19wcm90b19fID0gVWludDhBcnJheS5wcm90b3R5cGVcbiAgQnVmZmVyLl9fcHJvdG9fXyA9IFVpbnQ4QXJyYXlcbiAgaWYgKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC5zcGVjaWVzICYmXG4gICAgICBCdWZmZXJbU3ltYm9sLnNwZWNpZXNdID09PSBCdWZmZXIpIHtcbiAgICAvLyBGaXggc3ViYXJyYXkoKSBpbiBFUzIwMTYuIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9idWZmZXIvcHVsbC85N1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdWZmZXIsIFN5bWJvbC5zcGVjaWVzLCB7XG4gICAgICB2YWx1ZTogbnVsbCxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pXG4gIH1cbn1cblxuZnVuY3Rpb24gYXNzZXJ0U2l6ZSAoc2l6ZSkge1xuICBpZiAodHlwZW9mIHNpemUgIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJzaXplXCIgYXJndW1lbnQgbXVzdCBiZSBhIG51bWJlcicpXG4gIH1cbn1cblxuZnVuY3Rpb24gYWxsb2MgKHRoYXQsIHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gIGFzc2VydFNpemUoc2l6ZSlcbiAgaWYgKHNpemUgPD0gMCkge1xuICAgIHJldHVybiBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSlcbiAgfVxuICBpZiAoZmlsbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT25seSBwYXkgYXR0ZW50aW9uIHRvIGVuY29kaW5nIGlmIGl0J3MgYSBzdHJpbmcuIFRoaXNcbiAgICAvLyBwcmV2ZW50cyBhY2NpZGVudGFsbHkgc2VuZGluZyBpbiBhIG51bWJlciB0aGF0IHdvdWxkXG4gICAgLy8gYmUgaW50ZXJwcmV0dGVkIGFzIGEgc3RhcnQgb2Zmc2V0LlxuICAgIHJldHVybiB0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnXG4gICAgICA/IGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKS5maWxsKGZpbGwsIGVuY29kaW5nKVxuICAgICAgOiBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSkuZmlsbChmaWxsKVxuICB9XG4gIHJldHVybiBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSlcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKiBhbGxvYyhzaXplWywgZmlsbFssIGVuY29kaW5nXV0pXG4gKiovXG5CdWZmZXIuYWxsb2MgPSBmdW5jdGlvbiAoc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGFsbG9jKG51bGwsIHNpemUsIGZpbGwsIGVuY29kaW5nKVxufVxuXG5mdW5jdGlvbiBhbGxvY1Vuc2FmZSAodGhhdCwgc2l6ZSkge1xuICBhc3NlcnRTaXplKHNpemUpXG4gIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSA8IDAgPyAwIDogY2hlY2tlZChzaXplKSB8IDApXG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7ICsraSkge1xuICAgICAgdGhhdFtpXSA9IDBcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoYXRcbn1cblxuLyoqXG4gKiBFcXVpdmFsZW50IHRvIEJ1ZmZlcihudW0pLCBieSBkZWZhdWx0IGNyZWF0ZXMgYSBub24temVyby1maWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICogKi9cbkJ1ZmZlci5hbGxvY1Vuc2FmZSA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIHJldHVybiBhbGxvY1Vuc2FmZShudWxsLCBzaXplKVxufVxuLyoqXG4gKiBFcXVpdmFsZW50IHRvIFNsb3dCdWZmZXIobnVtKSwgYnkgZGVmYXVsdCBjcmVhdGVzIGEgbm9uLXplcm8tZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqL1xuQnVmZmVyLmFsbG9jVW5zYWZlU2xvdyA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIHJldHVybiBhbGxvY1Vuc2FmZShudWxsLCBzaXplKVxufVxuXG5mdW5jdGlvbiBmcm9tU3RyaW5nICh0aGF0LCBzdHJpbmcsIGVuY29kaW5nKSB7XG4gIGlmICh0eXBlb2YgZW5jb2RpbmcgIT09ICdzdHJpbmcnIHx8IGVuY29kaW5nID09PSAnJykge1xuICAgIGVuY29kaW5nID0gJ3V0ZjgnXG4gIH1cblxuICBpZiAoIUJ1ZmZlci5pc0VuY29kaW5nKGVuY29kaW5nKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiZW5jb2RpbmdcIiBtdXN0IGJlIGEgdmFsaWQgc3RyaW5nIGVuY29kaW5nJylcbiAgfVxuXG4gIHZhciBsZW5ndGggPSBieXRlTGVuZ3RoKHN0cmluZywgZW5jb2RpbmcpIHwgMFxuICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIGxlbmd0aClcblxuICB2YXIgYWN0dWFsID0gdGhhdC53cml0ZShzdHJpbmcsIGVuY29kaW5nKVxuXG4gIGlmIChhY3R1YWwgIT09IGxlbmd0aCkge1xuICAgIC8vIFdyaXRpbmcgYSBoZXggc3RyaW5nLCBmb3IgZXhhbXBsZSwgdGhhdCBjb250YWlucyBpbnZhbGlkIGNoYXJhY3RlcnMgd2lsbFxuICAgIC8vIGNhdXNlIGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhlIGZpcnN0IGludmFsaWQgY2hhcmFjdGVyIHRvIGJlIGlnbm9yZWQuIChlLmcuXG4gICAgLy8gJ2FieHhjZCcgd2lsbCBiZSB0cmVhdGVkIGFzICdhYicpXG4gICAgdGhhdCA9IHRoYXQuc2xpY2UoMCwgYWN0dWFsKVxuICB9XG5cbiAgcmV0dXJuIHRoYXRcbn1cblxuZnVuY3Rpb24gZnJvbUFycmF5TGlrZSAodGhhdCwgYXJyYXkpIHtcbiAgdmFyIGxlbmd0aCA9IGNoZWNrZWQoYXJyYXkubGVuZ3RoKSB8IDBcbiAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBsZW5ndGgpXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICB0aGF0W2ldID0gYXJyYXlbaV0gJiAyNTVcbiAgfVxuICByZXR1cm4gdGhhdFxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlCdWZmZXIgKHRoYXQsIGFycmF5LCBieXRlT2Zmc2V0LCBsZW5ndGgpIHtcbiAgYXJyYXkuYnl0ZUxlbmd0aCAvLyB0aGlzIHRocm93cyBpZiBgYXJyYXlgIGlzIG5vdCBhIHZhbGlkIEFycmF5QnVmZmVyXG5cbiAgaWYgKGJ5dGVPZmZzZXQgPCAwIHx8IGFycmF5LmJ5dGVMZW5ndGggPCBieXRlT2Zmc2V0KSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1xcJ29mZnNldFxcJyBpcyBvdXQgb2YgYm91bmRzJylcbiAgfVxuXG4gIGlmIChhcnJheS5ieXRlTGVuZ3RoIDwgYnl0ZU9mZnNldCArIChsZW5ndGggfHwgMCkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXFwnbGVuZ3RoXFwnIGlzIG91dCBvZiBib3VuZHMnKVxuICB9XG5cbiAgaWYgKGJ5dGVPZmZzZXQgPT09IHVuZGVmaW5lZCAmJiBsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXkpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBhcnJheSA9IG5ldyBVaW50OEFycmF5KGFycmF5LCBieXRlT2Zmc2V0KVxuICB9IGVsc2Uge1xuICAgIGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXksIGJ5dGVPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIC8vIFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlLCBmb3IgYmVzdCBwZXJmb3JtYW5jZVxuICAgIHRoYXQgPSBhcnJheVxuICAgIHRoYXQuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICB9IGVsc2Uge1xuICAgIC8vIEZhbGxiYWNrOiBSZXR1cm4gYW4gb2JqZWN0IGluc3RhbmNlIG9mIHRoZSBCdWZmZXIgY2xhc3NcbiAgICB0aGF0ID0gZnJvbUFycmF5TGlrZSh0aGF0LCBhcnJheSlcbiAgfVxuICByZXR1cm4gdGhhdFxufVxuXG5mdW5jdGlvbiBmcm9tT2JqZWN0ICh0aGF0LCBvYmopIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihvYmopKSB7XG4gICAgdmFyIGxlbiA9IGNoZWNrZWQob2JqLmxlbmd0aCkgfCAwXG4gICAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBsZW4pXG5cbiAgICBpZiAodGhhdC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGF0XG4gICAgfVxuXG4gICAgb2JqLmNvcHkodGhhdCwgMCwgMCwgbGVuKVxuICAgIHJldHVybiB0aGF0XG4gIH1cblxuICBpZiAob2JqKSB7XG4gICAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIG9iai5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikgfHwgJ2xlbmd0aCcgaW4gb2JqKSB7XG4gICAgICBpZiAodHlwZW9mIG9iai5sZW5ndGggIT09ICdudW1iZXInIHx8IGlzbmFuKG9iai5sZW5ndGgpKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVCdWZmZXIodGhhdCwgMClcbiAgICAgIH1cbiAgICAgIHJldHVybiBmcm9tQXJyYXlMaWtlKHRoYXQsIG9iailcbiAgICB9XG5cbiAgICBpZiAob2JqLnR5cGUgPT09ICdCdWZmZXInICYmIGlzQXJyYXkob2JqLmRhdGEpKSB7XG4gICAgICByZXR1cm4gZnJvbUFycmF5TGlrZSh0aGF0LCBvYmouZGF0YSlcbiAgICB9XG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCdGaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgc3RyaW5nLCBCdWZmZXIsIEFycmF5QnVmZmVyLCBBcnJheSwgb3IgYXJyYXktbGlrZSBvYmplY3QuJylcbn1cblxuZnVuY3Rpb24gY2hlY2tlZCAobGVuZ3RoKSB7XG4gIC8vIE5vdGU6IGNhbm5vdCB1c2UgYGxlbmd0aCA8IGtNYXhMZW5ndGhgIGhlcmUgYmVjYXVzZSB0aGF0IGZhaWxzIHdoZW5cbiAgLy8gbGVuZ3RoIGlzIE5hTiAod2hpY2ggaXMgb3RoZXJ3aXNlIGNvZXJjZWQgdG8gemVyby4pXG4gIGlmIChsZW5ndGggPj0ga01heExlbmd0aCgpKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0F0dGVtcHQgdG8gYWxsb2NhdGUgQnVmZmVyIGxhcmdlciB0aGFuIG1heGltdW0gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgJ3NpemU6IDB4JyArIGtNYXhMZW5ndGgoKS50b1N0cmluZygxNikgKyAnIGJ5dGVzJylcbiAgfVxuICByZXR1cm4gbGVuZ3RoIHwgMFxufVxuXG5mdW5jdGlvbiBTbG93QnVmZmVyIChsZW5ndGgpIHtcbiAgaWYgKCtsZW5ndGggIT0gbGVuZ3RoKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZXFlcWVxXG4gICAgbGVuZ3RoID0gMFxuICB9XG4gIHJldHVybiBCdWZmZXIuYWxsb2MoK2xlbmd0aClcbn1cblxuQnVmZmVyLmlzQnVmZmVyID0gZnVuY3Rpb24gaXNCdWZmZXIgKGIpIHtcbiAgcmV0dXJuICEhKGIgIT0gbnVsbCAmJiBiLl9pc0J1ZmZlcilcbn1cblxuQnVmZmVyLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlIChhLCBiKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGEpIHx8ICFCdWZmZXIuaXNCdWZmZXIoYikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudHMgbXVzdCBiZSBCdWZmZXJzJylcbiAgfVxuXG4gIGlmIChhID09PSBiKSByZXR1cm4gMFxuXG4gIHZhciB4ID0gYS5sZW5ndGhcbiAgdmFyIHkgPSBiLmxlbmd0aFxuXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBNYXRoLm1pbih4LCB5KTsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKGFbaV0gIT09IGJbaV0pIHtcbiAgICAgIHggPSBhW2ldXG4gICAgICB5ID0gYltpXVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBpZiAoeCA8IHkpIHJldHVybiAtMVxuICBpZiAoeSA8IHgpIHJldHVybiAxXG4gIHJldHVybiAwXG59XG5cbkJ1ZmZlci5pc0VuY29kaW5nID0gZnVuY3Rpb24gaXNFbmNvZGluZyAoZW5jb2RpbmcpIHtcbiAgc3dpdGNoIChTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgY2FzZSAnbGF0aW4xJzpcbiAgICBjYXNlICdiaW5hcnknOlxuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldHVybiB0cnVlXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbkJ1ZmZlci5jb25jYXQgPSBmdW5jdGlvbiBjb25jYXQgKGxpc3QsIGxlbmd0aCkge1xuICBpZiAoIWlzQXJyYXkobGlzdCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RcIiBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMnKVxuICB9XG5cbiAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5hbGxvYygwKVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbGVuZ3RoID0gMFxuICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgICBsZW5ndGggKz0gbGlzdFtpXS5sZW5ndGhcbiAgICB9XG4gIH1cblxuICB2YXIgYnVmZmVyID0gQnVmZmVyLmFsbG9jVW5zYWZlKGxlbmd0aClcbiAgdmFyIHBvcyA9IDBcbiAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgYnVmID0gbGlzdFtpXVxuICAgIGlmICghQnVmZmVyLmlzQnVmZmVyKGJ1ZikpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdFwiIGFyZ3VtZW50IG11c3QgYmUgYW4gQXJyYXkgb2YgQnVmZmVycycpXG4gICAgfVxuICAgIGJ1Zi5jb3B5KGJ1ZmZlciwgcG9zKVxuICAgIHBvcyArPSBidWYubGVuZ3RoXG4gIH1cbiAgcmV0dXJuIGJ1ZmZlclxufVxuXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChzdHJpbmcsIGVuY29kaW5nKSB7XG4gIGlmIChCdWZmZXIuaXNCdWZmZXIoc3RyaW5nKSkge1xuICAgIHJldHVybiBzdHJpbmcubGVuZ3RoXG4gIH1cbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIEFycmF5QnVmZmVyLmlzVmlldyA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgKEFycmF5QnVmZmVyLmlzVmlldyhzdHJpbmcpIHx8IHN0cmluZyBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSkge1xuICAgIHJldHVybiBzdHJpbmcuYnl0ZUxlbmd0aFxuICB9XG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgIHN0cmluZyA9ICcnICsgc3RyaW5nXG4gIH1cblxuICB2YXIgbGVuID0gc3RyaW5nLmxlbmd0aFxuICBpZiAobGVuID09PSAwKSByZXR1cm4gMFxuXG4gIC8vIFVzZSBhIGZvciBsb29wIHRvIGF2b2lkIHJlY3Vyc2lvblxuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsZW5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgY2FzZSB1bmRlZmluZWQ6XG4gICAgICAgIHJldHVybiB1dGY4VG9CeXRlcyhzdHJpbmcpLmxlbmd0aFxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIGxlbiAqIDJcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBsZW4gPj4+IDFcbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRUb0J5dGVzKHN0cmluZykubGVuZ3RoXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHJldHVybiB1dGY4VG9CeXRlcyhzdHJpbmcpLmxlbmd0aCAvLyBhc3N1bWUgdXRmOFxuICAgICAgICBlbmNvZGluZyA9ICgnJyArIGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuQnVmZmVyLmJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoXG5cbmZ1bmN0aW9uIHNsb3dUb1N0cmluZyAoZW5jb2RpbmcsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcblxuICAvLyBObyBuZWVkIHRvIHZlcmlmeSB0aGF0IFwidGhpcy5sZW5ndGggPD0gTUFYX1VJTlQzMlwiIHNpbmNlIGl0J3MgYSByZWFkLW9ubHlcbiAgLy8gcHJvcGVydHkgb2YgYSB0eXBlZCBhcnJheS5cblxuICAvLyBUaGlzIGJlaGF2ZXMgbmVpdGhlciBsaWtlIFN0cmluZyBub3IgVWludDhBcnJheSBpbiB0aGF0IHdlIHNldCBzdGFydC9lbmRcbiAgLy8gdG8gdGhlaXIgdXBwZXIvbG93ZXIgYm91bmRzIGlmIHRoZSB2YWx1ZSBwYXNzZWQgaXMgb3V0IG9mIHJhbmdlLlxuICAvLyB1bmRlZmluZWQgaXMgaGFuZGxlZCBzcGVjaWFsbHkgYXMgcGVyIEVDTUEtMjYyIDZ0aCBFZGl0aW9uLFxuICAvLyBTZWN0aW9uIDEzLjMuMy43IFJ1bnRpbWUgU2VtYW50aWNzOiBLZXllZEJpbmRpbmdJbml0aWFsaXphdGlvbi5cbiAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQgfHwgc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgPSAwXG4gIH1cbiAgLy8gUmV0dXJuIGVhcmx5IGlmIHN0YXJ0ID4gdGhpcy5sZW5ndGguIERvbmUgaGVyZSB0byBwcmV2ZW50IHBvdGVudGlhbCB1aW50MzJcbiAgLy8gY29lcmNpb24gZmFpbCBiZWxvdy5cbiAgaWYgKHN0YXJ0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCB8fCBlbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gIH1cblxuICBpZiAoZW5kIDw9IDApIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIC8vIEZvcmNlIGNvZXJzaW9uIHRvIHVpbnQzMi4gVGhpcyB3aWxsIGFsc28gY29lcmNlIGZhbHNleS9OYU4gdmFsdWVzIHRvIDAuXG4gIGVuZCA+Pj49IDBcbiAgc3RhcnQgPj4+PSAwXG5cbiAgaWYgKGVuZCA8PSBzdGFydCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBoZXhTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICAgIHJldHVybiBhc2NpaVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGF0aW4xU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgcmV0dXJuIGJhc2U2NFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiB1dGYxNmxlU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgICAgIGVuY29kaW5nID0gKGVuY29kaW5nICsgJycpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbi8vIFRoZSBwcm9wZXJ0eSBpcyB1c2VkIGJ5IGBCdWZmZXIuaXNCdWZmZXJgIGFuZCBgaXMtYnVmZmVyYCAoaW4gU2FmYXJpIDUtNykgdG8gZGV0ZWN0XG4vLyBCdWZmZXIgaW5zdGFuY2VzLlxuQnVmZmVyLnByb3RvdHlwZS5faXNCdWZmZXIgPSB0cnVlXG5cbmZ1bmN0aW9uIHN3YXAgKGIsIG4sIG0pIHtcbiAgdmFyIGkgPSBiW25dXG4gIGJbbl0gPSBiW21dXG4gIGJbbV0gPSBpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDE2ID0gZnVuY3Rpb24gc3dhcDE2ICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSAyICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiAxNi1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSAyKSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgMSlcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXAzMiA9IGZ1bmN0aW9uIHN3YXAzMiAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgNCAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgMzItYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDMpXG4gICAgc3dhcCh0aGlzLCBpICsgMSwgaSArIDIpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwNjQgPSBmdW5jdGlvbiBzd2FwNjQgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDggIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDY0LWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDgpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyA3KVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyA2KVxuICAgIHN3YXAodGhpcywgaSArIDIsIGkgKyA1KVxuICAgIHN3YXAodGhpcywgaSArIDMsIGkgKyA0KVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gIHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aCB8IDBcbiAgaWYgKGxlbmd0aCA9PT0gMCkgcmV0dXJuICcnXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSByZXR1cm4gdXRmOFNsaWNlKHRoaXMsIDAsIGxlbmd0aClcbiAgcmV0dXJuIHNsb3dUb1N0cmluZy5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gZXF1YWxzIChiKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyJylcbiAgaWYgKHRoaXMgPT09IGIpIHJldHVybiB0cnVlXG4gIHJldHVybiBCdWZmZXIuY29tcGFyZSh0aGlzLCBiKSA9PT0gMFxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluc3BlY3QgPSBmdW5jdGlvbiBpbnNwZWN0ICgpIHtcbiAgdmFyIHN0ciA9ICcnXG4gIHZhciBtYXggPSBleHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTXG4gIGlmICh0aGlzLmxlbmd0aCA+IDApIHtcbiAgICBzdHIgPSB0aGlzLnRvU3RyaW5nKCdoZXgnLCAwLCBtYXgpLm1hdGNoKC8uezJ9L2cpLmpvaW4oJyAnKVxuICAgIGlmICh0aGlzLmxlbmd0aCA+IG1heCkgc3RyICs9ICcgLi4uICdcbiAgfVxuICByZXR1cm4gJzxCdWZmZXIgJyArIHN0ciArICc+J1xufVxuXG5CdWZmZXIucHJvdG90eXBlLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlICh0YXJnZXQsIHN0YXJ0LCBlbmQsIHRoaXNTdGFydCwgdGhpc0VuZCkge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcih0YXJnZXQpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlcicpXG4gIH1cblxuICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIGVuZCA9IHRhcmdldCA/IHRhcmdldC5sZW5ndGggOiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc1N0YXJ0ID0gMFxuICB9XG4gIGlmICh0aGlzRW5kID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzRW5kID0gdGhpcy5sZW5ndGhcbiAgfVxuXG4gIGlmIChzdGFydCA8IDAgfHwgZW5kID4gdGFyZ2V0Lmxlbmd0aCB8fCB0aGlzU3RhcnQgPCAwIHx8IHRoaXNFbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdvdXQgb2YgcmFuZ2UgaW5kZXgnKVxuICB9XG5cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kICYmIHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kKSB7XG4gICAgcmV0dXJuIC0xXG4gIH1cbiAgaWYgKHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAxXG4gIH1cblxuICBzdGFydCA+Pj49IDBcbiAgZW5kID4+Pj0gMFxuICB0aGlzU3RhcnQgPj4+PSAwXG4gIHRoaXNFbmQgPj4+PSAwXG5cbiAgaWYgKHRoaXMgPT09IHRhcmdldCkgcmV0dXJuIDBcblxuICB2YXIgeCA9IHRoaXNFbmQgLSB0aGlzU3RhcnRcbiAgdmFyIHkgPSBlbmQgLSBzdGFydFxuICB2YXIgbGVuID0gTWF0aC5taW4oeCwgeSlcblxuICB2YXIgdGhpc0NvcHkgPSB0aGlzLnNsaWNlKHRoaXNTdGFydCwgdGhpc0VuZClcbiAgdmFyIHRhcmdldENvcHkgPSB0YXJnZXQuc2xpY2Uoc3RhcnQsIGVuZClcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKHRoaXNDb3B5W2ldICE9PSB0YXJnZXRDb3B5W2ldKSB7XG4gICAgICB4ID0gdGhpc0NvcHlbaV1cbiAgICAgIHkgPSB0YXJnZXRDb3B5W2ldXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkgcmV0dXJuIC0xXG4gIGlmICh5IDwgeCkgcmV0dXJuIDFcbiAgcmV0dXJuIDBcbn1cblxuLy8gRmluZHMgZWl0aGVyIHRoZSBmaXJzdCBpbmRleCBvZiBgdmFsYCBpbiBgYnVmZmVyYCBhdCBvZmZzZXQgPj0gYGJ5dGVPZmZzZXRgLFxuLy8gT1IgdGhlIGxhc3QgaW5kZXggb2YgYHZhbGAgaW4gYGJ1ZmZlcmAgYXQgb2Zmc2V0IDw9IGBieXRlT2Zmc2V0YC5cbi8vXG4vLyBBcmd1bWVudHM6XG4vLyAtIGJ1ZmZlciAtIGEgQnVmZmVyIHRvIHNlYXJjaFxuLy8gLSB2YWwgLSBhIHN0cmluZywgQnVmZmVyLCBvciBudW1iZXJcbi8vIC0gYnl0ZU9mZnNldCAtIGFuIGluZGV4IGludG8gYGJ1ZmZlcmA7IHdpbGwgYmUgY2xhbXBlZCB0byBhbiBpbnQzMlxuLy8gLSBlbmNvZGluZyAtIGFuIG9wdGlvbmFsIGVuY29kaW5nLCByZWxldmFudCBpcyB2YWwgaXMgYSBzdHJpbmdcbi8vIC0gZGlyIC0gdHJ1ZSBmb3IgaW5kZXhPZiwgZmFsc2UgZm9yIGxhc3RJbmRleE9mXG5mdW5jdGlvbiBiaWRpcmVjdGlvbmFsSW5kZXhPZiAoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpIHtcbiAgLy8gRW1wdHkgYnVmZmVyIG1lYW5zIG5vIG1hdGNoXG4gIGlmIChidWZmZXIubGVuZ3RoID09PSAwKSByZXR1cm4gLTFcblxuICAvLyBOb3JtYWxpemUgYnl0ZU9mZnNldFxuICBpZiAodHlwZW9mIGJ5dGVPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgZW5jb2RpbmcgPSBieXRlT2Zmc2V0XG4gICAgYnl0ZU9mZnNldCA9IDBcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0ID4gMHg3ZmZmZmZmZikge1xuICAgIGJ5dGVPZmZzZXQgPSAweDdmZmZmZmZmXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IC0weDgwMDAwMDAwKSB7XG4gICAgYnl0ZU9mZnNldCA9IC0weDgwMDAwMDAwXG4gIH1cbiAgYnl0ZU9mZnNldCA9ICtieXRlT2Zmc2V0ICAvLyBDb2VyY2UgdG8gTnVtYmVyLlxuICBpZiAoaXNOYU4oYnl0ZU9mZnNldCkpIHtcbiAgICAvLyBieXRlT2Zmc2V0OiBpdCBpdCdzIHVuZGVmaW5lZCwgbnVsbCwgTmFOLCBcImZvb1wiLCBldGMsIHNlYXJjaCB3aG9sZSBidWZmZXJcbiAgICBieXRlT2Zmc2V0ID0gZGlyID8gMCA6IChidWZmZXIubGVuZ3RoIC0gMSlcbiAgfVxuXG4gIC8vIE5vcm1hbGl6ZSBieXRlT2Zmc2V0OiBuZWdhdGl2ZSBvZmZzZXRzIHN0YXJ0IGZyb20gdGhlIGVuZCBvZiB0aGUgYnVmZmVyXG4gIGlmIChieXRlT2Zmc2V0IDwgMCkgYnl0ZU9mZnNldCA9IGJ1ZmZlci5sZW5ndGggKyBieXRlT2Zmc2V0XG4gIGlmIChieXRlT2Zmc2V0ID49IGJ1ZmZlci5sZW5ndGgpIHtcbiAgICBpZiAoZGlyKSByZXR1cm4gLTFcbiAgICBlbHNlIGJ5dGVPZmZzZXQgPSBidWZmZXIubGVuZ3RoIC0gMVxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPCAwKSB7XG4gICAgaWYgKGRpcikgYnl0ZU9mZnNldCA9IDBcbiAgICBlbHNlIHJldHVybiAtMVxuICB9XG5cbiAgLy8gTm9ybWFsaXplIHZhbFxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICB2YWwgPSBCdWZmZXIuZnJvbSh2YWwsIGVuY29kaW5nKVxuICB9XG5cbiAgLy8gRmluYWxseSwgc2VhcmNoIGVpdGhlciBpbmRleE9mIChpZiBkaXIgaXMgdHJ1ZSkgb3IgbGFzdEluZGV4T2ZcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcih2YWwpKSB7XG4gICAgLy8gU3BlY2lhbCBjYXNlOiBsb29raW5nIGZvciBlbXB0eSBzdHJpbmcvYnVmZmVyIGFsd2F5cyBmYWlsc1xuICAgIGlmICh2YWwubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gLTFcbiAgICB9XG4gICAgcmV0dXJuIGFycmF5SW5kZXhPZihidWZmZXIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcilcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIHZhbCA9IHZhbCAmIDB4RkYgLy8gU2VhcmNoIGZvciBhIGJ5dGUgdmFsdWUgWzAtMjU1XVxuICAgIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCAmJlxuICAgICAgICB0eXBlb2YgVWludDhBcnJheS5wcm90b3R5cGUuaW5kZXhPZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgaWYgKGRpcikge1xuICAgICAgICByZXR1cm4gVWludDhBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXkucHJvdG90eXBlLmxhc3RJbmRleE9mLmNhbGwoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcnJheUluZGV4T2YoYnVmZmVyLCBbIHZhbCBdLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcigndmFsIG11c3QgYmUgc3RyaW5nLCBudW1iZXIgb3IgQnVmZmVyJylcbn1cblxuZnVuY3Rpb24gYXJyYXlJbmRleE9mIChhcnIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcikge1xuICB2YXIgaW5kZXhTaXplID0gMVxuICB2YXIgYXJyTGVuZ3RoID0gYXJyLmxlbmd0aFxuICB2YXIgdmFsTGVuZ3RoID0gdmFsLmxlbmd0aFxuXG4gIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSBTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICBpZiAoZW5jb2RpbmcgPT09ICd1Y3MyJyB8fCBlbmNvZGluZyA9PT0gJ3Vjcy0yJyB8fFxuICAgICAgICBlbmNvZGluZyA9PT0gJ3V0ZjE2bGUnIHx8IGVuY29kaW5nID09PSAndXRmLTE2bGUnKSB7XG4gICAgICBpZiAoYXJyLmxlbmd0aCA8IDIgfHwgdmFsLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgcmV0dXJuIC0xXG4gICAgICB9XG4gICAgICBpbmRleFNpemUgPSAyXG4gICAgICBhcnJMZW5ndGggLz0gMlxuICAgICAgdmFsTGVuZ3RoIC89IDJcbiAgICAgIGJ5dGVPZmZzZXQgLz0gMlxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWQgKGJ1ZiwgaSkge1xuICAgIGlmIChpbmRleFNpemUgPT09IDEpIHtcbiAgICAgIHJldHVybiBidWZbaV1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGJ1Zi5yZWFkVUludDE2QkUoaSAqIGluZGV4U2l6ZSlcbiAgICB9XG4gIH1cblxuICB2YXIgaVxuICBpZiAoZGlyKSB7XG4gICAgdmFyIGZvdW5kSW5kZXggPSAtMVxuICAgIGZvciAoaSA9IGJ5dGVPZmZzZXQ7IGkgPCBhcnJMZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHJlYWQoYXJyLCBpKSA9PT0gcmVhZCh2YWwsIGZvdW5kSW5kZXggPT09IC0xID8gMCA6IGkgLSBmb3VuZEluZGV4KSkge1xuICAgICAgICBpZiAoZm91bmRJbmRleCA9PT0gLTEpIGZvdW5kSW5kZXggPSBpXG4gICAgICAgIGlmIChpIC0gZm91bmRJbmRleCArIDEgPT09IHZhbExlbmd0aCkgcmV0dXJuIGZvdW5kSW5kZXggKiBpbmRleFNpemVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChmb3VuZEluZGV4ICE9PSAtMSkgaSAtPSBpIC0gZm91bmRJbmRleFxuICAgICAgICBmb3VuZEluZGV4ID0gLTFcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGJ5dGVPZmZzZXQgKyB2YWxMZW5ndGggPiBhcnJMZW5ndGgpIGJ5dGVPZmZzZXQgPSBhcnJMZW5ndGggLSB2YWxMZW5ndGhcbiAgICBmb3IgKGkgPSBieXRlT2Zmc2V0OyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGZvdW5kID0gdHJ1ZVxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB2YWxMZW5ndGg7IGorKykge1xuICAgICAgICBpZiAocmVhZChhcnIsIGkgKyBqKSAhPT0gcmVhZCh2YWwsIGopKSB7XG4gICAgICAgICAgZm91bmQgPSBmYWxzZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gLTFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbmNsdWRlcyA9IGZ1bmN0aW9uIGluY2x1ZGVzICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiB0aGlzLmluZGV4T2YodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykgIT09IC0xXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIGluZGV4T2YgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGJpZGlyZWN0aW9uYWxJbmRleE9mKHRoaXMsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIHRydWUpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUubGFzdEluZGV4T2YgPSBmdW5jdGlvbiBsYXN0SW5kZXhPZiAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gYmlkaXJlY3Rpb25hbEluZGV4T2YodGhpcywgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZmFsc2UpXG59XG5cbmZ1bmN0aW9uIGhleFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgb2Zmc2V0ID0gTnVtYmVyKG9mZnNldCkgfHwgMFxuICB2YXIgcmVtYWluaW5nID0gYnVmLmxlbmd0aCAtIG9mZnNldFxuICBpZiAoIWxlbmd0aCkge1xuICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICB9IGVsc2Uge1xuICAgIGxlbmd0aCA9IE51bWJlcihsZW5ndGgpXG4gICAgaWYgKGxlbmd0aCA+IHJlbWFpbmluZykge1xuICAgICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gICAgfVxuICB9XG5cbiAgLy8gbXVzdCBiZSBhbiBldmVuIG51bWJlciBvZiBkaWdpdHNcbiAgdmFyIHN0ckxlbiA9IHN0cmluZy5sZW5ndGhcbiAgaWYgKHN0ckxlbiAlIDIgIT09IDApIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgaGV4IHN0cmluZycpXG5cbiAgaWYgKGxlbmd0aCA+IHN0ckxlbiAvIDIpIHtcbiAgICBsZW5ndGggPSBzdHJMZW4gLyAyXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIHZhciBwYXJzZWQgPSBwYXJzZUludChzdHJpbmcuc3Vic3RyKGkgKiAyLCAyKSwgMTYpXG4gICAgaWYgKGlzTmFOKHBhcnNlZCkpIHJldHVybiBpXG4gICAgYnVmW29mZnNldCArIGldID0gcGFyc2VkXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gdXRmOFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIodXRmOFRvQnl0ZXMoc3RyaW5nLCBidWYubGVuZ3RoIC0gb2Zmc2V0KSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYXNjaWlXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKGFzY2lpVG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBsYXRpbjFXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBhc2NpaVdyaXRlKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYmFzZTY0V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihiYXNlNjRUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIHVjczJXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjE2bGVUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiB3cml0ZSAoc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCwgZW5jb2RpbmcpIHtcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZylcbiAgaWYgKG9mZnNldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgICBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICAgIG9mZnNldCA9IDBcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZywgZW5jb2RpbmcpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbmNvZGluZyA9IG9mZnNldFxuICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgb2Zmc2V0ID0gMFxuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nLCBvZmZzZXRbLCBsZW5ndGhdWywgZW5jb2RpbmddKVxuICB9IGVsc2UgaWYgKGlzRmluaXRlKG9mZnNldCkpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gICAgaWYgKGlzRmluaXRlKGxlbmd0aCkpIHtcbiAgICAgIGxlbmd0aCA9IGxlbmd0aCB8IDBcbiAgICAgIGlmIChlbmNvZGluZyA9PT0gdW5kZWZpbmVkKSBlbmNvZGluZyA9ICd1dGY4J1xuICAgIH0gZWxzZSB7XG4gICAgICBlbmNvZGluZyA9IGxlbmd0aFxuICAgICAgbGVuZ3RoID0gdW5kZWZpbmVkXG4gICAgfVxuICAvLyBsZWdhY3kgd3JpdGUoc3RyaW5nLCBlbmNvZGluZywgb2Zmc2V0LCBsZW5ndGgpIC0gcmVtb3ZlIGluIHYwLjEzXG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ0J1ZmZlci53cml0ZShzdHJpbmcsIGVuY29kaW5nLCBvZmZzZXRbLCBsZW5ndGhdKSBpcyBubyBsb25nZXIgc3VwcG9ydGVkJ1xuICAgIClcbiAgfVxuXG4gIHZhciByZW1haW5pbmcgPSB0aGlzLmxlbmd0aCAtIG9mZnNldFxuICBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQgfHwgbGVuZ3RoID4gcmVtYWluaW5nKSBsZW5ndGggPSByZW1haW5pbmdcblxuICBpZiAoKHN0cmluZy5sZW5ndGggPiAwICYmIChsZW5ndGggPCAwIHx8IG9mZnNldCA8IDApKSB8fCBvZmZzZXQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdBdHRlbXB0IHRvIHdyaXRlIG91dHNpZGUgYnVmZmVyIGJvdW5kcycpXG4gIH1cblxuICBpZiAoIWVuY29kaW5nKSBlbmNvZGluZyA9ICd1dGY4J1xuXG4gIHZhciBsb3dlcmVkQ2FzZSA9IGZhbHNlXG4gIGZvciAoOzspIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gaGV4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiB1dGY4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgICByZXR1cm4gYXNjaWlXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxhdGluMVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIC8vIFdhcm5pbmc6IG1heExlbmd0aCBub3QgdGFrZW4gaW50byBhY2NvdW50IGluIGJhc2U2NFdyaXRlXG4gICAgICAgIHJldHVybiBiYXNlNjRXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gdWNzMldyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgICAgICBlbmNvZGluZyA9ICgnJyArIGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTiAoKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ0J1ZmZlcicsXG4gICAgZGF0YTogQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5fYXJyIHx8IHRoaXMsIDApXG4gIH1cbn1cblxuZnVuY3Rpb24gYmFzZTY0U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBpZiAoc3RhcnQgPT09IDAgJiYgZW5kID09PSBidWYubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1ZilcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmLnNsaWNlKHN0YXJ0LCBlbmQpKVxuICB9XG59XG5cbmZ1bmN0aW9uIHV0ZjhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcbiAgdmFyIHJlcyA9IFtdXG5cbiAgdmFyIGkgPSBzdGFydFxuICB3aGlsZSAoaSA8IGVuZCkge1xuICAgIHZhciBmaXJzdEJ5dGUgPSBidWZbaV1cbiAgICB2YXIgY29kZVBvaW50ID0gbnVsbFxuICAgIHZhciBieXRlc1BlclNlcXVlbmNlID0gKGZpcnN0Qnl0ZSA+IDB4RUYpID8gNFxuICAgICAgOiAoZmlyc3RCeXRlID4gMHhERikgPyAzXG4gICAgICA6IChmaXJzdEJ5dGUgPiAweEJGKSA/IDJcbiAgICAgIDogMVxuXG4gICAgaWYgKGkgKyBieXRlc1BlclNlcXVlbmNlIDw9IGVuZCkge1xuICAgICAgdmFyIHNlY29uZEJ5dGUsIHRoaXJkQnl0ZSwgZm91cnRoQnl0ZSwgdGVtcENvZGVQb2ludFxuXG4gICAgICBzd2l0Y2ggKGJ5dGVzUGVyU2VxdWVuY2UpIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIGlmIChmaXJzdEJ5dGUgPCAweDgwKSB7XG4gICAgICAgICAgICBjb2RlUG9pbnQgPSBmaXJzdEJ5dGVcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHgxRikgPDwgMHg2IHwgKHNlY29uZEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweDdGKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgdGhpcmRCeXRlID0gYnVmW2kgKyAyXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwICYmICh0aGlyZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweEYpIDw8IDB4QyB8IChzZWNvbmRCeXRlICYgMHgzRikgPDwgMHg2IHwgKHRoaXJkQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4N0ZGICYmICh0ZW1wQ29kZVBvaW50IDwgMHhEODAwIHx8IHRlbXBDb2RlUG9pbnQgPiAweERGRkYpKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgdGhpcmRCeXRlID0gYnVmW2kgKyAyXVxuICAgICAgICAgIGZvdXJ0aEJ5dGUgPSBidWZbaSArIDNdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKHRoaXJkQnl0ZSAmIDB4QzApID09PSAweDgwICYmIChmb3VydGhCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHhGKSA8PCAweDEyIHwgKHNlY29uZEJ5dGUgJiAweDNGKSA8PCAweEMgfCAodGhpcmRCeXRlICYgMHgzRikgPDwgMHg2IHwgKGZvdXJ0aEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweEZGRkYgJiYgdGVtcENvZGVQb2ludCA8IDB4MTEwMDAwKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNvZGVQb2ludCA9PT0gbnVsbCkge1xuICAgICAgLy8gd2UgZGlkIG5vdCBnZW5lcmF0ZSBhIHZhbGlkIGNvZGVQb2ludCBzbyBpbnNlcnQgYVxuICAgICAgLy8gcmVwbGFjZW1lbnQgY2hhciAoVStGRkZEKSBhbmQgYWR2YW5jZSBvbmx5IDEgYnl0ZVxuICAgICAgY29kZVBvaW50ID0gMHhGRkZEXG4gICAgICBieXRlc1BlclNlcXVlbmNlID0gMVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50ID4gMHhGRkZGKSB7XG4gICAgICAvLyBlbmNvZGUgdG8gdXRmMTYgKHN1cnJvZ2F0ZSBwYWlyIGRhbmNlKVxuICAgICAgY29kZVBvaW50IC09IDB4MTAwMDBcbiAgICAgIHJlcy5wdXNoKGNvZGVQb2ludCA+Pj4gMTAgJiAweDNGRiB8IDB4RDgwMClcbiAgICAgIGNvZGVQb2ludCA9IDB4REMwMCB8IGNvZGVQb2ludCAmIDB4M0ZGXG4gICAgfVxuXG4gICAgcmVzLnB1c2goY29kZVBvaW50KVxuICAgIGkgKz0gYnl0ZXNQZXJTZXF1ZW5jZVxuICB9XG5cbiAgcmV0dXJuIGRlY29kZUNvZGVQb2ludHNBcnJheShyZXMpXG59XG5cbi8vIEJhc2VkIG9uIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIyNzQ3MjcyLzY4MDc0MiwgdGhlIGJyb3dzZXIgd2l0aFxuLy8gdGhlIGxvd2VzdCBsaW1pdCBpcyBDaHJvbWUsIHdpdGggMHgxMDAwMCBhcmdzLlxuLy8gV2UgZ28gMSBtYWduaXR1ZGUgbGVzcywgZm9yIHNhZmV0eVxudmFyIE1BWF9BUkdVTUVOVFNfTEVOR1RIID0gMHgxMDAwXG5cbmZ1bmN0aW9uIGRlY29kZUNvZGVQb2ludHNBcnJheSAoY29kZVBvaW50cykge1xuICB2YXIgbGVuID0gY29kZVBvaW50cy5sZW5ndGhcbiAgaWYgKGxlbiA8PSBNQVhfQVJHVU1FTlRTX0xFTkdUSCkge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgY29kZVBvaW50cykgLy8gYXZvaWQgZXh0cmEgc2xpY2UoKVxuICB9XG5cbiAgLy8gRGVjb2RlIGluIGNodW5rcyB0byBhdm9pZCBcImNhbGwgc3RhY2sgc2l6ZSBleGNlZWRlZFwiLlxuICB2YXIgcmVzID0gJydcbiAgdmFyIGkgPSAwXG4gIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoXG4gICAgICBTdHJpbmcsXG4gICAgICBjb2RlUG9pbnRzLnNsaWNlKGksIGkgKz0gTUFYX0FSR1VNRU5UU19MRU5HVEgpXG4gICAgKVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuZnVuY3Rpb24gYXNjaWlTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0gJiAweDdGKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gbGF0aW4xU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gaGV4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuXG4gIGlmICghc3RhcnQgfHwgc3RhcnQgPCAwKSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgfHwgZW5kIDwgMCB8fCBlbmQgPiBsZW4pIGVuZCA9IGxlblxuXG4gIHZhciBvdXQgPSAnJ1xuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIG91dCArPSB0b0hleChidWZbaV0pXG4gIH1cbiAgcmV0dXJuIG91dFxufVxuXG5mdW5jdGlvbiB1dGYxNmxlU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgYnl0ZXMgPSBidWYuc2xpY2Uoc3RhcnQsIGVuZClcbiAgdmFyIHJlcyA9ICcnXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1tpXSArIGJ5dGVzW2kgKyAxXSAqIDI1NilcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc2xpY2UgPSBmdW5jdGlvbiBzbGljZSAoc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgc3RhcnQgPSB+fnN0YXJ0XG4gIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuIDogfn5lbmRcblxuICBpZiAoc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgKz0gbGVuXG4gICAgaWYgKHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIH0gZWxzZSBpZiAoc3RhcnQgPiBsZW4pIHtcbiAgICBzdGFydCA9IGxlblxuICB9XG5cbiAgaWYgKGVuZCA8IDApIHtcbiAgICBlbmQgKz0gbGVuXG4gICAgaWYgKGVuZCA8IDApIGVuZCA9IDBcbiAgfSBlbHNlIGlmIChlbmQgPiBsZW4pIHtcbiAgICBlbmQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCBzdGFydCkgZW5kID0gc3RhcnRcblxuICB2YXIgbmV3QnVmXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIG5ld0J1ZiA9IHRoaXMuc3ViYXJyYXkoc3RhcnQsIGVuZClcbiAgICBuZXdCdWYuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICB9IGVsc2Uge1xuICAgIHZhciBzbGljZUxlbiA9IGVuZCAtIHN0YXJ0XG4gICAgbmV3QnVmID0gbmV3IEJ1ZmZlcihzbGljZUxlbiwgdW5kZWZpbmVkKVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpY2VMZW47ICsraSkge1xuICAgICAgbmV3QnVmW2ldID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ld0J1ZlxufVxuXG4vKlxuICogTmVlZCB0byBtYWtlIHN1cmUgdGhhdCBidWZmZXIgaXNuJ3QgdHJ5aW5nIHRvIHdyaXRlIG91dCBvZiBib3VuZHMuXG4gKi9cbmZ1bmN0aW9uIGNoZWNrT2Zmc2V0IChvZmZzZXQsIGV4dCwgbGVuZ3RoKSB7XG4gIGlmICgob2Zmc2V0ICUgMSkgIT09IDAgfHwgb2Zmc2V0IDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ29mZnNldCBpcyBub3QgdWludCcpXG4gIGlmIChvZmZzZXQgKyBleHQgPiBsZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdUcnlpbmcgdG8gYWNjZXNzIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludExFID0gZnVuY3Rpb24gcmVhZFVJbnRMRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF1cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgaV0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludEJFID0gZnVuY3Rpb24gcmVhZFVJbnRCRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcbiAgfVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldCArIC0tYnl0ZUxlbmd0aF1cbiAgdmFyIG11bCA9IDFcbiAgd2hpbGUgKGJ5dGVMZW5ndGggPiAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgLS1ieXRlTGVuZ3RoXSAqIG11bFxuICB9XG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50OCA9IGZ1bmN0aW9uIHJlYWRVSW50OCAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkxFID0gZnVuY3Rpb24gcmVhZFVJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiB0aGlzW29mZnNldF0gfCAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZCRSA9IGZ1bmN0aW9uIHJlYWRVSW50MTZCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSA8PCA4KSB8IHRoaXNbb2Zmc2V0ICsgMV1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyTEUgPSBmdW5jdGlvbiByZWFkVUludDMyTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKCh0aGlzW29mZnNldF0pIHxcbiAgICAgICh0aGlzW29mZnNldCArIDFdIDw8IDgpIHxcbiAgICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSkgK1xuICAgICAgKHRoaXNbb2Zmc2V0ICsgM10gKiAweDEwMDAwMDApXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkJFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0gKiAweDEwMDAwMDApICtcbiAgICAoKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgdGhpc1tvZmZzZXQgKyAzXSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50TEUgPSBmdW5jdGlvbiByZWFkSW50TEUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIGldICogbXVsXG4gIH1cbiAgbXVsICo9IDB4ODBcblxuICBpZiAodmFsID49IG11bCkgdmFsIC09IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50QkUgPSBmdW5jdGlvbiByZWFkSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgaSA9IGJ5dGVMZW5ndGhcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgLS1pXVxuICB3aGlsZSAoaSA+IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyAtLWldICogbXVsXG4gIH1cbiAgbXVsICo9IDB4ODBcblxuICBpZiAodmFsID49IG11bCkgdmFsIC09IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50OCA9IGZ1bmN0aW9uIHJlYWRJbnQ4IChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMSwgdGhpcy5sZW5ndGgpXG4gIGlmICghKHRoaXNbb2Zmc2V0XSAmIDB4ODApKSByZXR1cm4gKHRoaXNbb2Zmc2V0XSlcbiAgcmV0dXJuICgoMHhmZiAtIHRoaXNbb2Zmc2V0XSArIDEpICogLTEpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2TEUgPSBmdW5jdGlvbiByZWFkSW50MTZMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbiAgcmV0dXJuICh2YWwgJiAweDgwMDApID8gdmFsIHwgMHhGRkZGMDAwMCA6IHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkJFID0gZnVuY3Rpb24gcmVhZEludDE2QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgMV0gfCAodGhpc1tvZmZzZXRdIDw8IDgpXG4gIHJldHVybiAodmFsICYgMHg4MDAwKSA/IHZhbCB8IDB4RkZGRjAwMDAgOiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJMRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0pIHxcbiAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAzXSA8PCAyNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJCRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0gPDwgMjQpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCAxNikgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDgpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAzXSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRMRSA9IGZ1bmN0aW9uIHJlYWRGbG9hdExFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCB0cnVlLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRCRSA9IGZ1bmN0aW9uIHJlYWRGbG9hdEJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUxFID0gZnVuY3Rpb24gcmVhZERvdWJsZUxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCB0cnVlLCA1MiwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlQkUgPSBmdW5jdGlvbiByZWFkRG91YmxlQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA4LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIGZhbHNlLCA1MiwgOClcbn1cblxuZnVuY3Rpb24gY2hlY2tJbnQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgZXh0LCBtYXgsIG1pbikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImJ1ZmZlclwiIGFyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXIgaW5zdGFuY2UnKVxuICBpZiAodmFsdWUgPiBtYXggfHwgdmFsdWUgPCBtaW4pIHRocm93IG5ldyBSYW5nZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgaXMgb3V0IG9mIGJvdW5kcycpXG4gIGlmIChvZmZzZXQgKyBleHQgPiBidWYubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRMRSA9IGZ1bmN0aW9uIHdyaXRlVUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIG1heEJ5dGVzID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpIC0gMVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG1heEJ5dGVzLCAwKVxuICB9XG5cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAodmFsdWUgLyBtdWwpICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRCRSA9IGZ1bmN0aW9uIHdyaXRlVUludEJFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIG1heEJ5dGVzID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpIC0gMVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG1heEJ5dGVzLCAwKVxuICB9XG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoIC0gMVxuICB2YXIgbXVsID0gMVxuICB0aGlzW29mZnNldCArIGldID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgtLWkgPj0gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAodmFsdWUgLyBtdWwpICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQ4ID0gZnVuY3Rpb24gd3JpdGVVSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAxLCAweGZmLCAwKVxuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB2YWx1ZSA9IE1hdGguZmxvb3IodmFsdWUpXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAxXG59XG5cbmZ1bmN0aW9uIG9iamVjdFdyaXRlVUludDE2IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbikge1xuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZiArIHZhbHVlICsgMVxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGJ1Zi5sZW5ndGggLSBvZmZzZXQsIDIpOyBpIDwgajsgKytpKSB7XG4gICAgYnVmW29mZnNldCArIGldID0gKHZhbHVlICYgKDB4ZmYgPDwgKDggKiAobGl0dGxlRW5kaWFuID8gaSA6IDEgLSBpKSkpKSA+Pj5cbiAgICAgIChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpICogOFxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZMRSA9IGZ1bmN0aW9uIHdyaXRlVUludDE2TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2QkUgPSBmdW5jdGlvbiB3cml0ZVVJbnQxNkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbmZ1bmN0aW9uIG9iamVjdFdyaXRlVUludDMyIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbikge1xuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZmZmZmYgKyB2YWx1ZSArIDFcbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihidWYubGVuZ3RoIC0gb2Zmc2V0LCA0KTsgaSA8IGo7ICsraSkge1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9ICh2YWx1ZSA+Pj4gKGxpdHRsZUVuZGlhbiA/IGkgOiAzIC0gaSkgKiA4KSAmIDB4ZmZcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyTEUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4ZmZmZmZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgPj4+IDI0KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJCRSA9IGZ1bmN0aW9uIHdyaXRlVUludDMyQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiAyNClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnRMRSA9IGZ1bmN0aW9uIHdyaXRlSW50TEUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBsaW1pdCA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoIC0gMSlcblxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIGxpbWl0IC0gMSwgLWxpbWl0KVxuICB9XG5cbiAgdmFyIGkgPSAwXG4gIHZhciBtdWwgPSAxXG4gIHZhciBzdWIgPSAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIGlmICh2YWx1ZSA8IDAgJiYgc3ViID09PSAwICYmIHRoaXNbb2Zmc2V0ICsgaSAtIDFdICE9PSAwKSB7XG4gICAgICBzdWIgPSAxXG4gICAgfVxuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAoKHZhbHVlIC8gbXVsKSA+PiAwKSAtIHN1YiAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnRCRSA9IGZ1bmN0aW9uIHdyaXRlSW50QkUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBsaW1pdCA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoIC0gMSlcblxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIGxpbWl0IC0gMSwgLWxpbWl0KVxuICB9XG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoIC0gMVxuICB2YXIgbXVsID0gMVxuICB2YXIgc3ViID0gMFxuICB0aGlzW29mZnNldCArIGldID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgtLWkgPj0gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIGlmICh2YWx1ZSA8IDAgJiYgc3ViID09PSAwICYmIHRoaXNbb2Zmc2V0ICsgaSArIDFdICE9PSAwKSB7XG4gICAgICBzdWIgPSAxXG4gICAgfVxuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAoKHZhbHVlIC8gbXVsKSA+PiAwKSAtIHN1YiAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQ4ID0gZnVuY3Rpb24gd3JpdGVJbnQ4ICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4N2YsIC0weDgwKVxuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB2YWx1ZSA9IE1hdGguZmxvb3IodmFsdWUpXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZiArIHZhbHVlICsgMVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZMRSA9IGZ1bmN0aW9uIHdyaXRlSW50MTZMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVJbnQxNkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4N2ZmZiwgLTB4ODAwMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkxFID0gZnVuY3Rpb24gd3JpdGVJbnQzMkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJCRSA9IGZ1bmN0aW9uIHdyaXRlSW50MzJCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMClcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmZmZmZmICsgdmFsdWUgKyAxXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gMjQpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5mdW5jdGlvbiBjaGVja0lFRUU3NTQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgZXh0LCBtYXgsIG1pbikge1xuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG4gIGlmIChvZmZzZXQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbn1cblxuZnVuY3Rpb24gd3JpdGVGbG9hdCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja0lFRUU3NTQoYnVmLCB2YWx1ZSwgb2Zmc2V0LCA0LCAzLjQwMjgyMzQ2NjM4NTI4ODZlKzM4LCAtMy40MDI4MjM0NjYzODUyODg2ZSszOClcbiAgfVxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCAyMywgNClcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0TEUgPSBmdW5jdGlvbiB3cml0ZUZsb2F0TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRCRSA9IGZ1bmN0aW9uIHdyaXRlRmxvYXRCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiB3cml0ZURvdWJsZSAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja0lFRUU3NTQoYnVmLCB2YWx1ZSwgb2Zmc2V0LCA4LCAxLjc5NzY5MzEzNDg2MjMxNTdFKzMwOCwgLTEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4KVxuICB9XG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDUyLCA4KVxuICByZXR1cm4gb2Zmc2V0ICsgOFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlTEUgPSBmdW5jdGlvbiB3cml0ZURvdWJsZUxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVCRSA9IGZ1bmN0aW9uIHdyaXRlRG91YmxlQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbi8vIGNvcHkodGFyZ2V0QnVmZmVyLCB0YXJnZXRTdGFydD0wLCBzb3VyY2VTdGFydD0wLCBzb3VyY2VFbmQ9YnVmZmVyLmxlbmd0aClcbkJ1ZmZlci5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uIGNvcHkgKHRhcmdldCwgdGFyZ2V0U3RhcnQsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKCFzdGFydCkgc3RhcnQgPSAwXG4gIGlmICghZW5kICYmIGVuZCAhPT0gMCkgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKHRhcmdldFN0YXJ0ID49IHRhcmdldC5sZW5ndGgpIHRhcmdldFN0YXJ0ID0gdGFyZ2V0Lmxlbmd0aFxuICBpZiAoIXRhcmdldFN0YXJ0KSB0YXJnZXRTdGFydCA9IDBcbiAgaWYgKGVuZCA+IDAgJiYgZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgLy8gQ29weSAwIGJ5dGVzOyB3ZSdyZSBkb25lXG4gIGlmIChlbmQgPT09IHN0YXJ0KSByZXR1cm4gMFxuICBpZiAodGFyZ2V0Lmxlbmd0aCA9PT0gMCB8fCB0aGlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIDBcblxuICAvLyBGYXRhbCBlcnJvciBjb25kaXRpb25zXG4gIGlmICh0YXJnZXRTdGFydCA8IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcigndGFyZ2V0U3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIH1cbiAgaWYgKHN0YXJ0IDwgMCB8fCBzdGFydCA+PSB0aGlzLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3NvdXJjZVN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICBpZiAoZW5kIDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3NvdXJjZUVuZCBvdXQgb2YgYm91bmRzJylcblxuICAvLyBBcmUgd2Ugb29iP1xuICBpZiAoZW5kID4gdGhpcy5sZW5ndGgpIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICh0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0U3RhcnQgPCBlbmQgLSBzdGFydCkge1xuICAgIGVuZCA9IHRhcmdldC5sZW5ndGggLSB0YXJnZXRTdGFydCArIHN0YXJ0XG4gIH1cblxuICB2YXIgbGVuID0gZW5kIC0gc3RhcnRcbiAgdmFyIGlcblxuICBpZiAodGhpcyA9PT0gdGFyZ2V0ICYmIHN0YXJ0IDwgdGFyZ2V0U3RhcnQgJiYgdGFyZ2V0U3RhcnQgPCBlbmQpIHtcbiAgICAvLyBkZXNjZW5kaW5nIGNvcHkgZnJvbSBlbmRcbiAgICBmb3IgKGkgPSBsZW4gLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgdGFyZ2V0W2kgKyB0YXJnZXRTdGFydF0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gIH0gZWxzZSBpZiAobGVuIDwgMTAwMCB8fCAhQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICAvLyBhc2NlbmRpbmcgY29weSBmcm9tIHN0YXJ0XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICB0YXJnZXRbaSArIHRhcmdldFN0YXJ0XSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBVaW50OEFycmF5LnByb3RvdHlwZS5zZXQuY2FsbChcbiAgICAgIHRhcmdldCxcbiAgICAgIHRoaXMuc3ViYXJyYXkoc3RhcnQsIHN0YXJ0ICsgbGVuKSxcbiAgICAgIHRhcmdldFN0YXJ0XG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIGxlblxufVxuXG4vLyBVc2FnZTpcbi8vICAgIGJ1ZmZlci5maWxsKG51bWJlclssIG9mZnNldFssIGVuZF1dKVxuLy8gICAgYnVmZmVyLmZpbGwoYnVmZmVyWywgb2Zmc2V0WywgZW5kXV0pXG4vLyAgICBidWZmZXIuZmlsbChzdHJpbmdbLCBvZmZzZXRbLCBlbmRdXVssIGVuY29kaW5nXSlcbkJ1ZmZlci5wcm90b3R5cGUuZmlsbCA9IGZ1bmN0aW9uIGZpbGwgKHZhbCwgc3RhcnQsIGVuZCwgZW5jb2RpbmcpIHtcbiAgLy8gSGFuZGxlIHN0cmluZyBjYXNlczpcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKHR5cGVvZiBzdGFydCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVuY29kaW5nID0gc3RhcnRcbiAgICAgIHN0YXJ0ID0gMFxuICAgICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbmQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbmNvZGluZyA9IGVuZFxuICAgICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgICB9XG4gICAgaWYgKHZhbC5sZW5ndGggPT09IDEpIHtcbiAgICAgIHZhciBjb2RlID0gdmFsLmNoYXJDb2RlQXQoMClcbiAgICAgIGlmIChjb2RlIDwgMjU2KSB7XG4gICAgICAgIHZhbCA9IGNvZGVcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGVuY29kaW5nICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGVuY29kaW5nICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZW5jb2RpbmcgbXVzdCBiZSBhIHN0cmluZycpXG4gICAgfVxuICAgIGlmICh0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnICYmICFCdWZmZXIuaXNFbmNvZGluZyhlbmNvZGluZykpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICB2YWwgPSB2YWwgJiAyNTVcbiAgfVxuXG4gIC8vIEludmFsaWQgcmFuZ2VzIGFyZSBub3Qgc2V0IHRvIGEgZGVmYXVsdCwgc28gY2FuIHJhbmdlIGNoZWNrIGVhcmx5LlxuICBpZiAoc3RhcnQgPCAwIHx8IHRoaXMubGVuZ3RoIDwgc3RhcnQgfHwgdGhpcy5sZW5ndGggPCBlbmQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignT3V0IG9mIHJhbmdlIGluZGV4JylcbiAgfVxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgc3RhcnQgPSBzdGFydCA+Pj4gMFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IHRoaXMubGVuZ3RoIDogZW5kID4+PiAwXG5cbiAgaWYgKCF2YWwpIHZhbCA9IDBcblxuICB2YXIgaVxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgICB0aGlzW2ldID0gdmFsXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBieXRlcyA9IEJ1ZmZlci5pc0J1ZmZlcih2YWwpXG4gICAgICA/IHZhbFxuICAgICAgOiB1dGY4VG9CeXRlcyhuZXcgQnVmZmVyKHZhbCwgZW5jb2RpbmcpLnRvU3RyaW5nKCkpXG4gICAgdmFyIGxlbiA9IGJ5dGVzLmxlbmd0aFxuICAgIGZvciAoaSA9IDA7IGkgPCBlbmQgLSBzdGFydDsgKytpKSB7XG4gICAgICB0aGlzW2kgKyBzdGFydF0gPSBieXRlc1tpICUgbGVuXVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbi8vIEhFTFBFUiBGVU5DVElPTlNcbi8vID09PT09PT09PT09PT09PT1cblxudmFyIElOVkFMSURfQkFTRTY0X1JFID0gL1teK1xcLzAtOUEtWmEtei1fXS9nXG5cbmZ1bmN0aW9uIGJhc2U2NGNsZWFuIChzdHIpIHtcbiAgLy8gTm9kZSBzdHJpcHMgb3V0IGludmFsaWQgY2hhcmFjdGVycyBsaWtlIFxcbiBhbmQgXFx0IGZyb20gdGhlIHN0cmluZywgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHN0ciA9IHN0cmluZ3RyaW0oc3RyKS5yZXBsYWNlKElOVkFMSURfQkFTRTY0X1JFLCAnJylcbiAgLy8gTm9kZSBjb252ZXJ0cyBzdHJpbmdzIHdpdGggbGVuZ3RoIDwgMiB0byAnJ1xuICBpZiAoc3RyLmxlbmd0aCA8IDIpIHJldHVybiAnJ1xuICAvLyBOb2RlIGFsbG93cyBmb3Igbm9uLXBhZGRlZCBiYXNlNjQgc3RyaW5ncyAobWlzc2luZyB0cmFpbGluZyA9PT0pLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgd2hpbGUgKHN0ci5sZW5ndGggJSA0ICE9PSAwKSB7XG4gICAgc3RyID0gc3RyICsgJz0nXG4gIH1cbiAgcmV0dXJuIHN0clxufVxuXG5mdW5jdGlvbiBzdHJpbmd0cmltIChzdHIpIHtcbiAgaWYgKHN0ci50cmltKSByZXR1cm4gc3RyLnRyaW0oKVxuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKVxufVxuXG5mdW5jdGlvbiB0b0hleCAobikge1xuICBpZiAobiA8IDE2KSByZXR1cm4gJzAnICsgbi50b1N0cmluZygxNilcbiAgcmV0dXJuIG4udG9TdHJpbmcoMTYpXG59XG5cbmZ1bmN0aW9uIHV0ZjhUb0J5dGVzIChzdHJpbmcsIHVuaXRzKSB7XG4gIHVuaXRzID0gdW5pdHMgfHwgSW5maW5pdHlcbiAgdmFyIGNvZGVQb2ludFxuICB2YXIgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aFxuICB2YXIgbGVhZFN1cnJvZ2F0ZSA9IG51bGxcbiAgdmFyIGJ5dGVzID0gW11cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgY29kZVBvaW50ID0gc3RyaW5nLmNoYXJDb2RlQXQoaSlcblxuICAgIC8vIGlzIHN1cnJvZ2F0ZSBjb21wb25lbnRcbiAgICBpZiAoY29kZVBvaW50ID4gMHhEN0ZGICYmIGNvZGVQb2ludCA8IDB4RTAwMCkge1xuICAgICAgLy8gbGFzdCBjaGFyIHdhcyBhIGxlYWRcbiAgICAgIGlmICghbGVhZFN1cnJvZ2F0ZSkge1xuICAgICAgICAvLyBubyBsZWFkIHlldFxuICAgICAgICBpZiAoY29kZVBvaW50ID4gMHhEQkZGKSB7XG4gICAgICAgICAgLy8gdW5leHBlY3RlZCB0cmFpbFxuICAgICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH0gZWxzZSBpZiAoaSArIDEgPT09IGxlbmd0aCkge1xuICAgICAgICAgIC8vIHVucGFpcmVkIGxlYWRcbiAgICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdmFsaWQgbGVhZFxuICAgICAgICBsZWFkU3Vycm9nYXRlID0gY29kZVBvaW50XG5cbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgLy8gMiBsZWFkcyBpbiBhIHJvd1xuICAgICAgaWYgKGNvZGVQb2ludCA8IDB4REMwMCkge1xuICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgbGVhZFN1cnJvZ2F0ZSA9IGNvZGVQb2ludFxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICAvLyB2YWxpZCBzdXJyb2dhdGUgcGFpclxuICAgICAgY29kZVBvaW50ID0gKGxlYWRTdXJyb2dhdGUgLSAweEQ4MDAgPDwgMTAgfCBjb2RlUG9pbnQgLSAweERDMDApICsgMHgxMDAwMFxuICAgIH0gZWxzZSBpZiAobGVhZFN1cnJvZ2F0ZSkge1xuICAgICAgLy8gdmFsaWQgYm1wIGNoYXIsIGJ1dCBsYXN0IGNoYXIgd2FzIGEgbGVhZFxuICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgfVxuXG4gICAgbGVhZFN1cnJvZ2F0ZSA9IG51bGxcblxuICAgIC8vIGVuY29kZSB1dGY4XG4gICAgaWYgKGNvZGVQb2ludCA8IDB4ODApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMSkgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChjb2RlUG9pbnQpXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDgwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAyKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2IHwgMHhDMCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4MTAwMDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMykgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4QyB8IDB4RTAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4MTEwMDAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDQpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDEyIHwgMHhGMCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4QyAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2ICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjb2RlIHBvaW50JylcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnl0ZXNcbn1cblxuZnVuY3Rpb24gYXNjaWlUb0J5dGVzIChzdHIpIHtcbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgLy8gTm9kZSdzIGNvZGUgc2VlbXMgdG8gYmUgZG9pbmcgdGhpcyBhbmQgbm90ICYgMHg3Ri4uXG4gICAgYnl0ZUFycmF5LnB1c2goc3RyLmNoYXJDb2RlQXQoaSkgJiAweEZGKVxuICB9XG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVRvQnl0ZXMgKHN0ciwgdW5pdHMpIHtcbiAgdmFyIGMsIGhpLCBsb1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcblxuICAgIGMgPSBzdHIuY2hhckNvZGVBdChpKVxuICAgIGhpID0gYyA+PiA4XG4gICAgbG8gPSBjICUgMjU2XG4gICAgYnl0ZUFycmF5LnB1c2gobG8pXG4gICAgYnl0ZUFycmF5LnB1c2goaGkpXG4gIH1cblxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFRvQnl0ZXMgKHN0cikge1xuICByZXR1cm4gYmFzZTY0LnRvQnl0ZUFycmF5KGJhc2U2NGNsZWFuKHN0cikpXG59XG5cbmZ1bmN0aW9uIGJsaXRCdWZmZXIgKHNyYywgZHN0LCBvZmZzZXQsIGxlbmd0aCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgaWYgKChpICsgb2Zmc2V0ID49IGRzdC5sZW5ndGgpIHx8IChpID49IHNyYy5sZW5ndGgpKSBicmVha1xuICAgIGRzdFtpICsgb2Zmc2V0XSA9IHNyY1tpXVxuICB9XG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIGlzbmFuICh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gdmFsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2VsZi1jb21wYXJlXG59XG4iLCIndXNlIHN0cmljdCdcblxuZXhwb3J0cy50b0J5dGVBcnJheSA9IHRvQnl0ZUFycmF5XG5leHBvcnRzLmZyb21CeXRlQXJyYXkgPSBmcm9tQnl0ZUFycmF5XG5cbnZhciBsb29rdXAgPSBbXVxudmFyIHJldkxvb2t1cCA9IFtdXG52YXIgQXJyID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnID8gVWludDhBcnJheSA6IEFycmF5XG5cbmZ1bmN0aW9uIGluaXQgKCkge1xuICB2YXIgY29kZSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJ1xuICBmb3IgKHZhciBpID0gMCwgbGVuID0gY29kZS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgIGxvb2t1cFtpXSA9IGNvZGVbaV1cbiAgICByZXZMb29rdXBbY29kZS5jaGFyQ29kZUF0KGkpXSA9IGlcbiAgfVxuXG4gIHJldkxvb2t1cFsnLScuY2hhckNvZGVBdCgwKV0gPSA2MlxuICByZXZMb29rdXBbJ18nLmNoYXJDb2RlQXQoMCldID0gNjNcbn1cblxuaW5pdCgpXG5cbmZ1bmN0aW9uIHRvQnl0ZUFycmF5IChiNjQpIHtcbiAgdmFyIGksIGosIGwsIHRtcCwgcGxhY2VIb2xkZXJzLCBhcnJcbiAgdmFyIGxlbiA9IGI2NC5sZW5ndGhcblxuICBpZiAobGVuICUgNCA+IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQnKVxuICB9XG5cbiAgLy8gdGhlIG51bWJlciBvZiBlcXVhbCBzaWducyAocGxhY2UgaG9sZGVycylcbiAgLy8gaWYgdGhlcmUgYXJlIHR3byBwbGFjZWhvbGRlcnMsIHRoYW4gdGhlIHR3byBjaGFyYWN0ZXJzIGJlZm9yZSBpdFxuICAvLyByZXByZXNlbnQgb25lIGJ5dGVcbiAgLy8gaWYgdGhlcmUgaXMgb25seSBvbmUsIHRoZW4gdGhlIHRocmVlIGNoYXJhY3RlcnMgYmVmb3JlIGl0IHJlcHJlc2VudCAyIGJ5dGVzXG4gIC8vIHRoaXMgaXMganVzdCBhIGNoZWFwIGhhY2sgdG8gbm90IGRvIGluZGV4T2YgdHdpY2VcbiAgcGxhY2VIb2xkZXJzID0gYjY0W2xlbiAtIDJdID09PSAnPScgPyAyIDogYjY0W2xlbiAtIDFdID09PSAnPScgPyAxIDogMFxuXG4gIC8vIGJhc2U2NCBpcyA0LzMgKyB1cCB0byB0d28gY2hhcmFjdGVycyBvZiB0aGUgb3JpZ2luYWwgZGF0YVxuICBhcnIgPSBuZXcgQXJyKGxlbiAqIDMgLyA0IC0gcGxhY2VIb2xkZXJzKVxuXG4gIC8vIGlmIHRoZXJlIGFyZSBwbGFjZWhvbGRlcnMsIG9ubHkgZ2V0IHVwIHRvIHRoZSBsYXN0IGNvbXBsZXRlIDQgY2hhcnNcbiAgbCA9IHBsYWNlSG9sZGVycyA+IDAgPyBsZW4gLSA0IDogbGVuXG5cbiAgdmFyIEwgPSAwXG5cbiAgZm9yIChpID0gMCwgaiA9IDA7IGkgPCBsOyBpICs9IDQsIGogKz0gMykge1xuICAgIHRtcCA9IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDE4KSB8IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCAxMikgfCAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPDwgNikgfCByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDMpXVxuICAgIGFycltMKytdID0gKHRtcCA+PiAxNikgJiAweEZGXG4gICAgYXJyW0wrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltMKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVycyA9PT0gMikge1xuICAgIHRtcCA9IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDIpIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldID4+IDQpXG4gICAgYXJyW0wrK10gPSB0bXAgJiAweEZGXG4gIH0gZWxzZSBpZiAocGxhY2VIb2xkZXJzID09PSAxKSB7XG4gICAgdG1wID0gKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTApIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDQpIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildID4+IDIpXG4gICAgYXJyW0wrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltMKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiB0cmlwbGV0VG9CYXNlNjQgKG51bSkge1xuICByZXR1cm4gbG9va3VwW251bSA+PiAxOCAmIDB4M0ZdICsgbG9va3VwW251bSA+PiAxMiAmIDB4M0ZdICsgbG9va3VwW251bSA+PiA2ICYgMHgzRl0gKyBsb29rdXBbbnVtICYgMHgzRl1cbn1cblxuZnVuY3Rpb24gZW5jb2RlQ2h1bmsgKHVpbnQ4LCBzdGFydCwgZW5kKSB7XG4gIHZhciB0bXBcbiAgdmFyIG91dHB1dCA9IFtdXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSAzKSB7XG4gICAgdG1wID0gKHVpbnQ4W2ldIDw8IDE2KSArICh1aW50OFtpICsgMV0gPDwgOCkgKyAodWludDhbaSArIDJdKVxuICAgIG91dHB1dC5wdXNoKHRyaXBsZXRUb0Jhc2U2NCh0bXApKVxuICB9XG4gIHJldHVybiBvdXRwdXQuam9pbignJylcbn1cblxuZnVuY3Rpb24gZnJvbUJ5dGVBcnJheSAodWludDgpIHtcbiAgdmFyIHRtcFxuICB2YXIgbGVuID0gdWludDgubGVuZ3RoXG4gIHZhciBleHRyYUJ5dGVzID0gbGVuICUgMyAvLyBpZiB3ZSBoYXZlIDEgYnl0ZSBsZWZ0LCBwYWQgMiBieXRlc1xuICB2YXIgb3V0cHV0ID0gJydcbiAgdmFyIHBhcnRzID0gW11cbiAgdmFyIG1heENodW5rTGVuZ3RoID0gMTYzODMgLy8gbXVzdCBiZSBtdWx0aXBsZSBvZiAzXG5cbiAgLy8gZ28gdGhyb3VnaCB0aGUgYXJyYXkgZXZlcnkgdGhyZWUgYnl0ZXMsIHdlJ2xsIGRlYWwgd2l0aCB0cmFpbGluZyBzdHVmZiBsYXRlclxuICBmb3IgKHZhciBpID0gMCwgbGVuMiA9IGxlbiAtIGV4dHJhQnl0ZXM7IGkgPCBsZW4yOyBpICs9IG1heENodW5rTGVuZ3RoKSB7XG4gICAgcGFydHMucHVzaChlbmNvZGVDaHVuayh1aW50OCwgaSwgKGkgKyBtYXhDaHVua0xlbmd0aCkgPiBsZW4yID8gbGVuMiA6IChpICsgbWF4Q2h1bmtMZW5ndGgpKSlcbiAgfVxuXG4gIC8vIHBhZCB0aGUgZW5kIHdpdGggemVyb3MsIGJ1dCBtYWtlIHN1cmUgdG8gbm90IGZvcmdldCB0aGUgZXh0cmEgYnl0ZXNcbiAgaWYgKGV4dHJhQnl0ZXMgPT09IDEpIHtcbiAgICB0bXAgPSB1aW50OFtsZW4gLSAxXVxuICAgIG91dHB1dCArPSBsb29rdXBbdG1wID4+IDJdXG4gICAgb3V0cHV0ICs9IGxvb2t1cFsodG1wIDw8IDQpICYgMHgzRl1cbiAgICBvdXRwdXQgKz0gJz09J1xuICB9IGVsc2UgaWYgKGV4dHJhQnl0ZXMgPT09IDIpIHtcbiAgICB0bXAgPSAodWludDhbbGVuIC0gMl0gPDwgOCkgKyAodWludDhbbGVuIC0gMV0pXG4gICAgb3V0cHV0ICs9IGxvb2t1cFt0bXAgPj4gMTBdXG4gICAgb3V0cHV0ICs9IGxvb2t1cFsodG1wID4+IDQpICYgMHgzRl1cbiAgICBvdXRwdXQgKz0gbG9va3VwWyh0bXAgPDwgMikgJiAweDNGXVxuICAgIG91dHB1dCArPSAnPSdcbiAgfVxuXG4gIHBhcnRzLnB1c2gob3V0cHV0KVxuXG4gIHJldHVybiBwYXJ0cy5qb2luKCcnKVxufVxuIiwiZXhwb3J0cy5yZWFkID0gZnVuY3Rpb24gKGJ1ZmZlciwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG1cbiAgdmFyIGVMZW4gPSBuQnl0ZXMgKiA4IC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBuQml0cyA9IC03XG4gIHZhciBpID0gaXNMRSA/IChuQnl0ZXMgLSAxKSA6IDBcbiAgdmFyIGQgPSBpc0xFID8gLTEgOiAxXG4gIHZhciBzID0gYnVmZmVyW29mZnNldCArIGldXG5cbiAgaSArPSBkXG5cbiAgZSA9IHMgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgcyA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gZUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBlID0gZSAqIDI1NiArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIG0gPSBlICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpXG4gIGUgPj49ICgtbkJpdHMpXG4gIG5CaXRzICs9IG1MZW5cbiAgZm9yICg7IG5CaXRzID4gMDsgbSA9IG0gKiAyNTYgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBpZiAoZSA9PT0gMCkge1xuICAgIGUgPSAxIC0gZUJpYXNcbiAgfSBlbHNlIGlmIChlID09PSBlTWF4KSB7XG4gICAgcmV0dXJuIG0gPyBOYU4gOiAoKHMgPyAtMSA6IDEpICogSW5maW5pdHkpXG4gIH0gZWxzZSB7XG4gICAgbSA9IG0gKyBNYXRoLnBvdygyLCBtTGVuKVxuICAgIGUgPSBlIC0gZUJpYXNcbiAgfVxuICByZXR1cm4gKHMgPyAtMSA6IDEpICogbSAqIE1hdGgucG93KDIsIGUgLSBtTGVuKVxufVxuXG5leHBvcnRzLndyaXRlID0gZnVuY3Rpb24gKGJ1ZmZlciwgdmFsdWUsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtLCBjXG4gIHZhciBlTGVuID0gbkJ5dGVzICogOCAtIG1MZW4gLSAxXG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxXG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMVxuICB2YXIgcnQgPSAobUxlbiA9PT0gMjMgPyBNYXRoLnBvdygyLCAtMjQpIC0gTWF0aC5wb3coMiwgLTc3KSA6IDApXG4gIHZhciBpID0gaXNMRSA/IDAgOiAobkJ5dGVzIC0gMSlcbiAgdmFyIGQgPSBpc0xFID8gMSA6IC0xXG4gIHZhciBzID0gdmFsdWUgPCAwIHx8ICh2YWx1ZSA9PT0gMCAmJiAxIC8gdmFsdWUgPCAwKSA/IDEgOiAwXG5cbiAgdmFsdWUgPSBNYXRoLmFicyh2YWx1ZSlcblxuICBpZiAoaXNOYU4odmFsdWUpIHx8IHZhbHVlID09PSBJbmZpbml0eSkge1xuICAgIG0gPSBpc05hTih2YWx1ZSkgPyAxIDogMFxuICAgIGUgPSBlTWF4XG4gIH0gZWxzZSB7XG4gICAgZSA9IE1hdGguZmxvb3IoTWF0aC5sb2codmFsdWUpIC8gTWF0aC5MTjIpXG4gICAgaWYgKHZhbHVlICogKGMgPSBNYXRoLnBvdygyLCAtZSkpIDwgMSkge1xuICAgICAgZS0tXG4gICAgICBjICo9IDJcbiAgICB9XG4gICAgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICB2YWx1ZSArPSBydCAvIGNcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgKz0gcnQgKiBNYXRoLnBvdygyLCAxIC0gZUJpYXMpXG4gICAgfVxuICAgIGlmICh2YWx1ZSAqIGMgPj0gMikge1xuICAgICAgZSsrXG4gICAgICBjIC89IDJcbiAgICB9XG5cbiAgICBpZiAoZSArIGVCaWFzID49IGVNYXgpIHtcbiAgICAgIG0gPSAwXG4gICAgICBlID0gZU1heFxuICAgIH0gZWxzZSBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIG0gPSAodmFsdWUgKiBjIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKVxuICAgICAgZSA9IGUgKyBlQmlhc1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gdmFsdWUgKiBNYXRoLnBvdygyLCBlQmlhcyAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSAwXG4gICAgfVxuICB9XG5cbiAgZm9yICg7IG1MZW4gPj0gODsgYnVmZmVyW29mZnNldCArIGldID0gbSAmIDB4ZmYsIGkgKz0gZCwgbSAvPSAyNTYsIG1MZW4gLT0gOCkge31cblxuICBlID0gKGUgPDwgbUxlbikgfCBtXG4gIGVMZW4gKz0gbUxlblxuICBmb3IgKDsgZUxlbiA+IDA7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IGUgJiAweGZmLCBpICs9IGQsIGUgLz0gMjU2LCBlTGVuIC09IDgpIHt9XG5cbiAgYnVmZmVyW29mZnNldCArIGkgLSBkXSB8PSBzICogMTI4XG59XG4iLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChhcnIpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoYXJyKSA9PSAnW29iamVjdCBBcnJheV0nO1xufTtcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIHRoaXMuX2V2ZW50cyA9IHRoaXMuX2V2ZW50cyB8fCB7fTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxuRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24obikge1xuICBpZiAoIWlzTnVtYmVyKG4pIHx8IG4gPCAwIHx8IGlzTmFOKG4pKVxuICAgIHRocm93IFR5cGVFcnJvcignbiBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyJyk7XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgZXIsIGhhbmRsZXIsIGxlbiwgYXJncywgaSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKHR5cGUgPT09ICdlcnJvcicpIHtcbiAgICBpZiAoIXRoaXMuX2V2ZW50cy5lcnJvciB8fFxuICAgICAgICAoaXNPYmplY3QodGhpcy5fZXZlbnRzLmVycm9yKSAmJiAhdGhpcy5fZXZlbnRzLmVycm9yLmxlbmd0aCkpIHtcbiAgICAgIGVyID0gYXJndW1lbnRzWzFdO1xuICAgICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1VuY2F1Z2h0LCB1bnNwZWNpZmllZCBcImVycm9yXCIgZXZlbnQuICgnICsgZXIgKyAnKScpO1xuICAgICAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNVbmRlZmluZWQoaGFuZGxlcikpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAvLyBmYXN0IGNhc2VzXG4gICAgICBjYXNlIDE6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBzbG93ZXJcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICBoYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc09iamVjdChoYW5kbGVyKSkge1xuICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgIGxpc3RlbmVycyA9IGhhbmRsZXIuc2xpY2UoKTtcbiAgICBsZW4gPSBsaXN0ZW5lcnMubGVuZ3RoO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKylcbiAgICAgIGxpc3RlbmVyc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBtO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gIGlmICh0aGlzLl9ldmVudHMubmV3TGlzdGVuZXIpXG4gICAgdGhpcy5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgIGlzRnVuY3Rpb24obGlzdGVuZXIubGlzdGVuZXIpID9cbiAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gIGVsc2UgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcbiAgZWxzZVxuICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IFt0aGlzLl9ldmVudHNbdHlwZV0sIGxpc3RlbmVyXTtcblxuICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSAmJiAhdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCkge1xuICAgIGlmICghaXNVbmRlZmluZWQodGhpcy5fbWF4TGlzdGVuZXJzKSkge1xuICAgICAgbSA9IHRoaXMuX21heExpc3RlbmVycztcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICAgIH1cblxuICAgIGlmIChtICYmIG0gPiAwICYmIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGggPiBtKSB7XG4gICAgICB0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkID0gdHJ1ZTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJyhub2RlKSB3YXJuaW5nOiBwb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5ICcgK1xuICAgICAgICAgICAgICAgICAgICAnbGVhayBkZXRlY3RlZC4gJWQgbGlzdGVuZXJzIGFkZGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1VzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0LicsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGgpO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLnRyYWNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIG5vdCBzdXBwb3J0ZWQgaW4gSUUgMTBcbiAgICAgICAgY29uc29sZS50cmFjZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICB2YXIgZmlyZWQgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBnKCkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgZyk7XG5cbiAgICBpZiAoIWZpcmVkKSB7XG4gICAgICBmaXJlZCA9IHRydWU7XG4gICAgICBsaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxuXG4gIGcubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgdGhpcy5vbih0eXBlLCBnKTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIGVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZmYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIGxpc3QsIHBvc2l0aW9uLCBsZW5ndGgsIGk7XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgbGlzdCA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgbGVuZ3RoID0gbGlzdC5sZW5ndGg7XG4gIHBvc2l0aW9uID0gLTE7XG5cbiAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8XG4gICAgICAoaXNGdW5jdGlvbihsaXN0Lmxpc3RlbmVyKSAmJiBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuXG4gIH0gZWxzZSBpZiAoaXNPYmplY3QobGlzdCkpIHtcbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSA+IDA7KSB7XG4gICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHxcbiAgICAgICAgICAobGlzdFtpXS5saXN0ZW5lciAmJiBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgIGxpc3QubGVuZ3RoID0gMDtcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3Quc3BsaWNlKHBvc2l0aW9uLCAxKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBrZXksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICByZXR1cm4gdGhpcztcblxuICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gIGlmICghdGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICBlbHNlIGlmICh0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgZm9yIChrZXkgaW4gdGhpcy5fZXZlbnRzKSB7XG4gICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgfVxuICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGxpc3RlbmVycykpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gIH0gZWxzZSBpZiAobGlzdGVuZXJzKSB7XG4gICAgLy8gTElGTyBvcmRlclxuICAgIHdoaWxlIChsaXN0ZW5lcnMubGVuZ3RoKVxuICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbbGlzdGVuZXJzLmxlbmd0aCAtIDFdKTtcbiAgfVxuICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciByZXQ7XG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0ID0gW107XG4gIGVsc2UgaWYgKGlzRnVuY3Rpb24odGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICByZXQgPSBbdGhpcy5fZXZlbnRzW3R5cGVdXTtcbiAgZWxzZVxuICAgIHJldCA9IHRoaXMuX2V2ZW50c1t0eXBlXS5zbGljZSgpO1xuICByZXR1cm4gcmV0O1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24odHlwZSkge1xuICBpZiAodGhpcy5fZXZlbnRzKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgICBpZiAoaXNGdW5jdGlvbihldmxpc3RlbmVyKSlcbiAgICAgIHJldHVybiAxO1xuICAgIGVsc2UgaWYgKGV2bGlzdGVuZXIpXG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gIH1cbiAgcmV0dXJuIDA7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbn07XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IHZvaWQgMDtcbn1cbiIsInZhciB4aHIgPSByZXF1aXJlKCd4aHInKVxudmFyIG5vb3AgPSBmdW5jdGlvbigpe31cbnZhciBwYXJzZUFTQ0lJID0gcmVxdWlyZSgncGFyc2UtYm1mb250LWFzY2lpJylcbnZhciBwYXJzZVhNTCA9IHJlcXVpcmUoJ3BhcnNlLWJtZm9udC14bWwnKVxudmFyIHJlYWRCaW5hcnkgPSByZXF1aXJlKCdwYXJzZS1ibWZvbnQtYmluYXJ5JylcbnZhciBpc0JpbmFyeUZvcm1hdCA9IHJlcXVpcmUoJy4vbGliL2lzLWJpbmFyeScpXG52YXIgeHRlbmQgPSByZXF1aXJlKCd4dGVuZCcpXG5cbnZhciB4bWwyID0gKGZ1bmN0aW9uIGhhc1hNTDIoKSB7XG4gIHJldHVybiB3aW5kb3cuWE1MSHR0cFJlcXVlc3QgJiYgXCJ3aXRoQ3JlZGVudGlhbHNcIiBpbiBuZXcgWE1MSHR0cFJlcXVlc3Rcbn0pKClcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvcHQsIGNiKSB7XG4gIGNiID0gdHlwZW9mIGNiID09PSAnZnVuY3Rpb24nID8gY2IgOiBub29wXG5cbiAgaWYgKHR5cGVvZiBvcHQgPT09ICdzdHJpbmcnKVxuICAgIG9wdCA9IHsgdXJpOiBvcHQgfVxuICBlbHNlIGlmICghb3B0KVxuICAgIG9wdCA9IHt9XG5cbiAgdmFyIGV4cGVjdEJpbmFyeSA9IG9wdC5iaW5hcnlcbiAgaWYgKGV4cGVjdEJpbmFyeSlcbiAgICBvcHQgPSBnZXRCaW5hcnlPcHRzKG9wdClcblxuICB4aHIob3B0LCBmdW5jdGlvbihlcnIsIHJlcywgYm9keSkge1xuICAgIGlmIChlcnIpXG4gICAgICByZXR1cm4gY2IoZXJyKVxuICAgIGlmICghL14yLy50ZXN0KHJlcy5zdGF0dXNDb2RlKSlcbiAgICAgIHJldHVybiBjYihuZXcgRXJyb3IoJ2h0dHAgc3RhdHVzIGNvZGU6ICcrcmVzLnN0YXR1c0NvZGUpKVxuICAgIGlmICghYm9keSlcbiAgICAgIHJldHVybiBjYihuZXcgRXJyb3IoJ25vIGJvZHkgcmVzdWx0JykpXG5cbiAgICB2YXIgYmluYXJ5ID0gZmFsc2UgXG5cbiAgICAvL2lmIHRoZSByZXNwb25zZSB0eXBlIGlzIGFuIGFycmF5IGJ1ZmZlcixcbiAgICAvL3dlIG5lZWQgdG8gY29udmVydCBpdCBpbnRvIGEgcmVndWxhciBCdWZmZXIgb2JqZWN0XG4gICAgaWYgKGlzQXJyYXlCdWZmZXIoYm9keSkpIHtcbiAgICAgIHZhciBhcnJheSA9IG5ldyBVaW50OEFycmF5KGJvZHkpXG4gICAgICBib2R5ID0gbmV3IEJ1ZmZlcihhcnJheSwgJ2JpbmFyeScpXG4gICAgfVxuXG4gICAgLy9ub3cgY2hlY2sgdGhlIHN0cmluZy9CdWZmZXIgcmVzcG9uc2VcbiAgICAvL2FuZCBzZWUgaWYgaXQgaGFzIGEgYmluYXJ5IEJNRiBoZWFkZXJcbiAgICBpZiAoaXNCaW5hcnlGb3JtYXQoYm9keSkpIHtcbiAgICAgIGJpbmFyeSA9IHRydWVcbiAgICAgIC8vaWYgd2UgaGF2ZSBhIHN0cmluZywgdHVybiBpdCBpbnRvIGEgQnVmZmVyXG4gICAgICBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSBcbiAgICAgICAgYm9keSA9IG5ldyBCdWZmZXIoYm9keSwgJ2JpbmFyeScpXG4gICAgfSBcblxuICAgIC8vd2UgYXJlIG5vdCBwYXJzaW5nIGEgYmluYXJ5IGZvcm1hdCwganVzdCBBU0NJSS9YTUwvZXRjXG4gICAgaWYgKCFiaW5hcnkpIHtcbiAgICAgIC8vbWlnaHQgc3RpbGwgYmUgYSBidWZmZXIgaWYgcmVzcG9uc2VUeXBlIGlzICdhcnJheWJ1ZmZlcidcbiAgICAgIGlmIChCdWZmZXIuaXNCdWZmZXIoYm9keSkpXG4gICAgICAgIGJvZHkgPSBib2R5LnRvU3RyaW5nKG9wdC5lbmNvZGluZylcbiAgICAgIGJvZHkgPSBib2R5LnRyaW0oKVxuICAgIH1cblxuICAgIHZhciByZXN1bHRcbiAgICB0cnkge1xuICAgICAgdmFyIHR5cGUgPSByZXMuaGVhZGVyc1snY29udGVudC10eXBlJ11cbiAgICAgIGlmIChiaW5hcnkpXG4gICAgICAgIHJlc3VsdCA9IHJlYWRCaW5hcnkoYm9keSlcbiAgICAgIGVsc2UgaWYgKC9qc29uLy50ZXN0KHR5cGUpIHx8IGJvZHkuY2hhckF0KDApID09PSAneycpXG4gICAgICAgIHJlc3VsdCA9IEpTT04ucGFyc2UoYm9keSlcbiAgICAgIGVsc2UgaWYgKC94bWwvLnRlc3QodHlwZSkgIHx8IGJvZHkuY2hhckF0KDApID09PSAnPCcpXG4gICAgICAgIHJlc3VsdCA9IHBhcnNlWE1MKGJvZHkpXG4gICAgICBlbHNlXG4gICAgICAgIHJlc3VsdCA9IHBhcnNlQVNDSUkoYm9keSlcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjYihuZXcgRXJyb3IoJ2Vycm9yIHBhcnNpbmcgZm9udCAnK2UubWVzc2FnZSkpXG4gICAgICBjYiA9IG5vb3BcbiAgICB9XG4gICAgY2IobnVsbCwgcmVzdWx0KVxuICB9KVxufVxuXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyKGFycikge1xuICB2YXIgc3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ1xuICByZXR1cm4gc3RyLmNhbGwoYXJyKSA9PT0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJ1xufVxuXG5mdW5jdGlvbiBnZXRCaW5hcnlPcHRzKG9wdCkge1xuICAvL0lFMTArIGFuZCBvdGhlciBtb2Rlcm4gYnJvd3NlcnMgc3VwcG9ydCBhcnJheSBidWZmZXJzXG4gIGlmICh4bWwyKVxuICAgIHJldHVybiB4dGVuZChvcHQsIHsgcmVzcG9uc2VUeXBlOiAnYXJyYXlidWZmZXInIH0pXG4gIFxuICBpZiAodHlwZW9mIHdpbmRvdy5YTUxIdHRwUmVxdWVzdCA9PT0gJ3VuZGVmaW5lZCcpXG4gICAgdGhyb3cgbmV3IEVycm9yKCd5b3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBYSFIgbG9hZGluZycpXG5cbiAgLy9JRTkgYW5kIFhNTDEgYnJvd3NlcnMgY291bGQgc3RpbGwgdXNlIGFuIG92ZXJyaWRlXG4gIHZhciByZXEgPSBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0KClcbiAgcmVxLm92ZXJyaWRlTWltZVR5cGUoJ3RleHQvcGxhaW47IGNoYXJzZXQ9eC11c2VyLWRlZmluZWQnKVxuICByZXR1cm4geHRlbmQoe1xuICAgIHhocjogcmVxXG4gIH0sIG9wdClcbn0iLCJ2YXIgZXF1YWwgPSByZXF1aXJlKCdidWZmZXItZXF1YWwnKVxudmFyIEhFQURFUiA9IG5ldyBCdWZmZXIoWzY2LCA3NywgNzAsIDNdKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJ1Zikge1xuICBpZiAodHlwZW9mIGJ1ZiA9PT0gJ3N0cmluZycpXG4gICAgcmV0dXJuIGJ1Zi5zdWJzdHJpbmcoMCwgMykgPT09ICdCTUYnXG4gIHJldHVybiBidWYubGVuZ3RoID4gNCAmJiBlcXVhbChidWYuc2xpY2UoMCwgNCksIEhFQURFUilcbn0iLCJ2YXIgQnVmZmVyID0gcmVxdWlyZSgnYnVmZmVyJykuQnVmZmVyOyAvLyBmb3IgdXNlIHdpdGggYnJvd3NlcmlmeVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYSkpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYikpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgaWYgKHR5cGVvZiBhLmVxdWFscyA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIGEuZXF1YWxzKGIpO1xuICAgIGlmIChhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICBcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGFbaV0gIT09IGJbaV0pIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHRydWU7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZUJNRm9udEFzY2lpKGRhdGEpIHtcbiAgaWYgKCFkYXRhKVxuICAgIHRocm93IG5ldyBFcnJvcignbm8gZGF0YSBwcm92aWRlZCcpXG4gIGRhdGEgPSBkYXRhLnRvU3RyaW5nKCkudHJpbSgpXG5cbiAgdmFyIG91dHB1dCA9IHtcbiAgICBwYWdlczogW10sXG4gICAgY2hhcnM6IFtdLFxuICAgIGtlcm5pbmdzOiBbXVxuICB9XG5cbiAgdmFyIGxpbmVzID0gZGF0YS5zcGxpdCgvXFxyXFxuP3xcXG4vZylcblxuICBpZiAobGluZXMubGVuZ3RoID09PSAwKVxuICAgIHRocm93IG5ldyBFcnJvcignbm8gZGF0YSBpbiBCTUZvbnQgZmlsZScpXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBsaW5lRGF0YSA9IHNwbGl0TGluZShsaW5lc1tpXSwgaSlcbiAgICBpZiAoIWxpbmVEYXRhKSAvL3NraXAgZW1wdHkgbGluZXNcbiAgICAgIGNvbnRpbnVlXG5cbiAgICBpZiAobGluZURhdGEua2V5ID09PSAncGFnZScpIHtcbiAgICAgIGlmICh0eXBlb2YgbGluZURhdGEuZGF0YS5pZCAhPT0gJ251bWJlcicpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignbWFsZm9ybWVkIGZpbGUgYXQgbGluZSAnICsgaSArICcgLS0gbmVlZHMgcGFnZSBpZD1OJylcbiAgICAgIGlmICh0eXBlb2YgbGluZURhdGEuZGF0YS5maWxlICE9PSAnc3RyaW5nJylcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdtYWxmb3JtZWQgZmlsZSBhdCBsaW5lICcgKyBpICsgJyAtLSBuZWVkcyBwYWdlIGZpbGU9XCJwYXRoXCInKVxuICAgICAgb3V0cHV0LnBhZ2VzW2xpbmVEYXRhLmRhdGEuaWRdID0gbGluZURhdGEuZGF0YS5maWxlXG4gICAgfSBlbHNlIGlmIChsaW5lRGF0YS5rZXkgPT09ICdjaGFycycgfHwgbGluZURhdGEua2V5ID09PSAna2VybmluZ3MnKSB7XG4gICAgICAvLy4uLiBkbyBub3RoaW5nIGZvciB0aGVzZSB0d28gLi4uXG4gICAgfSBlbHNlIGlmIChsaW5lRGF0YS5rZXkgPT09ICdjaGFyJykge1xuICAgICAgb3V0cHV0LmNoYXJzLnB1c2gobGluZURhdGEuZGF0YSlcbiAgICB9IGVsc2UgaWYgKGxpbmVEYXRhLmtleSA9PT0gJ2tlcm5pbmcnKSB7XG4gICAgICBvdXRwdXQua2VybmluZ3MucHVzaChsaW5lRGF0YS5kYXRhKVxuICAgIH0gZWxzZSB7XG4gICAgICBvdXRwdXRbbGluZURhdGEua2V5XSA9IGxpbmVEYXRhLmRhdGFcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb3V0cHV0XG59XG5cbmZ1bmN0aW9uIHNwbGl0TGluZShsaW5lLCBpZHgpIHtcbiAgbGluZSA9IGxpbmUucmVwbGFjZSgvXFx0Ky9nLCAnICcpLnRyaW0oKVxuICBpZiAoIWxpbmUpXG4gICAgcmV0dXJuIG51bGxcblxuICB2YXIgc3BhY2UgPSBsaW5lLmluZGV4T2YoJyAnKVxuICBpZiAoc3BhY2UgPT09IC0xKSBcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJubyBuYW1lZCByb3cgYXQgbGluZSBcIiArIGlkeClcblxuICB2YXIga2V5ID0gbGluZS5zdWJzdHJpbmcoMCwgc3BhY2UpXG5cbiAgbGluZSA9IGxpbmUuc3Vic3RyaW5nKHNwYWNlICsgMSlcbiAgLy9jbGVhciBcImxldHRlclwiIGZpZWxkIGFzIGl0IGlzIG5vbi1zdGFuZGFyZCBhbmRcbiAgLy9yZXF1aXJlcyBhZGRpdGlvbmFsIGNvbXBsZXhpdHkgdG8gcGFyc2UgXCIgLyA9IHN5bWJvbHNcbiAgbGluZSA9IGxpbmUucmVwbGFjZSgvbGV0dGVyPVtcXCdcXFwiXVxcUytbXFwnXFxcIl0vZ2ksICcnKSAgXG4gIGxpbmUgPSBsaW5lLnNwbGl0KFwiPVwiKVxuICBsaW5lID0gbGluZS5tYXAoZnVuY3Rpb24oc3RyKSB7XG4gICAgcmV0dXJuIHN0ci50cmltKCkubWF0Y2goKC8oXCIuKj9cInxbXlwiXFxzXSspKyg/PVxccyp8XFxzKiQpL2cpKVxuICB9KVxuXG4gIHZhciBkYXRhID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGR0ID0gbGluZVtpXVxuICAgIGlmIChpID09PSAwKSB7XG4gICAgICBkYXRhLnB1c2goe1xuICAgICAgICBrZXk6IGR0WzBdLFxuICAgICAgICBkYXRhOiBcIlwiXG4gICAgICB9KVxuICAgIH0gZWxzZSBpZiAoaSA9PT0gbGluZS5sZW5ndGggLSAxKSB7XG4gICAgICBkYXRhW2RhdGEubGVuZ3RoIC0gMV0uZGF0YSA9IHBhcnNlRGF0YShkdFswXSlcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YVtkYXRhLmxlbmd0aCAtIDFdLmRhdGEgPSBwYXJzZURhdGEoZHRbMF0pXG4gICAgICBkYXRhLnB1c2goe1xuICAgICAgICBrZXk6IGR0WzFdLFxuICAgICAgICBkYXRhOiBcIlwiXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHZhciBvdXQgPSB7XG4gICAga2V5OiBrZXksXG4gICAgZGF0YToge31cbiAgfVxuXG4gIGRhdGEuZm9yRWFjaChmdW5jdGlvbih2KSB7XG4gICAgb3V0LmRhdGFbdi5rZXldID0gdi5kYXRhO1xuICB9KVxuXG4gIHJldHVybiBvdXRcbn1cblxuZnVuY3Rpb24gcGFyc2VEYXRhKGRhdGEpIHtcbiAgaWYgKCFkYXRhIHx8IGRhdGEubGVuZ3RoID09PSAwKVxuICAgIHJldHVybiBcIlwiXG5cbiAgaWYgKGRhdGEuaW5kZXhPZignXCInKSA9PT0gMCB8fCBkYXRhLmluZGV4T2YoXCInXCIpID09PSAwKVxuICAgIHJldHVybiBkYXRhLnN1YnN0cmluZygxLCBkYXRhLmxlbmd0aCAtIDEpXG4gIGlmIChkYXRhLmluZGV4T2YoJywnKSAhPT0gLTEpXG4gICAgcmV0dXJuIHBhcnNlSW50TGlzdChkYXRhKVxuICByZXR1cm4gcGFyc2VJbnQoZGF0YSwgMTApXG59XG5cbmZ1bmN0aW9uIHBhcnNlSW50TGlzdChkYXRhKSB7XG4gIHJldHVybiBkYXRhLnNwbGl0KCcsJykubWFwKGZ1bmN0aW9uKHZhbCkge1xuICAgIHJldHVybiBwYXJzZUludCh2YWwsIDEwKVxuICB9KVxufSIsInZhciBIRUFERVIgPSBbNjYsIDc3LCA3MF1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiByZWFkQk1Gb250QmluYXJ5KGJ1Zikge1xuICBpZiAoYnVmLmxlbmd0aCA8IDYpXG4gICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGJ1ZmZlciBsZW5ndGggZm9yIEJNRm9udCcpXG5cbiAgdmFyIGhlYWRlciA9IEhFQURFUi5ldmVyeShmdW5jdGlvbihieXRlLCBpKSB7XG4gICAgcmV0dXJuIGJ1Zi5yZWFkVUludDgoaSkgPT09IGJ5dGVcbiAgfSlcblxuICBpZiAoIWhlYWRlcilcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0JNRm9udCBtaXNzaW5nIEJNRiBieXRlIGhlYWRlcicpXG5cbiAgdmFyIGkgPSAzXG4gIHZhciB2ZXJzID0gYnVmLnJlYWRVSW50OChpKyspXG4gIGlmICh2ZXJzID4gMylcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ09ubHkgc3VwcG9ydHMgQk1Gb250IEJpbmFyeSB2MyAoQk1Gb250IEFwcCB2MS4xMCknKVxuICBcbiAgdmFyIHRhcmdldCA9IHsga2VybmluZ3M6IFtdLCBjaGFyczogW10gfVxuICBmb3IgKHZhciBiPTA7IGI8NTsgYisrKVxuICAgIGkgKz0gcmVhZEJsb2NrKHRhcmdldCwgYnVmLCBpKVxuICByZXR1cm4gdGFyZ2V0XG59XG5cbmZ1bmN0aW9uIHJlYWRCbG9jayh0YXJnZXQsIGJ1ZiwgaSkge1xuICBpZiAoaSA+IGJ1Zi5sZW5ndGgtMSlcbiAgICByZXR1cm4gMFxuXG4gIHZhciBibG9ja0lEID0gYnVmLnJlYWRVSW50OChpKyspXG4gIHZhciBibG9ja1NpemUgPSBidWYucmVhZEludDMyTEUoaSlcbiAgaSArPSA0XG5cbiAgc3dpdGNoKGJsb2NrSUQpIHtcbiAgICBjYXNlIDE6IFxuICAgICAgdGFyZ2V0LmluZm8gPSByZWFkSW5mbyhidWYsIGkpXG4gICAgICBicmVha1xuICAgIGNhc2UgMjpcbiAgICAgIHRhcmdldC5jb21tb24gPSByZWFkQ29tbW9uKGJ1ZiwgaSlcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAzOlxuICAgICAgdGFyZ2V0LnBhZ2VzID0gcmVhZFBhZ2VzKGJ1ZiwgaSwgYmxvY2tTaXplKVxuICAgICAgYnJlYWtcbiAgICBjYXNlIDQ6XG4gICAgICB0YXJnZXQuY2hhcnMgPSByZWFkQ2hhcnMoYnVmLCBpLCBibG9ja1NpemUpXG4gICAgICBicmVha1xuICAgIGNhc2UgNTpcbiAgICAgIHRhcmdldC5rZXJuaW5ncyA9IHJlYWRLZXJuaW5ncyhidWYsIGksIGJsb2NrU2l6ZSlcbiAgICAgIGJyZWFrXG4gIH1cbiAgcmV0dXJuIDUgKyBibG9ja1NpemVcbn1cblxuZnVuY3Rpb24gcmVhZEluZm8oYnVmLCBpKSB7XG4gIHZhciBpbmZvID0ge31cbiAgaW5mby5zaXplID0gYnVmLnJlYWRJbnQxNkxFKGkpXG5cbiAgdmFyIGJpdEZpZWxkID0gYnVmLnJlYWRVSW50OChpKzIpXG4gIGluZm8uc21vb3RoID0gKGJpdEZpZWxkID4+IDcpICYgMVxuICBpbmZvLnVuaWNvZGUgPSAoYml0RmllbGQgPj4gNikgJiAxXG4gIGluZm8uaXRhbGljID0gKGJpdEZpZWxkID4+IDUpICYgMVxuICBpbmZvLmJvbGQgPSAoYml0RmllbGQgPj4gNCkgJiAxXG4gIFxuICAvL2ZpeGVkSGVpZ2h0IGlzIG9ubHkgbWVudGlvbmVkIGluIGJpbmFyeSBzcGVjIFxuICBpZiAoKGJpdEZpZWxkID4+IDMpICYgMSlcbiAgICBpbmZvLmZpeGVkSGVpZ2h0ID0gMVxuICBcbiAgaW5mby5jaGFyc2V0ID0gYnVmLnJlYWRVSW50OChpKzMpIHx8ICcnXG4gIGluZm8uc3RyZXRjaEggPSBidWYucmVhZFVJbnQxNkxFKGkrNClcbiAgaW5mby5hYSA9IGJ1Zi5yZWFkVUludDgoaSs2KVxuICBpbmZvLnBhZGRpbmcgPSBbXG4gICAgYnVmLnJlYWRJbnQ4KGkrNyksXG4gICAgYnVmLnJlYWRJbnQ4KGkrOCksXG4gICAgYnVmLnJlYWRJbnQ4KGkrOSksXG4gICAgYnVmLnJlYWRJbnQ4KGkrMTApXG4gIF1cbiAgaW5mby5zcGFjaW5nID0gW1xuICAgIGJ1Zi5yZWFkSW50OChpKzExKSxcbiAgICBidWYucmVhZEludDgoaSsxMilcbiAgXVxuICBpbmZvLm91dGxpbmUgPSBidWYucmVhZFVJbnQ4KGkrMTMpXG4gIGluZm8uZmFjZSA9IHJlYWRTdHJpbmdOVChidWYsIGkrMTQpXG4gIHJldHVybiBpbmZvXG59XG5cbmZ1bmN0aW9uIHJlYWRDb21tb24oYnVmLCBpKSB7XG4gIHZhciBjb21tb24gPSB7fVxuICBjb21tb24ubGluZUhlaWdodCA9IGJ1Zi5yZWFkVUludDE2TEUoaSlcbiAgY29tbW9uLmJhc2UgPSBidWYucmVhZFVJbnQxNkxFKGkrMilcbiAgY29tbW9uLnNjYWxlVyA9IGJ1Zi5yZWFkVUludDE2TEUoaSs0KVxuICBjb21tb24uc2NhbGVIID0gYnVmLnJlYWRVSW50MTZMRShpKzYpXG4gIGNvbW1vbi5wYWdlcyA9IGJ1Zi5yZWFkVUludDE2TEUoaSs4KVxuICB2YXIgYml0RmllbGQgPSBidWYucmVhZFVJbnQ4KGkrMTApXG4gIGNvbW1vbi5wYWNrZWQgPSAwXG4gIGNvbW1vbi5hbHBoYUNobmwgPSBidWYucmVhZFVJbnQ4KGkrMTEpXG4gIGNvbW1vbi5yZWRDaG5sID0gYnVmLnJlYWRVSW50OChpKzEyKVxuICBjb21tb24uZ3JlZW5DaG5sID0gYnVmLnJlYWRVSW50OChpKzEzKVxuICBjb21tb24uYmx1ZUNobmwgPSBidWYucmVhZFVJbnQ4KGkrMTQpXG4gIHJldHVybiBjb21tb25cbn1cblxuZnVuY3Rpb24gcmVhZFBhZ2VzKGJ1ZiwgaSwgc2l6ZSkge1xuICB2YXIgcGFnZXMgPSBbXVxuICB2YXIgdGV4dCA9IHJlYWROYW1lTlQoYnVmLCBpKVxuICB2YXIgbGVuID0gdGV4dC5sZW5ndGgrMVxuICB2YXIgY291bnQgPSBzaXplIC8gbGVuXG4gIGZvciAodmFyIGM9MDsgYzxjb3VudDsgYysrKSB7XG4gICAgcGFnZXNbY10gPSBidWYuc2xpY2UoaSwgaSt0ZXh0Lmxlbmd0aCkudG9TdHJpbmcoJ3V0ZjgnKVxuICAgIGkgKz0gbGVuXG4gIH1cbiAgcmV0dXJuIHBhZ2VzXG59XG5cbmZ1bmN0aW9uIHJlYWRDaGFycyhidWYsIGksIGJsb2NrU2l6ZSkge1xuICB2YXIgY2hhcnMgPSBbXVxuXG4gIHZhciBjb3VudCA9IGJsb2NrU2l6ZSAvIDIwXG4gIGZvciAodmFyIGM9MDsgYzxjb3VudDsgYysrKSB7XG4gICAgdmFyIGNoYXIgPSB7fVxuICAgIHZhciBvZmYgPSBjKjIwXG4gICAgY2hhci5pZCA9IGJ1Zi5yZWFkVUludDMyTEUoaSArIDAgKyBvZmYpXG4gICAgY2hhci54ID0gYnVmLnJlYWRVSW50MTZMRShpICsgNCArIG9mZilcbiAgICBjaGFyLnkgPSBidWYucmVhZFVJbnQxNkxFKGkgKyA2ICsgb2ZmKVxuICAgIGNoYXIud2lkdGggPSBidWYucmVhZFVJbnQxNkxFKGkgKyA4ICsgb2ZmKVxuICAgIGNoYXIuaGVpZ2h0ID0gYnVmLnJlYWRVSW50MTZMRShpICsgMTAgKyBvZmYpXG4gICAgY2hhci54b2Zmc2V0ID0gYnVmLnJlYWRJbnQxNkxFKGkgKyAxMiArIG9mZilcbiAgICBjaGFyLnlvZmZzZXQgPSBidWYucmVhZEludDE2TEUoaSArIDE0ICsgb2ZmKVxuICAgIGNoYXIueGFkdmFuY2UgPSBidWYucmVhZEludDE2TEUoaSArIDE2ICsgb2ZmKVxuICAgIGNoYXIucGFnZSA9IGJ1Zi5yZWFkVUludDgoaSArIDE4ICsgb2ZmKVxuICAgIGNoYXIuY2hubCA9IGJ1Zi5yZWFkVUludDgoaSArIDE5ICsgb2ZmKVxuICAgIGNoYXJzW2NdID0gY2hhclxuICB9XG4gIHJldHVybiBjaGFyc1xufVxuXG5mdW5jdGlvbiByZWFkS2VybmluZ3MoYnVmLCBpLCBibG9ja1NpemUpIHtcbiAgdmFyIGtlcm5pbmdzID0gW11cbiAgdmFyIGNvdW50ID0gYmxvY2tTaXplIC8gMTBcbiAgZm9yICh2YXIgYz0wOyBjPGNvdW50OyBjKyspIHtcbiAgICB2YXIga2VybiA9IHt9XG4gICAgdmFyIG9mZiA9IGMqMTBcbiAgICBrZXJuLmZpcnN0ID0gYnVmLnJlYWRVSW50MzJMRShpICsgMCArIG9mZilcbiAgICBrZXJuLnNlY29uZCA9IGJ1Zi5yZWFkVUludDMyTEUoaSArIDQgKyBvZmYpXG4gICAga2Vybi5hbW91bnQgPSBidWYucmVhZEludDE2TEUoaSArIDggKyBvZmYpXG4gICAga2VybmluZ3NbY10gPSBrZXJuXG4gIH1cbiAgcmV0dXJuIGtlcm5pbmdzXG59XG5cbmZ1bmN0aW9uIHJlYWROYW1lTlQoYnVmLCBvZmZzZXQpIHtcbiAgdmFyIHBvcz1vZmZzZXRcbiAgZm9yICg7IHBvczxidWYubGVuZ3RoOyBwb3MrKykge1xuICAgIGlmIChidWZbcG9zXSA9PT0gMHgwMCkgXG4gICAgICBicmVha1xuICB9XG4gIHJldHVybiBidWYuc2xpY2Uob2Zmc2V0LCBwb3MpXG59XG5cbmZ1bmN0aW9uIHJlYWRTdHJpbmdOVChidWYsIG9mZnNldCkge1xuICByZXR1cm4gcmVhZE5hbWVOVChidWYsIG9mZnNldCkudG9TdHJpbmcoJ3V0ZjgnKVxufSIsInZhciBwYXJzZUF0dHJpYnV0ZXMgPSByZXF1aXJlKCcuL3BhcnNlLWF0dHJpYnMnKVxudmFyIHBhcnNlRnJvbVN0cmluZyA9IHJlcXVpcmUoJ3htbC1wYXJzZS1mcm9tLXN0cmluZycpXG5cbi8vSW4gc29tZSBjYXNlcyBlbGVtZW50LmF0dHJpYnV0ZS5ub2RlTmFtZSBjYW4gcmV0dXJuXG4vL2FsbCBsb3dlcmNhc2UgdmFsdWVzLi4gc28gd2UgbmVlZCB0byBtYXAgdGhlbSB0byB0aGUgY29ycmVjdCBcbi8vY2FzZVxudmFyIE5BTUVfTUFQID0ge1xuICBzY2FsZWg6ICdzY2FsZUgnLFxuICBzY2FsZXc6ICdzY2FsZVcnLFxuICBzdHJldGNoaDogJ3N0cmV0Y2hIJyxcbiAgbGluZWhlaWdodDogJ2xpbmVIZWlnaHQnLFxuICBhbHBoYWNobmw6ICdhbHBoYUNobmwnLFxuICByZWRjaG5sOiAncmVkQ2hubCcsXG4gIGdyZWVuY2hubDogJ2dyZWVuQ2hubCcsXG4gIGJsdWVjaG5sOiAnYmx1ZUNobmwnXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2UoZGF0YSkge1xuICBkYXRhID0gZGF0YS50b1N0cmluZygpXG4gIFxuICB2YXIgeG1sUm9vdCA9IHBhcnNlRnJvbVN0cmluZyhkYXRhKVxuICB2YXIgb3V0cHV0ID0ge1xuICAgIHBhZ2VzOiBbXSxcbiAgICBjaGFyczogW10sXG4gICAga2VybmluZ3M6IFtdXG4gIH1cblxuICAvL2dldCBjb25maWcgc2V0dGluZ3NcbiAgO1snaW5mbycsICdjb21tb24nXS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgIHZhciBlbGVtZW50ID0geG1sUm9vdC5nZXRFbGVtZW50c0J5VGFnTmFtZShrZXkpWzBdXG4gICAgaWYgKGVsZW1lbnQpXG4gICAgICBvdXRwdXRba2V5XSA9IHBhcnNlQXR0cmlidXRlcyhnZXRBdHRyaWJzKGVsZW1lbnQpKVxuICB9KVxuXG4gIC8vZ2V0IHBhZ2UgaW5mb1xuICB2YXIgcGFnZVJvb3QgPSB4bWxSb290LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdwYWdlcycpWzBdXG4gIGlmICghcGFnZVJvb3QpXG4gICAgdGhyb3cgbmV3IEVycm9yKCdtYWxmb3JtZWQgZmlsZSAtLSBubyA8cGFnZXM+IGVsZW1lbnQnKVxuICB2YXIgcGFnZXMgPSBwYWdlUm9vdC5nZXRFbGVtZW50c0J5VGFnTmFtZSgncGFnZScpXG4gIGZvciAodmFyIGk9MDsgaTxwYWdlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBwID0gcGFnZXNbaV1cbiAgICB2YXIgaWQgPSBwYXJzZUludChwLmdldEF0dHJpYnV0ZSgnaWQnKSwgMTApXG4gICAgdmFyIGZpbGUgPSBwLmdldEF0dHJpYnV0ZSgnZmlsZScpXG4gICAgaWYgKGlzTmFOKGlkKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcignbWFsZm9ybWVkIGZpbGUgLS0gcGFnZSBcImlkXCIgYXR0cmlidXRlIGlzIE5hTicpXG4gICAgaWYgKCFmaWxlKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdtYWxmb3JtZWQgZmlsZSAtLSBuZWVkcyBwYWdlIFwiZmlsZVwiIGF0dHJpYnV0ZScpXG4gICAgb3V0cHV0LnBhZ2VzW3BhcnNlSW50KGlkLCAxMCldID0gZmlsZVxuICB9XG5cbiAgLy9nZXQga2VybmluZ3MgLyBjaGFyc1xuICA7WydjaGFycycsICdrZXJuaW5ncyddLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgdmFyIGVsZW1lbnQgPSB4bWxSb290LmdldEVsZW1lbnRzQnlUYWdOYW1lKGtleSlbMF1cbiAgICBpZiAoIWVsZW1lbnQpXG4gICAgICByZXR1cm5cbiAgICB2YXIgY2hpbGRUYWcgPSBrZXkuc3Vic3RyaW5nKDAsIGtleS5sZW5ndGgtMSlcbiAgICB2YXIgY2hpbGRyZW4gPSBlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKGNoaWxkVGFnKVxuICAgIGZvciAodmFyIGk9MDsgaTxjaGlsZHJlbi5sZW5ndGg7IGkrKykgeyAgICAgIFxuICAgICAgdmFyIGNoaWxkID0gY2hpbGRyZW5baV1cbiAgICAgIG91dHB1dFtrZXldLnB1c2gocGFyc2VBdHRyaWJ1dGVzKGdldEF0dHJpYnMoY2hpbGQpKSlcbiAgICB9XG4gIH0pXG4gIHJldHVybiBvdXRwdXRcbn1cblxuZnVuY3Rpb24gZ2V0QXR0cmlicyhlbGVtZW50KSB7XG4gIHZhciBhdHRyaWJzID0gZ2V0QXR0cmliTGlzdChlbGVtZW50KVxuICByZXR1cm4gYXR0cmlicy5yZWR1Y2UoZnVuY3Rpb24oZGljdCwgYXR0cmliKSB7XG4gICAgdmFyIGtleSA9IG1hcE5hbWUoYXR0cmliLm5vZGVOYW1lKVxuICAgIGRpY3Rba2V5XSA9IGF0dHJpYi5ub2RlVmFsdWVcbiAgICByZXR1cm4gZGljdFxuICB9LCB7fSlcbn1cblxuZnVuY3Rpb24gZ2V0QXR0cmliTGlzdChlbGVtZW50KSB7XG4gIC8vSUU4KyBhbmQgbW9kZXJuIGJyb3dzZXJzXG4gIHZhciBhdHRyaWJzID0gW11cbiAgZm9yICh2YXIgaT0wOyBpPGVsZW1lbnQuYXR0cmlidXRlcy5sZW5ndGg7IGkrKylcbiAgICBhdHRyaWJzLnB1c2goZWxlbWVudC5hdHRyaWJ1dGVzW2ldKVxuICByZXR1cm4gYXR0cmlic1xufVxuXG5mdW5jdGlvbiBtYXBOYW1lKG5vZGVOYW1lKSB7XG4gIHJldHVybiBOQU1FX01BUFtub2RlTmFtZS50b0xvd2VyQ2FzZSgpXSB8fCBub2RlTmFtZVxufSIsIi8vU29tZSB2ZXJzaW9ucyBvZiBHbHlwaERlc2lnbmVyIGhhdmUgYSB0eXBvXG4vL3RoYXQgY2F1c2VzIHNvbWUgYnVncyB3aXRoIHBhcnNpbmcuIFxuLy9OZWVkIHRvIGNvbmZpcm0gd2l0aCByZWNlbnQgdmVyc2lvbiBvZiB0aGUgc29mdHdhcmVcbi8vdG8gc2VlIHdoZXRoZXIgdGhpcyBpcyBzdGlsbCBhbiBpc3N1ZSBvciBub3QuXG52YXIgR0xZUEhfREVTSUdORVJfRVJST1IgPSAnY2hhc3JzZXQnXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VBdHRyaWJ1dGVzKG9iaikge1xuICBpZiAoR0xZUEhfREVTSUdORVJfRVJST1IgaW4gb2JqKSB7XG4gICAgb2JqWydjaGFyc2V0J10gPSBvYmpbR0xZUEhfREVTSUdORVJfRVJST1JdXG4gICAgZGVsZXRlIG9ialtHTFlQSF9ERVNJR05FUl9FUlJPUl1cbiAgfVxuXG4gIGZvciAodmFyIGsgaW4gb2JqKSB7XG4gICAgaWYgKGsgPT09ICdmYWNlJyB8fCBrID09PSAnY2hhcnNldCcpIFxuICAgICAgY29udGludWVcbiAgICBlbHNlIGlmIChrID09PSAncGFkZGluZycgfHwgayA9PT0gJ3NwYWNpbmcnKVxuICAgICAgb2JqW2tdID0gcGFyc2VJbnRMaXN0KG9ialtrXSlcbiAgICBlbHNlXG4gICAgICBvYmpba10gPSBwYXJzZUludChvYmpba10sIDEwKSBcbiAgfVxuICByZXR1cm4gb2JqXG59XG5cbmZ1bmN0aW9uIHBhcnNlSW50TGlzdChkYXRhKSB7XG4gIHJldHVybiBkYXRhLnNwbGl0KCcsJykubWFwKGZ1bmN0aW9uKHZhbCkge1xuICAgIHJldHVybiBwYXJzZUludCh2YWwsIDEwKVxuICB9KVxufSIsIm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uIHhtbHBhcnNlcigpIHtcbiAgLy9jb21tb24gYnJvd3NlcnNcbiAgaWYgKHR5cGVvZiB3aW5kb3cuRE9NUGFyc2VyICE9PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBmdW5jdGlvbihzdHIpIHtcbiAgICAgIHZhciBwYXJzZXIgPSBuZXcgd2luZG93LkRPTVBhcnNlcigpXG4gICAgICByZXR1cm4gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhzdHIsICdhcHBsaWNhdGlvbi94bWwnKVxuICAgIH1cbiAgfSBcblxuICAvL0lFOCBmYWxsYmFja1xuICBpZiAodHlwZW9mIHdpbmRvdy5BY3RpdmVYT2JqZWN0ICE9PSAndW5kZWZpbmVkJ1xuICAgICAgJiYgbmV3IHdpbmRvdy5BY3RpdmVYT2JqZWN0KCdNaWNyb3NvZnQuWE1MRE9NJykpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oc3RyKSB7XG4gICAgICB2YXIgeG1sRG9jID0gbmV3IHdpbmRvdy5BY3RpdmVYT2JqZWN0KFwiTWljcm9zb2Z0LlhNTERPTVwiKVxuICAgICAgeG1sRG9jLmFzeW5jID0gXCJmYWxzZVwiXG4gICAgICB4bWxEb2MubG9hZFhNTChzdHIpXG4gICAgICByZXR1cm4geG1sRG9jXG4gICAgfVxuICB9XG5cbiAgLy9sYXN0IHJlc29ydCBmYWxsYmFja1xuICByZXR1cm4gZnVuY3Rpb24oc3RyKSB7XG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZGl2LmlubmVySFRNTCA9IHN0clxuICAgIHJldHVybiBkaXZcbiAgfVxufSkoKSIsIlwidXNlIHN0cmljdFwiO1xudmFyIHdpbmRvdyA9IHJlcXVpcmUoXCJnbG9iYWwvd2luZG93XCIpXG52YXIgaXNGdW5jdGlvbiA9IHJlcXVpcmUoXCJpcy1mdW5jdGlvblwiKVxudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoXCJwYXJzZS1oZWFkZXJzXCIpXG52YXIgeHRlbmQgPSByZXF1aXJlKFwieHRlbmRcIilcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVYSFJcbmNyZWF0ZVhIUi5YTUxIdHRwUmVxdWVzdCA9IHdpbmRvdy5YTUxIdHRwUmVxdWVzdCB8fCBub29wXG5jcmVhdGVYSFIuWERvbWFpblJlcXVlc3QgPSBcIndpdGhDcmVkZW50aWFsc1wiIGluIChuZXcgY3JlYXRlWEhSLlhNTEh0dHBSZXF1ZXN0KCkpID8gY3JlYXRlWEhSLlhNTEh0dHBSZXF1ZXN0IDogd2luZG93LlhEb21haW5SZXF1ZXN0XG5cbmZvckVhY2hBcnJheShbXCJnZXRcIiwgXCJwdXRcIiwgXCJwb3N0XCIsIFwicGF0Y2hcIiwgXCJoZWFkXCIsIFwiZGVsZXRlXCJdLCBmdW5jdGlvbihtZXRob2QpIHtcbiAgICBjcmVhdGVYSFJbbWV0aG9kID09PSBcImRlbGV0ZVwiID8gXCJkZWxcIiA6IG1ldGhvZF0gPSBmdW5jdGlvbih1cmksIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgICAgIG9wdGlvbnMgPSBpbml0UGFyYW1zKHVyaSwgb3B0aW9ucywgY2FsbGJhY2spXG4gICAgICAgIG9wdGlvbnMubWV0aG9kID0gbWV0aG9kLnRvVXBwZXJDYXNlKClcbiAgICAgICAgcmV0dXJuIF9jcmVhdGVYSFIob3B0aW9ucylcbiAgICB9XG59KVxuXG5mdW5jdGlvbiBmb3JFYWNoQXJyYXkoYXJyYXksIGl0ZXJhdG9yKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpdGVyYXRvcihhcnJheVtpXSlcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGlzRW1wdHkob2JqKXtcbiAgICBmb3IodmFyIGkgaW4gb2JqKXtcbiAgICAgICAgaWYob2JqLmhhc093blByb3BlcnR5KGkpKSByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbn1cblxuZnVuY3Rpb24gaW5pdFBhcmFtcyh1cmksIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHBhcmFtcyA9IHVyaVxuXG4gICAgaWYgKGlzRnVuY3Rpb24ob3B0aW9ucykpIHtcbiAgICAgICAgY2FsbGJhY2sgPSBvcHRpb25zXG4gICAgICAgIGlmICh0eXBlb2YgdXJpID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBwYXJhbXMgPSB7dXJpOnVyaX1cbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcmFtcyA9IHh0ZW5kKG9wdGlvbnMsIHt1cmk6IHVyaX0pXG4gICAgfVxuXG4gICAgcGFyYW1zLmNhbGxiYWNrID0gY2FsbGJhY2tcbiAgICByZXR1cm4gcGFyYW1zXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVhIUih1cmksIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgb3B0aW9ucyA9IGluaXRQYXJhbXModXJpLCBvcHRpb25zLCBjYWxsYmFjaylcbiAgICByZXR1cm4gX2NyZWF0ZVhIUihvcHRpb25zKVxufVxuXG5mdW5jdGlvbiBfY3JlYXRlWEhSKG9wdGlvbnMpIHtcbiAgICBpZih0eXBlb2Ygb3B0aW9ucy5jYWxsYmFjayA9PT0gXCJ1bmRlZmluZWRcIil7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbGxiYWNrIGFyZ3VtZW50IG1pc3NpbmdcIilcbiAgICB9XG5cbiAgICB2YXIgY2FsbGVkID0gZmFsc2VcbiAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiBjYk9uY2UoZXJyLCByZXNwb25zZSwgYm9keSl7XG4gICAgICAgIGlmKCFjYWxsZWQpe1xuICAgICAgICAgICAgY2FsbGVkID0gdHJ1ZVxuICAgICAgICAgICAgb3B0aW9ucy5jYWxsYmFjayhlcnIsIHJlc3BvbnNlLCBib2R5KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVhZHlzdGF0ZWNoYW5nZSgpIHtcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICBsb2FkRnVuYygpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRCb2R5KCkge1xuICAgICAgICAvLyBDaHJvbWUgd2l0aCByZXF1ZXN0VHlwZT1ibG9iIHRocm93cyBlcnJvcnMgYXJyb3VuZCB3aGVuIGV2ZW4gdGVzdGluZyBhY2Nlc3MgdG8gcmVzcG9uc2VUZXh0XG4gICAgICAgIHZhciBib2R5ID0gdW5kZWZpbmVkXG5cbiAgICAgICAgaWYgKHhoci5yZXNwb25zZSkge1xuICAgICAgICAgICAgYm9keSA9IHhoci5yZXNwb25zZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYm9keSA9IHhoci5yZXNwb25zZVRleHQgfHwgZ2V0WG1sKHhocilcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0pzb24pIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgYm9keSA9IEpTT04ucGFyc2UoYm9keSlcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYm9keVxuICAgIH1cblxuICAgIHZhciBmYWlsdXJlUmVzcG9uc2UgPSB7XG4gICAgICAgICAgICAgICAgYm9keTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHt9LFxuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IDAsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgICAgICAgICAgdXJsOiB1cmksXG4gICAgICAgICAgICAgICAgcmF3UmVxdWVzdDogeGhyXG4gICAgICAgICAgICB9XG5cbiAgICBmdW5jdGlvbiBlcnJvckZ1bmMoZXZ0KSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0VGltZXIpXG4gICAgICAgIGlmKCEoZXZ0IGluc3RhbmNlb2YgRXJyb3IpKXtcbiAgICAgICAgICAgIGV2dCA9IG5ldyBFcnJvcihcIlwiICsgKGV2dCB8fCBcIlVua25vd24gWE1MSHR0cFJlcXVlc3QgRXJyb3JcIikgKVxuICAgICAgICB9XG4gICAgICAgIGV2dC5zdGF0dXNDb2RlID0gMFxuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXZ0LCBmYWlsdXJlUmVzcG9uc2UpXG4gICAgfVxuXG4gICAgLy8gd2lsbCBsb2FkIHRoZSBkYXRhICYgcHJvY2VzcyB0aGUgcmVzcG9uc2UgaW4gYSBzcGVjaWFsIHJlc3BvbnNlIG9iamVjdFxuICAgIGZ1bmN0aW9uIGxvYWRGdW5jKCkge1xuICAgICAgICBpZiAoYWJvcnRlZCkgcmV0dXJuXG4gICAgICAgIHZhciBzdGF0dXNcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRUaW1lcilcbiAgICAgICAgaWYob3B0aW9ucy51c2VYRFIgJiYgeGhyLnN0YXR1cz09PXVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy9JRTggQ09SUyBHRVQgc3VjY2Vzc2Z1bCByZXNwb25zZSBkb2Vzbid0IGhhdmUgYSBzdGF0dXMgZmllbGQsIGJ1dCBib2R5IGlzIGZpbmVcbiAgICAgICAgICAgIHN0YXR1cyA9IDIwMFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RhdHVzID0gKHhoci5zdGF0dXMgPT09IDEyMjMgPyAyMDQgOiB4aHIuc3RhdHVzKVxuICAgICAgICB9XG4gICAgICAgIHZhciByZXNwb25zZSA9IGZhaWx1cmVSZXNwb25zZVxuICAgICAgICB2YXIgZXJyID0gbnVsbFxuXG4gICAgICAgIGlmIChzdGF0dXMgIT09IDApe1xuICAgICAgICAgICAgcmVzcG9uc2UgPSB7XG4gICAgICAgICAgICAgICAgYm9keTogZ2V0Qm9keSgpLFxuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IHN0YXR1cyxcbiAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7fSxcbiAgICAgICAgICAgICAgICB1cmw6IHVyaSxcbiAgICAgICAgICAgICAgICByYXdSZXF1ZXN0OiB4aHJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMpeyAvL3JlbWVtYmVyIHhociBjYW4gaW4gZmFjdCBiZSBYRFIgZm9yIENPUlMgaW4gSUVcbiAgICAgICAgICAgICAgICByZXNwb25zZS5oZWFkZXJzID0gcGFyc2VIZWFkZXJzKHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVyciA9IG5ldyBFcnJvcihcIkludGVybmFsIFhNTEh0dHBSZXF1ZXN0IEVycm9yXCIpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVyciwgcmVzcG9uc2UsIHJlc3BvbnNlLmJvZHkpXG4gICAgfVxuXG4gICAgdmFyIHhociA9IG9wdGlvbnMueGhyIHx8IG51bGxcblxuICAgIGlmICgheGhyKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmNvcnMgfHwgb3B0aW9ucy51c2VYRFIpIHtcbiAgICAgICAgICAgIHhociA9IG5ldyBjcmVhdGVYSFIuWERvbWFpblJlcXVlc3QoKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHhociA9IG5ldyBjcmVhdGVYSFIuWE1MSHR0cFJlcXVlc3QoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGtleVxuICAgIHZhciBhYm9ydGVkXG4gICAgdmFyIHVyaSA9IHhoci51cmwgPSBvcHRpb25zLnVyaSB8fCBvcHRpb25zLnVybFxuICAgIHZhciBtZXRob2QgPSB4aHIubWV0aG9kID0gb3B0aW9ucy5tZXRob2QgfHwgXCJHRVRcIlxuICAgIHZhciBib2R5ID0gb3B0aW9ucy5ib2R5IHx8IG9wdGlvbnMuZGF0YSB8fCBudWxsXG4gICAgdmFyIGhlYWRlcnMgPSB4aHIuaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycyB8fCB7fVxuICAgIHZhciBzeW5jID0gISFvcHRpb25zLnN5bmNcbiAgICB2YXIgaXNKc29uID0gZmFsc2VcbiAgICB2YXIgdGltZW91dFRpbWVyXG5cbiAgICBpZiAoXCJqc29uXCIgaW4gb3B0aW9ucykge1xuICAgICAgICBpc0pzb24gPSB0cnVlXG4gICAgICAgIGhlYWRlcnNbXCJhY2NlcHRcIl0gfHwgaGVhZGVyc1tcIkFjY2VwdFwiXSB8fCAoaGVhZGVyc1tcIkFjY2VwdFwiXSA9IFwiYXBwbGljYXRpb24vanNvblwiKSAvL0Rvbid0IG92ZXJyaWRlIGV4aXN0aW5nIGFjY2VwdCBoZWFkZXIgZGVjbGFyZWQgYnkgdXNlclxuICAgICAgICBpZiAobWV0aG9kICE9PSBcIkdFVFwiICYmIG1ldGhvZCAhPT0gXCJIRUFEXCIpIHtcbiAgICAgICAgICAgIGhlYWRlcnNbXCJjb250ZW50LXR5cGVcIl0gfHwgaGVhZGVyc1tcIkNvbnRlbnQtVHlwZVwiXSB8fCAoaGVhZGVyc1tcIkNvbnRlbnQtVHlwZVwiXSA9IFwiYXBwbGljYXRpb24vanNvblwiKSAvL0Rvbid0IG92ZXJyaWRlIGV4aXN0aW5nIGFjY2VwdCBoZWFkZXIgZGVjbGFyZWQgYnkgdXNlclxuICAgICAgICAgICAgYm9keSA9IEpTT04uc3RyaW5naWZ5KG9wdGlvbnMuanNvbilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSByZWFkeXN0YXRlY2hhbmdlXG4gICAgeGhyLm9ubG9hZCA9IGxvYWRGdW5jXG4gICAgeGhyLm9uZXJyb3IgPSBlcnJvckZ1bmNcbiAgICAvLyBJRTkgbXVzdCBoYXZlIG9ucHJvZ3Jlc3MgYmUgc2V0IHRvIGEgdW5pcXVlIGZ1bmN0aW9uLlxuICAgIHhoci5vbnByb2dyZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBJRSBtdXN0IGRpZVxuICAgIH1cbiAgICB4aHIub250aW1lb3V0ID0gZXJyb3JGdW5jXG4gICAgeGhyLm9wZW4obWV0aG9kLCB1cmksICFzeW5jLCBvcHRpb25zLnVzZXJuYW1lLCBvcHRpb25zLnBhc3N3b3JkKVxuICAgIC8vaGFzIHRvIGJlIGFmdGVyIG9wZW5cbiAgICBpZighc3luYykge1xuICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gISFvcHRpb25zLndpdGhDcmVkZW50aWFsc1xuICAgIH1cbiAgICAvLyBDYW5ub3Qgc2V0IHRpbWVvdXQgd2l0aCBzeW5jIHJlcXVlc3RcbiAgICAvLyBub3Qgc2V0dGluZyB0aW1lb3V0IG9uIHRoZSB4aHIgb2JqZWN0LCBiZWNhdXNlIG9mIG9sZCB3ZWJraXRzIGV0Yy4gbm90IGhhbmRsaW5nIHRoYXQgY29ycmVjdGx5XG4gICAgLy8gYm90aCBucG0ncyByZXF1ZXN0IGFuZCBqcXVlcnkgMS54IHVzZSB0aGlzIGtpbmQgb2YgdGltZW91dCwgc28gdGhpcyBpcyBiZWluZyBjb25zaXN0ZW50XG4gICAgaWYgKCFzeW5jICYmIG9wdGlvbnMudGltZW91dCA+IDAgKSB7XG4gICAgICAgIHRpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGFib3J0ZWQ9dHJ1ZS8vSUU5IG1heSBzdGlsbCBjYWxsIHJlYWR5c3RhdGVjaGFuZ2VcbiAgICAgICAgICAgIHhoci5hYm9ydChcInRpbWVvdXRcIilcbiAgICAgICAgICAgIHZhciBlID0gbmV3IEVycm9yKFwiWE1MSHR0cFJlcXVlc3QgdGltZW91dFwiKVxuICAgICAgICAgICAgZS5jb2RlID0gXCJFVElNRURPVVRcIlxuICAgICAgICAgICAgZXJyb3JGdW5jKGUpXG4gICAgICAgIH0sIG9wdGlvbnMudGltZW91dCApXG4gICAgfVxuXG4gICAgaWYgKHhoci5zZXRSZXF1ZXN0SGVhZGVyKSB7XG4gICAgICAgIGZvcihrZXkgaW4gaGVhZGVycyl7XG4gICAgICAgICAgICBpZihoZWFkZXJzLmhhc093blByb3BlcnR5KGtleSkpe1xuICAgICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgaGVhZGVyc1trZXldKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChvcHRpb25zLmhlYWRlcnMgJiYgIWlzRW1wdHkob3B0aW9ucy5oZWFkZXJzKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJIZWFkZXJzIGNhbm5vdCBiZSBzZXQgb24gYW4gWERvbWFpblJlcXVlc3Qgb2JqZWN0XCIpXG4gICAgfVxuXG4gICAgaWYgKFwicmVzcG9uc2VUeXBlXCIgaW4gb3B0aW9ucykge1xuICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gb3B0aW9ucy5yZXNwb25zZVR5cGVcbiAgICB9XG5cbiAgICBpZiAoXCJiZWZvcmVTZW5kXCIgaW4gb3B0aW9ucyAmJlxuICAgICAgICB0eXBlb2Ygb3B0aW9ucy5iZWZvcmVTZW5kID09PSBcImZ1bmN0aW9uXCJcbiAgICApIHtcbiAgICAgICAgb3B0aW9ucy5iZWZvcmVTZW5kKHhocilcbiAgICB9XG5cbiAgICB4aHIuc2VuZChib2R5KVxuXG4gICAgcmV0dXJuIHhoclxuXG5cbn1cblxuZnVuY3Rpb24gZ2V0WG1sKHhocikge1xuICAgIGlmICh4aHIucmVzcG9uc2VUeXBlID09PSBcImRvY3VtZW50XCIpIHtcbiAgICAgICAgcmV0dXJuIHhoci5yZXNwb25zZVhNTFxuICAgIH1cbiAgICB2YXIgZmlyZWZveEJ1Z1Rha2VuRWZmZWN0ID0geGhyLnN0YXR1cyA9PT0gMjA0ICYmIHhoci5yZXNwb25zZVhNTCAmJiB4aHIucmVzcG9uc2VYTUwuZG9jdW1lbnRFbGVtZW50Lm5vZGVOYW1lID09PSBcInBhcnNlcmVycm9yXCJcbiAgICBpZiAoeGhyLnJlc3BvbnNlVHlwZSA9PT0gXCJcIiAmJiAhZmlyZWZveEJ1Z1Rha2VuRWZmZWN0KSB7XG4gICAgICAgIHJldHVybiB4aHIucmVzcG9uc2VYTUxcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbFxufVxuXG5mdW5jdGlvbiBub29wKCkge31cbiIsImlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSB3aW5kb3c7XG59IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGdsb2JhbDtcbn0gZWxzZSBpZiAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIpe1xuICAgIG1vZHVsZS5leHBvcnRzID0gc2VsZjtcbn0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7fTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gaXNGdW5jdGlvblxuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nXG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24gKGZuKSB7XG4gIHZhciBzdHJpbmcgPSB0b1N0cmluZy5jYWxsKGZuKVxuICByZXR1cm4gc3RyaW5nID09PSAnW29iamVjdCBGdW5jdGlvbl0nIHx8XG4gICAgKHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJyAmJiBzdHJpbmcgIT09ICdbb2JqZWN0IFJlZ0V4cF0nKSB8fFxuICAgICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAvLyBJRTggYW5kIGJlbG93XG4gICAgIChmbiA9PT0gd2luZG93LnNldFRpbWVvdXQgfHxcbiAgICAgIGZuID09PSB3aW5kb3cuYWxlcnQgfHxcbiAgICAgIGZuID09PSB3aW5kb3cuY29uZmlybSB8fFxuICAgICAgZm4gPT09IHdpbmRvdy5wcm9tcHQpKVxufTtcbiIsInZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnaXMtZnVuY3Rpb24nKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZvckVhY2hcblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eVxuXG5mdW5jdGlvbiBmb3JFYWNoKGxpc3QsIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gICAgaWYgKCFpc0Z1bmN0aW9uKGl0ZXJhdG9yKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdpdGVyYXRvciBtdXN0IGJlIGEgZnVuY3Rpb24nKVxuICAgIH1cblxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMykge1xuICAgICAgICBjb250ZXh0ID0gdGhpc1xuICAgIH1cbiAgICBcbiAgICBpZiAodG9TdHJpbmcuY2FsbChsaXN0KSA9PT0gJ1tvYmplY3QgQXJyYXldJylcbiAgICAgICAgZm9yRWFjaEFycmF5KGxpc3QsIGl0ZXJhdG9yLCBjb250ZXh0KVxuICAgIGVsc2UgaWYgKHR5cGVvZiBsaXN0ID09PSAnc3RyaW5nJylcbiAgICAgICAgZm9yRWFjaFN0cmluZyhsaXN0LCBpdGVyYXRvciwgY29udGV4dClcbiAgICBlbHNlXG4gICAgICAgIGZvckVhY2hPYmplY3QobGlzdCwgaXRlcmF0b3IsIGNvbnRleHQpXG59XG5cbmZ1bmN0aW9uIGZvckVhY2hBcnJheShhcnJheSwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYXJyYXkubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoYXJyYXksIGkpKSB7XG4gICAgICAgICAgICBpdGVyYXRvci5jYWxsKGNvbnRleHQsIGFycmF5W2ldLCBpLCBhcnJheSlcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZm9yRWFjaFN0cmluZyhzdHJpbmcsIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHN0cmluZy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAvLyBubyBzdWNoIHRoaW5nIGFzIGEgc3BhcnNlIHN0cmluZy5cbiAgICAgICAgaXRlcmF0b3IuY2FsbChjb250ZXh0LCBzdHJpbmcuY2hhckF0KGkpLCBpLCBzdHJpbmcpXG4gICAgfVxufVxuXG5mdW5jdGlvbiBmb3JFYWNoT2JqZWN0KG9iamVjdCwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgICBmb3IgKHZhciBrIGluIG9iamVjdCkge1xuICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGspKSB7XG4gICAgICAgICAgICBpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9iamVjdFtrXSwgaywgb2JqZWN0KVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSB0cmltO1xuXG5mdW5jdGlvbiB0cmltKHN0cil7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyp8XFxzKiQvZywgJycpO1xufVxuXG5leHBvcnRzLmxlZnQgPSBmdW5jdGlvbihzdHIpe1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMqLywgJycpO1xufTtcblxuZXhwb3J0cy5yaWdodCA9IGZ1bmN0aW9uKHN0cil7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXFxzKiQvLCAnJyk7XG59O1xuIiwidmFyIHRyaW0gPSByZXF1aXJlKCd0cmltJylcbiAgLCBmb3JFYWNoID0gcmVxdWlyZSgnZm9yLWVhY2gnKVxuICAsIGlzQXJyYXkgPSBmdW5jdGlvbihhcmcpIHtcbiAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJnKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgICB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGhlYWRlcnMpIHtcbiAgaWYgKCFoZWFkZXJzKVxuICAgIHJldHVybiB7fVxuXG4gIHZhciByZXN1bHQgPSB7fVxuXG4gIGZvckVhY2goXG4gICAgICB0cmltKGhlYWRlcnMpLnNwbGl0KCdcXG4nKVxuICAgICwgZnVuY3Rpb24gKHJvdykge1xuICAgICAgICB2YXIgaW5kZXggPSByb3cuaW5kZXhPZignOicpXG4gICAgICAgICAgLCBrZXkgPSB0cmltKHJvdy5zbGljZSgwLCBpbmRleCkpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAsIHZhbHVlID0gdHJpbShyb3cuc2xpY2UoaW5kZXggKyAxKSlcblxuICAgICAgICBpZiAodHlwZW9mKHJlc3VsdFtrZXldKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICByZXN1bHRba2V5XSA9IHZhbHVlXG4gICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShyZXN1bHRba2V5XSkpIHtcbiAgICAgICAgICByZXN1bHRba2V5XS5wdXNoKHZhbHVlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdFtrZXldID0gWyByZXN1bHRba2V5XSwgdmFsdWUgXVxuICAgICAgICB9XG4gICAgICB9XG4gIClcblxuICByZXR1cm4gcmVzdWx0XG59IiwibW9kdWxlLmV4cG9ydHMgPSBleHRlbmRcblxudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuZnVuY3Rpb24gZXh0ZW5kKCkge1xuICAgIHZhciB0YXJnZXQgPSB7fVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXVxuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXRcbn1cbiIsInZhciBjcmVhdGVMYXlvdXQgPSByZXF1aXJlKCdsYXlvdXQtYm1mb250LXRleHQnKVxudmFyIGluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKVxudmFyIGNyZWF0ZUluZGljZXMgPSByZXF1aXJlKCdxdWFkLWluZGljZXMnKVxudmFyIGJ1ZmZlciA9IHJlcXVpcmUoJ3RocmVlLWJ1ZmZlci12ZXJ0ZXgtZGF0YScpXG52YXIgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpXG5cbnZhciB2ZXJ0aWNlcyA9IHJlcXVpcmUoJy4vbGliL3ZlcnRpY2VzJylcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vbGliL3V0aWxzJylcblxudmFyIEJhc2UgPSBUSFJFRS5CdWZmZXJHZW9tZXRyeVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZVRleHRHZW9tZXRyeSAob3B0KSB7XG4gIHJldHVybiBuZXcgVGV4dEdlb21ldHJ5KG9wdClcbn1cblxuZnVuY3Rpb24gVGV4dEdlb21ldHJ5IChvcHQpIHtcbiAgQmFzZS5jYWxsKHRoaXMpXG5cbiAgaWYgKHR5cGVvZiBvcHQgPT09ICdzdHJpbmcnKSB7XG4gICAgb3B0ID0geyB0ZXh0OiBvcHQgfVxuICB9XG5cbiAgLy8gdXNlIHRoZXNlIGFzIGRlZmF1bHQgdmFsdWVzIGZvciBhbnkgc3Vic2VxdWVudFxuICAvLyBjYWxscyB0byB1cGRhdGUoKVxuICB0aGlzLl9vcHQgPSBhc3NpZ24oe30sIG9wdClcblxuICAvLyBhbHNvIGRvIGFuIGluaXRpYWwgc2V0dXAuLi5cbiAgaWYgKG9wdCkgdGhpcy51cGRhdGUob3B0KVxufVxuXG5pbmhlcml0cyhUZXh0R2VvbWV0cnksIEJhc2UpXG5cblRleHRHZW9tZXRyeS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKG9wdCkge1xuICBpZiAodHlwZW9mIG9wdCA9PT0gJ3N0cmluZycpIHtcbiAgICBvcHQgPSB7IHRleHQ6IG9wdCB9XG4gIH1cblxuICAvLyB1c2UgY29uc3RydWN0b3IgZGVmYXVsdHNcbiAgb3B0ID0gYXNzaWduKHt9LCB0aGlzLl9vcHQsIG9wdClcblxuICBpZiAoIW9wdC5mb250KSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbXVzdCBzcGVjaWZ5IGEgeyBmb250IH0gaW4gb3B0aW9ucycpXG4gIH1cblxuICB0aGlzLmxheW91dCA9IGNyZWF0ZUxheW91dChvcHQpXG5cbiAgLy8gZ2V0IHZlYzIgdGV4Y29vcmRzXG4gIHZhciBmbGlwWSA9IG9wdC5mbGlwWSAhPT0gZmFsc2VcblxuICAvLyB0aGUgZGVzaXJlZCBCTUZvbnQgZGF0YVxuICB2YXIgZm9udCA9IG9wdC5mb250XG5cbiAgLy8gZGV0ZXJtaW5lIHRleHR1cmUgc2l6ZSBmcm9tIGZvbnQgZmlsZVxuICB2YXIgdGV4V2lkdGggPSBmb250LmNvbW1vbi5zY2FsZVdcbiAgdmFyIHRleEhlaWdodCA9IGZvbnQuY29tbW9uLnNjYWxlSFxuXG4gIC8vIGdldCB2aXNpYmxlIGdseXBoc1xuICB2YXIgZ2x5cGhzID0gdGhpcy5sYXlvdXQuZ2x5cGhzLmZpbHRlcihmdW5jdGlvbiAoZ2x5cGgpIHtcbiAgICB2YXIgYml0bWFwID0gZ2x5cGguZGF0YVxuICAgIHJldHVybiBiaXRtYXAud2lkdGggKiBiaXRtYXAuaGVpZ2h0ID4gMFxuICB9KVxuXG4gIC8vIHByb3ZpZGUgdmlzaWJsZSBnbHlwaHMgZm9yIGNvbnZlbmllbmNlXG4gIHRoaXMudmlzaWJsZUdseXBocyA9IGdseXBoc1xuXG4gIC8vIGdldCBjb21tb24gdmVydGV4IGRhdGFcbiAgdmFyIHBvc2l0aW9ucyA9IHZlcnRpY2VzLnBvc2l0aW9ucyhnbHlwaHMpXG4gIHZhciB1dnMgPSB2ZXJ0aWNlcy51dnMoZ2x5cGhzLCB0ZXhXaWR0aCwgdGV4SGVpZ2h0LCBmbGlwWSlcbiAgdmFyIGluZGljZXMgPSBjcmVhdGVJbmRpY2VzKHtcbiAgICBjbG9ja3dpc2U6IHRydWUsXG4gICAgdHlwZTogJ3VpbnQxNicsXG4gICAgY291bnQ6IGdseXBocy5sZW5ndGhcbiAgfSlcblxuICAvLyB1cGRhdGUgdmVydGV4IGRhdGFcbiAgYnVmZmVyLmluZGV4KHRoaXMsIGluZGljZXMsIDEsICd1aW50MTYnKVxuICBidWZmZXIuYXR0cih0aGlzLCAncG9zaXRpb24nLCBwb3NpdGlvbnMsIDIpXG4gIGJ1ZmZlci5hdHRyKHRoaXMsICd1dicsIHV2cywgMilcblxuICAvLyB1cGRhdGUgbXVsdGlwYWdlIGRhdGFcbiAgaWYgKCFvcHQubXVsdGlwYWdlICYmICdwYWdlJyBpbiB0aGlzLmF0dHJpYnV0ZXMpIHtcbiAgICAvLyBkaXNhYmxlIG11bHRpcGFnZSByZW5kZXJpbmdcbiAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgncGFnZScpXG4gIH0gZWxzZSBpZiAob3B0Lm11bHRpcGFnZSkge1xuICAgIHZhciBwYWdlcyA9IHZlcnRpY2VzLnBhZ2VzKGdseXBocylcbiAgICAvLyBlbmFibGUgbXVsdGlwYWdlIHJlbmRlcmluZ1xuICAgIGJ1ZmZlci5hdHRyKHRoaXMsICdwYWdlJywgcGFnZXMsIDEpXG4gIH1cbn1cblxuVGV4dEdlb21ldHJ5LnByb3RvdHlwZS5jb21wdXRlQm91bmRpbmdTcGhlcmUgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLmJvdW5kaW5nU3BoZXJlID09PSBudWxsKSB7XG4gICAgdGhpcy5ib3VuZGluZ1NwaGVyZSA9IG5ldyBUSFJFRS5TcGhlcmUoKVxuICB9XG5cbiAgdmFyIHBvc2l0aW9ucyA9IHRoaXMuYXR0cmlidXRlcy5wb3NpdGlvbi5hcnJheVxuICB2YXIgaXRlbVNpemUgPSB0aGlzLmF0dHJpYnV0ZXMucG9zaXRpb24uaXRlbVNpemVcbiAgaWYgKCFwb3NpdGlvbnMgfHwgIWl0ZW1TaXplIHx8IHBvc2l0aW9ucy5sZW5ndGggPCAyKSB7XG4gICAgdGhpcy5ib3VuZGluZ1NwaGVyZS5yYWRpdXMgPSAwXG4gICAgdGhpcy5ib3VuZGluZ1NwaGVyZS5jZW50ZXIuc2V0KDAsIDAsIDApXG4gICAgcmV0dXJuXG4gIH1cbiAgdXRpbHMuY29tcHV0ZVNwaGVyZShwb3NpdGlvbnMsIHRoaXMuYm91bmRpbmdTcGhlcmUpXG4gIGlmIChpc05hTih0aGlzLmJvdW5kaW5nU3BoZXJlLnJhZGl1cykpIHtcbiAgICBjb25zb2xlLmVycm9yKCdUSFJFRS5CdWZmZXJHZW9tZXRyeS5jb21wdXRlQm91bmRpbmdTcGhlcmUoKTogJyArXG4gICAgICAnQ29tcHV0ZWQgcmFkaXVzIGlzIE5hTi4gVGhlICcgK1xuICAgICAgJ1wicG9zaXRpb25cIiBhdHRyaWJ1dGUgaXMgbGlrZWx5IHRvIGhhdmUgTmFOIHZhbHVlcy4nKVxuICB9XG59XG5cblRleHRHZW9tZXRyeS5wcm90b3R5cGUuY29tcHV0ZUJvdW5kaW5nQm94ID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5ib3VuZGluZ0JveCA9PT0gbnVsbCkge1xuICAgIHRoaXMuYm91bmRpbmdCb3ggPSBuZXcgVEhSRUUuQm94MygpXG4gIH1cblxuICB2YXIgYmJveCA9IHRoaXMuYm91bmRpbmdCb3hcbiAgdmFyIHBvc2l0aW9ucyA9IHRoaXMuYXR0cmlidXRlcy5wb3NpdGlvbi5hcnJheVxuICB2YXIgaXRlbVNpemUgPSB0aGlzLmF0dHJpYnV0ZXMucG9zaXRpb24uaXRlbVNpemVcbiAgaWYgKCFwb3NpdGlvbnMgfHwgIWl0ZW1TaXplIHx8IHBvc2l0aW9ucy5sZW5ndGggPCAyKSB7XG4gICAgYmJveC5tYWtlRW1wdHkoKVxuICAgIHJldHVyblxuICB9XG4gIHV0aWxzLmNvbXB1dGVCb3gocG9zaXRpb25zLCBiYm94KVxufVxuIiwidmFyIGl0ZW1TaXplID0gMlxudmFyIGJveCA9IHsgbWluOiBbMCwgMF0sIG1heDogWzAsIDBdIH1cblxuZnVuY3Rpb24gYm91bmRzIChwb3NpdGlvbnMpIHtcbiAgdmFyIGNvdW50ID0gcG9zaXRpb25zLmxlbmd0aCAvIGl0ZW1TaXplXG4gIGJveC5taW5bMF0gPSBwb3NpdGlvbnNbMF1cbiAgYm94Lm1pblsxXSA9IHBvc2l0aW9uc1sxXVxuICBib3gubWF4WzBdID0gcG9zaXRpb25zWzBdXG4gIGJveC5tYXhbMV0gPSBwb3NpdGlvbnNbMV1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICB2YXIgeCA9IHBvc2l0aW9uc1tpICogaXRlbVNpemUgKyAwXVxuICAgIHZhciB5ID0gcG9zaXRpb25zW2kgKiBpdGVtU2l6ZSArIDFdXG4gICAgYm94Lm1pblswXSA9IE1hdGgubWluKHgsIGJveC5taW5bMF0pXG4gICAgYm94Lm1pblsxXSA9IE1hdGgubWluKHksIGJveC5taW5bMV0pXG4gICAgYm94Lm1heFswXSA9IE1hdGgubWF4KHgsIGJveC5tYXhbMF0pXG4gICAgYm94Lm1heFsxXSA9IE1hdGgubWF4KHksIGJveC5tYXhbMV0pXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMuY29tcHV0ZUJveCA9IGZ1bmN0aW9uIChwb3NpdGlvbnMsIG91dHB1dCkge1xuICBib3VuZHMocG9zaXRpb25zKVxuICBvdXRwdXQubWluLnNldChib3gubWluWzBdLCBib3gubWluWzFdLCAwKVxuICBvdXRwdXQubWF4LnNldChib3gubWF4WzBdLCBib3gubWF4WzFdLCAwKVxufVxuXG5tb2R1bGUuZXhwb3J0cy5jb21wdXRlU3BoZXJlID0gZnVuY3Rpb24gKHBvc2l0aW9ucywgb3V0cHV0KSB7XG4gIGJvdW5kcyhwb3NpdGlvbnMpXG4gIHZhciBtaW5YID0gYm94Lm1pblswXVxuICB2YXIgbWluWSA9IGJveC5taW5bMV1cbiAgdmFyIG1heFggPSBib3gubWF4WzBdXG4gIHZhciBtYXhZID0gYm94Lm1heFsxXVxuICB2YXIgd2lkdGggPSBtYXhYIC0gbWluWFxuICB2YXIgaGVpZ2h0ID0gbWF4WSAtIG1pbllcbiAgdmFyIGxlbmd0aCA9IE1hdGguc3FydCh3aWR0aCAqIHdpZHRoICsgaGVpZ2h0ICogaGVpZ2h0KVxuICBvdXRwdXQuY2VudGVyLnNldChtaW5YICsgd2lkdGggLyAyLCBtaW5ZICsgaGVpZ2h0IC8gMiwgMClcbiAgb3V0cHV0LnJhZGl1cyA9IGxlbmd0aCAvIDJcbn1cbiIsIm1vZHVsZS5leHBvcnRzLnBhZ2VzID0gZnVuY3Rpb24gcGFnZXMgKGdseXBocykge1xuICB2YXIgcGFnZXMgPSBuZXcgRmxvYXQzMkFycmF5KGdseXBocy5sZW5ndGggKiA0ICogMSlcbiAgdmFyIGkgPSAwXG4gIGdseXBocy5mb3JFYWNoKGZ1bmN0aW9uIChnbHlwaCkge1xuICAgIHZhciBpZCA9IGdseXBoLmRhdGEucGFnZSB8fCAwXG4gICAgcGFnZXNbaSsrXSA9IGlkXG4gICAgcGFnZXNbaSsrXSA9IGlkXG4gICAgcGFnZXNbaSsrXSA9IGlkXG4gICAgcGFnZXNbaSsrXSA9IGlkXG4gIH0pXG4gIHJldHVybiBwYWdlc1xufVxuXG5tb2R1bGUuZXhwb3J0cy51dnMgPSBmdW5jdGlvbiB1dnMgKGdseXBocywgdGV4V2lkdGgsIHRleEhlaWdodCwgZmxpcFkpIHtcbiAgdmFyIHV2cyA9IG5ldyBGbG9hdDMyQXJyYXkoZ2x5cGhzLmxlbmd0aCAqIDQgKiAyKVxuICB2YXIgaSA9IDBcbiAgZ2x5cGhzLmZvckVhY2goZnVuY3Rpb24gKGdseXBoKSB7XG4gICAgdmFyIGJpdG1hcCA9IGdseXBoLmRhdGFcbiAgICB2YXIgYncgPSAoYml0bWFwLnggKyBiaXRtYXAud2lkdGgpXG4gICAgdmFyIGJoID0gKGJpdG1hcC55ICsgYml0bWFwLmhlaWdodClcblxuICAgIC8vIHRvcCBsZWZ0IHBvc2l0aW9uXG4gICAgdmFyIHUwID0gYml0bWFwLnggLyB0ZXhXaWR0aFxuICAgIHZhciB2MSA9IGJpdG1hcC55IC8gdGV4SGVpZ2h0XG4gICAgdmFyIHUxID0gYncgLyB0ZXhXaWR0aFxuICAgIHZhciB2MCA9IGJoIC8gdGV4SGVpZ2h0XG5cbiAgICBpZiAoZmxpcFkpIHtcbiAgICAgIHYxID0gKHRleEhlaWdodCAtIGJpdG1hcC55KSAvIHRleEhlaWdodFxuICAgICAgdjAgPSAodGV4SGVpZ2h0IC0gYmgpIC8gdGV4SGVpZ2h0XG4gICAgfVxuXG4gICAgLy8gQkxcbiAgICB1dnNbaSsrXSA9IHUwXG4gICAgdXZzW2krK10gPSB2MVxuICAgIC8vIFRMXG4gICAgdXZzW2krK10gPSB1MFxuICAgIHV2c1tpKytdID0gdjBcbiAgICAvLyBUUlxuICAgIHV2c1tpKytdID0gdTFcbiAgICB1dnNbaSsrXSA9IHYwXG4gICAgLy8gQlJcbiAgICB1dnNbaSsrXSA9IHUxXG4gICAgdXZzW2krK10gPSB2MVxuICB9KVxuICByZXR1cm4gdXZzXG59XG5cbm1vZHVsZS5leHBvcnRzLnBvc2l0aW9ucyA9IGZ1bmN0aW9uIHBvc2l0aW9ucyAoZ2x5cGhzKSB7XG4gIHZhciBwb3NpdGlvbnMgPSBuZXcgRmxvYXQzMkFycmF5KGdseXBocy5sZW5ndGggKiA0ICogMilcbiAgdmFyIGkgPSAwXG4gIGdseXBocy5mb3JFYWNoKGZ1bmN0aW9uIChnbHlwaCkge1xuICAgIHZhciBiaXRtYXAgPSBnbHlwaC5kYXRhXG5cbiAgICAvLyBib3R0b20gbGVmdCBwb3NpdGlvblxuICAgIHZhciB4ID0gZ2x5cGgucG9zaXRpb25bMF0gKyBiaXRtYXAueG9mZnNldFxuICAgIHZhciB5ID0gZ2x5cGgucG9zaXRpb25bMV0gKyBiaXRtYXAueW9mZnNldFxuXG4gICAgLy8gcXVhZCBzaXplXG4gICAgdmFyIHcgPSBiaXRtYXAud2lkdGhcbiAgICB2YXIgaCA9IGJpdG1hcC5oZWlnaHRcblxuICAgIC8vIEJMXG4gICAgcG9zaXRpb25zW2krK10gPSB4XG4gICAgcG9zaXRpb25zW2krK10gPSB5XG4gICAgLy8gVExcbiAgICBwb3NpdGlvbnNbaSsrXSA9IHhcbiAgICBwb3NpdGlvbnNbaSsrXSA9IHkgKyBoXG4gICAgLy8gVFJcbiAgICBwb3NpdGlvbnNbaSsrXSA9IHggKyB3XG4gICAgcG9zaXRpb25zW2krK10gPSB5ICsgaFxuICAgIC8vIEJSXG4gICAgcG9zaXRpb25zW2krK10gPSB4ICsgd1xuICAgIHBvc2l0aW9uc1tpKytdID0geVxuICB9KVxuICByZXR1cm4gcG9zaXRpb25zXG59XG4iLCJpZiAodHlwZW9mIE9iamVjdC5jcmVhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgLy8gaW1wbGVtZW50YXRpb24gZnJvbSBzdGFuZGFyZCBub2RlLmpzICd1dGlsJyBtb2R1bGVcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvclxuICAgIGN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckN0b3IucHJvdG90eXBlLCB7XG4gICAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgICB2YWx1ZTogY3RvcixcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbn0gZWxzZSB7XG4gIC8vIG9sZCBzY2hvb2wgc2hpbSBmb3Igb2xkIGJyb3dzZXJzXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5oZXJpdHMoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3JcbiAgICB2YXIgVGVtcEN0b3IgPSBmdW5jdGlvbiAoKSB7fVxuICAgIFRlbXBDdG9yLnByb3RvdHlwZSA9IHN1cGVyQ3Rvci5wcm90b3R5cGVcbiAgICBjdG9yLnByb3RvdHlwZSA9IG5ldyBUZW1wQ3RvcigpXG4gICAgY3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjdG9yXG4gIH1cbn1cbiIsInZhciB3b3JkV3JhcCA9IHJlcXVpcmUoJ3dvcmQtd3JhcHBlcicpXG52YXIgeHRlbmQgPSByZXF1aXJlKCd4dGVuZCcpXG52YXIgZmluZENoYXIgPSByZXF1aXJlKCdpbmRleG9mLXByb3BlcnR5JykoJ2lkJylcbnZhciBudW1iZXIgPSByZXF1aXJlKCdhcy1udW1iZXInKVxuXG52YXIgWF9IRUlHSFRTID0gWyd4JywgJ2UnLCAnYScsICdvJywgJ24nLCAncycsICdyJywgJ2MnLCAndScsICdtJywgJ3YnLCAndycsICd6J11cbnZhciBNX1dJRFRIUyA9IFsnbScsICd3J11cbnZhciBDQVBfSEVJR0hUUyA9IFsnSCcsICdJJywgJ04nLCAnRScsICdGJywgJ0snLCAnTCcsICdUJywgJ1UnLCAnVicsICdXJywgJ1gnLCAnWScsICdaJ11cblxuXG52YXIgVEFCX0lEID0gJ1xcdCcuY2hhckNvZGVBdCgwKVxudmFyIFNQQUNFX0lEID0gJyAnLmNoYXJDb2RlQXQoMClcbnZhciBBTElHTl9MRUZUID0gMCwgXG4gICAgQUxJR05fQ0VOVEVSID0gMSwgXG4gICAgQUxJR05fUklHSFQgPSAyXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlTGF5b3V0KG9wdCkge1xuICByZXR1cm4gbmV3IFRleHRMYXlvdXQob3B0KVxufVxuXG5mdW5jdGlvbiBUZXh0TGF5b3V0KG9wdCkge1xuICB0aGlzLmdseXBocyA9IFtdXG4gIHRoaXMuX21lYXN1cmUgPSB0aGlzLmNvbXB1dGVNZXRyaWNzLmJpbmQodGhpcylcbiAgdGhpcy51cGRhdGUob3B0KVxufVxuXG5UZXh0TGF5b3V0LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbihvcHQpIHtcbiAgb3B0ID0geHRlbmQoe1xuICAgIG1lYXN1cmU6IHRoaXMuX21lYXN1cmVcbiAgfSwgb3B0KVxuICB0aGlzLl9vcHQgPSBvcHRcbiAgdGhpcy5fb3B0LnRhYlNpemUgPSBudW1iZXIodGhpcy5fb3B0LnRhYlNpemUsIDQpXG5cbiAgaWYgKCFvcHQuZm9udClcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ211c3QgcHJvdmlkZSBhIHZhbGlkIGJpdG1hcCBmb250JylcblxuICB2YXIgZ2x5cGhzID0gdGhpcy5nbHlwaHNcbiAgdmFyIHRleHQgPSBvcHQudGV4dHx8JycgXG4gIHZhciBmb250ID0gb3B0LmZvbnRcbiAgdGhpcy5fc2V0dXBTcGFjZUdseXBocyhmb250KVxuICBcbiAgdmFyIGxpbmVzID0gd29yZFdyYXAubGluZXModGV4dCwgb3B0KVxuICB2YXIgbWluV2lkdGggPSBvcHQud2lkdGggfHwgMFxuXG4gIC8vY2xlYXIgZ2x5cGhzXG4gIGdseXBocy5sZW5ndGggPSAwXG5cbiAgLy9nZXQgbWF4IGxpbmUgd2lkdGhcbiAgdmFyIG1heExpbmVXaWR0aCA9IGxpbmVzLnJlZHVjZShmdW5jdGlvbihwcmV2LCBsaW5lKSB7XG4gICAgcmV0dXJuIE1hdGgubWF4KHByZXYsIGxpbmUud2lkdGgsIG1pbldpZHRoKVxuICB9LCAwKVxuXG4gIC8vdGhlIHBlbiBwb3NpdGlvblxuICB2YXIgeCA9IDBcbiAgdmFyIHkgPSAwXG4gIHZhciBsaW5lSGVpZ2h0ID0gbnVtYmVyKG9wdC5saW5lSGVpZ2h0LCBmb250LmNvbW1vbi5saW5lSGVpZ2h0KVxuICB2YXIgYmFzZWxpbmUgPSBmb250LmNvbW1vbi5iYXNlXG4gIHZhciBkZXNjZW5kZXIgPSBsaW5lSGVpZ2h0LWJhc2VsaW5lXG4gIHZhciBsZXR0ZXJTcGFjaW5nID0gb3B0LmxldHRlclNwYWNpbmcgfHwgMFxuICB2YXIgaGVpZ2h0ID0gbGluZUhlaWdodCAqIGxpbmVzLmxlbmd0aCAtIGRlc2NlbmRlclxuICB2YXIgYWxpZ24gPSBnZXRBbGlnblR5cGUodGhpcy5fb3B0LmFsaWduKVxuXG4gIC8vZHJhdyB0ZXh0IGFsb25nIGJhc2VsaW5lXG4gIHkgLT0gaGVpZ2h0XG4gIFxuICAvL3RoZSBtZXRyaWNzIGZvciB0aGlzIHRleHQgbGF5b3V0XG4gIHRoaXMuX3dpZHRoID0gbWF4TGluZVdpZHRoXG4gIHRoaXMuX2hlaWdodCA9IGhlaWdodFxuICB0aGlzLl9kZXNjZW5kZXIgPSBsaW5lSGVpZ2h0IC0gYmFzZWxpbmVcbiAgdGhpcy5fYmFzZWxpbmUgPSBiYXNlbGluZVxuICB0aGlzLl94SGVpZ2h0ID0gZ2V0WEhlaWdodChmb250KVxuICB0aGlzLl9jYXBIZWlnaHQgPSBnZXRDYXBIZWlnaHQoZm9udClcbiAgdGhpcy5fbGluZUhlaWdodCA9IGxpbmVIZWlnaHRcbiAgdGhpcy5fYXNjZW5kZXIgPSBsaW5lSGVpZ2h0IC0gZGVzY2VuZGVyIC0gdGhpcy5feEhlaWdodFxuICAgIFxuICAvL2xheW91dCBlYWNoIGdseXBoXG4gIHZhciBzZWxmID0gdGhpc1xuICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUsIGxpbmVJbmRleCkge1xuICAgIHZhciBzdGFydCA9IGxpbmUuc3RhcnRcbiAgICB2YXIgZW5kID0gbGluZS5lbmRcbiAgICB2YXIgbGluZVdpZHRoID0gbGluZS53aWR0aFxuICAgIHZhciBsYXN0R2x5cGhcbiAgICBcbiAgICAvL2ZvciBlYWNoIGdseXBoIGluIHRoYXQgbGluZS4uLlxuICAgIGZvciAodmFyIGk9c3RhcnQ7IGk8ZW5kOyBpKyspIHtcbiAgICAgIHZhciBpZCA9IHRleHQuY2hhckNvZGVBdChpKVxuICAgICAgdmFyIGdseXBoID0gc2VsZi5nZXRHbHlwaChmb250LCBpZClcbiAgICAgIGlmIChnbHlwaCkge1xuICAgICAgICBpZiAobGFzdEdseXBoKSBcbiAgICAgICAgICB4ICs9IGdldEtlcm5pbmcoZm9udCwgbGFzdEdseXBoLmlkLCBnbHlwaC5pZClcblxuICAgICAgICB2YXIgdHggPSB4XG4gICAgICAgIGlmIChhbGlnbiA9PT0gQUxJR05fQ0VOVEVSKSBcbiAgICAgICAgICB0eCArPSAobWF4TGluZVdpZHRoLWxpbmVXaWR0aCkvMlxuICAgICAgICBlbHNlIGlmIChhbGlnbiA9PT0gQUxJR05fUklHSFQpXG4gICAgICAgICAgdHggKz0gKG1heExpbmVXaWR0aC1saW5lV2lkdGgpXG5cbiAgICAgICAgZ2x5cGhzLnB1c2goe1xuICAgICAgICAgIHBvc2l0aW9uOiBbdHgsIHldLFxuICAgICAgICAgIGRhdGE6IGdseXBoLFxuICAgICAgICAgIGluZGV4OiBpLFxuICAgICAgICAgIGxpbmU6IGxpbmVJbmRleFxuICAgICAgICB9KSAgXG5cbiAgICAgICAgLy9tb3ZlIHBlbiBmb3J3YXJkXG4gICAgICAgIHggKz0gZ2x5cGgueGFkdmFuY2UgKyBsZXR0ZXJTcGFjaW5nXG4gICAgICAgIGxhc3RHbHlwaCA9IGdseXBoXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy9uZXh0IGxpbmUgZG93blxuICAgIHkgKz0gbGluZUhlaWdodFxuICAgIHggPSAwXG4gIH0pXG4gIHRoaXMuX2xpbmVzVG90YWwgPSBsaW5lcy5sZW5ndGg7XG59XG5cblRleHRMYXlvdXQucHJvdG90eXBlLl9zZXR1cFNwYWNlR2x5cGhzID0gZnVuY3Rpb24oZm9udCkge1xuICAvL1RoZXNlIGFyZSBmYWxsYmFja3MsIHdoZW4gdGhlIGZvbnQgZG9lc24ndCBpbmNsdWRlXG4gIC8vJyAnIG9yICdcXHQnIGdseXBoc1xuICB0aGlzLl9mYWxsYmFja1NwYWNlR2x5cGggPSBudWxsXG4gIHRoaXMuX2ZhbGxiYWNrVGFiR2x5cGggPSBudWxsXG5cbiAgaWYgKCFmb250LmNoYXJzIHx8IGZvbnQuY2hhcnMubGVuZ3RoID09PSAwKVxuICAgIHJldHVyblxuXG4gIC8vdHJ5IHRvIGdldCBzcGFjZSBnbHlwaFxuICAvL3RoZW4gZmFsbCBiYWNrIHRvIHRoZSAnbScgb3IgJ3cnIGdseXBoc1xuICAvL3RoZW4gZmFsbCBiYWNrIHRvIHRoZSBmaXJzdCBnbHlwaCBhdmFpbGFibGVcbiAgdmFyIHNwYWNlID0gZ2V0R2x5cGhCeUlkKGZvbnQsIFNQQUNFX0lEKSBcbiAgICAgICAgICB8fCBnZXRNR2x5cGgoZm9udCkgXG4gICAgICAgICAgfHwgZm9udC5jaGFyc1swXVxuXG4gIC8vYW5kIGNyZWF0ZSBhIGZhbGxiYWNrIGZvciB0YWJcbiAgdmFyIHRhYldpZHRoID0gdGhpcy5fb3B0LnRhYlNpemUgKiBzcGFjZS54YWR2YW5jZVxuICB0aGlzLl9mYWxsYmFja1NwYWNlR2x5cGggPSBzcGFjZVxuICB0aGlzLl9mYWxsYmFja1RhYkdseXBoID0geHRlbmQoc3BhY2UsIHtcbiAgICB4OiAwLCB5OiAwLCB4YWR2YW5jZTogdGFiV2lkdGgsIGlkOiBUQUJfSUQsIFxuICAgIHhvZmZzZXQ6IDAsIHlvZmZzZXQ6IDAsIHdpZHRoOiAwLCBoZWlnaHQ6IDBcbiAgfSlcbn1cblxuVGV4dExheW91dC5wcm90b3R5cGUuZ2V0R2x5cGggPSBmdW5jdGlvbihmb250LCBpZCkge1xuICB2YXIgZ2x5cGggPSBnZXRHbHlwaEJ5SWQoZm9udCwgaWQpXG4gIGlmIChnbHlwaClcbiAgICByZXR1cm4gZ2x5cGhcbiAgZWxzZSBpZiAoaWQgPT09IFRBQl9JRCkgXG4gICAgcmV0dXJuIHRoaXMuX2ZhbGxiYWNrVGFiR2x5cGhcbiAgZWxzZSBpZiAoaWQgPT09IFNQQUNFX0lEKSBcbiAgICByZXR1cm4gdGhpcy5fZmFsbGJhY2tTcGFjZUdseXBoXG4gIHJldHVybiBudWxsXG59XG5cblRleHRMYXlvdXQucHJvdG90eXBlLmNvbXB1dGVNZXRyaWNzID0gZnVuY3Rpb24odGV4dCwgc3RhcnQsIGVuZCwgd2lkdGgpIHtcbiAgdmFyIGxldHRlclNwYWNpbmcgPSB0aGlzLl9vcHQubGV0dGVyU3BhY2luZyB8fCAwXG4gIHZhciBmb250ID0gdGhpcy5fb3B0LmZvbnRcbiAgdmFyIGN1clBlbiA9IDBcbiAgdmFyIGN1cldpZHRoID0gMFxuICB2YXIgY291bnQgPSAwXG4gIHZhciBnbHlwaFxuICB2YXIgbGFzdEdseXBoXG5cbiAgaWYgKCFmb250LmNoYXJzIHx8IGZvbnQuY2hhcnMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgIGVuZDogc3RhcnQsXG4gICAgICB3aWR0aDogMFxuICAgIH1cbiAgfVxuXG4gIGVuZCA9IE1hdGgubWluKHRleHQubGVuZ3RoLCBlbmQpXG4gIGZvciAodmFyIGk9c3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgIHZhciBpZCA9IHRleHQuY2hhckNvZGVBdChpKVxuICAgIHZhciBnbHlwaCA9IHRoaXMuZ2V0R2x5cGgoZm9udCwgaWQpXG5cbiAgICBpZiAoZ2x5cGgpIHtcbiAgICAgIC8vbW92ZSBwZW4gZm9yd2FyZFxuICAgICAgdmFyIHhvZmYgPSBnbHlwaC54b2Zmc2V0XG4gICAgICB2YXIga2VybiA9IGxhc3RHbHlwaCA/IGdldEtlcm5pbmcoZm9udCwgbGFzdEdseXBoLmlkLCBnbHlwaC5pZCkgOiAwXG4gICAgICBjdXJQZW4gKz0ga2VyblxuXG4gICAgICB2YXIgbmV4dFBlbiA9IGN1clBlbiArIGdseXBoLnhhZHZhbmNlICsgbGV0dGVyU3BhY2luZ1xuICAgICAgdmFyIG5leHRXaWR0aCA9IGN1clBlbiArIGdseXBoLndpZHRoXG5cbiAgICAgIC8vd2UndmUgaGl0IG91ciBsaW1pdDsgd2UgY2FuJ3QgbW92ZSBvbnRvIHRoZSBuZXh0IGdseXBoXG4gICAgICBpZiAobmV4dFdpZHRoID49IHdpZHRoIHx8IG5leHRQZW4gPj0gd2lkdGgpXG4gICAgICAgIGJyZWFrXG5cbiAgICAgIC8vb3RoZXJ3aXNlIGNvbnRpbnVlIGFsb25nIG91ciBsaW5lXG4gICAgICBjdXJQZW4gPSBuZXh0UGVuXG4gICAgICBjdXJXaWR0aCA9IG5leHRXaWR0aFxuICAgICAgbGFzdEdseXBoID0gZ2x5cGhcbiAgICB9XG4gICAgY291bnQrK1xuICB9XG4gIFxuICAvL21ha2Ugc3VyZSByaWdodG1vc3QgZWRnZSBsaW5lcyB1cCB3aXRoIHJlbmRlcmVkIGdseXBoc1xuICBpZiAobGFzdEdseXBoKVxuICAgIGN1cldpZHRoICs9IGxhc3RHbHlwaC54b2Zmc2V0XG5cbiAgcmV0dXJuIHtcbiAgICBzdGFydDogc3RhcnQsXG4gICAgZW5kOiBzdGFydCArIGNvdW50LFxuICAgIHdpZHRoOiBjdXJXaWR0aFxuICB9XG59XG5cbi8vZ2V0dGVycyBmb3IgdGhlIHByaXZhdGUgdmFyc1xuO1snd2lkdGgnLCAnaGVpZ2h0JywgXG4gICdkZXNjZW5kZXInLCAnYXNjZW5kZXInLFxuICAneEhlaWdodCcsICdiYXNlbGluZScsXG4gICdjYXBIZWlnaHQnLFxuICAnbGluZUhlaWdodCcgXS5mb3JFYWNoKGFkZEdldHRlcilcblxuZnVuY3Rpb24gYWRkR2V0dGVyKG5hbWUpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRleHRMYXlvdXQucHJvdG90eXBlLCBuYW1lLCB7XG4gICAgZ2V0OiB3cmFwcGVyKG5hbWUpLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KVxufVxuXG4vL2NyZWF0ZSBsb29rdXBzIGZvciBwcml2YXRlIHZhcnNcbmZ1bmN0aW9uIHdyYXBwZXIobmFtZSkge1xuICByZXR1cm4gKG5ldyBGdW5jdGlvbihbXG4gICAgJ3JldHVybiBmdW5jdGlvbiAnK25hbWUrJygpIHsnLFxuICAgICcgIHJldHVybiB0aGlzLl8nK25hbWUsXG4gICAgJ30nXG4gIF0uam9pbignXFxuJykpKSgpXG59XG5cbmZ1bmN0aW9uIGdldEdseXBoQnlJZChmb250LCBpZCkge1xuICBpZiAoIWZvbnQuY2hhcnMgfHwgZm9udC5jaGFycy5sZW5ndGggPT09IDApXG4gICAgcmV0dXJuIG51bGxcblxuICB2YXIgZ2x5cGhJZHggPSBmaW5kQ2hhcihmb250LmNoYXJzLCBpZClcbiAgaWYgKGdseXBoSWR4ID49IDApXG4gICAgcmV0dXJuIGZvbnQuY2hhcnNbZ2x5cGhJZHhdXG4gIHJldHVybiBudWxsXG59XG5cbmZ1bmN0aW9uIGdldFhIZWlnaHQoZm9udCkge1xuICBmb3IgKHZhciBpPTA7IGk8WF9IRUlHSFRTLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGlkID0gWF9IRUlHSFRTW2ldLmNoYXJDb2RlQXQoMClcbiAgICB2YXIgaWR4ID0gZmluZENoYXIoZm9udC5jaGFycywgaWQpXG4gICAgaWYgKGlkeCA+PSAwKSBcbiAgICAgIHJldHVybiBmb250LmNoYXJzW2lkeF0uaGVpZ2h0XG4gIH1cbiAgcmV0dXJuIDBcbn1cblxuZnVuY3Rpb24gZ2V0TUdseXBoKGZvbnQpIHtcbiAgZm9yICh2YXIgaT0wOyBpPE1fV0lEVEhTLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGlkID0gTV9XSURUSFNbaV0uY2hhckNvZGVBdCgwKVxuICAgIHZhciBpZHggPSBmaW5kQ2hhcihmb250LmNoYXJzLCBpZClcbiAgICBpZiAoaWR4ID49IDApIFxuICAgICAgcmV0dXJuIGZvbnQuY2hhcnNbaWR4XVxuICB9XG4gIHJldHVybiAwXG59XG5cbmZ1bmN0aW9uIGdldENhcEhlaWdodChmb250KSB7XG4gIGZvciAodmFyIGk9MDsgaTxDQVBfSEVJR0hUUy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpZCA9IENBUF9IRUlHSFRTW2ldLmNoYXJDb2RlQXQoMClcbiAgICB2YXIgaWR4ID0gZmluZENoYXIoZm9udC5jaGFycywgaWQpXG4gICAgaWYgKGlkeCA+PSAwKSBcbiAgICAgIHJldHVybiBmb250LmNoYXJzW2lkeF0uaGVpZ2h0XG4gIH1cbiAgcmV0dXJuIDBcbn1cblxuZnVuY3Rpb24gZ2V0S2VybmluZyhmb250LCBsZWZ0LCByaWdodCkge1xuICBpZiAoIWZvbnQua2VybmluZ3MgfHwgZm9udC5rZXJuaW5ncy5sZW5ndGggPT09IDApXG4gICAgcmV0dXJuIDBcblxuICB2YXIgdGFibGUgPSBmb250Lmtlcm5pbmdzXG4gIGZvciAodmFyIGk9MDsgaTx0YWJsZS5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXJuID0gdGFibGVbaV1cbiAgICBpZiAoa2Vybi5maXJzdCA9PT0gbGVmdCAmJiBrZXJuLnNlY29uZCA9PT0gcmlnaHQpXG4gICAgICByZXR1cm4ga2Vybi5hbW91bnRcbiAgfVxuICByZXR1cm4gMFxufVxuXG5mdW5jdGlvbiBnZXRBbGlnblR5cGUoYWxpZ24pIHtcbiAgaWYgKGFsaWduID09PSAnY2VudGVyJylcbiAgICByZXR1cm4gQUxJR05fQ0VOVEVSXG4gIGVsc2UgaWYgKGFsaWduID09PSAncmlnaHQnKVxuICAgIHJldHVybiBBTElHTl9SSUdIVFxuICByZXR1cm4gQUxJR05fTEVGVFxufSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbnVtdHlwZShudW0sIGRlZikge1xuXHRyZXR1cm4gdHlwZW9mIG51bSA9PT0gJ251bWJlcidcblx0XHQ/IG51bSBcblx0XHQ6ICh0eXBlb2YgZGVmID09PSAnbnVtYmVyJyA/IGRlZiA6IDApXG59IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb21waWxlKHByb3BlcnR5KSB7XG5cdGlmICghcHJvcGVydHkgfHwgdHlwZW9mIHByb3BlcnR5ICE9PSAnc3RyaW5nJylcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ211c3Qgc3BlY2lmeSBwcm9wZXJ0eSBmb3IgaW5kZXhvZiBzZWFyY2gnKVxuXG5cdHJldHVybiBuZXcgRnVuY3Rpb24oJ2FycmF5JywgJ3ZhbHVlJywgJ3N0YXJ0JywgW1xuXHRcdCdzdGFydCA9IHN0YXJ0IHx8IDAnLFxuXHRcdCdmb3IgKHZhciBpPXN0YXJ0OyBpPGFycmF5Lmxlbmd0aDsgaSsrKScsXG5cdFx0JyAgaWYgKGFycmF5W2ldW1wiJyArIHByb3BlcnR5ICsnXCJdID09PSB2YWx1ZSknLFxuXHRcdCcgICAgICByZXR1cm4gaScsXG5cdFx0J3JldHVybiAtMSdcblx0XS5qb2luKCdcXG4nKSlcbn0iLCJ2YXIgbmV3bGluZSA9IC9cXG4vXG52YXIgbmV3bGluZUNoYXIgPSAnXFxuJ1xudmFyIHdoaXRlc3BhY2UgPSAvXFxzL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRleHQsIG9wdCkge1xuICAgIHZhciBsaW5lcyA9IG1vZHVsZS5leHBvcnRzLmxpbmVzKHRleHQsIG9wdClcbiAgICByZXR1cm4gbGluZXMubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgcmV0dXJuIHRleHQuc3Vic3RyaW5nKGxpbmUuc3RhcnQsIGxpbmUuZW5kKVxuICAgIH0pLmpvaW4oJ1xcbicpXG59XG5cbm1vZHVsZS5leHBvcnRzLmxpbmVzID0gZnVuY3Rpb24gd29yZHdyYXAodGV4dCwgb3B0KSB7XG4gICAgb3B0ID0gb3B0fHx7fVxuXG4gICAgLy96ZXJvIHdpZHRoIHJlc3VsdHMgaW4gbm90aGluZyB2aXNpYmxlXG4gICAgaWYgKG9wdC53aWR0aCA9PT0gMCAmJiBvcHQubW9kZSAhPT0gJ25vd3JhcCcpIFxuICAgICAgICByZXR1cm4gW11cblxuICAgIHRleHQgPSB0ZXh0fHwnJ1xuICAgIHZhciB3aWR0aCA9IHR5cGVvZiBvcHQud2lkdGggPT09ICdudW1iZXInID8gb3B0LndpZHRoIDogTnVtYmVyLk1BWF9WQUxVRVxuICAgIHZhciBzdGFydCA9IE1hdGgubWF4KDAsIG9wdC5zdGFydHx8MClcbiAgICB2YXIgZW5kID0gdHlwZW9mIG9wdC5lbmQgPT09ICdudW1iZXInID8gb3B0LmVuZCA6IHRleHQubGVuZ3RoXG4gICAgdmFyIG1vZGUgPSBvcHQubW9kZVxuXG4gICAgdmFyIG1lYXN1cmUgPSBvcHQubWVhc3VyZSB8fCBtb25vc3BhY2VcbiAgICBpZiAobW9kZSA9PT0gJ3ByZScpXG4gICAgICAgIHJldHVybiBwcmUobWVhc3VyZSwgdGV4dCwgc3RhcnQsIGVuZCwgd2lkdGgpXG4gICAgZWxzZVxuICAgICAgICByZXR1cm4gZ3JlZWR5KG1lYXN1cmUsIHRleHQsIHN0YXJ0LCBlbmQsIHdpZHRoLCBtb2RlKVxufVxuXG5mdW5jdGlvbiBpZHhPZih0ZXh0LCBjaHIsIHN0YXJ0LCBlbmQpIHtcbiAgICB2YXIgaWR4ID0gdGV4dC5pbmRleE9mKGNociwgc3RhcnQpXG4gICAgaWYgKGlkeCA9PT0gLTEgfHwgaWR4ID4gZW5kKVxuICAgICAgICByZXR1cm4gZW5kXG4gICAgcmV0dXJuIGlkeFxufVxuXG5mdW5jdGlvbiBpc1doaXRlc3BhY2UoY2hyKSB7XG4gICAgcmV0dXJuIHdoaXRlc3BhY2UudGVzdChjaHIpXG59XG5cbmZ1bmN0aW9uIHByZShtZWFzdXJlLCB0ZXh0LCBzdGFydCwgZW5kLCB3aWR0aCkge1xuICAgIHZhciBsaW5lcyA9IFtdXG4gICAgdmFyIGxpbmVTdGFydCA9IHN0YXJ0XG4gICAgZm9yICh2YXIgaT1zdGFydDsgaTxlbmQgJiYgaTx0ZXh0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjaHIgPSB0ZXh0LmNoYXJBdChpKVxuICAgICAgICB2YXIgaXNOZXdsaW5lID0gbmV3bGluZS50ZXN0KGNocilcblxuICAgICAgICAvL0lmIHdlJ3ZlIHJlYWNoZWQgYSBuZXdsaW5lLCB0aGVuIHN0ZXAgZG93biBhIGxpbmVcbiAgICAgICAgLy9PciBpZiB3ZSd2ZSByZWFjaGVkIHRoZSBFT0ZcbiAgICAgICAgaWYgKGlzTmV3bGluZSB8fCBpPT09ZW5kLTEpIHtcbiAgICAgICAgICAgIHZhciBsaW5lRW5kID0gaXNOZXdsaW5lID8gaSA6IGkrMVxuICAgICAgICAgICAgdmFyIG1lYXN1cmVkID0gbWVhc3VyZSh0ZXh0LCBsaW5lU3RhcnQsIGxpbmVFbmQsIHdpZHRoKVxuICAgICAgICAgICAgbGluZXMucHVzaChtZWFzdXJlZClcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGluZVN0YXJ0ID0gaSsxXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGxpbmVzXG59XG5cbmZ1bmN0aW9uIGdyZWVkeShtZWFzdXJlLCB0ZXh0LCBzdGFydCwgZW5kLCB3aWR0aCwgbW9kZSkge1xuICAgIC8vQSBncmVlZHkgd29yZCB3cmFwcGVyIGJhc2VkIG9uIExpYkdEWCBhbGdvcml0aG1cbiAgICAvL2h0dHBzOi8vZ2l0aHViLmNvbS9saWJnZHgvbGliZ2R4L2Jsb2IvbWFzdGVyL2dkeC9zcmMvY29tL2JhZGxvZ2ljL2dkeC9ncmFwaGljcy9nMmQvQml0bWFwRm9udENhY2hlLmphdmFcbiAgICB2YXIgbGluZXMgPSBbXVxuXG4gICAgdmFyIHRlc3RXaWR0aCA9IHdpZHRoXG4gICAgLy9pZiAnbm93cmFwJyBpcyBzcGVjaWZpZWQsIHdlIG9ubHkgd3JhcCBvbiBuZXdsaW5lIGNoYXJzXG4gICAgaWYgKG1vZGUgPT09ICdub3dyYXAnKVxuICAgICAgICB0ZXN0V2lkdGggPSBOdW1iZXIuTUFYX1ZBTFVFXG5cbiAgICB3aGlsZSAoc3RhcnQgPCBlbmQgJiYgc3RhcnQgPCB0ZXh0Lmxlbmd0aCkge1xuICAgICAgICAvL2dldCBuZXh0IG5ld2xpbmUgcG9zaXRpb25cbiAgICAgICAgdmFyIG5ld0xpbmUgPSBpZHhPZih0ZXh0LCBuZXdsaW5lQ2hhciwgc3RhcnQsIGVuZClcblxuICAgICAgICAvL2VhdCB3aGl0ZXNwYWNlIGF0IHN0YXJ0IG9mIGxpbmVcbiAgICAgICAgd2hpbGUgKHN0YXJ0IDwgbmV3TGluZSkge1xuICAgICAgICAgICAgaWYgKCFpc1doaXRlc3BhY2UoIHRleHQuY2hhckF0KHN0YXJ0KSApKVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBzdGFydCsrXG4gICAgICAgIH1cblxuICAgICAgICAvL2RldGVybWluZSB2aXNpYmxlICMgb2YgZ2x5cGhzIGZvciB0aGUgYXZhaWxhYmxlIHdpZHRoXG4gICAgICAgIHZhciBtZWFzdXJlZCA9IG1lYXN1cmUodGV4dCwgc3RhcnQsIG5ld0xpbmUsIHRlc3RXaWR0aClcblxuICAgICAgICB2YXIgbGluZUVuZCA9IHN0YXJ0ICsgKG1lYXN1cmVkLmVuZC1tZWFzdXJlZC5zdGFydClcbiAgICAgICAgdmFyIG5leHRTdGFydCA9IGxpbmVFbmQgKyBuZXdsaW5lQ2hhci5sZW5ndGhcblxuICAgICAgICAvL2lmIHdlIGhhZCB0byBjdXQgdGhlIGxpbmUgYmVmb3JlIHRoZSBuZXh0IG5ld2xpbmUuLi5cbiAgICAgICAgaWYgKGxpbmVFbmQgPCBuZXdMaW5lKSB7XG4gICAgICAgICAgICAvL2ZpbmQgY2hhciB0byBicmVhayBvblxuICAgICAgICAgICAgd2hpbGUgKGxpbmVFbmQgPiBzdGFydCkge1xuICAgICAgICAgICAgICAgIGlmIChpc1doaXRlc3BhY2UodGV4dC5jaGFyQXQobGluZUVuZCkpKVxuICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIGxpbmVFbmQtLVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxpbmVFbmQgPT09IHN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgaWYgKG5leHRTdGFydCA+IHN0YXJ0ICsgbmV3bGluZUNoYXIubGVuZ3RoKSBuZXh0U3RhcnQtLVxuICAgICAgICAgICAgICAgIGxpbmVFbmQgPSBuZXh0U3RhcnQgLy8gSWYgbm8gY2hhcmFjdGVycyB0byBicmVhaywgc2hvdyBhbGwuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5leHRTdGFydCA9IGxpbmVFbmRcbiAgICAgICAgICAgICAgICAvL2VhdCB3aGl0ZXNwYWNlIGF0IGVuZCBvZiBsaW5lXG4gICAgICAgICAgICAgICAgd2hpbGUgKGxpbmVFbmQgPiBzdGFydCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzV2hpdGVzcGFjZSh0ZXh0LmNoYXJBdChsaW5lRW5kIC0gbmV3bGluZUNoYXIubGVuZ3RoKSkpXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICBsaW5lRW5kLS1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxpbmVFbmQgPj0gc3RhcnQpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBtZWFzdXJlKHRleHQsIHN0YXJ0LCBsaW5lRW5kLCB0ZXN0V2lkdGgpXG4gICAgICAgICAgICBsaW5lcy5wdXNoKHJlc3VsdClcbiAgICAgICAgfVxuICAgICAgICBzdGFydCA9IG5leHRTdGFydFxuICAgIH1cbiAgICByZXR1cm4gbGluZXNcbn1cblxuLy9kZXRlcm1pbmVzIHRoZSB2aXNpYmxlIG51bWJlciBvZiBnbHlwaHMgd2l0aGluIGEgZ2l2ZW4gd2lkdGhcbmZ1bmN0aW9uIG1vbm9zcGFjZSh0ZXh0LCBzdGFydCwgZW5kLCB3aWR0aCkge1xuICAgIHZhciBnbHlwaHMgPSBNYXRoLm1pbih3aWR0aCwgZW5kLXN0YXJ0KVxuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgZW5kOiBzdGFydCtnbHlwaHNcbiAgICB9XG59IiwiJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuXHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxuZnVuY3Rpb24gc2hvdWxkVXNlTmF0aXZlKCkge1xuXHR0cnkge1xuXHRcdGlmICghT2JqZWN0LmFzc2lnbikge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIERldGVjdCBidWdneSBwcm9wZXJ0eSBlbnVtZXJhdGlvbiBvcmRlciBpbiBvbGRlciBWOCB2ZXJzaW9ucy5cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTQxMThcblx0XHR2YXIgdGVzdDEgPSBuZXcgU3RyaW5nKCdhYmMnKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblx0XHR0ZXN0MVs1XSA9ICdkZSc7XG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QxKVswXSA9PT0gJzUnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MiA9IHt9O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0dGVzdDJbJ18nICsgU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpO1xuXHRcdH1cblx0XHR2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuXHRcdFx0cmV0dXJuIHRlc3QyW25dO1xuXHRcdH0pO1xuXHRcdGlmIChvcmRlcjIuam9pbignJykgIT09ICcwMTIzNDU2Nzg5Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDMgPSB7fTtcblx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRcdHRlc3QzW2xldHRlcl0gPSBsZXR0ZXI7XG5cdFx0fSk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG5cdFx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdC8vIFdlIGRvbid0IGV4cGVjdCBhbnkgb2YgdGhlIGFib3ZlIHRvIHRocm93LCBidXQgYmV0dGVyIHRvIGJlIHNhZmUuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hvdWxkVXNlTmF0aXZlKCkgPyBPYmplY3QuYXNzaWduIDogZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdHZhciBmcm9tO1xuXHR2YXIgdG8gPSB0b09iamVjdCh0YXJnZXQpO1xuXHR2YXIgc3ltYm9scztcblxuXHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuXHRcdGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG5cdFx0XHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG5cdFx0XHRcdHRvW2tleV0gPSBmcm9tW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIiwidmFyIGR0eXBlID0gcmVxdWlyZSgnZHR5cGUnKVxudmFyIGFuQXJyYXkgPSByZXF1aXJlKCdhbi1hcnJheScpXG52YXIgaXNCdWZmZXIgPSByZXF1aXJlKCdpcy1idWZmZXInKVxuXG52YXIgQ1cgPSBbMCwgMiwgM11cbnZhciBDQ1cgPSBbMiwgMSwgM11cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGVRdWFkRWxlbWVudHMoYXJyYXksIG9wdCkge1xuICAgIC8vaWYgdXNlciBkaWRuJ3Qgc3BlY2lmeSBhbiBvdXRwdXQgYXJyYXlcbiAgICBpZiAoIWFycmF5IHx8ICEoYW5BcnJheShhcnJheSkgfHwgaXNCdWZmZXIoYXJyYXkpKSkge1xuICAgICAgICBvcHQgPSBhcnJheSB8fCB7fVxuICAgICAgICBhcnJheSA9IG51bGxcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG9wdCA9PT0gJ251bWJlcicpIC8vYmFja3dhcmRzLWNvbXBhdGlibGVcbiAgICAgICAgb3B0ID0geyBjb3VudDogb3B0IH1cbiAgICBlbHNlXG4gICAgICAgIG9wdCA9IG9wdCB8fCB7fVxuXG4gICAgdmFyIHR5cGUgPSB0eXBlb2Ygb3B0LnR5cGUgPT09ICdzdHJpbmcnID8gb3B0LnR5cGUgOiAndWludDE2J1xuICAgIHZhciBjb3VudCA9IHR5cGVvZiBvcHQuY291bnQgPT09ICdudW1iZXInID8gb3B0LmNvdW50IDogMVxuICAgIHZhciBzdGFydCA9IChvcHQuc3RhcnQgfHwgMCkgXG5cbiAgICB2YXIgZGlyID0gb3B0LmNsb2Nrd2lzZSAhPT0gZmFsc2UgPyBDVyA6IENDVyxcbiAgICAgICAgYSA9IGRpclswXSwgXG4gICAgICAgIGIgPSBkaXJbMV0sXG4gICAgICAgIGMgPSBkaXJbMl1cblxuICAgIHZhciBudW1JbmRpY2VzID0gY291bnQgKiA2XG5cbiAgICB2YXIgaW5kaWNlcyA9IGFycmF5IHx8IG5ldyAoZHR5cGUodHlwZSkpKG51bUluZGljZXMpXG4gICAgZm9yICh2YXIgaSA9IDAsIGogPSAwOyBpIDwgbnVtSW5kaWNlczsgaSArPSA2LCBqICs9IDQpIHtcbiAgICAgICAgdmFyIHggPSBpICsgc3RhcnRcbiAgICAgICAgaW5kaWNlc1t4ICsgMF0gPSBqICsgMFxuICAgICAgICBpbmRpY2VzW3ggKyAxXSA9IGogKyAxXG4gICAgICAgIGluZGljZXNbeCArIDJdID0gaiArIDJcbiAgICAgICAgaW5kaWNlc1t4ICsgM10gPSBqICsgYVxuICAgICAgICBpbmRpY2VzW3ggKyA0XSA9IGogKyBiXG4gICAgICAgIGluZGljZXNbeCArIDVdID0gaiArIGNcbiAgICB9XG4gICAgcmV0dXJuIGluZGljZXNcbn0iLCJ2YXIgc3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFuQXJyYXlcblxuZnVuY3Rpb24gYW5BcnJheShhcnIpIHtcbiAgcmV0dXJuIChcbiAgICAgICBhcnIuQllURVNfUEVSX0VMRU1FTlRcbiAgICAmJiBzdHIuY2FsbChhcnIuYnVmZmVyKSA9PT0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJ1xuICAgIHx8IEFycmF5LmlzQXJyYXkoYXJyKVxuICApXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGR0eXBlKSB7XG4gIHN3aXRjaCAoZHR5cGUpIHtcbiAgICBjYXNlICdpbnQ4JzpcbiAgICAgIHJldHVybiBJbnQ4QXJyYXlcbiAgICBjYXNlICdpbnQxNic6XG4gICAgICByZXR1cm4gSW50MTZBcnJheVxuICAgIGNhc2UgJ2ludDMyJzpcbiAgICAgIHJldHVybiBJbnQzMkFycmF5XG4gICAgY2FzZSAndWludDgnOlxuICAgICAgcmV0dXJuIFVpbnQ4QXJyYXlcbiAgICBjYXNlICd1aW50MTYnOlxuICAgICAgcmV0dXJuIFVpbnQxNkFycmF5XG4gICAgY2FzZSAndWludDMyJzpcbiAgICAgIHJldHVybiBVaW50MzJBcnJheVxuICAgIGNhc2UgJ2Zsb2F0MzInOlxuICAgICAgcmV0dXJuIEZsb2F0MzJBcnJheVxuICAgIGNhc2UgJ2Zsb2F0NjQnOlxuICAgICAgcmV0dXJuIEZsb2F0NjRBcnJheVxuICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgIHJldHVybiBBcnJheVxuICAgIGNhc2UgJ3VpbnQ4X2NsYW1wZWQnOlxuICAgICAgcmV0dXJuIFVpbnQ4Q2xhbXBlZEFycmF5XG4gIH1cbn1cbiIsIi8qIVxuICogRGV0ZXJtaW5lIGlmIGFuIG9iamVjdCBpcyBhIEJ1ZmZlclxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxmZXJvc3NAZmVyb3NzLm9yZz4gPGh0dHA6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG5cbi8vIFRoZSBfaXNCdWZmZXIgY2hlY2sgaXMgZm9yIFNhZmFyaSA1LTcgc3VwcG9ydCwgYmVjYXVzZSBpdCdzIG1pc3Npbmdcbi8vIE9iamVjdC5wcm90b3R5cGUuY29uc3RydWN0b3IuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHlcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICE9IG51bGwgJiYgKGlzQnVmZmVyKG9iaikgfHwgaXNTbG93QnVmZmVyKG9iaikgfHwgISFvYmouX2lzQnVmZmVyKVxufVxuXG5mdW5jdGlvbiBpc0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiAhIW9iai5jb25zdHJ1Y3RvciAmJiB0eXBlb2Ygb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopXG59XG5cbi8vIEZvciBOb2RlIHYwLjEwIHN1cHBvcnQuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHkuXG5mdW5jdGlvbiBpc1Nsb3dCdWZmZXIgKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iai5yZWFkRmxvYXRMRSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqLnNsaWNlID09PSAnZnVuY3Rpb24nICYmIGlzQnVmZmVyKG9iai5zbGljZSgwLCAwKSlcbn1cbiIsInZhciBmbGF0dGVuID0gcmVxdWlyZSgnZmxhdHRlbi12ZXJ0ZXgtZGF0YScpXG5cbm1vZHVsZS5leHBvcnRzLmF0dHIgPSBzZXRBdHRyaWJ1dGVcbm1vZHVsZS5leHBvcnRzLmluZGV4ID0gc2V0SW5kZXhcblxuZnVuY3Rpb24gc2V0SW5kZXggKGdlb21ldHJ5LCBkYXRhLCBpdGVtU2l6ZSwgZHR5cGUpIHtcbiAgaWYgKHR5cGVvZiBpdGVtU2l6ZSAhPT0gJ251bWJlcicpIGl0ZW1TaXplID0gMVxuICBpZiAodHlwZW9mIGR0eXBlICE9PSAnc3RyaW5nJykgZHR5cGUgPSAndWludDE2J1xuXG4gIHZhciBpc1I2OSA9ICFnZW9tZXRyeS5pbmRleCAmJiB0eXBlb2YgZ2VvbWV0cnkuc2V0SW5kZXggIT09ICdmdW5jdGlvbidcbiAgdmFyIGF0dHJpYiA9IGlzUjY5ID8gZ2VvbWV0cnkuZ2V0QXR0cmlidXRlKCdpbmRleCcpIDogZ2VvbWV0cnkuaW5kZXhcbiAgdmFyIG5ld0F0dHJpYiA9IHVwZGF0ZUF0dHJpYnV0ZShhdHRyaWIsIGRhdGEsIGl0ZW1TaXplLCBkdHlwZSlcbiAgaWYgKG5ld0F0dHJpYikge1xuICAgIGlmIChpc1I2OSkgZ2VvbWV0cnkuYWRkQXR0cmlidXRlKCdpbmRleCcsIG5ld0F0dHJpYilcbiAgICBlbHNlIGdlb21ldHJ5LmluZGV4ID0gbmV3QXR0cmliXG4gIH1cbn1cblxuZnVuY3Rpb24gc2V0QXR0cmlidXRlIChnZW9tZXRyeSwga2V5LCBkYXRhLCBpdGVtU2l6ZSwgZHR5cGUpIHtcbiAgaWYgKHR5cGVvZiBpdGVtU2l6ZSAhPT0gJ251bWJlcicpIGl0ZW1TaXplID0gM1xuICBpZiAodHlwZW9mIGR0eXBlICE9PSAnc3RyaW5nJykgZHR5cGUgPSAnZmxvYXQzMidcbiAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkgJiZcbiAgICBBcnJheS5pc0FycmF5KGRhdGFbMF0pICYmXG4gICAgZGF0YVswXS5sZW5ndGggIT09IGl0ZW1TaXplKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOZXN0ZWQgdmVydGV4IGFycmF5IGhhcyB1bmV4cGVjdGVkIHNpemU7IGV4cGVjdGVkICcgK1xuICAgICAgaXRlbVNpemUgKyAnIGJ1dCBmb3VuZCAnICsgZGF0YVswXS5sZW5ndGgpXG4gIH1cblxuICB2YXIgYXR0cmliID0gZ2VvbWV0cnkuZ2V0QXR0cmlidXRlKGtleSlcbiAgdmFyIG5ld0F0dHJpYiA9IHVwZGF0ZUF0dHJpYnV0ZShhdHRyaWIsIGRhdGEsIGl0ZW1TaXplLCBkdHlwZSlcbiAgaWYgKG5ld0F0dHJpYikge1xuICAgIGdlb21ldHJ5LmFkZEF0dHJpYnV0ZShrZXksIG5ld0F0dHJpYilcbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVBdHRyaWJ1dGUgKGF0dHJpYiwgZGF0YSwgaXRlbVNpemUsIGR0eXBlKSB7XG4gIGRhdGEgPSBkYXRhIHx8IFtdXG4gIGlmICghYXR0cmliIHx8IHJlYnVpbGRBdHRyaWJ1dGUoYXR0cmliLCBkYXRhLCBpdGVtU2l6ZSkpIHtcbiAgICAvLyBjcmVhdGUgYSBuZXcgYXJyYXkgd2l0aCBkZXNpcmVkIHR5cGVcbiAgICBkYXRhID0gZmxhdHRlbihkYXRhLCBkdHlwZSlcbiAgICBhdHRyaWIgPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKGRhdGEsIGl0ZW1TaXplKVxuICAgIGF0dHJpYi5uZWVkc1VwZGF0ZSA9IHRydWVcbiAgICByZXR1cm4gYXR0cmliXG4gIH0gZWxzZSB7XG4gICAgLy8gY29weSBkYXRhIGludG8gdGhlIGV4aXN0aW5nIGFycmF5XG4gICAgZmxhdHRlbihkYXRhLCBhdHRyaWIuYXJyYXkpXG4gICAgYXR0cmliLm5lZWRzVXBkYXRlID0gdHJ1ZVxuICAgIHJldHVybiBudWxsXG4gIH1cbn1cblxuLy8gVGVzdCB3aGV0aGVyIHRoZSBhdHRyaWJ1dGUgbmVlZHMgdG8gYmUgcmUtY3JlYXRlZCxcbi8vIHJldHVybnMgZmFsc2UgaWYgd2UgY2FuIHJlLXVzZSBpdCBhcy1pcy5cbmZ1bmN0aW9uIHJlYnVpbGRBdHRyaWJ1dGUgKGF0dHJpYiwgZGF0YSwgaXRlbVNpemUpIHtcbiAgaWYgKGF0dHJpYi5pdGVtU2l6ZSAhPT0gaXRlbVNpemUpIHJldHVybiB0cnVlXG4gIGlmICghYXR0cmliLmFycmF5KSByZXR1cm4gdHJ1ZVxuICB2YXIgYXR0cmliTGVuZ3RoID0gYXR0cmliLmFycmF5Lmxlbmd0aFxuICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSAmJiBBcnJheS5pc0FycmF5KGRhdGFbMF0pKSB7XG4gICAgLy8gWyBbIHgsIHksIHogXSBdXG4gICAgcmV0dXJuIGF0dHJpYkxlbmd0aCAhPT0gZGF0YS5sZW5ndGggKiBpdGVtU2l6ZVxuICB9IGVsc2Uge1xuICAgIC8vIFsgeCwgeSwgeiBdXG4gICAgcmV0dXJuIGF0dHJpYkxlbmd0aCAhPT0gZGF0YS5sZW5ndGhcbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cbiIsIi8qZXNsaW50IG5ldy1jYXA6MCovXG52YXIgZHR5cGUgPSByZXF1aXJlKCdkdHlwZScpXG5tb2R1bGUuZXhwb3J0cyA9IGZsYXR0ZW5WZXJ0ZXhEYXRhXG5mdW5jdGlvbiBmbGF0dGVuVmVydGV4RGF0YSAoZGF0YSwgb3V0cHV0LCBvZmZzZXQpIHtcbiAgaWYgKCFkYXRhKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdtdXN0IHNwZWNpZnkgZGF0YSBhcyBmaXJzdCBwYXJhbWV0ZXInKVxuICBvZmZzZXQgPSArKG9mZnNldCB8fCAwKSB8IDBcblxuICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSAmJiBBcnJheS5pc0FycmF5KGRhdGFbMF0pKSB7XG4gICAgdmFyIGRpbSA9IGRhdGFbMF0ubGVuZ3RoXG4gICAgdmFyIGxlbmd0aCA9IGRhdGEubGVuZ3RoICogZGltXG5cbiAgICAvLyBubyBvdXRwdXQgc3BlY2lmaWVkLCBjcmVhdGUgYSBuZXcgdHlwZWQgYXJyYXlcbiAgICBpZiAoIW91dHB1dCB8fCB0eXBlb2Ygb3V0cHV0ID09PSAnc3RyaW5nJykge1xuICAgICAgb3V0cHV0ID0gbmV3IChkdHlwZShvdXRwdXQgfHwgJ2Zsb2F0MzInKSkobGVuZ3RoICsgb2Zmc2V0KVxuICAgIH1cblxuICAgIHZhciBkc3RMZW5ndGggPSBvdXRwdXQubGVuZ3RoIC0gb2Zmc2V0XG4gICAgaWYgKGxlbmd0aCAhPT0gZHN0TGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NvdXJjZSBsZW5ndGggJyArIGxlbmd0aCArICcgKCcgKyBkaW0gKyAneCcgKyBkYXRhLmxlbmd0aCArICcpJyArXG4gICAgICAgICcgZG9lcyBub3QgbWF0Y2ggZGVzdGluYXRpb24gbGVuZ3RoICcgKyBkc3RMZW5ndGgpXG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDAsIGsgPSBvZmZzZXQ7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRpbTsgaisrKSB7XG4gICAgICAgIG91dHB1dFtrKytdID0gZGF0YVtpXVtqXVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoIW91dHB1dCB8fCB0eXBlb2Ygb3V0cHV0ID09PSAnc3RyaW5nJykge1xuICAgICAgLy8gbm8gb3V0cHV0LCBjcmVhdGUgYSBuZXcgb25lXG4gICAgICB2YXIgQ3RvciA9IGR0eXBlKG91dHB1dCB8fCAnZmxvYXQzMicpXG4gICAgICBpZiAob2Zmc2V0ID09PSAwKSB7XG4gICAgICAgIG91dHB1dCA9IG5ldyBDdG9yKGRhdGEpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvdXRwdXQgPSBuZXcgQ3RvcihkYXRhLmxlbmd0aCArIG9mZnNldClcbiAgICAgICAgb3V0cHV0LnNldChkYXRhLCBvZmZzZXQpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHN0b3JlIG91dHB1dCBpbiBleGlzdGluZyBhcnJheVxuICAgICAgb3V0cHV0LnNldChkYXRhLCBvZmZzZXQpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG91dHB1dFxufVxuIiwidmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZVNERlNoYWRlciAob3B0KSB7XG4gIG9wdCA9IG9wdCB8fCB7fVxuICB2YXIgb3BhY2l0eSA9IHR5cGVvZiBvcHQub3BhY2l0eSA9PT0gJ251bWJlcicgPyBvcHQub3BhY2l0eSA6IDFcbiAgdmFyIGFscGhhVGVzdCA9IHR5cGVvZiBvcHQuYWxwaGFUZXN0ID09PSAnbnVtYmVyJyA/IG9wdC5hbHBoYVRlc3QgOiAwLjAwMDFcbiAgdmFyIHByZWNpc2lvbiA9IG9wdC5wcmVjaXNpb24gfHwgJ2hpZ2hwJ1xuICB2YXIgY29sb3IgPSBvcHQuY29sb3JcbiAgdmFyIG1hcCA9IG9wdC5tYXBcblxuICAvLyByZW1vdmUgdG8gc2F0aXNmeSByNzNcbiAgZGVsZXRlIG9wdC5tYXBcbiAgZGVsZXRlIG9wdC5jb2xvclxuICBkZWxldGUgb3B0LnByZWNpc2lvblxuICBkZWxldGUgb3B0Lm9wYWNpdHlcblxuICByZXR1cm4gYXNzaWduKHtcbiAgICB1bmlmb3Jtczoge1xuICAgICAgb3BhY2l0eTogeyB0eXBlOiAnZicsIHZhbHVlOiBvcGFjaXR5IH0sXG4gICAgICBtYXA6IHsgdHlwZTogJ3QnLCB2YWx1ZTogbWFwIHx8IG5ldyBUSFJFRS5UZXh0dXJlKCkgfSxcbiAgICAgIGNvbG9yOiB7IHR5cGU6ICdjJywgdmFsdWU6IG5ldyBUSFJFRS5Db2xvcihjb2xvcikgfVxuICAgIH0sXG4gICAgdmVydGV4U2hhZGVyOiBbXG4gICAgICAnYXR0cmlidXRlIHZlYzIgdXY7JyxcbiAgICAgICdhdHRyaWJ1dGUgdmVjNCBwb3NpdGlvbjsnLFxuICAgICAgJ3VuaWZvcm0gbWF0NCBwcm9qZWN0aW9uTWF0cml4OycsXG4gICAgICAndW5pZm9ybSBtYXQ0IG1vZGVsVmlld01hdHJpeDsnLFxuICAgICAgJ3ZhcnlpbmcgdmVjMiB2VXY7JyxcbiAgICAgICd2b2lkIG1haW4oKSB7JyxcbiAgICAgICd2VXYgPSB1djsnLFxuICAgICAgJ2dsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIG1vZGVsVmlld01hdHJpeCAqIHBvc2l0aW9uOycsXG4gICAgICAnfSdcbiAgICBdLmpvaW4oJ1xcbicpLFxuICAgIGZyYWdtZW50U2hhZGVyOiBbXG4gICAgICAnI2lmZGVmIEdMX09FU19zdGFuZGFyZF9kZXJpdmF0aXZlcycsXG4gICAgICAnI2V4dGVuc2lvbiBHTF9PRVNfc3RhbmRhcmRfZGVyaXZhdGl2ZXMgOiBlbmFibGUnLFxuICAgICAgJyNlbmRpZicsXG4gICAgICAncHJlY2lzaW9uICcgKyBwcmVjaXNpb24gKyAnIGZsb2F0OycsXG4gICAgICAndW5pZm9ybSBmbG9hdCBvcGFjaXR5OycsXG4gICAgICAndW5pZm9ybSB2ZWMzIGNvbG9yOycsXG4gICAgICAndW5pZm9ybSBzYW1wbGVyMkQgbWFwOycsXG4gICAgICAndmFyeWluZyB2ZWMyIHZVdjsnLFxuXG4gICAgICAnZmxvYXQgYWFzdGVwKGZsb2F0IHZhbHVlKSB7JyxcbiAgICAgICcgICNpZmRlZiBHTF9PRVNfc3RhbmRhcmRfZGVyaXZhdGl2ZXMnLFxuICAgICAgJyAgICBmbG9hdCBhZndpZHRoID0gbGVuZ3RoKHZlYzIoZEZkeCh2YWx1ZSksIGRGZHkodmFsdWUpKSkgKiAwLjcwNzEwNjc4MTE4NjU0NzU3OycsXG4gICAgICAnICAjZWxzZScsXG4gICAgICAnICAgIGZsb2F0IGFmd2lkdGggPSAoMS4wIC8gMzIuMCkgKiAoMS40MTQyMTM1NjIzNzMwOTUxIC8gKDIuMCAqIGdsX0ZyYWdDb29yZC53KSk7JyxcbiAgICAgICcgICNlbmRpZicsXG4gICAgICAnICByZXR1cm4gc21vb3Roc3RlcCgwLjUgLSBhZndpZHRoLCAwLjUgKyBhZndpZHRoLCB2YWx1ZSk7JyxcbiAgICAgICd9JyxcblxuICAgICAgJ3ZvaWQgbWFpbigpIHsnLFxuICAgICAgJyAgdmVjNCB0ZXhDb2xvciA9IHRleHR1cmUyRChtYXAsIHZVdik7JyxcbiAgICAgICcgIGZsb2F0IGFscGhhID0gYWFzdGVwKHRleENvbG9yLmEpOycsXG4gICAgICAnICBnbF9GcmFnQ29sb3IgPSB2ZWM0KGNvbG9yLCBvcGFjaXR5ICogYWxwaGEpOycsXG4gICAgICBhbHBoYVRlc3QgPT09IDBcbiAgICAgICAgPyAnJ1xuICAgICAgICA6ICcgIGlmIChnbF9GcmFnQ29sb3IuYSA8ICcgKyBhbHBoYVRlc3QgKyAnKSBkaXNjYXJkOycsXG4gICAgICAnfSdcbiAgICBdLmpvaW4oJ1xcbicpXG4gIH0sIG9wdClcbn1cbiJdfQ==