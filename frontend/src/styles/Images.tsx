import { ReactNode } from "react";
import styled from "styled-components/native";
import { Dimensions, ImageBackgroundProps, ImageProps } from "react-native";

export interface ImgProps extends ImageProps {
    children?: ReactNode,
    style: {
        width: number,
        height: number
    }
}

interface ImgBgProps extends ImageBackgroundProps {
    children?: ReactNode,
    style: {
        width: number,
        height: number
    }
}

export const ProfilePhoto = styled.Image<ImgProps>`
    width: ${ props => props.style ? props.style.width + '' : "40px"};
    height: ${ props => props.style ? props.style.height + '' : "40px"};
    border-radius: ${ props => props.style ? props.style.width + '' : "20px"}
`

export const BigProfilePhoto = styled(ProfilePhoto)`
    margin-top: ${ props => (props.style.height / 2)* -1 };
    margin-left: ${ props => (Dimensions.get('window').width / 2) - (props.style.height / 2) };
    border: 2px solid white;
`


export const ProfileCoverPhoto = styled.ImageBackground<ImgBgProps>`
    border-bottom-color: white;
    border-bottom-width: 2px;
`