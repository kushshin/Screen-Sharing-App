import React from 'react'
import Button from '../Components/Button'

function Footer() {
  return (
    <div>
      <div className='items-center '>
 <footer id="contact"className=" flex flex-wrap md:flex justify-between w-[500px] sm:w-full md:w-full lg:w-full footer sm:footer-horizontal bg-blue-200 text-base-content pr-10 pb-10 pt-10 pl-10 md:pl-40 mt-0  ">
  <nav className='flex-row'>
    <h6 className="footer-title text-blue-500">Services</h6>
    <h1 className="link link-hover">Branding</h1>
    <h1 className="link link-hover">Design</h1>
    <h1 className="link link-hover">Marketing</h1>
    <h1 className="link link-hover">Advertisement</h1>
  </nav>
  <nav>
    <h6 className="footer-title text-blue-500">Company</h6>
    <h1 className="link link-hover">Career</h1>
    <h1 className="link link-hover">Jobs</h1>
    <h1 className="link link-hover">Press kit</h1>
  </nav>
  <nav>
    <h6 className="footer-title text-blue-500">Legal</h6>
    <h1 className="link link-hover">Terms of use</h1>
    <h1 className="link link-hover">Privacy policy</h1>
    <h1 className="link link-hover">Cookie policy</h1>
  </nav>
  <form>
    <h6 className="footer-title text-blue-500">Contact</h6>
    <fieldset className="w-80">
      <label>Enter your email address</label>
      <div className="join">
        <input
          type="text"
          placeholder="username@site.com"
          className="input input-bordered join-item" />
      </div><br />
      <label>Enter your contact</label>
      <div className="join">
        <input
          type="text"
          placeholder="contact Number"
          className="input input-bordered" />
      </div>
       <Button>Subscribe</Button>
        {/* <button className="btn bg-blue-400  ml-10 lg:ml-2 mt-2 ">Subscribe</button> */}
    </fieldset>
  </form>
</footer>
    </div>
    </div>
  )
}

export default Footer