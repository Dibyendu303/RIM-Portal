import "./NavStyle.css";

function Navbar1() {
  return (
    <>
      <div className="shift">
        <ul id="navbar">
          <li className="title">
            <a id="titlebox" href="index.html">
              RIM PORTAL
            </a>
          </li>
          <li className="active">
            <a href="index.html">Home</a>
          </li>
          <li className="dropbtn">
            <div className="dropdown">
              <a href="index.html">Request</a>
              <div className="dropdown-content">
                <a href="index.html">Requests-Sent</a>
                <a href="index.html">Requests-Received</a>
              </div>
            </div>
          </li>
        </ul>

        <div id="input">
          <input
            className="searchbar"
            type="search"
            placeholder="Search item"
          ></input>
          <button className="addbtn">Add item +</button>
        </div>
      </div>
    </>
  );
}

export default Navbar1;
