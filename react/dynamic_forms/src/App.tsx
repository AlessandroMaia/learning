import { PlusCircleIcon } from 'lucide-react';
import { Button } from './components/ui/Button';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { Reorder } from 'framer-motion';
import { useState } from 'react';
import { LinkItem } from './components/LinkItem';

interface ILinkProps {
  title: string;
  url: string;
}

interface IFormProps {
  links: ILinkProps[];
}

export function App() {
  const form = useForm<IFormProps>({
    defaultValues: {
      links: [
        { title: 'Link #000', url: 'https://link0.com.br' },
        { title: 'Link #001', url: 'https://link1.com.br' },
        { title: 'Link #002', url: 'https://link2.com.br' },
        { title: 'Link #003', url: 'https://link3.com.br' },
        { title: 'Link #004', url: 'https://link4.com.br' },
      ],
    },
  });

  const links = useFieldArray({
    control: form.control,
    name: 'links',
  });

  const [draggingIndex, setDraggingIndex] = useState<null | number>(null);

  const handleSubmit = form.handleSubmit((formData) => {
    console.log('🚀 ~ hangleSubmit ~ formData:', formData);
  });

  function handleDragStart(index: number) {
    setDraggingIndex(index);
  }

  function handleDragEnd() {
    setDraggingIndex(null);
  }

  function handleReorder(newOrder: typeof links.fields) {
    if (draggingIndex === null) return;

    const dragginLink = links.fields[draggingIndex];

    newOrder.forEach((link, index) => {
      if (link === dragginLink) {
        links.move(draggingIndex, index);
        setDraggingIndex(index);
      }
    });
  }

  return (
    <div className="grid place-items-center min-h-screen">
      <div className="w-full max-w-2xl p-4">
        <h1 className="text-2xl font-semibold tracking-tight text-center">
          Links
        </h1>

        <FormProvider {...form}>
          <form className="mt-4 flex flex-col gap-4" onSubmit={handleSubmit}>
            <Button
              type="button"
              className="w-full border-dashed mb-6"
              variant="outline"
              onClick={() => links.prepend({ title: '', url: '' })}
            >
              <PlusCircleIcon className="size-4 " />
              Adicionar novo link no início da lista
            </Button>

            <Reorder.Group
              axis="y"
              values={links.fields}
              onReorder={handleReorder}
              className="space-y-4"
            >
              {links.fields.map((link, index) => (
                <LinkItem
                  key={link.id}
                  index={index}
                  link={link}
                  isDraggingActive={
                    draggingIndex === null ? null : draggingIndex === index
                  }
                  onDragStart={() => handleDragStart(index)}
                  onDragEnd={handleDragEnd}
                  onRemove={() => links.remove(index)}
                />
              ))}
            </Reorder.Group>

            <Button
              type="button"
              className="w-full border-dashed mt-6"
              variant="outline"
              onClick={() => links.append({ title: '', url: '' })}
            >
              <PlusCircleIcon className="size-4 " />
              Adicionar novo link no final da lista
            </Button>

            <div className="flex gap-4">
              <Button
                className="flex-1"
                type="button"
                variant="secondary"
                onClick={() => links.insert(1, { title: '', url: '' })}
              >
                Insert
              </Button>

              <Button
                className="flex-1"
                type="button"
                variant="secondary"
                onClick={() => links.move(3, 1)}
              >
                Move
              </Button>

              <Button
                className="flex-1"
                type="button"
                variant="secondary"
                onClick={() =>
                  links.replace([
                    { title: 'Link #009', url: 'https://link9.com.br' },
                  ])
                }
              >
                Replace
              </Button>

              <Button
                className="flex-1"
                type="button"
                variant="secondary"
                onClick={() => links.swap(3, 1)}
              >
                Swap
              </Button>

              <Button
                className="flex-1"
                type="button"
                variant="secondary"
                onClick={() =>
                  links.update(3, { title: 'updated', url: 'updated' })
                }
              >
                Update
              </Button>
            </div>

            <Button>Enviar</Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
