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

const BTC_RATE = 0.00002246;
const ETH_RATE = 0.000322321609642528;

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
    fetch(
      "https://shakepay.github.io/programming-exercise/web/transaction_history.json"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.reverse(),
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

  formatData() {
    const { items } = this.state;
    let data = [];
    items.forEach((item, index) => {
      const date = new Date(item.createdAt);
      data.push({
        date: date.toLocaleDateString(),
        networth: this.getNetworth(items.slice(0, index)),
      });
    });
    return data;
  }

  getNetworth(transactions) {
    let cad = 0.0,
      btc = 0.0,
      eth = 0.0;
    transactions.forEach((item) => {
      if (item.type === "conversion") {
        if (item.from.currency === "CAD") {
          cad -= item.from.amount;
        } else if (item.currency === "BTC") {
          btc -= item.from.amount;
        } else if (item.currency === "ETH") {
          eth -= item.from.amount;
        }
        if (item.to.currency === "CAD") {
          cad += item.to.amount;
        } else if (item.to.currency === "BTC") {
          btc += item.to.amount;
        } else if (item.to.currency === "ETH") {
          eth += item.to.amount;
        }
      } else {
        let creditOrDebit = item.direction === "credit";
        if (item.currency === "CAD") {
          creditOrDebit ? (cad += item.amount) : (cad -= item.amount);
        } else if (item.currency === "BTC") {
          creditOrDebit ? (btc += item.amount) : (btc -= item.amount);
        } else if (item.currency === "ETH") {
          creditOrDebit ? (eth += item.amount) : (eth -= item.amount);
        }
      }
    });
    return cad + btc * BTC_RATE + eth * ETH_RATE;
  }

  render() {
    const { error, isLoaded } = this.state;
    if (error) {
      return <div className="title">Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="title">Loading...</div>;
    } else {
      return (
        <div className="App-header">
          <h2 className="title">My Shakepay Networth</h2>
          <LineChart width={1000} height={600} data={this.formatData()}>
            <Line
              type="monotone"
              dataKey="networth"
              stroke="#8884d8"
              activeDot={{ r: 4 }}
            />
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
            <XAxis
              label={{ value: "Dates", fill: "#8884d8" }}
              interval={75}
              dataKey="date"
            />
            <YAxis
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
            <Legend />
          </LineChart>
        </div>
      );
    }
  }
}

export default Networth;
