import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ActivityIndicator } from 'react-native';

export default function App() {
  const [city, setCity] = useState('Jakarta');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = '90c2392c36433bed4385cbc7052e0a46';

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aplikasi Cuaca</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan nama kota"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Lihat Cuaca" onPress={fetchWeather} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {weather && weather.main && (
        <View style={styles.result}>
          <Text style={styles.city}>{weather.name}</Text>
          <Text style={styles.temp}>{weather.main.temp} °C</Text>
          <Text>{weather.weather[0].description}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    width: '100%',
    borderColor: '#00838f',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5
  },
  result: {
    marginTop: 20,
    alignItems: 'center'
  },
  city: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  temp: {
    fontSize: 36
  }
});