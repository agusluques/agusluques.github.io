import { BrowserRouter } from 'react-router-dom';
import Fab from './Components/Fab/Fab';
import MainScreen from './Containers/MainScreen/MainScreen';
// import Profile from './Components/Profile/Profile';
import styles from './App.module.scss';

function App() {
  return (
    <BrowserRouter>
      <div className={styles.App}>
        <MainScreen />
        {/* <Profile /> */}
        <Fab />
      </div>
    </BrowserRouter>
  );
}

export default App;
