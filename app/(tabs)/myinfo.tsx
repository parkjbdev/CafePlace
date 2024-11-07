import { SafeAreaView, Image, StyleSheet, View, Text, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SectionList, SectionElement } from '@/components/SectionList';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

export default function MyInfoPage() {
  const { session, loading } = useAuth()
  useEffect(() => {
    console.log('hello')
    console.log(session)
  }, [])

  return (
    <ScrollView style={{ flex: 1, padding: 16, paddingTop: 0 }}>
      <SafeAreaView />
      {/* <Text style={{ fontFamily: 'CormorantGaramond-Italic', textAlign: "center", fontSize: 40, margin: 16 }} >CafePlace</Text> */}
      <SectionList title="Account">
        <TouchableOpacity
          onPress={() => {
            // handle onPress
          }}
          style={styles.profile}>
          <Image
            alt=""
            source={{
              uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
            }}
            style={styles.profileAvatar} />
          <View style={styles.profileBody}>
            <Text style={styles.profileName}>{session?.user.id}</Text>
            <Text style={styles.profileHandle}>{session?.user.email}</Text>
          </View>
          <Ionicons name="chevron-forward" size={19} color="#bcbcbc" />
        </TouchableOpacity>
      </SectionList>

      <SectionList title="Preferences">
        <SectionElement isFirst label="Language" value="English" />
        <SectionElement label="Location" value="Los Angeles" />
        <SectionElement label="Email Notifications" hideChevron>
          <Switch
            onValueChange={emailNotifications => {
              // setForm({ ...form, emailNotifications })
            }}
            style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
          // value={form.emailNotifications} />
          />
        </SectionElement>
        <SectionElement isLast label="Push Notifications" hideChevron>
          <Switch
            onValueChange={pushNotifications => {
              // setForm({ ...form, pushNotifications })
            }}
            style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
          // value={form.pushNotifications} />
          />
        </SectionElement>
      </SectionList>

      <SectionList title="Resources">
        <SectionElement isFirst label="Contact Us"></SectionElement>
        <SectionElement label="Report Bug"></SectionElement>
        <SectionElement label="Rate in App Store"></SectionElement>
        <SectionElement isLast label="Terms and Privacy"></SectionElement>
      </SectionList>

      <SectionList>
        <SectionElement isFirst isLast hideChevron label="Log Out" textStyle={
          {
            width: '100%',
            textAlign: 'center',
            fontWeight: '600',
            color: '#dc2626',
          }
        } onPress={() => {
          router.canDismiss() && router.dismissAll()
          router.replace('/auth/login')
        }} />
      </SectionList>

      <Text style={{
        marginVertical: 24,
        fontSize: 13,
        fontWeight: '500',
        textAlign: 'center',
        color: '#a69f9f',
      }}>App Version 2.24 #50491</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  /** Profile */
  profile: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    marginRight: 12,
  },
  profileBody: {
    marginRight: 'auto',
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#292929',
  },
  profileHandle: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: '400',
    color: '#858585',
  },
})
