import { useState, useEffect } from 'react';
import { Props } from './RadarChart.types';
import { DNA_CONSTANTS, DNA_COLORS } from '../../../modules/nft/constants';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2'
import { Radar } from "react-chartjs-2";
import "./RadarChart.css";

import Star from '../../../images/egg/star.svg'
import { isMobile } from '@kmon/dapps/dist/lib/utils'

const RadarChart = (props: Props) => {
  const { nft, isV2 } = props
  const genesV2Values = [
    nft.genesV2?.attack,
    nft.genesV2?.defense,
    nft.genesV2?.speed,
    nft.genesV2?.ego,
    nft.genesV2?.healthPoints,
    nft.genesV2?.constitution,
    nft.genesV2?.affections,
    nft.genesV2?.crazyness,
    nft.genesV2?.instinct,
    nft.genesV2?.hunger,
    nft.genesV2?.brave,
    nft.genesV2?.smart
  ]

  const genesValues = [
    nft.data.kryptomon!.genes.attack,
    nft.data.kryptomon!.genes.defense,
    nft.data.kryptomon!.genes.speed,
    nft.data.kryptomon!.genes.ego,
    nft.data.kryptomon!.genes.healthPoints,
    nft.data.kryptomon!.genes.constitution,
    nft.data.kryptomon!.genes.affections,
    nft.data.kryptomon!.genes.crazyness,
    nft.data.kryptomon!.genes.instinct,
    nft.data.kryptomon!.genes.hunger,
    nft.data.kryptomon!.genes.brave,
    nft.data.kryptomon!.genes.smart
  ]

  const RadarValues = isV2
    ? genesV2Values
    : genesValues

  const DNAGeneration = nft.data.kryptomon?.genes.generation
  const isDNAUnfreezable = nft.data.kryptomon?.extraData.unfreezable

  const data = {
    labels: DNA_CONSTANTS,
    datasets: [
      {
        label: "",
        data: RadarValues,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
        // borderSkipped: false,
        // borderRadius: 5,
        // width: 678,
        // barPercentage: 0.65,
        // categoryPercentage: 0.5,
        // fill: 10,
        // borderCapStyle: 'butt',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
      }
    ],
  }

  const options = {
    
    // scaleLineWidth :16 ,
    // scaleLineColor: "blue",
    // fill: true,
    scales: {
      // gridLines: {
      //   color: "red",
      //   // circular: true
      // },
      // scaleLineWidth :16 ,
      // scaleLineColor: "blue",
      r: {
        scaleLineWidth :16 ,
        scaleLineColor: "blue",
        pointLabels:{
            font: {
                size: 12,
            }
        },
        ticks: {
          min: 0,
          max: 16,
          stepSize: 20,
          showLabelBackdrop: true,
          backdropColor: "rgba(0, 0, 0, 1)"
        },
        line: {
          boderWidth:3,
        },
        angleLines: {
          // color: "rgba(255, 255, 255, .3)",
          // lineWidth: 1
        },
        gridLines: {
          // color: "rgba(255, 255, 0, .3)",
          lineWidth: 2,
          color: "blue",
          // circular: true,
        },
        grid: {
          borderColor: "rgba(255, 0, 0, 1)",
          color: "red",
          backgroundColor: "rgba(255, 0, 0, 1)",
        },
        fill: true,
        // display: false,
        // borderDashOffset: 5,
        color: "red",
      },
      // k:{
      //   grid: {
      //     // color: "blue",
      //   }
      // },
    },
  }
  const RadarOptions = {
    scales: {
      ticks: {
        min: 0,
        max: 16,
        stepSize: 2,
        showLabelBackdrop: true,
        backdropColor: "red"
      },
      angleLines: {
        color: "rgba(255, 0, 0, .3)",
        lineWidth: 1
      },
      gridLines: {
        color: "red",
        // circular: true
        backgroundColor: "blue",
      },
      grid: {
        backgroundColor: 'red',
        fill: {
          backgroundColor: 'red',
        }
      }
    }
  }

  const [screen, setScreen] = useState(0);
  return (
    <div className = "_radar-container">
      {/* <Radar data={(canvas) => getChartData(canvas)} options={options} /> */}
      {/* <Radar data={()=>getChartData()} options={options} /> */}
      <Radar data={data} options={options} />
      {/* <Radar data={data} options={RadarOptions} /> */}
    </div>
  );
};

export default RadarChart;
