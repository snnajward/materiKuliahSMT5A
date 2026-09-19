import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Curriculum Vitae</Text>
        <View style={styles.line} />

        <Text style={styles.text}>
          <Text style={styles.label}>Nama Lengkap : </Text>
          Najwa Ramadhan{"\n"}

          <Text style={styles.label}>NIM : </Text>
          2488010001{"\n"}

          <Text style={styles.label}>Asal Sekolah : </Text>
          MAN 3 Cirebon{"\n"}

          <Text style={styles.label}>Cita-cita : </Text>
          Illustrator & Penulis{"\n"}

          <Text style={styles.label}>Rencana Mencapai Cita-Cita : </Text>
          Terus mengembangkan kemampuan menulis dan ilustrasi dengan rutin membuat karya, membangun portofolio, serta membagikannya di media sosial. Saat ini saya sudah mulai menulis cerita di sebuah platform sosial media dan mendapatkan respons serta pembaca yang cukup baik.
        </Text>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0F6',
    justifyContent: 'center',
    padding: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 20,
    elevation: 5,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF69B4',
    textAlign: 'center',
  },

  line: {
    height: 2,
    backgroundColor: '#FFB6D9',
    marginVertical: 15,
  },

  text: {
    fontSize: 16,
    lineHeight: 28,
    color: '#444',
  },

  label: {
    fontWeight: 'bold',
    color: '#FF69B4',
  },
});