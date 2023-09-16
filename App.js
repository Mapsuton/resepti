import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Alert, Image } from 'react-native';

export default function App() {

const [hakusana, setHakusana] = useState('');
const [reseptit, setReseptit] = useState([]);

const getReseptit = () => {
  console.log(hakusana);
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${hakusana}`)
  .then(response => response.json())
  .then(responseJson => setReseptit(responseJson.meals))
  .catch(error => {
  //Alert.alert('Error', error);
  });
  setHakusana('');
  console.log(`www.themealdb.com/api/json/v1/1/filter.php?i=${hakusana}`);
  console.log(reseptit);
  }
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.button}
        placeholder='keyword'
        value={hakusana}
        onChangeText={text => setHakusana(text)}
/>
      <Button title="Find" onPress= {getReseptit} />
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => 
        <View>
          <Text
            style={{fontSize: 18, fontWeight: "bold"}}>{item.strMeal}
          </Text>
          <Image source={{uri: item.strMealThumb + '/preview'}}/>
        </View>}
        data={reseptit} />
    </View>
  );
}
//<Image source={item.strMealThumb}/>
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    fontSize: 18,
    width: 200,
  }
});
