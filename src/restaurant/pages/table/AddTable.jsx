import React, { useState } from 'react';
import RestaurantSidebar from '../../component/RestaurantSidebar';
import RestaurantBreadcrumbs from '../../component/RestaurantBreadcrumbs';
import { addTable } from '../../../api/Api';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddTable = () => {
    const [tableNumber, setTableNumber] = useState('');
    const [capacity, setCapacity] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if(!tableNumber){   
            toast.error('Please enter table number');
            return
        }
        if(!capacity){
            toast.error('Please enter capacity');
            return
        }
        const tableData = {
            tableNumber: tableNumber,
            capacity: capacity,
        };

        try {
            const response = await axios.post(addTable, tableData, {
                headers: {
                    token: localStorage.getItem('token'),
                },
            });

            if (response.data.status === true) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Failed to add table. Please try again.');
        }
    };

    return (
        <>
            <RestaurantSidebar />
            <main id="main" className="main">
                <RestaurantBreadcrumbs title="Add Table" link="/view-table" linkTitle="Back" />
                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body pt-5">
                                    <form className="row g-3" onSubmit={handleFormSubmit}>
                                        <div className="col-md-12">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    onChange={(e) => setTableNumber(e.target.value)}
                                                    value={tableNumber}
                                                    className="form-control"
                                                    id="floatingName"
                                                    placeholder="Table No"
                                                   
                                                />
                                                <label htmlFor="floatingName">Table No</label>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    onChange={(e) => setCapacity(e.target.value)}
                                                    value={capacity}
                                                    className="form-control"
                                                    id="floatingCapacity"
                                                    placeholder="Capacity"
                                                  
                                                />
                                                <label htmlFor="floatingCapacity">Capacity</label>
                                            </div>
                                        </div>
                                        <div className="">
                                            <input type="submit" value="Submit" className="btn btn-primary" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default AddTable;
