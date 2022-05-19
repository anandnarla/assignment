import { useEffect, useState } from 'react'
import './EmployeeList.css'

const EmployeeList = (props) => {

    const [employees, setEmployees] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    // get the employees details when the component is rendered
    // empty array of dependencies passed to the useEffect ensures that 
    // this will effect will be called only once.
    useEffect(() => {
        const getEmployees = async () => {
            try {
                const response = await fetch("http://localhost:3001/employees")
                const json = await response.json()
                setEmployees(json)
            } catch (err) {
                setError("Something went wrong")
            }
            setIsLoading(false)
        }
        getEmployees();
    }, [])

    // we are fetching all the employee fields in useEffect and
    // conditionally rendering salary field and values only if the user is an admin for simplicity.
    // instead we can maintain multiple API endpoints or API can omit the field depending 
    // on the user role. we can even use GraphQL and ApolloClient for selectively fetching the data 
    // as suggested in the interview 

    // Render a row for each employee detail
    const employeeRows = employees.map(employee => (<tr key={employee.id}>
        <td>{employee.id}</td>
        <td>{employee.name}</td>
        <td>{employee.address}</td>
        <td>{employee.phone}</td>
        {props.role === "admin" ? <td>{employee.salary}</td> : null}
    </tr>))

    // table header
    const tableHeader = <thead>
        <tr>
            <th>Employee Id</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone Number</th>
            {props.role === "admin" ? <th>Salary</th> : null}
        </tr>
    </thead>

    // table body
    const tableBody = <tbody>
        {employeeRows}
    </tbody>

    // render content only if there is no error
    const content = error ? <p className='Error'>{error}</p> : (<table>
        {tableHeader}
        {tableBody}
    </table>)

    return (
        <div className='EmployeeList'>
            <h2>Employee List</h2>
            <h3>Logged in as {props.role}</h3>
            {isLoading ? <p>Loading....</p> : content}
        </div>
    )
}

export default EmployeeList