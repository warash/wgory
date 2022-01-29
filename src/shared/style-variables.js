import Color from 'color';

const palette = {
    white: 'white',
    grey: 'grey',
    caribbeanGreen: '#00CE95',
    eastBay: '#464B75',
    waikawaGray: '#636DA3',
    contessa: '#C96E62',
    cloudBurst: '#26325C',
    wildBlueYonder: '#808ABA',
    kimberly: '#6C6FA1',
    mirage: '#192037'
};


export const backgroundPalette = [
    '#214d77',
    '#b3c8e7',
    '#aaa8b1',
    '#998e7b',
    '#c3ad46'
].map(c => Color(c).alpha(0.5));

const greyPalette = {
    lightest: '#c0c5ce',
    light: '#a7adba',
    regular: '#65737e',
    dark: '#4f5b66',
    darkest: Color('#343d46').darken(0.3).hex(),
};

const palette2 = {
    c1: '#4474BC',
    c2: '#5CC3AC',
    c3: '#ECEDED',
    grey: '#7F7F7F',
    green: '#75A8AB',
    white: 'white'
};

export const colors = {

    backgroundDark: Color(palette2.c1).darken(0.3).hex(),
    backgroundPrimary: palette2.white,
    backgroundLight: Color(palette2.c1).lighten(0.3).hex(),
    backgroundLightest: Color(palette2.c1).lighten(0.95).hex(),
    backgroundGreen: palette2.green,

    textLightest: greyPalette.lightest,
    textLight: greyPalette.light,
    textDark: greyPalette.dark,
    textRegular: greyPalette.regular,
    textDarkest: greyPalette.darkest,


    textHighlightedLight: Color(palette2.c2).lighten(0.2).hex(),
    textHighlightedDark: Color(palette2.c2).darken(0.2).hex(),

    buttonLight: palette.caribbeanGreen,
    buttonDark: palette.waikawaGray,
    buttonPrimary: palette2.c1,


    borderPrimary: greyPalette.light,

    highlight2: Color(palette2.c2).darken(0.1).hex(),
    highlight: Color(palette2.c2).darken(0.4).hex(),
    primaryLightest: palette.wildBlueYonder,
    primaryLighter: palette.waikawaGray,
    primary: palette.eastBay,
    primaryDarker: palette.cloudBurst,
    primaryDarkest: palette.mirage,

};


export const gutters = {

    margin: 20

};