import React from 'react'
import Weekspecial from '../products/Weekspecial'

function Releated({addToCart}) {
  return (
    <>
      
      <div className=''>
         <div className='  py-4'>
            <Weekspecial addToCart={addToCart}/>
         </div>
      </div>

    </>
  )
}

export default Releated
