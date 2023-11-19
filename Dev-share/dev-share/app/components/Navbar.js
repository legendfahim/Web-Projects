import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className=' bg-slate-200 cursor-pointer'>
      <ul className=' flex  justify-center p-6  '>

     
        <li className='text-xl  mx-6'><strong><Link href="https://dev-share-bd.vercel.app/" >Dev-Share</Link></strong></li>
        <li className=' mx-3 hover:text-cyan-400'> <Link href="https://irchat-bd.glitch.me/" target="_blank" >Group Chat</Link></li>
        <li className=' mx-3 hover:text-cyan-400'><Link href="https://dev-calling.netlify.app/" target="_blank" >Group Call</Link></li>
        <li className=' mx-3 hover:text-cyan-400'><Link href=" https://dev-todo-bd.vercel.app/" target="_blank" >Dev Todo</Link></li>
       
      </ul>
     
    </div>
  )
}

export default Navbar