import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const URL =
  "https://shakepay.github.io/programming-exercise/web/transaction_history.json";
const BTC_URL =
  "https://shakepay.github.io/programming-exercise/web/rates_CAD_BTC.json";
const ETH_URL =
  "https://shakepay.github.io/programming-exercise/web/rates_CAD_ETH.json";
const BTC_RATE = 43399.09,
  ETH_RATE = 3018.59;

class Networth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      btcRates: [],
      ethRates: [],
    };
  }

  async componentDidMount() {
    try {
      const btcResp = await fetch(BTC_URL).then((res) => res.json());
      this.setState({
        btcRates: btcResp,
      });
      const ethResp = await fetch(ETH_URL).then((res) => res.json());
      this.setState({
        ethRates: ethResp,
      });
    } catch (error) {
      console.log(error);
    }
    fetch(URL)
      .then((res) => res.json())
      .then(
        (result) => {
          this.formatData(result.reverse());
          this.setState({
            isLoaded: true,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  formatData(items) {
    const data = [];
    let networth = 0;
    items.forEach((item) => {
      networth += this.getNetworth(item);
      data.push({
        date: new Date(item.createdAt).toLocaleDateString(),
        networth: networth,
      });
    });
    this.setState({
      items: data,
    });
  }

  getNetworth(item) {
    let netWorth;
    const createdAt = this.splitDate(item.createdAt);
    if (item.type === "conversion") {
      netWorth = this.addOrSubtract(item.from, false, createdAt);
      netWorth += this.addOrSubtract(item.to, true, createdAt);
    } else {
      netWorth = this.addOrSubtract(
        item,
        item.direction === "credit",
        createdAt
      );
    }
    return netWorth;
  }

  addOrSubtract(item, creditOrDebit, createdAt) {
    const { btcRates, ethRates } = this.state;
    if (item.currency === "CAD") {
      return creditOrDebit ? item.amount : -item.amount;
    } else if (item.currency === "BTC") {
      const btcRate =
        btcRates.find((i) => this.splitDate(i.createdAt) === createdAt)
          ?.midMarketRate ?? BTC_RATE;
      const btc = creditOrDebit ? item.amount : -item.amount;
      return btc * btcRate;
    } else {
      const ethRate =
        ethRates.find((i) => this.splitDate(i.createdAt) === createdAt)
          ?.midMarketRate ?? ETH_RATE;
      const eth = creditOrDebit ? item.amount : -item.amount;
      return eth * ethRate;
    }
  }

  splitDate(item) {
    return item.split("T")[0];
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div className="App">Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="App">Loading...</div>;
    } else {
      return (
        <div className="App">
          <h2>My Shakepay Networth</h2>
          <LineChart width={1000} height={600} data={items}>
            <Line
              name="Networth"
              type="monotone"
              dataKey="networth"
              stroke="#8884d8"
              activeDot={{ r: 4 }}
            />
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
            <XAxis
              height={50}
              label={{ value: "Dates", fill: "#8884d8", dy: 15 }}
              interval={75}
              dataKey="date"
            />
            <YAxis
              width={100}
              label={{
                value: "CAD",
                angle: -90,
                position: "insideLeft",
                fill: "#8884d8",
              }}
            />
            <Tooltip
              labelStyle={{ color: "black" }}
              formatter={(value) =>
                new Intl.NumberFormat("en-CA", {
                  style: "currency",
                  currency: "CAD",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(value)
              }
            />
            <Legend verticalAlign="top" height={36} />
          </LineChart>
        </div>
      );
    }
  }
}

export default Networth;
