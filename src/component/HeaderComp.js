import React from 'react'
import { Header } from 'react-native-elements'

const HeaderComp = ({title,color,...rest}) => {
    return (
        <Header
            barStyle="light-content"
            backgroundColor={color}
            {...rest}
        />
    )
}

export default HeaderComp
