
'use client'

interface contentInter {
  name: string;
  desc : string;
  keyword ?: string;
  index ?: string
}
interface today{
  title: string;
  date: string;
  content: contentInter[]
}


import React, { useEffect, useState } from 'react'


export default function Home() {
  
  const [gender, setGender] = useState<String>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [month, setMonth] = useState<string>("양력");
  const [time, setTime] = useState<string>("");
  const[resultToday, setResultToday] = useState<today|null>(null);
  // resultToday 의 타입 을 설정
  const[resulttomorrow, setResultTomorrow] = useState(null)
  const[resltMonth, setResultMonth] = useState(null)


  



  const fetchData = async ()=>{
    const res = await fetch(`/api?gender=${gender}&birthdate=${birthDate}&month=${month}$time=${time}`);
    const data = await res.json();
    
    setResultToday(data.result.day)
    setResultTomorrow(data.result.tomorrow)
    setResultMonth(data.result.month)
    console.log(data.result.day)
    console.log(data.result.tomorrow)
    console.log(data.result.month)
  
  }
  
  const birthChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const value = e.target.value;
    if(value.length <= 8 && /^[0-9]*$/.test(value)){
      setBirthDate(value)
    }
  }

  const ChangeBgColor = (e :string) =>{
    setGender(e)
  }

  return (
   <>
   
      <div className="w-[500px] py-12 mx-auto mt-20 border-cyan-200 border p-3 shadow-xl">
      <div className="w-full flex items-center mb-2 justify-center">      
      <div className="mb-5">
      <span className='basis-[10%] text-xl mr-2 font-bold'>성별</span>
      <button className={`mr-2 p-1 border ${gender === "m" && 'bg-sky-200'}`} onClick={() => ChangeBgColor("m")}>남성</button>
      <button className={`p-1 border  ${gender === "w" && 'bg-sky-200' }`} onClick={() => ChangeBgColor("w")}>여성</button>
      </div>
      </div>
      
     <div className="flex flex-col items-center justify-center text-center mx-auto">
      <div className="flex items-center justify-center mb-6">
      <span className='ml-4 mr-2 font-bold text-lg'>생년월일</span>
      <input type="text" onChange={birthChange} value={birthDate} placeholder='생년월일(8자리)' className='border border-black p-[5px] focus:outline-sky-500' />
      </div>
      <div className="flex justify-center">
      <div className="div">
      <span className='mr-2 font-bold text-lg'>달</span>
      <select value={month} className='mr-2' onChange={(e)=>{setMonth(e.target.value)}}>
        <option value="양력">양력</option>
        <option value="음력 평달" >음력 평달</option>
        <option value="음력 윤달">음력 윤달</option>
      </select>
      </div>
      <div className="">
       <span className='font-bold text-lg'>시간</span>
       <select value={time} onChange={(e)=>setTime(e.target.value)}>
        <option value="">모름</option>
        <option value="23:30~ 01:29">23:30~ 01:29</option>
        <option value="1:30~ 03:29">1:30~ 03:29</option>
        <option value="3:30~ 05:29">3:30~ 05:29</option>
        <option value="5:30~ 07:29">5:30~ 07:29</option>
        <option value="7:30~ 09:29">7:30~ 09:29</option>
        <option value="9:30~ 11:29">9:30~ 11:29</option>
        <option value="11:30~ 13:29">11:30~ 13:29</option>
        <option value="13:30~ 15:29">13:30~ 15:29</option>
        <option value="15:30~ 17:29">15:30~ 17:29</option>
        <option value="7:30~ 19:29">17:30~ 19:29</option>
        <option value="19:30~ 21:29">19:30~ 21:29</option>
        <option value="21:30~ 23:29">21:30~ 23:29</option>
      </select>
      </div>
    </div>
    </div>
    
    <div className="mt-24 mb-20">
      <p className='text-center text-2xl font-bold mb-10'>입력한 정보</p>
    <div className="flex justify-between ">
      <p className='text-sky-700'>성별: {gender}</p>
      <p className='text-sky-700'>생년월일: {birthDate}</p>
      <p className='text-sky-700'>달: {month}</p>
      <p className='text-sky-700'>시간: {time}</p>  
      </div>
    </div>
   
    <button className='border px-40 py-3 mx-auto block mt-5 bg-sky-300 text-white text-2xl rounded-md ' onClick={fetchData}>운세보기</button>
    </div>

<div className="max-w-7xl mt-20 mx-auto">
    {resultToday && (
      <>
      <div className='flex justify-around  '>
      <span className='mr-1'>입력정보:{resultToday.title}</span>
      <p className='text-base'>작성날짜 :{resultToday.date}</p>
      </div>
      <div className="w-[70%] mx-auto mt-10 ">
      {resultToday.content.map((item, idx) => (
        <>
        <div className="mx-auto w-full text-center">
        <p className=' text-xl mx-auto mb-4 p-[2%] ' key={idx} onClick={()=>{}}>{item.name}</p>
        </div>
        <span>{item.desc}</span>
        </>     
      ))   
      }
      </div>
     </>
    )}
    </div>
 </>

  )}
