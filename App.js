import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


const Calculadora = () => {
  const [entradaActual, setEntradaActual] = useState('');
  const [entradaAnterior, setEntradaAnterior] = useState('');
  const [operacion, setOperacion] = useState('');

  const presionarNumero = (numero) => {
    setEntradaActual(entradaActual + numero);
  };

  const presionarOperacion = (op) => {
    if (op === '=' && operacion !== '') {
      calcularResultado();
    } else {
      setOperacion(op);
      if (entradaActual !== '') {
        setEntradaAnterior(entradaActual);
        setEntradaActual('');
      }
    }
  };

  const calcularResultado = () => {
    let actual = parseFloat(entradaActual);
    const anterior = parseFloat(entradaAnterior);
    if (isNaN(actual) || isNaN(anterior) && operacion !== '^') return;

    let resultado = '';
    switch (operacion) {
      case '+':
        resultado = anterior + actual;
        break;
      case '-':
        resultado = anterior - actual;
        break;
      case '*':
        resultado = anterior * actual;
        break;
      case '/':
        resultado = anterior / actual;
        break;
      case '^':
        resultado = Math.pow(anterior, actual);
        break;
      default:
        return;
    }

    setEntradaActual(resultado.toString());
    setOperacion('');
    setEntradaAnterior('');
  };

  const limpiar = () => {
    setEntradaActual('');
    setEntradaAnterior('');
    setOperacion('');
  };

  const borrarUltimo = () => {
    setEntradaActual(entradaActual.substring(0, entradaActual.length - 1));
  };

  const cambiarSigno = () => {
    setEntradaActual((parseFloat(entradaActual) * -1).toString());
  };

  return (
    <View style={styles.contenedor}>
      <View style={styles.Calculadora}>
      <Text style={styles.tituloCalculadora}>CALCULADORA</Text>
      <View style={styles.contenedorResultado}>
        <Text style={styles.textoResultado}>{entradaActual || '0'}</Text>
      </View>
      <View style={styles.fila}>
        <BotonCalculadora texto="C" accion={limpiar} />
        <BotonCalculadora texto="/" accion={() => presionarOperacion('/')} />
        <BotonCalculadora texto="^" accion={() => presionarOperacion('^')} />
        <BotonCalculadora texto="CE" accion={borrarUltimo} />
      </View>
      <View style={styles.fila}>
        <BotonCalculadora texto="7" accion={() => presionarNumero('7')} />
        <BotonCalculadora texto="8" accion={() => presionarNumero('8')} />
        <BotonCalculadora texto="9" accion={() => presionarNumero('9')} />
        <BotonCalculadora texto="*" accion={() => presionarOperacion('*')} />
      </View>
      <View style={styles.fila}>
        <BotonCalculadora texto="4" accion={() => presionarNumero('4')} />
        <BotonCalculadora texto="5" accion={() => presionarNumero('5')} />
        <BotonCalculadora texto="6" accion={() => presionarNumero('6')} />
        <BotonCalculadora texto="-" accion={() => presionarOperacion('-')} />
      </View>
      <View style={styles.fila}>
        <BotonCalculadora texto="1" accion={() => presionarNumero('1')} />
        <BotonCalculadora texto="2" accion={() => presionarNumero('2')} />
        <BotonCalculadora texto="3" accion={() => presionarNumero('3')} />
        <BotonCalculadora texto="+" accion={() => presionarOperacion('+')} />
      </View>
      <View style={styles.fila}>
        <BotonCalculadora texto="±" accion={cambiarSigno} />
        <BotonCalculadora texto="0" accion={() => presionarNumero('0')} />
        <BotonCalculadora texto="." accion={() => presionarNumero('.')} />
        <BotonCalculadora texto="=" accion={() => presionarOperacion('=')} />
      </View>
      </View>
    </View>
  );
};

const BotonCalculadora = ({ texto, accion }) => (
  <TouchableOpacity style={styles.boton} onPress={accion}>
    <Text style={styles.textoBoton}>{texto}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 10,
    justifyContent: 'flex-start', 
    alignItems: 'center',
    backgroundColor: '#f3d0b3', 
  },
  Calculadora: {
    width: '100%',
    paddingTop: 50, 
    paddingBottom: 10, 
    alignItems: 'center',
    backgroundColor: '#f3d0b3', 
  },
  tituloCalculadora: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
  },
  contenedorResultado: {
    width: '90%', 
    minHeight: 80, 
    backgroundColor: '#fae5c9', 
    justifyContent: 'center',
    alignItems: 'flex-end', 
    borderRadius: 10, 
    padding: 20,
    marginBottom: 20, 
  },
  textoResultado: {
    fontSize: 36, 
    color: '#000', 
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-around', 
    width: '100%', 
    maxWidth: 500, 
  },
  boton: {
    backgroundColor: '#deb887', // Color de fondo para los botones
    width: 80,
    height: 100, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0be95',
    borderRadius: 20, 
    margin: 10,
    borderColor: '#000000',
    borderWidth: 1,
  },
  textoBoton: {
    fontSize: 24, 
    color: '#000', 
  },
});

export default Calculadora;
