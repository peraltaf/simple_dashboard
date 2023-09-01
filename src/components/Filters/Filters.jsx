import React from 'react';
import Button from '@mui/material/Button';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import useGlobalState, {
  selectedDevs, selectedGenres, selectedPlatforms,
  selectedRatings, filteredData, MainData } from '../../globalState';


const Filters = () => {
  const [current_devs, setDevs] = useGlobalState(selectedDevs);
  const [current_genres, setGenres] = useGlobalState(selectedGenres);
  const [current_platforms, setPlatforms] = useGlobalState(selectedPlatforms);
  const [current_ratings, setRatings] = useGlobalState(selectedRatings);
  const [current_data, ] = useGlobalState(MainData);
  const [, setFilteredData] = useGlobalState(filteredData);
  const filterData = () => {
    setFilteredData(current_data.filter(d => 
      current_devs.some(v => d.developers.includes(v))
        && current_genres.some(v => d.genres.includes(v))
        && current_platforms.includes(d.platform)
        && current_ratings.includes(d.esrb_rating)
    ));
  }

  const devs = ['AI', 'Acquire', 'Agenda', 'Alphadream Corporation', 'Ambrella', 'Amusement Vision', 'AnyArts Productions',
    'Arika', 'Artdink', 'ArtePiazza', 'Artoon', 'Arzest', 'Asobism', 'Asobism.Co. Ltd', 'Atlus', 'Atlus Co.', 'Bandai Namco Games',
    'Bee Tribe', 'Brace Yourself Games', 'Brownie Brown', 'Bullet Proof Software', 'Camelot Software Planning', 'Capcom', 'ChunSoft',
    'Cing', 'Climax Entertainment', 'Co. ltd.', 'Creatures Inc.', 'Curve Studios', 'Cygames', 'D4 Enterprise', 'Dimps Corporation',
    'Eighting', 'Entertainment Analysis & Development Division', 'First Studio', 'Flagship', 'FreeStyleGames', 'From Software',
    'Fuse Games Limited', 'GREZZO', 'Gaijin Games', 'Game Arts', 'Game Freak', 'Genius Sonority Inc.', 'Genki', 'Good-Feel',
    'Graphite Lab', 'Grasshopper Manufacture', 'Griptonite Games', 'Grounding Inc.', 'GungHo', 'HAL Labs', 'Hal', 'Headstrong Games',
    'HexaDrive', 'Hudson', 'Hudson Soft', 'ILCA', 'Imagineer Co. Ltd.', 'Inc.', 'Intelligent Systems', 'Irem', 'Iron Galaxy Studios',
    'Jupiter Corporation', 'Keys Factory', 'Koei', 'Koei Tecmo Games', 'Konami', 'Kuju Entertainment', 'LINE Corporation', 'LTD.',
    'Left Field Productions', 'Level 5', 'Ludosity Interactive', 'Mages.', 'Magic Pockets', 'Marvelous AQL', 'Marvelous First Studio',
    'Mass Media', 'Maxis', 'Mercury Steam', 'Midway', 'Mindware', 'Mistwalker', 'Mitchell', 'Mojang AB', 'Monolith Soft',
    'Monster Games Inc.', 'MuuMuu', 'Namco', 'Namco Bandai Games', 'Nd Cube', 'Newcom', 'Nex Entertainment', 'Next Level Games',
    'Niantic Labs', 'Niantic Tokyo Studio', 'Nintendo', 'Nintendo EAD Tokyo', 'Nintendo Software Technology', 'Noise Inc.',
    'Nuevo Retro Games', 'OVER FENCE CO.', 'Omega Force', 'Opera', 'Opus', 'Over Fence', 'Paladin Studios', 'Paon Corporation',
    'Paradigm Entertainment', 'ParityBit', 'Pax Softonica', 'Phoenix Labs', 'PlatinumGames', 'Poisoft', 'Polygon Magic',
    'Project Sora', 'Q Entertainment', 'Q-Games', 'RED Entertainment', 'Rare Ltd.', 'Raylight Studios', 'Retro Studios', 'SFB Games',
    'Sanzaru Games', 'Sega', 'Sega Sports R&D', 'Select Button', `Shin'en`, 'Silicon Knights', 'Silicon Studio', 'Skip Ltd.',
    'Sora Ltd.', 'Spike Chunsoft', 'Spike Chunsoft Co. Ltd.', 'Square Enix', 'SquareSoft', 'Sun-Tec', 'Suzak', 'T&E Soft',
    'TOSE', 'TOYBOX', 'TT Games', 'Tantalus', 'Tantatus', 'Tarsier Studios','Team Ninja', 'Tecmo', 'Tecmo Koei Games', 'Tenyo',
    'The Pokemon Company', 'ToeJam & Earl Productions', 'Tose Software', `Traveller's Tales`, 'Treasure', 'Valhalla Game Studios',
    'Vanpool', 'Velan Studios', 'Vitei', 'Vivarium', 'WayForward', 'Winds', 'Zener Works', 'Zoonami Ltd.', 'fyto', 'h.a.n.d. Inc.',
    'historia Inc', 'iNiS', 'indieszero', 'n-Space', 'syn Sophia'];

  const genres = ['Beat-Em-Up', 'Shoot-Em-Up', '2D', '3D', 'Action', 'Action Adventure', 'Action RPG', 'Adventure', 'Alternative',
    'Application', 'Arcade', 'Athletics', 'Automobile', 'Baseball', 'Basketball', 'Board / Card Game', 'Board Games', 'Boxing',
    'Boxing / Martial Arts', 'Career', 'City Building', 'Civilian', 'Civilian Plane', 'Combat', 'Compilation', 'Console',
    'Console-style RPG', 'Dancing', 'Defense', 'Driving', 'Edutainment', 'Exercise / Fitness', 'Fantasy', 'Fighting',
    'First-Person', 'Flight', 'Football', 'Futuristic', 'Gambling', 'General', 'Golf', 'Hardware', 'Hidden Object', 'Historic',
    'Horizontal', 'Horror', 'Hunting', 'Ice Hockey', 'Individual', 'Japanese-Style', 'Kart', 'Light Gun', 'Linear', 'Logic',
    'Marine', 'Matching', 'Metroidvania', 'Military', 'Miscellaneous', 'Modern', 'Modern Jet', 'Motocross', 'Motorcycle', 'Music',
    'Music Maker', 'Nature', 'Olympic Sports', 'On-foot', 'Open-World', 'Other', 'Parlor', 'Party', 'Party / Minigame', 'Pet',
    'Pinball', 'Platformer', 'Point-and-Click', 'Puzzle', 'Racing', 'Rail', 'Rally / Offroad', 'Real-Time', 'Rhythm', 'Roguelike',
    'Role-Playing', 'Sandbox', 'Sci-Fi', 'Scrolling', 'Shooter', 'Sim', 'Simulation', 'Snow / Water', 'Snowboarding', 'Soccer',
    'Space', 'Sports', 'Stacking', 'Strategy', 'Street', 'Submarine', 'Survival', 'Tactics', 'Team', 'Tennis', 'Third-Person',
    'Traditional', 'Trainer', 'Trivia / Game Show', 'Turn-Based', 'Vehicle', 'Vertical', 'Virtual', 'Virtual Life', 'Visual Novel',
    'Volleyball', 'Web Browser', 'Wrestling'];

  const platforms = ['3DS', 'DS', 'GBA', 'GC', 'iOS', 'N64', 'Switch', 'TG16', 'WII','WIIU'];

  const esrb_rating = ['E', 'E10+', 'M', 'RP', 'T', 'Not Rated'];

  const filters = [{
      list: devs,
      title: 'Developers',
      key: 'developers',
      default_vals: ['Nintendo', 'Sega', 'Game Freak'],
      state: setDevs
    }, {
      list: genres,
      title: 'Genres (inc. sub-genres)',
      key: 'genres',
      default_vals: ['Action', 'Role-Playing', 'Platformer'],
      state: setGenres
    }, {
      list: platforms,
      title: 'Platforms',
      key: 'platform',
      default_vals: ['Switch','WIIU', 'WII'],
      state: setPlatforms
    }, {
      list: esrb_rating,
      title: 'ESRB Ratings',
      key: 'esrb_rating',
      default_vals: ['E', 'E10+', 'M', 'RP', 'T', 'Not Rated'],
      state: setRatings
    }];

  return (
    <Box>
      <Typography variant='h6' sx={{ mt: '1rem', fontSize: '1.2em', fontWeight: 'bold', ml: '1.25rem' }}>
        FILTERS
      </Typography>
      {
        filters.map(({list, title, key, default_vals, state}) => (
          <Box key={title} sx={{ mt: '1rem', ml: '1.25rem' }}>
            <Autocomplete
              disablePortal
              multiple
              id='combo-box-demo'
              options={list}
              sx={{ width: 200 }}
              size='small'
              defaultValue={default_vals}
              onChange={(event, value) => state(value)}
              renderInput={(params) => <TextField {...params} label={title} />}
            />
          </Box>
        ))
      }

      <Button size='small' variant='contained' onClick={filterData} sx={{ mt: '1rem', ml: '1.25rem' }}>Filter Data</Button>
    </Box> 
  )
}

export default Filters;