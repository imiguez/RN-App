import styled from "styled-components/native";



export const ThemeButton = styled.TouchableOpacity`
    width: 80px;
    height: 30px;
    background-color: ${ props => props.theme.colors.hardContrast };
    color: ${ props => props.theme.colors.text };
`

export const UserListedButton = styled.TouchableOpacity`
    flex-direction: row;
`