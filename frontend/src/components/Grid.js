import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-raius: 5px;
    max-width: 800px;
    margin: 20px auto;
    word-break: breack-all;
`;

export const Thead = styled.thead``;
export const Tr = styled.tr``;
export const Th = styled.th`
    text-align: start;
    border-bottom: inset;
    padding-bottom: 5px

    @media (max-width: 500px){
        ${(props) => props.onlyWeb && "display: none"}
    }
`;
export const Tbody = styled.tbody``;

export const Td = styled.td`
    text-align: ${(props) => (props.alignCenter ? "center" : "start")};
    width: ${(props) => (props.width ? props.width : "auto")};
    padding-top: 15px

    @media (max-width: 500px){
        ${(props) => props.onlyWeb && "display: none"}
    }
`;

const Grid = ({ users, setUsers,setOnEdit }) => {

    const handleEdit = (item) => {
        setOnEdit(item)
    };

    const handleDelete = async (id) =>{
        await axios
            .delete("http://localhost:500/" + id)
            .then(({data}) => {
                const newArray = users.filter((user) => user.id !== id);
                setUsers(newArray);
                toast.success(data);
            })
            .catch(({data})=>toast.error(data));
        setOnEdit(null);
    };

    return(
        <Table>
            <Thead>
                <Tr>
                    <Th>Id</Th>
                    <Th>Nome</Th>
                    <Th>Email</Th>
                    <Th onlyWeb>Data Nascimento</Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {users.map((item, i) =>(
                    <Tr key={i}>
                        <Td width="20%">{item.id}</Td>
                        <Td width="30%">{item.nome}</Td>
                        <Td width="30%">{item.email}</Td>
                        <Td width="30%" onlyWeb>{item.data_nas}</Td>
                        <Td width="5%" alignCenter><FaEdit onClick={() => handleEdit(item)}/></Td>
                        <Td width="5%" alignCenter><FaTrash  onClick={() => handleDelete(item.id)}/></Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default Grid;