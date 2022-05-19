import React from 'react';
import CITYCOORDS from '../constants/contstants';

export default function MapOverlayCitySelect({flyTo}) {
  return (
    <div className="map-overlay">
        <form>
            <h4 className="overlay-header">Fly to a different City</h4>
            <label htmlFor='category' className="light">
                City:
            </label>
            <select 
                name="City" 
                id="City" 
                onChange={(e) => flyTo(CITYCOORDS[e.target.value])}
                placeholder="Select a City"
            >
                <option value="" disabled selected hidden>Let's fly</option>
                <option value="philly">Philadelphia</option>
                <option value="ny">New York</option>
                <option value="chi">Chicago</option>
                <option value="la">Los Angeles</option>
                <option value="atl">Atlanta</option>
            </select>
        </form>
    </div>
  )
}
