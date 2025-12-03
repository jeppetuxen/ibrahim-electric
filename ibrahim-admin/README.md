# Ibrahim Electric Admin

Django-based administration system for managing Ibrahim Electric band events, contracts, venues, and contacts.

## Features

- **Venue Management**: Track venues/organizers with complete contact information
- **Contact Management**: Manage contacts at each venue
- **Event Management**: Organize concerts with detailed event information
- **Contract Tracking**: Handle financial details, invoicing, and payments
- **Technical Requirements**: Track technical and hospitality requirements for each event
- **Beautiful Admin Interface**: Custom Django admin with colored status badges, inline editing, and comprehensive filtering

## Models

### Venue
Represents venues and organizers (Arrangør)
- Name, address, CVR number
- Contact information (phone, email, website)
- Related events and contacts

### Contact
Contact persons at venues
- Name, position, contact details
- Primary contact designation
- Links to venue

### Event
Concert/event details
- Contract number (e.g., IE001, IE032)
- Concert date, time, duration
- Venue and location
- Status tracking (Inquiry, Pending, Confirmed, Completed, Cancelled)

### Contract
Financial and legal details
- Artist fee, booking fee, VAT
- Profit sharing arrangements
- Payment tracking (invoice sent/paid)
- Contract file upload
- Bank account and tax information

### Technical Requirements
Technical and hospitality provisions
- Sound, lights, stage requirements
- Catering and hotel arrangements
- Equipment notes
- Soundcheck and door times

## Setup

### Prerequisites
- Python 3.8+
- pip

### Installation

1. Clone the repository (if applicable):
```bash
cd ibrahim-admin
```

2. Create and activate virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run migrations (already done, but for reference):
```bash
python manage.py migrate
```

5. Create a superuser to access the admin:
```bash
python manage.py createsuperuser
```

6. Run the development server:
```bash
python manage.py runserver
```

7. Access the admin interface:
   - Open browser to http://127.0.0.1:8000/admin/
   - Login with your superuser credentials

## Usage

### Adding a New Event

1. Go to Events → Add Event
2. Enter contract details (number, date, status)
3. Select or create venue and contact
4. Enter concert details (date, time, duration)
5. In the Contract inline section, add financial details
6. In the Technical Requirements section, specify what the venue provides
7. Upload the signed contract PDF if available
8. Save

### Managing Venues

1. Go to Venues → Add Venue
2. Enter venue details
3. Add contacts inline or separately
4. Mark primary contact for each venue

### Tracking Payments

The Events list shows payment status:
- Red "✗ Pending" - Invoice not yet sent
- Orange "⏳ Invoiced" - Invoice sent, awaiting payment
- Green "✓ Paid" - Payment received

Update payment status in the Contract section of each event.

### Searching and Filtering

- Use the search bar to find events by contract number, venue name, or location
- Filter by status, date, city, payment status
- Use date hierarchy to navigate by concert date

## Data Model Relationships

```
Venue
  └─ Contact (many contacts per venue)
  └─ Event (many events per venue)
      └─ Contract (one per event)
      └─ Technical Requirements (one per event)
```

## Admin Features

### Event List
- Contract number and date
- Venue and city
- Colored status badges
- Total fee display
- Payment status indicators
- Date hierarchy navigation

### Inline Editing
- Add contract details directly from event page
- Add technical requirements without leaving event
- Add contacts when creating/editing venues

### Custom Displays
- Event count per venue
- Total contract amount calculations
- Visual payment status indicators
- Colored status badges

## Configuration

### Settings
- Database: SQLite (development) - located at `db.sqlite3`
- Media files: Stored in `media/` directory
- Static files: Will be collected to `staticfiles/`
- Timezone: Europe/Copenhagen

### Admin Customization
The admin site is customized in `config/urls.py`:
- Site header: "Ibrahim Electric Admin"
- Site title: "Ibrahim Electric Admin Portal"
- Index title: Custom welcome message

## Development

### Project Structure
```
ibrahim-admin/
├── band/                 # Main app
│   ├── models.py        # Database models
│   ├── admin.py         # Admin configuration
│   └── migrations/      # Database migrations
├── config/              # Project settings
│   ├── settings.py      # Django settings
│   └── urls.py          # URL configuration
├── invoices/            # Contract PDFs (38 existing contracts)
├── media/               # Uploaded files
├── manage.py            # Django management script
└── requirements.txt     # Python dependencies
```

### Models Reference

All models include:
- `created_at` - Timestamp when created
- `updated_at` - Timestamp of last update
- `notes` - Free-form text field for additional information

## Existing Contracts

The system was designed based on analysis of 38 existing contracts (IE0001 - IE041) located in the `invoices/` directory. These contracts span from 2022 to 2025 and include venues across Denmark and Germany.

## Support

For issues or questions, contact: jeppetuxen@gmail.com

## License

Internal use for Ibrahim Electric band administration.
