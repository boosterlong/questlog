import React from "react";
import { signOutReload } from '../helpers/firebaseFunctions';

export default function SignOut(props) {

  return (
    <button
        className="rounded-full
        bg-backdrop
        border-2
        border-white
        text-white
        p-2"
        onClick={() => signOutReload(props.auth)}
      >Sign Out
    </button> 
  )
}