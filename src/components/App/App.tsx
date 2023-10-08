// import { useState } from 'react'
// import styles from './App.module.css';
// import { useAppSelector } from '../store/hooks';
// import { selectLike } from '../store/reducers/like/likeReducer';
import Header from '../Header/Header';
import Kanban from '../Kanban/Kanban';
import Popup from '../Popup/Popup';

function App() {

  return (
    <>
      <Header />
      <Kanban />
      <Popup />
    </>
  )
}

export default App
