import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {Container} from 'native-base';
import Pdf from 'react-native-pdf';

export default class Document extends React.Component {

    render() {
        const source = {uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true};
        return (
            <View style={this.styles.container}>
                <Pdf
                    source={source}
                    onLoadComplete={(numberOfPages,filePath, {width, height})=>{
                        console.log(`number of pages: ${numberOfPages}`);
                        console.log(`width: ${width}`);
                        console.log(`height: ${height}`);
                    }}
                    onPageChanged={(page,numberOfPages)=>{
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error)=>{
                        console.log(error);
                    }}
                    onPressLink={(uri)=>{
                        console.log(`Link presse: ${uri}`)
                    }}
                    style={this.styles.pdf}/>
            </View>
        );
    }

    styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 25,
        },
        pdf: {
            flex: 1,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        },
    });
}
