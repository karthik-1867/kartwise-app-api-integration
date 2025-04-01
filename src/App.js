import Menu from "./components/menu/Menu";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import '../src/App.css'
import { BrowserRouter,Routes,Route, Outlet, Navigate } from "react-router-dom";
import Fav from "./pages/fav/Fav";
import CreateExpenseSheet from "./pages/createExpenseSheet/CreateExpenseSheet";
import CreateExpense from "./pages/createExpenseGroup/CreateExpense";
import ExpenseSummary from "./pages/ExpenseSummary/ExpenseSummary";
import Message from "./pages/message/Message";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import EditExpenseGroup from "./pages/EditExpenseGroup/EditExpenseGroup";
import UpdateExpense from "./pages/updateExpense/UpdateExpense";
import ProtectRoute from "./ProtectRoute";
import Cookies from "js-cookie";
import Debts from "./pages/debts/Debts";
import AcknowledgeMessage from "./pages/acknowledge/AcknowledgeMessage";
import { useState } from "react";

function App() {
  
  const [search,setSearch] = useState();

  console.log("search",search)
  return (
    <div className="AppContainer">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} /> 
            <Route path="/signup" element={<Signup/>}/>
            <Route element={<Layout search={setSearch} />}>
              <Route path="/home" element={<ProtectRoute element={<Home search={search}/>}/>}/>

              <Route path="/fav" element={<ProtectRoute element={<Fav/>}/>} />
              <Route path="/expenseGroup" element={<ProtectRoute element={<CreateExpense search={search}/>}/>} />
              <Route path="/editGroup" element={<ProtectRoute element={<EditExpenseGroup/>}/>} />
              <Route path="/expenseSheet" element={<ProtectRoute element={<CreateExpenseSheet/>}/>} />
              <Route path="/expenseSummary">
                 <Route path="" element={<ProtectRoute element={<ExpenseSummary search={search}/>}/>} />
                 <Route path=":id" element={<ProtectRoute element={<UpdateExpense/>}/>} />
              </Route>
              <Route path="/debts" element={<Debts />} />
              <Route path="/acknowledge" element={<AcknowledgeMessage />} />
              <Route path="/message" element={<Message />} />
            </Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}


const Layout = ({search}) => (
  <>
    <Navbar  handlesearch={search}/>
    <div className="Container">
    <Menu />
    <div className="Homecontainer1">
      <Outlet /> {/* This will render the current route's component */}
    </div>
  </div>
  </>
);

export default App;
