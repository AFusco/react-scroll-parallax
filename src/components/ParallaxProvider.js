import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ParallaxContext from '../modules/ParallaxContext';
import ParallaxController from '../modules/ParallaxController';
import { VERTICAL, HORIZONTAL } from '../constants';

const createController = options => {
    // Don't initialize on the server
    const isServer = typeof window === 'undefined';

    if (!isServer) {
        // Must not be the server so kick it off...
        return ParallaxController.init(options);
    }
    return null;
};

export default class ParallaxProvider extends Component {
    static defaultProps = {
        scrollAxis: VERTICAL,
    };

    static propTypes = {
        children: PropTypes.node.isRequired,
        scrollAxis: PropTypes.oneOf([VERTICAL, HORIZONTAL]),
    };

    constructor(props) {
        super(props);

        this.controller = createController({
            scrollAxis: props.scrollAxis,
        });
    }

    componentWillUnmount() {
        this.controller = this.controller.destroy();
    }

    render() {
        const { children } = this.props;

        return (
            <ParallaxContext.Provider value={this.controller}>
                {children}
            </ParallaxContext.Provider>
        );
    }
}
