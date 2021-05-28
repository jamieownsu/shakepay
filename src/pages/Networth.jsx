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
const BTC_RATE = 43399.09;
const ETH_RATE = 3018.59;

class Networth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  componentDidMount() {
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
    let data = [];
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
    if (item.type === "conversion") {
      netWorth = this.addOrSubtract(item.from, false);
      netWorth += this.addOrSubtract(item.to, true);
    } else {
      netWorth = this.addOrSubtract(item, item.direction === "credit");
    }
    return netWorth;
  }

  addOrSubtract(item, creditOrDebit) {
    let cad = 0.0,
      btc = 0.0,
      eth = 0.0;
    if (item.currency === "CAD") {
      creditOrDebit ? (cad += item.amount) : (cad -= item.amount);
    } else if (item.currency === "BTC") {
      creditOrDebit ? (btc += item.amount) : (btc -= item.amount);
    } else if (item.currency === "ETH") {
      creditOrDebit ? (eth += item.amount) : (eth -= item.amount);
    }
    return cad + btc * BTC_RATE + eth * ETH_RATE;
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div className="title">Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="title">Loading...</div>;
    } else {
      return (
        <div className="App-header">
          <h2 className="title">My Shakepay Networth</h2>
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
