const url =
  'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';

fetch(url)
  .then((response) => {
    if (response.status !== 200) {
      console.log(`Status code: ${response.status}`);
      return;
    }
    response.json().then((d) => {
      drawSvg(d);
    });
  })
  .catch((err) => {
    console.log('Fetch error:', err);
  });

const svgWidth = 800;
const svgHeight = 500;
const circleRadius = 5;
const xAxisSpace = 40;
const yAxisSpace = 25;

const svg = d3
  .select('#container')
  .append('svg')
  .attr('width', svgWidth + xAxisSpace)
  .attr('height', svgHeight + yAxisSpace)
  .attr('id', 'svg')
  .style('background-color', 'bisque');

const tooltip = d3
  .select('#container')
  .append('div')
  .attr('id', 'tooltip');

const drawSvg = (dataset) => {
  console.log(dataset);

  const time = dataset.map((d) => new Date(d.Seconds * 1000));
  console.log(time);

  const yScale = d3
    .scaleTime()
    .domain(d3.extent(time, (t) => t))
    .range([circleRadius, svgHeight - circleRadius]);

  const yearMin = d3.min(dataset, (d) => d.Year);
  const yearMax = d3.max(dataset, (d) => d.Year);
  const xScale = d3
    .scaleLinear()
    .domain([yearMin, yearMax])
    .range([circleRadius, svgWidth - circleRadius]);

  svg
    .selectAll('circle')
    .data(dataset)
    .enter()
    .append('circle')
    .attr('class', 'dot')
    .attr('r', circleRadius)
    .attr('cx', (d) => xScale(d.Year))
    .attr('cy', (d) => yScale(d.Seconds * 1000))
    .attr('transform', `translate(${xAxisSpace}, 0)`)
    .on('mouseover', (d) => {
      tooltip
        .style('opacity', 1)
        .style('left', xScale(d.Year) + xAxisSpace + 'px')
        .style('top', yScale(d.Seconds * 1000) + 'px');
    })
    .on('mouseout', (d) => {
      tooltip.style('opacity', 0);
    });

  const xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d'));
  svg
    .append('g')
    .attr('id', 'x-axis')
    .attr('transform', `translate(${xAxisSpace}, ${svgHeight})`)
    .call(xAxis);

  const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat('%M:%S'));
  svg
    .append('g')
    .attr('id', 'y-axis')
    .attr('transform', `translate(${xAxisSpace}, 0)`)
    .call(yAxis);
};
