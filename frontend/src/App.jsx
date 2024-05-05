import './App.css'    
import Blockchain from './components/Blockchain'
import AddTransaction from './components/AddTransaction'
import Validation from './components/Validation'
import PendingTransactions from './components/PendingTransactions'
import BlockById from './components/BlockById'

function App() {

  return (
 
      <div className='background'>
        <h1 className='jersey-25-charted-regular text-6xl text-white font-bold py-4 px-6 rounded-lg shadow-lg '>Welcome to your only Blockchain validator</h1>
        <div className='content-container'>
          <div className='container'> 
          <Blockchain/>
         </div>
          <div className=" container"  >
            <AddTransaction />
            <PendingTransactions />
          </div>
        </div>
        <div className="flex flex-row justify-center items-center">
        <div className='w-full h-52 '>
          <BlockById />
        </div>
        </div>
        <button className='btn' onClick={() => console.log("klicked the button")}>Validate</button>
      </div>
  )
}

export default App
