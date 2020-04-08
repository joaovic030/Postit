import React, { Component, useEffect, useState } from 'react'
import { View, 
    Text, 
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList, 
    Alert} from 'react-native'

import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/AntDesign'
import Pattern from '../styles/Pattern'
import Header from '../components/Header'
import Mock from '../../mock.json'
import Card from '../components/Card'

export default function Feed() {
   
    const [user, setUser] = useState({email: '', nome: ''})
    const [posts, setPosts] = useState([
        {
          "id": 1,
          "owner": { "email": "joao@joao.com", "name": "João"},
          "content": "um post de exemplo - hello",
          "publish_date": "07-04-2020"
        },
        {
          "id": 2,
          "owner": { "email": "joao@joao.com", "name": "João"},
          "content": "um post de exemplo2 - let me prove otherwise",
          "publish_date": "07-04-2020"
        },
        {
          "id": 3,
          "owner": { "email": "matheus@gmail.com", "name": "Matheus"},
          "content": "um post de exemplo3 - lorem ipsum dolum emet",
          "publish_date": "07-04-2020"
        }
      ])
    
    const [editableMode, setEditableMode] = useState(false)

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

    const getPosts = () => {
        
        const newData = Mock.posts
        setPosts([...newData])
    }

    const onEditPost = () => {
        Alert.alert("Alert!", "Editing the text")
        setEditableMode(!editableMode)
    }

    useEffect(() => {
        retrieveUser()
    }, [])

    useEffect(() => {
        getPosts()
    }, [])
    // render() {
         
        return (
            <View style={styles.container}>
                <Header email={user.email} />
                <FlatList
                    data={[...posts]}
                    renderItem={({ item }) => (
                    <Card
                        id={item.id}
                        ownerName={item.owner.name}
                        ownerEmail={item.owner.email}
                        publishDate={item.publish_date}
                        content={item.content}
                        actualUser={user.email}
                        onEdit={onEditPost}
                        editableMode={editableMode}
                    />
                    )}
                    keyExtractor={item => item.id}
                />
                <TouchableOpacity style={styles.addPost}>
                    <Icon name={'plus'} size={24} color='#fff' />
                </TouchableOpacity>
            </View>
        )
    // }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text: {
        fontSize: 24
    },
    homeContent: {
        flex: 1
    },
    cardPlace: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8
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
