# EmailJS Setup Guide for Nala Shop

This guide will help you set up EmailJS to receive order confirmations via email when customers place orders.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template content:

### Template Subject:
```
New Order #{{order_number}} - Nala Shop
```

### Template Body:
```
New Order Received!

Order Details:
- Order Number: {{order_number}}
- Date: {{order_date}}
- Total: {{order_total}} JD

Customer Information:
- Name: {{customer_name}}
- Phone: {{customer_phone}}
- Email: {{customer_email}}
- Location: {{customer_location}}

Customization Request:
{{customization_request}}

Order Items:
{{order_items}}

---
This order was placed through your Nala Shop website.
Please contact the customer to confirm the order details.
```

4. Save the template and note down your **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Your Public Key

1. Go to **Account** > **General**
2. Find your **Public Key** (e.g., `user_abcdefghijk123456`)

## Step 5: Update Your Website Configuration

Open `js/script.js` and replace these placeholders:

```javascript
// Replace this line:
emailjs.init("YOUR_EMAILJS_PUBLIC_KEY");
// With your actual public key:
emailjs.init("user_abcdefghijk123456");

// Replace this line:
await emailjs.send('YOUR_EMAILJS_SERVICE_ID', 'YOUR_EMAILJS_TEMPLATE_ID', {
// With your actual IDs:
await emailjs.send('service_abc123', 'template_xyz789', {

// Replace this email:
to_email: 'your-business-email@example.com',
// With your actual business email:
to_email: 'info@nalashop.com',
```

## Step 6: Test Your Setup

1. Open your website
2. Add a product to cart
3. Fill out the checkout form with test data
4. Submit the order
5. Check your email for the order confirmation

## Troubleshooting

### Common Issues:

1. **"EmailJS is not defined" error**
   - Make sure the EmailJS script is loaded in your HTML head section
   - Check that you're using the correct CDN link

2. **Email not received**
   - Check your spam folder
   - Verify your service configuration
   - Make sure your template variables match exactly

3. **"Invalid template ID" error**
   - Double-check your template ID in the EmailJS dashboard
   - Make sure the template is published/active

### EmailJS Free Plan Limits:
- 200 emails per month
- Perfect for small businesses starting out
- Upgrade to paid plan for higher limits

## Security Notes

- Your EmailJS public key is safe to use in client-side code
- EmailJS handles the secure email sending
- Never expose your private keys or email passwords

## Support

If you need help:
1. Check EmailJS documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
2. Contact EmailJS support for service-specific issues
3. Test with simple templates first before using complex ones

---

**Your shopping cart system is now ready!** Customers can:
- Add products to cart
- Update quantities
- Remove items
- Fill out checkout form
- Receive order confirmation
- You'll get email notifications for each order