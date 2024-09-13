import React from 'react'
import RestaurantSidebar from '../../component/RestaurantSidebar'
import RestaurantBreadcrumbs from '../../component/RestaurantBreadcrumbs'

const EditCategory = () => {
  return (
   <>
    <RestaurantSidebar />
            <main id="main" className="main">

                <RestaurantBreadcrumbs title="Edit Category"  linkTitle="Back" link="/view-category"  />

                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body pt-5">
                                    
                                    <form className="row g-3">
                                        <div className="col-md-12">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="floatingName" placeholder="Your category" />
                                                <label for="floatingName">Category</label>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-floating">
                                                <input type="file" className="form-control" id="floatingEmail" placeholder="Your photo" />
                                                <label for="floatingEmail">Photo</label>
                                            </div>
                                        </div>
                                        <div className="">
                                            <input type="submit" className="btn btn-primary"  />
                                        </div>
                                    </form>

                                </div>
                            </div>

                        </div>
                    </div>
                </section>

            </main>
   </>
  )
}

export default EditCategory