import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Realm from 'realm';
import PushNotification from 'react-native-push-notification';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

const AddTaskScreen = () => {
  const navigation = useNavigation();
  const [taskName, setTaskName] = useState('');
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'test-channel',
      channelName: 'Test Channel',
    });
  };
  useEffect(() => {
    createChannels();
  }, []);

  const handleNotification = () => {
    // PushNotification.cancelAllLocalNotifications();

    PushNotification.localNotification({
      channelId: 'test-channel',
      title: 'Your reminter set successfully',
      message: '',
      bigText: '',
      color: 'red',
      id: 10,
    });

    // PushNotification.localNotificationSchedule({
    //   channelId: 'test-channel',
    //   title: 'Alarm',
    //   message: 'You clicked on ' + ' 20 seconds ago',
    //   date: new Date(),
    //   allowWhileIdle: true,
    // });
  };

  const handleSubmit = () => {
    const TaskSchema = {
      name: 'Task',
      properties: {
        _id: 'int',
        name: 'string',
        time: 'string?',
      },
      primaryKey: '_id',
    };

    (async () => {
      const realm = await Realm.open({
        path: 'myrealm',
        schema: [TaskSchema],
      });

      realm.write(() => {
        realm.create('Task', {
          _id: Date.now(),
          name: taskName,
          time: moment(date).format('hh:mm a').toString(),
        });
      });

      const tasks = realm.objects('Task');
    })();
    handleNotification();
    setTaskName('');
    navigation.navigate('TaskDetailsScreen');
  };

  return (
    <SafeAreaView style={{backgroundColor: '#FFF', flex: 1}}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          justifyContent: 'center',
          width: '100%',
        }}>
        <Text style={{fontSize: 20, fontWeight: '600', color: '#000'}}>
          Task Name
        </Text>
        <TextInput
          value={taskName}
          placeholder="Task Name"
          onChangeText={e => setTaskName(e)}
          style={{
            marginVertical: 20,
            color: '#000',
            paddingHorizontal: 20,
            backgroundColor: '#E9F8EE',
            borderRadius: 15,
          }}
        />
        <Text style={{fontSize: 20, fontWeight: '600', color: '#000'}}>
          Time
        </Text>
        <TouchableOpacity
          onPress={() => setOpen(true)}
          style={{
            marginVertical: 20,
            paddingHorizontal: 20,
            backgroundColor: '#E9F8EE',
            borderRadius: 15,
            height: 50,
            justifyContent: 'center',
          }}>
          <Text>{moment(date).format('hh:mm a')}</Text>
        </TouchableOpacity>
        <DatePicker
          modal
          open={open}
          date={date}
          mode={'time'}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <TouchableOpacity disabled={!taskName} onPress={handleSubmit}>
          <View
            style={{
              opacity: taskName ? 1 : 0.3,
              height: 50,
              backgroundColor: '#212121',
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16, color: '#fff', fontWeight: '600'}}>
              SUBMIT
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddTaskScreen;

const styles = StyleSheet.create({});
