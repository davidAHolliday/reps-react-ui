import logo from './logo.svg';
import './App.css';
import MyForm from './forms/RepsForm';
import ViolationPage from './forms/ViolationPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        HEADERS
      </header>
      <body>
        {/* <MyForm/> */}
        <ViolationPage/>
      </body>
    </div>
  );
}

export default App;
