import React, { useState } from 'react';
import RestaurantSidebar from '../../component/RestaurantSidebar';
import RestaurantBreadcrumbs from '../../component/RestaurantBreadcrumbs';
import axios from 'axios'; // Import axios for making API calls
import { addCategory } from '../../../api/Api';
import { toast } from 'react-toastify';

export const AddCategory = () => {
  const [title, setTitle] = useState('');
  const [photo, setPhoto] = useState('');


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // if (!title ) {
    //   toast.error('Please fill title fd');
    //  return
    // }
    // if (!photo) {
    //   toast.error('Please select photo fd');
    //  return
    // }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('photo', photo);

    try {
      const response = await axios.post(addCategory, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token: localStorage.getItem('token'),
        },
      });
      if (response.data.status === true) {

        toast.success('category added successfully!');
      } else {

        toast.error(response.data.message);
      }

    } catch (error) {

      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <RestaurantSidebar />
      <main id="main" className="main">
        <RestaurantBreadcrumbs title="Add Category" link="/view-category" linkTitle="Back"/>
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
                          className="form-control"
                          id="floatingName"
                          placeholder="Your category"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                        <label htmlFor="floatingName">Category</label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-floating">
                        <input
                          type="file"
                          className="form-control"
                          id="floatingPhoto"
                          placeholder="Your photo"
                          onChange={(e) => setPhoto(e.target.files[0])}
                        />
                        <label htmlFor="floatingPhoto">Photo</label>
                      </div>
                    </div>
                    <div className="">
                      <input type="submit" className="btn btn-primary" value="Add Category" />
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
