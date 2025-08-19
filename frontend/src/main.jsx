import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext.jsx'
import { GlobalProvider } from './context/globalContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
    <BrowserRouter>
      <ThemeProvider>
        <GlobalProvider>
          <AuthProvider>
            <Toaster 
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              toastOptions={{
                style: {
                  zIndex: 110000
                }
              }}
              
            />
            <App />
          </AuthProvider>
        </GlobalProvider>
      </ThemeProvider>
    </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
