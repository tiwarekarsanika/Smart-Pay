
var users=[];
var n;
var payid=[];
var N;
  
// Loop to create 2D array using 1D array



document.getElementById("noofusers").onclick=function(){
     var inpname=document.getElementById("input");
     var num=document.getElementById("n").value;
     n=num;
     for(let i=0;i<n;i++)
     {
        console.log("Entered loop");
        inpname.innerHTML+=`<h2 class='enter-name'>Enter name</h2><input type='text' id='${i}' class='users'>` ;
     } 
     N=n;
}



document.getElementById("sub-btn").onclick=function()
{
    for(let i=0;i<n;i++){
    var user=document.getElementById(`${i}`).value;
    users[i]=user;
    console.log(users[i]);
    }

    var inppay=document.getElementById("payinp");
    var k=50;
    for(var i=0;i<n;i++)
    {
        for(var j=0;j<n;j++)
        {
            if(i!=j){
            k++;
            payid.push(k);
            console.log("Entered inner loop");
            inppay.innerHTML+=`<h3>${users[i]} Pay to ${users[j]}.</h3><input type='text' id='${k}' class='value'>` ;
           }
        }

    }
    console.log("Payids: ");
    console.log(payid);
}

     
    // A utility function that returns
    // index of minimum value in arr
    function getMin(arr)
    {
        var minInd = 0;
        for (i = 1; i < N; i++)
            if (arr[i] < arr[minInd])
                minInd = i;
        return minInd;
    }
     
    // A utility function that returns
    // index of maximum value in arr
    function getMax(arr)
    {
        var maxInd = 0;
        for (i = 1; i < N; i++)
            if (arr[i] > arr[maxInd])
                maxInd = i;
        return maxInd;
    }
     
    // A utility function to return minimum of 2 values
    function minOf2(x , y)
    {
        return (x < y) ? x: y;
    }
     
    // amount[p] indicates the net amount
    // to be credited/debited to/from person 'p'
    // If amount[p] is positive, then
    // i'th person will amount[i]
    // If amount[p] is negative, then
    // i'th person will give -amount[i]
    function minCashFlowRec(amount)
    {
     
        // Find the indexes of minimum and
        // maximum values in amount
        // amount[mxCredit] indicates the maximum amount
        // to be given (or credited) to any person .
        // And amount[mxDebit] indicates the maximum amount
        // to be taken(or debited) from any person.
        // So if there is a positive value in amount,
        // then there must be a negative value
        var mxCredit = getMax(amount), mxDebit = getMin(amount);
     
        // If both amounts are 0, then
        // all amounts are settled
        if (amount[mxCredit] == 0 && amount[mxDebit] == 0)
            return;
     
        // Find the minimum of two amounts
        var min = minOf2(-amount[mxDebit], amount[mxCredit]);
        amount[mxCredit] -= min;
        amount[mxDebit] += min;
     
        // If minimum is the maximum amount to be
        console.log(users[mxDebit] + " pays " + min
                                + " to " + users[mxCredit]);
        document.getElementById("otpt").innerHTML+=`<h1 class="result">${users[mxDebit]} pays ${min} to ${users[mxCredit]}</h1>`;
        const ans=`<h1>${users[mxDebit]} pays ${min} to ${users[mxCredit]}</h1>`;
        // Recur for the amount array.
        // Note that it is guaranteed that
        // the recursion would terminate
        // as either amount[mxCredit]  or
        // amount[mxDebit] becomes 0
        minCashFlowRec(amount);
    }
     
    // Given a set of persons as graph
    // where graph[i][j] indicates
    // the amount that person i needs to
    // pay person j, this function
    // finds and prints the minimum
    // cash flow to settle all debts.
    function minCashFlow(graph)
    {
        // Create an array amount,
        // initialize all value in it as 0.
        var amount=Array.from({length: N}, (_, i) => 0);
     
        // Calculate the net amount to
        // be paid to person 'p', and
        // stores it in amount[p]. The
        // value of amount[p] can be
        // calculated by subtracting
        // debts of 'p' from credits of 'p'
        for (p = 0; p < N; p++)
        for (i = 0; i < N; i++)
            amount[p] += (graph[i][p] - graph[p][i]);
     
        minCashFlowRec(amount);
    }


document.getElementById("payusers").onclick=function()
{
   let graph=new Array(n);
   for (var i = 0; i < n; i++) {
    graph[i] = new Array(n); // make each element an array
   }
   var z=0;
   for(let i=0;i<n;i++)
   {
       for(let j=0;j<n;j++)
       {
         if(j==i){
            graph[i][j]=0;
         }
         else
         {
            var k=payid[z];
            var userpay=parseInt(document.getElementById(`${k}`).value);
            graph[i][j]=userpay;
            z++;
         }
       }
   }

   console.log(graph);
   minCashFlow(graph);
   
   
}


