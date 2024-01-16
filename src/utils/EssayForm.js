import { Card, CardContent, FormControl, FormHelperText, Input, InputLabel } from "@mui/material"
import { purple } from "@mui/material/colors"
import React from "react"



    const style = {
        // position: "absolute",
        top: "50%",
        left: "50%",
        // transform: "translate(-50%,-50%)",
        padding: "50px",
    }

    
    const MultiPageForm = () => {
        
    const metaData = ()=> {
        return(<>
     <FormControl>
  <InputLabel htmlFor="my-input">Email address</InputLabel>
  <Input id="my-input" aria-describedby="my-helper-text" />
  <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>

  <InputLabel htmlFor="my-input">Email address</InputLabel>
  <Input id="my-input" aria-describedby="my-helper-text" />
  <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>


  <InputLabel htmlFor="my-input">Email address</InputLabel>
  <Input id="my-input" aria-describedby="my-helper-text" />
  <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>


  <InputLabel htmlFor="my-input">Email address</InputLabel>
  <Input id="my-input" aria-describedby="my-helper-text" />
  <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>

</FormControl>

        </>)
     

        }
    


     return (
            <div style={style}>
                <div style={{ width: "100%", height: "500px", backgroundColor: "red" }}>
                    <div style={{ display: "flex", flexDirection: "row" }} className="container">
                        <div style={{ width: "30%", height: "500px", backgroundColor: "purple" }} className="left-panel">
                            {/* Content for left panel */}
                        </div>
                        <div style={{ width: "70%", height: "500px", backgroundColor: "pink" }} className="right-panel">
                          {metaData()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
    export default MultiPageForm;
    