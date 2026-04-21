import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/inventory/Navbar';

export default function InventoryLayout({ children }) {
    return (
        <>
            <Navbar />
            <div className="container">
                {children}
            </div>
        </>
    );
}
