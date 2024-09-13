import React from 'react'
import { Link } from 'react-router-dom'

const RestaurantBreadcrumbs = (props) => {
    return (
        <>
            <div className='d-flex justify-content-between'>
                <div className="pagetitle">
                    <h1>{props.title}</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>

                            <li className="breadcrumb-item active">{props.title}</li>
                        </ol>
                    </nav>
                </div>
                <div>
                    <Link to={props.link} className='btn btn-primary'>{props.linkTitle} </Link>
                </div>
            </div>
        </>
    )
}

export default RestaurantBreadcrumbs