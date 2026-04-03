import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Eye } from 'lucide-react';
import Layout from '@/components/Layout';
import { categories } from '@/data/mock';
import { useToast } from '@/hooks/use-toast';

const conditions = ['New', 'Like New', 'Used (Good)', 'Used (Fair)', 'Refurbished'];
const deliveryOptions = ['Campus Pickup', 'Hall Delivery', 'Digital Delivery'];

const CreateProduct = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [negotiable, setNegotiable] = useState(false);
  const [condition, setCondition] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [delivery, setDelivery] = useState<string[]>(['Campus Pickup']);
  const [pickup, setPickup] = useState('');
  const [tags, setTags] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const toggleDelivery = (d: string) => {
    setDelivery((p) => p.includes(d) ? p.filter((x) => x !== d) : [...p, d]);
  };

  const handlePublish = () => {
    if (!title || !description || !category || !price || !condition) {
      toast({ title: 'Please fill all required fields', variant: 'destructive' });
      return;
    }
    toast({ title: 'Product published!', description: 'Your listing is now live.' });
    navigate('/dashboard/seller');
  };

  const handleDraft = () => {
    toast({ title: 'Draft saved', description: 'You can publish it later.' });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <h1 className="font-heading text-xl font-bold text-foreground sm:text-2xl">Create New Listing</h1>
        <p className="mt-1 text-sm text-muted-foreground">Fill in the details to list your product</p>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border border-border bg-card p-4 sm:p-6 space-y-4">
              <h2 className="font-heading text-lg font-semibold text-foreground">Basic Information</h2>
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="title">Product Title *</Label>
                  <span className="text-xs text-muted-foreground">{title.length}/100</span>
                </div>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value.slice(0, 100))} className="mt-1" placeholder="e.g. Organic Chemistry Textbook" />
              </div>
              <div>
                <Label htmlFor="desc">Description *</Label>
                <textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" rows={4}
                  placeholder="Describe your product in detail..." />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>Category *</Label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground">
                    <option value="">Select category</option>
                    {categories.map((c) => <option key={c.slug} value={c.slug}>{c.icon} {c.name}</option>)}
                  </select>
                </div>
                <div>
                  <Label>Condition *</Label>
                  <select value={condition} onChange={(e) => setCondition(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground">
                    <option value="">Select condition</option>
                    {conditions.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-4 sm:p-6 space-y-4">
              <h2 className="font-heading text-lg font-semibold text-foreground">Pricing & Stock</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <Label>Price (₦) *</Label>
                  <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1" placeholder="0" />
                </div>
                <div>
                  <Label>Quantity</Label>
                  <Input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="mt-1" min="1" />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 rounded-lg border border-border px-3 py-2">
                    <input type="checkbox" checked={negotiable} onChange={(e) => setNegotiable(e.target.checked)} className="accent-primary" />
                    <span className="text-sm text-foreground">Negotiable</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-4 sm:p-6 space-y-4">
              <h2 className="font-heading text-lg font-semibold text-foreground">Images</h2>
              <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-border p-8 text-center">
                <div>
                  <Upload className="mx-auto h-10 w-10 text-muted-foreground" />
                  <p className="mt-2 text-sm font-medium text-foreground">Drag & drop images</p>
                  <p className="text-xs text-muted-foreground">Up to 8 images, min 400x400px</p>
                  <Button variant="outline" size="sm" className="mt-3">Browse Files</Button>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-4 sm:p-6 space-y-4">
              <h2 className="font-heading text-lg font-semibold text-foreground">Delivery & Tags</h2>
              <div>
                <Label>Delivery Options</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {deliveryOptions.map((d) => (
                    <label key={d} className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-all ${
                      delivery.includes(d) ? 'border-primary bg-primary-light text-primary' : 'border-border text-muted-foreground hover:border-primary/30'
                    }`}>
                      <input type="checkbox" checked={delivery.includes(d)} onChange={() => toggleDelivery(d)} className="sr-only" />
                      {d}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <Label>Pickup Location</Label>
                <Input value={pickup} onChange={(e) => setPickup(e.target.value)} className="mt-1" placeholder="e.g. Kuti Hall Room 205" />
              </div>
              <div>
                <Label>Tags (comma-separated, max 10)</Label>
                <Input value={tags} onChange={(e) => setTags(e.target.value)} className="mt-1" placeholder="e.g. textbook, chemistry, 100-level" />
              </div>
            </div>
          </div>

          {/* Preview sidebar */}
          <div className="space-y-4">
            <div className="sticky top-20 rounded-xl border border-border bg-card p-4 sm:p-5">
              <div className="flex items-center gap-2"><Eye className="h-4 w-4 text-primary" /><h3 className="font-heading text-sm font-semibold text-foreground">Listing Preview</h3></div>
              <div className="mt-4 rounded-lg bg-muted p-4 text-center">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-1 text-xs text-muted-foreground">No image yet</p>
              </div>
              <p className="mt-3 text-sm font-medium text-foreground">{title || 'Product Title'}</p>
              <p className="mt-1 font-heading text-lg font-bold text-primary">₦{price ? Number(price).toLocaleString() : '0'}</p>
              {negotiable && <span className="mt-1 inline-block rounded bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">Negotiable</span>}
              <p className="mt-2 text-xs text-muted-foreground">{condition || 'Condition'} · {category ? categories.find(c => c.slug === category)?.name : 'Category'}</p>

              <hr className="my-4 border-border" />
              <div className="space-y-2">
                <Button variant="hero" className="w-full" onClick={handlePublish}>Publish Listing</Button>
                <Button variant="outline" className="w-full" onClick={handleDraft}>Save as Draft</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;