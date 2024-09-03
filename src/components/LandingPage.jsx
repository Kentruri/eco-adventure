import { useNavigate } from "react-router-dom";
import '@/App.css';

const LadingPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <body className="landing-body">
      <div className="landing-container">
      <img src="public\logo\gitRD.png" className="landing-image-logo"/>
      <button className="landing-button" onClick={() => navigate("/login")}>Login </button>
      <footer className="landing-footer">
        <p>© 2024 EcoAdventure. All rights reserved.</p>
      </footer>
      </div>
      </body>
    </div>
  )
}

export default LadingPage;