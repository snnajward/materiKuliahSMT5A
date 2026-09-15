
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>CURRICULUM VITAE</Text>
        <Text style={styles.subtitle}>Profil Mahasiswa</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Data Diri</Text>

        <Text style={styles.label}>Nama Lengkap</Text>
        <Text style={styles.value}>Najwa Ramadhan</Text>

        <Text style={styles.label}>NIM</Text>
        <Text style={styles.value}>2488010001</Text>

        <Text style={styles.label}>Asal Sekolah</Text>
        <Text style={styles.value}>MAN 3 Cirebon</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Cita-Cita</Text>
        <Text style={styles.value}>
          Menjadi seorang Frontend Developer
          yang profesional.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Rencana Mencapai Cita-Cita
        </Text>
        <Text style={styles.value}>
          1. Mempelajari HTML, CSS, dan JavaScript.
        </Text>
        <Text style={styles.value}>
          2. Memperdalam React dan React Native.
        </Text>
        <Text style={styles.value}>
          3. Membuat berbagai project untuk portofolio.
        </Text>
        <Text style={styles.value}>
          4. Mengikuti kegiatan dan pengalaman
          yang mendukung kemampuan pemrograman.
        </Text>
      </View>

      <Text style={styles.footer}>
        Terima kasih telah mengunjungi CV saya.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF5FA',
    padding: 20,
    paddingTop: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 25,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#D63384',
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#D63384',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#777',
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    lineHeight: 24,
  },
  footer: {
    textAlign: 'center',
    color: '#999',
    marginTop: 10,
    marginBottom: 20,
  },
});