import React, {useState} from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import {VictoryAxis, VictoryChart, VictoryLine, VictoryScatter, VictoryTheme, VictoryTooltip} from "victory-native";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {MonitoringAction} from "../redux/actions/monitoring.action";
import DateHelper from "../helper/DateHelper";
import {useEffect} from "react";

export default function TabOneScreen() {
  const dispatch = useAppDispatch();
  const monitoring = useAppSelector((state) => state.monitoring);
  const monitoringAction = new MonitoringAction();
  const dateHelper = new DateHelper();
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(monitoringAction.getListData()).then();
  }, []);

  useEffect(() => {
    if (monitoring.listData) {
      setData(monitoring.listData?.data)
    }
  }, [monitoring.listData]);

  return (
    <View style={styles.container}>
      <VictoryChart
          theme={VictoryTheme.clean}
          domainPadding={{ x: 10, y: 10 }}
      >
        <VictoryAxis
         tickFormat={(t) => dateHelper.toFormatDate(t, "HH:mm")}
         style={{
           tickLabels: {
             fontSize: 10,
             padding: 15,
             angle: -45,
             textAnchor: "end"
           },
         }}
        />
        <VictoryAxis
          dependentAxis
        />
        <VictoryLine
          data={data}
          x={"date_time"}
          y={"ph"}
          labels={({ datum }) => datum.ph}
        />
        <VictoryScatter
            data={data}
            x={"date_time"}
            y={"ph"}
            size={4}
        />
      </VictoryChart>
      <VictoryChart
          theme={VictoryTheme.clean}
          domainPadding={{ x: 10, y: 10 }}
      >
        <VictoryAxis
            tickFormat={(t) => dateHelper.toFormatDate(t, "HH:mm")}
            style={{
              tickLabels: {
                fontSize: 10,
                padding: 15,
                angle: -45,
                textAnchor: "end"
              },
            }}
        />
        <VictoryAxis
            dependentAxis
        />
        <VictoryLine
            data={data}
            x={"date_time"}
            y={"temperature"}
            labels={({ datum }) => datum.temperature}
        />
        <VictoryScatter
            data={data}
            x={"date_time"}
            y={"temperature"}
            size={4}
        />
      </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
