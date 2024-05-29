import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import GoogleButton from "react-google-button";
import { Box, Typography, Button } from "@mui/material";
import { toast } from "react-toastify";
import userService from "../../service/user.service";
import tokenHelper from "../../Helper/tokenHelper";
import { MyContext } from "../../App";


const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  phoneNo: yup.string().required("Phone number is required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),

});

function Signup(props) {

  const {refresher , setRefresher} = useContext(MyContext)
  const [signupData, setSignupData] = useState({
    email: "",
    phoneNo: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleSignInOnChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error message on change
  };

  const handleSignInBtn = async () => {
    try {
      await schema.validate(signupData, { abortEarly: false });
      console.log(signupData);
      const res = await userService.signup(signupData);
      if(res?.status===200){
        console.log(res.data);
        props.openLogin();
        setRefresher(refresher+1)
      }
      // Proceed with form submission
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error(err?.response?.data?.message);
        return;
     }
      const formattedErrors = err?.inner?.reduce((acc, err) => {
        return { ...acc, [err.path]: err.message };
      }, {});
      setErrors(formattedErrors);
      toast.error("Please fix the errors in the form.");
    }
  };

  return (
    <div className="p-[30px] md:w-[500px] w-[90%] md:h-auto rounded-[4px] bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
      <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>

        <Box mb={2}>
          <input
            name="firstName"
            placeholder="First Name"
            value={signupData.firstName}
            onChange={handleSignInOnChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors?.firstName && (
            <p className="text-red-500 text-sm">{errors?.firstName}</p>
          )}
        </Box>
        <Box mb={2}>
          <input
            name="lastName"
            placeholder="Last Name"
            value={signupData.lastName}
            onChange={handleSignInOnChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors?.lastName && (
            <p className="text-red-500 text-sm">{errors?.lastName}</p>
          )}
        </Box>
        <Box mb={2}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={signupData.email}
            onChange={handleSignInOnChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors?.email && (
            <p className="text-red-500 text-sm">{errors?.email}</p>
          )}
        </Box>
        <Box mb={2}>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={signupData.password}
            onChange={handleSignInOnChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors?.password && (
            <p className="text-red-500 text-sm">{errors?.password}</p>
          )}
        </Box>
        <Box mb={2}>
          <input
            name="phoneNo"
            placeholder="Phone Number"
            value={signupData.phoneNo}
            onChange={handleSignInOnChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors?.phoneNo && (
            <p className="text-red-500 text-sm">{errors?.phoneNo}</p>
          )}
        </Box>
        <Button
          variant="contained"
          color="primary"
          type="button"
          fullWidth
          onClick={handleSignInBtn}
        >
          Register
        </Button>

        <div className="mt-3">
          <p className="text-[#8a7171] text-[12px] text-center">
            if Already have an Account?
          </p>
          <Button
            className="w-full"
            type="button"
            color="success"
            onClick={props.openLogin}
          >
            Login
          </Button>
        </div>
      </Box>
    </div>
  );
}

export default Signup;


export const Login = (props) => {



 const{refresher , setRefresher} = useContext(MyContext)
  
  const [errors, setErrors] = useState({});
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  

  const handleLoginOnChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    setErrors({ ...errors, [name]: "" }); 
  };

  const handleLoginBtn = async()=>{
    try {
      await loginSchema.validate(loginData, { abortEarly: false });
      console.log(loginData);
      const res = await userService.login(loginData);
      if(res?.status===200){
        console.log(res.data);
        tokenHelper.create("token" , res.data.token);
        props.closePopUp();
        setRefresher(refresher+1)
      }
      
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 400) {
       toast.error(err?.response?.data?.message);
       return;
    }
      const formattedErrors = err?.inner?.reduce((acc, err) => {
        return { ...acc, [err.path]: err.message };
      }, {});
      setErrors(formattedErrors);
      console.log(formattedErrors)
      toast.error("Please fix the errors in the form.");
    }
  }
  return (
    <div className="p-[30px] md:w-[500px] w-[90%] md:h-auto h-[400px] rounded-[4px] bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
      <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
     
          <Box mb={2}>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={loginData?.email}
              onChange={handleLoginOnChange}
              className="w-full px-3 py-2 border rounded-md"
            />
            {errors?.email && (
              <p className="text-red-500 text-sm">{errors?.email}</p>
            )}
          </Box>
          <Box mb={2}>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={loginData?.password}
              onChange={handleLoginOnChange}
              className="w-full px-3 py-2 border rounded-md"
            />
            {errors?.password && (
              <p className="text-red-500 text-sm">{errors?.password}</p>
            )}
          </Box>
          <Button
          className
            sx={{ py: 2 }}
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            onClick={handleLoginBtn}
          >
            Login
          </Button>
          <div className="mt-3">
            <GoogleButton className="w-full" style={{ width: "100%" }} />
          </div>

      </Box>
    </div>
  );
};
