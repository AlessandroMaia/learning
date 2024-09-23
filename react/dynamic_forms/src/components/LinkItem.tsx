import { cn } from '@/lib/utils';
import { Reorder, useDragControls } from 'framer-motion';
import { Label } from './ui/Label';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { GripVertical, Trash2Icon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

interface ILinkItemProps {
  index: number;
  isDraggingActive: boolean | null;
  link: {
    title: string;
    url: string;
  };
  onDragStart: () => void;
  onDragEnd: () => void;
  onRemove: () => void;
}

export function LinkItem({
  link,
  index,
  isDraggingActive,
  onDragStart,
  onDragEnd,
  onRemove,
}: ILinkItemProps) {
  const form = useFormContext();
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={link}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className="relative"
      dragListener={false}
      dragControls={controls}
    >
      <div
        className={cn(
          'flex gap-4 transition-opacity',
          isDraggingActive === false && 'opacity-50'
        )}
      >
        <div className="flex-1 flex gap-4 items-end">
          <Button
            type="button"
            onPointerDown={(e) => controls.start(e)}
            variant="link"
            className={cn('cursor-grab', isDraggingActive && 'cursor-grabbing')}
          >
            <GripVertical className="size-4" />
          </Button>

          <div className="flex-1 space-y-2">
            <Label>Título</Label>
            <Input id="title" {...form.register(`links.${index}.title`)} />
          </div>

          <div className="flex-1 space-y-2">
            <Label>URL</Label>
            <Input id="url" {...form.register(`links.${index}.url`)} />
          </div>

          <Button type="button" variant="destructive" onClick={onRemove}>
            <Trash2Icon className="size-4" />
          </Button>
        </div>
      </div>
    </Reorder.Item>
  );
}
