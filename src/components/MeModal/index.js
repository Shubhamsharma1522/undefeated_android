//import liraries
import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Dimensions,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import {APPLICATION_IMAGES, COLORS, WP, FONTS, navigate} from '../../services';
import {MeButton} from '../../components/MeButton';
import {useDispatch} from 'react-redux';
import {reportUser} from '../../store/actions/story';
import {MeInputField} from '../MeInputField';
import {Platform} from 'react-native';


const MeModal = props => {
  console.log('showing props here is', props);
  const [showReportAlert, setShowReportAlert] = useState(false);
  const [reportingError, setReportingError] = useState(false);
  const [reportingMessage, setReportingMessage] = useState('');
  const dispatch = useDispatch();

  const onReportUser = () => {
    setShowReportAlert(true);
    // dispatch(reportUser(props.member));

    // props.onClosePress();
  };

  const onCloseModal = () => {
    setReportingMessage('');
    setShowReportAlert(false);
    setReportingError(false);
    props.onClosePress();
  };

  const removeMember = e => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e);
    props.removeMember(props.member);
  };

  return (
    <View>
      <KeyboardAvoidingView
        // eslint-disable-next-line react-native/no-inline-styles
        // style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}
        style={{
          // flex: 1,
          // flexDirection: 'column',
          justifyContent: 'center',
          zIndex: 999999,
          // height: Dimensions.get('window').height,
        }}
        // style={styles.detailsContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        enabled
        keyboardVerticalOffset={Platform.OS === 'ios' ? 200 : 10}>
        <Modal
          isVisible={props.isVisible}
          onBackdropPress={props.onBackdropPress}
          style={{display: 'flex', justifyContent: 'center'}}>
          <View style={styles.Modal}>
            <TouchableOpacity
              style={styles.closeContainer}
              onPress={onCloseModal}>
              <Image
                source={APPLICATION_IMAGES.closeModal}
                style={styles.close}
              />
            </TouchableOpacity>
            {showReportAlert ? (
              // <ScrollView>
              <View style={styles.detailsContainer}>
                <Text
                  allowFontScaling={false}
                  style={styles.title}
                  numberOfLines={1}
                  ellipsizeMode={'tail'}>
                  Why are you reporting this user?
                </Text>
                <MeInputField
                  placeholder={'Write a reason'}
                  value={reportingMessage}
                  onChangeText={text => setReportingMessage(text)}
                />
                {reportingError && <Text>This field is required</Text>}
                <MeButton
                  title={'Report User'}
                  containerStyles={styles.btnContainer}
                  textStyles={styles.buttonTitle}
                  onPress={() => {
                    if (reportingMessage === '') {
                      setReportingError(true);
                    } else {
                      console.log('REPORT>>', props);
                      dispatch(
                        reportUser({
                          ...props.member,
                          reporterReason: reportingMessage,
                        }),
                      );
                      onCloseModal();
                    }

                    // onReportUser();
                  }}
                />
              </View>
            ) : (
              // </ScrollView>
              // </KeyboardAvoidingView>
              <View>
                <Image
                  source={
                    props?.member?.profile_image
                      ? {uri: props?.member?.profile_image}
                      : {uri: APPLICATION_IMAGES.profilePicPlaceHolder}
                  }
                  style={styles.image}
                />
                <View style={styles.detailsContainer}>
                  <Text
                    allowFontScaling={false}
                    style={styles.title}
                    numberOfLines={1}
                    ellipsizeMode={'tail'}>
                    {props.member.username}
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={styles.details}
                    numberOfLines={4}
                    ellipsizeMode={'tail'}>
                    Member
                  </Text>
                </View>
                {props.type && props.type === 'remove' ? (
                  <View style={styles.buttonContainer}>
                    <MeButton
                      title={'Remove'}
                      containerStyles={styles.btnContainer}
                      textStyles={styles.buttonTitle}
                      onPress={removeMember}
                      lumper={props.loading}
                    />
                    <MeButton
                      title={'Cancel'}
                      containerStyles={styles.btnContainer}
                      textStyles={styles.buttonTitle}
                      onPress={props.onClosePress}
                    />
                  </View>
                ) : (
                  <View style={styles.buttonContainer}>
                    {/* {!props.reportUserOnly && (
                    <MeButton
                      title={
                        props.isLeaderBoard
                          ? 'Send Message'
                          : props.isWatchParty
                          ? 'Chat'
                          : null
                      }
                      containerStyles={styles.btnContainer}
                      textStyles={styles.buttonTitle}
                      onPress={
                        props.isLeaderBoard
                          ? props.onMessageBtnPressed
                          : props.isWatchParty
                          ? props.onRedirectToMessage
                          : null
                      }
                    />
                  )} */}
                    <MeButton
                      title={'View profile'}
                      containerStyles={styles.btnContainer}
                      textStyles={styles.buttonTitle}
                      onPress={() => {
                        onCloseModal();
                        navigate('Settings', {
                          userId: props?.member?.userId,
                        });
                      }}
                    />
                    <MeButton
                      title={'Report User'}
                      containerStyles={styles.btnContainer}
                      textStyles={styles.buttonTitle}
                      onPress={() => {
                        onReportUser();
                      }}
                    />
                  </View>
                )}
              </View>
            )}
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  Modal: {
    display: 'flex',
    height: WP('60'),
    backgroundColor: COLORS.white,
    borderRadius: WP('5'),
    position: 'relative',
  },
  image: {
    position: 'absolute',
    height: WP('25'),
    width: WP('25'),
    borderRadius: 100,
    alignSelf: 'center',
    top: WP('-12'),
  },
  btnContainer: {
    height: WP('12'),
    width: WP('75'),
    borderRadius: 100,
    marginTop: WP('3'),
  },
  btnText: {
    fontWeight: '100',
    fontSize: WP('4'),
  },
  close: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  closeContainer: {
    position: 'absolute',
    top: WP('5'),
    left: WP('5'),
    height: WP('5'),
    width: WP('5'),
  },
  detailsContainer: {
    position: 'absolute',
    top: WP('14'),
    alignSelf: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    top: WP('25'),
    alignSelf: 'center',
  },
  title: {
    color: COLORS.appColour,
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('4'),
    fontFamily: FONTS.appFont,
    width: WP('80'),
    textAlign: 'center',
  },
  buttonTitle: {
    color: COLORS.white,
    fontSize: WP('3.5'),
    fontFamily: FONTS.appFont,
  },
  details: {
    color: COLORS.grey,
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    fontSize: WP('4'),
    fontFamily: FONTS.appFont,
    width: WP('80'),
    textAlign: 'center',
  },
});

//make this component available to the app
export default MeModal;
