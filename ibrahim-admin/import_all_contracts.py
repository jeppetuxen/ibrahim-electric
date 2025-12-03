#!/usr/bin/env python
"""
Complete contract import script for Ibrahim Electric
Imports all 38 contracts from the invoices directory
"""

import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from band.models import Venue, Contact, Event, Contract, TechnicalRequirements
from decimal import Decimal
from datetime import date, time

def create_event_with_contract(data):
    """Helper function to create event with all related data"""

    # Create or get venue
    venue, _ = Venue.objects.get_or_create(
        name=data['venue_name'],
        defaults={
            'address': data.get('venue_address', ''),
            'city': data.get('venue_city', ''),
            'postal_code': data.get('venue_postal_code', ''),
            'cvr_number': data.get('venue_cvr', ''),
            'phone': data.get('venue_phone', ''),
            'email': data.get('venue_email', ''),
        }
    )

    # Create contact if provided
    contact = None
    if data.get('contact_name'):
        parts = data['contact_name'].split(' ', 1)
        contact, _ = Contact.objects.get_or_create(
            venue=venue,
            email=data.get('contact_email', ''),
            defaults={
                'first_name': parts[0],
                'last_name': parts[1] if len(parts) > 1 else '',
                'is_primary': True,
            }
        )

    # Parse dates and times
    concert_date = date.fromisoformat(data['concert_date'])
    contract_date = date.fromisoformat(data['contract_date'])

    # Handle time parsing
    start_time_str = data.get('start_time', '20:00')
    if 'aften' in start_time_str.lower() or 'after' in start_time_str.lower():
        start_time_obj = time(20, 0)
    else:
        parts = start_time_str.split(':')
        start_time_obj = time(int(parts[0]), int(parts[1]) if len(parts) > 1 else 0)

    # Create event
    event, created = Event.objects.get_or_create(
        contract_number=data['contract_number'],
        defaults={
            'contract_date': contract_date,
            'venue': venue,
            'primary_contact': contact,
            'concert_date': concert_date,
            'start_time': start_time_obj,
            'duration_minutes': data.get('duration', 75),
            'location': data.get('location', ''),
            'status': data.get('status', 'pending'),
            'notes': data.get('notes', ''),
        }
    )

    if not created:
        print(f"  Event {data['contract_number']} already exists, skipping...")
        return

    # Create contract
    Contract.objects.create(
        event=event,
        artist_fee=Decimal(str(data.get('artist_fee', 0))),
        booking_fee=Decimal(str(data.get('booking_fee', 0))),
        vat_amount=Decimal(str(data.get('vat', 0))),
        has_profit_sharing=data.get('profit_sharing', False),
        profit_sharing_percentage=data.get('profit_sharing_pct', 80) if data.get('profit_sharing') else None,
        profit_sharing_terms=data.get('profit_sharing_terms', ''),
        bank_account='reg: 7590 konto 1840092',
        tax_info='''Niclas Knudsen, CPR nr. 300172-1827
Stefan Pasborg, CVR-nummer: 34543992
Jeppe Tuxen, CPR nr. 160279-3067''',
    )

    # Create technical requirements
    TechnicalRequirements.objects.create(
        event=event,
        sound_provided=True,
        lights_provided=True,
        stage_provided=True,
        catering_provided=True,
        hotel_rooms=data.get('hotel_rooms', 0),
        band_brings_equipment=True,
        equipment_notes='Artist brings own backline (baggear)',
    )

    print(f"✓ Created {data['contract_number']} - {venue.name} - {concert_date}")

# All contract data
CONTRACTS = [
    # 2022 Events
    {'contract_number': 'IE001', 'contract_date': '2022-01-31', 'concert_date': '2022-08-13', 'start_time': '13:30',
     'venue_name': 'Blue Bridge Festival', 'venue_city': 'Bjert', 'venue_cvr': '37429813',
     'contact_name': 'Philip Holm-Hansen', 'contact_email': 'philip@holmhansenmail.dk',
     'artist_fee': 25000, 'status': 'completed'},

    {'contract_number': 'IE002', 'contract_date': '2022-02-08', 'concert_date': '2022-07-07', 'start_time': '19:00',
     'venue_name': 'Mielcke & Hurtigkarl ApS', 'venue_city': 'Frederiksberg C', 'venue_cvr': '31061911',
     'contact_name': 'Thomas Amir Korby', 'contact_email': 'thomas@mhcph.com',
     'artist_fee': 0, 'profit_sharing': True, 'status': 'completed'},

    {'contract_number': 'IE003', 'contract_date': '2022-03-04', 'concert_date': '2022-10-29', 'start_time': '20:00',
     'venue_name': 'Posten', 'venue_city': 'Odense C',
     'contact_name': 'Morten Østlund',
     'artist_fee': 25000, 'status': 'completed'},

    {'contract_number': 'IE004', 'contract_date': '2022-03-04', 'concert_date': '2022-08-06', 'start_time': '19:30',
     'venue_name': 'Svanekegaarden', 'venue_city': 'Svaneke',
     'contact_name': 'Mie Hjort', 'contact_email': 'booking@svanekegaarden.dk',
     'artist_fee': 25000, 'hotel_rooms': 3, 'status': 'completed'},

    {'contract_number': 'IE005', 'contract_date': '2022-03-28', 'concert_date': '2022-08-20', 'start_time': '20:00',
     'venue_name': 'DELUXE MUSIC V. FREDERIK SCHNOOR', 'venue_city': 'Hornbæk', 'venue_cvr': '35353771',
     'artist_fee': 22500, 'duration': 60, 'status': 'completed'},

    {'contract_number': 'IE006', 'contract_date': '2022-05-18', 'concert_date': '2022-07-22', 'start_time': '23:00',
     'venue_name': 'Posten', 'venue_city': 'Odense C',
     'contact_name': 'Morten Østlund',
     'artist_fee': 25000, 'hotel_rooms': 3, 'status': 'completed'},

    {'contract_number': 'IE007', 'contract_date': '2022-05-18', 'concert_date': '2022-08-07', 'start_time': '15:00',
     'venue_name': 'Foreningen Østersøjazz i Nexø', 'venue_city': 'Nexø', 'venue_cvr': '30951352',
     'contact_name': 'Michael Charles Gaunt',
     'artist_fee': 8000, 'duration': 45, 'status': 'completed'},

    {'contract_number': 'IE008', 'contract_date': '2022-08-06', 'concert_date': '2022-10-25', 'start_time': 'Aften',
     'venue_name': 'Ollerup Efterskole', 'venue_city': 'Vester Skerninge', 'venue_cvr': '19793192',
     'artist_fee': 18000, 'status': 'completed'},

    {'contract_number': 'IE009', 'contract_date': '2022-08-06', 'concert_date': '2022-10-28', 'start_time': '21:00',
     'venue_name': 'Musikforeningen Loppen', 'venue_city': 'København K',
     'artist_fee': 0, 'notes': 'Venue rental - IE pays Loppen kr. 13.000', 'status': 'completed'},

    {'contract_number': 'IE010', 'contract_date': '2022-08-06', 'concert_date': '2022-10-27', 'start_time': '19:00',
     'venue_name': 'Turkis', 'venue_city': 'Aarhus C',
     'artist_fee': 9000, 'profit_sharing': True, 'profit_sharing_pct': 70, 'status': 'completed'},

    # 2023 Events
    {'contract_number': 'IE011', 'contract_date': '2022-11-09', 'concert_date': '2023-03-17', 'start_time': '20:00',
     'venue_name': 'Richter', 'venue_city': 'Søborg', 'venue_cvr': '39491621',
     'contact_name': 'Martin Verner Hansen', 'contact_email': 'martin@richter-gladsaxe.dk',
     'artist_fee': 22500, 'profit_sharing': True, 'profit_sharing_pct': 60, 'status': 'completed'},

    {'contract_number': 'IE012', 'contract_date': '2022-11-25', 'concert_date': '2023-03-04', 'start_time': '20:00',
     'venue_name': 'Tapperiet', 'venue_city': 'Køge',
     'contact_name': 'Karen Gudiksen',
     'artist_fee': 15000, 'profit_sharing': True, 'profit_sharing_pct': 80, 'status': 'completed'},

    {'contract_number': 'IE013', 'contract_date': '2022-12-20', 'concert_date': '2023-05-05', 'start_time': '20:00',
     'venue_name': 'Vershuset', 'venue_city': 'Næstved', 'venue_cvr': '48962416',
     'contact_name': 'Steen Aggerlin',
     'artist_fee': 19000, 'profit_sharing': True, 'profit_sharing_pct': 80, 'status': 'completed'},

    {'contract_number': 'IE017', 'contract_date': '2023-03-10', 'concert_date': '2023-07-18', 'start_time': '19:00',
     'venue_name': 'Festivalen Stjerner over Farø', 'venue_city': 'Bogø By', 'venue_cvr': '43863274',
     'contact_name': 'Gustav Bengtsson', 'contact_email': 'guzz@hejdu.dk',
     'artist_fee': 30000, 'hotel_rooms': 3, 'status': 'completed'},

    {'contract_number': 'IE018', 'contract_date': '2023-03-20', 'concert_date': '2023-12-09', 'start_time': '20:00',
     'venue_name': 'Posten', 'venue_city': 'Odense C',
     'contact_name': 'Morten Østlund',
     'artist_fee': 25000, 'hotel_rooms': 3, 'status': 'completed'},

    {'contract_number': 'IE019', 'contract_date': '2023-03-20', 'concert_date': '2023-12-08', 'start_time': '20:00',
     'venue_name': 'Hotel Cecil', 'venue_city': 'København K', 'venue_cvr': '39030497',
     'contact_name': 'Jesper Majdall',
     'artist_fee': 30000, 'profit_sharing': True, 'profit_sharing_pct': 80, 'status': 'completed'},

    {'contract_number': 'IE020', 'contract_date': '2023-03-20', 'concert_date': '2023-10-07', 'start_time': '21:00',
     'venue_name': 'Studenterhuset Aalborg', 'venue_city': 'Aalborg', 'venue_cvr': '16736341',
     'contact_name': 'Mads Mulvad',
     'artist_fee': 25000, 'status': 'completed'},

    {'contract_number': 'IE021', 'contract_date': '2023-04-18', 'concert_date': '2023-05-25', 'start_time': '23:40',
     'venue_name': 'Jelling Festival', 'venue_city': 'Jelling', 'venue_cvr': '17862073',
     'contact_name': 'Jeppe Wojcik',
     'artist_fee': 25000, 'hotel_rooms': 3, 'status': 'completed'},

    {'contract_number': 'IE022', 'contract_date': '2023-06-12', 'concert_date': '2023-08-18', 'start_time': '20:00',
     'venue_name': 'Lund Havn c/o Scandinavian Cello School', 'venue_city': 'Rødvig Stevns', 'venue_cvr': '39980274',
     'contact_name': 'Jacob Shaw',
     'artist_fee': 30000, 'status': 'completed'},

    # 2024 Events
    {'contract_number': 'IE023', 'contract_date': '2024-01-04', 'concert_date': '2024-07-07', 'start_time': '20:00',
     'venue_name': 'Bremen Teater', 'venue_city': 'København', 'venue_cvr': '32560709',
     'contact_name': 'Søren Hvidt',
     'artist_fee': 40000, 'profit_sharing': True, 'profit_sharing_pct': 80, 'status': 'completed'},

    {'contract_number': 'IE024', 'contract_date': '2024-01-17', 'concert_date': '2024-09-19', 'start_time': '20:00',
     'venue_name': 'Badeanstalten', 'venue_city': 'Slagelse', 'venue_cvr': '28130805',
     'contact_name': 'Annette Borg', 'contact_email': 'anbor@slagelsemusikhus.dk',
     'artist_fee': 18000, 'profit_sharing': True, 'profit_sharing_pct': 80, 'status': 'completed'},

    {'contract_number': 'IE025', 'contract_date': '2024-01-17', 'concert_date': '2024-09-20', 'start_time': '21:00',
     'venue_name': 'FredericiaLive - Tøjhuset', 'venue_city': 'Fredericia', 'venue_cvr': '11105939',
     'contact_name': 'Sune Rasmussen', 'contact_email': 'sune.rasmussen@fredericia.dk',
     'artist_fee': 18000, 'profit_sharing': True, 'profit_sharing_pct': 80, 'status': 'completed'},

    {'contract_number': 'IE026', 'contract_date': '2024-01-17', 'concert_date': '2024-09-21', 'start_time': '20:00',
     'venue_name': 'Posten', 'venue_city': 'Odense', 'venue_cvr': '34131368',
     'contact_name': 'Morten Østlund', 'contact_email': 'morten@postenlive.dk',
     'artist_fee': 25000, 'profit_sharing': True, 'profit_sharing_pct': 80, 'hotel_rooms': 3, 'status': 'completed'},

    {'contract_number': 'IE027', 'contract_date': '2024-02-01', 'concert_date': '2024-12-13', 'start_time': '20:00',
     'venue_name': 'Hotel Cecil', 'venue_city': 'København K', 'venue_cvr': '39030497',
     'contact_name': 'Jesper Majdall',
     'artist_fee': 24000, 'booking_fee': 6000, 'vat': 1500, 'profit_sharing': True, 'profit_sharing_pct': 80, 'status': 'confirmed'},

    {'contract_number': 'IE028', 'contract_date': '2024-02-01', 'concert_date': '2024-12-14', 'start_time': '20:00',
     'venue_name': 'Hotel Cecil', 'venue_city': 'København K', 'venue_cvr': '39030497',
     'contact_name': 'Jesper Majdall',
     'artist_fee': 24000, 'booking_fee': 6000, 'vat': 1500, 'profit_sharing': True, 'profit_sharing_pct': 80, 'status': 'confirmed'},

    {'contract_number': 'IE029', 'contract_date': '2024-02-01', 'concert_date': '2024-07-22', 'start_time': '19:30',
     'venue_name': 'Svanekegaarden', 'venue_city': 'Svaneke',
     'contact_name': 'Mie Hjort', 'contact_email': 'booking@svanekegaarden.dk',
     'artist_fee': 19000, 'booking_fee': 6000, 'vat': 1500, 'hotel_rooms': 3, 'status': 'completed'},

    {'contract_number': 'IE030', 'contract_date': '2024-02-01', 'concert_date': '2024-09-07', 'start_time': '20:00',
     'venue_name': 'Kulturloft', 'venue_city': 'Ebeltoft', 'venue_cvr': '30626109',
     'contact_name': 'Jan Houkjær', 'contact_email': 'jan@kulturloft.dk',
     'artist_fee': 16000, 'booking_fee': 6000, 'vat': 1500, 'status': 'completed'},

    {'contract_number': 'IE031', 'contract_date': '2024-02-01', 'concert_date': '2024-11-09', 'start_time': '21:00',
     'venue_name': 'Radar', 'venue_city': 'Aarhus C', 'venue_cvr': '25201914',
     'contact_name': 'Martin Aagaard Jensen', 'contact_email': 'martin@radarlive.dk',
     'artist_fee': 9000, 'booking_fee': 6000, 'vat': 1500, 'profit_sharing': True, 'profit_sharing_pct': 80, 'status': 'completed'},

    {'contract_number': 'IE032', 'contract_date': '2024-02-01', 'concert_date': '2025-01-31', 'start_time': '20:00',
     'venue_name': 'Tobaksgaarden', 'venue_city': 'Assens', 'venue_cvr': '27065228',
     'contact_name': 'Lasse Tajmer', 'contact_email': 'lasse@tobaksgaarden.dk',
     'artist_fee': 12000, 'booking_fee': 6000, 'vat': 1500, 'profit_sharing': True, 'profit_sharing_pct': 80, 'status': 'confirmed'},

    {'contract_number': 'IE033', 'contract_date': '2024-02-01', 'concert_date': '2025-02-22', 'start_time': '21:00',
     'venue_name': 'Studenterhuset Aalborg', 'venue_city': 'Aalborg', 'venue_cvr': '16736341',
     'contact_name': 'Mads Mulvad',
     'artist_fee': 19000, 'booking_fee': 6000, 'vat': 1500, 'status': 'confirmed'},

    {'contract_number': 'IE034', 'contract_date': '2024-02-01', 'concert_date': '2024-09-06', 'start_time': '21:00',
     'venue_name': 'Platform K', 'venue_city': 'Horsens', 'venue_cvr': '42668621',
     'contact_name': 'Jeppe Vind',
     'artist_fee': 12000, 'booking_fee': 6000, 'vat': 1500, 'profit_sharing': True, 'profit_sharing_pct': 80, 'hotel_rooms': 3, 'status': 'completed'},

    {'contract_number': 'IE035', 'contract_date': '2024-03-18', 'concert_date': '2025-03-15', 'start_time': '21:00',
     'venue_name': 'Studenterhuset Aalborg', 'venue_city': 'Aalborg', 'venue_cvr': '16736341',
     'contact_name': 'Mads Mulvad',
     'artist_fee': 19000, 'booking_fee': 6000, 'vat': 1500, 'status': 'confirmed'},

    {'contract_number': 'IE036', 'contract_date': '2024-08-15', 'concert_date': '2025-03-14', 'start_time': '20:00',
     'venue_name': 'Walthers Musikcafé', 'venue_city': 'Skanderborg', 'venue_cvr': '41725303',
     'contact_name': 'Jeppe Levin Kær',
     'artist_fee': 20000, 'profit_sharing': True, 'profit_sharing_pct': 80, 'status': 'confirmed'},

    {'contract_number': 'IE037', 'contract_date': '2024-08-15', 'concert_date': '2025-04-25', 'start_time': '20:00',
     'venue_name': 'Jive Jazz i Vejle', 'venue_city': 'Daugård', 'venue_cvr': '10277078',
     'contact_name': 'Lars Wichmann',
     'artist_fee': 22000, 'profit_sharing': True, 'profit_sharing_pct': 80, 'status': 'confirmed'},

    # 2025 Events
    {'contract_number': 'IE038', 'contract_date': '2025-02-10', 'concert_date': '2025-07-05', 'start_time': '20:00',
     'venue_name': 'Bremen Teater', 'venue_city': 'København', 'venue_cvr': '32560709',
     'contact_name': 'Søren Hvidt',
     'artist_fee': 34000, 'booking_fee': 6000, 'vat': 1500, 'profit_sharing': True, 'profit_sharing_pct': 80, 'status': 'confirmed'},

    {'contract_number': 'IE039', 'contract_date': '2025-02-15', 'concert_date': '2025-12-10', 'start_time': '20:00',
     'venue_name': 'Hotel Cecil', 'venue_city': 'København K', 'venue_cvr': '39030497',
     'contact_name': 'Jesper Majdall',
     'artist_fee': 24000, 'booking_fee': 6000, 'vat': 1500, 'profit_sharing': True, 'profit_sharing_pct': 80, 'status': 'confirmed'},

    {'contract_number': 'IE040', 'contract_date': '2025-02-15', 'concert_date': '2025-12-11', 'start_time': '20:00',
     'venue_name': 'Hotel Cecil', 'venue_city': 'København K', 'venue_cvr': '39030497',
     'contact_name': 'Jesper Majdall',
     'artist_fee': 24000, 'booking_fee': 6000, 'vat': 1500, 'profit_sharing': True, 'profit_sharing_pct': 80, 'status': 'confirmed'},

    {'contract_number': 'IE041', 'contract_date': '2025-08-09', 'concert_date': '2025-08-09', 'start_time': '19:30',
     'venue_name': 'Svanekegaarden', 'venue_city': 'Svaneke',
     'contact_name': 'Mie Hjort', 'contact_email': 'booking@svanekegaarden.dk',
     'artist_fee': 21000, 'hotel_rooms': 3, 'status': 'confirmed'},
]

if __name__ == '__main__':
    print("=" * 60)
    print("IBRAHIM ELECTRIC - Complete Contract Import")
    print("=" * 60)
    print(f"\nImporting {len(CONTRACTS)} contracts...\n")

    for contract_data in CONTRACTS:
        create_event_with_contract(contract_data)

    print("\n" + "=" * 60)
    print("IMPORT COMPLETE")
    print("=" * 60)
    print(f"\nSummary:")
    print(f"  Venues: {Venue.objects.count()}")
    print(f"  Contacts: {Contact.objects.count()}")
    print(f"  Events: {Event.objects.count()}")
    print(f"  Contracts: {Contract.objects.count()}")
    print(f"  Technical Requirements: {TechnicalRequirements.objects.count()}")
    print("\n✓ All contracts imported successfully!")
    print("\nNext step: Create a superuser to access the admin:")
    print("  python manage.py createsuperuser\n")
