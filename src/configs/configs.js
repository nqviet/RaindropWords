import { Dimensions } from 'react-native';

const WND_WIDTH = Dimensions.get('window').width;
const WND_HEIGHT = Dimensions.get('window').height;

const ROT_BEGIN_ARC = -220;
const ROT_END_ARC = 220;

const COLLIDE_WITH_WALL = false;

const dataset = require('../../words');

const colors = [
      "rgb(242.2, 102, 68.8)",
      "rgb(255, 198.9, 91.8)",
      "rgb(122.4, 198.9, 163.2)",
      "rgb(76.5, 193.8, 216.7)",
      "rgb(147.9, 99.4, 140.2)"];

const duration = 6000;

const WALL_LEFT = 5;
const WALL_RIGHT = WND_WIDTH - 25;
const WALL_BOTTOM = WND_HEIGHT - 25;
const WALL_TOP = 0; 

module.exports = {
	WND_WIDTH,
	WND_HEIGHT,
	ROT_BEGIN_ARC,
	ROT_END_ARC,
	COLLIDE_WITH_WALL,
	
	WALL_LEFT,
	WALL_RIGHT,
	WALL_BOTTOM,
	WALL_TOP,
	
	duration,	
	dataset,
	colors	
}