import { StrictMode } from 'react'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { router } from './routes/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
