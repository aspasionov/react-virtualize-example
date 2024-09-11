import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {List} from 'react-virtualized';

import './App.css'

function App() {
  const [items, setItems] = useState([])
  const [virtualize, setVirtualize] = useState(false)

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  useEffect(() => {
    fetch('https://api.apis.guru/v2/list.json')
      .then(res => res.json())
      .then(res => {
        const data = Object.keys(res).map((key) => [key, res[key]])
        setItems(data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  function rowRenderer({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }) {
    const el = items[index]
    return (
      <li key={el[0]}><strong>{el[0]}</strong> --- <span>added: {el[1].added}</span> <b>preferred: {el[1].preferred}</b></li>
    );
  }

  const handleCheckbox = (e) => {
    setVirtualize(e.target.checked)
  }


  return (
    <>

    
    <label htmlFor="virtualize" style={{ display: 'block', cursor: 'pointer'}}>
<span>virtualize</span>
      <input id="virtualize" type="checkbox" checked={virtualize} onChange={handleCheckbox} />
    </label>
    {virtualize ? <List
      className='list'
      height={600}
      width={730}
      rowCount={items.length}
      rowHeight={20}
        rowRenderer={rowRenderer}
      /> : <ul className="list">
      {items.map(el =>  {
      return (
        <li key={el[0]}><strong>{el[0]}</strong> --- <span>added: {el[1].added}</span> <b>preferred: {el[1].preferred}</b></li>
      )
      })}
    </ul>}
    </>
    
      
  )
}

export default App
