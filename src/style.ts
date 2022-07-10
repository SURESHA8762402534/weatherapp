import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: '100%',
        paddingTop: '20px'
    },

    container1: {
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: '100%'
    },

    container2: {
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: '100%'
    },

    input: {
        width: "100%",
        height: "30px",
        borderColor: "gray",
        margin: "20px",
        backgroundColor: "white",
        borderRadius: 8,
    },
    border: {
        width: "80%",
        border: "1px solid blue",
        borderRadius: 10,
        boxShadow: "0 10px 0 0 solid gray",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    heading: {
        fontSize: 24,
        color: "Blue",
        fontWeight: "700",
        display: "flex",
        justifyContent: "center",
    },
    card: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "auto",
        backgroundColor: "white",
        padding: "20px",
        borderRadius: 10,
        marginBottom: '20px'
    },

    card1: {
        display: "flex",
        flexDirection: "row",
        marginTop: '150px',
        marginLeft: '5%',
        marginRight: '5%',
        width: "90%",
        height: "auto",
        backgroundColor: "white",
        padding: "20px",
        borderRadius: 20,
        marginBottom: '20px',
        border: '1px solid lightblue',
    },
    back: {
        width: '100%',
        display: "flex",
        justifyContent: "flex-start",
        marginTop: '40px'
    },
    btn: {
        width: '30%',
        margin: '10px',
        borderRadius: 10
    }, btn1: {
        width: '30%',
        margin: '10px',
        borderRadius: 20
    }
});
