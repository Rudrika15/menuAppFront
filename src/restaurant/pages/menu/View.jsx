import React, { useEffect, useState } from 'react'
import RestaurantSidebar from '../../component/RestaurantSidebar'
import RestaurantBreadcrumbs from '../../component/RestaurantBreadcrumbs'
import axios from 'axios'
import { getMenuList } from '../../../api/Api'

const View = () => {
    const [menu, setMenu] = useState([])
    const [search, setSearch] = useState('')

    const getMenu = async () => {
        try {
            const config = {
                headers: {
                    token: localStorage.getItem('token'),
                }
            };

            let url = getMenuList;

            if (search.length > 3) {
                url += `?search=${search}`;
            }

            const response = await axios.get(url, config);

            if (response.data.status === true) {
                setMenu(response.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMenu();
    }, [search])

    return (
        <>
            <RestaurantSidebar />
            <main id="main" className="main">
                <RestaurantBreadcrumbs title="View Category" link="/add-new-category" linkTitle="Add New Category" />
                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body pt-5">
                                    <div className="d-flex justify-content-end">
                                        <div>
                                            <input type="text"
                                                name='search'
                                                onChange={(e) => setSearch(e.target.value)}
                                                value={search}
                                                className='form-control mb-3'
                                                placeholder="Search here" />

                                        </div>
                                    </div>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Photo</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {menu.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.title}</td>
                                                    <td>{item.price}</td>
                                                    <td><img src={item.image} width="50" height="50" alt="Menu Item" /></td>
                                                    <td>
                                                        <i className="btn btn-primary bi bi-pencil text-white fs-5 p-2 me-2"></i>
                                                        <i className="btn btn-danger bi bi-trash text-white fs-5 p-2 me-2"></i>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                   
                                    

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default View
