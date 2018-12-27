import React from 'react'
import styled from 'styled-components'
import { Button, View } from 'react-native'
import { DrawerActions, withNavigation } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'

const MenuOpenButton = ({navigation}) => {
  return (
    <Icon name="menu" color="white" size={30} onPress={() => navigation.openDrawer()} title="Open drawer" />
  )
}

export default withNavigation(MenuOpenButton)