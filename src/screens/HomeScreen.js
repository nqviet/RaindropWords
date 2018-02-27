
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image, Alert, TextInput, Dimensions, ScrollView } from 'react-native';

const Utils = require('../utils/utils');
const Configs = require('../configs/configs');

import Confetti from '../provider/custom_confetti';
var { width, height } = Dimensions.get('window');

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { confettis: [] };
        this.confettiIndex = 0;
        this.shouldStop = false;
    }
    componentDidMount() {
        //console.log(this._confettiView)
        this.startConfetti();
    }

    componentWillUnmount() {
        //console.log(this._confettiView)
    }

    startConfetti() {
        let { confettis } = this.state;
        let { confettiCount, timeout } = this.props;
        this.shouldStop = false;
        if (this.confettiIndex < confettiCount) {
            setTimeout(() => {
                if (this.shouldStop) {
                    return;
                } else {
					
                    confettis.push({
						key: this.confettiIndex,
						x: Utils.randomValue(Configs.WALL_LEFT, Configs.WND_WIDTH),
						y: Configs.WALL_TOP,
						rot: Utils.randomValue(Configs.ROT_BEGIN_ARC, Configs.ROT_END_ARC) + 'deg',						
						isBubble: true,
						data: Utils.randomPopElement(Configs.dataset)
						});
					
                    this.confettiIndex++;
                    this.setState({ confettis });
                    this.startConfetti();
                }
            }, 300);
        }
    }
	
    removeConfetti(key) {				
		
        let {confettis} = this.state;
        let {confettiCount} = this.props;
        let index = confettis.findIndex(confetti => {return confetti.key === key});	
				
		// ref is null when existing the app, the component was destroyed and the callback is still asynchronously called later.
		if (confettis[index].refElem) {
			
			// get directly access to the DOM element of Confetti
			var {hasCompleted, _onComplete} = confettis[index].refElem;
			if (hasCompleted) {
				
				// callback on the Confetti component
				_onComplete();
				
				// remove this Confetti
				confettis.splice(index, 1);	
				
				this.setState({confettis});
				if(key === confettiCount - 1) {
				  this.confettiIndex = 0;
				}
			}
		}
    }
	
    render() {
        
        let { ...otherProps } = this.props
        return <View style={styles.container}>
            {this.state.confettis.map(confetti => {
                return <Confetti ref={(e) => {confetti.refElem = e;}} 
								 x={confetti.x} 
								 y={confetti.y} 
								 rot={confetti.rot} 								 
								 isBubble={confetti.isBubble} 
								 data={confetti.data}
								 key={confetti.key} 
								 index={confetti.key} 
								 onComplete={this.removeConfetti.bind(this, confetti.key)} 
								 colors={this.props.colors} 
								 {...otherProps} />
            })}
        </View>
    }
}

HomeScreen.defaultProps = {
    confettiCount: 10,
    timeout: 30
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});




