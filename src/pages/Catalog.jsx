
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Catalog() {
  const [products, setProducts] = useState([])
  const baseUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    axios.get(`${baseUrl}/catalog`).then(res => {
      setProducts(res.data)
    }).catch(() => {
      setProducts([])
    })
  }, [])

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Catalog</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul className="grid gap-4">
          {products.map((item, idx) => (
            <li key={idx} className="border rounded p-4 shadow bg-white dark:bg-gray-800">
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">{item.rationale || 'No rationale provided.'}</p>
              <a href={item.url} target="_blank" className="text-blue-500 underline text-sm">View Product</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
