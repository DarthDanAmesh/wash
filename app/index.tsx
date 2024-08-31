//import { Text, View, StyleSheet, TouchableHighlight } from "react-native";
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {StyleSheet, View, TouchableHighlight} from "react-native";
import {Picker} from '@react-native-picker/picker';
import {
    Text,
    ListItem,
    Avatar,
    Icon,
    Badge,
    ListItemProps,
    Image,
    Button,
    Switch,
    Card,
    lightColors
} from '@rneui/themed';

export default function Index() {
    const [country, setCountry] = useState('');
    const [data, setData] = useState(null);
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all', {
            "method": "GET",
        })
            .then(response => response.json())
            .then(response => {
                const countryNames = response.map(country => country.name.common);
                countryNames.sort();
                setCountries(countryNames);
            })
            .catch(error => console.error(error));
    }, []);

    const fetchCountry = () => {
        fetch('https://restcountries.com/v3.1/name/' + country, {
            "method": "GET",
        })
            .then(response => response.json())
            .then(response => {
                setData(response[0]);
            })
            .catch(error => console.error(error));
    }

    return (
        <View style={styles.container}>
            <View>
                <Card><Text style={{fontWeight: 'bold'}}>Select Country:</Text>
                    <Picker
                        selectedValue={country}
                        style={{height: 50, width: 200}}
                        onValueChange={(itemValue, itemIndex) => setCountry(itemValue)}
                    >
                        <Picker.Item label="Select a country" value="" />
                        {countries.map((country, index) => (
                            <Picker.Item label={country} value={country} key={index} />
                        ))}
                    </Picker>
                    <TouchableHighlight onPress={fetchCountry}>
                        <View style={styles.button}>
                            <Text style={styles.text}>Search</Text>
                        </View>
                    </TouchableHighlight>
                </Card>
            </View>

            {data && (
                <View>
                    <Card containerStyle={{}} wrapperStyle={{}}>
                        <Card.Title>Select Country</Card.Title>
                        <Card.Divider />
                        <View style={styles.flagContainer}>
                            {Object.values(data.flags).filter(flag => flag.endsWith('.png')).map((flag, index) => (
                                <Card.Image
                                    style={styles.tinyLogo}
                                    source={{ uri: flag }}
                                    key={index}
                                />
                            ))}
                            <View>
                                <Text style={styles.column}>County: {country}</Text>
                                <Text style={styles.column}>Capital: {data.capital}</Text>
                            </View>
                        </View>

                        <Card.Title>Demographics</Card.Title>
                        <Card.Divider />
                                <Text style={styles.row}>Population: {data.population}</Text>
                                <Text style={styles.row}>Area: {data.area} km²</Text>
                                <Text style={styles.row}>Languages:</Text>
                                {Object.values(data.languages).map((language, index) => (
                                    <View style={styles.row} key={index}><Text>{language}</Text></View>
                                ))}
                                <Text style={styles.row}>Currency:</Text>
                                {Object.values(data.currencies).map((currency, index) => (
                                    <Text key={index}>{currency.name} ({currency.symbol})</Text>
                                ))}



                    </Card>
                    <Card>
                        <View>
                            <Button
                                icon={
                                    <Icon
                                        name="code"
                                        color="#ffffff"
                                        iconStyle={{ marginRight: 10 }}
                                    />
                                }
                                buttonStyle={{
                                    borderRadius: 0,
                                    marginLeft: 0,
                                    marginRight: 0,
                                    marginBottom: 0,
                                }}
                                title="WASH PROJECTS"
                            />
                        </View>
                    </Card>


                </View>
            )}
            <StatusBar style="auto" />

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    list: {
        marginTop: 20,
        borderTopWidth: 1,
        borderColor: lightColors.greyOutline,
    },
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5,
    },
    ratingImage: {
        height: 19.21,
        width: 100,
    },
    ratingText: {
        paddingLeft: 10,
        color: 'grey',
    },
    flagContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
    },
    row:{
        padding: 4,
        borderBottomColor: 'grey',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    column: {
        flex: 1,
        textAlign: 'left',
    },
    text:{
        padding: 4,
        borderBottomColor: 'grey',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
    },
    tinyLogo: {
        width: 50,
        height: 50,
        margin: 5,
    },
});


