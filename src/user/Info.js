import React from 'react';
import { ImageBackground, Linking, ScrollView, StyleSheet, View } from 'react-native';
import images from '../../assets/images';
import { Span } from '../shared/components/text-components';
import { colors } from '../shared/style-variables';
import { CircleCloseButton } from '../shared/components/CircleCloseButton';
import Button from '../shared/components/Button';


const message =
    `
    Autorem Serwisu jest Michał Majewski, programista  z wieloletnim doświadczeniem. Poznanie się z Michałem właścicielki strony Aktualne Warunki w Górach, jak to u kreatywnych osób bywa, przerodziło się szybko w zawodową współpracę i w kilka miesięcy, „po godzinach”, powstała ta oto aplikacja. Michał jest odpowiedzialny praktycznie za wszystko poza samym pomysłem i tekstami, stworzył zarówno front-end jak i back-end oraz projekt graficzny, zajmował się również kwestiami administracyjnymi.
    Jeśli jesteś zainteresowany podobną aplikacją, ale dostosowaną do Twojego biznesu, lub posiadasz pomysł/kontakty i poszukujesz wykonawcy-wspólnika, koniecznie zgłoś się do Michała, na pewno uda Wam się nawiązać współpracę:
    
majewski9@yandex.com`;

export const Info = (props) => {
    const { navigation } = props;

    const onContact = () => {
        Linking.openURL('majewski9@yandex.com?subject=kontakt')
    };
    const onClose = () => {
        navigation.goBack();
    };
    return (
        <View style={styles.container} source={images.primaryBackground}>
            <CircleCloseButton style={styles.closeButton} onPress={onClose}/>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Span style={styles.title}>{message}</Span>


            </ScrollView>
            <Button
                backgroundColor={colors.buttonDark}
                buttonStyle={[styles.buttonStyle]}
                title="Skontaktuj się"
                onPress={onContact}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    scrollView: {

        alignSelf: 'stretch',
        padding: 20,
        paddingTop: 30
    },
    closeButton: {
        position: 'absolute',
        zIndex: 2,
        top: 20,
        right: 20,
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 14,
        color: colors.textDark
    }
});