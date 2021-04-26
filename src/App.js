import './App.css';
import Header from './components/Header'
import Sidenav from './components/Sidenav'
import HoverNav from './components/HoverNav'
import Recomended from './components/Recomended'
import SearchResult from './components/SearchResult'
import WatchScreen from './components/WatchScreen'
import React, {useRef} from 'react'
import LoginPage from './components/LoginPage'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const hoverNavRef = useRef() 
  
  return (
    <>
      <Router basename="/youtube_clone">
        <Switch>
              <Route path='/login' exact>
                  <LoginPage/>
              </Route>
              <ProtectedRoute  path="/" exact>
                  <Header hoverNavRef={hoverNavRef}/>
                    <HoverNav ref={hoverNavRef} hoverNavRef={hoverNavRef} />
                  <div id="cont" >
                    <Sidenav />
                  <Recomended/>
                </div>
              </ProtectedRoute>
          <ProtectedRoute path='/search/:queryParam' exact>
              <HoverNav ref={hoverNavRef} hoverNavRef={hoverNavRef} />
              <Header hoverNavRef={hoverNavRef}/>
                  <div id="cont" >
                    <Sidenav />
                    <SearchResult/>
                </div>
              </ProtectedRoute>
          <ProtectedRoute path='/watch/:videoId' exact>
                <HoverNav ref={hoverNavRef} hoverNavRef={hoverNavRef} />
                <Header hoverNavRef={hoverNavRef}/>
                  <WatchScreen/>  
              </ProtectedRoute>
        </Switch>
      </Router>
  </>
    )
}
export default App;
