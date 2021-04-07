import './App.css';
import Header from './components/Header'
import Sidenav from './components/Sidenav'
import HoverNav from './components/HoverNav'
import Recomended from './components/Recomended'
import SearchResult from './components/SearchResult'
import WatchScreen from './components/WatchScreen'
import React, {useRef} from 'react'
import LoginPage from './components/LoginPage'
import { useSelector } from 'react-redux'
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom'

function App() {
  const hoverNavRef = useRef() 
  const { accessToken } = useSelector(state => state.auth)
  
  return (
    <>
      <Router basename="/youtube_clone">
        <HoverNav ref={hoverNavRef} hoverNavRef={hoverNavRef} />
      {!accessToken ? <LoginPage /> :
        <Switch>
              <Route  path="/" exact>
                  <Header hoverNavRef={hoverNavRef}/>
                  <div id="cont" >
                    <Sidenav />
                  <Recomended/>
                </div>
              </Route>
              <Route  path='/search/:queryParam' exact>
              <Header hoverNavRef={hoverNavRef}/>
                  <div id="cont" >
                    <Sidenav />
                    <SearchResult/>
                </div>
              </Route>
              <Route  path='/watch/:videoId' exact>
                <Header hoverNavRef={hoverNavRef}/>
                  <WatchScreen/>  
                </Route>
        </Switch>
        }
        </Router>
  </>
    )
}
export default App;
