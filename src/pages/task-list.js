import TaskList from '../containers/TaskList';
import AppLayout from '../layouts/AppLayout';

export default function Home({ open }) {
  console.log(open);
  return (
    <AppLayout>
      <TaskList open={open} />
    </AppLayout>
  );
}
