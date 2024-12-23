import logo from './logo.svg';
import './App.css';
import './list.css';
import AdminApp from './app/AdminApp';
import UseCookie from './lib/UseCookie';
import VisitorApp from './app/VisitorApp';

function App() {
  const [user, setUser] = UseCookie('user', )
  console.log(user);
  
  return (
    <div className="App">
      { user?.user ? <AdminApp /> : <VisitorApp /> }
    </div>
  );
}

export default App;
