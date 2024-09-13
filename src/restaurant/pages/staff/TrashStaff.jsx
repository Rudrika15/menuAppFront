import React, { useEffect, useState } from 'react';
import RestaurantSidebar from '../../component/RestaurantSidebar';
import RestaurantBreadcrumbs from '../../component/RestaurantBreadcrumbs';
import { restoreStaff, trashStaff } from '../../../api/Api';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const TrashStaff = () => {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);

    const getTrashStaff = async () => {
        try {
            const response = await axios.get(trashStaff, {
                headers: {
                    token: localStorage.getItem('token'),
                },
            });
            if (response.data?.status) {
                setStaff(response.data.data);
                setLoading(false);
            } else {
                setStaff([]);
            }
        } catch (error) {
            console.error("Failed to fetch trash staff:", error);
            setStaff([]);
        }
    };
    const restoreMember = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, restore it!',
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const response = await axios.put(`${restoreStaff}${id}`, null, {
                            headers: {
                                token: localStorage.getItem('token'),
                            },
                        });
                        if (response.data.status) {
                            toast.success(response.data.message);
                            getTrashStaff();
                        } else {
                            toast.error(response.data.message);
                        }
                    } catch (error) {
                        toast.error("API error");
                        
                    }
                }   
            });
    }
    useEffect(() => {
        getTrashStaff();
    }, []);

    return (
        <>
            <RestaurantSidebar />
            <main id="main" className="main">
                <RestaurantBreadcrumbs title="Trash Staff" link="/view-staff" linkTitle="Back" />
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
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Contact Number</th>
                                                    <th>Staff Type</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {staff.length === 0 ? (
                                                    <tr>
                                                        <td colSpan="5" className="text-center">No data found</td>
                                                    </tr>
                                                ) : (
                                                    staff.map((staff) => (
                                                        <tr key={staff.id}>
                                                            <td>{staff.name}</td>
                                                            <td>{staff.email}</td>
                                                            <td>{staff.contactNumber}</td>
                                                            <td>{staff.staffType}</td>
                                                            <td>
                                                                <Link to="#" onClick={() => restoreMember(staff.id)}>
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

export default TrashStaff;
