import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import Objeto from '../Components/Objeto'

import { useFocusEffect } from '@react-navigation/native';



export default function Home() {

  const [objetos, setObjetos] = useState([]);
  const [detalhes, setDetalhes] = useState(false);
  const [novaobservacao, setNovaobservacao] = useState(false)
  const [objeto, setObjeto] = useState();
  const [erro, seterro] = useState(false);
  const [descricao, setDescricao] = useState()
  const [local, setLocal] = useState()
  const [data, setData] = useState()
  const [resposta, setResposta] = useState(false);


  async function GetObjetos() {
    await fetch('http://10.139.75.32:5251/api/Objetos/GetAllObjetos', {
      method: 'GET',
      headers: {
        'content-type': 'application/json '
      }
    })
      .then(res => (res.ok == true) ? res.json() : false)
      .then(json => setObjetos(json))
      .catch(err => console.log(err))
  }

  async function getObjeto(id) {
    await fetch('http://10.139.75.32:5251/api/Objetos/GetObjetoId/' + id, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => (res.ok == true) ? res.json() : false)
      .then(json => setObjeto(json))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    GetObjetos();
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      GetObjetos();
    }, [])
  );

  async function getNovaObservacao(objetoId) {
    await fetch('http://10.139.75.32:5251/api/Observacaos/CreateObservacao', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        observacaoLocal: local,
        observacaoDescricao: descricao,
        observacaoData: data,
        objetoId: objetoId,
        usuarioId: 3
      })
    })
      .then(res => res.json() )
      .then(json => setResposta( json ) )
      .catch(err => console.log( err ) )

    
  }


  function Voltar(){

    setData(data)
    setDescricao (descricao )
    setLocal(local)

  }

  return (
    <View style={css.container}>
      {objetos && !detalhes &&
        <FlatList
          data={objetos}
          renderItem={({ item }) => <Objeto objetoFoto={item.objetoFoto} objetoNome={item.objetoNome} setDetalhes={() => { setDetalhes(true); getObjeto(item.objetoId) }} />}
          keyExtractor={(item) => item.objetoId}
          contentContainerStyle={{ width: "100%" }}

        />
      }
      {!objetos && !detalhes && <Text>Carregando objetos</Text>}
      {detalhes && objeto &&
        <>
          <View style={css.detailsBox}>
            <Text style={css.detailsText}>Nome:{objeto.objetoNome}</Text>
            <Text style={css.detailsText}>Cor: {objeto.objetoCor}</Text>
            <Text style={css.detailsText}>Observação: {objeto.objetoObservacao}</Text>
            <Text style={css.detailsText}>Local de Desaparecimento: {objeto.objetoLocalDesaparecimento}</Text>
            <Text style={css.detailsText}>Data de Desaparecimento: {objeto.objetoDtDesaparecimento}</Text>
            <Text style={css.detailsText}>Local de Encontro: {objeto.objetoDtEncontro}</Text>
            <Text style={css.detailsText}>ObservaçãoLocal: {objeto.observcaoLocal}</Text>
            <Text style={css.detailsText}>ObservacaoData: {objeto.observcaoData}</Text>
            <Text style={css.detailsText}>ObservaçãoDescrição: {objeto.observacaoDescricao}</Text>
            <Button title="Voltar" onPress={() => setDetalhes(false)} style={css.btn} />
            <Button title="Nova Observacao" onPress={(item) => { setNovaobservacao(true) }} style={css.btn} />
          </View>
          <View>
            {novaobservacao && !resposta &&
              <>
                <View style={css.detailsBox}>
                  <TextInput
                    inputMode="text"
                    placeholder="ObservaçãoLocal"
                    style={css.input}
                    value={local}
                    onChangeText={(digitado) => setLocal(digitado)}
                    placeholderTextColor="white"


                  />
                  <TextInput
                    inputMode="text"
                    placeholder="ObservaçãoData"
                    style={css.input}
                    value={data}
                    onChangeText={(digitado) => setData(digitado)}
                    placeholderTextColor="white"


                  />
                  <TextInput
                    inputMode="text"
                    placeholder="ObservaçãoDescrição"
                    style={css.input}
                    value={descricao}
                    onChangeText={(digitado) => setDescricao(digitado)}
                    placeholderTextColor="white"


                  />

                  <TouchableOpacity style={css.btnObservacao} onPress={() =>  getNovaObservacao(objeto.objetoId , ) } >
                    <Text style={css.btnObservacaoText}>Salvar</Text>
                  </TouchableOpacity>
                
                  <Button title="Voltar" onPress={() => setNovaobservacao(false)} />
                </View>
              </>

            }

            {resposta &&
              <>
                   <Button title="novo" onPress={() => setResposta(false , Voltar(setData(data),  setDescricao ( descricao), setLocal(local) )) } style =  {css.btnVoltar}/>
                <Text style={css.text}
   
    > Obrigado por compartilhas sua observação. Sua observação foi realizado com sucesso!!</Text>
               

              </>

            }

          </View>
        </>
      }

    </View>

  )
}
const css = StyleSheet.create({
  container: {
    backgroundColor: "#717165",
    flexGrow: 1,
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  text: {
    color: "white"
  },
  btn: {
    maxWidth: "50%",
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#0195fd"
  },
  btntext: {
    color: "white",
    lineHeight: 45,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold"

  },
  detalhe: {
    borderRadius: 20
  },
  detailsBox: {
    maxWidth: "100%",

    padding: 10,
    marginTop: 5,
    backgroundColor: "#333"
  },
  detailsText: {
    color: "white",
    textAlign: "justify",
    marginBottom: 5
  },

  input: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    backgroundColor: "#262626",
    color: "white"
  },
  erro: {
    width: "100%",
    height: 50,
    marginTop: 30
  },
  erroText: {
    color: "white",
    textAlign: "center"
  },
  btnObservacao: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
    marginLeft:10,
    backgroundColor: "#0195fd"
  },
  btnObservacaoText: {
    color: "white",
    lineHeight: 45,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold"
  },
  



})