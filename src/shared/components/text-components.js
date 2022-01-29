import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../style-variables';


export const H1 = styled.Text`
        fontFamily: 'Poppins';
        fontSize: 13;
        color: ${colors.textDarkest};
`;

export const Span = styled.Text`
     fontFamily: 'Poppins';
        fontSize: 12;
        color: ${colors.textDark};
    `;


export const SmallSpan = styled.Text`
        fontFamily: 'Poppins';
        fontSize: 11;
        color: ${colors.textLight};
    `;