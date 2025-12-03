# Quick Start Guide

## Get Started in 3 Minutes

### 1. Activate Virtual Environment
```bash
source venv/bin/activate
```

### 2. Create Admin User
```bash
python manage.py createsuperuser
```

You'll be prompted for:
- Username (e.g., `admin` or your name)
- Email (e.g., `jeppetuxen@gmail.com`)
- Password (enter twice)

### 3. Start the Server
```bash
python manage.py runserver
```

### 4. Access Admin
Open your browser to: **http://127.0.0.1:8000/admin/**

Login with the credentials you just created.

## What You'll See

The admin interface includes:

- **Venues** - Manage venues/organizers
- **Contacts** - Contact persons at venues
- **Events** - Concert bookings and details
- **Contracts** - Financial details and payments
- **Technical Requirements** - Tech specs for each event

## Adding Your First Event

1. Click **Venues** → **Add Venue**
   - Enter venue name, address, CVR
   - Add contact person inline
   - Save

2. Click **Events** → **Add Event**
   - Enter contract number (e.g., IE001)
   - Set dates and venue
   - Fill in Contract section (fees, payment)
   - Fill in Technical Requirements section
   - Upload contract PDF if available
   - Save

3. View all events in the Events list
   - See payment status
   - Filter by date, venue, status
   - Search by contract number

## Key Features

### Status Badges
Events show colored status:
- Gray: Inquiry
- Orange: Pending
- Blue: Confirmed
- Green: Completed
- Red: Cancelled

### Payment Tracking
- ✗ Pending (red) - Not invoiced
- ⏳ Invoiced (orange) - Invoice sent
- ✓ Paid (green) - Payment received

### Smart Filtering
- Filter events by city, date, status
- Search across contract numbers and venues
- Date hierarchy for easy navigation

## Next Steps

1. Import existing contract data from PDFs in `invoices/` directory
2. Set up regular backups of `db.sqlite3`
3. Consider deploying to production server
4. Add more band members as users (optional)

## Tips

- Use inline editing to add contracts and tech requirements without leaving event page
- Mark one contact per venue as "Primary"
- Upload signed contract PDFs for record keeping
- Track payment dates for accounting

## Need Help?

See the full README.md for detailed documentation.
