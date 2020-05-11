import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, StatusBar } from 'react-native'
import { icTruck, colorPrimary, colorStatusBar, colorBlack, fontBangers, fontPacifico } from '../../assets'
import { SkypeIndicator } from 'react-native-indicators'

export default class index extends Component {
    componentDidMount(){
        setTimeout(() => {
            this.props.navigation.replace('Home');
        },4000)
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={colorStatusBar} />
                <Image source={icTruck} style={styles.image} />
                <View>
                    <Text style={styles.textTitle}>Yuhu ! </Text>
                    <Text style={styles.subTitle}>Cek Ongkir</Text>
                </View>
                <View style={styles.footer}>
                    <View style={{ height:75 }}>
                        <SkypeIndicator animationDuration={1500} size={35} color={colorBlack} />
                    </View>
                    <Text style={styles.textFooter}>Developed By Suhericode</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorPrimary,
        alignItems: 'center',
        paddingTop: 120,
    },
    image: {
        width: 180,
        height: 130,
        resizeMode: 'contain',
    },
    textTitle: {
        color: colorBlack,
        fontSize: 64,
        fontFamily: 'Bangers-Regular',
        letterSpacing: 5,
    },
    subTitle: {
        color: colorBlack,
        fontSize: 12,
        fontFamily: 'Pacifico-Regular',
        letterSpacing: 5,
        marginTop: -20,
        alignSelf: 'flex-end',
        marginRight: 20
    },
    footer:{
        position:'absolute',
        bottom:30
    },
    textFooter:{
        fontSize:12,
        color:colorBlack
    }
})
