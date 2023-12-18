import { Route, Routes } from 'react-router-dom';
import CarPage from '../../pages/CarPage';
import ExpensesPage from '../../pages/ExpensesPage';
import MenuApp from "../Menu";
import AddCarPage from '../../pages/AddCarPage';
import AddExpensesPage from '../../pages/AddExpensesPage';
import CarPageOne from '../../pages/CarPageOne';



function Router() {

    // const navigate = useNavigate();
    // const location = useLocation();

    return (
      <Routes>
        <Route path="/" element={<MenuApp />}>
          <Route path="/cars" element={<CarPage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/addCar" element={<AddCarPage />} />
          <Route path="/addExpenses" element={<AddExpensesPage />} />
          <Route path="/cars/:id" element={<CarPageOne />} />
        </Route>
      </Routes>
    );
}

export default Router
