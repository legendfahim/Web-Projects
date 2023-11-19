import '@/styles/globals.css'
import Navbar from '/components/Navbar'
import Footer from '/components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function App({ Component, pageProps }) {
  return <>
  <Navbar/>
  <Component {...pageProps} />
   <Footer/>
   <ToastContainer />
  </>
}
