import {CanvasContext} from './Context'
import Cmps from './layouts/Cmps/index';
import Content from './layouts/Content/index';
import Edit from './layouts/Edit/index'
import './App.scss'

const data={name:'ljm',age:25}

function App() {
  return (
    <div id="app" className='mainapp'>
      <CanvasContext.Provider value={data}>
        <Cmps></Cmps>
        <Content></Content>
        <Edit></Edit>
      </CanvasContext.Provider>
  </div>
  );
}

export default App;
