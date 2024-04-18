import { Card } from 'antd';
import { useGetAllTodosQuery } from '../API/todoApi';

function TodoList() {
  const { data, error, isLoading, isFetching } = useGetAllTodosQuery();

  return (
    <div>
      {error && <p>Something went wrong</p>}
      {isFetching && <p>fetching ...</p>}
      {isLoading && <p>Loading ...</p>}
      {data?.map((todo: Todo) => (
        <Card key={todo.id} id={todo.id}>
          <Card.Meta title={todo.title} description={todo.body} />
        </Card>
      ))}
    </div>

  )
}

export default TodoList