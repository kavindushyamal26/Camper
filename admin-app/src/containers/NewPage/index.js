import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Modal from "../../components/UI/Modal";
import Input from "../../components/UI/Input";
import { Container, Row, Col } from "react-bootstrap";
import linearCategories from "../../helpers/linearCategories";
import { useSelector, useDispatch } from "react-redux";
import Category from "./../Category/index";
import { createPage } from "../../actions";
import "./style.css";
import { ImFolderUpload } from "react-icons/im";

const NewPage = (props) => {
  const [createModal, setCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const category = useSelector((state) => state.category);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);

  useEffect(() => {
    setCategories(linearCategories(category.categories));
  }, [category]);

  useEffect(() => {
    console.log(page);
    if (!page.loading) {
      // setCreateModal(false);
      setTitle("");
      setCategoryId("");
      setDesc("");
      setProducts([]);
      setBanners([]);
    }
  }, [page]);

  const onCategoryChange = (e) => {
    const category = categories.find(
      (category) => category.value == e.target.value
    );
    setCategoryId(e.target.value);
    setType(category.type);
  };

  const handleBannerImages = (e) => {
    console.log(e);
    setBanners([...banners, e.target.files[0]]);
  };

  const handleProductImages = (e) => {
    console.log(e);
    setProducts([...products, e.target.files[0]]);
  };

  const submitPageForm = (e) => {
    //e.target.preventDefault();

    if (title === "") {
      alert("Title is required");
      setCreateModal(false);
      return;
    }

    const form = new FormData();
    form.append("title", title);
    form.append("description", desc);
    form.append("category", categoryId);
    form.append("type", type);
    banners.forEach((banner, index) => {
      form.append("banners", banner);
    });
    products.forEach((product, index) => {
      form.append("products", product);
    });

    //console.log({ title, desc, categoryId, type, banners, products });
    dispatch(createPage(form));
  };

  const renderCreatePageModal = () => {
    return (
      <Modal
        show={createModal}
        modalTitle={"Create New Page"}
        handleClose={() => setCreateModal(false)}
        onSubmit={submitPageForm}
      >
        <Container>
          <Row>
            <Col>
              {/* <select
                className="form-control form-control-sm"
                value={categoryId}
                onChange={onCategoryChange}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select> */}
              <Input
                type="select"
                value={categoryId}
                onChange={onCategoryChange}
                options={categories}
                placeholder={"Select Category"}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={"Page Title"}
                className="form-control-sm"
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <Input
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder={"Page Description"}
                className="form-control-sm"
              />
            </Col>
          </Row>

          {banners.length > 0
            ? banners.map((banner, index) => (
                <Row key={index}>
                  <Col>{banner.name}</Col>
                </Row>
              ))
            : null}
          <Row>
            <Col>
              <Input
                className="form-control form-control-sm"
                type="file"
                name="banners"
                onChange={handleBannerImages}
              />
            </Col>
          </Row>

          {products.length > 0
            ? products.map((product, index) => (
                <Row key={index}>
                  <Col>{product.name}</Col>
                </Row>
              ))
            : null}
          <Row>
            <Col>
              <Input
                className="form-control form-control-sm"
                type="file"
                name="products"
                onChange={handleProductImages}
                className="form-control-sm"
              />
            </Col>
          </Row>
        </Container>
      </Modal>
    );
  };

  return (
    <Layout sidebar>
      <div className="s3">
        <ImFolderUpload style={{ fontSize: "30px", marginBottom: "10px" }} />
        <br />
        <h1>Create New Page</h1>
        <h5>Using Create New Button Admin Can Create New Page</h5>
      </div>
      <div className="s4">
        <ul>
          <li>Press Create Page Button</li>
          <li>Select Advertising Category</li>
          <li>Add Page Title</li>
          <li>Add Page Description</li>
          <li>Add Page Banners</li>
          <li>Add Page Posters</li>
          <li>Save Chages</li>
        </ul>
      </div>
      {page.loading ? (
        <p>Creating Page.... Please Wait !</p>
      ) : (
        <>
          <div className="btn-n1">
            {renderCreatePageModal()}
            <button className="btn-nwpg" onClick={() => setCreateModal(true)}>
              Create Page
            </button>
          </div>
        </>
      )}
    </Layout>
  );
};

export default NewPage;
