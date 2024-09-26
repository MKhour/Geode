import { Link } from "react-router-dom";
import './App.css';
import styled from 'styled-components';

const Button = styled.button`
  
  width: 100px;
  height: 70px;
  font-family: 'Comfortaa', cursive;
  background: #FFFFFF;
  box-shadow: 0px 5px 20px #A2C3C7;
  border-radius: 30px;
`

const Layout = () => {
  return (
    <>
    <div className="App">
    {/* <h1>geode</h1> */}
      <nav>
      
        <ul>
          <li>
            <Link to="/">
              <Button>
                Home
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/journal">
              <Button>
                Journal
              </Button>
            </Link>
          </li>
          {/* <li>
            <Link to="/contact">Contact</Link>
          </li> */}
        </ul>
      </nav>

      {/* <h2>Welcome to React Router Tutorial</h2>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/'} className="nav-link"> Home </Link></li>
            <li><Link to={'/journal'} className="nav-link">Journal</Link></li>
            <li><Link to={'/about'} className="nav-link">About</Link></li>
          </ul>
          </nav>
          <hr /> */}

      
      </div>
    </>
  )
};

export default Layout;




