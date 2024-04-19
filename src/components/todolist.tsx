import { Card } from 'antd';
import { useDeleteTodoMutation, useGetAllTodosQuery } from '../API/todoApi';

function TodoList() {
  const { data, error, isLoading, isFetching } = useGetAllTodosQuery();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleDelete = async (id: number) => {
    try {
      console.log('Deleting todo: ', id);
      await deleteTodo(id).unwrap();
    } catch (error) {
      console.error('Failed to delete todo: ', error);
    }
  };

  return (
    <div>
      {error && <p>Something went wrong</p>}
      {isFetching && <p>fetching ...</p>}
      {isLoading && <p>Loading ...</p>}
      {data?.map((todo: Todo) => (
        <Card key={todo.id} id={todo.id} actions={
          [
            <a key="edit">Edit</a>,
            <a key="delete" onClick={() => handleDelete(todo.id)}>Delete</a>
          ]

        }>
          <Card.Meta title={todo.title} description={todo.body} />
        </Card>
      ))}
    </div>
  );
}

export default TodoList;