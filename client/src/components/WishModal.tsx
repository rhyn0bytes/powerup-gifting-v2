import { useState } from "react";
import { Button, Modal, Form, ModalBody } from "react-bootstrap";
import { wishesApi } from "state/wishes";
import { IWishDTO } from "models/wish";

function WishModal() {
  const [updateWish, { isLoading }] = wishesApi.useCreateWishMutation();
  const [wish, setWish] = useState<IWishDTO>({
    name: "",
    url: "",
    description: "",
    price: "",
  });

  const _handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { id, value } = e.target;
    setWish((prevWish) => ({
      ...prevWish,
      [id]: value,
    }));
  };
  const _handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    updateWish(wish);
  };

  return (
    <Modal fullscreen={"md-down"}>
      <Modal.Header closeButton>
        <Modal.Title>
          New Wish
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={_handleSubmit}>
          <Form.Group className="form-floating mb-3" controlId="name">
            <Form.Control
              type="text"
              placeholder="Wish name"
              value={wish.name}
              onChange={_handleChange}
            />
            <Form.Label>Name</Form.Label>
          </Form.Group>

          <Form.Group className="form-floating mb-3" controlId="description">
            <Form.Control
              as="textarea"
              placeholder="Wish dscription"
              value={wish.description}
              onChange={_handleChange}
            />
            <Form.Label>Description</Form.Label>
          </Form.Group>

          <Form.Group className="form-floating mb-3" controlId="url">
            <Form.Control
              type="url"
              placeholder="URL"
              value={wish.url}
              onChange={_handleChange}
            />
            <Form.Label>URL</Form.Label>
          </Form.Group>

          <Form.Group className="form-floating mb-3" controlId="price">
            <Form.Control
              type="number"
              placeholder="Price"
              value={wish.price}
              onChange={_handleChange}
            />
            <Form.Label>Price</Form.Label>
          </Form.Group>

          <div className="d-grid">
            <Button
              variant="primary"
              disabled={isLoading}
              type="submit"
              className="btn-login text-uppercase fw-bold mb-3"
            >
              Create Wish
            </Button>
          </div>

          {/* {loginErrors ? (
            <Alert variant="danger" className="mb-0">
              {loginErrors}
            </Alert>
          ) : null} */}
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default WishModal;
