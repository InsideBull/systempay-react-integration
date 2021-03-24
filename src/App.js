import React, { useEffect, useState } from "react";
import KRGlue from "@lyracom/embedded-form-glue";
import "./App.css";

const App = ({token, endpoint, publicKey}) => {

  const [promiseError, setPromiseError] = useState(null)

  useEffect(() => {
     KRGlue.loadLibrary(endpoint, publicKey) /* Load the remote library */
      .then(({ KR }) =>
        KR.setFormConfig({
          /* set the minimal configuration */
          formToken: token,
          "kr-language": "fr-FR" /* to update initialization parameter */
        })
      )
      .then(({ KR }) => 
        KR.addForm("#myPaymentForm")
      ) /* add a payment form  to myPaymentForm div*/
      .then(({ KR, result }) => {
        
        KR.showForm(result.formId)
        KR.onSubmit((event) => sendResponse(event))
        
      }) /* show the payment form */
      .catch(error => {
        setPromiseError(error + " (see console for more details)")
      });
  }, [])

    return (
      <div className="form">
        <h1>Paiement</h1>
        <div className="container">
          <div id="myPaymentForm"></div>
        </div>
      </div>
    );
}

export default App;
