import { useState } from "react";

export default function User () {
   const [userName, setUserName] = useState('里斯')

   function handleNameChange() {
     setUserName('里斯aaaaaaaaaa')
   }

   return (
    <div>
      <div>{userName}</div>
      <button onClick={handleNameChange}>change name</button>
    </div>

   )
}