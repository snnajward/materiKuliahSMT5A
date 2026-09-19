import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>

      <Text style={styles.text}>
        Nama Lengkap : Najwa Ramadhan{"\n"}
        NIM : 2488010001{"\n"}
        Asal Sekolah : MAN 3 Cirebon{"\n"}
        Cita-cita : Illustrator{"\n"}
        Rencana mencapai cita-cita : Melatih keterampilan dasar menggambar secara konsisten
      </Text>

      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
  },

  text: {
    color: '#FF69B4',
    fontSize: 18,
    textAlign: 'left',
  },
});