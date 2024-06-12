import { View, Text, StyleSheet, Image,Button,TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react';


export default function Objeto({ objetoFoto, objetoNome, setDetalhes }) {
    
    return (
        <View style={css.container}>
            <View style={css.boxTitle}>
                <View style={css.circleAvatar}></View>
                <Text style={css.title}>{objetoNome}</Text>
            </View>
            <View style={css.boxImage}>
                <Image source={{ uri: objetoFoto }} style={css.foto} />
            </View>
            <Button title="Detalhes" onPress={setDetalhes} />
        </View>
       
    );
}


const css = StyleSheet.create({
    container: {
        minWidth: "80%",
        minHeight: '40%',
        display: "flex",
       
    },
 
    boxImage: {
        width: "100%",
        height: 100,
        backgroundColor:"red",
        marginTop:100
        
    },
    foto: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        backgroundColor:'yellow',
        padding: 20
    },

    nometext:{
        color:'white',
      marginTop: 10

    },
    
   
})