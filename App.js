import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AddTaskScreen from './src/screens/addTaskScreen';
import TaskDetailsScreen from './src/screens/taskDetailsScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="AddTaskScreen"
        screenOptions={{headerShown: false}}>
        <Tab.Screen
          name="AddTaskScreen"
          component={AddTaskScreen}
          options={{
            tabBarLabel: 'Add Task',
            tabBarIcon: ({color, size, focused}) => (
              <FontAwesome
                name="plus-circle"
                color={'#000'}
                size={focused ? 30 : 25}
              />
            ),
          }}
        />
        <Tab.Screen
          name="TaskDetailsScreen"
          component={TaskDetailsScreen}
          options={{
            tabBarLabel: 'Task Details',
            tabBarIcon: ({color, size, focused}) => (
              <FontAwesome
                name="th-list"
                color={'#000'}
                size={focused ? 30 : 25}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
