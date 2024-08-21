import React, {Component, PureComponent, createRef} from 'react';
import * as Util from '../../services';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  BackHandler,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
// import {styles} from './styles';
import {APPLICATION_CONSTANTS, COLORS, showToast} from '../../services';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import {MeButton} from '../../../components/MeButton';
import * as TASKS from '../../store/actions/index';
import {WebView} from 'react-native-webview';

// import OneSignal from 'react-native-onesignal'; // Import package from node modules
import {MeHeader} from '../MeHeader';
import MeBottomNavbar from '../BottomNavbar';
// let playerId = '';
// let deviceToken = '';
class CarousalLink extends PureComponent {
  constructor(props) {
    super(props);
  }

  webViewRef = React.createRef(null);

  onAndroidBackpress() {
    if (this.webViewRef.current) {
      // this.webViewRef.current.goBack();
      // this.props.navigation.navigate('Home');
      return true;
    }
    return false;
  }

  render() {
    // const {phone_number, password} = this.state;
    const params = this.props.route.params.params;
    const {user} = this.props;
    return (
      <>
        <MeHeader
          showProfilePic={true}
          title={'Undefeated.Live'}
          hideBackBtn={true}
          profilePicUrl={user ? user.profile_image_url : null}
          showNotficaion={false}
          showAboutUs={true}
          showlogo={true}
          onAboutInfo={() => {
            this.props.navigation.navigate('AboutUs');
          }}
          onNotificationPress={() => {
            this.props.navigation.navigate('PendingBets');
          }}
        />
        <WebView
          ref={this.webViewRef}
          startInLoadingState={true}
          source={{uri: params.link}}
          renderLoading={() => {
            return Util.ShowActivityIndicator();
          }}
          allowsBackForwardNavigationGestures
          onTouchStart={e => {
            if (Platform.OS === 'android') {
              this.touchX = e.nativeEvent.pageX;
              this.touchY = e.nativeEvent.pageY;
            } else {
              return null;
            }
          }}
          onTouchEnd={e => {
            if (
              Platform.OS === 'android' &&
              this.touchX - e.nativeEvent.pageX < -20
            ) {
              if (
                this.touchY - e.nativeEvent.pageY > -20 &&
                this.touchY - e.nativeEvent.pageY < 20
              ) {
                this.onAndroidBackpress();
              }
            } else {
              return null;
            }
          }}
        />
        {user && user.role === APPLICATION_CONSTANTS.USER_ADMIN ? null : (
          <MeBottomNavbar />
        )}
        {/* {params?.showAcceptDecline ? (
          <View style={styles.buttonContainer}>
            <MeButton onPress={this.navigatePrivacyPolicy} title="Accept" />
            <MeButton
              containerStyles={styles.declineButton}
              onPress={this.navigateLogin}
              title="Decline"
            />
          </View>
        ) : null} */}
      </>
    );
  }
}

mapStateToProps = state => {
  return {
    user: state.auth.user,
    lumper: state.ui.isLoading,
  };
};
mapDispatchToProps = dispatch => {
  return {
    loginUser: params => dispatch(TASKS.loginUser(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CarousalLink);
