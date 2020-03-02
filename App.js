import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import Login from './screens/Login'
import Menu from './screens/Menu'

const MainNavigator = StackNavigator({
    Login: { screen: Login },
    Menu: { screen: Menu }
});

export default class App extends Component {
    render() {
        return (
            <MainNavigator />
        )
    }
}