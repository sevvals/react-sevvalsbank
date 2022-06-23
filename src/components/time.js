import React from "react";
import Clock from 'react-live-clock';

<style>
 
</style>

const Time = () => {
    
  return (
    <>
      <Clock className="time-nav" format={'dddd , MMMM Do YYYY , HH:mm:ss a'} ticking={true}/>  
    </>
  )
}

export default Time