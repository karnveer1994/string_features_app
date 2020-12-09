import React, { useState, useEffect } from "react"
import axios from 'axios';
import { DeleteFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, Typography, Table, Space } from 'antd';

const { confirm } = Modal;

export default function MatchRecords() {
  
  const token = localStorage.getItem('token')
  const headers = {
    Authorization: token,
  }

  const [matchArray, setMatchArray] = useState([]);
  
  useEffect(() => {
    async function fetchData(){
      const matchListResponse = await axios.get(`/api/v1/match_records`, { headers })
      setMatchArray(matchListResponse.data)
    }
    fetchData();
  }, [])

  const handleDeleteConfirm = (id) => {
    confirm({
      title: 'Are you sure delete this string match?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          const response = await axios.delete(`/api/v1/match_records/${id}`, { headers })
          if (response) {
            const listResponse = await axios.get(`/api/v1/match_records`, { headers })
            setMatchArray(listResponse.data || [])
          }
        } catch (error) {
          console.log(error)
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const columns = [
    {
      title: 'First String',
      dataIndex: 'first_string',
      key: 'first_string',
    },
    {
      title: 'Second String',
      dataIndex: 'second_string',
      key: 'second_string',
    },
    {
      title: 'Result',
      dataIndex: 'result',
      key: 'result',
      render: text => text.toString(),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <DeleteFilled onClick={() => handleDeleteConfirm(record.key)} />
        </Space>
      ),
    }
  ];

  const data = matchArray.map((arr) => {
    const { first_string, second_string, result, id } = arr
    return {
      key: id,
      first_string,
      second_string,
      result
    }
  })


  return (
    <div className="col-md-6 col-md-offset-3">
      {
        matchArray.length ?
        <>
          <Typography.Title level={2}>List of Matching Calculation </Typography.Title>
          <Table columns={columns} dataSource={data} />
        </> :
        <Typography.Title level={2}>'No Records in Match List!'</Typography.Title>
      }
    </div>
  )
}
