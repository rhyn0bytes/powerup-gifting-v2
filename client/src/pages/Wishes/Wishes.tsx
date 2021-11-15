import Wish from "components/Wish";

import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import { useGetWishesQuery } from "../../state/wishes";
import CreateWishModal from "./CreateWishModal";
import EditWishModal from "./EditWishModal";

function Wishes(): JSX.Element {
  const [showNewWish, setShowNewWish] = useState<boolean>(false);
  const [showEditWish, setShowEditWish] = useState<boolean>(false);
  const [wishToEdit, setWishToEdit] = useState<number | undefined>();
  const { data: wishes, isLoading, isFetching } = useGetWishesQuery();

  const _setWishToEdit = (wishId: number) => {
    setWishToEdit(wishId);
    setShowEditWish(true);
  };
  const wishItems = wishes?.length
    ? wishes.map((wish) => (
        <Col className="mb-3">
          <Wish {...wish} key={wish.id} editWish={_setWishToEdit} />
        </Col>
      ))
    : null;

  const toggleNewWish = () => {
    setWishToEdit(undefined);
    setShowNewWish(!showNewWish);
  };

  const toggleEditWish = () => {
    setShowEditWish(!showEditWish);
  };

  useEffect(() => {
    if (showEditWish === false && wishToEdit !== undefined)
      setWishToEdit(undefined);
  }, [showEditWish, wishToEdit]);

  return (
    <div style={{ textAlign: "left" }}>
      {isFetching ? "Refreshing..." : ""}
      {isLoading ? "Loading..." : ""}
      <Container>
        <Row className="">
          <Stack direction="horizontal" gap={3} className="my-4">
            <div className="">
              <h1>My Wishes</h1>
            </div>
            <div className=" ms-auto">
              <Button variant="primary" onClick={toggleNewWish}>
                New Wish
              </Button>
            </div>
          </Stack>
        </Row>
        <Row md={4} sm={2} xs={1}>{wishItems}</Row>
      </Container>
      <CreateWishModal show={showNewWish} onHide={toggleNewWish} />
      <EditWishModal
        show={showEditWish}
        onHide={toggleEditWish}
        wishId={wishToEdit}
      />
    </div>
  );
}

export default Wishes;
