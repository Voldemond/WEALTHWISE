import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
const timeSeries = [
  {
    keyword: "DIGITAL_CURRENCY_DAILY",
    key: "Time Series (Daily)",
    lable: "1 Day",
    value: 1,
  },
  {
    keyword: "DIGITAL_CURRENCY_WEEKLY",
    key: "Weekly Time Series",
    lable: "1 Week",
    value: 7,
  },
  {
    keyword: "DIGITAL_CURRENCY_MONTHLY",
    key: "Monthly Time Series",
    lable: "1 Month",
    value: 30,
  },
];
const StockChart = () => {
  const [activeLable, setActiveLable] = useState("1 Day");
  const series = [
    {
      name: "price",
      data: [
        [1730193295820, 71144.573131893],
        [1730196480326, 71212.7721114025],
        [1730200294918, 71217.0474853025],
        [1730204201427, 71182.7722348787],
        [1730207227482, 71094.93359555],
        [1730210575704, 71794.4279412213],
        [1730214513270, 71766.8308523553],
        [1730218059050, 72403.3545102041],
        [1730221789673, 72871.019446287],
        [1730226022394, 72789.9651857676],
        [1730228945766, 73295.0058865997],
        [1730232631967, 72474.5107761319],
        [1730236076633, 72286.146259379],
        [1730239742000, 72216.8061831693],
        [1730243669216, 72560.5752049622],
        [1730247521175, 72507.9524596326],
        [1730250997419, 72078.2970655303],
        [1730253966749, 72347.9899508271],
        [1730257304598, 72312.7998227552],
        [1730261314322, 72192.6004140664],
        [1730265436423, 72393.0774507644],
        [1730269130802, 72534.197689103],
        [1730272403586, 72368.8918199016],
        [1730275294683, 72237.2090167938],
        [1730279733162, 72324.7607951405],
        [1730283374181, 72487.8204975189],
        [1730286560989, 72247.5232680885],
        [1730290695232, 72077.5637177256],
        [1730294091404, 71771.6678966711],
        [1730297431999, 72032.005327307],
        [1730300996280, 72345.1927235543],
        [1730304878962, 71874.7464440688],
        [1730308674968, 71840.6042953184],
        [1730312166152, 71965.5801715679],
        [1730315217076, 71855.1487893143],
        [1730318746312, 71836.3166307775],
        [1730322234567, 72859.5656019772],
        [1730326322961, 72428.5020474306],
        [1730330158605, 72537.3897425191],
        [1730333533059, 72388.9159019163],
        [1730337473763, 72286.036125685],
        [1730340878524, 72202.0530164546],
        [1730344738919, 72519.5730633098],
        [1730347886449, 72320.0237946798],
        [1730351895369, 72194.0612743355],
        [1730354444439, 72266.0989592653],
      ],
    },
  ];
  const options = {
    chart: {
      id: "area-datetime",
      type: "area",
      height: 350,
      zoom: {
        autoScaleYaxis: true,
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: "datetime",
        tickAmount: 6,
      },
      colors: ["#758AA2"],
      markers: {
        colors: ["#fff"], // Dot color
        strokeColors: "#fff", // Dot border color
        strokeWidth: 2, // Dot border width
        size: 0,
        style: "hollow",
      },

      tooltip: {
        theme: "dark", // Tooltip theme (light/dark)
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100],
        },
      },
      grid: {
        borderColor: "#47535E", // Color of the grid lines
        strokeDashArray: 4, // Width of the grid lines
        show: true,
      },
    },
  };
  const handleActiveLable = (value) => {
    setActiveLable(value);
  };
  return (
    <div className="space-x-3">
      {timeSeries.map((item) => (
        <Button
          variant={activeLable == item.lable ? "" : "outline"}
          onClick={() => handleActiveLable(item.lable)}
          key={item.lable}
        >
          {item.lable}
        </Button>
      ))}
      <div></div>
      <div id="chart-timelines">
        <ReactApexChart
          options={options}
          series={series}
          height={450}
          
        />
      </div>
    </div>
  );
};

export default StockChart;
