# 🚀 Travel Agency Landing Page - Webhook Integration Guide

## 📋 Overview
This landing page is designed to integrate seamlessly with automation tools like **n8n**, **Zapier**, **Make.com**, and similar platforms through webhook integration.

## 🔧 Webhook Setup Instructions

### For n8n:
1. **Create a new workflow** in n8n
2. Add a **Webhook node** as the trigger
3. Set the HTTP Method to `POST`
4. Copy the **Webhook URL** (e.g., `https://your-n8n-instance.com/webhook/your-webhook-id`)
5. Open `script.js` in your code editor
6. Find line with `const WEBHOOK_URL = 'YOUR_WEBHOOK_URL_HERE';`
7. Replace `YOUR_WEBHOOK_URL_HERE` with your actual webhook URL
8. Uncomment the fetch code block (lines ~85-96)
9. Save the file

### For Zapier:
1. **Create a new Zap** in Zapier
2. Choose **Webhooks by Zapier** as the trigger
3. Select **Catch Hook** as the event
4. Copy the **Custom Webhook URL**
5. Follow steps 5-9 from the n8n instructions above

### For Make.com (Integromat):
1. **Create a new scenario** in Make
2. Add a **Webhook** module as the trigger
3. Create a new webhook and copy the URL
4. Follow steps 5-9 from the n8n instructions above

## 📦 Form Data Structure

The form sends data as a JSON object with the following structure:

```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string",
  "destination": "string",
  "travelDate": "YYYY-MM-DD",
  "travelers": "number",
  "budget": "string",
  "message": "string",
  "newsletter": "boolean",
  "submittedAt": "ISO 8601 timestamp",
  "source": "Landing Page"
}
```

### Field Details:
- **firstName**: Customer's first name *(Required)*
- **lastName**: Customer's last name *(Required)*
- **email**: Customer's email address *(Required)*
- **phone**: Customer's phone number *(Required)*
- **destination**: Selected destination from dropdown
- **travelDate**: Estimated travel date
- **travelers**: Number of travelers (integer)
- **budget**: Budget range selection
- **message**: Custom message from customer
- **newsletter**: Boolean indicating newsletter subscription preference
- **submittedAt**: Automatic timestamp when form was submitted
- **source**: Always "Landing Page" for tracking purposes

## 🎯 Automation Ideas

### n8n Workflow Examples:
1. **Send Email Notification**
   - Trigger: Webhook
   - Action: Send email to sales team with form data

2. **Add to CRM**
   - Trigger: Webhook
   - Action: Create new contact in HubSpot/Salesforce/Pipedrive

3. **Create Google Sheets Entry**
   - Trigger: Webhook
   - Action: Append row to Google Sheets for lead tracking

4. **Send SMS Alert**
   - Trigger: Webhook
   - Action: Send SMS via Twilio to sales representative

### Zapier Workflow Examples:
1. **Multi-step Lead Processing**
   - Trigger: Catch Webhook
   - Action 1: Add contact to Mailchimp (if newsletter = true)
   - Action 2: Create task in Asana for sales follow-up
   - Action 3: Send Slack notification to #sales channel

2. **Calendar Booking**
   - Trigger: Catch Webhook
   - Action: Create Google Calendar event for consultation call

## 🔒 Security Considerations

1. **CORS Headers**: Your webhook endpoint should accept POST requests from your domain
2. **Validation**: Always validate incoming data on your automation platform
3. **Rate Limiting**: Consider implementing rate limiting to prevent spam
4. **Data Privacy**: Ensure compliance with GDPR/privacy laws when storing customer data

## 🎨 Customization Guide

### Colors & Branding
All colors are defined in CSS variables at the top of `style.css`:

```css
:root {
    --color-primary: hsl(200, 85%, 45%);
    --color-secondary: hsl(280, 70%, 55%);
    --color-accent: hsl(340, 75%, 55%);
    /* ... more variables */
}
```

**To change your brand colors:**
1. Open `style.css`
2. Find the `:root` section (lines 1-30)
3. Modify the HSL values for your brand colors
4. Save and refresh - all colors will update automatically!

### Typography
Change fonts by modifying these variables:
```css
--font-primary: 'Outfit', sans-serif;
--font-heading: 'Playfair Display', serif;
```

### Spacing & Layout
Adjust spacing throughout the site:
```css
--spacing-xs: 0.5rem;
--spacing-sm: 1rem;
--spacing-md: 2rem;
--spacing-lg: 4rem;
--spacing-xl: 6rem;
```

## 📱 Responsive Design

The landing page is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

All breakpoints are defined in the media queries at the bottom of `style.css`.

## 🧪 Testing

### Before Going Live:
1. ✅ Test form submission with webhook URL
2. ✅ Verify all form fields are captured correctly
3. ✅ Test on mobile devices
4. ✅ Check email validation
5. ✅ Test newsletter checkbox functionality
6. ✅ Verify success/error messages display correctly

### Test Form Data:
Use this sample data to test your webhook:
```javascript
{
  "firstName": "Juan",
  "lastName": "Pérez",
  "email": "juan.perez@example.com",
  "phone": "+52 123 456 7890",
  "destination": "paris",
  "travelDate": "2026-06-15",
  "travelers": "2",
  "budget": "5000-10000",
  "message": "Interested in a honeymoon package",
  "newsletter": true,
  "submittedAt": "2026-01-08T16:19:59Z",
  "source": "Landing Page"
}
```

## 📞 Support

For questions about:
- **n8n**: https://docs.n8n.io/
- **Zapier**: https://zapier.com/help/create/code-webhooks/trigger-zaps-from-webhooks
- **Make.com**: https://www.make.com/en/help/tools/webhooks

## 🚀 Quick Start Checklist

- [ ] Replace `WEBHOOK_URL` in `script.js` with your actual webhook URL
- [ ] Uncomment the fetch code in `script.js` (lines ~85-96)
- [ ] Customize colors in `style.css` `:root` section
- [ ] Update company name from "Wanderlust" to your agency name
- [ ] Replace placeholder images with your own (if desired)
- [ ] Update contact information in the Contact Info section
- [ ] Test form submission
- [ ] Deploy to your web server

---

**Ready to launch!** 🎉 Your landing page is now ready to capture leads and integrate with your automation workflows.
