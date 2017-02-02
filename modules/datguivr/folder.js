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

import createTextLabel from './textlabel';
import createInteraction from './interaction';
import * as Colors from './colors';
import * as Layout from './layout';
import * as Graphic from './graphic';
import * as SharedMaterials from './sharedmaterials';
import * as Grab from './grab';
import * as Palette from './palette';

export default function createFolder({
  textCreator,
  name,
  guiAdd,
  addSlider,
  addDropdown,
  addCheckbox,
  addButton
} = {} ){

  const width = Layout.FOLDER_WIDTH;
  const depth = Layout.PANEL_DEPTH;

  const spacingPerController = Layout.PANEL_HEIGHT + Layout.PANEL_SPACING;

  const state = {
    collapsed: false,
    previousParent: undefined
  };

  const group = new THREE.Group();
  const collapseGroup = new THREE.Group();
  group.add( collapseGroup );
  function addDebugBox() {
    const box = Layout.createPanel(0.01, 0.01, 0.02, true);
    box.material.color.setHex(0x00ff00);
    //Colors.colorizeGeometry( box.geometry,  );
    group.add(box);
  }
  addDebugBox();
  //expose as public interface so that children can call it when spacing changes
  group.performLayout = performLayout;

  //  Yeah. Gross.  
  //PJT: Would probably be better to have the THREE object be a member
  //rather than just adding properties to it in dodgy ways.
  const addOriginal = THREE.Group.prototype.add;

  function addImpl( o ){
    addOriginal.call( group, o );
  }

  addImpl( collapseGroup );

  const panel = Layout.createPanel( width, Layout.FOLDER_HEIGHT, depth, true );
  addImpl( panel );

  const descriptorLabel = textCreator.create( name );
  descriptorLabel.position.x = Layout.PANEL_LABEL_TEXT_MARGIN * 1.5;
  descriptorLabel.position.y = -0.03;
  descriptorLabel.position.z = depth;
  panel.add( descriptorLabel );

  const downArrow = Layout.createDownArrow();
  Colors.colorizeGeometry( downArrow.geometry, 0xffffff );
  downArrow.position.set( 0.05, 0, depth  * 1.01 );
  panel.add( downArrow );

  //PJT: this grabber should really belong to 'gui' rather than folder
  const grabber = Layout.createPanel( width, Layout.FOLDER_GRAB_HEIGHT, depth, true );
  grabber.position.y = Layout.FOLDER_HEIGHT * 0.86; //XXX: magic number
  grabber.name = 'grabber';
  addImpl( grabber );

  const grabBar = Graphic.grabBar();
  grabBar.position.set( width * 0.5, 0, depth * 1.001 );
  grabber.add( grabBar );
  
  group.hideGrabber = function() { grabber.visible = false };

  group.add = function( ...args ){
    const newController = guiAdd( ...args );

    if( newController ){
      group.addController( newController );
      return newController;
    }
    else{
      return new THREE.Group();
    }
  };

  group.addController = function( ...args ){
    args.forEach( function( obj ){
      // PJT: not sure what purpose this extra group has.
      // const container = new THREE.Group();
      // if (obj.spacing) container.spacing = obj.spacing;
      // container.add( obj );
      // collapseGroup.add( container );
      collapseGroup.add( obj );
      obj.folder = group;
      //quick & dirty hack to hide grabBar
      //if (obj.children[2]) obj.children[2].visible = false;
      if (obj.hideGrabber) obj.hideGrabber();
    });

    performLayout();
  };

  function performLayout(){
    var y = 0, lastHeight = spacingPerController;
    collapseGroup.children.forEach( function( child, index ){
      var h = child.spacing ? child.spacing : spacingPerController;
      var spacing = 0.5 * (lastHeight + h);
      var lastY = y;
      // for the next child to be in right place, y needs to move by full spacing...
      y -= spacing; 
      lastHeight = h;
      // but for folders, the origin needs to be in the middle of the top row,
      // not the middle of the whole object...
      // for now, I'm using the existence of hideGrabber to identify folders.
      child.position.y = child.hideGrabber ? lastY - 0.08 : y;
      child.position.x = 0.026;
      if( state.collapsed ){
        //child.children[0].visible = false;
        child.visible = false;
      }
      else{
        //child.children[0].visible = true;
        child.visible = true;
      }
    });

    if( state.collapsed ){
      downArrow.rotation.z = Math.PI * 0.5;
    }
    else{
      downArrow.rotation.z = 0;
    }
    
    //trying to add spacing property to folder.
    //maybe better to add a getter so that it can get it programatically
    //crucially, though, the spacing ends up wrong - blank space above 
    //and overlapping below.
    const top = 0.298; //XXX: magic number reached by trial and error...
    group.spacing = top -y * lastHeight;
    if (state.collapsed) group.spacing = 0.08;

    //TODO: make sure parent folder also performs layout.
    if (group.folder !== group) group.folder.performLayout();
  }

  function updateView(){
    if( interaction.hovering() ){
      panel.material.color.setHex( Colors.HIGHLIGHT_BACK );
    }
    else{
      panel.material.color.setHex( Colors.DEFAULT_BACK );
    }

    if( grabInteraction.hovering() ){
      grabber.material.color.setHex( Colors.HIGHLIGHT_BACK );
    }
    else{
      grabber.material.color.setHex( Colors.DEFAULT_BACK );
    }
  }

  const interaction = createInteraction( panel );
  interaction.events.on( 'onPressed', function( p ){
    state.collapsed = !state.collapsed;
    performLayout();
    p.locked = true;
  });

  group.folder = group;

  const grabInteraction = Grab.create( { group, panel: grabber } );
  const paletteInteraction = Palette.create( { group, panel } );

  group.update = function( inputObjects ){
    interaction.update( inputObjects );
    grabInteraction.update( inputObjects );
    paletteInteraction.update( inputObjects );

    updateView();
  };

  group.name = function( str ){
    descriptorLabel.update( str );
    return group;
  };

  group.hitscan = [ panel, grabber ];

  group.beingMoved = false;

  group.addSlider = (...args)=>{
    const controller = addSlider(...args);
    if( controller ){
      group.addController( controller );
      return controller;
    }
    else{
      return new THREE.Group();
    }
  };
  group.addDropdown = (...args)=>{
    const controller = addDropdown(...args);
    if( controller ){
      group.addController( controller );
      return controller;
    }
    else{
      return new THREE.Group();
    }
  };
  group.addCheckbox = (...args)=>{
    const controller = addCheckbox(...args);
    if( controller ){
      group.addController( controller );
      return controller;
    }
    else{
      return new THREE.Group();
    }
  };
  group.addButton = (...args)=>{
    const controller = addButton(...args);
    if( controller ){
      group.addController( controller );
      return controller;
    }
    else{
      return new THREE.Group();
    }
  };

  return group;
}