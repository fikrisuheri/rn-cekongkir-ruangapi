import React, { Component } from 'react'
import { Text, View, StyleSheet, StatusBar, TextInput, Button, ScrollView } from 'react-native'
import { Header, Card, ListItem } from 'react-native-elements';
import { colorPrimary, colorSecondary, colorWhite, colorBlack, colorStatusBar } from '../../assets';
import { connect } from 'react-redux';
import { Picker } from '@react-native-community/picker';
import { DotIndicator } from 'react-native-indicators';
import axios from 'axios'
import { URL_API, API_KEY } from '../../utils/apis';
class index extends Component {

    state = {
        asal: '',
        tujuan: '',
        origin: '',
        destination: '',
        weight: '1000',
        courier: 'jne',
        showLoading: false,
        isFulfilled: false,
        dataOngkir: [],
    };
    componentDidMount() {
        this.setState({
            asal: this.props.dataHome.asal,
            tujuan: this.props.dataHome.tujuan,
            origin: this.props.dataHome.origin,
            destination: this.props.dataHome.destination
        })
        console.log(this.state);
    }

    setWeight(value) {
        this.setState({ weight: value });
        console.log(this.state);
    }

    onButtonReset() {
        this.setState({
            asal: 'Cari Alamat Asal',
            tujuan: 'Cari Alamat Tujuan',
            origin: '',
            destination: '',
            weight: '1000',
            courier: 'jne',
            showLoading: false,
            isFulfilled: false,
            dataOngkir: [],
        })
    }

    onButtonCekOngkir() {
        const data = {
            origin: this.state.origin,
            destination: this.state.destination,
            weight: this.state.weight,
            courier: this.state.courier
        }

        const axiosConfig = {
            headers: {
                'Authorization': API_KEY,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        axios.post(URL_API+'shipping', data, axiosConfig)
            .then((response) => {
                console.log(response)
                this.setState({
                    isFulfilled: true,
                    dataOngkir: response.data.data.results,
                    showLoading: false
                })
            }).catch((error) => {
                console.log(error);
            })
        this.setState({
            showLoading: true
        })
    }

    render() {
        const kurir = [
            {
                kode: 'jne',
                kurir: 'Jalur Nugraha Ekakurir (JNE)',
            },
            {
                kode: 'jnt',
                kurir: 'J&T Express (J&T)',
            },
            {
                kode: 'tiki',
                kurir: 'Citra Van Titipan Kilat (TIKI)',
            },
            {
                kode: 'lion',
                kurir: 'Lion Parcel (LION)',
            },
            {
                kode: 'sicepat	',
                kurir: 'Sicepat Ekspres (SICEPAT)',
            },
        ];
        return (
            <ScrollView style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor={colorPrimary} translucent />
                <Header
                    barStyle="light-content"
                    backgroundColor={colorPrimary}
                    centerComponent={{ text: 'CEK ONGKIR', style: { color: '#fff', fontSize: 18, fontWeight: 'bold' } }}
                />
                <Card containerStyle={styles.card}>
                    <View style={styles.containerForm}>
                        <Text>Pilih Kurir</Text>
                        <View
                            style={styles.containerPicker}>
                            <Picker
                                selectedValue={this.state.courier}
                                mode="dropdown"
                                onValueChange={(itemValue) => this.setState({ courier: itemValue, })}
                            >
                                {
                                    kurir.map((item, i) => (
                                        <Picker.Item label={item.kurir} key={i} value={item.kode}  />
                                    ))
                                }
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.containerForm}>
                        <Text>Alamat Pengiriman</Text>
                        <View
                            style={styles.containerAlamat}>
                            <Text style={styles.textAlamat} onPress={() => this.props.navigation.navigate('Asal')}>{this.state.asal}</Text>
                        </View>
                    </View>
                    <View style={styles.containerForm}>
                        <Text>Alamat Tujuan</Text>
                        <View
                            style={styles.containerAlamat}>
                            <Text style={styles.textAlamat} onPress={() => this.props.navigation.navigate('Tujuan')}>{this.state.tujuan}</Text>
                        </View>
                    </View>
                    <View style={styles.containerForm}>
                        <Text>Berat (gram)</Text>
                        <View
                            style={styles.containerInput}>
                            <TextInput placeholder="Masukan Berat (gram)"
                                keyboardType='numeric'
                                onChangeText={(value) => this.setWeight(value)}
                                value={this.state.weight} />
                        </View>
                    </View>
                    <View style={styles.containerForm}>
                        <Button
                            title="Cek Ongkir"
                            color={colorPrimary}
                            onPress={() => this.onButtonCekOngkir()} />
                        <View style={{ height: 10 }} />
                        <Button
                            title="Reset"
                            color={colorSecondary}
                            onPress={() => this.onButtonReset()}
                        />
                    </View>
                </Card>
                {
                    this.state.showLoading
                        ?
                        <View style={styles.containerResult}>
                            <View style={{ height: 30, marginTop: 20 }}>
                                <DotIndicator animationDuration={1500} size={10} color={colorStatusBar} />
                            </View>
                        </View>
                        :
                        <View></View>
                }
                {
                    this.state.isFulfilled
                        ?
                        <Card containerStyle={styles.card}>

                            {
                                this.state.dataOngkir.map((item, i) => (
                                    <ListItem
                                        key={i}
                                        title={item.courier + ' ' + item.service}
                                        subtitle={item.estimate + ' Hari'}
                                        rightElement={item.cost}
                                        bottomDivider
                                    />
                                ))
                            }
                        </Card>
                        :
                        <View></View>
                }

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorWhite,
    },
    card: {
        marginTop: 20,
        borderWidth: 0,
        elevation: 5,
        borderRadius: 3,
        marginBottom: 20
    },
    containerAlamat: {
        borderColor: '#bdbdbd',
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 7,
        marginTop: 5,

    },
    containerPicker: {
        borderColor: '#bdbdbd',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 7,
        marginTop: 5,

    },
    containerInput: {
        borderColor: '#bdbdbd',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 7,
        marginTop: 5,

    },
    textAlamat: {
        fontSize: 16,
    },
    containerForm: {
        paddingVertical: 5
    },
    containerResult: {
        marginTop: 30,
    }
})

const mapStateToPros = state => {
    return {
        dataHome: state.listHome
    }
}

export default connect(mapStateToPros)(index);
