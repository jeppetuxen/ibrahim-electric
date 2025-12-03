from django.contrib import admin
from django.utils.html import format_html
from .models import Venue, Contact, Event, Contract, TechnicalRequirements


class ContactInline(admin.TabularInline):
    """Inline for contacts within venue admin"""
    model = Contact
    extra = 1
    fields = ['first_name', 'last_name', 'email', 'phone', 'mobile', 'position', 'is_primary']


@admin.register(Venue)
class VenueAdmin(admin.ModelAdmin):
    list_display = ['name', 'city', 'cvr_number', 'email', 'phone', 'event_count']
    list_filter = ['city', 'country']
    search_fields = ['name', 'city', 'cvr_number', 'email']
    inlines = [ContactInline]
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'cvr_number')
        }),
        ('Address', {
            'fields': ('address', 'postal_code', 'city', 'country')
        }),
        ('Contact Information', {
            'fields': ('phone', 'email', 'website')
        }),
        ('Notes', {
            'fields': ('notes',),
            'classes': ('collapse',)
        }),
    )

    def event_count(self, obj):
        """Show number of events at this venue"""
        count = obj.events.count()
        return count
    event_count.short_description = 'Events'


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'venue', 'email', 'phone', 'mobile', 'is_primary']
    list_filter = ['venue', 'is_primary']
    search_fields = ['first_name', 'last_name', 'email', 'venue__name']
    list_select_related = ['venue']
    fieldsets = (
        ('Personal Information', {
            'fields': ('first_name', 'last_name', 'position')
        }),
        ('Venue', {
            'fields': ('venue', 'is_primary')
        }),
        ('Contact Information', {
            'fields': ('email', 'phone', 'mobile')
        }),
        ('Notes', {
            'fields': ('notes',),
            'classes': ('collapse',)
        }),
    )


class ContractInline(admin.StackedInline):
    """Inline for contract within event admin"""
    model = Contract
    can_delete = False
    fields = [
        ('artist_fee', 'booking_fee', 'vat_amount'),
        ('has_profit_sharing', 'profit_sharing_percentage'),
        'profit_sharing_terms',
        'payment_terms',
        'bank_account',
        'tax_info',
        ('invoice_sent', 'invoice_sent_date'),
        ('payment_received', 'payment_received_date'),
        'contract_file',
        'notes'
    ]


class TechnicalRequirementsInline(admin.StackedInline):
    """Inline for technical requirements within event admin"""
    model = TechnicalRequirements
    can_delete = False
    fields = [
        ('sound_provided', 'lights_provided', 'stage_provided'),
        ('catering_provided', 'catering_details'),
        ('hotel_rooms', 'hotel_details'),
        ('backline_provided', 'band_brings_equipment'),
        'equipment_notes',
        'special_requirements',
        ('soundcheck_time', 'doors_open_time'),
        'notes'
    ]


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = [
        'contract_number',
        'concert_date',
        'start_time',
        'venue',
        'city',
        'status_badge',
        'total_fee',
        'payment_status'
    ]
    list_filter = ['status', 'concert_date', 'venue__city']
    search_fields = ['contract_number', 'venue__name', 'location', 'notes']
    date_hierarchy = 'concert_date'
    list_select_related = ['venue', 'primary_contact']
    inlines = [ContractInline, TechnicalRequirementsInline]

    fieldsets = (
        ('Contract Information', {
            'fields': ('contract_number', 'contract_date', 'status')
        }),
        ('Event Details', {
            'fields': (
                'concert_date',
                'start_time',
                ('duration_minutes', 'encore_possible')
            )
        }),
        ('Venue & Contact', {
            'fields': ('venue', 'primary_contact', 'location')
        }),
        ('Notes', {
            'fields': ('notes',),
            'classes': ('collapse',)
        }),
    )

    def city(self, obj):
        """Show city from venue"""
        return obj.venue.city
    city.short_description = 'City'
    city.admin_order_field = 'venue__city'

    def status_badge(self, obj):
        """Show colored status badge"""
        colors = {
            'inquiry': '#999',
            'pending': '#f39c12',
            'confirmed': '#3498db',
            'completed': '#27ae60',
            'cancelled': '#e74c3c',
        }
        color = colors.get(obj.status, '#999')
        return format_html(
            '<span style="background-color: {}; color: white; padding: 3px 10px; border-radius: 3px;">{}</span>',
            color,
            obj.get_status_display()
        )
    status_badge.short_description = 'Status'
    status_badge.admin_order_field = 'status'

    def total_fee(self, obj):
        """Show total contract amount"""
        try:
            total = obj.contract.total_amount
            return f"{total:,.0f} DKK"
        except Contract.DoesNotExist:
            return "-"
    total_fee.short_description = 'Total Fee'

    def payment_status(self, obj):
        """Show payment status"""
        try:
            contract = obj.contract
            if contract.payment_received:
                return format_html('<span style="color: green;">✓ Paid</span>')
            elif contract.invoice_sent:
                return format_html('<span style="color: orange;">⏳ Invoiced</span>')
            else:
                return format_html('<span style="color: red;">✗ Pending</span>')
        except Contract.DoesNotExist:
            return "-"
    payment_status.short_description = 'Payment'


@admin.register(Contract)
class ContractAdmin(admin.ModelAdmin):
    list_display = [
        'event',
        'artist_fee',
        'booking_fee',
        'vat_amount',
        'total_amount',
        'invoice_sent',
        'payment_received'
    ]
    list_filter = ['invoice_sent', 'payment_received', 'has_profit_sharing']
    search_fields = ['event__contract_number', 'event__venue__name']
    list_select_related = ['event', 'event__venue']
    date_hierarchy = 'event__concert_date'

    fieldsets = (
        ('Event', {
            'fields': ('event',)
        }),
        ('Financial Details', {
            'fields': (
                'artist_fee',
                'booking_fee',
                'vat_amount',
            )
        }),
        ('Profit Sharing', {
            'fields': (
                'has_profit_sharing',
                'profit_sharing_percentage',
                'profit_sharing_terms',
            )
        }),
        ('Payment Details', {
            'fields': (
                'payment_terms',
                'bank_account',
                'tax_info',
            )
        }),
        ('Invoice Tracking', {
            'fields': (
                ('invoice_sent', 'invoice_sent_date'),
                ('payment_received', 'payment_received_date'),
            )
        }),
        ('Contract File', {
            'fields': ('contract_file',)
        }),
        ('Notes', {
            'fields': ('notes',),
            'classes': ('collapse',)
        }),
    )

    readonly_fields = []

    def total_amount(self, obj):
        """Display total amount"""
        return f"{obj.total_amount:,.0f} DKK"
    total_amount.short_description = 'Total'


@admin.register(TechnicalRequirements)
class TechnicalRequirementsAdmin(admin.ModelAdmin):
    list_display = [
        'event',
        'sound_provided',
        'lights_provided',
        'catering_provided',
        'hotel_rooms'
    ]
    list_filter = [
        'sound_provided',
        'lights_provided',
        'stage_provided',
        'catering_provided',
        'backline_provided'
    ]
    search_fields = ['event__contract_number', 'event__venue__name']
    list_select_related = ['event', 'event__venue']

    fieldsets = (
        ('Event', {
            'fields': ('event',)
        }),
        ('Technical Provisions', {
            'fields': (
                'sound_provided',
                'lights_provided',
                'stage_provided',
            )
        }),
        ('Hospitality', {
            'fields': (
                'catering_provided',
                'catering_details',
                'hotel_rooms',
                'hotel_details',
            )
        }),
        ('Equipment', {
            'fields': (
                'backline_provided',
                'band_brings_equipment',
                'equipment_notes',
            )
        }),
        ('Schedule', {
            'fields': (
                'soundcheck_time',
                'doors_open_time',
            )
        }),
        ('Special Requirements', {
            'fields': ('special_requirements',)
        }),
        ('Notes', {
            'fields': ('notes',),
            'classes': ('collapse',)
        }),
    )
