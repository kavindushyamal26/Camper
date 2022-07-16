import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Container, Row, Col, Table } from "react-bootstrap";
import Input from "./../../components/UI/Input/index";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProductById } from "../../actions";
import Modal from "../../components/UI/Modal";
import "./style.css";
import { generatePublicUrl } from "../../urlConfig";
import { IoCheckmark } from "react-icons/io5";
import { AiFillDelete, AiFillInfoCircle } from "react-icons/ai";

const Products = (props) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [show, setShow] = useState(false);
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const handleClose = () => {
    setShow(false);
  };

  // useEffect(() => {}, [product]);

  const submitProductForm = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("quantity", quantity);
    form.append("price", price);
    form.append("description", description);
    form.append("category", categoryId);

    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }
    console.log(name);
    // let data = {
    //   name,
    //   quantity,
    //   price,
    //   description,
    //   categoryId,
    //   productPictures,
    // };
    dispatch(addProduct(form)).then(() => setShow(false));
  };
  const handleShow = () => setShow(true);

  //   dispatch(addProduct(form));
  //   // form.append("parentId", parentCategoryId);
  //   // console.log(form);
  //   // let form = {
  //   //   name: categoryName,
  //   //   parentId: parentCategoryId,
  //   // };
  //   //dispatch(addCategory(form));
  //   // const cat = {
  //   //   categoryName,
  //   //   parentCategoryId,
  //   // };
  //   // console.log(cat);
  //   setShow(false);
  // };
  // const handleShow = () => setShow(true);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };
  //console.log(productPictures);

  const renderProducts = () => {
    return (
      <Table style={{ fontSize: 16 }} responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            {/* <th>Description</th> */}
            {/* <th>Product Pictures</th> */}
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((product) => (
                <tr
                  //onClick={() => showProductDetailModal(product)}
                  key={product._id}
                >
                  <td>
                    <IoCheckmark />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category.name}</td>
                  <td>
                    <button
                      className="bi"
                      onClick={() => showProductDetailModal(product)}
                      style={{ padding: "0px 10px 5px 10px" }}
                    >
                      <AiFillInfoCircle />
                    </button>
                    <button
                      className="bd"
                      onClick={() => {
                        const payload = {
                          productId: product._id,
                        };
                        dispatch(deleteProductById(payload));
                      }}
                      style={{ padding: "0px 10px 5px 10px" }}
                    >
                      <AiFillDelete />
                    </button>
                  </td>
                  {/* <td>Table cell</td> */}
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };

  const renderAddProductModal = () => {
    return (
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={"Add New Product"}
        onSubmit={submitProductForm}
      >
        <Input
          label="Name"
          value={name}
          placeholder="Poduct Name"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Quantity"
          value={quantity}
          placeholder="Quantity"
          //type="text"
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          label="Price"
          value={price}
          placeholder="Price"
          //type="text"
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          label="Description"
          value={description}
          placeholder="Description"
          //type="text"
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="form-control"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option> Select Category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>

        {productPictures.length > 0
          ? productPictures.map((pic, index) => (
              <div key={index}>{pic.name}</div>
            ))
          : null}

        <input
          type="file"
          name="productPicture"
          onChange={handleProductPictures}
        />
      </Modal>
    );
  };

  const handleCloseProductDetailsModal = () => {
    setProductDetailModal(false);
  };

  const showProductDetailModal = (product) => {
    setProductDetails(product);
    setProductDetailModal(true);
    //console.log(product);
  };

  const renderProductDetailModal = () => {
    if (!productDetails) {
      return null;
    }
    return (
      <Modal
        show={productDetailModal}
        handleClose={handleCloseProductDetailsModal}
        modalTitle={"Product Details"}
        size="lg"
      >
        <Row>
          <Col md="6">
            <label className="key">Name</label>
            <p className="value">{productDetails.name}</p>
          </Col>
          <Col md="6">
            <label className="key">Price</label>
            <p className="value">{productDetails.price}</p>
          </Col>
        </Row>

        <Row>
          <Col md="6">
            <label className="key">Quantity</label>
            <p className="value">{productDetails.quantity}</p>
          </Col>
          <Col md="6">
            <label className="key">Category</label>
            <p className="value">{productDetails.category.name}</p>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <label className="key">Description</label>
            <p className="value">{productDetails.description}</p>
          </Col>
        </Row>

        <Row>
          <Col>
            <label className="key">Product Pictures</label>
            <div style={{ display: "flex" }}>
              {productDetails.productPictures.map((picture) => (
                <div className="productImgContainer">
                  <img src={generatePublicUrl(picture.img)} alt="" />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Modal>
    );
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div
              className="p"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <h3>Products</h3>
              <button className="pb" onClick={handleShow}>
                Add
              </button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>{renderProducts()}</Col>
        </Row>
      </Container>
      {renderAddProductModal()}
      {renderProductDetailModal()}
    </Layout>
  );
};

export default Products;
