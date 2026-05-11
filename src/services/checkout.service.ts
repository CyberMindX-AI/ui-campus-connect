import { supabase } from '@/lib/supabase';
import { notificationService } from '@/services/notification.service';

export const checkoutService = {
  createOrder: async (userId: string, items: any[], deliveryMethod: string, paymentMethod: string, paymentReference?: string) => {
    // Create one transaction per product item
    const transactions = items.map(item => ({
      buyer_id: userId,
      seller_id: item.product.seller_id,
      product_id: item.product.id,
      amount: item.product.price * item.qty,
      status: 'pending',
      delivery_method: deliveryMethod,
      payment_method: paymentMethod,
      payment_reference: paymentReference
    }));

    const { data, error } = await supabase
      .from('transactions')
      .insert(transactions)
      .select();

    if (error) throw error;

    // ── Send notifications in background (non-blocking) ──
    (async () => {
      try {
        const totalAmount = items.reduce((s, i) => s + i.product.price * i.qty, 0);
        const itemTitles = items.map(i => i.product.title).join(', ');
        const orderId = data?.[0]?.id?.substring(0, 8).toUpperCase() || 'N/A';

        // 1. Notify BUYER — order received
        await notificationService.sendNotification({
          user_id: userId,
          title: '🛒 Order Received!',
          message: `Your order for ${itemTitles} (₦${totalAmount.toLocaleString()}) has been placed. Delivery method: ${deliveryMethod}. We'll update you as it progresses.`,
          type: 'success'
        });

        // 2. Notify each SELLER — new order
        const uniqueSellers = [...new Set(items.map(i => i.product.seller_id))];
        await Promise.all(uniqueSellers.map(sellerId =>
          notificationService.sendNotification({
            user_id: sellerId,
            title: '📦 New Order Received!',
            message: `You have a new order for ${itemTitles}. Amount: ₦${totalAmount.toLocaleString()}. Delivery: ${deliveryMethod}. Please prepare the item(s).`,
            type: 'info'
          })
        ));

        // 3. Notify ADMIN — new transaction
        const { data: adminProfile } = await supabase
          .from('profiles')
          .select('id')
          .eq('role', 'admin')
          .single();

        if (adminProfile?.id) {
          await notificationService.sendNotification({
            user_id: adminProfile.id,
            title: '💰 New Transaction',
            message: `Order #${orderId} placed — ₦${totalAmount.toLocaleString()} via ${paymentMethod}. Items: ${itemTitles}.`,
            type: 'info'
          });
        }
      } catch (_) {
        // Notification failure must not affect the order creation result
      }
    })();

    return data;
  }
};
