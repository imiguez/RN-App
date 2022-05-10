import { Dimensions } from "react-native";
import styled from "styled-components/native";

export const BasicContainer = styled.View`
    display: flex;
`

export const ContainerProfile = styled(BasicContainer)`
    width: ${ Dimensions.get("window").width +'px'};
    align-items: center;
    justify-content: center;
`