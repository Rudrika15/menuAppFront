import React, { useEffect, useState } from 'react';
import RestaurantSidebar from '../../component/RestaurantSidebar';
import RestaurantBreadcrumbs from '../../component/RestaurantBreadcrumbs';
import axios from 'axios';
import { restoreTable, trashTable } from '../../../api/Api';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const TrashTable = () => {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);

    const getTables = async () => {
        try {
            const response = await axios.get(trashTable, {
                headers: {
                    token: localStorage.getItem('token'),
                },
            });
            if (response.data?.status) {
                setTables(response.data.data);
            }
        } catch (error) {
            toast.error("Failed to load tables.");
        } finally {
            setLoading(false);
        }
    };

    const restoreTableById = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to restore it!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, restore it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.put(`${restoreTable}${id}`, null, {
                        headers: {
                            token: localStorage.getItem('token'),
                        },
                    });
                    if (response.data.status === true) {
                        toast.success(response.data.message);
                        getTables();
                    } else {
                        toast.error("Failed to restore the table.");
                    }
                } catch (error) {
                    toast.error("API error occurred.");
                }
            }
        });
    };

    useEffect(() => {
        getTables();
    }, []);

    return (
        <>
            <RestaurantSidebar />
            <main id="main" className="main">
                <RestaurantBreadcrumbs title="Trash Table" link="/view-table" linkTitle="Back" />
                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body pt-5">
                                    {loading ? (
                                        <div className="d-flex justify-content-center">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Table Name</th>
                                                    <th>Capacity</th>
                                                    <th>Option</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tables.length === 0 ? (
                                                    <tr>
                                                        <td colSpan="3" className="text-center">No data found</td>
                                                    </tr>
                                                ) : (
                                                    tables.map((data) => (
                                                        <tr key={data.id}>
                                                            <td>{data.tableNumber}</td>
                                                            <td>{data.capacity}</td>
                                                            <td>
                                                                <Link to="#" onClick={() => restoreTableById(data.id)}>
                                                                    <i className="btn btn-success bi bi-arrow-counterclockwise"></i>
                                                                </Link>
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

export default TrashTable;
