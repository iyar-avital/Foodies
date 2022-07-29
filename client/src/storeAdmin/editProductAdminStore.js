import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaRegEdit } from "react-icons/fa";
import { BsCardImage } from "react-icons/bs";
import { API_URL, doApiGet, doApiMethod } from "../services/apiService";
import { Col, Container, Form, Row, Spinner, Button } from "react-bootstrap";
import ProductForm from "../comps/utils/forms/ProductForm";
import { motion } from "framer-motion";

function EditProductAdminStore(props) {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  let params = useParams();
  let nav = useNavigate();

  // to get store id
  const location = useLocation();
  const storeInfo = location.state.storeInfo;

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    let urlProduct = API_URL + "/products/single/" + params.prodId;
    let resp2 = await doApiGet(urlProduct);
    setProduct(resp2.data);
    console.log(resp2.data);
    console.log(product);
  };

  const doFormApi = async (formData) => {
    let url = API_URL + "/products/" + product._id;

    try {
      let resp = await doApiMethod(url, "PUT", formData, storeInfo._id);
      if (resp.data.modifiedCount) {
        toast.success("Product Updated");
        nav(-1);
      } else {
        toast.warning("Nothing to update");
      }
    } catch (err) {
      console.log(err.response);
      alert("Failed to update the product, please try again");
      nav("/storeAdmin");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.7 }}
      className="register-photo"
    >
      <Container>
        <Row className="justify-content-between">
          <Col
            md={5}
            className="d-flex shadow flex-direction-column align-items-center justify-content-center"
          >
            <ProductForm item={product} doApi={doFormApi} isLoading={isLoading} />
          </Col>
          <Col
            md={6}
            className="productForm__bg"
            style={{ backgroundImage: `url(${product?.imgUrl})` }}
          ></Col>
        </Row>
      </Container>
    </motion.div>
  );
}

export default EditProductAdminStore;