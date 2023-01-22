import React from "react";

export default function LoaderSpinner() {

  return (
    <div>
    <span className="loader"></span>
    <style>
        {`
            .loader {
                width: 48px;
                height: 48px;
                border: 5px solid #000;
                border-bottom-color: transparent;
                border-radius: 50%;
                display: inline-block;
                box-sizing: border-box;
                animation: rotation 1s linear infinite;
                }
            
                @keyframes rotation {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
                }
        `}
    </style>
    </div>
  )
}