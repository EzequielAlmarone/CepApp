import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Keyboard } from 'react-native';
import api from './src/services/api';

export default function App() {

  const [cep, setCep] = useState('');
  const inputRef = useRef(null);
  const [cepUser, setCepUser] = useState(null);

  // função limpar

  function limpar() {
    setCep('');
    inputRef.current.focus();
    setCepUser(null);
  }

  // função buscar

  async function buscar() {

    if (cep == '') {
      alert('Digite um cep');
      inputRef.current.focus();
      return;
    }
    try {
      Keyboard.dismiss();// garantir que o teclado será fechado
      const response = await api.get(`/${cep}/json`);
      console.log(response.data);
      if (response.data.erro == true) {
        alert('Cep informado é inválido');
        limpar();
        return;
      }
      setCepUser(response.data);
    } catch (error) {
      console.log(error);
      alert('Cep informado é inválido');
      limpar();
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.area}>
        <Text style={styles.text}>Digite o cep desejado</Text>
        <TextInput
          style={styles.input}
          placeholder="EX: 79950-000"
          value={cep}
          onChangeText={(texto) => setCep(texto)}
          keyboardType="numeric"
          ref={inputRef}
        />
      </View>
      <View style={styles.areaBtn}>
        <TouchableOpacity style={[styles.botao, { backgroundColor: '#1d75cd' }]} onPress={buscar}>
          <Text style={styles.botaoText}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.botao, { backgroundColor: '#cd3e1d' }]} onPress={limpar}>
          <Text style={styles.botaoText}>Limpar</Text>
        </TouchableOpacity>
      </View>
      {cepUser &&
        <View style={styles.resultado}>

          <Text style={styles.itemText}>CEP: {cepUser.cep}</Text>
          <Text style={styles.itemText}>Logradouro: {cepUser.logradouro}</Text>
          <Text style={styles.itemText}>Bairro: {cepUser.bairro}</Text>
          <Text style={styles.itemText}>Cidade: {cepUser.localidade}</Text>
          <Text style={styles.itemText}>Estado: {cepUser.uf}</Text>
        </View>
      }


    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  area: {
    alignItems: 'center'
  },
  text: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 18,
    width: '90%',
    padding: 10
  },
  areaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    justifyContent: 'space-around'
  },

  botao: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
  },
  botaoText: {
    fontSize: 22,
    color: '#fff'
  },
  resultado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText: {
    fontSize: 24,
  }



})