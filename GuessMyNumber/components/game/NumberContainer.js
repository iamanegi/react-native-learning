import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/colors";

export default function NumberContainer({children}) {
    return <View style={styles.container}>
        <Text style={styles.numberText}>{children}</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        borderWidth:4,
        borderColor: Colors.accent500,
        padding: 24,
        margin: 24,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center"
    },
    numberText: {
        color: Colors.accent500,
        fontSize: 36,
        fontFamily: "poppins-bold"
    }
})