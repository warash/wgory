import React from 'react';
import { View } from 'react-native';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';


export class Register extends React.Component {
    render() {
        const { navigation } = this.props;
        return (<View>
            <Card title="SIGN UP">
                <FormLabel>Email</FormLabel>
                <FormInput placeholder="Email address..."/>
                <FormLabel>Password</FormLabel>
                <FormInput secureTextEntry placeholder="Password..."/>
                <FormLabel>Confirm Password</FormLabel>
                <FormInput secureTextEntry placeholder="Confirm Password..."/>

                <Button
                    buttonStyle={{ marginTop: 20 }}
                    backgroundColor="#03A9F4"
                    title="SIGN UP"
                    onPress={() => {
                    }}
                />
                <Button
                    buttonStyle={{ marginTop: 20 }}
                    backgroundColor="transparent"
                    textStyle={{ color: '#bcbec1' }}
                    title="Sign In"
                    onPress={() => navigation.navigate('Login')}
                />
            </Card>
        </View>)
    }
}