import React , {useEffect} from 'react'

function Success() {

   const updateOrder=async()=>{
     let pathArr = window.location.href.split("/");
     let id = pathArr[pathArr.length-1];
     console.log("id is" , id);
     try{

     }catch(err){
      console.log(err);
     }
   }

  useEffect(()=>{
    updateOrder();
  },[]);

  return (
    <div>
      <h1>success</h1>
    </div>
  )
}

export default Success
