'use strict';

//Start coding here

function isomorph(a, b) {
    // Convert strings into arrays
    var arrayA = a.split('');
    var arrayB = b.split('');
    var solution = true; 
    
    // Get all index of repeated values of the array
    for(var i=0; i < arrayA.length; i++) {
      var indices = [];
      var idx = arrayA.indexOf(arrayA[i]);
        while (idx != -1) {
          indices.push(idx);
          idx = arrayA.indexOf(arrayA[i], idx + 1);
        }
        var beSame = arrayB[indices[0]]
          for(var j=0; j < indices.length; j++) {
            if(arrayB[indices[j]] !== beSame) {
              solution = false;
            }
          }
    }
    return solution;
  }
  