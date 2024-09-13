import React, { useEffect, useState } from 'react';
import RestaurantSidebar from '../../component/RestaurantSidebar';
import RestaurantBreadcrumbs from '../../component/RestaurantBreadcrumbs';
import axios from 'axios';
import { toast } from 'react-toastify';
import { categoryImage, hardDeleteCategories, restoreCategories, trashCategories } from '../../../api/Api';
import Swal from 'sweetalert2';

const TrashCategory = () => {
    const [categoryData, setCategoryData] = useState([]);
    const [loader, setLoader] = useState(true);

    const getCategories = async () => {
        try {
            const response = await axios.get(trashCategories, {
                headers: {
                    token: localStorage.getItem('token'),
                },
            });
            if (response.data.status === true) {
                setCategoryData(response.data.data);
                setLoader(false);
            }
        } catch (error) {
            toast.error('API call failed!');
        }
    };

    const restoreCategory = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "do you want to restore it!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, restore it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.put(`${restoreCategories}${id}`, {}, {
                        headers: {
                            token: localStorage.getItem('token'),
                        },
                    });
                    if (response.data.status === true) {
                        toast.success(response.data.message);
                        getCategories();
                    }
                } catch (error) {
                    toast.error('API call failed!');
                }
            }
        });
    };
    const deleteCategory = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`${hardDeleteCategories}${id}`, {
                        headers: {
                            token: localStorage.getItem('token'),
                        },
                    });
                    if (response.data.status === true) {
                        toast.success(response.data.message);
                        getCategories();
                    }
                } catch (error) {
                    toast.error('API call failed!');
                }
            }
        });
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <>
            <RestaurantSidebar />
            <main id="main" className="main">
                <RestaurantBreadcrumbs title="Trash Category" link="/view-category" linkTitle="Back" />
                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body pt-5">
                                    {loader ? (
                                        <div className="d-flex justify-content-center">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Photo</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {categoryData.length === 0 ? (
                                                    <tr><td colSpan="3" className="text-center">No Category Found</td></tr>
                                                ) : (
                                                    categoryData.map((category) => (
                                                        <tr key={category.id}>
                                                            <td>{category.title}</td>
                                                            <td style={{ width: '400px' }}>
                                                                <img src={`${categoryImage}${category.photo}`} className="img-fluid w-25 h-25" alt="Category" />
                                                            </td>
                                                            <td>
                                                                <button className='btn' onClick={() => restoreCategory(category.id)}>
                                                                    <i className="bi bi-arrow-clockwise bg-success text-white fs-5 p-2 me-2"></i>
                                                                </button>
                                                                <button className='btn' onClick={() => deleteCategory(category.id)}>
                                                                    <i className="bi bi-trash bg-danger text-white fs-5 p-2 me-2"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default TrashCategory;
