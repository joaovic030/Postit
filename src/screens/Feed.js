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

export default function Feed({ navigation }) {
   
    const [user, setUser] = useState({email: '', nome: ''})
    const [posts, setPosts] = useState([])

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

    const getPosts = () => {
        if(!posts[0]) {
            const newData = Mock.posts
            setPosts([...newData])
            console.log(posts)
            savePosts(newData)
        }
        retrievePosts()
    }

    const savePosts = newPosts => {
        const savePosts = AsyncStorage.setItem('posts', JSON.stringify(newPosts))
    }

    const deletePost = id => {
        const postsCopy = posts.filter(post => post.id !== id)
        setPosts(postsCopy)
    }

    const contentChange = (id, value) => {
        const index = posts.findIndex(post => post.id === id)
        posts[index].content = value
        setPosts([...posts])
    }
    const savePostContent = () => {
        console.log('alo')
    }

    useEffect(() => {
        retrieveUser()
    }, [])

    useEffect(() => {
        setTimeout(() => {
            retrievePosts()
        }, 500)
    }, [posts])

    useEffect(() => {
        savePosts(posts)
    }, [posts])

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
                    onDeletePost={deletePost}
                    onContentChange={contentChange}
                    onSaveContent={savePostContent}
                />
                )}
                keyExtractor={item => item.id}
            />
            <TouchableOpacity style={styles.addPost} onPress={() => navigation.navigate('AddPost')}>
                <Icon name={'plus'} size={24} color='#fff' />
            </TouchableOpacity>
        </View>
    )
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
