import React from 'react';
import $ from 'jquery';
import Nav from "../navBar/nav"
import { Redirect } from 'react-router-dom'
import './items.css';
class OrderList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: [],
      redirect: false,
      redirectUpdate: false,
      id: undefined

    }
  }


  componentDidMount() {
    var that = this
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/items',
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

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/additem' />
    }
  }

  deletAction = (id) => {
    var that = this
    $.ajax({
      method: 'DELETE',
      url: `http://localhost:3000/items/${id}`,
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


  editAction = (id) => {
    localStorage.setItem("id", id)
    this.setState({
      redirectUpdate: true,
      id: id
    })
  }
  renderRediUpdat = () => {
    if (this.state.redirectUpdate) {
      return <Redirect to={`/item/${this.state.id}`} />
      // return <Redirect to={`/items/${this.state.id}`} />
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
        <div  >
          {this.renderRedirect()}
          <button type="button" class="buttAdd btn btn-warning text-light" onClick={this.setRedirect}> Add Item</button>
        </div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Item No.</th>
              <th scope="col">Item Name</th>
              <th scope="col">Price</th>
              <th scope="col">Description </th>
              <th scope="col">category</th>
              <th scope="col">image</th>
              <th scope="col">Actions</th>

            </tr>
          </thead>
          <tbody>
            {this.state.orders.map((order) => {
              return (
                <tr>
                  <th scope="row">{order.productId}</th>
                  <td>{order.productName}</td>
                  <td>{order.productPrice}</td>
                  <td>{order.description}</td>
                  <td>{order.category}</td>
                  <td>
                    <img src={order.image} style={{ width: "150px" }} />
                  </td>
                  <td>

                    <div>
                      <button className={order.productId} className="btn btn-warning text-light" style={buttStyle} type="button" onClick={() => this.deletAction(order.productId)}  >Delete</button>

                      {this.renderRediUpdat(order.productId)}
                      <button className={order.productId} className="btn btn-warning text-light" style={buttStyle} type="button" onClick={() => this.editAction(order.productId)}  >Edit</button>
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



