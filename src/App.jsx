import { useState,useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [count, setCount] = useState(1)
  const [loading,setloading]=useState(false)
  const [max,setmax]=useState(count)

  useEffect(()=>{
     MakeRequest()
  },[])
  const MakeRequest=()=>{
       axios.get('https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/counter1.json').then(({data})=>{
         setCount(data||1)
       })  
  }
  const MakePut=()=>{
    setloading(true)
    axios.put('https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json',{name:"Aman Sharma",email:"amansharmait100@gmail.com",phone:"9911524753"}).then(()=>{
        setloading(false)
    }).catch((err)=>{
      alert(err)
    })
  }
  const handleCount=(val)=>{
    setCount(count+val)
    let c=count+val
    if(max<c){
      setmax(c)
    }
    
  }
  return (
    <div className="App">
      
     <div style={loading?{visibility: "visible"}:{visibility:"hidden"}} id='save'><div  id="div-su"></div>Saving Count Value</div>
      <div id='count'>
        <div onClick={()=>{
          handleCount(-1)
          MakePut()
        }}>-</div>
        <div><input  onChange={(e)=>{

          setCount(+e.target.value) 
        }} type="number" value={count}/></div>
        <div onClick={()=>{
          handleCount(1)
          MakePut()
        }}>+</div>
      </div>
     <div>
       max value:{max}
     </div>
    </div>
  )
}

export default App
