import React, { Component } from 'react'
import { Text, View, StyleSheet, StatusBar, Button } from 'react-native'
import { Header, Card } from 'react-native-elements';
import { colorPrimary, colorWhite } from '../../assets';
import { connect } from 'react-redux';
import { getProvinces, setAlamatAsal } from '../../redux/action/provinces';
import axios from 'axios';
import { PickerComp, HeaderComp } from '../../component';
import {URL_API,API_KEY} from '../../utils/apis';
class index extends Component {

    state = {
        provinces: [],
        selectedProvinces: 0,
        cities: [],
        selectedCities: 0,
        showCities: false,
        districts: [],
        selectedDistricts: 0,
        nameDistricts: '',
        showDistricts: false,
        showButton: false,
    };

    async getProvinces() {
        await this.props.getProv(URL_API +'provinces')
            .then(() => {
                this.setState({
                    provinces: this.props.dataProvinces.provinces
                })
                console.log(this.state.provinces);
            })
    }

    getCities(itemIndex) {
        axios.get(URL_API + 'cities?province=' + itemIndex, {
            headers: {
                'Authorization': API_KEY
            }
        }).then((response) => {
            const hasil = response.data.data.results;
            this.setState({ cities: hasil });
        }).catch((error) => {
            console.log(error);
        })
    }

    getDistricts(itemIndex) {
        axios.get(URL_API+'districts?city=' + itemIndex, {
            headers: {
                'Authorization': API_KEY
            }
        }).then((response) => {
            const hasil = response.data.data.results;
            this.setState({ districts: hasil });
        }).catch((error) => {
            console.log(error);
        })
    }

    pickProvinces(itemIndex) {
        if (itemIndex == 0) {
            this.setState({
                selectedProvinces: itemIndex,
                showCities: false
            })
        } else {
            this.setState({
                selectedProvinces: itemIndex,
                showCities: true
            })
        }
        this.getCities(itemIndex);
    }

    pickCities(item) {
        if (item == 0) {
            this.setState({
                selectedCities: item,
                showDistricts: false
            })
        } else {
            this.setState({
                selectedCities: item,
                showDistricts: true
            })
        }
        this.getDistricts(item);
    }

    pickDistricts(itemIndex) {

        this.state.districts.map((item, index) => {
            if (item.id == itemIndex) {
                this.setState({
                    selectedDistricts: itemIndex,
                    showButton: true,
                    nameDistricts: item.name
                })
            }
        })
    }



    buttonPilihClick(){
        const id = this.state.selectedCities;
        const label = this.state.nameDistricts;
        this.props.setAlamat(id,label);
        this.props.navigation.replace('Home');
    }

    componentDidMount() {
        this.getProvinces();
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
                <HeaderComp

                    color={colorPrimary}
                    leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: () => this.props.navigation.goBack() }}
                    centerComponent={{ text: "Alamat Pengiriman", style: { color: '#fff', fontSize: 18, fontWeight: 'bold' } }}
                />
                <Card containerStyle={styles.card}>

                    <PickerComp title="Provinsi"
                        data={this.state.provinces}
                        selectedValue={this.state.selectedProvinces}
                        labeldefault="Pilih Provinsi"
                        onValueChange={(itemValue, itemIndex) => this.pickProvinces(itemValue)}
                    />
                    {
                        this.state.showCities
                            ?
                            <PickerComp title="Kota Kabupaten"
                                data={this.state.cities}
                                labeldefault="Pilih Kota/Kabupaten"
                                selectedValue={this.state.selectedCities}
                                onValueChange={(itemValue, itemIndex) => this.pickCities(itemValue)}
                            />
                            :
                            <View></View>

                    }

                    {
                        this.state.showDistricts
                            ?
                            <PickerComp title="Kecamatan"
                                data={this.state.districts}
                                labeldefault="Pilih Kecamatan"
                                selectedValue={this.state.selectedDistricts}
                                onValueChange={(itemValue, itemIndex) => this.pickDistricts(itemValue)}
                            />
                            :
                            <View></View>

                    }
                    {
                        this.state.showButton
                            ?
                            <Button title="Pilih"
                             color={colorPrimary}
                              containerStyle={{marginTop:15}}
                              onPress={() => this.buttonPilihClick()} />
                            :
                            <View></View>
                    }
                </Card>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorWhite
    },
    card: {
        marginTop: 20,
        borderWidth: 0,
        elevation: 5,
        borderRadius: 3
    },
    containerPicker: {
        borderColor: '#bdbdbd',
        borderWidth: 1,
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 5
    },
    containerAlamat: {
        borderColor: '#bdbdbd',
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 7,
        marginTop: 5,

    },
    textAlamat: {
        fontSize: 16
    },
    containerForm: {
        paddingVertical: 5
    }
})

const mapStateToProps = state => {
    return {
        dataProvinces: state.listProvinces
    }
}

const mapDispatchToProps = dispatch => ({
    getProv: url => dispatch(getProvinces(url)),
    setAlamat: (id,label) => dispatch(setAlamatAsal(id,label))
})

export default connect(mapStateToProps, mapDispatchToProps)(index);