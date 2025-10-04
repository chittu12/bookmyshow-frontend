import React from 'react'

export default function SeatGrid({ seats, onToggle }){
  // seats: [{id, seat_no, seatStatus}]
  return (
    <div className="grid grid-cols-8 gap-2">
      {seats.map(s=> (
        <button key={s.id} onClick={()=>onToggle(s)} disabled={s.seatStatus!=='Available'}
          className={`p-2 rounded ${s.seatStatus==='Available' ? 'bg-green-200' : 'bg-gray-300'} text-sm`}
        >{s.seat_no}</button>
      ))}
    </div>
  )
}