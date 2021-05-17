//var data = [
//    {label:'Apple', value:100},
//    {label:'Banana', value:200},
//    {label:'Cookie', value:50},
//    {label:'Egg', value:80}
//];
//var width = 256;
//var height = 256;
d3.csv("https://rioyamana.github.io/InfoVis2021/W08/task3.csv")
    .then( data => {
        data.forEach( d => { d.value = +d.value; });

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 256
        };

        const piechart = new PieChart( config, data );
        piechart.update();
    })
    .catch( error => {
        console.log( error );
    });
class PieChart {
  constructor( config, data ) {
    this.config = {
      parent: config.parent,
      width: config.width || 256,
      height: config.height ||256
    }
    this.data = data;
    this.init();
  }
  init() {
    let self = this;
    self.svg = d3.select(self.config.parent)
        .attr('width', self.config.width)
        .attr('height', self.config.height);

    self.chart = self.svg.append('g')
        .attr('transform', `translate(${self.config.width /2}, ${self.config.height /2})`);

    self.radius = Math.min(self.config.width,self.config.height) / 2;

    self.pie = d3.pie();

  }

  update() {
    let self = this;
    self.pie.value(d => d.value);
    self.text = d3.arc()
        .outerRadius(self.radius-60)
        .innerRadius(self.radius-60);
    self.arc = d3.arc()
        .innerRadius(0)
        .outerRadius(self.radius);
    self.render();
  }

  render(){
    let self = this;

    self.chart.selectAll('pie')
        .data(self.pie(self.data))
        .enter()
        .append('path')
        .attr('d', self.arc)
        .attr('fill', 'black')
        .attr('stroke', 'white')
        .style('stroke-width', '2px');
    self.chart.selectAll('pie')
        .data(self.pie(self.data))
        .enter()
        .append("text")
        .attr("dy",1)
        .attr('fill','white')
        .attr("text-anchor", "middle")
        .attr("transform",function(d){return "translate("+self.text.centroid(d)+")"})
        .text(function(d){return d.data.label});

  }
}
const piechart = new PieChart( config, data );
piechart.update();
