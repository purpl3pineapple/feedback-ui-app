import Card from "../components/shared/Card";
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <Card>
      <div className="about">
        <h1>About this project:</h1>
        <p>This is a React app to leave feedback on a product or service</p>
        <p>Version: 1.0.0</p>

        <p>
            <Link to='/'>Back to Home</Link>
        </p>
      </div>
    </Card>
  )
}

export default AboutPage
