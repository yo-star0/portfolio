import { useState } from 'react';
import { 
  DndContext, 
  DragOverlay, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors, 
} from '@dnd-kit/core';
import type { DragStartEvent, DragOverEvent } from '@dnd-kit/core';
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable';
import { Column } from './Column';
import { TaskCard } from './TaskCard';
import type { Task, ColumnData, TaskStatus } from '../types';

const defaultCols: ColumnData[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];

const initialTasks: Task[] = [
  { id: '1', title: 'UIデザインの改善', description: 'ダッシュボードの色彩と余白を調整し、視認性を高める。', status: 'todo' },
  { id: '2', title: '認証APIの実装', description: 'JWTベースの認証APIを実装する。', status: 'todo' },
  { id: '3', title: 'React Hooksの学習', description: 'useMemoとuseCallbackの適切な使い方を理解する。', status: 'in-progress' },
  { id: '4', title: '初期セットアップ', description: 'ViteとTailwind CSSを用いたプロジェクトの初期化。', status: 'done' },
];

export function Board() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 3 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const addTask = (status: TaskStatus) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: '新しいタスク',
      description: 'タスクの詳細を入力してください...',
      status,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const onDragStart = (event: DragStartEvent) => {
    const { active } = event;
    if (active.data.current?.type === 'Task') {
      setActiveTask(active.data.current.task);
    }
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === 'Task';
    const isOverTask = over.data.current?.type === 'Task';
    const isOverColumn = over.data.current?.type === 'Column';

    if (!isActiveTask) return;

    // Dropping a task over another task
    if (isActiveTask && isOverTask) {
      setTasks(tasks => {
        const activeIndex = tasks.findIndex(t => t.id === activeId);
        const overIndex = tasks.findIndex(t => t.id === overId);

        tasks[activeIndex].status = tasks[overIndex].status;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    // Dropping a task over a column
    if (isActiveTask && isOverColumn) {
      setTasks(tasks => {
        const activeIndex = tasks.findIndex(t => t.id === activeId);
        tasks[activeIndex].status = overId as TaskStatus;

        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };

  const onDragEnd = () => {
    setActiveTask(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      <div className="flex gap-6 h-full p-8 overflow-x-auto w-full max-w-7xl mx-auto">
        {defaultCols.map((col) => (
          <div key={col.id} className="flex flex-col h-full">
            <Column 
              column={col} 
              tasks={tasks.filter(t => t.status === col.id)} 
              deleteTask={deleteTask}
            />
            <button
              onClick={() => addTask(col.id)}
              className="mt-4 py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 font-medium hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50 transition-all flex items-center justify-center gap-2"
            >
              <span className="text-xl leading-none">+</span> タスクを追加
            </button>
          </div>
        ))}
      </div>

      <DragOverlay>
        {activeTask ? <TaskCard task={activeTask} deleteTask={deleteTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
