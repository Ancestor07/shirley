// components/CardComponent.js
import React from 'react';
import { Text, View } from 'react-native';
import {styles} from "./CardStyles";

export default function CardComponent( props : IProps) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{props.title}</Text>
            <View style={styles.valuesContainer}>
                <View style={styles.subContainer}>
                    <Text style={styles.valueTitle}>{props.titleLeft}</Text>
                    <Text style={styles.value}>{props.valueLeft}</Text>
                </View>
                <View style={styles.subContainer}>
                    <Text style={styles.valueTitle}>{props.titleRight}</Text>
                    <Text style={styles.value}>{props.valueRight}</Text>
                </View>
            </View>
        </View>
    );
}

interface IProps {
    title: string;
    valueRight: any;
    valueLeft: any;
    titleRight: string;
    titleLeft: string;
}