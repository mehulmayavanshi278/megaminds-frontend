import React , {useState , useEffect , useContext}from 'react'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../App';
import { categories } from '../../pages/Homepage/Homepage';


function CategoriesNavBar() {
    const [currCategory, setCurrCategory] = useState(null);
    const {categoryType , setCategoryType , path , setPath} = useContext(MyContext)
    const history = useNavigate();
    useEffect(() => {
      const cat = window.location.href;
      console.log(cat);
      if (cat.includes("/products")) {
    
        setCurrCategory(cat.split("products/")[1].split("%20").join(" "))
        setPath(cat);
     
      }
     
    }, []);
  
    return (
      <>
        <div className="py-2">
          <ul className="flex flex-wrap justify-start gap-2">
            {categories?.map((elm,id) => {
              return (
                <>

                  <a
                  key={elm}
                    href={`/products/${elm}`}
                    className={`text-[12px] text-[#666]  ps-3 hover:text-red-500 cursor-pointer hover:border-b-2 hover:border-red-500 ${
                      elm === currCategory ? " border-b-2 border-red-500" : ""
                    }`}
                    onClick={() => {
                      setCurrCategory(elm);
                      setPath(window.location.href)
                    }}
                  >
                  {elm}
                   {/* <a className='py-2 text-center pb-3' href={`/products/${elm}`}>{elm}</a> */}
                    
                  </a>
                </>
              );
            })}
          </ul>
        </div>
      </>
    );
  };

export default CategoriesNavBar
