/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    StatusBar,
} from 'react-native';
import i18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import de from './locales/de';
import en from './locales/en';
import {Container} from 'native-base';
import Document from './views/Pdf/Page/Document';
import Orientation from 'react-native-orientation';

export default class App extends React.Component {

    async componentDidMount() {
        // Set the key-value pairs for the different languages you want to support.
        i18n.translations = {
            en: en,
            de: de,
        };
        // Set the locale once at the beginning of your app.
        let loc = RNLocalize.getLocales()[0].languageCode;
        if (loc.split('-').length > 1) {
            loc = loc.split('-')[0];
        }
        i18n.locale = loc;
        console.log(loc);
        console.log('Locales set!');

        //Fonts
        // await Font.loadAsync({
        //     Roboto: require('native-base/Fonts/Roboto.ttf'),
        //     Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        //     ...Ionicons.font,
        // });
        // console.log("Fonts loaded!")
        // this.setState({isReady: true});

        Orientation.unlockAllOrientations();

        Orientation.addOrientationListener(this._orientationDidChange);
    }

    componentWillUnmount() {
        Orientation.getOrientation((err, orientation) => {
            console.log(`Current Device Orientation: ${orientation}`);
        });


        // Remember to remove listener
        Orientation.removeOrientationListener(this._orientationDidChange);
    }

    _orientationDidChange = (orientation) => {
        if (orientation === 'LANDSCAPE') {
            // do something with landscape layout
        } else {
            // do something with portrait layout
        }
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <Container>
                    <Document/>
                </Container>
            </SafeAreaView>
        );
    }
};
