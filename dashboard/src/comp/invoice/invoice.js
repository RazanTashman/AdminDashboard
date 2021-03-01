import React from "react";
import Nav from "../navBar/nav"
import { Col, Divider, Row, Table } from 'antd';
import 'antd/dist/antd.css';
import '../../index.css'
import $ from 'jquery';


class Invoice extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      invoice: []
    }
  }
  componentDidMount() {
    var that = this
    $.ajax({
      method: 'GET',
      url: `http://localhost:3000/orders/'${localStorage.getItem("id")}'`,
      contentType: "application/json",

      success: function (data) {
        that.setState({
          invoice: data
        });
      },

      error: function (err) {
        console.log('error:', err)
      }
    })
  }

  render() {
    return (
      <div>
        <Nav />
        <div className="invoice" style={{ paddingLeft: "200px" }}>

          <Row>
            <Col>
              <Divider>Invoice</Divider>
            </Col>
          </Row>

          <Row gutter={24} style={{ marginTop: 32 }}>
            <Col span={8}>
              <h3 style={{ color: "#555", fontWeight: "900" }}>Eco Haya</h3>
              <div>#944/945, 4th Cross, 9th Main,</div> {/* Addres */}
              <div>0799460706</div>    {/* phone number */}
            </Col>
            <Col span={8} offset={0}>
              <table>
                <tr>
                  <th>Order # :</th>
                  <td>1</td>  {/* orderID */}
                </tr>
                <tr>
                  <th>Invoice Date :</th>
                  <td>10-01-2018</td> {/* Order Date */}
                </tr>
                <tr>
                  <th>Due Date :</th>
                  <td>10-01-2018</td>  {/* Due Date */}
                </tr>
              </table>
            </Col>
          </Row>

          <Row style={{ marginTop: 48 }}>
            <Table dataSource={[{
              id: 1,
              name: 'Accommodation (Single Occupancy)',
              description: 'Accommodation',
              price: 1599,
              quantity: 1
            }]}
              pagination={false}
            >
              <Table.Column title="Items" dataIndex='name' />
              <Table.Column title="Quantity" dataIndex='quantity' />
              <Table.Column title="Rate" dataIndex='rate' />
              <Table.Column title="Amount" dataIndex='amount' />
            </Table>
          </Row>

          <Row style={{ marginTop: 48, textAlign: 'center', color: "#555", fontWeight: "900" }}>
            notes
                </Row>

        </div>
      </div>
    );
  };
}

export default Invoice;