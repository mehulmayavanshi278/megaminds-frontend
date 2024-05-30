import React, { useContext, useEffect, useState } from 'react'
import Header from '../Header'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import ClearIcon from '@mui/icons-material/Clear';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import userService from '../../service/user.service';
import { MyContext } from '../../App';
import { toast } from 'react-toastify';
import cartService from '../../service/cart.service';
const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

const AccDetails = ({userInfo})=>{
  console.log(userInfo)
  const {userData , setUserData} = useContext(MyContext);

  const handleOnChange = (e)=>{
    const {name , value} = e.target;
    setUserData({...userData , [name]:value});
  }
  
  const [user , setUser] = useState({...userInfo});

 const  handleUpdateBtn = async()=>{
    console.log(userData)
    try{
      const res = await userService.update(userData);
      if(res?.status===200){
        toast.success("updated successfully");
      }
    }catch(err){
      console.log(err);
      if (err.response && err.response.status === 400) {
        toast.error(err?.response?.data?.message);
        return;
     }
    }
  }
  useEffect(()=>{
     
  },[])
    return(
        <>
         <div className=''>
            <div className='flex flex-row justify-start gap-[10px] items-center'>
                <AccountCircleIcon style={{fontSize:"42px"}}/>
                <p className='text-[32px]'>Account Details</p>
            </div>
            <div className='lg:w-[600px] w-full'>
                <div className='lg:grid grid-cols-2 gap-[15px]'>
                <div className=''>
                    <p className='text-[#976363] font-[600] py-2'>First Name*</p>
                    <input className='border border-1px py-2 px-2 w-full outline-none' type="text"  onChange={(e)=>{handleOnChange(e)}} name="firstName" value={userData?.firstName} />
                </div>
                <div className=''>
                    <p className='text-[#976363] font-[600] py-2'>Last Name*</p>
                    <input className='border border-1px py-2 px-2 w-full outline-none' type="text"  onChange={(e)=>{handleOnChange(e)}} name="lastName" value={userData?.lastName} />
                </div>
                </div>
                <div className=''>
                <div className=''>
                    <p className='text-[#976363] font-[600] py-2'>Display Name*</p>
                    <input className='border border-1px py-2 px-2 w-full outline-none' type="text"   name="" value="" />
                </div>
                <div className=''>
                    <p className='text-[#976363] font-[600] py-2'>Email*</p>
                    <input className='border border-1px py-2 px-2 w-full outline-none' type="text"  onChange={(e)=>{handleOnChange(e)}} name="email" value={userData?.email} />
                </div>
                <div className=''>
                    <p className='text-[#976363] font-[600] py-2'>Phone*</p>
                    <input className='border border-1px py-2 px-2 w-full outline-none' type="Number" onChange={(e)=>{handleOnChange(e)}} name="phoneNo" value={userData?.phoneNo} />
                </div>
                </div>

                <div className='text-center bg-[black] mt-3 rounded-[3px] py-2 cursor-pointer hover:bg-[#494141]' onClick={handleUpdateBtn}>
                      <h1 className='text-white text-[16px]'>Save Changes</h1>
                    </div>

               
            </div>
         </div>
        </>
    )
}

const BillingAddress = () =>{

  const [selectedState, setSelectedState] = useState('');
  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };


  useEffect(()=>{
   
  },[]);
    return(
        <>
        <div className=''>
        <div className='flex flex-row justify-start gap-[10px] items-center'>
                <LocationOnIcon style={{fontSize:"42px"}}/>
                <p className='text-[32px]'>Billing Address</p>
            </div>
            <div className='lg:w-[600px] w-full'>
            <div className='lg:grid grid-cols-2 gap-[15px]'>
                <div className=''>
                    <p className='text-[#976363] font-[600] py-2'>First Name*</p>
                    <input className='border border-1px py-2 px-2 w-full outline-none' type="text" name="" value="" />
                </div>
                <div className=''>
                    <p className='text-[#976363] font-[600] py-2'>Last Name*</p>
                    <input className='border border-1px py-2 px-2 w-full outline-none' type="text" name="" value="" />
                </div>
               
                </div>
                <div className='mt-3'>
                    <p className='text-[#976363] font-[600] py-2'>Country* <span className=' text-black py-2'>India</span></p>
                    
                </div>
                <FormControl fullWidth margin="normal">
      <InputLabel id="state-label">State</InputLabel>
      <Select
        labelId="state-label"
        value={selectedState}
        onChange={handleStateChange}
        label="State"
      >
        {states.map((state) => (
          <MenuItem key={state} value={state}>
            {state}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

    <div className=''>
                    <p className='text-[#976363] font-[600] py-2'>City*</p>
                    <input className='border border-1px py-2 px-2 w-full outline-none' type="text" name="" value="" />
                </div>

                <div className=''>
                    <p className='text-[#976363] font-[600] py-2'>Address Line 1*</p>
                    <input className='border border-1px py-2 px-2 w-full outline-none' type="text" name="" value="" />
                </div>
                <div className=''>
                    <p className='text-[#976363] font-[600] py-2'>Address Line 2</p>
                    <input className='border border-1px py-2 px-2 w-full outline-none' type="text" name="" value="" />
                </div>
                <div className=''>
                    <p className='text-[#976363] font-[600] py-2'>Pincode</p>
                    <input className='border border-1px py-2 px-2 w-full outline-none' type="Number" name="" value="" />
                </div>
                <div className=''>
                    <p className='text-[#976363] font-[600] py-2'>Phone</p>
                    <input className='border border-1px py-2 px-2 w-full outline-none' type="Number" name="" value="" />
                </div>
                <div className=''>
                    <p className='text-[#976363] font-[600] py-2'>Email</p>
                    <input className='border border-1px py-2 px-2 w-full outline-none' type="Email" name="" value="" />
                </div>
                <div className='text-center bg-[black] rounded-[3px] py-2 cursor-pointer hover:bg-[#494141] mt-4'>
                      <h1 className='text-white text-[16px]'>Save Changes</h1>
                    </div>
            </div>
        </div>
        </>
    )
}




const createData = (orderDetails, shippingAddress, timeline, status, quantity) => {
  return { orderDetails, shippingAddress, timeline, status, quantity };
};

// Sample data
const rows = [
//   createData('Order #123', '123 Main St, City, State, 12345', '2024-05-26', 'Shipped', 3),
//   createData('Order #124', '456 Elm St, City, State, 67890', '2024-05-27', 'Processing', 1),
//   createData('Order #125', '789 Oak St, City, State, 11223', '2024-05-28', 'Delivered', 2),
//   createData('Order #126', '101 Pine St, City, State, 44556', '2024-05-29', 'Cancelled', 5),
//   createData('Order #127', '202 Birch St, City, State, 77889', '2024-05-30', 'Pending', 4),
];

const OrderTable = (props) => {
  const [isOpenPopUp , setIsOpenPopUp] = useState(false);
  const openPopUp = ()=>{
    setIsOpenPopUp(true);
    document.body.style.overflow="hidden";
  }
  const closePopUp = ()=>{
    setIsOpenPopUp(false);
    document.body.style.overflow="";
  }
  return (

    <>

   
<div
        className={`absolute top-0 left-0 h-full w-full z-50 bg-[#2e2b2b] opacity-[0.6] ${
          isOpenPopUp ? "block" : "hidden"
        }`}
        onClick={closePopUp}
      ></div>

    <TableContainer component={Paper}>
      <Table aria-label="order table">
        <TableHead>
          <TableRow>
            <TableCell style={{color:"#666",fontWeight:"600"}}>Product</TableCell>
            <TableCell style={{color:"#666",fontWeight:"600"}}>Quantity</TableCell>
            <TableCell style={{color:"#666",fontWeight:"600"}}>Shipping Address</TableCell>
            <TableCell style={{color:"#666",fontWeight:"600"}}>Date</TableCell>
            <TableCell style={{color:"#666",fontWeight:"600"}}>Payment</TableCell>
            <TableCell style={{color:"#666",fontWeight:"600"}}>Status</TableCell>
        
          </TableRow>
        </TableHead>
        <TableBody>
         
            <TableRow>
              <TableCell onClick={()=>{openPopUp()}}>
                <div className='flex flex-row'>
                <div className='w-[50px] h-[70px]  bg-[red] '>
            <img className='w-full h-full object-cover' src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1656077250-13442792-1424913539756896.jpg?crop=1xw:1.00xh;center,top&resize=980:*" alt=''/>
        </div>
        <div className='px-2'>
            <div className='w-[100px]'>
                <p className='text-[#666] text-[12px]'>Ayuirvedic</p>
                <h1 className='text-[black] text-[13px] py-1'>Nuturemite Amla Powder andihieo  febf fbeub </h1>
            </div>
        </div>
                </div>
              </TableCell>
              <TableCell>3</TableCell>
              <TableCell>21 ananta aastha , waghodia , vadodara.... </TableCell>
              <TableCell>25 May</TableCell>
              <TableCell>paid <BeenhereIcon/></TableCell>
              <TableCell>pending</TableCell>
            
            </TableRow>
         
        </TableBody>
      </Table>
    </TableContainer>

    {
      isOpenPopUp &&  <div className=' w-[800px] bg-white z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-[5px]'>
         <div className='absolute right-0 top-0 p-4 '>
          <ClearIcon style={{cursor:"pointer"}} onClick={closePopUp}/>
         </div>
            <div className='mt-3'>
                    <p className='text-black font-[600] py-2'>Details</p>
                </div>

               <div className='grid grid-cols-[1fr,1fr] gap-2'>
                    <div className=''>
                    <div className='mt-3'>
                    <p className='text-[#976363] font-[600] pt-2'>Quantity <span className='text-black'>5</span></p>
                </div>
                <div className='mt-3'>
                    <p className='text-[#976363] font-[600] pt-2'>Status: <span className='text-black'>delievered</span></p>
                </div>
                <div className='mt-3'>
                    <p className='text-[#976363] font-[600] pt-2'>Payment Status: <span className='text-black'>Paid <BeenhereIcon/></span></p>
                </div>
                <div className='mt-3'>
                    <p className='text-[#976363] font-[600] pt-2'>Order Date: <span className='text-black'> 21jan</span></p>
                </div>
                <div className='mt-3'>
                    <p className='text-[#976363] font-[600] pt-2'> Deliever Date: <span className='text-black'> not deliever</span></p>
                </div>
                    </div>
                    <div className=''>
                    <div className='flex flex-row items-center'>
                <div className='w-[150px] h-[170px]  bg-[red] '>
            <img className='w-full h-full object-cover' src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1656077250-13442792-1424913539756896.jpg?crop=1xw:1.00xh;center,top&resize=980:*" alt=''/>
        </div>
        <div className='px-2'>
            <div className='w-[100px]'>
                <p className='text-[#666] text-[12px]'>Ayuirvedic</p>
                <h1 className='text-[black] text-[16px] py-1'>Nuturemite Amla Powder andihieo  febf fbeub </h1>
            </div>
        </div>
                </div>
                    </div>
               </div>

                <div className='mt-3  h-[1px] bg-[#666]'>

                </div>
          
                <div className=''>
                <div className='mt-2'>
                    <p className='text-black font-[600] pt-2'>Customer Details</p>
                </div>
                <div className='flex flex-row items-center gap-3 pt-2 mt-3'>
                <p className='text-[#976363] font-[600]  items-center'> shipping Address:</p>
                  <p>ananta aastha cnuhuhf wfwfuhf fffufbwfebwf wfwfiwfhw</p>
                </div>
                <div className='mt-3'>
                    <p className='text-[#976363] font-[600] pt-2'>Phone: <span className='text-black'> 9726165469</span></p>
                </div>
                <div className='mt-3'>
                    <p className='text-[#976363] font-[600] pt-2'>Email: <span className='text-black'> mehulmayavanshi953@gmail.com</span></p>
                </div>

   
      
                </div>

                
            </div>
    }
     </>
  );
};



const Orders  =()=>{
    return(
        <>
            <div className=''>
            <div className='flex flex-row justify-start gap-[10px] items-center'>
                <LocalShippingIcon style={{fontSize:"42px"}}/>
                <p className='text-[32px]'>Orders</p>
            </div>
            <OrderTable />
           
            <div className='text-center bg-[black] rounded-[3px] py-2 cursor-pointer hover:bg-[#494141] mt-4'>
                      <h1 className='text-white text-[16px]'>Go to Shop</h1>
                    </div>
            </div>
        </>
    )
}

function Myaccount() {


  const {
    categoryType,
    setCategoryType,
    products,
    setProducts,
    displayedProducts,
    setDisplayedProducts,
    productsLength,
    setProductsLength,
    setCartLength,
    userData,
    setUserData,
    refresher,
    setRefresher,
    cartItems,
    setCartItems,
  } = useContext(MyContext);
  const [cartItemtmp, setCartItemtmp] = useState();
 const [option , setOption] = useState("AccDetails");
 const options = [
    "AccDetails",
    "Orders",
    "Downloads",
    "Address",
    "WishLists",
    "Logout",
 ]



 const getUserData=async()=>{
   try{
     const res = await userService.getUser();
     if(res?.status===200){
       console.log(res.data);
       setUserData({...res.data});
     }
   }catch(err){
     console.log(err);
     if (err.response && err.response.status === 400) {
      toast.error(err?.response?.data?.message);
      return;
   }
   }
 }

 const getCartItems = async () => {
  try {
    const res = await cartService.getCartItems();
    if (res?.status === 200) {
      setCartItems([...res.data]);
      const tmp = [...res.data].map((elm, id) => {
        return { ...elm.productDetails, quantity: 1 };
      });
      console.log("tmp", tmp);
      setCartItemtmp(tmp);
      setCartLength(res.data.length);
    }
  } catch (err) {
    console.log(err);
  }
};
 useEffect(()=>{
  getUserData();
 },[])
 
  return (
    <>
      <Header getCartProducts={getCartItems}
        setCartItemtmp={setCartItemtmp}
        cartItemtmp={cartItemtmp}/>



      <div className='lg:px-[100px] md:px-[40px] px-[10px] lg:py-[50px] py-[10px]'>
        <div className='lg:grid lg:grid-cols-[300px,1fr] md:grid-cols-[200px,1fr] gap-[20px]'>
            <div className=''>
               <div className='sticky top-0'>
                 <div className='py-4 px-3'>
                   <ul className='flex lg:flex-col flex-wrap gap-2'>
                   {
                    options.map((elm , id)=>{
                        return(
                            <>
                   <li key={id} className={`text-[14px] font-[700] pt-2 ${elm===option ? 'border-[#6060e6] border-l-[4px] ps-[8px] text-black ' : 'ps-[12px] '} rounded-[1px]   text-[#666]  pb-2`} onClick={()=>{setOption(elm)}}>{elm}</li>
                                
                            </>
                        )
                    })
                   }

                   </ul>
                 </div>
            </div>
            </div>
            <div className='bg-white rounded-[4px] p-4'>
                {option==="AccDetails" && <AccDetails userInfo={{...userData}} /> } 
                {option==="Orders" && <Orders/> } 
                {option==="Address" && <BillingAddress/> } 
            </div>
        </div>
      </div>
    </>
  )
}

export default Myaccount
