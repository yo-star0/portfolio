import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { ColumnData, Task } from '../types';
import { TaskCard } from './TaskCard';
import { useDroppable } from '@dnd-kit/core';

interface ColumnProps {
  column: ColumnData;
  tasks: Task[];
  deleteTask: (id: string) => void;
}

export function Column({ column, tasks, deleteTask }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
  });

  return (
    <div className="bg-slate-100/50 w-[350px] flex flex-col rounded-2xl p-4 border border-slate-200 h-full max-h-full">
      <div className="flex items-center justify-between mb-4 px-2">
        <h2 className="font-bold text-slate-700 text-lg flex items-center gap-2">
          {column.title}
          <span className="bg-slate-200 text-slate-600 text-xs py-0.5 px-2.5 rounded-full font-medium">
            {tasks.length}
          </span>
        </h2>
      </div>

      <div 
        ref={setNodeRef}
        className="flex-1 flex flex-col gap-3 overflow-y-auto min-h-[150px] p-1"
      >
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} deleteTask={deleteTask} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
