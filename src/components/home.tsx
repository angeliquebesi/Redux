import { Flex } from "antd"
import { Link } from "react-router-dom"

function Home() {

  return (
    <Flex vertical>
      <Link to="/deliveries">Deliveries List</Link>
      <Link to="/todo">Todo List</Link>
    </Flex>
  )
}

export default Home