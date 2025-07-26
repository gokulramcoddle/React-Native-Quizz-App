import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { getAttendees } from '@/services/apiService';
import AppText from '@/components/AppText';
import { formatFullDateWithAgo } from '@/helper/formatter';

interface Attendee {
  id: string;
  name: string;
  email: string;
  score: any;
  date: any;
  [key: string]: any;
}

const AttendeesScreen = () => {
  const { quizId } = useLocalSearchParams();
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(()=>{
 fetchAttendees()
  },[quizId])

    const fetchAttendees = async () => {
      try {
        const res = await getAttendees(Number(quizId));
        setAttendees(res.data);
      } catch (err: any) {
        console.error(err);
        setError(err?.response?.data?.message || 'Failed to fetch attendees');
      } finally {
        setLoading(false);
      }
    };

  if (loading) return <ActivityIndicator style={styles.centered} size="large" color= "#a811bfff" />;
  if (error) return <Text style={styles.errorText}>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Attendees</Text>
   <ScrollView contentContainerStyle={{ flexGrow: 1 }}         
     showsVerticalScrollIndicator={false} >
 {attendees.length > 0 ? attendees.map((item) => (
  <View style={styles.attendeeCard} key={item.id}>
    <AppText style={styles.name}>{item?.attendee_name}</AppText>
    <Text style={styles.email}>{item?.attendee_email ?? 'No Email'}</Text>
<Text>
  <Text style={{ fontWeight: 'bold', color: 'white' }}>Score: {' '}</Text>
<Text
  style={[
    styles.score,
    {
      color:
        item.total_questions && item.score / item.total_questions < 0.5
          ? 'red'
          : 'green',
    },
  ]}
>
  {item.score} / {item?.total_questions}
</Text>
</Text>
    <Text style={styles.date}>{formatFullDateWithAgo(item.submitted_at)}</Text>
  </View>
)) : (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, color: 'white' }}>
           No one has attended yet.
        </Text> 
  </View>
 )}
      </ScrollView>
    </View>
  );
};

export default AttendeesScreen;

const styles = StyleSheet.create({
container: { flex: 1, padding: 16 },
 title: {
    fontSize: 50,
    marginTop: 45,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#e11fffff',
  },
   attendeeCard: { padding: 30, borderBottomWidth: 1, borderColor: '#ccc' },
  name: { fontSize: 25, fontWeight: '700' },
  email: { fontSize: 15, color: '#ae9effdb' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: 'red', textAlign: 'center', marginTop: 20 },
  score: {color: 'white', fontSize: 18},
  date: {color: '#d5d5d5ff'}
});
