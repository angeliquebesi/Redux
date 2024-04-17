import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../store/store"
import { Delivery, addDelivery, removeDelivery, updateDelivery } from "../store/delivery"
import { Button, Table } from "antd"
import type { TableColumnsType } from 'antd';
import { useNavigate } from "react-router-dom";

interface DataType {
  id: number;
  key: number;
  driveId: number;
  customerId: number;
  tips: number;
  statut: number;
  actions: string;
}

function DeliveryComponent() {
  const navigate = useNavigate()
  const deliveries = useSelector((state: RootState) => state.delivery)
  const dispatch = useAppDispatch()
  function getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Delivery ID',
      dataIndex: 'key',
    },
    {
      title: 'Drive ID',
      dataIndex: 'driveId',
    },
    {
      title: 'Customer ID',
      dataIndex: 'customerId',
    },
    {
      title: 'Tips',
      dataIndex: 'tips',
    },
    {
      title: 'Status',
      dataIndex: 'statut',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_: undefined, record: DataType) => (
        <>
          <Button onClick={() => dispatch(removeDelivery(record.key))}>Remove</Button>
          <Button onClick={() => dispatch(updateDelivery({ id: record.key, updates: { tips: getRandomInt(101) } }))}>Update</Button>
          <Button onClick={() => { navigate(`/detail/${record.key}`) }}>See more</Button>
        </>
      ),
    },
  ]

  return (
    <>
      <h3>Deliveries</h3>

      <div>
        {deliveries.deliveries.length === 0 ? <p>No deliveries</p> :
          <>
            <h4>Delivery List</h4>
            <Table
              columns={columns}
              dataSource={deliveries.deliveries.map((delivery: Delivery) => ({
                key: delivery.id,
                driveId: delivery.driveId,
                customerId: delivery.customerId,
                tips: delivery.tips,
                statut: delivery.statut,
              }))}
            />
          </>
        }
      </div>

      <Button onClick={() =>
        dispatch(addDelivery({
          id: getRandomInt(101),
          driveId: getRandomInt(101),
          customerId: getRandomInt(101),
          tips: getRandomInt(101),
          statut: getRandomInt(8)
        }))
      }>Add Delivery</Button>
    </>
  )
}

export default DeliveryComponent