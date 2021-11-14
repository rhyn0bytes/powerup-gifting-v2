import { 
  Card,
} from "react-bootstrap";

function Wish() {
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          Title {/* should load the name here?  */}
        </Card.Title>
        <Card.Text>
          Description {/* Wish description */}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Wish;