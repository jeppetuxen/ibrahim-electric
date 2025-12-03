from django.core.management.base import BaseCommand
from django.utils.dateparse import parse_date, parse_time
from band.models import Venue, Contact, Event, Contract, TechnicalRequirements
from decimal import Decimal
from datetime import datetime


class Command(BaseCommand):
    help = 'Import historical contract data from invoices'

    def handle(self, *args, **options):
        self.stdout.write('Starting contract import...')

        # Contract data extracted from PDFs
        contracts_data = [
            {
                'contract_number': 'IE001',
                'contract_date': '2022-01-31',
                'concert_date': '2022-08-13',
                'start_time': '13:30',
                'venue_name': 'Blue Bridge Festival',
                'venue_address': 'Gl. Bjert 52',
                'venue_city': 'Bjert',
                'venue_postal_code': '6091',
                'venue_cvr': '37429813',
                'contact_name': 'Philip Holm-Hansen',
                'contact_email': 'philip@holmhansenmail.dk',
                'location': 'Blue Bridge Festival, Østerløkke 40',
                'artist_fee': 25000,
                'status': 'completed',
            },
            {
                'contract_number': 'IE002',
                'contract_date': '2022-02-08',
                'concert_date': '2022-07-07',
                'start_time': '19:00',
                'venue_name': 'Mielcke & Hurtigkarl ApS',
                'venue_address': 'Frederiksberg Runddel 1',
                'venue_city': 'Frederiksberg C',
                'venue_postal_code': '2000',
                'venue_cvr': '31061911',
                'contact_name': 'Thomas Amir Korby',
                'contact_email': 'thomas@mhcph.com',
                'contact2_name': 'Mads Maaløe',
                'contact2_email': 'mads@locomusic.dk',
                'location': 'Haveselskabets Have',
                'artist_fee': 0,  # Profit sharing 75/25
                'notes': 'Profit sharing: 75/25 (Artist/Arrangør) after moms and KODA. Ticket price kr. 265',
                'status': 'completed',
                'profit_sharing': True,
            },
            {
                'contract_number': 'IE003',
                'contract_date': '2022-03-04',
                'concert_date': '2022-10-29',
                'start_time': '20:00',
                'venue_name': 'Posten (Odense)',
                'venue_address': 'Østre Stationsvej 35',
                'venue_city': 'Odense C',
                'venue_postal_code': '5000',
                'contact_name': 'Morten Østlund',
                'location': 'Dexter, Vindegade 65',
                'artist_fee': 25000,
                'status': 'completed',
            },
            {
                'contract_number': 'IE004',
                'contract_date': '2022-03-04',
                'concert_date': '2022-08-06',
                'start_time': '19:30',
                'venue_name': 'Svanekegaarden',
                'venue_address': 'Skippergade 2-8',
                'venue_city': 'Svaneke',
                'venue_postal_code': '3740',
                'venue_phone': '+45 56 49 73 72',
                'contact_name': 'Mie Hjort',
                'contact_email': 'booking@svanekegaarden.dk',
                'location': 'Svanekegaarden',
                'artist_fee': 25000,
                'hotel_rooms': 3,
                'status': 'completed',
            },
            {
                'contract_number': 'IE005',
                'contract_date': '2022-03-28',
                'concert_date': '2022-08-20',
                'start_time': '20:00',
                'duration': 60,
                'venue_name': 'DELUXE MUSIC V. FREDERIK SCHNOOR',
                'venue_address': 'Sauntevej 109',
                'venue_city': 'Hornbæk',
                'venue_postal_code': '3100',
                'venue_cvr': '35353771',
                'venue_phone': '+45 26 23 60 31',
                'venue_email': 'info@deluxe-music.dk',
                'location': 'Sommeriva Parken i Helsingør',
                'artist_fee': 22500,
                'status': 'completed',
            },
            {
                'contract_number': 'IE006',
                'contract_date': '2022-05-18',
                'concert_date': '2022-07-22',
                'start_time': '23:00',
                'venue_name': 'Posten (Odense)',
                'venue_address': 'Østre Stationsvej 35',
                'venue_city': 'Odense C',
                'venue_postal_code': '5000',
                'contact_name': 'Morten Østlund',
                'location': 'Posten',
                'artist_fee': 25000,
                'hotel_rooms': 3,
                'status': 'completed',
            },
            {
                'contract_number': 'IE007',
                'contract_date': '2022-05-18',
                'concert_date': '2022-08-07',
                'start_time': '15:00',
                'duration': 45,
                'venue_name': 'Foreningen Østersøjazz i Nexø',
                'venue_address': 'Bredgade 22',
                'venue_city': 'Nexø',
                'venue_postal_code': '3730',
                'venue_cvr': '30951352',
                'venue_phone': '26936246',
                'contact_name': 'Michael Charles Gaunt',
                'location': 'Torvet i Nexø',
                'artist_fee': 8000,
                'bank_account': 'reg: 7590 konto 1840092',
                'status': 'completed',
            },
            {
                'contract_number': 'IE008',
                'contract_date': '2022-08-06',
                'concert_date': '2022-10-25',
                'start_time': 'Aften',
                'venue_name': 'Ollerup Efterskole',
                'venue_address': 'Svendborgvej 10A',
                'venue_city': 'Vester Skerninge',
                'venue_postal_code': '5762',
                'venue_cvr': '19793192',
                'location': 'Ollerup Efterskole',
                'artist_fee': 18000,
                'bank_account': 'reg: 7590 konto 1840092',
                'status': 'completed',
            },
            {
                'contract_number': 'IE009',
                'contract_date': '2022-08-06',
                'concert_date': '2022-10-28',
                'start_time': '21:00',
                'venue_name': 'Musikforeningen Loppen',
                'venue_address': 'Sydområdet 4b, 1. sal',
                'venue_city': 'København K',
                'venue_postal_code': '1440',
                'location': 'Loppen',
                'artist_fee': 0,  # Venue rental
                'notes': 'Ibrahim Electric rents Loppen and handles ticket sales. Pays Loppen kr. 13.000',
                'status': 'completed',
            },
            {
                'contract_number': 'IE010',
                'contract_date': '2022-08-06',
                'concert_date': '2022-10-27',
                'start_time': '19:00',
                'venue_name': 'Turkis',
                'venue_address': 'Vester Allé 15',
                'venue_city': 'Aarhus C',
                'venue_postal_code': '8000',
                'location': 'Turkis',
                'artist_fee': 9000,
                'notes': 'Guarantee: 9.000 DKK (full payment). 70% profit sharing after break-even (after first 100 tickets). Ticket price 92 DKK (excl. fees, after VAT)',
                'profit_sharing': True,
                'profit_sharing_percentage': 70,
                'bank_account': 'reg: 7590 konto 1840092',
                'status': 'completed',
            },
            {
                'contract_number': 'IE021',
                'contract_date': '2023-04-18',
                'concert_date': '2023-05-25',
                'start_time': '23:40',
                'venue_name': 'Jelling Festival',
                'venue_address': 'Møllegade 10, 1. tv.',
                'venue_city': 'Jelling',
                'venue_postal_code': '7300',
                'venue_cvr': '17862073',
                'contact_name': 'Jeppe Wojcik',
                'location': 'Søpavillonen',
                'artist_fee': 25000,
                'bank_account': 'reg: 7590 konto 1840092',
                'hotel_rooms': 3,
                'status': 'completed',
            },
            {
                'contract_number': 'IE032',
                'contract_date': '2024-02-01',
                'concert_date': '2025-01-31',
                'start_time': '20:00',
                'venue_name': 'Tobaksgaarden',
                'venue_address': 'Tobaksgaarden 7',
                'venue_city': 'Assens',
                'venue_postal_code': '5610',
                'venue_cvr': '27065228',
                'venue_phone': '+45 64 71 20 31',
                'contact_name': 'Lasse Tajmer',
                'contact_email': 'lasse@tobaksgaarden.dk',
                'location': 'Tobaksgaarden',
                'artist_fee': 12000,
                'booking_fee': 6000,
                'vat': 1500,
                'profit_sharing': True,
                'profit_sharing_percentage': 80,
                'profit_sharing_terms': '80% efter break even',
                'status': 'confirmed',
            },
        ]

        # Import data
        for contract_data in contracts_data:
            try:
                # Create or get venue
                venue, created = Venue.objects.get_or_create(
                    name=contract_data['venue_name'],
                    defaults={
                        'address': contract_data.get('venue_address', ''),
                        'city': contract_data.get('venue_city', ''),
                        'postal_code': contract_data.get('venue_postal_code', ''),
                        'cvr_number': contract_data.get('venue_cvr', ''),
                        'phone': contract_data.get('venue_phone', ''),
                        'email': contract_data.get('venue_email', ''),
                    }
                )

                if created:
                    self.stdout.write(self.style.SUCCESS(f'Created venue: {venue.name}'))

                # Create primary contact if provided
                primary_contact = None
                if contract_data.get('contact_name'):
                    names = contract_data['contact_name'].split(' ', 1)
                    first_name = names[0]
                    last_name = names[1] if len(names) > 1 else ''

                    contact, created = Contact.objects.get_or_create(
                        venue=venue,
                        email=contract_data.get('contact_email', ''),
                        defaults={
                            'first_name': first_name,
                            'last_name': last_name,
                            'is_primary': True,
                        }
                    )
                    primary_contact = contact

                    if created:
                        self.stdout.write(f'  Created contact: {contact.full_name}')

                # Create secondary contact if provided
                if contract_data.get('contact2_name'):
                    names2 = contract_data['contact2_name'].split(' ', 1)
                    first_name2 = names2[0]
                    last_name2 = names2[1] if len(names2) > 1 else ''

                    contact2, created = Contact.objects.get_or_create(
                        venue=venue,
                        email=contract_data.get('contact2_email', ''),
                        defaults={
                            'first_name': first_name2,
                            'last_name': last_name2,
                            'is_primary': False,
                        }
                    )

                    if created:
                        self.stdout.write(f'  Created contact: {contact2.full_name}')

                # Create event
                event, created = Event.objects.get_or_create(
                    contract_number=contract_data['contract_number'],
                    defaults={
                        'contract_date': parse_date(contract_data['contract_date']),
                        'venue': venue,
                        'primary_contact': primary_contact,
                        'concert_date': parse_date(contract_data['concert_date']),
                        'start_time': parse_time(contract_data.get('start_time', '20:00').replace('Aften', '20:00')),
                        'duration_minutes': contract_data.get('duration', 75),
                        'location': contract_data.get('location', ''),
                        'status': contract_data.get('status', 'completed'),
                        'notes': contract_data.get('notes', ''),
                    }
                )

                if created:
                    self.stdout.write(self.style.SUCCESS(f'Created event: {event.contract_number}'))

                # Create contract
                contract_obj, created = Contract.objects.get_or_create(
                    event=event,
                    defaults={
                        'artist_fee': Decimal(str(contract_data.get('artist_fee', 0))),
                        'booking_fee': Decimal(str(contract_data.get('booking_fee', 0))),
                        'vat_amount': Decimal(str(contract_data.get('vat', 0))),
                        'has_profit_sharing': contract_data.get('profit_sharing', False),
                        'profit_sharing_percentage': contract_data.get('profit_sharing_percentage'),
                        'profit_sharing_terms': contract_data.get('profit_sharing_terms', ''),
                        'bank_account': contract_data.get('bank_account', 'reg: 7590 konto 1840092'),
                        'tax_info': '''Niclas Knudsen, CPR nr. 300172-1827
Stefan Pasborg, CVR-nummer: 34543992
Jeppe Tuxen, CPR nr. 160279-3067''',
                    }
                )

                if created:
                    self.stdout.write(f'  Created contract with fee: {contract_obj.total_amount} DKK')

                # Create technical requirements
                tech_req, created = TechnicalRequirements.objects.get_or_create(
                    event=event,
                    defaults={
                        'sound_provided': True,
                        'lights_provided': True,
                        'stage_provided': True,
                        'catering_provided': True,
                        'hotel_rooms': contract_data.get('hotel_rooms', 0),
                        'band_brings_equipment': True,
                        'equipment_notes': 'Artist brings own backline (baggear)',
                    }
                )

                if created:
                    self.stdout.write(f'  Created technical requirements')

            except Exception as e:
                self.stdout.write(self.style.ERROR(f'Error importing {contract_data["contract_number"]}: {str(e)}'))

        self.stdout.write(self.style.SUCCESS('\nContract import completed!'))
        self.stdout.write(f'Total venues: {Venue.objects.count()}')
        self.stdout.write(f'Total contacts: {Contact.objects.count()}')
        self.stdout.write(f'Total events: {Event.objects.count()}')
        self.stdout.write(f'Total contracts: {Contract.objects.count()}')
