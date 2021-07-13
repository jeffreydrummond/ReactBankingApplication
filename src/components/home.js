import bank from '../resources/images/bank.png';
import { Card } from 'react-bootstrap';
import { Image } from 'react-bootstrap';


function Home() {
    return (
<div>
<Card className="text-left">
      <Card.Body>
        <Card.Title>
          <h4>For all your banking needs</h4>
        </Card.Title>
        <Image src={bank} fluid alt="Responsive" />
      </Card.Body>
    </Card>
</div>
    );
}
export default Home;