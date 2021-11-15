import { useEffect, useState } from "react";
import { Button, Modal, Form, ModalProps } from "react-bootstrap";
import { useGetWishQuery, useUpdateWishMutation } from "state/wishes";
import { IWish } from "models/wish";
import { skipToken } from "@reduxjs/toolkit/dist/query";

type WishModalProps = ModalProps & { wishId?: number };

function EditWishModal({ show, onHide, wishId }: WishModalProps): JSX.Element {
  const { data: wishFromId } = useGetWishQuery(wishId ?? skipToken);
  const [updateWish, { isLoading }] = useUpdateWishMutation();

  const [wish, setWish] = useState<Partial<IWish>>();

  const _handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { id, value } = e.target;
    setWish((prevWish) => ({
      ...prevWish,
      [id]: value,
    }));
  };

  const _handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (wish && wish.id) {
      const newWish = await updateWish(wish).unwrap();
      if (newWish) {
        onHide();
      }
    }
  };

  useEffect(() => {
    if (wishFromId) {
      setWish(wishFromId);
    }
  }, [wishFromId]);

  const _handleOnModalExit = () => {
    setWish({
      name: "",
      url: "",
      description: "",
      price: "",
    });
  };

  const _modalTitle = "Edit Wish";
  const _buttonText = "Update Wish";

  return (
    <Modal
      show={show}
      onHide={onHide}
      onExited={_handleOnModalExit}
      fullscreen={"md-down"}
    >
      <Modal.Header closeButton>
        <Modal.Title>{_modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={_handleSubmit}>
          <Form.Group className="form-floating mb-3" controlId="name">
            <Form.Control
              type="text"
              placeholder="Wish name"
              value={wish?.name}
              onChange={_handleChange}
            />
            <Form.Label>Name</Form.Label>
          </Form.Group>

          <Form.Group className="form-floating mb-3" controlId="description">
            <Form.Control
              as="textarea"
              placeholder="Wish dscription"
              value={wish?.description}
              onChange={_handleChange}
            />
            <Form.Label>Description</Form.Label>
          </Form.Group>

          <Form.Group className="form-floating mb-3" controlId="url">
            <Form.Control
              type="url"
              placeholder="URL"
              value={wish?.url}
              onChange={_handleChange}
            />
            <Form.Label>URL</Form.Label>
          </Form.Group>

          <Form.Group className="form-floating mb-3" controlId="price">
            <Form.Control
              type="number"
              step={0.01}
              placeholder="Price"
              value={wish?.price}
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
              {_buttonText}
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

export default EditWishModal;
