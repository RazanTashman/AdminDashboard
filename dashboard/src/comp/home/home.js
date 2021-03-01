import React from 'react';
import AvgMonthly from "./charts/avgMonthly";
import AvgWeekly from "./charts/avgWeekly";
import $ from 'jquery';
import Nav from "../navBar/nav"
class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            orders: "",
            earning: "",
            canceled: "",
            weekRepo: [],
            monthRepo: [],
            week: {},
            month: {}
        }
    }

    componentDidMount() {
        var that = this
        $.ajax({
            method: 'GET',
            url: 'http://localhost:3000/home',
            contentType: "application/json",
            success: function (info) {
                that.setState({ data: info })
                that.setState({
                    canceled: info.canceled[0]['COUNT(*)'],
                    orders: info.orders[0]['COUNT(*)'],
                    earning: info.earning[0]['SUM(totalAmount)'],
                    weekRepo: info.day,
                    monthRepo: info.month
                });

                that.setState({
                    week: {
                        labels: that.labelArrayWe(),
                        datasets: [
                            {
                                label: 'orders',
                                backgroundColor: '#F9A825',
                                borderWidth: 3,
                                data: that.valuesArrayWe()
                            }
                        ]
                    }
                })

                that.setState({
                    month: {
                        labels: that.labelArrayMo(),
                        datasets: [
                            {
                                label: 'orders',
                                backgroundColor: '#F9A825',
                                borderWidth: 3,
                                data: that.valuesArrayMo()
                            }
                        ]
                    }
                })

            },
            error: function (err) {
                console.log('error:', err)
            }
        })
    }

    labelArrayWe() {
        var labels = []
        var label = 0
        for (var i = 0; i <= 10; i++) {
            if (this.state.weekRepo[i]) {
                label = this.state.weekRepo[i]['DAY(orderDate)'] + "/" + this.state.weekRepo[i]['MONTH(orderDate)'] + "/" + this.state.weekRepo[i]['YEAR(orderDate)']
                labels.push(label)
            }
        }
        return labels
    }


    labelArrayMo() {
        var labels = []
        var label = 0
        for (var i = 0; i <= 10; i++) {
            if (this.state.monthRepo[i]) {
                label = this.state.monthRepo[i]['MONTH(orderDate)'] + "/" + this.state.monthRepo[i]['YEAR(orderDate)']
                labels.push(label)
            }
        }
        return labels
    }

    valuesArrayWe() {
        var values = []
        var value = 0
        for (var i = 0; i <= 10; i++) {
            if (this.state.weekRepo[i]) {
                value = this.state.weekRepo[i]['COUNT(*)']
                values.push(value)
            }
        }
        return values
    }

    valuesArrayMo() {
        var values = []
        var value = 0
        for (var i = 0; i <= 10; i++) {
            if (this.state.monthRepo[i]) {
                value = this.state.monthRepo[i]['COUNT(*)']
                values.push(value)
            }
        }
        return values
    }


    render() {
        var that = this
     
        return (

            <div style={{ margin: "50px "}} className="container">
                 <Nav />
                <div className="row" >
                    <div className="flip-box">
                        <div className="flip-box-inner">
                            <div className="flip-box-front">
                                <h2 style={{ margin: "50px", color:"#555352" }}>Total Earnings</h2>
                            </div>
                            <div className="flip-box-back">
                                <h1 style={{ margin: "100px", color:"white"}}>{this.state.earning} JD</h1>
                            </div>
                        </div>
                    </div>

                    <div className="flip-box">
                        <div className="flip-box-inner">
                            <div className="flip-box-front">
                                <h2 style={{ margin: "50px", color:"#555352" }}>Total Orders</h2>
                            </div>
                            <div className="flip-box-back">
                                <h1 style={{ margin: "100px" , color:"white" }}>{this.state.orders}</h1>
                            </div>
                        </div>
                    </div>

                    <div className="flip-box">
                        <div className="flip-box-inner">
                            <div className="flip-box-front">
                                <h2 style={{ margin: "50px", color:"#555352" }}>Canceled Orders</h2>
                            </div>
                            <div className="flip-box-back">
                                <h1 style={{ margin: "100px" , color:"white" }}>{this.state.canceled}</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">

                    {/****************** AvgWeekly ***********************/}
                    <AvgWeekly week={this.state.week} />
                    {/****************** AvgMonthly ***********************/}
                    <AvgMonthly state={this.state.month} />
                </div>

            </div>

        )
    }
}
export default Home;



