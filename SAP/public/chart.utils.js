 require.config({
   paths: {
     "jquery": "https://code.jquery.com/jquery-2.2.4.min",
     "moment": "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.14.1/moment",
     "chartjs": "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.1.6/Chart.bundle"
   },
   shim: {
     jquery: {
       exports: "$"
     }
   }
 });

 require(['jquery', 'moment', 'chartjs'], function($, moment, Chart) {

   function randomScalingFactor() {
     return Math.round(Math.random() * 100 * (Math.random() > 0.5 ? -1 : 1));
   }

   function randomColorFactor() {
     return Math.round(Math.random() * 255);
   }

   function randomColor(opacity) {
     return 'rgba(' + randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor() + ',' + (opacity || '.3') + ')';
   }

   function newDate(days) {
     return moment().add(days, 'd').toDate();
   }

   function newDateString(days) {
     return moment().add(days, 'd').format();
   }
   var config = {
     type: 'line',
     data: {
       datasets: [{
         label: "Dataset with string point data",
         data: [{
           x: newDateString(0),
           y: randomScalingFactor()
         }, {
           x: newDateString(2),
           y: randomScalingFactor()
         }, {
           x: newDateString(4),
           y: randomScalingFactor()
         }, {
           x: newDateString(5),
           y: randomScalingFactor()
         }],
         fill: true
       }, {
         label: "Dataset with date object point data",
         data: [{
           x: newDate(0),
           y: randomScalingFactor()
         }, {
           x: newDate(2),
           y: randomScalingFactor()
         }, {
           x: newDate(4),
           y: randomScalingFactor()
         }, {
           x: newDate(5),
           y: randomScalingFactor()
         }],
         fill: false
       }]
     },
     options: {
       responsive: true,
       title: {
         display: true,
         text: "Chart.js Time Point Data"
       },
       scales: {
         xAxes: [{
           type: "time",
           display: true,
           scaleLabel: {
             display: true,
             labelString: 'Date'
           }
         }],
         yAxes: [{
           display: true,
           scaleLabel: {
             display: true,
             labelString: 'value'
           }
         }]
       }
     }
   };

   $.each(config.data.datasets, function(i, dataset) {
     dataset.borderColor = randomColor(0.4);
     dataset.backgroundColor = randomColor(0.5);
     dataset.pointBorderColor = randomColor(0.7);
     dataset.pointBackgroundColor = randomColor(0.5);
     //console.log(calculateData('tuhin47'));
     dataset.pointBorderWidth = 1;
   });

   var ctx = document.getElementById("canvas").getContext("2d");

   window.myLine = new Chart(ctx, config);

 });
