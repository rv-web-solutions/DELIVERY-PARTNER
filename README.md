# Ring4Delivery - Food Delivery Web Application

A modern, responsive food delivery web application built with HTML, CSS, JavaScript, and Bootstrap.

## Features

### 🏠 Home Page
- Hero section with welcome message and call-to-action button
- Feature highlights (Fast Delivery, Best Prices, Quality Food)
- Responsive design with attractive visuals

### 🍔 Restaurants Listing (Page 2)
- Browse all restaurants with detailed information
- Filter by cuisine type
- Search functionality to find restaurants
- Display restaurant ratings and delivery time
- Click to view menu

### 📋 Dynamic Menu Loading (Page 3)
- View restaurant details at the top
- Categorized menu items (Appetizers, Main Course, Sides, Desserts)
- Category sidebar for easy navigation
- Add items to cart with custom quantities
- Special instructions for each item

### 🛒 Cart & Checkout (Page 4)
- View all items in cart with images
- Adjust quantities dynamically
- Remove items
- Order summary with billing details
  - Subtotal
  - Delivery Fee (₹40)
  - Tax (5%)
  - Total Amount

### 📱 WhatsApp Integration
- Customers enter delivery details (name, phone, address)
- Order details are automatically formatted
- **Send order to WhatsApp: 6281407746**
- Complete order information with:
  - Order ID
  - Customer Name
  - Phone Number
  - Address
  - Item details
  - Pricing breakdown

## Project Structure

```
Delivery Service/
├── index.html                 # Home page
├── restaurants.html           # Restaurants listing
├── menu.html                  # Menu with dynamic loading
├── cart.html                  # Cart and checkout
├── css/
│   └── style.css             # Main stylesheet
├── js/
│   ├── script.js             # Core JavaScript functionality
│   └── data.js               # Sample restaurant and menu data
└── README.md                 # This file
```

## How to Use

### 1. **Open the Application**
   - Open `index.html` in your web browser
   - Or use a local server (recommended)

### 2. **Browse Restaurants**
   - Click "Start Order" button on home page
   - Search for restaurants by name or filter by cuisine
   - Click "View Menu" on any restaurant

### 3. **Add Items to Cart**
   - Click "Add" button on any menu item
   - Set quantity and add special instructions if needed
   - Click "Add to Cart"
   - Items automatically update cart count

### 4. **Review Cart**
   - Click "Cart" link in navigation
   - View all items with quantities
   - Adjust quantities or remove items

### 5. **Place Order**
   - Click "Proceed to Checkout"
   - Fill in delivery details:
     - Full Name
     - Email
     - Mobile Number
     - Delivery Address
     - Special Notes (optional)
   - Click "Place Order via WhatsApp"
   - Order will be sent to WhatsApp with complete details

## Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling with animations
- **JavaScript (Vanilla)** - Functionality and DOM manipulation
- **Bootstrap 5** - Responsive framework
- **LocalStorage** - Cart persistence
- **WhatsApp Web API** - Order messaging

## Data Structure

### Restaurant Object
```json
{
    "id": 1,
    "name": "Restaurant Name",
    "cuisine": "Italian",
    "rating": 4.8,
    "deliveryTime": "30-40 mins",
    "address": "123 Main Street",
    "image": "image-url"
}
```

### Menu Item Object
```json
{
    "id": 1,
    "restaurantId": 1,
    "category": "Appetizers",
    "name": "Item Name",
    "description": "Item description",
    "price": 120,
    "image": "image-url"
}
```

## LocalStorage Usage

- **Cart Data**: Stored with structure:
```json
[
    {
        "itemId": 5,
        "quantity": 2,
        "specialInstructions": "No onions",
        "restaurantId": 1
    }
]
```

## WhatsApp Integration Details

### How It Works:
1. Orders are sent via WhatsApp Web API
2. Recipient number: **6281407746**
3. Message includes:
   - Order ID
   - Customer Details
   - Item List
   - Pricing Breakdown

### To Change WhatsApp Number:
Edit `cart.html` line with:
```javascript
const recipientPhone = '6281407746'; // Change this number
```

**Note**: For WhatsApp Web API, the phone number should include country code (e.g., 62 for Indonesia)

## Features Breakdown

### ✅ Implemented
- [x] Multi-page navigation
- [x] Restaurant listing with filtering
- [x] Dynamic menu loading
- [x] Shopping cart with persistence
- [x] Order checkout form
- [x] WhatsApp integration
- [x] Responsive design
- [x] Stomach-friendly UI/UX
- [x] Search and filter functionality
- [x] Quantity management
- [x] Special instructions
- [x] Order summary with billing

### 🚀 Future Enhancements
- [ ] Backend API integration
- [ ] Payment gateway (Stripe, Razorpay)
- [ ] User authentication
- [ ] Order tracking
- [ ] Reviews and ratings
- [ ] Favorites/Wishlist
- [ ] Promotional codes
- [ ] Multiple delivery addresses
- [ ] Order history
- [ ] Push notifications

## Installation & Running

### Method 1: Direct File Opening
```bash
# Simply open index.html in your browser
```

### Method 2: Using Python (Recommended)
```bash
# Python 3.x
python -m http.server 8000

# Then visit http://localhost:8000
```

### Method 3: Using Node.js
```bash
# Install http-server globally
npm install -g http-server

# Run from project directory
http-server

# Visit http://localhost:8080
```

## Browser Compatibility

- ✅ Chrome (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Edge (Latest)
- ✅ Mobile Browsers

## Important Notes

1. **WhatsApp Number**: The delivery will send messages to the phone number in `cart.html`. Ensure it's a valid WhatsApp-registered number.

2. **Image URLs**: All images are fetched from Unsplash. You can replace them with your own image URLs.

3. **Cart Persistence**: Cart data is stored in browser's LocalStorage. It persists across browser sessions.

4. **Currency**: All prices are in Indian Rupees (₹). Modify as per your region.

5. **Responsive Design**: The application is fully responsive and works on all device sizes.

## Customization

### Change Colors
Edit `css/style.css` CSS variables:
```css
:root {
    --primary-color: #ffc107;
    --dark-color: #212529;
    --light-color: #f8f9fa;
}
```

### Add More Restaurants
Edit `js/data.js` and add restaurant objects to the `restaurants` array.

### Add More Menu Items
Edit `js/data.js` and add menu item objects to the `menus` array.

### Change Delivery Fee or Tax
Edit `cart.html` to modify:
```javascript
const deliveryFee = 40; // Change delivery fee
const tax = Math.round(subtotal * 0.05); // Change tax percentage
```

## Troubleshooting

### Cart Not Showing Items
- Clear browser cache and LocalStorage
- Check browser console for errors

### WhatsApp Not Opening
- Ensure browser allows pop-ups
- Check if WhatsApp is installed/accessible
- Verify phone number format is correct

### Images Not Loading
- Check internet connection
- Verify image URLs are valid
- Replace with local image paths if needed

## License

This project is open-source and available for personal and commercial use.

## Support

For issues or feature requests, please create an issue or contact the development team.

---

**Created**: April 2026  
**Version**: 1.0.0  
**Status**: Active Development
