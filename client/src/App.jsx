import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [items, setItems] = useState([])
  const [newItemName, setNewItemName] = useState('')
  const [newItemDesc, setNewItemDesc] = useState('')

  useEffect(() => {
    fetchItems();
  }, [])

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/items')
      if (res.ok) {
        const data = await res.json()
        setItems(data)
      }
    } catch (error) {
      console.error('Error fetching items:', error)
    }
  }

  const handleAddItem = async (e) => {
    e.preventDefault()
    if (!newItemName || !newItemDesc) return

    try {
      const res = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newItemName, description: newItemDesc })
      })

      if (res.ok) {
        setNewItemName('')
        setNewItemDesc('')
        fetchItems() // Refresh list
      }
    } catch (error) {
      console.error('Error adding item:', error)
    }
  }

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>MERN Full Stack Skeleton</h1>
      
      <div className="card">
        <h3>Add an Item</h3>
        <form onSubmit={handleAddItem}>
          <input 
            type="text" 
            placeholder="Item Name" 
            value={newItemName} 
            onChange={(e) => setNewItemName(e.target.value)} 
            style={{ marginRight: '10px' }}
          />
          <input 
            type="text" 
            placeholder="Item Description" 
            value={newItemDesc} 
            onChange={(e) => setNewItemDesc(e.target.value)} 
            style={{ marginRight: '10px' }}
          />
          <button type="submit">Add Item</button>
        </form>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h2>Items from Database:</h2>
        {items.length === 0 ? (
          <p>No items yet. Try adding one!</p>
        ) : (
          <ul style={{ textAlign: 'left', display: 'inline-block' }}>
            {items.map((item) => (
              <li key={item._id}>
                <strong>{item.name}</strong>: {item.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App
