import styled from "styled-components/native";
import { width } from "./Utils";



export const BasicContainer = styled.View`
    display: flex;
`

export const ContainerProfile = styled(BasicContainer)`
    width: ${ width +'px'};
    align-items: center;
    justify-content: center;
`

export const InLineUserContainer = styled(BasicContainer)`
    flex-direction: row;
    border-radius: 4px;
    border-bottom-color: ${ props => props.theme.colors.border };
    border-bottom-width: 1px;
    background-color: ${ props => props.theme.colors.softContrast };
    padding: 10px;
`
export const PostContainer = styled(BasicContainer)`
    width: ${ width +'px'};
    flex-direction: column;
    border-bottom-color: ${ props => props.theme.colors.border };
    border-bottom-width: 1px;
`
    // background-color: ${ props => props.theme.colors.softContrast };
    // margin: 15px ${ width/100*5 +'px'};