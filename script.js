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
const svg = d3
  .select('body')
  .append('svg')
  .attr('width', svgWidth)
  .attr('height', svgHeight)
  .style('background-color', 'blue');

const drawSvg = (dataset) => {
  console.log(dataset);
};
