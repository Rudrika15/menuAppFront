import React from 'react'
import Topbar from './Topbar'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    
    return (
        <>
            <Topbar />
            <aside id="sidebar" className="sidebar">

                <ul className="sidebar-nav" id="sidebar-nav">

                    <li className="nav-item">
                        <Link className="nav-link collapsed" to="/">
                            <i className="bi bi-grid"></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link " data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
                            <i className="bi bi-journal-text"></i><span>Forms</span><i className="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="forms-nav" className="nav-content collapse show" data-bs-parent="#sidebar-nav">
                            <li>
                                <a href="forms-elements.html">
                                    <i className="bi bi-circle"></i><span>Form Elements</span>
                                </a>
                            </li>

                        </ul>
                    </li>
                </ul>
            </aside>
        </>
    )
}

export default Sidebar