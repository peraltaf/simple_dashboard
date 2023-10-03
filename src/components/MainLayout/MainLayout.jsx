import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import useGlobalState, { filteredData } from '../../globalState';
import { Box, Divider, Grid, Table, TableBody, TableCell, TableContainer, 
  TableHead, TablePagination, TableRow, Toolbar, Typography } from '@mui/material';


const MainLayout = () => {
  const [filtered_data, ] = useGlobalState(filteredData);
  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(5);

  const handleChangePage = (event, newpage) => {
    setpg(newpage);
  }

  const handleChangeRowsPerPage = (event) => {
    setrpg(parseInt(event.target.value, 10));
    setpg(0);
  }

  const colors = ['#117733', '#332288', '#88CCEE', '#DDCC77', '#CC6677'];
  const colors_alt = ['#88CCEE', '#CC6677', '#117733', '#DDCC77', '#332288'];

  const monthly_release = filtered_data.reduce((a,c) => {
    const month = moment(c.date, 'MMM D, YYYY').startOf('month').unix()*1000;
    const idx = a.findIndex(e => e[0] === month);
  
    if (idx > -1) {
      a[idx][1]++;
    } else {
      a.push([month, 1]);
    }
    
    return a;
  }, []).sort((a,b) => a[0] > b[0] ? 1 : -1) 

  let release_total = monthly_release.reduce((a,c) => {
    return a+c[1];
  }, 0);

  const monthly_releases_options = {
    chart: {
      type: 'column'
    },
    title: {
      text: `Monthly Releases (Total Release Count: ${release_total})`
    },
    xAxis: {
      type: 'datetime'
    },
    yAxis: {
      title: ''
    },
    tooltip: {
      formatter: function() {
        let tooltip = `<span style="font-size:10px;">${moment(this.x).format('MMMM YYYY')}</span>
          <br /><span style="font-size:12px;">${this.series.name}: <strong>${this.y}</strong></span>`;
        return tooltip;
      }
    },
    colors: colors,
    series: [{
      name: 'Monthly Release',
      data: monthly_release
    }],
    credits: { enabled: false },
    legend: { enabled:false },
  }

  const genre_counts_options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Total Counts by Primary Genre'
    },
    xAxis: {
      type: 'datetime'
    },
    yAxis: {
      title: ''
    },
    colors: colors,
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: { enabled: false },
        showInLegend: true
      }
    },
    series: [{
      name: 'Primary Genre',
      colorByPoint: true,
      data: filtered_data.reduce((a,c) => {
        const primary_genre = c.genres[0];
        const idx = a.findIndex(e => e.name === primary_genre);
      
        if (idx > -1) {
          a[idx].y++;
        } else {
          a.push({
            name: primary_genre,
            y: 1
          });
        }
      
        return a;
      }, [])
    }],
    credits: { enabled: false },
  }

  const calc_score = (property) => {
    const data = filtered_data.reduce((a,c) => {
      const month = moment(c.date, 'MMM D, YYYY').startOf('month').unix()*1000;
      const idx = a.findIndex(e => e[0] === month);

      if (c[property]) {
        if (idx > -1) {
          a[idx][1].push(c[property]);
        } else {
          a.push([month, [c[property]]]);
        }
      }
    
      return a;
    }, []).sort((a,b) => a[0] > b[0] ? 1 : -1)
    
    data.forEach(d => {
      d[1] = +((d[1].reduce((x,y) => x+y) / d[1].length).toFixed(2));
    });

    return data;
  }

  const avg_scores_options = {
    chart: {
      type: 'area',
      zoomType: 'x'
    },
    rangeSelector: {
      buttons: [{
        type: 'year',
        count: 1,
          text: '1y'
      }, {
        type: 'all',
        text: 'All'
      }],
      selected: 3
    },
    title: {
      text: `Avg Meta Score vs Avg User Score`
    },
    xAxis: {
      type: 'datetime'
    },
    yAxis: [{
      title: {
        text: 'Avg Meta Score'
      }
    }, {
      title: {
          text: 'Avg User Score'
      },
      opposite: true
    }],
    tooltip: {
      formatter: function() {
        let tooltip = `<span style="font-size:10px;">${moment(this.x).format('MMMM YYYY')}</span>
          <br /><span style="font-size:12px;">${this.series.name}: <strong>${this.y}</strong></span>`;
        return tooltip;
      }
    },
    colors: colors_alt,
    series: [{
      name: 'Avg Meta Score',
      data: calc_score('meta_score'),
    }, {
      name: 'Avg User Score',
      data: calc_score('user_score'),
      yAxis: 1,
      type: 'line',
      connectNulls: false
    }],
    credits: { enabled: false },
    legend: { enabled: true },
  }

  return (
    <Box component='main' sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
      <Toolbar />

      <Grid container spacing={1}>
        <Grid item xs={12} md={8}>
          <HighchartsReact
            highcharts={Highcharts}
            options={monthly_releases_options}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <HighchartsReact
            highcharts={Highcharts}
            options={genre_counts_options}
          />
        </Grid>
      </Grid>

      <Divider sx={{ mt: '1rem', mb: '1rem' }} />

      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <HighchartsReact
            highcharts={Highcharts}
            options={avg_scores_options}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant='h6' sx={{ mt: '0.225rem', fontSize: '1.2em', color: 'rgb(51, 51, 51)', fontWeight: 'bold', textAlign: 'center' }}>
            Top Rated by Meta Score
          </Typography>
          <TableContainer>
            <Table size='small' aria-label='a dense table'>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Publisher</TableCell>
                  <TableCell>Platform</TableCell>
                  <TableCell>User Score</TableCell>
                  <TableCell>Meta Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {
                filtered_data.sort((a,b) => a.meta_score > b.meta_score ? -1 : 1).slice(pg * rpg, pg * rpg + rpg).map((row, index) => (
                  <TableRow key={index}>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.developers.join(', ')}</TableCell>
                      <TableCell>{row.Platform}</TableCell>
                      <TableCell>{row.user_score}</TableCell>
                      <TableCell>{row.meta_score}</TableCell>
                  </TableRow>
                ))
              }
              </TableBody>
              </Table>
          </TableContainer>
          <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component='div'
                count={filtered_data.length}
                rowsPerPage={rpg}
                page={pg}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Grid>
      </Grid>
    </Box>
  );
}

export default MainLayout;