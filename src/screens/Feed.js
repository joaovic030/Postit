import React, { useEffect, useState, useCallback } from 'react'
import { View, 
    StyleSheet,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    Platform
} from 'react-native'
import { KeyboardAwareFlatList, KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/AntDesign'
import Pattern from '../styles/Pattern'
import Header from '../components/Header'
import Card from '../components/Card'

export default function Feed({ navigation }) {
   
    const [user, setUser] = useState({})
    const [posts, setPosts] = useState([])

    const retrieveUser = async () => {
        try {
            const res = await AsyncStorage.getItem('userData')
            const value = JSON.parse(res)
            setUser(value)
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
        const copyPosts = posts
        setPosts([...copyPosts])
    }

    useEffect(() => {
        retrieveUser()
    }, [])

    useEffect(() => {
        setTimeout(() => {
            retrievePosts()
        }, 1000)
    }, [posts])

    useEffect(() => {
        retrievePosts()
    }, [])

    useEffect(() => {
        savePosts(posts)
    }, [posts])

    return (
            <>
            {/* Ciente deste Warning -> VirtualizedLists should never be nested inside plain ScrollViews with the same orientation */}
            {/* Porem, esta foi a aproximacao que pude fazer para corrigir o KeyboarAvoidingView - Teclado não exibindo quando voce tenta editar o ultimo item da lista quando a lista ultrapassa ou chega proximo ao 100% da 'ViewPort' */}
            <KeyboardAwareScrollView  style={styles.container}>
                {/* <Header email={user.email} /> */}
                <FlatList
                    data={[...posts].reverse()}
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
                    />
                    )}
                    keyExtractor={item => `${item.id}`}
                />

            </KeyboardAwareScrollView >
            <TouchableOpacity style={styles.addPost} onPress={() => navigation.navigate('AddPost')}>
                <Icon name={'plus'} size={24} color='#fff' />
            </TouchableOpacity>
            </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
