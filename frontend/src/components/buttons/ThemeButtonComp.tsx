import React, { FC } from "react"
import { Text } from "react-native";
import { LateralMenuContext } from "../../hooks/LateralMenuContext"
import { ThemeButton } from "../../styles/Buttons";


export const ThemeButtonComp: FC = props => {

    

    return (
        <LateralMenuContext.Consumer>{({HandleTheme}) => (
            <ThemeButton onPress={HandleTheme}><Text>Theme</Text></ThemeButton>
        )}
        </LateralMenuContext.Consumer>
    );
}