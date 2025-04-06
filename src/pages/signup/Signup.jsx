import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../signup/signup.css"
import { FileUpload } from '@mui/icons-material';
import axios from 'axios';

export default function Signup() {
  const [errorMessage,setErrorMessage] = useState("");
  const [inputs,setInputs] = useState();
  const [img,setImg] = useState(undefined);
  const navigate = useNavigate()

  const handleInput = (e) => {

    if(e.target?.name=='password'){
       try{
         const test = validatePassword(e.target?.value)
         console.log("correcy",test)
         if(test == 'ok'){

           setErrorMessage("")
         }
        }catch(e){
          setErrorMessage(e?.response?.data?.message);
        }

      }else{
        setErrorMessage()
      }
        setInputs((prev)=>{
          return {...prev,[e.target.name]:e.target.value}
        })
  }

  const handleImageUpload = async(file) => {
    console.log(file)
    const data = new FormData()
    data.append("file",file);
    data.append("upload_preset","first_time_cloudinnary")
    data.append("cloud_name","dnitpjr1v")

    const res = await fetch("https://api.cloudinary.com/v1_1/dnitpjr1v/image/upload",{
        method:"POST",
        body:data
    })

    const imageUrl = await res.json()
    console.log("image urlk",imageUrl)

    setInputs((prev)=>{
        return {...prev, profilePicture:imageUrl.url}
    })

  }

  const validName = (name) => {
    const nameRegex = /^[a-zA-Z0-9\s'-]+$/;

    if(!nameRegex.test(name)){
      const err = new Error();
      err.response = { data: { message: "invalid user" } };

      throw err
    }
  }

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

    console.log("check",password,passwordRegex.test(password))
    if (!passwordRegex.test(password)) {
      const err = new Error();
      err.response = { data: { message: "Password should contain atleast one caps,one special char,one number, should be btw 8-16 char" } };
      throw err
    }

    return "ok";
};

  const validateEmail = (mail) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // try {
      if (!emailRegex.test(mail)) {
        const err = new Error();
        err.response = { data: { message: "invalid email" } };

        throw err
      }
    //   setErrorMessage(""); // Clear error if valid
    // } catch (err) {
    //   setErrorMessage(err.message); // Store error message in state
    // }


  }

  const handleSubmit = async() => {
    try{
      if(!inputs) return setErrorMessage("enter inputs")

      validName(inputs.name);
      validateEmail(inputs.email);
      validatePassword(inputs?.password)

      if(!inputs.password){
        return setErrorMessage("enter password")
      }
      await axios.post(`${process.env.REACT_APP_URL}/user/signup`,{...inputs},{withCredentials:true})
      navigate("/")
    }catch(e){
      console.log(e?.response?.data?.message)
      setErrorMessage(e?.response?.data?.message);
    }
  }

  console.log(inputs)


  useEffect(()=>{
    img && handleImageUpload(img)
  },[img])

  return (
    <div>
          <div className='signUpContainer'>
      <div className="signUpFormContainer">
           <div className="signUpFormContainerLeft">
             <div className="kartwiseLogo">
                kartwise
             </div>
             <span>Want to track your expense. Absolutely you are at right place!</span>
           </div>
           <div className="signUpFormContainerRight">
             <div className="signUpFormWrapper">
                <div className="inputHolder">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" placeholder='Enter name' className='signUpFormInput' autoComplete='off' onChange={(e)=>handleInput(e)} />
                </div>
                <div className="inputHolder">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder='Enter email' className='signUpFormInput' autoComplete='off' onChange={(e)=>handleInput(e)} />
                </div>
                <div className="inputHolder">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder='password' className='signUpFormInput' autoComplete='new-password' onChange={(e)=>handleInput(e)}/>
                </div>
                <div className="inputHolder">
                    <label htmlFor="picture">Upload pic</label>
                    <div className="evidenceAttachContainer">
                      <FileUpload/>
                      <input placeholder='upload image' name="imgUrl" onChange={(e)=>setImg(e.target.files[0])} type='file' accept='image/*'/>
                    </div>
                </div>


                   <button className='submitSignin' onClick={handleSubmit}>Submit</button>

               {errorMessage && <div className="ErrorContainer">
                {errorMessage}
              </div>}
             </div>

           </div>
      </div>
    </div>
    </div>
  )
}
