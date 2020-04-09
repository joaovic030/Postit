import React, { Component, useEffect, useState } from 'react'
import { View, 
    Text, 
    StyleSheet,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback } from 'react-native'

import AsyncStorage from '@react-native-community/async-storage'
import Pattern from '../styles/Pattern'
import Icon from 'react-native-vector-icons/AntDesign'
import moment from 'moment'

export default function AddPost({ navigation }) {

  const [contentText, setContentText] = useState(0)
  const [user, setUser] = useState({})
  const [posts, setPosts] = useState({})

  const retrieveUser = async () => {
    try {
        const res = await AsyncStorage.getItem('userData')
        const value = JSON.parse(res)
        setUser({...value})
    } catch(err) {
        console.log(err)
    }
    return
  }
  const retrievePosts = async () => {
    try {
        const res = await AsyncStorage.getItem('posts')
        const value = JSON.parse(res)
        setPosts([...value])
    } catch(err) {
        console.log(err)
    }
    return
  }

  const addPost = () => {
    const newPosts = posts
    console.log("Todos os posts:", newPosts)
    const post = {
      id: Math.random(),
      "owner": user,
      "content": contentText,
      "publish_date": moment(new Date()).format('L')
    }
    try {
      newPosts.push(post)
      const savePosts = AsyncStorage.setItem('posts', JSON.stringify(newPosts))
      setTimeout(() => {navigation.navigate('Feed')}, 1000)
    } catch (err) {
      console.log(err)
    }
    
  }

  useEffect(() => {
    retrieveUser()
  }, [])
  useEffect(() => {
    retrievePosts()
  }, [])

  return (
    <View style={styles.container}>
      <TextInput onChangeText={value => {
        setContentText(value)
      }} style={{ borderRadius: 3, borderWidth: 0.5 }} maxLength={280} />
      <Text> {contentText.length}/280 </Text>

      <TouchableOpacity style={styles.addPost} onPress={() => addPost() }>
        <Icon name={'check'} size={24} color='#fff' />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  addPost: {
    width: 60,
    height: 60,
    backgroundColor: Pattern.colors.primary,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    bottom: 30
}
})
