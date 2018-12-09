import React from 'react';
import Highlight from 'react-highlight'

function Results() {
  return (
    <Highlight language="javascript">
      {`{
                address_components: [
                    {
                        long_name: 'a655',
                        short_name: 'a655',
                        types: ['street_number'],
                    },
                    {
                        long_name: 'Flatbush Avenue',
                        short_name: 'Flatbush Ave',
                        types: ['route'],
                    },
                    {
                        long_name: 'Prospect Lefferts Gardens',
                        short_name: 'Prospect Lefferts Gardens',
                        types: ['neighborhood', 'political'],
                    },
                    {
                        long_name: 'Brooklyn',
                        short_name: 'Brooklyn',
                        types: ['sublocality_level_1', 'sublocality', 'political'],
                    },
                    {
                        long_name: 'Kings County',
                        short_name: 'Kings County',
                        types: ['administrative_area_level_2', 'political'],
                    },
                    {
                        long_name: 'New York',
                        short_name: 'NY',
                        types: ['administrative_area_level_1', 'political'],
                    },
                    {
                        long_name: 'United States',
                        short_name: 'US',
                        types: ['country', 'political'],
                    },
                    {
                        long_name: '11225',
                        short_name: '11225',
                        types: ['postal_code'],
                    },
                ],
                formatted_address: 'a655 Flatbush Ave, Brooklyn, NY 11225, USA',
                geometry: {
                    location: {
                        lat: () => 40.65747990000001,
                        lng: () => -73.9601533,
                    },
                    viewport: {
                        northeast: {
                            lat: 40.6588201302915,
                            lng: -73.9588729197085,
                        },
                        southwest: {
                            lat: 40.6561221697085,
                            lng: -73.96157088029152,
                        },
                    },
                },
                place_id: 'ChIJ_bhzrxRbwokRhx7ifCLMVKE',
                scope: 'GOOGLE',
                types: ['street_address'],
                utc_offset: -300,
                vicinity: 'Brooklyn',
            }`}
    </Highlight>
  )
};

export default Results;