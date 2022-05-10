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
    width: ${ props => props.style ? props.style.width + "px" : "40px"};
    height: ${ props => props.style ? props.style.height + 'px' : "40px"};
    border-radius: ${ props => props.style ? props.style.width + 'px' : "20px"}
`

export const BigProfilePhoto = styled(ProfilePhoto)`
    margin-top: ${ props => ((props.style.height / 2)* -1) + "px"};
    border: 2px solid white;
`
// margin-left: ${ props => ((Dimensions.get('window').width / 2) - (props.style.height / 2)) + "px" };


export const ProfileCoverPhoto = styled.ImageBackground<ImgBgProps>`
    border-bottom-color: white;
    border-bottom-width: 2px;
`