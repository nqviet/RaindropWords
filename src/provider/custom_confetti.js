import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,Button,
  Animated,  
  TouchableWithoutFeedback
} from 'react-native';

const Utils = require('../utils/utils');
const Configs = require('../configs/configs');

class Confetti extends Component {
 
  
  constructor(props) {
	  
      super(props);
	  // the X-coord value of the component on screen (float)
	  this._X = props.x;
	  // the Y-coord value of the component on screen (float)
	  this._Y = props.y;	  	 
	  // the background color of the component
      this.color = Utils.randomColor(this.props.colors);
	  // the displayed text of the component
      this.data = this.props.data;
	  this.textWidthInPixel = this.data.source.length * 4;	  
	  // whether the component disappears when touching
	  this.isBubble = props.isBubble;
	  // the variables for restarting animations if the component coords collided with borders
	  this.restartAnimationX = false;
	  this.restartAnimationY = false;
	  // is the component about unmounted
	  this.hasCompleted = false;
	  this.state = { 
		  // the coord animated objects
		  _animatedX: new Animated.Value(props.x),		  
		  _animatedY: new Animated.Value(props.y),
		  // the maximum rotation degree (string)	  
		  _rot: props.rot		  
	  };
	  	  
	  this.startAnimation = this.startAnimation.bind(this);
	  this.stopAnimation = this.stopAnimation.bind(this);
	  this._onComplete = this._onComplete.bind(this);
	  this._onMoveX = this._onMoveX.bind(this);
	  this._onMoveY = this._onMoveY.bind(this);
	  this._onPress = this._onPress.bind(this);
	  this.getConfettiStyle = this.getConfettiStyle.bind(this);
	  this.getTransformStyle = this.getTransformStyle.bind(this);	  	 	  
  }

  componentDidMount() {	  	  
	  
	  // start animation as soon as possible
	  this.startAnimation(Configs.WND_WIDTH, Configs.WND_HEIGHT);
  }
  
  getTransformStyle() {
	  
      return {
         transform: [
           {translateY: this.state._animatedY},
           {translateX: this.state._animatedX},
		   {rotate: this.state._animatedY.interpolate({
						 inputRange: [0, Configs.WND_HEIGHT / 2, Configs.WND_WIDTH],
						 outputRange: ['0deg', this.state._rot, this.state._rot]
					})
		   },
         ]
      }
  }

  getConfettiStyle() {

	return {
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		borderTopLeftRadius: 2.6,
		borderTopRightRadius: 2.6
	};      
  }
  
  startAnimation(targetX, targetY) {
	  
	  let {duration} = this.props;
	  
	  // configuration for the X animation
	  const configX = {
			duration: duration,
			toValue: targetX,
			useNativeDriver: true
	  };
	  // configuration for the Y animation
	  const configY = {
		    duration: duration,
			toValue: targetY,
			useNativeDriver: true
	  };		  
	  
	  // start two timing animations running in parallel
	  Animated.parallel([
		 Animated.timing(this.state._animatedX, configX),
		 Animated.timing(this.state._animatedY, configY)		
	  ]).start(this.props.onComplete);
	  
	  // add listeners to track the component's coordinates
	  this.state._animatedX.addListener(({value}) => this._onMoveX(value));	
	  this.state._animatedY.addListener(({value}) => this._onMoveY(value));		
  }
  
  stopAnimation() {
	  
	  // stop the animation batch
	  Animated.parallel([
		 Animated.timing(this.state._animatedX),
		 Animated.timing(this.state._animatedY)
	  ]).stop();
	  
	  // unregister all listeners
	  this.state._animatedX.removeAllListeners(); 
	  this.state._animatedY.removeAllListeners(); 
  }
 
  // the callback that is triggered when animation completed.
  _onComplete() {	
	  console.log("Confetti._onComplete: " + this.data.target);
   }
   
   // the callback that will be called while animating X-coord
   _onMoveX(value) {
	  
	  // tracking the component position on screen
	  this._X = value;	  
	  
	  // restart the animation on collision with left/right border
	  if (!this.restartAnimationX) {
		  
		  if (this._X + this.textWidthInPixel > Configs.WALL_RIGHT) {			  
			  
			  // stop and start with the new X target
			  this.stopAnimation();		  
			  this.startAnimation(0, Configs.WND_HEIGHT);			  
			  this.restartAnimationX = true;
		  }
		  else if (this._X < Configs.WALL_LEFT) {
			  
			  // stop and start with the new X target
			  this.stopAnimation();	
			  this.startAnimation(Configs.WND_WIDTH, Configs.WND_HEIGHT);
			  this.restartAnimationX = true;
		  }		  
	  }	  	 
	  
	  // check if X is visible in between the left and right border
	  if (this._X + this.textWidthInPixel < Configs.WALL_RIGHT && this._X > Configs.WALL_LEFT)
		  this.restartAnimationX = false;	  
   }
   
   // the callback that will be called while animating Y-coord
  _onMoveY(value) {
	  
	  // tracking the component position on screen
	  this._Y = value;	  
	  
	  // restart the animation on collision with left/right border
	  if (!this.restartAnimationY)
		  if (this._Y > Configs.WALL_BOTTOM) {		  
			  
			  // stop animation
			  this.stopAnimation();	
			  
			  // force render the component with a new X, Y coordinate and rotation degree when it is under the bottom border
			  this.setState({				  
				  _animatedX: new Animated.Value(Utils.randomValue(Configs.WALL_LEFT, Configs.WND_WIDTH - this.textWidthInPixel)),
				  _animatedY: new Animated.Value(Configs.WALL_TOP + 1),
				  _rot: Utils.randomValue(Configs.ROT_BEGIN_ARC, Configs.ROT_END_ARC) + 'deg'
			  });
			  	
              // start animation with the new X, Y targets				
			  var targetX = (Utils.randomValue(0, 1) > 0.5) ? 0 : Configs.WND_WIDTH;
			  var targetY = Configs.WND_HEIGHT;			  			  
			  this.startAnimation(targetX, targetY);
			  
			  this.restartAnimationY = true;
		  }
		
	  // check if Y is visible in between the top and bottom border
	  if (Configs.WALL_TOP < this._Y && this._Y < Configs.WALL_BOTTOM)
		  this.restartAnimationY = false;	  
  }
  
  _onPress() {
	  	 	 
	  // stop the animation and call onComplete callback, the parent component will unmount this object
	  if (this.isBubble) {	  
		this.hasCompleted = true;		
		this.stopAnimation();				
	  }
	  
	  // handle the component's touch action
	  else		
		console.log("Confetti._onPress: " + this.data.source);		
  }
  
  render() {	  
	  
      let {left, ...otherProps} = this.props;	  
      return (
		<TouchableWithoutFeedback onPress={this._onPress.bind(this)}>			
			<Animated.View style={[styles.confetti, this.getConfettiStyle(), this.getTransformStyle(), {backgroundColor: this.color}]} {...otherProps}>				
				<Text>{this.data.source}</Text> 					
			</Animated.View>						
		</TouchableWithoutFeedback>
	  )
  }
}

Confetti.defaultProps = {
    duration: Configs.duration,
    colors: Configs.colors    
}

const styles = StyleSheet.create({
  confetti: {
    position: 'absolute',
    marginTop: 0
  }
});

export default Confetti;
