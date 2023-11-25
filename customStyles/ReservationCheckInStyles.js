import { StyleSheet, Dimensions } from 'react-native';
import COLORS from './colors';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({

    scrollViewContainer: {
        flexGrow: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        elevation: 3,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20, // Half of the width/height to create a circle
        backgroundColor: 'white',
        borderColor: COLORS.gray_7,
        borderWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    imageStyles: {
        width: screenWidth * 0.9,
        height: screenWidth * 0.8,
        borderRadius: 15,
    },
    OverviewLable: {
        fontSize: 18,
        alignItems: 'center',
        color: COLORS.primary,
        marginTop: 20,
        marginBottom: 10,
        fontFamily: 'LeagueSpartanSemiBold',
    },
    backgroundclockIcon: {
        marginRight: 10,
        backgroundColor: COLORS.gray_8,
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 4,
    },
    timeLabel: {
        fontSize: 14,
        color: COLORS.gray_2,
        fontFamily: 'LeagueSpartanMedium',
    },
    hoursLable: {
        flex: 1,
        flexWrap: 'wrap',
        fontSize: 14,
        fontFamily: 'LeagueSpartanMedium',
    },
    datetimeLable: {
        fontSize: 18,
        fontFamily: 'LeagueSpartanSemiBold',
        alignItems: 'center',
        color: COLORS.primary,
        marginTop: 8,
        marginBottom: 10,
    },
    datetimeDetailLable: {
        fontSize: 14, // Adjust font size as needed
        fontFamily: 'LeagueSpartanMedium',
        color: 'black',
        marginBottom: 10,
    },
    MapViewStyles: {
        width: width * 0.8,
        height: height * 0.4,
        borderBlockColor: 'white',
        borderRadius: 25,
        padding: 8,

        elevation: 2,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    checkInContainer: {
        backgroundColor: COLORS.black_2,
        height: screenHeight * 0.06,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        marginTop: 16,
        width: screenWidth * 0.9,
    },
    checkInLable: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'LeagueSpartanSemiBold',
        textAlign: 'center',
    },
    checkInContainerDisabled: {
        backgroundColor: COLORS.gray_4,
        height: screenHeight * 0.06,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        marginTop: 16,
        width: screenWidth * 0.9,
    },
    checkInLableDisabled: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'LeagueSpartanSemiBold',
    },
    dimbackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    modalbackground: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.9,
        height: height * 0.6,
        backgroundColor: 'white',
        borderRadius: 50,
        elevation: 8,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderColor: COLORS.gray_6,
        borderWidth: 2,
    },
    crossClose: {
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 1, // Ensure the icon is displayed above the map
    },
    confirmLocationContainer: {
        backgroundColor: COLORS.blue,
        height: screenHeight * 0.06,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        marginTop: 16,
        width: screenWidth * 0.7,
    },
    confirmLocationLable: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'LeagueSpartanSemiBold',
    },
    emptybackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    successfulModal: {
        justifyContent: 'center',
        alignItems: 'center',
        width: height * 0.4,
        height: height * 0.5,
        backgroundColor: 'white',
        borderRadius: 35,
        elevation: 8,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderColor: COLORS.gray_6,
        borderWidth: 2,
    },
    successfulImageContainer: {
        padding: 16,
        alignItems: 'center',
        flexDirection: 'column',
    },
    successfulText: {
        fontSize: 18,
        fontFamily: 'LeagueSpartanSemiBold',
        textAlign: 'center',
        color: COLORS.primary,
        marginTop: 16,
    },
    cooperationRequestlabel: {
        color: COLORS.red,
        fontSize: 16,
        fontFamily: 'LeagueSpartanSemiBold',
        textAlign: 'center',
    },
});

export default styles;