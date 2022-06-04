import styled from "styled-components/native";
import { width } from "./Utils";

const fonts = {
    header: "20px",
    normal: "12px",
    big: "16px",
    bigger: "18px",
    small: "8px"
}

export const BasicText = styled.Text`
    color: ${ props => props.theme.colors.text };
    margin: 0px;
    padding: 0px;
`
export const UserName = styled(BasicText)`
    font-weight: bold;
    font-size: ${fonts.bigger};
`
export const UserNamesList = styled(BasicText)`
    font-size: ${fonts.big};
    padding: 10px;
    textAlignVertical: center;
    font-weight: bold;
`
export const PostText = styled(BasicText)`
    width: ${ (width)-64 }px;
    margin: 10px 32px
`