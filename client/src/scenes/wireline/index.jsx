import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function generateMockLogData(numPoints) {
    const gammaData = [];
    const neutronData = [];
    const densityData = [];
    const resistivity1Data = [];
    const resistivity2Data = [];
    const resistivity3Data = [];
    const sonicData = [];
    const labels = [];
    for (let i = 0; i < numPoints; i++) {
      const depth = -1500 - i * 2;
      const gammaValue = Math.random() * 10 + i * 0.2;
      const neutronValue = Math.random() * 0.1 + i / 10;
      const densityValue = Math.random() * 0.1 + i / 10;
      const resistivity1Value = Math.random() * 5 + i;
      const resistivity2Value = Math.random() * 5 + i - 10;
      const resistivity3Value = Math.random() * 5 + i + 10;
      const sonicValue = Math.random() * 10 + i * 0.2;
      gammaData.push({ depth: depth, value: gammaValue });
      neutronData.push({ depth: depth, value: neutronValue });
      densityData.push({ depth: depth, value: densityValue });
      resistivity1Data.push({ depth: depth, value: resistivity1Value });
      resistivity2Data.push({ depth: depth, value: resistivity2Value });
      resistivity3Data.push({ depth: depth, value: resistivity3Value });
      sonicData.push({ depth: depth, value: sonicValue });
      labels.push(depth);
    }
    return {
      gamma: gammaData,
      neutron_porosity: neutronData,
      density_porosity: densityData,
      resistivity: {
        shallow: resistivity1Data,
        medium: resistivity2Data,
        deep: resistivity3Data,
      },
      sonic: sonicData,
      labels: labels,
    };
}

const data = generateMockLogData(300);

const LogCharts = ({ data }) => {
    const gammaChartRef = useRef(null);
    const porosityChartRef = useRef(null);
    const sonicChartRef = useRef(null);
  
    useEffect(() => {
      const gammaChart = new Chart(gammaChartRef.current, {
        type: "line",
        data: {
          labels: data.labels,
          datasets: [
            {
              label: "Gamma",
              data: data.gamma,
              fill: false,
              borderColor: "red",
              tension: 0.1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              max: -1500,
              min: -1650,
            },
          },
        },
      });

      const porosityChart = new Chart(porosityChartRef.current, {
        type: "line",
        data: {
          labels: data.labels,
          datasets: [
            {
              label: "Neutron Porosity",
              data: data.neutron_porosity,
              fill: false,
              borderColor: "blue",
              tension: 0.1,
            },
            {
              label: "Density Porosity",
              data: data.density_porosity,
              fill: false,
              borderColor: "green",
              tension: 0.1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              max: -1500,
              min: -1650,
            },
            x: {
              max: 30,
              min: 0,
            },
          },
        },
      });
  
      const sonicChart = new Chart(sonicChartRef.current, {
        type: "line",
        data: {
          labels: data.labels,
          datasets: [
            {
              label: "Sonic",
              data: data.sonic,
              fill: false,
              borderColor: "black",
              tension: 0.1,
            },
            {
              label: "Shallow Resistivity",
              data: data.resistivity.shallow,
              fill: false,
              borderColor: "orange",
              tension: 0.1,
            },
            {
              label: "Medium Resistivity",
              data: data.resistivity.medium,
              fill: false,
              borderColor: "purple",
              tension: 0.1,
            },
            {
              label: "Deep Resistivity",
              data: data.resistivity.deep,
              fill: false,
              borderColor: "brown",
              tension: 0.1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              max: -1500,
              min: -1650,
            },
          },
        },
      });

    }, []);
  
    return (
      <div>
        <canvas ref={gammaChartRef} width={400} height={200} />
        <canvas ref={porosityChartRef} width={400} height={200} />
        <canvas ref={sonicChartRef} width={400} height={200} />
      </div>
    );
  };
  
  export default LogCharts;
