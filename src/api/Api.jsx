export const baseUrl = "https://menuapp.flipcodesolutions.com/";
// export const baseUrl = "http://127.0.0.1:8000/"

// view api
export const login = baseUrl + "api/login";
export const categoryList = baseUrl + "api/categories";
export const categoryImage = baseUrl + "categoryPhoto/";
export const getTableList = baseUrl + "api/table";
export const getTableListById = baseUrl + "api/table/byId";
export const getStaffList = baseUrl + "api/staff";
export const getMenuList = baseUrl + "api/menu";
export const getSingleCategory = baseUrl + "api/category/byId";
export const getSingleStaffData = baseUrl + "api/staff/byId";

//delete api
export const deleteTables = baseUrl + "api/table/";
export const deleteCategories = baseUrl + "api/category/";
export const deleteMemebers = baseUrl + "api/staff/";
export const deleteMenuList = baseUrl + "api/menu";

// add api

export const addCategory = baseUrl + "api/categories";
export const addTable = baseUrl + "api/table";
export const addStff = baseUrl + "api/staff";

//edit api
export const updateStaffApi = baseUrl + "api/staff";
export const updateCategory = baseUrl + "api/category";
export const updateTable = baseUrl + "api/table/edit";

//trash list api
export const trashCategories = baseUrl + "api/trashCategories";
export const trashStaff = baseUrl + "api/trashStaff";
export const trashTable = baseUrl + "api/trashTable";

//restore api

export const restoreCategories = baseUrl + "api/category/restore/";
export const restoreTable = baseUrl + "api/table/restore/";
export const restoreStaff = baseUrl + "api/staff/restore/";

// harddelete
export const hardDeleteCategories = baseUrl + "api/category/delete/";
