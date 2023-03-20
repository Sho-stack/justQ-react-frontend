import './App.css';
import { useState } from 'react';
import  Header  from './Components/Header/Header';

function App() {

  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  return (<>
    <Header theme={theme} toggleTheme={toggleTheme} />
    <div className={`root ${theme === "light" ? "light-theme" : "dark-theme"}`}>
      
    </div>
  </>);
  
}

export default App;
