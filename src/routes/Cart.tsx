import { useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";

function Cart() {

    let a = useSelector((state) => {
        return state.user
    })

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
                    <td>{a.name}</td>
                    <td>{a}</td>
                    <td>안녕{a.name}</td>
                </tr>
            </tbody>
        </Table>
    )
}
export default Cart;