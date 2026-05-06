import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Task } from '../types';
import { GripVertical, Trash2 } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  deleteTask: (id: string) => void;
}

export function TaskCard({ task, deleteTask }: TaskCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-50 border-2 border-primary-500 rounded-xl bg-primary-50 h-[104px]"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all group flex gap-3 relative cursor-default"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab hover:text-primary-500 text-slate-400 mt-1"
      >
        <GripVertical size={20} />
      </div>
      <div className="flex-1 overflow-hidden">
        <h3 className="font-semibold text-slate-800 text-base mb-1 truncate">{task.title}</h3>
        <p className="text-sm text-slate-500 line-clamp-2">{task.description}</p>
      </div>
      
      <button 
        onClick={() => deleteTask(task.id)}
        className="absolute top-3 right-3 text-slate-300 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
