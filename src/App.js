import './App.css';
import { useState } from 'react';
import  Header  from './Components/Header/Header';
import AskModal from './Components/Modals/AskModal';

function App() {

  // darkmode/lightmode controls
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  // ask modal controls
  const [showAskModal, setShowAskModal] = useState(false);
  const openAskModal = () => { setShowAskModal(true); }
  const closeAskModal = () => { setShowAskModal(false); }

  return (<>

    <Header 
      theme={theme} 
      toggleTheme={toggleTheme} 
      openAskModal={openAskModal} 
    />

    {/* container for app content, used for dark/light theme */}
    <div className={`root ${theme === "light" ? "light-theme" : "dark-theme"}`}>
      
    <AskModal show={showAskModal} theme={theme} handleClose={closeAskModal}/>






    </div>
    {/* end of theme container */}
  </>);
  
}

export default App;
