/*
 * Utilities.
 */
 
const randomIntValue =  (_min, _max) => (Math.floor(Math.random() * (_max - _min) + _min));
const randomValue = (_min, _max) => (Math.random() * (_max - _min) + _min);
const randomColor = (colors) => (colors[randomIntValue(0,colors.length)]);
const randomText = (texts) => (texts[randomIntValue(0, texts.length)]);

// pop a random element from the array
const randomPopElement = (dataset) => { 

	var idx = randomIntValue(0, dataset.length);		
	var data = dataset[idx];	
	// remove the element at index of idx	
	dataset.splice(idx, 1);	
	return data;		
}

module.exports = {
  randomIntValue,
  randomValue,
  randomColor,
  randomText,
  randomPopElement
};