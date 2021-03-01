import React from 'react';
import $ from 'jquery';
import { storage } from '../firebase/firebase'
import { Spinner } from 'reactstrap'
import Nav from "../navBar/nav"
import { Redirect } from 'react-router-dom'
// import './items.css';
class EditItems extends React.Component {
  constructor(props) {
    super(props)


    this.state = {
      items: [],
      productName: "",
      productPrice: "",
      description: "",
      category: "",
      image: null,
      redirect: false
    }




  }

  componentDidMount() {

    var that = this
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/items',
      contentType: "application/json",

      success: function (data) {
        var data1 = data.filter(item => item.productId == localStorage.getItem('id'))
        that.setState({
          productName: data1[0].productName,
          productPrice: data1[0].productPrice,
          description: data1[0].description,
          category: data1[0].category,
        });
      },


      error: function (err) {
        console.log('error:', err)
      }
    })




  }

  getTheInfo(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  submit(e) {
    e.preventDefault();
    this.setState({ loading: true });
    this.imageUpload()



  }

  handleChange(e) {
    e.preventDefault();
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
                id: localStorage.getItem("id"),
                productName: this.state.productName,
                productPrice: this.state.productPrice,
                description: this.state.description,
                category: this.state.category,
                image: this.state.image,
              }
              this.editAction(data)
              this.setState({
                redirect: true
              })

            })
        })
    }
    else {
      var data = {
        id: localStorage.getItem("id"),
        productName: this.state.productName,
        productPrice: this.state.productPrice,
        description: this.state.description,
        category: this.state.category,
      }
      this.editAction(data)
      this.setState({
        redirect: true
      })
    }

  }

  editAction(data) {

    var that = this
    $.ajax({
      method: 'PUT',
      url: ` http://localhost:3000/item/'${localStorage.getItem("id")}'`,
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (data) {
        console.log("data:::", data)
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
            <input type="text" class="form-control" placeholder="Item Name" name="productName" value={this.state.productName} required="required" onChange={(e) => this.getTheInfo(e)} />
          </div>
          <br />

          <div class="form-group">
            <input type="number" class="form-control" placeholder="Item Price" name="productPrice" value={this.state.productPrice} required="required" onChange={(e) => this.getTheInfo(e)} />
          </div>
          <br />

          <div class="form-group">
            <input type="text" class="form-control" placeholder="Description" name="description" value={this.state.description} required="required" onChange={(e) => this.getTheInfo(e)} />
          </div>
          <br />

          <select name="category" id="inputState" class="form-control"
            value={this.state.category}
            onChange={(e) => this.getTheInfo(e)}  >
            <option name="" disabled>Choose option</option>
            <option value="Veggies" selected>Veggies</option>
            <option value="meat" >Meat</option>
            <option value="drinks" >Drinks</option>
          </select>
          <br />

          <div class="custom-file">
            <input type="file" file={this.state.image} class="custom-file-input" id="customFile" onChange={this.handleChange.bind(this)} />
            <label class="custom-file-label" for="customFile">Pick Image</label>
          </div>

          <br /><br />
          <div>
            {this.renderRedirect()}
            <button type="submit" onClick={this.submit.bind(this)} style={{ fontWeight: 'bold', fontSize: "22px"}} className=" butt btn btn-warning btn-lg text-white  "> {this.state.loading && <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />} Edit</button>
          </div>
        </form>

      </div>
    );
  }
}

export default EditItems;



