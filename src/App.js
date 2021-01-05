import React, { Component } from "react";
import KRGlue from "@lyracom/embedded-form-glue";
import "./App.css";
import queryString from 'query-string';
import { ENDPOINT, PUBLIC_KEY } from './env.json';

class App extends Component {
  state = { promiseError: null };

  render() {
    return (
      <div className="form">
        <h1>Paiement</h1>
        <div className="container">
          <div id="myPaymentForm"></div>
        </div>
      </div>
    );
  }

  componentDidMount() {            
    let params = queryString.parse(window.location.search)

    const formToken = params.formToken;
    const formToken1 = "25YVW8Ghs0TXWhCeQNafX1qg20CeyJhbW91bnQiOjIwMDAsImN1cnJlbmN5IjoiRVVSIiwibW9kZSI6IlRFU1QiLCJ2ZXJzaW9uIjozLCJvcmRlcklkIjoiNWZhMjIzYmI1MGJjYjQxNWYyMzQzOTkzIiwic2hvcE5hbWUiOiJUSSBLT1VSU0UiLCJicmFuZFByaW9yaXR5IjpbIkNCIiwiRS1DQVJURUJMRVVFIiwiVklTQSIsIlZJU0FfREVCSVQiLCJNQVNURVJDQVJEIiwiTUFTVEVSQ0FSRF9ERUJJVCIsIlZJU0FfRUxFQ1RST04iLCJNQUVTVFJPIl0sImNhdGVnb3JpZXMiOnsiZGViaXRDcmVkaXRDYXJkcyI6eyJhcHBJZCI6ImNhcmRzIiwicGFyYW0iOlsiTUFFU1RSTyIsIkUtQ0FSVEVCTEVVRSIsIk1BU1RFUkNBUkRfREVCSVQiLCJNQVNURVJDQVJEIiwiVklTQSIsIlZJU0FfRUxFQ1RST04iLCJWSVNBX0RFQklUIiwiQ0IiXX19LCJjYXJkcyI6eyJNQUVTVFJPIjp7ImZpZWxkcyI6eyJzZWN1cml0eUNvZGUiOnsicmVxdWlyZWQiOmZhbHNlfX0sImNvcHlGcm9tIjoiY2FyZHMuREVGQVVMVCJ9LCJFLUNBUlRFQkxFVUUiOnsiY29weUZyb20iOiJjYXJkcy5ERUZBVUxUIn0sIk1BU1RFUkNBUkRfREVCSVQiOnsiY29weUZyb20iOiJjYXJkcy5ERUZBVUxUIn0sIk1BU1RFUkNBUkQiOnsiY29weUZyb20iOiJjYXJkcy5ERUZBVUxUIn0sIlZJU0EiOnsiY29weUZyb20iOiJjYXJkcy5ERUZBVUxUIn0sIlZJU0FfRUxFQ1RST04iOnsiZmllbGRzIjp7InNlY3VyaXR5Q29kZSI6eyJyZXF1aXJlZCI6ZmFsc2V9fSwiY29weUZyb20iOiJjYXJkcy5ERUZBVUxUIn0sIkRFRkFVTFQiOnsiZmllbGRzIjp7InBhbiI6eyJtaW5MZW5ndGgiOjEwLCJtYXhMZW5ndGgiOjE5LCJ2YWxpZGF0b3JzIjpbIk5VTUVSSUMiLCJMVUhOIl0sInJlcXVpcmVkIjp0cnVlLCJzZW5zaXRpdmUiOnRydWUsImhpZGRlbiI6ZmFsc2UsImNsZWFyT25FcnJvciI6ZmFsc2V9LCJleHBpcnlEYXRlIjp7InJlcXVpcmVkIjp0cnVlLCJzZW5zaXRpdmUiOnRydWUsImhpZGRlbiI6ZmFsc2UsImNsZWFyT25FcnJvciI6ZmFsc2V9LCJzZWN1cml0eUNvZGUiOnsibWluTGVuZ3RoIjozLCJtYXhMZW5ndGgiOjMsInZhbGlkYXRvcnMiOlsiTlVNRVJJQyJdLCJyZXF1aXJlZCI6dHJ1ZSwic2Vuc2l0aXZlIjp0cnVlLCJoaWRkZW4iOmZhbHNlLCJjbGVhck9uRXJyb3IiOnRydWV9fX0sIkNCIjp7ImNvcHlGcm9tIjoiY2FyZHMuREVGQVVMVCJ9LCJWSVNBX0RFQklUIjp7ImNvcHlGcm9tIjoiY2FyZHMuREVGQVVMVCJ9fSwicGFzc0FjdGl2YXRlZCI6dHJ1ZSwiYXBpUmVzdFZlcnNpb24iOiI0LjAifQ6a02"
    KRGlue.loadLibrary(ENDPOINT, PUBLIC_KEY) /* Load the remote library */
      .then(({ KR }) =>
        KR.setFormConfig({
          /* set the minimal configuration */
          formToken: formToken,
          "kr-language": "fr-FR" /* to update initialization parameter */
        })
      )
      .then(({ KR }) => 
        KR.addForm("#myPaymentForm")
      ) /* add a payment form  to myPaymentForm div*/
      .then(({ KR, result }) => {
        
        KR.showForm(result.formId)
        KR.button.onClick(() => this.sendLoader(true));
        KR.onSubmit((event) => this.sendResponse(event))
        
      }) /* show the payment form */
      .catch(error => {
        this.sendLoader(false)
        this.setState({
          promiseError: error + " (see console for more details)"
        })
      });
  }

  sendLoader(state) {
    console.log("sendLoader onClick:")
    const data = { isLoading: state };

    setTimeout(() => {
      window.ReactNativeWebView.postMessage(JSON.stringify(data))
    }, 100)
  }

  sendResponse(response) {
    if (response.clientAnswer.orderStatus === "PAID") {
      console.log("sendResponse onClick::::", response)
      const data = { isLoading: false, response  };
      setTimeout(() => {
        window.ReactNativeWebView.postMessage(JSON.stringify(data))
      }, 100)
      document.getElementById("paymentSuccessful").style.display = "block";

    } else {
      console.log("sendResponse onClick::::", response)
      const data = { isLoading: false, response  };
      setTimeout(() => {
        window.ReactNativeWebView.postMessage(JSON.stringify(data))
      }, 100)
    }
  }
}

export default App;
