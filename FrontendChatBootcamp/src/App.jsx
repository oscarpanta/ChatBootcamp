import "./App.css";
// import { MessagesChat } from "./components/MessagesChat";
// import { FriendsChat } from "./components/FriendsChat";
import { BrowserRouter, Route,  Routes } from "react-router-dom";
import { Registro } from "./pages/registro";
import { Chat } from "./pages/Chat";


function App() {
  return (
    <>
      
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Registro />} />
            <Route path="/chatear" element={<Chat />} />
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
