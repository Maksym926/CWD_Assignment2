"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link";
export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <div className="container">
                <Link className="navbar-brand" href="/inventory">
                    Appliance Inventory
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" href="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/inventory/add">Add</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/inventory/search">Search</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/inventory/update">Update</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/inventory/delete">Delete</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
