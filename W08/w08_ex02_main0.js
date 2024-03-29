//var data = [
//    {x:0, y:100},
//    {x:40, y:5},
//    {x:120, y:80},
//    {x:150, y:30},
//    {x:200, y:50}
//];
d3.csv("https://rioyamana.github.io/InfoVis2021/W08/task2.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y; });

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 128,
            margin: {top:10, right:10, bottom:20, left:30}
        };

        const line_plot = new LineChart( config, data );
        line_plot.update();
    })
    .catch( error => {
        console.log( error );
    });
class LineChart{
  constructor(config,data){
    this.config = {
      parent: config.parent,
      width: config.width || 256,
      height: config.height || 256,
      margin: config.margin || {top:10, right:10, bottom:10, left:10}
    }
    this.data=data;
    this.init();
  }
  init(){
    let self = this;
    self.svg = d3.select(self.config.parent )
        .attr('width', self.config.width)
        .attr('height', self.config.height);
    self.chart = self.svg.append('g')
        .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);
    self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
    self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

    self.line = d3.line();
    self.xscale = d3.scaleLinear()
            .range( [0, self.inner_width ] );

    self.yscale = d3.scaleLinear()
            .range( [0, self.inner_height] );


    self.xaxis = d3.axisBottom( self.xscale )
        .ticks(5);

    self.xaxis_group = self.chart.append('g')
        .attr('transform', `translate(0, ${self.inner_height})`);

    self.yaxis = d3.axisLeft(self.yscale)
        .ticks(5);

    self.yaxis_group = self.chart.append('g');
  }
  update(){
    let self=this;
    self.line
        .x(d=>d.x)
        .y(d=>d.y);
    const xmin = d3.min( self.data, d => d.x );
    const xmax = d3.max( self.data, d => d.x );
    self.xscale.domain( [xmin, xmax] );

    const ymin = d3.min( self.data, d => d.y );
    const ymax = d3.max( self.data, d => d.y );
    self.yscale.domain( [ymin, ymax] );
    self.render();
  }
  render(){
    let self = this;
    self.chart.append('path')
        .attr('d', self.line(self.data))
        .attr('stroke', 'black')
        .attr('fill', 'none');
    self.xaxis_group
        .call( self.xaxis );
    self.yaxis_group
        .call( self.yaxis );
  }

}
