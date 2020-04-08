import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome5'
import Pattern from '../styles/Pattern'
import { TextInput } from 'react-native-gesture-handler'

export default props => {


  return (
    <View style={styles.container}>
      <View style={styles.postHeader}>
        <Text style={styles.owner}> {props.ownerName} </Text>
        <Text style={styles.publishDate}> {props.publishDate} </Text>
      </View>
      {/* <Text style={styles.content}> {props.content} </Text> */}
      <TextInput value={props.content} editable={props.editableMode} />
      <View style={styles.actions}>
        <TouchableOpacity onPress={props.onEdit}>
          <Icon name='edit' color={Pattern.colors.primary} size={14} style={{ padding: 2 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert("Alert!", "Are you sure?")}>
          <Icon name='trash' color='#f00' size={14} style={{ padding: 2 }} />
        </TouchableOpacity>
      </View>
      
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  publishDate: {
    color: '#aaa',
    fontSize: 12
  },
  owner: {
    color: Pattern.colors.textDark,
    fontSize: 18,
    fontWeight: 'bold'
  },
  content: {
    color: Pattern.colors.textDark,
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})
