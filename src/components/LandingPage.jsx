import { useNavigate } from "react-router-dom";

const LadingPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <p>
      Hi there
      </p>
      <button onClick={() => navigate("/login")}>
       Login 
      </button>
    </div>
  )
}

export default LadingPage;