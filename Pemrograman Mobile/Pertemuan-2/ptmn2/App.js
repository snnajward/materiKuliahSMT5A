import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';

import {
  View,
  Text,
  ScrollView,
  FlatList,
  SectionList,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
  Switch,
  Modal,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Alert,
  Platform,
  KeyboardAvoidingView,
  Animated,
  Linking,
} from 'react-native';

// ============================================================
// DATA PROFILE
// ============================================================

const PROFILE = {
  name: 'Najwa Ramadhan',
  title: 'Informatics Student & Creative Enthusiast',
  email: 'najwaramadhanpintar@gmail.com',
  phone: '085286618267',
  location: 'Cirebon, Jawa Barat',
  bio: 'Mahasiswa Informatika yang tertarik pada pengembangan aplikasi, desain, dan pengembangan ide kreatif.',
  avatar: require('./assets/photosayaa.jpeg'),
};

// ============================================================
// DATA SKILLS
// ============================================================

const SKILLS = [
  {
    id: '1',
    name: 'UI/UX & Visual Design',
    level: 90,
    color: '#61DAFB',
  },
  {
    id: '2',
    name: 'Graphic Design',
    level: 90,
    color: '#F7DF1E',
  },
  {
    id: '3',
    name: 'Digital Drawing',
    level: 85,
    color: '#E34F26',
  },
  {
    id: '4',
    name: 'PHP',
    level: 80,
    color: '#777BB4',
  },
  {
    id: '5',
    name: 'MySQL',
    level: 70,
    color: '#4479A1',
  },
  {
    id: '6',
    name: 'HTML & CSS',
    level: 65,
    color: '#A259FF',
  },
];

// ============================================================
// DATA SECTION
// ============================================================

const SECTIONS = [
  {
    title: '💼 Pengalaman / Proyek',
    data: [
      {
        id: 'e1',
        role: 'Web Developer',
        company: 'Sistem Manajemen Rental PS',
        period: '2026',
        desc: 'Mengembangkan website berbasis PHP, MySQL, dan Bootstrap untuk pengelolaan data dan kebutuhan bisnis Rental PS.',
      },
      {
        id: 'e2',
        role: 'Web Developer',
        company: 'Website Pengaduan Banjir',
        period: '2025',
        desc: 'Mengembangkan website berbasis PHP, MySQL, dan Bootstrap untuk pengelolaan data pengaduan banjir.',
      },
    ],
  },
  {
    title: '🎓 Pendidikan',
    data: [
      {
        id: 'd1',
        role: 'S1 Informatika',
        company:
          'Universitas Islam Negeri Siber Syekh Nurjati Cirebon',
        period: '2024 - Sekarang',
        desc: 'Mempelajari pengembangan perangkat lunak, pemrograman, basis data, pengembangan aplikasi mobile, dan berbagai bidang Informatika.',
      },
    ],
  },
];

// ============================================================
// DATA SOCIAL MEDIA
// ============================================================

const SOCIAL = [
  {
    id: 's1',
    label: 'GitHub',
    icon: '👩‍💻',
    url: 'github.com/snnajward',
  },
  {
    id: 's2',
    label: 'TikTok',
    icon: '🎵',
    url: 'tiktok.com/@mekatsa',
  },
  {
    id: 's3',
    label: 'Instagram',
    icon: '📷',
    url: 'instagram.com/snnajward',
  },
];

// ============================================================
// SUB-COMPONENT: SkillCard
// ============================================================

const SkillCard = ({ item }) => (
  <View style={styles.skillCard}>
    <View style={styles.skillHeader}>
      <Text style={styles.skillName}>{item.name}</Text>

      <Text style={styles.skillPercent}>
        {item.level}%
      </Text>
    </View>

    <View style={styles.progressBg}>
      <View
        style={[
          styles.progressFill,
          {
            width: `${item.level}%`,
            backgroundColor: item.color,
          },
        ]}
      />
    </View>
  </View>
);

// ============================================================
// SUB-COMPONENT: TimelineCard
// ============================================================

const TimelineCard = ({ item, onPress }) => (
  <TouchableOpacity
    style={styles.timelineCard}
    onPress={() => onPress(item)}
    activeOpacity={0.75}
  >
    <View style={styles.timelineDot} />

    <View style={styles.timelineContent}>
      <Text style={styles.timelineRole}>
        {item.role}
      </Text>

      <Text style={styles.timelineCompany}>
        {item.company}
      </Text>

      <Text style={styles.timelinePeriod}>
        {item.period}
      </Text>

      <Text style={styles.timelineHint}>
        Ketuk untuk detail →
      </Text>
    </View>
  </TouchableOpacity>
);

// ============================================================
// APP
// ============================================================

export default function App() {
  // ============================================================
  // STATE
  // ============================================================

  // Switch Open to Work
  const [openToWork, setOpenToWork] = useState(true);

  // Modal
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Form kontak
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');

  // Loading
  const [sending, setSending] = useState(false);

  // Pressable
  const [pressing, setPressing] = useState(false);

  // Tab navigasi
  const [activeTab, setActiveTab] = useState('Info');

  // ============================================================
  // ANIMATED AVATAR
  // ============================================================

  const avatarScale = useRef(
    new Animated.Value(1)
  ).current;

  useEffect(() => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(avatarScale, {
        toValue: 1.15,
        duration: 900,
        useNativeDriver: true,
      }),

      Animated.timing(avatarScale, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
    ])
  ).start();
}, []);

  // ============================================================
  // HANDLER MODAL
  // ============================================================

  const handleCardPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  // ============================================================
  // HANDLER FORM
  // ============================================================

  const handleSend = () => {
    if (!senderName.trim() || !message.trim()) {
      Alert.alert(
        '⚠️ Peringatan',
        'Nama dan pesan tidak boleh kosong!'
      );
      return;
    }

    setSending(true);

    setTimeout(() => {
      setSending(false);

      const currentName = senderName;

      setSenderName('');
      setMessage('');

      Alert.alert(
        '✅ Berhasil',
        `Pesan dari ${currentName} telah terkirim!`
      );
    }, 2000);
  };

  // ============================================================
  // RETURN
  // ============================================================

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      {/* ======================================================
          HEADER
          ====================================================== */}

      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>
          📄 Curriculum Vitae
        </Text>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>
            {openToWork ? '🟢 Open' : '🔴 Busy'}
          </Text>

          <Switch
            value={openToWork}
            onValueChange={setOpenToWork}
            trackColor={{
              false: '#555',
              true: '#4ade80',
            }}
            thumbColor={
              openToWork ? '#fff' : '#aaa'
            }
          />
        </View>
      </View>

      {/* ======================================================
    TAB NAVIGATION
    ====================================================== */}

<View style={styles.tabContainer}>

  <TouchableOpacity
    style={[
      styles.tabButton,
      activeTab === 'Info' && styles.activeTab,
    ]}
    onPress={() => setActiveTab('Info')}
    activeOpacity={0.8}
  >
    <Text style={styles.tabIcon}>
      👤
    </Text>

    <Text
      style={[
        styles.tabText,
        activeTab === 'Info' && styles.activeTabText,
      ]}
    >
      Info
    </Text>
  </TouchableOpacity>


  <TouchableOpacity
    style={[
      styles.tabButton,
      activeTab === 'Skills' && styles.activeTab,
    ]}
    onPress={() => setActiveTab('Skills')}
    activeOpacity={0.8}
  >
    <Text style={styles.tabIcon}>
      🛠️
    </Text>

    <Text
      style={[
        styles.tabText,
        activeTab === 'Skills' && styles.activeTabText,
      ]}
    >
      Skills
    </Text>
  </TouchableOpacity>


  <TouchableOpacity
    style={[
      styles.tabButton,
      activeTab === 'Kontak' && styles.activeTab,
    ]}
    onPress={() => setActiveTab('Kontak')}
    activeOpacity={0.8}
  >
    <Text style={styles.tabIcon}>
      ✉️
    </Text>

    <Text
      style={[
        styles.tabText,
        activeTab === 'Kontak' && styles.activeTabText,
      ]}
    >
      Kontak
    </Text>
  </TouchableOpacity>

</View>

      {/* ======================================================
          CONTENT
          ====================================================== */}

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        {/* ====================================================
            TAB INFO
            ==================================================== */}

        {activeTab === 'Info' && (
          <View style={styles.profileSection}>

            {/* Animated Avatar */}
            <Animated.Image
              source={PROFILE.avatar}
              style={[
                styles.avatar,
                {
                  transform: [
                    {
                      scale: avatarScale,
                    },
                  ],
                },
              ]}
            />

            {/* Open to Work Badge */}
            {openToWork && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  ✅ Open to Work
                </Text>
              </View>
            )}

            <Text style={styles.profileName}>
              {PROFILE.name}
            </Text>

            <Text style={styles.profileTitle}>
              {PROFILE.title}
            </Text>

            <Text style={styles.profileBio}>
              {PROFILE.bio}
            </Text>

            <View style={styles.contactRow}>
              <Text style={styles.contactItem}>
                📧 {PROFILE.email}
              </Text>

              <Text style={styles.contactItem}>
                📍 {PROFILE.location}
              </Text>
            </View>

            <Text style={styles.contactItem}>
              📱 {PROFILE.phone}
            </Text>

            {/* Social Media */}
            <View style={styles.socialRow}>
              {SOCIAL.map((s) => (
                <TouchableOpacity
                  key={s.id}
                  style={styles.socialBtn}
                  onPress={() =>
                    Alert.alert(
                      '🔗 Link',
                      s.url
                    )
                  }
                  activeOpacity={0.8}
                >
                  <Text style={styles.socialIcon}>
                    {s.icon}
                  </Text>

                  <Text style={styles.socialLabel}>
                    {s.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Download Button */}
            <Pressable
              style={({ pressed }) => [
                styles.downloadBtn,
                pressed &&
                  styles.downloadBtnPressed,
              ]}
              onPressIn={() =>
                setPressing(true)
              }
              onPressOut={() =>
                setPressing(false)
              }
              onPress={() =>
                Alert.alert(
                  '⬇️ Download',
                  'CV sedang diunduh...'
                )
              }
            >
              <Text style={styles.downloadBtnText}>
                {pressing
                  ? '⏳ Mengunduh...'
                  : '⬇️ Download CV (PDF)'}
              </Text>
            </Pressable>
          </View>
        )}

        {/* ====================================================
            TAB SKILLS
            ==================================================== */}

        {activeTab === 'Skills' && (
          <>
            {/* Skills */}
            <View style={styles.sectionBox}>
              <Text style={styles.sectionTitle}>
                🛠️ Keahlian
              </Text>

              <Text style={styles.sectionSubtitle}>
                Kemampuan yang sedang saya pelajari
                dan kembangkan
              </Text>

              <FlatList
                data={SKILLS}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <SkillCard item={item} />
                )}
                scrollEnabled={false}
                ItemSeparatorComponent={() => (
                  <View
                    style={{ height: 8 }}
                  />
                )}
              />
            </View>

            {/* Riwayat */}
            <View style={styles.sectionBox}>
              <Text style={styles.sectionTitle}>
                📋 Riwayat
              </Text>

              <Text style={styles.sectionSubtitle}>
                Ketuk kartu untuk melihat detail
              </Text>

              <SectionList
                sections={SECTIONS}
                keyExtractor={(item) =>
                  item.id
                }
                renderItem={({ item }) => (
                  <TimelineCard
                    item={item}
                    onPress={handleCardPress}
                  />
                )}
                renderSectionHeader={({
                  section: { title },
                }) => (
                  <View
                    style={
                      styles.sectionHeader
                    }
                  >
                    <Text
                      style={
                        styles.sectionHeaderText
                      }
                    >
                      {title}
                    </Text>
                  </View>
                )}
                scrollEnabled={false}
                ItemSeparatorComponent={() => (
                  <View
                    style={{ height: 10 }}
                  />
                )}
                SectionSeparatorComponent={() => (
                  <View
                    style={{ height: 16 }}
                  />
                )}
              />
            </View>
          </>
        )}

        {/* ====================================================
            TAB KONTAK
            ==================================================== */}

        {activeTab === 'Kontak' && (
          <KeyboardAvoidingView
            behavior={
              Platform.OS === 'ios'
                ? 'padding'
                : 'height'
            }
          >
            <View style={styles.sectionBox}>
              <Text style={styles.sectionTitle}>
                ✉️ Hubungi Saya
              </Text>

              <Text style={styles.sectionSubtitle}>
                Silakan kirim pesan melalui form
                berikut
              </Text>

              {/* Nama */}
              <TextInput
                style={styles.textInput}
                placeholder="Nama Anda"
                placeholderTextColor="#888"
                value={senderName}
                onChangeText={setSenderName}
                returnKeyType="next"
                editable={!sending}
              />

              {/* Pesan */}
              <TextInput
                style={[
                  styles.textInput,
                  styles.textArea,
                ]}
                placeholder="Tulis pesan Anda di sini..."
                placeholderTextColor="#888"
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                editable={!sending}
              />

              {/* Loading / Button */}
              {sending ? (
                <View
                  style={styles.loadingRow}
                >
                  <ActivityIndicator
                    size="large"
                    color="#7c3aed"
                  />

                  <Text
                    style={styles.loadingText}
                  >
                    Mengirim pesan...
                  </Text>
                </View>
              ) : (
                <Button
                  title="📨 Kirim Pesan"
                  color="#7c3aed"
                  onPress={handleSend}
                />
              )}
            </View>
          </KeyboardAvoidingView>
        )}

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* ======================================================
          MODAL
          ====================================================== */}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() =>
          setModalVisible(false)
        }
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>

            {selectedItem && (
              <>
                <Text style={styles.modalTitle}>
                  {selectedItem.role}
                </Text>

                <Text
                  style={styles.modalCompany}
                >
                  {selectedItem.company}
                </Text>

                <Text
                  style={styles.modalPeriod}
                >
                  📅 {selectedItem.period}
                </Text>

                <View
                  style={styles.modalDivider}
                />

                <Text
                  style={styles.modalDesc}
                >
                  {selectedItem.desc}
                </Text>
              </>
            )}

            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() =>
                setModalVisible(false)
              }
            >
              <Text
                style={styles.modalCloseBtnText}
              >
                ✕ Tutup
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ============================================================
// COLORS
// ============================================================

const COLORS = {
  bg: '#0f0f1a',
  card: '#1a1a2e',
  cardBorder: '#2d2d44',
  accent: '#7c3aed',
  accentLight: '#a78bfa',
  accentGold: '#f59e0b',
  text: '#f0f0f0',
  textMuted: '#9ca3af',
  textDim: '#6b7280',
  success: '#4ade80',
  white: '#ffffff',
};

// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({

  // ── LAYOUT ─────────────────────────────────────

  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  scroll: {
    flex: 1,
  },

  // ── HEADER ─────────────────────────────────────

  headerBar: {
    backgroundColor: COLORS.card,
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
  },

  headerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  switchLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },

  // ── TAB NAVIGATION ─────────────────────────────

  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },

  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 9,
  },

  activeTab: {
    backgroundColor: COLORS.accent,
  },

  tabText: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },

  activeTabText: {
    color: COLORS.white,
    fontWeight: '700',
  },

  // ── PROFILE ────────────────────────────────────

  profileSection: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
    backgroundColor: COLORS.card,
    marginBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    borderBottomWidth: 2,
    borderColor: COLORS.accent,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: COLORS.accent,
    marginBottom: 8,
  },

  badge: {
    backgroundColor: '#052e16',
    borderWidth: 1,
    borderColor: COLORS.success,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 12,
  },

  badgeText: {
    color: COLORS.success,
    fontSize: 12,
    fontWeight: '700',
  },

  profileName: {
    color: COLORS.white,
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
  },

  profileTitle: {
    color: COLORS.accentLight,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 14,
    textAlign: 'center',
  },

  profileBio: {
    color: COLORS.textMuted,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },

  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 6,
  },

  contactItem: {
    color: COLORS.textMuted,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 4,
  },

  // ── SOCIAL ─────────────────────────────────────

  socialRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    marginBottom: 20,
  },

  socialBtn: {
    alignItems: 'center',
    backgroundColor: '#16213e',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },

  socialIcon: {
    fontSize: 20,
    marginBottom: 4,
  },

  socialLabel: {
    color: COLORS.accentLight,
    fontSize: 11,
    fontWeight: '600',
  },

  // ── DOWNLOAD ───────────────────────────────────

  downloadBtn: {
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 50,
    elevation: 4,
    shadowColor: COLORS.accent,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
  },

  downloadBtnPressed: {
    backgroundColor: '#5b21b6',
  },

  downloadBtnText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 14,
  },

  // ── SECTION BOX ────────────────────────────────

  sectionBox: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },

  sectionTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },

  sectionSubtitle: {
    color: COLORS.textDim,
    fontSize: 11,
    fontStyle: 'italic',
    marginBottom: 16,
  },

  // ── SECTION HEADER ────────────────────────────

  sectionHeader: {
    backgroundColor: '#0f172a',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
  },

  sectionHeaderText: {
    color: COLORS.accentLight,
    fontWeight: '700',
    fontSize: 13,
  },

  // ── SKILL CARD ─────────────────────────────────

  skillCard: {
    backgroundColor: '#16213e',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },

  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  skillName: {
    color: COLORS.text,
    fontWeight: '600',
    fontSize: 13,
  },

  skillPercent: {
    color: COLORS.accentLight,
    fontWeight: '700',
    fontSize: 13,
  },

  progressBg: {
    height: 6,
    backgroundColor: '#0f172a',
    borderRadius: 4,
    overflow: 'hidden',
  },

  progressFill: {
    height: 6,
    borderRadius: 4,
  },

  // ── TIMELINE ───────────────────────────────────

  timelineCard: {
    flexDirection: 'row',
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },

  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.accent,
    marginTop: 4,
    marginRight: 12,
  },

  timelineContent: {
    flex: 1,
  },

  timelineRole: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 2,
  },

  timelineCompany: {
    color: COLORS.accentLight,
    fontSize: 13,
    marginBottom: 2,
  },

  timelinePeriod: {
    color: COLORS.textMuted,
    fontSize: 11,
    marginBottom: 6,
  },

  timelineHint: {
    color: COLORS.accentGold,
    fontSize: 11,
    fontStyle: 'italic',
  },

  // ── TEXT INPUT ─────────────────────────────────

  textInput: {
    backgroundColor: '#0f172a',
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical:
      Platform.OS === 'ios' ? 14 : 10,
    fontSize: 14,
    marginBottom: 12,
  },

  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },

  // ── LOADING ────────────────────────────────────

  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 10,
  },

  loadingText: {
    color: COLORS.accentLight,
    fontSize: 14,
    fontWeight: '600',
  },

  // ── MODAL ──────────────────────────────────────

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'flex-end',
  },

  modalBox: {
    backgroundColor: '#1e1b4b',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 28,
    borderTopWidth: 3,
    borderColor: COLORS.accent,
  },

  modalTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },

  modalCompany: {
    color: COLORS.accentLight,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },

  modalPeriod: {
    color: COLORS.textMuted,
    fontSize: 13,
    marginBottom: 16,
  },

  modalDivider: {
    height: 1,
    backgroundColor: COLORS.cardBorder,
    marginBottom: 16,
  },

  modalDesc: {
    color: COLORS.text,
    fontSize: 14,
    lineHeight: 22,
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },

  modalCloseBtnText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 14,
  },
});