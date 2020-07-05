/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, ScrollView, ActivityIndicator} from 'react-native';
import Header from './components/Header';
import Formulario from './components/Formulario';
import axios from 'axios';
import Cotizacion from './components/Cotizacion';

const App = () => {
  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('');
  const [consultarAPI, setconsultarAPI] = useState(false);
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  console.log("practicando reactNative");

  useEffect(() => {
    const cotizarCRiptomonedas = async () => {
      if(consultarAPI){
        //Consultar api para obtener la cotizacion
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        try {
          setCargando(true);
          const resultado = await axios.get(url);
          setTimeout(()=>{
            setResultado(resultado.data.DISPLAY[criptomoneda][moneda])
            setconsultarAPI(false)
            setCargando(false);
          },3000)
        } catch (error) {
          console.log(error)
        }
      }
    }
    cotizarCRiptomonedas();

  }, [consultarAPI]);

  const componente = cargando ? <ActivityIndicator size='large' color='#5E48E2'/> : <Cotizacion resultado={resultado}
/>

  return (
    <ScrollView>
      <Header />
      <Image
        style={styles.imagen}
        source={require('./assets/img/cryptomonedas.png')}
      />
      <View style={styles.contenido}>
        <Formulario
          moneda={moneda}
          setMoneda={setMoneda}
          criptomoneda={criptomoneda}
          setCriptomoneda={setCriptomoneda}
          setconsultarAPI={setconsultarAPI}
        />
      </View>
      <View style={{marginTop:40}}>
        {componente}
      </View>
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%',
  },
  contenido: {
    marginHorizontal: '2.5%',
  },
});
