import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header'
import SearchIcon from '@mui/icons-material/Search';
import Recentryviewed from '../../components/Homepage/Recentryviewed';
import Imageslider from '../../components/Homepage/Imageslider';
import Weekspecial from '../../components/products/Weekspecial';
import Latestblog from '../../components/products/Latestblog';
import Footer from '../../partials/Footer';
import Banner from '../../components/products/Banner';
import productService from '../../service/product.service';
import { MyContext } from '../../App';
import { toast } from 'react-toastify';
import cartService from '../../service/cart.service';



export const categories = [
  'Antioxidants',
  'Ayurvedic',
  'Digestive Health',
  'General Health',
  'Herbal Speciality Supplements',
  'Men Health',
  'Organic',
  'Personal Care',
  'Sexual Health',
  'Vitamines And Minarels',
  'Women Health'
];

export const CategorySideBar = ()=>{

  const [currCategory , setCurrCategory] = useState(null);
  const {categoryType , setCategoryType} = useContext(MyContext);

  // window.addEventListener('scroll', function() {
  //   var div = document.getElementById('categorySideBar');
  //   var scrollPosition = window.scrollY;
  
  //   // Define the y position where you want to make the div fixed
  //   var threshold = 0;
  
  //   // Check if the scroll position is greater than or equal to the threshold
  //   if (scrollPosition >= threshold) {
  //     div.classList.add('sticky');
  //   } else {
  //     div.classList.remove('sticky');
  //   }
  // });


  useEffect(()=>{
    const cat = window.location.href;
    console.log(cat)
    if (cat.includes("/products")) {
      console.log(cat.split("products/")[1].split("%20").join(" "));
      
      setCurrCategory(cat.split("products/")[1].split("%20").join(" "))
      setCategoryType(cat.split("products/")[1].split("%20").join(" "))
    }
    
   
    // console.log(cat.split("products/")[1].split("%20").join(" "));
  },[]);

  

  return(
    <>
             <div className='sticky top-0 z-0 w-[250px]'>

            
              <div className=' shadow-lg rounded-[5px] ps-3 py-3 bg-[white] lg:block hidden' id="categorySideBar">
             <p className='text-[#666] text-[18px]'>Categories</p>
             <div className='ps-[10px] pt-3'>
                <ul>


                {categories?.map((elm)=>{
                  return(
                    <>
                    <li className={`text-[14px]  hover:underline py-2 ps-3 ${currCategory===elm ? 'text-[red] underline' : 'text-[#666]'}`} onClick={()=>{setCurrCategory(elm)}}> <a href={`/products/${elm}`}> {elm} </a></li>
                    </>
                  )
                })}

                    {/* <li className='text-[14px] text-[#666] py-2 ps-3'>Antioxidants</li>
                    <li className='text-[14px] text-[#666] py-2 ps-3'>Ayurvedic</li>
                    <li className='text-[14px] text-[#666] py-2 ps-3'>Digestive Health</li>
                    <li className='text-[14px] text-[#666] py-2 ps-3'>General Health</li>
                    <li className='text-[14px] text-[#666] py-2 ps-3'>Herbal Speciality Suppliments</li>
                    <li className='text-[14px] text-[#666] py-2 ps-3'>Men Health</li>
                    <li className='text-[14px] text-[#666] py-2 ps-3'>Organic</li>
                    <li className='text-[14px] text-[#666] py-2 ps-3'>Personal Care</li>
                    <li className='text-[14px] text-[#666] py-2 ps-3'>Sexual Health</li>
                    <li className='text-[14px] text-[#666] py-2 ps-3'>Vitamines And Minarels</li>
                    <li className='text-[14px] text-[#666] py-2 ps-3'>Women Health</li> */}
                </ul>
             </div>

             <div className='pt-4 p-2'>
                <p className='text-[#666] text-[18px]'>Treading Search</p>
                <div className=''>
                    <ul>
                        <li className=' text-[14px] text-[#666] py-1 ps-3 flex flex-row gap-2 items-center'>  <SearchIcon style={{fontSize:"18px"}}/> <p>ayuurvedic powder</p> </li>
                    </ul>
                </div>
             </div>
      </div>
      </div>
    </>
  )
}

function Homepage() {  


  const [products , setProducts] = useState();
  const {setCartLength , cartItems ,  setCartItems} = useContext(MyContext)

  const getProducts = async(query)=>{
    try{
     const res = await productService.getproducts(query);
     if(res?.status===200){
      console.log(res.data);
      setProducts([...res.data.data])
     }
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    getProducts("");

  },[])
  return (
    <> 


      <Header/>

      <div className='lg:px-[100px] md:px-[40px] py-3'>
      <div className="lg:grid lg:grid-cols-[1fr,4fr] grid-cols-[1fr,500px] gap-3  relative">
        <div className='relative w-full'>
        <CategorySideBar/>
        </div>
       

      <div className='xl:grid xl:grid-rows-[1fr,1fr] grid-rows-[350px,600px] xl:gap-y-2'>
         <div className=' md:block 2xl:grid xl:grid-cols-[3fr,1fr] xl:gap-3 md:gap-1 xl:w-full lg:w-[600px]'>
               <div className='xl:w-full  2xl:h-full md:h-[350px] h-[250px] '>
                  <Imageslider/>
               </div>
               <div className='border md:none xl-block bg-[white] shadow-lg border-1px p-3'>
                   <div className=''>
                     <p className='text-[#666] text-[15px]'>Your Cart</p>
                     <p className='text-[#666] text-[14px] font-[600]'>There are two items in your cart</p>
                   </div>

                   <div className='flex flex-row justify-start gap-3 mt-2 bg-[#fafafa] p-3'>
                    <div className='w-[60px] h-[80px]'>
                      <img className='w-full h-full object-cover' src='https://th.bing.com/th/id/OIG4.LgUj9FIjzUbdTSMn0mRg' alt=''/>
                    </div>
                    <div className=''>
                       <p className='text-[#666] text-[14px]'>nwfn fbofbf fwifwfw </p>
                       <p className='text-[#666] text-[14px]'>Rs 612 </p>
                    </div>
                   </div>

                   <div className='flex flex-row justify-start gap-3 mt-2 bg-[#fafafa] p-3'>
                    <div className='w-[60px] h-[80px]'>
                      <img className='w-full h-full object-cover' src='https://th.bing.com/th/id/OIG4.LgUj9FIjzUbdTSMn0mRg' alt=''/>
                    </div>
                    <div className=''>
                       <p className='text-[#666] text-[14px]'>nwfn fbofbf fwifwfw </p>
                       <p className='text-[#666] text-[14px]'>Rs 612 </p>
                    </div>
                   </div>

                   <div className=''>
                    <div className='text-center bg-[black] rounded-[3px] py-2 cursor-pointer hover:bg-[#494141]'>
                      <h1 className='text-white text-[16px]'>View All</h1>
                    </div>
                   </div>

               </div>
         </div>
         <div className='bg-[white] md:mt-0 mt-3 border border-solid shadow-lg'>
            <div className='p-2'>
                <p className='text-[20px] font-sans font-[600] px-[20px] text-center'>Recently Viewed Products</p>
            </div>
            <div className=' pb-3 '>
              

              <div className=''>
              <Recentryviewed/>
              </div>

            </div>
         </div>
      </div>
    <div className=''>

    </div>
</div>


     


      </div>


      <div className='md:px-[100px] px-[10px] bg-[#f1f1ff] md:pb-[50px] pb-[10px]'>
    <Weekspecial/>
    <Banner/>
    <Latestblog/>
    </div>
    <Footer/>
      
    </> 
  )
}

export default Homepage
