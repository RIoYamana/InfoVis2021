d3.csv("https://rioyamana.github.io/InfoVis2021/W04/data.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y; });

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 256,
            margin: {top:30, right:10, bottom:40, left:50}
        };

        const scatter_plot = new ScatterPlot( config, data );
        scatter_plot.update();
    })
    .catch( error => {
        console.log( error );
    });

class ScatterPlot {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:10, right:10, bottom:10, left:10}
        }
        this.data = data;
        this.init();
    }

    init() {
        let self = this;

        self.svg = d3.select( self.config.parent )
            .attr('width', self.config.width)
            .attr('height', self.config.height);

        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);


        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;
        self.xscale = d3.scaleLinear()
            .range( [0, self.inner_width ] );

        self.yscale = d3.scaleLinear()
            .domain( [self.inner_height ,0])
            .range( [0, self.inner_height] );

        self.xcscale = d3.scaleLinear()
            .range( [15, self.inner_width - 15 ] );

        self.ycscale = d3.scaleLinear()
            .range( [15, self.inner_height - 15] );

        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(6);

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`);

        self.yaxis = d3.axisLeft(self.yscale)
            .ticks(6);

        self.yaxis_group = self.chart.append('g');
    }

    update() {
        let self = this;

        const xmin = d3.min( self.data, d => d.x );
        const xmax = d3.max( self.data, d => d.x );
        self.xcscale.domain( [xmin, xmax] );

        const ymin = d3.min( self.data, d => d.y );
        const ymax = d3.max( self.data, d => d.y );
        self.ycscale.domain( [ymin, ymax] );

        self.render();
    }

    render() {
        let self = this;

        self.chart.selectAll("circle")
            .data(self.data)
            .enter()
            .append("circle")
            .attr("cx", d => self.xcscale( d.x ) )
            .attr("cy", d => self.ycscale( d.y ) )
            .attr("r", d => d.r );

        self.chart
            .append("text")
            .attr("fill", "black")
            .attr("x", 55)
            .attr("y", -10)
            .attr("font-size", "20pt")
            .text("W6_title");

        self.xaxis_group
            .call( self.xaxis )
            .append("text")
            .attr("fill", "black")
            .attr("x", 90)
            .attr("y", 30)
            .attr("font-size", "10pt")
            .text("x_label");

        self.yaxis_group
            .call( self.yaxis )
            .append("text")
            .attr("fill", "black")
            .attr("x", -65)
            .attr("y", -35)
            .attr("transform", "rotate(-90)")
            .attr("font-size", "10pt")
            .text("y_label");
    }
}
