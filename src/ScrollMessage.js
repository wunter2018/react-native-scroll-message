import React, { Component } from "react"

import { Animated, View, Image, Text } from "react-native"

export default class ScrollMessage extends Component {

    constructor(props) {
        super(props);
        let containerHeight = this.props.fontSize + 1;
        this.state = {
            translateValue: new Animated.ValueXY({ x: 0, y: containerHeight }),
            duration: this.props.duration, //ms
            delay: this.props.delay, //ms
            displayList: this.props.displayList,

            containerHeight: containerHeight,
            currentIndex: 0,
            displayText: this.props.displayList[0],
        }
    }

    componentDidMount() {
        this.startAnimation();
    }

    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    }

    changeTextToDisplay = (list = [], callback) => {
        let index = this.state.currentIndex + 1;
        if (index === list.length) {
            index = 0;
        }
        this.setState({ displayText: list[index], currentIndex: index }, callback)
    }

    startAnimation = () => {
        Animated.sequence(
            [
                Animated.timing(
                    this.state.translateValue,
                    {
                        toValue: { x: 0, y: 0 },
                        duration: this.state.duration,
                    }
                ),
                Animated.timing(
                    this.state.translateValue,
                    {
                        toValue: { x: 0, y: -1 * this.state.containerHeight },
                        duration: this.state.duration,
                        delay: this.state.delay,
                    }
                )
            ]
        ).start(() => {
            this.changeTextToDisplay(this.state.displayList, () => {
                this.state.translateValue.setValue({ x: 0, y: this.state.containerHeight })
                this.startAnimation()
            })
        })
    }

    render() {
        return (
            <View style={{ justifyContent: 'center', overflow: 'hidden' }}>
                <Animated.View style={{
                    ...this.props.style,
                    transform: [{ translateY: this.state.translateValue.y }],
                }}>
                    <Text style={{ fontSize: this.props.fontSize }}>{this.state.displayText}</Text>
                </Animated.View>
            </View>
        )
    }
}

ScrollMessage.defaultProps = {
    displayList: ['通知栏'],
    delay: 5000,
    duration: 300,
    fontSize: 12,
}