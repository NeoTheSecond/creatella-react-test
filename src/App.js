import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import ProductsList from './components/products-list'
function App() {
    return (
        <div>
            <div className="App-header">Creatella test app</div>
            <div className="App">
                <ProductsList />
            </div>
        </div>
    )
}

export default App
