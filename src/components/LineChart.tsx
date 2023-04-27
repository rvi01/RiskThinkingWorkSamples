import { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import Papa from 'papaparse';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
  } from 'chart.js'


  ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
  )
interface RiskData {
  Asset_Name: string;
  Lat: number;
  Long: number;
  Business_Category: string;
  Risk_Rating: number;
  Risk_Factors: string;
  Year: number;
}

interface LineGraphProps {
  Lat?: number;
  Asset_Name?: string;
  Business_Category?: string;
  Long?: number;
}

interface LineGraphState {
  data: RiskData[];
}

const LineGraph = ({ Lat, Asset_Name, Business_Category,Long }: LineGraphProps) => {
  const [lat, setLat] = useState<number>();
  const [long, setLong] = useState<number>();
  const [state, setState] = useState<LineGraphState>({
    data: [],
  });
  useEffect(() => {
    // load the CSV data using PapaParse
    Papa.parse('/locations.csv', {
      download: true,
      header: true,
      complete: (results) => {
        let data = results.data as RiskData[];
        // filter the data based on the selected location, asset, or category
        if (Lat && Long) {
          data = data.filter((d) => d.Lat === Lat && d.Long === Long);
        } else if (Asset_Name) {
          data = data.filter((d) => d.Asset_Name === Asset_Name);
        } else if (Business_Category) {
          data = data.filter((d) => d.Business_Category === Business_Category);
        }
        setState({ data });
      },
    });
    
  }, [Lat, Asset_Name, Business_Category]);
  
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // reload the data when the form is submitted
    setState({ data: [] });
  };
  // prepare the data for Chart.js
  const chartData = {
    labels: state.data.map((d) => d.Year),
    datasets: [
      {
        label: 'Risk Rating',
        data: state.data.map((d) => d.Risk_Rating),
        borderColor: 'blue',
        fill: false,
      },
    ],
  };

  // set up the chart options
  const chartOptions = {
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Year',
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Risk Rating',
          },
        },
      ],
    },
    title: {
      display: true,
      text: 'Risk Rating over Time',
    },
    legend: {
      display: true,
    },
  };

  return (
    <div>
      <div>
      <form onSubmit={handleSubmit}>
        <label>
          Latitude:
          <input type="number" value={lat} onChange={(e) => setLat(parseFloat(e.target.value))} />
        </label>
        <br />
        <label>
          Longitude:
          <input type="number" value={long} onChange={(e) => setLong(parseFloat(e.target.value))} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <div>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
    </div>
  );
};

export default LineGraph;
