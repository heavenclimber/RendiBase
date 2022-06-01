import './App.css';
import ReactDOM from 'react-dom/client'
import Nav from './routes'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import './bootstrap/bootstrap.min.css';
import "./Views/css/shop.css";
import firebase from './firebase/index'
// import rootReducer from './reducer'

// const store = configureStore(rootReducer)

function App() {

  return (
    <Nav />
  );
}

export default App;
