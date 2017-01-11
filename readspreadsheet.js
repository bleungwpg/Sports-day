google.load("visualization", "1", {packages:["corechart"]});

var alldata = [[]];
var ribbondata = [[]];
var housedata = [[]];
var eventData = [[[]]];
var localEventData = [[[]]];
var maxRows;
var maxCols;
var ribbonRows;
var houseRows;
var eventRows = [];
var inp;
var startGapSize = 75;
var continuousGapSize = 25;
var spreadsheetID;
var sheetID;
var wholehyperlink;
var testing;
var dataSubmitted;




function showData()
{

      background(0,0,0);
	  fill(255,255,255);
	  
	  moreH = 125;
	  
      text("Student ID",25+moreH,25);
      text("Last Name",100+moreH,25);
      text("First Name",200+moreH,25);

      for (var r = 0; r < maxRows; r++)
      {
        text(r,370+moreH,(r+1)*continuousGapSize+startGapSize);
        for (var c = 0; c < maxCols; c++)
        {
          if (c == 0)
          {
            text(alldata[r][c],25+moreH,(r+1)*continuousGapSize+startGapSize);
          }
          if (c == 1)
          {
            text(alldata[r][c],100+moreH,(r+1)*continuousGapSize+startGapSize);
          }
          if (c == 2)
          {
            text(alldata[r][c],200+moreH,(r+1)*continuousGapSize+startGapSize);
          }
        }
      }

}

function pullHouseData()
{
	// parse sheet ID and tab ID
	wholehyperlink = "https://docs.google.com/spreadsheets/d/1CGxETFmlqy4lYYhtWcIMd7COtW9MR11EN0YI47XcvCk/edit#gid=1021250630";

	startID = wholehyperlink.search("spreadsheets/d/");
	spreadsheetID = wholehyperlink.substring(startID+15,startID+65);
	spreadsheetID = spreadsheetID.substring(0,spreadsheetID.indexOf("/"));
	
	startID = wholehyperlink.search("gid=");
	sheetID = wholehyperlink.substring(startID+4,wholehyperlink.length);

	var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/'+spreadsheetID+'/gviz/tq?sheet=HousePoints'+'&tq=SELECT*');
//	var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1CGxETFmlqy4lYYhtWcIMd7COtW9MR11EN0YI47XcvCk/gviz/tq?sheet=Grade6&tq=SELECT*');


    query.send(handleHouseQueryResponse);
}

// Called when the query response is returned.
function handleHouseQueryResponse(response) {

	if (testing == true)
	{
		console.log("Pulling House Data");
	}
	
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	}


	var data = response.getDataTable();

	maxRows = data.getNumberOfRows();
	maxCols = data.getNumberOfColumns();


	if (testing == true)
	{
		console.log('There are '+maxRows+' rows');
		console.log('There are '+maxCols+' cols');	
	}

	houseRows = maxRows;
	


	for (var r = 0; r < maxRows; r++)
	{
		alldata[r] = new Array(maxCols);
		for (var c = 0; c < maxCols; c++)
		{
			var info = data.getValue(r,c);
			
			if (info == null)
			{
				alldata[r][c] = "";
			}
			else
			{
				alldata[r][c] = info;	
			}
		}
	}
	
	housedata = new Array(houseRows);
	
	// copy house data
	for (var r = 0; r < maxRows; r++)
	{
		housedata[r] = new Array(3);
	
		for (var c = 0; c < 3; c++)
		{
			housedata[r][c] = alldata[r][c+7];	
		}
	}

}


function pullData()
{
	// parse sheet ID and tab ID
	wholehyperlink = "https://docs.google.com/spreadsheets/d/1CGxETFmlqy4lYYhtWcIMd7COtW9MR11EN0YI47XcvCk/edit#gid=1021250630";

	startID = wholehyperlink.search("spreadsheets/d/");
	spreadsheetID = wholehyperlink.substring(startID+15,startID+65);
	spreadsheetID = spreadsheetID.substring(0,spreadsheetID.indexOf("/"));
	
	startID = wholehyperlink.search("gid=");
	sheetID = wholehyperlink.substring(startID+4,wholehyperlink.length);

	var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/'+spreadsheetID+'/gviz/tq?sheet=Grade6'+'&tq=SELECT*');
//	var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1CGxETFmlqy4lYYhtWcIMd7COtW9MR11EN0YI47XcvCk/gviz/tq?sheet=Grade6&tq=SELECT*');


    query.send(handleQueryResponse);
}

// called after we transfer data
function handleUpdateQueryResponse(response) {

	if (testing == true)
	{
		console.log("Running Update Query");
	}
	
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	}


	var data = response.getDataTable();

	maxRows = data.getNumberOfRows();
	maxCols = data.getNumberOfColumns();


	if (testing == true)
	{
//		console.log('There are '+maxRows+' rows');
//		console.log('There are '+maxCols+' cols');	
	}
	
	
	var xalldata = new Array(maxRows);
	
	var aevent = "";
	if (eventUse == "shotput")
		aevent = "Shot Putt";
	else if (eventUse == "long jump")
		aevent = "Long Jump";
	else if (eventUse == "discus")
		aevent = "Discus";
	else if (eventUse == "100m")
		aevent = "100m";
	else if (eventUse == "200m")
		aevent = "200m";
	else if (eventUse == "400m")
		aevent = "400m";

	var yalldata = [[]];
	yalldata = new Array(0);
	var nmaxRows = 0;
	
	for (var r = 0; r < maxRows; r++)
	{
	


			xalldata[r] = new Array(maxCols);
			
			for (var c = 0; c < maxCols; c++)
			{
				var info = data.getValue(r,c);
		
				if (info == null)
				{
					xalldata[r][c] = "";
				}
				else
				{
					xalldata[r][c] = info;	
				}
			}
			if (xalldata[r][3] == aevent && xalldata[r][4] == boyOrGirl)		
			{
				yalldata.push(xalldata[r]);
			}

		
	}
console.log(httpSendRequestArray.length+" more updates to make");	
	for (var r = 0; r < yalldata.length; r++)
	{
		for (var i = 0; i < httpSendRequestArray.length; i++)
		{
//console.log("Test1: "+(parseFloat(yalldata[r][10].toString()) == parseFloat(localEventData[eventID][r][2].toString())));
//console.log("Test2: "+(parseInt(yalldata[r][5].toString()) == parseInt(localEventData[eventID][r][3].toString())));
//console.log("Test3: "+(yalldata[r][5].toString() ==  localEventData[eventID][r][3].toString()));

//console.log("Test1: r"+r+"  "+httpSendRequestArray[i][1]);
//console.log("Test2: "+(yalldata[r][3] == aevent));
			if (r == httpSendRequestArray[i][1] && yalldata[r][3] == aevent)
			{
			console.log("Test1: r"+r+"  "+httpSendRequestArray[i][1]);
//console.log("Looking for match");
				if (parseFloat(yalldata[r][10].toString()) == parseFloat(localEventData[eventID][r][2].toString()) &&
				    (parseInt(yalldata[r][5].toString()) == parseInt(localEventData[eventID][r][3].toString()) || 
				    (yalldata[r][5].toString() ==  localEventData[eventID][r][3].toString()) ) )
				{
					localEventData[eventID][r][5] = 2;
					console.log(r+"  "+yalldata[r][10]+"=="+localEventData[eventID][r][2]+" Successful Update!");
					httpSendRequestArray.splice(i,1);
					i--;
					
					// remove any duplicate (earlier) send requests from the same row
					for (var j = 0; j < httpSendRequestArray.length; j++)
					{
						if (r == httpSendRequestArray[j][1])
						{
							httpSendRequestArray.splice(j,1);
							j--;
						}
					}
						 
				}
				else
				{
					// resend the request if it has not been updated
					formData = new FormData();

					formData.append("Sheet Name","Grade"+httpSendRequestArray[i][7]);
					formData.append("Student ID",httpSendRequestArray[i][6]);
					formData.append("Event",httpSendRequestArray[i][5]);
					formData.append("Data",httpSendRequestArray[i][4]);
					formData.append("UpdateEvent",httpSendRequestArray[i][3]);
					formData.append("Finish Position",httpSendRequestArray[i][2]);
					
					
					var request = new XMLHttpRequest();
					request.open("POST", "https://script.google.com/macros/s/AKfycbwoePIQmE3KMtgAlzcyh93OHSDZhJPlyvl_4T7jAp2Zfb-qmmY/exec");
					request.send(formData);
					
					
					console.log(r+"  "+(parseFloat(yalldata[r][10].toString()) == parseFloat(localEventData[eventID][r][2].toString()))+"  "+parseFloat(yalldata[r][10].toString())+"!="+parseFloat(localEventData[eventID][r][2].toString())+" Sending Data - Not Updated");
					console.log(r+"  "+(yalldata[r][5].toString() == localEventData[eventID][r][3].toString())+"  "+parseInt(yalldata[r][5].toString())+"!="+parseInt(localEventData[eventID][r][3].toString())+" Sending Data - Not Updated");
				}
			}
		}
	}
}

// Called when the query response is returned.
function handleQueryResponse(response) {

	if (testing == true)
	{
		console.log("2 - Hello World!");
	}
	
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	}


	var data = response.getDataTable();

	maxRows = data.getNumberOfRows();
	maxCols = data.getNumberOfColumns();


	if (testing == true)
	{
		console.log('There are '+maxRows+' rows');
		console.log('There are '+maxCols+' cols');	
	}

	var maxEvent = 6;

	var rowdata = new Array(maxCols);
	alldata = new Array(maxRows);
	
	eventRows = new Array(maxEvent);
	ribbonRows = 0;
	
	for (var q = 0; q < maxEvent; q++)
	{
		eventRows[q] = 0;
	}


	for (var r = 0; r < maxRows; r++)
	{
		alldata[r] = new Array(maxCols);
		for (var c = 0; c < maxCols; c++)
		{
			var info = data.getValue(r,c);
			
			if (info == null)
			{
				alldata[r][c] = "";
			}
			else
			{
				alldata[r][c] = info;	
			}
			
			if (alldata[r][3] == "Shot Putt")
			{
				eventRows[0]++;
			}
			if (alldata[r][3] == "Long Jump")
			{
				eventRows[1]++;
			}
			if (alldata[r][3] == "Discus")
			{
				eventRows[2]++;
			}
			if (alldata[r][3] == "100m")
			{
				eventRows[3]++;
			}
			if (alldata[r][3] == "200m")
			{
				eventRows[4]++;
			}
			if (alldata[r][3] == "400m")
			{
				eventRows[5]++;
			}

			
			// if they are ribbon winners add one to count
			if (alldata[r][8] == 1 || alldata[r][8] == 2)
			{
				ribbonRows++;
			}
		}
	}
	

	ribbondata = new Array(ribbonRows);
	
	ribbonRows = 0;
	// copy only the ribbon winner data
	for (var r = 0; r < maxRows; r++)
	{
		if (alldata[r][8] == 1 || alldata[r][8] == 2)
		{
			ribbondata[ribbonRows] = new Array(maxCols);
		
			for (var c = 0; c < maxCols; c++)
			{
				ribbondata[ribbonRows][c] = alldata[r][c];	
			}
			ribbonRows++;
		}
	}
	
	eventData = new Array(maxEvent);
	localEventData = new Array(maxEvent);
	
	for (var x = 0; x < eventData.length; x++)
	{
		eventData[x] = new Array(eventRows[x]);
		localEventData[x] = new Array(eventRows[x].length);
		eventRows[x] = 0;
	}
	
	
	// copy shotputt data
	// copy discus data
	// copy longjump data
	var eventMark = 0;
	
	for (var x = 0; x < eventData.length; x++)
	{

		for (var r = 0; r < maxRows; r++)
		{
		
			localEventData[x][eventRows[x]] = new Array(6);
			localEventData[x][eventRows[x]][0] = alldata[r][1];
			localEventData[x][eventRows[x]][1] = alldata[r][3];
			localEventData[x][eventRows[x]][2] = alldata[r][10];
			localEventData[x][eventRows[x]][3] = alldata[r][5];
			localEventData[x][eventRows[x]][4] = false;
			localEventData[x][eventRows[x]][5] = 0;
		
			if (alldata[r][4] == boyOrGirl)
			{
				if (x == 0 && alldata[r][3] == "Shot Putt")
				{
					eventMark = x;
					eventData[x][eventRows[x]] = new Array(maxCols);
		
					for (var c = 0; c < maxCols; c++)
					{
						if (c == 10 && alldata[r][c] == "")
						{
							eventData[x][eventRows[x]][c] = "0.00";			
						}
						else 
						{
							if (c == 10)
							{
								var d = "00";
								var w = 0;
								if (alldata[r][10] != 0)
								{
									if (alldata[r][10].toString().indexOf('.') == -1)
									{
										w = alldata[r][10].toString();
										d = "00";
									}
									else
									{
										w = alldata[r][10].toString().substr(0,alldata[r][10].toString().indexOf('.'));			
										d = alldata[r][10].toString().substr(alldata[r][10].toString().indexOf('.')+1,alldata[r][10].toString().length);
										if (alldata[r][10].toString().substr(alldata[r][10].toString().indexOf('.')+1,alldata[r][10].toString().length).length == 1)
										{
											d += "0";				
										}
				
									}
								}
								eventData[x][eventRows[x]][c] = w+"."+d;	
							}
							else
								eventData[x][eventRows[x]][c] = alldata[r][c];	
						}
					}
					eventRows[x]++;
				} // shotput if

				if (x == 1 && alldata[r][3] == "Long Jump")
				{
					eventMark = x;
					eventData[x][eventRows[x]] = new Array(maxCols);
		
					for (var c = 0; c < maxCols; c++)
					{
						if (c == 10 && alldata[r][c] == "")
						{
							eventData[x][eventRows[x]][c] = "0.00";			
						}
						else 
						{
							if (c == 10)
							{
								var d = "00";
								var w = 0;
								if (alldata[r][10] != 0)
								{
									if (alldata[r][10].toString().indexOf('.') == -1)
									{
										w = alldata[r][10].toString();
										d = "00";
									}
									else
									{
										w = alldata[r][10].toString().substr(0,alldata[r][10].toString().indexOf('.'));			
										d = alldata[r][10].toString().substr(alldata[r][10].toString().indexOf('.')+1,alldata[r][10].toString().length);
										if (alldata[r][10].toString().substr(alldata[r][10].toString().indexOf('.')+1,alldata[r][10].toString().length).length == 1)
										{
											d += "0";				
										}
				
									}
								}
								eventData[x][eventRows[x]][c] = w+"."+d;	
							}
							else
								eventData[x][eventRows[x]][c] = alldata[r][c];	
						}
					}
					eventRows[x]++;
				} // long jump if

				if (x == 2 && alldata[r][3] == "Discus")
				{
					eventMark = x;
					eventData[x][eventRows[x]] = new Array(maxCols);
		
					for (var c = 0; c < maxCols; c++)
					{
						if (c == 10 && alldata[r][c] == "")
						{
							eventData[x][eventRows[x]][c] = "0.00";			
						}
						else 
						{
							if (c == 10)
							{
								var d = "00";
								var w = 0;
								if (alldata[r][10] != 0)
								{
									if (alldata[r][10].toString().indexOf('.') == -1)
									{
										w = alldata[r][10].toString();
										d = "00";
									}
									else
									{
										w = alldata[r][10].toString().substr(0,alldata[r][10].toString().indexOf('.'));			
										d = alldata[r][10].toString().substr(alldata[r][10].toString().indexOf('.')+1,alldata[r][10].toString().length);
										if (alldata[r][10].toString().substr(alldata[r][10].toString().indexOf('.')+1,alldata[r][10].toString().length).length == 1)
										{
											d += "0";				
										}
				
									}
								}
								eventData[x][eventRows[x]][c] = w+"."+d;	
							}
							else
								eventData[x][eventRows[x]][c] = alldata[r][c];	
						}
					}
					eventRows[x]++;
				} // if discus

				if (x == 3 && alldata[r][3] == "100m")
				{
					eventMark = x;
					eventData[x][eventRows[x]] = new Array(maxCols);
		
					for (var c = 0; c < maxCols; c++)
					{
						if (c == 10 && alldata[r][c] == "")
						{
							eventData[x][eventRows[x]][c] = "0.000";			
						}
						else 
						{
							if (c == 10)
							{
								var d = "000";
								var w = 0;
								if (alldata[r][10] != 0)
								{
									if (alldata[r][10].toString().indexOf('.') == -1)
									{
										w = alldata[r][10].toString();
										d = "000";
									}
									else
									{
										w = alldata[r][10].toString().substr(0,alldata[r][10].toString().indexOf('.'));			
										d = alldata[r][10].toString().substr(alldata[r][10].toString().indexOf('.')+1,alldata[r][10].toString().length);
										if (alldata[r][10].toString().substr(alldata[r][10].toString().indexOf('.')+1,alldata[r][10].toString().length).length == 1)
										{
											d += "00";				
										}
										if (alldata[r][10].toString().substr(alldata[r][10].toString().indexOf('.')+1,alldata[r][10].toString().length).length == 2)
										{
											d += "0";
										}
									}
								}
								eventData[x][eventRows[x]][c] = w+"."+d;	
							}
							else
								eventData[x][eventRows[x]][c] = alldata[r][c];	
						}
					}
					eventRows[x]++;
				} // 100m
			
				if (x == 4 && alldata[r][3] == "200m")
				{
					eventData[x][eventRows[x]] = new Array(maxCols);
		
					for (var c = 0; c < maxCols; c++)
					{
						if (c == 10 && alldata[r][c] == "")
						{
							eventData[x][eventRows[x]][c] = "0.000";			
						}
						else 
						{
							if (c == 10)
							{
								var d = "000";
								var w = 0;
								if (alldata[r][10] != 0)
								{
									if (alldata[r][10].toString().indexOf('.') == -1)
									{
										w = alldata[r][10].toString();
										d = "000";
									}
									else
									{
										w = alldata[r][10].toString().substr(0,alldata[r][10].toString().indexOf('.'));			
										d = alldata[r][10].toString().substr(alldata[r][10].toString().indexOf('.')+1,alldata[r][10].toString().length);
										if (alldata[r][10].toString().substr(alldata[r][10].toString().indexOf('.')+1,alldata[r][10].toString().length).length == 1)
										{
											d += "00";				
										}
										if (alldata[r][10].toString().substr(alldata[r][10].toString().indexOf('.')+1,alldata[r][10].toString().length).length == 2)
										{
											d += "0";
										}
									}
								}
								eventData[x][eventRows[x]][c] = w+"."+d;	
							}
							else
								eventData[x][eventRows[x]][c] = alldata[r][c];	
						}
					}
					eventRows[x]++;
				} // if 200m
			
				if (x == 5 && alldata[r][3] == "400m")
				{
					eventData[x][eventRows[x]] = new Array(maxCols);
		
					for (var c = 0; c < maxCols; c++)
					{
						if (c == 10 && alldata[r][c] == "")
						{
							eventData[x][eventRows[x]][c] = "0.000";			
						}
						else 
						{
							if (c == 10)
							{
								var d = "000";
								var w = 0;
								if (alldata[r][10] != 0)
								{
									if (alldata[r][10].toString().indexOf('.') == -1)
									{
										w = alldata[r][10].toString();
										d = "000";
									}
									else
									{
										w = alldata[r][10].toString().substr(0,alldata[r][10].toString().indexOf('.'));			
										d = alldata[r][10].toString().substr(alldata[r][10].toString().indexOf('.')+1,alldata[r][10].toString().length);
										if (alldata[r][10].toString().substr(alldata[r][10].toString().indexOf('.')+1,alldata[r][10].toString().length).length == 1)
										{
											d += "00";				
										}
										if (alldata[r][10].toString().substr(alldata[r][10].toString().indexOf('.')+1,alldata[r][10].toString().length).length == 2)
										{
											d += "0";
										}				
									}
								}
								eventData[x][eventRows[x]][c] = w+"."+d;	
							}
							else
								eventData[x][eventRows[x]][c] = alldata[r][c];	
						}
					}
					eventRows[x]++;
				} // if 400m
			} // Filter boys or girls
		} // for each row in the event
		


	} // for all events
	
	


	// allow data to be shown after it has been submitted
	dataSubmitted = true;

	// hide textbox and button
	urlinp.hide();
	submitbutton.hide();
	
//	updateFinishingPlacement();

}