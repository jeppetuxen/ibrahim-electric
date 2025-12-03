from django.db import models
from django.core.validators import MinValueValidator
from decimal import Decimal


class Venue(models.Model):
    """Represents a venue/organizer (Arrangør)"""
    name = models.CharField(max_length=200, verbose_name="Venue Name")
    address = models.CharField(max_length=200, blank=True)
    postal_code = models.CharField(max_length=20, blank=True)
    city = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, default="Denmark")
    cvr_number = models.CharField(max_length=50, blank=True, verbose_name="CVR Number")
    phone = models.CharField(max_length=50, blank=True)
    email = models.EmailField(blank=True)
    website = models.URLField(blank=True)
    notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']
        verbose_name = "Venue"
        verbose_name_plural = "Venues"

    def __str__(self):
        return self.name


class Contact(models.Model):
    """Contact person at venue/organizer"""
    venue = models.ForeignKey(Venue, on_delete=models.CASCADE, related_name='contacts')
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100, blank=True)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True)
    mobile = models.CharField(max_length=50, blank=True)
    position = models.CharField(max_length=100, blank=True, help_text="Role or position at venue")
    is_primary = models.BooleanField(default=False, help_text="Primary contact for this venue")
    notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['venue', '-is_primary', 'last_name', 'first_name']
        verbose_name = "Contact"
        verbose_name_plural = "Contacts"

    def __str__(self):
        full_name = f"{self.first_name} {self.last_name}".strip()
        return f"{full_name} ({self.venue.name})"

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}".strip()


class Event(models.Model):
    """Concert/Event details"""

    STATUS_CHOICES = [
        ('inquiry', 'Inquiry'),
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    contract_number = models.CharField(
        max_length=20,
        unique=True,
        verbose_name="Contract Number",
        help_text="e.g., IE001, IE032"
    )
    contract_date = models.DateField(verbose_name="Contract Date")

    venue = models.ForeignKey(Venue, on_delete=models.PROTECT, related_name='events')
    primary_contact = models.ForeignKey(
        Contact,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='events'
    )

    concert_date = models.DateField(verbose_name="Concert Date")
    start_time = models.TimeField(verbose_name="Start Time")
    duration_minutes = models.IntegerField(
        default=75,
        verbose_name="Duration (minutes)",
        help_text="e.g., 75 for 1x75min"
    )
    encore_possible = models.BooleanField(default=True, verbose_name="Encore Possible")

    location = models.CharField(
        max_length=200,
        blank=True,
        verbose_name="Specific Location",
        help_text="Specific location at venue (e.g., Søpavillonen)"
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending'
    )

    notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-concert_date', '-start_time']
        verbose_name = "Event"
        verbose_name_plural = "Events"

    def __str__(self):
        return f"{self.contract_number} - {self.concert_date} - {self.venue.name}"


class Contract(models.Model):
    """Financial and contract details for an event"""

    event = models.OneToOneField(Event, on_delete=models.CASCADE, related_name='contract')

    # Financial details
    artist_fee = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(Decimal('0.00'))],
        verbose_name="Artist Fee (DKK)"
    )
    booking_fee = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=Decimal('0.00'),
        validators=[MinValueValidator(Decimal('0.00'))],
        verbose_name="Booking/Production Fee (DKK)"
    )
    vat_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=Decimal('0.00'),
        validators=[MinValueValidator(Decimal('0.00'))],
        verbose_name="VAT Amount (DKK)"
    )

    # Profit sharing
    has_profit_sharing = models.BooleanField(default=False)
    profit_sharing_percentage = models.IntegerField(
        null=True,
        blank=True,
        validators=[MinValueValidator(0)],
        verbose_name="Profit Sharing %",
        help_text="e.g., 80 for 80%"
    )
    profit_sharing_terms = models.TextField(
        blank=True,
        help_text="e.g., '80% after break even'"
    )

    # Payment details
    payment_terms = models.TextField(
        blank=True,
        help_text="Payment terms and conditions"
    )
    bank_account = models.CharField(
        max_length=100,
        blank=True,
        help_text="Bank account for payment (reg: 7590 konto 1840092)"
    )

    # Tax information for band members
    tax_info = models.TextField(
        blank=True,
        verbose_name="Tax Information",
        help_text="CPR/CVR numbers for band members"
    )

    # Invoice tracking
    invoice_sent = models.BooleanField(default=False)
    invoice_sent_date = models.DateField(null=True, blank=True)
    payment_received = models.BooleanField(default=False)
    payment_received_date = models.DateField(null=True, blank=True)

    # File attachment
    contract_file = models.FileField(
        upload_to='contracts/',
        blank=True,
        null=True,
        help_text="Upload the signed contract PDF"
    )

    notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Contract"
        verbose_name_plural = "Contracts"

    def __str__(self):
        return f"Contract for {self.event.contract_number}"

    @property
    def total_amount(self):
        """Calculate total contract amount"""
        return self.artist_fee + self.booking_fee + self.vat_amount


class TechnicalRequirements(models.Model):
    """Technical requirements and provisions for an event"""

    event = models.OneToOneField(
        Event,
        on_delete=models.CASCADE,
        related_name='technical_requirements'
    )

    # What the venue provides
    sound_provided = models.BooleanField(default=True, verbose_name="Sound System Provided")
    lights_provided = models.BooleanField(default=True, verbose_name="Lights Provided")
    stage_provided = models.BooleanField(default=True, verbose_name="Stage Provided")

    # Hospitality
    catering_provided = models.BooleanField(default=False, verbose_name="Catering/Forplejning Provided")
    catering_details = models.TextField(blank=True, help_text="Details about catering")

    hotel_rooms = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0)],
        help_text="Number of hotel rooms provided"
    )
    hotel_details = models.TextField(blank=True, help_text="Hotel details and location")

    # Equipment
    backline_provided = models.BooleanField(
        default=False,
        help_text="Does venue provide backline equipment?"
    )
    band_brings_equipment = models.BooleanField(
        default=True,
        verbose_name="Band Brings Own Equipment"
    )
    equipment_notes = models.TextField(
        blank=True,
        help_text="Details about equipment, backline, etc."
    )

    # Special requirements
    special_requirements = models.TextField(
        blank=True,
        help_text="Any special technical or logistical requirements"
    )

    # Stage times
    soundcheck_time = models.TimeField(null=True, blank=True)
    doors_open_time = models.TimeField(null=True, blank=True)

    notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Technical Requirements"
        verbose_name_plural = "Technical Requirements"

    def __str__(self):
        return f"Tech Reqs for {self.event.contract_number}"
