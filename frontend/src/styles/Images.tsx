import { ReactNode } from "react";
import styled from "styled-components/native";
import { Dimensions, ImageBackgroundProps, ImageProps } from "react-native";
import { width } from "./Utils";

export interface ImgProps extends ImageProps {
    children?: ReactNode,
    style?: {
        width: number,
        height: number
    }
}

interface ImgBgProps extends ImageBackgroundProps {
    children?: ReactNode,
    style?: {
        width: number | undefined,
        height: number | undefined
    }
}

export const BasicImage = styled.Image<ImgProps>`
    margin: 0px;
    padding: 0px;
`
export const ProfilePhoto = styled(BasicImage)`
    width: ${ props => props.style ? props.style.width + "px" : "40px"};
    height: ${ props => props.style ? props.style.height + 'px' : "40px"};
    border-radius: ${ props => props.style ? props.style.width + 'px' : "20px"}
`
export const ProfileCoverPhoto = styled.ImageBackground<ImgBgProps>`
    border-color: white;
    border-bottom-width: 2px;
`
export const BigProfilePhoto = styled(ProfilePhoto)`
    margin-top: ${ props => props.style ? ((props.style.height / 2)* -1) + "px" : "0px"};
    border-color: white;
    border-bottom-width: 2px;
    background-color: white;
`
export const PostImage = styled(BasicImage)`
    margin: 0 32px 32px 32px;
`