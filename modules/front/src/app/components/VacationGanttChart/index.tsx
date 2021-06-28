import * as React from 'react';

import {observer} from "mobx-react";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4lang_ru_RU from "@amcharts/amcharts4/lang/ru_RU";
import {getCubaREST} from "@cuba-platform/react";
import {observable} from "mobx";

export type GanttChartVacationScheduleData = {
  personGroupId: string;
  personFullName: string;
  startDate: string;
  endDate: string;
  absenceType: string;
  colorIndex: number;
  brighten: number;
}

export type Props = {
  starDate: string,
  endDate: string,
}

@observer
export class VacationGanttChart extends React.Component<Props> {

  gantData: Array<GanttChartVacationScheduleData> = [];

  @observable
  maxSize = 0;

  render() {
    return (
      <div id="chartdiv" style={{width: '100%', height: (this.maxSize + 2) * 60}}></div>
    )
  }

  componentDidMount() {
    (async () => {
      await this.getGanttChartData(this.props.starDate, this.props.endDate);

      this.drowChart();
    })()
  }

  getGanttChartData = async (startDate: string, endDate: string): Promise<GanttChartVacationScheduleData> => {
    return await getCubaREST()!.invokeService<string>(
      "tsadv_VacationScheduleRequestService",
      "ganttChart",
      {
        startDate: startDate,
        endDate: endDate,
      }
    ).then(value => JSON.parse(value))
      .then(value => this.gantData = value)
      .then(value => {
        this.maxSize = Math.max(...this.gantData.map(value1 => value1.colorIndex));
        return value;
      });
  }

  drowChart = () => {

// Themes begin
    am4core.useTheme(am4themes_animated);
// Themes end

    var chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0;

    chart.language.locale = am4lang_ru_RU;

    chart.paddingRight = 30;

    var colorSet = new am4core.ColorSet();
    colorSet.saturation = 0.4;

    chart.data = this.gantData.map(value => {
      return {
        "category": value.personFullName,
        "start": value.startDate,
        "end": value.endDate,
        "color": colorSet.getIndex(value.colorIndex).brighten(value.brighten),
        "task": value.absenceType
      }
    })

    chart.dateFormatter.dateFormat = "dd.MM.yyyy";
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.inversed = true;

    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 70;
    dateAxis.baseInterval = {count: 1, timeUnit: "day"};
    dateAxis.renderer.tooltipLocation = 0;

    var series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.columns.template.width = am4core.percent(80);
    series1.columns.template.tooltipText = "{task}: [bold]{openDateX}[/] - [bold]{dateX}[/]";

    series1.dataFields.openDateX = "start";
    series1.dataFields.dateX = "end";
    series1.dataFields.categoryY = "category";
    series1.columns.template.propertyFields.fill = "color"; // get color from data
    series1.columns.template.propertyFields.stroke = "color";
    series1.columns.template.strokeOpacity = 1;

    chart.scrollbarX = new am4core.Scrollbar();
  }
}
