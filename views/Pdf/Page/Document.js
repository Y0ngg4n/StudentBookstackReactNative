import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {Container} from 'native-base';
import Pdf from 'react-native-pdf';
import RNFetchBlob from "rn-fetch-blob";

export default class Document extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            downloaded: false
        }
    }

    componentDidMount() {
        const {config, fs} = RNFetchBlob
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
                notification: false,
                path: fs.dirs.DownloadDir + "/test.pdf", // this is the path where your downloaded file will live in
                description: 'Downloading image.'
            }
        }
        config(options).fetch('GET', "http://samples.leanpub.com/thereactnativebook-sample.pdf").then((res) => {
            // do some magic here
            console.log("Doooooooooooooooooown")
            console.log(res.path())
            this.setState((prevState) => ({...prevState, downloaded: true}))
        })

    }

    render() {
        if (!this.state.downloaded) return (<View/>)

        return (
            <View style={this.styles.container}>
                <Pdf
                    source={{uri: "file://" + RNFetchBlob.fs.dirs.DownloadDir + "/test.pdf"}}
                    onLoadComplete={(numberOfPages, filePath, {width, height}) => {
                        console.log(`number of pages: ${numberOfPages}`);
                        console.log(`width: ${width}`);
                        console.log(`height: ${height}`);
                    }}
                    onPageChanged={(page, numberOfPages) => {
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    onPressLink={(uri) => {
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
            backgroundColor: "green"
        },
    });
}
