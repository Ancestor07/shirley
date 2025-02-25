// components/CardComponent.js
import React from 'react';
import { Text, View } from 'react-native';
import {styles} from "./CardStyles";

export default function CardComponent( props : IProps) {
    return (
        <View style={styles.card} key={props.key}>
            <Text style={styles.title}>{props.title}</Text>
            <View style={styles.valuesContainer}>
                <Text style={styles.value}>{props.valueLeft}</Text>
                <Text style={styles.value}>{props.valueRight}</Text>
            </View>
        </View>
    );
}

interface IProps {
    key: number;
    title: string;
    valueRight: any;
    valueLeft: any;
}