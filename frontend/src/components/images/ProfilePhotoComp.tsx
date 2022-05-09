import { FC, ReactNode } from "react";
import { ImageProps } from "react-native";
import {ImgProps, BigProfilePhoto} from '../../styles/Images'



export const ProfilePhotoComp: FC<ImgProps> = (props: ImgProps) => {


    return <BigProfilePhoto {...props}/>
}

