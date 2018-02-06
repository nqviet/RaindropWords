/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Canvas from 'react-native-canvas';

import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class Drop {
	constructor () {
		this.x = Math.random() * 100;
        this.y = Math.random() * 20;
        this.fallRate = Math.random() * .5 + .5;		
	}
	
	fall() {
		this.y += this.fallRate;
        return (this);
	}
	
	drawDrop(ctx) {		
        ctx.beginPath();
        ctx.moveTo(this.x - 5, this.y);
        ctx.lineTo(this.x, this.y - 7);
        ctx.lineTo(this.x + 5, this.y);
        ctx.arc(this.x, this.y, 5, 0, Math.PI);
        ctx.closePath();
        ctx.fill();
	}
};

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
  
  componentDidMount() {
	this.timerID = setInterval(
		  () => this.tick(),
		  1000
    );
  }

  componentWillUnmount() {
	clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }
  
  render() {
    return (		
			<Text style={styles.instructions}>
				It is {this.state.date.toLocaleTimeString()}.
			</Text>
    );
  }
}


var drops = [];
export default class App extends React.Component {

  constructor(props) {
    super(props);  
	this.canvasElem = null;
	this.update = this.update.bind(this);
	this.handleCanvas = this.handleCanvas.bind(this);
  }

	 componentDidMount() {
	this.timerID = setInterval(
		  () => this.update(),
		  1000
    );
  }

  componentWillUnmount() {
	clearInterval(this.timerID);
  }
  
  handleCanvas = (canvas) => {
	this.canvasElem = canvas;
	
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'yellow';
    ctx.fillRect(0, 0, 100, 100);
	ctx.fillStyle = 'red';
	
	for (var i = 0; i < 10; i++) {		
		drops.push(new Drop());		
	}
	
	for (var i = 0; i < drops.length; i++) {
            drops[i].fall().drawDrop(ctx);
    }
  }

  update()
  {	  	  
	  if (this.canvasElem === undefined || this.canvasElem === null)
		  return;	  
	  	  
	  const ctx = this.canvasElem.getContext('2d');
	  ctx.fillStyle = 'yellow';
	  ctx.fillRect(0, 0, 100, 100);
	  ctx.fillStyle = 'red';
	  
	  for (var i = 0; i < drops.length; i++) {
            drops[i].fall().drawDrop(ctx);
		}			
  }
  
  render() {		
	
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js: <Clock /> 
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
		
		<Canvas ref={this.handleCanvas}>
			
		</Canvas>
		
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
