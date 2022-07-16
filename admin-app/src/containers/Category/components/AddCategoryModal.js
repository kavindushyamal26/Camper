import React from "react";
import Input from "../../../components/UI/Input";
import Modal from "../../../components/UI/Modal";
import { Container, Row, Col } from "react-bootstrap";

const AddCategoryModal = (props) => {
  const {
    show,
    handleClose,
    modalTitle,
    categoryName,
    setCategoryName,
    parentCategoryId,
    setparentCategoryId,
    categoryList,
    handleCategoryImage,
    onSubmit,
  } = props;

  return (
    <Modal
      show={show}
      handleClose={handleClose}
      onSubmit={onSubmit}
      modalTitle={modalTitle}
    >
      <Input
        //label="categoryName"
        placeholder="Category Name"
        value={categoryName}
        type="text"
        onChange={(e) => setCategoryName(e.target.value)}
        className="form-control-md"
      />
      <select
        className="form-control form-control-md"
        value={parentCategoryId}
        onChange={(e) => setparentCategoryId(e.target.value)}
      >
        <option> Select Category</option>
        {categoryList.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>

      <input
        style={{ paddingTop: "14px" }}
        type="file"
        name="categoryImage"
        onChange={handleCategoryImage}
      />
    </Modal>
  );
};

export default AddCategoryModal;
