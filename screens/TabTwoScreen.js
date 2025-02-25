import {ScrollView, StyleSheet} from "react-native";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {MonitoringAction} from "../redux/actions/monitoring.action";
import {useEffect, useRef} from "react";
import CardComponent from "../components/card/CardComponent";
import DateHelper, {DATE_FORMAT_CONSTANT} from "../helper/DateHelper";

export default function TabTwoScreen() {
  const dispatch = useAppDispatch();
  const monitoring = useAppSelector((state) => state.monitoring);
  const monitoringAction = new MonitoringAction();
  const intervalRef = useRef(null);
  const dateHelper = new DateHelper();

  useEffect(() => {
    // intervalRef.current = setInterval(() => {
      dispatch(monitoringAction.getListDateAvg()).then();
    // }, 60000);
  }, []);

  return (
      <ScrollView>
        {monitoring.listDateAvg && monitoring.listDateAvg.data.map((item, index) => (
            <CardComponent key={index} title={dateHelper.toFormatDate(item.date_time, DATE_FORMAT_CONSTANT.FULL_MONTH_DATE)} valueLeft={item.ph} valueRight={item.temperature}/>
        ))}
      </ScrollView>
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
