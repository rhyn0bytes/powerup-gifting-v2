import { IWish } from "models/wish";
import { Card, Button, Stack } from "react-bootstrap";

type WishProps = IWish & { editWish: (wishId: number) => void };

function Wish({ id, name, description, url, price, editWish }: WishProps) {
  const _editWish = () => {
    editWish(id);
  };
  return (
    <Card className="h-100">
      <Card.Body className="h-100">
        <Card.Title>{name}</Card.Title>
        <Card.Text className="flex-fill">
          <div className="d-flex flex-column">
            {description ? (
              <span className="flex-fill">{description}</span>
            ) : (
              <span className="flex-fill">
                <br />
              </span>
            )}
            <span>
              <br />
            </span>
            <span>URL: {url}</span>
            <span>Price: {price}</span>
          </div>
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-center">
        <Button size="sm" onClick={_editWish}>
          Edit Wish
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default Wish;
