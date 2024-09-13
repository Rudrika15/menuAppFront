import React, { useState, useEffect } from 'react';
import RestaurantSidebar from '../../component/RestaurantSidebar';
import { Link } from 'react-router-dom';
import RestaurantBreadcrumbs from '../../component/RestaurantBreadcrumbs';
import axios from 'axios';
import { deleteMemebers, getStaffList } from '../../../api/Api';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const ViewStaff = () => {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    const getStaff = async () => {
        setLoading(true); // Set loading to true before fetching data
        try {
            const response = await axios.get(getStaffList, {
                headers: {
                    token: localStorage.getItem('token')
                }
            });
            setStaff(response.data.data);
        } catch (error) {
            toast.error('API call failed!');
        } finally {
            setLoading(false); // Set loading to false after data is fetched
        }
    };

    const deleteStaff = async (id) => {
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
                    const response = await axios.delete(`${deleteMemebers}${id}`, {
                        headers: {
                            token: localStorage.getItem('token')
                        }
                    });

                    if (response.data.status === true) {
                        toast.success('Staff deleted successfully!');
                        getStaff(); // Refresh the staff list after deletion
                    } else {
                        toast.error(response.data.message);
                    }
                } catch (error) {
                    toast.error('API call failed!');
                }
            }
        });
    };

    useEffect(() => {
        getStaff();
    }, []);

    return (
        <>
            <RestaurantSidebar />
            <main id="main" className="main">
                <RestaurantBreadcrumbs title="View Staff" link="/add-new-staff" linkTitle="Add New Staff"/>
                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body pt-5">
                                    {/* Show spinner when loading */}
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
                                                    <th>Contact no</th>
                                                    <th>Type</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {staff.map((staff) => (
                                                    <tr key={staff.id}>
                                                        <td>{staff.name}</td>
                                                        <td>{staff.email}</td>
                                                        <td>{staff.contactNumber}</td>
                                                        <td>{staff.staffType}</td>
                                                        <td>
                                                            <Link to={`/restaurant/edit-staff/${staff.id}`} className="">
                                                                <i className="bi bi-pencil-square bg-primary text-white fs-5 p-2 me-2"></i>
                                                            </Link>
                                                            <i
                                                                className="bi bi-trash bg-danger text-white fs-5 p-2 me-2"
                                                                onClick={() => deleteStaff(staff.id)}
                                                            ></i>
                                                        </td>
                                                    </tr>
                                                ))}
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

export default ViewStaff;
