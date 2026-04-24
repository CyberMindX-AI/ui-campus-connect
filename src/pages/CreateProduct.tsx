import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Eye, ImagePlus, Loader2 } from 'lucide-react';
import Layout from '@/components/Layout';
import { useCategories } from '@/hooks/api/useMarket';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useCreateProduct, useUpdateProduct, useProduct } from '@/hooks/api/useProducts';
import { uploadProductImage } from '@/services/products.service';

const conditions = ['New', 'Like New', 'Used (Good)', 'Used (Fair)', 'Refurbished'];
const deliveryOptions = ['Campus Pickup', 'Hall Delivery', 'Digital Delivery'];

const CreateProduct = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const { data: categories = [] } = useCategories();
  const { data: existingProduct, isLoading: isLoadingProduct } = useProduct(id || '');
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [negotiable, setNegotiable] = useState(false);
  const [condition, setCondition] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [delivery, setDelivery] = useState<string[]>(['Campus Pickup']);
  const [location, setLocation] = useState('');
  const [tags, setTags] = useState('');
  
  // Images already uploaded (strings) vs new files to upload (Files)
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newPreviewUrls, setNewPreviewUrls] = useState<string[]>([]);
  
  const [uploadingImages, setUploadingImages] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { user } = useAuth();
  const { mutate: createProduct, isPending: isCreating } = useCreateProduct();
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load existing product data if editing
  useEffect(() => {
    if (isEditing && existingProduct) {
      setTitle(existingProduct.title);
      setDescription(existingProduct.description);
      setCategory(existingProduct.category);
      setPrice(existingProduct.price.toString());
      setNegotiable(existingProduct.negotiable);
      setCondition(existingProduct.condition);
      setQuantity(existingProduct.quantity?.toString() || '1');
      setDelivery(existingProduct.delivery || ['Campus Pickup']);
      setLocation(existingProduct.location || '');
      setTags(existingProduct.tags?.join(', ') || '');
      setExistingImages(existingProduct.images || []);
    }
  }, [isEditing, existingProduct]);

  const toggleDelivery = (d: string) => {
    setDelivery((p) => (p.includes(d) ? p.filter((x) => x !== d) : [...p, d]));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const total = existingImages.length + newImages.length + files.length;
    if (total > 8) {
      toast({ title: 'Too many images', description: 'Maximum 8 images allowed.', variant: 'destructive' });
      return;
    }

    const newFiles = files.slice(0, 8 - (existingImages.length + newImages.length));
    setNewImages((prev) => [...prev, ...newFiles]);

    // Generate preview URLs
    newFiles.forEach((file) => {
      const url = URL.createObjectURL(file);
      setNewPreviewUrls((prev) => [...prev, url]);
    });
  };

  const removeNewImage = (index: number) => {
    URL.revokeObjectURL(newPreviewUrls[index]);
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setNewPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!title || !description || !category || !price || !condition) {
      toast({ title: 'Please fill all required fields', variant: 'destructive' });
      return;
    }

    if (!user?.id) {
      toast({ title: 'You must be logged in', variant: 'destructive' });
      return;
    }

    setUploadingImages(true);
    let uploadedUrls: string[] = [];

    try {
      // Upload new images
      if (newImages.length > 0) {
        const uploads = await Promise.all(
          newImages.map((file) => uploadProductImage(user.id!, file))
        );
        uploadedUrls = uploads;
      }
    } catch (uploadError: any) {
      toast({
        title: 'Image upload failed',
        description: uploadError.message,
        variant: 'destructive',
      });
      setUploadingImages(false);
      return;
    }

    setUploadingImages(false);

    const finalImages = [...existingImages, ...uploadedUrls];
    const productData = {
      title,
      description,
      category,
      price: Number(price),
      condition,
      quantity: Number(quantity),
      delivery,
      location,
      tags: tags ? tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      seller_id: user.id,
      status: isEditing ? existingProduct?.status : 'pending',
      negotiable,
      images: finalImages,
    };

    if (isEditing && id) {
      updateProduct(
        { id, productData },
        {
          onSuccess: () => {
            toast({ title: 'Listing Updated!' });
            navigate('/dashboard/seller/products');
          },
          onError: (error: any) => toast({ title: 'Update failed', description: error.message, variant: 'destructive' })
        }
      );
    } else {
      createProduct(
        productData as any,
        {
          onSuccess: () => {
            toast({ title: 'Listing Submitted!', description: 'It will be live once approved.' });
            navigate('/dashboard/seller/products');
          },
          onError: (error: any) => toast({ title: 'Creation failed', description: error.message, variant: 'destructive' })
        }
      );
    }
  };

  if (isEditing && isLoadingProduct) {
    return <Layout><div className="flex h-96 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div></Layout>;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <h1 className="font-heading text-xl font-bold text-foreground sm:text-2xl">
          {isEditing ? 'Edit Listing' : 'Create New Listing'}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Fill in the details to list your product</p>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="rounded-xl border border-border bg-card p-4 sm:p-6 space-y-4">
              <h2 className="font-heading text-lg font-semibold text-foreground">Basic Information</h2>
              <div>
                <Label htmlFor="title">Product Title *</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1" placeholder="e.g. Organic Chemistry Textbook" />
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

            {/* Images */}
            <div className="rounded-xl border border-border bg-card p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-lg font-semibold text-foreground">Product Images</h2>
                <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                   <Upload className="h-4 w-4 mr-2" /> Browse Files
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Upload up to 8 images. Drag & drop also supported.</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* Existing Images */}
                {existingImages.map((url, i) => (
                  <div key={`existing-${i}`} className="relative aspect-square rounded-lg overflow-hidden border border-border group">
                    <img src={url} alt="" className="h-full w-full object-cover" />
                    <button onClick={() => removeExistingImage(i)} className="absolute top-1 right-1 h-6 w-6 bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="h-3 w-3" />
                    </button>
                    {i === 0 && <span className="absolute bottom-1 left-1 bg-primary text-white text-[8px] font-bold px-1 rounded">Cover</span>}
                  </div>
                ))}
                
                {/* New Previews */}
                {newPreviewUrls.map((url, i) => (
                  <div key={`new-${i}`} className="relative aspect-square rounded-lg overflow-hidden border border-border bg-muted group">
                    <img src={url} alt="" className="h-full w-full object-cover" />
                    <button onClick={() => removeNewImage(i)} className="absolute top-1 right-1 h-6 w-6 bg-black/60 text-white rounded-full flex items-center justify-center">
                      <X className="h-3 w-3" />
                    </button>
                    {existingImages.length === 0 && i === 0 && <span className="absolute bottom-1 left-1 bg-primary text-white text-[8px] font-bold px-1 rounded">Cover</span>}
                  </div>
                ))}

                {(existingImages.length + newImages.length) < 8 && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    <ImagePlus className="h-6 w-6" />
                    <span className="text-[10px] mt-1 font-medium">Add Image</span>
                  </button>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="sr-only"
                onChange={handleImageSelect}
              />
            </div>

            {/* Pricing & Stock */}
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
                  <label className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 cursor-pointer hover:bg-muted/50">
                    <input type="checkbox" checked={negotiable} onChange={(e) => setNegotiable(e.target.checked)} className="accent-primary" />
                    <span className="text-sm text-foreground">Negotiable</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Delivery */}
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
                <Input value={location} onChange={(e) => setLocation(e.target.value)} className="mt-1" placeholder="e.g. Kuti Hall Room 205" />
              </div>
              <div>
                <Label>Tags (comma-separated)</Label>
                <Input value={tags} onChange={(e) => setTags(e.target.value)} className="mt-1" placeholder="e.g. textbook, chemistry" />
              </div>
            </div>
          </div>

          {/* Action Sidebar */}
          <div className="space-y-4">
            <div className="sticky top-20 rounded-xl border border-border bg-card p-4 sm:p-5">
              <div className="flex items-center gap-2"><Eye className="h-4 w-4 text-primary" /><h3 className="font-heading text-sm font-semibold text-foreground">Listing Summary</h3></div>
              <div className="mt-4 rounded-lg bg-muted overflow-hidden aspect-video flex items-center justify-center">
                {(existingImages.length > 0 || newPreviewUrls.length > 0) ? (
                  <img src={existingImages[0] || newPreviewUrls[0]} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <Upload className="h-8 w-8 text-muted-foreground" />
                )}
              </div>
              <p className="mt-3 text-sm font-medium text-foreground truncate">{title || 'Product Title'}</p>
              <p className="mt-1 font-heading text-lg font-bold text-primary">₦{price ? Number(price).toLocaleString() : '0'}</p>

              <hr className="my-4 border-border" />
              <Button variant="hero" className="w-full" onClick={handleSubmit} disabled={uploadingImages || isCreating || isUpdating}>
                {uploadingImages ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Uploading...</> : isEditing ? 'Update Listing' : 'Publish Listing'}
              </Button>
              <Button variant="outline" className="w-full mt-2" onClick={() => navigate(-1)}>Cancel</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;