import { Row, Table } from "react-bootstrap";
import { useGetAllWishesQuery } from "state/wishes";

function WishesByUser(): JSX.Element {
  const { data } = useGetAllWishesQuery();
  const allWishes =
    data && data.length
      ? data.map((wishess) => {
          const { wishes, user } = wishess;
          const wishRows =
            wishes && wishes.length
              ? wishes.map((wish) => {
                  return (
                    <tr key={wish.id}>
                      <td>{wish.name}</td>
                      <td>{wish.description}</td>
                      <td>{wish.url}</td>
                    </tr>
                  );
                })
              : null;
          return (
            <Row key={user.id}>
              <h2>{user.email}</h2>
              <Table striped bordered hover responsive="md">
                <thead>
                  <th>Wish</th>
                  <th>Description</th>
                  <th>URL</th>
                </thead>
                <tbody>
                  {/* userWishes */}
                  {wishRows}
                </tbody>
              </Table>
            </Row>
          );
        })
      : null;

  return <>{allWishes}</>;
}

export default WishesByUser;
