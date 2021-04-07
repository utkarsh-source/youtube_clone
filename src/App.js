import './App.css';
import Header from './components/Header'
import Sidenav from './components/Sidenav'
import HoverNav from './components/HoverNav'
import Recomended from './components/Recomended'
import SearchResult from './components/SearchResult'
import WatchScreen from './components/WatchScreen'
import {BrowserRouter as Switch, Route, useHistory} from 'react-router-dom'
import React, {useRef} from 'react'
import LoginPage from './components/LoginPage'
import { useSelector } from 'react-redux'

function App() {
  const hoverNavRef = useRef() 
  const { accessToken } = useSelector(state => state.auth)
  
  return (
    <div>
      <Switch>
        {!accessToken ?  <LoginPage/> : 
          <>
            <HoverNav ref={hoverNavRef} hoverNavRef={hoverNavRef} />
              <Route exact path="/">
                  <Header hoverNavRef={hoverNavRef}/>
                  <div id="cont" >
                    <Sidenav />
                  <Recomended/>
                </div>
              </Route>
              <Route exact path='/search/:queryParam'>
              <Header hoverNavRef={hoverNavRef}/>
                  <div id="cont" >
                    <Sidenav />
                    <SearchResult/>
                </div>
              </Route>
              <Route exact path='/watch/:videoId'>
                <Header hoverNavRef={hoverNavRef}/>
                  <WatchScreen/>  
                </Route>
          </>
        }
        </Switch>
  </div>
    )
}
export default App;
