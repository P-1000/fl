import React from 'react'
import { Link } from 'react-router-dom'
const Flows = () => {
  return (
    <div>
        <Link  to={"./create-flows"}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create Flow
        </Link>
    </div>
  )
}

export default Flows