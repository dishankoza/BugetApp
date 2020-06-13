import React from 'react'
import NavBar from '../components/navbar'
import DatePicker from "react-datepicker";
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import firebase from '../components/firebase'
import Table from 'react-bootstrap/Table'


class Milklog extends React.Component{
    constructor(){
        super();
        this.state = {
            fromdate : new Date(),
            todate : new Date(),
            data : []
        }
    }


    handlefromChange = (e) =>{
        this.setState({fromdate : e});
    }
    
    handletoChange = (e) =>{
        this.setState({todate : e});
    }

    getdata = async (e) =>{
        e.preventDefault();
        const db = firebase.firestore();
        console.log(this.state.fromdate);
        await db.collection("milk").where("Date", '>=',this.state.fromdate)
        .where('Date','<=',this.state.todate)
        .get()
        .then(querySnapshot => {
           let milkdata = querySnapshot.docs.map(doc => doc.data())
            this.setState({data : milkdata})
                      })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }
    render(){
        var sum = 0;
        return(
            <div>
                <NavBar></NavBar>
                <br></br>
                <Form onSubmit={this.getdata}> 
                    <Row>
                        <Col>
                        <Form.Label>From</Form.Label>
                            <DatePicker
                            selected={this.state.fromdate}
                            onChange={this.handlefromChange}
                        />
                        </Col>
                        <Col>
                        <Form.Label>To</Form.Label>
                            <DatePicker
                                selected={this.state.todate}
                                onChange={this.handletoChange}
                            />
                        </Col>
                    </Row>
                    <br></br>
                    <Button variant="primary" type="submit" >
                        Submit
                    </Button>
                </Form>
                <br></br>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                        <th>Date</th>
                        <th>Amul</th>
                        <th>Gokul</th>
                        <th>OtherBrand</th>
                        <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>{
                        this.state.data.map(row =>{
                            var i=0;
                            sum = sum + row.Total
                            return( <tr>
                                        <td key ={i}>{ row.Date.toDate().toDateString() }</td>
                                        <td key={i++}>{row.AmulPrice}</td>
                                        <td key={i++}>{row.GokulPrice}</td>
                                        <td key={i++}>{row.OtherBrandPrice}</td>
                                        <td key={i++}>{row.Total}</td>
                                    </tr>
                                
                                );
                            
                        }
                        )}</tbody>
                </Table>
                <h1>Total Amount : {sum}</h1>
            </div>
        );
    }
}
export default Milklog