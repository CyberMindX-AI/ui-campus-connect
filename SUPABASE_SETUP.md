# Supabase Storage Setup Guide for UI Campus Connect

## Step 1: Run Schema SQL

Go to your Supabase project → SQL Editor and run the full `schema.sql` file.

## Step 2: Create Storage Buckets

In the Supabase dashboard:
1. Go to **Storage** in the left sidebar
2. Click **New bucket**
3. Create `product-images` bucket:
   - Name: `product-images`
   - **Public bucket**: ✅ YES (checked)
   - Click Create
4. Create `avatars` bucket:
   - Name: `avatars`
   - **Public bucket**: ✅ YES (checked)
   - Click Create

## Step 3: Add Storage Policies (SQL Editor)

Run the following SQL in the Supabase SQL Editor:

```sql
-- Product Images Bucket Policies
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true) ON CONFLICT DO NOTHING;

-- Allow anyone to read product images
CREATE POLICY "Product images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Allow authenticated users to upload product images
CREATE POLICY "Authenticated users can upload product images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');

-- Allow sellers to update/replace their own images
CREATE POLICY "Users can update their own product images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'product-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow sellers to delete their own images
CREATE POLICY "Users can delete their own product images"
ON storage.objects FOR DELETE
USING (bucket_id = 'product-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow anyone to read avatars
CREATE POLICY "Avatar images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

-- Allow authenticated users to upload/replace their own avatar
CREATE POLICY "Authenticated users can upload avatars"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own avatar"
ON storage.objects FOR DELETE
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
```

## Step 4: Verify Environment Variables

Ensure `.env` has:
```
VITE_SUPABASE_URL=https://xkvqlbceodabdolxkrwi.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

## How Images Now Work

| Feature | Implementation |
|---|---|
| Product image upload | `uploadProductImage(sellerId, file)` → uploads to `product-images/{sellerId}/{timestamp}.ext` |
| Avatar upload | `uploadAvatar(userId, file)` → uploads to `avatars/{userId}/avatar.ext` |
| Image URL resolution | `getImageUrl(path)` → returns Supabase public URL or passes through if already a full URL |
| Fallback | All `<img>` tags use `/placeholder.svg` on error |
| Create product | Full image upload flow with progress indicator and per-image preview |
| Settings page | Avatar upload with live preview and immediate context update |
