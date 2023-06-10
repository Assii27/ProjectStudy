import { useReducer, useState } from "react";

export default function UserReg(){
    const init={
        emailid:"",
        password:"",
        firstname:"",
        lastname:"",
        contactno:"",
        address:"",
        role_id:0

      }

      const[emailid,setEmailid]=useState();
      const[password,setPassword]=useState();
      const[firstname,setFirstname]=useState();
      const[lastname,setLastname]=useState();
      const[contactno,setContactno]=useState();
      const[address,setAddress]=useState();

      const[emailidError,setEmailidError]=useState(false);
      const[passwordError,setPasswordError]=useState(false);
      const[firstnameError,setFirstnameError]=useState(false);
      const[lastnameError,setLastnameError]=useState(false);
      const[contactnoError,setContactnoError]=useState(false);
      const[addressError,setAddressError]=useState(false);
      
      const emailRegix=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      const passwordRegix=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      const firstnameRegix=/^[A-Z][a-z]{1,23}$/ 
      const lastnameRegix=/^[A-Z][a-z]{1,23}$/
      const contactnoRegix=/^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/
      const addressRegix=/^[#.0-9a-zA-Z\s,-]+$/

      const handleEmailid=(e)=>{
        let emailid=e.target.value;
        if(!emailid.match(emailRegix))
        {
          setEmailidError(true);
        }
        else{
          setEmailidError(false);
        }
        setEmailid(emailid);
      }
      const handlePassword=(e)=>{
        let password=e.target.value;
        if(!password.match(passwordRegix))
        {
          setPasswordError(true);
        }
        else{
          setPasswordError(false);
        }
        setPassword(password);
      }

      const handleFirstname=(e)=>{
        let firstname=e.target.value;
        if(!firstname.match(firstnameRegix))
        {
          setFirstnameError(true);
        }
        else{
          setFirstnameError(false);
        }
        setFirstname(firstname);
      }
      const handleLastname=(e)=>{
        let lastname=e.target.value;
        if(!lastname.match(lastnameRegix))
        {
          setLastnameError(true);
        }
        else{
          setLastnameError(false);
        }
        setLastname(lastname);
      }
      const handleContactno=(e)=>{
        let contactno=e.target.value;
        if(!contactno.match(contactnoRegix))
        {
         setContactnoError(true);
        }
        else{
          setContactnoError(false);
        }
        setContactno(contactno);
      }
      const handleAddress=(e)=>{
        let address=e.target.value;
        if(!address.match(addressRegix))
        {
         setAddressError(true);
        }
        else{
          setAddressError(false);;
        }
        setAddress(address);
      }
    
      const reducer=(state,action) => {
          switch(action.type)
          {
            case 'update':
              return{...state,[action.fld]:action.val}
              case 'reset':
                return init;
          }
    
      }
    
      const[info,dispatch]=useReducer(reducer,init);

      const sendData=(e) => {

        e.preventDefault();

        const reqOptions={
         
         method:'POST',
         headers: {'content-type':'application/json'},
         body:JSON.stringify(info)
     
        }
        fetch("http://localhost:8080/regUser",reqOptions)
        .then(resp=>console.log(resp))
      }

      const handleSubmit=(e)=>{

        e.preventDefault();
        alert(e.target[0].value+ "");
      }

    return(
        <div>
            <form className="container-sm" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="emailid">User ID/Email ID:</label>
                <input type="text" className="form-control" id="emailid" name="emailid" placeholder="Enter UserID/Email ID" value={emailid} 
                 onChange={handleEmailid} required/>
              </div>
              <br/>
              {emailidError ? <span style={{color:'red'}}> Invalid Email </span> : " "}
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" className="form-control" id="password" name="password" placeholder="Enter Password" value={password} 
                onChange={handlePassword} required/>
              </div>
              <br/>
              {passwordError? <span style={{color:'red'}}> Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character </span> : " "}
              <div className="form-group">
                <label htmlFor="firstname">First Name:</label>
                <input type="text" className="form-control" id="firstname" name="firstname" placeholder="Enter First Name" value={firstname} 
                onChange={handleFirstname} required />
              </div>
              <br/>
              {firstnameError ? <span style={{color:'red'}}> Invalid Firstname </span> : " "}
              <div className="form-group">
                <label htmlFor="lastname">Last Name:</label>
                <input type="text" className="form-control" id="lastname" name="lastname" placeholder="Enter Last Name" value={lastname} 
                onChange={handleLastname} required/>
              </div>
              <br/>
              {lastnameError? <span style={{color:'red'}}> Invalid Lastname </span> : " "}
              <div className="form-group">
                <label htmlFor="contactno">Contact Number:</label>
                <input type="number" className="form-control" id="contactno" name="contactno" placeholder="Enter Contact number" value={contactno} 
                onChange={handleContactno} required/>
              </div>
               <br/>
               {contactnoError? <span style={{color:'red'}}> Invalid contactno </span> : " "}

              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input type="text" className="form-control" id="address" name="address" placeholder="Enter Address...e.g.North Street, Chennai - 11" value={address} 
                onChange={handleAddress} required/>
              </div>
              <br/>
               {addressError ? <span style={{color:'red'}}> Invalid Address. correct format- e.g.North Street, Chennai - 11 </span> : " "}

              <div className="form-group">
                <label htmlFor="role_id">Role:</label>
                <select className="form-select" id="role_id" name="role_id" placeholder="Enter Role" 
                onChange={(e)=>{dispatch({type:'update',fld:'role_id',val:e.target.value})}} required >
                  <option key={0} value={0}> Select Role </option>
                  <option key={1} value={1}> User </option>
                  <option key={2} value={2}> Seller </option>

                </select>
              </div>
 
              
              <br/>
              <button type="submit" className="btn btn-primary  mx-2" >Register</button>
              <button type="reset" className="btn btn-secondary  mx-2 " onClick={()=>{dispatch({type:'reset'})}}>Clear</button>
            </form>

            <p>{JSON.stringify(info)}</p>
        </div>
    )
}