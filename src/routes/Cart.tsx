
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";

// Define the type for our Redux store state
type RootState = {
    user: string;
    stock: number[];
};

function Cart() {
    // Properly type the useSelector hook
    let username = useSelector((state: RootState) => {
        return state.user;
    });

    return (
        <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>{username}</td>
                    <td>{username}</td>
                    <td>안녕 {username}</td>
                </tr>
            </tbody>
        </Table>
    );
}

export default Cart;