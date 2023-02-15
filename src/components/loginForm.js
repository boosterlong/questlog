import React from "react";
import { useState } from "react";
import { registerNewUser, signIn } from "../helpers/firebaseFunctions";
import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../helpers/firebaseConfig";
import { getFirestore } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export function LoginForm() {
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  return (
    <div className="p-3 rounded-md bg-white w-full sm:w-[50%] mx-auto drop-shadow-md">
      <input
        className="border border-grey rounded-sm p-1 my-1 w-full"
        placeholder='Email'
        onInput={e => setRegisterEmail(e.target.value)}></input>
      <input
        className="border border-grey rounded-sm p-1 my-1 w-full"
        placeholder='Password'
        type="password"
        onInput={e => setRegisterPassword(e.target.value)}></input>
      <button
        className="rounded-full bg-blue-500 p-2 text-white mt-2 w-full"
        onClick={() => signIn(auth, registerEmail, registerPassword)}
      >Signin
      </button>
      <button
        className="rounded-full bg-blue-500 p-2 text-white mt-2 w-full"
        onClick={() => registerNewUser(auth, registerEmail, registerPassword, db)}
        >Make New User</button>
    </div>
  )
}