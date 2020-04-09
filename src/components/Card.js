import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome5'
import Pattern from '../styles/Pattern'
import { TextInput } from 'react-native-gesture-handler'

export default props => {

  const [contentValue, setContentValue] = useState('')
  const[editable, setEditable] = useState(false)

  useEffect(() => {
    setContentValue(props.content)
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.postHeader}>
        <Text style={styles.owner}> {props.ownerName} </Text>
        <Text style={styles.publishDate}> {props.publishDate} </Text>
      </View>
      {/* <Text style={styles.content}> {props.content} </Text> */}
      <TextInput value={contentValue} editable={editable} multiline={true} onChangeText={value => setContentValue(value)} maxLength={280} />
      <Text>
          {editable && <Text> {contentValue.length}/280 </Text>}
      </Text>      
      {props.actualUser === props.ownerEmail ? 

        <View style={styles.actions}>
        
        {editable ? <View style={{flexDirection: 'row' }}>
                      <TouchableOpacity onPress={() => {
                        props.onContentChange(props.id, contentValue)
                        setEditable(!editable)
                      }}><Icon name='check-circle' color='green' size={14} style={{ padding: 2 }} /></TouchableOpacity>
                      <TouchableOpacity onPress={ () => {
                        setEditable(!editable)
                        setContentValue(props.content)
                      } }><Icon name='times-circle' color='red' size={14} style={{ padding: 2 }} /></TouchableOpacity>
                    </View> :
                    <TouchableOpacity onPress={ () => setEditable(!editable)}><Icon name='edit' color={Pattern.colors.primary} size={14} style={{ padding: 2 }} /></TouchableOpacity>
        }

        <TouchableOpacity onPress={() => props.onDeletePost(props.id)}>
          <Icon name='trash' color='#f00' size={14} style={{ padding: 2 }} />
        </TouchableOpacity>
      </View> : null}
      
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
    justifyContent: 'flex-start'
  }
})
