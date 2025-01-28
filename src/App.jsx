import { Outlet } from "react-router-dom"
import Layout from "./components/Layout"

function App() {

  return (

    <>
      <Layout>
        {/* all of the children path from mian.jsx is rendered in outlet */}
        <Outlet />
      </Layout >

    </>
  )
}

export default App
