import React, { Component, useEffect, useState } from 'react'
import { View, 
    Text, 
    StyleSheet,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback } from 'react-native'

import AsyncStorage from '@react-native-community/async-storage'

export default function AddPost() {

  const [textLimit, setTextLimit] = useState(0)

  return (
    <View>
      <TextInput onChangeText={value => setTextLimit(value.length)} style={{ borderRadius: 3, borderWidth: 0.5 }} maxLength={280} />
      <Text> {textLimit}/280 </Text>
    </View>
  )
}