import React, { Component } from "react";
import { View, Text, TouchableOpacity, Dimensions, StatusBar, Platform, RefreshControl, ScrollView, Image } from "react-native";
import { Iconify } from 'react-native-iconify';
import CalendarStrip from "react-native-scrollable-calendar-strip";
import { LinearGradient } from "expo-linear-gradient";
import styles from '../customStyles/ReservationIndexStyles';
import axios from "axios";
import moment from "moment/moment";
import { useAuth } from './auth';

const apiUrl = 'http://192.168.1.104:8080/api/room';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const datesBlacklist = date => {
  return date.isoWeekday() === 6 || date.isoWeekday() === 7; // disable Saturdays and Sundays
}

export default class ReservationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: null, // Initialize with the current date or the default selected date
      roomStatus: null, // Initialize as null
      refreshing: false,
    };
  }
  handlelogOut = () => {
    this.props.navigation.navigate("Welcome");
  };
  // Function to navigate to the next screen with selected date
  navigateToNextScreen = () => {
    const { selectedDate } = this.state;
    const dateString = selectedDate.toISOString();
    this.props.navigation.navigate("ReservationScreen", {
      selectedDate: dateString,
    });
  };
  handleBoxPress = (boxNumber) => {
    this.props.navigation.navigate("ReservationScreen");
  };
  handleRefresh = async () => {
    this.setState({ refreshing: true });
    const { selectedDate } = this.state; // Access selectedDate from the state
    // Make sure selectedDate is defined and not null
    if (selectedDate) {
      // Continue with the rest of your code for fetching data using formattedDate
      try {
        const jsonData = {
          Booking_date: selectedDate, // Update key without quotes
        };
        const response = await axios.post(apiUrl, jsonData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        // Set the roomStatus in the component's state
        this.setState({ roomStatus: response.data.bookings });
      } catch (error) {
        console.error('Error:', error);
      }
    }
    this.setState({ refreshing: false });
  };
  // Callback function to handle date selection
  handleDateSelected = async (date) => {
    // Parse the date to ensure it's a Date object
    const parsedDate = new Date(date);
    const day = parsedDate.getDate().toString().padStart(2, "0");
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = parsedDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    this.setState({ selectedDate: formattedDate });
    try {
      const jsonData = {
        Booking_date: formattedDate, // Update key without quotes
      };

      const response = await axios.post(apiUrl, jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // Set the roomStatus in the component's state
      this.setState({ roomStatus: response.data.bookings });
      // Handle the response data
      console.log('Room Status for ' + formattedDate + ':', response.data.bookings);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setHidden(false);
    });
    this.blurListener = this.props.navigation.addListener('blur', () => {
      StatusBar.setBarStyle('dark-content');
    });
    // Get the current date and format it
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const year = currentDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    this.setState({ selectedDate: formattedDate });
    try {
      const jsonData = {
        Booking_date: formattedDate,
      };

      const response = await axios.post(apiUrl, jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      this.setState({ roomStatus: response.data.bookings });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  componentWillUnmount() {
    this.focusListener();
    this.blurListener();
  }

  imageMap = {
    'image1012.png': require('../picture/image1012.png'),
    'image1022.png': require('../picture/image1022.png'),
    'image1023.png': require('../picture/image1023.png'),
    'image1034.png': require('../picture/image1034.png'),
    'image1051.png': require('../picture/image1051.png'),
  };

  render() {
    const { route } = this.props;
    const { userData } = route.params;
    const profilePicture = userData?.Profile_Picture || 'profile.png';
    const { roomStatus } = this.state;
    const timeSlotsToCheck = ['08:30 - 10:20', '10:30 - 12:20', '12:30 - 14:20', '14:30 - 16:20'];

    const filteredData_1 = roomStatus && roomStatus.filter(room => room.data.Room_ID === 'KM1');
    const filteredData_2 = roomStatus && roomStatus.filter(room => room.data.Room_ID === 'KM2');
    const filteredData_3 = roomStatus && roomStatus.filter(room => room.data.Room_ID === 'KM3');
    const filteredData_4 = roomStatus && roomStatus.filter(room => room.data.Room_ID === 'KM4');
    const filteredData_5 = roomStatus && roomStatus.filter(room => room.data.Room_ID === 'KM5');
    // Check if all time slots are reserved for the selected room
    const isAllSlotsReserved_1 = timeSlotsToCheck.every(timeSlot =>
      filteredData_1 && filteredData_1.some(room => room.data.Booking_period === timeSlot)
    );
    const isAllSlotsReserved_2 = timeSlotsToCheck.every(timeSlot =>
      filteredData_2 && filteredData_2.some(room => room.data.Booking_period === timeSlot)
    );
    const isAllSlotsReserved_3 = timeSlotsToCheck.every(timeSlot =>
      filteredData_3 && filteredData_3.some(room => room.data.Booking_period === timeSlot)
    );
    const isAllSlotsReserved_4 = timeSlotsToCheck.every(timeSlot =>
      filteredData_4 && filteredData_4.some(room => room.data.Booking_period === timeSlot)
    );
    const isAllSlotsReserved_5 = timeSlotsToCheck.every(timeSlot =>
      filteredData_5 && filteredData_5.some(room => room.data.Booking_period === timeSlot)
    );
    const statusAvailableStyle = styles.statusLabel;
    const statusFullStyle = styles.statusLabelFull;
    const statusStyleChecker_1 = isAllSlotsReserved_1 ? statusFullStyle : statusAvailableStyle;
    const statusStyleChecker_2 = isAllSlotsReserved_2 ? statusFullStyle : statusAvailableStyle;
    const statusStyleChecker_3 = isAllSlotsReserved_3 ? statusFullStyle : statusAvailableStyle;
    const statusStyleChecker_4 = isAllSlotsReserved_4 ? statusFullStyle : statusAvailableStyle;
    const statusStyleChecker_5 = isAllSlotsReserved_5 ? statusFullStyle : statusAvailableStyle;
    return (
      <LinearGradient colors={["#fe4914", "#ff9f24"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[{ flex: 1 }]}>
        <View style={styles.container}>
          <View style={styles.logOutContainer}>
            {userData === null ? (
              <TouchableOpacity style={styles.logOutbutton} onPress={this.handlelogOut}>
                <Text style={{ color: 'white', fontFamily: 'LeagueSpartanMedium', fontSize: 14, }}>Login</Text>
              </TouchableOpacity>
            ) : (<TouchableOpacity style={styles.logOutbutton} onPress={this.handlelogOut}>
              <Text style={{ color: 'white', fontFamily: 'LeagueSpartanMedium', fontSize: 14, }}>Logout</Text>
            </TouchableOpacity>
            )}
          </View>
          <View style={styles.topProfileContainer}>
            <View style={styles.circleViewProfile}>
              {userData === null ? (
                <Image source={require('../picture/profile.png')} style={{ width: "100%", height: "100%", borderRadius: 50 }} />
              ) : (<Image source={this.imageMap[profilePicture]} style={{ width: "100%", height: "100%", borderRadius: 50 }} />)}
            </View>
            {userData === null ? (
              <Text style={styles.hiUserNameLabel}>Hi, Guest</Text>
            ) : (<Text style={styles.hiUserNameLabel}>Hi, {userData.User_FName} {userData.User_Lname}</Text>)}
            <Iconify style={[{ marginLeft: 20, marginTop: 20, }]} icon="streamline-emojis:ant" size={32} />
          </View>

          <View style={styles.RoundedWhiteCoverContainer}>
            <View style={styles.subRoundedWhiteCoverContainer}>
              <View style={[styles.calendarView, { flex: 0, }]}>
                <CalendarStrip
                  scrollable={true}
                  style={{ height: screenHeight * 0.1, paddingTop: 10, }}
                  calendarAnimation={{ type: "parallel", duration: 300, useNativeDriver: true }}
                  daySelectionAnimation={{ type: "border", borderWidth: 1, duration: 300 }}
                  dateNumberStyle={{ color: "gray", fontFamily: 'LeagueSpartan', fontSize: 12 }}
                  dateNameStyle={{ color: "gray", fontFamily: 'LeagueSpartan', fontSize: 12 }}
                  highlightDateNumberStyle={{ color: "black", textDecorationLine: "underline", textDecorationColor: "orange", fontFamily: 'LeagueSpartanMedium', fontSize: 12 }}
                  highlightDateNameStyle={{ color: "black", fontFamily: 'LeagueSpartan', fontSize: 12 }}
                  disabledDateNameStyle={{ color: "grey", fontFamily: 'LeagueSpartan', fontSize: 12 }}
                  disabledDateNumberStyle={{ color: "grey", fontFamily: 'LeagueSpartan', fontSize: 12 }}
                  calendarHeaderStyle={{ color: "black", fontFamily: 'LeagueSpartanMedium', fontSize: 12 }}
                  iconContainer={{ flex: 0.1 }}
                  onDateSelected={this.handleDateSelected}
                  datesBlacklist={datesBlacklist}
                  minDate={moment().subtract(2, 'weeks').format('YYYY-MM-DD')}
                  maxDate={moment().add(2, 'weeks').format('YYYY-MM-DD')}
                />
              </View>
              <View style={styles.spaceOutsideRoomBox}>
                <ScrollView contentContainerStyle={[{ flexGrow: 1 }]} showsVerticalScrollIndicator={false}
                  refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.handleRefresh} />}>
                  <View style={styles.boxRow}>
                    <TouchableOpacity activeOpacity={1} style={styles.box} onPress={() => this.handleBoxPress(1)} >
                      <View style={styles.innerBox}>
                        <View style={styles.imageContainer}>
                          <Image source={require("../picture/floor1.jpg")} style={styles.imageInBoxContainer} resizeMode="cover" />
                        </View>
                        <View style={[{ alignItems: "flex-start" }]}>
                          <Text style={styles.textbold}>KM-Room 1</Text>
                          <Text style={styles.description}>5th Floor</Text>
                          <View style={[styles.statusContainer, {}]}>
                            <Text style={styles.statusText}>Status:</Text>
                            <View style={statusStyleChecker_1}>
                              <Text style={styles.statusLabelInner}>{isAllSlotsReserved_1 ? 'Full' : 'Available'}</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                    <View style={styles.space} />
                    <TouchableOpacity activeOpacity={1} style={styles.box} onPress={() => this.handleBoxPress(2)} >
                      <View style={styles.innerBox}>
                        <View style={styles.imageContainer}>
                          <Image source={require("../picture/floor1.jpg")} style={styles.imageInBoxContainer} resizeMode="cover" />
                        </View>
                        <View style={[{ alignItems: "flex-start" }]}>
                          <Text style={styles.textbold}>KM-Room 2</Text>
                          <Text style={styles.description}>5th Floor</Text>
                          <View style={[styles.statusContainer, {}]}>
                            <Text style={styles.statusText}>Status:</Text>
                            <View style={[styles.statusLabelClose]}>
                              <Text style={styles.statusLabelInner}>Teacher</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.boxRow}>
                    <TouchableOpacity activeOpacity={1} style={styles.box} onPress={() => this.handleBoxPress(3)} >
                      <View style={styles.innerBox}>
                        <View style={styles.imageContainer}>
                          <Image source={require("../picture/floor1.jpg")} style={styles.imageInBoxContainer} resizeMode="cover" />
                        </View>
                        <View style={[{ alignItems: "flex-start" }]}>
                          <Text style={styles.textbold}>KM-Room 3</Text>
                          <Text style={styles.description}>5th Floor</Text>
                          <View style={[styles.statusContainer, {}]}>
                            <Text style={styles.statusText}>Status:</Text>
                            <View style={statusStyleChecker_3}>
                              <Text style={styles.statusLabelInner}>{isAllSlotsReserved_3 ? 'Full' : 'Available'}</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                    <View style={styles.space} />
                    <TouchableOpacity activeOpacity={1} style={styles.box} onPress={() => this.handleBoxPress(4)}>
                      <View style={styles.innerBox}>
                        <View style={styles.imageContainer}>
                          <Image source={require("../picture/floor1.jpg")} style={styles.imageInBoxContainer} resizeMode="cover" />
                        </View>
                        <View style={[{ alignItems: "flex-start" }]}>
                          <Text style={styles.textbold}>KM-Room 4</Text>
                          <Text style={styles.description}>5th Floor</Text>
                          <View style={[styles.statusContainer, {}]}>
                            <Text style={styles.statusText}>Status:</Text>
                            <View style={statusStyleChecker_4}>
                              <Text style={styles.statusLabelInner}>{isAllSlotsReserved_4 ? 'Full' : 'Available'}</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.boxRow}>
                    <TouchableOpacity activeOpacity={1} style={styles.box} onPress={() => this.handleBoxPress(5)}>
                      <View style={styles.innerBox}>
                        <View style={styles.imageContainer}>
                          <Image source={require("../picture/floor1.jpg")} style={styles.imageInBoxContainer} resizeMode="cover" />
                        </View>
                        <View style={[{ alignItems: "flex-start" }]}>
                          <Text style={styles.textbold}>KM-Room 5</Text>
                          <Text style={styles.description}>5th Floor</Text>
                          <View style={[styles.statusContainer, {}]}>
                            <Text style={styles.statusText}>Status:</Text>
                            <View style={statusStyleChecker_5}>
                              <Text style={styles.statusLabelInner}>{isAllSlotsReserved_5 ? 'Full' : 'Available'}</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                    <View style={styles.space} />
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>
          <View style={styles.emptyViewforNavbarShadow}>
            <View style={styles.subemptyViewforNavbarShadow}>
            </View>
          </View>
        </View>
      </LinearGradient >
    );
  }
}