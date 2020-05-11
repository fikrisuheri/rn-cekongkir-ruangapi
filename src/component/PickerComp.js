import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Picker } from '@react-native-community/picker';
import { colorPrimary, colorWhite } from '../assets';
const PickerComp = ({title,data,onValueChange,selectedValue,labeldefault}) => {
    return (
        <View style={styles.containerForm}>
            <Text>{title}</Text>
            <View
                style={styles.containerPicker}>
                <Picker
                    selectedValue={selectedValue}
                    style={{ height: 40, width: 300, borderColor: colorPrimary }}
                    mode="dropdown"
                    onValueChange={onValueChange}
                >
                    <Picker.Item label={labeldefault} key={0} value={0} />
                    {
                        data.map((item,i)=>(
                            item.type
                            ?
                            <Picker.Item label={item.type + ' ' +item.name} key={item.id} value={item.id} /> 
                            :
                            <Picker.Item label={item.name} key={item.id} value={item.id} />
                        ))
                    }
                </Picker>
            </View>
        </View>

    )
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

export default PickerComp
