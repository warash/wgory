import React from 'react';
import { Span } from './components/text-components';
import { colors } from './style-variables';
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import images from '../../assets/images';
import { Button } from 'react-native-elements';
import { CircleCloseButton } from './components/CircleCloseButton';


const termsAndCondition = `
Kto będzie administratorem Twoich danych?

Administratorem Twoich danych będzie firma Imponderabilis Maja Sindalska z siedzibą przy ul. Halszki 37/2 w Krakowie. Twoje dane będą przetrzymywane w firmowej bazie danych. Nie przekazujemy danych użytkowników żadnym podmiotom trzecim poza wyjątkami, gdy jesteśmy do tego zobowiązani na podstawie przepisów prawa i wyłącznie w zakresie określonym tymi przepisami.
Twoje dane osobowe są przetwarzane zgodnie z umową oraz obowiązującymi przepisami prawa, w szczególności z RODO. Dane przechowujemy bezterminowo, jednak w każdej chwili możesz poprosić o ich usunięcie.
Zobowiązujemy się do ochrony Twoich danych osobowych i korzystania z nich zgodnie z obowiązującymi przepisami prawa. 

O jakich danych mówimy?

W naszej bazie danych będą przechowywane podstawowe informacje pobrane z publicznego profilu twojego Facebook'a w momencie rejestracji. Zapisujemy poniższe rekordy pobrane z Twojego profilu Facebook: 
imię
nazwisko
id
link do miniaturki zdjęcia profilowego.

Dlaczego chcemy przetwarzać Twoje dane?

Twoje dane służą do moderacji przesyłanych informacji oraz do podpisywania poprawnie autora zdjęcia. W trosce o jakość treści załączanych na naszym profilu wymagana jest rejestracja, do której potrzebujemy Twojego Facebook ID. Pozostałe informacje,które przechowujemy są wyświetlane w Serwisie i do tego służą. Zdjęcia wysyłane przez Ciebie będą widoczne publicznie dla innych użytkowników aplikacji, opisane przez następujące dane: koordynaty gps (pobrane ze zdjęcia lub wybrane przez ciebie), data wykonania zdjęcia, autor (nazwa twojego profilu Facebook oraz miniaturka zdjęcia profilowego), opis, który wprowadziłeś.

Gdzie Twoje dane będą używane?

Zdjęcia wraz z pełnym opisem mogą być przetwarzane we wszystkich aplikacjach portalu Aktualne Warunki w Górach, którego właścicielem jest firma Imponderabilis Maja Sindalska, czyli we wszystkich miejscach, gdzie pokazujemy aktualne warunki na szlakach górskich. W chwili obecnej są to: strona Facebook facebook.com/warunki, profil Instagram instagram.com/aktualne_warunki, www aktualnewarunki.pl, aplikacja mobilna „Aktualne warunki”.

Jakie masz prawa w stosunku do Twoich danych?

Masz prawo do żądania dostępu do danych, sprostowania , usunięcia lub ograniczenia ich przetwarzania. Możesz także wycofać zgodę na przetwarzanie danych osobowych. Wszystkie tego typu prośby proszę kierować na adres mobile@aktualnewarunki.pl.
W celu używania wszystkich funkcjonalności Serwisu niezbędna jest akceptacja przetwarzania Twoich danych osobowych wymienionych powyżej.  Dlatego też proszę zaznacz przycisk "Akceptuję", aby wyrazić na to zgodę. W razie otrzymania urzędowego zawiadomienia lub uzyskania wiarygodnej wiadomości o bezprawnym charakterze danych zamieszczanych w Serwisie przez jego użytkowników lub związanej z nimi działalności, Administrator niezwłocznie uniemożliwi dostęp do tych danych.

`;
export const PrivacyPolicy = (props) => {

    const { navigation } = props;
    const onAccept = navigation.getParam('onAccept');

    const acceptPolicy = () => {
        onAccept && onAccept();
        navigation.goBack();
    };
    const onClose = () => {
        navigation.goBack();
    };
    return (
        <View style={styles.container} source={images.primaryBackground}>

            <CircleCloseButton style={styles.closeButton} onPress={onClose}/>
            <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <Span style={styles.terms}>{termsAndCondition}</Span>
                </ScrollView>
            </View>

            {onAccept &&
            <Button containerViewStyle={styles.buttonStyle} backgroundColor={colors.buttonDark}
                    onPress={acceptPolicy}
                    title={'Akceptuję politykę prywatności'}/>}
        </View>
    )
};

const styles = StyleSheet.create({
    scrollView: {
        alignSelf: 'stretch',
        padding: 20,
    },
    buttonStyle: {
        width: '100%',
        marginLeft: 0,
        marginRight: 0,
        padding: 0
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
    terms: {
        fontSize: 12,
        color: colors.textDark
    }
});