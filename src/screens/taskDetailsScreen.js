import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import Realm from 'realm';
import React, {useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';

const TaskDetailsScreen = () => {
  const [tasksList, setTasksList] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      getLocalStorageData = async () => {
        const TaskSchema = {
          name: 'Task',
          properties: {
            _id: 'int',
            name: 'string',
            time: 'string?',
          },
          primaryKey: '_id',
        };

        const realm = await Realm.open({
          path: 'myrealm',
          schema: [TaskSchema],
        });
        const tasks = realm.objects('Task');
        setTasksList(tasks.toJSON());
      };

      getLocalStorageData();
    }, []),
  );

  return (
    <View style={{flex: 1, backgroundColor: '#fff', padding: 20}}>
      <FlatList
        data={tasksList}
        keyExtractor={({item}) => item?._id?.toString()}
        renderItem={({item}) => (
          <View
            key={item._id}
            style={{
              backgroundColor: '#E9F8EE',
              paddingHorizontal: 20,
              borderRadius: 16,
              paddingVertical: 20,
              marginVertical: 5,
            }}>
            <Text style={{color: '#000', fontSize: 16, fontWeight: '500'}}>
              {item.name}
            </Text>
            <Text style={{color: '#000', fontSize: 14, fontWeight: '400'}}>
              {item.time}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default TaskDetailsScreen;

const styles = StyleSheet.create({});
