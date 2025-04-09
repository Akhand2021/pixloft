import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import { router } from '@inertiajs/react';
export default function CreateTemplateType() {
  const { data, setData, post, errors, processing } = useForm({
    name: '',
    description: '',
  });

  const handleSubmit    = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/templates-types', {
      onSuccess: () => {
        router.visit('/admin/templates-types');
      },
    });
  };
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Templates Types',
      href: '/admin/templates-types',
    },
    {
      title: 'Create Template Type',
      href: '/admin/templates-types/create',
    },
  ];
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Template Type" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Create Template Type</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div className="space-y-2"> 
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" placeholder="Template Type Name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                                </div>
                               
                                <Button type="submit">Create</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}