import React from 'react';
import $ from 'jquery';
import Nav from "../navBar/nav"
import { Redirect } from 'react-router-dom'
class OrderList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: [],
      redirect: false
    }
  }

  componentDidMount() {
    var that = this
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/orders',
      contentType: "application/json",

      success: function (data) {
        that.setState({
          orders: data
        });
      },

      error: function (err) {
        console.log('error:', err)
      }
    })
  }


  rejection(orderId) {

    var statusInfo = {
      orderId: orderId,
      status: "Canceled",
    }
    var idToStr = statusInfo.orderId + ""
    var accepSelector = "#" + idToStr
    $(accepSelector).prop('disabled', true);

    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/action',
      data: JSON.stringify(statusInfo),
      contentType: "application/json",
      success: function () {
      },
      error: function (err) {
        console.log('error:', err)
      }
    })

  }

  acceptation(orderId) {
    var statusInfo = {
      orderId: orderId,
      status: "Accepted",
    }
    var idToStr = statusInfo.orderId + ""
    var selector = "." + idToStr
    $(selector).prop('disabled', true);

    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/action',
      data: JSON.stringify(statusInfo),
      contentType: "application/json",
      success: function () {
      },
      error: function (err) {
        console.log('error:', err)
      }
    })
  }

  setRedirect = (id) => {
    localStorage.setItem("id", id)
    this.setState({
      redirect: true,
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/invoice' />
    }
  }
  render() {
    const buttStyle = {
      margin: "5px ",

    };

    return (
      <div>
        <Nav />
        <br /><br />
        <table style={{ marginTop: "5%"}} class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Order No.</th>
              <th scope="col">User Name</th>
              <th scope="col">phone Number</th>
              <th scope="col">Order Status </th>
              <th scope="col">Delivery Time</th>
              <th scope="col">Payment Method</th>
              <th scope="col">Total Amount</th>
              <th scope="col">Actions</th>

            </tr>
          </thead>
          <tbody>
            {this.state.orders.map((order) => {
              return (
                <tr>
                  <th scope="row">{order.orderId}</th>
                  <td>{order.userName}</td>
                  <td>{order.phoneNumber}</td>
                  <td>{order.status}</td>
                  <td>{order.deliveryTime}</td>
                  <td>{order.payment}</td>
                  <td>{order.totalAmount}</td>
                  <td>
                    <div>
                      {this.renderRedirect()}
                      <button type="button" style={buttStyle} onClick={() => this.setRedirect(order.orderId)}> invoice</button>

                      <button className={order.orderId} disabled={order.status === "Accepted" ? true : false} style={buttStyle} type="button" onClick={() => this.acceptation(order.orderId)}  >Accept</button>
                      <button id={order.orderId} style={buttStyle} disabled={order.status === "Canceled" ? true : false} type="button" onClick={() => this.rejection(order.orderId)}  >Cancel</button>
                    </div>
                  </td>
                </tr>
              )

            })
            }
          </tbody>
        </table>
      </div>
    );
  }
}
export default OrderList;



