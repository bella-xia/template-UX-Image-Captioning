import './App.css';
import Routes from './Routes'
import {useEffect} from 'react';


function App() {

useEffect(() => {
    const handleTabClose = event => {
      event.preventDefault();

      console.log('beforeunload event triggered');

      return (event.returnValue =
        'Are you sure you want to exit?');
    };

    window.addEventListener('beforeunload', handleTabClose);

    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  }, []);

  return (
    <div className="App">
      <Routes />
    </div>
  );
}


export default App;
