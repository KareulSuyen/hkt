import requests
from django.conf import settings
from .models import Country, PopulationTrend
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

def fetch_world_population_data():
    """
    Fetch current world population data from Worldometer API
    """
    try:
        response = requests.get(
            "https://worldometers.p.rapidapi.com/api/world-population",
            headers={
                "X-RapidAPI-Key": settings.RAPIDAPI_KEY,
                "X-RapidAPI-Host": "worldometers.p.rapidapi.com"
            }
        )
        response.raise_for_status()
        return response.json()
    except Exception as e:
        logger.error(f"Error fetching world population data: {str(e)}")
        return None

def fetch_country_population_data(country_code):
    """
    Fetch population data for a specific country
    """
    try:
        response = requests.get(
            f"https://worldometers.p.rapidapi.com/api/population/country/{country_code}",
            headers={
                "X-RapidAPI-Key": settings.RAPIDAPI_KEY,
                "X-RapidAPI-Host": "worldometers.p.rapidapi.com"
            }
        )
        response.raise_for_status()
        return response.json()
    except Exception as e:
        logger.error(f"Error fetching country population data: {str(e)}")
        return None

def update_country_data():
    """
    Update all country data in database
    """
    try:
        response = requests.get(
            "https://worldometers.p.rapidapi.com/api/population/all-countries",
            headers={
                "X-RapidAPI-Key": settings.RAPIDAPI_KEY,
                "X-RapidAPI-Host": "worldometers.p.rapidapi.com"
            }
        )
        response.raise_for_status()
        data = response.json()
        
        for country_data in data:
            Country.objects.update_or_create(
                code=country_data['code'],
                defaults={
                    'name': country_data['name'],
                    'population': int(country_data['population'].replace(',', '')),
                    'yearly_change': float(country_data['yearlyChange'].rstrip('%')),
                    'net_change': int(country_data['netChange'].replace(',', '')),
                    'density': float(country_data['density'].replace(',', '')),
                    'land_area': float(country_data['landArea'].replace(',', '')),
                    'migrants': int(country_data['migrants'].replace(',', '')) if country_data['migrants'] else 0,
                    'fertility_rate': float(country_data['fertRate']) if country_data['fertRate'] else 0,
                    'median_age': float(country_data['medAge']) if country_data['medAge'] else 0,
                    'urban_pop_percent': float(country_data['urbanPop'].rstrip('%')) if country_data['urbanPop'] else 0,
                    'world_share': float(country_data['worldShare'].rstrip('%')) if country_data['worldShare'] else 0,
                }
            )
        return True
    except Exception as e:
        logger.error(f"Error updating country data: {str(e)}")
        return False