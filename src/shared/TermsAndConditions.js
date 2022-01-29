import React from 'react';
import { Span } from './components/text-components';
import { colors } from './style-variables';
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import images from '../../assets/images';
import { Button } from 'react-native-elements';
import { CircleCloseButton } from './components/CircleCloseButton';


const termsAndCondition = `
§ Postanowienia wstępne 

1. Niniejszy regulamin określa zasady korzystania serwisu Warunki w Górach służącego do dzielenia się zdjęciami przedstawiającymi aktualne warunki panujące na szlakach górskich.
2. Korzystanie z Serwisu oznacza zgodę na przestrzeganie postanowień niniejszego Regulaminu.
3. Administratorem Serwisu jest firma Imponderabilis Maja Sindalska.

§ Użytkownicy Serwisu

4. Użytkownicy Serwisu dzielą się na użytkowników anonimowych, którzy mogą jedynie przeglądać treści bez możliwości publikowania, oraz użytkowników zarejestrowanych (posiadających Profil zdefiniowany poniżej).

§ Podstawowe zasady działania i korzystania z Serwisu

5. Korzystanie z Serwisu jest nieodpłatne.
6. Korzystanie z Serwisu możliwe jest poprzez aplikację na urządzenia mobilne wykorzystujące systemy operacyjne iOS lub Android.
7. Zakazane jest korzystanie z Serwisu w sposób sprzeczny z obowiązującymi przepisami prawa oraz dobrymi obyczajami, a w szczególności dostarczanie i przesyłanie za pomocą Serwisu treści o charakterze bezprawnym (np. tzw. „spamu” lub materiałów naruszających prawa autorskie czy dobra osobiste osób trzecich). Zabronione jest wysyłanie treści o charakterze reklamowym, erotycznym oraz każdym innym niezwiązanym z warunkami w górach.
8. Użytkownik wysyłając zdjęcie do serwisu gwarantuje pełnię praw autorskich do niego oraz zgadza się na upublicznienie fotografii. Wgrywając zdjęcia użytkownik przekazuje prawa autorskie do nich Administratorowi, firmie Imponderabilis Maja Sindalska, właścicielowi portalu Aktualne Warunki w Górach. Podsyłane informacje mogą zostać wykorzystane we wszystkich serwisach i publikacjach Aktualne Warunki w Górach (Instagram, Facebook, www). Zawsze jednak podpisujemy autora.  

§ Wymogi przesyłanych danych

9. Najbardziej pożądane są informacje sprzed maksymalnie 2-3 dni. Starsze niestety nie są już aktualne z bardzo dużym prawdopodobieństwem. Najcenniejsze informacje to te wysyłane jeszcze podczas trwania wycieczki i w tym samym dniu po niej. Prosimy Was o podanie w opisie wszystkich istotnych danych, które przydadzą się kolejnym osobom do planowania wyprawy i umożliwią im zabranie wszelkiego niezbędnego sprzętu. Przede wszystkim nie zapomnijcie o podaniu daty. Bardziej cenna jest informacja “szlak zalodzony, raczki bardzo przydatne” niż “świeciło słońce i nie wiało”, gdyż wiadomo - pogoda rzecz ulotna, a już jakość śniegu zmienia się nie tak prędko jak przemykający po niebie obłoczek. Jeśli dacie radę się zmusić - używajcie polskich znaków, interpunkcji i wielkich liter w nazwach własnych. Zakazane jest wprowadzanie do Serwisu danych niezgodnych z rzeczywistością, nieaktualnych, starszych niż 7 dni.
10. W opisie należy podać:
- pasmo górskie, w którym wędrujemy
- nazwę szczytu, przełęczy, doliny, gdzie znajduje się aktualnie autor zdjęcia i skąd podaje informacje
- opis – tu podajemy panujące warunki na szlaku, informacje o zamknięciach schronisk, remontach, utrudnieniach, przeszkodach.  Można też właśnie tu podać cel wycieczki - datę – prawdziwą - lokalizację – jeśli dostępny jest odczyt  z gpsa, aplikacja powinna wykorzystać go i użyć do lokalizacji zdjęcia na mapie. Jeśli odczyt nie jest dostępny, należy z jak największą dokładnością wskazać miejsce na mapie.
11. Podsyłajcie maksymalnie 4 zdjęcia z danego regionu, najlepiej ze strategicznych miejsc. W Serwisie nie da się jeszcze wgrywać filmików. Najistotniejsze są zdjęcia, na których widać szlak/jakość i głębokość śniegu/lód/zwalone drzewa/etc. Widoczki każdy oczywiście lubi, cieszą i nasze oko, ale prosimy: 1-2 widoczki, 2-4 zdjęcia warunków na szlaku. Jeśli dacie radę - obróćcie zdjęcia do prawidłowej pozycji.
12. Jeśli informacja ma być podpisana tak samo jak nazywa się na Facebooku jej autor - nie musicie nic dodawać. Jednak - jeśli autorem jest blog/strona, koniecznie dodajcie pod opisem warunków tego typu linijkę: “Info: Człowiek Gór” Jeśli jest to strona/blog i chcielibyście, abyśmy podlinkowali nazwę, koniecznie podeślijcie nam całego urla do strony/bloga, żebyśmy to dobrze zrobili. Jeśli posiadacie konto instagramowe, koniecznie podeślijcie też login z Instagrama „Info: insta@login”. Wtedy na Instagramie podlinkujemy Wasz profil. W tej chwili nie ma możliwości podsyłania informacji anonimowo.
13. Administrator zastrzega sobie prawo do korekty opisów z zachowaniem ich merytoryki.

§ Informacje dodatkowe

14. W celu skorzystania z dodatkowych funkcji Serwisu, konieczna jest stworzenie Profilu poprzez rejestrację przy pomocy serwisu Facebook z udostępnieniem podstawowych danych dostępnych dla profilu w serwisie Facebook (imię, nazwisko, id profilu Facebook, link do miniaturki zdjęcia profilowego). Pozwala nam to na weryfikację i moderację treści.
15. Dane podawane w formularzach są publikowane w Serwisie i dostępne dla wszystkich użytkowników. Zdjęcie opublikowanie w naszym serwisie będzie publicznie widoczne dla wszystkich użytkowników wraz z informacjami takimi jak data wykonania zdjęcia, data wysłania zdjęcia do serwisu, imię oraz nazwisko osoby publikującej (z Facebooka), miniaturka zdjęcia osoby publikującej (z Facebooka)
16. Zarejestrowany użytkownik odpowiada za działania wykonane za pomocą jego Profilu oraz jest w pełni odpowiedzialny za treści publikowane przez niego.
17. Użytkownicy mogą usuwać dodane przez siebie zdjęcia.
18. Administrator serwisu zastrzega sobie prawo do usuwania zdjęć niezgodnych z regułami Serwisu, a także do banowania użytkowników łamiących regulamin Serwisu.
19. Administrator zastrzega sobie prawo do publikacji reklam w Serwisie.
20. Aplikacja została stworzona w celach rozrywkowych, chałupniczo, wierzymy, że może posiadać błędy. Istnieje możliwość zgłoszenia usterki mailowo poprzez menu „Zaproponuj usprawnienie”.
21. Administrator nie gwarantuje ciągłości działania aplikacji oraz jej bezbłędności, zastrzega również prawo do usunięcia aplikacji.
22. Regulamin może ulec zmianie wraz z rozwojem aplikacji.
23. Wszelkie kwestie nieporuszone w regulaminie rozwiązuje Administrator Serwisu.

`;
export const TermsAndCondition = (props) => {
    const { navigation } = props;
    const onAccept = navigation.getParam('onAccept');

    const acceptCondition = () => {
        onAccept && onAccept();
        navigation.goBack();
    };
    const onClose = () => {
        navigation.goBack();
    };
    return (
        <View style={styles.container} source={images.primaryBackground}>

            <CircleCloseButton style={styles.closeButton} onPress={onClose}/>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Span style={styles.terms}>{termsAndCondition}</Span>
            </ScrollView>
            {onAccept && <Button containerViewStyle={styles.buttonStyle} backgroundColor={colors.buttonDark}
                                 onPress={acceptCondition} title={'Akceptuje warunki'}/>}
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