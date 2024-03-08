import { useState } from "react";
import "./Donate.css";
import { useNavigate } from "react-router-dom";

function Donate() {
    const [moneyValue,setMoneyValue]=useState("");

const onClickHandler=(e)=>{

e.target.classList.toggle('green');
}
const onSelectHandler=(e)=>{

    setMoneyValue(e.target.value);
}

const navigate = useNavigate();
  return (
    <>
        <div className="container mt-20 mx-auto max-w-6xl rounded-xl shadow-xl shadow-gray-500  bg-white bg-opacity-80">
<div className="flex justify-center items-center min-h-auto">
    <div className="h-[650px] my-10 w-96 md:w-4/5 bg-white rounded-lg md:rounded-lg">
        <div className="flex h-full w-full">
            <div className="h-full p-3 rounded-lg w-full bg-white">
                <p className="font-semibold text-xl mt-2 text-purple-800 text-center"> Would you like to donate?</p>
                <div className="mt-4 w-full flex flex-col">
                    <div className="flex gap-2 w-full">
                       
                    </div>
                </div>
                <p className="text-gray-500 text-sm mt-5">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                <p className="mt-3 font-semibold text-purple-900">Giving Options</p>
                <div className="flex gap-2 mt-5 ">
                    <div className="w-full ">
                        <input className="appearance-none " type="radio" name="giving" id="giving1"  />
                        <label htmlFor="giving1">
                            <div className="selecting h-10 text-gray-700 font-semibold text-sm cursor-pointer transition-all justify-center items-center w-full border-2 flex ">
                                <p>One Time Giving</p>
                            </div>
                        </label>
                    </div> 
                    <div className="w-full "> 
                        <input className="appearance-none " type="radio" name="giving" id="giving2" />
                        <label htmlFor="giving2">
                            <div className="selecting h-10 text-gray-700 font-semibold text-sm cursor-pointer transition-all justify-center items-center w-full border-2 flex ">
                                <p>Monthly Giving</p>
                            </div>
                        </label>
                    </div>
                </div>
                <p className="mt-3 font-semibold text-purple-900">I would like to give:</p>
                <div className="flex -mt-5 gap-2">
                    <div className="w-full ">
                        <input className="appearance-none " type="radio" name="money" id="money1" value={20} onClick={onSelectHandler}/>
                        <label htmlFor="money1" className="h-10 text-gray-700 font-semibold text-sm cursor-pointer transition-all justify-center items-center w-full border-2 flex ">20 €</label>
                    </div>
                    <div className="w-full ">
                        <input className="appearance-none " type="radio" name="money" id="money2" value={15} onClick={onSelectHandler}/>
                        <label htmlFor="money2" className="h-10 text-gray-700 font-semibold cursor-pointer transition-all text-sm justify-center items-center w-full border-2 flex ">15 €</label>
                    </div>
                    <div className="w-full ">
                        <input className="appearance-none " type="radio" name="money" id="money3" value={10} onClick={onSelectHandler}/>
                        <label htmlFor="money3" className="h-10 text-gray-700 font-semibold text-sm cursor-pointer transition-all justify-center items-center w-full border-2 flex ">10 €</label>
                    </div>
                    <div className="w-full ">
                        <input className="appearance-none " type="radio" name="money" id="money4" value={''} onClick={onSelectHandler}/>
                        <label htmlFor="money4" className="h-10 text-gray-700 font-semibold cursor-pointer transition-all text-sm justify-center items-center w-full border-2 flex ">Other</label>
                    </div>
                </div>
                <span className="justify-start mt-4 text-xl font-semibold text-purple-900 pr-1">€</span><input type="text" className="mt-4 text-xl font-semibold text-purple-900 " placeholder="00.00" value={moneyValue} id="other" onClick={(e)=>setMoneyValue(e.value)}/>
             <hr className="my-4" />
                <div className=" flex gap-3 items-center"> 
                    <span className=" h-6 w-6 border border-gray-500 rounded flex justify-center items-center cursor-pointer transition-all " onClick={onClickHandler}><i className=" text-white fa fa-check "></i></span>
                    <p className="text-sm font-semibold text-purple-900 text-gray-700 ">This gift is in honour or in memory</p>
                </div>
                <div className="my-4 flex justify-between"> 
                    <button className="h-10 w-32 bg-blue-600 text-sm text-white rounded-lg cursor-pointer transition-all hover:bg-blue-800 " onClick={()=>navigate('/paypal')}>Donate Now</button> 
                </div>
            </div>
            <div className="h-full hidden md:block relative md:rounded-lg  overflow-hidden bg-[url('https://imgur.com/2hR32WP.jpg')] w-full">
                <img className="h-full w-full object-cover" src="https://imgur.com/2hR32WP.jpg" />
                <div className="m-auto ">
                    <p className="absolute top-4 font-semibold text-blue-900 cursor-pointer left-4 text-xs">Other Ways to Donate</p>
                    <p className="absolute top-8 font-semibold text-blue-900 cursor-pointer left-4 text-xs">Your Donation in Action</p>
                    <p className="absolute top-12 font-semibold text-blue-900 cursor-pointer left-4 text-xs"> Ways to Donate</p>
                </div>
            </div>
        </div>
    </div>
    
</div>
</div>
</>
  )
}

export default Donate