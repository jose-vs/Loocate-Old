import React, {useEffect, useState} from 'react'; 
import { View, StyleSheet, Text, Button, FlatList } from 'react-native'

import {MAP_API_KEY} from '@env';
import newsapi from './News';
import NewsCard from './NewsCard';

const TestScreen = () => { 

    const [news, setNews] = useState([]);

    useEffect(() => { 
        getNewsFromAPI()
    },[])

    // const newsResponse = async() => { 
    //     const response = await newsapi.get('top-headlines?country=us&category=business&apiKey=010e7428f3594ea295345554875c2325')
    //     console.log(response.data)
    // }
    function getNewsFromAPI() { 
        newsapi.get(`&location=-36.853,174.766&radius=500&keyword=toilet&key=${MAP_API_KEY}`)
        .then(function(response){ 
            setNews(response.data)
            console.log(news);
        })
        .catch(function(error) { 
            console.log(error)
        })
    }

    if (!news) {
        console.log('none')
        return null
    }



    return (
        <View>
            <FlatList data={news.results}
                keyExtractor={(item, index) => 'key' + index}
                renderItem={({item}) => {
                    return <NewsCard item = {item}/>
                }}
            />

        </View>
    )
}


const styles = StyleSheet.create({ 

});

export default TestScreen; 