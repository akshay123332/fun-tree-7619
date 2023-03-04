import React, { useEffect, useState } from 'react'
import axios from "axios"
import ProductCard from './ProductCard'
import styles from "./computer.module.css"
import Sidebar from '../../Components/Sidebar/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useSearchParams } from 'react-router-dom'
import { getData } from '../../redux/menspage/action'
//  import Navbar from '../../Components/Home/Navbar'
import Footer from '../../Components/Home/Footer'
import Loader from '../../Components/Loader'
import Navabr from '../../changed navbar/Navbar/Navabr'
import LargeWithLogoLeft from '../../changed navbar/Footer/Footer'

const Computerglasses = () => {
const[produ,setProdu]=useState([])
let comp_url="https://rich-gray-scarab-fez.cyclic.app/computerglasses"

const dispatch=useDispatch()
const data=useSelector((store)=>store.data);
const loader=useSelector((store)=>store.isLoading)
const location=useLocation();
const [searchparams]=useSearchParams()
console.log(data,loader)

useEffect(()=>{
  let order=searchparams.get(`order`)
    let paramObj={
        params:{
            compatible:searchparams.getAll(`compatible`),
            frameshape:searchparams.getAll(`frameshape`),
            _sort: order &&"price",
            _order: order && order
        },
    }
    dispatch(getData(comp_url,paramObj))
},[location.search])
console.log(data)

  return (
    <div>
   <Navabr/>
        <div className={styles.main} >
          <div className={styles.sidebar}><Sidebar/></div>
          <div  className={`${styles.product}`}>
        
          {data?.map((el,index)=>{
               return <div style={{border:"thick double #32a1ce",padding:"2.5%" , borderRadius:"9px", backgroundColor:"azure", boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px"}} key={el.id} >
               <ProductCard id={el.id} image={el.image} desc={el.desc} price={el.price} rating={el.rating} frameshape={el.frameshape} compatible={el.compatible} />
               </div>
            })}
          </div>
          
            
        </div>
    <LargeWithLogoLeft/>
    </div>
  )
}

export default Computerglasses