import './App.css'

import Block from './components/Block'
import Blockchain from './components/Blockchain'
import AddTransaction from './components/AddTransaction'
import Validation from './components/Validation'
import PendingTransactions from './components/PendingTransactions'
import FindBlock from './components/FindBlock'
import MineBlock from './components/MineBlock'

function App() {

  return (
 
      <div className='background'>
        <h1 className='jersey-25-charted-regular '>Welcome to your only Blockchain validator</h1>
        <div className='content-container'>
          <div className='container'> 
          <Blockchain/>
          <FindBlock/>
         </div>

          <div className=" container"  >
            <AddTransaction />
            <PendingTransactions />
            <MineBlock/>
          </div>
        </div>
    
 
        <div className='validator' >
          {/* <Validation /> */}
          Validation
        </div>
      </div>
  )
}

export default App
