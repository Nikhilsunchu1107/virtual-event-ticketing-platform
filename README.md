# Virtual Event Ticketing Platform

A full-stack e-commerce platform for booking virtual event tickets. Built with **React.js** (frontend), **Node.js + Express** (backend), and **MongoDB** (database).

## Features

### 1. User Authentication
- User registration with email validation
- Login with JWT authentication
- Password hashing using bcrypt
- User profile management
- Password change functionality
- Referral source tracking

### 2. Event Management
- Browse all virtual events
- Advanced search and filtering (price, category, date)
- Event details page with full information
- Event categories (Technology, Business, Entertainment, Sports, Education)
- Real-time ticket availability tracking
- Event organizer information
- Event feedback and ratings

### 3. Shopping Cart
- Add/remove tickets from cart
- Update ticket quantities
- Real-time price calculation
- Cart persistence in database (linked to user)
- Clear cart functionality

### 4. Checkout System
- Attendee information collection
- Billing address management
- Razorpay payment integration
- Order confirmation with ticket generation
- Automatic ticket number generation

### 5. Order Management
- View all user orders/tickets
- Order tracking and status
- Ticket download (PDF)
- Cancel orders
- Order confirmation emails

### 6. Admin Panel
- Dashboard with key metrics
- User management
- Events analytics and reporting
- Sales reports
- Recent orders monitoring
- Inventory management
- CRM module (VIP users, segmentation)
- ERP module (finances, expenses, resources)
- Marketing analytics (mock)

### 7. Digital Marketing
- SEO optimization (meta tags, Open Graph, Twitter Cards)
- Promotional landing pages (Summer, Black Friday)
- Newsletter subscription
- Referral tracking (`?ref=`, `utm_` parameters)
- Mock analytics dashboard

### 8. Security
- Helmet for secure HTTP headers
- Rate limiting (generic + auth-specific)
- NoSQL injection protection (express-mongo-sanitize)
- XSS protection (xss-clean)
- HTTP parameter pollution protection (hpp)
- Razorpay webhook signature verification

## Project Structure

```
virtual-event-ticketing-platform/
├── backend/
│   ├── config/database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── eventController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   ├── paymentController.js
│   │   ├── adminController.js
│   │   ├── supportController.js
│   │   ├── inventoryController.js
│   │   ├── crmController.js
│   │   └── erpController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── rateLimiter.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Event.js
│   │   ├── Cart.js
│   │   ├── Order.js
│   │   ├── Subscriber.js
│   │   ├── SupportTicket.js
│   │   ├── Feedback.js
│   │   ├── MarketingCampaign.js
│   │   ├── Expense.js
│   │   └── Resource.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── events.js
│   │   ├── cart.js
│   │   ├── orders.js
│   │   ├── paymentRoutes.js
│   │   ├── admin.js
│   │   ├── inventory.js
│   │   ├── support.js
│   │   ├── crm.js
│   │   ├── erp.js
│   │   └── marketing.js
│   ├── utils/
│   │   ├── jwt.js
│   │   ├── email.js
│   │   └── pdf.js
│   ├── package.json
│   ├── server.js
│   └── .env.example
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   ├── EventCard.js
│   │   │   ├── SEO.js
│   │   │   └── NewsletterSignup.js
│   │   ├── context/AuthContext.js
│   │   ├── pages/
│   │   │   ├── Homepage.js
│   │   │   ├── EventList.js
│   │   │   ├── EventDetails.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Cart.js
│   │   │   ├── Checkout.js
│   │   │   ├── OrderConfirmation.js
│   │   │   ├── MyTickets.js
│   │   │   ├── SupportCenter.js
│   │   │   ├── AdminDashboard.js
│   │   │   ├── Contact.js
│   │   │   ├── SummerPromo.js
│   │   │   └── BlackFridayPromo.js
│   │   ├── services/
│   │   ├── utils/tracking.js
│   │   ├── styles/global.css
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── vercel.json
│
├── plans/
├── render.yaml
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- Git

### Backend Setup

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure .env:**
   ```env
   MONGO_URI=mongodb://localhost:27017/virtual-event-ticketing
   JWT_SECRET=your_super_secret_key_change_in_production
   JWT_EXPIRE=7d
   PORT=5000
   NODE_ENV=development
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

5. **Start backend server:**
   ```bash
   npm run dev
   ```

   Server runs on `http://localhost:5000`

### Frontend Setup

1. **Open new terminal and navigate to frontend:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start React development server:**
   ```bash
   npm start
   ```

   App runs on `http://localhost:3000`

### Seed Database (Optional)

```bash
cd backend
npm run seed
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/update-profile` - Update profile
- `POST /api/auth/change-password` - Change password

### Events
- `GET /api/events` - Get all events (with filtering)
- `GET /api/events/:id` - Get event details
- `POST /api/events` - Create event (admin)
- `PUT /api/events/:id` - Update event (admin)
- `DELETE /api/events/:id` - Delete event (admin)
- `GET /api/events/categories` - Get categories
- `GET /api/events/recommendations/me` - Get personalized recommendations

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add to cart
- `PUT /api/cart/update/:eventId` - Update quantity
- `DELETE /api/cart/remove/:eventId` - Remove from cart
- `DELETE /api/cart/clear` - Clear entire cart

### Orders
- `POST /api/orders/checkout` - Create order from cart
- `GET /api/orders/my-orders` - Get user's orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/cancel` - Cancel order

### Payments
- `POST /api/payments/create-order` - Create Razorpay order
- `POST /api/payments/verify` - Verify payment signature

### Admin
- `GET /api/admin/dashboard/stats` - Dashboard statistics
- `GET /api/admin/events/analytics` - Events analytics
- `GET /api/admin/users` - Get all users
- `GET /api/admin/orders` - Get all orders

### Marketing
- `POST /api/marketing/subscribe` - Newsletter subscription

### Inventory
- `GET /api/inventory/overview` - Inventory overview
- `POST /api/inventory/adjust` - Adjust inventory

### Support
- `GET /api/support/tickets` - Get support tickets
- `POST /api/support/tickets` - Create support ticket

### CRM
- `GET /api/crm/users` - Get users with filters (vip, new_users, inactive)

### ERP
- `GET /api/erp/finances` - Get financial summary
- `GET /api/erp/expenses` - Get expenses
- `GET /api/erp/resources` - Get resources

## Deployment

### Backend (Render)
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect to your GitHub repository
4. Set root directory to `backend`
5. Configure environment variables:
   - `NODE_ENV=production`
   - `MONGO_URI=your-mongodb-atlas-uri`
   - `JWT_SECRET=your-64-char-random-string`
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`

### Frontend (Vercel)
1. Push code to GitHub
2. Import project on Vercel
3. Update `frontend/vercel.json` with your Render backend URL
4. Deploy

## Tech Stack

**Frontend:**
- React.js 18
- React Router v6
- React Helmet Async (SEO)
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (jsonwebtoken)
- Bcrypt
- Helmet, express-rate-limit, express-mongo-sanitize, xss-clean, hpp
- Razorpay SDK

## Security Features

- JWT authentication with secure tokens
- Password hashing with bcrypt
- Protected routes with middleware
- Rate limiting (100 req/10min generic, 5 req/15min auth)
- NoSQL injection prevention
- XSS protection
- HTTP parameter pollution protection
- Secure HTTP headers (Helmet)
- Payment signature verification

## Known Limitations

- Email sending is mocked (logs to console)
- PDF generation is mocked
- Analytics are mock data (not real GA4/Facebook Pixel)

## License

MIT License

---

**Happy Ticketing!**