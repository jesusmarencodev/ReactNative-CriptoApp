/* eslint-disable quotes */
/* eslint-disable no-shadow */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableHighlight, Alert} from 'react-native';
import {Picker} from '@react-native-community/picker';
import axios from 'axios';

const Formulario = ({moneda, setMoneda, criptomoneda, setCriptomoneda, setconsultarAPI}) => {
  const [criptomonedas, setCriptomonedas] = useState([]);

  useEffect(() => {
    const consultarAPI = async () => {
      const api_key = `3b7e475d1f2821bf39febdd5bcd33073a0dfcf0364bd712fe73c634d13bc4a72`;
      const url = `http://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD&api_key=${api_key}`;
      const config = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
   
      try {
        const resultado = await axios.get(url, config);
        setCriptomonedas(resultado.data.Data);
      } catch (error) {
        console.log(error)
      }

    };
    consultarAPI();
  }, []);

  const obtenerMoneda = moned => {
    console.log(moned);
    setMoneda(moned);
  };

  const obtenerCriptoMonedas = cripto => {
    console.log(cripto);
    setCriptomoneda(cripto);
  };

  const cotizarPrecio = () => {
    if (moneda.trim() === '' || criptomoneda.trim() === '') {
      mostrarAlerta();
      return;
    }

    //paso validacion
    console.log('cotizando');
    setconsultarAPI(true)
  };

  const mostrarAlerta = () => {
    Alert.alert('Error', 'Ambos campos son obligatorios', [{text: 'Ok'}]);
  };

  return (
    <View>
      <Text style={styles.label}>Moneda</Text>
      <Picker
        selectedValue={moneda}
        onValueChange={moneda => obtenerMoneda(moneda)}>
        <Picker.Item label="-Seleccione-" value="" />
        <Picker.Item label="Dolar USA" value="USD" />
        <Picker.Item label="Peso Mexicano" value="MXN" />
        <Picker.Item label="Euro" value="EUR" />
        <Picker.Item label="Libra Esterlina" value="GBP" />
      </Picker>

      <Text style={styles.label}>Criptomoneda</Text>
      <Picker
        selectedValue={criptomoneda}
        onValueChange={cripto => obtenerCriptoMonedas(cripto)}>
        <Picker.Item label="-Seleccione-" value="" />
        {criptomonedas.map(cripto => (
          <Picker.Item
            key={cripto.CoinInfo.Id}
            label={cripto.CoinInfo.FullName}
            value={cripto.CoinInfo.Name}
          />
        ))}
      </Picker>

      <TouchableHighlight
        style={styles.btnCotizar}
        onPress={() => cotizarPrecio()}>
        <Text style={styles.textoCotizar}>Cotizar</Text>
      </TouchableHighlight>
    </View>
  );
};

export default Formulario;

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Lato-Black',
    fontSize: 22,
    marginTop: 20,
    textTransform: 'uppercase',
  },
  btnCotizar: {
    backgroundColor: '#5E49E2',
    padding: 10,
    marginTop: 20,
  },
  textoCotizar: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
