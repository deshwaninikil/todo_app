import Layout from "@/component/Layout/Layout";
import ProtectedRoute from "../ProtectedRoute";
import TodoList from "@/component/TodoList/TodoList";

const todolist = () => {
  return (
    <>
      <ProtectedRoute />
      <Layout>
        <TodoList />
      </Layout>
      <ProtectedRoute />
    </>
  );
};

export default todolist;
