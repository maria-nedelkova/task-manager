import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { MyTasksPage } from './pages/MyTasksPage'
import { AboutPage } from './pages/AboutPage'

export const App = () => {
  return (
    <BrowserRouter>
     <Navbar />
         <Switch>
          <Route component={MyTasksPage} path="/" exact />
          <Route component={AboutPage} path="/about" />
        </Switch>
      <Footer />
      </BrowserRouter>
  );
}

