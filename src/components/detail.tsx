import { Card } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState, useAppDispatch } from '../store/store';
import { removeDelivery, updateDelivery } from '../store/delivery';

const { Meta } = Card;

function DetailComponent() {
  const { id } = useParams();
  const delivery = useSelector((state: RootState) => state.delivery.deliveries.find((delivery) => delivery.id === Number(id)));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (!delivery) {
    return <div>Delivery not found</div>;
  }

  return (
    <Card
      hoverable
      style={{ width: 240 }}
      actions={
        [
          <a key="edit" onClick={() => {
            dispatch(updateDelivery({
              id: delivery.id,
              updates: { statut: delivery.statut === 1 ? 2 : 1, tips: delivery.tips + 1 }
            }))
          }}>Edit</a>,
          <a key="delete" onClick={() => {
            dispatch(removeDelivery(delivery.id));
            navigate('/');
          }}>Delete</a>,
        ]
      }
    >
      <Meta
        title={`Delivery Id :${id}`}
        description={
          <div>
            <p>Drive ID: {delivery.driveId}</p>
            <p>Customer ID: {delivery.customerId}</p>
            <p>Tips: {delivery.tips}</p>
            <p>Statut: {delivery.statut}</p>
          </div>
        }
      />
    </Card>
  )
}

export default DetailComponent;