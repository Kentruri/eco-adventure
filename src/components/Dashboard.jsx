import { signOut } from "@/redux/slices/auth"
import { useDispatch } from "react-redux"

const Dashboard = () => {
  const dispatch = useDispatch()
  return (
    <div>
      Dashboard
      <button onClick={() => dispatch(signOut())}>
        Logout
      </button>
    </div>
  )
}

export default Dashboard