import { MdOutlineFileUpload } from "react-icons/md";
import { MdOutlineFileDownload } from "react-icons/md";
import { TbClock } from "react-icons/tb";
import { MdFolder } from "react-icons/md";
import {Link} from "react-router-dom";
import { useCookies } from 'react-cookie'

const Left = ({active, name}) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);  

  function Logout(){
    removeCookie("token")
  }

  return (    
    <div className="left">
      <div className="container">
        <div className="dp">
          <p>{name[0].toUpperCase()}</p>
        </div>
        <p id="name">{name}</p>
        <div className="tabs">
          {
            (active === "send")
             ? <Link to="/send" className="tab-active">
                  <MdOutlineFileUpload id="send-icon" />
                  <p>Send</p>
               </Link>
             : <Link to="/send" className="tab">
                  <MdOutlineFileUpload id="send-icon" />
                  <p>Send</p>
               </Link>
          }
          {
            (active === "recieve")
             ? <Link to="/recieve" className="tab-active">
                  <MdOutlineFileDownload id="send-icon" />
                  <p>Recieve</p>
               </Link>
             : <Link to="/recieve" className="tab">
                  <MdOutlineFileDownload id="send-icon" />
                  <p>Recieve</p>
               </Link>
          }
          {/* {
            (active === "history")
             ? <Link to="/history" className="tab-active">
                  <TbClock id="send-icon" />
                  <p>History</p>
               </Link>
             : <Link to="/history" className="tab">
                  <TbClock id="send-icon" />
                  <p>History</p>
               </Link>
          }
          {
            (active === "files")
             ? <Link to="/files" className="tab-active">
                  <MdFolder id="send-icon" />
                  <p>Files</p>
               </Link>
             : <Link to="/files" className="tab">
                  <MdFolder id="send-icon" />
                  <p>Files</p>
               </Link>
          } */}
        </div>
        <p style={{ height: `100%` }}></p>
        <button id="logout-btn" onClick={Logout}>Logout</button>
      </div>
    </div>
  );
};

export default Left;
