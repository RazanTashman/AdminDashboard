import React from 'react';
import $ from 'jquery';
import { storage } from '../firebase/firebase'
import { Spinner } from 'reactstrap'
import Nav from "../navBar/nav"
import { Redirect } from 'react-router-dom'
import './items.css';
class AddItems extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      productName: "",
      productPrice: "",
      description: "",
      category: "",
      image: null,
      redirect: false,
      productNameEr: "",
      productPriceEr: "",
      categoryEr: "",
      loading:false,
    }


  }

  getTheInfo(event) {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.name === "productName")
      this.state.productNameEr = ""
    if (event.target.name === "productPrice")
      this.state.productPriceEr = ""
  }

  submit(e) {
  

    if (!this.state.productName) {
      this.state.productNameEr = "Item Name required ";

    }
    if (!this.state.productPrice) {
      this.state.productPriceEr = "Price required ";
    }
    if (this.state.productNameEr || this.state.productPriceEr) {
      this.setState({ productNameEr: this.state.productNameEr, productPriceEr: this.state.productPriceEr });
    }
    else {
      e.preventDefault();
      this.setState({ loading: true });
      this.imageUpload()
    }
  }

  handleChange(e) {

    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  }

  async imageUpload(e) {
    if (this.state.image) {
      const { image } = this.state;
      const imageLink = storage.ref(`images/${image.name}`).put(image)

      imageLink.on(
        "state_changed",
        snapshot => { },
        error => {
          console.log(error)
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              this.state.image = url


              var data = {
                productName: this.state.productName,
                productPrice: this.state.productPrice,
                description: this.state.description,
                category: this.state.category,
                image: this.state.image,
              }
              this.addAction(data)
              this.setState({
                redirect: true
              })
            })
        })
    }
    else {
      var data = {
        productName: this.state.productName,
        productPrice: this.state.productPrice,
        description: this.state.description,
        category: this.state.category,
      }
      this.addAction(data)
      this.setState({
        redirect: true
      })
    }


  }

  addAction(data) {
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/addItems',
      data: JSON.stringify(data),
      contentType: "application/json",
      success: function (data) {
      },
      error: function (err) {
        console.log('error:', err)
      }
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/items' />
    }
  }


  render() {
    const mystyle = {
      width: "550px",
      marginLeft: "450px",
      marginTop: "80px"
    };
    return (
      <div>
        <Nav />
        <form  action="/items" className="FORM">

          <div class="form-group">
            <input type="text" class="form-control" placeholder="Item Name" name="productName" required="required" onChange={(e) => this.getTheInfo(e)} />
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.productNameEr}
            </div>
          </div>

          <br />

          <div class="form-group">
            <input type="number" class="form-control" placeholder="Item Price" name="productPrice" required="required" onChange={(e) => this.getTheInfo(e)} />
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.productPriceEr}
            </div>
          </div>

          <br />

          <div class="form-group">
            <input type="text" class="form-control" placeholder="Description" name="description" required="required" onChange={(e) => this.getTheInfo(e)} />
          </div>
          <br />

          <select name="category" id="inputState" class="form-control" required="required"
            onChange={(e) => this.getTheInfo(e)}  >
            <option name="" disabled>Choose option</option>
            <option value="Veggies" selected>Veggies</option>
            <option value="meat" >Meat</option>
            <option value="drinks" >Drinks</option>
          </select>
          <br />
    
          <div class="custom-file">
            <input type="file" class="custom-file-input" id="customFile" required="required" onChange={this.handleChange.bind(this)} />
            <label class="custom-file-label" for="customFile">Pick Image</label>
          </div>

          <br /><br />
          <div>
            {this.renderRedirect()}
            <button type="button" onClick={this.submit.bind(this)} style={{ fontWeight: 'bold', fontSize: "22px"}} className=" butt btn btn-warning btn-lg text-white "> {this.state.loading && <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />} Add</button>
          </div>
        </form>

      </div>
    );
  }
}
export default AddItems;



