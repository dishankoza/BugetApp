import React, {Component} from 'react'
import firebase from '../components/firebase'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NavBar from '../components/navbar';



class Formpage extends Component{
  constructor(){
    super();
    this.state = {
      date : new Date(),
      amulprice : 23,
      gokulprice : 30,
      amulqty : 0,
      gokulqty : 0,
      otherbrand : 0,
      total : 0
    }
  }

  handleChange = date => {
    this.setState({date});
  };

   amulcal = event =>{
    this.setState({amulqty : event.target.value}, () =>{
      const price =  this.state.gokulprice*this.state.gokulqty + this.state.amulqty*this.state.amulprice;
      const db = firebase.firestore();
      db.collection("milk").where("Date", "==", 5).where('Month', '==' , 6).where("Year" ,'==', 2020)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
      console.log('amul',price);
      this.setState({total : price })})
  }

  gokulcal = event =>{
    this.setState({gokulqty : event.target.value}, () =>{
      const price =  this.state.amulqty*this.state.amulprice + this.state.gokulprice*this.state.gokulqty;
      console.log('gokul',price);
      this.setState({total : price });
    })
  }

  otherprice = event =>{
    this.setState({otherbrand : event.target.value},()=>{
      const price = this.state.amulqty*this.state.amulprice + this.state.gokulprice*this.state.gokulqty + parseInt(this.state.otherbrand);
      console.log('otherbrand',price);
      this.setState({total : price})})
  }

  addmilk = async (event) =>{
    event.preventDefault();
    const db = firebase.firestore();
    // eslint-disable-next-line
    const milkRef = await db.collection('milk').doc(this.state.date.toDateString()).set({
      Date : this.state.date,
      AmulPrice: this.state.amulqty*this.state.amulprice,
      GokulPrice: this.state.gokulprice*this.state.gokulqty,
      OtherBrandPrice : this.state.otherbrand,
      Total : this.state.total
    });
    this.setState({
      amulqty : 0,
      gokulqty : 0,
      otherbrand : 0,
      total : 0
    }) 
    alert("Milk log added to Database"); 
     // display string message
    window.location.reload();

    



  }

  

  render(props){
    console.log(this.props)
    return(
    <div>
        <NavBar></NavBar>

      <br></br>
      <br></br>
      <Form onSubmit={this.addmilk}>
        <Row>
          <Col>
            <Form.Control type = 'number' placeholder="No of Amul packets" onChange = {this.amulcal}/>
          </Col>
          <Col>
        <Form.Label>Price Genrated : {this.state.amulqty*this.state.amulprice}</Form.Label>
          </Col>
          </Row>
      <br></br>
          <Row>
            <Col>
              <Form.Control type = 'number'placeholder="No of Gokul packets" onChange = {this.gokulcal} />
            </Col>
            <Col>
    <Form.Label>Price Genrated : {this.state.gokulprice*this.state.gokulqty}</Form.Label>
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col>
              <Form.Control type = 'number' placeholder="other Brand : Enter price" onChange={this.otherprice} />
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col>
    <Form.Label>Total : {this.state.total}</Form.Label>
            </Col>
          </Row>
          <br></br>
          <h4>Today's Date</h4>
      <DatePicker
        selected={this.state.date}
        onChange={this.handleChange}
      />
      <br></br>
      <br></br>
  <Button className = 'vertical-center' variant="primary" type="submit" onClick={this.addmilk}>
  Submit
  </Button>
</Form>
    </div>
       
    );
  }



}

export default Formpage;