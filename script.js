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
const circleRadius = 8;

const svg = d3
  .select('body')
  .append('svg')
  .attr('width', svgWidth)
  .attr('height', svgHeight + 25)
  .style('background-color', 'bisque');

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
    .attr('cy', (d) => yScale(d.Seconds * 1000));

  const xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d'));
  svg
    .append('g')
    .attr('id', 'x-axis')
    .attr('transform', `translate(0, ${svgHeight})`)
    .call(xAxis);
};
