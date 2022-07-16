import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategory,
  addCategory,
  updateCategories,
  deleteCategories as deleteCategoriesAction,
} from "../../actions";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input/index";
import Modal from "../../components/UI/Modal";
import CheckboxTree from "react-checkbox-tree";
import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosTrash,
  IoIosCloudUpload,
  IoIosAdd,
} from "react-icons/io";

import "react-checkbox-tree/lib/react-checkbox-tree.css";
import UpdateCategoriesModal from "./components/UpdateCategoriesModal";
import AddCategoryModal from "./components/AddCategoryModal";
import "./style.css";
//import Category from "./index";
//import { addCategory } from "./../../actions/category.action";

const Category = (props) => {
  const category = useSelector((state) => state.category);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setparentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [show, setShow] = useState(false);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!category.loading) {
      setShow(false);
    }
  }, [category.loading]);

  const handleClose = () => {
    const form = new FormData();

    if (categoryName === "") {
      alert("Category Name is required");
      //setShow(false);
      return;
    }

    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);
    dispatch(addCategory(form));
    setCategoryName("");
    setparentCategoryId("");

    // let form = {
    //   name: categoryName,
    //   parentId: parentCategoryId,
    //   categoryImage: categoryImage,
    // };

    // console.log(form);

    // const cat = {
    //   categoryName,
    //   parentCategoryId,
    // };

    // console.log(cat);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const renderCategories = (categories) => {
    let mycategories = [];
    for (let category of categories) {
      mycategories.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }
    return mycategories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        type: category.type,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const updateCategory = () => {
    updateCheckedAndExpandedCategories();
    setUpdateCategoryModal(true);
  };

  const updateCheckedAndExpandedCategories = () => {
    const categories = createCategoryList(category.categories);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && checkedArray.push(category);
      });
    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && expandedArray.push(category);
      });
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
  };

  const handleCategoryInput = (key, value, index, type) => {
    if (type == "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type == "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
  };

  const updateCategoriesForm = () => {
    const form = new FormData();
    expandedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });

    checkedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });

    dispatch(updateCategories(form));
    alert("Update Success.");
    setUpdateCategoryModal(false);
  };

  // const renderUpdateCategoriesModal = () => {
  //   return (
  //     <Modal
  //       show={updateCategoryModal}
  //       handleClose={updateCategoriesForm}
  //       modalTitle={"Update Categories"}
  //       size="lg"
  //     >
  //       <Row>
  //         <Col>
  //           <h6>Expanded</h6>
  //         </Col>
  //       </Row>
  //       {expandedArray.length > 0 &&
  //         expandedArray.map((item, index) => (
  //           <Row key={index}>
  //             <Col>
  //               <Input
  //                 //label="categoryName"
  //                 placeholder="Category Name"
  //                 value={item.name}
  //                 type="text"
  //                 onChange={(e) =>
  //                   handleCategoryInput(
  //                     "name",
  //                     e.target.value,
  //                     index,
  //                     "expanded"
  //                   )
  //                 }
  //               />
  //             </Col>

  //             <Col>
  //               <select
  //                 className="form-control"
  //                 value={item.parentId}
  //                 onChange={(e) =>
  //                   handleCategoryInput(
  //                     "parentId",
  //                     e.target.value,
  //                     index,
  //                     "expanded"
  //                   )
  //                 }
  //               >
  //                 <option> Select Category</option>
  //                 {createCategoryList(category.categories).map((option) => (
  //                   <option key={option.value} value={option.value}>
  //                     {option.name}
  //                   </option>
  //                 ))}
  //               </select>
  //             </Col>

  //             <Col>
  //               <select className="form-control">
  //                 <option value="">Select Type</option>
  //                 <option value="store">Store</option>
  //                 <option value="product">Product</option>
  //                 <option value="page">Page</option>
  //               </select>
  //             </Col>
  //           </Row>
  //         ))}
  //       <Row>
  //         <Col>
  //           <h6>Checked</h6>
  //         </Col>
  //       </Row>

  //       {checkedArray.length > 0 &&
  //         checkedArray.map((item, index) => (
  //           <Row key={index}>
  //             <Col>
  //               <Input
  //                 //label="categoryName"
  //                 placeholder="Category Name"
  //                 value={item.name}
  //                 type="text"
  //                 onChange={(e) =>
  //                   handleCategoryInput(
  //                     "name",
  //                     e.target.value,
  //                     index,
  //                     "checked"
  //                   )
  //                 }
  //               />
  //             </Col>

  //             <Col>
  //               <select
  //                 className="form-control"
  //                 value={item.parentId}
  //                 onChange={(e) =>
  //                   handleCategoryInput(
  //                     "parentId",
  //                     e.target.value,
  //                     index,
  //                     "checked"
  //                   )
  //                 }
  //               >
  //                 <option> Select Category</option>
  //                 {createCategoryList(category.categories).map((option) => (
  //                   <option key={option.value} value={option.value}>
  //                     {option.name}
  //                   </option>
  //                 ))}
  //               </select>
  //             </Col>

  //             <Col>
  //               <select className="form-control">
  //                 <option value="">Select Type</option>
  //                 <option value="store">Store</option>
  //                 <option value="product">Product</option>
  //                 <option value="page">Page</option>
  //               </select>
  //             </Col>
  //           </Row>
  //         ))}

  //       {/* <input
  //       type="file"
  //       name="categoryImage"
  //       onChange={handleCategoryImage}
  //     /> */}
  //     </Modal>
  //   );
  // };

  // const renderAddCategoryModal = () => {
  //   return (
  //     <Modal
  //       show={show}
  //       handleClose={handleClose}
  //       modalTitle={"Add New Category"}
  //     >
  //       <Input
  //         //label="categoryName"
  //         placeholder="Category Name"
  //         value={categoryName}
  //         type="text"
  //         onChange={(e) => setCategoryName(e.target.value)}
  //       />
  //       <select
  //         className="form-control"
  //         value={parentCategoryId}
  //         onChange={(e) => setparentCategoryId(e.target.value)}
  //       >
  //         <option> Select Category</option>
  //         {createCategoryList(category.categories).map((option) => (
  //           <option key={option.value} value={option.value}>
  //             {option.name}
  //           </option>
  //         ))}
  //       </select>

  //       <input
  //         type="file"
  //         name="categoryImage"
  //         onChange={handleCategoryImage}
  //       />
  //     </Modal>
  //   );
  // };

  const deleteCategory = () => {
    updateCheckedAndExpandedCategories();
    setDeleteCategoryModal(true);
  };

  const deleteCategories = () => {
    const checkedIdsArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));
    const expandedIdsArray = expandedArray.map((item, index) => ({
      _id: item.value,
    }));
    const idsArray = expandedIdsArray.concat(checkedIdsArray);

    if (checkedIdsArray.length > 0) {
      dispatch(deleteCategoriesAction(checkedIdsArray)).then((result) => {
        if (result) {
          dispatch(getAllCategory());
          //setDeleteCategoryModal(false);
        }
      });
    }

    // if (checkedIdsArray.length > 0) {
    //     dispatch(deleteCategoriesAction(checkedIdsArray))
    //         .then(result => {
    //             if (result) {
    //                 dispatch(getAllCategory())
    //                 setDeleteCategoryModal(false)
    //             }
    //         });
    // }

    setDeleteCategoryModal(false);
  };

  const renderDeleteCategoryModal = () => {
    //console.log("delete", checkedArray);
    return (
      <Modal
        modalTitle="Confirm"
        show={deleteCategoryModal}
        handleClose={() => setDeleteCategoryModal(false)}
        buttons={[
          {
            label: "No",
            color: "primary",
            onClick: () => {
              alert("no");
            },
          },
          {
            label: "Yes",
            color: "danger",
            onClick: deleteCategories,
          },
        ]}
      >
        <h5>Expanded</h5>
        {expandedArray.map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}
        <h5>Checked</h5>
        {checkedArray.map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}
      </Modal>
    );
  };

  const categoryList = createCategoryList(category.categories);

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div
              className="cat"
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <h3 style={{ fontSize: "40px" }}>category</h3>
              <div className="actionBtnContainer">
                <button className="b b1" onClick={handleShow}>
                  <IoIosAdd />
                  <br></br>
                  <span>Add</span>
                </button>
                <button className="b b2" onClick={deleteCategory}>
                  <IoIosTrash />
                  <br></br>
                  <span>Delete</span>
                </button>
                <button className="b b3" onClick={updateCategory}>
                  <IoIosCloudUpload />
                  <br></br>
                  <span>Edit</span>
                </button>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="items">
          <Col md={12}>
            {/* <ul>{renderCategories(category.categories)}</ul> */}
            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoIosCheckbox />,
                uncheck: <IoIosCheckboxOutline />,
                halfCheck: <IoIosCheckboxOutline />,
                expandClose: <IoIosArrowForward />,
                expandOpen: <IoIosArrowDown />,
              }}
            />
          </Col>
        </Row>
        {/* <Row>
          <Col>
            <button onClick={deleteCategory}>Delete</button>
            <button onClick={updateCategory}>Edit</button>
          </Col>
        </Row> */}
      </Container>

      {/* Add Categories */}
      <AddCategoryModal
        show={show}
        handleClose={() => setShow(false)}
        onSubmit={handleClose}
        modalTitle={"Add New Category"}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        parentCategoryId={parentCategoryId}
        setparentCategoryId={setparentCategoryId}
        categoryList={categoryList}
        handleCategoryImage={handleCategoryImage}
        // size="lg"
      />

      {/* Edit Categories */}
      <UpdateCategoriesModal
        show={updateCategoryModal}
        handleClose={() => setUpdateCategoryModal(false)}
        onSubmit={updateCategoriesForm}
        modalTitle={"Update Categories"}
        size="lg"
        expandedArray={expandedArray}
        checkedArray={checkedArray}
        handleCategoryInput={handleCategoryInput}
        categoryList={categoryList}
      />

      {/* Delete Categories */}
      {renderDeleteCategoryModal()}
      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}
    </Layout>
  );
};

export default Category;
