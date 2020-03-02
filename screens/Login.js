import React, { Component } from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { Input, Button } from "react-native-elements";
import FormData from "form-data";
import { CookieJar } from "tough-cookie";
import got from "got";

const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    flex: 1
  },
  containerStyle: {
    paddingVertical: 10,
    paddingHorizontal: 50
  },
  title: {
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 24
  }
});

export default class Login extends Component {

  static navigationOptions = {
    title: 'LOGIN'
  }

  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: '',
        userId: '',
        token: '',
        error: ''
    }
  }

  _usernameChanged = (username) => {
    this.setState({ username });
  }

  _passwordChanges = (password) => {
    this.setState({ password });
  }

  _userIdChanged = (userId) => {
    this.setState({ userId });
  }

  _tokenChanged = (token) => {
    this.setState({ token });
  }

  _onButtonPress = () => {
    const { username, password } = this.state;
    const sb = new SendBird({ 'appId': '2515BDA8-9D3A-47CF-9325-330BC37ADA13' });
    const form = new FormData();

    form.append("user", username);
    form.append("passwd", password);
    form.append("api_type", "json");

    got.post({
      body: form,
      url: "https://ssl.reddit.com/api/login"
    }).then(res => {
      const cookieJar = new CookieJar();
      cookieJar.setCookieSync("reddit_session=" + encodeURIComponent(JSON.parse(res.body).json.data.cookie), "https://s.reddit.com");

      got({
        cookieJar,
        method: "get",
        url: "https://s.reddit.com/api/v1/sendbird/me"
      }).then(sbRes => {
        const sbInfo = JSON.parse(sbRes.body);

        const reddit = new Snoowrap(Object.assign(config.credentials, {
          userAgent: `Snooful v${version}`,
        }));
      })
    })

    sb.connect(userId, token, (user, error) => {
      if (error) {
        this.setState({ error });
      }
    });
  }


  render() {
    return (
      <KeyboardAvoidingView style={styles.root} behavior="padding">
        <View style={styles.containerStyle}>
          <Text style={styles.title}>Login to Reddit</Text>
        </View>
        <View style={styles.containerStyle}>
          <Input textContentType="username" autoCompleteType="username"
            label={'Username'} />
        </View>
        <View style={styles.containerStyle}>
          <Input textContentType="password" autoCompleteType="password" secureTextEntry={true}
            label={'Password'} />
        </View>
        <View style={styles.containerStyle}>
          <Button
            buttonStyle={{backgroundColor: '#2096f3'}}
            title='Connect'
          />
        </View>
      </KeyboardAvoidingView>
    )
  }
}