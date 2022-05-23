import styled from "styled-components/native";

const fonts = {
    header: "20px",
    normal: "12px",
    big: "18px",
    small: "8px"
}

export const BasicText = styled.Text`
    color: ${ props => props.theme.colors.text };
    margin: 0px;
    padding: 0px;
`

export const UserName = styled(BasicText)`
    font-weight: bold;
    font-size: ${fonts.big};
`

export const UserNamesList = styled(BasicText)`
    font-size: ${fonts.normal};
    padding-left: 10px;
    textAlignVertical: center;
`
// max-width: 200px;