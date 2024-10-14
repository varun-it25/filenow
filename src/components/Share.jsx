import { useState } from "react";
import { FaLink } from "react-icons/fa6";

const Share = ({url}) => {
  const [text, setText] = useState('Copy link')
  function copyLink(e){
    e.preventDefault();
    navigator.clipboard.writeText(url);
    setText('Copied');
    alert('Text is copied..');
  }
  return (
    <div className='main'>
      <div className='share'>
         <p id="title">Share file</p>
         <p id="sub-title">Anyone can download a file by the link.</p>
         <div id="line"></div>
         <div className="link-div">
            <div className="link" style={{width: `100%`, padding: `0.5rem 0.8rem`}}>
               <p>{url}</p>
            </div>
         </div>
         {
          (text === 'Copied')
            ? <button disabled style={{background: `#adadad`, cursor: `not-allowed`}}>{text}</button>
            : <button onClick={copyLink}>{text}</button>
          }
      </div>
    </div>
  );
};

export default Share;
